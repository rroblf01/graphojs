---
editUrl: false
next: false
prev: false
title: "CommandHandler"
---

Defined in: [command/CommandHandler.ts:22](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L22)

Handles high-level editing commands for a diagram.
Provides delete, copy, cut, paste, and select-all operations.

## Constructors

### Constructor

> **new CommandHandler**(`diagram`): `CommandHandler`

Defined in: [command/CommandHandler.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L31)

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`CommandHandler`

## Methods

### align()

> **align**(`alignment`): `boolean`

Defined in: [command/CommandHandler.ts:408](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L408)

Align selected nodes (needs at least 2). Returns true if aligned.

#### Parameters

##### alignment

[`AlignDirection`](/en/reference/api/graphojs/type-aliases/aligndirection/)

#### Returns

`boolean`

***

### bringToFront()

> **bringToFront**(): `boolean`

Defined in: [command/CommandHandler.ts:551](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L551)

Bring the selected parts to the front (highest z-order in their layer).

#### Returns

`boolean`

***

### canCopy()

> **canCopy**(): `boolean`

Defined in: [command/CommandHandler.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L41)

Whether copy/paste is available (there is something selected).

#### Returns

`boolean`

***

### canCopySelection()

> **canCopySelection**(): `boolean`

Defined in: [command/CommandHandler.ts:644](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L644)

#### Returns

`boolean`

***

### canCutSelection()

> **canCutSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:648](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L648)

#### Returns

`boolean`

***

### canDecreaseZoom()

> **canDecreaseZoom**(): `boolean`

Defined in: [command/CommandHandler.ts:783](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L783)

GoJS-compatible: Whether decreaseZoom is possible.

#### Returns

`boolean`

***

### canDeleteSelection()

> **canDeleteSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:640](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L640)

#### Returns

`boolean`

***

### canDuplicateSelection()

> **canDuplicateSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:758](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L758)

GoJS-compatible: Whether duplicateSelection is possible.

#### Returns

`boolean`

***

### canGroupSelection()

> **canGroupSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:666](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L666)

GoJS-compatible: Whether groupSelection is possible (>=1 selected node).

#### Returns

`boolean`

***

### canIncreaseZoom()

> **canIncreaseZoom**(): `boolean`

Defined in: [command/CommandHandler.ts:771](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L771)

GoJS-compatible: Whether increaseZoom is possible.

#### Returns

`boolean`

***

### canPaste()

> **canPaste**(): `boolean`

Defined in: [command/CommandHandler.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L46)

Whether there is content on the clipboard to paste.

#### Returns

`boolean`

***

### canPasteSelection()

> **canPasteSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:656](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L656)

#### Returns

`boolean`

***

### canSelectAll()

> **canSelectAll**(): `boolean`

Defined in: [command/CommandHandler.ts:652](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L652)

#### Returns

`boolean`

***

### canUngroupSelection()

> **canUngroupSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:725](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L725)

GoJS-compatible: Whether ungroupSelection is possible (>=1 selected group).

#### Returns

`boolean`

***

### canZoomToFit()

> **canZoomToFit**(): `boolean`

Defined in: [command/CommandHandler.ts:802](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L802)

GoJS-compatible: Whether the diagram can zoom to fit.

#### Returns

`boolean`

***

### clearClipboard()

> **clearClipboard**(): `void`

Defined in: [command/CommandHandler.ts:368](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L368)

Clear the clipboard.

#### Returns

`void`

***

### copySelection()

> **copySelection**(): `boolean`

Defined in: [command/CommandHandler.ts:175](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L175)

Copy the selected parts (and their connected links) to the clipboard.

#### Returns

`boolean`

***

### cutSelection()

> **cutSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:216](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L216)

Cut the selected parts (copy + delete).

#### Returns

`boolean`

***

### decreaseZoom()

> **decreaseZoom**(`factor?`): `boolean`

Defined in: [command/CommandHandler.ts:788](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L788)

GoJS-compatible: Zoom out by a factor.

#### Parameters

##### factor?

`number` = `1.25`

#### Returns

`boolean`

***

### deleteSelection()

> **deleteSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:56](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L56)

Delete the currently selected parts (undoable).

#### Returns

`boolean`

***

### deleteSelectionNoUndo()

> **deleteSelectionNoUndo**(): `boolean`

Defined in: [command/CommandHandler.ts:154](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L154)

Delete the selection without undo support. Returns true if any were removed.

#### Returns

`boolean`

***

### distributeHorizontally()

> **distributeHorizontally**(): `boolean`

Defined in: [command/CommandHandler.ts:485](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L485)

Distribute selected nodes evenly along the horizontal axis. Returns true if done.

#### Returns

`boolean`

***

### distributeVertically()

> **distributeVertically**(): `boolean`

