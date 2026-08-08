---
editUrl: false
next: false
prev: false
title: "TextEditingTool"
---

Defined in: [tool/TextEditingTool.ts:12](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L12)

Tool for editing text in place (GoJS-compatible).
Double-clicking a node with an `editable` TextBlock in its visual tree
shows an HTML input overlay for editing that TextBlock's text.

## Extends

- [`Tool`](/en/reference/api/graphojs/classes/tool/)

## Constructors

### Constructor

> **new TextEditingTool**(): `TextEditingTool`

#### Returns

`TextEditingTool`

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

### editingNode

#### Get Signature

> **get** **editingNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [tool/TextEditingTool.ts:24](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L24)

Get the node currently being edited.

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### editingTextBlock

#### Get Signature

> **get** **editingTextBlock**(): [`TextBlock`](/en/reference/api/graphojs/classes/textblock/) \| `null`

Defined in: [tool/TextEditingTool.ts:29](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L29)

Get the TextBlock currently being edited, or null.

##### Returns

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/) \| `null`

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

### isEditing

#### Get Signature

> **get** **isEditing**(): `boolean`

Defined in: [tool/TextEditingTool.ts:19](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L19)

Whether text editing is currently active.

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

### textBlock

#### Get Signature

> **get** **textBlock**(): [`TextBlock`](/en/reference/api/graphojs/classes/textblock/) \| `null`

Defined in: [tool/TextEditingTool.ts:34](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L34)

GoJS-compatible: The TextBlock currently being edited, or null.

##### Returns

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/) \| `null`

## Methods

### cancelEditing()

> **cancelEditing**(): `void`

Defined in: [tool/TextEditingTool.ts:148](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L148)

Cancel editing without committing.

#### Returns

`void`

***

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

Defined in: [tool/TextEditingTool.ts:231](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L231)

Called when the tool is deactivated.

#### Returns

`void`

#### Overrides

[`Tool`](/en/reference/api/graphojs/classes/tool/).[`doDeactivate`](/en/reference/api/graphojs/classes/tool/#dodeactivate)

***

### doDoubleClick()

> **doDoubleClick**(`e`): `void`

Defined in: [tool/TextEditingTool.ts:222](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L222)

Begin editing the node under the cursor on double-click.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

#### Overrides

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

### editNode()

> **editNode**(`node`): `void`

Defined in: [tool/TextEditingTool.ts:59](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L59)

Start editing the text of a node (its editable TextBlock or its label).

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`void`

***

### findEditableTextBlock()

> **findEditableTextBlock**(`node`): [`TextBlock`](/en/reference/api/graphojs/classes/textblock/) \| `null`

Defined in: [tool/TextEditingTool.ts:39](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L39)

Find the first editable TextBlock in a node's visual tree.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/) \| `null`

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

### stopEditing()

> **stopEditing**(`commit?`): `void`

Defined in: [tool/TextEditingTool.ts:80](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/TextEditingTool.ts#L80)

Stop editing and commit the current value.

#### Parameters

##### commit?

`boolean` = `true`

#### Returns

`void`
