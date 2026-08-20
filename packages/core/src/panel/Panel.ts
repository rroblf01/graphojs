import type { Margin } from '../geometry/Margin.ts';
import type { Rect } from '../geometry/Rect.ts';
import type { Size } from '../geometry/Size.ts';
import { Size as SizeClass } from '../geometry/Size.ts';
import { Spot } from '../geometry/Spot.ts';
import { GraphObject } from './GraphObject.ts';
import { Shape } from './Shape.ts';

/**
 * Panel layout types (mirrors GoJS panel types).
 */
export type PanelType =
  | 'Auto'
  | 'Table'
  | 'Spot'
  | 'Vertical'
  | 'Horizontal'
  | 'Viewbox'
  | 'Position';

/**
 * A Panel is a GraphObject that contains and lays out other GraphObjects.
 */
export class Panel extends GraphObject {
  // GoJS-compatible panel type constants
  static readonly Auto = 'Auto';
  static readonly Vertical = 'Vertical';
  static readonly Horizontal = 'Horizontal';
  static readonly Spot = 'Spot';
  static readonly Table = 'Table';
  static readonly Viewbox = 'Viewbox';
  static readonly Position = 'Position';

  private _type: PanelType;
  private _elements: GraphObject[] = [];
  private _padding: Margin | null = null;
  private _spacing = 0;
  private _background: string | null = null;
  private _rowCount = 0;
  private _columnCount = 0;
  private _gradient: CanvasGradient | null = null;

  /** GoJS-compatible: Explicit row heights for Table panels (in the panel's coordinate space). */
  rowDefinitions: Array<{ height?: number; separatorStrokeWidth?: number }> = [];
  /** GoJS-compatible: Explicit column widths for Table panels. */
  columnDefinitions: Array<{ width?: number; separatorStrokeWidth?: number }> = [];

  // GoJS-compatible data panels
  private _itemArray: unknown[] = [];
  private _itemTemplate: GraphObject | null = null;
  private _generatedItems: GraphObject[] = [];

  /**
   * Extra properties to apply to the created part when this panel is used
   * as a node/link/group template (e.g. link routing, corner, arrowhead).
   */
  templateProperties: Record<string, unknown> = {};

  /** The data object most recently applied to this panel (for ofObject("parent")). */
  data: import('../model/Model.ts').NodeData | null = null;

  constructor(type: PanelType = 'Auto') {
    super();
    this._type = type;
  }

  /** GoJS-compatible: The data array used to generate item elements. */
  get itemArray(): readonly unknown[] {
    return this._itemArray;
  }

  set itemArray(value: unknown[]) {
    this._itemArray = value;
    this.updateItems();
  }

  /** GoJS-compatible: The template used to create one element per item. */
  get itemTemplate(): GraphObject | null {
    return this._itemTemplate;
  }

  set itemTemplate(value: GraphObject | null) {
    this._itemTemplate = value;
    this.updateItems();
  }

  /** Rebuild the item-generated child elements from itemArray + itemTemplate. */
  private updateItems(): void {
    // Remove previously generated items
    for (const gen of this._generatedItems) {
      this.remove(gen);
    }
    this._generatedItems = [];

    const template = this._itemTemplate;
    if (!template || this._itemArray.length === 0) return;

    for (const item of this._itemArray) {
      const el = template.clone();
      el.parentPanel = this;
      // Apply bindings using the item as the data source
      if (typeof item === 'object' && item !== null) {
        el.applyBindings(item as import('../model/Model.ts').NodeData);
      }
      this._elements.push(el);
      this._generatedItems.push(el);
    }
    this.recountGrid();
  }

  /** Apply bindings to generated item elements using each item's data. */
  private applyItemBindings(): void {
    const template = this._itemTemplate;
    if (!template) return;
    for (let i = 0; i < this._generatedItems.length && i < this._itemArray.length; i++) {
      const el = this._generatedItems[i];
      const item = this._itemArray[i];
      if (el && typeof item === 'object' && item !== null) {
        el.applyBindings(item as import('../model/Model.ts').NodeData);
      }
    }
  }

  get type(): PanelType {
    return this._type;
  }

  set type(value: PanelType) {
    this._type = value;
  }

  /** The elements contained in this panel. */
  get elements(): readonly GraphObject[] {
    return this._elements;
  }

  /** The number of elements in this panel. */
  get elementCount(): number {
    return this._elements.length;
  }

  /** The padding of this panel. */
  get padding(): Margin | null {
    return this._padding;
  }

