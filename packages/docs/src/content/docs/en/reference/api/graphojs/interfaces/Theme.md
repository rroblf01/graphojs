---
editUrl: false
next: false
prev: false
title: "Theme"
---

Defined in: [theme/Theme.ts:37](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L37)

GoJS-compatible: a named collection of theme values (colors, fonts,
numbers, etc.) that `ThemeBinding`/`GraphObject.theme()` look values up
from.

## Indexable

> \[`index`: `string`\]: `Map`\<`string`, `string`\> \| [`ThemeValues`](/en/reference/api/graphojs/interfaces/themevalues/)\<`unknown`\> \| `undefined`

## Properties

### arrowheads?

> `optional` **arrowheads?**: [`ThemeValues`](/en/reference/api/graphojs/interfaces/themevalues/)\<`string`\>

Defined in: [theme/Theme.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L46)

***

### colors?

> `optional` **colors?**: [`ThemeColors`](/en/reference/api/graphojs/interfaces/themecolors/)

Defined in: [theme/Theme.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L38)

***

### fonts?

> `optional` **fonts?**: [`ThemeValues`](/en/reference/api/graphojs/interfaces/themevalues/)\<`string`\>

Defined in: [theme/Theme.ts:39](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L39)

***

### margins?

> `optional` **margins?**: [`ThemeValues`](/en/reference/api/graphojs/interfaces/themevalues/)\<[`Margin`](/en/reference/api/graphojs/classes/margin/)\>

Defined in: [theme/Theme.ts:44](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L44)

***

### numbers?

> `optional` **numbers?**: [`ThemeValues`](/en/reference/api/graphojs/interfaces/themevalues/)\<`number`\>

Defined in: [theme/Theme.ts:40](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L40)

***

### points?

> `optional` **points?**: [`ThemeValues`](/en/reference/api/graphojs/interfaces/themevalues/)\<[`Point`](/en/reference/api/graphojs/classes/point/)\>

Defined in: [theme/Theme.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L41)

***

### rects?

> `optional` **rects?**: [`ThemeValues`](/en/reference/api/graphojs/interfaces/themevalues/)\<[`Rect`](/en/reference/api/graphojs/classes/rect/)\>

Defined in: [theme/Theme.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L43)

***

### sizes?

> `optional` **sizes?**: [`ThemeValues`](/en/reference/api/graphojs/interfaces/themevalues/)\<[`Size`](/en/reference/api/graphojs/classes/size/)\>

Defined in: [theme/Theme.ts:42](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L42)

***

### spots?

> `optional` **spots?**: [`ThemeValues`](/en/reference/api/graphojs/interfaces/themevalues/)\<[`Spot`](/en/reference/api/graphojs/classes/spot/)\>

Defined in: [theme/Theme.ts:45](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L45)

***

### targetPropertyMap?

> `optional` **targetPropertyMap?**: `Map`\<`string`, `string`\>

Defined in: [theme/Theme.ts:48](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/Theme.ts#L48)

Maps a GraphObject target property name (e.g. `"fill"`) to the Theme sub-object to search (e.g. `"colors"`).
