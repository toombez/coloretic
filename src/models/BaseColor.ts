import { Branded, clamp } from "../utils"
import { ColorModel } from "./ColorModel"

type ColorAlphaValue = Branded<number, 'colorAlpha'>

export default abstract class BaseColor<Model extends ColorModel> {
    public static readonly MAX_ALPHA_VALUE = 255
    public static readonly MIN_ALPHA_VALUE = 0
    public static readonly DEFAULT_ALPHA_VALUE = this.MAX_ALPHA_VALUE

    private readonly _alpha: ColorAlphaValue

    public constructor(alpha: number = BaseColor.DEFAULT_ALPHA_VALUE) {
        this._alpha = this.parseNumberToAlpha(alpha)
    }

    public isTransparent(): boolean {
        return this.getAlpha() === BaseColor.MIN_ALPHA_VALUE
    }

    public getAlpha(): ColorAlphaValue {
        return this._alpha
    }

    public getNormalizedAlpha(): number {
        return this.getAlpha() / BaseColor.MAX_ALPHA_VALUE
    }

    private parseNumberToAlpha(value: number): ColorAlphaValue {
        return clamp(value, {
            max: BaseColor.MAX_ALPHA_VALUE,
            min: BaseColor.MIN_ALPHA_VALUE,
        }) as ColorAlphaValue
    }

    public abstract setAlpha(value: number): BaseColor<Model>
    public abstract getModel(): Model
}