  set padding(value: Margin | null) {
    this._padding = value;
  }

  /** The spacing between elements (for Vertical/Horizontal panels). */
  get spacing(): number {
    return this._spacing;
  }

  set spacing(value: number) {
    this._spacing = value;
  }

  /** The background color of this panel. */
  get background(): string | null {
    return this._background;
  }

  set background(value: string | null) {
    this._background = value;
  }

  /** A canvas gradient used as the background. */
  get gradient(): CanvasGradient | null {
    return this._gradient;
  }

  set gradient(value: CanvasGradient | null) {
    this._gradient = value;
  }

  /** The number of rows (for Table panels). */
  get rowCount(): number {
    return this._rowCount;
  }

  /** The number of columns (for Table panels). */
  get columnCount(): number {
    return this._columnCount;
  }

  /** Add an element to this panel. */
  add(element: GraphObject): this {
    element.parentPanel = this;
    this._elements.push(element);
    this.recountGrid();
    return this;
  }

  private _separators: GraphObject[] = [];

  /** GoJS-compatible: Add a visual separator element to this panel. */
  addSeparator(separator?: GraphObject): GraphObject {
    const sep = separator ?? this.createSeparator();
    this._separators.push(sep);
    this._elements.push(sep);
    this.recountGrid();
    return sep;
  }

  /** Create a default vertical/horizontal separator line. */
  private createSeparator(): GraphObject {
    const line = new Shape('Line');
    line.stroke = '#cccccc';
    line.strokeWidth = 1;
    line.desiredSize = new SizeClass(1, 20);
    return line;
  }

  /** GoJS-compatible: The separators added to this panel. */
  get separators(): readonly GraphObject[] {
    return this._separators;
  }

  private _defaultAlignment: { x: number; y: number } | null = null;

  /** GoJS-compatible: The default alignment for elements in Spot panels. */
  get defaultAlignment(): { x: number; y: number } | null {
    return this._defaultAlignment;
  }

  set defaultAlignment(value: { x: number; y: number } | null) {
    this._defaultAlignment = value;
  }

  /** GoJS-compatible: Insert an element at a specific index. */
  insertAt(index: number, element: GraphObject): this {
    element.parentPanel = this;
    this._elements.splice(index, 0, element);
    this.recountGrid();
    return this;
  }

  /** Remove an element from this panel. */
  remove(element: GraphObject): boolean {
    const index = this._elements.indexOf(element);
    if (index === -1) return false;
    this._elements.splice(index, 1);
    this.recountGrid();
    return true;
  }

  /** Remove all elements. */
  clear(): void {
    this._elements = [];
    this._rowCount = 0;
    this._columnCount = 0;
  }

  /** Check if an element is in this panel. */
  contains(element: GraphObject): boolean {
    return this._elements.includes(element);
  }

  /** Fluent add of an element. */
  append(element: GraphObject): this {
    return this.add(element);
  }

  /** Fluent setter for padding. */
  setPadding(value: Margin | null): this {
    this._padding = value;
    return this;
  }

  /** Fluent setter for spacing. */
  setSpacing(value: number): this {
    this._spacing = value;
    return this;
  }

  /** Fluent setter for background. */
  setBackground(value: string | null): this {
    this._background = value;
    return this;
  }

  private recountGrid(): void {
    if (this._type !== 'Table') return;
    let rows = 0;
    let cols = 0;
    for (const el of this._elements) {
      const data = el as GraphObject & {
        row?: number;
        column?: number;
        rowSpan?: number;
        columnSpan?: number;
      };
      if (data.row !== undefined) rows = Math.max(rows, data.row + Math.max(1, data.rowSpan ?? 1));
      if (data.column !== undefined) {
        cols = Math.max(cols, data.column + Math.max(1, data.columnSpan ?? 1));
      }
    }
    this._rowCount = rows;
    this._columnCount = cols;
  }

  /** Get the first element of this panel (used by Auto panels as background). */
  get mainElement(): GraphObject | null {
    return this._elements[0] ?? null;
  }

  override measure(): Size {
    const size = this.measurePanel();
    if (this.width > 0) size.width = this.width;
    if (this.height > 0) size.height = this.height;
    return size;
  }

