import { expect, test, type Page } from '@playwright/test';

/** Scrolls until the real bottom: the pinned section lengthens the page once GSAP has loaded. */
async function scrollThrough(page: Page) {
  for (let i = 0; i < 200; i++) {
    const atBottom = await page.evaluate(
      () => scrollY + innerHeight >= document.documentElement.scrollHeight - 2,
    );
    if (atBottom && i > 10) break;
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(500);
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
  expect((await revealOpacities(page)).length).toBeGreaterThan(0);
  // Animations are created lazily; each must end fully visible — a stuck one fails after 10 s.
  await expect
    .poll(async () => (await revealOpacities(page)).every((o) => o === 1), { timeout: 10_000 })
    .toBe(true);
});
