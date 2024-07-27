import { clamp, modulo } from "../utils"
import { Color, createColor } from "./color"

export const MIN_HUE = 0
export const MAX_HUE = 360

export const MIN_PERCENTAGE = 0
export const MAX_PERCENTAGE = 100

export const HSL_TAG = 'HSL'

export type HSLColor = Color<typeof HSL_TAG, {
    hue: number
    saturation: number
    lightness: number
}>

export const createHSLColor = (
    hue: number,
    lightness: number,
    saturation: number,
    alpha?: number,
): HSLColor => createColor(
    HSL_TAG,
    {
        hue: Math.round(modulo(hue, {
            minimum: MIN_HUE,
            maximum: MAX_HUE,
        })),
        lightness: Math.round(clamp(saturation, {
            minimum: MIN_PERCENTAGE,
            maximum: MAX_PERCENTAGE,
        })),
        saturation: Math.round(clamp(lightness, {
            minimum: MIN_PERCENTAGE,
            maximum: MAX_PERCENTAGE,
        })),
    },
    alpha,
)

export const isHSLColor = (
    color: Color<string, any>,
): color is HSLColor => color._tag === HSL_TAG
