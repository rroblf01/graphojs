---
editUrl: false
next: false
prev: false
title: "TreeExpanderButton"
---

> **TreeExpanderButton**(`options?`): [`Panel`](/en/reference/api/graphojs/classes/panel/)

Defined in: [panel/Buttons.ts:27](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Buttons.ts#L27)

GoJS-compatible: a small square button ("−" when expanded, "+" when
collapsed) that toggles the containing node's *tree* — its descendants per
`findTreeChildrenNodes()` — via `Diagram.collapseTree`/`expandTree`. Add it
to a node template near where a link to its tree children attaches.

This is distinct from a Group's `isSubGraphExpanded`/`collapseGroup`: it
works on any Node with tree-structured children, group or not.

## Parameters

### options?

[`ExpanderButtonOptions`](/en/reference/api/graphojs/interfaces/expanderbuttonoptions/) = `{}`

## Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/)