  private measurePanel(): Size {
    const pad = this._padding;
    const padW = pad ? pad.left + pad.right : 0;
    const padH = pad ? pad.top + pad.bottom : 0;

    switch (this._type) {
      case 'Vertical':
      case 'Horizontal':
        return this.measureStack(padW, padH);
      case 'Auto': {
        const main = this.mainElement;
        if (!main) return new SizeClass(padW, padH);
        const s = main.measureWithMargin();
        return new SizeClass(s.width + padW, s.height + padH);
      }
      case 'Viewbox': {
        const main = this.mainElement;
        if (!main) return new SizeClass(padW, padH);
        const s = main.measureWithMargin();
        return new SizeClass(s.width + padW, s.height + padH);
      }
      case 'Position': {
        let maxW = 0;
        let maxH = 0;
        for (const el of this._elements) {
          const pos = (el as GraphObject & { position?: { x: number; y: number } }).position;
          const s = el.measureWithMargin();
          maxW = Math.max(maxW, (pos?.x ?? 0) + s.width);
          maxH = Math.max(maxH, (pos?.y ?? 0) + s.height);
        }
        return new SizeClass(maxW + padW, maxH + padH);
      }
      case 'Spot': {
        let maxW = 0;
        let maxH = 0;
        for (const el of this._elements) {
          const s = el.measureWithMargin();
          maxW = Math.max(maxW, s.width);
          maxH = Math.max(maxH, s.height);
        }
        return new SizeClass(maxW + padW, maxH + padH);
      }
      case 'Table':
        return this.measureTable(padW, padH);
      default:
        return new SizeClass(padW, padH);
    }
  }

  private measureStack(padW: number, padH: number): Size {
    let maxCross = 0;
    let totalMain = 0;
    const vertical = this._type === 'Vertical';

    for (const el of this._elements) {
      const s = el.measureWithMargin();
      if (vertical) {
        maxCross = Math.max(maxCross, s.width);
        totalMain += s.height;
      } else {
        maxCross = Math.max(maxCross, s.height);
        totalMain += s.width;
      }
    }

    const spacingTotal =
      this._elements.length > 1 ? this._spacing * (this._elements.length - 1) : 0;
    const main = totalMain + spacingTotal;

    if (vertical) {
      return new SizeClass(maxCross + padW, main + padH);
    }
    return new SizeClass(main + padW, maxCross + padH);
  }

  private measureTable(padW: number, padH: number): Size {
    // Compute max width per column and max height per row
    const colWidths = new Array<number>(this._columnCount).fill(0);
    const rowHeights = new Array<number>(this._rowCount).fill(0);

    for (const el of this._elements) {
      const data = el as GraphObject & {
        row?: number;
        column?: number;
        rowSpan?: number;
        columnSpan?: number;
      };
      const row = data.row ?? 0;
      const col = data.column ?? 0;
      const rowSpan = Math.max(1, data.rowSpan ?? 1);
      const colSpan = Math.max(1, data.columnSpan ?? 1);
      const s = el.measureWithMargin();
      // Honor explicit columnDefinitions/rowDefinitions widths/heights. A
      // spanning element's size is satisfied by the sum across its span
      // (computed at layout time), not by inflating a single column/row.
      if (colSpan === 1 && col >= 0 && col < colWidths.length) {
        const def = this.columnDefinitions[col];
        colWidths[col] = Math.max(colWidths[col] ?? 0, def?.width ?? 0, s.width);
      }
      if (rowSpan === 1 && row >= 0 && row < rowHeights.length) {
        const def = this.rowDefinitions[row];
        rowHeights[row] = Math.max(rowHeights[row] ?? 0, def?.height ?? 0, s.height);
      }
    }

    const totalW = colWidths.reduce((a, b) => a + (b ?? 0), 0);
    const totalH = rowHeights.reduce((a, b) => a + (b ?? 0), 0);
    return new SizeClass(totalW + padW, totalH + padH);
  }

  override draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    ctx.save();

    // Background
    if (this._background) {
      ctx.fillStyle = this._background;
      ctx.fillRect(x, y, width, height);
    } else if (this._gradient) {
      ctx.fillStyle = this._gradient;
      ctx.fillRect(x, y, width, height);
    }

    // Layout elements
    this.layoutElements(ctx, x, y, width, height);

