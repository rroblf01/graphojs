---
editUrl: false
next: false
prev: false
title: "LayerCache"
---

Defined in: [render/LayerCache.ts:19](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L19)

Caches layer rendering to offscreen canvases so static content
does not need to be redrawn every frame. Only dirty layers are redrawn.

## Constructors

### Constructor

> **new LayerCache**(`scale?`): `LayerCache`

Defined in: [render/LayerCache.ts:23](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L23)

#### Parameters

##### scale?

`number` = `1`

#### Returns

`LayerCache`

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [render/LayerCache.ts:56](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L56)

Get the number of cached layers.

##### Returns

`number`

## Methods

### clear()

> **clear**(): `void`

Defined in: [render/LayerCache.ts:222](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L222)

Clear the cache.

#### Returns

`void`

***

### getLayer()

> **getLayer**(`layer`): `CachedLayer` \| `null`

Defined in: [render/LayerCache.ts:65](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L65)

Get a cached rendering for a layer.
If the layer is dirty or not cached, it is re-rendered.
Returns null if the layer has no visible parts.

#### Parameters

##### layer

[`Layer`](/en/reference/api/graphojs/classes/layer/)

#### Returns

`CachedLayer` \| `null`

***

### getScale()

> **getScale**(): `number`

Defined in: [render/LayerCache.ts:34](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L34)

Get the current scale.

#### Returns

`number`

***

### isDirty()

> **isDirty**(`layerName`): `boolean`

Defined in: [render/LayerCache.ts:51](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L51)

Check if a layer is dirty.

#### Parameters

##### layerName

`string`

#### Returns

`boolean`

***

### markAllDirty()

> **markAllDirty**(): `void`

Defined in: [render/LayerCache.ts:44](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L44)

Mark all layers as dirty.

#### Returns

`void`

***

### markDirty()

> **markDirty**(`layerName`): `void`

Defined in: [render/LayerCache.ts:39](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L39)

Mark a layer as dirty (needs redraw).

#### Parameters

##### layerName

`string`

#### Returns

`void`

***

### removeLayer()

> **removeLayer**(`name`): `void`

Defined in: [render/LayerCache.ts:228](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L228)

Remove a specific layer from the cache.

#### Parameters

##### name

`string`

#### Returns

`void`

***

### setScale()

> **setScale**(`scale`): `void`

Defined in: [render/LayerCache.ts:26](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/LayerCache.ts#L26)

Set the device scale for cached rendering.

#### Parameters

##### scale

`number`

#### Returns

`void`
