import { clamp } from "../utils"
import { Color, createColor } from "./color"
import { createRGBColor, RGBColor } from "./rgb"
import { createHSLColor, HSLColor } from "./hsl"

export const opacify = <
    T extends string,
    D extends Record<string, unknown>,
>(
    color: Color<T, D>,
    amount: number,
) => createColor(
    color._tag,
    Object.assign({}, color.data),
    color.alpha + amount,
)

export const transparentize = <
    T extends string,
    D extends Record<string, unknown>,
>(
    ...[color, amount]: Parameters<typeof opacify<T, D>>
) => opacify(color, -amount)

export const addRed = (color: RGBColor, red: number) => createRGBColor(
    color.data.red + red,
    color.data.green,
    color.data.blue,
    color.alpha,
)

export const addGreen = (color: RGBColor, green: number) => createRGBColor(
    color.data.red,
    color.data.green + green,
    color.data.blue,
    color.alpha,
)

export const addBlue = (color: RGBColor, blue: number) => createRGBColor(
    color.data.red,
    color.data.green,
    color.data.blue + blue,
    color.alpha,
)

export const substractRed = (
    ...[color, amount]: Parameters<typeof addRed>
) => addRed(color, -amount)

export const substractBlue = (
    ...[color, amount]: Parameters<typeof addBlue>
) => addBlue(color, -amount)

export const substractGreen = (
    ...[color, amount]: Parameters<typeof addGreen>
) => addGreen(color, -amount)

export const saturate = (color: HSLColor, amount: number) => createHSLColor(
    color.data.hue,
    color.data.saturation + amount,
    color.data.lightness,
    color.alpha,
)

export const desaturate = (
    ...[color, amount]: Parameters<typeof saturate>
) => saturate(color, -amount)

export const lighten = (color: HSLColor, amount: number) => createHSLColor(
    color.data.hue,
    color.data.saturation,
    color.data.lightness + amount,
    color.alpha,
)

export const darken = (
    ...[color, amount]: Parameters<typeof lighten>
) => lighten(color, -amount)

export const rotateHue = (color: HSLColor, angle: number) => createHSLColor(
    color.data.hue + angle,
    color.data.saturation,
    color.data.lightness,
    color.alpha,
)

export const alphaBlendingRGB = (
    underColor: RGBColor,
    overlayColor: RGBColor,
): RGBColor => {
    const baseFactor = overlayColor.alpha
    const overlayFactor = underColor.alpha * (1 - overlayColor.alpha)
    const blendedAlpha = baseFactor + overlayFactor

    const blendedRed = (
        overlayColor.data.red * baseFactor
        + underColor.data.red * overlayFactor
    ) / blendedAlpha

    const blendedGreen = (
        overlayColor.data.green * baseFactor
        + underColor.data.green * overlayFactor
    ) / blendedAlpha

    const blendedBlue = (
        overlayColor.data.blue * baseFactor
        + underColor.data.blue * overlayFactor
    ) / blendedAlpha

    return createRGBColor(blendedRed, blendedGreen, blendedBlue, blendedAlpha)
}

export const mixRGB = (
    color1: RGBColor,
    color2: RGBColor,
    weight: number
): RGBColor => {
    const _weight = clamp(weight, {
        minimum: 0,
        maximum: 1,
    });

    const color1Factor = (1 - _weight)
    const color2Factor = _weight

    const mixedRed = (
        color1.data.red * color1Factor
    ) + color2.data.red * color2Factor

    const mixedGreen = (
        color1.data.green * color1Factor
    ) + color2.data.green * color2Factor

    const mixedBlue = (
        color1.data.blue * color1Factor
    ) + color2.data.blue * color2Factor

    const mixedAlpha = (
        color1.alpha * color1Factor
    ) + color2.alpha * color2Factor

    return createRGBColor(mixedRed, mixedGreen, mixedBlue, mixedAlpha)
}
