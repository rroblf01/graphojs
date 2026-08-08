---
editUrl: false
next: false
prev: false
title: "DiagramEvents"
---

Defined in: [diagram/DiagramEvents.ts:77](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L77)

Manages diagram-level events.

## Constructors

### Constructor

> **new DiagramEvents**(): `DiagramEvents`

#### Returns

`DiagramEvents`

## Methods

### addAnyListener()

> **addAnyListener**(`handler`): `void`

Defined in: [diagram/DiagramEvents.ts:88](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L88)

Add a listener for all event types.

#### Parameters

##### handler

[`DiagramEventHandler`](/en/reference/api/graphojs/type-aliases/diagrameventhandler/)

#### Returns

`void`

***

### addListener()

> **addListener**(`type`, `handler`): `void`

Defined in: [diagram/DiagramEvents.ts:81](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L81)

Add a listener for a specific event type.

#### Parameters

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

##### handler

[`DiagramEventHandler`](/en/reference/api/graphojs/type-aliases/diagrameventhandler/)

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [diagram/DiagramEvents.ts:122](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L122)

Remove all listeners.

#### Returns

`void`

***

### fire()

> **fire**(`diagram`, `type`, `part?`, `data?`): `void`

Defined in: [diagram/DiagramEvents.ts:129](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L129)

Fire an event to all registered listeners.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

##### part?

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

##### data?

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### hasListeners()

> **hasListeners**(`type`): `boolean`

Defined in: [diagram/DiagramEvents.ts:112](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L112)

Check if there are listeners for an event type.

#### Parameters

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

#### Returns

`boolean`

***

### listenerCount()

> **listenerCount**(`type`): `number`

Defined in: [diagram/DiagramEvents.ts:117](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L117)

Get the number of listeners for an event type.

#### Parameters

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

#### Returns

`number`

***

### removeAnyListener()

> **removeAnyListener**(`handler`): `void`

Defined in: [diagram/DiagramEvents.ts:105](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L105)

Remove a listener from all event types.

#### Parameters

##### handler

[`DiagramEventHandler`](/en/reference/api/graphojs/type-aliases/diagrameventhandler/)

#### Returns

`void`

***

### removeListener()

> **removeListener**(`type`, `handler`): `boolean`

Defined in: [diagram/DiagramEvents.ts:95](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L95)

Remove a listener for a specific event type.

#### Parameters

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

##### handler

[`DiagramEventHandler`](/en/reference/api/graphojs/type-aliases/diagrameventhandler/)

#### Returns

`boolean`
