# كاش باك السويدي — Cashback Prototype

Pixel-perfect interactive prototype of the WalaPlus cashback flow (Arabic),
built 1:1 from the Figma file **Cashback** (section `كاشباك (عربي)`, node `1:7749`).

## Run

```bash
npm install
npm run dev
```

Phone-sized viewport (375×812) renders full-bleed; desktop windows get a centered
phone frame. `?linked=1` / `?linked=0` forces the before/after card-link state
(otherwise every load starts before linking, and completing the flow flips it live).

## The clickable flow

- `/market` — السوق hub (cashback tab). Before linking, the promo banner's
  `ابدأ` opens the **intro bottom sheet** over the market (headline,
  auto-advancing 3-step stepper, trust chips, CTA) — a UX redesign of the
  full-screen onboarding; `/cashback/intro` still serves the original
  full-screen version for deep links and the QA gate.
- `/cashback/add-card` — UX-upgraded form: **live card preview** that fills in
  as you type (scheme detected from the first digit), 4-4-4-4 grouping, expiry
  auto-advance, inline validation ticks, collapsed optional nickname, and a
  CTA that names the missing field. Production note: this region is a PCI
  iframe in the real app; validation here is prototype-side.
- `/cashback/success` — animated confirmation; primary CTA `اكتشف المتاجر`
  lands on the flipped after-link market, secondary goes to the wallet.
- Merchant cards → `/store/:id`, dispatched by variant × link state to the six
  store designs (H&M etc. = cashback; IKEA = offers; Zara = vouchers). Offer
  rows and voucher tiles open the تسوّق واربح sheet (its copy/CTA switch after
  linking); the cashback page's tier card expands/collapses via its chevron.
- Tab bar المحفظة → `/cards` (zero-balance wallet before linking, populated
  after) → `الكل` → `/transactions` → row tap opens the details sheet. The
  populated wallet pulls the expiring-cashback note out of the balance card
  into a compact nudge («عندك 50 ﷼ تنتهي 25 ديسمبر» + «حوّلها الحين») whose
  CTA presets the 50 ﷼ and enters the withdrawal flow.
