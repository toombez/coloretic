import { clamp, modulo } from "../utils"
import {
    Color,
    createColorComponentOperations,
    createColorFactory,
} from "./color"

/**
 * The minimal value of the hue component.
 */
export const MIN_HUE = 0

/**
 * The maximal value of the hue component.
 */
export const MAX_HUE = 360

/**
 * The minimal value of the saturation and lightness components.
 */
export const MIN_PERCENTAGE = 0

/**
 * The maximal value of the saturation and lightness components.
 */
export const MAX_PERCENTAGE = 100

/**
 * HSL color space tag.
 */
export const HSL_TAG = 'HSL'

/**
 * HSL color space components
 */
export type HSLComponents = {
    /**
     * Hue component.
     */
    hue: number

    /**
     * Saturation component.
     */
    saturation: number

    /**
     * Lightness component.
     */
    lightness: number
}

/**
 * HSL color.
 */
export type HSLColor = Color<typeof HSL_TAG, HSLComponents>

const hueValidator = (value: number) => Math.round(modulo(value, {
    minimum: MIN_HUE,
    maximum: MAX_HUE,
}))

const percentageValidator = (value: number) => Math.round(clamp(value, {
    minimum: MIN_PERCENTAGE,
    maximum: MAX_PERCENTAGE,
}))

/**
 * Create HSL color.
 *
 * @param data - Object that contain hue, saturation, lightness components and alpha channel.
 * @returns HSL color.
 */
export const createHSLColor = createColorFactory<
    typeof HSL_TAG,
    HSLComponents
>(HSL_TAG, {
    hue: hueValidator,
    lightness: percentageValidator,
    saturation: percentageValidator,
})

/**
 * Check color is HSL color.
 *
 * @param color - Target color to check.
 * @returns `true` if color is HSL, else - `false`
 */
// TODO: check fields in color
export const isHSLColor = (
    color: Color<string, any>,
): color is HSLColor => color._tag === HSL_TAG

const  hueOperations = createColorComponentOperations<
    typeof HSL_TAG,
    HSLComponents
>('hue', createHSLColor)

/**
 * Set hue component for HSL color.
 *
 * @param amount - Amount to set.
 * @param color - Target color.
 * @returns New HSL color with setted hue component.
 */
export const setHue = hueOperations.set

/**
 * Add hue component for RGB color.
 *
 * @param amount - Amount to add.
 * @param color - Target color.
 * @returns New HSL color with added hue component.
 */
export const rotateHue = hueOperations.increase

const lightnessOperations = createColorComponentOperations<
    typeof HSL_TAG,
    HSLComponents
>('lightness', createHSLColor)

/**
 * Set lightness component for HSL color.
 *
 * @param amount - Amount to set.
 * @param color - Target color.
 * @returns New HSL color with setted lightness component.
 */
export const setLightness = lightnessOperations.set

/**
 * Increase lightness component for HSL color.
 *
 * @param amount - Amount to increase.
 * @param color - Target color.
 * @returns New HSL color with increased lightness component.
 */
export const lighten = lightnessOperations.increase

/**
 * Reduce lightness component for HSL color.
 *
 * @param amount - Amount to reduce.
 * @param color - Target color.
 * @returns New HSL color with reduced lightness component.
 */
export const darken = lightnessOperations.reduce

const saturationOperations = createColorComponentOperations<
    typeof HSL_TAG,
    HSLComponents
>('saturation', createHSLColor)

/**
 * Set saturation component for HSL color.
 *
 * @param amount - Amount to set.
 * @param color - Target color.
 * @returns New HSL color with setted saturation component.
 */
export const setSaturation = saturationOperations.set

/**
 * Increase saturation component for HSL color.
 *
 * @param amount - Amount to increase.
 * @param color - Target color.
 * @returns New HSL color with increased saturation component.
 */
export const saturate = saturationOperations.increase

/**
 * Reduce saturation component for HSL color.
 *
 * @param amount - Amount to reduce.
 * @param color - Target color.
 * @returns New HSL color with reduced saturation component.
 */
export const desaturate = saturationOperations.reduce
