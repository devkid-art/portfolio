import type { Page } from '@playwright/test';

/** Navigates and waits until React has hydrated (MotionProvider sets data-motion on mount). */
export async function gotoHydrated(page: Page, path: string) {
  await page.goto(path);
  await page.locator('html[data-motion]').waitFor({ state: 'attached' });
}
