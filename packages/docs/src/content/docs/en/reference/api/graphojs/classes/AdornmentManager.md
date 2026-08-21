---
editUrl: false
next: false
prev: false
title: "AdornmentManager"
---

Defined in: [parts/Adornment.ts:395](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L395)

Manages adornments for a diagram.

## Constructors

### Constructor

> **new AdornmentManager**(): `AdornmentManager`

#### Returns

`AdornmentManager`

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [parts/Adornment.ts:454](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L454)

Get the number of adornments.

##### Returns

`number`

## Methods

### addAdornment()

> **addAdornment**(`part`, `adornment`): `void`

Defined in: [parts/Adornment.ts:410](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L410)

Add an adornment for a part.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

##### adornment

[`Adornment`](/en/reference/api/graphojs/classes/adornment/)

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [parts/Adornment.ts:433](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L433)

Remove all adornments.

#### Returns

`void`

***

### clearAdornments()

> **clearAdornments**(`part`): `void`

Defined in: [parts/Adornment.ts:428](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L428)

Remove all adornments for a part.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### generateKey()

> **generateKey**(): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [parts/Adornment.ts:438](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L438)

Generate a unique key for an adornment.

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

***

### getAdornment()

> **getAdornment**(`part`, `name`): [`Adornment`](/en/reference/api/graphojs/classes/adornment/) \| `undefined`

Defined in: [parts/Adornment.ts:405](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L405)

Get a specific adornment for a part.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

##### name

`string`

#### Returns

[`Adornment`](/en/reference/api/graphojs/classes/adornment/) \| `undefined`

***

### getAdornments()

> **getAdornments**(`part`): `Map`\<`string`, [`Adornment`](/en/reference/api/graphojs/classes/adornment/)\>

Defined in: [parts/Adornment.ts:400](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L400)

Get all adornments for a part.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`Map`\<`string`, [`Adornment`](/en/reference/api/graphojs/classes/adornment/)\>

***

### getAllAdornments()

> **getAllAdornments**(): [`Adornment`](/en/reference/api/graphojs/classes/adornment/)[]

Defined in: [parts/Adornment.ts:443](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L443)

Get all adornments as an array.

#### Returns

[`Adornment`](/en/reference/api/graphojs/classes/adornment/)[]

***

### removeAdornment()

> **removeAdornment**(`part`, `name`): `boolean`

Defined in: [parts/Adornment.ts:421](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L421)

Remove an adornment from a part.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

##### name

`string`

#### Returns

`boolean`
