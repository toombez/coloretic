---
outline: deep
---

# API Reference

## Color API

### `createColor`

Create a color based on the tag, color component, and alpha channel value.

```ts
createColor('foo', { bar: 100, baz: -100 }, 0.5)
```

::: details The alpha value of the channel when creating a color

When creating a color, the alpha channel will be cast to the range [0, 1] with 2 decimal places.

```ts
createColor('', {}, 0.7835) // The alpha value will be equal to 0.78.
createColor('', {}, -1) // The alpha value will be equal to 0.
createColor('', {}, 2) // The alpha value will be equal to 1.
```

:::

### `createColorFactory`

Create a factory for the color space based on the tag and color component validators.

```ts
const barValidator = (n) => Math.max(Math.min(1, n), 0)

const myColorSpace = createColorFactory('MyColorSpace', {
  // Limits the passed values to the range [0, Inf].
  foo: (n) => Math.max(0, n),
  // Limits the passed values to the range [0, 1].
  bar: (n) => Math.max(Math.min(1, n), 0),
})

// Will create a color with foo: 0, bar: 1 and alpha channel value: 0.5.
const myColor = myColorSpace({ foo: -10, bar: 20, alpha: 0.5 })
```
<!-- TODO: add notes abount typescript autocomplete -->

### `createColorComponentOperations`

Create `set`, `add`, `remove` operations for color space components.

```ts
const { set, add, remove } = createColorComponentOperations(
  'red',
  rgbFactory,
)
```

<!-- TODO: add notes abount typescript autocomplete -->

### `modifyColor`

Change the color based on the data passed in. If the value has a validator, the validator will check the value.

```ts
const color = createColor('myColor', { foo: 1 }, 0.5)

// Will only change the alpha channel.
const transparentColor = modifyColor({ alpha: 0 }, color)
// Will only change the foo component.
const newFooColor = modifyColor({ foo: 8 }, color)
```

### `opacify`

Increase the alpha channel value on the color.

```ts
const color = createColor('myColor', {}, 0.5)
const rgbColor = createRGBColor({ red: 0, green: 0, blue: 0 }, 0.5)

opacify(0.3, color) // The alpha value of the channel is 0.8.
opacify(0.3, rgbColor) // The alpha value of the channel is 0.8.
```

### `transparetize`

Reduces the alpha channel value on the color.

```ts
const color = createColor('myColor', {}, 0.5)
const rgbColor = createRGBColor({ red: 0, green: 0, blue: 0 }, 0.5)

transparetize(0.3, color) // The alpha value of the channel is 0.2.
transparetize(0.3, rgbColor) // The alpha value of the channel is 0.2.
```
