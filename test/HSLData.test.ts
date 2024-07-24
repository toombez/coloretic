import { describe, expect, test } from "vitest"
import { HSLData } from "../src"

describe('hsl data', () => {
    test('components in valid ranges', () => {
        const hsl1 = new HSLData(365, 200, -100)

        expect(hsl1.hue).toBe(5)
        expect(hsl1.saturation).toBe(100)
        expect(hsl1.lightness).toBe(0)

        const hsl2 = new HSLData(-5, -100, 200)

        expect(hsl2.hue).toBe(355)
        expect(hsl2.saturation).toBe(0)
        expect(hsl2.lightness).toBe(100)
    })

    test('round values while creating', () => {
        const hsl = new HSLData(0.5, 50.5, 50.5)

        expect(hsl.hue).toBe(1)
        expect(hsl.saturation).toBe(51)
        expect(hsl.lightness).toBe(51)
    })
})
