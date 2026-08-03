import type { Diagram } from '../diagram/Diagram.ts';
import type { Part } from '../parts/Part.ts';

export interface TooltipOptions {
  /** Delay in ms before showing the tooltip. Default: 500 */
  delay?: number;
  /** Gap in pixels from the mouse to the tooltip. Default: 10 */
  offset?: number;
  /** Custom CSS styles for the tooltip element. */
  style?: string;
}

/**
 * Shows HTML tooltips for parts when hovering over them.
 * A part shows its tooltip when it has a non-empty `tooltip` text.
 */
export class TooltipManager {
  private element: HTMLDivElement;
  private diagram: Diagram;
  private options: Required<TooltipOptions>;
  private currentPart: Part | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private isVisible = false;

  constructor(diagram: Diagram, options: TooltipOptions = {}) {
    this.diagram = diagram;
    this.options = {
      delay: options.delay ?? 500,
      offset: options.offset ?? 10,
      style:
        options.style ??
        'padding:6px 10px;background:#333;color:#fff;border-radius:4px;' +
          'font-size:12px;max-width:240px;box-shadow:0 2px 8px rgba(0,0,0,0.3);',
    };

    this.element = document.createElement('div');
    this.element.className = 'graphojs-tooltip';
    this.element.style.cssText = `position:fixed;z-index:10001;display:none;pointer-events:none;${this.options.style}`;
    document.body.appendChild(this.element);
  }

  /** Get the tooltip DOM element. */
  getElement(): HTMLDivElement {
    return this.element;
  }

  /** Get the part currently showing a tooltip, or null. */
  getCurrentPart(): Part | null {
    return this.currentPart;
  }

  /** Check whether a tooltip is currently visible. */
  get isTooltipVisible(): boolean {
    return this.isVisible;
  }

  /**
   * Called on mouse move: decides whether to show a tooltip for the
   * part under the cursor.
   */
  handleMouseMove(e: MouseEvent): void {
    const point = this.diagram.getDiagramPoint(e);
    const part = this.diagram.findPartAt(point.x, point.y);

    if (part === this.currentPart && this.isVisible) {
      // Update position while hovering the same part
      this.position(e);
      return;
    }

    if (part === this.currentPart) {
      return; // Same part, tooltip not yet shown (waiting for delay)
    }

    // Part changed or moved off
    this.hide();
    this.currentPart = part;

    if (part?.tooltip) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show(e);
      }, this.options.delay);
    }
  }

  /** Called when the mouse leaves the canvas. */
  handleMouseLeave(): void {
    this.hide();
  }

  private show(e: MouseEvent): void {
    const part = this.currentPart;
    if (!part?.tooltip) return;

    this.element.textContent = part.tooltip;
    this.element.style.display = 'block';
    this.position(e);
    this.isVisible = true;
    part.tooltipVisible = true;
  }

  private position(e: MouseEvent): void {
    this.element.style.left = `${e.clientX + this.options.offset}px`;
    this.element.style.top = `${e.clientY + this.options.offset}px`;

    // Keep within viewport
    const rect = this.element.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      this.element.style.left = `${e.clientX - rect.width - this.options.offset}px`;
    }
    if (rect.bottom > window.innerHeight) {
      this.element.style.top = `${e.clientY - rect.height - this.options.offset}px`;
    }
  }

  /** Hide the tooltip. */
  hide(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.currentPart) {
      this.currentPart.tooltipVisible = false;
    }
    if (this.isVisible) {
      this.element.style.display = 'none';
    }
    this.isVisible = false;
    this.currentPart = null;
  }

  /** Destroy the tooltip manager. */
  destroy(): void {
    this.hide();
    this.element.remove();
  }
}

/** Create a tooltip manager for a diagram. */
export function createTooltipManager(diagram: Diagram, options?: TooltipOptions): TooltipManager {
  return new TooltipManager(diagram, options);
}
