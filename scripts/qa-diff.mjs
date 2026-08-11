/**
 * Final QA gate: capture every screen/state with headless Chromium at true
 * 375px resolution and pixel-diff against the Figma reference renders.
 *
 * - AA-aware compare (pixelmatch, includeAA off) so font antialiasing noise
 *   is not counted; structural drift is.
 * - Writes full-res heatmaps to design/qa/<ref>-diff.png (red = mismatch).
 *
 * Usage: node scripts/qa-diff.mjs [baseUrl]   (default http://localhost:5173)
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const BASE = process.argv[2] || 'http://localhost:5173';

/** [route, refId, viewportHeight, action?, cropBottom?] */
const SCREENS = [
  ['/market?linked=0', '1_7750', 1034],
  ['/market?linked=1', '1_8098', 958],
  ['/store/hm?linked=0', '1_8525', 1014],
  ['/store/hm?linked=0', '1_8748', 1014, 'expandTiers'],
  ['/store/hm?linked=1', '1_9029', 848],
  ['/store/ikea?linked=0', '1_9221', 1004],
  ['/store/ikea?linked=1', '1_9807', 968],
  ['/store/zara?linked=0', '1_9399', 968],
  ['/store/zara?linked=1', '1_9603', 968],
  ['/cashback/intro', '1_10239', 1190],
  ['/cashback/add-card', '1_10416', 812],
  ['/cashback/success', '1_10469', 812],
  ['/cards?linked=1', '1_10563', 1006],
  ['/cards?linked=0', '1_10736', 812],
  ['/cards/manage?linked=1', '1_10520', 812],
  ['/cards/manage?linked=1&cards=3', '1_10838', 812],
  ['/transactions?linked=1', '1_10931', 812],
  ['/transactions?linked=1', '1_11098', 812, 'openTxSheet', 717],
  ['/store/ikea?linked=0', '1_9993', 812, 'openOfferSheet'],
  ['/store/ikea?linked=1', '1_10105', 812, 'openOfferSheet'],
  // سحب الكاش باك — withdrawal flow (section 27:9923). The two fully-filled
  // new-account frames (27_10174, 27_11293) are interaction-verified but not
  // auto-gated: their captures would need the exact drawn form values.
  ['/withdraw/account', '27_9927', 812],
  ['/withdraw/account', '27_10402', 812, 'selectAccount'],
  ['/withdraw/new-account', '27_10059', 812],
  ['/withdraw/new-account', '27_10288', 812, 'ibanMode'],
  ['/withdraw/new-account', '27_11408', 812, 'openBankSheet', 754],
  ['/withdraw/amount?waccount=1', '27_10534', 812],
  ['/withdraw/amount?waccount=1', '27_10685', 812, 'amount50'],
  ['/withdraw/amount?waccount=1', '27_10836', 812, 'amountMax'],
  ['/withdraw/summary?waccount=1&wamount=50', '27_10987', 812],
  ['/withdraw/pin', '27_11214', 812],
  ['/withdraw/pin?touchid=1', '27_11251', 812],
  ['/withdraw/status?ok=1', '27_11148', 812],
  ['/withdraw/status?ok=0', '27_11167', 812],
];

const ACTIONS = {
  async expandTiers(page) {
    await page.click('button[aria-expanded]');
  },
  async selectAccount(page) {
    await page.locator('button', { hasText: 'حمود الخضر' }).first().click();
  },
  async ibanMode(page) {
    await page.locator('text=IBAN').first().click();
  },
  async openBankSheet(page) {
    await page.locator('text=بنك المستفيد').first().click();
  },
  async amount50(page) {
    await page.locator('button', { hasText: /^50$/ }).click();
  },
  async amountMax(page) {
    await page.locator('button', { hasText: 'أقصى مبلغ' }).click();
  },
  async openTxSheet(page) {
    await page.locator('button', { hasText: '08:30' }).first().click();
  },
  async openOfferSheet(page) {
    await page.locator('button', { hasText: 'خصم 15%' }).first().click();
  },
};

mkdirSync('design/qa', { recursive: true });
const browser = await chromium.launch();
const results = [];

for (const [route, refId, height, action, cropBottom] of SCREENS) {
  // Some Figma renders were downscaled by the 1024px export cap; capture at a
  // matching devicePixelRatio so both sides lose the same high frequencies.
  const refPeek = PNG.sync.read(readFileSync(`design/refs/${refId}.png`));
  const dpr = refPeek.width < 374 ? refPeek.width / 375 : 1;
  const page = await browser.newPage({ viewport: { width: 375, height }, deviceScaleFactor: dpr });
  try {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        [...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => ((i.onload = r), (i.onerror = r)))),
      );
    });
    await page.waitForTimeout(450); // screen-enter animation settle
    if (action) {
      await ACTIONS[action](page);
      await page.waitForTimeout(450); // sheet/expand animation settle
    }
    const shotBuf = await page.screenshot();
    let shot = PNG.sync.read(shotBuf);
    const ref = PNG.sync.read(readFileSync(`design/refs/${refId}.png`));

    if (cropBottom) {
      const crop = new PNG({ width: shot.width, height: cropBottom });
      PNG.bitblt(shot, crop, 0, shot.height - cropBottom, shot.width, cropBottom, 0, 0);
      shot = crop;
    }

    const w = Math.min(shot.width, ref.width);
    const h = Math.min(shot.height, ref.height);
    const a = new PNG({ width: w, height: h });
    const b = new PNG({ width: w, height: h });
    PNG.bitblt(shot, a, 0, 0, w, h, 0, 0);
    PNG.bitblt(ref, b, 0, 0, w, h, 0, 0);
    const diff = new PNG({ width: w, height: h });
    const bad = pixelmatch(a.data, b.data, diff.data, w, h, { threshold: 0.16, includeAA: false });
    const pct = ((100 * bad) / (w * h)).toFixed(2);
    writeFileSync(`design/qa/${refId}-diff.png`, PNG.sync.write(diff));
    writeFileSync(`design/qa/${refId}-shot.png`, PNG.sync.write(shot));
    results.push({ refId, route: route + (action ? ` +${action}` : ''), bad, pct: Number(pct) });
    console.log(`${refId}  ${pct}%  (${bad}px)  ${route}${action ? ' +' + action : ''}`);
  } catch (err) {
    results.push({ refId, route, error: String(err).slice(0, 120) });
    console.log(`${refId}  FAILED  ${String(err).slice(0, 120)}`);
  } finally {
    await page.close();
  }
}

await browser.close();
results.sort((x, y) => (y.pct ?? 999) - (x.pct ?? 999));
console.log('\n=== WORST FIRST ===');
for (const r of results) console.log(`${r.refId}  ${r.error ? 'ERR ' + r.error : r.pct + '%'}  ${r.route}`);
