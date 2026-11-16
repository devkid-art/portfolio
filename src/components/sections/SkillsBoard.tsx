'use client';

import { useState } from 'react';

export type BoardGroup = { id: string; label: string; techs: { id: string; label: string; count: number }[] };
export type BoardProject = { slug: string; name: string; code: string; stack: string[] };

/**
 * Technologies as proof: choosing one lights up the projects that use it.
 * Works by tap or keyboard (buttons with aria-pressed); nothing depends on hover.
 */
export function SkillsBoard({
  groups,
  projects,
  hint,
  usedIn,
}: {
  groups: BoardGroup[];
  projects: BoardProject[];
  hint: string;
  usedIn: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const activeLabel = groups.flatMap((g) => g.techs).find((t) => t.id === active)?.label;

  return (
    <div className="mt-10 grid gap-10 md:grid-cols-[1.5fr_1fr]">
      <div className="grid gap-7 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.id}>
            <h3 className="font-display text-2xl font-bold text-indigo">{group.label}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.techs.map((tech) => {
                const pressed = active === tech.id;
                return (
                  <li key={tech.id}>
                    <button
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => setActive(pressed ? null : tech.id)}
                      className={`rounded-full border-2 px-3 py-1 text-[0.95rem] font-medium transition-colors ${
                        pressed ? 'border-accent bg-accent text-accent-ink' : 'border-line hover:border-indigo'
                      }`}
                    >
                      {tech.label}
                      <span className="sr-only"> ({tech.count})</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="md:sticky md:top-8 md:self-start">
        <p className="text-muted" aria-live="polite">
          {activeLabel ? usedIn.replace('{tech}', activeLabel) : hint}
        </p>
        <ul className="mt-4 grid gap-2">
          {projects.map((p) => {
            const on = active !== null && p.stack.includes(active);
            return (
              <li
                key={p.slug}
                data-project-pill=""
                data-slug={p.slug}
                data-active={on ? 'true' : 'false'}
                className={`flex items-baseline justify-between gap-3 rounded-[10px] border-2 px-4 py-2.5 transition-[border-color,opacity,transform] duration-300 ${
                  active === null
                    ? 'border-line'
                    : on
                      ? 'translate-x-1 border-indigo'
                      : 'border-line opacity-40'
                }`}
              >
                <span className="font-display text-xl font-bold">{p.name}</span>
                <span className="font-stencil text-sm text-muted">{p.code}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