- `/cards/manage` — «البطاقات المضافة» (from the wallet's البطاقات tile or the
  sheet's إدارة البطاقات); `?cards=3` demos the three-card cap state.
- **Withdrawal «سحب الكاش باك»** — wallet tile «تحويل لحساب بنكي» →
  `/withdraw/account` (radio enables the CTA; «حساب بنكي جديد» → the add-bank
  form with رقم الحساب/IBAN modes and the beneficiary-bank sheet) →
  `/withdraw/amount` (quick chips, «أقصى مبلغ» = balance − fee = 559.5, daily
  limit 1,000) → `/withdraw/summary` (fee 1 + VAT 0.15; info popovers) →
  `/withdraw/pin` (6 digits; the fingerprint key opens the Touch ID overlay,
  `?touchid=1` deep-links it) → `/withdraw/status?ok=1/0`. Demo rules: PIN
  `000000` = wrong PIN handled inline (dots shake + «باقي محاولتين/محاولة»
  counter; the third try lands on the failure status), `999999` = instant
  transfer-failure, anything else succeeds. State seeds: `?waccount=1`,
  `?wamount=50`.
- **Withdrawal UX enhancements** — they render only when live state exists, so
  unseeded captures still match the Figma frames: a fee-transparency line under
  the amount card («المخصوم من رصيدك» = amount + fee + VAT), a success receipt
  (amount + masked account + animated «خلال يوم عمل» arrival timeline +
  remaining balance), a context line above the PIN dots, IBAN validation with
  beneficiary-bank auto-detect (`SA` + 22 digits; the two digits after SA pick
  the bank — 80 الراجحي / 05 الإنماء / 15 البلاد / 60 الجزيرة), and a
  repeat-withdrawal shortcut (the wallet's transfer tile skips straight to the
  amount step once an account is on file).
- Fresh loads always start **before linking** (scenario 1); the linking journey
  flips the app to the after state live, and a reload restarts the demo.
  `?linked=1` deep-links straight to the after state (used by the QA gate).
- **Prototype controls** — under the Phase tabs the desktop shell carries a
  demo panel (hidden at phone widths, so the QA gate never sees it):
  a live **Before card / After card** toggle (`setCardLinked`, no reload — the
  current screen re-renders in the other state), a **Withdraw demo** shortcut
  (seeds account + 50 ﷼ and lands mid-flow), a **3 cards** cap shortcut, a
  **Jump to screen…** menu of every seeded deep link, a collapsible **Demo
  rules** cheat-sheet (PIN codes + seed params), and **↺ Reset** — a full
  factory reset (clears the per-tab state and returns to Phase 2, before
  linking, Home).
- **Phase tabs** — the desktop shell shows a Phase 2 / Phase 1 switcher above
  the phone frame; **Phase 2 is the default tab**. Screens branch on
  `usePhase()` (`src/state/PhaseState.tsx`); Phase 1 stays the frozen
  approved version. `?phase=` deep-links and the choice sticks per browser
  tab via sessionStorage; switching restarts the demo. The switcher is hidden
  at phone-sized viewports, and the QA gate pins itself to Phase 1 via an
  init script (except the explicitly `?phase=2`-seeded Home capture).
- **Phase 2: الرئيسية Home** (Figma 47:3538, 375×2443) — Phase 2 lands on
  `/home` (root redirect + the tab bar's الرئيسية tab, which stays inert in
  Phase 1). Full scrolling home: mint hero header (greeting, car-wash promo
  carousel, عائلتي/بالقرب مني/القسائم tiles, search + 3D category chips),
  savings counter, «عروض يومك», add-card promo (CTA → the linking form),
  favorites empty state, grocery banner, food offers, «قسائم حصرية»,
  flash-sale countdown (static as drawn), retailer circles, «قسائم خاصة»;
  H&M/IKEA cards deep-link to their store pages. The shared `TabBar` gained
  an `active` prop ('market' default, byte-identical for Phase 1). **After
  linking a card** Home reacts (derived state — no drawn after-frame): the
  header pill reads the live 560.50 balance and the add-card promo becomes
  the «إجمالي الكاش باك» strip (Wallet idiom) opening the cashback wallet.
- **Phase 2: the new Saudi Riyal symbol** — everywhere Phase 1 renders the ﷼
  character (FF Shamel draws it as the «ريال» word ligature), Phase 2 renders
  the official new SAR symbol instead, via the shared phase-aware `<Riyal />`
  glyph (`src/components/Riyal.tsx` — the Wikimedia
  `File:Saudi_Riyal_Symbol.svg` masked in `currentColor`, so all 21 sites
  inherit their surrounding text size/color; Phase-1 rendering is
  byte-identical).
- **Phase 2: المحفظة Points Wallet** (Figma 54:10152 before / 54:10497 after
  linking) — the app's main wallet is **points**; cashback is the second
  wallet. In Phase 2 the tab bar's المحفظة opens `/wallet` (points): green
  «500,000» points card with glass actions, then — before linking — the
  «اربط بطاقتك» promo (CTA → the card form), or — after — the viola
  «إجمالي الكاش باك 500 ﷼» strip, plus tabs/filters and the grouped points
  transactions. The **cashback wallet** (`/cards`) is reached from that
  strip and from the ﷼ pill in the Home header. Phase 1 keeps المحفظة →
  `/cards` directly.

## Design-sync toolchain

- `scripts/figma-mcp.mjs` — direct HTTP client for the Figma **Dev Mode MCP server**
  (`localhost:3845`; enable it in Figma desktop → Preferences). Keep the Figma
  window **foregrounded** while pulling: backgrounded, codegen throttles from
  seconds to ~10 minutes per node.
- `scripts/figma-queue.mjs` — sequential `get_design_context` puller that also
  mirrors every referenced asset into `design/assets-raw/` (content-hash names,
  copied to `src/assets/figma/` for imports).
- `design/refs/*.png` — per-screen renders from `get_screenshot`, named by node id.
- `design/inventory.md` — screen ↔ node ↔ route map and build status.
- **Diff harness**: append `?diff=<refId>` (e.g. `?diff=1_7750`) to any route to
  overlay the design render in difference blend — matching pixels go black.
  `?onion=<refId>` gives a 50% onion skin. Size the window to the ref's exact
  frame (e.g. 375×1034 for the Market before-state) or the lower half compares
  the wrong rows. Dev builds only.
- **QA gate**: `node scripts/qa-diff.mjs` (dev server running) captures all 20
  screens/states/sheets with headless Chromium at true resolution and
  pixelmatch-diffs them (AA-aware) against `design/refs`, writing heatmaps to
  `design/qa/`. Accepted floor: ≤~4% glyph-stroke noise (browser vs Figma font
  rasterization); the add-card screen reads ~63% by design — its reference
  contains the IFRAME annotation wash we intentionally replace with real
  fields. Note: Figma's `get_screenshot` caps exports at 1024px — the intro
  ref is stitched from sub-node renders (`1_10239.orig-1024cap.png` kept), and
  the script DPR-matches any ref still narrower than 375. The Market screens
  also read a few points higher than the floor by design: per user direction
  every merchant card uses the same tag look (1:7980 before / 1:8338 after),
  while the reference frames mix in link-CTA and underlay tags. The linking
  flow's redesign shifts two more baselines: add-card ≈60.6% (annotation wash
  + live-preview redesign) and success ≈3% (next-step timeline + CTA swap
  replace the drawn benefits list). The after-link cashback store (1:9029,
  ≈3.8%) also deviates by user direction: the spend-tiers card is kept after
  linking (shared `TiersCard`), though the Figma after-frame drops it. The
  withdrawal fee-transparency line nudges the two filled amount captures
  (`27_10685`/`27_10836`) a few tenths above their old floor, and the extra
  seeded success capture (`27_11148-receipt`, ≈14%) intentionally deviates:
  it renders the receipt block over the plain drawn frame. The Phase-2 Home
  capture (`47_3538`, ≈9.6%) is a coarse smoke diff, not a fine gate: its
  reference is the full-node export downscaled ~0.4× by the 1024px cap and
  cropped out of the padded canvas, so glyph/photo resampling dominates. Its
  linked sibling (`47_3538-linked`, ≈12%) additionally carries the derived
  after-state (560.50 pill + cashback strip) against the before-only ref. The populated
  wallet (`1_10563`, ≈8.5%) also deviates by user direction: the
  expiring-cashback line moved out of the balance card into the compact
  nudge section, shifting the content below it.

