---
editUrl: false
next: false
prev: false
title: "RowColumnDefinition"
---

Defined in: [panel/RowColumnDefinition.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L12)

GoJS-compatible: describes one row or column of a `'Table'`-type Panel
(size constraints, separator styling). graphojs's `Panel.rowDefinitions`/
`columnDefinitions` currently accept plain `{ height?, width?,
separatorStrokeWidth? }` objects rather than instances of this class —
this exists for API parity (`new go.RowColumnDefinition(...)`) and reads
back the same shape; `panel` is only set if you assign it yourself, since
graphojs's table layout doesn't yet track it automatically.

## Constructors

### Constructor

> **new RowColumnDefinition**(`init?`): `RowColumnDefinition`

Defined in: [panel/RowColumnDefinition.ts:26](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L26)

#### Parameters

##### init?

`Partial`\<`RowColumnDefinition`\> & `object`

#### Returns

`RowColumnDefinition`

## Properties

### alignment

> **alignment**: `unknown` = `null`

Defined in: [panel/RowColumnDefinition.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L24)

***

### background

> **background**: `string` \| `null` = `null`

Defined in: [panel/RowColumnDefinition.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L23)

***

### maximum

> **maximum**: `number` = `Number.POSITIVE_INFINITY`

Defined in: [panel/RowColumnDefinition.ts:19](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L19)

***

### minimum

> **minimum**: `number` = `0`

Defined in: [panel/RowColumnDefinition.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L18)

***

### separatorPadding

> **separatorPadding**: `number` = `0`

Defined in: [panel/RowColumnDefinition.ts:22](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L22)

***

### separatorStroke

> **separatorStroke**: `string` \| `null` = `null`

Defined in: [panel/RowColumnDefinition.ts:21](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L21)

***

### separatorStrokeWidth

> **separatorStrokeWidth**: `number` = `Number.NaN`

Defined in: [panel/RowColumnDefinition.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L20)

## Accessors

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [panel/RowColumnDefinition.ts:80](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L80)

##### Returns

`number`

#### Set Signature

> **set** **height**(`value`): `void`

Defined in: [panel/RowColumnDefinition.ts:84](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L84)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### index

#### Get Signature

> **get** **index**(): `number`

Defined in: [panel/RowColumnDefinition.ts:72](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L72)

##### Returns

`number`

#### Set Signature

> **set** **index**(`value`): `void`

Defined in: [panel/RowColumnDefinition.ts:76](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L76)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### isRow

#### Get Signature

> **get** **isRow**(): `boolean`

Defined in: [panel/RowColumnDefinition.ts:64](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L64)

##### Returns

`boolean`

#### Set Signature

> **set** **isRow**(`value`): `void`

Defined in: [panel/RowColumnDefinition.ts:68](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L68)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### panel

#### Get Signature

> **get** **panel**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [panel/RowColumnDefinition.ts:55](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L55)

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **panel**(`value`): `void`

Defined in: [panel/RowColumnDefinition.ts:60](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L60)

Not part of the real GoJS read-only `panel` getter's contract — graphojs exposes it settable since nothing else assigns it automatically.

##### Parameters

###### value

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

##### Returns

`void`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [panel/RowColumnDefinition.ts:88](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L88)

##### Returns

`number`

#### Set Signature

> **set** **width**(`value`): `void`

Defined in: [panel/RowColumnDefinition.ts:92](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L92)

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### computeEffectiveSpacing()

> **computeEffectiveSpacing**(): `number`

Defined in: [panel/RowColumnDefinition.ts:48](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L48)

#### Returns

`number`

***

### computeEffectiveSpacingTop()

> **computeEffectiveSpacingTop**(`_first`): `number`

Defined in: [panel/RowColumnDefinition.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/RowColumnDefinition.ts#L41)

#### Parameters

##### \_first

`number`

#### Returns

`number`
