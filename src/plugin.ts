import { ArcElement, ChartMeta, ChartType, Plugin } from 'chart.js'
import OutLabel from './OutLabel'
import OutLabelsContext from './OutLabelsContext'
import OutLabelsManager from './OutLabelsManager'
import { OutLabelStyle } from './OutLabelsStyle'
import { OutLabelsOptions } from './OutLabelsOptions'

declare type OutLabelsPlugin = Plugin<'doughnut' | 'pie', OutLabelsOptions>

const outLabelsManager = new OutLabelsManager()

declare module 'chart.js' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface PluginOptionsByType<TType extends ChartType> {
        outlabels?: OutLabelsOptions
    }
}

const OutLabelsPlugin: OutLabelsPlugin = {
    id: 'outlabels',
    beforeInit: function (chart) {
        outLabelsManager.set(chart.id)
    },
    afterDatasetUpdate: function (chart, args, options) {
        const labels = chart.config.data.labels
        const dataset = chart.data.datasets[args.index]
        const elements = args.meta.data
        const ctx = chart.ctx

        ctx.save()
        for (let i = 0; i < elements.length; ++i) {
            const el = elements[i]
            let newLabel = null

            const percent =
                dataset.data[i] /
                dataset.data.reduce((sum, current) => sum + current)

            const context = {
                chart: chart,
                dataIndex: i,
                dataset: dataset,
                labels: labels,
                datasetIndex: args.index,
                value: dataset.data[i],
                percent: percent,
            } as OutLabelsContext // TODO: check typeing for this

            const style = new OutLabelStyle(options, context, i)
            if (style.display && el && chart.getDataVisibility(args.index)) {
                try {
                    newLabel = new OutLabel(ctx, context, i, style)
                } catch (e) {
                    console.warn(e)
                    newLabel = null
                }
            }

            if (newLabel) outLabelsManager.setLabel(chart.id, i, newLabel)
            else outLabelsManager.removeLabel(chart.id, i)
        }

        ctx.restore()
    },
    afterDatasetDraw: function (chart, args) {
        const ctx = chart.ctx
        const meta = args.meta as ChartMeta<'doughnut' | 'pie', ArcElement>
        const elements = meta.data
        ctx.save()

        const chartOutlabels = outLabelsManager.get(chart.id)
        if (!chartOutlabels) return

        chartOutlabels.forEach(label => {
            const element = elements[label.index]

            if (element) {
                label.positionCenter(element)
                label.updateRects()
            }
        })

        outLabelsManager.avoidOverlap(chart)

        chartOutlabels.forEach(label => {
            label.updateRects()
            label.drawLine()
            label.draw()
        })

        ctx.restore()
    },
}

export default OutLabelsPlugin
