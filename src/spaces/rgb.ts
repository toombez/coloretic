import { clamp } from "../utils"
import {
    Color,
    createColorComponentOperations,
    createColorFactory,
} from "./color"

/**
 * The minimal value of the RGB components.
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
 * @param data - Object that contain red, green, blue components and alpha channel.
 * @returns RGB color.
 */
export const createRGBColor = createColorFactory(RGB_TAG, {
    red: validateRGBComponent,
    green: validateRGBComponent,
    blue: validateRGBComponent,
})

/**
 * Check color is RGB color.
 *
 * @param color - Target color to check.
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
 * @param amount - Amount to set.
 * @param color - Target color.
 * @returns New RGB color with setted red component.
 */
export const setRed = redOperations.set

/**
 * Increase red component for RGB color.
 *
 * @param amount - Amount to increase.
 * @param color - Target color.
 * @returns New RGB color with increased red component.
 */
export const increaseRed = redOperations.increase

/**
 * Decrease red component for RGB color.
 *
 * @param amount - Amount to decrease.
 * @param color - Target color.
 * @returns New RGB color with decreased red component.
 */
export const decreaseRed = redOperations.decrease

const greenOperations = createColorComponentOperations<
    typeof RGB_TAG,
    RGBComponents
>('green', createRGBColor)

/**
 * Set green component for RGB color.
 *
 * @param amount - Amount to set.
 * @param color - Target color.
 * @returns New RGB color with setted green component.
 */
export const setGreen = greenOperations.set

/**
 * Increase green component for RGB color.
 *
 * @param amount - Amount to increase.
 * @param color - Target color.
 * @returns New RGB color with increased green component.
 */
export const increaseGreen = greenOperations.increase

/**
 * Decrease green component for RGB color.
 *
 * @param amount - Amount to decrease.
 * @param color - Target color.
 * @returns New RGB color with decreased green component.
 */
export const decreaseGreen = greenOperations.decrease

const blueOperations = createColorComponentOperations<
    typeof RGB_TAG,
    RGBComponents
>('blue', createRGBColor)

/**
 * Set blue component for RGB color.
 *
 * @param amount - Amount to set.
 * @param color - Target color.
 * @returns New RGB color with setted blue component.
 */
export const setBlue = blueOperations.set

/**
 * Increase blue component for RGB color.
 *
 * @param amount - Amount to increase.
 * @param color - Target color.
 * @returns New RGB color with increased blue component.
 */
export const increaseBlue = blueOperations.increase

/**
 * Decrease blue component for RGB color.
 *
 * @param amount - Amount to decrease.
 * @param color - Target color.
 * @returns New RGB color with decreased blue component.
 */
export const decreaseBlue = blueOperations.decrease
