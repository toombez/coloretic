import { createHSLColor, HSLColor } from "./hsl"
import { createRGBColor, RGBColor } from "./rgb"

const hueToRgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < (1 / 6)) return p + (q - p) * (6 * t)
    if (t < (1 / 2)) return q
    if (t < (2 / 3)) return p + (q - p) * (((2 / 3) - t) * 6)
    return p
}

export const HSL2RGB = (hsl: HSLColor): RGBColor => {
    const hue = hsl.data.hue / 360
    const saturation = hsl.data.saturation / 100
    const lightness = hsl.data.lightness / 100

    if (saturation === 0) {
        const component = lightness * 255
        return createRGBColor(component, component, component, hsl.alpha)
    }

    const q = lightness < 0.5
        ? lightness * (1 + saturation)
        : lightness + saturation - lightness * saturation

    const p = 2 * lightness - q

    const red = hueToRgb(p, q, hue + (1 / 3)) * 255
    const green = hueToRgb(p, q, hue) * 255
    const blue = hueToRgb(p, q, hue - (1 / 3)) * 255

    return createRGBColor(red, green, blue, hsl.alpha)
}

export const RGB2HSL = (rgb: RGBColor): HSLColor => {
    // TODO: Add optimization for `Math.abs` and `mod` operations
    const red = rgb.data.red / 255
    const green = rgb.data.green / 255
    const blue = rgb.data.blue / 255
    const alpha = rgb.alpha

    const minComponent = Math.min(red, green, blue)
    const maxComponent = Math.max(red, green, blue)

    const delta = maxComponent - minComponent

    const lightness = (minComponent + maxComponent) / 2

    let hue: number = 0, saturation: number = 0

    if (delta === 0) {
        return createHSLColor(
            hue * 360,
            saturation * 100,
            lightness * 100,
            alpha,
        )
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

    return createHSLColor(hue * 60, saturation * 100, lightness * 100, alpha)
}
