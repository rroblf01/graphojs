import { Tool } from './Tool.ts';

/**
 * Tool for zooming the diagram view.
 */
export class ZoomingTool extends Tool {
  private minScale = 0.1;
  private maxScale = 10;

  constructor(minScale = 0.1, maxScale = 10) {
    super();
    this.minScale = minScale;
    this.maxScale = maxScale;
  }

  override doMouseWheel(e: WheelEvent): void {
    const diagram = this.diagram;
    if (!diagram) return;
    // GoJS-compatible: respect allowZoom
    if (diagram.allowZoom === false) return;
    e.preventDefault();

    const canvas = diagram.getRenderer().getCanvas();
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const viewport = diagram.getViewport();
    const scale = viewport.scale;

    // Calculate diagram coordinates before zoom
    const diagramX = mouseX / scale + viewport.x;
    const diagramY = mouseY / scale + viewport.y;

    // Apply zoom (use the diagram's configured min/max scale)
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const minScale = diagram.minScale;
    const maxScale = diagram.maxScale;
    const newScale = Math.max(minScale, Math.min(maxScale, scale * zoomFactor));

    // Adjust offset to keep mouse position fixed
    const newX = diagramX - mouseX / newScale;
    const newY = diagramY - mouseY / newScale;

    diagram.setViewport(newX, newY, newScale);
  }
}
