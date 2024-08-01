# Implementing color space

The library has tools for implementing its own color spaces. For example, in an application you need to use RGB color space whose components are in the range [0, 1]. This library can help to solve such a task.

## Create validators

First, we need to implement color components value validators.

```ts
const myRGBComponentValidator = (n: number) => Math.max(Math.min(1, n), 0)
```

This validator will limit the transmitted value to the ranges [0, 1].

## Create color space factory

```ts
import { createColorFactory, Color } from 'coloretic'

// ...

const MY_RGB_TAG = 'MY_RGB'

// Create type for color space components
export type MyRGBComponents = {
  red: number
  green: number
  blue: number
}
type MyRGBTag = typeof MY_RGB_TAG
type MyRGBColor = Color<MyRGBTag, MyRGBComponents>

// Create factory for myRGB
const createMyRGBColor = createColorFactory<MyRGBTag, MyRGBComponents>(
  MY_RGB_TAG,
  {
    red: myRGBComponentValidator,
    green: myRGBComponentValidator,
    blue: myRGBComponentValidator,
  }
)
```

Now you can create colors through the factory we implemented.

```ts
// Validators will be applied to all values, including the channel alpha value.
const color = createMyRGBColor({ red: -1, green: 2, blue: 0.5, alpha: 2 })

console.log(color)

/**
 * {
 *    _tag: 'MY_RGB',
 *    alpha: 1,
 *    components: { red: 0, green: 1, blue: 0.5 }
 * }
 */
```

## Implement color component operations

The library toolkit can also be used to allow you to safely change the values of the resulting color space.

```ts
import {
  // ...
  createColorComponentOperations,
} from 'coloretic'

// ...

const {
  increase: increaseRed,
  reduce: reduceRed,
  set: setRed,
} = createColorComponentOperations<MyRGBTag, MyRGBComponents>(
  'red',
  createMyRGBColor,
)

const {
  increase: increaseGreen,
  reduce: reduceGreen,
  set: setGreen,
} = createColorComponentOperations<MyRGBTag, MyRGBComponents>(
  'green',
  createMyRGBColor,
)

const {
  increase: increaseBlue,
  reduce: reduceBlue,
  set: setBlue,
} = createColorComponentOperations<MyRGBTag, MyRGBComponents>(
  'blue',
  createMyRGBColor,
)
```

::: info opacify and transparentize

The [opacify](/reference/#opacify) and [transparentize](reference/#transparetize) operations from the library will also apply to the created color space.

:::

---

# Conclusion

After all these steps, we get a color space that can be safely created and modified.

An example of using the implemented color space.

```ts
const color = createMyRGBColor({ red: 1, green: -1, blue: 0.5, alpha: 0.5 })

console.log(color)
console.log(setRed(0.5, color))
console.log(setGreen(0.3, setRed(2, color)))
```

::: details Full example code
```ts
import {
  createColorFactory,
  Color,
  createColorComponentOperations,
} from 'coloretic'

const myRGBComponentValidator = (n: number) => Math.max(Math.min(1, n), 0)

const MY_RGB_TAG = 'MY_RGB'

export type MyRGBComponents = {
  red: number
  green: number
  blue: number
}
type MyRGBTag = typeof MY_RGB_TAG
type MyRGBColor = Color<MyRGBTag, MyRGBComponents>

const createMyRGBColor = createColorFactory<MyRGBTag, MyRGBComponents>(
  MY_RGB_TAG,
  {
    red: myRGBComponentValidator,
    green: myRGBComponentValidator,
    blue: myRGBComponentValidator,
  }
)

const {
  increase: increaseRed,
  reduce: reduceRed,
  set: setRed,
} = createColorComponentOperations<MyRGBTag, MyRGBComponents>(
  'red',
  createMyRGBColor,
)

const {
  increase: increaseGreen,
  reduce: reduceGreen,
  set: setGreen,
} = createColorComponentOperations<MyRGBTag, MyRGBComponents>(
  'green',
  createMyRGBColor,
)

const {
  increase: increaseBlue,
  reduce: reduceBlue,
  set: setBlue,
} = createColorComponentOperations<MyRGBTag, MyRGBComponents>(
  'blue',
  createMyRGBColor,
)
```
:::
