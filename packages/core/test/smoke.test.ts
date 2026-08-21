import { describe, expect, it } from 'vitest';
import { version } from '../src/index.js';

describe('graphojs core', () => {
  it('exposes a version', () => {
    expect(version).toBe('1.3.0');
  });
});
