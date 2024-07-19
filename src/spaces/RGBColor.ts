import { EightBitUnit } from "../units"
import BaseColorSpace, { COLOR_SPACE } from "./BaseColorSpace"
import HSLColor from "./HSLColor"

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

    public toHSLColor(): HSLColor {
        const r = this._red.toNormalUnit().getValue()
        const g = this._green.toNormalUnit().getValue()
        const b = this._blue.toNormalUnit().getValue()

        const maxVal = Math.max(r, g, b)
        const minVal = Math.min(r, g, b)
        let h: number, s: number
        const l = (maxVal + minVal) / 2

        if (maxVal === minVal) {
            h = s = 0 // achromatic
        } else {
            const delta = maxVal - minVal;
            s = l > 0.5 ? delta / (2 - maxVal - minVal) : delta / (maxVal + minVal)

            switch (maxVal) {
                case r:
                    h = (g - b) / delta + (g < b ? 6 : 0)
                    break
                case g:
                    h = (b - r) / delta + 2
                    break
                default:
                    h = (r - g) / delta + 4
            }
            h /= 6
        }

        return new HSLColor(h * 360, s * 100, l * 100, this.getAlpha())
    }

    private _red: EightBitUnit
    private _green: EightBitUnit
    private _blue: EightBitUnit
}
