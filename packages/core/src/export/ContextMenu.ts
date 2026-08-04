import type { Diagram } from '../diagram/Diagram.ts';
import type { Part } from '../parts/Part.ts';

export interface ContextMenuItem {
  /** The label text. */
  label: string;
  /** Callback when the item is clicked. */
  action: (diagram: Diagram, part: Part | null, event: MouseEvent) => void;
  /** Whether the item is enabled. */
  enabled?: boolean;
  /** Whether the item is visible. */
  visible?: boolean;
  /** Optional separator after this item. */
  separator?: boolean;
  /** CSS class for custom styling. */
  className?: string;
}

export interface ContextMenuOptions {
  /** Items shown when a part is right-clicked. */
  partItems: ContextMenuItem[];
  /** Items shown when the background is right-clicked. */
  backgroundItems?: ContextMenuItem[];
  /** Whether to show the default context menu items. */
  showDefaults?: boolean;
}

/**
 * A context menu for a diagram.
 * Right-clicking on a part or the background opens a menu with items.
 */
export class ContextMenu {
  private element: HTMLDivElement;
  private diagram: Diagram;
  private _onDocClick: () => void = () => {};
  private _onDocKey: (e: KeyboardEvent) => void = () => {};
  private _onResize: () => void = () => {};
  private options: ContextMenuOptions;
  private currentItems: ContextMenuItem[] = [];
  private currentPart: Part | null = null;
  private isOpen = false;

  constructor(diagram: Diagram, options: ContextMenuOptions) {
    this.diagram = diagram;
    this.options = {
      showDefaults: true,
      ...options,
    };

    this.element = document.createElement('div');
    this.element.className = 'graphojs-context-menu';
    this.element.style.cssText =
      'position:fixed;z-index:9999;display:none;min-width:160px;background:#fff;' +
      'border:1px solid #ccc;border-radius:4px;box-shadow:0 2px 10px rgba(0,0,0,0.2);' +
      'font-size:13px;color:#333;user-select:none;';
    document.body.appendChild(this.element);

    this.setupEvents();
  }

  /** Get the menu DOM element. */
  getElement(): HTMLDivElement {
    return this.element;
  }

  /** Check if the menu is open. */
  get isMenuOpen(): boolean {
    return this.isOpen;
  }

  /** Get the part the menu was opened on. */
  getMenuPart(): Part | null {
    return this.currentPart;
  }

  /** Set up event listeners. */
  private setupEvents(): void {
    // Close on outside click
    this._onDocClick = () => this.close();
    this._onDocKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.close();
    };
    this._onResize = () => this.close();
    document.addEventListener('click', this._onDocClick);
    document.addEventListener('keydown', this._onDocKey);
    window.addEventListener('resize', this._onResize);
  }

  /**
   * Open the context menu at a screen position.
   * @param x Screen X coordinate.
   * @param y Screen Y coordinate.
   * @param part The part that was right-clicked, or null for background.
   */
  open(x: number, y: number, part: Part | null): void {
    this.currentPart = part;
    this.currentItems = this.buildItems(part);
    this.renderItems(this.currentItems);

    this.element.style.display = 'block';
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;

    // Keep menu within viewport
    const rect = this.element.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (rect.right > vw) {
      this.element.style.left = `${Math.max(0, x - rect.width)}px`;
    }
    if (rect.bottom > vh) {
      this.element.style.top = `${Math.max(0, y - rect.height)}px`;
    }

    this.isOpen = true;
  }

  /** Close the context menu. */
  close(): void {
    if (!this.isOpen) return;
    this.element.style.display = 'none';
    this.isOpen = false;
    this.currentPart = null;
    this.currentItems = [];
  }

  /** Build the menu items for a part. */
  private buildItems(part: Part | null): ContextMenuItem[] {
    const items: ContextMenuItem[] = [];

    // Part-specific items
    if (part) {
      for (const item of this.options.partItems) {
        if (item.visible === false) continue;
        items.push(item);
      }
    } else {
      for (const item of this.options.backgroundItems ?? []) {
        if (item.visible === false) continue;
        items.push(item);
      }
    }

    // Default items
    if (this.options.showDefaults) {
      if (items.length > 0) {
        items.push({ label: '---', action: () => {}, enabled: false, className: 'separator' });
      }
      items.push({ label: 'Zoom In', action: () => this.zoomIn() });
      items.push({ label: 'Zoom Out', action: () => this.zoomOut() });
      items.push({ label: 'Zoom to Fit', action: () => this.zoomToFit() });
    }

    return items;
  }

  private zoomIn(): void {
    const viewport = this.diagram.getViewport();
    this.diagram.setViewport(viewport.x, viewport.y, viewport.scale * 1.2);
  }

  private zoomOut(): void {
    const viewport = this.diagram.getViewport();
    this.diagram.setViewport(viewport.x, viewport.y, viewport.scale / 1.2);
  }

  private zoomToFit(): void {
    this.diagram.zoomToFit();
  }

  /** Render the items into the menu element. */
  private renderItems(items: ContextMenuItem[]): void {
    this.element.innerHTML = '';

    for (const item of items) {
      if (item.label === '---') {
        const separator = document.createElement('div');
        separator.className = 'graphojs-context-menu-separator';
        separator.style.cssText = 'border-top:1px solid #e0e0e0;margin:4px 0;';
        this.element.appendChild(separator);
        continue;
      }

      const button = document.createElement('div');
      button.className = `graphojs-context-menu-item ${item.className ?? ''}`.trim();
      button.textContent = item.label;
      button.style.cssText = 'padding:8px 14px;cursor:pointer;white-space:nowrap;';

      if (item.enabled === false) {
        button.style.color = '#aaa';
        button.style.cursor = 'default';
      } else {
        button.addEventListener('mouseenter', () => {
          button.style.background = '#f0f0f0';
        });
        button.addEventListener('mouseleave', () => {
          button.style.background = 'transparent';
        });
        button.addEventListener('click', (e) => {
          item.action(this.diagram, this.currentPart, e);
          this.close();
        });
      }

      this.element.appendChild(button);
    }
  }

  /** Handle a right-click (contextmenu) event. */
  handleContextMenu(e: MouseEvent): void {
    e.preventDefault();
    const point = this.diagram.getDiagramPoint(e);
    const part = this.diagram.findPartAt(point.x, point.y);
    this.open(e.clientX, e.clientY, part);
  }

  /** Destroy the context menu and clean up. */
  destroy(): void {
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('keydown', this._onDocKey);
    window.removeEventListener('resize', this._onResize);
    this.element.remove();
  }
}

/** Create a default context menu for a diagram. */
export function createDefaultContextMenu(
  diagram: Diagram,
  options?: {
    partItems?: ContextMenuItem[];
    backgroundItems?: ContextMenuItem[];
    showDefaults?: boolean;
  },
): ContextMenu {
  return new ContextMenu(diagram, {
    partItems: options?.partItems ?? [],
    backgroundItems: options?.backgroundItems ?? [],
    showDefaults: options?.showDefaults ?? true,
  });
}
