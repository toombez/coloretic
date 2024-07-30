import { clamp } from "../utils"
import { Color, createColorFactory } from "./color"

export const MIN_RGB_COMPONENT = 0
export const MAX_RGB_COMPONENT = 255

export const RGB_TAG = 'RGB'

export type RGBComponents = {
    red: number
    green: number
    blue: number
}

export type RGBColor = Color<typeof RGB_TAG, RGBComponents>

const validateRGBComponent = (value: number) => Math.round(clamp(value, {
    minimum: MIN_RGB_COMPONENT,
    maximum: MAX_RGB_COMPONENT,
}))

export const createRGBColor = createColorFactory<
    typeof RGB_TAG,
    RGBComponents
>(RGB_TAG, {
    red: validateRGBComponent,
    green: validateRGBComponent,
    blue: validateRGBComponent,
})

export const isRGBColor = (
    color: Color<string, any>,
): color is RGBColor => color._tag === RGB_TAG
