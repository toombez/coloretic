import { assert, describe, expect, test } from "vitest"
import { createColor, createColorFactory, opacify, transparentize } from "../src"

describe('generic color', () => {
    describe('creating generic color', () => {
        test('created color is frozen', () => {
            const color = createColor('test', {})
            assert.isFrozen(color)
        })

        test('created color component is frozen', () => {
            const color = createColor('test', {})
            assert.isFrozen(color.components)
        })

        test('if alpha not passed it will be 1', () => {
            const color = createColor('test', {})
            expect(color.alpha).toBe(1)
        })

        test('alpha in range of [0, 1]', () => {
            const color1 = createColor('test', {})
            expect(color1.alpha).toBeLessThanOrEqual(1)
            expect(color1.alpha).toBeGreaterThanOrEqual(0)

            const color2 = createColor('test', {}, 2)
            expect(color2.alpha).toBeLessThanOrEqual(1)
            expect(color2.alpha).toBeGreaterThanOrEqual(0)

            const color3 = createColor('test', {}, -1)
            expect(color3.alpha).toBeLessThanOrEqual(1)
            expect(color3.alpha).toBeGreaterThanOrEqual(0)

            const color4 = createColor('test', {}, Infinity)
            expect(color4.alpha).toBeLessThanOrEqual(1)
            expect(color4.alpha).toBeGreaterThanOrEqual(0)

            const color5 = createColor('test', {}, Infinity)
            expect(color5.alpha).toBeLessThanOrEqual(1)
            expect(color5.alpha).toBeGreaterThanOrEqual(0)
        })
    })

    describe('creating color factory', () => {
        test('created factory validates passed values to factory', () => {
            const createTestColor = createColorFactory<'test', {
                foo: number
                bar: number
            }>('test', {
                foo: n => n ** 0.5,
                bar: n => n ** 2,
            })

            const color = createTestColor({ foo: 4, bar: 4 })
            expect(color.components).toEqual({ foo: 2, bar: 16 })
        })

        test('created factory ignore unknown values passed to factory', () => {
            const createTestColor = createColorFactory<'test', {
                foo: number
                bar: number
            }>('test', { foo: n => n, bar: n => n, })

            // @ts-ignore
            const color = createTestColor({ foo: 4, bar: 4, baz: 1 })
            expect(Object.keys(color.components)).not.contain(['baz'])
        })

        test('created factory validates alpha', () => {
            const createTestColor = createColorFactory<'test', {
                foo: number
                bar: number
            }>('test', { foo: n => n, bar: n => n, })

            const color1 = createTestColor({ foo: 4, bar: 4, alpha: 1.2 })
            expect(color1.alpha).toBe(1)

            const color2 = createTestColor({ foo: 4, bar: 4, alpha: -0.2 })
            expect(color2.alpha).toBe(0)
        })
    })

    describe('modifying color alpha', () => {
        test('opacify creates new color', () => {
            const color = createColor('test', {}, 0.5)
            const opacifyedColor = opacify(0.3, color)

            expect(opacifyedColor.alpha).not.toBe(color)
        })

        test('opacifyed color alpha in range [0, 1]', () => {
            const color1 = createColor('test', {}, 0.5)
            const opacifyedColor1 = opacify(0.3, color1)
            expect(opacifyedColor1.alpha).toBeGreaterThanOrEqual(0)
            expect(opacifyedColor1.alpha).toBeLessThanOrEqual(1)

            const color2 = createColor('test', {}, 0.5)
            const opacifyedColor2 = opacify(1, color2)
            expect(opacifyedColor2.alpha).toBeGreaterThanOrEqual(0)
            expect(opacifyedColor2.alpha).toBeLessThanOrEqual(1)

            const color3 = createColor('test', {}, 0.5)
            const opacifyedColor3 = opacify(-1, color3)
            expect(opacifyedColor3.alpha).toBeGreaterThanOrEqual(0)
            expect(opacifyedColor3.alpha).toBeLessThanOrEqual(1)
        })

        test('transparentize creates new color', () => {
            const color = createColor('test', {}, 0.5)
            const transparentizedColor = transparentize(0.3, color)

            expect(transparentizedColor.alpha).not.toBe(color)
        })

        test('transparentized color alpha in range [0, 1]', () => {
            const color1 = createColor('test', {}, 0.5)
            const transparentizedColor1 = transparentize(0.3, color1)
            expect(transparentizedColor1.alpha).toBeGreaterThanOrEqual(0)
            expect(transparentizedColor1.alpha).toBeLessThanOrEqual(1)

            const color2 = createColor('test', {}, 0.5)
            const transparentizedColor2 = transparentize(1, color2)
            expect(transparentizedColor2.alpha).toBeGreaterThanOrEqual(0)
            expect(transparentizedColor2.alpha).toBeLessThanOrEqual(1)

            const color3 = createColor('test', {}, 0.5)
            const transparentizedColor3 = transparentize(-1, color3)
            expect(transparentizedColor3.alpha).toBeGreaterThanOrEqual(0)
            expect(transparentizedColor3.alpha).toBeLessThanOrEqual(1)
        })
    })
})
