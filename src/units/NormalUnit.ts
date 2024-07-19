import { Branded, clamp } from "../utils"
import ColorSpaceUnit from "./ColorSpaceUnit"

export default class NormalUnit extends ColorSpaceUnit<'normal'> {
    public getName(): "normal" {
        return 'normal'
    }

    public setValue(value: number): ColorSpaceUnit<"normal"> {
        return new NormalUnit(value)
    }

    public parse(value: number): Branded<number, "normal"> {
        return clamp(value, {
            min: this.getMin(),
            max: this.getMax(),
        }) as Branded<number, 'normal'>
    }

    public getMin(): 0 {
        return 0
    }

    public getMax(): 1 {
        return 1
    }
}
