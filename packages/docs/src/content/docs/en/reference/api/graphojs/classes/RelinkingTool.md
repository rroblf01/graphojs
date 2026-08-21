---
editUrl: false
next: false
prev: false
title: "RelinkingTool"
---

Defined in: [tool/RelinkingTool.ts:10](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RelinkingTool.ts#L10)

Tool for reconnecting existing links by dragging their endpoints.
Drag near the source or target end of a link to move it to a new node.

## Extends

- [`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/)

## Constructors

### Constructor

> **new RelinkingTool**(): `RelinkingTool`

#### Returns

`RelinkingTool`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`constructor`](/en/reference/api/graphojs/classes/linkingbasetool/#constructor)

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

### end

#### Get Signature

> **get** **end**(): `"from"` \| `"to"` \| `null`

Defined in: [tool/RelinkingTool.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RelinkingTool.ts#L25)

Which end of the link is being dragged.

##### Returns

`"from"` \| `"to"` \| `null`

***

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

Defined in: [tool/Tool.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L23)

Check if this tool is currently active.

##### Returns

`boolean`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`isActive`](/en/reference/api/graphojs/classes/linkingbasetool/#isactive)

***

### isDragging

#### Get Signature

> **get** **isDragging**(): `boolean`

Defined in: [tool/LinkingBaseTool.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/LinkingBaseTool.ts#L20)

Whether a linking drag is in progress.

##### Returns

`boolean`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`isDragging`](/en/reference/api/graphojs/classes/linkingbasetool/#isdragging)

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

### isRelinking

#### Get Signature

> **get** **isRelinking**(): `boolean`

Defined in: [tool/RelinkingTool.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RelinkingTool.ts#L15)

Whether a relinking drag is in progress.

##### Returns

`boolean`

***

### isValidLink

#### Get Signature

> **get** **isValidLink**(): `boolean`

Defined in: [tool/LinkingBaseTool.ts:44](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/LinkingBaseTool.ts#L44)

Whether the current link being created is valid.

##### Returns

`boolean`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`isValidLink`](/en/reference/api/graphojs/classes/linkingbasetool/#isvalidlink)

***

### link

#### Get Signature

> **get** **link**(): [`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

Defined in: [tool/RelinkingTool.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RelinkingTool.ts#L20)

The link being relinked.

##### Returns

[`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

***

### preventCycles

#### Get Signature

> **get** **preventCycles**(): `boolean`

Defined in: [tool/LinkingBaseTool.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/LinkingBaseTool.ts#L35)

Whether cycle creation is prevented.

##### Returns

`boolean`

#### Set Signature

> **set** **preventCycles**(`value`): `void`

Defined in: [tool/LinkingBaseTool.ts:39](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/LinkingBaseTool.ts#L39)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`preventCycles`](/en/reference/api/graphojs/classes/linkingbasetool/#preventcycles)

***

### sourceNode

#### Get Signature

> **get** **sourceNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [tool/LinkingBaseTool.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/LinkingBaseTool.ts#L25)

The source node of the link being created/modified.

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`sourceNode`](/en/reference/api/graphojs/classes/linkingbasetool/#sourcenode)

***

### targetNode

#### Get Signature

> **get** **targetNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [tool/LinkingBaseTool.ts:30](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/LinkingBaseTool.ts#L30)

The current target node under the cursor, or null.

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`targetNode`](/en/reference/api/graphojs/classes/linkingbasetool/#targetnode)

## Methods

### canStart()

> **canStart**(`_toolName`, `e`): `boolean`

Defined in: [tool/RelinkingTool.ts:30](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RelinkingTool.ts#L30)

GoJS-compatible: start reconnecting a link when pressing near its endpoint.

#### Parameters

##### \_toolName

`string`

##### e

`MouseEvent`

#### Returns

`boolean`

#### Overrides

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`canStart`](/en/reference/api/graphojs/classes/linkingbasetool/#canstart)

***

### doActivate()

> **doActivate**(): `void`

Defined in: [tool/Tool.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L38)

Called when the tool becomes the active tool.

#### Returns

`void`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doActivate`](/en/reference/api/graphojs/classes/linkingbasetool/#doactivate)

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

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doClick`](/en/reference/api/graphojs/classes/linkingbasetool/#doclick)

***

### doDeactivate()

> **doDeactivate**(): `void`

Defined in: [tool/Tool.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L43)

Called when the tool is deactivated.

#### Returns

`void`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doDeactivate`](/en/reference/api/graphojs/classes/linkingbasetool/#dodeactivate)

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

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doDoubleClick`](/en/reference/api/graphojs/classes/linkingbasetool/#dodoubleclick)

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

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doKeyDown`](/en/reference/api/graphojs/classes/linkingbasetool/#dokeydown)

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

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doKeyUp`](/en/reference/api/graphojs/classes/linkingbasetool/#dokeyup)

***

### doMouseDown()

> **doMouseDown**(`e`): `void`

Defined in: [tool/RelinkingTool.ts:52](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RelinkingTool.ts#L52)

Called when a mouse down event occurs.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

#### Overrides

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doMouseDown`](/en/reference/api/graphojs/classes/linkingbasetool/#domousedown)

***

### doMouseMove()

> **doMouseMove**(`e`): `void`

Defined in: [tool/RelinkingTool.ts:81](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RelinkingTool.ts#L81)

Called when a mouse move event occurs.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

#### Overrides

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doMouseMove`](/en/reference/api/graphojs/classes/linkingbasetool/#domousemove)

***

### doMouseUp()

> **doMouseUp**(`e`): `void`

Defined in: [tool/RelinkingTool.ts:90](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RelinkingTool.ts#L90)

Called when a mouse up event occurs.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

#### Overrides

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doMouseUp`](/en/reference/api/graphojs/classes/linkingbasetool/#domouseup)

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

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doMouseWheel`](/en/reference/api/graphojs/classes/linkingbasetool/#domousewheel)

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

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doStart`](/en/reference/api/graphojs/classes/linkingbasetool/#dostart)

***

### doStop()

> **doStop**(): `void`

Defined in: [tool/Tool.ts:97](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/Tool.ts#L97)

GoJS-compatible: Called when a tool operation stops.

#### Returns

`void`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`doStop`](/en/reference/api/graphojs/classes/linkingbasetool/#dostop)

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

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`findPartAt`](/en/reference/api/graphojs/classes/linkingbasetool/#findpartat)

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

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`getDiagramPoint`](/en/reference/api/graphojs/classes/linkingbasetool/#getdiagrampoint)

***

### reconnectLink()

> **reconnectLink**(`link`, `newEnd`): `boolean`

Defined in: [tool/RelinkingTool.ts:110](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/RelinkingTool.ts#L110)

Reconnect the link's endpoint to a new node.

#### Parameters

##### link

[`Link`](/en/reference/api/graphojs/classes/link/)

##### newEnd

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`boolean`

***

### wouldCreateCycle()

> **wouldCreateCycle**(`from`, `to`, `model`): `boolean`

Defined in: [tool/LinkingBaseTool.ts:77](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/LinkingBaseTool.ts#L77)

Check whether adding a link from `from` to `to` would create a cycle.

#### Parameters

##### from

`string` \| `number`

##### to

`string` \| `number`

##### model

###### getLinksFrom

(`key`) => readonly `object`[]

#### Returns

`boolean`

#### Inherited from

[`LinkingBaseTool`](/en/reference/api/graphojs/classes/linkingbasetool/).[`wouldCreateCycle`](/en/reference/api/graphojs/classes/linkingbasetool/#wouldcreatecycle)
