import { CamelCaseToSnakeCase } from "./utilityTypes"

export function camelCaseToPascalCase(string: string) {
    return string
        .replace(
            /[A-Z]/g,
            letter => `_${letter.toLowerCase()}`
        ) as CamelCaseToSnakeCase<typeof string>
}
