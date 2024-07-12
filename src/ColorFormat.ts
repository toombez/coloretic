import { CamelCaseToSnakeCase } from "./utilityTypes"
import { camelCaseToPascalCase } from "./utils"

const RAW_COLOR_FORMATS = [
    'rgb',
    'loremIpsum'
] as const

type ColorFormatConstant = {
    [
        Format in ColorFormat as Uppercase<CamelCaseToSnakeCase<Format>>
    ]: Format
}

const COLOR_FORMAT = RAW_COLOR_FORMATS
    .reduce((constant, format) => ({
        ...constant,
        [camelCaseToPascalCase(format).toUpperCase()]: format
    }), {}) as ColorFormatConstant

export type ColorFormat = typeof RAW_COLOR_FORMATS[number]

export default COLOR_FORMAT
