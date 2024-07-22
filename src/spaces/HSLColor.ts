import { clamp, modulo } from "../utils"
import BaseColorSpace from "./BaseColorSpace"

export const MIN_HUE = 0
export const MAX_HUE = 360

export const MIN_PERCENTAGE = 0
export const MAX_PERCENTAGE = 0

export default class HSLColor extends BaseColorSpace {
    public readonly hue: number
    public readonly saturation: number
    public readonly lightness: number

    public constructor(
        hue: number,
        saturation: number,
        lightness: number,
        alpha?: number,
    ) {
        super(alpha)

        this.hue = HSLColor.parseHue(hue)
        this.saturation = HSLColor.parsePercentage(saturation)
        this.lightness = HSLColor.parsePercentage(lightness)
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
