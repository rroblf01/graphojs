---
editUrl: false
next: false
prev: false
title: "Tool"
---

Defined in: [tool/Tool.ts:7](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L7)

Base class for all interaction tools.

## Extended by

- [`ClickCreatingTool`](/en/reference/api/graphojs/classes/clickcreatingtool/)
- [`ClickSelectingTool`](/en/reference/api/graphojs/classes/clickselectingtool/)
- [`ContextMenuTool`](/en/reference/api/graphojs/classes/contextmenutool/)
- [`DraggingTool`](/en/reference/api/graphojs/classes/draggingtool/)
- [`DragSelectingTool`](/en/reference/api/graphojs/classes/dragselectingtool/)
- [`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/)
- [`LinkLabelDraggingTool`](/en/reference/api/graphojs/classes/linklabeldraggingtool/)
- [`LinkReshapingTool`](/en/reference/api/graphojs/classes/linkreshapingtool/)
- [`PanningTool`](/en/reference/api/graphojs/classes/panningtool/)
- [`ResizingTool`](/en/reference/api/graphojs/classes/resizingtool/)
- [`RotatingTool`](/en/reference/api/graphojs/classes/rotatingtool/)
- [`TextEditingTool`](/en/reference/api/graphojs/classes/texteditingtool/)
- [`ZoomingTool`](/en/reference/api/graphojs/classes/zoomingtool/)

## Constructors

### Constructor

> **new Tool**(): `Tool`

#### Returns

`Tool`

## Accessors

### diagram

#### Get Signature

> **get** **diagram**(): [`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

Defined in: [tool/Tool.ts:13](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L13)

Get the diagram this tool belongs to.

##### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

#### Set Signature

> **set** **diagram**(`value`): `void`

Defined in: [tool/Tool.ts:18](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L18)

Set the diagram this tool belongs to.

##### Parameters

###### value

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

##### Returns

`void`

***

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

Defined in: [tool/Tool.ts:23](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L23)

Check if this tool is currently active.

##### Returns

`boolean`

***

### isEnabled

#### Get Signature

> **get** **isEnabled**(): `boolean`

Defined in: [tool/Tool.ts:28](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L28)

Check if this tool is enabled.

##### Returns

`boolean`

#### Set Signature

> **set** **isEnabled**(`value`): `void`

Defined in: [tool/Tool.ts:33](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L33)

Enable or disable this tool.

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### canStart()

> **canStart**(`_toolName`, `_e`): `boolean`

Defined in: [tool/Tool.ts:105](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L105)

GoJS-compatible: Determines whether this tool should start given the current event.
Override in subclasses to return true when this tool should handle the event.

#### Parameters

##### \_toolName

`string`

##### \_e

`MouseEvent`

#### Returns

`boolean`

***

### doActivate()

> **doActivate**(): `void`

Defined in: [tool/Tool.ts:38](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L38)

Called when the tool becomes the active tool.

#### Returns

`void`

***

### doClick()

> **doClick**(`_e`): `void`

Defined in: [tool/Tool.ts:78](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L78)

Called when a click event occurs.

#### Parameters

##### \_e

`MouseEvent`

#### Returns

`void`

***

### doDeactivate()

> **doDeactivate**(): `void`

Defined in: [tool/Tool.ts:43](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L43)

Called when the tool is deactivated.

#### Returns

`void`

***

### doDoubleClick()

> **doDoubleClick**(`_e`): `void`

Defined in: [tool/Tool.ts:83](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L83)

Called when a double click event occurs.

#### Parameters

##### \_e

`MouseEvent`

#### Returns

`void`

***

### doKeyDown()

> **doKeyDown**(`_e`): `void`

Defined in: [tool/Tool.ts:68](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L68)

Called when a key down event occurs.

#### Parameters

##### \_e

`KeyboardEvent`

#### Returns

`void`

***

### doKeyUp()

> **doKeyUp**(`_e`): `void`

Defined in: [tool/Tool.ts:73](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L73)

Called when a key up event occurs.

#### Parameters

##### \_e

`KeyboardEvent`

#### Returns

`void`

***

### doMouseDown()

> **doMouseDown**(`_e`): `void`

Defined in: [tool/Tool.ts:48](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L48)

Called when a mouse down event occurs.

#### Parameters

##### \_e

`MouseEvent`

#### Returns

`void`

***

### doMouseMove()

> **doMouseMove**(`_e`): `void`

Defined in: [tool/Tool.ts:53](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L53)

Called when a mouse move event occurs.

#### Parameters

##### \_e

`MouseEvent`

#### Returns

`void`

***

### doMouseUp()

> **doMouseUp**(`_e`): `void`

Defined in: [tool/Tool.ts:58](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L58)

Called when a mouse up event occurs.

#### Parameters

##### \_e

`MouseEvent`

#### Returns

`void`

***

### doMouseWheel()

> **doMouseWheel**(`_e`): `void`

Defined in: [tool/Tool.ts:63](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L63)

Called when a mouse wheel event occurs.

#### Parameters

##### \_e

`WheelEvent`

#### Returns

`void`

***

### doStart()

> **doStart**(`_e`): `void`

Defined in: [tool/Tool.ts:90](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L90)

GoJS-compatible: Called when a tool operation starts (after canStart returns true).

#### Parameters

##### \_e

`MouseEvent`

#### Returns

`void`

***

### doStop()

> **doStop**(): `void`

Defined in: [tool/Tool.ts:97](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L97)

GoJS-compatible: Called when a tool operation stops.

#### Returns

`void`

***

### findPartAt()

> **findPartAt**(`x`, `y`): [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [tool/Tool.ts:110](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L110)

Find a part at the given diagram coordinates.

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

***

### getDiagramPoint()

> **getDiagramPoint**(`e`): `object`

Defined in: [tool/Tool.ts:116](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L116)

Get the mouse position in diagram coordinates.

#### Parameters

##### e

`MouseEvent`

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`
