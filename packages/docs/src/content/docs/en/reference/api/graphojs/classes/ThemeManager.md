---
editUrl: false
next: false
prev: false
title: "ThemeManager"
---

Defined in: [theme/ThemeManager.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L12)

GoJS-compatible: manages a Diagram's (or several Diagrams') set of named
`Theme`s and which one is active. Templates read theme values via
`GraphObject.theme()`/`themeData()`/`themeModel()` (which attach a
`ThemeBinding`), or by calling `findValue`/`getValue` directly.

## Constructors

### Constructor

> **new ThemeManager**(`init?`): `ThemeManager`

Defined in: [theme/ThemeManager.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L20)

#### Parameters

##### init?

`Partial`\<`ThemeManager`\>

#### Returns

`ThemeManager`

## Properties

### changesDivBackground

> **changesDivBackground**: `boolean` = `false`

Defined in: [theme/ThemeManager.ts:16](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L16)

***

### usesSystemCssVariables

> **usesSystemCssVariables**: `boolean` = `false`

Defined in: [theme/ThemeManager.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L17)

## Accessors

### currentTheme

#### Get Signature

> **get** **currentTheme**(): `string`

Defined in: [theme/ThemeManager.ts:49](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L49)

##### Returns

`string`

#### Set Signature

> **set** **currentTheme**(`value`): `void`

Defined in: [theme/ThemeManager.ts:53](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L53)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### defaultTheme

#### Get Signature

> **get** **defaultTheme**(): `string`

Defined in: [theme/ThemeManager.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L41)

##### Returns

`string`

#### Set Signature

> **set** **defaultTheme**(`value`): `void`

Defined in: [theme/ThemeManager.ts:45](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L45)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### themeMap

#### Get Signature

> **get** **themeMap**(): `Map`\<`string`, [`Theme`](/en/reference/api/graphojs/interfaces/theme/)\>

Defined in: [theme/ThemeManager.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L33)

##### Returns

`Map`\<`string`, [`Theme`](/en/reference/api/graphojs/interfaces/theme/)\>

#### Set Signature

> **set** **themeMap**(`value`): `void`

Defined in: [theme/ThemeManager.ts:37](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L37)

##### Parameters

###### value

`Map`\<`string`, [`Theme`](/en/reference/api/graphojs/interfaces/theme/)\>

##### Returns

`void`

## Methods

### addDiagram()

> **addDiagram**(`diagram`): `this`

Defined in: [theme/ThemeManager.ts:60](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L60)

Associate a Diagram with this ThemeManager, so `currentTheme` changes refresh its theme bindings.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`this`

***

### findTheme()

> **findTheme**(`themeName`): [`Theme`](/en/reference/api/graphojs/interfaces/theme/) \| `null`

Defined in: [theme/ThemeManager.ts:84](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L84)

Find the named theme, resolving `"system"` to the browser's preferred
`light`/`dark` color scheme.

#### Parameters

##### themeName

`string`

#### Returns

[`Theme`](/en/reference/api/graphojs/interfaces/theme/) \| `null`

***

### findValue()

> **findValue**(`prop`, `source?`, `tprop?`): `unknown`

Defined in: [theme/ThemeManager.ts:99](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L99)

Look up `prop` in `currentTheme`, falling back to `defaultTheme` if
not found there.

#### Parameters

##### prop

`string` \| `number` \| `string`[]

##### source?

`string` \| `string`[]

##### tprop?

`string`

#### Returns

`unknown`

***

### getValue()

> **getValue**(`theme`, `prop`, `source?`, `tprop?`): `unknown`

Defined in: [theme/ThemeManager.ts:106](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L106)

Look up `prop` (optionally under `source`) within the given Theme.

#### Parameters

##### theme

[`Theme`](/en/reference/api/graphojs/interfaces/theme/) \| `null`

##### prop

`string` \| `number` \| `string`[]

##### source?

`string` \| `string`[]

##### tprop?

`string`

#### Returns

`unknown`

***

### removeDiagram()

> **removeDiagram**(`diagram`): `this`

Defined in: [theme/ThemeManager.ts:66](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L66)

Disassociate a Diagram from this ThemeManager.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`this`

***

### set()

> **set**(`themeName`, `props`): `this`

Defined in: [theme/ThemeManager.ts:72](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L72)

Merge `props` into the named theme (or create it if it doesn't yet exist), then refresh theme bindings.

#### Parameters

##### themeName

`string`

##### props

`Partial`\<[`Theme`](/en/reference/api/graphojs/interfaces/theme/)\>

#### Returns

`this`

***

### updateAllThemes()

> **updateAllThemes**(): `void`

Defined in: [theme/ThemeManager.ts:141](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/theme/ThemeManager.ts#L141)

Re-apply every ThemeBinding on every associated Diagram (called automatically when `currentTheme`/a theme's contents change).

#### Returns

`void`
