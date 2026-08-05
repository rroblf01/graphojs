---
title: Diagrama
description: El lienzo Diagram, viewport, zoom, árboles y navegación.
---

`go.Diagram` es el lienzo interactivo. Se crea sobre un elemento del DOM:

```js
const diagram = new go.Diagram('mi-div');
```

## Viewport y zoom

- `diagram.scale` / `diagram.zoomFactor` — nivel de zoom
- `diagram.position` / `diagram.scrollMode` — desplazamiento
- `diagram.zoomToFit()`, `diagram.zoomToRect(r)`, `diagram.centerRect(r)`
- `diagram.minScale` / `diagram.maxScale`

## Modelo

Asigna `diagram.model = new go.GraphLinksModel({ nodeDataArray, linkDataArray })`.
Los cambios al modelo se reflejan automáticamente.

## Navegación de grafo

- `diagram.findNodeForKey(key)` / `findLinkForKey(key)` / `findPartForKey(key)`
- `diagram.nodes` / `diagram.links` / `diagram.groups` (iterables)
- `node.findLinksInto()`, `node.findNodesOutOf()`, `node.findTreeChildrenNodes()`

## Árboles

Para estructuras jerárquicas, usa `TreeModel` (con `parent` en los datos) o
nodos con campo `parent` en `GraphLinksModel`:

```js
diagram.findTreeRoots();   // nodos sin padre
diagram.findTreeChildren(node);
diagram.findTreeParent(node);
```

## Eventos

`addDiagramListener('SelectionChanged', handler)` — hay ~30 tipos de eventos
(`ObjectSingleClicked`, `PartMoved`, `LinkDrawn`, `LayoutCompleted`, ...).
