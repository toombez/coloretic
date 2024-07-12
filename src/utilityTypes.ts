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
