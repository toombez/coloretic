import { describe, expect, test } from "vitest"
import { createColor, createHSLColor, isHSLColor } from "../src"

describe('hsl color', () => {
    test('hsl color tag is "HSL"', () => {
        const hsl = createHSLColor(0, 0, 0)

        expect(hsl._tag).toBe('HSL')
    })

    test('hsl color hue component in range [0, 360)', () => {
        const hsl1 = createHSLColor(0, 0, 0)
        const hsl2 = createHSLColor(360, 0, 0)
        const hsl3 = createHSLColor(361, 0, 0)
        const hsl4 = createHSLColor(721, 0, 0)
        const hsl5 = createHSLColor(-1, 0, 0)
        const hsl6 = createHSLColor(-361, 0, 0)

        expect(hsl1.data.hue).toBe(0)
        expect(hsl2.data.hue).toBe(0)
        expect(hsl3.data.hue).toBe(1)
        expect(hsl4.data.hue).toBe(1)
        expect(hsl5.data.hue).toBe(359)
        expect(hsl6.data.hue).toBe(359)
    })

    test('checking is hsl correct', () => {
        const hslColor = createHSLColor(0, 0, 0)
        const objectHslColor = createColor('HSL', {
            hue: 0,
            saturation: 0,
            lightness: 0,
        })

        expect(isHSLColor(hslColor)).toBeTruthy()
        expect(isHSLColor(objectHslColor)).toBeTruthy()
    })
})
