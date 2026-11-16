import { expect, test } from '@playwright/test';

const SLUGS = ['student-network-china', 'studybridge', 'ridelab', 'colisa', 'reserve', 'school-saas', 'esa-cosmetics', 'welfare-shop'];

test('the sitemap lists both home pages and all 16 case studies', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(locs).toContain('/fr');
  expect(locs).toContain('/en');
  for (const l of ['fr', 'en']) for (const s of SLUGS) expect(locs).toContain(`/${l}/projets/${s}`);
  expect(locs).toHaveLength(18);
});

test('robots.txt allows crawling and points to the sitemap', async ({ request }) => {
  const txt = await (await request.get('/robots.txt')).text();
  expect(txt).toMatch(/Allow: \//);
  expect(txt).toMatch(/Sitemap: .*\/sitemap\.xml/);
});

for (const path of ['/fr', '/en', '/fr/projets/colisa', '/en/projets/student-network-china']) {
  test(`${path} has a title, a share image and language alternates`, async ({ page, request }) => {
    await page.goto(path);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    const image = await page.locator('meta[property="og:image"]').first().getAttribute('content');
    expect(image).toBeTruthy();
    const res = await request.get(new URL(image!).pathname + new URL(image!).search);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/png');
    await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
  });
}

test('the home page describes the person in JSON-LD', async ({ page }) => {
  await page.goto('/fr');
  const json = await page.locator('script[type="application/ld+json"]').first().textContent();
  const data = JSON.parse(json!);
  expect(data['@type']).toBe('Person');
  expect(data.alumniOf.name).toBe('Nanjing Tech University');
  expect(data.sameAs).toContain('https://github.com/devkid-art');
});
