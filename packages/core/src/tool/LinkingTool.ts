import { Node } from '../parts/Node.ts';
import type { LinkData } from '../model/Model.ts';
import { AddLinkCommand } from '../undo/commands.ts';
import { LinkingBaseTool } from './LinkingBaseTool.ts';

/**
 * Tool for creating links by dragging from a node to another node.
 */
export class LinkingTool extends LinkingBaseTool {
  /** Whether a linking drag is in progress. */
  get isLinking(): boolean {
    return this.isDragging;
  }

  /** The source node of the link being created. */
  override get sourceNode(): Node | null {
    return super.sourceNode;
  }

  /** The current target node under the cursor, or null. */
  override get targetNode(): Node | null {
    return super.targetNode;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;
    // GoJS-compatible: respect isEnabled, read-only and allowLink flags
    if (
      this.diagram &&
      (this.diagram.isEnabled === false ||
        this.diagram.isReadOnly === true ||
        this.diagram.allowLink === false)
    )
      return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    // Only start linking from a node
    if (part instanceof Node) {
      this._isDragging = true;
      this._sourceNode = part;
      this._sourcePoint = this.getConnectionPoint(part, point);
      this._sourcePortName = this.getNearestPortName(part, point);
      this.showTempLink(this._sourcePoint, point);
    }
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    // Update target node if over a different node
    if (part instanceof Node && part !== this._sourceNode) {
      this._targetNode = part;
      const targetPoint = this.getConnectionPoint(part, this._sourcePoint);
      if (this._sourceNode && this.diagram) {
        this._isValidLink = this.validateLink(this._sourceNode, part, this.diagram.getModel());
      }
      this.showTempLink(this._sourcePoint, targetPoint);
    } else {
      this._targetNode = null;
      this._isValidLink = false;
      this.showTempLink(this._sourcePoint, point);
    }
  }

  override doMouseUp(_e: MouseEvent): void {
    if (!this.isDragging) return;

    this._isDragging = false;
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
    if (!this.validateLink(source, target, model)) {
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

      // Fire LinkDrawn event
      const linkKey = model.getLinkKey(linkData);
      if (linkKey !== undefined) {
        const link = diagram.getPart(linkKey);
        if (link) {
          diagram.fireDiagramEvent('LinkDrawn', link, { from: source.key, to: target.key });
        }
      }

      return true;
    } catch {
      return false;
    }
  }
}
