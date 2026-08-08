---
editUrl: false
next: false
prev: false
title: "Port"
---

Defined in: [parts/Port.ts:10](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L10)

A connection point on a Node where Links can attach.
Ports can be positioned by an alignment or a Spot.

## Constructors

### Constructor

> **new Port**(`name`): `Port`

Defined in: [parts/Port.ts:17](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L17)

#### Parameters

##### name

`string`

#### Returns

`Port`

## Accessors

### alignment

#### Get Signature

> **get** **alignment**(): [`PortAlignment`](/en/reference/api/graphojs/type-aliases/portalignment/)

Defined in: [parts/Port.ts:27](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L27)

The alignment of this port on its node.

##### Returns

[`PortAlignment`](/en/reference/api/graphojs/type-aliases/portalignment/)

#### Set Signature

> **set** **alignment**(`value`): `void`

Defined in: [parts/Port.ts:31](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L31)

##### Parameters

###### value

[`PortAlignment`](/en/reference/api/graphojs/type-aliases/portalignment/)

##### Returns

`void`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [parts/Port.ts:22](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L22)

The port name (used to reference it from link data).

##### Returns

`string`

***

### size

#### Get Signature

> **get** **size**(): [`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

Defined in: [parts/Port.ts:46](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L46)

The size of this port (for rendering).

##### Returns

[`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

#### Set Signature

> **set** **size**(`value`): `void`

Defined in: [parts/Port.ts:50](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L50)

##### Parameters

###### value

[`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

##### Returns

`void`

***

### spot

#### Get Signature

> **get** **spot**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [parts/Port.ts:36](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L36)

A custom Spot for precise positioning. Overrides alignment.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **spot**(`value`): `void`

Defined in: [parts/Port.ts:40](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L40)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

***

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: [parts/Port.ts:55](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L55)

Whether this port is visible.

##### Returns

`boolean`

#### Set Signature

> **set** **visible**(`value`): `void`

Defined in: [parts/Port.ts:59](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L59)

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### computePoint()

> **computePoint**(`x`, `y`, `width`, `height`): `object`

Defined in: [parts/Port.ts:66](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Port.ts#L66)

Compute the point of this port on a node bounds.

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

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`
