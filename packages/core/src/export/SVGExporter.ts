import type { Diagram } from '../diagram/Diagram.ts';
import { Group } from '../parts/Group.ts';
import { Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import { LayerNames } from '../layer/Layer.ts';

/**
 * SVG exporter for diagrams.
 * Generates an SVG string from the current diagram state.
 */
export class SVGExporter {
  private indent: string;
  private padding: number;

  constructor(options?: { indent?: string; padding?: number }) {
    this.indent = options?.indent ?? '  ';
    this.padding = options?.padding ?? 20;
  }

  /**
   * Export a diagram to SVG string.
   */
  export(diagram: Diagram): string {
    const parts: string[] = [];
    const layers = diagram.getLayers();

    // Calculate bounds
    const bounds = this.calculateBounds(diagram);
    const width = bounds.width + this.padding * 2;
    const height = bounds.height + this.padding * 2;
    const offsetX = bounds.x - this.padding;
    const offsetY = bounds.y - this.padding;

    // SVG header
    parts.push(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${offsetX} ${offsetY} ${width} ${height}">`,
    );

    // Background
    parts.push(
      `${this.indent}<rect x="${offsetX}" y="${offsetY}" width="${width}" height="${height}" fill="${diagram.getRenderer().getCanvas().style.backgroundColor || '#ffffff'}" />`,
    );

    // Render layers in order
    for (const layer of layers) {
      if (layer.name === LayerNames.Grid) continue;
      if (layer.partCount === 0) continue;

      const layerOpacity = layer.opacity;
      const groupOpen = layerOpacity < 1 ? `${this.indent}<g opacity="${layerOpacity}">` : '';
      const groupClose = layerOpacity < 1 ? `${this.indent}</g>` : '';

      if (groupOpen) parts.push(groupOpen);

      for (const part of layer.getVisibleParts()) {
        if (part instanceof Group) {
          parts.push(this.exportGroup(part));
        } else if (part instanceof Link) {
          parts.push(this.exportLink(part));
        } else if (part instanceof Node) {
          parts.push(this.exportNode(part));
        }
      }

      if (groupClose) parts.push(groupClose);
    }

    parts.push('</svg>');
    return parts.join('\n');
  }

  /**
   * Export diagram to a downloadable SVG file.
   */
  exportToFile(diagram: Diagram, filename: string): void {
    const svgString = this.export(diagram);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }

  /**
   * Export as a data URL.
   */
  exportToDataURL(diagram: Diagram): string {
    const svgString = this.export(diagram);
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  }

  private calculateBounds(diagram: Diagram): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    const layers = diagram.getLayers();
    for (const layer of layers) {
      for (const part of layer.parts) {
        if (!part.visible) continue;
        minX = Math.min(minX, part.bounds.x);
        minY = Math.min(minY, part.bounds.y);
        maxX = Math.max(maxX, part.bounds.right);
        maxY = Math.max(maxY, part.bounds.bottom);
      }
    }

    if (minX === Infinity) {
      return { x: 0, y: 0, width: 100, height: 100 };
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  private exportNode(node: Node): string {
    const { x, y, width, height } = node.bounds;
    const fill = node.fill;
    const stroke = node.stroke;
    const strokeWidth = node.strokeWidth;
    const opacity = node.opacity;

    let element: string;

    switch (node.shape) {
      case 'ellipse': {
        const cx = x + width / 2;
        const cy = y + height / 2;
        element = `${this.indent}<ellipse cx="${cx}" cy="${cy}" rx="${width / 2}" ry="${height / 2}"`;
        break;
      }
      case 'roundedRect': {
        const r = node.cornerRadius;
        element = `${this.indent}<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${r}" ry="${r}"`;
        break;
      }
      default: {
        element = `${this.indent}<rect x="${x}" y="${y}" width="${width}" height="${height}"`;
        break;
      }
    }

    const attrs = [`fill="${fill}"`, `stroke="${stroke}"`, `stroke-width="${strokeWidth}"`];

    if (opacity < 1) {
      attrs.push(`opacity="${opacity}"`);
    }

    if (node.isSelected) {
      attrs.push('class="selected"');
    }

    element += ` ${attrs.join(' ')} />`;

    // Label
    if (node.label) {
      const cx = x + width / 2;
      const cy = y + height / 2;
      const labelAttrs = [
        `x="${cx}"`,
        `y="${cy}"`,
        'text-anchor="middle"',
        'dominant-baseline="central"',
        `fill="${node.labelColor}"`,
        `font="${node.labelFont}"`,
      ];
      element += `\n${this.indent}<text ${labelAttrs.join(' ')}>${this.escapeXml(node.label)}</text>`;
    }

    return element;
  }

  private exportLink(link: Link): string {
    const from = link.fromPort;
    const to = link.toPort;

    const attrs = [
      `x1="${from.x}"`,
      `y1="${from.y}"`,
      `x2="${to.x}"`,
      `y2="${to.y}"`,
      `stroke="${link.stroke}"`,
      `stroke-width="${link.strokeWidth}"`,
    ];

    if (link.opacity < 1) {
      attrs.push(`opacity="${link.opacity}"`);
    }

    if (link.isSelected) {
      attrs.push('class="selected"');
    }

    return `${this.indent}<line ${attrs.join(' ')} />`;
  }

  private exportGroup(group: Group): string {
    const { x, y, width, height } = group.bounds;
    const fill = group.fill;
    const stroke = group.stroke;
    const strokeWidth = group.strokeWidth;
    const opacity = group.opacity;

    const attrs = [
      `x="${x}"`,
      `y="${y}"`,
      `width="${width}"`,
      `height="${height}"`,
      `fill="${fill}"`,
      `stroke="${stroke}"`,
      `stroke-width="${strokeWidth}"`,
    ];

    if (opacity < 1) {
      attrs.push(`opacity="${opacity}"`);
    }

    return `${this.indent}<rect ${attrs.join(' ')} />`;
  }

  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

/** Create an SVG exporter with default options. */
export function createSVGExporter(options?: { indent?: string; padding?: number }): SVGExporter {
  return new SVGExporter(options);
}

/** Quick export a diagram to SVG string. */
export function exportToSVG(diagram: Diagram): string {
  return new SVGExporter().export(diagram);
}
