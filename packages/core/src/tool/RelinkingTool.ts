import { Node } from '../parts/Node.ts';
import { Link } from '../parts/Link.ts';
import { SetLinkPropertyCommand } from '../undo/commands.ts';
import { Tool } from './Tool.ts';

/**
 * Tool for reconnecting existing links by dragging their endpoints.
 * Drag near the source or target end of a link to move it to a new node.
 */
export class RelinkingTool extends Tool {
  private _isRelinking = false;
  private _link: Link | null = null;
  private _end: 'from' | 'to' = 'to';

  /** Whether a relinking drag is in progress. */
  get isRelinking(): boolean {
    return this._isRelinking;
  }

  /** The link being relinked. */
  get link(): Link | null {
    return this._link;
  }

  /** Which end of the link is being dragged. */
  get end(): 'from' | 'to' {
    return this._end;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    if (part instanceof Link) {
      // Determine which end is closer
      const distFrom = Math.hypot(part.fromPort.x - point.x, part.fromPort.y - point.y);
      const distTo = Math.hypot(part.toPort.x - point.x, part.toPort.y - point.y);

      this._link = part;
      this._end = distFrom <= distTo ? 'from' : 'to';
      this._isRelinking = true;
      this.showTempLink(part.fromPort, part.toPort);
    }
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this._isRelinking || !this._link) return;

    const point = this.getDiagramPoint(e);
    const from = this._end === 'from' ? point : this._link.fromPort;
    const to = this._end === 'to' ? point : this._link.toPort;
    this.showTempLink(from, to);
  }

  override doMouseUp(e: MouseEvent): void {
    if (!this._isRelinking || !this._link) return;

    this._isRelinking = false;
    const diagram = this.diagram;
    const link = this._link;

    this._link = null;
    this.hideTempLink();

    if (!diagram || !link) return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    if (!(part instanceof Node)) return;

    this.reconnectLink(link, part);
  }

  /** Reconnect the link's endpoint to a new node. */
  reconnectLink(link: Link, newEnd: Node): boolean {
    const diagram = this.diagram;
    if (!diagram) return false;

    const model = diagram.getModel();
    if (!model.containsNode(newEnd.key)) return false;

    const linkData = model
      .getLinkDataArray()
      .find((l) => l.from === link.fromKey && l.to === link.toKey);
    if (!linkData) return false;

    const linkKey = model.getLinkKey(linkData);
    if (linkKey === undefined) return false;

    const propertyName = this._end === 'from' ? 'from' : 'to';
    const newValue = newEnd.key;
    if (linkData[propertyName] === newValue) return false;

    // Execute as an undoable command
    diagram
      .getUndoManager()
      .execute(new SetLinkPropertyCommand(model, linkKey, propertyName, newValue));
    return true;
  }

  private showTempLink(from: { x: number; y: number }, to: { x: number; y: number }): void {
    this.diagram?.showTempLink(from, to);
  }

  private hideTempLink(): void {
    this.diagram?.hideTempLink();
  }
}
