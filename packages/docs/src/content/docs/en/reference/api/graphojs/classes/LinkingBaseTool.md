---
editUrl: false
next: false
prev: false
title: "LinkingBaseTool"
---

Defined in: [tool/LinkingBaseTool.ts:9](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/LinkingBaseTool.ts#L9)

Base class for linking tools (LinkingTool and RelinkingTool).
Contains shared logic for link creation, validation, and cycle prevention.

## Extends

- [`Tool`](/en/reference/api/graphojs/classes/tool/)

## Extended by

- [`LinkingTool`](/en/reference/api/graphojs/classes/linkingtool/)
- [`RelinkingTool`](/en/reference/api/graphojs/classes/relinkingtool/)

## Constructors

### Constructor

> **new LinkingBaseTool**(): `LinkingBaseTool`

#### Returns

`LinkingBaseTool`

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

### isDragging

#### Get Signature

> **get** **isDragging**(): `boolean`

Defined in: [tool/LinkingBaseTool.ts:20](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/LinkingBaseTool.ts#L20)

Whether a linking drag is in progress.

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

#### Inherited from

[`ZoomingTool`](/en/reference/api/graphojs/classes/zoomingtool/).[`isEnabled`](/en/reference/api/graphojs/classes/zoomingtool/#isenabled)

***

### isValidLink

#### Get Signature

> **get** **isValidLink**(): `boolean`

Defined in: [tool/LinkingBaseTool.ts:44](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/LinkingBaseTool.ts#L44)

Whether the current link being created is valid.

##### Returns

`boolean`

***

### preventCycles

#### Get Signature

> **get** **preventCycles**(): `boolean`

Defined in: [tool/LinkingBaseTool.ts:35](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/LinkingBaseTool.ts#L35)

Whether cycle creation is prevented.

##### Returns

`boolean`

#### Set Signature

> **set** **preventCycles**(`value`): `void`

Defined in: [tool/LinkingBaseTool.ts:39](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/LinkingBaseTool.ts#L39)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### sourceNode

#### Get Signature

> **get** **sourceNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [tool/LinkingBaseTool.ts:25](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/LinkingBaseTool.ts#L25)

The source node of the link being created/modified.

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### targetNode

#### Get Signature

> **get** **targetNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [tool/LinkingBaseTool.ts:30](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/LinkingBaseTool.ts#L30)

The current target node under the cursor, or null.

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

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

#### Inherited from

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

> **doMouseDown**(`_e`): `void`

Defined in: [tool/Tool.ts:48](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/Tool.ts#L48)

Called when a mouse down event occurs.

#### Parameters

##### \_e

`MouseEvent`

#### Returns

`void`

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doMouseDown`](/en/reference/api/graphojs/classes/tool/#domousedown)

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

#### Inherited from

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doMouseMove`](/en/reference/api/graphojs/classes/tool/#domousemove)

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

#### Inherited from

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

### wouldCreateCycle()

> **wouldCreateCycle**(`from`, `to`, `model`): `boolean`

Defined in: [tool/LinkingBaseTool.ts:77](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/LinkingBaseTool.ts#L77)

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
