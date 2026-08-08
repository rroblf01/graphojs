---
editUrl: false
next: false
prev: false
title: "GridLayoutOptions"
---

Defined in: [layout/GridLayout.ts:8](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/GridLayout.ts#L8)

Options for grid layout.

## Extends

- [`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/)

## Properties

### center?

> `optional` **center?**: `boolean`

Defined in: [layout/Layout.ts:17](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L17)

Whether to center the layout. Default: true

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`center`](/en/reference/api/graphojs/interfaces/layoutoptions/#center)

***

### columns?

> `optional` **columns?**: `number`

Defined in: [layout/GridLayout.ts:10](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/GridLayout.ts#L10)

Number of columns. If not set, calculated from node count and rows.

***

### direction?

> `optional` **direction?**: `"horizontal"` \| `"vertical"`

Defined in: [layout/Layout.ts:15](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L15)

Whether to arrange in a specific direction. Default: 'vertical'

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`direction`](/en/reference/api/graphojs/interfaces/layoutoptions/#direction)

***

### padding?

> `optional` **padding?**: `number`

Defined in: [layout/Layout.ts:13](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L13)

Border padding. Default: 20

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`padding`](/en/reference/api/graphojs/interfaces/layoutoptions/#padding)

***

### rows?

> `optional` **rows?**: `number`

Defined in: [layout/GridLayout.ts:12](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/GridLayout.ts#L12)

Number of rows. If not set, calculated from node count and columns.

***

### spacing?

> `optional` **spacing?**: `number`

Defined in: [layout/Layout.ts:11](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L11)

Spacing between nodes. Default: 50

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`spacing`](/en/reference/api/graphojs/interfaces/layoutoptions/#spacing)

***

### spacingX?

> `optional` **spacingX?**: `number`

Defined in: [layout/GridLayout.ts:14](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/GridLayout.ts#L14)

Horizontal spacing between cells. Default: 20

***

### spacingY?

> `optional` **spacingY?**: `number`

Defined in: [layout/GridLayout.ts:16](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/GridLayout.ts#L16)

Vertical spacing between cells. Default: 20

***

### startingPosition?

> `optional` **startingPosition?**: `object`

Defined in: [layout/GridLayout.ts:18](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/GridLayout.ts#L18)

Starting position. Default: { x: 0, y: 0 }

#### x

> **x**: `number`

#### y

> **y**: `number`
