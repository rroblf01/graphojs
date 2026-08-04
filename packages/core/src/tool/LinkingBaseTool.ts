import type { Node } from '../parts/Node.ts';
import type { GraphLinksModel } from '../model/GraphLinksModel.ts';
import { Tool } from './Tool.ts';

/**
 * Base class for linking tools (LinkingTool and RelinkingTool).
 * Contains shared logic for link creation, validation, and cycle prevention.
 */
export class LinkingBaseTool extends Tool {
  protected _isDragging = false;
  protected _sourceNode: Node | null = null;
  protected _sourcePoint = { x: 0, y: 0 };
  protected _sourcePortName: string | undefined = undefined;
  protected _targetNode: Node | null = null;
  protected _preventCycles = false;
  protected _isValidLink = true;

  /** Whether a linking drag is in progress. */
  get isDragging(): boolean {
    return this._isDragging;
  }

  /** The source node of the link being created/modified. */
  get sourceNode(): Node | null {
    return this._sourceNode;
  }

  /** The current target node under the cursor, or null. */
  get targetNode(): Node | null {
    return this._targetNode;
  }

  /** Whether cycle creation is prevented. */
  get preventCycles(): boolean {
    return this._preventCycles;
  }

  set preventCycles(value: boolean) {
    this._preventCycles = value;
  }

  /** Whether the current link being created is valid. */
  get isValidLink(): boolean {
    return this._isValidLink;
  }

  /**
   * Find the nearest port on a node to a given point.
   */
  protected getNearestPortName(node: Node, point: { x: number; y: number }): string | undefined {
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

  /**
   * Check whether adding a link from `from` to `to` would create a cycle.
   */
  protected wouldCreateCycle(
    from: string | number,
    to: string | number,
    model: { getLinksFrom: (key: string | number) => ReadonlyArray<{ to: string | number }> },
  ): boolean {
    const visited = new Set<string | number>();
    const stack: (string | number)[] = [to];

    while (stack.length > 0) {
      const current = stack.pop();
      if (current === undefined) continue;
      if (current === from) return true;
      if (visited.has(current)) continue;
      visited.add(current);

      for (const link of model.getLinksFrom(current)) {
        stack.push(link.to);
      }
    }
    return false;
  }

  /**
   * Validate whether a link can be created between source and target.
   */
  protected validateLink(source: Node, target: Node, model: GraphLinksModel): boolean {
    if (!model.containsNode(source.key) || !model.containsNode(target.key)) {
      return false;
    }

    // Don't create self-links
    if (source.key === target.key) {
      return false;
    }

    // Don't create duplicate links if not allowed
    if (!model.allowsDuplicateLinks && model.containsLink(source.key, target.key)) {
      return false;
    }

    // Prevent cycles
    if (this._preventCycles && this.wouldCreateCycle(source.key, target.key, model)) {
      return false;
    }

    return true;
  }

  /**
   * Get connection point on a node for the link.
   */
  protected getConnectionPoint(
    node: Node,
    point: { x: number; y: number },
  ): { x: number; y: number } {
    const portName = this.getNearestPortName(node, point);
    return node.getConnectionPoint(point, portName);
  }

  /**
   * Show the temporary link during dragging.
   */
  protected showTempLink(from: { x: number; y: number }, to: { x: number; y: number }): void {
    this.diagram?.showTempLink(from, to);
  }

  /**
   * Hide the temporary link.
   */
  protected hideTempLink(): void {
    this.diagram?.hideTempLink();
  }
}