## Conventions (important before editing)

- **Physical-LTR DOM**: `<html lang="ar">` with NO `dir` attribute. Figma's
  generated code bakes the RTL design into physical coordinates
  (`right-[16px]`, `text-right`, DOM order = visual order), with `dir="auto"`
  / `dir="rtl"` per text node for bidi. Do not add `dir="rtl"` to the root —
  it would mirror every generated layout.
- **Tokens**: `src/styles/tokens.css` (`@theme`) generated from the Figma
  variables — `text-ink*`, `brand-*`, `surface-*`, `line*`, `bravo-*`, `gold-*`,
  `viola-*`, type scale 12–20/1.5. No hardcoded hex where a token exists.
- **Fonts**: FF Shamel Unique (licensed, `src/assets/fonts/`, weights
  300/400/500/700 — **no 600**: design "Semi Bold" = `font-medium`). Poppins
  (`font-en`) for Latin/digits, exactly where the design uses it.
- **Custom CSS must live in `@layer base/components`** (`src/styles/base.css`) —
  unlayered rules beat Tailwind utilities and once silently stripped button
  padding app-wide.
- Figma strokes are inside the frame box; where a bordered element's design
  height is known, pin `h-[Npx]` instead of relying on padding+border math.
- **Type-check with `npx tsc -b`** (what `npm run build` runs). The root
  `tsconfig.json` is solution-style (`"files": []`), so a bare
  `npx tsc --noEmit` checks nothing and always exits 0.

## Known fidelity notes

- Live-text anti-aliasing/baselines differ from Figma's renderer by ~1px —
  visible only in difference blends, not to the eye.
- The add-card screen intentionally replaces the design's "IFRAME" annotation
  overlay with the real form fields it marks.
- Store-details "متاجر مشابهة" sits below the 1014px design fold, as drawn.
