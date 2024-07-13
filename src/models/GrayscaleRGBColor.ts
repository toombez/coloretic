import RGBAColor from "./RGBColor"

export default class GrayscaleRGBColor extends RGBAColor {
    public constructor(
        value: number,
        alpha: number = GrayscaleRGBColor.DEFAULT_ALPHA_VALUE,
    ) {
        super(value, value, value, alpha)
    }

    public setAlpha(value: number): GrayscaleRGBColor {
        return new GrayscaleRGBColor(
            this.getAlpha(),
            value,
        )
    }
}
