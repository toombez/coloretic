import BaseColor from "./BaseColor"
import COLOR_MODEL from "./ColorModel"
import { Branded, clamp } from "../utils"

type RGBComponentNumber = Branded<number, 'RGBComponent'>

type RGBComponents = [number, number, number, number]

export default class RGBColor extends BaseColor<typeof COLOR_MODEL.RGB> {
    public static readonly MAX_COMPONENT_VALUE: number = 255
    public static readonly MIN_COMPONENT_VALUE: number = 0

    private readonly _red: RGBComponentNumber
    private readonly _green: RGBComponentNumber
    private readonly _blue: RGBComponentNumber

    public constructor(
        red: number,
        green: number,
        blue: number,
        alpha: number = BaseColor.DEFAULT_ALPHA_VALUE,
    ) {
        super(alpha)

        this._red = this.parseNumberToComponent(red)
        this._green = this.parseNumberToComponent(green)
        this._blue = this.parseNumberToComponent(blue)
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

    public setRed(value: number): RGBColor {
        return new RGBColor(
            value,
            this.getGreen(),
            this.getBlue(),
            this.getAlpha(),
        )
    }

    public setGreen(value: number): RGBColor {
        return new RGBColor(
            this.getRed(),
            value,
            this.getBlue(),
            this.getAlpha(),
        )
    }

    public setBlue(value: number): RGBColor {
        return new RGBColor(
            this.getRed(),
            this.getGreen(),
            value,
            this.getAlpha(),
        )
    }

    public setAlpha(value: number): RGBColor {
        return new RGBColor(
            this.getRed(),
            this.getGreen(),
            this.getBlue(),
            value,
        )
    }

    public get model(): "rgb" {
        return COLOR_MODEL.RGB
    }

    public get components(): RGBComponents {
        return [
            this.getRed(),
            this.getGreen(),
            this.getBlue(),
            this.getAlpha()
        ]
    }

    public get normalized(): RGBComponents {
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

    protected parseNumberToComponent(number: number): RGBComponentNumber {
        return clamp(number, {
            max: RGBColor.MAX_COMPONENT_VALUE,
            min: RGBColor.MIN_COMPONENT_VALUE,
        }) as RGBComponentNumber
    }

    protected normalizeColorComponent(number: number) {
        return number / RGBColor.MAX_COMPONENT_VALUE
    }

    protected normalizeAlpha(number: number) {
        return number / RGBColor.MAX_ALPHA_VALUE
    }
}
