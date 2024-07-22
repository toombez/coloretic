import { RawRGBArray, RawRGBObject, RawRGBArrayWithAlpha } from "../../types"
import BaseColor from "../base/BaseColor"
import HSLColor from "../hsl/HSLColor"
import RGBColor from "./RGBColor"
import RGBData from "./RGBData"

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
    raw: Partial<RawRGBObject>,
): RGBColor => new RGBColor(
    raw.red || rgb.colorData.red,
    raw.green || rgb.colorData.green,
    raw.blue || rgb.colorData.blue,
    raw.alpha || rgb.alpha,
)

export const createRGBFromHSL = (hsl: HSLColor): RGBColor => {
    const H = hsl.colorData.hue / 360;
    const S = hsl.colorData.saturation / 100;
    const L = hsl.colorData.lightness / 100;

    const hueToRgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };

    let r: number, g: number, b: number;

    if (S === 0) {
        r = g = b = L; // achromatic
    } else {
        const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
        const p = 2 * L - q;
        r = hueToRgb(p, q, H + 1/3);
        g = hueToRgb(p, q, H);
        b = hueToRgb(p, q, H - 1/3);
    }

    return new RGBColor(r * 255, g * 255, b * 255, hsl.alpha )
}

export const castRGBFromBaseColor = (
    color: BaseColor<RGBData>
): RGBColor => new RGBColor(
    color.colorData.red,
    color.colorData.green,
    color.colorData.blue,
    color.alpha,
)
