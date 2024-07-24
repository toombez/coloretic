import { describe, expect, test } from "vitest"
import { BaseColor, castHSLFromBaseColor, copyHSL, copyHSLWithModify, createHSLFromArray, createHSLFromObject, createHSLFromRGB, HSLColor, RGBColor } from "../src"

describe('hsl color', () => {
    describe('creating hsl color', () => {
        test('create hsl from array', () => {
            const hsl = createHSLFromArray([360, 100, 100, 1])

            expect(hsl.colorData.hue).toBe(0)
            expect(hsl.colorData.saturation).toBe(100)
            expect(hsl.colorData.lightness).toBe(100)
        })

        test('create hsl from object', () => {
            const hsl = createHSLFromObject({
                hue: 0,
                saturation: 100,
                lightness: 100,
            })

            expect(hsl.colorData.hue).toBe(0)
            expect(hsl.colorData.saturation).toBe(100)
            expect(hsl.colorData.lightness).toBe(100)
        })

        test('create hsl from rgb', () => {
            const rgb1 = new RGBColor(255, 255, 255)
            const hsl1 = createHSLFromRGB(rgb1)

            expect(hsl1.colorData.hue).toBe(0)
            expect(hsl1.colorData.saturation).toBe(0)
            expect(hsl1.colorData.lightness).toBe(100)

            const rgb2 = new RGBColor(0, 0, 0)
            const hsl2 = createHSLFromRGB(rgb2)

            expect(hsl2.colorData.hue).toBe(0)
            expect(hsl2.colorData.saturation).toBe(0)
            expect(hsl2.colorData.lightness).toBe(0)
        })

        test('create red hsl from rgb', () => {
            const rgb = new RGBColor(255, 0, 0)
            const hsl = createHSLFromRGB(rgb)

            expect(hsl.colorData.hue).toBe(0)
            expect(hsl.colorData.saturation).toBe(100)
            expect(hsl.colorData.lightness).toBe(50)
        })

        test('create green hsl from rgb', () => {
            const rgb = new RGBColor(0, 255, 0)
            const hsl = createHSLFromRGB(rgb)

            expect(hsl.colorData.hue).toBe(120)
            expect(hsl.colorData.saturation).toBe(100)
            expect(hsl.colorData.lightness).toBe(50)
        })

        test('creat blue hsl from rgb', () => {
            const rgb = new RGBColor(0, 0, 255)
            const hsl = createHSLFromRGB(rgb)

            expect(hsl.colorData.hue).toBe(240)
            expect(hsl.colorData.saturation).toBe(100)
            expect(hsl.colorData.lightness).toBe(50)
        })

        test('copy hsl create new instance of hsl color', () => {
            const original = new HSLColor(0, 0, 0, 0.5)
            const copy = copyHSL(original)

            expect(original.colorData).toEqual(copy.colorData)
            expect(original.alpha).toBe(copy.alpha)
            expect(original).not.toBe(copy)
        })

        test('copy hsl with modify creates new instance apply new values', () => {
            const original = new HSLColor(0, 0, 0, 0.5)

            const copyWithModifyedHue = copyHSLWithModify(original, {
                hue: 365,
            })

            const copyWithModifyedSaturation = copyHSLWithModify(original, {
                saturation: 100,
            })

            const copyWithModifyedLightness = copyHSLWithModify(original, {
                lightness: 100,
            })

            const copyWithoutChanges = copyHSLWithModify(original)

            expect(original.colorData.hue)
                .not
                .toBe(copyWithModifyedHue.colorData.hue)

            expect(original.colorData.saturation)
                .not
                .toBe(copyWithModifyedSaturation.colorData.saturation)

            expect(original.colorData.lightness)
                .not
                .toBe(copyWithModifyedLightness.colorData.lightness)

            expect(original.colorData).toEqual(copyWithoutChanges.colorData)
        })

        test('creating hsl color from base color with raw', () => {
            const color1 = new BaseColor(1, {
                hue: 60,
                saturation: 50,
                lightness: 50,
            })

            const color2 = new BaseColor(1, {
                hue: 361,
                saturation: 200,
                lightness: -100,
            })

            const hsl1 = castHSLFromBaseColor(color1)
            const hsl2 = castHSLFromBaseColor(color2)

            expect(hsl1).toBeInstanceOf(HSLColor)
            expect(hsl2).toBeInstanceOf(HSLColor)

            expect(color1.colorData).toEqual(hsl1.colorData)

            expect(hsl2.colorData.hue).toEqual(1)
            expect(hsl2.colorData.saturation).toEqual(100)
            expect(hsl2.colorData.lightness).toEqual(0)
        })
    })
})
