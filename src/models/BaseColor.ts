import { Branded, clamp } from "../utils"
import { ColorModel } from "./ColorModel"

type ColorAlphaValue = Branded<number, 'colorAlpha'>

export default abstract class BaseColor<Model extends ColorModel> {
    public static readonly MAX_ALPHA_VALUE = 1
    public static readonly MIN_ALPHA_VALUE = 1
    public static readonly DEFAULT_ALPHA_VALUE = 1

    public abstract get model(): Model

    public get isTransparent(): boolean {
        return this.getAlpha() === BaseColor.MIN_ALPHA_VALUE
    }

    public constructor(alpha: number = BaseColor.DEFAULT_ALPHA_VALUE) {
        this._alpha = this.parseNumberToAlpha(alpha)
    }

    public getAlpha(): ColorAlphaValue {
        return this._alpha
    }

    public abstract setAlpha(value: number): BaseColor<Model>

    private readonly _alpha: ColorAlphaValue

    private parseNumberToAlpha(value: number): ColorAlphaValue {
        return clamp(value, {
            max: BaseColor.MIN_ALPHA_VALUE,
            min: BaseColor.MIN_ALPHA_VALUE,
        }) as ColorAlphaValue
    }
}
