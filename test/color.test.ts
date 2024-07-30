import { assert, describe, expect, test } from "vitest"
import { createColor } from "../src"

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
})
