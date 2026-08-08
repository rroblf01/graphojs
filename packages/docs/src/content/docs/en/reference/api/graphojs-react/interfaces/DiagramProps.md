---
editUrl: false
next: false
prev: false
title: "DiagramProps"
---

Defined in: [react/index.tsx:21](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L21)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [react/index.tsx:40](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L40)

***

### groupTemplate?

> `optional` **groupTemplate?**: [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [react/index.tsx:29](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L29)

GoJS-compatible: the group template.

***

### initDiagram?

> `optional` **initDiagram?**: (`diagram`) => `void`

Defined in: [react/index.tsx:31](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L31)

Called once the underlying diagram is created.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`void`

***

### linkTemplate?

> `optional` **linkTemplate?**: [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [react/index.tsx:27](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L27)

GoJS-compatible: the link template.

***

### model?

> `optional` **model?**: [`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

Defined in: [react/index.tsx:23](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L23)

GoJS-compatible: the model to display. Re-renders when it changes.

***

### nodeTemplate?

> `optional` **nodeTemplate?**: [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [react/index.tsx:25](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L25)

GoJS-compatible: the node template.

***

### onDiagramEvent?

> `optional` **onDiagramEvent?**: (`type`, `event`) => `void`

Defined in: [react/index.tsx:37](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L37)

Called for every fired diagram event of the given type.

#### Parameters

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

##### event

[`DiagramEvent`](/en/reference/api/graphojs/interfaces/diagramevent/)

#### Returns

`void`

***

### onDiagramInit?

> `optional` **onDiagramInit?**: (`diagram`) => `void`

Defined in: [react/index.tsx:33](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L33)

Called after initDiagram with the diagram instance.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`void`

***

### onModelChange?

> `optional` **onModelChange?**: (`event`) => `void`

Defined in: [react/index.tsx:35](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L35)

GoJS-compatible: called whenever the diagram's model changes.

#### Parameters

##### event

[`ChangedEvent`](/en/reference/api/graphojs/interfaces/changedevent/)

#### Returns

`void`

***

### onSelectionChanged?

> `optional` **onSelectionChanged?**: (`diagram`) => `void`

Defined in: [react/index.tsx:39](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L39)

Sugar for the "SelectionChanged" diagram event.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`void`

***

### style?

> `optional` **style?**: `CSSProperties`

Defined in: [react/index.tsx:41](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/react/index.tsx#L41)
