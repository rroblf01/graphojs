---
editUrl: false
next: false
prev: false
title: "normalizeShapeType"
---

> **normalizeShapeType**(`value`): [`ShapeType`](/en/reference/api/graphojs/type-aliases/shapetype/)

Defined in: [shapes/ShapeTypes.ts:752](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/shapes/ShapeTypes.ts#L752)

Normalize a GoJS-style figure name (e.g. "RoundedRectangle", "ManualOperation")
or an existing ShapeType into a valid ShapeType.
Falls back to 'rect' for unknown names.

## Parameters

### value

`string`

## Returns

[`ShapeType`](/en/reference/api/graphojs/type-aliases/shapetype/)
