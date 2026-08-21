---
editUrl: false
next: false
prev: false
title: "PartPool"
---

Defined in: [spatial/PartPool.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L11)

A pool of reusable parts for off-screen rendering virtualization.
When a part scrolls out of view, it's returned to the pool so the
object can be reused instead of allocating new instances.

## Constructors

### Constructor

> **new PartPool**(`maxPoolSize?`): `PartPool`

Defined in: [spatial/PartPool.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L20)

#### Parameters

##### maxPoolSize?

`number` = `1000`

#### Returns

`PartPool`

## Accessors

### activeCount

#### Get Signature

> **get** **activeCount**(): `number`

Defined in: [spatial/PartPool.ts:141](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L141)

Get the total number of active parts.

##### Returns

`number`

***

### activeGroupCount

#### Get Signature

> **get** **activeGroupCount**(): `number`

Defined in: [spatial/PartPool.ts:50](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L50)

Get the number of active (checked out) groups.

##### Returns

`number`

***

### activeLinkCount

#### Get Signature

> **get** **activeLinkCount**(): `number`

Defined in: [spatial/PartPool.ts:45](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L45)

Get the number of active (checked out) links.

##### Returns

`number`

***

### activeNodeCount

#### Get Signature

> **get** **activeNodeCount**(): `number`

Defined in: [spatial/PartPool.ts:40](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L40)

Get the number of active (checked out) nodes.

##### Returns

`number`

***

### availableGroupCount

#### Get Signature

> **get** **availableGroupCount**(): `number`

Defined in: [spatial/PartPool.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L35)

Get the number of available (pooled) groups.

##### Returns

`number`

***

### availableLinkCount

#### Get Signature

> **get** **availableLinkCount**(): `number`

Defined in: [spatial/PartPool.ts:30](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L30)

Get the number of available (pooled) links.

##### Returns

`number`

***

### availableNodeCount

#### Get Signature

> **get** **availableNodeCount**(): `number`

Defined in: [spatial/PartPool.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L25)

Get the number of available (pooled) nodes.

##### Returns

`number`

***

### pooledCount

#### Get Signature

> **get** **pooledCount**(): `number`

Defined in: [spatial/PartPool.ts:136](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L136)

Get the total number of pooled parts.

##### Returns

`number`

## Methods

### acquireGroup()

> **acquireGroup**(`key`, `bounds`): [`Group`](/en/reference/api/graphojs/classes/group/)

Defined in: [spatial/PartPool.ts:84](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L84)

Acquire a group. Returns a pooled group if available, otherwise a new one.

#### Parameters

##### key

`string` \| `number`

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

[`Group`](/en/reference/api/graphojs/classes/group/)

***

### acquireLink()

> **acquireLink**(`key`): [`Link`](/en/reference/api/graphojs/classes/link/)

Defined in: [spatial/PartPool.ts:71](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L71)

Acquire a link. Returns a pooled link if available, otherwise a new one.

#### Parameters

##### key

`string` \| `number`

#### Returns

[`Link`](/en/reference/api/graphojs/classes/link/)

***

### acquireNode()

> **acquireNode**(`key`, `bounds`): [`Node`](/en/reference/api/graphojs/classes/node/)

Defined in: [spatial/PartPool.ts:57](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L57)

Acquire a node. Returns a pooled node if available, otherwise a new one.

#### Parameters

##### key

`string` \| `number`

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/)

***

### clear()

> **clear**(): `void`

Defined in: [spatial/PartPool.ts:126](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L126)

Clear all pooled parts.

#### Returns

`void`

***

### releaseGroup()

> **releaseGroup**(`group`): `void`

Defined in: [spatial/PartPool.ts:116](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L116)

Release a group back to the pool.

#### Parameters

##### group

[`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`void`

***

### releaseLink()

> **releaseLink**(`link`): `void`

Defined in: [spatial/PartPool.ts:106](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L106)

Release a link back to the pool.

#### Parameters

##### link

[`Link`](/en/reference/api/graphojs/classes/link/)

#### Returns

`void`

***

### releaseNode()

> **releaseNode**(`node`): `void`

Defined in: [spatial/PartPool.ts:96](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/PartPool.ts#L96)

Release a node back to the pool.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`void`
