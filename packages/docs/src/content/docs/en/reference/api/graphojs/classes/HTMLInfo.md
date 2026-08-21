---
editUrl: false
next: false
prev: false
title: "HTMLInfo"
---

Defined in: [panel/HTMLInfo.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L17)

GoJS-compatible: an HTML-based alternative to a `Panel` template for
`Part.contextMenu`/`toolTip`, or `TextBlock.textEditor` — instead of a
canvas-drawn Panel, `show`/`hide` are given full control over an
arbitrary HTML element.

Real GoJS types `show`'s first argument as `GraphObject | null`, since
`Part extends GraphObject` there. graphojs's `Part` has a `panel`
instead of being one (a permanent architectural difference), so this is
typed `Part | null` — the part the menu/tooltip is being shown for, or
`null` for the diagram background.

## Constructors

### Constructor

> **new HTMLInfo**(`init?`): `HTMLInfo`

Defined in: [panel/HTMLInfo.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L23)

#### Parameters

##### init?

`Partial`\<`HTMLInfo`\>

#### Returns

`HTMLInfo`

## Accessors

### hide

#### Get Signature

> **get** **hide**(): ((`a`, `b`) => `void`) \| `null`

Defined in: [panel/HTMLInfo.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L43)

##### Returns

((`a`, `b`) => `void`) \| `null`

#### Set Signature

> **set** **hide**(`value`): `void`

Defined in: [panel/HTMLInfo.ts:47](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L47)

##### Parameters

###### value

((`a`, `b`) => `void`) \| `null`

##### Returns

`void`

***

### mainElement

#### Get Signature

> **get** **mainElement**(): `HTMLElement` \| `null`

Defined in: [panel/HTMLInfo.ts:27](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L27)

##### Returns

`HTMLElement` \| `null`

#### Set Signature

> **set** **mainElement**(`value`): `void`

Defined in: [panel/HTMLInfo.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L31)

##### Parameters

###### value

`HTMLElement` \| `null`

##### Returns

`void`

***

### show

#### Get Signature

> **get** **show**(): ((`a`, `b`, `c`) => `void`) \| `null`

Defined in: [panel/HTMLInfo.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L35)

##### Returns

((`a`, `b`, `c`) => `void`) \| `null`

#### Set Signature

> **set** **show**(`value`): `void`

Defined in: [panel/HTMLInfo.ts:39](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L39)

##### Parameters

###### value

((`a`, `b`, `c`) => `void`) \| `null`

##### Returns

`void`

***

### valueFunction

#### Get Signature

> **get** **valueFunction**(): (() => `unknown`) \| `null`

Defined in: [panel/HTMLInfo.ts:51](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L51)

##### Returns

(() => `unknown`) \| `null`

#### Set Signature

> **set** **valueFunction**(`value`): `void`

Defined in: [panel/HTMLInfo.ts:55](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L55)

##### Parameters

###### value

(() => `unknown`) \| `null`

##### Returns

`void`

## Methods

### invokeHide()

> **invokeHide**(`diagram`, `tool`): `void`

Defined in: [panel/HTMLInfo.ts:65](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L65)

Invoke `hide`, or — if unset — hide `mainElement` directly, matching GoJS's documented default.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### tool

[`Tool`](/en/reference/api/graphojs/classes/tool/) \| `null`

#### Returns

`void`

***

### invokeShow()

> **invokeShow**(`part`, `diagram`, `tool`): `void`

Defined in: [panel/HTMLInfo.ts:60](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/HTMLInfo.ts#L60)

Invoke `show`, falling back to un-hiding `mainElement` if `hide` wasn't set either.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### tool

[`Tool`](/en/reference/api/graphojs/classes/tool/) \| `null`

#### Returns

`void`
