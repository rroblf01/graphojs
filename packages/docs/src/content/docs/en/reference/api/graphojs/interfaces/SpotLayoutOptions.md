---
editUrl: false
next: false
prev: false
title: "SpotLayoutOptions"
---

Defined in: [layout/SpotLayout.ts:8](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/SpotLayout.ts#L8)

Options for spot layout.

## Extends

- [`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/)

## Properties

### alignmentSpot?

> `optional` **alignmentSpot?**: `object`

Defined in: [layout/SpotLayout.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/SpotLayout.ts#L23)

GoJS-compatible: the fractional point on each node (0,0 = top-left,
0.5,0.5 = center, 1,1 = bottom-right) that aligns to the target spot,
independent of that node's own size — e.g. with alignmentSpot centered
and a single target spot (no offset), differently-sized nodes all end
up centered on the same point rather than aligned by their top-left
corners. Default: { x: 0, y: 0 } (top-left), matching plain positioning.

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### center?

> `optional` **center?**: `boolean`

Defined in: [layout/Layout.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L17)

Whether to center the layout. Default: true

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`center`](/en/reference/api/graphojs/interfaces/layoutoptions/#center)

***

### direction?

> `optional` **direction?**: `"horizontal"` \| `"vertical"`

Defined in: [layout/Layout.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L15)

Whether to arrange in a specific direction. Default: 'vertical'

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`direction`](/en/reference/api/graphojs/interfaces/layoutoptions/#direction)

***

### offset?

> `optional` **offset?**: `object`

Defined in: [layout/SpotLayout.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/SpotLayout.ts#L12)

Offset for each subsequent node. Default: { x: 120, y: 0 }

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### padding?

> `optional` **padding?**: `number`

Defined in: [layout/Layout.ts:13](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L13)

Border padding. Default: 20

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`padding`](/en/reference/api/graphojs/interfaces/layoutoptions/#padding)

***

### spacing?

> `optional` **spacing?**: `number`

Defined in: [layout/Layout.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L11)

Spacing between nodes. Default: 50

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`spacing`](/en/reference/api/graphojs/interfaces/layoutoptions/#spacing)

***

### spot?

> `optional` **spot?**: `object`

Defined in: [layout/SpotLayout.ts:10](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/SpotLayout.ts#L10)

The spot (position) to place all nodes at. Default: { x: 0, y: 0 }

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### wrap?

> `optional` **wrap?**: `number`

Defined in: [layout/SpotLayout.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/SpotLayout.ts#L14)

Maximum nodes per row before wrapping. 0 = no wrap. Default: 0
