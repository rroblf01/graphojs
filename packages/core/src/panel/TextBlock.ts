import type { Size } from '../geometry/Size.ts';
import { Size as SizeClass } from '../geometry/Size.ts';
import { GraphObject } from './GraphObject.ts';

/**
 * A text element in a panel.
 */
export class TextBlock extends GraphObject {
  private _text = '';
  private _color = '#000000';
  private _font = '12px sans-serif';
  private _textAlign: 'left' | 'center' | 'right' = 'center';
  private _multiline = true;
  private _editable = false;

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

  /** GoJS-compatible: Whether this text can be edited in-place by the user. */
  get editable(): boolean {
    return this._editable;
  }

  set editable(value: boolean) {
    this._editable = value;
  }

  get font(): string {
    return this._font;
  }

  set font(value: string) {
    this._font = value;
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
    return cloned;
  }

  override measure(): Size {
    if (this.width > 0 && this.height > 0) {
      return new SizeClass(this.width, this.height);
    }

    // Estimate size based on text length (approximation without DOM measurement)
    const lines = this._text.split('\n');
    const fontSize = this.estimateFontSize(this._font);
    const maxLineLength = Math.max(1, ...lines.map((l) => l.length));
    const lineHeight = fontSize * 1.4;
    const width = this.width > 0 ? this.width : Math.max(10, maxLineLength * fontSize * 0.6);
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
