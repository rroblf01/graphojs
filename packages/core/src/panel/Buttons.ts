import type { Diagram } from '../diagram/Diagram.ts';
import type { InputEvent } from '../events/InputEvent.ts';
import type { Node } from '../parts/Node.ts';
import type { Part } from '../parts/Part.ts';
import type { GraphObject } from './GraphObject.ts';
import { Panel } from './Panel.ts';
import { Shape } from './Shape.ts';

export interface ExpanderButtonOptions {
  /** Side length of the square button. Default: 14 */
  size?: number;
  /** Fill of the button's background. Default: '#ffffff' */
  background?: string;
  /** Stroke/glyph color. Default: '#767676' */
  stroke?: string;
}

/**
 * GoJS-compatible: a small square button ("−" when expanded, "+" when
 * collapsed) that toggles the containing node's *tree* — its descendants per
 * `findTreeChildrenNodes()` — via `Diagram.collapseTree`/`expandTree`. Add it
 * to a node template near where a link to its tree children attaches.
 *
 * This is distinct from a Group's `isSubGraphExpanded`/`collapseGroup`: it
 * works on any Node with tree-structured children, group or not.
 */
export function TreeExpanderButton(options: ExpanderButtonOptions = {}): Panel {
  const size = options.size ?? 14;
  const fill = options.background ?? '#ffffff';
  const stroke = options.stroke ?? '#767676';

  const button = new Panel('Spot');
  button.name = 'TREEEXPANDERBUTTON';

  const background = new Shape('roundedRect');
  background.width = size;
  background.height = size;
  background.fill = fill;
  background.stroke = stroke;
  background.strokeWidth = 1;
  background.cornerRadius = 2;

  const glyph = new Shape('minus');
  glyph.width = size * 0.55;
  glyph.height = size * 0.55;
  glyph.fill = stroke;
  glyph.stroke = stroke;

  button.add(background);
  button.add(glyph);

  const syncGlyph = (node: Node): void => {
    glyph.shape = node.isTreeExpanded ? 'minus' : 'plus';
  };

  button.click = (_e: InputEvent, obj: GraphObject) => {
    const node = obj.part as Node | null;
    const diagram = node?.diagram as Diagram | null;
    if (!node || !diagram) return;
    if (node.isTreeExpanded) {
      diagram.collapseTree(node);
    } else {
      diagram.expandTree(node);
    }
    syncGlyph(node);
  };

  return button;
}

/**
 * GoJS-compatible: a small square button ("−" when shown, "+" when hidden)
 * that toggles the `.visible` of a named GraphObject elsewhere in the same
 * Part's visual tree (found via `Part.findObject(panelName)`) — e.g. to
 * show/hide a "details" panel within a node template.
 */
export function PanelExpanderButton(panelName: string, options: ExpanderButtonOptions = {}): Panel {
  const size = options.size ?? 14;
  const fill = options.background ?? '#ffffff';
  const stroke = options.stroke ?? '#767676';

  const button = new Panel('Spot');
  button.name = `PANELEXPANDERBUTTON_${panelName}`;

  const background = new Shape('roundedRect');
  background.width = size;
  background.height = size;
  background.fill = fill;
  background.stroke = stroke;
  background.strokeWidth = 1;
  background.cornerRadius = 2;

  const glyph = new Shape('minus');
  glyph.width = size * 0.55;
  glyph.height = size * 0.55;
  glyph.fill = stroke;
  glyph.stroke = stroke;

  button.add(background);
  button.add(glyph);

  button.click = (_e: InputEvent, obj: GraphObject) => {
    const part = obj.part as Part | null;
    if (!part) return;
    const target = part.findObject(panelName);
    if (!target) return;
    target.visible = !target.visible;
    glyph.shape = target.visible ? 'minus' : 'plus';
    part.diagram?.invalidate();
  };

  return button;
}
