import { expect, test } from '@playwright/test';
import { gotoHydrated } from './helpers';

const USES_POSTGRES = ['student-network-china', 'studybridge', 'ridelab', 'reserve', 'school-saas'];

test('choosing a technology lights up exactly the projects that use it', async ({ page }) => {
  await gotoHydrated(page, '/fr');
  const skills = page.locator('#competences');
  await skills.getByRole('button', { name: 'PostgreSQL' }).click();
  await expect(skills.getByRole('button', { name: 'PostgreSQL' })).toHaveAttribute('aria-pressed', 'true');
  const pills = skills.locator('[data-project-pill]');
  await expect(pills).toHaveCount(8);
  for (const pill of await pills.all()) {
    const slug = await pill.getAttribute('data-slug');
    await expect(pill, slug!).toHaveAttribute('data-active', USES_POSTGRES.includes(slug!) ? 'true' : 'false');
  }
});

test('client work is labelled honestly', async ({ page }) => {
  await page.goto('/fr');
  await expect(page.locator('#clients [data-slug="esa-cosmetics"]')).toContainText('Proposition de refonte');
  await expect(page.locator('#clients [data-slug="welfare-shop"] [data-stamp]')).toHaveText('Livré');
});

test('the project under construction shows its progress', async ({ page }) => {
  await page.goto('/fr');
  await expect(page.locator('#chantier [data-slug="school-saas"] [role="progressbar"]')).toHaveAttribute(
    'aria-valuenow',
    '55',
  );
});

test('contact offers exactly GitHub and LinkedIn', async ({ page }) => {
  await page.goto('/fr');
  const external = page.locator('#contact a[href^="http"]');
  await expect(external).toHaveCount(2);
  await expect(page.locator('#contact a[href="https://github.com/devkid-art"]')).toHaveCount(1);
  await expect(page.locator('#contact a[href*="linkedin.com/in/"]')).toHaveCount(1);
  await expect(page.locator('#contact a[href^="mailto:"], #contact a[href^="tel:"]')).toHaveCount(0);
});

test('the language switch keeps the visitor on the same page', async ({ page }) => {
  await page.goto('/fr');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en$/);
  await page.getByRole('link', { name: 'Français' }).click();
  await expect(page).toHaveURL(/\/fr$/);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('all eight project names and the LinkedIn link are in the HTML', async ({ page }) => {
    await page.goto('/fr');
    for (const name of [
      'Student Network China', 'StudyBridge', 'RIDELAB', 'Colisa', 'Réserve', 'School SaaS', 'ESA Cosmetics', 'The Welfare Shop',
    ]) {
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
    }
    await expect(page.locator('a[href*="linkedin.com/in/"]').first()).toBeVisible();
  });
});
