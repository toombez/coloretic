import { Branded } from "../utils"
import ColorSpaceUnit from "./ColorSpaceUnit"

export default class PercentageUnit extends ColorSpaceUnit<'percentage'> {
    public getName(): "percentage" {
        return 'percentage'
    }

    public setValue(value: number): PercentageUnit {
        return new PercentageUnit(value)
    }

    public parse(value: number): Branded<number, "percentage"> {
        return this.clampParse(value)
    }

    public getMin(): 0 {
        return 0
    }

    public getMax(): 100 {
        return 100
    }
}
