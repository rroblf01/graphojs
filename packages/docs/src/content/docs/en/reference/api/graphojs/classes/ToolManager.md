---
editUrl: false
next: false
prev: false
title: "ToolManager"
---

Defined in: [tool/ToolManager.ts:9](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L9)

Manages interaction tools for a diagram.
Supports GoJS-style multi-tool lists with canStart() auto-selection.

## Constructors

### Constructor

> **new ToolManager**(`diagram`): `ToolManager`

Defined in: [tool/ToolManager.ts:25](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L25)

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`ToolManager`

## Accessors

### currentTool

#### Get Signature

> **get** **currentTool**(): [`Tool`](/en/reference/api/graphojs/classes/tool/) \| `null`

Defined in: [tool/ToolManager.ts:68](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L68)

GoJS-compatible: The currently active tool (or null).

##### Returns

[`Tool`](/en/reference/api/graphojs/classes/tool/) \| `null`

***

### draggingTool

#### Get Signature

> **get** **draggingTool**(): [`DraggingTool`](/en/reference/api/graphojs/classes/draggingtool/) \| `undefined`

Defined in: [tool/ToolManager.ts:73](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L73)

GoJS-compatible: The registered dragging tool, for configuring guided dragging.

##### Returns

[`DraggingTool`](/en/reference/api/graphojs/classes/draggingtool/) \| `undefined`

***

### mouseDownTools

#### Get Signature

> **get** **mouseDownTools**(): readonly [`Tool`](/en/reference/api/graphojs/classes/tool/)[]

Defined in: [tool/ToolManager.ts:78](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L78)

GoJS-compatible: The tool list consulted on mouse-down events.

##### Returns

readonly [`Tool`](/en/reference/api/graphojs/classes/tool/)[]

***

### mouseMoveTools

#### Get Signature

> **get** **mouseMoveTools**(): readonly [`Tool`](/en/reference/api/graphojs/classes/tool/)[]

Defined in: [tool/ToolManager.ts:83](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L83)

GoJS-compatible: The tool list consulted on mouse-move events.

##### Returns

readonly [`Tool`](/en/reference/api/graphojs/classes/tool/)[]

***

### mouseUpTools

#### Get Signature

> **get** **mouseUpTools**(): readonly [`Tool`](/en/reference/api/graphojs/classes/tool/)[]

Defined in: [tool/ToolManager.ts:88](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L88)

GoJS-compatible: The tool list consulted on mouse-up events.

##### Returns

readonly [`Tool`](/en/reference/api/graphojs/classes/tool/)[]

## Methods

### activateTool()

> **activateTool**(`name`): `boolean`

Defined in: [tool/ToolManager.ts:186](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L186)

Activate a tool by name.

#### Parameters

##### name

`string`

#### Returns

`boolean`

***

### addToolToList()

> **addToolToList**(`listName`, `tool`): `void`

Defined in: [tool/ToolManager.ts:93](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L93)

GoJS-compatible: Add a tool to a specific event list.

#### Parameters

##### listName

`"click"` \| `"wheel"` \| `"mouseDown"` \| `"mouseMove"` \| `"mouseUp"` \| `"doubleClick"` \| `"keyDown"` \| `"keyUp"`

##### tool

[`Tool`](/en/reference/api/graphojs/classes/tool/)

#### Returns

`void`

***

### deactivateTool()

> **deactivateTool**(): `void`

Defined in: [tool/ToolManager.ts:202](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L202)

Deactivate the current tool.

#### Returns

`void`

***

### getActiveTool()

> **getActiveTool**(): [`Tool`](/en/reference/api/graphojs/classes/tool/) \| `null`

Defined in: [tool/ToolManager.ts:212](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L212)

Get the currently active tool.

#### Returns

[`Tool`](/en/reference/api/graphojs/classes/tool/) \| `null`

***

### getActiveToolName()

> **getActiveToolName**(): `string` \| `null`

Defined in: [tool/ToolManager.ts:217](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L217)

Get the name of the currently active tool.

#### Returns

`string` \| `null`

