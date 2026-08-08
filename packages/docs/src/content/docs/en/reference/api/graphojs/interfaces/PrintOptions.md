---
editUrl: false
next: false
prev: false
title: "PrintOptions"
---

Defined in: [export/PrintExporter.ts:5](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/PrintExporter.ts#L5)

## Properties

### background?

> `optional` **background?**: `string`

Defined in: [export/PrintExporter.ts:9](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/PrintExporter.ts#L9)

Background color. Default: '#ffffff'

***

### fitToPage?

> `optional` **fitToPage?**: `boolean`

Defined in: [export/PrintExporter.ts:15](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/PrintExporter.ts#L15)

Whether to fit the content to the page width. Default: true

***

### format?

> `optional` **format?**: `"svg"` \| `"png"`

Defined in: [export/PrintExporter.ts:23](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/PrintExporter.ts#L23)

How the diagram is embedded in the print window. `'svg'` (default)
embeds a vector `<svg>` — crisp at any zoom/DPI and produces a real
vector PDF when the browser's print dialog "saves as PDF". `'png'`
rasterizes first via `PNGExporter`, for cases needing a plain raster
image instead.

***

### padding?

> `optional` **padding?**: `number`

Defined in: [export/PrintExporter.ts:11](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/PrintExporter.ts#L11)

Padding around the content. Default: 20

***

### scale?

> `optional` **scale?**: `number`

Defined in: [export/PrintExporter.ts:13](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/PrintExporter.ts#L13)

Scale factor for the printed image. Only applies to `format: 'png'`. Default: 2 (for print resolution).

***

### title?

> `optional` **title?**: `string`

Defined in: [export/PrintExporter.ts:7](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/PrintExporter.ts#L7)

Page title shown in the print header.
