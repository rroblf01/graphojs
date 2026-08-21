---
editUrl: false
next: false
prev: false
title: "SVGExporter"
---

Defined in: [export/SVGExporter.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/SVGExporter.ts#L14)

SVG exporter for diagrams.
Generates an SVG string from the current diagram state.

## Constructors

### Constructor

> **new SVGExporter**(`options?`): `SVGExporter`

Defined in: [export/SVGExporter.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/SVGExporter.ts#L18)

#### Parameters

##### options?

###### indent?

`string`

###### padding?

`number`

#### Returns

`SVGExporter`

## Methods

### export()

> **export**(`diagram`): `string`

Defined in: [export/SVGExporter.ts:26](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/SVGExporter.ts#L26)

Export a diagram to SVG string.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`string`

***

### exportToDataURL()

> **exportToDataURL**(`diagram`): `string`

Defined in: [export/SVGExporter.ts:94](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/SVGExporter.ts#L94)

Export as a data URL.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`string`

***

### exportToFile()

> **exportToFile**(`diagram`, `filename`): `void`

Defined in: [export/SVGExporter.ts:78](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/SVGExporter.ts#L78)

Export diagram to a downloadable SVG file.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### filename

`string`

#### Returns

`void`
