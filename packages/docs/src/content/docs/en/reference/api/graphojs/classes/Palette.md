---
editUrl: false
next: false
prev: false
title: "Palette"
---

Defined in: [export/Palette.ts:10](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Palette.ts#L10)

A palette shows templates that can be dragged onto a diagram.
Dragging a template item onto the diagram adds a new node.

## Constructors

### Constructor

> **new Palette**(`container`, `diagram?`, `templates?`, `options?`): `Palette`

Defined in: [export/Palette.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Palette.ts#L17)

#### Parameters

##### container

`HTMLElement`

##### diagram?

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### templates?

[`Template`](/en/reference/api/graphojs/interfaces/template/)[]

##### options?

###### showCategories?

`boolean`

#### Returns

`Palette`

## Methods

### destroy()

> **destroy**(): `void`

Defined in: [export/Palette.ts:170](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Palette.ts#L170)

Destroy the palette and clean up.

#### Returns

`void`

***

### getDiagram()

> **getDiagram**(): [`Diagram`](/en/reference/api/graphojs/classes/diagram/)

Defined in: [export/Palette.ts:55](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Palette.ts#L55)

Get the diagram this palette is connected to.

#### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

***

### getElement()

> **getElement**(): `HTMLDivElement`

Defined in: [export/Palette.ts:50](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Palette.ts#L50)

Get the palette DOM element.

#### Returns

`HTMLDivElement`

***

### handleDropOnDiagram()

> **handleDropOnDiagram**(`templateId`, `diagramX`, `diagramY`): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `null`

Defined in: [export/Palette.ts:157](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Palette.ts#L157)

Handle a drop of a template onto the diagram.
Called externally by the diagram's drop handling.

#### Parameters

##### templateId

`string`

##### diagramX

`number`

##### diagramY

`number`

#### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `null`

***

### setTemplates()

> **setTemplates**(`templates`): `void`

Defined in: [export/Palette.ts:60](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Palette.ts#L60)

Set the templates shown in this palette.

#### Parameters

##### templates

[`Template`](/en/reference/api/graphojs/interfaces/template/)[]

#### Returns

`void`
