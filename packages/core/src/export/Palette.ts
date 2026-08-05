import { Diagram } from '../diagram/Diagram.ts';
import type { NodeData } from '../model/Model.ts';
import type { Template } from '../template/Template.ts';
import { templateToNodeData } from '../template/Template.ts';

/**
 * A palette shows templates that can be dragged onto a diagram.
 * Dragging a template item onto the diagram adds a new node.
 */
export class Palette {
  private element: HTMLDivElement;
  private diagram: Diagram;
  private templates: Template[];
  private showCategories: boolean;

  constructor(
    container: HTMLElement,
    diagram?: Diagram,
    templates?: Template[],
    options?: { showCategories?: boolean },
  ) {
    // GoJS-compatible: a Palette creates its own internal diagram when none given
    if (diagram) {
      this.diagram = diagram;
    } else {
      const internalDiv = document.createElement('div');
      internalDiv.style.width = '100%';
      internalDiv.style.height = '100%';
      container.appendChild(internalDiv);
      this.diagram = new Diagram({ div: internalDiv });
    }
    this.templates = templates ?? [];
    this.showCategories = options?.showCategories ?? true;

    this.element = document.createElement('div');
    this.element.className = 'graphojs-palette';
    this.element.style.cssText =
      'overflow-y:auto;user-select:none;background:#fafafa;border:1px solid #ddd;';
    container.appendChild(this.element);

    registerPalette(this.diagram, this);
    this.render();
    this.setupDragEvents();
  }

  /** Get the palette DOM element. */
  getElement(): HTMLDivElement {
    return this.element;
  }

  /** Get the diagram this palette is connected to. */
  getDiagram(): Diagram {
    return this.diagram;
  }

  /** Set the templates shown in this palette. */
  setTemplates(templates: Template[]): void {
    this.templates = templates;
    this.element.innerHTML = '';
    this.render();
  }

  /** Render the palette items. */
  private render(): void {
    if (this.showCategories) {
      this.renderByCategory();
    } else {
      this.renderFlat();
    }
  }

  private renderByCategory(): void {
    const categories = new Map<string, Template[]>();
    for (const template of this.templates) {
      const list = categories.get(template.category);
      if (list) {
        list.push(template);
      } else {
        categories.set(template.category, [template]);
      }
    }

    for (const [category, items] of categories) {
      const header = document.createElement('div');
      header.textContent = this.capitalize(category);
      header.style.cssText =
        'padding:6px 10px;font-weight:bold;font-size:12px;color:#555;background:#f0f0f0;border-bottom:1px solid #e0e0e0;position:sticky;top:0;';
      this.element.appendChild(header);

      const list = document.createElement('div');
      list.style.cssText = 'padding:6px;display:flex;flex-direction:column;gap:6px;';
      for (const item of items) {
        list.appendChild(this.createItem(item));
      }
      this.element.appendChild(list);
    }
  }

  private renderFlat(): void {
    const list = document.createElement('div');
    list.style.cssText = 'padding:6px;display:flex;flex-direction:column;gap:6px;';
    for (const item of this.templates) {
      list.appendChild(this.createItem(item));
    }
    this.element.appendChild(list);
  }

  private createItem(template: Template): HTMLDivElement {
    const item = document.createElement('div');
    item.draggable = true;
    item.dataset.templateId = template.id;
    item.style.cssText =
      'display:flex;align-items:center;gap:8px;padding:6px 8px;border:1px solid #e0e0e0;border-radius:4px;background:#fff;cursor:grab;';
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer?.setData('application/x-graphojs-template', template.id);
      e.dataTransfer?.setData('text/plain', template.name);
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'copy';
      }
    });

    // Preview swatch
    const swatch = document.createElement('div');
    swatch.style.cssText = `width:16px;height:16px;border-radius:3px;background:${template.fill};border:2px solid ${template.stroke};flex-shrink:0;`;
    item.appendChild(swatch);

    // Name
    const name = document.createElement('span');
    name.textContent = template.name;
    name.style.cssText = 'font-size:13px;color:#333;';
    item.appendChild(name);

    return item;
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /** Set up drag and drop events on the palette. */
  private setupDragEvents(): void {
    this.element.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }
    });
  }

  /**
   * Handle a drop of a template onto the diagram.
   * Called externally by the diagram's drop handling.
   */
  handleDropOnDiagram(templateId: string, diagramX: number, diagramY: number): NodeData | null {
    const template = this.templates.find((t) => t.id === templateId);
    if (!template) return null;

    const model = this.diagram.getModel();
    const key = model.generateKey();
    const nodeData = templateToNodeData(template, key, diagramX, diagramY);

    model.addNode(nodeData);
    return nodeData;
  }
}

/**
 * Create a palette with all predefined templates.
 * The predefined templates are loaded lazily so they do not inflate the
 * main bundle unless a default palette is actually created.
 */
export async function createDefaultPalette(
  container: HTMLElement,
  diagram: Diagram,
  options?: { showCategories?: boolean },
): Promise<Palette> {
  const { getAllTemplates } = await import('../template/TemplateCollection.ts');
  return new Palette(container, diagram, getAllTemplates(), options);
}

/** Handle a drop event on a diagram's container. */
export function handleDrop(e: DragEvent, diagram: Diagram): boolean {
  e.preventDefault();
  const templateId = e.dataTransfer?.getData('application/x-graphojs-template');
  if (!templateId) return false;

  const canvas = diagram.getRenderer().getCanvas();
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const point = {
    x: mouseX / diagram.getViewport().scale + diagram.getViewport().x,
    y: mouseY / diagram.getViewport().scale + diagram.getViewport().y,
  };

  const palette = findPaletteForDiagram(diagram);
  if (!palette) return false;
  return palette.handleDropOnDiagram(templateId, point.x, point.y) !== null;
}

/** Track palettes to find which one is connected to a diagram. */
const paletteRegistry = new WeakMap<Diagram, Palette>();

export function registerPalette(diagram: Diagram, palette: Palette): void {
  paletteRegistry.set(diagram, palette);
}

export function findPaletteForDiagram(diagram: Diagram): Palette | undefined {
  return paletteRegistry.get(diagram);
}

import { registerDomComponent } from '../panel/ComponentRegistry.ts';

registerDomComponent(Palette);
