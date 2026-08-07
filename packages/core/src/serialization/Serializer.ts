import type { Diagram } from '../diagram/Diagram.ts';
import type { GraphLinksModelJSON } from '../model/GraphLinksModel.ts';
import { GraphLinksModel } from '../model/GraphLinksModel.ts';
import type { LinkData, NodeData, NodeKey } from '../model/Model.ts';

/**
 * Diagram JSON format.
 */
export interface DiagramJSON {
  /** Version of the format. */
  version: string;
  /** The model data. */
  model: GraphLinksModelJSON;
  /** Diagram options. */
  options?: {
    scale?: number;
    offsetX?: number;
    offsetY?: number;
    showGrid?: boolean;
    gridSize?: number;
    backgroundColor?: string;
  };
}

/** Serialize a diagram to JSON. */
export function serializeDiagram(diagram: Diagram): DiagramJSON {
  const model = diagram.getModel();
  const viewport = diagram.getViewport();

  return {
    version: '0.1.0',
    model: model.toJSON(),
    options: {
      scale: viewport.scale,
      offsetX: viewport.x,
      offsetY: viewport.y,
    },
  };
}

/** Deserialize JSON into a diagram. */
export function deserializeDiagram(json: DiagramJSON, diagram: Diagram): void {
  const model = GraphLinksModel.fromJSON(json.model);
  diagram.setModel(model);

  if (json.options) {
    if (json.options.scale !== undefined) {
      diagram.setViewport(json.options.offsetX ?? 0, json.options.offsetY ?? 0, json.options.scale);
    }
  }
}

/** Serialize a diagram to a JSON string. */
export function serializeToString(diagram: Diagram): string {
  const json = serializeDiagram(diagram);
  return JSON.stringify(json, null, 2);
}

/** Deserialize a JSON string into a diagram. */
export function deserializeFromString(jsonString: string, diagram: Diagram): void {
  const json = JSON.parse(jsonString) as DiagramJSON;
  deserializeDiagram(json, diagram);
}

/** Export diagram to a downloadable file. */
export function exportToFile(diagram: Diagram, filename: string): void {
  const jsonString = serializeToString(diagram);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

/** Import diagram from a file. */
export function importFromFile(diagram: Diagram): Promise<void> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve();
        return;
      }

      try {
        const text = await file.text();
        deserializeFromString(text, diagram);
        resolve();
      } catch (err) {
        reject(err);
      }
    };

    input.click();
  });
}

// --- GraphML ---
// GraphML (http://graphml.graphdrawing.org/) is an XML graph interchange
// format understood by tools like yEd and Gephi. Arbitrary node/link data
// properties round-trip via <data> elements declared with a <key>; `key` is
// mapped to the GraphML node `id`, `from`/`to` to the edge `source`/`target`.

type GraphMLAttrType = 'string' | 'boolean' | 'int' | 'double';

