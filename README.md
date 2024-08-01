# Coloretic

Library for creating and manipulating various color spaces

## Features

- Immutability
- Fully typed
- Zero dependency

## Quick start

1. Install the package:

- with npm

```bash
npm i coloretic
```

- with yarn

```bash
yarn add coloretic
```

- with pnpm

```bash
pnpm i coloretic
```

2. Use the package:

```ts
// Creating color
const red = createRGBColor({ red: 255, blue: 0, green: 0 })
const white = createRGBColor({ red: 255, blue: 255, green: 255 })
const black = createRGBColor({ red: 0, blue: 0, green: 0 })

// Change color
const violet = setBlue(255, red)
const yellow = setGreen(255, red)
const semiTransparentRed = transparentize(0.5, red)

// Converting colors
const hslRed = HSL2RGB(red)

// Operate with colors
const gray = mixRGB(white, black, 0.5)
const semiTransparentViolet = alphaBlendingRGB(
  semiTransparentRed,
  createRGBColor({ red: 0, green: 0, blue: 255, alpha: 0.5 }),
)
```

To learn more about what the library can do check out the [📚️ documentation](https://toombez.github.io/coloretic/)

---

LICENCE MIT - Created by Timur Tokaev (@toombez)
