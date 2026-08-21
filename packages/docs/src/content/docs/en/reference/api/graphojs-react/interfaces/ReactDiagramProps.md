---
editUrl: false
next: false
prev: false
title: "ReactDiagramProps"
---

Defined in: [react/index.tsx:248](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L248)

## Properties

### divClassName?

> `optional` **divClassName?**: `string`

Defined in: [react/index.tsx:279](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L279)

***

### initDiagram

> **initDiagram**: () => [`Diagram`](/en/reference/api/graphojs/classes/diagram/)

Defined in: [react/index.tsx:256](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L256)

Called once, on mount, to construct the `Diagram` (templates, tools,
listeners — whatever the app needs) *before* it has a div: `<ReactDiagram>`
attaches it afterward via `diagram.div =`. Matches `gojs-react`'s
`ReactDiagram` factory shape, so existing `initDiagram` functions port
by only changing the import.

#### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

***

### linkDataArray?

> `optional` **linkDataArray?**: [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

Defined in: [react/index.tsx:260](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L260)

GoJS-compatible: initial/updated link data.

***

### modelData?

> `optional` **modelData?**: `Record`\<`string`, `unknown`\>

Defined in: [react/index.tsx:266](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L266)

Accepted for `gojs-react` prop-shape compatibility, but inert:
graphojs's `Model` has no `modelData` (shared, model-wide data)
concept to apply it to.

***

### nodeDataArray?

> `optional` **nodeDataArray?**: [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

Defined in: [react/index.tsx:258](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L258)

GoJS-compatible: initial/updated node data.

***

### onModelChange?

> `optional` **onModelChange?**: (`event`) => `void`

Defined in: [react/index.tsx:278](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L278)

GoJS-compatible: called whenever the diagram's model changes.

#### Parameters

##### event

[`ChangedEvent`](/en/reference/api/graphojs/interfaces/changedevent/)

#### Returns

`void`

***

### skipsDiagramUpdate?

> `optional` **skipsDiagramUpdate?**: `boolean`

Defined in: [react/index.tsx:276](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L276)

When true, `nodeDataArray`/`linkDataArray` prop changes are NOT
synced to the model automatically — the app manages the model itself
(e.g. via transactions on the instance from `ref.getDiagram()`),
matching `gojs-react`'s advanced/incremental-update mode. When
false/omitted (the default), changing these props replaces
`diagram.model` with a freshly-built one — a full resync, not
`gojs-react`'s finer-grained incremental `IncrementalData` diff.

***

### style?

> `optional` **style?**: `CSSProperties`

Defined in: [react/index.tsx:280](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L280)
