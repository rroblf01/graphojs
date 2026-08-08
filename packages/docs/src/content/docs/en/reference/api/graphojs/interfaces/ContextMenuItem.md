---
editUrl: false
next: false
prev: false
title: "ContextMenuItem"
---

Defined in: [export/ContextMenu.ts:4](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ContextMenu.ts#L4)

## Properties

### action

> **action**: (`diagram`, `part`, `event`) => `void`

Defined in: [export/ContextMenu.ts:8](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ContextMenu.ts#L8)

Callback when the item is clicked.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### part

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

##### event

`MouseEvent`

#### Returns

`void`

***

### className?

> `optional` **className?**: `string`

Defined in: [export/ContextMenu.ts:16](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ContextMenu.ts#L16)

CSS class for custom styling.

***

### enabled?

> `optional` **enabled?**: `boolean`

Defined in: [export/ContextMenu.ts:10](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ContextMenu.ts#L10)

Whether the item is enabled.

***

### label

> **label**: `string`

Defined in: [export/ContextMenu.ts:6](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ContextMenu.ts#L6)

The label text.

***

### separator?

> `optional` **separator?**: `boolean`

Defined in: [export/ContextMenu.ts:14](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ContextMenu.ts#L14)

Optional separator after this item.

***

### visible?

> `optional` **visible?**: `boolean`

Defined in: [export/ContextMenu.ts:12](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ContextMenu.ts#L12)

Whether the item is visible.
