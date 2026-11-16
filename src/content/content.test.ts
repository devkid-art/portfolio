import { describe, expect, it } from 'vitest';
import { routing } from '@/i18n/routing';
import { profile } from './profile';
import { getProject, projects, projectsUsing } from './projects';
import { TECH, TECH_GROUPS, type TechId } from './tech';
import { PLACES } from './places';
import type { Localized } from './types';

const LIVE = ['student-network-china', 'studybridge', 'ridelab'];

function expectLocalized(value: Localized<string | string[]>, where: string) {
  for (const locale of routing.locales) {
    const v = value[locale];
    const filled = Array.isArray(v) ? v.length > 0 && v.every((s) => s.trim() !== '') : v.trim() !== '';
    expect(filled, `${where} [${locale}]`).toBe(true);
  }
}

describe('projects', () => {
  it('has the 8 projects of the spec', () => {
    expect(projects.map((p) => p.slug).sort()).toEqual(
      ['colisa', 'esa-cosmetics', 'reserve', 'ridelab', 'school-saas', 'student-network-china', 'studybridge', 'welfare-shop'],
    );
  });

  it('has unique slugs', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it('has unique tracking codes shaped PRJ-XXX-000', () => {
    expect(new Set(projects.map((p) => p.code)).size).toBe(projects.length);
    for (const p of projects) expect(p.code, p.slug).toMatch(/^PRJ-[A-Z]{3}-\d{3}$/);
  });

  it('fills every localized text in fr and en', () => {
    for (const p of projects) {
      expectLocalized(p.tagline, `${p.slug}.tagline`);
      expectLocalized(p.problem, `${p.slug}.problem`);
      expectLocalized(p.highlights, `${p.slug}.highlights`);
    }
  });

  it('only references known technologies and places', () => {
    for (const p of projects) {
      for (const t of p.stack) expect(Object.keys(TECH), `${p.slug} uses ${t}`).toContain(t);
      for (const pl of p.places) expect(Object.keys(PLACES), `${p.slug} at ${pl}`).toContain(pl);
    }
  });

  it('uses at least one technology of every group', () => {
    const used = new Set(projects.flatMap((p) => p.stack).map((t) => TECH[t].group));
    for (const g of TECH_GROUPS) expect(used, g).toContain(g);
  });

  it('gives a progress only to projects under construction', () => {
    for (const p of projects) {
      if (p.status === 'building') expect(p.progress, p.slug).toBeGreaterThan(0);
      else expect(p.progress, p.slug).toBeUndefined();
    }
  });

  it('links a live site only for the three projects online', () => {
    expect(projects.filter((p) => p.liveUrl).map((p) => p.slug).sort()).toEqual([...LIVE].sort());
    for (const p of projects.filter((p) => p.liveUrl)) expect(p.liveUrl, p.slug).toMatch(/^https:\/\//);
  });

  it('labels ESA as a proposal and Welfare Shop as delivered', () => {
    expect(getProject('esa-cosmetics')?.status).toBe('proposal');
    expect(getProject('welfare-shop')?.status).toBe('delivered');
  });

  it('finds projects by technology', () => {
    const slugs = projectsUsing('nextjs' as TechId).map((p) => p.slug);
    expect(slugs).toContain('reserve');
    expect(slugs).toContain('ridelab');
    expect(slugs).not.toContain('colisa');
  });
});

describe('profile', () => {
  it('publishes only GitHub and LinkedIn, never an e-mail or a phone', () => {
    expect(Object.keys(profile.links).sort()).toEqual(['github', 'linkedin']);
    for (const url of Object.values(profile.links)) expect(url).not.toMatch(/^(mailto|tel):/);
    expect(profile.links.github).toBe('https://github.com/devkid-art');
  });

  it('states the school', () => {
    expect(profile.school.fr).toContain('Nanjing Tech University');
    expect(profile.school.en).toContain('Nanjing Tech University');
  });
});
