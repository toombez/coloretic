import { clamp } from "../utils"

/**
 * The minimal value of the alpha channel.
 */
export const MIN_ALPHA = 0

/**
 * The maximal value of the alpha channel.
 */
export const MAX_ALPHA = 1

/**
 * The default value of the alpha channel.
 */
export const DEFAULT_ALPHA = MAX_ALPHA

type ColorComponents = Record<string, number>

/**
 * The generic type for storing color information.
 *
 * @template T - Color space tag.
 * @template C - Color space components.
 */
export type Color<
    T extends string,
    C extends ColorComponents
> = Readonly<{
    _tag: T
    components: Readonly<C>
    alpha: number
}>

/**
 * Create color.
 *
 * @param tag - Color space tag.
 * @param components - Color space components object.
 * @param alpha - Alpha channel value.
 * @returns Immutable color object.
 */
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

export type ColorComponentsFromValidators<
    V extends ColorComponentsValidators<ColorComponents>
> = {
    [C in keyof V]: number
}

/**
 * Create color factory.
 *
 * @param tag - Color space tag.
 * @param componentValidators - Validators for color space components.
 * @returns Factory for creating same type of colors.
 */
export const createColorFactory = <
    T extends string,
    V extends ColorComponentsValidators<ColorComponents>
> (
    tag: T,
    componentValidators: V
): ColorFactory<T, ColorComponentsFromValidators<V>> => ({
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
            }), {} as ColorComponentsFromValidators<V>),
        alpha,
    )

/**
 * Generic modify color.
 *
 * @param data - Components and alpha channel for modify.
 * @param color - Target color.
 * @param colorFactory - Factory for creating color.
 * @returns Modifyed color based on passed data.
 */
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

/**
 * Increase value to alpha channel.
 *
 * @param amount - Amount to add.
 * @param color - Target color.
 * @returns New color with increased alpha.
 */
export const opacify = <
    T extends string,
    C extends Record<string, number>
>(amount: number, color: Color<T, C>): Color<T, C> => modifyColor({
    alpha: color.alpha + amount,
    ...color.components,
}, color)

/**
 * Decrease value from alpha channel.
 *
 * @param amount - Amount to decrease.
 * @param color - Target color.
 * @returns New color with decreased alpha.
 */
export const transparentize = <
    T extends string,
    C extends Record<string, number>
>(amount: number, color: Color<T, C>): Color<T, C> => opacify(-amount, color)

/**
 * Create `set`, `increase`, `decrease` operations for color space component.
 *
 * @param key - Component name.
 * @param colorFactory - Factory for creating color.
 * @returns Object with operations for modify color.
 */
export const createColorComponentOperations = <
    T extends string,
    C extends Record<string, number>
>(key: keyof C, colorFactory: ColorFactory<T, C>) => {
    const set = (amount: number, color: Color<T, C>): Color<T, C> =>
        modifyColor({ [key]: amount } as Partial<C>, color, colorFactory)

    const increase = (amount: number, color: Color<T, C>): Color<T, C> =>
        set(color.components[key] + amount, color)

    const decrease = (amount: number, color: Color<T, C>): Color<T, C> =>
        increase(-amount, color)

    return {
        set,
        increase,
        decrease,
    }
}
