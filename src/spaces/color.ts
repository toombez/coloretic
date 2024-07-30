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

export const modifyColor = <
    T extends string,
    C extends Record<string, number>
>(
    data: Partial<C & { alpha?: number }>,
    color: Color<T, C>,
    colorFactory: ColorFactory<T, C> = ({ alpha, ...components }) =>
        createColor(color._tag, components as C, alpha)
): Color<T, C> => {
    const newData = Object
        .entries(color.components)
        .reduce((newData, [key, value]) => ({
            ...newData,
            [key]: data[key] ?? value
        }), { alpha: data.alpha || color.alpha } as C & { alpha?: number })

    return colorFactory(newData)
}

export const opacify = <
    T extends string,
    C extends Record<string, number>
>(amount: number, color: Color<T, C>): Color<T, C> => modifyColor({
    alpha: color.alpha + amount,
    ...color.components,
}, color)

export const transparentize = <
    T extends string,
    C extends Record<string, number>
>(amount: number, color: Color<T, C>): Color<T, C> => opacify(-amount, color)

export const createColorComponentOperations = <
    T extends string,
    C extends Record<string, number>
>(key: keyof C, colorFactory: ColorFactory<T, C>) => {
    const set = (amount: number, color: Color<T, C>): Color<T, C> =>
        modifyColor({ [key]: amount } as Partial<C>, color, colorFactory)

    const add = (amount: number, color: Color<T, C>): Color<T, C> =>
        set(color.components[key] + amount, color)

    const remove = (amount: number, color: Color<T, C>): Color<T, C> =>
        add(-amount, color)

    return {
        set,
        add,
        remove,
    }
}
