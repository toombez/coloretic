import { Branded, modulo } from "../utils"
import ColorSpaceUnit from "./ColorSpaceUnit"

export default class DegreesUnit extends ColorSpaceUnit<'degrees'> {
    public static DEGREES_PER_PI = 180

    public getName(): "degrees" {
        return 'degrees'
    }

    public setValue(value: number): DegreesUnit {
        return new DegreesUnit(value)
    }

    public setRadians(radians: number): DegreesUnit {
        return new DegreesUnit(DegreesUnit.radiansToDegrees(radians))
    }

    public getRadians() {
        return DegreesUnit.degreesToRadians(this.getValue())
    }

    public parse(value: number): Branded<number, "degrees"> {
        return modulo(value, {
            min: this.getMin(),
            max: this.getMax() - 1,
        }) as Branded<number, 'degrees'>
    }

    public getMin(): 0 {
        return 0
    }

    public getMax(): 360 {
        return DegreesUnit.DEGREES_PER_PI * 2 as 360
    }

    protected static radiansToDegrees(radians: number): number {
        return radians / Math.PI * DegreesUnit.DEGREES_PER_PI
    }

    protected static degreesToRadians(degrees: number): number {
        return degrees / DegreesUnit.DEGREES_PER_PI * Math.PI
    }
}
