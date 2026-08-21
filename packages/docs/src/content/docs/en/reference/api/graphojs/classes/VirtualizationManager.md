---
editUrl: false
next: false
prev: false
title: "VirtualizationManager"
---

Defined in: [spatial/VirtualizationManager.ts:10](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L10)

Manages viewport culling and spatial indexing for a diagram.
Only parts intersecting the visible viewport are considered "in view".

## Constructors

### Constructor

> **new VirtualizationManager**(`bounds`, `options?`): `VirtualizationManager`

Defined in: [spatial/VirtualizationManager.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L15)

#### Parameters

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### options?

###### maxDepth?

`number`

###### maxItems?

`number`

#### Returns

`VirtualizationManager`

## Accessors

### culledCount

#### Get Signature

> **get** **culledCount**(): `number`

Defined in: [spatial/VirtualizationManager.ts:30](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L30)

Get the number of parts currently culled (hidden).

##### Returns

`number`

***

### isEnabled

#### Get Signature

> **get** **isEnabled**(): `boolean`

Defined in: [spatial/VirtualizationManager.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L20)

Whether virtualization is enabled.

##### Returns

`boolean`

#### Set Signature

> **set** **isEnabled**(`value`): `void`

Defined in: [spatial/VirtualizationManager.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L25)

Set whether virtualization is enabled.

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### itemCount

#### Get Signature

> **get** **itemCount**(): `number`

Defined in: [spatial/VirtualizationManager.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L35)

Get the total number of indexed parts.

##### Returns

`number`

## Methods

### clear()

> **clear**(): `void`

Defined in: [spatial/VirtualizationManager.ts:101](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L101)

Clear the spatial index.

#### Returns

`void`

***

### cull()

> **cull**(`viewport`, `allParts?`): [`Part`](/en/reference/api/graphojs/classes/part/)[]

Defined in: [spatial/VirtualizationManager.ts:72](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L72)

Cull parts based on the current viewport.
When enabled, returns only parts within the viewport.
When disabled, returns all provided parts (no culling).

#### Parameters

##### viewport

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### allParts?

[`Part`](/en/reference/api/graphojs/classes/part/)[]

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/)[]

***

### getIndex()

> **getIndex**(): [`QuadTree`](/en/reference/api/graphojs/classes/quadtree/)\<[`Part`](/en/reference/api/graphojs/classes/part/)\>

Defined in: [spatial/VirtualizationManager.ts:40](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L40)

Get the underlying spatial index.

#### Returns

[`QuadTree`](/en/reference/api/graphojs/classes/quadtree/)\<[`Part`](/en/reference/api/graphojs/classes/part/)\>

***

### insert()

> **insert**(`part`): `void`

Defined in: [spatial/VirtualizationManager.ts:45](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L45)

Insert a part into the spatial index.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### insertAt()

> **insertAt**(`x`, `y`, `part`): `void`

Defined in: [spatial/VirtualizationManager.ts:50](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L50)

Insert a part at explicit coordinates.

#### Parameters

##### x

`number`

##### y

`number`

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### queryCircle()

> **queryCircle**(`cx`, `cy`, `radius`): [`Part`](/en/reference/api/graphojs/classes/part/)[]

Defined in: [spatial/VirtualizationManager.ts:91](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L91)

Query parts within a circle.

#### Parameters

##### cx

`number`

##### cy

`number`

##### radius

`number`

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/)[]

***

### queryNearest()

> **queryNearest**(`x`, `y`, `maxDistance`): [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [spatial/VirtualizationManager.ts:96](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L96)

Query the nearest part to a point within a maximum distance.

#### Parameters

##### x

`number`

##### y

`number`

##### maxDistance

`number`

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

***

### queryRegion()

> **queryRegion**(`bounds`): [`Part`](/en/reference/api/graphojs/classes/part/)[]

Defined in: [spatial/VirtualizationManager.ts:86](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L86)

Query parts intersecting a region.

#### Parameters

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/)[]

***

### rebuild()

> **rebuild**(`parts`, `bounds`): `void`

Defined in: [spatial/VirtualizationManager.ts:60](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L60)

Rebuild the spatial index from a list of parts.

#### Parameters

##### parts

`Iterable`\<[`Part`](/en/reference/api/graphojs/classes/part/)\>

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

***

### remove()

> **remove**(`part`): `boolean`

Defined in: [spatial/VirtualizationManager.ts:55](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L55)

Remove a part from the spatial index.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`boolean`

***

### createViewport()

> `static` **createViewport**(`x`, `y`, `width`, `height`, `padding?`): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [spatial/VirtualizationManager.ts:107](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/spatial/VirtualizationManager.ts#L107)

Create a viewport rect from diagram coordinates.

#### Parameters

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

##### padding?

`number` = `0`

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)
