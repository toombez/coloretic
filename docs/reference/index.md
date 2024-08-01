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

## RGB API

### `createRGBColor`

Create an RGB color.

```ts
const color = createRGBColor({ red: 255, green: 127, blue: 63 })
```

::: details Passed component values when creating an RGB color.

All passed components will be converted to integer values in the range [0, 255].

```ts
// Will create a color with value red: 255, green: 0, blue: 64.
createRGBColor({ red: 1000, green: -100, blue: 63.51 })
```

:::

### `isRGBColor`

Check if the color is from the RGB color space family.

```ts
isRGBColor(createRGBColor({ red: 0, green: 0, blue: 0 })) // true
isRGBColor(createColor("MyColor", {})) // false
```

### `setRed`

Set the red component of the RGB color.

```ts
const color = createRGBColor({ red: 0, green: 0, blue: 0 })

setRed(127, color) // new color with red component equals 127
setRed(-1000, color) // new color with red component equals 0
setRed(1000, color) // new color with red component equals 255
```

### `addRed`

Add a value to the red component of the color.

```ts
const color = createRGBColor({ red: 32, green: 0, blue: 0 })

addRed(32, color) // new color with red component equals 64
addRed(-1000, color) // new color with red component equals 0
addRed(1000, color) // new color with red component equals 255
```

### `removeRed`

Subtract a value to the red component of the color.

```ts
const color = createRGBColor({ red: 32, green: 0, blue: 0 })

removeRed(16, color) // new color with red component equals 16
removeRed(-1000, color) // new color with red component equals 255
removeRed(1000, color) // new color with red component equals 0
```

### `setGreen`

Set the green component of the RGB color.

```ts
const color = createRGBColor({ red: 0, green: 0, blue: 0 })

setGreen(127, color) // new color with green component equals 255
setGreen(-1000, color) // new color with green component equals 0
setGreen(1000, color) // new color with green component equals 255
```

### `addGreen`

Add a value to the green component of the color.

```ts
const color = createRGBColor({ red: 0, green: 32, blue: 0 })

addGreen(32, color) // new color with green component equals 64
addGreen(-1000, color) // new color with green component equals 0
addGreen(1000, color) // new color with green component equals 255
```

### `removeGreen`

Subtract a value to the green component of the color.

```ts
const color = createRGBColor({ red: 0, green: 32, blue: 0 })

removeGreen(16, color) // new color with green component equals 16
removeGreen(-1000, color) // new color with green component equals 255
removeGreen(1000, color) // new color with green component equals 0
```

### `setBlue`

Set the blue component of the RGB color.

```ts
const color = createRGBColor({ red: 0, green: 0, blue: 0 })

setBlue(127, color) // new color with blue component equals 127
setBlue(-255, color) // new color with blue component equals 0
setBlue(1000, color) // new color with blue component equals 255
```

### `addBlue`

Add a value to the blue component of the color.

```ts
const color = createRGBColor({ red: 0, green: 0, blue: 32 })

addBlue(32, color) // new color with blue component equals 64
addBlue(-1000, color) // new color with blue component equals 0
addBlue(1000, color) // new color with blue component equals 255
```

### `removeBlue`

Subtract a value to the blue component of the color.

```ts
const color = createRGBColor({ red: 0, green: 0, blue: 32 })

removeBlue(16, color) // new color with blue component equals 16
removeBlue(-1000, color) // new color with blue component equals 255
removeBlue(1000, color) // new color with blue component equals 0
```
## Utils API

### `inRange`

Check if the numbers are included in the range.

```ts
inRange(5, { minimum: 0, maximum: 10 }) // true
inRange(-1, { minimum: 0, maximum: 10 }) // false
inRange(11, { minimum: 0, maximum: 10 }) // false
```

### `clamp`

Limit the number to a minimum and a maximum.

```ts
clamp(5, { minimum: 0, maximum: 10 }) // 5
clamp(-1, { minimum: 0, maximum: 10 }) // 0
clamp(11, { minimum: 0, maximum: 10 }) // 10
```

### `modulo`

Limit a number to a minimum and a maximum using the modulo operator.

```ts
modulo(0, { minimum: 120, maximum: 360 }) // 120
modulo(-1, { minimum: -1, maximum: 360 }) // 359
modulo(11, { minimum: 721, maximum: 360 }) // 1
```

::: info Modulo range

The minimum and maximum are counted as one number.

:::
