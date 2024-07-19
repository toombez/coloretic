import { Branded } from "../utils"
import ColorSpaceUnit from "./ColorSpaceUnit"
import NormalUnit from "./NormalUnit"
import PercentageUnit from "./PercentageUnit"

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
        return this.moduloParse(value)
    }

    public getMin(): 0 {
        return 0
    }

    public getMax(): 360 {
        return DegreesUnit.DEGREES_PER_PI * 2 as 360
    }

    public toNormalUnit(): NormalUnit {
        return new NormalUnit(this.getValue() / this.getMax())
    }

    public toPercentageUnit(): PercentageUnit {
        return this.toNormalUnit().toPercentageUnit()
    }

    protected static radiansToDegrees(radians: number): number {
        return radians / Math.PI * DegreesUnit.DEGREES_PER_PI
    }

    protected static degreesToRadians(degrees: number): number {
        return degrees / DegreesUnit.DEGREES_PER_PI * Math.PI
    }
}
