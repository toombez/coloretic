import { clamp } from "../utils"

export const MIN_ALPHA = 0
export const MAX_ALPHA = 1
export const DEFAULT_ALPHA = MAX_ALPHA

type ColorComponents = Record<string, number>

export type Color<
    T extends string,
    C extends ColorComponents
> = Readonly<{
    _tag: T
    components: Readonly<C>
    alpha: number
}>

export const createColor = <
    T extends string,
    C extends ColorComponents
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

export type ColorFactory<
    T extends string,
    C extends ColorComponents
> = (data: C & { alpha?: number }) => Color<T, C>

export type ColorComponentsValidators<
    C extends ColorComponents
> = {
    [K in keyof C]: (number: number) => number
}

export const createColorFactory = <
    T extends string,
    C extends ColorComponents
> (
    tag: T,
    componentValidators: ColorComponentsValidators<C>
): ColorFactory<T, C> => ({
    alpha,
    ...rawComponents
}) =>
    createColor(
        tag,
        Object
            .entries(componentValidators)
            .reduce((components, [component, validator]) => ({
                ...components,
                [component]: validator(rawComponents[component])
            }), {} as C),
        alpha,
    )
