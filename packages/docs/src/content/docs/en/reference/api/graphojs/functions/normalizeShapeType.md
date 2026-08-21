---
editUrl: false
next: false
prev: false
title: "normalizeShapeType"
---

> **normalizeShapeType**(`value`): [`ShapeType`](/en/reference/api/graphojs/type-aliases/shapetype/)

Defined in: [shapes/ShapeTypes.ts:938](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/shapes/ShapeTypes.ts#L938)

Normalize a GoJS-style figure name (e.g. "RoundedRectangle", "ManualOperation")
or an existing ShapeType into a valid ShapeType.
Falls back to 'rect' for unknown names.

## Parameters

### value

`string`

## Returns

[`ShapeType`](/en/reference/api/graphojs/type-aliases/shapetype/)
