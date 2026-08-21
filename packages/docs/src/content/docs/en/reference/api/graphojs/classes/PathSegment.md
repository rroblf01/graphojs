---
editUrl: false
next: false
prev: false
title: "PathSegment"
---

Defined in: [geometry/Geometry.ts:30](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L30)

GoJS-compatible: one segment of a [PathFigure](/en/reference/api/graphojs/classes/pathfigure/) — a line, bezier, or
arc from the current point to `(endX, endY)`.

## Constructors

### Constructor

> **new PathSegment**(`type?`, `ex?`, `ey?`, `x1?`, `y1?`, `x2?`, `y2?`, `clockwise?`): `PathSegment`

Defined in: [geometry/Geometry.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L41)

#### Parameters

##### type?

[`SegmentType`](/en/reference/api/graphojs/type-aliases/segmenttype/) = `SegmentType.Line`

##### ex?

`number` = `0`

##### ey?

`number` = `0`

##### x1?

`number` = `0`

##### y1?

`number` = `0`

##### x2?

`number` = `0`

##### y2?

`number` \| `boolean`

##### clockwise?

`boolean` = `true`

#### Returns

`PathSegment`

## Properties

### clockwise

> **clockwise**: `boolean`

Defined in: [geometry/Geometry.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L38)

***

### endX

> **endX**: `number`

Defined in: [geometry/Geometry.ts:32](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L32)

***

### endY

> **endY**: `number`

Defined in: [geometry/Geometry.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L33)

***

### point1X

> **point1X**: `number`

Defined in: [geometry/Geometry.ts:34](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L34)

***

### point1Y

> **point1Y**: `number`

Defined in: [geometry/Geometry.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L35)

***

### point2X

> **point2X**: `number`

Defined in: [geometry/Geometry.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L36)

***

### point2Y

> **point2Y**: `number` \| `boolean`

Defined in: [geometry/Geometry.ts:37](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L37)

***

### type

> **type**: [`SegmentType`](/en/reference/api/graphojs/type-aliases/segmenttype/)

Defined in: [geometry/Geometry.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L31)

## Accessors

### isClosed

#### Get Signature

> **get** **isClosed**(): `boolean`

Defined in: [geometry/Geometry.ts:94](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L94)

##### Returns

`boolean`

#### Set Signature

> **set** **isClosed**(`value`): `void`

Defined in: [geometry/Geometry.ts:98](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L98)

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### close()

> **close**(): `this`

Defined in: [geometry/Geometry.ts:89](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L89)

GoJS-compatible: mark this segment as closing its figure; returns `this`.

#### Returns

`this`

***

### copy()

> **copy**(): `PathSegment`

Defined in: [geometry/Geometry.ts:61](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L61)

#### Returns

`PathSegment`

***

### equalsApprox()

> **equalsApprox**(`s`): `boolean`

Defined in: [geometry/Geometry.ts:76](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L76)

#### Parameters

##### s

`PathSegment`

#### Returns

`boolean`
