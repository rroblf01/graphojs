---
editUrl: false
next: false
prev: false
title: "CanvasPool"
---

Defined in: [render/PerformanceCache.ts:116](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L116)

Pool for offscreen canvases to avoid frequent allocation.

## Constructors

### Constructor

> **new CanvasPool**(`maxSize?`, `maxWidth?`, `maxHeight?`): `CanvasPool`

Defined in: [render/PerformanceCache.ts:122](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L122)

#### Parameters

##### maxSize?

`number` = `10`

##### maxWidth?

`number` = `2048`

##### maxHeight?

`number` = `2048`

#### Returns

`CanvasPool`

## Accessors

### available

#### Get Signature

> **get** **available**(): `number`

Defined in: [render/PerformanceCache.ts:177](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L177)

Get the number of available canvases.

##### Returns

`number`

***

### used

#### Get Signature

> **get** **used**(): `number`

Defined in: [render/PerformanceCache.ts:184](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L184)

Get the number of canvases in use.

##### Returns

`number`

## Methods

### acquire()

> **acquire**(`width`, `height`): `HTMLCanvasElement`

Defined in: [render/PerformanceCache.ts:135](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L135)

Get a canvas from the pool.

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

`HTMLCanvasElement`

***

### release()

> **release**(`canvas`): `void`

Defined in: [render/PerformanceCache.ts:149](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L149)

Release a canvas back to the pool.

#### Parameters

##### canvas

`HTMLCanvasElement`

#### Returns

`void`

***

### releaseAll()

> **releaseAll**(): `void`

Defined in: [render/PerformanceCache.ts:163](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/PerformanceCache.ts#L163)

Release all canvases back to the pool.

#### Returns

`void`
