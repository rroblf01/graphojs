---
editUrl: false
next: false
prev: false
title: "InputEvent"
---

Defined in: [events/InputEvent.ts:9](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L9)

GoJS-compatible: Wraps a browser event delivered to GraphObject handlers.
Exposes diagram/model/document-point accessors that DOM MouseEvents lack.

## Constructors

### Constructor

> **new InputEvent**(`source`): `InputEvent`

Defined in: [events/InputEvent.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L23)

#### Parameters

##### source

`MouseEvent` \| `KeyboardEvent`

#### Returns

`InputEvent`

## Properties

### clickCount

> **clickCount**: `number` = `0`

Defined in: [events/InputEvent.ts:19](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L19)

The click count for mouse events.

***

### diagram

> **diagram**: [`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null` = `null`

Defined in: [events/InputEvent.ts:13](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L13)

The diagram that received the event (if available).

***

### handled

> **handled**: `boolean` = `false`

Defined in: [events/InputEvent.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L17)

Whether this event has been handled (prevents further propagation).

***

### key

> **key**: `string` = `''`

Defined in: [events/InputEvent.ts:21](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L21)

The key involved in keyboard events (may be empty for mouse events).

***

### source

> `readonly` **source**: `MouseEvent` \| `KeyboardEvent`

Defined in: [events/InputEvent.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L11)

The original DOM event.

***

### targetObject

> **targetObject**: [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null` = `null`

Defined in: [events/InputEvent.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L15)

The GraphObject the event targeted (if available).

## Accessors

### alt

#### Get Signature

> **get** **alt**(): `boolean`

Defined in: [events/InputEvent.ts:59](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L59)

GoJS-compatible: whether the Alt/Option key was held during the event.

##### Returns

`boolean`

***

### button

#### Get Signature

> **get** **button**(): `number`

Defined in: [events/InputEvent.ts:69](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L69)

GoJS-compatible: the mouse button involved (0=left, 1=middle, 2=right), or -1 for non-mouse events.

##### Returns

`number`

***

### control

#### Get Signature

> **get** **control**(): `boolean`

Defined in: [events/InputEvent.ts:49](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L49)

GoJS-compatible: whether the Control key was held during the event.

##### Returns

`boolean`

***

### left

#### Get Signature

> **get** **left**(): `boolean`

Defined in: [events/InputEvent.ts:74](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L74)

GoJS-compatible: whether the left mouse button was involved.

##### Returns

`boolean`

***

### meta

#### Get Signature

> **get** **meta**(): `boolean`

Defined in: [events/InputEvent.ts:64](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L64)

GoJS-compatible: whether the Meta/Command key was held during the event.

##### Returns

`boolean`

***

### model

#### Get Signature

> **get** **model**(): [`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/) \| `null`

Defined in: [events/InputEvent.ts:44](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L44)

GoJS-compatible: The model of the diagram receiving the event.

##### Returns

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/) \| `null`

***

### right

#### Get Signature

> **get** **right**(): `boolean`

Defined in: [events/InputEvent.ts:79](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L79)

GoJS-compatible: whether the right mouse button was involved.

##### Returns

`boolean`

***

### shift

#### Get Signature

> **get** **shift**(): `boolean`

Defined in: [events/InputEvent.ts:54](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L54)

GoJS-compatible: whether the Shift key was held during the event.

##### Returns

`boolean`

## Methods

### documentPoint()

> **documentPoint**(): `object`

Defined in: [events/InputEvent.ts:28](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L28)

GoJS-compatible: The point in document coordinates.

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### viewPoint()

> **viewPoint**(): `object`

Defined in: [events/InputEvent.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/events/InputEvent.ts#L36)

GoJS-compatible: The point in viewport (screen) coordinates.

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`
