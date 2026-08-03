import { Node } from '../parts/Node.ts';
import type { LinkData } from '../model/Model.ts';
import { AddLinkCommand } from '../undo/commands.ts';
import { Tool } from './Tool.ts';

/**
 * Tool for creating links by dragging from a node to another node.
 */
export class LinkingTool extends Tool {
  private _isLinking = false;
  private _sourceNode: Node | null = null;
  private _sourcePoint = { x: 0, y: 0 };
  private _sourcePortName: string | undefined = undefined;
  private _targetNode: Node | null = null;

  /** Whether a linking drag is in progress. */
  get isLinking(): boolean {
    return this._isLinking;
  }

  /** The source node of the link being created. */
  get sourceNode(): Node | null {
    return this._sourceNode;
  }

  /** The current target node under the cursor, or null. */
  get targetNode(): Node | null {
    return this._targetNode;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    // Only start linking from a node
    if (part instanceof Node) {
      this._isLinking = true;
      this._sourceNode = part;
      this._sourcePoint = part.getConnectionPoint(point, this.getNearestPortName(part, point));
      this._sourcePortName = this.getNearestPortName(part, point);
      this.showTempLink(this._sourcePoint, point);
    }
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this._isLinking) return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    // Update target node if over a different node
    if (part instanceof Node && part !== this._sourceNode) {
      this._targetNode = part;
      const targetPoint = part.getConnectionPoint(
        this._sourcePoint,
        this.getNearestPortName(part, point),
      );
      this.showTempLink(this._sourcePoint, targetPoint);
    } else {
      this._targetNode = null;
      this.showTempLink(this._sourcePoint, point);
    }
  }

  override doMouseUp(_e: MouseEvent): void {
    if (!this._isLinking) return;

    this._isLinking = false;
    const diagram = this.diagram;
    const source = this._sourceNode;
    const target = this._targetNode;

    this._sourceNode = null;
    this._targetNode = null;
    this.hideTempLink();

    if (!diagram || !source || !target) return;

    // Create the link in the model
    this.createLink(source, target);
  }

  /** Create a link between two nodes in the model. */
  createLink(source: Node, target: Node): boolean {
    const diagram = this.diagram;
    if (!diagram) return false;

    const model = diagram.getModel();
    if (!model.containsNode(source.key) || !model.containsNode(target.key)) return false;

    // Don't create duplicate links if not allowed
    if (!model.allowsDuplicateLinks && model.containsLink(source.key, target.key)) {
      return false;
    }

    const linkData: LinkData = {
      from: source.key,
      to: target.key,
    };
    if (this._sourcePortName !== undefined) {
      linkData.fromPort = this._sourcePortName;
    }

    try {
      // Execute as an undoable command
      diagram.getUndoManager().execute(new AddLinkCommand(model, linkData));
      return true;
    } catch {
      return false;
    }
  }

  private getNearestPortName(node: Node, point: { x: number; y: number }): string | undefined {
    if (node.portCount === 0) return undefined;

    let nearest: string | undefined;
    let nearestDist = Infinity;

    for (const port of node.ports) {
      if (!port.visible) continue;
      const p = port.computePoint(
        node.bounds.x,
        node.bounds.y,
        node.bounds.width,
        node.bounds.height,
      );
      const dist = Math.hypot(p.x - point.x, p.y - point.y);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = port.name;
      }
    }
    return nearest;
  }

  private showTempLink(from: { x: number; y: number }, to: { x: number; y: number }): void {
    this.diagram?.showTempLink(from, to);
  }

  private hideTempLink(): void {
    this.diagram?.hideTempLink();
  }
}
