---
editUrl: false
next: false
prev: false
title: "createDefaultLayers"
---

> **createDefaultLayers**(): [`Layer`](/en/reference/api/graphojs/classes/layer/)[]

Defined in: [layer/Layer.ts:141](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layer/Layer.ts#L141)

Create the standard set of layers, in the same relative stacking order
real GoJS uses. Only `Grid`/`Background`/`Default`/`Foreground` are
currently drawn into by the renderer; `ViewportBackground`/
`ViewportForeground`/`Adornment`/`Tool` exist so `diagram.findLayer(...)`/
`part.layerName = ...` round-trip the same names as real GoJS, even
though adornments and tool handles aren't yet routed through them (they
render as a separate overlay pass today).

## Returns

[`Layer`](/en/reference/api/graphojs/classes/layer/)[]
