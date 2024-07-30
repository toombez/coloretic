import { describe, expect, test } from "vitest"
import { createColor, createHSLColor, isHSLColor, opacify, transparentize } from "../src"

describe('hsl color', () => {
    test('hsl color components in range of [0, 255]', () => {
        const hsl = createHSLColor({
            hue: 1000,
            saturation: -1000,
            lightness: 0,
        })

        expect(hsl.components.hue).toBeGreaterThanOrEqual(0)
        expect(hsl.components.hue).toBeLessThanOrEqual(359)
        expect(hsl.components.saturation).toBeGreaterThanOrEqual(0)
        expect(hsl.components.saturation).toBeLessThanOrEqual(100)
        expect(hsl.components.lightness).toBeGreaterThanOrEqual(0)
        expect(hsl.components.lightness).toBeLessThanOrEqual(100)
    })

    test('hsl alpha in range of [0, 1]', () => {
        const color1 = createHSLColor({ hue: 0, saturation: 0, lightness: 0, alpha: 2 })
        expect(color1.alpha).toBeGreaterThanOrEqual(0)
        expect(color1.alpha).toBeLessThanOrEqual(1)

        const color2 = createHSLColor({ hue: 0, saturation: 0, lightness: 0, alpha: -2 })
        expect(color2.alpha).toBeGreaterThanOrEqual(0)
        expect(color2.alpha).toBeLessThanOrEqual(1)

        const color3 = createHSLColor({ hue: 0, saturation: 0, lightness: 0, alpha: 0.5 })
        expect(color3.alpha).toBeGreaterThanOrEqual(0)
        expect(color3.alpha).toBeLessThanOrEqual(1)
    })

    test('isRGBColor correct defines', () => {
        const hsl = createHSLColor({ hue: 0, saturation: 0, lightness: 0 })
        expect(isHSLColor(hsl)).toBeTruthy()

        const unknownColor = createColor('HSL', { hue: 0, saturation: 0, lightness: 0 })
        expect(isHSLColor(unknownColor)).toBeTruthy()

        const uncorrectColor = createColor('HSL', {})
        expect(isHSLColor(uncorrectColor)).toBeTruthy()
    })

    test('opacify with hsl creates hsl color', () => {
        const hsl = createHSLColor({ hue: 0, saturation: 0, lightness: 0, alpha: 0.5 })
        const opacifyed = opacify(0.3, hsl)

        expect(isHSLColor(opacifyed)).toBeTruthy()
    })

    test('transparentize with hsl creates hsl color', () => {
        const hsl = createHSLColor({ hue: 0, saturation: 0, lightness: 0, alpha: 0.5 })
        const transparentized = transparentize(0.3, hsl)

        expect(isHSLColor(transparentized)).toBeTruthy()
    })

    test.todo("hsl operations")
})
