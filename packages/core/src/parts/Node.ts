import { Rect } from '../geometry/Rect.ts';
import type { NodeKey } from '../model/Model.ts';
import { Part } from './Part.ts';
import type { Panel } from '../panel/Panel.ts';

export type NodeShape = 'rect' | 'ellipse' | 'roundedRect';

/**
 * A visual node in a diagram.
 */
export class Node extends Part {
  private _shape: NodeShape = 'rect';
  private _label = '';
  private _labelColor = '#000000';
  private _labelFont = '12px sans-serif';
  private _cornerRadius = 0;
  private _panel: Panel | null = null;

  /** Create a Node from position and size. */
  static fromPosAndSize(key: NodeKey, x: number, y: number, width: number, height: number): Node {
    return new Node(key, new Rect(x, y, width, height));
  }

  get shape(): NodeShape {
    return this._shape;
  }

  set shape(value: NodeShape) {
    this._shape = value;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get labelColor(): string {
    return this._labelColor;
  }

  set labelColor(value: string) {
    this._labelColor = value;
  }

  get labelFont(): string {
    return this._labelFont;
  }

  set labelFont(value: string) {
    this._labelFont = value;
  }

  get cornerRadius(): number {
    return this._cornerRadius;
  }

  set cornerRadius(value: number) {
    this._cornerRadius = value;
  }

  /** Get the panel used to render this node, or null for flat rendering. */
  get panel(): Panel | null {
    return this._panel;
  }

  /** Set the panel used to render this node. */
  set panel(value: Panel | null) {
    this._panel = value;
  }

  /** Check whether this node uses a panel for rendering. */
  get hasPanel(): boolean {
    return this._panel !== null;
  }
}
