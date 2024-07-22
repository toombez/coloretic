import { RawHSLArrayWithAlpha, RawHSLArrayWithoutAlpha } from "../../types"
import HSLColor from "./HSLColor"
import { MAX_HUE, MAX_PERCENTAGE } from "./HSLData"

export const getHLSComponents = (hsl: HSLColor): RawHSLArrayWithoutAlpha => [
    hsl.colorData.hue,
    hsl.colorData.saturation,
    hsl.colorData.lightness,
]

export const getHSLComponentsWithAlpha = (
    hsl: HSLColor
): RawHSLArrayWithAlpha => [
    ...getHLSComponents(hsl),
    hsl.alpha,
]

export const getHSLNormalComponentsWithoutAlpha = (
    hsl: HSLColor
): RawHSLArrayWithoutAlpha => [
    hsl.colorData.hue / MAX_HUE,
    hsl.colorData.saturation / MAX_PERCENTAGE,
    hsl.colorData.lightness / MAX_PERCENTAGE,
]

export const getHSLNormalComponentsWithAlpha = (
    hsl: HSLColor
): RawHSLArrayWithAlpha => [
    ...getHSLNormalComponentsWithoutAlpha(hsl),
    hsl.alpha,
]
