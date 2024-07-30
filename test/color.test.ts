import { assert, describe, expect, test } from "vitest"
import { createColor, createColorFactory } from "../src"

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
})
