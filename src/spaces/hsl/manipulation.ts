import { copyHSLWithModify } from "./createHSL"
import HSLColor from "./HSLColor"

export const lighten = (
    hsl: HSLColor,
    amount: number,
): HSLColor => copyHSLWithModify(hsl, {
    lightness: hsl.colorData.lightness + amount
})

export const darken = (
    hsl: HSLColor,
    amount: number
): HSLColor => lighten(hsl, -amount)
