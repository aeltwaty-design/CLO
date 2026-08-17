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
- **Phase 2: voucher purchase** (Figma section 65:23784) — a voucher card in
  the القسائم tab opens the buyable **store page** (65:25229: hero, merchant
  card, the drawn denomination ladder 100/200/350/400/500 ﷼ priced in WO
  points with «وفر 20%» tiers, dock «بشتريها» / «برسلها هدية» → the gift
  flow). Selecting a tier and buying opens the **«شراء قسيمة» drawer**
  (65:24960 / 65:25073 — its «كيف تستخدمها؟» gains في الفرع·اونلاين tabs when
  the merchant has both channels) → **PIN** «تأكيد شراء القسيمة» (65:26375,
  Touch ID overlay, same demo PIN rules) → the **success ticket** (65:25888:
  perforated card, voucher code with «نسخ» to the clipboard, barcode, ملخص
  العملية). Not enough balance → the drawn insufficient-balance sheet
  (65:25194). **Flexible payment (user direction):** the store page adds a
  **«مبلغ مخصص»** tile — any face value 10–500 ﷼ at the base rate (1 ﷼ =
  5 نقاط) — and the drawer adds a **«طريقة الدفع»** block: نقاط (as drawn),
  **كاش باك** (face value 1:1) or **مقسّم**, where a slider moves ﷼ from the
  cashback balance and the remainder bills in points pro-rata at that tier's
  own rate. Both balances move on purchase. Phase 1 keeps its frozen voucher
  store pages. Seeds: `?vstore=`, `?vface=`, `?vpay=`, `?vcash=`.
- **Phase 2: السوق القسائم tab** (Figma 65:23785) — the Market tabs are live in
  Phase 2: الكاش باك ⇄ القسائم switch the grid in place (`?tab=vouchers`
  deep-links the vouchers tab), while العروض stays inert until its frame
  lands. Per user direction the Phase-2 row is reordered to read **الكاش باك ·
  القسائم · العروض** (cashback first and selected by default); Phase 1 keeps
  the drawn order.
- **Phase 2: العروض tab + the shared promo banner** (Figma 91:44135 offers /
  91:43784 vouchers) — العروض is now live too: full-width offer rows (اسم
  المتجر + «خصم N%» / «كسب نقاط» tags, shop/global badges, gold «ما يفوتك»
  ribbon) with its own «كسب نقاط» filter chip, deep-linked by `?tab=offers`.
  Both lists carry the lilac banner (`src/components/MarketPromoBanner.tsx` —
  one component in both tabs) drawn under the first row/card, reading
  **«كاش باك حتى 50% بدون حد»** per user direction (the frames draw «ادفع مثل
  كل مرة ، وخذ أكثر كل مــرة»); tapping it opens the card-linking form. The vouchers tab drops the promo banner, adds the خصومات filter chip
  and swaps the merchant grid for the drawn voucher grid — نمق (gold «ما
  يفوتك» card) and أمازون with «تبدأ من» prices, هنقرسيتشن/جاهز برايم with
  follower counts, and جرير/قولدن سنت/أمازون with favourite hearts; each card
  opens its store page (`/store/namaq`, `/store/jarir`, … all vouchers
  variant). Phase 1 keeps the frozen single-tab market, byte-identical.
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
  after) → `الكل` → `/transactions` → row tap opens the details sheet. In
  Phase 2 the filter row gains a live **month filter** (derived, no drawn
  frame): a month headline over the list («أغسطس 2026» + chevron — moved out
  of the chip row per user direction) opens «اختر الشهر», listing
  only the months that carry activity; picking one slices the list (past
  months label their groups by date, e.g. «13 يوليو») and an empty month
  says «ما فيه عمليات في هذا الشهر». It defaults to the current month, so
  the drawn sections render as framed; the drawn تحويل/سحب/كاش باك chips
  stay inert. In Phase 2 the app bar also gains a **statement export**
  affordance (derived, no drawn frame): «تصدير كشف حساب» sheet with **month
  pills only** (per user direction, replacing the earlier presets + custom
  from–to) — one pill per month carrying activity, newest first, matching the
  months the on-screen filter offers — a live «N عمليات · الصافي»
  preview, and a one-tap **PDF download** — an A4 RTL bank-style statement
  (brand header, holder/card/period meta, earned/spent/net/balance tiles,
  dated rows with the new SAR symbol) rendered by the browser and packed via
  jspdf + html2canvas, so Arabic shapes correctly. Transaction dates anchor
  to runtime "today" (`src/data/transactions.ts`); Phase 1 renders the frozen
  screen byte-identically. The
  populated wallet pulls the expiring-cashback note out of the balance card
  into a compact nudge («عندك 50 ﷼ تنتهي 25 ديسمبر» + «حوّلها الحين») whose
  CTA presets the 50 ﷼ and enters the withdrawal flow. Per user direction its
  balance card drops the drawn «?» affordance, and the three action tiles
  (تحويل لحساب بنكي · الحسابات · البطاقات) collapse into two: **«استخدمه»**
  (the redemption hub, which still leads with تحويل لحساب بنكي) and
  **«الاعدادات»** → `/cards/settings`. The zero-balance wallet before linking
  carries the same pair (shared `ActionTile`), with «استخدمه» muted — its
  balance is 0.00, so there is nothing to redeem yet.
