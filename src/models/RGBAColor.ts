import BaseColor from "./BaseColor"
import COLOR_MODEL from "./ColorModel"
import { Branded, clamp } from "../utils"

type RGBAComponentNumber = Branded<number, 'RGBComponent'>
type RGBAAlphaNumber = Branded<number, 'RGBAAlpha'>

type RGBAComponents = [number, number, number, number]

export default class RGBAColor extends BaseColor<typeof COLOR_MODEL.RGBA> {
    public static readonly MAX_COMPONENT_VALUE: number = 255
    public static readonly MIN_COMPONENT_VALUE: number = 0
    public static readonly MIN_ALPHA_VALUE: number = 0
    public static readonly MAX_ALPHA_VALUE: number = 1
    public static readonly DEFAULT_ALPHA_VALUE: number = this.MAX_ALPHA_VALUE

    public readonly _red: RGBAComponentNumber
    public readonly _green: RGBAComponentNumber
    public readonly _blue: RGBAComponentNumber
    public readonly _alpha: RGBAAlphaNumber

    public constructor(
        red: number,
        green: number,
        blue: number,
        alpha: number = RGBAColor.DEFAULT_ALPHA_VALUE,
    ) {
        super()

        this._red = this.parseNumberToComponent(red)
        this._green = this.parseNumberToComponent(green)
        this._blue = this.parseNumberToComponent(blue)
        this._alpha = this.parseNumberToAlpha(alpha)
    }

    public getRed() {
        return this._red
    }
    public getGreen() {
        return this._green
    }
    public getBlue() {
        return this._blue
    }
    public getAlpha() {
        return this._alpha
    }

    public setRed(value: number): RGBAColor {
        return new RGBAColor(
            value,
            this.getGreen(),
            this.getBlue(),
            this.getAlpha(),
        )
    }

    public setGreen(value: number): RGBAColor {
        return new RGBAColor(
            this.getRed(),
            value,
            this.getBlue(),
            this.getAlpha(),
        )
    }

    public setBlue(value: number): RGBAColor {
        return new RGBAColor(
            this.getRed(),
            this.getGreen(),
            value,
            this.getAlpha(),
        )
    }

    public setAlpha(value: number): RGBAColor {
        return new RGBAColor(
            this.getRed(),
            this.getGreen(),
            this.getBlue(),
            value,
        )
    }

    public get model(): "rgba" {
        return COLOR_MODEL.RGBA
    }

    public get isTransparent(): boolean {
        return this.getAlpha() === RGBAColor.MIN_ALPHA_VALUE
    }

    public get components(): RGBAComponents {
        return [
            this.getRed(),
            this.getGreen(),
            this.getBlue(),
            this.getAlpha()
        ]
    }

    public get normalized(): RGBAComponents {
        const normalizedColorComponents = this
            .components
            .slice(0, 3)
            .map(this.normalizeColorComponent) as [number, number, number]

        const normalizedAlpha = this.normalizeAlpha(this.getAlpha())

        return [
            ...normalizedColorComponents,
            normalizedAlpha
        ]
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

    protected normalizeColorComponent(number: number) {
        return number / RGBAColor.MAX_COMPONENT_VALUE
    }

    protected normalizeAlpha(number: number) {
        return number / RGBAColor.MAX_ALPHA_VALUE
    }
}
