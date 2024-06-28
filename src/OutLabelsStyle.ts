import { resolve, toFont, toLineHeight, toPadding } from 'chart.js/helpers'
import { FontOptions, OutLabelsOptions } from './OutLabelsOptions'
import OutLabelsContext from './OutLabelsContext'
import { ChartArea, FontSpec } from 'chart.js'
import { defaults } from 'chart.js'

// Same as options but we make sure we have defaults
//

export class FontStyle implements FontSpec {
    family: string
    size: number
    style: 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit'
    weight: number | 'normal' | 'bold' | 'lighter' | 'bolder' | null
    lineHeight: string | number

    resizable?: boolean = false
    minSize?: number
    maxSize?: number

    lineSize: number

    constructor(fontOptions: FontOptions) {
        const font = toFont(fontOptions)
        this.family = font.family
        this.size = font.size
        this.style = font.style
        this.weight = font.weight

        this.lineHeight =
            font.lineHeight > font.size
                ? defaults.font.lineHeight ?? 1.2
                : font.lineHeight

        if (fontOptions.resizable) this.resizable = fontOptions.resizable
        if (fontOptions.minSize) this.minSize = fontOptions.minSize
        if (fontOptions.maxSize) this.maxSize = fontOptions.maxSize

        this.lineSize = toLineHeight(this.lineHeight, this.size)
    }
}

export class OutLabelStyle {
    display: boolean = true
    text: string = '%l %p'
    textAlign: string = 'center'
    color: string = 'white'
    borderRadius: number = 0
    borderWidth: number = 0
    lineWidth: number = 2
    length: number = 40
    percentPrecision: number = 1
    valuePrecision: number = 3

    padding: ChartArea

    font: FontStyle

    backgroundColor: string = 'black'
    borderColor: string = 'black'
    lineColor: string = 'black'

    constructor(
        options: OutLabelsOptions,
        context: OutLabelsContext,
        index: number
    ) {
        if (options.textAlign) this.textAlign = options.textAlign
        if (options.color) this.color = options.color
        if (options.borderRadius) this.borderRadius = options.borderRadius
        if (options.borderWidth) this.borderWidth = options.borderWidth
        if (options.lineWidth) this.lineWidth = options.lineWidth
        if (options.length) this.length = options.length
        if (options.percentPrecision)
            this.percentPrecision = options.percentPrecision
        if (options.valuePrecision) this.valuePrecision = options.valuePrecision

        const display = resolve([options.display], context, index)
        if (typeof display == 'boolean') this.display = display

        const text = resolve([options.text], context, index)
        if (typeof text == 'string') this.text = text

        this.font = new FontStyle(
            resolve([options.font], context, index) as FontOptions
        )
        this.padding = toPadding(options.padding ?? 4)

        const backgroundColor = resolve(
            [options.backgroundColor, context.dataset.backgroundColor],
            context,
            index
        )
        if (typeof backgroundColor == 'string')
            this.backgroundColor = backgroundColor

        const borderColor = resolve(
            [options.borderColor, context.dataset.borderColor],
            context,
            index
        )
        if (typeof borderColor == 'string') this.borderColor = borderColor

        const lineColor = resolve(
            [options.lineColor, context.dataset.backgroundColor],
            context,
            index
        )
        if (typeof lineColor == 'string') this.lineColor = lineColor
    }
}
