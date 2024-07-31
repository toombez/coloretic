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

```ts [Change color]
const violet = setBlue(255, red)
const yellow = setGreen(255, red)
const semiTransparentRed = transparentize(0.5, red)
```

```ts [Converting colors]
const hslRed = HSL2RGB(red)
```

```ts [Operate with colors]
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

<!-- ## Key features

- **Immutability**

  Все объекты, созданные с помощью Coloretic, являются неизменяемыми благодаря использованию нативной функции [`Object.freeze`](https://tc39.es/ecma262/#sec-object.freeze). Это обеспечивает стабильность и предсказуемость работы с данными.

- **Typescript**

  The library provides a rich and intuitive API for working with colors. You can easily create and manipulate color spaces, as well as create your own color spaces in just a few lines of code.

  <!-- Библиотека предоставляет богатый и интуитивно понятный API для работы с цветами. Вы сможете легко создавать и манипулировать цветовыми пространствами, а также создавать свои собственные цветовые пространства всего за несколько строчек кода.

- **Rich API**

  Библиотека предоставляет удобное API, чтобы работать с цветами, а также [создавать свои цветовые пространства в несколько строчек](/guide/implementing-color-space).

--- -->

<!--
Coloretic предоставляет следующие фичи:

- Иммутабельность данных:
- Возможность реализации своих цветовых пространств: библиотека предоставляет возможность реализовать своё цветовое пространство в несколько строк. Подробно описано в [Implementing color space](/guide/implementing-color-space)
- Полная поддержка typescript: все функции библиотки полностью типизированы -->

<!-- Coloretic - библиотека, созданная для работы с различными цветовыми пространствами, в основе которой лежит иммутабельность данных. -->
<!-- . Основной идеей, которую реализует библиотека, является
иммутабельность данных. В библиотеке нет привычных по ООП классов. Вместо них
предлагается использовать функции, которые возвращают простые иммутабельные
объекты. -->

<!-- ::: warning Supported color spaces
На данный момент реализованы 2 наиболее используемых цветовых пространства
(RGB и HSL) и операции для изменения соответствующих объектов пространств.
::: -->


<!-- # Future

В будущем планируются следующие изменения:

- Реализация дополнительных цветовых пространств: cmyk, hwb, lch, lab и т.д.
- Создание пакета для функций изменения цвета, обернутых с помощью функции каррирования.
- Реализация работы со значениями цветов [`css`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)


# Getting started

Coloretic - библиотека для создания и изменения цвета различных цветовых пространств -->
