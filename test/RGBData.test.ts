import { describe, expect, test } from 'vitest'
import { RGBData } from '../src'

describe('rgb data', () => {
    test('clamping components while creating', () => {
        const rgb = new RGBData(1000, -1000, 50)

        expect(rgb.red).toBe(255)
        expect(rgb.green).toBe(0)
        expect(rgb.blue).toBe(50)
    })

    test('round components while creating', () => {
        const rgb = new RGBData(0.5, 1.5, 2.5)

        expect(Number.isInteger(rgb.red)).toBe(true)
        expect(Number.isInteger(rgb.green)).toBe(true)
        expect(Number.isInteger(rgb.blue)).toBe(true)
    })
})
