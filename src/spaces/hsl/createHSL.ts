import { RawHSLArray, RawHSLArrayWithAlpha, RawHSLObject } from "../../types"
import BaseColor from "../base/BaseColor"
import { getRGBNormalComponents } from "../rgb"
import RGBColor from "../rgb/RGBColor"
import HSLColor from "./HSLColor"
import HSLData from "./HSLData"

export const createHSLFromArray = (raw: RawHSLArray) =>
    new HSLColor(...raw as RawHSLArrayWithAlpha)

export const createHSLFromObject = (raw: RawHSLObject) =>
    new HSLColor(raw.hue, raw.saturation, raw.lightness, raw.alpha)

export const copyHSL = (hsl: HSLColor): HSLColor =>
    new HSLColor(
        hsl.colorData.hue,
        hsl.colorData.saturation,
        hsl.colorData.lightness,
        hsl.alpha,
    )

export const copyHSLWithModify = (
    hsl: HSLColor,
    raw: Partial<RawHSLObject>,
): HSLColor => new HSLColor(
    raw.hue || hsl.colorData.hue,
    raw.saturation || hsl.colorData.saturation,
    raw.lightness || hsl.colorData.lightness,
    raw.alpha || hsl.alpha,
)

export const createHSLFromRGB = (rgb: RGBColor): HSLColor => {
    // TODO: Add optimization for `Math.abs` and `mod` operations
    const [red, green, blue] = getRGBNormalComponents(rgb)

    const minComponent = Math.min(red, green, blue)
    const maxComponent = Math.max(red, green, blue)

    const delta = maxComponent - minComponent

    const lightness = (minComponent + maxComponent) / 2

    console.log(lightness)

    let hue: number = 0, saturation: number = 0

    if (delta === 0) {
        return new HSLColor(hue * 360, saturation * 100, lightness * 100)
    }

    saturation = delta / (1 - Math.abs(2 * lightness - 1))

    switch (maxComponent) {
        case red:
            hue = ((green - blue) / delta) % 6
            break;
        case green:
            hue = (blue - red) / delta + 2
            break;
        default:
            hue = (red - green) / delta + 4
    }

    return new HSLColor(hue * 60, saturation * 100, lightness * 100, rgb.alpha)
}

export const castHSLFromBaseColor = (
    color: BaseColor<HSLData>
): HSLColor => new HSLColor(
    color.colorData.hue,
    color.colorData.saturation,
    color.colorData.lightness,
    color.alpha,
)
