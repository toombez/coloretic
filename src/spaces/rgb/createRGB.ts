import { RawRGBArray, RawRGBObject, RawRGBArrayWithAlpha } from "../../types"
import BaseColor from "../base/BaseColor"
import { getHSLNormalComponents } from "../hsl"
import HSLColor from "../hsl/HSLColor"
import RGBColor from "./RGBColor"
import RGBData, { MAX_RGB_COMPONENT } from "./RGBData"

export const createRGBFromArray = (raw: RawRGBArray): RGBColor =>
    new RGBColor(...raw as RawRGBArrayWithAlpha)

export const createRGBFromObject = (raw: RawRGBObject): RGBColor =>
    new RGBColor(
        raw.red,
        raw.green,
        raw.blue,
        raw.alpha,
    )

export const copyRGB = (rgb: RGBColor): RGBColor =>
    new RGBColor(
        rgb.colorData.red,
        rgb.colorData.green,
        rgb.colorData.blue,
        rgb.alpha,
    )

export const copyRGBWithModify = (
    rgb: RGBColor,
    raw: Partial<RawRGBObject> = {},
): RGBColor => new RGBColor(
    raw.red ?? rgb.colorData.red,
    raw.green ?? rgb.colorData.green,
    raw.blue ?? rgb.colorData.blue,
    raw.alpha ?? rgb.alpha,
)

const hueToRgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < (1 / 6)) return p + (q - p) * (6 * t)
    if (t < (1 / 2)) return q
    if (t < (2 / 3)) return p + (q - p) * (((2 / 3) - t) * 6)
    return p
}

export const createRGBFromHSL = (hsl: HSLColor): RGBColor => {
    const [
        hue,
        saturation,
        lightness,
    ] = getHSLNormalComponents(hsl)

    if (saturation === 0) {
        const component = lightness * MAX_RGB_COMPONENT
        return new RGBColor(component, component, component, hsl.alpha)
    }

    const q = lightness < 0.5
        ? lightness * (1 + saturation)
        : lightness + saturation - lightness * saturation

    const p = 2 * lightness - q

    const red = hueToRgb(p, q, hue + (1 / 3)) * MAX_RGB_COMPONENT
    const green = hueToRgb(p, q, hue) * MAX_RGB_COMPONENT
    const blue = hueToRgb(p, q, hue - (1 / 3)) * MAX_RGB_COMPONENT

    return new RGBColor(red, green, blue, hsl.alpha)
}

export const castRGBFromBaseColor = (
    color: BaseColor<RGBData>
): RGBColor => new RGBColor(
    color.colorData.red,
    color.colorData.green,
    color.colorData.blue,
    color.alpha,
)
