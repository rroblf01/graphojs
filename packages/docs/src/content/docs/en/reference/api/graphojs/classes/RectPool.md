---
editUrl: false
next: false
prev: false
title: "RectPool"
---

Defined in: [spatial/RectPool.ts:7](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/RectPool.ts#L7)

A pool for reusable Rect objects to reduce garbage collection pressure
during rendering and layout operations.

## Constructors

### Constructor

> **new RectPool**(`maxPoolSize?`): `RectPool`

Defined in: [spatial/RectPool.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/RectPool.ts#L11)

#### Parameters

##### maxPoolSize?

`number` = `512`

#### Returns

`RectPool`

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [spatial/RectPool.ts:16](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/RectPool.ts#L16)

Get the number of pooled rects.

##### Returns

`number`

## Methods

### acquire()

> **acquire**(`x`, `y`, `width`, `height`): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [spatial/RectPool.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/RectPool.ts#L24)

Acquire a Rect from the pool (or allocate a new one).
Must be released with release() when no longer needed.

#### Parameters

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### clear()

> **clear**(): `void`

Defined in: [spatial/RectPool.ts:45](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/RectPool.ts#L45)

Clear the pool.

#### Returns

`void`

***

### release()

> **release**(`rect`): `void`

Defined in: [spatial/RectPool.ts:39](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/RectPool.ts#L39)

Release a Rect back to the pool for reuse.

#### Parameters

##### rect

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`
