import { Rect } from '../geometry/Rect.ts';
import type { NodeKey } from '../model/Model.ts';
import { Part } from './Part.ts';

export type LinkRouting = 'straight' | 'orthogonal' | 'curved';

/**
 * A visual link between two nodes.
 */
export class Link extends Part {
  private _fromKey: NodeKey;
  private _toKey: NodeKey;
  private _routing: LinkRouting = 'straight';
  private _fromPort = { x: 0, y: 0 };
  private _toPort = { x: 0, y: 0 };

  constructor(key: NodeKey, fromKey: NodeKey, toKey: NodeKey) {
    super(key, Rect.zero());
    this._fromKey = fromKey;
    this._toKey = toKey;
    this.strokeWidth = 2;
    this.fill = 'none';
  }

  get fromKey(): NodeKey {
    return this._fromKey;
  }

  get toKey(): NodeKey {
    return this._toKey;
  }

  get routing(): LinkRouting {
    return this._routing;
  }

  set routing(value: LinkRouting) {
    this._routing = value;
  }

  get fromPort(): { x: number; y: number } {
    return this._fromPort;
  }

  set fromPort(value: { x: number; y: number }) {
    this._fromPort = value;
  }

  get toPort(): { x: number; y: number } {
    return this._toPort;
  }

  set toPort(value: { x: number; y: number }) {
    this._toPort = value;
  }

  /** Update the bounds based on port positions. */
  updateBounds(): void {
    const x = Math.min(this._fromPort.x, this._toPort.x);
    const y = Math.min(this._fromPort.y, this._toPort.y);
    const width = Math.abs(this._toPort.x - this._fromPort.x) || 1;
    const height = Math.abs(this._toPort.y - this._fromPort.y) || 1;
    this.bounds = new Rect(x, y, width, height);
  }
}
