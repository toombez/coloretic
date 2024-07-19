import { Branded } from "../utils"
import ColorSpaceUnit from "./ColorSpaceUnit"

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
}
