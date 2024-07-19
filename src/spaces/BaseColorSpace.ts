import { NormalUnit } from "../units"

import { createConstantsObject } from "../utils"

const RAW_COLOR_SPACES = [
    'rgb',
    'hsl',
] as const

export const COLOR_SPACE = createConstantsObject(RAW_COLOR_SPACES)

export type ColorSpace = typeof COLOR_SPACE[keyof typeof COLOR_SPACE]

export default abstract class BaseColorSpace<Name extends string> {
    public static DEFAULT_ALPHA = 1

    public constructor(alpha: number = BaseColorSpace.DEFAULT_ALPHA) {
        this._alpha = new NormalUnit(alpha)
    }

    public getAlpha(): number {
        return this._alpha.getValue()
    }

    public isTransparent(): boolean {
        return this._alpha.getValue() !== this._alpha.getMin()
    }

    public abstract getComponents(): number[]
    public abstract getNormalized(): number[]
    public abstract setAlpha(alpha: number): BaseColorSpace<Name>

    public abstract getName(): Name

    private _alpha: NormalUnit
}
