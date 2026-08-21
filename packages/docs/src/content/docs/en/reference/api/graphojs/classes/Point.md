---
editUrl: false
next: false
prev: false
title: "Point"
---

Defined in: [geometry/Point.ts:4](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L4)

A 2D point with x and y coordinates.

## Constructors

### Constructor

> **new Point**(`x`, `y`): `Point`

Defined in: [geometry/Point.ts:8](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L8)

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`Point`

## Properties

### x

> **x**: `number`

Defined in: [geometry/Point.ts:5](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L5)

***

### y

> **y**: `number`

Defined in: [geometry/Point.ts:6](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L6)

## Methods

### add()

> **add**(`other`): `Point`

Defined in: [geometry/Point.ts:102](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L102)

Add another point to this point.

#### Parameters

##### other

`Point`

#### Returns

`Point`

***

### angle()

> **angle**(): `number`

Defined in: [geometry/Point.ts:153](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L153)

Calculate the angle in radians from the positive x-axis.

#### Returns

`number`

***

### clone()

> **clone**(): `Point`

Defined in: [geometry/Point.ts:48](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L48)

Return a copy of this point.

#### Returns

`Point`

***

### copy()

> **copy**(): `Point`

Defined in: [geometry/Point.ts:53](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L53)

GoJS-compatible: Return a copy of this point.

#### Returns

`Point`

***

### cross()

> **cross**(`other`): `number`

Defined in: [geometry/Point.ts:97](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L97)

GoJS-compatible: The cross product with another point (x1*y2 - y1*x2).

#### Parameters

##### other

`Point`

#### Returns

`number`

***

### distance()

> **distance**(`other`): `number`

Defined in: [geometry/Point.ts:70](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L70)

GoJS-compatible: The distance to another point.

#### Parameters

##### other

`Point`

#### Returns

`number`

***

### distanceSquared()

> **distanceSquared**(`other`): `number`

Defined in: [geometry/Point.ts:63](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L63)

GoJS-compatible: The squared distance to another point.

#### Parameters

##### other

`Point`

#### Returns

`number`

***

### distanceSquaredTo()

> **distanceSquaredTo**(`other`): `number`

Defined in: [geometry/Point.ts:124](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L124)

Calculate the squared distance to another point (faster, no sqrt).

#### Parameters

##### other

`Point`

#### Returns

`number`

***

### distanceTo()

> **distanceTo**(`other`): `number`

Defined in: [geometry/Point.ts:117](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L117)

Calculate the distance to another point.

#### Parameters

##### other

`Point`

#### Returns

`number`

***

### dot()

> **dot**(`other`): `number`

Defined in: [geometry/Point.ts:148](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L148)

Calculate the dot product with another point.

#### Parameters

##### other

`Point`

#### Returns

`number`

***

### equals()

> **equals**(`other`): `boolean`

Defined in: [geometry/Point.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L38)

Check if this point equals another point.

#### Parameters

##### other

`Point`

#### Returns

`boolean`

***

### equalsApprox()

> **equalsApprox**(`other`, `tolerance?`): `boolean`

Defined in: [geometry/Point.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L43)

Check if this point is approximately equal to another within a tolerance.

#### Parameters

##### other

`Point`

##### tolerance?

`number` = `0.0001`

#### Returns

`boolean`

***

### isFinite()

> **isFinite**(): `boolean`

Defined in: [geometry/Point.ts:165](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L165)

Check if this point is finite.

#### Returns

`boolean`

***

### isNaN()

> **isNaN**(): `boolean`

Defined in: [geometry/Point.ts:82](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L82)

GoJS-compatible: Whether either coordinate is NaN.

#### Returns

`boolean`

***

### isZero()

> **isZero**(): `boolean`

Defined in: [geometry/Point.ts:170](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L170)

Check if this point is the zero point.

#### Returns

`boolean`

***

### length()

> **length**(): `number`

Defined in: [geometry/Point.ts:131](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L131)

Calculate the length (magnitude) of this point as a vector.

#### Returns

`number`

***

### lengthSquared()

> **lengthSquared**(): `number`

Defined in: [geometry/Point.ts:136](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L136)

Calculate the squared length of this point as a vector.

#### Returns

`number`

***

### multiply()

> **multiply**(`other`): `Point`

Defined in: [geometry/Point.ts:77](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L77)

GoJS-compatible: Component-wise multiply (x*p.x, y*p.y).

#### Parameters

##### other

`Point`

#### Returns

`Point`

***

### normalize()

> **normalize**(): `Point`

Defined in: [geometry/Point.ts:141](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L141)

Normalize this point to unit length.

#### Returns

`Point`

***

### offset()

> **offset**(`dx`, `dy`): `Point`

Defined in: [geometry/Point.ts:58](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L58)

GoJS-compatible: Return a new point offset by (dx, dy).

#### Parameters

##### dx

`number`

##### dy

`number`

#### Returns

`Point`

***

### rotate()

> **rotate**(`angle`): `Point`

Defined in: [geometry/Point.ts:158](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L158)

Rotate this point around the origin by the given angle in radians.

#### Parameters

##### angle

`number`

#### Returns

`Point`

***

### scale()

> **scale**(`factor`): `Point`

Defined in: [geometry/Point.ts:112](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L112)

Scale this point by a factor.

#### Parameters

##### factor

`number`

#### Returns

`Point`

***

### subtract()

> **subtract**(`other`): `Point`

Defined in: [geometry/Point.ts:107](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L107)

Subtract another point from this point.

#### Parameters

##### other

`Point`

#### Returns

`Point`

***

### toJSON()

> **toJSON**(): `object`

Defined in: [geometry/Point.ts:175](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L175)

Convert to a plain object.

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### toString()

> **toString**(): `string`

Defined in: [geometry/Point.ts:185](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L185)

#### Returns

`string`

***

### from()

> `static` **from**(`obj`): `Point`

Defined in: [geometry/Point.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L14)

Create a Point from an object with x and y properties.

#### Parameters

##### obj

###### x

`number`

###### y

`number`

#### Returns

`Point`

***

### fromJSON()

> `static` **fromJSON**(`data`): `Point`

Defined in: [geometry/Point.ts:180](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L180)

Create a Point from a JSON string or object.

#### Parameters

##### data

`string` \| \{ `x`: `number`; `y`: `number`; \}

#### Returns

`Point`

***

### of()

> `static` **of**(`value`): `Point`

Defined in: [geometry/Point.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L33)

Create a point where x === y.

#### Parameters

##### value

`number`

#### Returns

`Point`

***

### parse()

> `static` **parse**(`value`): `Point`

Defined in: [geometry/Point.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L24)

GoJS-compatible: Parse a string like "100, 200" or "100 200".

#### Parameters

##### value

`string`

#### Returns

`Point`

***

### polar()

> `static` **polar**(`length`, `angle`): `Point`

Defined in: [geometry/Point.ts:87](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L87)

GoJS-compatible: Create a point on a circle of the given radius at the given angle (radians).

#### Parameters

##### length

`number`

##### angle

`number`

#### Returns

`Point`

***

### random()

> `static` **random**(): `Point`

Defined in: [geometry/Point.ts:92](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L92)

GoJS-compatible: Create a random point with coordinates in [0, 1).

#### Returns

`Point`

***

### zero()

> `static` **zero**(): `Point`

Defined in: [geometry/Point.ts:19](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Point.ts#L19)

Create a zero point (0, 0).

#### Returns

`Point`
