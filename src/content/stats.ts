import type { Project } from './types';

export function computeStats(list: Project[]) {
  return {
    products: list.length,
    live: list.filter((p) => p.status === 'live').length,
    technologies: new Set(list.flatMap((p) => p.stack)).size,
  };
}
