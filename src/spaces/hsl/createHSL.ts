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
    const [r, g, b] = getRGBNormalComponents(rgb)

    const maxVal = Math.max(r, g, b)
    const minVal = Math.min(r, g, b)
    let h: number, s: number;
    const l = (maxVal + minVal) / 2;

    if (maxVal === minVal) {
        h = s = 0; // achromatic
    } else {
        const delta = maxVal - minVal;
        s = l > 0.5 ? delta / (2 - maxVal - minVal) : delta / (maxVal + minVal);

        switch (maxVal) {
            case r:
                h = (g - b) / delta + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            default:
                h = (r - g) / delta + 4;
        }
        h /= 6;
    }

    return new HSLColor(h * 360, s * 100, l * 100, rgb.alpha)
}

export const castHSLFromBaseColor = (
    color: BaseColor<HSLData>
): HSLColor => new HSLColor(
    color.colorData.hue,
    color.colorData.saturation,
    color.colorData.lightness,
    color.alpha,
)
