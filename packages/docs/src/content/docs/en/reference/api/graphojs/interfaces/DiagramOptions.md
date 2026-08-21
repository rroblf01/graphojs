---
editUrl: false
next: false
prev: false
title: "DiagramOptions"
---

Defined in: [diagram/Diagram.ts:72](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L72)

## Properties

### accessibilityMessages?

> `optional` **accessibilityMessages?**: `Partial`\<[`AccessibilityMessages`](/en/reference/api/graphojs/interfaces/accessibilitymessages/)\>

Defined in: [diagram/Diagram.ts:130](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L130)

Accessibility message formatters (aria-label, live-region
announcements). Defaults to English; override to localize. See
[AccessibilityMessages](/en/reference/api/graphojs/interfaces/accessibilitymessages/).

***

### allowCopy?

> `optional` **allowCopy?**: `boolean`

Defined in: [diagram/Diagram.ts:108](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L108)

GoJS-compatible: Whether parts can be copied. Default: true

***

### allowDelete?

> `optional` **allowDelete?**: `boolean`

Defined in: [diagram/Diagram.ts:110](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L110)

GoJS-compatible: Whether parts can be deleted. Default: true

***

### allowDrop?

> `optional` **allowDrop?**: `boolean`

Defined in: [diagram/Diagram.ts:112](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L112)

GoJS-compatible: Whether parts can be dropped. Default: true

***

### allowHorizontalScroll?

> `optional` **allowHorizontalScroll?**: `boolean`

Defined in: [diagram/Diagram.ts:116](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L116)

GoJS-compatible: Whether horizontal scrolling is allowed. Default: true

***

### allowMove?

> `optional` **allowMove?**: `boolean`

Defined in: [diagram/Diagram.ts:106](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L106)

GoJS-compatible: Whether parts can be moved. Default: true

***

### allowVerticalScroll?

> `optional` **allowVerticalScroll?**: `boolean`

Defined in: [diagram/Diagram.ts:118](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L118)

GoJS-compatible: Whether vertical scrolling is allowed. Default: true

***

### allowZoom?

> `optional` **allowZoom?**: `boolean`

Defined in: [diagram/Diagram.ts:114](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L114)

GoJS-compatible: Whether zooming is allowed. Default: true

***

### backgroundColor?

> `optional` **backgroundColor?**: `string`

Defined in: [diagram/Diagram.ts:100](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L100)

Background color. Default: '#ffffff'

***

### div?

> `optional` **div?**: `HTMLDivElement` \| `null`

Defined in: [diagram/Diagram.ts:81](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L81)

The container element for the diagram. Optional — a `Diagram`
constructed without one starts detached (matching `div = null`);
assign `.div` afterward to attach it. Lets frameworks that build the
`Diagram` before a host element exists yet (e.g. a `gojs-react`-style
`initDiagram: () => Diagram` factory, called before the ref's element
mounts) construct it up front and attach it once the element is ready.

***

### gridSize?

> `optional` **gridSize?**: `number`

Defined in: [diagram/Diagram.ts:89](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L89)

Grid size in pixels. Default: 20

***

### initialContentAlignment?

> `optional` **initialContentAlignment?**: [`Spot`](/en/reference/api/graphojs/classes/spot/)

Defined in: [diagram/Diagram.ts:122](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L122)

GoJS-compatible: Initial content alignment spot.

***

### initialContentAlignmentOffset?

> `optional` **initialContentAlignmentOffset?**: `object`

Defined in: [diagram/Diagram.ts:124](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L124)

GoJS-compatible: Content alignment offset.

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### initialScale?

> `optional` **initialScale?**: `number`

Defined in: [diagram/Diagram.ts:83](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L83)

Initial scale. Default: 1

***

### isEnabled?

> `optional` **isEnabled?**: `boolean`

Defined in: [diagram/Diagram.ts:104](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L104)

GoJS-compatible: Whether the diagram is enabled. Default: true

***

### isReadOnly?

> `optional` **isReadOnly?**: `boolean`

Defined in: [diagram/Diagram.ts:102](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L102)

GoJS-compatible: Whether the diagram can be modified. Default: true

***

### maxScale?

> `optional` **maxScale?**: `number`

Defined in: [diagram/Diagram.ts:87](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L87)

Maximum scale for zoom. Default: 10

***

### minScale?

> `optional` **minScale?**: `number`

Defined in: [diagram/Diagram.ts:85](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L85)

Minimum scale for zoom. Default: 0.1

***

### scrollMode?

> `optional` **scrollMode?**: `"document"` \| `"infinite"`

Defined in: [diagram/Diagram.ts:120](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L120)

GoJS-compatible: Scroll mode: 'document' or 'infinite'. Default: 'document'

***

### selectionStyle?

> `optional` **selectionStyle?**: `Partial`\<[`SelectionStyle`](/en/reference/api/graphojs/interfaces/selectionstyle/)\>

Defined in: [diagram/Diagram.ts:137](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L137)

Colors used for selection highlights and the keyboard focus cursor.
Defaults to a high-contrast palette when the OS requests
`prefers-contrast: more` or `forced-colors: active`, otherwise to
[defaultSelectionStyle](/en/reference/api/graphojs/variables/defaultselectionstyle/). Override any subset to customize.

***

### showGrid?

> `optional` **showGrid?**: `boolean`

Defined in: [diagram/Diagram.ts:96](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L96)

Show grid background. Default: false, matching real GoJS — its own
`Diagram.grid` Panel exists by default but starts `visible: false`;
you opt in explicitly (`myDiagram.grid.visible = true`, or here,
`showGrid: true`).

***

### snapToGrid?

> `optional` **snapToGrid?**: `boolean`

Defined in: [diagram/Diagram.ts:98](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L98)

Snap parts to the grid when moving. Default: false
