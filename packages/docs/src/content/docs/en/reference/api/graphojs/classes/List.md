---
editUrl: false
next: false
prev: false
title: "List"
---

Defined in: [collections/List.ts:9](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L9)

GoJS-compatible: an ordered collection, mirroring `go.List`. graphojs's
own internals use plain arrays; this class exists as a public utility for
code ported from GoJS that constructs `new go.List<T>()` directly.

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new List**\<`T`\>(`coll?`): `List`\<`T`\>

Defined in: [collections/List.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L12)

#### Parameters

##### coll?

`Iterable`\<`T`, `any`, `any`\>

#### Returns

`List`\<`T`\>

## Accessors

### count

#### Get Signature

> **get** **count**(): `number`

Defined in: [collections/List.ts:155](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L155)

##### Returns

`number`

***

### iterator

#### Get Signature

> **get** **iterator**(): [`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<`T`\>

Defined in: [collections/List.ts:167](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L167)

##### Returns

[`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<`T`\>

***

### iteratorBackwards

#### Get Signature

> **get** **iteratorBackwards**(): [`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<`T`\>

Defined in: [collections/List.ts:171](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L171)

##### Returns

[`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<`T`\>

***

### length

#### Get Signature

> **get** **length**(): `number`

Defined in: [collections/List.ts:163](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L163)

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [collections/List.ts:159](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L159)

##### Returns

`number`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`\>

Defined in: [collections/List.ts:16](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L16)

#### Returns

`Iterator`\<`T`\>

***

### add()

> **add**(`val`): `this`

Defined in: [collections/List.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L24)

#### Parameters

##### val

`T`

#### Returns

`this`

***

### addAll()

> **addAll**(`coll`): `this`

Defined in: [collections/List.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L33)

#### Parameters

##### coll

`Iterable`\<`T`\>

#### Returns

`this`

***

### all()

> **all**(`pred`): `boolean`

Defined in: [collections/List.ts:86](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L86)

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

`boolean`

***

### any()

> **any**(`pred`): `boolean`

Defined in: [collections/List.ts:82](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L82)

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

`boolean`

***

### clear()

> **clear**(): `void`

Defined in: [collections/List.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L38)

#### Returns

`void`

***

### contains()

> **contains**(`val`): `boolean`

Defined in: [collections/List.ts:42](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L42)

#### Parameters

##### val

`T`

#### Returns

`boolean`

***

### copy()

> **copy**(): `List`\<`T`\>

Defined in: [collections/List.ts:127](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L127)

#### Returns

`List`\<`T`\>

***

### delete()

> **delete**(`val`): `boolean`

Defined in: [collections/List.ts:114](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L114)

#### Parameters

##### val

`T`

#### Returns

`boolean`

***

### each()

> **each**(`func`): `this`

Defined in: [collections/List.ts:90](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L90)

#### Parameters

##### func

(`a`) => `void`

#### Returns

`this`

***

### elt()

> **elt**(`i`): `T`

Defined in: [collections/List.ts:54](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L54)

#### Parameters

##### i

`number`

#### Returns

`T`

***

### filter()

> **filter**(`pred`): `List`\<`T`\>

Defined in: [collections/List.ts:99](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L99)

#### Parameters

##### pred

(`a`) => `boolean`

#### Returns

`List`\<`T`\>

***

### first()

> **first**(): `T` \| `null`

Defined in: [collections/List.ts:70](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L70)

#### Returns

`T` \| `null`

***

### get()

> **get**(`i`): `T`

Defined in: [collections/List.ts:58](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L58)

#### Parameters

##### i

`number`

#### Returns

`T`

***

### has()

> **has**(`val`): `boolean`

Defined in: [collections/List.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L46)

#### Parameters

##### val

`T`

#### Returns

`boolean`

***

### indexOf()

> **indexOf**(`val`): `number`

Defined in: [collections/List.ts:50](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L50)

#### Parameters

##### val

`T`

#### Returns

`number`

***

### insertAt()

> **insertAt**(`i`, `val`): `void`

Defined in: [collections/List.ts:103](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L103)

#### Parameters

##### i

`number`

##### val

`T`

#### Returns

`void`

***

### last()

> **last**(): `T` \| `null`

Defined in: [collections/List.ts:74](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L74)

#### Returns

`T` \| `null`

***

### map()

> **map**\<`S`\>(`func`): `List`\<`S`\>

Defined in: [collections/List.ts:95](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L95)

#### Type Parameters

##### S

`S`

#### Parameters

##### func

(`a`) => `S`

#### Returns

`List`\<`S`\>

***

### pop()

> **pop**(): `T` \| `null`

Defined in: [collections/List.ts:78](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L78)

#### Returns

`T` \| `null`

***

### push()

> **push**(`val`): `void`

Defined in: [collections/List.ts:29](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L29)

#### Parameters

##### val

`T`

#### Returns

`void`

***

### remove()

> **remove**(`val`): `boolean`

Defined in: [collections/List.ts:107](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L107)

#### Parameters

##### val

`T`

#### Returns

`boolean`

***

### removeAt()

> **removeAt**(`i`): `void`

Defined in: [collections/List.ts:118](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L118)

#### Parameters

##### i

`number`

#### Returns

`void`

***

### removeRange()

> **removeRange**(`from`, `to`): `this`

Defined in: [collections/List.ts:122](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L122)

#### Parameters

##### from

`number`

##### to

`number`

#### Returns

`this`

***

### reverse()

> **reverse**(): `this`

Defined in: [collections/List.ts:150](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L150)

#### Returns

`this`

***

### set()

> **set**(`i`, `val`): `void`

Defined in: [collections/List.ts:66](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L66)

#### Parameters

##### i

`number`

##### val

`T`

#### Returns

`void`

***

### setElt()

> **setElt**(`i`, `val`): `void`

Defined in: [collections/List.ts:62](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L62)

#### Parameters

##### i

`number`

##### val

`T`

#### Returns

`void`

***

### sort()

> **sort**(`sortfunc`): `this`

Defined in: [collections/List.ts:139](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L139)

#### Parameters

##### sortfunc

(`a`, `b`) => `number`

#### Returns

`this`

***

### sortRange()

> **sortRange**(`sortfunc`, `from?`, `to?`): `this`

Defined in: [collections/List.ts:144](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L144)

#### Parameters

##### sortfunc

(`a`, `b`) => `number`

##### from?

`number` = `0`

##### to?

`number` = `...`

#### Returns

`this`

***

### toArray()

> **toArray**(): `T`[]

Defined in: [collections/List.ts:131](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L131)

#### Returns

`T`[]

***

### toSet()

> **toSet**(): [`Set`](/en/reference/api/graphojs/classes/set/)\<`T`\>

Defined in: [collections/List.ts:135](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L135)

#### Returns

[`Set`](/en/reference/api/graphojs/classes/set/)\<`T`\>

***

### toString()

> **toString**(): `string`

Defined in: [collections/List.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/collections/List.ts#L20)

#### Returns

`string`
