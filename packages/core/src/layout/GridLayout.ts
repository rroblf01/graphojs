import type { Link } from '../parts/Link.ts';
import type { Node } from '../parts/Node.ts';
import { Layout, type LayoutOptions } from './Layout.ts';

/**
 * Options for grid layout.
 */
export interface GridLayoutOptions extends LayoutOptions {
  /** Number of columns. If not set, calculated from node count and rows. */
  columns?: number;
  /** Number of rows. If not set, calculated from node count and columns. */
  rows?: number;
  /** Horizontal spacing between cells. Default: 20 */
  spacingX?: number;
  /** Vertical spacing between cells. Default: 20 */
  spacingY?: number;
  /** Starting position. Default: { x: 0, y: 0 } */
  startingPosition?: { x: number; y: number };
}

/**
 * Grid layout arranges nodes in a grid pattern.
 */
export class GridLayout extends Layout {
  private columns: number | undefined;
  private rows: number | undefined;
  private spacingX: number;
  private spacingY: number;
  private startingPosition: { x: number; y: number };

  constructor(options: GridLayoutOptions = {}) {
    super(options);
    this.columns = options.columns;
    this.rows = options.rows;
    this.spacingX = options.spacingX ?? 20;
    this.spacingY = options.spacingY ?? 20;
    this.startingPosition = options.startingPosition ?? { x: 0, y: 0 };
  }

  /** GoJS-compatible: Horizontal spacing between cells. */
  get columnSpacing(): number {
    return this.spacingX;
  }

  set columnSpacing(value: number) {
    this.spacingX = value;
  }

  /** GoJS-compatible: Vertical spacing between cells. */
  get rowSpacing(): number {
    return this.spacingY;
  }

  set rowSpacing(value: number) {
    this.spacingY = value;
  }

  private _wrappingWidth = Infinity;

  /** GoJS-compatible: The maximum width of a row of cells before wrapping. */
  get wrappingWidth(): number {
    return this._wrappingWidth;
  }

  set wrappingWidth(value: number) {
    this._wrappingWidth = value;
  }

  override apply(nodes: Node[], _links: Link[]): void {
    if (nodes.length === 0) return;

    const cols = this.columns ?? Math.ceil(Math.sqrt(nodes.length));

    // Calculate cell size (max node dimensions)
    let cellWidth = 0;
    let cellHeight = 0;
    for (const node of nodes) {
      cellWidth = Math.max(cellWidth, node.bounds.width);
      cellHeight = Math.max(cellHeight, node.bounds.height);
    }

    const totalCellWidth = cellWidth + this.spacingX;
    const totalCellHeight = cellHeight + this.spacingY;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (!node) continue;

      const col = i % cols;
      const row = Math.floor(i / cols);

      const targetX = this.startingPosition.x + col * totalCellWidth;
      const targetY = this.startingPosition.y + row * totalCellHeight;

      const dx = targetX - node.bounds.x;
      const dy = targetY - node.bounds.y;
      node.bounds = node.bounds.offset(dx, dy);
    }

    if (this.center) {
      this.centerLayout(nodes);
    }
  }
}
