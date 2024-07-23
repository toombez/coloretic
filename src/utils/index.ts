type LimitOptions = {
    minimum?: number
    maximum?: number
}

export const inRange = (value: number, {
    minimum = Number.NEGATIVE_INFINITY,
    maximum = Number.POSITIVE_INFINITY,
}: LimitOptions = {}): boolean => {
    return value >= minimum && value <= maximum
}

export const clamp = (value: number, {
    minimum = Number.NEGATIVE_INFINITY,
    maximum = Number.POSITIVE_INFINITY,
}: LimitOptions = {}): number =>  {
    if (inRange(value, { minimum, maximum })) {
        return value
    }

    return Math.min(Math.max(value, minimum), maximum)
}

export const modulo = (value: number, {
    minimum = Number.MIN_SAFE_INTEGER,
    maximum = Number.MAX_SAFE_INTEGER,
}: LimitOptions = {}): number => {
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
