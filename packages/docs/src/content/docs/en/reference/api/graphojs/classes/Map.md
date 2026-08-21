---
editUrl: false
next: false
prev: false
title: "Map"
---

Defined in: [collections/Map.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L17)

GoJS-compatible: a key/value collection, mirroring `go.Map`. Named `Map`
to match GoJS's exact API — import it aliased (e.g.
`import { Map as GoMap } from 'graphojs'`) to avoid shadowing the native
`Map` in the same scope.

## Type Parameters

### K

`K`

### V

`V`

## Constructors

### Constructor

> **new Map**\<`K`, `V`\>(`coll?`): `Map`\<`K`, `V`\>

Defined in: [collections/Map.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L20)

#### Parameters

##### coll?

`Iterable`\<[`IKeyValuePair`](/en/reference/api/graphojs/interfaces/ikeyvaluepair/)\<`K`, `V`\>, `any`, `any`\> \| `Iterable`\<readonly \[`K`, `V`\], `any`, `any`\>

#### Returns

`Map`\<`K`, `V`\>

## Accessors

### count

#### Get Signature

> **get** **count**(): `number`

Defined in: [collections/Map.ts:133](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L133)

##### Returns

`number`

***

### iterator

#### Get Signature

> **get** **iterator**(): [`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<[`IKeyValuePair`](/en/reference/api/graphojs/interfaces/ikeyvaluepair/)\<`K`, `V`\>\>

Defined in: [collections/Map.ts:141](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L141)

##### Returns

[`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<[`IKeyValuePair`](/en/reference/api/graphojs/interfaces/ikeyvaluepair/)\<`K`, `V`\>\>

***

### iteratorKeys

#### Get Signature

> **get** **iteratorKeys**(): [`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<`K`\>

Defined in: [collections/Map.ts:145](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L145)

##### Returns

[`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<`K`\>

***

### iteratorValues

#### Get Signature

> **get** **iteratorValues**(): [`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<`V`\>

Defined in: [collections/Map.ts:153](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L153)

##### Returns

[`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<`V`\>

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [collections/Map.ts:137](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L137)

##### Returns

`number`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<\[`K`, `V`\]\>

Defined in: [collections/Map.ts:165](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L165)

#### Returns

`Iterator`\<\[`K`, `V`\]\>

***

### add()

> **add**(`key`, `val`): `this`

Defined in: [collections/Map.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L38)

#### Parameters

##### key

`K`

##### val

`V`

#### Returns

`this`

***

### addAll()

> **addAll**(`coll`): `this`

Defined in: [collections/Map.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L43)

#### Parameters

##### coll

`Iterable`\<[`IKeyValuePair`](/en/reference/api/graphojs/interfaces/ikeyvaluepair/)\<`K`, `V`\>, `any`, `any`\> \| `Iterable`\<readonly \[`K`, `V`\], `any`, `any`\>

#### Returns

`this`

***

### all()

> **all**(`pred`): `boolean`

Defined in: [collections/Map.ts:67](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L67)

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

`boolean`

***

### any()

> **any**(`pred`): `boolean`

Defined in: [collections/Map.ts:60](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L60)

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

`boolean`

***

### clear()

> **clear**(): `void`

Defined in: [collections/Map.ts:117](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L117)

#### Returns

`void`

***

### contains()

> **contains**(`key`): `boolean`

Defined in: [collections/Map.ts:97](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L97)

#### Parameters

##### key

`K`

#### Returns

`boolean`

***

### copy()

> **copy**(): `Map`\<`K`, `V`\>

Defined in: [collections/Map.ts:121](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L121)

#### Returns

`Map`\<`K`, `V`\>

***

### delete()

> **delete**(`key`): `boolean`

Defined in: [collections/Map.ts:109](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L109)

#### Parameters

##### key

`K`

#### Returns

`boolean`

***

### each()

> **each**(`func`): `this`

Defined in: [collections/Map.ts:74](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L74)

#### Parameters

##### func

(`a`) => `void`

#### Returns

`this`

***

### entries()

> **entries**(): `IterableIterator`\<\[`K`, `V`\]\>

Defined in: [collections/Map.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L25)

#### Returns

`IterableIterator`\<\[`K`, `V`\]\>

***

### filter()

> **filter**(`pred`): `Map`\<`K`, `V`\>

Defined in: [collections/Map.ts:85](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L85)

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

`Map`\<`K`, `V`\>

***

### first()

> **first**(): [`IKeyValuePair`](/en/reference/api/graphojs/interfaces/ikeyvaluepair/)\<`K`, `V`\> \| `null`

Defined in: [collections/Map.ts:55](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L55)

#### Returns

[`IKeyValuePair`](/en/reference/api/graphojs/interfaces/ikeyvaluepair/)\<`K`, `V`\> \| `null`

***

### forEach()

> **forEach**(`callbackFunc`): `void`

Defined in: [collections/Map.ts:161](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L161)

#### Parameters

##### callbackFunc

(`value`, `key`, `map`) => `void`

#### Returns

`void`

***

### get()

> **get**(`key`): `V` \| `null`

Defined in: [collections/Map.ts:101](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L101)

#### Parameters

##### key

`K`

#### Returns

`V` \| `null`

***

### getValue()

> **getValue**(`key`): `V` \| `null`

Defined in: [collections/Map.ts:105](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L105)

#### Parameters

##### key

`K`

#### Returns

`V` \| `null`

***

### has()

> **has**(`key`): `boolean`

Defined in: [collections/Map.ts:93](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L93)

#### Parameters

##### key

`K`

#### Returns

`boolean`

***

### keys()

> **keys**(): `IterableIterator`\<`K`\>

Defined in: [collections/Map.ts:149](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L149)

#### Returns

`IterableIterator`\<`K`\>

***

### map()

> **map**\<`S`\>(`func`): `Map`\<`K`, `S`\>

Defined in: [collections/Map.ts:79](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L79)

#### Type Parameters

##### S

`S`

#### Parameters

##### func

(`a`) => `S`

#### Returns

`Map`\<`K`, `S`\>

***

### remove()

> **remove**(`key`): `boolean`

Defined in: [collections/Map.ts:113](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L113)

#### Parameters

##### key

`K`

#### Returns

`boolean`

***

### set()

> **set**(`key`, `val`): `this`

Defined in: [collections/Map.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L33)

#### Parameters

##### key

`K`

##### val

`V`

#### Returns

`this`

***

### toArray()

> **toArray**(): [`IKeyValuePair`](/en/reference/api/graphojs/interfaces/ikeyvaluepair/)\<`K`, `V`\>[]

Defined in: [collections/Map.ts:125](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L125)

#### Returns

[`IKeyValuePair`](/en/reference/api/graphojs/interfaces/ikeyvaluepair/)\<`K`, `V`\>[]

***

### toKeySet()

> **toKeySet**(): [`Set`](/en/reference/api/graphojs/classes/set/)\<`K`\>

Defined in: [collections/Map.ts:129](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L129)

#### Returns

[`Set`](/en/reference/api/graphojs/classes/set/)\<`K`\>

***

### toString()

> **toString**(): `string`

Defined in: [collections/Map.ts:29](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L29)

#### Returns

`string`

***

### values()

> **values**(): `IterableIterator`\<`V`\>

Defined in: [collections/Map.ts:157](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/Map.ts#L157)

#### Returns

`IterableIterator`\<`V`\>
