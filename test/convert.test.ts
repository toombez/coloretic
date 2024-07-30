import { describe, expect, test } from "vitest"
import { createHSLColor, createRGBColor, HSL2RGB, isHSLColor, isRGBColor, RGB2HSL } from "../src"

describe('convert', () => {
    describe('rgb to hsl', () => {
        test('result is hsl', () => {
            const white = createRGBColor({ blue: 255, green: 255, red: 255 })
            const hsl = RGB2HSL(white)

            expect(isHSLColor(hsl)).toBeTruthy()
        })

        test('converts correct', () => {
            const white = createRGBColor({ blue: 255, green: 255, red: 255 })
            const whiteHSL = RGB2HSL(white)
            expect(whiteHSL.components.hue).toBe(0)
            expect(whiteHSL.components.saturation).toBe(0)
            expect(whiteHSL.components.lightness).toBe(100)

            const black = createRGBColor({ blue: 0, green: 0, red: 0 })
            const blackHSL = RGB2HSL(black)
            expect(blackHSL.components.hue).toBe(0)
            expect(blackHSL.components.saturation).toBe(0)
            expect(blackHSL.components.lightness).toBe(0)

            const green = createRGBColor({ blue: 0, green: 255, red: 0 })
            const greenHSL = RGB2HSL(green)
            expect(greenHSL.components.hue).toBe(120)
            expect(greenHSL.components.saturation).toBe(100)
            expect(greenHSL.components.lightness).toBe(50)

            const red = createRGBColor({ blue: 0, green: 0, red: 255 })
            const redHSL = RGB2HSL(red)
            expect(redHSL.components.hue).toBe(0)
            expect(redHSL.components.saturation).toBe(100)
            expect(redHSL.components.lightness).toBe(50)

            const blue = createRGBColor({ blue: 255, green: 0, red: 0 })
            const blueHSL = RGB2HSL(blue)
            expect(blueHSL.components.hue).toBe(240)
            expect(blueHSL.components.saturation).toBe(100)
            expect(blueHSL.components.lightness).toBe(50)

            const color = createRGBColor({ blue: 32, green: 96, red: 32 })
            const colorHSL = RGB2HSL(color)
            expect(colorHSL.components.hue).toBe(120)
            expect(colorHSL.components.saturation).toBe(50)
            expect(colorHSL.components.lightness).toBe(25)
        })
    })

    describe('hsl to rgb', () => {
        test('result is rgb', () => {
            const hsl = createHSLColor({ hue: 0, lightness: 100, saturation: 0 })
            const rgb = HSL2RGB(hsl)

            expect(isRGBColor(rgb)).toBeTruthy()
        })

        test('converts correct', () => {
            const white = createHSLColor({ hue: 0, lightness: 100, saturation: 0 })
            const whiteRgb = HSL2RGB(white)
            expect(whiteRgb.components.red).toBe(255)
            expect(whiteRgb.components.green).toBe(255)
            expect(whiteRgb.components.blue).toBe(255)

            const black = createHSLColor({ hue: 0, lightness: 0, saturation: 0 })
            const blackRgb = HSL2RGB(black)
            expect(blackRgb.components.red).toBe(0)
            expect(blackRgb.components.green).toBe(0)
            expect(blackRgb.components.blue).toBe(0)

            const red = createHSLColor({ hue: 0, lightness: 50, saturation: 100 })
            const redRgb = HSL2RGB(red)
            expect(redRgb.components.red).toBe(255)
            expect(redRgb.components.green).toBe(0)
            expect(redRgb.components.blue).toBe(0)

            const green = createHSLColor({ hue: 120, lightness: 50, saturation: 100 })
            const greenRgb = HSL2RGB(green)
            expect(greenRgb.components.red).toBe(0)
            expect(greenRgb.components.green).toBe(255)
            expect(greenRgb.components.blue).toBe(0)

            const blue = createHSLColor({ hue: 240, lightness: 50, saturation: 100 })
            const blueRgb = HSL2RGB(blue)
            expect(blueRgb.components.red).toBe(0)
            expect(blueRgb.components.green).toBe(0)
            expect(blueRgb.components.blue).toBe(255)

            const color = createHSLColor({ hue: 120, lightness: 25, saturation: 50 })
            const colorRgb = HSL2RGB(color)
            expect(colorRgb.components.red).toBe(32)
            expect(colorRgb.components.green).toBe(96)
            expect(colorRgb.components.blue).toBe(32)
        })
    })
})
