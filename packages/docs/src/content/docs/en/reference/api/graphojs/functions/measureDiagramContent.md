---
editUrl: false
next: false
prev: false
title: "measureDiagramContent"
---

> **measureDiagramContent**(`diagram`): `object`

Defined in: [export/ServerRenderer.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ServerRenderer.ts#L38)

Bounding box of all visible content in `diagram`, ignoring the grid layer.

 Shape and defaults may still change before 1.0.0 based on
real-world server-rendering usage.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

## Parameters

### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

## Returns

`object`

### height

> **height**: `number`

### width

> **width**: `number`

### x

> **x**: `number`

### y

> **y**: `number`
