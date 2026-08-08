---
editUrl: false
next: false
prev: false
title: "QuadTree"
---

Defined in: [spatial/QuadTree.ts:16](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L16)

A quadtree spatial index for fast 2D region queries.
Used for viewport culling and hit-testing optimization.

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new QuadTree**\<`T`\>(`bounds`, `options?`): `QuadTree`\<`T`\>

Defined in: [spatial/QuadTree.ts:25](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L25)

#### Parameters

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### options?

###### depth?

`number`

###### maxDepth?

`number`

###### maxItems?

`number`

#### Returns

`QuadTree`\<`T`\>

## Accessors

### itemCount

#### Get Signature

> **get** **itemCount**(): `number`

Defined in: [spatial/QuadTree.ts:38](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L38)

Get the total number of items in the quadtree.

##### Returns

`number`

## Methods

### clear()

> **clear**(): `void`

Defined in: [spatial/QuadTree.ts:257](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L257)

Remove all items.

#### Returns

`void`

***

### getAllItems()

> **getAllItems**(): `T`[]

Defined in: [spatial/QuadTree.ts:269](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L269)

Get all items in the quadtree.

#### Returns

`T`[]

***

### getBounds()

> **getBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [spatial/QuadTree.ts:33](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L33)

Get the bounds of this quadtree node.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### insert()

> **insert**(`x`, `y`, `data`): `void`

Defined in: [spatial/QuadTree.ts:43](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L43)

Insert an item at a point.

#### Parameters

##### x

`number`

##### y

`number`

##### data

`T`

#### Returns

`void`

***

### insertWithBounds()

> **insertWithBounds**(`bounds`, `data`): `void`

Defined in: [spatial/QuadTree.ts:56](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L56)

Insert an item described by a bounding rectangle. The item is indexed by
its full extent (not just its center) so a viewport/region query finds
it whenever the rectangle overlaps, even if its center point doesn't.

#### Parameters

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### data

`T`

#### Returns

`void`

***

### isLeaf()

> **isLeaf**(): `boolean`

Defined in: [spatial/QuadTree.ts:264](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L264)

Check if this node is a leaf (has no children).

#### Returns

`boolean`

***

### queryCircle()

> **queryCircle**(`cx`, `cy`, `radius`): `T`[]

Defined in: [spatial/QuadTree.ts:199](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L199)

Query all items within a circle.

#### Parameters

##### cx

`number`

##### cy

`number`

##### radius

`number`

#### Returns

`T`[]

***

### queryNearest()

> **queryNearest**(`x`, `y`, `maxDistance`): `T` \| `null`

Defined in: [spatial/QuadTree.ts:211](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L211)

Query the nearest item to a point within maxDistance.

#### Parameters

##### x

`number`

##### y

`number`

##### maxDistance

`number`

#### Returns

`T` \| `null`

***

### queryRegion()

> **queryRegion**(`bounds`): `T`[]

Defined in: [spatial/QuadTree.ts:138](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L138)

Query all items within a region (inclusive).
Returns data items found in the region.

#### Parameters

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`T`[]

***

### queryRegionWithPoints()

> **queryRegionWithPoints**(`bounds`): `object`[]

Defined in: [spatial/QuadTree.ts:173](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L173)

Query items within a rectangular region.
Returns data items with their positions.

#### Parameters

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`object`[]

***

### remove()

> **remove**(`data`): `boolean`

Defined in: [spatial/QuadTree.ts:233](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/spatial/QuadTree.ts#L233)

Remove an item from the quadtree.

#### Parameters

##### data

`T`

#### Returns

`boolean`
