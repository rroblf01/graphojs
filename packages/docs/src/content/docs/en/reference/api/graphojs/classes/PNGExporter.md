---
editUrl: false
next: false
prev: false
title: "PNGExporter"
---

Defined in: [export/PNGExporter.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/PNGExporter.ts#L25)

Exports a diagram to a raster image (PNG).
Renders the diagram content to an offscreen canvas.

## Constructors

### Constructor

> **new PNGExporter**(`options?`): `PNGExporter`

Defined in: [export/PNGExporter.ts:28](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/PNGExporter.ts#L28)

#### Parameters

##### options?

[`ImageExportOptions`](/en/reference/api/graphojs/interfaces/imageexportoptions/) = `{}`

#### Returns

`PNGExporter`

## Methods

### exportToFile()

> **exportToFile**(`diagram`, `filename`): `void`

Defined in: [export/PNGExporter.ts:208](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/PNGExporter.ts#L208)

Download the diagram as a PNG file.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### filename

`string`

#### Returns

`void`

***

### makeBlob()

> **makeBlob**(`diagram`): `Promise`\<`Blob`\>

Defined in: [export/PNGExporter.ts:195](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/PNGExporter.ts#L195)

Export the diagram to a PNG Blob.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`Promise`\<`Blob`\>

***

### makeCanvas()

> **makeCanvas**(`diagram`): `HTMLCanvasElement`

Defined in: [export/PNGExporter.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/PNGExporter.ts#L41)

Render the diagram content to an offscreen canvas.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`HTMLCanvasElement`

***

### makeDataURL()

> **makeDataURL**(`diagram`): `string`

Defined in: [export/PNGExporter.ts:188](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/PNGExporter.ts#L188)

Export the diagram to a PNG data URL.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`string`
