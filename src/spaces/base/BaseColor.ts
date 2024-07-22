import { clamp } from "../../utils"

export const MIN_ALPHA = 0
export const MAX_ALPHA = 1
export const DEFAULT_ALPHA = MAX_ALPHA

export default class BaseColor<T> {
    public readonly alpha: number

    public constructor(
        alpha: number = DEFAULT_ALPHA,
        public readonly colorData: T,
    ) {
        this.alpha = BaseColor.parseAlpha(alpha)
    }

    private static parseAlpha(alpha: number): number {
        return Math.round(clamp(alpha, {
            minimum: MIN_ALPHA,
            maximum: MAX_ALPHA,
        }) * 100) / 100
    }
}
