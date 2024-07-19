import { Branded } from "../utils"

export default abstract class ColorSpaceUnit<
    Name extends string
> {
    public abstract getName(): Name

    public constructor(value: number) {
        this._value = this.parse(value)
    }

    public getValue(): Branded<number, Name> {
        return this._value
    }

    public isHaveUpperBound(): boolean {
        return Number.isFinite(this.getMax())
    }

    public isHaveLowerBound(): boolean {
        return Number.isFinite(this.getMin())
    }

    public abstract setValue(value: number): ColorSpaceUnit<Name>
    public abstract parse(value: number): Branded<number, Name>

    public abstract getMin(): number
    public abstract getMax(): number

    private _value: Branded<number, Name>
}
