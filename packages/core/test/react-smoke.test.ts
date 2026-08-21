import { describe, expect, it } from 'vitest';
import { version } from '../src/react/index.tsx';

describe('graphojs/react', () => {
  it('exposes a version', () => {
    expect(version).toBe('1.8.0');
  });
});
