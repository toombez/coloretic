import { describe, expect, test } from "vitest"
import { createColor, createRGBColor, isRGBColor } from "../src"

describe('rgb color', () => {
    test('rgb color tag is "RGB"', () => {
        const rgb = createRGBColor(0, 0, 0)

        expect(rgb._tag).toBe('RGB')
    })

    test('rgb color red component in range [0, 255]', () => {
        const fullRedRgb = createRGBColor(300, 0, 0)
        const zeroRedRgb = createRGBColor(-320, 0, 0)
        const semiRedRgb = createRGBColor(128, 0, 0)

        expect(fullRedRgb.data.red).toBe(255)
        expect(zeroRedRgb.data.red).toBe(0)
        expect(semiRedRgb.data.red >= 0).toBeTruthy()
        expect(semiRedRgb.data.red <= 255).toBeTruthy()
    })

    test('rgb color green component in range [0, 255]', () => {
        const fullGreenRgb = createRGBColor(0, 300, 0)
        const zeroGreenRgb = createRGBColor(0, -320, 0)
        const semiGreenRgb = createRGBColor(0, 128, 0)

        expect(fullGreenRgb.data.green).toBe(255)
        expect(zeroGreenRgb.data.green).toBe(0)
        expect(semiGreenRgb.data.green >= 0).toBeTruthy()
        expect(semiGreenRgb.data.green <= 255).toBeTruthy()
    })

    test('rgb color blue component in range [0, 255]', () => {
        const fullBlueRgb = createRGBColor(0, 0, 300)
        const zeroBlueRgb = createRGBColor(0, 0, -320)
        const semiBlueRgb = createRGBColor(0, 0, 128)

        expect(fullBlueRgb.data.blue).toBe(255)
        expect(zeroBlueRgb.data.blue).toBe(0)
        expect(semiBlueRgb.data.blue >= 0).toBeTruthy()
        expect(semiBlueRgb.data.blue <= 255).toBeTruthy()
    })

    test('checking is rgb correct', () => {
        const rgbColor = createRGBColor(255, 0, 0)
        const objectRgbColor = createColor('RGB', {
            red: 0,
            green: 0,
            blue: 0,
        })

        expect(isRGBColor(rgbColor)).toBeTruthy()
        expect(isRGBColor(objectRgbColor)).toBeTruthy()
    })
})
