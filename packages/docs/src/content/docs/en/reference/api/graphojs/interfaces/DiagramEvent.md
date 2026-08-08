---
editUrl: false
next: false
prev: false
title: "DiagramEvent"
---

Defined in: [diagram/DiagramEvents.ts:57](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L57)

Event payload for diagram events.

## Properties

### data?

> `optional` **data?**: `Record`\<`string`, `unknown`\>

Defined in: [diagram/DiagramEvents.ts:65](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L65)

Extra data associated with the event.

***

### diagram

> **diagram**: [`Diagram`](/en/reference/api/graphojs/classes/diagram/)

Defined in: [diagram/DiagramEvents.ts:59](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L59)

The diagram that fired the event.

***

### parameter?

> `optional` **parameter?**: `unknown`

Defined in: [diagram/DiagramEvents.ts:69](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L69)

GoJS-compatible: An extra parameter value.

***

### part?

> `optional` **part?**: [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [diagram/DiagramEvents.ts:63](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L63)

The part involved (if any).

***

### subject?

> `optional` **subject?**: `unknown`

Defined in: [diagram/DiagramEvents.ts:67](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L67)

GoJS-compatible: The subject of the event (e.g. the part or changed data).

***

### type

> **type**: [`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

Defined in: [diagram/DiagramEvents.ts:61](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/DiagramEvents.ts#L61)

The event type.
