'use client';

import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const t = useTranslations('theme');

  function toggle() {
    const html = document.documentElement;
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('toggle')}
      className="grid size-11 place-items-center rounded-full border border-line text-fg transition-colors hover:border-indigo"
    >
      {/* Half-filled disc: reads as "light / dark" in both themes. */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
      </svg>
    </button>
  );
}
