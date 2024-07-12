import BaseColor from "./BaseColor"
import COLOR_MODEL from "./ColorModel"
import { Branded } from "./utilityTypes"
import { clamp } from "./utils"

type RGBAComponentNumber = Branded<number, 'RGBComponent'>
type RGBAAlphaNumber = Branded<number, 'RGBAAlpha'>

export default class RGBAColor extends BaseColor<typeof COLOR_MODEL.RGBA> {
    public static readonly MAX_COMPONENT_VALUE: number = 255
    public static readonly MIN_COMPONENT_VALUE: number = 0
    public static readonly MIN_ALPHA_VALUE: number = 0
    public static readonly MAX_ALPHA_VALUE: number = 1
    public static readonly DEFAULT_ALPHA_VALUE: number = this.MAX_ALPHA_VALUE

    public readonly red: RGBAComponentNumber
    public readonly green: RGBAComponentNumber
    public readonly blue: RGBAComponentNumber
    public readonly alpha: RGBAAlphaNumber

    public constructor(
        red: number,
        green: number,
        blue: number,
        alpha: number = RGBAColor.DEFAULT_ALPHA_VALUE,
    ) {
        super()

        this.red = this.parseNumberToComponent(red)
        this.green = this.parseNumberToComponent(green)
        this.blue = this.parseNumberToComponent(blue)
        this.alpha = this.parseNumberToAlpha(alpha)
    }

    get model(): "rgba" {
        return COLOR_MODEL.RGBA
    }

    protected parseNumberToComponent(number: number): RGBAComponentNumber {
        return clamp(number, {
            max: RGBAColor.MAX_COMPONENT_VALUE,
            min: RGBAColor.MIN_COMPONENT_VALUE,
        }) as RGBAComponentNumber
    }

    protected parseNumberToAlpha(number: number): RGBAAlphaNumber {
        return clamp(number, {
            min: RGBAColor.MIN_ALPHA_VALUE,
            max: RGBAColor.MAX_ALPHA_VALUE,
        }) as RGBAAlphaNumber
    }
}
