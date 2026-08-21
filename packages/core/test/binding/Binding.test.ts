import { describe, expect, it } from 'vitest';
import { Binding, bind } from '../../src/binding/Binding.ts';
import type { NodeData } from '../../src/model/Model.ts';
import { Node } from '../../src/parts/Node.ts';

describe('Binding', () => {
  it('should create with target and source properties', () => {
    const binding = new Binding('fill', 'color');
    expect(binding.targetProperty).toBe('fill');
    expect(binding.sourceProperty).toBe('color');
    expect(binding.twoWay).toBe(false);
  });

  it('should create using bind helper', () => {
    const binding = bind('label', 'text');
    expect(binding.targetProperty).toBe('label');
    expect(binding.sourceProperty).toBe('text');
  });

  it('should apply to part from model data', () => {
    const binding = new Binding('fill', 'color');
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const data: NodeData = { key: 1, color: 'red' };

    const result = binding.applyToPart(node, data);
    expect(result).toBe(true);
    expect(node.fill).toBe('red');
  });

  it('should return false when source property is missing', () => {
    const binding = new Binding('fill', 'color');
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const data: NodeData = { key: 1 };

    const result = binding.applyToPart(node, data);
    expect(result).toBe(false);
  });

  it('should apply with converter', () => {
    const binding = new Binding('fill', 'color').ofConverter((value) =>
      String(value).toUpperCase(),
    );
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const data: NodeData = { key: 1, color: 'red' };

    binding.applyToPart(node, data);
    expect(node.fill).toBe('RED');
  });

  it('should apply TwoWay binding to model', () => {
    const binding = new Binding('fill', 'color').makeTwoWay();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.fill = 'blue';
    const data: NodeData = { key: 1, color: 'red' };

    const result = binding.applyToModel(node, data);
    expect(result).toBe(true);
    expect(data.color).toBe('blue');
  });

  it('should not apply to model when not TwoWay', () => {
    const binding = new Binding('fill', 'color');
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.fill = 'blue';
    const data: NodeData = { key: 1, color: 'red' };

    const result = binding.applyToModel(node, data);
    expect(result).toBe(false);
    expect(data.color).toBe('red');
  });

  it('should support back converter', () => {
    const binding = new Binding('fill', 'color').ofBackConverter((value) =>
      String(value).toLowerCase(),
    );
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.fill = 'BLUE';
    const data: NodeData = { key: 1, color: 'red' };

    binding.applyToModel(node, data);
    expect(data.color).toBe('blue');
  });

  it('should read source value with converter', () => {
    const binding = new Binding('fill', 'color').ofConverter((value) =>
      String(value).toUpperCase(),
    );
    const data: NodeData = { key: 1, color: 'red' };

    expect(binding.getSourceValue(data)).toBe('RED');
  });

  it('should read source value without converter', () => {
    const binding = new Binding('fill', 'color');
    const data: NodeData = { key: 1, color: 'red' };

    expect(binding.getSourceValue(data)).toBe('red');
  });

  it('should set target value on part', () => {
    const binding = new Binding('fill', 'color');
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);

    binding.setTargetValue(node, 'green');
    expect(node.fill).toBe('green');
  });

  it('should read value from part', () => {
    const binding = new Binding('fill', 'color');
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.fill = 'yellow';

    expect(binding.getSourceValueFromPart(node)).toBe('yellow');
  });

  it('should read value from part with back converter', () => {
    const binding = new Binding('fill', 'color').ofBackConverter((value) => String(value).length);
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.fill = 'yellow';

    expect(binding.getSourceValueFromPart(node)).toBe(6);
  });

  it('should check equality', () => {
    const a = new Binding('fill', 'color');
    const b = new Binding('fill', 'color');
    const c = new Binding('fill', 'color').makeTwoWay();
    const d = new Binding('stroke', 'color');

    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
    expect(a.equals(d)).toBe(false);
  });

  it('should be chainable with makeTwoWay', () => {
    const binding = new Binding('fill', 'color').makeTwoWay();
    expect(binding.twoWay).toBe(true);
  });

  it('should support chainable converter then makeTwoWay', () => {
    const binding = new Binding('fill', 'color')
      .ofConverter((v) => String(v).toUpperCase())
      .makeTwoWay();

    expect(binding.twoWay).toBe(true);

    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const data: NodeData = { key: 1, color: 'red' };
    binding.applyToPart(node, data);
    expect(node.fill).toBe('RED');
  });
});
