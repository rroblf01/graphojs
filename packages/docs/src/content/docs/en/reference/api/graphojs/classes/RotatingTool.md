---
editUrl: false
next: false
prev: false
title: "RotatingTool"
---

Defined in: [tool/RotatingTool.ts:8](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RotatingTool.ts#L8)

Tool for rotating nodes around their center via the rotation handle.

## Extends

- [`Tool`](/en/reference/api/graphojs/classes/tool/)

## Constructors

### Constructor

> **new RotatingTool**(): `RotatingTool`

#### Returns

`RotatingTool`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`constructor`](/en/reference/api/graphojs/classes/tool/#constructor)

## Accessors

### diagram

#### Get Signature

> **get** **diagram**(): [`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

Defined in: [tool/Tool.ts:13](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L13)

Get the diagram this tool belongs to.

##### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

#### Set Signature

> **set** **diagram**(`value`): `void`

Defined in: [tool/Tool.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L18)

Set the diagram this tool belongs to.

##### Parameters

###### value

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

##### Returns

`void`

#### Inherited from

[`ZoomingTool`](/en/reference/api/graphojs/classes/zoomingtool/).[`diagram`](/en/reference/api/graphojs/classes/zoomingtool/#diagram)

***

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

Defined in: [tool/Tool.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L23)

Check if this tool is currently active.

##### Returns

`boolean`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`isActive`](/en/reference/api/graphojs/classes/tool/#isactive)

***

### isEnabled

#### Get Signature

> **get** **isEnabled**(): `boolean`

Defined in: [tool/Tool.ts:28](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L28)

Check if this tool is enabled.

##### Returns

`boolean`

#### Set Signature

> **set** **isEnabled**(`value`): `void`

Defined in: [tool/Tool.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L33)

Enable or disable this tool.

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`ZoomingTool`](/en/reference/api/graphojs/classes/zoomingtool/).[`isEnabled`](/en/reference/api/graphojs/classes/zoomingtool/#isenabled)

***

### isRotating

#### Get Signature

> **get** **isRotating**(): `boolean`

Defined in: [tool/RotatingTool.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RotatingTool.ts#L15)

Whether a rotation drag is in progress.

##### Returns

`boolean`

***

### rotatingNode

#### Get Signature

> **get** **rotatingNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [tool/RotatingTool.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RotatingTool.ts#L20)

The node being rotated.

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

## Methods

### canStart()

> **canStart**(`_toolName`, `e`): `boolean`

Defined in: [tool/RotatingTool.ts:65](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RotatingTool.ts#L65)

GoJS-compatible: start rotating when pressing on the rotation handle of a selected node.

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

Defined in: [tool/Tool.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L38)

Called when the tool becomes the active tool.

#### Returns

`void`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doActivate`](/en/reference/api/graphojs/classes/tool/#doactivate)

***

### doClick()

> **doClick**(`_e`): `void`

Defined in: [tool/Tool.ts:78](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L78)

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

Defined in: [tool/Tool.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L43)

Called when the tool is deactivated.

#### Returns

`void`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doDeactivate`](/en/reference/api/graphojs/classes/tool/#dodeactivate)

***

### doDoubleClick()

> **doDoubleClick**(`_e`): `void`

Defined in: [tool/Tool.ts:83](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L83)

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

Defined in: [tool/Tool.ts:68](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L68)

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

Defined in: [tool/Tool.ts:73](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L73)

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

Defined in: [tool/RotatingTool.ts:77](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RotatingTool.ts#L77)

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

Defined in: [tool/RotatingTool.ts:98](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RotatingTool.ts#L98)

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

Defined in: [tool/RotatingTool.ts:112](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RotatingTool.ts#L112)

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

Defined in: [tool/Tool.ts:63](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L63)

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

Defined in: [tool/Tool.ts:90](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L90)

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

Defined in: [tool/Tool.ts:97](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L97)

GoJS-compatible: Called when a tool operation stops.

#### Returns

`void`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doStop`](/en/reference/api/graphojs/classes/tool/#dostop)

***

### findPartAt()

> **findPartAt**(`x`, `y`): [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [tool/Tool.ts:110](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L110)

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

Defined in: [tool/Tool.ts:116](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L116)

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

### getRotationHandlePoint()

> **getRotationHandlePoint**(`node`): `object`

Defined in: [tool/RotatingTool.ts:29](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RotatingTool.ts#L29)

Find the rotation handle's actual screen (diagram-space) position for a
node — above its top-center, then rotated around the node's center by
its current angle, matching how the renderer draws the handle.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### isOnRotationHandle()

> **isOnRotationHandle**(`node`, `point`): `boolean`

Defined in: [tool/RotatingTool.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RotatingTool.ts#L46)

Check if a point is on the rotation handle of a node.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

##### point

###### x

`number`

###### y

`number`

#### Returns

`boolean`
