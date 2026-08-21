import { Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import { SetLinkPropertyCommand } from '../undo/commands.ts';
import { LinkingBaseTool } from './LinkingBaseTool.ts';

/**
 * Tool for reconnecting existing links by dragging their endpoints.
 * Drag near the source or target end of a link to move it to a new node.
 */
export class RelinkingTool extends LinkingBaseTool {
  private _link: Link | null = null;
  private _end: 'from' | 'to' | null = null;

  /** Whether a relinking drag is in progress. */
  get isRelinking(): boolean {
    return this.isDragging;
  }

  /** The link being relinked. */
  get link(): Link | null {
    return this._link;
  }

  /** Which end of the link is being dragged. */
  get end(): 'from' | 'to' | null {
    return this._end;
  }

  /** GoJS-compatible: start reconnecting a link when pressing near its endpoint. */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    if (e.button !== 0) return false;
    if (
      this.diagram &&
      (this.diagram.isEnabled === false ||
        this.diagram.isReadOnly === true ||
        this.diagram.allowRelink === false)
    )
      return false;
    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    if (!(part instanceof Link)) return false;
    const link = part as Link;
    // Only start near an endpoint, and only if that end is relinkable
    const distFrom = Math.hypot(link.fromPort.x - point.x, link.fromPort.y - point.y);
    const distTo = Math.hypot(link.toPort.x - point.x, link.toPort.y - point.y);
    const threshold = 12;
    if (distFrom <= threshold && link.relinkableFrom) return true;
    if (distTo <= threshold && link.relinkableTo) return true;
    return false;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;
    // GoJS-compatible: respect isEnabled, read-only and allowRelink flags
    if (
      this.diagram &&
      (this.diagram.isEnabled === false ||
        this.diagram.isReadOnly === true ||
        this.diagram.allowRelink === false)
    )
      return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    if (part instanceof Link) {
      // Determine which end is closer AND relinkable
      const distFrom = Math.hypot(part.fromPort.x - point.x, part.fromPort.y - point.y);
      const distTo = Math.hypot(part.toPort.x - point.x, part.toPort.y - point.y);
      const fromOk = distFrom <= distTo && part.relinkableFrom;
      const toOk = distTo <= distFrom && part.relinkableTo;

      this._link = part;
      this._end = fromOk ? 'from' : toOk ? 'to' : null;
      if (this._end === null) return;
      this._isDragging = true;
      this.showTempLink(part.fromPort, part.toPort);
    }
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this.isDragging || !this._link) return;

    const point = this.getDiagramPoint(e);
    const from = this._end === 'from' ? point : this._link.fromPort;
    const to = this._end === 'to' ? point : this._link.toPort;
    this.showTempLink(from, to);
  }

  override doMouseUp(e: MouseEvent): void {
    if (!this.isDragging || !this._link) return;

    this._isDragging = false;
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

    // Find the link by its unique key (not from/to, which is ambiguous with duplicates)
    const linkData = model.getLinkData(link.key);
    if (!linkData) return false;

    const linkKey = model.getLinkKey(linkData);
    if (linkKey === undefined) return false;

    if (this._end === null) return false;
    const propertyName = this._end === 'from' ? 'from' : 'to';
    const newValue = newEnd.key;
    if (linkData[propertyName] === newValue) return false;

    // Validate the reconnection the same way a freshly-drawn link would be
    // (self-loop policy, duplicate-link policy, isValidLink/cycle checks) —
    // reconnecting an existing link must not bypass what link creation enforces.
    const otherKey = this._end === 'from' ? link.toKey : link.fromKey;
    const otherNode = diagram.findNodeForKey(otherKey);
    if (!otherNode) return false;
    const source = this._end === 'from' ? newEnd : otherNode;
    const target = this._end === 'from' ? otherNode : newEnd;
    if (!this.validateLink(source, target, model)) return false;

    // Execute as an undoable command
    diagram
      .getUndoManager()
      .execute(new SetLinkPropertyCommand(model, linkKey, propertyName, newValue));

    // GoJS-compatible: fire LinkRelinked after a successful reconnect
    diagram.fireDiagramEvent('LinkRelinked', link, { propertyName, newValue });
    return true;
  }
}
