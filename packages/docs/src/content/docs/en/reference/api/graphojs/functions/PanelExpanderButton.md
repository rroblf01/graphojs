---
editUrl: false
next: false
prev: false
title: "PanelExpanderButton"
---

> **PanelExpanderButton**(`panelName`, `options?`): [`Panel`](/en/reference/api/graphojs/classes/panel/)

Defined in: [panel/Buttons.ts:77](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Buttons.ts#L77)

GoJS-compatible: a small square button ("−" when shown, "+" when hidden)
that toggles the `.visible` of a named GraphObject elsewhere in the same
Part's visual tree (found via `Part.findObject(panelName)`) — e.g. to
show/hide a "details" panel within a node template.

## Parameters

### panelName

`string`

### options?

[`ExpanderButtonOptions`](/en/reference/api/graphojs/interfaces/expanderbuttonoptions/) = `{}`

## Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/)
