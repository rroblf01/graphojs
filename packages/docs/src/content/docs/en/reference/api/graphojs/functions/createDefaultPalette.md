---
editUrl: false
next: false
prev: false
title: "createDefaultPalette"
---

> **createDefaultPalette**(`container`, `diagram`, `options?`): `Promise`\<[`Palette`](/en/reference/api/graphojs/classes/palette/)\>

Defined in: [export/Palette.ts:183](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Palette.ts#L183)

Create a palette with all predefined templates.
The predefined templates are loaded lazily so they do not inflate the
main bundle unless a default palette is actually created.

## Parameters

### container

`HTMLElement`

### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

### options?

#### showCategories?

`boolean`

## Returns

`Promise`\<[`Palette`](/en/reference/api/graphojs/classes/palette/)\>
