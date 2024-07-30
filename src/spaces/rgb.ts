import { clamp } from "../utils"
import { Color, createColorComponentOperations, createColorFactory } from "./color"

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

// TODO: check fields in color
export const isRGBColor = (
    color: Color<string, any>,
): color is RGBColor => color._tag === RGB_TAG


export const {
    add: addRed,
    remove: removeRed,
    set: setRed,
} = createColorComponentOperations<
    typeof RGB_TAG,
    RGBComponents
>('red', createRGBColor)

export const {
    add: addGreen,
    remove: removeGreen,
    set: setGreen,
} = createColorComponentOperations<
    typeof RGB_TAG,
    RGBComponents
>('green', createRGBColor)

export const {
    add: addBlue,
    remove: removeBlue,
    set: setBlue,
} = createColorComponentOperations<
    typeof RGB_TAG,
    RGBComponents
>('blue', createRGBColor)
