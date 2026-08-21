---
editUrl: false
next: false
prev: false
title: "Spot"
---

Defined in: [geometry/Spot.ts:7](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L7)

A Spot represents an alignment point within a rectangle.
Standard spots: TopLeft, TopCenter, TopRight, LeftMiddle, Center,
RightMiddle, BottomLeft, BottomCenter, BottomRight.
Fractional spots allow any position using x/y in [0,1] plus offsets.

## Constructors

### Constructor

> **new Spot**(`x?`, `y?`, `offsetX?`, `offsetY?`): `Spot`

Defined in: [geometry/Spot.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L17)

#### Parameters

##### x?

`number` = `0.5`

##### y?

`number` = `0.5`

##### offsetX?

`number` = `0`

##### offsetY?

`number` = `0`

#### Returns

`Spot`

## Properties

### offsetX

> `readonly` **offsetX**: `number`

Defined in: [geometry/Spot.ts:13](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L13)

Offset in pixels applied after the fractional position.

***

### offsetY

> `readonly` **offsetY**: `number`

Defined in: [geometry/Spot.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L15)

Offset in pixels applied after the fractional position.

***

### x

> `readonly` **x**: `number`

Defined in: [geometry/Spot.ts:9](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L9)

x as a fraction of the width (0..1).

***

### y

> `readonly` **y**: `number`

Defined in: [geometry/Spot.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L11)

y as a fraction of the height (0..1).

***

### Bottom

> `readonly` `static` **Bottom**: `Spot`

Defined in: [geometry/Spot.ts:57](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L57)

GoJS-compatible: Spot at the bottom-center.

***

### BottomCenter

> `readonly` `static` **BottomCenter**: `Spot`

Defined in: [geometry/Spot.ts:55](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L55)

Spot at the bottom-center.

***

### BottomLeft

> `readonly` `static` **BottomLeft**: `Spot`

Defined in: [geometry/Spot.ts:53](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L53)

Spot at the bottom-left corner.

***

### BottomRight

> `readonly` `static` **BottomRight**: `Spot`

Defined in: [geometry/Spot.ts:59](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L59)

Spot at the bottom-right corner.

***

### Center

> `readonly` `static` **Center**: `Spot`

Defined in: [geometry/Spot.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L41)

Spot at the center.

***

### Left

> `readonly` `static` **Left**: `Spot`

Defined in: [geometry/Spot.ts:37](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L37)

GoJS-compatible: Spot at the middle of the left edge.

***

### LeftMiddle

> `readonly` `static` **LeftMiddle**: `Spot`

Defined in: [geometry/Spot.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L33)

Spot at the middle of the left edge.

***

### LeftSide

> `readonly` `static` **LeftSide**: `Spot`

Defined in: [geometry/Spot.ts:39](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L39)

GoJS-compatible: Spot at the middle of the left edge.

***

### MiddleCenter

> `readonly` `static` **MiddleCenter**: `Spot`

Defined in: [geometry/Spot.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L43)

GoJS-compatible: Spot at the center.

***

### MiddleLeft

> `readonly` `static` **MiddleLeft**: `Spot`

Defined in: [geometry/Spot.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L35)

GoJS-compatible: Spot at the middle of the left edge.

***

### MiddleRight

> `readonly` `static` **MiddleRight**: `Spot`

Defined in: [geometry/Spot.ts:47](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L47)

GoJS-compatible: Spot at the middle of the right edge.

***

### None

> `readonly` `static` **None**: `Spot`

Defined in: [geometry/Spot.ts:61](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L61)

GoJS-compatible: A spot with no meaningful position.

***

### Right

> `readonly` `static` **Right**: `Spot`

Defined in: [geometry/Spot.ts:49](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L49)

GoJS-compatible: Spot at the middle of the right edge.

***

### RightMiddle

> `readonly` `static` **RightMiddle**: `Spot`

Defined in: [geometry/Spot.ts:45](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L45)

Spot at the middle of the right edge.

***

### RightSide

> `readonly` `static` **RightSide**: `Spot`

Defined in: [geometry/Spot.ts:51](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L51)

GoJS-compatible: Spot at the middle of the right edge.

***

### Top

> `readonly` `static` **Top**: `Spot`

Defined in: [geometry/Spot.ts:29](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L29)

GoJS-compatible: Spot at the top-center.

***

### TopCenter

> `readonly` `static` **TopCenter**: `Spot`

Defined in: [geometry/Spot.ts:27](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L27)

Spot at the top-center.

***

### TopLeft

> `readonly` `static` **TopLeft**: `Spot`

Defined in: [geometry/Spot.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L25)

Spot at the top-left corner.

***

### TopRight

> `readonly` `static` **TopRight**: `Spot`

Defined in: [geometry/Spot.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L31)

Spot at the top-right corner.

## Methods

### computePoint()

> **computePoint**(`x`, `y`, `width`, `height`): `object`

Defined in: [geometry/Spot.ts:149](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L149)

Compute the point within a rect for this spot.

#### Parameters

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### copy()

> **copy**(): `Spot`

Defined in: [geometry/Spot.ts:172](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L172)

GoJS-compatible: Return a copy of this spot.

#### Returns

`Spot`

***

### equals()

> **equals**(`other`): `boolean`

Defined in: [geometry/Spot.ts:157](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L157)

Check if two spots are equivalent.

#### Parameters

##### other

`Spot`

#### Returns

`boolean`

***

### isSpot()

> **isSpot**(): `boolean`

Defined in: [geometry/Spot.ts:81](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L81)

GoJS-compatible: Whether this spot has valid fractional coordinates.

#### Returns

`boolean`

***

### offset()

> **offset**(`dx`, `dy`): `Spot`

Defined in: [geometry/Spot.ts:167](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L167)

Return a copy with additional offset.

#### Parameters

##### dx

`number`

##### dy

`number`

#### Returns

`Spot`

***

### pointToSpot()

> **pointToSpot**(`px`, `py`, `x`, `y`, `width`, `height`): `Spot`

Defined in: [geometry/Spot.ts:107](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L107)

GoJS-compatible: Compute the spot (fraction) for a point within a rect.

#### Parameters

##### px

`number`

##### py

`number`

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

#### Returns

`Spot`

***

### setSpot()

> **setSpot**(`x`, `y`, `offsetX?`, `offsetY?`): `this`

Defined in: [geometry/Spot.ts:93](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L93)

GoJS-compatible: In-place mutation returning this spot.

#### Parameters

##### x

`number`

##### y

`number`

##### offsetX?

`number` = `0`

##### offsetY?

`number` = `0`

#### Returns

`this`

***

### spotToPoint()

> **spotToPoint**(`x`, `y`, `width`, `height`): `object`

Defined in: [geometry/Spot.ts:102](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L102)

GoJS-compatible: Compute the point in the rect for this spot.

#### Parameters

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### fromName()

> `static` **fromName**(`name`): `Spot`

Defined in: [geometry/Spot.ts:114](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L114)

Create a Spot from a standard name.

#### Parameters

##### name

`string`

#### Returns

`Spot`

***

### isSpot()

> `static` **isSpot**(`value`): `boolean`

Defined in: [geometry/Spot.ts:76](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L76)

GoJS-compatible: Whether the given value is a Spot object.

#### Parameters

##### value

`unknown`

#### Returns

`boolean`

***

### parse()

> `static` **parse**(`value`): `Spot`

Defined in: [geometry/Spot.ts:64](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Spot.ts#L64)

GoJS-compatible: Parse a string like "0,0", "1 1 4 4", or a standard name like "MiddleCenter".

#### Parameters

##### value

`string`

#### Returns

`Spot`
