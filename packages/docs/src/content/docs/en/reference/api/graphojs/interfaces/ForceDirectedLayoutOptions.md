---
editUrl: false
next: false
prev: false
title: "ForceDirectedLayoutOptions"
---

Defined in: [layout/ForceDirectedLayout.ts:10](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/ForceDirectedLayout.ts#L10)

Options for force-directed layout.

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

### convergenceThreshold?

> `optional` **convergenceThreshold?**: `number`

Defined in: [layout/ForceDirectedLayout.ts:18](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/ForceDirectedLayout.ts#L18)

Convergence threshold. Default: 0.01

***

### defaultLinkDistance?

> `optional` **defaultLinkDistance?**: `number`

Defined in: [layout/ForceDirectedLayout.ts:14](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/ForceDirectedLayout.ts#L14)

Default link distance. Default: 150

***

### defaultNodeSeparation?

> `optional` **defaultNodeSeparation?**: `number`

Defined in: [layout/ForceDirectedLayout.ts:12](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/ForceDirectedLayout.ts#L12)

Default node separation. Default: 100

***

### direction?

> `optional` **direction?**: `"horizontal"` \| `"vertical"`

Defined in: [layout/Layout.ts:15](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L15)

Whether to arrange in a specific direction. Default: 'vertical'

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`direction`](/en/reference/api/graphojs/interfaces/layoutoptions/#direction)

***

### maxIterations?

> `optional` **maxIterations?**: `number`

Defined in: [layout/ForceDirectedLayout.ts:16](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/ForceDirectedLayout.ts#L16)

Iteration limit. Default: 300

***

### padding?

> `optional` **padding?**: `number`

Defined in: [layout/Layout.ts:13](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L13)

Border padding. Default: 20

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`padding`](/en/reference/api/graphojs/interfaces/layoutoptions/#padding)

***

### spacing?

> `optional` **spacing?**: `number`

Defined in: [layout/Layout.ts:11](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L11)

Spacing between nodes. Default: 50

#### Inherited from

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/).[`spacing`](/en/reference/api/graphojs/interfaces/layoutoptions/#spacing)

***

### theta?

> `optional` **theta?**: `number`

Defined in: [layout/ForceDirectedLayout.ts:27](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/ForceDirectedLayout.ts#L27)

Barnes-Hut approximation ratio for the repulsion simulation (size of a
region divided by its distance to the node being pushed — below this,
the whole region is treated as one aggregate point instead of recursing
into it). Smaller is more accurate but slower; 0 would disable the
approximation entirely (falling back to exact all-pairs repulsion).
Default: 0.9
