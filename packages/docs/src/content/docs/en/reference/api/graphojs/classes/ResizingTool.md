---
editUrl: false
next: false
prev: false
title: "ResizingTool"
---

Defined in: [tool/ResizingTool.ts:10](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L10)

Tool for resizing nodes by dragging their edge/corner handles.

## Extends

- [`Tool`](/en/reference/api/graphojs/classes/tool/)

## Constructors

### Constructor

> **new ResizingTool**(): `ResizingTool`

#### Returns

`ResizingTool`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`constructor`](/en/reference/api/graphojs/classes/tool/#constructor)

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

#### Inherited from

[`ZoomingTool`](/en/reference/api/graphojs/classes/zoomingtool/).[`diagram`](/en/reference/api/graphojs/classes/zoomingtool/#diagram)

***

### handle

#### Get Signature

> **get** **handle**(): [`ResizeHandle`](/en/reference/api/graphojs/type-aliases/resizehandle/) \| `null`

Defined in: [tool/ResizingTool.ts:30](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L30)

The handle being dragged.

##### Returns

[`ResizeHandle`](/en/reference/api/graphojs/type-aliases/resizehandle/) \| `null`

***

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

Defined in: [tool/Tool.ts:23](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L23)

Check if this tool is currently active.

##### Returns

`boolean`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`isActive`](/en/reference/api/graphojs/classes/tool/#isactive)

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

#### Inherited from

[`ZoomingTool`](/en/reference/api/graphojs/classes/zoomingtool/).[`isEnabled`](/en/reference/api/graphojs/classes/zoomingtool/#isenabled)

***

### isResizing

#### Get Signature

> **get** **isResizing**(): `boolean`

Defined in: [tool/ResizingTool.ts:20](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L20)

Whether a resize drag is in progress.

##### Returns

`boolean`

***

### maxSize

#### Get Signature

> **get** **maxSize**(): `object`

Defined in: [tool/ResizingTool.ts:66](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L66)

GoJS-compatible: The maximum size for resized parts.

##### Returns

`object`

###### height

> **height**: `number`

###### width

> **width**: `number`

#### Set Signature

> **set** **maxSize**(`value`): `void`

Defined in: [tool/ResizingTool.ts:70](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L70)

##### Parameters

###### value

###### height

`number`

###### width

`number`

##### Returns

`void`

***

### minHeight

#### Get Signature

> **get** **minHeight**(): `number`

Defined in: [tool/ResizingTool.ts:44](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L44)

The minimum height for resized nodes.

##### Returns

`number`

#### Set Signature

> **set** **minHeight**(`value`): `void`

Defined in: [tool/ResizingTool.ts:48](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L48)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### minSize

#### Get Signature

> **get** **minSize**(): `object`

Defined in: [tool/ResizingTool.ts:53](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L53)

GoJS-compatible: The minimum size for resized parts.

##### Returns

`object`

###### height

> **height**: `number`

###### width

> **width**: `number`

#### Set Signature

> **set** **minSize**(`value`): `void`

Defined in: [tool/ResizingTool.ts:57](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L57)

##### Parameters

###### value

###### height

`number`

###### width

`number`

##### Returns

`void`

***

### minWidth

#### Get Signature

> **get** **minWidth**(): `number`

Defined in: [tool/ResizingTool.ts:35](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L35)

The minimum width for resized nodes.

##### Returns

`number`

#### Set Signature

> **set** **minWidth**(`value`): `void`

Defined in: [tool/ResizingTool.ts:39](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L39)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### resizingNode

#### Get Signature

> **get** **resizingNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [tool/ResizingTool.ts:25](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L25)

The node being resized.

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

## Methods

### canStart()

> **canStart**(`_toolName`, `e`): `boolean`

Defined in: [tool/ResizingTool.ts:143](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L143)

GoJS-compatible: start resizing when pressing on a resize handle of a selected node.

#### Parameters

##### \_toolName

`string`

##### e

`MouseEvent`

#### Returns

`boolean`

#### Overrides

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`canStart`](/en/reference/api/graphojs/classes/tool/#canstart)

***

### doActivate()

> **doActivate**(): `void`

Defined in: [tool/Tool.ts:38](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L38)

Called when the tool becomes the active tool.

#### Returns

`void`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doActivate`](/en/reference/api/graphojs/classes/tool/#doactivate)

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

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doClick`](/en/reference/api/graphojs/classes/tool/#doclick)

***

### doDeactivate()

> **doDeactivate**(): `void`

Defined in: [tool/Tool.ts:43](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L43)

Called when the tool is deactivated.

#### Returns

`void`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doDeactivate`](/en/reference/api/graphojs/classes/tool/#dodeactivate)

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

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doDoubleClick`](/en/reference/api/graphojs/classes/tool/#dodoubleclick)

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

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doKeyDown`](/en/reference/api/graphojs/classes/tool/#dokeydown)

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

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doKeyUp`](/en/reference/api/graphojs/classes/tool/#dokeyup)

***

### doMouseDown()

> **doMouseDown**(`e`): `void`

Defined in: [tool/ResizingTool.ts:162](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L162)

Called when a mouse down event occurs.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

#### Overrides

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doMouseDown`](/en/reference/api/graphojs/classes/tool/#domousedown)

***

### doMouseMove()

> **doMouseMove**(`e`): `void`

Defined in: [tool/ResizingTool.ts:192](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L192)

Called when a mouse move event occurs.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

#### Overrides

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doMouseMove`](/en/reference/api/graphojs/classes/tool/#domousemove)

***

### doMouseUp()

> **doMouseUp**(`_e`): `void`

Defined in: [tool/ResizingTool.ts:236](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L236)

Called when a mouse up event occurs.

#### Parameters

##### \_e

`MouseEvent`

#### Returns

`void`

#### Overrides

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doMouseUp`](/en/reference/api/graphojs/classes/tool/#domouseup)

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

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doMouseWheel`](/en/reference/api/graphojs/classes/tool/#domousewheel)

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

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doStart`](/en/reference/api/graphojs/classes/tool/#dostart)

***

### doStop()

> **doStop**(): `void`

Defined in: [tool/Tool.ts:97](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L97)

GoJS-compatible: Called when a tool operation stops.

#### Returns

`void`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doStop`](/en/reference/api/graphojs/classes/tool/#dostop)

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

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`findPartAt`](/en/reference/api/graphojs/classes/tool/#findpartat)

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

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`getDiagramPoint`](/en/reference/api/graphojs/classes/tool/#getdiagrampoint)

***

### getHandleAt()

> **getHandleAt**(`node`, `rawPoint`): [`ResizeHandle`](/en/reference/api/graphojs/type-aliases/resizehandle/) \| `null`

Defined in: [tool/ResizingTool.ts:98](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ResizingTool.ts#L98)

Find which resize handle (if any) is under a point for a selected node.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

##### rawPoint

###### x

`number`

###### y

`number`

#### Returns

[`ResizeHandle`](/en/reference/api/graphojs/type-aliases/resizehandle/) \| `null`
