import { Branded } from "../utils"
import ColorSpaceUnit from "./ColorSpaceUnit"

export default class NormalUnit extends ColorSpaceUnit<'normal'> {
    public getName(): "normal" {
        return 'normal'
    }

    public setValue(value: number): NormalUnit {
        return new NormalUnit(value)
    }

    public parse(value: number): Branded<number, "normal"> {
        return this.clampParse(value)
    }

    public getMin(): 0 {
        return 0
    }

    public getMax(): 1 {
        return 1
    }
}