***

### getTool()

> **getTool**(`name`): [`Tool`](/en/reference/api/graphojs/classes/tool/) \| `undefined`

Defined in: [tool/ToolManager.ts:53](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L53)

Get a tool by name.

#### Parameters

##### name

`string`

#### Returns

[`Tool`](/en/reference/api/graphojs/classes/tool/) \| `undefined`

***

### getToolList()

> **getToolList**(`listName`): readonly [`Tool`](/en/reference/api/graphojs/classes/tool/)[]

Defined in: [tool/ToolManager.ts:132](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L132)

Get a specific event tool list.

#### Parameters

##### listName

`"click"` \| `"wheel"` \| `"mouseDown"` \| `"mouseMove"` \| `"mouseUp"` \| `"doubleClick"` \| `"keyDown"` \| `"keyUp"`

#### Returns

readonly [`Tool`](/en/reference/api/graphojs/classes/tool/)[]

***

### getToolNames()

> **getToolNames**(): `string`[]

Defined in: [tool/ToolManager.ts:63](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L63)

Get all registered tool names.

#### Returns

`string`[]

***

### handleClick()

> **handleClick**(`e`): `void`

Defined in: [tool/ToolManager.ts:347](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L347)

Handle click event.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

***

### handleDoubleClick()

> **handleDoubleClick**(`e`): `void`

Defined in: [tool/ToolManager.ts:361](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L361)

Handle double click event.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

***

### handleKeyDown()

> **handleKeyDown**(`e`): `void`

Defined in: [tool/ToolManager.ts:319](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L319)

Handle key down event.

#### Parameters

##### e

`KeyboardEvent`

#### Returns

`void`

***

### handleKeyUp()

> **handleKeyUp**(`e`): `void`

Defined in: [tool/ToolManager.ts:333](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L333)

Handle key up event.

#### Parameters

##### e

`KeyboardEvent`

#### Returns

`void`

***

### handleMouseDown()

> **handleMouseDown**(`e`): `void`

Defined in: [tool/ToolManager.ts:234](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L234)

Handle mouse down event.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

***

### handleMouseMove()

> **handleMouseMove**(`e`): `void`

Defined in: [tool/ToolManager.ts:254](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L254)

Handle mouse move event.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

***

### handleMouseUp()

> **handleMouseUp**(`e`): `void`

Defined in: [tool/ToolManager.ts:275](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L275)

Handle mouse up event.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

***

### handleMouseWheel()

> **handleMouseWheel**(`e`): `void`

Defined in: [tool/ToolManager.ts:298](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L298)

Handle mouse wheel event.

#### Parameters

##### e

`WheelEvent`

#### Returns

`void`

***

### hasTool()

> **hasTool**(`name`): `boolean`

Defined in: [tool/ToolManager.ts:58](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L58)

Check if a tool is registered.

#### Parameters

##### name

`string`

#### Returns

`boolean`

***

### registerTool()

> **registerTool**(`name`, `tool`): `void`

Defined in: [tool/ToolManager.ts:30](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L30)

Register a tool with a name.

#### Parameters

##### name

`string`

##### tool

[`Tool`](/en/reference/api/graphojs/classes/tool/)

#### Returns

`void`

***

### removeToolFromList()

> **removeToolFromList**(`listName`, `tool`): `boolean`

Defined in: [tool/ToolManager.ts:112](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L112)

GoJS-compatible: Remove a tool from a specific event list.

#### Parameters

##### listName

`"click"` \| `"wheel"` \| `"mouseDown"` \| `"mouseMove"` \| `"mouseUp"` \| `"doubleClick"` \| `"keyDown"` \| `"keyUp"`

##### tool

[`Tool`](/en/reference/api/graphojs/classes/tool/)

#### Returns

`boolean`

***

### unregisterTool()

> **unregisterTool**(`name`): `boolean`

Defined in: [tool/ToolManager.ts:36](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/tool/ToolManager.ts#L36)

Unregister a tool by name.

#### Parameters

##### name

`string`

#### Returns

`boolean`
