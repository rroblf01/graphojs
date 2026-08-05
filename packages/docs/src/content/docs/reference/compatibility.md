---
title: Compatibilidad
description: Superficie de compatibilidad de GraphoJS con GoJS.
---

GraphoJS implementa la superficie de compatibilidad de GoJS. A continuación el
resumen de lo que está soportado.

## Superficie implementada

- `go.*` namespace (`import * as go from 'graphojs/go'`)
- `go.GraphObject.make` construcción declarativa
- `go.Node` / `go.Link` / `go.Group` / `go.Panel` / `go.Shape` / `go.TextBlock` templates
- `go.Binding` con converters, TwoWay y dot-paths
- `nodeTemplate` / `linkTemplate` / `groupTemplate` / `nodeTemplateMap` / `linkTemplateMap`
- `diagram.model` y transacciones (`startTransaction`/`commitTransaction`)
- `model.nodeDataArray` / `linkDataArray`
- Diagram flags: `isReadOnly`, `isEnabled`, `allowMove`, `allowCopy`, `allowDelete`,
  `allowZoom`, `allowTextEdit`, `allowLink`, `allowRelink`
- Diagram eventos: `SelectionChanged`, `ObjectSingleClicked`, `LinkDrawn`, `PartResized`, ...
- `go.Palette` / `go.Overview` / `go.ContextMenu` / tooltips
- Undo/redo con transacciones y comandos
- Layouts: `Grid`, `Tree`, `Circular`, `ForceDirected`, `LayeredDigraph`, `Spot`
- Model: `mergeChanges`, incremental JSON, validación
- Export: PNG (`makeImage`), SVG (`makeSvg`), print
- Navegación de grafo: `findLinksInto/OutOf`, `findNodesInto/OutOf`, tree helpers

## Diferencias conocidas

| GoJS | GraphoJS |
|------|----------|
| Cientos de figuras Shape | ~70 figuras comunes + símbolos de flowchart |
| `Shape.geometryString` completo | Soporta M/L/H/V/C/S/Q/T/A/Z |
| Licensed (proprietary) | MIT |
| `Part` IS a `GraphObject` | `Part` tiene un `panel` (árbol visual) |
| Templates de palette en `go.*` | En el subpath lazy `graphojs/templates` |

## Migración

Ver [Migración](/guide/migration/) para la guía paso a paso de `gojs` → `graphojs`.
