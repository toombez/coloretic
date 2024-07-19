import { EightBitUnit } from "../units"
import BaseColorSpace, { COLOR_SPACE } from "./BaseColorSpace"

export default class RGBColor extends BaseColorSpace<typeof COLOR_SPACE.RGB> {
    public getName(): "rgb" {
        return 'rgb'
    }

    public constructor(
        red: number,
        green: number,
        blue: number,
        alpha: number = BaseColorSpace.DEFAULT_ALPHA,
    ) {
        super(alpha)

        this._red = new EightBitUnit(red)
        this._green = new EightBitUnit(green)
        this._blue = new EightBitUnit(blue)
    }

    public getRed(): number {
        return this._red.getValue()
    }

    public getGreen(): number {
        return this._green.getValue()
    }

    public getBlue(): number {
        return this._blue.getValue()
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

    public getComponents(): [number, number, number] {
        return [
            this._red.getValue(),
            this._green.getValue(),
            this._blue.getValue(),
        ]
    }

    public getNormalized(): [number, number, number] {
        return [
            this._red.toNormalUnit().getValue(),
            this._green.toNormalUnit().getValue(),
            this._blue.toNormalUnit().getValue(),
        ]
    }

    private _red: EightBitUnit
    private _green: EightBitUnit
    private _blue: EightBitUnit
}
