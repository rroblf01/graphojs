---
editUrl: false
next: false
prev: false
title: "Shape"
---

Defined in: [panel/Shape.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L20)

A geometric shape element in a panel.

## Extends

- [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

## Constructors

### Constructor

> **new Shape**(`shape?`): `Shape`

Defined in: [panel/Shape.ts:83](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L83)

#### Parameters

##### shape?

`string`

#### Returns

`Shape`

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`constructor`](/en/reference/api/graphojs/classes/graphobject/#constructor)

## Properties

### actionCancel?

> `optional` **actionCancel?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:86](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L86)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`actionCancel`](/en/reference/api/graphojs/classes/graphobject/#actioncancel)

***

### actionDown?

> `optional` **actionDown?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:83](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L83)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`actionDown`](/en/reference/api/graphojs/classes/graphobject/#actiondown)

***

### actionMove?

> `optional` **actionMove?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:84](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L84)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`actionMove`](/en/reference/api/graphojs/classes/graphobject/#actionmove)

***

### actionUp?

> `optional` **actionUp?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:85](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L85)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`actionUp`](/en/reference/api/graphojs/classes/graphobject/#actionup)

***

### click?

> `optional` **click?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:68](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L68)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`click`](/en/reference/api/graphojs/classes/graphobject/#click)

***

### contextClick?

> `optional` **contextClick?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:70](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L70)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`contextClick`](/en/reference/api/graphojs/classes/graphobject/#contextclick)

***

### doubleClick?

> `optional` **doubleClick?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:69](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L69)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`doubleClick`](/en/reference/api/graphojs/classes/graphobject/#doubleclick)

***

### fromArrow

> **fromArrow**: `string` = `''`

Defined in: [panel/Shape.ts:116](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L116)

GoJS-compatible: Arrowhead figure at the end of a link (e.g. "Triangle", "OpenTriangle").

***

### isActionable

> **isActionable**: `boolean` = `false`

Defined in: [panel/GraphObject.ts:82](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L82)

GoJS-compatible: when true, `ActionTool` dispatches
`actionDown`/`actionMove`/`actionUp`/`actionCancel` on this object for
mouse-down-move-up gestures starting on it — for building controls
(buttons, sliders) that handle their own gesture without a new `Tool`.

#### Inherited from

[`Placeholder`](/en/reference/api/graphojs/classes/placeholder/).[`isActionable`](/en/reference/api/graphojs/classes/placeholder/#isactionable)

***

### isPanelMain

> **isPanelMain**: `boolean` = `false`

Defined in: [panel/Shape.ts:119](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L119)

GoJS-compatible: Whether to draw this shape even if it has no figure (used as link path).

***

### mouseEnter?

> `optional` **mouseEnter?**: (`e`, `obj`, `prev`) => `void`

Defined in: [panel/GraphObject.ts:71](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L71)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

##### prev

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`mouseEnter`](/en/reference/api/graphojs/classes/graphobject/#mouseenter)

***

### mouseLeave?

> `optional` **mouseLeave?**: (`e`, `obj`, `prev`) => `void`

Defined in: [panel/GraphObject.ts:72](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L72)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

##### prev

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`mouseLeave`](/en/reference/api/graphojs/classes/graphobject/#mouseleave)

***

### mouseOut?

> `optional` **mouseOut?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:74](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L74)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`mouseOut`](/en/reference/api/graphojs/classes/graphobject/#mouseout)

***

### mouseOver?

> `optional` **mouseOver?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:73](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L73)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`mouseOver`](/en/reference/api/graphojs/classes/graphobject/#mouseover)

***

### parentPanel

> **parentPanel**: [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null` = `null`

Defined in: [panel/GraphObject.ts:89](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L89)

The panel this object belongs to (set when added). Used for ofObject resolution.

#### Inherited from

[`Placeholder`](/en/reference/api/graphojs/classes/placeholder/).[`parentPanel`](/en/reference/api/graphojs/classes/placeholder/#parentpanel)

***

### portId

> **portId**: `string` = `''`

Defined in: [panel/GraphObject.ts:92](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L92)

GoJS-compatible: If non-empty, this object acts as a port on its part.

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`portId`](/en/reference/api/graphojs/classes/graphobject/#portid)

***

### toArrow

> **toArrow**: `string` = `''`

Defined in: [panel/Shape.ts:114](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L114)

GoJS-compatible: Arrowhead figure at the start of a link (e.g. "Triangle", "OpenTriangle").

***

### Arrow

> `readonly` `static` **Arrow**: `"arrow"` = `'arrow'`

Defined in: [panel/Shape.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L31)

***

### Card

> `readonly` `static` **Card**: `"card"` = `'card'`

Defined in: [panel/Shape.ts:44](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L44)

***

### Circle

> `readonly` `static` **Circle**: `"circle"` = `'circle'`

Defined in: [panel/Shape.ts:56](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L56)

***

### Cloud

> `readonly` `static` **Cloud**: `"cloud"` = `'cloud'`

Defined in: [panel/Shape.ts:32](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L32)

***

### Club

> `readonly` `static` **Club**: `"club"` = `'club'`

Defined in: [panel/Shape.ts:62](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L62)

***

### Cross

> `readonly` `static` **Cross**: `"cross"` = `'cross'`

Defined in: [panel/Shape.ts:30](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L30)

***

### Cylinder

> `readonly` `static` **Cylinder**: `"cylinder"` = `'cylinder'`

Defined in: [panel/Shape.ts:37](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L37)

***

### Database

> `readonly` `static` **Database**: `"database"` = `'database'`

Defined in: [panel/Shape.ts:69](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L69)

***

### Decision

> `readonly` `static` **Decision**: `"decision"` = `'decision'`

Defined in: [panel/Shape.ts:40](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L40)

***

### Delay

> `readonly` `static` **Delay**: `"delay"` = `'delay'`

Defined in: [panel/Shape.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L46)

***

### Diamond

> `readonly` `static` **Diamond**: `"diamond"` = `'diamond'`

Defined in: [panel/Shape.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L25)

***

### Display

> `readonly` `static` **Display**: `"display"` = `'display'`

Defined in: [panel/Shape.ts:45](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L45)

***

### Document

> `readonly` `static` **Document**: `"document"` = `'document'`

Defined in: [panel/Shape.ts:39](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L39)

***

### DoubleArrow

> `readonly` `static` **DoubleArrow**: `"doubleArrow"` = `'doubleArrow'`

Defined in: [panel/Shape.ts:57](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L57)

***

### DoubleChevron

> `readonly` `static` **DoubleChevron**: `"doubleChevron"` = `'doubleChevron'`

Defined in: [panel/Shape.ts:71](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L71)

***

### Ellipse

> `readonly` `static` **Ellipse**: `"ellipse"` = `'ellipse'`

Defined in: [panel/Shape.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L24)

***

### End

> `readonly` `static` **End**: `"end"` = `'end'`

Defined in: [panel/Shape.ts:42](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L42)

***

### Extract

> `readonly` `static` **Extract**: `"extract"` = `'extract'`

Defined in: [panel/Shape.ts:49](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L49)

***

### File

> `readonly` `static` **File**: `"file"` = `'file'`

Defined in: [panel/Shape.ts:65](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L65)

***

### Folder

> `readonly` `static` **Folder**: `"folder"` = `'folder'`

Defined in: [panel/Shape.ts:66](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L66)

***

### HalfCircle

> `readonly` `static` **HalfCircle**: `"halfCircle"` = `'halfCircle'`

Defined in: [panel/Shape.ts:72](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L72)

***

### Heart

> `readonly` `static` **Heart**: `"heart"` = `'heart'`

Defined in: [panel/Shape.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L36)

***

### Hexagon

> `readonly` `static` **Hexagon**: `"hexagon"` = `'hexagon'`

Defined in: [panel/Shape.ts:26](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L26)

***

### Io

> `readonly` `static` **Io**: `"io"` = `'io'`

Defined in: [panel/Shape.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L43)

***

### Kite

> `readonly` `static` **Kite**: `"kite"` = `'kite'`

Defined in: [panel/Shape.ts:61](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L61)

***

### Line

> `readonly` `static` **Line**: `"line"` = `'line'`

Defined in: [panel/Shape.ts:55](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L55)

***

### ManualOperation

> `readonly` `static` **ManualOperation**: `"manualOperation"` = `'manualOperation'`

Defined in: [panel/Shape.ts:47](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L47)

***

### Merge

> `readonly` `static` **Merge**: `"merge"` = `'merge'`

Defined in: [panel/Shape.ts:48](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L48)

***

### Minus

> `readonly` `static` **Minus**: `"minus"` = `'minus'`

Defined in: [panel/Shape.ts:54](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L54)

***

### Octagon

> `readonly` `static` **Octagon**: `"octagon"` = `'octagon'`

Defined in: [panel/Shape.ts:27](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L27)

***

### Or

> `readonly` `static` **Or**: `"or"` = `'or'`

Defined in: [panel/Shape.ts:50](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L50)

***

### Parallelogram

> `readonly` `static` **Parallelogram**: `"parallelogram"` = `'parallelogram'`

Defined in: [panel/Shape.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L33)

***

### Pentagon

> `readonly` `static` **Pentagon**: `"pentagon"` = `'pentagon'`

Defined in: [panel/Shape.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L35)

***

### Person

> `readonly` `static` **Person**: `"person"` = `'person'`

Defined in: [panel/Shape.ts:58](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L58)

***

### PiePiece

> `readonly` `static` **PiePiece**: `"piePiece"` = `'piePiece'`

Defined in: [panel/Shape.ts:64](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L64)

***

### Planner

> `readonly` `static` **Planner**: `"planner"` = `'planner'`

Defined in: [panel/Shape.ts:68](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L68)

***

### Plus

> `readonly` `static` **Plus**: `"plus"` = `'plus'`

Defined in: [panel/Shape.ts:53](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L53)

***

### Process

> `readonly` `static` **Process**: `"process"` = `'process'`

Defined in: [panel/Shape.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L38)

***

### Rectangle

> `readonly` `static` **Rectangle**: `"rect"` = `'rect'`

Defined in: [panel/Shape.ts:22](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L22)

***

### Rhombus

> `readonly` `static` **Rhombus**: `"rhombus"` = `'rhombus'`

Defined in: [panel/Shape.ts:60](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L60)

***

### RightTriangle

> `readonly` `static` **RightTriangle**: `"rightTriangle"` = `'rightTriangle'`

Defined in: [panel/Shape.ts:73](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L73)

***

### Ring

> `readonly` `static` **Ring**: `"ring"` = `'ring'`

Defined in: [panel/Shape.ts:59](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L59)

***

### RoundedRectangle

> `readonly` `static` **RoundedRectangle**: `"roundedRect"` = `'roundedRect'`

Defined in: [panel/Shape.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L23)

***

### Spade

> `readonly` `static` **Spade**: `"spade"` = `'spade'`

Defined in: [panel/Shape.ts:63](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L63)

***

### Star

> `readonly` `static` **Star**: `"star"` = `'star'`

Defined in: [panel/Shape.ts:28](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L28)

***

### Start

> `readonly` `static` **Start**: `"start"` = `'start'`

Defined in: [panel/Shape.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L41)

***

### Subroutine

> `readonly` `static` **Subroutine**: `"subroutine"` = `'subroutine'`

Defined in: [panel/Shape.ts:70](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L70)

***

### SummingJunction

> `readonly` `static` **SummingJunction**: `"summingJunction"` = `'summingJunction'`

Defined in: [panel/Shape.ts:51](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L51)

***

### TabbedRectangle

> `readonly` `static` **TabbedRectangle**: `"tabbedRectangle"` = `'tabbedRectangle'`

Defined in: [panel/Shape.ts:74](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L74)

***

### Terminator

> `readonly` `static` **Terminator**: `"terminator"` = `'terminator'`

Defined in: [panel/Shape.ts:67](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L67)

***

### Trapezoid

> `readonly` `static` **Trapezoid**: `"trapezoid"` = `'trapezoid'`

Defined in: [panel/Shape.ts:34](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L34)

***

### Triangle

> `readonly` `static` **Triangle**: `"triangle"` = `'triangle'`

Defined in: [panel/Shape.ts:29](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L29)

***

### X

> `readonly` `static` **X**: `"x"` = `'x'`

Defined in: [panel/Shape.ts:52](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L52)

## Accessors

### actualSize

#### Get Signature

> **get** **actualSize**(): [`Size`](/en/reference/api/graphojs/classes/size/)

Defined in: [panel/GraphObject.ts:479](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L479)

The actual size computed during layout.

##### Returns

[`Size`](/en/reference/api/graphojs/classes/size/)

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`actualSize`](/en/reference/api/graphojs/classes/graphobject/#actualsize)

***

### alignment

#### Get Signature

> **get** **alignment**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [panel/GraphObject.ts:489](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L489)

The alignment spot for Spot panels.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **alignment**(`value`): `void`

Defined in: [panel/GraphObject.ts:493](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L493)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

#### Inherited from

[`Placeholder`](/en/reference/api/graphojs/classes/placeholder/).[`alignment`](/en/reference/api/graphojs/classes/placeholder/#alignment)

***

### alignmentFocus

#### Get Signature

> **get** **alignmentFocus**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [panel/GraphObject.ts:551](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L551)

GoJS-compatible: The spot within this object used for alignment/placement.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **alignmentFocus**(`value`): `void`

Defined in: [panel/GraphObject.ts:555](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L555)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`alignmentFocus`](/en/reference/api/graphojs/classes/graphobject/#alignmentfocus)

***

### angle

#### Get Signature

> **get** **angle**(): `number`

Defined in: [panel/GraphObject.ts:414](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L414)

The rotation angle in degrees.

##### Returns

`number`

#### Set Signature

> **set** **angle**(`value`): `void`

Defined in: [panel/GraphObject.ts:418](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L418)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`angle`](/en/reference/api/graphojs/classes/graphobject/#angle)

***

### bindings

#### Get Signature

> **get** **bindings**(): readonly [`Binding`](/en/reference/api/graphojs/classes/binding/)[]

Defined in: [panel/GraphObject.ts:104](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L104)

GoJS-compatible: The bindings attached to this graph object.

##### Returns

readonly [`Binding`](/en/reference/api/graphojs/classes/binding/)[]

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`bindings`](/en/reference/api/graphojs/classes/textblock/#bindings)

***

### column

#### Get Signature

> **get** **column**(): `number`

Defined in: [panel/GraphObject.ts:522](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L522)

GoJS-compatible: The column index for table panels.

##### Returns

`number`

#### Set Signature

> **set** **column**(`value`): `void`

Defined in: [panel/GraphObject.ts:526](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L526)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`column`](/en/reference/api/graphojs/classes/textblock/#column)

***

### columnSpan

#### Get Signature

> **get** **columnSpan**(): `number`

Defined in: [panel/GraphObject.ts:540](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L540)

GoJS-compatible: The number of columns this object spans.

##### Returns

`number`

#### Set Signature

> **set** **columnSpan**(`value`): `void`

Defined in: [panel/GraphObject.ts:544](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L544)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`columnSpan`](/en/reference/api/graphojs/classes/textblock/#columnspan)

***

### copyable

#### Get Signature

> **get** **copyable**(): `boolean`

Defined in: [panel/GraphObject.ts:633](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L633)

GoJS-compatible: Whether this object is included when copying its part.

##### Returns

`boolean`

#### Set Signature

> **set** **copyable**(`value`): `void`

Defined in: [panel/GraphObject.ts:637](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L637)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`copyable`](/en/reference/api/graphojs/classes/graphobject/#copyable)

***

### cornerRadius

#### Get Signature

> **get** **cornerRadius**(): `number`

Defined in: [panel/Shape.ts:222](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L222)

##### Returns

`number`

#### Set Signature

> **set** **cornerRadius**(`value`): `void`

Defined in: [panel/Shape.ts:226](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L226)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### cursor

#### Get Signature

> **get** **cursor**(): `string`

Defined in: [panel/GraphObject.ts:423](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L423)

GoJS-compatible: The cursor displayed when hovering over this object.

##### Returns

`string`

#### Set Signature

> **set** **cursor**(`value`): `void`

Defined in: [panel/GraphObject.ts:427](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L427)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`Placeholder`](/en/reference/api/graphojs/classes/placeholder/).[`cursor`](/en/reference/api/graphojs/classes/placeholder/#cursor)

***

### desiredSize

#### Get Signature

> **get** **desiredSize**(): [`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

Defined in: [panel/GraphObject.ts:432](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L432)

The desired size. If null, natural size is used.

##### Returns

[`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

#### Set Signature

> **set** **desiredSize**(`value`): `void`

Defined in: [panel/GraphObject.ts:436](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L436)

##### Parameters

###### value

[`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

##### Returns

`void`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`desiredSize`](/en/reference/api/graphojs/classes/textblock/#desiredsize)

***

### figure

#### Get Signature

> **get** **figure**(): [`ShapeType`](/en/reference/api/graphojs/type-aliases/shapetype/)

Defined in: [panel/Shape.ts:97](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L97)

GoJS-compatible: Alias for `shape` (GoJS uses `figure`).

##### Returns

[`ShapeType`](/en/reference/api/graphojs/type-aliases/shapetype/)

#### Set Signature

> **set** **figure**(`value`): `void`

Defined in: [panel/Shape.ts:101](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L101)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### fill

#### Get Signature

> **get** **fill**(): [`BrushLike`](/en/reference/api/graphojs/type-aliases/brushlike/)

Defined in: [panel/Shape.ts:105](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L105)

##### Returns

[`BrushLike`](/en/reference/api/graphojs/type-aliases/brushlike/)

#### Set Signature

> **set** **fill**(`value`): `void`

Defined in: [panel/Shape.ts:109](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L109)

##### Parameters

###### value

[`BrushLike`](/en/reference/api/graphojs/type-aliases/brushlike/)

##### Returns

`void`

***

### fromGeometry

#### Get Signature

> **get** **fromGeometry**(): `unknown`

Defined in: [panel/Shape.ts:177](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L177)

GoJS-compatible: Get the geometry as a string (alias of geometryString).

##### Returns

`unknown`

#### Set Signature

> **set** **fromGeometry**(`value`): `void`

Defined in: [panel/Shape.ts:182](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L182)

GoJS-compatible: Set the geometry from a geometry string or object.

##### Parameters

###### value

`unknown`

##### Returns

`void`

***

### geometry

#### Get Signature

> **get** **geometry**(): [`Geometry`](/en/reference/api/graphojs/classes/geometry/) \| `null`

Defined in: [panel/Shape.ts:140](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L140)

GoJS-compatible: a programmatically-built [Geometry](/en/reference/api/graphojs/classes/geometry/) for this
shape's outline (an alternative to setting [geometryString](/en/reference/api/graphojs/classes/shape/#geometrystring)
directly). Serializes into `geometryString` under the hood via
`Geometry.stringify`, reusing the same rendering path.

##### Returns

[`Geometry`](/en/reference/api/graphojs/classes/geometry/) \| `null`

#### Set Signature

> **set** **geometry**(`value`): `void`

Defined in: [panel/Shape.ts:144](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L144)

##### Parameters

###### value

[`Geometry`](/en/reference/api/graphojs/classes/geometry/) \| `null`

##### Returns

`void`

***

### geometryString

#### Get Signature

> **get** **geometryString**(): `string`

Defined in: [panel/Shape.ts:124](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L124)

GoJS-compatible: An SVG path (geometry string) used as this shape's outline.

##### Returns

`string`

#### Set Signature

> **set** **geometryString**(`value`): `void`

Defined in: [panel/Shape.ts:128](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L128)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [panel/GraphObject.ts:460](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L460)

GoJS-compatible: the last explicitly-set desired height, or `NaN` if never set.

##### Returns

`number`

#### Set Signature

> **set** **height**(`value`): `void`

Defined in: [panel/GraphObject.ts:464](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L464)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Placeholder`](/en/reference/api/graphojs/classes/placeholder/).[`height`](/en/reference/api/graphojs/classes/placeholder/#height)

***

### interval

#### Get Signature

> **get** **interval**(): `number`

Defined in: [panel/Shape.ts:236](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L236)

GoJS-compatible: for a `"LineH"`/`"LineV"` `Shape` tiled by a `Panel
"Grid"`, how often this line is actually drawn — every Nth row/column
instead of every one. Only consulted by `Panel`'s Grid tiling; a
plain positive integer, defaulting to 1 (every line).

##### Returns

`number`

#### Set Signature

> **set** **interval**(`value`): `void`

Defined in: [panel/Shape.ts:240](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L240)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### isShadowed

#### Get Signature

> **get** **isShadowed**(): `boolean`

Defined in: [panel/GraphObject.ts:576](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L576)

GoJS-compatible: Whether this object casts a drop shadow.

##### Returns

`boolean`

#### Set Signature

> **set** **isShadowed**(`value`): `void`

Defined in: [panel/GraphObject.ts:580](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L580)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`isShadowed`](/en/reference/api/graphojs/classes/graphobject/#isshadowed)

***

### isVisibleObject

#### Get Signature

> **get** **isVisibleObject**(): `boolean`

Defined in: [panel/GraphObject.ts:379](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L379)

GoJS-compatible: Whether this object and all of its ancestors are visible.

##### Returns

`boolean`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`isVisibleObject`](/en/reference/api/graphojs/classes/graphobject/#isvisibleobject)

***

### margin

#### Get Signature

> **get** **margin**(): [`Margin`](/en/reference/api/graphojs/classes/margin/) \| `null`

Defined in: [panel/GraphObject.ts:498](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L498)

The margin around this object.

##### Returns

[`Margin`](/en/reference/api/graphojs/classes/margin/) \| `null`

#### Set Signature

> **set** **margin**(`value`): `void`

Defined in: [panel/GraphObject.ts:503](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L503)

GoJS-compatible: a plain number sets a uniform margin on all four sides.

##### Parameters

###### value

`number` \| [`Margin`](/en/reference/api/graphojs/classes/margin/) \| `null`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`margin`](/en/reference/api/graphojs/classes/graphobject/#margin)

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [panel/GraphObject.ts:95](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L95)

The name of this graph object, used for findObject() lookups.

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Defined in: [panel/GraphObject.ts:99](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L99)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`Placeholder`](/en/reference/api/graphojs/classes/placeholder/).[`name`](/en/reference/api/graphojs/classes/placeholder/#name)

***

### opacity

#### Get Signature

> **get** **opacity**(): `number`

Defined in: [panel/GraphObject.ts:405](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L405)

The opacity of this object (0-1).

##### Returns

`number`

#### Set Signature

> **set** **opacity**(`value`): `void`

Defined in: [panel/GraphObject.ts:409](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L409)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`opacity`](/en/reference/api/graphojs/classes/graphobject/#opacity)

***

### parent

#### Get Signature

> **get** **parent**(): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [panel/GraphObject.ts:389](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L389)

GoJS-compatible: The parent panel of this object (or null).

##### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`parent`](/en/reference/api/graphojs/classes/textblock/#parent)

***

### part

#### Get Signature

> **get** **part**(): [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [panel/GraphObject.ts:394](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L394)

GoJS-compatible: The Part that contains this object (or null).

##### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`part`](/en/reference/api/graphojs/classes/textblock/#part)

***

### pickable

#### Get Signature

> **get** **pickable**(): `boolean`

Defined in: [panel/GraphObject.ts:624](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L624)

GoJS-compatible: Whether this object can be hit-tested.

##### Returns

`boolean`

#### Set Signature

> **set** **pickable**(`value`): `void`

Defined in: [panel/GraphObject.ts:628](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L628)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`pickable`](/en/reference/api/graphojs/classes/graphobject/#pickable)

***

### position

#### Get Signature

> **get** **position**(): `object`

Defined in: [panel/GraphObject.ts:469](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L469)

The position within the parent panel.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`position`](/en/reference/api/graphojs/classes/graphobject/#position)

***

### row

#### Get Signature

> **get** **row**(): `number`

Defined in: [panel/GraphObject.ts:513](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L513)

GoJS-compatible: The row index for table panels.

##### Returns

`number`

#### Set Signature

> **set** **row**(`value`): `void`

Defined in: [panel/GraphObject.ts:517](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L517)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`row`](/en/reference/api/graphojs/classes/textblock/#row)

***

### rowSpan

#### Get Signature

> **get** **rowSpan**(): `number`

Defined in: [panel/GraphObject.ts:531](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L531)

GoJS-compatible: The number of rows this object spans.

##### Returns

`number`

#### Set Signature

> **set** **rowSpan**(`value`): `void`

Defined in: [panel/GraphObject.ts:535](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L535)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`rowSpan`](/en/reference/api/graphojs/classes/textblock/#rowspan)

***

### scale

#### Get Signature

> **get** **scale**(): `number`

Defined in: [panel/GraphObject.ts:562](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L562)

GoJS-compatible: The scale of this object relative to its normal size.

##### Returns

`number`

#### Set Signature

> **set** **scale**(`value`): `void`

Defined in: [panel/GraphObject.ts:566](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L566)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`scale`](/en/reference/api/graphojs/classes/graphobject/#scale)

***

### shadow

#### Get Signature

> **get** **shadow**(): `string`

Defined in: [panel/GraphObject.ts:612](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L612)

GoJS-compatible: Alias for shadowColor.

##### Returns

`string`

#### Set Signature

> **set** **shadow**(`value`): `void`

Defined in: [panel/GraphObject.ts:616](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L616)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`shadow`](/en/reference/api/graphojs/classes/graphobject/#shadow)

***

### shadowBlur

#### Get Signature

> **get** **shadowBlur**(): `number`

Defined in: [panel/GraphObject.ts:603](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L603)

GoJS-compatible: The drop shadow blur radius.

##### Returns

`number`

#### Set Signature

> **set** **shadowBlur**(`value`): `void`

Defined in: [panel/GraphObject.ts:607](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L607)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`shadowBlur`](/en/reference/api/graphojs/classes/graphobject/#shadowblur)

***

### shadowColor

#### Get Signature

> **get** **shadowColor**(): `string`

Defined in: [panel/GraphObject.ts:585](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L585)

GoJS-compatible: The drop shadow color.

##### Returns

`string`

#### Set Signature

> **set** **shadowColor**(`value`): `void`

Defined in: [panel/GraphObject.ts:589](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L589)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`shadowColor`](/en/reference/api/graphojs/classes/graphobject/#shadowcolor)

***

### shadowOffset

#### Get Signature

> **get** **shadowOffset**(): `object`

Defined in: [panel/GraphObject.ts:594](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L594)

GoJS-compatible: The drop shadow offset.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **shadowOffset**(`value`): `void`

Defined in: [panel/GraphObject.ts:598](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L598)

##### Parameters

###### value

###### x

`number`

###### y

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`shadowOffset`](/en/reference/api/graphojs/classes/graphobject/#shadowoffset)

***

### shape

#### Get Signature

> **get** **shape**(): [`ShapeType`](/en/reference/api/graphojs/type-aliases/shapetype/)

Defined in: [panel/Shape.ts:88](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L88)

##### Returns

[`ShapeType`](/en/reference/api/graphojs/type-aliases/shapetype/)

#### Set Signature

> **set** **shape**(`value`): `void`

Defined in: [panel/Shape.ts:92](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L92)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### stroke

#### Get Signature

> **get** **stroke**(): [`BrushLike`](/en/reference/api/graphojs/type-aliases/brushlike/)

Defined in: [panel/Shape.ts:149](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L149)

##### Returns

[`BrushLike`](/en/reference/api/graphojs/type-aliases/brushlike/)

#### Set Signature

> **set** **stroke**(`value`): `void`

Defined in: [panel/Shape.ts:153](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L153)

##### Parameters

###### value

[`BrushLike`](/en/reference/api/graphojs/type-aliases/brushlike/)

##### Returns

`void`

***

### strokeCap

#### Get Signature

> **get** **strokeCap**(): `"square"` \| `"butt"` \| `"round"`

Defined in: [panel/Shape.ts:205](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L205)

GoJS-compatible: The cap style for stroking the outline.

##### Returns

`"square"` \| `"butt"` \| `"round"`

#### Set Signature

> **set** **strokeCap**(`value`): `void`

Defined in: [panel/Shape.ts:209](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L209)

##### Parameters

###### value

`"square"` \| `"butt"` \| `"round"`

##### Returns

`void`

***

### strokeDashArray

#### Get Signature

> **get** **strokeDashArray**(): `number`[]

Defined in: [panel/Shape.ts:168](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L168)

GoJS-compatible: The dash pattern for stroking the outline.

##### Returns

`number`[]

#### Set Signature

> **set** **strokeDashArray**(`value`): `void`

Defined in: [panel/Shape.ts:172](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L172)

##### Parameters

###### value

`number`[]

##### Returns

`void`

***

### strokeJoin

#### Get Signature

> **get** **strokeJoin**(): `"round"` \| `"miter"` \| `"bevel"`

Defined in: [panel/Shape.ts:214](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L214)

GoJS-compatible: The join style for stroking the outline.

##### Returns

`"round"` \| `"miter"` \| `"bevel"`

#### Set Signature

> **set** **strokeJoin**(`value`): `void`

Defined in: [panel/Shape.ts:218](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L218)

##### Parameters

###### value

`"round"` \| `"miter"` \| `"bevel"`

##### Returns

`void`

***

### strokeWidth

#### Get Signature

> **get** **strokeWidth**(): `number`

Defined in: [panel/Shape.ts:157](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L157)

##### Returns

`number`

#### Set Signature

> **set** **strokeWidth**(`value`): `void`

Defined in: [panel/Shape.ts:161](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L161)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### toGeometry

#### Get Signature

> **get** **toGeometry**(): `unknown`

Defined in: [panel/Shape.ts:192](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L192)

GoJS-compatible: Get the geometry (alias of fromGeometry).

##### Returns

`unknown`

#### Set Signature

> **set** **toGeometry**(`value`): `void`

Defined in: [panel/Shape.ts:197](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L197)

GoJS-compatible: Set the geometry (alias of fromGeometry).

##### Parameters

###### value

`unknown`

##### Returns

`void`

***

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: [panel/GraphObject.ts:370](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L370)

Whether this object is visible.

##### Returns

`boolean`

#### Set Signature

> **set** **visible**(`value`): `void`

Defined in: [panel/GraphObject.ts:374](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L374)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Placeholder`](/en/reference/api/graphojs/classes/placeholder/).[`visible`](/en/reference/api/graphojs/classes/placeholder/#visible)

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [panel/GraphObject.ts:451](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L451)

GoJS-compatible: the last explicitly-set desired width, or `NaN` if
never set — NOT the object's current rendered size. Falling back to
`_actualSize` here (as this used to) makes every `measure()` override
(`Shape`/`TextBlock`/`Picture`/`Panel`, which all gate their real
measurement behind `this.width > 0`) permanently "lock onto" whatever
size an earlier — possibly premature, e.g. before a data binding
applied the real text — layout pass happened to produce, since that
stale actualSize then reads back as "an explicit width was set" on
every later pass and skips remeasuring for good.

##### Returns

`number`

#### Set Signature

> **set** **width**(`value`): `void`

Defined in: [panel/GraphObject.ts:455](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L455)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Placeholder`](/en/reference/api/graphojs/classes/placeholder/).[`width`](/en/reference/api/graphojs/classes/placeholder/#width)

## Methods

### addBinding()

> **addBinding**(`binding`): `this`

Defined in: [panel/GraphObject.ts:119](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L119)

Add a binding to this graph object (keeps existing bindings).

#### Parameters

##### binding

[`Binding`](/en/reference/api/graphojs/classes/binding/)

#### Returns

`this`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`addBinding`](/en/reference/api/graphojs/classes/graphobject/#addbinding)

***

### applyBindings()

> **applyBindings**(`nodeData`): `number`

Defined in: [panel/GraphObject.ts:185](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L185)

Apply all bindings from model data to this graph object.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`number`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`applyBindings`](/en/reference/api/graphojs/classes/graphobject/#applybindings)

***

### clone()

> **clone**(): `this`

Defined in: [panel/Shape.ts:269](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L269)

Deep copy of this shape.

#### Returns

`this`

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`clone`](/en/reference/api/graphojs/classes/graphobject/#clone)

***

### containsPoint()

> **containsPoint**(`px`, `py`): `boolean`

Defined in: [panel/GraphObject.ts:673](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L673)

Check if a point is inside this object's area (for hit testing).

#### Parameters

##### px

`number`

##### py

`number`

#### Returns

`boolean`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`containsPoint`](/en/reference/api/graphojs/classes/graphobject/#containspoint)

***

### draw()

> **draw**(`ctx`, `x`, `y`, `width`, `height`): `void`

Defined in: [panel/Shape.ts:307](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L307)

Draw this object at its computed position and size.

#### Parameters

##### ctx

`CanvasRenderingContext2D`

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

#### Returns

`void`

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`draw`](/en/reference/api/graphojs/classes/graphobject/#draw)

***

### getBounds()

> **getBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [panel/GraphObject.ts:683](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L683)

Get the bounds of this object within the panel coordinate space.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`getBounds`](/en/reference/api/graphojs/classes/graphobject/#getbounds)

***

### getGeometricBounds()

> **getGeometricBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [panel/Shape.ts:294](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L294)

GoJS-compatible: The bounds of this shape's geometry (at its current size).

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### getStrokeBounds()

> **getStrokeBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [panel/Shape.ts:301](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L301)

GoJS-compatible: The bounds of this shape's geometry inflated by the stroke width.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### measure()

> **measure**(): [`Size`](/en/reference/api/graphojs/classes/size/)

Defined in: [panel/Shape.ts:287](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L287)

Measure the natural size of this object.
Returns the size this object would like to occupy.

#### Returns

[`Size`](/en/reference/api/graphojs/classes/size/)

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`measure`](/en/reference/api/graphojs/classes/graphobject/#measure)

***

### measureWithMargin()

> **measureWithMargin**(): [`Size`](/en/reference/api/graphojs/classes/size/)

Defined in: [panel/GraphObject.ts:661](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L661)

Compute the effective size after applying margin.

#### Returns

[`Size`](/en/reference/api/graphojs/classes/size/)

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`measureWithMargin`](/en/reference/api/graphojs/classes/graphobject/#measurewithmargin)

***

### removeBinding()

> **removeBinding**(`targetProperty`): `boolean`

Defined in: [panel/GraphObject.ts:125](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L125)

Remove a binding by target property. Returns true if removed.

#### Parameters

##### targetProperty

`string`

#### Returns

`boolean`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`removeBinding`](/en/reference/api/graphojs/classes/graphobject/#removebinding)

***

### setActualSize()

> **setActualSize**(`width`, `height`): `void`

Defined in: [panel/GraphObject.ts:484](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L484)

Set the actual size during layout.

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`setActualSize`](/en/reference/api/graphojs/classes/graphobject/#setactualsize)

***

### setBinding()

> **setBinding**(`binding`): `this`

Defined in: [panel/GraphObject.ts:112](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L112)

GoJS-compatible: Set a binding on this graph object, replacing any
existing binding with the same target property.

#### Parameters

##### binding

[`Binding`](/en/reference/api/graphojs/classes/binding/)

#### Returns

`this`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`setBinding`](/en/reference/api/graphojs/classes/graphobject/#setbinding)

***

### setCornerRadius()

> **setCornerRadius**(`value`): `this`

Defined in: [panel/Shape.ts:263](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L263)

Fluent setter for corner radius.

#### Parameters

##### value

`number`

#### Returns

`this`

***

### setFill()

> **setFill**(`value`): `this`

Defined in: [panel/Shape.ts:245](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L245)

Fluent setter for fill.

#### Parameters

##### value

[`BrushLike`](/en/reference/api/graphojs/type-aliases/brushlike/)

#### Returns

`this`

***

### setPosition()

> **setPosition**(`x`, `y`): `void`

Defined in: [panel/GraphObject.ts:474](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L474)

Set the position within the parent panel.

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`setPosition`](/en/reference/api/graphojs/classes/graphobject/#setposition)

***

### setStroke()

> **setStroke**(`value`): `this`

Defined in: [panel/Shape.ts:251](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L251)

Fluent setter for stroke.

#### Parameters

##### value

[`BrushLike`](/en/reference/api/graphojs/type-aliases/brushlike/)

#### Returns

`this`

***

### setStrokeWidth()

> **setStrokeWidth**(`value`): `this`

Defined in: [panel/Shape.ts:257](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/Shape.ts#L257)

Fluent setter for stroke width.

#### Parameters

##### value

`number`

#### Returns

`this`

***

### theme()

> **theme**(`targetprop`, `sourceprop?`, `themeSource?`, `conv?`, `themeconv?`): `this`

Defined in: [panel/GraphObject.ts:137](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L137)

GoJS-compatible: add a `ThemeBinding` from a literal Theme property
name to `targetprop`, e.g. `.theme("stroke", "text")` assigns `stroke`
to the current theme's `colors.text`.

#### Parameters

##### targetprop

`string`

##### sourceprop?

`string`

##### themeSource?

`string` \| `null`

##### conv?

(`value`, `data`) => `unknown`

##### themeconv?

(`value`, `target`) => `unknown`

#### Returns

`this`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`theme`](/en/reference/api/graphojs/classes/graphobject/#theme)

***

### themeData()

> **themeData**(`targetprop`, `sourceprop?`, `themeSource?`, `conv?`, `themeconv?`): `this`

Defined in: [panel/GraphObject.ts:153](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L153)

GoJS-compatible: add a `ThemeBinding` whose theme key comes from a
data property's value, e.g. `.themeData("fill", "state")` looks up
`data.state` and uses *that* as the `colors` key.

#### Parameters

##### targetprop

`string`

##### sourceprop?

`string`

##### themeSource?

`string` \| `null`

##### conv?

(`value`, `data`) => `unknown`

##### themeconv?

(`value`, `target`) => `unknown`

#### Returns

`this`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`themeData`](/en/reference/api/graphojs/classes/graphobject/#themedata)

***

### themeModel()

> **themeModel**(`targetprop`, `sourceprop?`, `themeSource?`, `conv?`, `themeconv?`): `this`

Defined in: [panel/GraphObject.ts:171](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L171)

GoJS-compatible: like `themeData`, but sourced from model-wide data.
graphojs has no `Model.modelData`, so this currently behaves exactly
like `themeData` (resolved against the part's own data instead).

#### Parameters

##### targetprop

`string`

##### sourceprop?

`string`

##### themeSource?

`string` \| `null`

##### conv?

(`value`, `data`) => `unknown`

##### themeconv?

(`value`, `target`) => `unknown`

#### Returns

`this`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`themeModel`](/en/reference/api/graphojs/classes/graphobject/#thememodel)

***

### make()

#### Call Signature

> `static` **make**(`builder`, ...`args`): [`Panel`](/en/reference/api/graphojs/classes/panel/)

Defined in: [panel/GraphObject.ts:203](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L203)

GoJS-compatible static factory method.

Usage:
  const $ = go.GraphObject.make;
  const shape = $(go.Shape, "RoundedRectangle", { fill: "white", stroke: "gray" });
  const panel = $(go.Panel, "Auto", shape, $(go.TextBlock, "Hello"));

##### Parameters

###### builder

`string`

###### args

...`unknown`[]

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/)

##### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`make`](/en/reference/api/graphojs/classes/graphobject/#make)

#### Call Signature

> `static` **make**(`ctor`, ...`args`): [`Panel`](/en/reference/api/graphojs/classes/panel/)

Defined in: [panel/GraphObject.ts:204](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L204)

GoJS-compatible static factory method.

Usage:
  const $ = go.GraphObject.make;
  const shape = $(go.Shape, "RoundedRectangle", { fill: "white", stroke: "gray" });
  const panel = $(go.Panel, "Auto", shape, $(go.TextBlock, "Hello"));

##### Parameters

###### ctor

*typeof* [`Node`](/en/reference/api/graphojs/classes/node/) \| *typeof* [`Link`](/en/reference/api/graphojs/classes/link/) \| *typeof* [`Group`](/en/reference/api/graphojs/classes/group/)

###### args

...`unknown`[]

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/)

##### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`make`](/en/reference/api/graphojs/classes/graphobject/#make)

#### Call Signature

> `static` **make**\<`T`\>(`ctor`, ...`args`): `T`

Defined in: [panel/GraphObject.ts:205](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/panel/GraphObject.ts#L205)

GoJS-compatible static factory method.

Usage:
  const $ = go.GraphObject.make;
  const shape = $(go.Shape, "RoundedRectangle", { fill: "white", stroke: "gray" });
  const panel = $(go.Panel, "Auto", shape, $(go.TextBlock, "Hello"));

##### Type Parameters

###### T

`T`

##### Parameters

###### ctor

(...`args`) => `T`

###### args

...`unknown`[]

##### Returns

`T`

##### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`make`](/en/reference/api/graphojs/classes/graphobject/#make)
