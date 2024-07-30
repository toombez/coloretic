import { clamp } from "../utils"
import { createRGBColor, RGBColor } from "./rgb"

export const alphaBlendingRGB = (
    underColor: RGBColor,
    overlayColor: RGBColor,
): RGBColor => {
    const baseFactor = overlayColor.alpha
    const overlayFactor = underColor.alpha * (1 - overlayColor.alpha)
    const blendedAlpha = baseFactor + overlayFactor

    const blendedRed = (
        overlayColor.components.red * baseFactor
        + underColor.components.red * overlayFactor
    ) / blendedAlpha

    const blendedGreen = (
        overlayColor.components.green * baseFactor
        + underColor.components.green * overlayFactor
    ) / blendedAlpha

    const blendedBlue = (
        overlayColor.components.blue * baseFactor
        + underColor.components.blue * overlayFactor
    ) / blendedAlpha

    return createRGBColor({
        red: blendedRed,
        green: blendedGreen,
        blue: blendedBlue,
        alpha: blendedAlpha,
    })
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
        color1.components.red * color1Factor
    ) + color2.components.red * color2Factor

    const mixedGreen = (
        color1.components.green * color1Factor
    ) + color2.components.green * color2Factor

    const mixedBlue = (
        color1.components.blue * color1Factor
    ) + color2.components.blue * color2Factor

    const mixedAlpha = (
        color1.alpha * color1Factor
    ) + color2.alpha * color2Factor

    return createRGBColor({
        red: mixedRed,
        green: mixedGreen,
        blue: mixedBlue,
        alpha: mixedAlpha,
    })
}
