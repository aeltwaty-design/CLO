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

/** [route, refId, viewportHeight, action?, cropBottom?, outName?] */
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
  // seeded success — intentional deviation from 27:11148: the UX-enhancement
  // receipt (specifics line + arrival timeline + remaining balance) renders
  // because live withdraw state exists
  ['/withdraw/status?ok=1&waccount=1&wamount=50', '27_11148', 812, null, null, '27_11148-receipt'],
  // Phase 2 Home (47:3538, 375×2443). Ref is the capped full-node export
  // (~157px wide) so this runs as a DPR-matched smoke diff, not a fine gate.
  ['/home?phase=2', '47_3538', 2443],
  // linked Home — derived after-state (pill 560.50 + cashback strip replace
  // the drawn before-only content): documented intentional deviation
  ['/home?phase=2&linked=1', '47_3538', 2443, null, null, '47_3538-linked'],
  // Phase 2 Wallet (points) — before 54:10152 (full 1685, capped ref → DPR
  // smoke) / after 54:10497 (true 375×812 viewport frame)
  ['/wallet?phase=2&linked=0', '54_10152', 1685],
  ['/wallet?phase=2&linked=1', '54_10497', 812],
  // Phase 2 Market · القسائم tab (65:23785) — true 375×812 ref. The lilac
  // promo banner (91:43784) now sits under its first row, so the capture
  // carries that documented deviation from the older frame.
  ['/market?phase=2&tab=vouchers', '65_23785', 812],
  // Phase 2 Market · العروض tab (91:44135) — offer rows + the same banner
  ['/market?phase=2&tab=offers&linked=1', '91_44135', 951],
  // «أهدِها» gift flow (drawn تحويل النقاط section; refs pulled from the
  // source frames via the local Dev-Mode MCP). Points → cashback adaptation
  // per user direction, so the amount screens deviate by design (Riyal
  // glyphs + ÷100 chip values + كاش باك copy vs the drawn points values);
  // the pick screens and failure status are structural 1:1 gates. The PIN
  // capture carries the seeded context line (state-conditional UX layer).
  ['/gift/pick?aud=colleagues&linked=1&phase=2', '3196_33656', 812, 'giftPickRecent'],
  ['/gift/pick?aud=family&linked=1&phase=2', '3196_33505', 812, 'giftPickFamily'],
  ['/gift/amount?linked=1&phase=2&gaud=colleagues', '3196_31717', 812],
  ['/gift/amount?linked=1&phase=2&gaud=family', '3196_31868', 812],
  ['/gift/pin?linked=1&phase=2&gaud=colleagues&gamount=50', '3887_40765', 812],
  ['/gift/status?ok=1&phase=2', '3196_32860', 812],
  ['/gift/status?ok=0&phase=2', '3196_32879', 812],
  // Voucher purchase flow (65:23784). The store page and drawer gain the
  // user-directed flexible-payment surfaces (مبلغ مخصص tile · طريقة الدفع
  // block), so they deviate from the drawn frames by design; the PIN and the
  // success ticket are structural matches.
  ['/store/amazon?linked=1&phase=2', '65_25229', 846],
  ['/store/amazon?linked=1&phase=2&vface=100', '65_24960', 812, 'openPurchase'],
  // the drawn PIN frame shows its Touch ID overlay open
  ['/vouchers/pin?linked=1&phase=2&vstore=amazon&vface=100', '65_26375', 812, 'openTouchId'],
  ['/vouchers/success?ok=1&linked=1&phase=2&vstore=amazon&vface=100', '65_25888', 950],
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
  // gift pick refs are drawn in their selected states
  async giftPickRecent(page) {
    // recents column: the حمود avatar tile (ring + green label when active)
    await page.locator('button:has-text("حمود الخضر")').first().click();
  },
  async giftPickFamily(page) {
    await page.locator('button', { hasText: 'سارة القحطاني' }).first().click();
  },
  async openTouchId(page) {
    await page.click('button[aria-label="البصمة"]');
  },
  // the purchase drawer is drawn over the store page with a tier picked
  async openPurchase(page) {
    await page.click('[data-testid=voucher-100]');
    await page.waitForTimeout(150);
    await page.click('[data-testid=buy-voucher]');
  },
};

mkdirSync('design/qa', { recursive: true });
const browser = await chromium.launch();
const results = [];

for (const [route, refId, height, action, cropBottom, outName] of SCREENS) {
  const out = outName ?? refId;
  // Some Figma renders were downscaled by the 1024px export cap; capture at a
  // matching devicePixelRatio so both sides lose the same high frequencies.
  const refPeek = PNG.sync.read(readFileSync(`design/refs/${refId}.png`));
  const dpr = refPeek.width < 374 ? refPeek.width / 375 : 1;
  const page = await browser.newPage({ viewport: { width: 375, height }, deviceScaleFactor: dpr });
  try {
    // the gate always audits Phase 1 (the frozen approved experience);
    // the app otherwise defaults to Phase 2, the working copy
    await page.addInitScript(() => sessionStorage.setItem('cashback-phase', '1'));
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
    writeFileSync(`design/qa/${out}-diff.png`, PNG.sync.write(diff));
    writeFileSync(`design/qa/${out}-shot.png`, PNG.sync.write(shot));
    results.push({ refId: out, route: route + (action ? ` +${action}` : ''), bad, pct: Number(pct) });
    console.log(`${out}  ${pct}%  (${bad}px)  ${route}${action ? ' +' + action : ''}`);
  } catch (err) {
    results.push({ refId: out, route, error: String(err).slice(0, 120) });
    console.log(`${out}  FAILED  ${String(err).slice(0, 120)}`);
  } finally {
    await page.close();
  }
}

await browser.close();
results.sort((x, y) => (y.pct ?? 999) - (x.pct ?? 999));
console.log('\n=== WORST FIRST ===');
for (const r of results) console.log(`${r.refId}  ${r.error ? 'ERR ' + r.error : r.pct + '%'}  ${r.route}`);
