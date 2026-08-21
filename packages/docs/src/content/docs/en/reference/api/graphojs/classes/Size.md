---
editUrl: false
next: false
prev: false
title: "Size"
---

Defined in: [geometry/Size.ts:4](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L4)

A 2D size with width and height.

## Constructors

### Constructor

> **new Size**(`width`, `height`): `Size`

Defined in: [geometry/Size.ts:8](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L8)

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

`Size`

## Properties

### height

> **height**: `number`

Defined in: [geometry/Size.ts:6](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L6)

***

### width

> **width**: `number`

Defined in: [geometry/Size.ts:5](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L5)

## Methods

### area()

> **area**(): `number`

Defined in: [geometry/Size.ts:86](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L86)

Get the area of this size.

#### Returns

`number`

***

### aspectRatio()

> **aspectRatio**(): `number`

Defined in: [geometry/Size.ts:96](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L96)

Get the aspect ratio (width / height). Returns Infinity if height is 0.

#### Returns

`number`

***

### clone()

> **clone**(): `Size`

Defined in: [geometry/Size.ts:51](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L51)

Return a copy of this size.

#### Returns

`Size`

***

### contains()

> **contains**(`other`): `boolean`

Defined in: [geometry/Size.ts:102](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L102)

Check if this size contains another size.

#### Parameters

##### other

`Size`

#### Returns

`boolean`

***

### copy()

> **copy**(): `Size`

Defined in: [geometry/Size.ts:56](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L56)

GoJS-compatible: Return a copy of this size.

#### Returns

`Size`

***

### equals()

> **equals**(`other`): `boolean`

Defined in: [geometry/Size.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L38)

Check if this size equals another size.

#### Parameters

##### other

`Size`

#### Returns

`boolean`

***

### equalsApprox()

> **equalsApprox**(`other`, `tolerance?`): `boolean`

Defined in: [geometry/Size.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L43)

Check if this size is approximately equal to another within a tolerance.

#### Parameters

##### other

`Size`

##### tolerance?

`number` = `0.0001`

#### Returns

`boolean`

***

### intersection()

> **intersection**(`other`): `Size`

Defined in: [geometry/Size.ts:112](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L112)

Get the maximum size that fits within both sizes.

#### Parameters

##### other

`Size`

#### Returns

`Size`

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: [geometry/Size.ts:76](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L76)

Check if this size is empty (width or height is 0).

#### Returns

`boolean`

***

### isSquare()

> **isSquare**(): `boolean`

Defined in: [geometry/Size.ts:81](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L81)

Check if this size is a square.

#### Returns

`boolean`

***

### isValid()

> **isValid**(): `boolean`

Defined in: [geometry/Size.ts:66](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L66)

Check if this size is valid (non-negative).

#### Returns

`boolean`

***

### isZero()

> **isZero**(): `boolean`

Defined in: [geometry/Size.ts:71](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L71)

Check if this size is the zero size.

#### Returns

`boolean`

***

### perimeter()

> **perimeter**(): `number`

Defined in: [geometry/Size.ts:91](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L91)

Get the perimeter of this size.

#### Returns

`number`

***

### scale()

> **scale**(`factor`): `Size`

Defined in: [geometry/Size.ts:61](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L61)

Scale this size by a factor.

#### Parameters

##### factor

`number`

#### Returns

`Size`

***

### toJSON()

> **toJSON**(): `object`

Defined in: [geometry/Size.ts:117](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L117)

Convert to a plain object.

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### toString()

> **toString**(): `string`

Defined in: [geometry/Size.ts:127](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L127)

#### Returns

`string`

***

### union()

> **union**(`other`): `Size`

Defined in: [geometry/Size.ts:107](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L107)

Get the minimum size that contains both sizes.

#### Parameters

##### other

`Size`

#### Returns

`Size`

***

### from()

> `static` **from**(`obj`): `Size`

Defined in: [geometry/Size.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L14)

Create a Size from an object with width and height properties.

#### Parameters

##### obj

###### height

`number`

###### width

`number`

#### Returns

`Size`

***

### fromJSON()

> `static` **fromJSON**(`data`): `Size`

Defined in: [geometry/Size.ts:122](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L122)

Create a Size from a JSON string or object.

#### Parameters

##### data

`string` \| \{ `height`: `number`; `width`: `number`; \}

#### Returns

`Size`

***

### of()

> `static` **of**(`value`): `Size`

Defined in: [geometry/Size.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L24)

Create a square size where width === height.

#### Parameters

##### value

`number`

#### Returns

`Size`

***

### parse()

> `static` **parse**(`value`): `Size`

Defined in: [geometry/Size.ts:29](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L29)

GoJS-compatible: Parse a string like "100, 200" or "100 200".

#### Parameters

##### value

`string`

#### Returns

`Size`

***

### zero()

> `static` **zero**(): `Size`

Defined in: [geometry/Size.ts:19](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Size.ts#L19)

Create a zero size (0, 0).

#### Returns

`Size`
