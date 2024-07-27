import { assert, describe, expect, test } from "vitest"
import { createColor } from "../src"

describe('generic color', () => {
    test('creating color result is frozen', () => {
        const color = createColor('test', {})
        assert.isFrozen(color)
    })

    test('created color data is frozen', () => {
        const color = createColor('test', {})
        assert.isFrozen(color.data)
    })

    test('alpha in range [0, 1]', () => {
        const transparentColor = createColor('test', {}, -1)
        const solidColor = createColor('test', {}, 2)
        const color = createColor('test', {}, 0.5)

        expect(transparentColor.alpha).toBe(0)
        expect(solidColor.alpha).toBe(1)
        expect(color.alpha).toBe(0.5)
    })

    test('data passed while creating is new object', () => {
        const data = {}
        const color = createColor('test', data)

        expect(color.data).not.toBe(data)
    })

    test('changing simple raw data object not create color side effects', () => {
        const simpleData = { foo: 'bar' }
        const simpleColor = createColor('test', simpleData)

        simpleData.foo = 'baz'
        expect(simpleColor.data.foo).toBe('bar')
    })

    test.todo('changing complex raw data object not create color side effects', () => {
        const complexData = { foo: { bar: 'baz' } }
        const complexColor = createColor('test', complexData, 1)

        complexData.foo.bar = 'new baz'
        expect(complexColor.data.foo.bar).not.toBe('new baz')
    })
})
