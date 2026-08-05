---
title: API
description: Referencia rápida de la API de GraphoJS.
---

La API de GraphoJS es compatible con GoJS. Los exports principales están en el
namespace `go` (import `graphojs/go`).

## Núcleo

- `go.Diagram` — el lienzo interactivo.
- `go.GraphLinksModel` / `go.TreeModel` — los datos.
- `go.Node`, `go.Link`, `go.Group`, `go.Part` — los objetos visuales.
- `go.Panel`, `go.Shape`, `go.TextBlock`, `go.Picture` — elementos del template.
- `go.GraphObject.make` (alias `$`) — construcción declarativa.

## Geometría

- `go.Point`, `go.Rect`, `go.Size`, `go.Margin`, `go.Spot`.

## Layouts

- `go.GridLayout`, `go.TreeLayout`, `go.CircularLayout`,
  `go.ForceDirectedLayout`, `go.LayeredDigraphLayout`, `go.SpotLayout`.

## Herramientas y comandos

- `go.CommandHandler`, `go.ToolManager` y las tools (`go.DraggingTool`,
  `go.LinkingTool`, etc.).

## Export

- `diagram.makeImage()`, `diagram.makeSvg()`, `diagram.print()`.

Para una lista completa de la superficie compatible, consulta
[Compatibility](/reference/compatibility/).
