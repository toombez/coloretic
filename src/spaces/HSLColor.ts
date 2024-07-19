import { DegreesUnit, PercentageUnit } from "../units"
import BaseColorSpace, { COLOR_SPACE } from "./BaseColorSpace"

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
        alpha: number = 1,
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
            this._hue.getValue(),
            this._saturation.getValue(),
            this._lightness.getValue(),
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
}
