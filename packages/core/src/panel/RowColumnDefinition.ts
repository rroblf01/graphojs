import type { Panel } from './Panel.ts';

/**
 * GoJS-compatible: describes one row or column of a `'Table'`-type Panel
 * (size constraints, separator styling). graphojs's `Panel.rowDefinitions`/
 * `columnDefinitions` currently accept plain `{ height?, width?,
 * separatorStrokeWidth? }` objects rather than instances of this class —
 * this exists for API parity (`new go.RowColumnDefinition(...)`) and reads
 * back the same shape; `panel` is only set if you assign it yourself, since
 * graphojs's table layout doesn't yet track it automatically.
 */
export class RowColumnDefinition {
  private _panel: Panel | null = null;
  private _isRow = false;
  private _index = -1;
  private _height = Number.NaN;
  private _width = Number.NaN;
  minimum = 0;
  maximum = Number.POSITIVE_INFINITY;
  separatorStrokeWidth = Number.NaN;
  separatorStroke: string | null = null;
  separatorPadding: number = 0;
  background: string | null = null;
  alignment: unknown = null;

  constructor(init?: Partial<RowColumnDefinition> & { row?: number; column?: number }) {
    if (init) {
      if (init.row !== undefined) {
        this._isRow = true;
        this._index = init.row;
      }
      if (init.column !== undefined) {
        this._isRow = false;
        this._index = init.column;
      }
      const { row: _row, column: _column, ...rest } = init as Record<string, unknown>;
      Object.assign(this, rest);
    }
  }

  computeEffectiveSpacingTop(_first: number): number {
    return (
      (Number.isFinite(this.separatorStrokeWidth) ? this.separatorStrokeWidth : 0) +
      this.separatorPadding
    );
  }

  computeEffectiveSpacing(): number {
    return (
      (Number.isFinite(this.separatorStrokeWidth) ? this.separatorStrokeWidth : 0) +
      this.separatorPadding * 2
    );
  }

  get panel(): Panel | null {
    return this._panel;
  }

  /** Not part of the real GoJS read-only `panel` getter's contract — graphojs exposes it settable since nothing else assigns it automatically. */
  set panel(value: Panel | null) {
    this._panel = value;
  }

  get isRow(): boolean {
    return this._isRow;
  }

  set isRow(value: boolean) {
    this._isRow = value;
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }
}
