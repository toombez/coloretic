import { describe, expect, test } from "vitest"
import { clamp, inRange, modulo } from "../src"

describe('utilities', () => {
    describe('in range utility', () => {
        test('if not passed options range is [-Inf, Inf]', () => {
            expect(inRange(Number.MAX_SAFE_INTEGER)).toBe(true)
            expect(inRange(Number.MIN_SAFE_INTEGER)).toBe(true)
        })

        test('infinity in range of [-Inf; Inf]', () => {
            expect(inRange(Infinity)).toBe(true)
            expect(inRange(-Infinity)).toBe(true)
        })
    })

    describe('clamp utility', () => {
        test('limit value in range', () => {
            expect(clamp(-1, { minimum: 0 })).toBe(0)
            expect(clamp(1, { maximum: 0 })).toBe(0)
        })

        test('if not passed options range is [-Inf, Inf]', () => {
            expect(clamp(Infinity)).toBe(Infinity)
            expect(clamp(-Infinity)).toBe(-Infinity)
        })
    })

    describe('modulo utility', () => {
        test('passed infinity as value or limit throws error', () => {
            expect(() => modulo(Infinity)).toThrowError()
            expect(() => modulo(0, { minimum: -Infinity })).toThrowError()
            expect(() => modulo(0, { maximum: Infinity })).toThrowError()
        })

        test('value passed in modulo will be in range of options', () => {
            const limit = { minimum: 0, maximum: 10 }

            expect(inRange(modulo(11, limit), limit)).toBe(true)
            expect(inRange(modulo(-1, limit), limit)).toBe(true)
            expect(inRange(modulo(10, limit), limit)).toBe(true)
            expect(inRange(modulo(0, limit), limit)).toBe(true)

            expect(inRange(modulo(0, {
                minimum: Number.MIN_SAFE_INTEGER,
                maximum: Number.MAX_SAFE_INTEGER,
            }))).toBe(true)
        })

        test('minimum and maximum of range are same value', () => {
            const limit = { minimum: 0, maximum: 10 }

            expect(modulo(0, limit)).toEqual(modulo(10, limit))
        })

        test('modulo looping range', () => {
            expect(modulo(-15, {
                minimum: -10,
                maximum: 0,
            })).toBe(-5)

            expect(modulo(15, {
                minimum: 0,
                maximum: 10,
            })).toBe(5)

            expect(modulo(20, {
                minimum: -10,
                maximum: 10,
            })).toBe(0)

            expect(modulo(-20, {
                minimum: -10,
                maximum: 10,
            })).toBe(0)

            expect(modulo(35, {
                minimum: 0,
                maximum: 10,
            })).toBe(5)
        })
    })
})
