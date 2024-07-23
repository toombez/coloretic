import { describe, expect, test } from "vitest"
import { clamp, inRange } from "../src"

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
})
