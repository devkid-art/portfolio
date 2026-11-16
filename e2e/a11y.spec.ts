import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PAGES = ['/fr', '/en', '/fr/projets/student-network-china', '/en/projets/esa-cosmetics'];

for (const path of PAGES) {
  for (const scheme of ['light', 'dark'] as const) {
    test(`${path} (${scheme}) has no serious or critical accessibility violations`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.goto(path);
      await page.locator('html[data-motion]').waitFor({ state: 'attached' });
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      const blocking = violations
        .filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`);
      expect(blocking).toEqual([]);
    });
  }
}

test('keyboard users can reach the main actions in order', async ({ page }) => {
  await page.goto('/fr');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveText('Ruben');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveText('English');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveAttribute('aria-label', /thème/);
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveText('Voir mes projets');
});
