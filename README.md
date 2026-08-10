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
(otherwise it persists in sessionStorage and flips when the linking flow completes).

## The clickable flow

- `/market` — السوق hub (cashback tab). Before linking: promo banner → `ابدأ`.
- `/cashback/intro` → `/cashback/add-card` → `/cashback/success` — linking journey;
  success flips the app to the after-link state.
- Merchant cards → `/store/:id`, dispatched by variant × link state to the six
  store designs (H&M etc. = cashback; IKEA = offers; Zara = vouchers). Offer
  rows and voucher tiles open the تسوّق واربح sheet (its copy/CTA switch after
  linking); the cashback page's tier card expands/collapses via its chevron.
- Tab bar المحفظة → `/cards` (zero-balance wallet before linking, populated
  after) → `الكل` → `/transactions` → row tap opens the details sheet.
- `/cards/manage` — «البطاقات المضافة» (from the wallet's البطاقات tile or the
  sheet's إدارة البطاقات); `?cards=3` demos the three-card cap state.
- `?linked=` is read once at page load (a full reload applies it).

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
