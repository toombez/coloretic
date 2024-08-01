import { assert, describe, expect, test } from "vitest"
import {
    createColor,
    createColorComponentOperations,
    createColorFactory,
    modifyColor,
    opacify,
    transparentize,
} from "../src"

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

    describe('modifying color', () => {
        test('passing alpha to modifyColor will change color alpha', () => {
            const color = createColor('test', {})
            const modifyedColor = modifyColor({ alpha: 0.5 }, color)

            expect(modifyedColor.alpha).toBe(0.5)
        })

        test('passed alpha to modifyColor creates new color with alpha in range [0, 1]', () => {
            const color1 = createColor('test', {})
            const modifyedColor1 = modifyColor({ alpha: 2 }, color1)
            expect(modifyedColor1.alpha).toBeGreaterThanOrEqual(0)
            expect(modifyedColor1.alpha).toBeLessThanOrEqual(1)

            const color2 = createColor('test', {})
            const modifyedColor2 = modifyColor({ alpha: -1 }, color2)
            expect(modifyedColor2.alpha).toBeGreaterThanOrEqual(0)
            expect(modifyedColor2.alpha).toBeLessThanOrEqual(1)

            const color3 = createColor('test', {})
            const modifyedColor3 = modifyColor({ alpha: 0.5 }, color3)
            expect(modifyedColor3.alpha).toBeGreaterThanOrEqual(0)
            expect(modifyedColor3.alpha).toBeLessThanOrEqual(1)
        })

        test('if alpha not passed to modifyColor alpha will be picked from original color', () => {
            const color = createColor('test', {})
            const modifyedColor = modifyColor({}, color)

            expect(color.alpha).toBe(modifyedColor.alpha)
        })

        test('passing component values to modifyColor change original color components', () => {
            const color = createColor('test', { foo: 2, bar: 0 })
            const modifyedColor = modifyColor({ bar: 3 }, color)
            expect(modifyedColor.components.bar).toBe(3)
        })

        test('passing unknown for color values to modifyColor will be not affect to original', () => {
            const color = createColor('test', { foo: 2, bar: 0 })
            // @ts-ignore
            const modifyedColor = modifyColor({ unknownField1: 1 }, color)
            expect(Object.keys(modifyedColor.components)).not.contain('unknownField1')
        })
    })

    describe('creating color components operations', () => {
        test('creating operation returns set, increase and decrease functions', () => {
            const factory = createColorFactory<
                'test',
                { foo: number, bar: number }
            >('test', { bar: n => n, foo: n => n })

            const fooOperations = createColorComponentOperations<
                'test',
                { foo: number, bar: number }
            >('foo', factory)

            expect(Object.keys(fooOperations)).contain('increase')
            expect(Object.keys(fooOperations)).contain('set')
            expect(Object.keys(fooOperations)).contain('decrease')

            expect(fooOperations.increase).toBeTypeOf('function')
            expect(fooOperations.decrease).toBeTypeOf('function')
            expect(fooOperations.set).toBeTypeOf('function')
        })

        test('created operations while allying validates values', () => {
            const factory = createColorFactory<
                'test',
                { foo: number, bar: number }
            >('test', { foo: n => Math.max(0, n), bar: n => Math.min(100, n) })

            const fooOperations = createColorComponentOperations<
                'test',
                { foo: number, bar: number }
            >('foo', factory)

            const color = factory({ bar: 50, foo: 50 })
            const increasedFoo = fooOperations.increase(-100, color)
            const decreasedFoo = fooOperations.decrease(100, color)
            const settedFoo = fooOperations.set(-100, color)

            expect(increasedFoo.components.foo).toBeGreaterThanOrEqual(0)
            expect(decreasedFoo.components.foo).toBeGreaterThanOrEqual(0)
            expect(settedFoo.components.foo).toBeGreaterThanOrEqual(0)
        })
    })
})
