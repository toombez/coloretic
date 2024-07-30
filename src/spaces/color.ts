import { clamp } from "../utils"

export const MIN_ALPHA = 0
export const MAX_ALPHA = 1
export const DEFAULT_ALPHA = MAX_ALPHA

export type Color<
    T extends string,
    C extends Record<string, number>
> = Readonly<{
    _tag: T
    components: Readonly<C>
    alpha: number
}>

export const createColor = <
    T extends string,
    C extends Record<string, number>
>(
    tag: T,
    components: C,
    alpha: number = DEFAULT_ALPHA,
): Color<T, C> => Object.freeze({
    _tag: tag,
    alpha: Math.round(clamp(alpha, {
        minimum: MIN_ALPHA,
        maximum: MAX_ALPHA,
    }) * 100) / 100,
    components: Object.freeze(Object.assign({}, components)),
})
