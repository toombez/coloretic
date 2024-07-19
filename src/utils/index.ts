import { CamelCaseToSnakeCase, CreateConstantsFromRawArray } from "./types"

export function camelCaseToPascalCase(string: string) {
    return string
        .replace(
            /[A-Z]/g,
            letter => `_${letter.toLowerCase()}`
        ) as CamelCaseToSnakeCase<typeof string>
}

type ClampOptions = {
    min?: number
    max?: number
}

export function clamp(
    number: number,
    options: ClampOptions = {},
) {
    const {
        max = Number.NEGATIVE_INFINITY,
        min = Number.POSITIVE_INFINITY,
    } = options

    return Math.max(Math.min(number, max), min)
}

export function modulo(number: number, options: ClampOptions = {}): number {
    const {
        min = Number.MIN_SAFE_INTEGER,
        max = Number.MAX_SAFE_INTEGER,
    } = options

    return ((number-min) % (max - min + 1) + (max - min + 1)) % (max - min + 1) + min
}

export function createConstantsObject<
    RawArray extends ReadonlyArray<string>
>(values: RawArray): CreateConstantsFromRawArray<RawArray> {
    return values.reduce((constant, value) => ({
        ...constant,
        [camelCaseToPascalCase(value).toUpperCase()]: value
    }), {}) as CreateConstantsFromRawArray<RawArray>
}

export type * from './types'