Defined in: [command/CommandHandler.ts:518](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L518)

Distribute selected nodes evenly along the vertical axis. Returns true if done.

#### Returns

`boolean`

***

### duplicateSelection()

> **duplicateSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:763](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L763)

GoJS-compatible: Duplicate the selection at a small offset.

#### Returns

`boolean`

***

### getClipboard()

> **getClipboard**(): `object`

Defined in: [command/CommandHandler.ts:356](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L356)

Get the current clipboard contents.

#### Returns

`object`

##### links

> **links**: readonly [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

##### nodes

> **nodes**: readonly [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

***

### getDiagram()

> **getDiagram**(): [`Diagram`](/en/reference/api/graphojs/classes/diagram/)

Defined in: [command/CommandHandler.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L36)

Get the diagram this handler belongs to.

#### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

***

### groupSelection()

> **groupSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:671](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L671)

GoJS-compatible: Group the selected nodes into a new Group part.

#### Returns

`boolean`

***

### increaseZoom()

> **increaseZoom**(`factor?`): `boolean`

Defined in: [command/CommandHandler.ts:776](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L776)

GoJS-compatible: Zoom in by a factor.

#### Parameters

##### factor?

`number` = `1.25`

#### Returns

`boolean`

***

### lower()

> **lower**(): `boolean`

Defined in: [command/CommandHandler.ts:617](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L617)

Lower the selected parts by one z-order step.

#### Returns

`boolean`

***

### nudgeSelection()

> **nudgeSelection**(`dx`, `dy`, `scale?`): `boolean`

Defined in: [command/CommandHandler.ts:383](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L383)

GoJS-compatible: Nudge the selected parts by the given deltas (arrow keys).

#### Parameters

##### dx

`number`

##### dy

`number`

##### scale?

`number` = `1`

#### Returns

`boolean`

***

### pasteClipboard()

> **pasteClipboard**(`offset?`): `boolean`

Defined in: [command/CommandHandler.ts:223](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L223)

Paste the clipboard (nodes + links) into the diagram (undoable).

#### Parameters

##### offset?

`number` = `20`

#### Returns

`boolean`

***

### pasteClipboardAt()

> **pasteClipboardAt**(`x`, `y`): `boolean`

Defined in: [command/CommandHandler.ts:228](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L228)

Paste the clipboard so the first node lands at the given position.

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`boolean`

***

### pasteSelection()

> **pasteSelection**(`position?`): `boolean`

Defined in: [command/CommandHandler.ts:814](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L814)

GoJS-compatible: Paste the current clipboard at the given position, if any.

#### Parameters

##### position?

###### x

`number`

###### y

`number`

#### Returns

`boolean`

***

### raise()

> **raise**(): `boolean`

Defined in: [command/CommandHandler.ts:612](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L612)

Raise the selected parts by one z-order step.

#### Returns

`boolean`

***

### redo()

> **redo**(): `boolean`

Defined in: [command/CommandHandler.ts:351](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L351)

Redo the last operation.

#### Returns

`boolean`

***

### resetZoom()

> **resetZoom**(): `boolean`

Defined in: [command/CommandHandler.ts:795](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L795)

GoJS-compatible: Reset the zoom to 1.

#### Returns

`boolean`

***

### selectAll()

> **selectAll**(): `boolean`

Defined in: [command/CommandHandler.ts:321](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L321)

Select all parts in the diagram.

#### Returns

`boolean`

***

### selectAllInDiagram()

> **selectAllInDiagram**(): `boolean`

Defined in: [command/CommandHandler.ts:661](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L661)

GoJS-compatible: Select all parts in the diagram.

#### Returns

`boolean`

***

### sendToBack()

> **sendToBack**(): `boolean`

Defined in: [command/CommandHandler.ts:582](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L582)

Send the selected parts to the back (lowest z-order in their layer).

#### Returns

`boolean`

***

### setClipboard()

> **setClipboard**(`data`): `void`

Defined in: [command/CommandHandler.ts:361](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L361)

Set the clipboard contents.

#### Parameters

##### data

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[] \| \{ `links`: [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]; `nodes`: [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]; \}

#### Returns

`void`

***

### undo()

> **undo**(): `boolean`

Defined in: [command/CommandHandler.ts:346](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L346)

Undo the last operation.

#### Returns

`boolean`

***

### ungroupSelection()

> **ungroupSelection**(): `boolean`

Defined in: [command/CommandHandler.ts:730](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L730)

GoJS-compatible: Ungroup the selected groups, releasing their members.

#### Returns

`boolean`

***

### zoomToFit()

> **zoomToFit**(): `boolean`

Defined in: [command/CommandHandler.ts:807](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/command/CommandHandler.ts#L807)

GoJS-compatible: Zoom to fit the entire diagram in the viewport.

#### Returns

`boolean`
