import AxeBuilder from '@axe-core/playwright';
import { gotoHydrated } from './helpers';
import { expect, test } from '@playwright/test';

const toggle = (page: import('@playwright/test').Page) =>
  page.getByRole('button', { name: /thème|theme/i });

test('the toggle switches data-theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await gotoHydrated(page, '/fr');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await toggle(page).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('the chosen theme survives a reload', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await gotoHydrated(page, '/fr');
  await toggle(page).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('the chosen theme survives a language switch, with no console error', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.emulateMedia({ colorScheme: 'light' });
  await gotoHydrated(page, '/fr');
  await toggle(page).click();
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('html[data-motion]').waitFor({ state: 'attached' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(errors).toEqual([]);
});

test('without a saved choice the theme follows the system', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/fr');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

for (const scheme of ['light', 'dark'] as const) {
  test(`no contrast violations in ${scheme} theme`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.goto('/fr');
    const results = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
    expect(results.violations).toEqual([]);
  });
}
