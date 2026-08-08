---
editUrl: false
next: false
prev: false
title: "DiagramOptions"
---

Defined in: [diagram/Diagram.ts:65](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L65)

## Properties

### accessibilityMessages?

> `optional` **accessibilityMessages?**: `Partial`\<[`AccessibilityMessages`](/en/reference/api/graphojs/interfaces/accessibilitymessages/)\>

Defined in: [diagram/Diagram.ts:111](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L111)

Accessibility message formatters (aria-label, live-region
announcements). Defaults to English; override to localize. See
[AccessibilityMessages](/en/reference/api/graphojs/interfaces/accessibilitymessages/).

***

### allowCopy?

> `optional` **allowCopy?**: `boolean`

Defined in: [diagram/Diagram.ts:89](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L89)

GoJS-compatible: Whether parts can be copied. Default: true

***

### allowDelete?

> `optional` **allowDelete?**: `boolean`

Defined in: [diagram/Diagram.ts:91](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L91)

GoJS-compatible: Whether parts can be deleted. Default: true

***

### allowDrop?

> `optional` **allowDrop?**: `boolean`

Defined in: [diagram/Diagram.ts:93](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L93)

GoJS-compatible: Whether parts can be dropped. Default: true

***

### allowHorizontalScroll?

> `optional` **allowHorizontalScroll?**: `boolean`

Defined in: [diagram/Diagram.ts:97](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L97)

GoJS-compatible: Whether horizontal scrolling is allowed. Default: true

***

### allowMove?

> `optional` **allowMove?**: `boolean`

Defined in: [diagram/Diagram.ts:87](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L87)

GoJS-compatible: Whether parts can be moved. Default: true

***

### allowVerticalScroll?

> `optional` **allowVerticalScroll?**: `boolean`

Defined in: [diagram/Diagram.ts:99](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L99)

GoJS-compatible: Whether vertical scrolling is allowed. Default: true

***

### allowZoom?

> `optional` **allowZoom?**: `boolean`

Defined in: [diagram/Diagram.ts:95](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L95)

GoJS-compatible: Whether zooming is allowed. Default: true

***

### backgroundColor?

> `optional` **backgroundColor?**: `string`

Defined in: [diagram/Diagram.ts:81](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L81)

Background color. Default: '#ffffff'

***

### div

> **div**: `HTMLDivElement`

Defined in: [diagram/Diagram.ts:67](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L67)

The container element for the diagram.

***

### gridSize?

> `optional` **gridSize?**: `number`

Defined in: [diagram/Diagram.ts:75](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L75)

Grid size in pixels. Default: 20

***

### initialContentAlignment?

> `optional` **initialContentAlignment?**: [`Spot`](/en/reference/api/graphojs/classes/spot/)

Defined in: [diagram/Diagram.ts:103](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L103)

GoJS-compatible: Initial content alignment spot.

***

### initialContentAlignmentOffset?

> `optional` **initialContentAlignmentOffset?**: `object`

Defined in: [diagram/Diagram.ts:105](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L105)

GoJS-compatible: Content alignment offset.

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### initialScale?

> `optional` **initialScale?**: `number`

Defined in: [diagram/Diagram.ts:69](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L69)

Initial scale. Default: 1

***

### isEnabled?

> `optional` **isEnabled?**: `boolean`

Defined in: [diagram/Diagram.ts:85](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L85)

GoJS-compatible: Whether the diagram is enabled. Default: true

***

### isReadOnly?

> `optional` **isReadOnly?**: `boolean`

Defined in: [diagram/Diagram.ts:83](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L83)

GoJS-compatible: Whether the diagram can be modified. Default: true

***

### maxScale?

> `optional` **maxScale?**: `number`

Defined in: [diagram/Diagram.ts:73](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L73)

Maximum scale for zoom. Default: 10

***

### minScale?

> `optional` **minScale?**: `number`

Defined in: [diagram/Diagram.ts:71](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L71)

Minimum scale for zoom. Default: 0.1

***

### scrollMode?

> `optional` **scrollMode?**: `"document"` \| `"infinite"`

Defined in: [diagram/Diagram.ts:101](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L101)

GoJS-compatible: Scroll mode: 'document' or 'infinite'. Default: 'document'

***

### selectionStyle?

> `optional` **selectionStyle?**: `Partial`\<[`SelectionStyle`](/en/reference/api/graphojs/interfaces/selectionstyle/)\>

Defined in: [diagram/Diagram.ts:118](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L118)

Colors used for selection highlights and the keyboard focus cursor.
Defaults to a high-contrast palette when the OS requests
`prefers-contrast: more` or `forced-colors: active`, otherwise to
[defaultSelectionStyle](/en/reference/api/graphojs/variables/defaultselectionstyle/). Override any subset to customize.

***

### showGrid?

> `optional` **showGrid?**: `boolean`

Defined in: [diagram/Diagram.ts:77](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L77)

Show grid background. Default: true

***

### snapToGrid?

> `optional` **snapToGrid?**: `boolean`

Defined in: [diagram/Diagram.ts:79](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L79)

Snap parts to the grid when moving. Default: false
