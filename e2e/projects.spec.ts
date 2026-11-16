import { expect, test } from '@playwright/test';

const FEATURED = ['student-network-china', 'studybridge', 'ridelab', 'colisa', 'reserve'];
const LIVE = ['student-network-china', 'studybridge', 'ridelab'];

test('one ticket per featured project, each linking to its case study', async ({ page }) => {
  await page.goto('/fr');
  const tickets = page.locator('#projets [data-ticket]');
  await expect(tickets).toHaveCount(FEATURED.length);
  for (const slug of FEATURED) {
    const ticket = page.locator(`#projets [data-ticket][data-slug="${slug}"]`);
    await expect(ticket.getByRole('link', { name: 'Voir l’étude de cas' })).toHaveAttribute('href', `/fr/projets/${slug}`);
  }
});

test('only the three live projects link to an external site', async ({ page }) => {
  await page.goto('/fr');
  for (const slug of FEATURED) {
    const external = page.locator(`#projets [data-ticket][data-slug="${slug}"] a[href^="https://"]`);
    await expect(external).toHaveCount(LIVE.includes(slug) ? 1 : 0);
  }
});

test('every ticket carries its tracking code and status stamp', async ({ page }) => {
  await page.goto('/fr');
  await expect(page.locator('[data-slug="colisa"] [data-code]')).toHaveText('PRJ-CLS-004');
  await expect(page.locator('[data-slug="student-network-china"] [data-stamp]')).toHaveText('En ligne');
  await expect(page.locator('[data-slug="reserve"] [data-stamp]')).toHaveText('Prêt');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('featured project names are in the HTML', async ({ page }) => {
    await page.goto('/fr');
    for (const name of ['Student Network China', 'StudyBridge', 'RIDELAB', 'Colisa', 'Réserve']) {
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
    }
  });
});

test.describe('on a 375 px phone', () => {
  test.use({ viewport: { width: 375, height: 812 } });
  test('the page never scrolls sideways and tickets stack vertically', async ({ page }) => {
    await page.goto('/fr');
    await page.waitForTimeout(1500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const boxes = await page.locator('#projets [data-ticket]').evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect()).map((r) => ({ x: Math.round(r.x), y: Math.round(r.y) })),
    );
    for (let i = 1; i < boxes.length; i++) {
      expect(boxes[i].x).toBe(boxes[0].x);
      expect(boxes[i].y).toBeGreaterThan(boxes[i - 1].y);
    }
  });
});
