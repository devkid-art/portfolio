import { describe, expect, it } from 'vitest';
import { projects } from './projects';
import { computeStats } from './stats';

describe('computeStats', () => {
  it('counts products, live sites and distinct technologies from the real data', () => {
    const stats = computeStats(projects);
    expect(stats.products).toBe(8);
    expect(stats.live).toBe(3);
    expect(stats.technologies).toBe(new Set(projects.flatMap((p) => p.stack)).size);
  });

  it('handles an empty list', () => {
    expect(computeStats([])).toEqual({ products: 0, live: 0, technologies: 0 });
  });
});
