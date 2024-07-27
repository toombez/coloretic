import { clamp } from "../utils"
import { Color, createColor } from "./color"

export const MIN_RGB_COMPONENT = 0
export const MAX_RGB_COMPONENT = 255

export const RGB_TAG = 'RGB'

export type RGBColor = Color<typeof RGB_TAG, {
    red: number
    green: number
    blue: number
}>

export const createRGBColor = (
    red: number,
    green: number,
    blue: number,
    alpha?: number,
): RGBColor => createColor(
    RGB_TAG,
    {
        red: Math.round(clamp(red, {
            minimum: MIN_RGB_COMPONENT,
            maximum: MAX_RGB_COMPONENT,
        })),
        green: Math.round(clamp(green, {
            minimum: MIN_RGB_COMPONENT,
            maximum: MAX_RGB_COMPONENT,
        })),
        blue: Math.round(clamp(blue, {
            minimum: MIN_RGB_COMPONENT,
            maximum: MAX_RGB_COMPONENT,
        })),
    },
    alpha,
)

export const isRGBColor = (
    color: Color<string, any>,
): color is RGBColor => color._tag === RGB_TAG
