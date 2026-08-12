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
- **Phase tabs** — the desktop shell shows a Phase 1 / Phase 2 switcher above
  the phone frame (`?phase=2` deep-links; the choice sticks per browser tab
  via sessionStorage). Phase 2 is currently an exact duplicate of the
  experience and is the divergence point for upcoming iterations — screens
  branch on `usePhase()` (`src/state/PhaseState.tsx`). Switching restarts the
  demo at scenario 1. Phone-sized viewports (and therefore the QA gate) hide
  the switcher and resolve to Phase 1 unless seeded.

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
  it renders the receipt block over the plain drawn frame. The populated
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

## Known fidelity notes

- Live-text anti-aliasing/baselines differ from Figma's renderer by ~1px —
  visible only in difference blends, not to the eye.
- The add-card screen intentionally replaces the design's "IFRAME" annotation
  overlay with the real form fields it marks.
- Store-details "متاجر مشابهة" sits below the 1014px design fold, as drawn.
