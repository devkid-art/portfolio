// Records posters, screenshots and short scroll videos of each project into public/media/<slug>/.
// Usage: node scripts/capture/capture.mjs [slug ...]
// Live projects use their public pages; local ones must be running with their demo data
// (Colisa :4101, ESA :4102, Welfare Shop :4103, Réserve :4104).
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { chromium } from '@playwright/test';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';

const TARGETS = {
  'student-network-china': { url: 'https://app.studybridgechina.uk' },
  studybridge: { url: 'https://www.studybridgechina.uk' },
  ridelab: { url: 'https://ridelab-pink.vercel.app' },
  colisa: { url: 'http://localhost:4101' },
  'esa-cosmetics': { url: 'http://localhost:4102' },
  'welfare-shop': { url: 'http://localhost:4103' },
  reserve: { url: 'http://localhost:4104/book/salon-elegance-douala' },
};

const OUT = path.resolve('public/media');
const MAX_VIDEO_BYTES = 2_000_000;

async function settle(page) {
  await page.waitForLoadState('networkidle', { timeout: 45_000 }).catch(() => {});
  // Cookie banners: always take the privacy-preserving choice before capturing.
  const decline = page.getByRole('button', { name: /^(decline|refuser|reject|tout refuser)/i }).first();
  if (await decline.isVisible().catch(() => false)) await decline.click().catch(() => {});
  await page.waitForTimeout(1500);
}

async function capture(slug, { url }) {
  const dir = path.join(OUT, slug);
  mkdirSync(dir, { recursive: true });
  const tmp = mkdtempSync(path.join(tmpdir(), `cap-${slug}-`));
  const browser = await chromium.launch();
  try {
    // Desktop: poster, a second view, and a slow scroll recorded as video.
    const desktop = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: { dir: tmp, size: { width: 1280, height: 800 } },
      colorScheme: 'light',
    });
    const page = await desktop.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await settle(page);
    await page.screenshot({ path: path.join(tmp, 'poster.png') });
    for (let i = 0; i < 110; i++) {
      await page.mouse.wheel(0, 28);
      await page.waitForTimeout(70);
    }
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(tmp, 'shot-1.png') });
    await desktop.close();

    // Phone: the first screen at 390 px.
    const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const mobile = await phone.newPage();
    await mobile.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await settle(mobile);
    await mobile.screenshot({ path: path.join(tmp, 'shot-2.png') });
    await phone.close();
  } finally {
    await browser.close();
  }

  await sharp(path.join(tmp, 'poster.png')).resize(1440).webp({ quality: 72 }).toFile(path.join(dir, 'poster.webp'));
  await sharp(path.join(tmp, 'shot-1.png')).resize(1440).webp({ quality: 72 }).toFile(path.join(dir, 'shot-1.webp'));
  await sharp(path.join(tmp, 'shot-2.png')).resize(780).webp({ quality: 72 }).toFile(path.join(dir, 'shot-2.webp'));

  const raw = readdirSync(tmp).find((f) => f.endsWith('.webm'));
  const input = path.join(tmp, raw);
  const common = ['-y', '-ss', '1.2', '-t', '9', '-i', input, '-an', '-vf', 'scale=960:-2,fps=24'];
  execFileSync(ffmpeg, [...common, '-c:v', 'libx264', '-preset', 'slow', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(dir, 'loop.mp4')], { stdio: 'ignore' });
  execFileSync(ffmpeg, [...common, '-c:v', 'libvpx-vp9', '-crf', '42', '-b:v', '0', '-row-mt', '1', path.join(dir, 'loop.webm')], { stdio: 'ignore' });
  rmSync(tmp, { recursive: true, force: true });

  for (const f of ['loop.mp4', 'loop.webm']) {
    const size = statSync(path.join(dir, f)).size;
    console.log(`${slug}/${f}: ${(size / 1e6).toFixed(2)} MB${size > MAX_VIDEO_BYTES ? '  ⚠ over 2 MB' : ''}`);
  }
}

const wanted = process.argv.slice(2);
for (const [slug, target] of Object.entries(TARGETS)) {
  if (wanted.length && !wanted.includes(slug)) continue;
  try {
    await capture(slug, target);
  } catch (error) {
    console.error(`${slug}: ${error.message}`);
  }
}
