---
editUrl: false
next: false
prev: false
title: "DiagramProps"
---

Defined in: [react/index.tsx:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L24)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [react/index.tsx:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L43)

***

### groupTemplate?

> `optional` **groupTemplate?**: [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [react/index.tsx:32](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L32)

GoJS-compatible: the group template.

***

### initDiagram?

> `optional` **initDiagram?**: (`diagram`) => `void`

Defined in: [react/index.tsx:34](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L34)

Called once the underlying diagram is created.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`void`

***

### linkTemplate?

> `optional` **linkTemplate?**: [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [react/index.tsx:30](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L30)

GoJS-compatible: the link template.

***

### model?

> `optional` **model?**: [`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

Defined in: [react/index.tsx:26](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L26)

GoJS-compatible: the model to display. Re-renders when it changes.

***

### nodeTemplate?

> `optional` **nodeTemplate?**: [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [react/index.tsx:28](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L28)

GoJS-compatible: the node template.

***

### onDiagramEvent?

> `optional` **onDiagramEvent?**: (`type`, `event`) => `void`

Defined in: [react/index.tsx:40](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L40)

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

Defined in: [react/index.tsx:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L36)

Called after initDiagram with the diagram instance.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`void`

***

### onModelChange?

> `optional` **onModelChange?**: (`event`) => `void`

Defined in: [react/index.tsx:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L38)

GoJS-compatible: called whenever the diagram's model changes.

#### Parameters

##### event

[`ChangedEvent`](/en/reference/api/graphojs/interfaces/changedevent/)

#### Returns

`void`

***

### onSelectionChanged?

> `optional` **onSelectionChanged?**: (`diagram`) => `void`

Defined in: [react/index.tsx:42](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L42)

Sugar for the "SelectionChanged" diagram event.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`void`

***

### style?

> `optional` **style?**: `CSSProperties`

Defined in: [react/index.tsx:44](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L44)
