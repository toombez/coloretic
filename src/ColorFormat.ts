const RAW_COLOR_FORMATS = [
    'rgb',
] as const

type ColorFormatConstant = {
    [Format in ColorFormat as Uppercase<Format>]: Format
}

const COLOR_FORMAT = RAW_COLOR_FORMATS
    .reduce((constant, format) => ({
        ...constant,
        [format.toUpperCase()]: format
    }), {}) as ColorFormatConstant

export type ColorFormat = typeof RAW_COLOR_FORMATS[number]

export default COLOR_FORMAT
