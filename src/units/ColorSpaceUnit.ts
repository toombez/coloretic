import { Branded, clamp, modulo } from "../utils"

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

    protected clampParse(value: number): Branded<number, Name> {
        return clamp(value, {
            min: this.getMin(),
            max: this.getMax(),
        }) as Branded<number, Name>
    }

    protected moduloParse(value: number): Branded<number, Name> {
        const min = this.getMin()
        const max = this.getMax()

        return modulo(value, {
            min: Number.isFinite(min)
                ? min
                : Number.MIN_SAFE_INTEGER,
            max: Number.isFinite(max)
                ? (max - 1)
                : Number.MAX_SAFE_INTEGER,
        }) as Branded<number, Name>
    }


    private _value: Branded<number, Name>
}
