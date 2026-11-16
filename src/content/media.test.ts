import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { projects } from './projects';

const publicPath = (p: string) => path.join(process.cwd(), 'public', p);
// School SaaS has no runnable demo yet: its ticket shows the code watermark instead.
const CAPTURED = projects.filter((p) => p.slug !== 'school-saas');

describe('project media', () => {
  it('has a poster, two screenshots and a video for every captured project', () => {
    for (const p of CAPTURED) {
      for (const file of [p.media.poster, ...p.media.shots, `${p.media.video}.mp4`, `${p.media.video}.webm`]) {
        expect(existsSync(publicPath(file)), file).toBe(true);
      }
    }
  });

  it('keeps every video under 2 MB', () => {
    for (const p of CAPTURED) {
      for (const ext of ['mp4', 'webm']) {
        const file = publicPath(`${p.media.video}.${ext}`);
        if (existsSync(file)) expect(statSync(file).size, file).toBeLessThan(2_000_000);
      }
    }
  });

  it('uses webp posters', () => {
    for (const p of projects) expect(p.media.poster).toMatch(/\.webp$/);
  });
});
