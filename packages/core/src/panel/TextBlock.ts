import type { Size } from '../geometry/Size.ts';
import { Size as SizeClass } from '../geometry/Size.ts';
import { TextMeasureCache } from '../render/RenderCache.ts';
import { GraphObject } from './GraphObject.ts';

/** Shared across all TextBlocks: real glyph widths instead of a per-character guess. */
const sharedTextMeasureCache = new TextMeasureCache();

let measureCtx: CanvasRenderingContext2D | null | undefined;

/**
 * Lazily create a detached canvas purely for `ctx.measureText` — real font
 * metrics instead of the `0.6 * fontSize` guess GoJS doesn't need (it
 * measures with the DOM). `undefined` means "not yet resolved", `null` means
 * "resolved, unavailable" (SSR, or a canvas mock without `measureText`).
 */
function getMeasureContext(): CanvasRenderingContext2D | null {
  if (measureCtx !== undefined) return measureCtx;
  const ctx =
    typeof document === 'undefined' ? null : document.createElement('canvas').getContext('2d');
  measureCtx = ctx && typeof ctx.measureText === 'function' ? ctx : null;
  return measureCtx;
}

/**
 * A text element in a panel.
 */
export class TextBlock extends GraphObject {
  /** GoJS-compatible: named constant for `overflow` — clips overflowing text with no ellipsis. */
  static readonly OverflowClip = 'clip';
  /** GoJS-compatible: named constant for `overflow` — truncates overflowing text with an ellipsis ("…"). */
  static readonly OverflowEllipsis = 'ellipsis';

  private _text = '';
  private _color = '#000000';
  private _font = '12px sans-serif';
  private _textAlign: 'left' | 'center' | 'right' = 'center';
  private _multiline = true;
  private _editable = false;
  private _wrap: 'Wrap' | 'None' | 'Ellipsis' = 'Wrap';
  private _isMultiline = true;
  private _strokeWidth = 0;

