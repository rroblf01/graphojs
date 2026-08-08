---
editUrl: false
next: false
prev: false
title: "createDefaultPalette"
---

> **createDefaultPalette**(`container`, `diagram`, `options?`): `Promise`\<[`Palette`](/en/reference/api/graphojs/classes/palette/)\>

Defined in: [export/Palette.ts:183](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/Palette.ts#L183)

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
