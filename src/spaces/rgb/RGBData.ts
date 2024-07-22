import { clamp } from "../../utils"

export const MIN_RGB_COMPONENT = 0
export const MAX_RGB_COMPONENT = 255
export const DEFAULT_RGB_COMPONENT = MAX_RGB_COMPONENT

export default class RGBData {
    public readonly red: number
    public readonly green: number
    public readonly blue: number

    public constructor(red: number, green: number, blue: number) {
        this.red = RGBData.parseComponent(red)
        this.green = RGBData.parseComponent(green)
        this.blue = RGBData.parseComponent(blue)
    }

    private static parseComponent(component: number): number {
        return Math.round(clamp(component, {
            minimum: MIN_RGB_COMPONENT,
            maximum: MAX_RGB_COMPONENT,
        }))
    }
}
