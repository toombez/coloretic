import { clamp } from "../utils"
import { Color, createColorComponentOperations, createColorFactory } from "./color"

/**
 * The minimum value of the RGB components.
 */
export const MIN_RGB_COMPONENT = 0

/**
 * The maximal value of the RGB components.
 */
export const MAX_RGB_COMPONENT = 255

/**
 * RGB color space tag.
 */
export const RGB_TAG = 'RGB'

/**
 * RGB color space components
 */
export type RGBComponents = {
    /**
     * Red component.
     */
    red: number

    /**
     * Green component.
     */
    green: number

    /**
     * Blue component.
     */
    blue: number
}

/**
 * RGB color.
 */
export type RGBColor = Color<typeof RGB_TAG, RGBComponents>

const validateRGBComponent = (value: number) => Math.round(clamp(value, {
    minimum: MIN_RGB_COMPONENT,
    maximum: MAX_RGB_COMPONENT,
}))

/**
 * Create RGB color.
 *
 * @param data - object that contain red, green, blue components and alpha channel.
 * @returns RGB color.
 */
export const createRGBColor = createColorFactory<
    typeof RGB_TAG,
    RGBComponents
>(RGB_TAG, {
    red: validateRGBComponent,
    green: validateRGBComponent,
    blue: validateRGBComponent,
})

/**
 * Check color is RGB color.
 *
 * @param color - target color to check.
 * @returns `true` if color is RGB, else - `false`
 */
// TODO: check fields in color
export const isRGBColor = (
    color: Color<string, any>,
): color is RGBColor => color._tag === RGB_TAG

const redOperations = createColorComponentOperations<
    typeof RGB_TAG,
    RGBComponents
>('red', createRGBColor)

/**
 * Set red component for RGB color.
 *
 * @param amount - amount to set.
 * @param color - target color.
 * @returns new RGB color with setted red component.
 */
export const setRed = redOperations.set

/**
 * Increase red component for RGB color.
 *
 * @param amount - amount to increase.
 * @param color - target color.
 * @returns new RGB color with increased red component.
 */
export const increaseRed = redOperations.increase

/**
 * Reduce red component for RGB color.
 *
 * @param amount - amount to reduce.
 * @param color - target color.
 * @returns new RGB color with reduced red component.
 */
export const reduceRed = redOperations.reduce

const greenOperations = createColorComponentOperations<
    typeof RGB_TAG,
    RGBComponents
>('green', createRGBColor)

/**
 * Set green component for RGB color.
 *
 * @param amount - amount to set.
 * @param color - target color.
 * @returns new RGB color with setted green component.
 */
export const setGreen = greenOperations.set

/**
 * Increase green component for RGB color.
 *
 * @param amount - amount to increase.
 * @param color - target color.
 * @returns new RGB color with increased green component.
 */
export const increaseGreen = greenOperations.increase

/**
 * Reduce green component for RGB color.
 *
 * @param amount - amount to reduce.
 * @param color - target color.
 * @returns new RGB color with reduced green component.
 */
export const reduceGreen = greenOperations.reduce

const blueOperations = createColorComponentOperations<
    typeof RGB_TAG,
    RGBComponents
>('blue', createRGBColor)

/**
 * Set blue component for RGB color.
 *
 * @param amount - amount to set.
 * @param color - target color.
 * @returns new RGB color with setted blue component.
 */
export const setBlue = blueOperations.set

/**
 * Increase blue component for RGB color.
 *
 * @param amount - amount to increase.
 * @param color - target color.
 * @returns new RGB color with increased blue component.
 */
export const increaseBlue = blueOperations.increase

/**
 * Reduce blue component for RGB color.
 *
 * @param amount - amount to reduce.
 * @param color - target color.
 * @returns new RGB color with reduced blue component.
 */
export const reduceBlue = blueOperations.reduce
