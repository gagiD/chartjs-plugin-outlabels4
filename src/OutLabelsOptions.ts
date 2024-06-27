import { ContextProxy } from 'chart.js/helpers'

export class PaddingOptions {
    top = 4
    right = 4
    bottom = 4
    left = 4
}

export class FontOptions {
    family = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    size?: number
    style?: 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit' = 'normal'
    weight?: string
    resizable = true
    minSize?: number
    maxSize?: number
    lineHeight = 1.2
    lineSize = 0
}

export type BooleanCallback = (item: any) => boolean
export type StringCallback = (item: any) => string

export default class OutLabelsOptions {
    display: boolean | BooleanCallback = true
    text: string | StringCallback = '%l %p'
    textAlign = 'center'
    color = 'white'
    borderRadius = 0
    borderWidth = 0
    lineWidth = 2
    length = 40
    percentPrecision = 1
    valuePrecision = 3

    padding: PaddingOptions = new PaddingOptions()

    font: FontOptions = new FontOptions()

    backgroundColor(context: ContextProxy): string {
        return context.dataset.backgroundColor
    }

    borderColor(context: ContextProxy): string {
        return context.dataset.backgroundColor
    }

    lineColor(context: ContextProxy): string {
        return context.dataset.backgroundColor
    }
}
