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
  private _panSpeed = 1;

  /** GoJS-compatible: Multiplier for panning speed. */
  get panSpeed(): number {
    return this._panSpeed;
  }

  set panSpeed(value: number) {
    this._panSpeed = value;
  }

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

  /** GoJS-compatible: start panning on middle-button or shift+left drag. */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    return e.button === 1 || (e.button === 0 && e.shiftKey);
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
    const dx = ((e.clientX - this.panStartX) / viewport.scale) * this._panSpeed;
    const dy = ((e.clientY - this.panStartY) / viewport.scale) * this._panSpeed;

    // GoJS-compatible: allowHorizontalScroll/allowVerticalScroll lock that axis.
    const newX = this.diagram.allowHorizontalScroll ? this.panOffsetX - dx : this.panOffsetX;
    const newY = this.diagram.allowVerticalScroll ? this.panOffsetY - dy : this.panOffsetY;

    this.diagram.setViewport(newX, newY);
  }

  override doMouseUp(_e: MouseEvent): void {
    this.isPanning = false;
    const canvas = this.diagram?.getRenderer().getCanvas();
    if (canvas) canvas.style.cursor = 'default';
  }
}
