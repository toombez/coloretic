import RGBAColor from "./RGBAColor";

export default class GrayscaleRGBAColor extends RGBAColor {
    public constructor(
        value: number,
        alpha: number = GrayscaleRGBAColor.DEFAULT_ALPHA_VALUE,
    ) {
        super(value, value, value, alpha)
    }
}
