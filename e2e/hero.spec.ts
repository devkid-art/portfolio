import { expect, test } from '@playwright/test';

test.describe('hero', () => {
  test('the hero text is visible at first paint, not faded in', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/fr');
    const hero = page.getByRole('region', { name: 'Ruben' });
    await expect(hero.locator('[data-reveal]')).toHaveCount(0);
  });

  test('shows the name, the work button and GitHub', async ({ page }) => {
    await page.goto('/fr');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Ruben');
    await expect(page.getByRole('link', { name: 'Voir mes projets' })).toHaveAttribute('href', '#projets');
    const hero = page.getByRole('region', { name: 'Ruben' });
    await expect(hero.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/devkid-art',
    );
  });

  test('English hero uses English labels', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('link', { name: 'See my work' })).toHaveAttribute('href', '#projets');
  });

  test('reduced motion keeps the static globe and never starts WebGL', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/fr');
    await expect(page.locator('[data-globe-fallback]')).toBeVisible();
    await page.waitForTimeout(1500);
    await expect(page.locator('canvas')).toHaveCount(0);
  });

  test('full motion upgrades to the 3D globe when WebGL works, or keeps the fallback', async ({ page }, info) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/fr');
    await page.locator('html[data-motion]').waitFor({ state: 'attached' });
    // The 3D globe waits for the visitor's first gesture, so it never competes with first paint.
    await page.waitForTimeout(1500);
    await expect(page.locator('canvas')).toHaveCount(0);
    await page.mouse.move(400, 300);
    await page.mouse.move(420, 320);
    await page.waitForTimeout(3000);
    if (info.project.name === 'no-webgl') {
      await expect(page.locator('[data-globe-fallback]')).toBeVisible();
      await expect(page.locator('canvas')).toHaveCount(0);
    } else {
      await expect(page.locator('[data-globe] canvas')).toHaveCount(1);
    }
    expect(errors).toEqual([]);
  });
});
