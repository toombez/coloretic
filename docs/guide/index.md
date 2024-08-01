# Getting started

Coloretic is a library that helps to work with colors and different color spaces.

# Quick start

1. Install the package:

::: code-group
```bash [npm]
npm i coloretic
```

```bash [yarn]
yarn add coloretic
```

```bash [pnpm]
pnpm i coloretic
```
:::

2. Use the package:

::: code-group

```ts [Creating color]
const red = createRGBColor({ red: 255, blue: 0, green: 0 })
```

```ts [Changing color]
const violet = setBlue(255, red)
const yellow = setGreen(255, red)
const semiTransparentRed = transparentize(0.5, red)
```

```ts [Converting color]
const hslRed = HSL2RGB(red)
```

```ts [Operating with color]
const gray = mixRGB(white, black, 0.5)
const semiTransparentViolet = alphaBlending(
  semiTransparentRed,
  semiTransparentBlue,
)
```

:::

# Motivation

The reason for creating the library is to use a unified color format in third-party libraries. As a rule, in such libraries color values are provided as a css string. This is both an advantage and a disadvantage from my point of view. In this library, you have full control over transformations over color spaces: with small utilities, you get to create your own transformations that your application needs.

Also, one of the features that makes this library stand out among others is that you can easily create your own color spaces with their own necessary validation and subsequent conversion of values.

Besides the listed features of the library, it should be noted that the library is designed for writing code in the functional paradigm, which may not appeal to everyone.

# Alternative color libraries

- [**chroma.js**](https://github.com/gka/chroma.js)

  A wonderful library that provides a lot of possibilities to work with color. All operations are performed via chaining operator. If your application and codebase suit this style, I recommend using this library.

  One of the disadvantages of this library is that it is written in javascript and for convenient work with typescript you need to install the [npm](https://www.npmjs.com/package/@types/chroma-js) package with types separately.

- [**tinycolor**](https://github.com/bgrins/TinyColor)

  Another great library that uses chaining operator, but unlike chroma.js weighs only [5.2 kB](https://bundlephobia.com/package/tinycolor2@1.6.0).

  A separate [npm](https://www.npmjs.com/package/@types/tinycolor2) package is also needed to work with typescript.

- [**color2k**](https://github.com/ricokahler/color2k)

  Another library for working with colors. The advantage of this library is its size of [2.9 kB](https://bundlephobia.com/package/color2k@2.0.3). Allows to work with only two common colors in the web environment - rgba and hsla.

- [**kewler**](https://github.com/adriantoine/kewler)

  A library that is maximally similar in idea. It also uses a functional approach. All functions provided by the library are curried. The lack of typing and the possibility of working with transparent colors can be noted from the minuses.

::: info currying

In the future, there are plans to create a separate package that will curried all coloretic functions to color manipulation.

:::
