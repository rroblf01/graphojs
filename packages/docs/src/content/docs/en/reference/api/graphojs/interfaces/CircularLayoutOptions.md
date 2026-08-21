---
editUrl: false
next: false
prev: false
title: "CircularLayoutOptions"
---

Defined in: [layout/CircularLayout.ts:8](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/CircularLayout.ts#L8)

Options for circular layout.

## Extends

- [`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/)

## Properties

### center?

> `optional` **center?**: `boolean`

Defined in: [layout/Layout.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L17)

Whether to center the layout. Default: true

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`center`](/en/reference/api/graphojs/interfaces/layoutoptions/#center)

***

### concentric?

> `optional` **concentric?**: `boolean`

Defined in: [layout/CircularLayout.ts:16](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/CircularLayout.ts#L16)

Whether to arrange in concentric circles. Default: false

***

### direction?

> `optional` **direction?**: `"horizontal"` \| `"vertical"`

Defined in: [layout/Layout.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L15)

Whether to arrange in a specific direction. Default: 'vertical'

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`direction`](/en/reference/api/graphojs/interfaces/layoutoptions/#direction)

***

### padding?

> `optional` **padding?**: `number`

Defined in: [layout/Layout.ts:13](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L13)

Border padding. Default: 20

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`padding`](/en/reference/api/graphojs/interfaces/layoutoptions/#padding)

***

### radius?

> `optional` **radius?**: `number`

Defined in: [layout/CircularLayout.ts:10](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/CircularLayout.ts#L10)

Radius of the circle. Default: auto-computed from node count/size.

***

### sortByDegree?

> `optional` **sortByDegree?**: `boolean`

Defined in: [layout/CircularLayout.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/CircularLayout.ts#L14)

Whether to sort nodes by degree (most-connected first). Default: false

***

### spacing?

> `optional` **spacing?**: `number`

Defined in: [layout/Layout.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L11)

Spacing between nodes. Default: 50

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`spacing`](/en/reference/api/graphojs/interfaces/layoutoptions/#spacing)

***

### startAngle?

> `optional` **startAngle?**: `number`

Defined in: [layout/CircularLayout.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/CircularLayout.ts#L12)

Starting angle in degrees. Default: 0
