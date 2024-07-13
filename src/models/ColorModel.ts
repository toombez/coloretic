import { CamelCaseToSnakeCase, camelCaseToPascalCase } from "../utils"

const RAW_COLOR_MODEL = [
    'rgb',
] as const

type ColorModelConstant = {
    [
        Model in ColorModel as Uppercase<CamelCaseToSnakeCase<Model>>
    ]: Model
}

const COLOR_MODEL = RAW_COLOR_MODEL
    .reduce((constant, model) => ({
        ...constant,
        [camelCaseToPascalCase(model).toUpperCase()]: model
    }), {}) as ColorModelConstant

export type ColorModel = typeof RAW_COLOR_MODEL[number]

export default COLOR_MODEL
