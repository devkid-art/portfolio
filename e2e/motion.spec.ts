import { expect, test, type Page } from '@playwright/test';

async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= height; y += 400) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(900);
}

async function revealOpacities(page: Page) {
  return page.$$eval('[data-reveal]', (els) => els.map((el) => Number(getComputedStyle(el).opacity)));
}

test('reduced motion: switch is set and nothing stays hidden', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/fr');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  const opacities = await revealOpacities(page);
  expect(opacities.length).toBeGreaterThan(0);
  expect(opacities.every((o) => o === 1)).toBe(true);
});

test('full motion: switch is set and every reveal ends visible after scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/fr');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  await scrollThrough(page);
  const opacities = await revealOpacities(page);
  expect(opacities.length).toBeGreaterThan(0);
  expect(opacities.every((o) => o === 1)).toBe(true);
});