- `/cards/settings` — الاعدادات hub, two managed things each on its own
  screen: «البطاقات المضافة» → `/cards/manage` and «الحسابات البنكية» →
  `/cards/accounts` (payout accounts on file + «حساب بنكي جديد» → the
  add-bank form). No drawn frame — built from the wallet's own row/app-bar
  language, so it's outside the QA gate.
- `/cards/manage` — «البطاقات المضافة» (from الاعدادات → البطاقات المضافة or the
  sheet's إدارة البطاقات); `?cards=3` demos the three-card cap state.
- **Withdrawal «سحب الكاش باك»** — wallet «استخدمه» → تحويل لحساب بنكي →
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
  repeat-withdrawal shortcut (the wallet's «حوّلها الحين» nudge and the
  redemption hub's تحويل لحساب بنكي skip straight to the amount step once an
  account is on file).
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
  carousel, the main CTA row — **قسائم · كاش باك «حتى 10%» · عروض خاصة**
  (Figma 83:6940, replacing the drawn عائلتي/بالقرب مني/القسائم tiles per
  user direction; each opens its own Market tab — قسائم → القسائم, كاش باك →
  الكاش باك, عروض خاصة → العروض) — search + 3D category chips),
  «عروض يومك», add-card promo (CTA → the linking form),
  favorites empty state, grocery banner, food offers, «قسائم حصرية»,
  flash-sale countdown (static as drawn), retailer circles, «قسائم خاصة»;
  H&M/IKEA cards deep-link to their store pages. The shared `TabBar` gained
  an `active` prop ('market' default, byte-identical for Phase 1). **After
  linking a card** Home reacts (derived state — no drawn after-frame): the
  header pill reads the live 560.50 balance and the add-card promo becomes
  the shared «إجمالي الكاش باك» section — identical to the one in the Points
  Wallet, CTA row included («التفاصيل» → cashback wallet, «استخدمه» → the
  redemption hub over Home). The drawn «إجمالي المدخرات» savings card
  (47:3726) that sat above it is **removed per user direction**, along with the
  ~120 illustration fragments that composed its money-pot art (the files stay
  in `src/assets/figma/`, now unimported, in case it returns).
- **Before-link promo** (user direction) — Home and the Points Wallet now share
  **one banner** (`src/components/LinkPromoBanner.tsx`, so the two can never
  drift): Home's own smaller drawn promo card (47:4067) is gone, replaced by
  the wallet's banner (54:10300) in the same slot, with the linked state still
  swapping to the shared cashback strip. Every surface that asks for a card
  therefore makes the same claim in the same words,
  **«كاش باك حتى 50% بدون حد»** — the banner, the market banner, and the
  linking intro sheet on «بدون حد» too. The CTA reads **«ابدأ»** rather
  than the drawn «أضف بطاقتك» / «اربطها الأن». The wallet banner's drawn green
  wallet-card art is replaced by a **«50%» illustration** (derived, no drawn
  frame — `FiftyPercentArt` in `WalletScreen.tsx`): halo, dashed orbit, a
  tilted card keeping a nod to the art it replaces, sparkles and confetti. It
  is inline SVG rather than an exported asset, so the numerals render in the
  app's own Poppins and every colour stays a theme token via Tailwind's
  `fill-*`/`stroke-*` utilities. Phase 1 keeps its drawn wording and art, and
  `CashbackIntroScreen` (1:10239) stays pinned to the frame.
