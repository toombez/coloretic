import BaseColor from "../base/BaseColor"
import HSLData from "./HSLData"

export default class HSLColor extends BaseColor<HSLData> {
    public constructor(
        hue: number,
        saturation: number,
        lightness: number,
        alpha?: number,
    ) {
        super(alpha, new HSLData(hue, saturation, lightness))
    }
}
