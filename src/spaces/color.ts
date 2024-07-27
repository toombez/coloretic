import { clamp } from "../utils"

export const MIN_ALPHA = 0
export const MAX_ALPHA = 1
export const DEFAULT_ALPHA = MAX_ALPHA

export type Color<
    Tag extends string,
    Data extends Record<string, unknown>,
> = Readonly<{
    _tag: Tag
    data: Readonly<Data>
    alpha: number
}>

export const createColor = <
    Tag extends string,
    Data extends Record<string, unknown>,
>(
    _tag: Tag,
    data: Data,
    alpha: number = DEFAULT_ALPHA,
): Color<Tag, Data> => Object.freeze({
    _tag,
    alpha: Math.round(clamp(alpha, {
        minimum: MIN_ALPHA,
        maximum: MAX_ALPHA,
    }) * 100) / 100,
    data: Object.freeze(data),
})
