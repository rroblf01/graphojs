import { describe, it, expect } from 'vitest';
import {
  go,
  GraphObject,
  Shape,
  TextBlock,
  Panel,
  Part,
  Node,
  Link,
  Point,
  Spot,
  GraphLinksModel,
  Rect,
  Binding,
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
      expect(s.shape).toBe('RoundedRectangle');
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
});
