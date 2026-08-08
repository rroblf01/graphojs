---
editUrl: false
next: false
prev: false
title: "Layer"
---

Defined in: [layer/Layer.ts:7](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L7)

A layer controls the z-ordering of parts in a diagram.
Parts in lower z-order layers are rendered first (behind).

## Constructors

### Constructor

> **new Layer**(`name`, `zOrder`): `Layer`

Defined in: [layer/Layer.ts:15](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L15)

#### Parameters

##### name

`string`

##### zOrder

`number`

#### Returns

`Layer`

## Accessors

### isTemporary

#### Get Signature

> **get** **isTemporary**(): `boolean`

Defined in: [layer/Layer.ts:36](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L36)

Whether this is a temporary layer (for dragging, etc.).

##### Returns

`boolean`

#### Set Signature

> **set** **isTemporary**(`value`): `void`

Defined in: [layer/Layer.ts:41](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L41)

Set whether this is a temporary layer.

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [layer/Layer.ts:21](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L21)

The layer name.

##### Returns

`string`

***

### opacity

#### Get Signature

> **get** **opacity**(): `number`

Defined in: [layer/Layer.ts:46](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L46)

The opacity of this layer (0-1).

##### Returns

`number`

#### Set Signature

> **set** **opacity**(`value`): `void`

Defined in: [layer/Layer.ts:51](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L51)

Set the opacity.

##### Parameters

###### value

`number`

##### Returns

`void`

***

### partCount

#### Get Signature

> **get** **partCount**(): `number`

Defined in: [layer/Layer.ts:70](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L70)

Get the number of parts in this layer.

##### Returns

`number`

***

### parts

#### Get Signature

> **get** **parts**(): readonly [`Part`](/en/reference/api/graphojs/classes/part/)[]

Defined in: [layer/Layer.ts:65](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L65)

Get all parts in this layer.

##### Returns

readonly [`Part`](/en/reference/api/graphojs/classes/part/)[]

***

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: [layer/Layer.ts:56](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L56)

GoJS-compatible: Whether this layer is visible.

##### Returns

`boolean`

#### Set Signature

> **set** **visible**(`value`): `void`

Defined in: [layer/Layer.ts:60](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L60)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### zOrder

#### Get Signature

> **get** **zOrder**(): `number`

Defined in: [layer/Layer.ts:26](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L26)

The z-order of this layer (lower values rendered first).

##### Returns

`number`

#### Set Signature

> **set** **zOrder**(`value`): `void`

Defined in: [layer/Layer.ts:31](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L31)

Set the z-order.

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### add()

> **add**(`part`): `void`

Defined in: [layer/Layer.ts:75](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L75)

Add a part to this layer.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [layer/Layer.ts:99](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L99)

Remove all parts from this layer.

#### Returns

`void`

***

### contains()

> **contains**(`part`): `boolean`

Defined in: [layer/Layer.ts:89](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L89)

Check if a part is in this layer.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`boolean`

***

### getVisibleParts()

> **getVisibleParts**(): [`Part`](/en/reference/api/graphojs/classes/part/)[]

Defined in: [layer/Layer.ts:94](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L94)

Get all visible parts in this layer.

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/)[]

***

### remove()

> **remove**(`part`): `boolean`

Defined in: [layer/Layer.ts:81](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layer/Layer.ts#L81)

Remove a part from this layer.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`boolean`
