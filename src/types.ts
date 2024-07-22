export type RawRGBArrayWithoutAlpha = [number, number, number]
export type RawRGBArrayWithAlpha = [number, number, number, number]

export type RawRGBArray = RawRGBArrayWithoutAlpha | RawRGBArrayWithAlpha

export type RawRGBObject = {
    red: number
    green: number
    blue: number
    alpha?: number
}

export type RawHSLArrayWithoutAlpha = [number, number, number]
export type RawHSLArrayWithAlpha = [number, number, number, number]

export type RawHSLArray = RawHSLArrayWithoutAlpha | RawHSLArrayWithAlpha

export type RawHSLObject = {
    hue: number
    saturation: number
    lightness: number
    alpha: number
}