- **Phase 2: the new Saudi Riyal symbol** — everywhere Phase 1 renders the ﷼
  character (FF Shamel draws it as the «ريال» word ligature), Phase 2 renders
  the official new SAR symbol instead, via the shared phase-aware `<Riyal />`
  glyph (`src/components/Riyal.tsx` — the Wikimedia
  `File:Saudi_Riyal_Symbol.svg` masked in `currentColor`, so all 21 sites
  inherit their surrounding text size/color; Phase-1 rendering is
  byte-identical).
- **Phase 2 · transition phase 1 (points → cashback)** — the wallet begins
  its migration toward cashback-only. Balances are **live app state**
  (`AppState`: 5,000 pts / 560.50 ﷼ defaults, `?pts=` seed): the Points
  Wallet's «حول نقاطك» action and «استخدمها» pill open the **converter**
  (10 pts = 1 ﷼, preset chips ربع/نص/كل **or a «مبلغ مخصص» amount** — any
  points figure from the 10-point floor up to the balance, which takes over
  from the chips until cleared and guards «أقل تحويل 10 نقاط» / «أكثر من
  رصيدك من النقاط» — with a live preview, then an **in-sheet PIN step**
  («تأكيد التحويل», same demo codes as every other flow: `000000` wrong ×3,
  `999999` fails, else confirms) before the success moment);
  after linking, both the wallet and Home render the shared
  **cashback section** (`src/components/CashbackStrip.tsx` — one component,
  so the two can never drift) with its CTA row: **«التفاصيل»** (cashback
  wallet) and **«استخدمه»**, which opens the **redemption hub** — تحويل بنكي
  (the real withdrawal flow), «اشترِ قسائم» (hands off to the Market's القسائم
  tab, `/market?tab=vouchers`, instead of an in-sheet picker), **«أهدِها»**
  (the gift flow below), **«شحن رصيد جوال»** and **«تبرع فيها»** (the two
  derived flows below). Every row in the hub now leads somewhere.
