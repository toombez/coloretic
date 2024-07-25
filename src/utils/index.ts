/**
 * Options for setting limits.
 */
type LimitOptions = {
    /**
     * The minimum value allowed.
     */
    minimum: number

    /**
     * The maximum value allowed.
     */
    maximum: number
}

/**
 * Checks if a given number falls within a specified range including minimum and maximum.
 *
 * `options.minimum` fallback is `Number.NEGATIVE_INFINITY`.
 *
 * `options.maximum` fallback is `Number.POSITIVE_INFINITY`.
 *
 * @param value - Number to be checked against the range.
 * @param options - Object specifying the range boundaries.
 * @returns `true` if `value` within range `[minimum, maximum]`, `false` else.
 */
export const inRange = (
    value: number,
    options: Partial<LimitOptions> = {}
): boolean => {
    const {
        minimum = Number.NEGATIVE_INFINITY,
        maximum = Number.POSITIVE_INFINITY,
    } = options

    return value >= minimum && value <= maximum
}

/**
 * Clamps a number within a specified range including minimum and maximum.
 *
 * `options.minimum` fallback is `Number.NEGATIVE_INFINITY`.
 *
 * `options.maximum` fallback is `Number.POSITIVE_INFINITY`.
 *
 * @param value - Number to be clamped.
 * @param options - Object specifying the range boundaries.
 * @returns Clamped value, which will be within the range `[minimum, maximum]`.
 */
export const clamp = (
    value: number,
    options: Partial<LimitOptions> = {}
): number => {
    const {
        minimum = Number.NEGATIVE_INFINITY,
        maximum = Number.POSITIVE_INFINITY,
    } = options

    if (inRange(value, { minimum, maximum })) {
        return value
    }

    return Math.min(Math.max(value, minimum), maximum)
}

/**
 * Computes the modulo of a number within a specified range including minimum.
 *
 * If any value is Infinity falls with error.
 *
 * `options.minimum` fallback is `Number.MIN_SAFE_INTEGER`.
 *
 * `options.maximum` fallback is `Number.MAX_SAFE_INTEGER`.
 *
 * @param value - Number to compute the modulo for.
 * @param options - Object specifying the range boundaries.
 * @returns The value within the range `[minimum, maximum)`.
 */
export const modulo = (
    value: number,
    options: Partial<LimitOptions> = {}
): number => {
    const {
        minimum = Number.MIN_SAFE_INTEGER,
        maximum = Number.MAX_SAFE_INTEGER,
    } = options

    if (
        !Number.isFinite(maximum)
        || !Number.isFinite(minimum)
        || !Number.isFinite(value)
    ) {
        throw new RangeError("Infinity numbers for modulo not allowed")
    }

    // Make minimum and maximum same number
    // Example: With circle 0 degrees and 360 degrees are same
    const _maximum = maximum - 1

    if (inRange(value, { minimum, maximum: _maximum })) {
        return value
    }

    return (
        (value - minimum) % (_maximum - minimum + 1) + (_maximum - minimum + 1)
    ) % (_maximum - minimum + 1) + minimum
}
