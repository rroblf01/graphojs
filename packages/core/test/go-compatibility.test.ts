import { describe, it, expect } from 'vitest';
import {
  go,
  GraphObject,
  Shape,
  TextBlock,
  Panel,
  Node,
  Link,
  Point,
  Spot,
  Binding,
  Rect,
  Size,
  Margin,
  LayoutNetwork,
} from '../src/index.ts';
import { Group } from '../src/parts/Group.ts';

describe('GoJS Compatibility', () => {
  describe('go namespace', () => {
    it('should export all key classes under go namespace', () => {
      expect(go.Diagram).toBeDefined();
      expect(go.Node).toBeDefined();
      expect(go.Link).toBeDefined();
      expect(go.Group).toBeDefined();
      expect(go.Shape).toBeDefined();
      expect(go.TextBlock).toBeDefined();
      expect(go.Panel).toBeDefined();
      expect(go.GraphObject).toBeDefined();
      expect(go.Binding).toBeDefined();
      expect(go.GraphLinksModel).toBeDefined();
      expect(go.Spot).toBeDefined();
      expect(go.Point).toBeDefined();
      expect(go.Rect).toBeDefined();
    });
  });

  describe('GraphObject.make', () => {
    it('should create a Shape with properties', () => {
      const s = GraphObject.make(Shape, 'RoundedRectangle', {
        fill: 'white',
        stroke: 'gray',
        cornerRadius: 5,
      });
      expect(s).toBeInstanceOf(Shape);
      expect(s.shape).toBe('roundedRect');
      expect(s.fill).toBe('white');
      expect(s.stroke).toBe('gray');
      expect(s.cornerRadius).toBe(5);
    });

    it('should create a TextBlock with text', () => {
      const t = GraphObject.make(TextBlock, 'Hello World', {
        font: '14px sans-serif',
        color: 'blue',
      });
      expect(t).toBeInstanceOf(TextBlock);
      expect(t.text).toBe('Hello World');
      expect(t.font).toBe('14px sans-serif');
      expect(t.color).toBe('blue');
    });

    it('should create a Panel with children', () => {
      const shape = GraphObject.make(Shape, 'rect', { fill: 'red' });
      const text = GraphObject.make(TextBlock, 'Label');
      const panel = GraphObject.make(Panel, 'Auto', shape, text);
      expect(panel).toBeInstanceOf(Panel);
      expect(panel.type).toBe('Auto');
      expect(panel.elementCount).toBe(2);
      expect(panel.elements[0]).toBe(shape);
      expect(panel.elements[1]).toBe(text);
    });

    it('should work with go namespace', () => {
      const $ = go.GraphObject.make;
      const s = $(go.Shape, 'ellipse', { fill: 'green' });
      expect(s).toBeInstanceOf(Shape);
      expect(s.shape).toBe('ellipse');
    });
  });

  describe('GraphObject.name', () => {
    it('should have a name property', () => {
      const s = new Shape('rect');
      expect(s.name).toBe('');
      s.name = 'myShape';
      expect(s.name).toBe('myShape');
    });
  });

  describe('Panel.findElement', () => {
    it('should find a child by name', () => {
      const panel = new Panel('Auto');
      const shape = new Shape('rect');
      shape.name = 'bg';
      const text = new TextBlock('Hello');
      text.name = 'label';
      panel.add(shape);
      panel.add(text);

      expect(panel.findElement('bg')).toBe(shape);
      expect(panel.findElement('label')).toBe(text);
      expect(panel.findElement('missing')).toBeNull();
    });

    it('should find nested elements', () => {
      const inner = new Panel('Vertical');
      const text = new TextBlock('nested');
      text.name = 'innerText';
      inner.add(text);

      const outer = new Panel('Auto');
      outer.add(inner);

      expect(outer.findElement('innerText')).toBe(text);
    });
  });

  describe('Part.location', () => {
    it('should return a Point', () => {
      const node = Node.fromPosAndSize(1, 10, 20, 100, 50);
      const loc = node.location;
      expect(loc).toBeInstanceOf(Point);
      expect(loc.x).toBe(10);
      expect(loc.y).toBe(20);
    });

    it('should set location from Point', () => {
      const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
      node.location = new Point(50, 60);
      expect(node.bounds.x).toBe(50);
      expect(node.bounds.y).toBe(60);
    });
  });

  describe('Link.fromNode / toNode aliases', () => {
    it('should have fromNode and toNode getters', () => {
      const link = new Link(100, 1, 2);
      expect(link.fromNode).toBe(1);
      expect(link.toNode).toBe(2);
    });

    it('should have fromNode and toNode setters', () => {
      const link = new Link(100, 1, 2);
      link.fromNode = 3;
      link.toNode = 4;
      expect(link.fromNode).toBe(3);
      expect(link.toNode).toBe(4);
      expect(link.fromKey).toBe(3);
      expect(link.toKey).toBe(4);
    });
  });

  describe('Spot static constants', () => {
    it('should have standard spot constants', () => {
      expect(Spot.TopLeft.x).toBe(0);
      expect(Spot.TopLeft.y).toBe(0);
      expect(Spot.Center.x).toBe(0.5);
      expect(Spot.Center.y).toBe(0.5);
      expect(Spot.BottomRight.x).toBe(1);
      expect(Spot.BottomRight.y).toBe(1);
    });
  });

  describe('Node.findObject', () => {
    it('should find a named element in the node panel', () => {
      const node = Node.fromPosAndSize(1, 0, 0, 100, 60);
      const bg = new Shape('rect');
      bg.name = 'bgShape';
      bg.fill = 'red';
      const label = new TextBlock('Hello');
      label.name = 'textLabel';
      const panel = new Panel('Auto');
      panel.add(bg);
      panel.add(label);
      node.panel = panel;

      expect(node.findObject('bgShape')).toBe(bg);
      expect(node.findObject('textLabel')).toBe(label);
      expect(node.findObject('missing')).toBeNull();
    });

    it('should return null when no panel', () => {
      const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
      expect(node.findObject('anything')).toBeNull();
    });
  });

  describe('Node.add / elements', () => {
    it('should auto-create panel on add()', () => {
      const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
      expect(node.hasPanel).toBe(false);

      const shape = new Shape('rect');
      node.add(shape);

      expect(node.hasPanel).toBe(true);
      expect(node.elements.length).toBe(1);
      expect(node.elements[0]).toBe(shape);
    });

    it('should add to existing panel', () => {
      const node = Node.fromPosAndSize(1, 0, 0, 100, 60);
      const panel = new Panel('Auto');
      node.panel = panel;

      const shape = new Shape('rect');
      const text = new TextBlock('Label');
      node.add(shape).add(text);

      expect(node.elements.length).toBe(2);
    });

    it('should return empty array when no panel', () => {
      const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
      expect(node.elements).toEqual([]);
    });
  });

  describe('Binding.copy', () => {
    it('should copy a binding', () => {
      const b = new Binding('text', 'name');
      const copy = b.copy();
      expect(copy.targetProperty).toBe('text');
      expect(copy.sourceProperty).toBe('name');
      expect(copy).not.toBe(b);
    });
  });

  describe('GoJS Link properties', () => {
    it('should have fromEndSegmentLength and toEndSegmentLength', () => {
      const link = new Link(100, 1, 2);
      expect(link.fromEndSegmentLength).toBe(10);
      expect(link.toEndSegmentLength).toBe(10);
      link.fromEndSegmentLength = 20;
      link.toEndSegmentLength = 30;
      expect(link.fromEndSegmentLength).toBe(20);
      expect(link.toEndSegmentLength).toBe(30);
    });

    it('should have relinkableFrom and relinkableTo', () => {
      const link = new Link(100, 1, 2);
      expect(link.relinkableFrom).toBe(false);
      expect(link.relinkableTo).toBe(false);
      link.relinkableFrom = true;
      link.relinkableTo = true;
      expect(link.relinkableFrom).toBe(true);
      expect(link.relinkableTo).toBe(true);
    });

    it('should have reshapable and pathPattern', () => {
      const link = new Link(100, 1, 2);
      expect(link.reshapable).toBe(false);
      link.reshapable = true;
      expect(link.reshapable).toBe(true);
      expect(link.pathPattern).toBeNull();
      link.pathPattern = 'dashed';
      expect(link.pathPattern).toBe('dashed');
    });
  });

  describe('GraphObject.cursor', () => {
    it('should have a cursor property', () => {
      const s = new Shape('rect');
      expect(s.cursor).toBe('');
      s.cursor = 'pointer';
      expect(s.cursor).toBe('pointer');
    });
  });

  describe('GoJS enum constants', () => {
    it('should expose Link routing constants', () => {
      expect(Link.Orthogonal).toBe('orthogonal');
      expect(Link.Curved).toBe('curved');
      expect(Link.Straight).toBe('straight');
      const link = new Link(1, 1, 2);
      link.routing = Link.Orthogonal;
      expect(link.routing).toBe('orthogonal');
    });

    it('should expose Link arrowhead constants', () => {
      expect(Link.StandardArrowHead).toBe('triangle');
      expect(Link.DiamondArrowHead).toBe('diamond');
      expect(Link.CircleArrowHead).toBe('circle');
      expect(Link.None).toBe('none');
      const link = new Link(1, 1, 2);
      link.arrowhead = Link.DiamondArrowHead;
      expect(link.arrowhead).toBe('diamond');
    });

    it('should expose Shape figure constants', () => {
      expect(Shape.Rectangle).toBe('rect');
      expect(Shape.RoundedRectangle).toBe('roundedRect');
      expect(Shape.Ellipse).toBe('ellipse');
      expect(Shape.Diamond).toBe('diamond');
    });

    it('should expose Panel type constants', () => {
      expect(Panel.Auto).toBe('Auto');
      expect(Panel.Spot).toBe('Spot');
      expect(Panel.Table).toBe('Table');
      const p = new Panel(Panel.Auto);
      expect(p.type).toBe('Auto');
    });
  });

  describe('GoJS geometry parse', () => {
    it('should parse Point from string', () => {
      const p = Point.parse('10, 20');
      expect(p.x).toBe(10);
      expect(p.y).toBe(20);
    });

    it('should parse Rect from string', () => {
      const r = Rect.parse('1 2 3 4');
      expect(r).toEqual(new Rect(1, 2, 3, 4));
    });

    it('should parse Size from string', () => {
      const s = Size.parse('50, 30');
      expect(s.width).toBe(50);
      expect(s.height).toBe(30);
    });

    it('should parse Margin with 1, 2, or 4 values', () => {
      expect(Margin.parse('5')).toEqual(new Margin(5, 5, 5, 5));
      expect(Margin.parse('1, 2')).toEqual(new Margin(1, 2, 1, 2));
      expect(Margin.parse('1 2 3 4')).toEqual(new Margin(1, 2, 3, 4));
    });
  });

  describe('GoJS shape normalization', () => {
    it('should normalize GoJS figure names', () => {
      const s = new Shape('RoundedRectangle');
      expect(s.shape).toBe('roundedRect');
      const d = new Shape('Diamond');
      expect(d.shape).toBe('diamond');
      const unknown = new Shape('NotARealShape');
      expect(unknown.shape).toBe('rect');
    });
  });

  describe('Panel.insertAt', () => {
    it('should insert an element at a specific index', () => {
      const p = new Panel('Vertical');
      const a = new Shape('rect');
      const b = new Shape('ellipse');
      const c = new Shape('diamond');
      p.add(a);
      p.add(c);
      p.insertAt(1, b);
      expect(p.elements[0]).toBe(a);
      expect(p.elements[1]).toBe(b);
      expect(p.elements[2]).toBe(c);
    });
  });

  describe('Part.findAdornmentNamed', () => {
    it('should return null for missing adornments', () => {
      const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
      expect(node.findAdornmentNamed('selection')).toBeNull();
    });
  });

  describe('GraphObject.setBinding', () => {
    it('should attach a binding to an element', () => {
      const t = new TextBlock('Hello');
      const b = new Binding('text', 'name');
      t.setBinding(b);
      expect(t.bindings.length).toBe(1);
      expect(t.bindings[0]).toBe(b);
    });

    it('should replace a binding with the same target property', () => {
      const t = new TextBlock('Hello');
      t.setBinding(new Binding('text', 'name'));
      t.setBinding(new Binding('text', 'title'));
      expect(t.bindings.length).toBe(1);
      expect(t.bindings[0].sourceProperty).toBe('title');
    });
  });

  describe('GraphObject.make with Part templates', () => {
    it('should build a template panel from go.Node', () => {
      const $ = GraphObject.make;
      const template = $(Node, 'Auto', $(Shape, 'RoundedRectangle'));
      expect(template).toBeInstanceOf(Panel);
      expect(template.type).toBe('Auto');
      expect(template.elementCount).toBe(1);
    });

    it('should store template properties on the panel', () => {
      const $ = GraphObject.make;
      const template = $(Link, { routing: 'orthogonal', corner: 5 }, $(Shape, 'rect'));
      const panel = template as Panel;
      expect(panel.templateProperties.routing).toBe('orthogonal');
      expect(panel.templateProperties.corner).toBe(5);
    });

    it('should attach bindings to elements inside a template', () => {
      const $ = GraphObject.make;
      const template = $(Node, 'Auto', $(TextBlock, 'x', new Binding('text', 'name')));
      const panel = template as Panel;
      const text = panel.elements[0] as TextBlock;
      expect(text.bindings.length).toBe(1);
      expect(text.bindings[0].sourceProperty).toBe('name');
    });
  });

  describe('go.Shape.geometryString', () => {
    it('should render an SVG path via geometryString', () => {
      const s = new Shape('rect');
      s.geometryString = 'M 10 10 L 90 10 L 90 90 Z';
      expect(s.geometryString).toContain('M 10 10');
      const clone = s.clone();
      expect(clone.geometryString).toContain('M 10 10');
    });
  });

  describe('LayoutNetwork', () => {
    it('should build a network with vertices and edges', () => {
      const n1 = Node.fromPosAndSize(1, 0, 0, 100, 50);
      const n2 = Node.fromPosAndSize(2, 200, 0, 100, 50);
      const n3 = Node.fromPosAndSize(3, 0, 200, 100, 50);
      const link = new Link(100, 1, 2);
      const link2 = new Link(101, 1, 3);

      const network = LayoutNetwork.fromParts([n1, n2, n3], [link, link2]);
      expect(network.vertices.length).toBe(3);
      expect(network.edges.length).toBe(2);

      const v1 = network.findVertex(1);
      expect(v1).not.toBeNull();
      expect(v1!.outDegree).toBe(2);
      expect(v1!.isRoot).toBe(true);
      expect(v2IsLeaf()).toBe(true);

      function v2IsLeaf(): boolean {
        const v2 = network.findVertex(2);
        return v2 ? v2.isLeaf : false;
      }
    });

    it('should expose the network on the Layout base', () => {
      const layout = new go.GridLayout({ spacing: 10 });
      const nodes = [Node.fromPosAndSize(1, 0, 0, 100, 50), Node.fromPosAndSize(2, 0, 0, 100, 50)];
      const network = layout.makeNetwork(nodes, []);
      expect(network.vertices.length).toBe(2);
      expect(layout.network).toBe(network);
    });
  });

  describe('Binding path expressions', () => {
    it('should resolve dot paths on the data object', () => {
      const t = new TextBlock();
      const b = new Binding('text', 'data.name');
      const data = { data: { name: 'Nested' } };
      b.applyToTarget(t, data as never);
      expect(t.text).toBe('Nested');
    });

    it('should default sourceProperty to targetProperty', () => {
      const b = new Binding('text');
      expect(b.sourceProperty).toBe('text');
      const t = new TextBlock();
      b.applyToTarget(t, { text: 'Hello' } as never);
      expect(t.text).toBe('Hello');
    });

    it('should apply converters after path resolution', () => {
      const t = new TextBlock();
      const b = new Binding('text', 'meta.color', (v: unknown) => String(v).toUpperCase());
      b.applyToTarget(t, { meta: { color: 'red' } } as never);
      expect(t.text).toBe('RED');
    });
  });

  describe('TextBlock GoJS properties', () => {
    it('should support stroke as an alias for color', () => {
      const t = new TextBlock('Hello');
      t.stroke = 'red';
      expect(t.color).toBe('red');
      expect(t.stroke).toBe('red');
      t.color = 'blue';
      expect(t.stroke).toBe('blue');
    });

    it('should support editable flag', () => {
      const t = new TextBlock('Hello');
      expect(t.editable).toBe(false);
      t.editable = true;
      expect(t.editable).toBe(true);
    });

    it('should clone editable flag', () => {
      const t = new TextBlock('Hello');
      t.editable = true;
      const clone = t.clone();
      expect(clone.editable).toBe(true);
    });

    it('should support fontFamily/fontSize/fontStyle', () => {
      const t = new TextBlock('Hello');
      t.fontFamily = 'monospace';
      expect(t.font).toContain('monospace');
      t.fontSize = 20;
      expect(t.font).toContain('20px');
      t.fontStyle = 'bold';
      expect(t.font).toContain('bold');
      expect(t.fontSize).toBe(20);
    });
  });

  describe('Shape.figure alias', () => {
    it('should expose figure as an alias for shape', () => {
      const s = new Shape('rect');
      s.figure = 'RoundedRectangle';
      expect(s.shape).toBe('roundedRect');
      expect(s.figure).toBe('roundedRect');
    });
  });

  describe('More GoJS 1:1 properties', () => {
    it('should support Binding.ofObject', () => {
      const b = new Binding('itemArray', 'items').ofObject('data');
      expect(b.sourceObjectName).toBe('data');
      const copy = b.copy();
      expect(copy.sourceObjectName).toBe('data');
    });

    it('should resolve ofObject("parent") to the parent panel data', () => {
      const outer = new Panel('Vertical');
      const tb = new TextBlock('x');
      tb.setBinding(new Binding('text', 'parentText').ofObject('parent'));
      outer.add(tb);

      outer.applyBindings({ parentText: 'FromParent' } as never);

      expect(tb.text).toBe('FromParent');
    });

    it('should support Part.position setter', () => {
      const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
      node.position = { x: 50, y: 60 };
      expect(node.bounds.x).toBe(50);
      expect(node.bounds.y).toBe(60);
      expect(node.bounds.width).toBe(100);
    });

    it('should support Shape.strokeCap/strokeJoin and TextBlock.strokeWidth', () => {
      const s = new Shape('rect');
      s.strokeCap = 'round';
      s.strokeJoin = 'bevel';
      expect(s.strokeCap).toBe('round');
      expect(s.strokeJoin).toBe('bevel');

      const t = new TextBlock('x');
      t.strokeWidth = 2;
      expect(t.strokeWidth).toBe(2);
    });

    it('should attach click/doubleClick handlers via GraphObject.make', () => {
      const $ = GraphObject.make;
      let clicks = 0;
      const shape = $(Shape, 'RoundedRectangle', {
        click: () => clicks++,
      });
      expect(typeof shape.click).toBe('function');
      shape.click?.({} as MouseEvent, shape);
      expect(clicks).toBe(1);
    });
  });

  describe('Panel data panels (itemArray/itemTemplate)', () => {
    it('should generate one element per item from the template', () => {
      const panel = new Panel('Vertical');
      const template = new TextBlock('item');
      template.setBinding(new Binding('text', 'text'));
      panel.itemTemplate = template;
      panel.itemArray = [{ text: 'A' }, { text: 'B' }, { text: 'C' }];

      expect(panel.elementCount).toBe(3);
      const texts = panel.elements.map((e) => (e as TextBlock).text);
      expect(texts).toEqual(['A', 'B', 'C']);
    });

    it('should regenerate items when the array changes', () => {
      const panel = new Panel('Vertical');
      const template = new TextBlock('item');
      template.setBinding(new Binding('text', 'text'));
      panel.itemTemplate = template;
      panel.itemArray = [{ text: 'A' }];
      expect(panel.elementCount).toBe(1);

      panel.itemArray = [{ text: 'X' }, { text: 'Y' }];
      expect(panel.elementCount).toBe(2);
      expect((panel.elements[0] as TextBlock).text).toBe('X');
      expect((panel.elements[1] as TextBlock).text).toBe('Y');
    });

    it('should bind itemArray via a Binding (GoJS pattern)', () => {
      const panel = new Panel('Vertical');
      const itemTemplate = new TextBlock('item');
      itemTemplate.setBinding(new Binding('text', 'text'));
      panel.itemTemplate = itemTemplate;
      panel.setBinding(new Binding('itemArray', 'items'));
      panel.applyBindings({ items: [{ text: 'A' }, { text: 'B' }] } as never);
      expect(panel.elementCount).toBe(2);
      expect((panel.elements[0] as TextBlock).text).toBe('A');
    });

    it('should clone item templates in clone()', () => {
      const panel = new Panel('Vertical');
      const template = new TextBlock('item');
      template.setBinding(new Binding('text', 'text'));
      panel.itemTemplate = template;
      panel.itemArray = [{ text: 'A' }, { text: 'B' }];

      const clone = panel.clone();
      expect(clone.elementCount).toBe(2);
      expect((clone.elements[0] as TextBlock).text).toBe('A');
      // Clones should be independent instances
      expect(clone.elements[0]).not.toBe(panel.elements[0]);
    });
  });

  describe('Group extends Part', () => {
    it('should be constructible', () => {
      const group = new Group(1);
      expect(group.key).toBe(1);
      expect(group.isGroup).toBe(true);
    });
  });
});
