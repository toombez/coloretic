import BaseColor from "./BaseColor"

export const transparentize = <T>(
    color: BaseColor<T>,
    amount: number,
): BaseColor<T> => new BaseColor(color.alpha - amount, color.colorData)

export const opacify = <T>(
    color: BaseColor<T>,
    amount: number,
): BaseColor<T> => transparentize(color, - amount)
