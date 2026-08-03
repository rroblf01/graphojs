import { Tool } from './Tool.ts';

/**
 * Tool for panning the diagram view.
 */
export class PanningTool extends Tool {
  private isPanning = false;
  private panStartX = 0;
  private panStartY = 0;
  private panOffsetX = 0;
  private panOffsetY = 0;

  override doActivate(): void {
    super.doActivate();
    const canvas = this.diagram?.getRenderer().getCanvas();
    if (canvas) canvas.style.cursor = 'grab';
  }

  override doDeactivate(): void {
    this.isPanning = false;
    const canvas = this.diagram?.getRenderer().getCanvas();
    if (canvas) canvas.style.cursor = 'default';
    super.doDeactivate();
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      this.isPanning = true;
      this.panStartX = e.clientX;
      this.panStartY = e.clientY;

      const viewport = this.diagram?.getViewport();
      if (viewport) {
        this.panOffsetX = viewport.x;
        this.panOffsetY = viewport.y;
      }

      const canvas = this.diagram?.getRenderer().getCanvas();
      if (canvas) canvas.style.cursor = 'grabbing';
    }
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this.isPanning || !this.diagram) return;

    const viewport = this.diagram.getViewport();
    const dx = (e.clientX - this.panStartX) / viewport.scale;
    const dy = (e.clientY - this.panStartY) / viewport.scale;

    this.diagram.setViewport(this.panOffsetX - dx, this.panOffsetY - dy);
  }

  override doMouseUp(_e: MouseEvent): void {
    this.isPanning = false;
    const canvas = this.diagram?.getRenderer().getCanvas();
    if (canvas) canvas.style.cursor = 'default';
  }
}
