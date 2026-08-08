---
editUrl: false
next: false
prev: false
title: "PathCache"
---

Defined in: [render/RenderCache.ts:9](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/RenderCache.ts#L9)

A cache for complex shape paths as Path2D objects.
Building a Path2D for complex shapes (diamond, star, etc.) is expensive;
caching them avoids recomputation each frame.

## Constructors

### Constructor

> **new PathCache**(): `PathCache`

#### Returns

`PathCache`

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [render/RenderCache.ts:14](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/RenderCache.ts#L14)

Get the number of cached paths.

##### Returns

`number`

## Methods

### clear()

> **clear**(): `void`

Defined in: [render/RenderCache.ts:66](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/RenderCache.ts#L66)

Clear the path cache.

#### Returns

`void`

***

### getPath()

> **getPath**(`type`, `width`, `height`): `Path2D` \| `null`

Defined in: [render/RenderCache.ts:22](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/RenderCache.ts#L22)

Get (or build) a cached Path2D for a shape type at a given size.
The key includes the size because the shape geometry depends on it.

#### Parameters

##### type

[`ShapeType`](/en/reference/api/graphojs/type-aliases/shapetype/)

##### width

`number`

##### height

`number`

#### Returns

`Path2D` \| `null`
