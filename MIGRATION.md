# Migrating from GoJS to GraphoJS

GraphoJS is a drop-in, MIT-licensed alternative to GoJS. Most GoJS applications
migrate by changing **only the import statement**.

## Quick start

```diff
- import * as go from "gojs";
+ import * as go from "graphojs/go";
```

That's it for most code. The `graphojs/go` subpath exposes the same namespace,
classes, and programming model as `gojs`.

## Supported surface

See the [README](./README.md#implemented-compatibility-surface) for the full
list. Highlights:

- `go.GraphObject.make` declarative construction
- `nodeTemplate` / `linkTemplate` / `groupTemplate` / `nodeTemplateMap` / `linkTemplateMap`
- `go.Binding` (converters, TwoWay, dot-path sources, `ofObject`)
- `diagram.model` assignment, `diagram.commit`, transactions
- `go.Node` / `go.Link` / `go.Group` / `go.Panel` / `go.Shape` / `go.TextBlock`
- Panel types: `Auto`, `Table`, `Spot`, `Vertical`, `Horizontal`, `Viewbox`, `Position`
- Data panels: `itemArray` / `itemTemplate`
- Declarative ports: `$(go.Shape, "Circle", { portId: "in" })`
- `go.Binding` at the Part and element level
- `go.Diagram` events (`SelectionChanged`, `ObjectSingleClicked`, `LinkDrawn`, ...)
- `go.Palette` / `go.Overview` / `go.ContextMenu` / tooltips
- Undo/redo with transactions and commands
- Layouts: `Grid`, `Tree`, `Circular`, `ForceDirected`, `LayeredDigraph`, `Spot`
- Model: `nodeDataArray`/`linkDataArray`, `mergeChanges`, incremental JSON, validation
- Export: PNG (`makeImage`), SVG (`makeSvg`), print

## Framework wrappers

- React: `@graphojs/react` provides `<Diagram>`, `<Palette>`, `<Overview>`
- Vue 3: `@graphojs/vue` provides `Diagram`, `Palette`, `Overview` components

```tsx
// React
import { Diagram } from "@graphojs/react";
import * as go from "graphojs/go";

const model = new go.GraphLinksModel({ /* ... */ });
<Diagram model={model} />;
```

```vue
<!-- Vue -->
<script setup>
import { Diagram } from "@graphojs/vue";
import * as go from "graphojs/go";
const model = new go.GraphLinksModel({ /* ... */ });
</script>
<Diagram :model="model" />
```

## Known differences

These are intentional simplifications in GraphoJS:

| GoJS | GraphoJS |
|------|----------|
| Hundreds of Shape figures | ~70 common figures (rect, ellipse, diamond, hexagon, ... plus flowchart symbols) |
| `Shape.geometryString` full SVG path support | Supported for M/L/H/V/C/S/Q/T/A/Z commands |
| `go.Diagram.makeSvg()` | Returns an `SVGElement` (same as GoJS) |
| Licensed (proprietary) | MIT open source |
| `Part` IS a `GraphObject` | `Part` has a `panel` (visual tree); template parts are Panels |
| `go.Binding` on any object | Supported on Parts and GraphObject elements |

## Verifying your migration

GraphoJS ships with Playwright end-to-end tests that run the official GoJS
"Getting Started" tutorial verbatim (only the import changed) in a real browser,
verifying templates, element bindings, `part.data`, link arrowheads, and canvas
rendering. Run them with:

```bash
pnpm build
npx playwright install firefox
npx playwright test
```
