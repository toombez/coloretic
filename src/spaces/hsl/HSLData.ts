import { clamp, modulo } from "../../utils"

export const MIN_HUE = 0
export const MAX_HUE = 360

export const MIN_PERCENTAGE = 0
export const MAX_PERCENTAGE = 100

export default class HSLData {
    public readonly hue: number
    public readonly saturation: number
    public readonly lightness: number

    public constructor(
        hue: number,
        saturation: number,
        lightness: number,
    ) {
        this.hue = HSLData.parseHue(hue)
        this.saturation = HSLData.parsePercentage(saturation)
        this.lightness = HSLData.parsePercentage(lightness)
    }

    private static parseHue(hue: number): number {
        return Math.round(modulo(hue, {
            minimum: MIN_HUE,
            maximum: MAX_HUE,
        }))
    }

    private static parsePercentage(percentage: number): number {
        return Math.round(clamp(percentage, {
            minimum: MIN_PERCENTAGE,
            maximum: MAX_PERCENTAGE,
        }))
    }
}
