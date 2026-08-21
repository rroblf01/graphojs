---
editUrl: false
next: false
prev: false
title: "PathFigure"
---

Defined in: [geometry/Geometry.ts:107](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L107)

GoJS-compatible: a subpath of a [Geometry](/en/reference/api/graphojs/classes/geometry/) — a starting point plus
an ordered list of [PathSegment](/en/reference/api/graphojs/classes/pathsegment/)s.

## Constructors

### Constructor

> **new PathFigure**(`sx?`, `sy?`, `filled?`, `shadowed?`, `isEvenOdd?`): `PathFigure`

Defined in: [geometry/Geometry.ts:115](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L115)

#### Parameters

##### sx?

`number` = `0`

##### sy?

`number` = `0`

##### filled?

`boolean` = `true`

##### shadowed?

`boolean` = `true`

##### isEvenOdd?

`boolean` = `false`

#### Returns

`PathFigure`

## Properties

### isEvenOdd

> **isEvenOdd**: `boolean`

Defined in: [geometry/Geometry.ts:112](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L112)

***

### isFilled

> **isFilled**: `boolean`

Defined in: [geometry/Geometry.ts:110](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L110)

***

### isShadowed

> **isShadowed**: `boolean`

Defined in: [geometry/Geometry.ts:111](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L111)

***

### startX

> **startX**: `number`

Defined in: [geometry/Geometry.ts:108](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L108)

***

### startY

> **startY**: `number`

Defined in: [geometry/Geometry.ts:109](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L109)

## Accessors

### segments

#### Get Signature

> **get** **segments**(): [`List`](/en/reference/api/graphojs/classes/list/)\<[`PathSegment`](/en/reference/api/graphojs/classes/pathsegment/)\>

Defined in: [geometry/Geometry.ts:144](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L144)

##### Returns

[`List`](/en/reference/api/graphojs/classes/list/)\<[`PathSegment`](/en/reference/api/graphojs/classes/pathsegment/)\>

#### Set Signature

> **set** **segments**(`value`): `void`

Defined in: [geometry/Geometry.ts:148](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L148)

##### Parameters

###### value

[`List`](/en/reference/api/graphojs/classes/list/)\<[`PathSegment`](/en/reference/api/graphojs/classes/pathsegment/)\>

##### Returns

`void`

## Methods

### add()

> **add**(`segment`): `this`

Defined in: [geometry/Geometry.ts:153](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L153)

GoJS-compatible: append a segment; returns `this`.

#### Parameters

##### segment

[`PathSegment`](/en/reference/api/graphojs/classes/pathsegment/)

#### Returns

`this`

***

### copy()

> **copy**(): `PathFigure`

Defined in: [geometry/Geometry.ts:124](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L124)

#### Returns

`PathFigure`

***

### equalsApprox()

> **equalsApprox**(`f`): `boolean`

Defined in: [geometry/Geometry.ts:136](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L136)

#### Parameters

##### f

`PathFigure`

#### Returns

`boolean`
