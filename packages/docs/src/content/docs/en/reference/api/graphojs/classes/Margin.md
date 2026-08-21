---
editUrl: false
next: false
prev: false
title: "Margin"
---

Defined in: [geometry/Margin.ts:4](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L4)

A margin with top, right, bottom, and left values.

## Constructors

### Constructor

> **new Margin**(`top`, `right`, `bottom`, `left`): `Margin`

Defined in: [geometry/Margin.ts:10](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L10)

#### Parameters

##### top

`number`

##### right

`number`

##### bottom

`number`

##### left

`number`

#### Returns

`Margin`

## Properties

### bottom

> **bottom**: `number`

Defined in: [geometry/Margin.ts:7](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L7)

***

### left

> **left**: `number`

Defined in: [geometry/Margin.ts:8](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L8)

***

### right

> **right**: `number`

Defined in: [geometry/Margin.ts:6](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L6)

***

### top

> **top**: `number`

Defined in: [geometry/Margin.ts:5](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L5)

## Accessors

### horizontal

#### Get Signature

> **get** **horizontal**(): `number`

Defined in: [geometry/Margin.ts:87](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L87)

Get the total horizontal margin (left + right).

##### Returns

`number`

***

### vertical

#### Get Signature

> **get** **vertical**(): `number`

Defined in: [geometry/Margin.ts:92](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L92)

Get the total vertical margin (top + bottom).

##### Returns

`number`

## Methods

### add()

> **add**(`other`): `Margin`

Defined in: [geometry/Margin.ts:107](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L107)

Add another margin to this margin.

#### Parameters

##### other

`Margin`

#### Returns

`Margin`

***

### clone()

> **clone**(): `Margin`

Defined in: [geometry/Margin.ts:77](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L77)

Return a copy of this margin.

#### Returns

`Margin`

***

### copy()

> **copy**(): `Margin`

Defined in: [geometry/Margin.ts:82](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L82)

GoJS-compatible: Return a copy of this margin.

#### Returns

`Margin`

***

### equals()

> **equals**(`other`): `boolean`

Defined in: [geometry/Margin.ts:57](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L57)

Check if this margin equals another margin.

#### Parameters

##### other

`Margin`

#### Returns

`boolean`

***

### equalsApprox()

> **equalsApprox**(`other`, `tolerance?`): `boolean`

Defined in: [geometry/Margin.ts:67](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L67)

Check if this margin is approximately equal to another within a tolerance.

#### Parameters

##### other

`Margin`

##### tolerance?

`number` = `0.0001`

#### Returns

`boolean`

***

### isUniform()

> **isUniform**(): `boolean`

Defined in: [geometry/Margin.ts:102](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L102)

Check if this margin is uniform (same value on all sides).

#### Returns

`boolean`

***

### isZero()

> **isZero**(): `boolean`

Defined in: [geometry/Margin.ts:97](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L97)

Check if this margin is zero.

#### Returns

`boolean`

***

### scale()

> **scale**(`factor`): `Margin`

Defined in: [geometry/Margin.ts:127](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L127)

Scale this margin by a factor.

#### Parameters

##### factor

`number`

#### Returns

`Margin`

***

### subtract()

> **subtract**(`other`): `Margin`

Defined in: [geometry/Margin.ts:117](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L117)

Subtract another margin from this margin.

#### Parameters

##### other

`Margin`

#### Returns

`Margin`

***

### toJSON()

> **toJSON**(): `object`

Defined in: [geometry/Margin.ts:137](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L137)

Convert to a plain object.

#### Returns

`object`

##### bottom

> **bottom**: `number`

##### left

> **left**: `number`

##### right

> **right**: `number`

##### top

> **top**: `number`

***

### toString()

> **toString**(): `string`

Defined in: [geometry/Margin.ts:149](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L149)

#### Returns

`string`

***

### from()

> `static` **from**(`obj`): `Margin`

Defined in: [geometry/Margin.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L33)

Create a Margin from an object with top, right, bottom, left properties.

#### Parameters

##### obj

###### bottom

`number`

###### left

`number`

###### right

`number`

###### top

`number`

#### Returns

`Margin`

***

### fromJSON()

> `static` **fromJSON**(`data`): `Margin`

Defined in: [geometry/Margin.ts:142](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L142)

Create a Margin from a JSON string or object.

#### Parameters

##### data

`string` \| \{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}

#### Returns

`Margin`

***

### parse()

> `static` **parse**(`value`): `Margin`

Defined in: [geometry/Margin.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L41)

GoJS-compatible: Parse a string of 1, 2, or 4 numbers.
1 value = all sides; 2 values = vertical, horizontal; 4 values = top, right, bottom, left.

#### Parameters

##### value

`string`

#### Returns

`Margin`

***

### symmetric()

> `static` **symmetric**(`vertical`, `horizontal`): `Margin`

Defined in: [geometry/Margin.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L23)

Create a Margin with vertical and horizontal values.

#### Parameters

##### vertical

`number`

##### horizontal

`number`

#### Returns

`Margin`

***

### uniform()

> `static` **uniform**(`value`): `Margin`

Defined in: [geometry/Margin.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L18)

Create a Margin with the same value on all sides.

#### Parameters

##### value

`number`

#### Returns

`Margin`

***

### zero()

> `static` **zero**(): `Margin`

Defined in: [geometry/Margin.ts:28](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Margin.ts#L28)

Create a zero margin.

#### Returns

`Margin`
