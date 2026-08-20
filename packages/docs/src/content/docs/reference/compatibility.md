---
title: Compatibilidad
description: Superficie de compatibilidad de GraphoJS con GoJS.
---

GraphoJS implementa la superficie de compatibilidad de GoJS. A continuación el
resumen de lo que está soportado. Para el detalle completo de cada clase,
método y propiedad, consulta la [referencia de API](/reference/api/), generada
directamente desde el código fuente. Cubre los 5 subpaths públicos
(`graphojs`, `graphojs/go`, `graphojs/templates`, `graphojs/react`,
`graphojs/vue`) — nota que `graphojs/go` reexporta las mismas clases que
`graphojs` bajo el namespace `go.*` (hoy no hay nada exclusivo de
`graphojs/go`), así que su página de referencia se verá escasa; para las
clases reales (`go.Diagram`, `go.Node`, ...) consulta directamente la
página de `graphojs`.

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
- Guías de alineación al arrastrar al estilo `GuidedDraggingTool`:
  `draggingTool.isGuidedDraggingEnabled` / `guidelineSnapDistance`
- `diagram.print()` imprime como SVG vectorial por defecto (PDF vectorial al
  "Guardar como PDF"); `format: 'png'` para el PNG rasterizado clásico
- Import/export GraphML (sin equivalente directo en GoJS):
  `go.Serializer.serializeToGraphML` / `deserializeFromGraphML`
- Renderizado en servidor con un canvas de Node opcional (`renderDiagramToCanvas`),
  sin equivalente en GoJS (solo DOM/navegador)
- Accesibilidad del canvas (ARIA, región `aria-live`, cursor de foco por
  teclado) — sin equivalente en GoJS

## Extensiones estilo GoJS (fuera de `go.*`)

**Decisión de diseño, válida para 1.0.0 y en adelante**: al igual que en GoJS
real (donde viven en el paquete separado `gojs/extensions`, no en el núcleo),
estos widgets/herramientas se importan desde `graphojs` directamente — **no**
desde `graphojs/go` — y seguirán así de forma permanente. No es un olvido ni
algo pendiente de "promocionar" a `go.*`; es la superficie GoJS-compatible
correcta:

- `TreeExpanderButton` / `PanelExpanderButton` — botones de colapso/expansión
  para plantillas de nodo (ver [Árboles](/guide/tree/) y
  [Templates](/guide/templates/)).
- `LinkLabelDraggingTool` — arrastra la etiqueta de un enlace
  (`link.labelSegmentIndex` / `labelSegmentFraction` / `labelOffset`).

Si en el futuro GraphoJS añade más utilidades de este estilo (paneles
inspirados en otras extensiones de GoJS), la misma regla aplica: se exponen
desde `graphojs`, y `go.*` se queda como un espejo fiel del núcleo real de
GoJS.

## Superficie experimental

La mayoría de lo listado arriba se considera estable de cara a 1.0.0. Estas
piezas son más recientes, no tienen precedente real en GoJS que copiar, y su
forma concreta (opciones, valores por defecto, incluso nombres) puede seguir
cambiando antes de 1.0.0 — no se eliminarán sin un ciclo de deprecación, pero
tampoco hay garantía de estabilidad total todavía. Están marcadas con
`@experimental` en su JSDoc:

- `renderDiagramToCanvas` / `measureDiagramContent` (renderizado en servidor)
  — falta validación con uso real más allá de los tests de este repo.
- `Serializer.serializeToGraphML` / `deserializeFromGraphML` /
  `exportToGraphMLFile` / `importFromGraphMLFile` — formato de intercambio
  propio de GraphoJS (GraphML no tiene equivalente en la API de GoJS), las
  heurísticas de tipo/coerción de claves numéricas podrían refinarse.
- `AccessibilityMessages` / `diagram.accessibilityMessages` — ya cubre
  selección/foco, deshacer/rehacer, añadir/borrar y colapsar/expandir árbol;
  podría seguir creciendo antes de 1.0.0, pero los cambios serán aditivos,
  no rupturas.
- `Diagram.selectionStyle` / `DiagramOptions.selectionStyle` — colores de
  selección/foco, con detección automática de `prefers-contrast: more` /
  `forced-colors: active`; la forma concreta podría afinarse antes de
  1.0.0.

## Diferencias conocidas

| GoJS | GraphoJS |
|------|----------|
| Cientos de figuras Shape | 77 figuras comunes + símbolos de flowchart/BPMN/UML |
| `Shape.geometryString` completo | Soporta M/L/H/V/C/S/Q/T/A/Z |
| Licensed (proprietary) | MIT |
| `Part` IS a `GraphObject` | `Part` tiene un `panel` (árbol visual) |
| Templates de palette en `go.*` | En el subpath lazy `graphojs/templates` |

## Migración

Ver [Migración](/guide/migration/) para la guía paso a paso de `gojs` → `graphojs`.
