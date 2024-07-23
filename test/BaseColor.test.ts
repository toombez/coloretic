import { describe, expect, test } from "vitest"
import { BaseColor, opacify, transparentize } from "../src"

describe('base color', () => {
    test('clamping alpha value to range [0; 1] while creating', () => {
        expect(new BaseColor(2, "").alpha).toBe(1)
        expect(new BaseColor(-3542, "").alpha).toBe(0)
    })

    test('opacify change alpha but clamp it', () => {
        expect(opacify(new BaseColor(0.5, ""), 1.5).alpha).toBe(1)
        expect(opacify(new BaseColor(0.5, ""), -1.5).alpha).toBe(0)
        expect(opacify(new BaseColor(0.5, ""), 0.3).alpha).toBe(0.8)
    })

    test('opacify create new instance', () => {
        const color = new BaseColor(1, "")
        const opacifyedColor = opacify(color, 0)

        expect(opacifyedColor).not.toBe(color)
    })

    test('opacify just move colorData to new instance', () => {
        const color = new BaseColor(1, "")
        const opacifyedColor = opacify(color, 0)

        expect(color.colorData).toBe(opacifyedColor.colorData)
    })

    test('opacify make alpha more or equals', () => {
        const color = new BaseColor(0.5, "")
        const opacifyed1Color = opacify(color, 0.2)
        const opacifyed2Color = opacify(color, 1)

        expect(opacifyed1Color.alpha).toBeGreaterThanOrEqual(color.alpha)
        expect(opacifyed2Color.alpha).toBeGreaterThanOrEqual(color.alpha)
    })

    test('transparentize make alpha less or equals', () => {
        const color = new BaseColor(0.5, "")
        const transparentized1Color = transparentize(color, 0.2)
        const transparentized2Color = transparentize(color, 1)

        expect(transparentized1Color.alpha).toBeLessThanOrEqual(color.alpha)
        expect(transparentized2Color.alpha).toBeLessThanOrEqual(color.alpha)
    })
})
