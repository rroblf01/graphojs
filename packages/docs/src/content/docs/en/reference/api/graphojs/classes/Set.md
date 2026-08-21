---
editUrl: false
next: false
prev: false
title: "Set"
---

Defined in: [collections/Set.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L11)

GoJS-compatible: an unordered collection of unique values, mirroring
`go.Set`. Named `Set` to match GoJS's exact API — import it aliased
(e.g. `import { Set as GoSet } from 'graphojs'`) to avoid shadowing the
native `Set` in the same scope.

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Set**\<`T`\>(`coll?`): `Set`\<`T`\>

Defined in: [collections/Set.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L14)

#### Parameters

##### coll?

`Iterable`\<`T`, `any`, `any`\>

#### Returns

`Set`\<`T`\>

## Accessors

### count

#### Get Signature

> **get** **count**(): `number`

Defined in: [collections/Set.ts:127](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L127)

##### Returns

`number`

***

### iterator

#### Get Signature

> **get** **iterator**(): [`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<`T`\>

Defined in: [collections/Set.ts:135](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L135)

##### Returns

[`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<`T`\>

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [collections/Set.ts:131](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L131)

##### Returns

`number`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`\>

Defined in: [collections/Set.ts:151](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L151)

#### Returns

`Iterator`\<`T`\>

***

### add()

> **add**(`val`): `this`

Defined in: [collections/Set.ts:26](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L26)

#### Parameters

##### val

`T`

#### Returns

`this`

***

### addAll()

> **addAll**(`coll`): `this`

Defined in: [collections/Set.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L31)

#### Parameters

##### coll

`Iterable`\<`T`\>

#### Returns

`this`

***

### all()

> **all**(`pred`): `boolean`

Defined in: [collections/Set.ts:70](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L70)

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

`boolean`

***

### any()

> **any**(`pred`): `boolean`

Defined in: [collections/Set.ts:63](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L63)

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

`boolean`

***

### clear()

> **clear**(): `void`

Defined in: [collections/Set.ts:111](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L111)

#### Returns

`void`

***

### contains()

> **contains**(`val`): `boolean`

Defined in: [collections/Set.ts:40](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L40)

#### Parameters

##### val

`T`

#### Returns

`boolean`

***

### containsAll()

> **containsAll**(`coll`): `boolean`

Defined in: [collections/Set.ts:44](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L44)

#### Parameters

##### coll

`Iterable`\<`T`\>

#### Returns

`boolean`

***

### containsAny()

> **containsAny**(`coll`): `boolean`

Defined in: [collections/Set.ts:51](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L51)

#### Parameters

##### coll

`Iterable`\<`T`\>

#### Returns

`boolean`

***

### copy()

> **copy**(): `Set`\<`T`\>

Defined in: [collections/Set.ts:115](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L115)

#### Returns

`Set`\<`T`\>

***

### delete()

> **delete**(`val`): `boolean`

Defined in: [collections/Set.ts:90](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L90)

#### Parameters

##### val

`T`

#### Returns

`boolean`

***

### each()

> **each**(`func`): `this`

Defined in: [collections/Set.ts:77](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L77)

#### Parameters

##### func

(`a`) => `void`

#### Returns

`this`

***

### entries()

> **entries**(): `IterableIterator`\<\[`T`, `T`\]\>

Defined in: [collections/Set.ts:139](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L139)

#### Returns

`IterableIterator`\<\[`T`, `T`\]\>

***

### filter()

> **filter**(`pred`): `Set`\<`T`\>

Defined in: [collections/Set.ts:86](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L86)

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

`Set`\<`T`\>

***

### first()

> **first**(): `T` \| `null`

Defined in: [collections/Set.ts:58](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L58)

#### Returns

`T` \| `null`

***

### forEach()

> **forEach**(`callbackFunc`): `void`

Defined in: [collections/Set.ts:147](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L147)

#### Parameters

##### callbackFunc

(`value1`, `value2`, `set`) => `void`

#### Returns

`void`

***

### has()

> **has**(`val`): `boolean`

Defined in: [collections/Set.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L36)

#### Parameters

##### val

`T`

#### Returns

`boolean`

***

### keys()

> **keys**(): `IterableIterator`\<`T`\>

Defined in: [collections/Set.ts:143](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L143)

#### Returns

`IterableIterator`\<`T`\>

***

### map()

> **map**\<`S`\>(`func`): `Set`\<`S`\>

Defined in: [collections/Set.ts:82](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L82)

#### Type Parameters

##### S

`S`

#### Parameters

##### func

(`a`) => `S`

#### Returns

`Set`\<`S`\>

***

### remove()

> **remove**(`val`): `boolean`

Defined in: [collections/Set.ts:94](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L94)

#### Parameters

##### val

`T`

#### Returns

`boolean`

***

### removeAll()

> **removeAll**(`coll`): `this`

Defined in: [collections/Set.ts:98](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L98)

#### Parameters

##### coll

`Iterable`\<`T`\>

#### Returns

`this`

***

### retainAll()

> **retainAll**(`coll`): `this`

Defined in: [collections/Set.ts:103](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L103)

#### Parameters

##### coll

`Iterable`\<`T`\>

#### Returns

`this`

***

### toArray()

> **toArray**(): `T`[]

Defined in: [collections/Set.ts:119](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L119)

#### Returns

`T`[]

***

### toList()

> **toList**(): [`List`](/en/reference/api/graphojs/classes/list/)\<`T`\>

Defined in: [collections/Set.ts:123](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L123)

#### Returns

[`List`](/en/reference/api/graphojs/classes/list/)\<`T`\>

***

### toString()

> **toString**(): `string`

Defined in: [collections/Set.ts:22](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L22)

#### Returns

`string`

***

### values()

> **values**(): `IterableIterator`\<`T`\>

Defined in: [collections/Set.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Set.ts#L18)

#### Returns

`IterableIterator`\<`T`\>
