import type { Size } from '../geometry/Size.ts';
import { Size as SizeClass } from '../geometry/Size.ts';
import { GraphObject } from './GraphObject.ts';

/**
 * An image element in a panel.
 * Supports HTMLImageElement, HTMLCanvasElement, or a URL string.
 */
export class Picture extends GraphObject {
  private _source: HTMLImageElement | HTMLCanvasElement | string | null = null;
  private _imageNaturalWidth = 0;
  private _imageNaturalHeight = 0;

  constructor(source?: HTMLImageElement | HTMLCanvasElement | string) {
    super();
    if (source) this._source = source;
  }

  get source(): HTMLImageElement | HTMLCanvasElement | string | null {
    return this._source;
  }

  set source(value: HTMLImageElement | HTMLCanvasElement | string | null) {
    this._source = value;
    this.updateNaturalSize();
  }

  /** Fluent setter for the source. */
  setSource(value: HTMLImageElement | HTMLCanvasElement | string): this {
    this._source = value;
    this.updateNaturalSize();
    return this;
  }

  private updateNaturalSize(): void {
    if (this._source instanceof HTMLImageElement && this._source.naturalWidth) {
      this._imageNaturalWidth = this._source.naturalWidth;
      this._imageNaturalHeight = this._source.naturalHeight;
    } else if (this._source instanceof HTMLCanvasElement) {
      this._imageNaturalWidth = this._source.width;
      this._imageNaturalHeight = this._source.height;
    } else {
      this._imageNaturalWidth = 0;
      this._imageNaturalHeight = 0;
    }
  }

  override measure(): Size {
    if (!Number.isNaN(this.width) && !Number.isNaN(this.height)) {
      return new SizeClass(this.width, this.height);
    }
    if (this._imageNaturalWidth > 0 && this._imageNaturalHeight > 0) {
      return new SizeClass(this._imageNaturalWidth, this._imageNaturalHeight);
    }
    return new SizeClass(
      Number.isNaN(this.width) ? 50 : this.width,
      Number.isNaN(this.height) ? 50 : this.height,
    );
  }

  override draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    if (!this._source) return;

    ctx.save();

    if (this._source instanceof HTMLImageElement || this._source instanceof HTMLCanvasElement) {
      ctx.drawImage(this._source, x, y, width, height);
    } else {
      const img = new Image();
      img.src = this._source;
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, x, y, width, height);
      } else {
        img.onload = () => {
          ctx.drawImage(img, x, y, width, height);
        };
      }
    }

    ctx.restore();
  }
}
