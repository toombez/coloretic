import { Branded } from "../utils"
import ColorSpaceUnit from "./ColorSpaceUnit"
import NormalUnit from "./NormalUnit"
import PercentageUnit from "./PercentageUnit"

export default class EightBitUnit extends ColorSpaceUnit<'eightBit'> {
    public getName(): "eightBit" {
        return 'eightBit'
    }

    public setValue(value: number): EightBitUnit {
        return new EightBitUnit(value)
    }

    public parse(value: number): Branded<number, "eightBit"> {
        return this.clampParse(value)
    }

    public getMin(): 0 {
        return 0
    }

    public getMax(): 255 {
        return 255
    }

    public toNormalUnit(): NormalUnit {
        return new NormalUnit(this.getValue() / this.getMax())
    }

    public toPercentageUnit(): PercentageUnit {
        return this.toNormalUnit().toPercentageUnit()
    }
}
