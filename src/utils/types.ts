export type AddStringPrefix<
    Prefix extends string,
    Target extends string,
> = `${Prefix}${Target}`

export type CamelCaseToSnakeCase<
    Target extends string
> = Target extends `${infer FirstWord}${infer Rest}`
    ? `${AddStringPrefix<
            FirstWord extends Capitalize<FirstWord> ? "_" : "",
            AddStringPrefix<
                Lowercase<FirstWord>,
                CamelCaseToSnakeCase<Rest>
            >
        >}`
    : Target

export type RangedNumber<
    Min extends number,
    Max = number
> = number
    & {
        min: Min,
        max: Max
    }

declare const __brand: unique symbol

type Brand<BrandType> = {
    [__brand]: BrandType
}

export type Branded<Target, BrandType> = Target & Brand<BrandType>
