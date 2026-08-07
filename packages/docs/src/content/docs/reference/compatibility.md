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
- `nodeTemplate` / `linkTemplate` / `groupTemplate` / `nodeTemplateMap` / `linkTemplateMap` / `groupTemplateMap`
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
- Widgets de extensión al estilo GoJS: `TreeExpanderButton`, `PanelExpanderButton`
  (se importan desde `graphojs`, no desde `graphojs/go` — igual que en GoJS)
- Guías de alineación al arrastrar al estilo `GuidedDraggingTool`:
  `draggingTool.isGuidedDraggingEnabled` / `guidelineSnapDistance`
- Arrastre de etiquetas de enlace al estilo `LinkLabelDraggingTool`:
  `link.labelSegmentIndex` / `labelSegmentFraction` / `labelOffset`
- `diagram.print()` imprime como SVG vectorial por defecto (PDF vectorial al
  "Guardar como PDF"); `format: 'png'` para el PNG rasterizado clásico
- Import/export GraphML (sin equivalente directo en GoJS):
  `go.Serializer.serializeToGraphML` / `deserializeFromGraphML`
- Renderizado en servidor con un canvas de Node opcional (`renderDiagramToCanvas`),
  sin equivalente en GoJS (solo DOM/navegador)
- Accesibilidad del canvas (ARIA, región `aria-live`, cursor de foco por
  teclado) — sin equivalente en GoJS

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