  constructor(text?: string) {
    super();
    if (text !== undefined) this._text = text;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  /** GoJS-compatible: Alias for the text color (GoJS uses `stroke`). */
  get stroke(): string {
    return this._color;
  }

  set stroke(value: string) {
    this._color = value;
  }

  /** GoJS-compatible: The width of the text outline (0 = no outline). */
  get strokeWidth(): number {
    return this._strokeWidth;
  }

  set strokeWidth(value: number) {
    this._strokeWidth = value;
  }

  /** GoJS-compatible: Whether this text can be edited in-place by the user. */
  get editable(): boolean {
    return this._editable;
  }

  set editable(value: boolean) {
    this._editable = value;
  }

  /** GoJS-compatible: Whether the text can wrap to multiple lines. */
  get isMultiline(): boolean {
    return this._isMultiline;
  }

  set isMultiline(value: boolean) {
    this._isMultiline = value;
  }

  /** GoJS-compatible: The wrapping mode. */
  get wrap(): 'Wrap' | 'None' | 'Ellipsis' {
    return this._wrap;
  }

  set wrap(value: 'Wrap' | 'None' | 'Ellipsis') {
    this._wrap = value;
  }

  get font(): string {
    return this._font;
  }

  set font(value: string) {
    this._font = value;
  }

  /** GoJS-compatible: The font family (e.g. "sans-serif"). */
  get fontFamily(): string {
    const m = /\s([\w-]+)$/.exec(this._font);
    return m ? (m[1] ?? 'sans-serif') : 'sans-serif';
  }

  set fontFamily(value: string) {
    this._font = `${this.fontStyle} ${this.fontSize}px ${value}`;
  }

  /** GoJS-compatible: The font size in points (px). */
  get fontSize(): number {
    const m = /(\d+(?:\.\d+)?)px/.exec(this._font);
    return m ? Number(m[1]) : 12;
  }

  set fontSize(value: number) {
    this._font = `${this.fontStyle} ${value}px ${this.fontFamily}`;
  }

  /** GoJS-compatible: The font style (e.g. "bold", "italic"). */
  get fontStyle(): string {
    const m = /^(bold italic|italic bold|bold|italic)\s/.exec(this._font);
    return m ? (m[1] ?? '') : '';
  }

  set fontStyle(value: string) {
    const style = value ? `${value} ` : '';
    this._font = `${style}${this.fontSize}px ${this.fontFamily}`;
  }

  /** GoJS-compatible: Whether the text is bold. */
  get isBold(): boolean {
    return this.fontStyle.includes('bold');
  }

  set isBold(value: boolean) {
    const italic = this.isItalic;
    const bold = value;
    const style = `${bold ? 'bold' : ''} ${italic ? 'italic' : ''}`.trim();
    this.fontStyle = style;
  }

  /** GoJS-compatible: Whether the text is italic. */
  get isItalic(): boolean {
    return this.fontStyle.includes('italic');
  }

  set isItalic(value: boolean) {
    const bold = this.isBold;
    const italic = value;
    const style = `${bold ? 'bold' : ''} ${italic ? 'italic' : ''}`.trim();
    this.fontStyle = style;
  }

  private _isUnderline = false;

  /** GoJS-compatible: Whether the text is underlined. */
  get isUnderline(): boolean {
    return this._isUnderline;
  }

  set isUnderline(value: boolean) {
    this._isUnderline = value;
  }

  private _overflow = 'visible';

  /** GoJS-compatible: How overflowing text is handled ("visible", "hidden", "ellipsis", "clip"). */
  get overflow(): string {
    return this._overflow;
  }

  set overflow(value: string) {
    this._overflow = value;
  }

  private _maxLines = Infinity;

  /** GoJS-compatible: The maximum number of lines of text. */
  get maxLines(): number {
    return this._maxLines;
  }

  set maxLines(value: number) {
    this._maxLines = value;
  }

  get textAlign(): 'left' | 'center' | 'right' {
    return this._textAlign;
  }

  set textAlign(value: 'left' | 'center' | 'right') {
    this._textAlign = value;
  }

  get multiline(): boolean {
    return this._multiline;
  }

  set multiline(value: boolean) {
    this._multiline = value;
  }

  /** Fluent setter for text. */
  setText(value: string): this {
    this._text = value;
    return this;
  }

  /** Fluent setter for color. */
  setColor(value: string): this {
    this._color = value;
    return this;
  }

  /** Fluent setter for font. */
  setFont(value: string): this {
    this._font = value;
    return this;
  }

  /** Deep copy of this text block. */
  override clone(): this {
    const cloned = new TextBlock(this._text) as this;
    cloned.copyFrom(this);
    cloned._color = this._color;
    cloned._font = this._font;
    cloned._textAlign = this._textAlign;
    cloned._multiline = this._multiline;
    cloned._editable = this._editable;
    cloned._isMultiline = this._isMultiline;
    cloned._wrap = this._wrap;
    cloned._strokeWidth = this._strokeWidth;
    return cloned;
  }

  override measure(): Size {
    if (this.width > 0 && this.height > 0) {
      return new SizeClass(this.width, this.height);
    }

    const lines = this._text.split('\n');
    const fontSize = this.estimateFontSize(this._font);
    const lineHeight = fontSize * 1.4;
    const ctx = getMeasureContext();

    // Real glyph widths via canvas measureText when available; falls back to
    // a per-character guess only where no canvas exists at all (SSR).
    const maxLineWidth = ctx
      ? Math.max(
          1,
          ...lines.map((l) => {
            ctx.font = this._font;
            return sharedTextMeasureCache.measure(ctx, l, this._font);
          }),
        )
      : Math.max(1, ...lines.map((l) => l.length * fontSize * 0.6));

    const width = this.width > 0 ? this.width : Math.max(10, maxLineWidth);
    const height = this.height > 0 ? this.height : Math.max(10, lines.length * lineHeight);

    return new SizeClass(width, height);
  }

  private estimateFontSize(font: string): number {
    const match = /\b(\d+(?:\.\d+)?)px\b/.exec(font);
    if (match) return Number(match[1]);
    const em = /\b(\d+(?:\.\d+)?)em\b/.exec(font);
    if (em) return Number(em[1]) * 16;
    return 12;
  }

  override draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    if (!this._text) return;

    ctx.save();
    ctx.fillStyle = this._color;
    ctx.font = this._font;
    ctx.textBaseline = 'middle';

    if (this._multiline && this._text.includes('\n')) {
      this.drawMultiline(ctx, x, y, width, height);
    } else {
      ctx.textAlign =
        this._textAlign === 'right' ? 'right' : this._textAlign === 'left' ? 'left' : 'center';
      const tx =
        this._textAlign === 'center' ? x + width / 2 : this._textAlign === 'right' ? x + width : x;
      ctx.fillText(this._text, tx, y + height / 2);
    }

    ctx.restore();
  }

  private drawMultiline(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const lines = this._text.split('\n');
    const fontSize = this.estimateFontSize(this._font);
    const lineHeight = fontSize * 1.4;
    const totalHeight = lines.length * lineHeight;
    let startY = y + (height - totalHeight) / 2 + lineHeight / 2;

    ctx.textAlign =
      this._textAlign === 'right' ? 'right' : this._textAlign === 'left' ? 'left' : 'center';

    for (const line of lines) {
      const tx =
        this._textAlign === 'center' ? x + width / 2 : this._textAlign === 'right' ? x + width : x;
      ctx.fillText(line, tx, startY);
      startY += lineHeight;
    }
  }
}
