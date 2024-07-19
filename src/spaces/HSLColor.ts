import { DegreesUnit, PercentageUnit } from "../units"
import BaseColorSpace, { COLOR_SPACE } from "./BaseColorSpace"
import RGBColor from "./RGBColor"

export default class HSLColor extends BaseColorSpace<typeof COLOR_SPACE.HSL> {
    public getName(): 'hsl' {
        return 'hsl'
    }

    private _hue: DegreesUnit
    private _saturation: PercentageUnit
    private _lightness: PercentageUnit

    public constructor(
        hue: number,
        saturation: number,
        lightness: number,
        alpha: number = BaseColorSpace.DEFAULT_ALPHA,
    ) {
        super(alpha)

        this._hue = new DegreesUnit(hue)
        this._saturation = new PercentageUnit(saturation)
        this._lightness = new PercentageUnit(lightness)
    }

    public getComponents(): [number, number, number] {
        return [
            this.getHue(),
            this.getSaturation(),
            this.getLightness(),
        ]
    }

    public getNormalized(): [number, number, number] {
        return [
            this._hue.toNormalUnit().getValue(),
            this._saturation.toNormalUnit().getValue(),
            this._lightness.toNormalUnit().getValue(),
        ]
    }

    public getHue(): number {
        return this._hue.getValue()
    }

    public getSaturation(): number {
        return this._saturation.getValue()
    }

    public getLightness(): number {
        return this._lightness.getValue()
    }

    public setHue(hue: number): HSLColor {
        return new HSLColor(
            hue,
            this.getSaturation(),
            this.getLightness(),
            this.getAlpha(),
        )
    }

    public setSaturation(saturation: number): HSLColor {
        return new HSLColor(
            this.getHue(),
            saturation,
            this.getLightness(),
            this.getAlpha(),
        )
    }

    public setLightness(lightness: number): HSLColor {
        return new HSLColor(
            this.getHue(),
            this.getSaturation(),
            lightness,
            this.getAlpha(),
        )
    }

    public setAlpha(alpha: number): HSLColor {
        return new HSLColor(
            this.getHue(),
            this.getSaturation(),
            this.getLightness(),
            alpha,
        )
    }

    public toRGBColor(): RGBColor {
        const H = this._hue.toNormalUnit().getValue()
        const S = this._saturation.toNormalUnit().getValue()
        const L = this._lightness.toNormalUnit().getValue()

        let r: number, g: number, b: number

        if (S === 0) {
            r = g = b = L // achromatic
        } else {
            const q = L < 0.5 ? L * (1 + S) : L + S - L * S
            const p = 2 * L - q
            r = this.hueToRgb(p, q, H + 1/3)
            g = this.hueToRgb(p, q, H)
            b = this.hueToRgb(p, q, H - 1/3)
        }

        return new RGBColor(
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255),
            this.getAlpha(),
        )
    }

    protected hueToRgb(p: number, q: number, t: number): number {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
    }
}
