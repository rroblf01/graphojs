---
editUrl: false
next: false
prev: false
title: "Geometry"
---

Defined in: [geometry/Geometry.ts:173](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L173)

GoJS-compatible: a custom, programmatically-built shape outline for
`Shape.geometry`, mirroring real GoJS's `Geometry`/`PathFigure`/
`PathSegment` object model.

Unlike real GoJS, graphojs doesn't have a separate native rendering path
for arbitrary geometries — a `Geometry` serializes to the same SVG-like
mini-language string `Shape.geometryString` already supports
(M/L/C/Q/A/Z), and `Shape.geometry = someGeometry` sets `geometryString`
from that serialization under the hood. `Geometry.parse`/`stringify`
round-trip through the same format; smooth-curve shorthand (SVG's S/T)
is expanded to an equivalent absolute C/Q on parse, since PathSegment has
no direct "smooth" segment type.

## Constructors

### Constructor

> **new Geometry**(`type?`, `init?`): `Geometry`

Defined in: [geometry/Geometry.ts:186](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L186)

#### Parameters

##### type?

[`GeometryType`](/en/reference/api/graphojs/type-aliases/geometrytype/) = `GeometryType.Path`

##### init?

`Partial`\<`Geometry`\>

#### Returns

`Geometry`

## Properties

### endX

> **endX**: `number` = `0`

Defined in: [geometry/Geometry.ts:182](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L182)

***

### endY

> **endY**: `number` = `0`

Defined in: [geometry/Geometry.ts:183](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L183)

***

### startX

> **startX**: `number` = `0`

Defined in: [geometry/Geometry.ts:180](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L180)

***

### startY

> **startY**: `number` = `0`

Defined in: [geometry/Geometry.ts:181](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L181)

***

### type

> **type**: [`GeometryType`](/en/reference/api/graphojs/type-aliases/geometrytype/)

Defined in: [geometry/Geometry.ts:179](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L179)

***

### Ellipse

> `readonly` `static` **Ellipse**: `2` = `GeometryType.Ellipse`

Defined in: [geometry/Geometry.ts:176](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L176)

***

### Line

> `readonly` `static` **Line**: `0` = `GeometryType.Line`

Defined in: [geometry/Geometry.ts:174](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L174)

***

### Path

> `readonly` `static` **Path**: `3` = `GeometryType.Path`

Defined in: [geometry/Geometry.ts:177](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L177)

***

### Rectangle

> `readonly` `static` **Rectangle**: `1` = `GeometryType.Rectangle`

Defined in: [geometry/Geometry.ts:175](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L175)

## Accessors

### figures

#### Get Signature

> **get** **figures**(): [`List`](/en/reference/api/graphojs/classes/list/)\<[`PathFigure`](/en/reference/api/graphojs/classes/pathfigure/)\>

Defined in: [geometry/Geometry.ts:206](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L206)

##### Returns

[`List`](/en/reference/api/graphojs/classes/list/)\<[`PathFigure`](/en/reference/api/graphojs/classes/pathfigure/)\>

#### Set Signature

> **set** **figures**(`value`): `void`

Defined in: [geometry/Geometry.ts:210](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L210)

##### Parameters

###### value

[`List`](/en/reference/api/graphojs/classes/list/)\<[`PathFigure`](/en/reference/api/graphojs/classes/pathfigure/)\>

##### Returns

`void`

## Methods

### add()

> **add**(`figure`): `this`

Defined in: [geometry/Geometry.ts:215](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L215)

GoJS-compatible: append a figure; returns `this`.

#### Parameters

##### figure

[`PathFigure`](/en/reference/api/graphojs/classes/pathfigure/)

#### Returns

`this`

***

### computeBoundsWithoutOrigin()

> **computeBoundsWithoutOrigin**(`result?`): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [geometry/Geometry.ts:221](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L221)

Compute the bounding box of every figure's points (an approximation: does not flatten curves).

#### Parameters

##### result?

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### containsPoint()

> **containsPoint**(`p`): `boolean`

Defined in: [geometry/Geometry.ts:405](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L405)

Test membership by checking against the flattened bounding box (an approximation, not exact path containment).

#### Parameters

##### p

[`Point`](/en/reference/api/graphojs/classes/point/)

#### Returns

`boolean`

***

### copy()

> **copy**(): `Geometry`

Defined in: [geometry/Geometry.ts:192](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L192)

#### Returns

`Geometry`

***

### equalsApprox()

> **equalsApprox**(`g`): `boolean`

Defined in: [geometry/Geometry.ts:202](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L202)

#### Parameters

##### g

`Geometry`

#### Returns

`boolean`

***

### parse()

> `static` **parse**(`str`, `filled?`): `Geometry`

Defined in: [geometry/Geometry.ts:297](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L297)

GoJS-compatible: parse a geometryString into a structured `Geometry`.
H/V are expanded to an equivalent L; S/T (smooth curves) are
approximated as a plain C/Q using the given control point directly
(without SVG's "reflect the previous control point" adjustment).

#### Parameters

##### str

`string`

##### filled?

`boolean` = `true`

#### Returns

`Geometry`

***

### stringify()

> `static` **stringify**(`val`): `string`

Defined in: [geometry/Geometry.ts:256](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L256)

GoJS-compatible: serialize to graphojs's geometryString mini-language (M/L/C/Q/A/Z).

#### Parameters

##### val

`Geometry`

#### Returns

`string`

***

### stringifyFixed()

> `static` **stringifyFixed**(`digits`): (`val`) => `string`

Defined in: [geometry/Geometry.ts:397](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Geometry.ts#L397)

GoJS-compatible: a back-converter factory for `Binding`s that write a `Geometry` as a string, rounded to `digits`.

#### Parameters

##### digits

`number`

#### Returns

(`val`) => `string`
