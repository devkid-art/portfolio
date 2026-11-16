import { expect, test } from '@playwright/test';

const PROJECTS: Record<string, string> = {
  'student-network-china': 'Student Network China',
  studybridge: 'StudyBridge',
  ridelab: 'RIDELAB',
  colisa: 'Colisa',
  reserve: 'Réserve',
  'school-saas': 'School SaaS',
  'esa-cosmetics': 'ESA Cosmetics',
  'welfare-shop': 'The Welfare Shop',
};

for (const locale of ['fr', 'en']) {
  for (const [slug, name] of Object.entries(PROJECTS)) {
    test(`${locale}/${slug} renders its case study`, async ({ page }) => {
      const response = await page.goto(`/${locale}/projets/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(name);
      await expect(page.locator('[data-case-body] h2').first()).toBeVisible();
    });
  }
}

test('an unknown project is a 404', async ({ page }) => {
  const response = await page.goto('/fr/projets/inconnu');
  expect(response?.status()).toBe(404);
});

test('switching language on a case study stays on the same project', async ({ page }) => {
  await page.goto('/fr/projets/colisa');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/projets\/colisa$/);
});

test('a live project links to its site, a local one does not', async ({ page }) => {
  await page.goto('/fr/projets/ridelab');
  await expect(page.getByRole('main').locator('a[href="https://ridelab-pink.vercel.app"]')).toHaveCount(1);
  await page.goto('/fr/projets/colisa');
  await expect(page.getByRole('main').locator('a[href^="https://"]')).toHaveCount(0);
});
