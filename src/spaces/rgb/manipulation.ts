import { clamp } from "../../utils"
import RGBColor from "./RGBColor"

export const alphaBlendingRGB = (base: RGBColor, overlay: RGBColor): RGBColor => {
    const baseFactor = overlay.alpha
    const overlayFactor = base.alpha * (1 - overlay.alpha)
    const blendedAlpha = baseFactor + overlayFactor

    const blendedRed = (
        overlay.colorData.red * baseFactor + base.colorData.red * overlayFactor
    ) / blendedAlpha

    const blendedGreen = (
        overlay.colorData.green * baseFactor + base.colorData.green * overlayFactor
    ) / blendedAlpha

    const blendedBlue = (
        overlay.colorData.blue * baseFactor + base.colorData.blue * overlayFactor
    ) / blendedAlpha

    return new RGBColor(blendedRed, blendedGreen, blendedBlue, blendedAlpha)
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
        color1.colorData.red * color1Factor
    ) + color2.colorData.red * color2Factor

    const mixedGreen = (
        color1.colorData.green * color1Factor
    ) + color2.colorData.green * color2Factor

    const mixedBlue = (
        color1.colorData.blue * color1Factor
    ) + color2.colorData.blue * color2Factor

    const mixedAlpha = (
        color1.alpha * color1Factor
    ) + color2.alpha * color2Factor

    return new RGBColor(mixedRed, mixedGreen, mixedBlue, mixedAlpha)
}
