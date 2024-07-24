import { describe, expect, test } from "vitest"
import { alphaBlendingRGB, BaseColor, castRGBFromBaseColor, copyRGB, copyRGBWithModify, createRGBFromArray, createRGBFromHSL, createRGBFromObject, getRGBComponents, getRGBComponentsWithAlpha, getRGBNormalComponents, getRGBNormalComponentsWithAlpha, HSLColor, mixRGB, RGBColor } from "../src"

describe('rgb color', () => {
    describe('creating rgb color', () => {
        test('clamp components while creating rgb', () => {
            const rgb = new RGBColor(1000, -1000, 0)

            expect(rgb.colorData.red).toEqual(255)
            expect(rgb.colorData.green).toEqual(0)
            expect(rgb.colorData.blue).toEqual(0)
        })

        test('round components while creating rgb', () => {
            const rgb = new RGBColor(127.54, 0.57, 7.8)

            expect(rgb.colorData.red).toEqual(128)
            expect(rgb.colorData.green).toEqual(1)
            expect(rgb.colorData.blue).toEqual(8)
        })

        test('creating rgb color from object', () => {
            const rgb = createRGBFromArray([255, 0, 0])

            expect(rgb.colorData.red).toEqual(255)
            expect(rgb.colorData.green).toEqual(0)
            expect(rgb.colorData.blue).toEqual(0)
        })

        test('creating rgb color from object', () => {
            const rgb = createRGBFromObject({
                red: 255,
                green: 0,
                blue: 0,
            })

            expect(rgb.colorData.red).toEqual(255)
            expect(rgb.colorData.green).toEqual(0)
            expect(rgb.colorData.blue).toEqual(0)
        })

        test('copy rgb color will save values to new instance', () => {
            const rgb = new RGBColor(255, 127, 63, 0.5)
            const copy = copyRGB(rgb)

            expect(copy.colorData.red).toBe(255)
            expect(copy.colorData.green).toBe(127)
            expect(copy.colorData.blue).toBe(63)
            expect(copy.alpha).toBe(0.5)

            expect(copy).containSubset(rgb)
        })

        test('copy rgb with modifying will apply values to new instance', () => {
            const rgb = new RGBColor(255, 127, 63, 0.5)
            const copyWithModifyedRed = copyRGBWithModify(rgb, {
                red: 127,
            })

            expect(copyWithModifyedRed.colorData.red).toBe(127)
            expect(copyWithModifyedRed.colorData.green).toBe(rgb.colorData.green)
            expect(copyWithModifyedRed.colorData.blue).toBe(rgb.colorData.blue)

            const copyWithModifyedGreen = copyRGBWithModify(rgb, {
                green: 255,
            })

            expect(copyWithModifyedGreen.colorData.red).toBe(rgb.colorData.red)
            expect(copyWithModifyedGreen.colorData.green).toBe(255)
            expect(copyWithModifyedGreen.colorData.blue).toBe(rgb.colorData.blue)

            const copyWithModifyedBlue = copyRGBWithModify(rgb, {
                blue: 255,
            })

            expect(copyWithModifyedBlue.colorData.red).toBe(rgb.colorData.red)
            expect(copyWithModifyedBlue.colorData.green).toBe(rgb.colorData.green)
            expect(copyWithModifyedBlue.colorData.blue).toBe(255)
        })

        test('create rgb from hsl', () => {
            const hsl = new HSLColor(317, 52, 61, 0.7)
            const rgb = createRGBFromHSL(hsl)

            expect(rgb.alpha).toBe(0.7)
            expect(rgb.colorData.red).toBe(207)
            expect(rgb.colorData.green).toBe(104)
            expect(rgb.colorData.blue).toBe(178)
        })

        test('create rgb from hsl with zero saturation', () => {
            const hsl = new HSLColor(317, 52, 49, 0.7)
            const rgb = createRGBFromHSL(hsl)

            expect(rgb.alpha).toBe(0.7)
            expect(rgb.colorData.red).toBe(190)
            expect(rgb.colorData.green).toBe(60)
            expect(rgb.colorData.blue).toBe(153)
        })

        test('create rgb from hsl with lightness less than 50%', () => {
            const hsl = new HSLColor(317, 0, 61, 0.7)
            const rgb = createRGBFromHSL(hsl)

            expect(rgb.alpha).toBe(0.7)
            expect(rgb.colorData.red).toBe(156)
            expect(rgb.colorData.green).toBe(156)
            expect(rgb.colorData.blue).toBe(156)
        })

        test('creating hsl color from base color with raw', () => {
            const base = new BaseColor(0.7, {
                red: 25,
                green: 78,
                blue: 124
            })
            const rgb = castRGBFromBaseColor(base)

            expect(rgb.alpha).toBe(0.7)
            expect(rgb.colorData.red).toBe(25)
            expect(rgb.colorData.green).toBe(78)
            expect(rgb.colorData.blue).toBe(124)
        })
    })

    describe('getters for rgb', () => {
        test('get components for rgb', () => {
            const rgb = new RGBColor(255, 127, 63)

            expect(getRGBComponents(rgb)).toEqual([255, 127, 63])
        })

        test('get components with alpha for rgb', () => {
            const rgb = new RGBColor(255, 127, 63, 0.5)

            expect(getRGBComponentsWithAlpha(rgb)).toEqual([255, 127, 63, 0.5])
        })

        test('get normal components for rgb', () => {
            const rgb = new RGBColor(255, 127, 63)

            expect(getRGBNormalComponents(rgb))
                .toEqual([255 / 255, 127 / 255, 63 / 255])
        })

        test('get normal components with alpha for rgb', () => {
            const rgb = new RGBColor(255, 127, 63, 0.5)

            expect(getRGBNormalComponentsWithAlpha(rgb))
                .toEqual([255 / 255, 127 / 255, 63 / 255, 0.5 / 1])
        })
    })

    describe('manipulations with rgb', () => {
        test('alpha blend with two solid colors create top color', () => {
            const color1 = new RGBColor(255, 255, 255, 1)
            const color2 = new RGBColor(0, 0, 0, 1)

            expect(alphaBlendingRGB(color1, color2)).toEqual(color2)
        })

        test('alpha blend with one of solid colors create solid color', () => {
            const color1 = new RGBColor(255, 255, 255, 1)
            const color2 = new RGBColor(0, 0, 0, 0.5)

            expect(alphaBlendingRGB(color1, color2)).toEqual(new RGBColor(
                128,
                128,
                128,
                1
            ))
        })

        test('alpha blend with two semi-transparent colors create semi-transparent color', () => {
            const color1 = new RGBColor(255, 255, 255, 0.5)
            const color2 = new RGBColor(0, 0, 0, 0.5)

            expect(alphaBlendingRGB(color1, color2)).toEqual(new RGBColor(
                85,
                85,
                85,
                0.75,
            ))
        })

        test('mix colors with weight equals 1 will return second color', () => {
            const color1 = new RGBColor(255, 255, 255, 1)
            const color2 = new RGBColor(0, 0, 0, 1)

            expect(mixRGB(color1, color2, 1)).toEqual(color2)
        })

        test('mix colors with weight equals 0 will return first color', () => {
            const color1 = new RGBColor(255, 255, 255, 1)
            const color2 = new RGBColor(0, 0, 0, 1)

            expect(mixRGB(color1, color2, 0)).toEqual(color1)
        })

        test('mixing colors', () => {
            const color1 = new RGBColor(255, 255, 255, 0.5)
            const color2 = new RGBColor(0, 0, 0, 0.5)

            expect(mixRGB(color1, color2, 0.5)).toEqual(new RGBColor(
                128,
                128,
                128,
                0.5,
            ))
        })
    })
})
