import { describe, expect, test } from "vitest"
import { alphaBlendingRGB, createRGBColor, mixRGB } from "../src"

describe('operations', () => {
    describe('mix operation', () => {
        test('mix with 0 weight will return first color', () => {
            const black = createRGBColor({ red: 0, blue: 0, green: 0, alpha: 0.25 })
            const white = createRGBColor({ red: 255, blue: 255, green: 255, alpha: 0.75 })
            const result = mixRGB(black, white, 0)

            expect(result.components.red).toBe(black.components.red)
            expect(result.components.green).toBe(black.components.green)
            expect(result.components.blue).toBe(black.components.blue)
            expect(result.alpha).toBe(black.alpha)
        })

        test('mix with 1 weight will return first color', () => {
            const black = createRGBColor({ red: 0, blue: 0, green: 0, alpha: 0.25 })
            const white = createRGBColor({ red: 255, blue: 255, green: 255, alpha: 0.75 })
            const result = mixRGB(black, white, 1)

            expect(result.components.red).toBe(white.components.red)
            expect(result.components.green).toBe(white.components.green)
            expect(result.components.blue).toBe(white.components.blue)
            expect(result.alpha).toBe(white.alpha)
        })

        test('mix with 0.5 weight will return average color', () => {
            const black = createRGBColor({ red: 0, blue: 0, green: 0, alpha: 0.25 })
            const white = createRGBColor({ red: 255, blue: 255, green: 255, alpha: 0.75 })
            const result = mixRGB(black, white, 0.5)

            expect(result.components.red).toBe(128)
            expect(result.components.green).toBe(128)
            expect(result.components.blue).toBe(128)
            expect(result.alpha).toBe(0.5)
        })
    })

    describe('alpha blending', () => {
        test('alpha blending with upper solid upper color return upper', () => {
            const white = createRGBColor({ red: 255, blue: 255, green: 255, alpha: 1 })
            const black = createRGBColor({ red: 0, blue: 0, green: 0, alpha: 1 })
            const result = alphaBlendingRGB(white, black)

            expect(result.components.red).toBe(black.components.red)
            expect(result.components.green).toBe(black.components.green)
            expect(result.components.blue).toBe(black.components.blue)
        })

        test('alpha blending with upper transparent upper color return under', () => {
            const white = createRGBColor({ red: 255, blue: 255, green: 255, alpha: 1 })
            const black = createRGBColor({ red: 0, blue: 0, green: 0, alpha: 0 })
            const result = alphaBlendingRGB(white, black)

            expect(result.components.red).toBe(white.components.red)
            expect(result.components.green).toBe(white.components.green)
            expect(result.components.blue).toBe(white.components.blue)
        })

        test('alpha blending calculates correct', () => {
            const color1 = createRGBColor({ red: 255, blue: 0, green: 0, alpha: 0.5 })
            const color2 = createRGBColor({ red: 0, blue: 255, green: 0, alpha: 0.5 })
            const result1 = alphaBlendingRGB(color1, color2)

            expect(result1.components.red).toBe(Math.round(1 / 3 * 255))
            expect(result1.components.green).toBe(Math.round(0 * 255))
            expect(result1.components.blue).toBe(Math.round(2 / 3 * 255))

            const color3 = createRGBColor({ red: 255, blue: 0, green: 0, alpha: 1 })
            const color4 = createRGBColor({ red: 0, blue: 255, green: 0, alpha: 0.5 })
            const result = alphaBlendingRGB(color3, color4)

            expect(result.components.red).toBe(Math.round(1 / 2 * 255))
            expect(result.components.green).toBe(Math.round(0 * 255))
            expect(result.components.blue).toBe(Math.round(1 / 2 * 255))
        })
    })
})