- **«أهدِها» gift flow** (drawn تحويل النقاط section 73:29323, adapted points
  → cashback per user direction; limited to زملاء العمل and أفراد العائلة) —
  the hub row opens an in-sheet audience chooser (mirroring the drawn hub
  sheet), then: `/gift/pick?aud=colleagues|family` (radio list exactly as
  drawn — selected row goes mint with a green border; colleagues adds the
  «ارسل لهم مره ثانية» recents avatars ماجد رجل/حمود الخضر; family lists
  سارة/أحمد/فاطمة with relations) → `/gift/amount` («حولها لزميل/للعائلة»,
  live cashback chip in the app bar, promo strip per audience, «كم ودك
  تحول؟» input + chips 5/10/50/100/200/500 ﷼ — chips and CTA above balance
  disabled, «المرسل إليه» card with edit-glyph back to the picker, visual
  «أضف إلى التحويل السريع» checkbox) → `/gift/pin` («تأكيد التحويل», bare
  keypad as drawn — same demo PIN rules as the withdrawal) → `/gift/status`
  (drawn success/failure art; success spends the live balance and shows
  «وصلت N ﷼ لـ…»; كمل → wallet, حاول مره ثانية → PIN). State seeds:
  `?gaud=colleagues|family` (also presets the audience's first contact),
  `?gamount=N`. The expiring-cashback nudge also surfaces
  on Home after linking. The withdrawal flow itself keeps its pixel-pinned
  drawn values (560.50 world) regardless of conversions.
- **«تحويل لنقاط ولاء ون» flow** (drawn ولاء ون section 108:45207, adapted
  points → cashback per user direction like the gift flow — the drawn frames
  convert WalaPlus points, ours spend the live cashback at the drawn
  **1 ﷼ = 50 نقطة** rate strip): the hub row after «تحويل لحساب بنكي» opens
  `/walaone/amount` («حولها لولاء ون»: promo card verbatim including the drawn
  «محدوووودة», the «50 ← 1» rate strip with its ⇄ button, «كم ودك تحول؟» chips
  5–500 ﷼ and the live **«تساوي»** WalaOne line) → `/walaone/confirm`
  («تأكيد التحويل»: ملخص العملية, the «رقم جوال محفظة ولاء ون» +966 field with
  the KSA flag, «استخدم رقمي», and «تأكيد رقم الجوال» opening the drawn **OTP
  sheet** — five boxes filling right-to-left, «تغيير», resend countdown,
  5-minute validity; «تمم التحويل» stays disabled until verified) →
  `/walaone/pin` → `/walaone/status` (drawn «تم تحويل النقاط بنجاح» /
  «ما ضبطت», shared status screen). Demo rules: number `5 0000 0000` →
  «غير مربوط بمحفظة ولاء ون» error; OTP `00000` = wrong; PIN rules as
  everywhere. Seeds: `?w1amount=`, `?w1phone=`, `?w1v=1`. Refs for this
  section are not auto-gated (its node resists `get_metadata`; built from
  native-res canvas crops) — the flow is interaction-verified end to end.
- **«شحن رصيد جوال» top-up flow** (derived, no drawn frame — the Figma file
  holds nothing telecom-shaped, so this is built from the gift journey's own
  pick/amount/PIN/status language): `/recharge/operator` (radio rows for
  stc · موبايلي · زين · Virgin, each on a monogram tile with its KSA prefixes —
  no operator art exists, so `BrandMark` stands in for a logo; the
  «اشحن لهم مره ثانية» recents sit on top and, because a past top-up already
  implies its operator, a tap fills both and skips straight to the amount) →
  `/recharge/number` («لأي رقم تبي تشحن؟» grouped `055 123 4567` field in the
  card-number idiom, a **«رقمي»** chip for the demo user's own line, and a soft
  hint when the typed prefix belongs to another operator — informative only,
  since ported numbers are real) → `/recharge/amount` («كم تبي تشحن؟», chips
  10/20/30/50/100/200 ﷼) → `/recharge/pin` («تأكيد الشحن») → `/recharge/status`
  («تم شحن الرصيد بنجاح» + «وصل N ﷼ رصيد stc لـ…»). Seeds: `?rop=`, `?rnum=`,
  `?ramount=`.
- **«تبرع فيها» donation flow** (derived, no drawn frame): `/donate/cause`
  (a two-up tile grid — كفالة يتيم · صدقة جارية · إغاثة عاجلة · صحة وعلاج —
  reusing glyphs already in the repo, each painted brand-green through its own
  alpha mask so the four read as one set; a tap commits and moves on, like the
  Market cards, so there is no CTA) → `/donate/charity` (the gift picker's
  radio list, filtered to that cause; the organisations in
  `src/data/charities.ts` are deliberately **generic placeholder entities**, not
  real registered charities, so the prototype never shows invented donation
  records against a real name) → `/donate/amount` («كم تبي تتبرع؟», chips
  10/25/50/100/200/500 ﷼) → `/donate/pin` («تأكيد التبرع») → `/donate/status`
  («تم التبرع بنجاح»). Seeds: `?dcause=`, `?dcharity=` (also presets its cause),
  `?damount=N`.
  Both flows are **cashback only** per user direction — no points, no split — so
  the CTA dies at zero or above balance and any chip above balance goes inert,
  making overspend unreachable rather than error-handled. They share one PIN and
  one status screen (`src/screens/redeem/`, a thin per-flow wrapper each) and
  one amount card (`src/components/redeem/AmountCard.tsx`), so they cannot drift
  from each other or from the demo PIN rules. Neither has a drawn reference, so
  neither is in the QA gate; the gift screens' chrome moved to
  `src/components/redeem/FlowChrome.tsx` in the process, with no DOM change.
- **Phase 2: linking intro until the first card** — every «add card» tap
  opens the intro bottom sheet **over the screen it was tapped on** (Home
  promo → over Home, Points-Wallet promo → over the wallet, manage cards →
  over that list; `useLinkIntroGate` in `LinkIntroSheet.tsx`) for as long as
  **no card has been added yet**; its CTA continues to the form. Once the
  first card is linked, every entry goes straight to the form. A cold form
  deep link shows the sheet over the form itself (in-app arrivals never
  double-show), `?intro=0` suppresses it, and Phase 1 keeps its original
  flows. The two trust chips («بياناتك في أمان» / «فوق مكافآت بنكك») each
  carry an **ⓘ explainer** (derived, no drawn ⓘ on the chips): hover, focus,
  or tap opens an ink tooltip bubble above the chip with the longer story —
  a bubble rather than the withdrawal's drawn info sheet, since the intro is
  already an overlay; the ⓘ glyph itself is the drawn one from the
  withdrawal summary.
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
- **QA gate**: `node scripts/qa-diff.mjs` (dev server running) captures all 39
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
  capture (`47_3538`, ≈18%) is a coarse smoke diff, not a fine gate: its
  reference is the full-node export downscaled ~0.4× by the 1024px cap and
  cropped out of the padded canvas, so glyph/photo resampling dominates. It
  additionally carries two user-directed structural changes: Home's own small
  add-card card became the shared `LinkPromoBanner` (~90px taller), and the
  drawn «إجمالي المدخرات» savings card was removed — so everything below the
  header sits at a different offset than the reference draws it. Its linked
  sibling (`47_3538-linked`, ≈10.9%) also carries the derived after-state
  (live pill + cashback section with its CTAs + expiring nudge) against the
  before-only ref; it reads *lower* than the unlinked capture because dropping
  the savings card happens to pull its content back toward the reference's
  offsets. Transition phase 1 also moves the two
  wallet captures by design: `54_10152` ≈5.6% (points rebased to 5,000, plus
  the user-directed promo rework — «كاش باك حتى 50% بدون حد» and «ابدأ» over
  the drawn headline and «اربطها الأن», and the «50%» illustration replacing
  the drawn wallet-card art) and `54_10497` ≈6.6% (the drawn strip gains
  its «استخدمه»/«التفاصيل» CTA row). The populated
  wallet (`1_10563`, ≈7.7%) also deviates by user direction: the
  expiring-cashback line moved out of the balance card into the compact
  nudge section, the balance card lost its «?» affordance, and the three
  drawn action tiles collapsed into «استخدمه» + «الاعدادات» — all of which
  shifts the content below. The zero-balance wallet (`1_10736`, ≈3.7%)
  deviates the same way, having been aligned to that CTA pair. The القسائم tab
  (`65_23785`, ≈2.0%) gates against a true 375×812 export, so it sits near the
  glyph-noise floor — the extra few tenths are the user-directed Phase-2 tab
  reorder (الكاش باك first) against the drawn row; extracting the shared
  `MarketTabs` left the two Phase-1 market captures pixel-identical (verified
  at 0 differing px). The Phase-2 Home captures moved a fifth of a point
  (`47_3538` ≈8.8% / `47_3538-linked` ≈20.0%) when its main CTA row became
  قسائم · كاش باك · عروض خاصة (83:6940). The
  gift flow gates against the **source frames** of the drawn تحويل النقاط
  section (`3196:*`/`3887:*` in the WalaPlus revamp file — the Cashback
  copy's node ids refuse the metadata/codegen endpoints), pulled via the
  local Dev-Mode MCP: PIN `3887_40765` ≈0.1%, family pick `3196_33505`
  ≈1.6%, status `3196_32860`/`32879` ≈1.2/1.5% (the gift failure drops the
  drawn-elsewhere error-code line, as its frame does). The two amount
  screens (`3196_31717`/`31868`, ≈4.1%) deviate by design — points →
  cashback: WO-coin glyphs become the Riyal symbol, chips scale ÷100,
  نقاطك → كاش باك copy, and the balance chip reads the live 560.50. The
  colleagues pick (`3196_33656`, ≈3.7%) is a coarse gate: its ref is a
  hand-cropped 1:1 canvas render (that frame refuses export), and the drawn
  title typo «زملاء العملاء» is rendered as زملاء العمل per user direction.
  The voucher-purchase flow gates at `65_25229` ≈5.3% (store page) and
  `65_26375` ≈1.4% (PIN, captured with its drawn Touch ID overlay open); the
  drawer `65_24960` ≈10.4% and the ticket `65_25888` ≈10.6% deviate by
  design — the drawer carries the added «طريقة الدفع» block (pushing the
  drawn sections down) and the ticket renders a live code/date/price against
  the frame's static `bfa-14000000030` · 50,000 نقطة · 20 يوليو 2025.

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
