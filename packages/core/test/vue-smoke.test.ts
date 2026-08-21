import { describe, expect, it } from 'vitest';
import { version } from '../src/vue/index.ts';

describe('graphojs/vue', () => {
  it('exposes a version', () => {
    expect(version).toBe('1.7.0');
  });
});
