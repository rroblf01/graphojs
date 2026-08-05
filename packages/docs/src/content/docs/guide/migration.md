---
title: Migración
description: Cambia de gojs a graphojs cambiando solo el import.
---

Migrar una aplicación GoJS a GraphoJS es en la mayoría de los casos cambiar
**solo la línea de import**.

```diff
- import * as go from "gojs";
+ import * as go from "graphojs/go";
```

## Qué funciona sin cambios

- `go.GraphObject.make` (`$`) y los templates
- `diagram.model`, transacciones y undo/redo
- `go.Node` / `go.Link` / `go.Group` / `go.Panel` / `go.Shape` / `go.TextBlock`
- Bindings, eventos, layouts, Palette, Overview, ContextMenu
- Export PNG/SVG/print

## Diferencias conocidas

| GoJS | GraphoJS |
|------|----------|
| Cientos de figuras Shape | ~70 figuras + símbolos de flowchart |
| `Part` IS a `GraphObject` | `Part` tiene un `panel` |
| Templates de palette en `go.*` | En el subpath `graphojs/templates` |
| Licensed | MIT |

## Si usabas los templates de palette

```diff
- go.getAllTemplates()
+ import { getAllTemplates } from "graphojs/templates";
```

## Verificación

GraphoJS incluye tests e2e que ejecutan el tutorial "Getting Started" de GoJS
verbatim (solo cambiando el import) en un browser real.
