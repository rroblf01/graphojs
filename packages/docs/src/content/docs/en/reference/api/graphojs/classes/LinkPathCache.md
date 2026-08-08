---
editUrl: false
next: false
prev: false
title: "LinkPathCache"
---

Defined in: [render/PerformanceCache.ts:5](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L5)

Cache for computed link paths.
Avoids recomputing routing when endpoints haven't moved.

## Constructors

### Constructor

> **new LinkPathCache**(): `LinkPathCache`

#### Returns

`LinkPathCache`

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [render/PerformanceCache.ts:108](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L108)

Get the number of cached entries.

##### Returns

`number`

## Methods

### get()

> **get**(`fromKey`, `toKey`, `routing`, `corner`, `fromPort`, `toPort`, `avoidObstacles?`, `jumpOver?`, `obstacles?`): `object`[] \| `null`

Defined in: [render/PerformanceCache.ts:35](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L35)

Get a cached path if available.

#### Parameters

##### fromKey

`string` \| `number`

##### toKey

`string` \| `number`

##### routing

`string`

##### corner

`number`

##### fromPort

###### x

`number`

###### y

`number`

##### toPort

###### x

`number`

###### y

`number`

##### avoidObstacles?

`boolean` = `false`

##### jumpOver?

`boolean` = `false`

##### obstacles?

`object`[] = `[]`

#### Returns

`object`[] \| `null`

***

### getVersion()

> **getVersion**(): `number`

Defined in: [render/PerformanceCache.ts:101](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L101)

Get the current cache version (increments on changes).

#### Returns

`number`

***

### invalidate()

> **invalidate**(): `void`

Defined in: [render/PerformanceCache.ts:93](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L93)

Invalidate the entire cache.

#### Returns

`void`

***

### set()

> **set**(`fromKey`, `toKey`, `routing`, `corner`, `fromPort`, `toPort`, `points`, `avoidObstacles?`, `jumpOver?`, `obstacles?`): `void`

Defined in: [render/PerformanceCache.ts:63](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L63)

Store a computed path in the cache.

#### Parameters

##### fromKey

`string` \| `number`

##### toKey

`string` \| `number`

##### routing

`string`

##### corner

`number`

##### fromPort

###### x

`number`

###### y

`number`

##### toPort

###### x

`number`

###### y

`number`

##### points

`object`[]

##### avoidObstacles?

`boolean` = `false`

##### jumpOver?

`boolean` = `false`

##### obstacles?

`object`[] = `[]`

#### Returns

`void`