function inferGraphMLAttrType(value: unknown): GraphMLAttrType {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'double';
  return 'string';
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Serialize a diagram's model to a GraphML XML string.
 *
 * @experimental The attribute-type inference and node-key numeric coercion
 * heuristics may still change before 1.0.0 — there's no real GoJS API to
 * mirror here, so the round-trip format is this project's own design.
 */
export function serializeToGraphML(diagram: Diagram): string {
  const model = diagram.getModel();
  const nodeDataArray = model.nodeDataArray;
  const linkDataArray = model.linkDataArray;

  const keyIds = new Map<string, string>(); // `${for}:${attrName}` -> key id
  const keyDecls: Array<{
    id: string;
    for: 'node' | 'edge';
    attrName: string;
    attrType: GraphMLAttrType;
  }> = [];

  const registerKey = (forKind: 'node' | 'edge', attrName: string, value: unknown): string => {
    const mapKey = `${forKind}:${attrName}`;
    let id = keyIds.get(mapKey);
    if (!id) {
      id = `d${keyDecls.length}`;
      keyIds.set(mapKey, id);
      keyDecls.push({ id, for: forKind, attrName, attrType: inferGraphMLAttrType(value) });
    }
    return id;
  };

  const nodeXml = nodeDataArray.map((data) => {
    const attrs = Object.entries(data).filter(([k]) => k !== 'key');
    const dataXml = attrs
      .map(([k, v]) => `<data key="${registerKey('node', k, v)}">${escapeXml(String(v))}</data>`)
      .join('');
    return `    <node id="${escapeXml(String(data.key))}">${dataXml}</node>`;
  });

  const edgeXml = linkDataArray.map((data, i) => {
    const attrs = Object.entries(data).filter(([k]) => k !== 'from' && k !== 'to');
    const dataXml = attrs
      .map(([k, v]) => `<data key="${registerKey('edge', k, v)}">${escapeXml(String(v))}</data>`)
      .join('');
    return `    <edge id="e${i}" source="${escapeXml(String(data.from))}" target="${escapeXml(String(data.to))}">${dataXml}</edge>`;
  });

  const keyXml = keyDecls.map(
    (k) =>
      `  <key id="${k.id}" for="${k.for}" attr.name="${escapeXml(k.attrName)}" attr.type="${k.attrType}"/>`,
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<graphml xmlns="http://graphml.graphdrawing.org/xmlns">',
    ...keyXml,
    '  <graph id="G" edgedefault="directed">',
    ...nodeXml,
    ...edgeXml,
    '  </graph>',
    '</graphml>',
  ].join('\n');
}

/** A numeric-looking string round-trips back to a number (GraphML ids are always strings). */
function coerceGraphMLKey(value: string): NodeKey {
  return /^-?\d+(\.\d+)?$/.test(value) ? Number(value) : value;
}

function coerceGraphMLValue(value: string, attrType: GraphMLAttrType | undefined): unknown {
  switch (attrType) {
    case 'boolean':
      return value === 'true';
    case 'int':
    case 'double':
      return Number(value);
    default:
      return value;
  }
}

/**
 * Parse a GraphML XML string into a diagram's model.
 *
 * @experimental See {@link serializeToGraphML}.
 */
export function deserializeFromGraphML(xml: string, diagram: Diagram): void {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('Invalid GraphML document');
  }

  const keyTypes = new Map<string, GraphMLAttrType>();
  const keyNames = new Map<string, string>();
  for (const keyEl of Array.from(doc.querySelectorAll('key'))) {
    const id = keyEl.getAttribute('id');
    if (!id) continue;
    keyNames.set(id, keyEl.getAttribute('attr.name') ?? id);
    keyTypes.set(id, (keyEl.getAttribute('attr.type') ?? 'string') as GraphMLAttrType);
  }

  const readData = (el: Element): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    for (const dataEl of Array.from(el.querySelectorAll(':scope > data'))) {
      const keyId = dataEl.getAttribute('key');
      if (!keyId) continue;
      const name = keyNames.get(keyId) ?? keyId;
      result[name] = coerceGraphMLValue(dataEl.textContent ?? '', keyTypes.get(keyId));
    }
    return result;
  };

  const nodeDataArray: NodeData[] = Array.from(doc.querySelectorAll('graph > node')).map((el) => ({
    key: coerceGraphMLKey(el.getAttribute('id') ?? ''),
    ...readData(el),
  }));

  const linkDataArray: LinkData[] = Array.from(doc.querySelectorAll('graph > edge')).map((el) => ({
    from: coerceGraphMLKey(el.getAttribute('source') ?? ''),
    to: coerceGraphMLKey(el.getAttribute('target') ?? ''),
    ...readData(el),
  }));

  diagram.setModel(new GraphLinksModel({ nodeDataArray, linkDataArray }));
}

/**
 * Export a diagram's model to a downloadable .graphml file.
 *
 * @experimental See {@link serializeToGraphML}.
 */
export function exportToGraphMLFile(diagram: Diagram, filename: string): void {
  const xml = serializeToGraphML(diagram);
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

/**
 * Import a diagram's model from a .graphml file chosen by the user.
 *
 * @experimental See {@link serializeToGraphML}.
 */
export function importFromGraphMLFile(diagram: Diagram): Promise<void> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.graphml,.xml';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve();
        return;
      }

      try {
        const text = await file.text();
        deserializeFromGraphML(text, diagram);
        resolve();
      } catch (err) {
        reject(err);
      }
    };

    input.click();
  });
}

/** Serializer namespace for backward compatibility. */
export const Serializer = {
  serialize: serializeDiagram,
  deserialize: deserializeDiagram,
  serializeToString,
  deserializeFromString,
  exportToFile,
  importFromFile,
  serializeToGraphML,
  deserializeFromGraphML,
  exportToGraphMLFile,
  importFromGraphMLFile,
} as const;
