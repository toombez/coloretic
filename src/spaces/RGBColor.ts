import { clamp } from "../utils"
import BaseColorSpace from "./BaseColorSpace"

export const MIN_RGB_COMPONENT = 0
export const MAX_RGB_COMPONENT = 255
export const DEFAULT_RGB_COMPONENT = MAX_RGB_COMPONENT

export default class RGBColor extends BaseColorSpace {
    public readonly red: number
    public readonly green: number
    public readonly blue: number

    public constructor(red: number, green: number, blue: number, alpha?: number) {
        super(alpha)

        this.red = RGBColor.parseComponent(red)
        this.green = RGBColor.parseComponent(green)
        this.blue = RGBColor.parseComponent(blue)
    }

    private static parseComponent(component: number): number {
        return Math.round(clamp(component, {
            minimum: MIN_RGB_COMPONENT,
            maximum: MAX_RGB_COMPONENT,
        }))
    }
}
