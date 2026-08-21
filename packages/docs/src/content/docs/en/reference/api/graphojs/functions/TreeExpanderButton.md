---
editUrl: false
next: false
prev: false
title: "TreeExpanderButton"
---

> **TreeExpanderButton**(`options?`): [`Panel`](/en/reference/api/graphojs/classes/panel/)

Defined in: [panel/Buttons.ts:27](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Buttons.ts#L27)

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