    ctx.restore();
  }

  private layoutElements(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const pad = this._padding;
    const padL = pad?.left ?? 0;
    const padT = pad?.top ?? 0;
    const padR = pad?.right ?? 0;
    const padB = pad?.bottom ?? 0;

    const contentX = x + padL;
    const contentY = y + padT;
    const contentW = width - padL - padR;
    const contentH = height - padT - padB;

    switch (this._type) {
      case 'Vertical':
      case 'Horizontal':
        this.layoutStack(ctx, contentX, contentY, contentW, contentH);
        break;
      case 'Auto':
        this.layoutAuto(ctx, contentX, contentY, contentW, contentH);
        break;
      case 'Spot':
        this.layoutSpot(ctx, contentX, contentY, contentW, contentH);
        break;
      case 'Viewbox':
        this.layoutViewbox(ctx, contentX, contentY, contentW, contentH);
        break;
      case 'Position':
        this.layoutPosition(ctx, contentX, contentY, contentW, contentH);
        break;
      case 'Table':
        this.layoutTable(ctx, contentX, contentY, contentW, contentH);
        break;
    }
  }

  private layoutStack(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const vertical = this._type === 'Vertical';

    // Total main size
    let totalMain = 0;
    for (const el of this._elements) {
      const s = el.measureWithMargin();
      totalMain += vertical ? s.height : s.width;
    }
    const spacingTotal =
      this._elements.length > 1 ? this._spacing * (this._elements.length - 1) : 0;

    // Start position (center within content area)
    let cursorMain = vertical
      ? y + (height - totalMain - spacingTotal) / 2
      : x + (width - totalMain - spacingTotal) / 2;

    for (const el of this._elements) {
      const s = el.measureWithMargin();
      const m = el.margin;
      const mTop = m?.top ?? 0;
      const mLeft = m?.left ?? 0;

      let elX: number;
      let elY: number;
      let elW: number;
      let elH: number;

      if (vertical) {
        elW = Math.min(s.width - (mLeft + (m?.right ?? 0)), width);
        elH = s.height - (mTop + (m?.bottom ?? 0));
        elX = x + (width - elW) / 2 + mLeft;
        elY = cursorMain + mTop;
      } else {
        elW = s.width - (mLeft + (m?.right ?? 0));
        elH = Math.min(s.height - (mTop + (m?.bottom ?? 0)), height);
        elX = cursorMain + mLeft;
        elY = y + (height - elH) / 2 + mTop;
      }

      el.setPosition(elX, elY);
      el.setActualSize(elW, elH);

      el.draw(ctx, elX, elY, elW, elH);

      cursorMain +=
        (vertical ? elH : elW) + (mTop + (vertical ? (m?.bottom ?? 0) : 0)) + this._spacing;
    }
  }

  /**
   * Inset an outer (margin-inflated) box down to its margined content box,
   * mirroring what layoutStack already does. Elements must be drawn at their
   * content box, not the outer box measureWithMargin() returns, or their
   * margin never actually creates visible inset space (e.g. a TextBlock's
   * left margin gets ignored and its first character clips).
   */
  private static marginBox(
    outerX: number,
    outerY: number,
    outerWidth: number,
    outerHeight: number,
    margin: Margin | null | undefined,
  ): { x: number; y: number; width: number; height: number } {
    const mTop = margin?.top ?? 0;
    const mRight = margin?.right ?? 0;
    const mBottom = margin?.bottom ?? 0;
    const mLeft = margin?.left ?? 0;
    return {
      x: outerX + mLeft,
      y: outerY + mTop,
      width: outerWidth - mLeft - mRight,
      height: outerHeight - mTop - mBottom,
    };
  }

  private layoutAuto(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    if (this._elements.length === 0) return;

    // First element is the background (fills the panel)
    const main = this._elements[0];
    if (!main) return;
    main.setPosition(x, y);
    main.setActualSize(width, height);
    main.draw(ctx, x, y, width, height);

    // Remaining elements are positioned at their alignment spot (default:
    // centered), at their natural size — same convention as Spot/Table cells.
    for (let i = 1; i < this._elements.length; i++) {
      const el = this._elements[i];
      if (!el) continue;
      const spot = el.alignment ?? Spot.Center;
      const s = el.measureWithMargin();
      const outerW = Math.min(s.width, width);
      const outerH = Math.min(s.height, height);
      const box = Panel.marginBox(
        x + (width - outerW) * spot.x,
        y + (height - outerH) * spot.y,
        outerW,
        outerH,
        el.margin,
      );
      el.setPosition(box.x, box.y);
      el.setActualSize(box.width, box.height);
      el.draw(ctx, box.x, box.y, box.width, box.height);
    }
  }

  private layoutSpot(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    for (const el of this._elements) {
      const s = el.measureWithMargin();
      const spot = el.alignment ?? Spot.Center;
      const point = spot.computePoint(x, y, width, height);
      const outerW = Math.min(s.width, width);
      const outerH = Math.min(s.height, height);
      const box = Panel.marginBox(
        point.x - outerW * spot.x,
        point.y - outerH * spot.y,
        outerW,
        outerH,
        el.margin,
      );
      el.setPosition(box.x, box.y);
      el.setActualSize(box.width, box.height);
      el.draw(ctx, box.x, box.y, box.width, box.height);
    }
  }

  private layoutViewbox(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    if (this._elements.length === 0) return;
    const main = this._elements[0];
    if (!main) return;
    main.setPosition(x, y);
    main.setActualSize(width, height);
    main.draw(ctx, x, y, width, height);
  }

  private layoutPosition(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    for (const el of this._elements) {
      const pos = (el as GraphObject & { position?: { x: number; y: number } }).position;
      const s = el.measureWithMargin();
      const outerW = Math.min(s.width, width);
      const outerH = Math.min(s.height, height);
      const box = Panel.marginBox(x + (pos?.x ?? 0), y + (pos?.y ?? 0), outerW, outerH, el.margin);
      el.setPosition(box.x, box.y);
      el.setActualSize(box.width, box.height);
      el.draw(ctx, box.x, box.y, box.width, box.height);
    }
  }

  private layoutTable(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    // Compute column widths and row heights
    const colWidths = new Array<number>(Math.max(1, this._columnCount)).fill(0);
    const rowHeights = new Array<number>(Math.max(1, this._rowCount)).fill(0);

    for (const el of this._elements) {
      const data = el as GraphObject & {
        row?: number;
        column?: number;
        rowSpan?: number;
        columnSpan?: number;
      };
      const row = data.row ?? 0;
      const col = data.column ?? 0;
      const rowSpan = Math.max(1, data.rowSpan ?? 1);
      const colSpan = Math.max(1, data.columnSpan ?? 1);
      const s = el.measureWithMargin();
      if (colSpan === 1 && col >= 0 && col < colWidths.length) {
        const def = this.columnDefinitions[col];
        colWidths[col] = Math.max(colWidths[col] ?? 0, def?.width ?? 0, s.width);
      }
      if (rowSpan === 1 && row >= 0 && row < rowHeights.length) {
        const def = this.rowDefinitions[row];
        rowHeights[row] = Math.max(rowHeights[row] ?? 0, def?.height ?? 0, s.height);
      }
    }

    // Distribute extra width/height proportionally
    const totalW = colWidths.reduce((a, b) => a + (b ?? 0), 0);
    const totalH = rowHeights.reduce((a, b) => a + (b ?? 0), 0);
    const extraW = Math.max(0, width - totalW);
    const extraH = Math.max(0, height - totalH);
    if (extraW > 0 && totalW > 0) {
      for (let i = 0; i < colWidths.length; i++) {
        colWidths[i] = (colWidths[i] ?? 0) + (extraW * (colWidths[i] ?? 0)) / totalW;
      }
    }
    if (extraH > 0 && totalH > 0) {
      for (let i = 0; i < rowHeights.length; i++) {
        rowHeights[i] = (rowHeights[i] ?? 0) + (extraH * (rowHeights[i] ?? 0)) / totalH;
      }
    }

    // Column x-positions
    const colX = new Array<number>(colWidths.length);
    let cx = x;
    for (let i = 0; i < colWidths.length; i++) {
      colX[i] = cx;
      cx += colWidths[i] ?? 0;
    }
    // Row y-positions
    const rowY = new Array<number>(rowHeights.length);
    let cy = y;
    for (let i = 0; i < rowHeights.length; i++) {
      rowY[i] = cy;
      cy += rowHeights[i] ?? 0;
    }

    for (const el of this._elements) {
      const data = el as GraphObject & {
        row?: number;
        column?: number;
        rowSpan?: number;
        columnSpan?: number;
      };
      const row = data.row ?? 0;
      const col = data.column ?? 0;
      const rowSpan = Math.max(1, data.rowSpan ?? 1);
      const colSpan = Math.max(1, data.columnSpan ?? 1);

      const cellX = colX[col] ?? x;
      const cellY = rowY[row] ?? y;
      let cellW = 0;
      for (let c = col; c < Math.min(col + colSpan, colWidths.length); c++)
        cellW += colWidths[c] ?? 0;
      let cellH = 0;
      for (let r = row; r < Math.min(row + rowSpan, rowHeights.length); r++)
        cellH += rowHeights[r] ?? 0;

      // No alignment set: stretch to fill the (possibly spanned) cell, as before.
      // An explicit alignment spot keeps the element at its natural size,
      // placed within the cell at that spot instead of being stretched.
      const spot = el.alignment;
      if (spot) {
        const natural = el.measureWithMargin();
        const outerW = Math.min(natural.width, cellW);
        const outerH = Math.min(natural.height, cellH);
        const box = Panel.marginBox(
          cellX + (cellW - outerW) * spot.x,
          cellY + (cellH - outerH) * spot.y,
          outerW,
          outerH,
          el.margin,
        );
        el.setPosition(box.x, box.y);
        el.setActualSize(box.width, box.height);
        el.draw(ctx, box.x, box.y, box.width, box.height);
      } else {
        el.setPosition(cellX, cellY);
        el.setActualSize(cellW, cellH);
        el.draw(ctx, cellX, cellY, cellW, cellH);
      }
    }
  }

  /**
   * Find the top-most GraphObject at a point, or null.
   */
  hitTest(px: number, py: number): GraphObject | null {
    // Check in reverse order (top-most first)
    for (let i = this._elements.length - 1; i >= 0; i--) {
      const el = this._elements[i];
      if (!el) continue;
      if (el instanceof Panel) {
        const hit = el.hitTest(px, py);
        if (hit) return hit;
      } else if (el.containsPoint(px, py)) {
        return el;
      }
    }
    return null;
  }

  /**
   * GoJS-compatible: Find a GraphObject by name, searching this panel and nested panels.
   */
  findElement(name: string): GraphObject | null {
    for (const el of this._elements) {
      if (el.name === name) return el;
      if (el instanceof Panel) {
        const found = el.findElement(name);
        if (found) return found;
      }
    }
    return null;
  }

  /** The bounds of this panel within the parent coordinate space. */
  override getBounds(): Rect {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.actualSize.width,
      height: this.actualSize.height,
    } as Rect;
  }

  /** Deep copy of this panel, including all child elements. */
  override clone(): this {
    const cloned = new Panel(this._type) as this;
    cloned.copyFrom(this);
    cloned._padding = this._padding;
    cloned._spacing = this._spacing;
    cloned._background = this._background;
    cloned._gradient = this._gradient;
    cloned.templateProperties = { ...this.templateProperties };
    // Clone static elements (generated items are recreated below)
    for (const el of this._elements) {
      if (this._generatedItems.includes(el)) continue;
      const clonedEl = el.clone();
      clonedEl.parentPanel = cloned;
      cloned._elements.push(clonedEl);
    }
    cloned._rowCount = this._rowCount;
    cloned._columnCount = this._columnCount;
    cloned._itemArray = [...this._itemArray];
    cloned._itemTemplate = this._itemTemplate ? this._itemTemplate.clone() : null;
    // Regenerate items from the cloned template so each clone has its own copies
    if (cloned._itemTemplate && cloned._itemArray.length > 0) {
      cloned._generatedItems = [];
      for (const item of cloned._itemArray) {
        const el = cloned._itemTemplate.clone();
        el.parentPanel = cloned;
        if (typeof item === 'object' && item !== null) {
          el.applyBindings(item as import('../model/Model.ts').NodeData);
        }
        cloned._elements.push(el);
        cloned._generatedItems.push(el);
      }
      cloned.recountGrid();
    }
    return cloned;
  }

  /** Apply bindings to this panel and recursively to all child elements. */
  override applyBindings(nodeData: import('../model/Model.ts').NodeData): number {
    this.data = nodeData;
    let count = super.applyBindings(nodeData);
    for (const el of this._elements) {
      // Item-generated elements are bound to item data, not the panel's node data
      if (this._generatedItems.includes(el)) continue;
      count += el.applyBindings(nodeData);
    }
    this.applyItemBindings();
    return count;
  }
}

/**
 * Helper to construct a Panel with a fluent API.
 */
export function panel(type: PanelType = 'Auto'): Panel {
  return new Panel(type);
}

/**
 * Helper to create a shape element for a panel.
 */
export function shape(shape?: Shape['shape']): Shape {
  return new Shape(shape);
}

// Register the panel factory for GraphObject.make to use (avoids import cycles)
import { registerPanelFactory } from './PanelRegistry.ts';

registerPanelFactory((type?: string) => new Panel(type as PanelType));
