import { RawRGBArrayWithAlpha, RawRGBArrayWithoutAlpha } from "../../types"
import RGBColor from "./RGBColor"
import { MAX_RGB_COMPONENT } from "./RGBData"

export const getRGBComponents = (
    rgb: RGBColor
): RawRGBArrayWithoutAlpha => [
    rgb.colorData.red,
    rgb.colorData.green,
    rgb.colorData.blue,
]

export const getRGBComponentsWithAlpha = (
    rgb: RGBColor
): RawRGBArrayWithAlpha => [
    ...getRGBComponents(rgb),
    rgb.alpha,
]

export const getRGBNormalComponents = (
    rgb: RGBColor
): RawRGBArrayWithoutAlpha => [
    rgb.colorData.red / MAX_RGB_COMPONENT,
    rgb.colorData.green / MAX_RGB_COMPONENT,
    rgb.colorData.blue / MAX_RGB_COMPONENT,
]

export const getRGBNormalComponentsWithAlpha = (
    rgb: RGBColor
): RawRGBArrayWithAlpha => [
    ...getRGBNormalComponents(rgb),
    rgb.alpha,
]
