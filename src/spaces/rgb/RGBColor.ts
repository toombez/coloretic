import BaseColor from "../base/BaseColor"
import RGBData from "./RGBData"

export default class RGBColor extends BaseColor<RGBData> {
    public constructor(
        red: number,
        green: number,
        blue: number,
        alpha?: number,
    ) {
        super(alpha, new RGBData(red, green, blue))
    }
}
