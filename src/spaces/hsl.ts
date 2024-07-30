import { clamp, modulo } from "../utils"
import { Color, createColorComponentOperations, createColorFactory } from "./color"

export const MIN_HUE = 0
export const MAX_HUE = 360

export const MIN_PERCENTAGE = 0
export const MAX_PERCENTAGE = 100

export const HSL_TAG = 'HSL'

export type HSLComponents = {
    hue: number
    saturation: number
    lightness: number
}

export type HSLColor = Color<typeof HSL_TAG, HSLComponents>

const hueValidator = (value: number) => Math.round(modulo(value, {
    minimum: MIN_HUE,
    maximum: MAX_HUE,
}))

const percentageValidator = (value: number) => Math.round(clamp(value, {
    minimum: MIN_PERCENTAGE,
    maximum: MAX_PERCENTAGE,
}))

export const createHSLColor = createColorFactory<
    typeof HSL_TAG,
    HSLComponents
>(HSL_TAG, {
    hue: hueValidator,
    lightness: percentageValidator,
    saturation: percentageValidator,
})

// TODO: check fields in color
export const isHSLColor = (
    color: Color<string, any>,
): color is HSLColor => color._tag === HSL_TAG

export const {
    add: rotateHue,
    set: setHue,
} = createColorComponentOperations<
    typeof HSL_TAG,
    HSLComponents
>('hue', createHSLColor)

export const {
    add: lighten,
    remove: darken,
    set: setLightness,
} = createColorComponentOperations<
    typeof HSL_TAG,
    HSLComponents
>('lightness', createHSLColor)

export const {
    add: saturate,
    remove: desaturate,
    set: setSaturation,
} = createColorComponentOperations<
    typeof HSL_TAG,
    HSLComponents
>('saturation', createHSLColor)
