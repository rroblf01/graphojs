---
editUrl: false
next: false
prev: false
title: "Iterator"
---

Defined in: [collections/Iterator.ts:6](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L6)

GoJS-compatible: an iterator over a [List](/en/reference/api/graphojs/classes/list/)/[Set](/en/reference/api/graphojs/classes/set/)/[Map](/en/reference/api/graphojs/classes/map/).
Call `next()` before reading `value`/`key`, per GoJS's iteration protocol
(distinct from the native ECMAScript iterator protocol).

## Type Parameters

### T

`T`

## Properties

### iterator

> `readonly` **iterator**: `Iterator`\<`T`\>

Defined in: [collections/Iterator.ts:7](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L7)

***

### key

> `readonly` **key**: `unknown`

Defined in: [collections/Iterator.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L18)

***

### value

> `readonly` **value**: `T`

Defined in: [collections/Iterator.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L17)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`\>

Defined in: [collections/Iterator.ts:19](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L19)

#### Returns

`Iterator`\<`T`\>

***

### all()

> **all**(`pred`): `boolean`

Defined in: [collections/Iterator.ts:13](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L13)

#### Parameters

##### pred

(`x`) => `boolean`

#### Returns

`boolean`

***

### any()

> **any**(`pred`): `boolean`

Defined in: [collections/Iterator.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L12)

#### Parameters

##### pred

(`x`) => `boolean`

#### Returns

`boolean`

***

### each()

> **each**(`func`): `void`

Defined in: [collections/Iterator.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L14)

#### Parameters

##### func

(`x`) => `void`

#### Returns

`void`

***

### filter()

> **filter**(`pred`): `Iterator`\<`T`\>

Defined in: [collections/Iterator.ts:16](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L16)

#### Parameters

##### pred

(`x`) => `boolean`

#### Returns

`Iterator`\<`T`\>

***

### first()

> **first**(): `T` \| `null`

Defined in: [collections/Iterator.ts:10](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L10)

#### Returns

`T` \| `null`

***

### hasNext()

> **hasNext**(): `boolean`

Defined in: [collections/Iterator.ts:9](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L9)

#### Returns

`boolean`

***

### map()

> **map**\<`S`\>(`func`): `Iterator`\<`S`\>

Defined in: [collections/Iterator.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L15)

#### Type Parameters

##### S

`S`

#### Parameters

##### func

(`x`) => `S`

#### Returns

`Iterator`\<`S`\>

***

### next()

> **next**(): `boolean`

Defined in: [collections/Iterator.ts:8](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L8)

#### Returns

`boolean`

***

### reset()

> **reset**(): `void`

Defined in: [collections/Iterator.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Iterator.ts#L11)

#### Returns

`void`
