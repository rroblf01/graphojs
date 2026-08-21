---
editUrl: false
next: false
prev: false
title: "TreeLayoutOptions"
---

Defined in: [layout/TreeLayout.ts:8](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeLayout.ts#L8)

Options for tree layout.

## Extends

- [`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/)

## Properties

### angle?

> `optional` **angle?**: `number`

Defined in: [layout/TreeLayout.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeLayout.ts#L11)

Angle in degrees for the tree's growth direction (0=down, 90=right, 180=up, 270=left) in the
 non-radial layout, or the start angle in the radial layout. Default: 0

***

### angleIncrement?

> `optional` **angleIncrement?**: `number`

Defined in: [layout/TreeLayout.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeLayout.ts#L15)

Angle increment for radial layout. Default: 45

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

### nodeSpacing?

> `optional` **nodeSpacing?**: `number`

Defined in: [layout/TreeLayout.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeLayout.ts#L17)

Node separation in the non-primary direction. Default: 30

***

### padding?

> `optional` **padding?**: `number`

Defined in: [layout/Layout.ts:13](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L13)

Border padding. Default: 20

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`padding`](/en/reference/api/graphojs/interfaces/layoutoptions/#padding)

***

### radial?

> `optional` **radial?**: `boolean`

Defined in: [layout/TreeLayout.ts:13](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeLayout.ts#L13)

Whether to use radial layout. Default: false

***

### spacing?

> `optional` **spacing?**: `number`

Defined in: [layout/Layout.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L11)

Spacing between nodes. Default: 50

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`spacing`](/en/reference/api/graphojs/interfaces/layoutoptions/#spacing)
