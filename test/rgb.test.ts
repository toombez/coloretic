import { describe, expect, test } from "vitest"
import { createColor, createRGBColor, isRGBColor, opacify, transparentize } from "../src"

describe('rgb color', () => {
    test('rgb color components in range of [0, 255]', () => {
        const rgb = createRGBColor({ red: 1000, blue: -1000, green: 0 })

        expect(rgb.components.red).toBeGreaterThanOrEqual(0)
        expect(rgb.components.red).toBeLessThanOrEqual(255)
        expect(rgb.components.green).toBeGreaterThanOrEqual(0)
        expect(rgb.components.green).toBeLessThanOrEqual(255)
        expect(rgb.components.blue).toBeGreaterThanOrEqual(0)
        expect(rgb.components.blue).toBeLessThanOrEqual(255)
    })

    test('rgb alpha in range of [0, 1]', () => {
        const color1 = createRGBColor({ red: 0, blue: 0, green: 0, alpha: 2 })
        expect(color1.alpha).toBeGreaterThanOrEqual(0)
        expect(color1.alpha).toBeLessThanOrEqual(1)

        const color2 = createRGBColor({ red: 0, blue: 0, green: 0, alpha: -2 })
        expect(color2.alpha).toBeGreaterThanOrEqual(0)
        expect(color2.alpha).toBeLessThanOrEqual(1)

        const color3 = createRGBColor({ red: 0, blue: 0, green: 0, alpha: 0.5 })
        expect(color3.alpha).toBeGreaterThanOrEqual(0)
        expect(color3.alpha).toBeLessThanOrEqual(1)
    })

    test('isRGBColor correct defines', () => {
        const rgb = createRGBColor({ red: 0, blue: 0, green: 0 })
        expect(isRGBColor(rgb)).toBeTruthy()

        const unknownColor = createColor('RGB', { red: 0, green: 0, blue: 0 })
        expect(isRGBColor(unknownColor)).toBeTruthy()

        const uncorrectColor = createColor('RGB', {})
        expect(isRGBColor(uncorrectColor)).toBeTruthy()
    })

    test('opacify with rgb creates rgb color', () => {
        const rgb = createRGBColor({ red: 0, blue: 0, green: 0, alpha: 0.5 })
        const opacifyed = opacify(0.3, rgb)

        expect(isRGBColor(opacifyed)).toBeTruthy()
    })

    test('transparentize with rgb creates rgb color', () => {
        const rgb = createRGBColor({ red: 0, blue: 0, green: 0, alpha: 0.5 })
        const transparentized = transparentize(0.3, rgb)

        expect(isRGBColor(transparentized)).toBeTruthy()
    })

    test.todo("rgb operations")
})
