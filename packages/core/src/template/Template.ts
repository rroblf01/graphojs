import type { NodeData } from '../model/Model.ts';
import type { ShapeType } from '../shapes/ShapeTypes.ts';

/**
 * A template defines a reusable node configuration.
 */
export interface Template {
  /** Unique identifier. */
  id: string;
  /** Display name. */
  name: string;
  /** Category for grouping. */
  category: string;
  /** Description. */
  description?: string;
  /** The shape type. */
  shape: ShapeType;
  /** Default width. */
  width: number;
  /** Default height. */
  height: number;
  /** Default fill color. */
  fill: string;
  /** Default stroke color. */
  stroke: string;
  /** Default stroke width. */
  strokeWidth: number;
  /** Default label. */
  label: string;
  /** Default label color. */
  labelColor: string;
  /** Default label font. */
  labelFont: string;
  /** Corner radius (for roundedRect). */
  cornerRadius?: number;
  /** Additional properties. */
  properties?: Record<string, unknown>;
}

/**
 * Create a NodeData object from a template.
 */
export function templateToNodeData(
  template: Template,
  key: string | number,
  x: number,
  y: number,
): NodeData {
  return {
    key,
    x,
    y,
    width: template.width,
    height: template.height,
    shape: template.shape,
    fill: template.fill,
    stroke: template.stroke,
    strokeWidth: template.strokeWidth,
    label: template.label,
    labelColor: template.labelColor,
    labelFont: template.labelFont,
    cornerRadius: template.cornerRadius,
    ...template.properties,
  };
}
