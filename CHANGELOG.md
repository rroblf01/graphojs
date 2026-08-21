# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.0] - 2026-08-21

Follow-up to 1.6.0, from a seventh round of the same migration report plus
two additional visual differences the reporter spotted directly in the
Gantt screenshot (an empty tooltip box, and dependency lines that render
differently from GoJS's). No breaking changes.

### Fixed

- **A `Part.toolTip`/`contextMenu` template's own `Binding`s never
  resolved — the box was drawn, but any bound text (or other property)
  stayed at its unbound default.** `showPartToolTip`/`showPartContextMenu`
  rendered the floating panel via `renderFloatingPanel(...)` without ever
  calling `template.applyBindings(part.data)` first, unlike every other
  part-bound Panel in the diagram (nodes/links are always synced through
  `applyBindings` before they're drawn). Reported as: hovering a Gantt bar
  showed the tooltip's chrome (background + border) but an empty box where
  `new go.Binding("text", "tip")` should have put the task's label.
- **`Link.corner` rounded orthogonal paths with a straight-segment
  chamfer instead of a real arc**, and a solid arrowhead's stroked line
  extended all the way to the tip underneath it (visible as a small round
  nub poking out of the triangle, from the line's `round` cap). Together
  these made a Gantt chart's dependency lines visibly different from
  GoJS's smooth quarter-circle elbows and clean triangular arrowheads —
  a difference the reporter could see directly in the screenshot
  comparison. `Canvas2DRenderer`'s link stroking now uses `ctx.arcTo` at
  each interior route vertex when `corner > 0` (a real rounded join, not
  an approximation), and shortens the stroked line by `arrowheadSize`
  before a solid arrowhead so the line no longer renders underneath it.

### Added

- `Panel.findObject` — real GoJS names this method `findObject`;
  graphojs's `Panel` only had `findElement` (a `Part`/`Node` already
  exposed `findObject` as a delegating alias, but a `Panel` reached via a
  template's own nested structure did not). Ported code that calls
  `panel.findObject(...)` directly on a `Panel` no longer needs a
  rename.

## [1.6.0] - 2026-08-21

Follow-up to 1.5.0, from a sixth round of the same migration report (a
side-by-side GoJS/graphojs Gantt screenshot comparison, plus two small
named-API gaps) — one of these turned out to be the most significant fix
in this whole series. No breaking changes.

### Fixed

- **A `Node` never auto-sized to its own template's content — it always
  fell back to a hardcoded 100x50 unless the model data had explicit
  `width`/`height` fields.** Real GoJS has no such reserved data
  properties: binding a `Shape`'s own `width` inside an `"Auto"` panel to
  per-node data (the standard way a node is meant to auto-size to its
  content — the same idiom behind any node that hugs its label) is
  exactly what a Gantt bar template does, binding the *bar Shape's*
  width to each task's duration rather than the model data's `width`
  directly. Every bar rendered at the same ~100px width regardless of
  its real duration, which is what the screenshot comparison showed:
  GoJS's "Design" (5 days) and "Build" (10 days) bars scaled
  proportionally to their length; graphojs's were the same width
  regardless of duration. `updateNodeFromData` now measures the node's
  own panel (after its bindings have been applied, so it reflects that
  node's own data) and uses that for width/height whenever neither the
  model data nor the template's own top-level property map (e.g.
  `$(go.Node, { width: 150 }, ...)`, unaffected) supplies one explicitly.
- `Diagram` defaulted `showGrid` to `true` (a visible 20px background
  grid) — real GoJS's own `Diagram.grid` Panel exists by default but
  starts `visible: false`; you opt in explicitly. This meant every
  graphojs diagram that never touched grid settings at all rendered a
  faint grid GoJS wouldn't — visible side by side in a Gantt chart
  screenshot comparison as fine daily gridlines across the whole
  timeline, where GoJS showed none. Defaulted `showGrid` to `false` to
  match. Since `showGrid` was a private field with no public setter,
  added `enableGrid()`/`disableGrid()`/`isGridEnabled()` (mirroring the
  existing `enable/disableSnapToGrid()` shape) so it can still be turned
  on after construction, not just via the constructor option.

### Added

- `Part.name` — real GoJS has this because `Part extends GraphObject`,
  which owns `.name`; graphojs's `Part` is a separate class, so it had no
  name of its own. Most relevant for a bare decorative `Part` (added in
  1.4.0), which ported GoJS code may still identify by `.name` rather
  than `.key`. `name` in a `Node`/`Link`/`Group` template's top-level
  property map now also routes to the resulting Part (not the template's
  wrapper Panel), matching how `visible`/`opacity`/`location`/etc. were
  already handled there.
- `TextBlock.OverflowClip`/`OverflowEllipsis` — named constants for
  `TextBlock.overflow`, resolving to the same `"clip"`/`"ellipsis"`
  strings it already accepted. Lets a ported GoJS template write
  `overflow: go.TextBlock.OverflowEllipsis` instead of the literal
  string.

## [1.5.0] - 2026-08-21

Follow-up to 1.4.0, closing the remaining real gaps from a fifth round of
the same GoJS-to-graphojs Gantt migration report. No breaking changes.

### Added

- `Shape.interval`: for a `"LineH"`/`"LineV"` `Shape` tiled by a `Panel
  "Grid"`, draw only every Nth row/column instead of every one (e.g. a
  heavier line every 5 columns) — the same real GoJS idiom of stacking two
  `Shape "LineV"` children, one plain and one with `interval` set, now
  works in a single Grid panel instead of needing two.
- `Diagram.parts`: an iterator over every top-level Part (nodes, links,
  groups, and bare decorative `Part`s), matching real GoJS's own
  `Iterator` protocol (`while (it.next()) ...it.value`) and also usable
  directly with `for...of`. Previously the only way to reach a Part was
  to already know its key (`getPart`/`findPartForKey`/`findNodeForKey`/
  `findLinkForKey`); there was no way to enumerate them all, the pattern
  real GoJS code commonly uses to search/filter across the whole diagram.
- The constructor's `div` is now optional (`new go.Diagram()`, or
  `{ div: null }`) — a `Diagram` can be built up front (templates, tools,
  listeners) before a host element exists yet, then attached later via
  the `div` setter added in 1.4.0. This is what a `gojs-react`-style
  `initDiagram: () => Diagram` factory needs, since it constructs the
  `Diagram` before the ref's element has mounted.
- `graphojs/react` gained `ReactDiagram`, a component matching
  `gojs-react`'s actual shape — an `initDiagram: () => Diagram` factory
  prop plus `ref.getDiagram()` — as an alternative to this module's own
  `<Diagram>` (which instead takes `nodeTemplate`/`linkTemplate` as
  declarative props). Lets code written against `gojs-react` port by
  changing only the import. Scoped honestly: `modelData` is accepted for
  prop-shape compatibility but inert (`Model` has no model-wide data to
  apply it to); `onModelChange` fires with graphojs's own `ChangedEvent`,
  not `gojs-react`'s `IncrementalData` shape; and `nodeDataArray`/
  `linkDataArray` changes (when not `skipsDiagramUpdate`) do a full
  `diagram.model =` resync, not a fine-grained incremental diff.

### Fixed

- Hovering a `Part.toolTip` immediately hid it again — shown and gone
  within the same tick, before a person could ever actually read it. The
  floating tooltip `<div>` is positioned exactly at the cursor
  (`e.clientX`/`e.clientY`), so the instant it appeared it became "the
  element under the pointer," and the browser fired a real `mouseleave`
  on the canvas underneath — which the tooltip's own dismiss-on-hover-away
  logic reacted to by hiding it. Fixed by excluding the floating tooltip
  from hit-testing (`pointer-events: none`), which a tooltip never needed
  anyway. Found while confirming a migration report's claim that
  `$("ToolTip", ...)` didn't work as `Part.toolTip` — that constructor
  form was already fine; this self-cancelling flicker was the real,
  separate bug making it look broken.

## [1.4.0] - 2026-08-21

Follow-up to 1.3.0, from a fourth round of the same GoJS-to-graphojs Gantt
migration report (which also covered the project's Vue renderer for the
first time, and confirmed 1.3.0's text-clipping fix). No breaking changes.

### Added

- A standalone `Panel "Grid"` now actually tiles its children — previously
  it only had a real effect as `diagram.grid` (read for its `Shape`
  children's styling by `Diagram.getGridPatternStyle`); used as a normal
  panel nested in a template, it measured to nothing and its children were
  never laid out or drawn at all. `Shape "LineH"`/`"LineV"` children now
  tile as full-span lines repeating at `gridCellSize` intervals (the same
  pattern used for `diagram.grid`, now also usable as a plain decorative
  element elsewhere in a template); any other child tiles as a repeated
  stamp, one per cell. Requires an explicit `width`/`height` on the panel
  (a repeating pattern has no content size of its own to auto-measure).
- `Diagram.div` is now read/write, matching real GoJS: setting it moves
  the same diagram instance — model, undo history, selection, viewport —
  into a different container, or detaches it entirely with `null` (the
  canvas and accessibility live region are removed from the DOM but the
  diagram itself isn't destroyed and can be reattached later). Previously
  `div` was read-only, forcing callers that need to reparent (e.g. a
  Vue/React component remounting its host element) to `destroy()` and
  construct a whole new `Diagram` instead.
- `Part` is no longer `abstract` — GoJS-compatible: `new go.Part()` (with
  an optional `key`; a unique one auto-assigns when omitted, since a loose
  Part has no model row to key off) constructs a decorative part outside
  the model, e.g. a frame or watermark, added with `Diagram.add()` and
  never appearing in `model.nodeDataArray`. Previously the only way to add
  a diagram-level decoration was to construct a `Node` and never give it
  to the model — a working but non-obvious workaround, since `Part` had no
  concrete use of its own. `Canvas2DRenderer` gained a matching
  `renderPart()` (draws the Part's own `panel`, same as a Node's, minus
  the Node-only flat-shape fallback and port-spot bookkeeping); hit-testing
  and dragging are not wired up for bare Parts, matching their intended
  use as static decorations.

## [1.3.0] - 2026-08-21

Follow-up to 1.2.0, from the same GoJS-to-graphojs Gantt migration report,
re-tested against the published 1.2.0 package. No breaking changes.

### Fixed

- `TextBlock.measure()` guessed a line's width as `0.6 * fontSize` per
  character instead of measuring real glyph metrics. Wired `measure()` up
  to the real canvas `measureText`, via the `TextMeasureCache` in
  `render/RenderCache.ts` that already existed and was already tested, but
  that nothing had ever called. Falls back to the old per-character guess
  only when no canvas is available at all (SSR). This alone wasn't the fix
  for the bug below, but it's what made that bug's actual cause visible
  and diagnosable in the first place.
- **A left-aligned, auto-sized `TextBlock` (or `Shape`/`Picture`/`Panel`)
  could lose its leading character(s), worse the longer the string** —
  reported as a real GoJS-to-graphojs Gantt chart port rendering `"Design"`
  as `"esign"` and `"QA & launch"` as `"& launch"`. Root cause:
  `GraphObject.width`/`height` fell back to `_actualSize` (the last
  *rendered* size) when no explicit size had been set, instead of `NaN` as
  real GoJS documents. Every `measure()` override (`Shape`, `TextBlock`,
  `Picture`, `Panel`) gates its real measurement behind `this.width > 0`,
  intending "has an explicit size ever been set" — but reading back a
  previous *actualSize* made that check true after the first render
  regardless, so whatever size an early, possibly-premature layout pass
  produced (e.g. before a `Binding` had applied the real `text`) got
  permanently locked in and never re-measured again, even once real data
  arrived. In a `Panel "Spot"` with a data-bound-width bar `Shape` and a
  sibling left-aligned label (a standard Gantt-bar template), this
  surfaced as the label's default (empty-string) width getting baked in
  first, then reused forever once real text was bound — and because the
  label's own default `textAlign` is `"center"`, drawing the full real
  string centered within that too-small locked-in box shifted its start
  left of where the box (and the bar) actually began, rendering the
  leading characters in white over the diagram's white background —
  invisible, not clipped. Fixed by making `width`/`height` report `NaN`
  until explicitly set, matching real GoJS.

## [1.2.0] - 2026-08-20

Further GoJS compatibility work on top of 1.1.0, from the same migration
exercise. No breaking changes.

### Added

- 6 more `Shape` figures: `Square`, `Junction`, `MultiDocument`, and rotated
  `TriangleDown`/`TriangleLeft`/`TriangleRight` variants.
- `Panel "Grid"` — a real, GoJS-compatible pattern panel for `diagram.grid`
  (`$(go.Panel, "Grid", { gridCellSize }, $(go.Shape, "LineH", ...), $(go.Shape, "LineV", ...))`).
  `diagram.grid` was previously typed `unknown` and silently discarded
  whatever was assigned to it — it's now a real `Panel | null` that drives
  the existing `gridSize`/`showGrid` rendering: the pattern's `LineH`/`LineV`
  `Shape` children's `stroke`/`strokeWidth` style the grid lines, and its
  `gridCellSize` overrides the uniform `gridSize` step. `Renderer.renderGrid`
  gained an optional 3rd `GridPatternStyle` parameter (both exported) to
  carry this through; omitting a grid pattern renders exactly as before.
- `Part.toolTip` (a `Panel` template) now actually shows on hover, after
  `Diagram.toolTipDelay` (default 500ms) — previously a typed field nobody
  read. Reuses the same floating-`<div>`-plus-`<canvas>` rendering approach
  already used for `Part.contextMenu`, extracted into a shared
  `Diagram.renderFloatingPanel()` helper. `Diagram.hideToolTip()` is public,
  mirroring the existing `hideContextMenu()`. This is independent of the
  simpler, graphojs-only plain-text `part.tooltip` (`TooltipManager`) — if a
  part sets both, both are still handled by their own separate mechanisms.
- GoJS 4.0-style typed constants: `Figures`, `Arrowheads`, `PanelTypes`,
  `ToolNames`, `Builders`, all sitting on top of the same strings graphojs
  already accepted. 17 more `Shape` figures for `Figures` parity (`None`,
  `Border(s)`, 4 partial-rounded rectangles, `Capsule`, `BarH`/`BarV`,
  `LineRight`/`Left`/`Up`/`Down`, plus aliases for `MinusLine`/`PlusLine`/
  `XLine`).
- `List`, `Set`, `Map` — GoJS's own collection classes (distinct from the
  native globals; import them aliased, e.g. `import { Set as GoSet }`).
  graphojs's own internals still use plain arrays/native collections; these
  are for code that constructs `new go.List()`/`Set()`/`Map()` directly.
- `Geometry`/`PathFigure`/`PathSegment` — a real, programmatically-buildable
  geometry object model for `Shape.geometry` (alongside the existing
  `geometryString`), serializing into the same geometryString
  mini-language under the hood so it reuses the existing rendering path.
  `Geometry.parse`/`stringify` round-trip through that format.
- `Brush` — a portable, serializable gradient/pattern description for
  `Shape.fill`/`stroke` (`BrushLike = Brush | string | null`), resolved to a
  real `CanvasGradient`/`CanvasPattern` at draw time by the new
  `render/BrushResolver.ts`. Includes the static color utilities
  (`lighten`/`darken`/`mix`/`isDark`/`randomColor`/`isValidColor`).
- `Router`/`AvoidsNodesRouter` — a class-based routing-strategy API.
  `AvoidsNodesRouter.routeLinks()` sets `Link.avoidObstacles = true` on its
  links, reusing graphojs's existing obstacle-avoiding path computation
  rather than duplicating it.
- `HTMLInfo` — an HTML-based alternative to a `Panel` template for
  `Part.contextMenu`/`toolTip`, giving `show`/`hide` full control over an
  arbitrary HTML element. `Part.contextMenu`/`toolTip` now accept
  `Panel | HTMLInfo | null`.
- Pre-fab widgets constructible by name via `GraphObject.make`/`build`
  (`$("Button", ...)`, or `$(go.Builders.Button, ...)`): `Button`,
  `ToolTip`, `ContextMenu`, `ContextMenuButton`, `CheckBox`,
  `CheckBoxButton`, `ToggleSwitch`/`Toggle`, `AutoRepeatButton` (currently
  single-fire, like `Button` — graphojs has no `mouseDown`/`mouseUp`
  dispatch yet to implement true repeat-while-held).
- `GraphObject.isActionable` + `actionDown`/`actionMove`/`actionUp`/
  `actionCancel`, dispatched by the new `ActionTool` — for building custom
  controls inside a Part's visual tree without a new `Tool` subclass.
- `DraggingInfo`, `DraggingOptions`, `RowColumnDefinition`, `PositionArray`
  — real, correctly-shaped data/utility classes for API parity. Not yet
  consulted internally by `DraggingTool`/`Panel`'s table layout, which keep
  their own existing representations.
- Per-algorithm `LayoutVertex`/`LayoutEdge`/`LayoutNetwork` subclasses
  (`Circular*`, `ForceDirected*`, `LayeredDigraph*`, `Tree*`) with their
  documented extra properties (`charge`/`mass`, `layer`/`column`,
  `parent`/`children`, etc.). Real, constructible classes, but graphojs's
  layouts compute internally rather than through these subclasses, so
  overriding them doesn't change layout results — they exist for API
  parity with ported code that references these types directly.
- A full theming system: `Theme`, `Themes.Light`/`Dark` (reproducing GoJS's
  documented palettes), `ThemeManager` (`currentTheme`/`defaultTheme`/
  `themeMap`/`findValue`/`getValue`/`findTheme`/`set`), `ThemeBinding`, and
  `GraphObject.theme()`/`themeData()`/`themeModel()`. `Diagram.themeManager`
  is lazily created; switching `currentTheme` re-applies every `ThemeBinding`
  on every part automatically. `themeModel()` currently behaves like
  `themeData()` — graphojs has no `Model.modelData` (shared, model-wide
  data) to source it from.

### Fixed

- `LinkLabelDraggingTool` (plus its `SetLinkLabelPositionCommand`/
  `LinkLabelPosition`) was mistakenly added to `graphojs/go` in an earlier
  1.2.0 pass — cross-checking against GoJS's real `.d.ts` shows it actually
  ships from GoJS's `extensionsJSM/` folder (alongside `Buttons.ts`, where
  `TreeExpanderButton` comes from), not the core `go` module.
  `compatibility.md` already documented this correctly; reverted to match.
  (`ReshapeLinkCommand` stays in `go.ts` — that one really is core, used by
  `LinkReshapingTool`.)
- `go.ts` now also exports `Quadtree` (lowercase "t") as an alias of
  `QuadTree` — real GoJS uses that exact casing.
- `LayerNames.Default` was `'Default'`; real GoJS uses the empty string
  (`Part.layerName = ""` means "the default layer"). Also added the 4
  layer names graphojs was missing (`ViewportBackground`,
  `ViewportForeground`, `Adornment`, `Tool`) so `diagram.findLayer(...)`
  round-trips the same names as real GoJS, though adornments/tool handles
  don't yet render through them.
- `Diagram.findHitGraphObject` subtracted the containing Part's bounds
  before hit-testing, but every element's position is already tracked in
  absolute diagram coordinates (set during `Panel.draw`'s layout passes)
  — so it always missed and returned `null`. This silently broke
  `GraphObject.click`/`doubleClick`/`contextClick` handlers on any
  sub-object (buttons, checkboxes, etc.) and — since it's what
  `ActionTool` uses to find the actionable object under the pointer — it
  would have made every `isActionable` GraphObject entirely unresponsive
  to real mouse input. Found via a real-browser Playwright test that
  clicked an actionable button rather than calling the tool's methods
  directly.
- `ActionTool` was registered with the diagram's `ToolManager` but never
  added to the `mouseDown`/`mouseMove`/`mouseUp` dispatch lists, so it
  never actually ran during real interaction. Added it to the front of
  both lists (its `canStart` only matches when an `isActionable` object
  is directly under the pointer, so it can't steal clicks meant for
  other tools).
- `packages/core/package.json`'s `sideEffects` array didn't list
  `panel/BuilderWidgets.js`/`.cjs` — the module that registers all
  `GraphObject.make("Button", ...)`-style builders as a side effect of
  being imported. Tree-shaking bundlers (esbuild, Vite, webpack) were
  free to drop that import entirely, silently breaking every builder
  widget in a real production build while unit tests (which don't
  tree-shake) kept passing. Added it to `sideEffects`.

## [1.1.0] - 2026-08-20

Bug-fix and small compatibility release, found by porting a real GoJS
application's Gantt chart to `graphojs`. No breaking changes — the public API
frozen in 1.0.0 is unaffected.

### Added

- `Spot.LeftSide` / `Spot.RightSide` — GoJS-compatible aliases for
  `MiddleLeft`/`MiddleRight` (also resolved by `Spot.parse()`).
- `Shape` figures `"LineH"` / `"LineV"` — the straight horizontal/vertical
  lines GoJS uses to hand-build a background grid panel
  (`$(go.Shape, "LineH", ...)`).
- `graphojs/go` now also exports `LinkLabelDraggingTool`, `ReshapeLinkCommand`,
  `SetLinkLabelPositionCommand`, and the `LinkLabelPosition` type — part of
  the documented compatibility surface, but previously only reachable from
  the main `graphojs` entry point.
- The main `graphojs` entry point now also exports `ModelTransactionCommand`,
  `createModelTransactionCommand`, and `normalizeShapeType` — previously only
  reachable from `graphojs/go`.

### Fixed

- `graphojs/react`'s `<Diagram>` assigned `diagram.model` inside its mount
  effect *before* the separate `nodeTemplate`/`linkTemplate` effects ran.
  Since `diagram.model = ...` synchronously builds every `Part` using
  whatever template is set at that exact moment, passing `model` together
  with `nodeTemplate`/`linkTemplate` on the very first render synced every
  node with no template at all — visually, nodes with no color, no text, and
  links with no arrowheads. Templates from props are now applied inside the
  mount effect itself, before the model.
- `graphojs/vue`'s `<Diagram>` had the identical bug, even more directly:
  `onMounted` assigned `diagram.model` before `diagram.nodeTemplate` /
  `linkTemplate` / `groupTemplate`, all within the same function. Reordered
  to apply templates before the model.
- `Panel`'s `'Auto'` and `'Spot'` layouts, `'Position'`, and the aligned-
  element branch of `'Table'`, measured an element's box including its
  margin but never carved that margin back out as inset space before
  calling `draw()` — so `margin` created no visible padding for any panel
  type except `'Vertical'`/`'Horizontal'`, which already handled this
  correctly. Most visibly, a `TextBlock` with a left margin drew flush
  against its container instead of inset, clipping its leading character
  whenever the container was sized tightly around the text (e.g. a Gantt
  bar label rendering `"A & launch"` instead of `"QA & launch"`).
- `Binding` with `sourceProperty: ""` — GoJS's convention for "bind to the
  whole source object", normally paired with a converter — resolved to
  `data[""]`, which is always `undefined`, instead of the source object
  itself.

## [1.0.0] - 2026-08-07

The public API surface (`graphojs`, `graphojs/go`, `graphojs/templates`,
`graphojs/react`, `graphojs/vue`) is now considered stable — breaking changes
after this release require a major version bump. See `ROADMAP.md` for the
full history of what led here.

### Added

- `groupTemplateMap` / `addGroupTemplate` / `removeGroupTemplate` — category
  templates for groups, matching `nodeTemplateMap`/`linkTemplateMap`.
- 10 new `Shape` figures for BPMN/UML/flowchart diagrams: `component`,
  `gatewayExclusive`, `gatewayParallel`, `callout`, `bracket`, `flag`,
  `chevron`, `tape`, `shield`, `bolt`.
- Full SVG path mini-language support in `geometryString` (M/L/H/V/C/S/Q/T/A/Z,
  absolute/relative variants, implicit command repetition).
- `TreeExpanderButton` / `PanelExpanderButton` extension-style widgets;
  `Diagram.collapseTree`/`expandTree`, `Part.isTreeExpanded`, and the
  `TreeCollapsed`/`TreeExpanded` events now actually fire.
- Guided dragging (alignment snapping): `draggingTool.isGuidedDraggingEnabled`
  / `guidelineSnapDistance`, with alignment-guideline rendering
  (`Diagram.showAlignmentGuidelines`/`hideAlignmentGuidelines`).
- `LinkLabelDraggingTool` for repositioning a link's label by dragging it;
  `Link.labelSegmentFraction`, `Link.getLabelBounds()`,
  `SetLinkLabelPositionCommand`.
- `LayeredDigraphLayout` crossing reduction upgraded to a weighted-median
  heuristic with alternating down/up sweeps plus a transpose pass
  (Sugiyama-style), replacing a single-pass barycenter.
- 3 full sample guides with playgrounds: org chart, flowchart with swimlanes,
  and a Gantt chart.
- `diagram.print()` now embeds vector SVG by default
  (`format: 'svg' | 'png'`) — "Save as PDF" from the browser's print dialog
  now produces a real vector PDF instead of an embedded raster image.
- GraphML import/export: `Serializer.serializeToGraphML` /
  `deserializeFromGraphML` / `exportToGraphMLFile` / `importFromGraphMLFile`.
- Server-side rendering helper `renderDiagramToCanvas` / `measureDiagramContent`
  — render a diagram into any Node canvas package (`node-canvas`,
  `@napi-rs/canvas`, `skia-canvas`) without depending on any of them.
- Accessibility pass: the canvas is keyboard-focusable
  (`role="application"`, `aria-roledescription`), an `aria-live` region
  announces selection/focus changes, and Arrow keys move a keyboard focus
  cursor between parts when nothing is selected (Enter/Space selects,
  Escape clears). Announcement text is in English by default and fully
  overridable via `diagram.accessibilityMessages` /
  `DiagramOptions.accessibilityMessages` for localization.
- `vitest --coverage` script wired into CI (`pnpm test:coverage`, uploaded as
  a build artifact).
- `ForceDirectedLayout.theta` — tunes the new Barnes-Hut repulsion
  approximation's accuracy/speed trade-off (see Performance below).
- A real, generated API reference (`/reference/api/` on the docs site),
  covering all 5 public subpaths (`graphojs`, `graphojs/go`,
  `graphojs/templates`, `graphojs/react`, `graphojs/vue`) directly from
  source via TypeDoc — replaces a hand-written page that covered only a
  fraction of the actual public exports.
- `AnimationManager.isEnabled` (GoJS-compatible) and
  `Animation.finishImmediately()` — animations jump straight to their final
  values instead of tweening. Defaults to `false` when the OS requests
  `prefers-reduced-motion: reduce`.
- `Diagram.selectionStyle` / `DiagramOptions.selectionStyle` — colors for
  selection highlights, resize handles, and the keyboard focus cursor.
  Defaults to a higher-contrast palette (`highContrastSelectionStyle`) when
  the OS requests `prefers-contrast: more` or `forced-colors: active`.
- The live region now also announces undo/redo, deletions, and tree
  collapse/expand — not just selection/focus changes. `diagram.announce()`
  is now public, for tools/integrations that want to announce their own
  actions.
- A wildcard subpath export (`"./*"`) alongside the existing curated entry
  points — any internal module is now importable directly, e.g.
  `import { Point } from 'graphojs/geometry/Point'` or
  `import { TreeLayout } from 'graphojs/layout/TreeLayout'`. Measured effect:
  a leaf class like `Point` costs 62.4 KB gzip through the main `graphojs`
  barrel (same as importing `Diagram` — the barrel is too large for esbuild/
  webpack/rollup to shake through), but only 0.7 KB gzip imported directly —
  a ~99% reduction for consumers who only need a handful of isolated
  utilities (geometry helpers, a single layout algorithm, etc.) without
  constructing a `Diagram`. This is purely additive: `graphojs`/`graphojs/go`
  and the other existing entry points are unchanged, so nothing breaks for
  existing consumers — it's an opt-in escape hatch, not a replacement. Unlike
  the curated entry points, deep import paths mirror internal file layout and
  aren't held to the same semver stability guarantee — see the new
  "Reducing your bundle size" guide.

### Fixed

- `Panel.clone()` didn't set `parentPanel` on cloned static child elements,
  so `GraphObject.part`/`.diagram` couldn't be resolved from a nested cloned
  object (e.g. a button's `click` handler inside a node template) — click
  handlers on nested template elements now work correctly.
- `GraphObject.margin` now accepts a plain number (GoJS shorthand for a
  uniform margin on all four sides) instead of silently being ignored.
- Node/group properties set directly on the model data (`label`, `fill`,
  `stroke`, `angle`, `zOrder`) weren't applied on the initial
  `diagram.model = ...` load or a full model resync — only on later
  incremental single-part updates. They're now applied consistently in both
  paths.
- Pinch-to-zoom on touch devices didn't anchor on the pinch midpoint — the
  offset update divided by the new scale instead of the old one, so
  pinching with the fingers held perfectly still left the viewport offset
  completely unchanged (visually anchoring the zoom at the canvas origin
  instead of under the fingers).
- `Layout.doLayout()` called with no explicit collection always operated on
  empty arrays — `Layout` had no real reference to its `Diagram`, only a
  cast-based probe that could never succeed. `Layout.diagram` is now wired
  up automatically by `Diagram.layout = ...`.
- `Diagram.selectPartsInRect(rect, partialInclusion=false)` threw
  `r.containsRect is not a function` when called with a plain
  `{x,y,width,height}` object — exactly what `DragSelectingTool` always
  passes when `isPartialInclusion` is set to `false`.
- `PanningTool` never actually read `Diagram.allowHorizontalScroll` /
  `allowVerticalScroll` — both flags existed but nothing gated panning on
  them, so setting either to `false` had no effect.
- `Palette` and `Overview` create their own internal `Diagram` (with its own
  render loop) when constructed without one, but never destroyed it:
  `Palette` had no `destroy()` method at all, and `Overview.destroy()`
  cleaned up its own canvas/listeners but never destroyed the diagram it
  owned. Both now track diagram ownership and destroy it when they own it,
  fixing a render-loop leak for any `Palette`/`Overview` created this way.
- `"sideEffects": false` in `package.json` was incorrect: `Overview`,
  `Palette`, and `Diagram` each register themselves with `GraphObject.make`
  at module scope, a real side effect. A bundler trusting the old blanket
  `false` could have silently dropped that registration. Replaced with an
  explicit array naming just those 3 files.
- A `linkTemplate` using the standard path-`Shape` + arrowhead-`Shape`
  (+ optional label `TextBlock`) convention rendered its link **twice**:
  once correctly (the dedicated path/arrowhead/label drawing), and a second
  time as a floating panel box centered on the link's midpoint — visible as
  a solid rectangle sitting on or near every link. Affected any diagram
  using that convention, including several docs examples. Those elements
  are now fully extracted onto the link's own fields and removed from the
  leftover template panel, so nothing is left to double-render.
- `groupTemplate` wasn't rendered at all: `Canvas2DRenderer` drew every group
  as a flat, default-colored rectangle regardless of what its template
  declared — no custom `Shape` figure, no header `TextBlock`, no nested
  content. Groups now render their template panel the same way nodes
  already did, falling back to the flat rectangle only when no
  `groupTemplate` is set. Along the way, `Panel`'s `'Auto'` layout now
  respects an explicit `alignment` spot on non-background elements (e.g. a
  header `TextBlock` pinned to `Spot.Top`) instead of always centering them
  — needed for a group's header to sit above its members instead of
  overlapping them.
- The docs Playground's export/print buttons (PNG, SVG, print, JSON) were
  silently broken: the run iframe's `sandbox` attribute was missing
  `allow-downloads` (needed by the `<a download>.click()` pattern the PNG/SVG/
  JSON buttons use) and `allow-popups`/`allow-popups-to-escape-sandbox`
  (needed by `diagram.print()`'s `window.open()` + `.print()`) — clicking any
  of the four buttons produced no error and no visible effect.
- Several docs examples called `diagram.zoomToFit()` before finishing their
  page layout (appending sibling buttons/log elements, or filling a
  status/preview element's text) — since `zoomToFit()` measures the canvas's
  current, synchronous `getBoundingClientRect()`, calling it too early
  captured a temporarily larger box, and the later layout shift (once
  siblings/content settled) left the diagram visibly off-center or with
  content clipped outside the canvas. Fixed by moving `zoomToFit()` to run
  after all page setup completes, in each affected example.
- `Diagram.makeSvg()` / `Serializer`'s SVG export and `diagram.print()`
  (which embeds that same SVG by default) rendered every node using a
  template panel (the standard `$(go.Node, 'Auto', ...)` pattern) shifted
  down and to the right of its real position: `SVGExporter` added the node's
  own `x`/`y` on top of each template element's position, which is already
  in absolute diagram coordinates — double-counting the offset. Visually,
  this pushed content out of the SVG's natural viewport, making exported/
  printed diagrams look cropped or empty at the top. Affected any diagram
  using a node template, i.e. effectively all of them.
- A declarative port (`portId` on a template element) resolved to the wrong
  location — sometimes off the node entirely — for any node not positioned
  at the diagram origin `(0, 0)`. `Node.collectPortsFromPanel()` /
  `updatePortSpots()` derived the port's fractional spot by dividing the
  element's position directly by the node's width/height, without first
  subtracting the node's own `bounds.x`/`bounds.y` — but a template
  element's `position` is always in absolute diagram coordinates, so the
  computed spot silently depended on where the node happened to sit on the
  canvas. Every existing port test used a node at `(0, 0)`, where subtracting
  zero has no effect, which is why this went unnoticed. In practice this
  made `LinkingTool`'s "drag from a port to draw a new link" gesture appear
  to do nothing for any off-origin node with a declared port.

### Performance

- Minified core bundle ≈ 74 KB gzip (~292 KB raw) — grew from the additions
  above; still smaller than GoJS (~130 KB gzip).
- The package now ships unbundled (`tsup`'s `bundle: false`, mirroring
  `src/`'s module structure in `dist/` instead of one flattened file per
  subpath) so a consumer's own bundler has a real module graph to
  tree-shake against — importing only `Diagram` now costs ~62.4 KB gzip,
  down from ~76.5 KB (no better than importing everything) before this
  change. Tree-shaking down to individual leaf classes *through the main
  barrel* is still blocked by the size of the `graphojs`/`graphojs/go`
  re-export barrels (a known bundler limitation, not fixable by more build
  config — see ROADMAP.md Phase 7) — but see above: deep imports sidestep the
  barrel entirely, at a real ~99% size reduction for leaf utilities.
  `graphojs/templates` isn't affected by the barrel problem and tree-shakes
  cleanly on its own (confirmed ~0.8 KB gzip for a single template helper).
- The published dist is now minified (`tsup`'s `minify: true`, previously
  `false`) — `dist/diagram/Diagram.js`, the single largest file, drops from
  103.7 KB to 55.2 KB raw (22.5 KB → 13.8 KB gzip), total `dist/` from
  2.9 MB to 2.3 MB raw. This has no effect on consumers who bundle their own
  app (their bundler already minifies, so double-minification converges to
  the same result) — it specifically helps anyone loading straight from a
  CDN without a build step (see the "Usar GraphoJS sin npm (CDN)" guide),
  who now downloads meaningfully fewer bytes per file with zero setup
  required on their end.
- `ForceDirectedLayout`'s repulsion pass is now approximated with a
  Barnes-Hut quadtree (O(n log n) instead of O(n²) per iteration), and its
  attraction pass now iterates links directly instead of scanning every
  node pair — together, a ~40x speedup measured at 400 nodes (3223ms →
  79ms), and what used to be computationally infeasible at 5,000+ nodes now
  completes in ~1.3s.
- The virtualization (viewport-culling) spatial index was being rebuilt
  from scratch on every single render call, even when nothing had moved
  since the last frame. It's now only rebuilt when parts actually change —
  roughly a 2x improvement measured on repeated static renders of a
  20,000-node diagram (14.5ms → 7.5ms average).

## [0.2.0] - 2026-08-06

### Changed

- The React and Vue wrappers are now **subpaths of the `graphojs` package**
  instead of separate `@graphojs/react` / `@graphojs/vue` packages. Import them
  as `graphojs/react` and `graphojs/vue`. `react`, `react-dom`, and `vue` are
  optional peer dependencies — install them only if you use the corresponding
  subpath.
- Added `homepage` (https://graphojs.ricardorobles.es/) to the package.

## [0.1.0] - 2026-08-06

First public release on npm. The `graphojs` package ships the core library
plus optional wrapper subpaths:

- [`graphojs`](https://www.npmjs.com/package/graphojs) — core library (Canvas 2D, GoJS-compatible API)
- [`graphojs/react`](https://www.npmjs.com/package/graphojs) — React wrapper (optional peer dependency)
- [`graphojs/vue`](https://www.npmjs.com/package/graphojs) — Vue 3 wrapper (optional peer dependency)

### Added

#### Core (`graphojs`)

- Canvas 2D rendering engine with viewport culling, dirty-rect redraw, Path2D
  caching, and text-measure caching.
- Geometry primitives and data model: `Point`, `Rect`, `Size`, `Spot`, `Margin`,
  `GraphLinksModel`, `TreeModel`, key generation, model validation, and
  incremental model-to-part sync.
- GoJS-compatible declarative construction via `GraphObject.make`.
- Templates: `Node`, `Link`, `Group`, `Panel` (Auto/Table/Spot/Vertical/
  Horizontal/Viewbox), `Shape` (with figures), `TextBlock`, and `Binding`
  (converters, TwoWay, dot-path sources, `ofObject`).
- Interaction tools: pan, zoom, click/drag select, rubber-band selection, node
  dragging, linking (`LinkingTool`/`RelinkingTool`), resizing, rotating, text
  editing, grid snapping, arrow-key nudging, touch panning and pinch-to-zoom.
- Layouts: Grid, Tree, Circular, ForceDirected, LayeredDigraph, Spot.
- Diagram events (`SelectionChanged`, `ObjectSingleClicked`, `LinkDrawn`,
  `PartResized`, and more), `GraphObject` event handlers, and model-changed
  listeners.
- Undo/redo transaction system integrated across all tools.
- Export: `makeImage`, `makeImageData` (PNG), `makeSvg`, `print`.
- Serialization: `Serializer` with `serializeToString`/`deserializeFromString`/
  `exportToFile`/`importFromFile`.
- Widgets: `Palette` (native HTML5 drag & drop) and `Overview`.
- Context menus, tooltips, layers, ports/spots for edge connections, groups,
  virtualization and spatial indexing (QuadTree) for hit-testing.
- Lazy `graphojs/templates` subpath with predefined palette templates
  (`getAllTemplates`, `basicShapes`, `dataFlowShapes`, `flowchartShapes`).
- `graphojs/go` subpath exposing the full `go.*` namespace for drop-in
  GoJS compatibility.

#### React (`graphojs/react`)

- `Diagram`, `Palette`, and `Overview` components that create the underlying
  widgets once and update reactively when props change.
- Props: `model`, `nodeTemplate`, `linkTemplate`, `groupTemplate`,
  `initDiagram`, `onDiagramInit`, `onModelChange`, `onDiagramEvent`,
  `onSelectionChanged`, `className`, `style`.

#### Vue (`graphojs/vue`)

- `Diagram`, `Palette`, and `Overview` components (Vue 3.5+) with reactive
  prop watching and emitted events (`diagram-init`, `model-change`,
  `diagram-event`, `selection-changed`).
- Props: `model`, `nodeTemplate`, `linkTemplate`, `groupTemplate`,
  `initDiagram`, `onModelChange`, `onDiagramEvent`, `onSelectionChanged`,
  `className`, `style`.

#### Documentation & tooling

- Astro + Starlight documentation site with editable playgrounds covering all
  major features (getting started, interaction, layouts, groups, templates,
  export, drag & drop, react/vue, and more).
- Migration guide from GoJS, standalone flowchart demo, and production
  Dockerfile for the docs site.
- CI pipeline (lint, format, typecheck, build, unit tests, e2e) and a
  release workflow for npm publishing on version tags.

### Fixed

- Device pixel ratio re-read on resize.
- Link endpoints recomputed after layout changes; links re-routed around moved
  obstacles.
- Link/undo/key-collision bugs across the tool and model layer.
- Converter double-invocation, incremental binding, and array reassignment.
- React wrapper no longer double-subscribes `onModelChange`.
- Vue wrapper no longer double-fires callbacks (prop + emitted event).
- `GraphObject.make` typing so part constructors (`Node`, `Link`, `Group`)
  resolve to `Panel` templates for consumers.

### Performance

- Minified core bundle ≈ 67 KB gzip (~265 KB raw), with tree-shaking support.
- 5000-node + 5000-link graph in a real browser: model sync ~170 ms, first
  render ~35 ms, ~105 FPS during interaction.

[1.7.0]: https://github.com/rroblf01/graphojs/releases/tag/v1.7.0
[1.6.0]: https://github.com/rroblf01/graphojs/releases/tag/v1.6.0
[1.5.0]: https://github.com/rroblf01/graphojs/releases/tag/v1.5.0
[1.4.0]: https://github.com/rroblf01/graphojs/releases/tag/v1.4.0
[1.3.0]: https://github.com/rroblf01/graphojs/releases/tag/v1.3.0
[1.2.0]: https://github.com/rroblf01/graphojs/releases/tag/v1.2.0
[1.1.0]: https://github.com/rroblf01/graphojs/releases/tag/v1.1.0
[1.0.0]: https://github.com/rroblf01/graphojs/releases/tag/v1.0.0
[0.2.0]: https://github.com/rroblf01/graphojs/releases/tag/v0.2.0
[0.1.0]: https://github.com/rroblf01/graphojs/releases/tag/v0.1.0
