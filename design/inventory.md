# Screen Inventory — كاشباك (عربي)

Source: Figma **Cashback** (dedicated copy of the WalaPlus revamp section) → section **كاشباك (عربي)** (`1:7749`, 5353×6791).
Device frame: **375×812** logical px — taller screens scroll inside a fixed frame.
Digits: **Latin** (08:30, 10%, 3,000+) per renders. Currency: new Saudi Riyal symbol, drawn as an icon glyph.
Reference renders: `design/refs/<node-id>.png` (from `get_screenshot`).

## Layout semantics of the section

- **Top band (y≈198)** = before card linking · **bottom band (y≈5560)** = after linking (`بعد ربط البطاقة`).
- Column labels (RTL, right→left): `كاش باك فقط` (cashback only) → `كاش باك وعروض` (+offers) → `كاش باك وعروض وقسائم` (+vouchers).
- **Middle bands (y≈1870, 3666)** = card-management flow, labeled `استعراض المزايا`.
- `Group 2896xx` frames (>500px wide) are "share properties" annotation boxes — not screens.

## Screens

| # | Node | Name | H | Classification | Route | Status |
|---|------|------|---|----------------|-------|--------|
| 1 | 1:7750 | Cashback | 1034 | Market hub · before link · cashback-only | `/market` (unlinked) | done |
| 2 | 1:8098 | Cashback | 958 | Market hub · after link | `/market` (linked) | done |
| 3 | 1:8525 | Store details | 1014 | before · cashback-only | `/store/:id` | done |
| 4 | 1:8748 | Store details | 1014 | before · cashback-only, alt state (verify diff at build) | `/store/:id` state | done |
| 5 | 1:9029 | Store details | 848 | after · cashback-only | `/store/:id` (linked) | done |
| 6 | 1:9221 | Store details | 1004 | before · +offers | `/store/:id` variant | done |
| 7 | 1:9399 | Store details | 968 | before · +offers+vouchers | `/store/:id` variant | done |
| 8 | 1:9603 | Store details | 968 | after · +offers+vouchers | `/store/:id` variant | done |
| 9 | 1:9807 | Store details | 968 | after · +offers | `/store/:id` variant | done |
| 10 | 1:9993 | Purchase offer | 812 | sheet `تسوّق واربح` · before | sheet over store | done |
| 11 | 1:10105 | Purchase offer | 812 | sheet · after | sheet over store | done |
| 12 | 1:10239 | onboarding | 1190 | card-link intro | `/cashback/intro` | done |
| 13 | 1:10416 | linking card | 812 | add-card form (PCI iframe area drawn in design) | `/cashback/add-card` | done |
| 14 | 1:10469 | success | 812 | link success | `/cashback/success` | done |
| 15 | 1:10520 | all cards | 812 | cards list · state A | `/cards` | done |
| 16 | 1:10563 | all cards | 1006 | cards list · long/scrolled state | `/cards` state | done |
| 17 | 1:10736 | all cards | 812 | cards list · state C | `/cards` state | done |
| 18 | 1:10838 | all cards | 812 | cards list · state D | `/cards` state | done |
| 19 | 1:10931 | all transactions | 812 | grouped list + filter chips | `/transactions` | done |
| 20 | 1:11098 | transaction details | 717 | detail sheet | sheet over transactions | done |

## Withdrawal section «سحب الكاش باك» (27:9923, added 2026-08-11)

| Node | Name | Route / state | Notes |
|------|------|---------------|-------|
| 27:9927 / 27:10402 | choose account ×2 | `/withdraw/account` | registered list, radio enables CTA; «حساب بنكي جديد» → new-account |
| 27:10059 / 10174 / 10288 / 11293 | new account ×4 | `/withdraw/new-account` | add-bank form states |
| 27:10534 / 10685 / 10836 | enter amount ×3 | `/withdraw/amount` | empty / filled / limit states; chips 50-1,000; أقصى مبلغ |
| 27:10987 | Summary | `/withdraw/summary` | fee 1 + VAT 0.15; info popovers 27:11484/11489 |
| 27:11214 / 11251 | PIN ×2 | `/withdraw/pin` | demo: 000000 → wrong-PIN inline (×3 → failure), 999999 → instant failure, else success |
| 27:11148 / 11167 | status ×2 | `/withdraw/status?ok=1/0` | success → /cards; failure → retry PIN |
| 27:11408 | choose (sheet) | AccountPickerSheet | from amount screen's edit affordance |

Entry: wallet tile «تحويل لحساب بنكي» → `/withdraw/account` (or straight to `/withdraw/amount` once an account is on file — repeat shortcut). State seeds for QA/deep links: `?waccount=1`, `?wamount=50`.

UX-enhancement layer (renders only with live state, so unseeded captures still match the frames): fee-transparency line on the amount screen, success receipt (specifics + arrival timeline + remaining balance), PIN context line, inline wrong-PIN attempts, IBAN validation + beneficiary-bank auto-detect on the new-account form.

## Phase 2 (usePhase() === 2; Phase 1 frozen)

| Node | Frame | Route | Notes |
| --- | --- | --- | --- |
| 47:3538 | Home «الرئيسية» 375×2443 | `/home` | Phase-2 landing (root + tab bar); 11 sections + navbar; contexts/renders in design/phase2/; ref = cropped capped export (smoke diff ≈9.6%) |
| 54:10152 | Wallet (points) before linking 375×1685 | `/wallet` + `?linked=0` | «اربط بطاقتك» promo → add-card form; gate ≈3.6% (capped ref) |
| 54:10497 | Wallet (points) after linking 375×812 | `/wallet` + `?linked=1` | «إجمالي الكاش باك» strip → `/cards`; below-fold WalaOne bar; gate ≈2.7% |
| 91:44135 | Market · العروض tab 375×951 | `/market` + `?tab=offers` | offer rows (خصم N% · كسب نقاط tags, ما يفوتك ribbon) + «كسب نقاط» filter chip + the shared promo banner; gate ≈2.7% |
| 91:43784 | Market · القسائم tab (updated) | `/market` + `?tab=vouchers` | adds the lilac «ادفع مثل كل مرة» banner under the first row — shared `MarketPromoBanner` with the العروض tab; the 65:23785 gate carries this as a documented deviation (≈2.3%) |
| 65:23785 | Market · القسائم tab 375×812 | `/market` + `?tab=vouchers` | live tab of the Market hub: voucher grid (8 stores) instead of the merchant grid, no promo banner, extra خصومات filter chip; cards → `/store/:id` (vouchers variant); gate ≈1.7% |

## «أهدِها» gift flow (drawn تحويل النقاط section 73:29323, added 2026-08-13)

The Cashback file's section is a copy whose node ids refuse the MCP metadata/codegen endpoints, so contexts/refs were pulled from the **source frames** on the WalaPlus revamp file's «✈️ Points transfer» page (identical content, section 3196:31366) via the local Dev-Mode toolchain. Adaptation per user direction: the flow moves **cashback** (points → ﷼): Riyal glyphs instead of WO coins, chips ÷100 (5/10/50/100/200/500), كاش باك copy, live 560.50 balance chip; only the زملاء العمل and أفراد العائلة audiences are built (entry: redemption-hub «أهدِها» → in-sheet chooser).

| Node (source) | Frame | Route / state | Notes |
|------|------|---------------|-------|
| 3196:33255 / 33656 | زملاء العمل pick ×2 | `/gift/pick?aud=colleagues` | recents «ارسل لهم مره ثانية» (ماجد رجل + حمود الخضر) + radio list ×7; drawn title typo «زملاء العملاء» rendered as زملاء العمل; 33656 ref = 1:1 canvas crop (frame refuses export) — coarse gate ≈3.7% |
| 3196:33505 | أفراد العائلة pick | `/gift/pick?aud=family` | سارة/زوجة, أحمد/ابن, فاطمة/ابنة; mint user-plus label button; gate ≈1.6% |
| 3196:31717 / 32019 | amount ×2 (زميل) | `/gift/amount` | «حولها لزميل»; gate ≈4.1% (cashback adaptation) |
| 3196:31868 / 32164 | amount ×2 (عائلة) | `/gift/amount` | «حولها للعائلة»; drawn quick-transfer checkbox checked; gate ≈4.2% |
| 3887:40765 | PIN «تأكيد التحويل» | `/gift/pin` | bare keypad (no نسيته؟/fingerprint); same demo PIN rules as withdrawal; success spends the live balance; gate ≈0.1% |
| 3196:32860 / 32879 | status success / failure | `/gift/status?ok=1/0` | drawn withdraw-style art; failure has no error-code line; receipt «وصلت N ﷼ لـ…» renders only with live state; gates ≈1.2/1.5% |

State seeds: `?gaud=colleagues|family` (presets the audience's first contact), `?gamount=N`.

## Voucher purchase flow (القسائم section 65:23784, added 2026-08-16)

Phase 2 replaces the frozen voucher store pages for every `variant: 'vouchers'` merchant; Phase 1 keeps `StoreVouchers{Before,After}` (so `1_9399`/`1_9603` stay green).

| Node | Frame | Route / state | Notes |
|------|------|---------------|-------|
| 65:25229 / 65:25365 | Store details | `/store/:id` (Phase 2) | hero + merchant card + drawn ladder (100→400 وفر 20% · 200→1,000 · 350→1,500 وفر 20% · 400→2,000 · 500→2,500) + dock بشتريها / برسلها هدية → gift flow; gate ≈5.3% |
| 65:24960 / 65:25073 | شراء قسيمة drawer | sheet over the store page | merchant + face value, عن القسيمة, كيف تستخدمها (في الفرع·اونلاين tabs when both channels), الشروط والأحكام; gate ≈10.4% (adds طريقة الدفع) |
| 65:25194 | Insufficient balance | sheet over the drawer | قيمة القسيمة / رصيدك الحالي / اللي تحتاجه + اشحن → `/wallet`; renders in points or cashback depending on which balance fell short |
| 65:26375 | PIN «تأكيد شراء القسيمة» | `/vouchers/pin` | withdrawal keypad + Touch ID overlay; demo rules unchanged; gate ≈1.4% (captured with the overlay open, as drawn) |
| 65:25888 | Success ticket | `/vouchers/success?ok=1/0` | perforated card, code + «نسخ» (clipboard), barcode, ملخص العملية; gate ≈10.6% (live code/date/price vs the frame's static values) |

**Flexible payment (user direction, no drawn frame):** «مبلغ مخصص» tile on the store page (10–500 ﷼ at 5 نقاط/﷼ — `src/data/vouchers.ts`) and the drawer's «طريقة الدفع» block — نقاط · كاش باك (face 1:1) · مقسّم (slider; remainder pro-rata in points). Seeds: `?vstore=`, `?vface=`, `?vpay=`, `?vcash=`.

## «تحويل لنقاط ولاء ون» flow (drawn ولاء ون section 108:45207, added 2026-08-17)

| Frame | Route / state | Notes |
| --- | --- | --- |
| amount ×2 (empty/filled) | `/walaone/amount` | «حولها لولاء ون»: promo card (copy verbatim incl. «محدوووودة»), «500 ← 1» rate strip + ⇄ (1 ﷼ = 500 per user direction; the drawn «50 ← 1» is points-to-points), chips + live «تساوي»; adapted points → cashback (drawn green-points input → live ﷼, chips ÷100, rate's green coin → Riyal glyph) |
| تأكيد التحويل ×5 states | `/walaone/confirm` | ملخص العملية + «رقم جوال محفظة ولاء ون» +966 field (KSA flag hand-authored `src/assets/icons/flag-sa.svg`), «استخدم رقمي», verify button; «تمم التحويل» disabled until verified. Demo: `5 0000 0000` → «غير مربوط» error |
| OTP sheet | over `/walaone/confirm` | five boxes filling right-to-left, «تغيير», resend countdown from 01:30, 5-minute validity hint; demo `00000` = wrong |
| PIN | `/walaone/pin` | shared `RedeemPinScreen`; context names both sides of the conversion |
| success / failure | `/walaone/status?ok=1/0` | drawn «تم تحويل النقاط بنجاح» (body «ستصل نقاطك قريبا إلى الجهة الأخرى») / «ما ضبطت»; shared status screen, receipt names the points + wallet number |

Entry: the hub row «تحويل لنقاط ولاء ون» after «تحويل لحساب بنكي». Seeds: `?w1amount=`, `?w1phone=`, `?w1v=1`. Not auto-gated — the section node resists `get_metadata` (SSE error), so it was built from native-res canvas crops and interaction-verified end to end (26-check walk).

## Derived screens (user direction, no drawn frame)

| Screen | Route | Notes |
| --- | --- | --- |
| الاعدادات | `/cards/settings` | from the cashback wallet's «الاعدادات» tile; two rows → البطاقات المضافة (`/cards/manage`, drawn 1:10520/1:10838) and الحسابات البنكية |
| الحسابات البنكية | `/cards/accounts` | payout accounts on file (`REGISTERED_ACCOUNT` + any added mid-flow) and the dashed «حساب بنكي جديد» → `/withdraw/new-account` |
| تصدير كشف حساب | sheet over `/transactions` (Phase 2) | bank-statement export: month pills only (per user direction — one pill per activity month, newest first), live preview, A4 RTL PDF via jspdf+html2canvas (`src/lib/statementPdf.ts`); tx dates anchored to runtime today in `src/data/transactions.ts`, which also carries two earlier demo months mirroring the screen's `pastSections` |
| اختر الشهر | sheet over `/transactions` (Phase 2) | month headline over the list (month + year + chevron; moved out of the chip row per user direction) + picker (`MonthFilterSheet`); the drawn day sections carry a `dayOffset`, and `pastSections` add two earlier months of demo activity so the filter has something to slice — never visible until an earlier month is picked |
| شحن رصيد جوال ×5 | `/recharge/operator` → `/number` → `/amount` → `/pin` → `/status` | from the hub's «شحن رصيد جوال» row. Operator radio rows (stc · موبايلي · زين · Virgin) over an «اشحن لهم مره ثانية» recents row that fills operator+number and skips to the amount; grouped `055 123 4567` field with a «رقمي» chip and a non-blocking ported-prefix hint; chips 10–200 ﷼. No telecom art exists in the file, so `BrandMark` monograms stand in for logos and `src/assets/icons/mobile.svg` is hand-authored |
| Review comments (pins + inbox) | overlay on every screen + shell panel | prototype tool, not product UI: the shell «التعليقات» panel (outside the frame, beside the demo controls) toggles tap-to-pin commenting — each tap captures the tapped element (highlight + label) — and doubles as the owner's inbox: all comments grouped by screen variant, row click rebuilds a seeded URL and opens the pin in place (`?focus=`). Shared via `/api/comments` (`server/comments.mjs` + vite middleware; `npm run serve` hosts dist + API) with a localStorage fallback; phones enter via `?comments=1`; invisible to webdriver/`?diff=` so the gate never sees it |
| تبرع فيها ×5 | `/donate/cause` → `/charity` → `/amount` → `/pin` → `/status` | from the hub's «تبرع فيها» row. Two-up cause grid (كفالة يتيم · صدقة جارية · إغاثة عاجلة · صحة وعلاج) reusing repo glyphs painted brand-green through their masks — a tap commits, no CTA — then the gift picker's radio list filtered to that cause; chips 10–500 ﷼. Organisations in `src/data/charities.ts` are generic placeholder entities, not real registered charities |

All of these reuse existing app-bar/list/amount language rather than a Figma frame, so none is in the QA gate. The two redemption flows above are cashback-only per user direction and share one PIN screen, one status screen (`src/screens/redeem/`) and one amount card (`src/components/redeem/AmountCard.tsx`); the gift chrome moved to `src/components/redeem/FlowChrome.tsx` to serve all three, with no DOM change (gift gates held at 4.07 / 4.21 / 1.57 / 3.67%).

The Market tabs are live in Phase 2 only (`MarketTabs`, shared by both states so they can't drift): الكاش باك ⇄ القسائم switch in place, العروض stays inert until its frame lands. Phase 1 keeps the frozen single-tab market — verified pixel-identical (0 differing px on 1:7750 / 1:8098).

Two wallets: **points** (main, `/wallet`, Phase 2) and **cashback** (`/cards`). Cashback access in Phase 2: the after-strip in the points wallet + the ﷼ pill in the Home header; the tab bar's المحفظة goes to `/wallet` in Phase 2 and `/cards` in Phase 1.

## Proposed interactive flow (clickable prototype)

Mock state `cardLinked` drives before/after versions of Market and Store details:

1. `/market` (unlinked) → promo banner `ابدأ` → `/cashback/intro`
2. `/cashback/intro` → CTA `أضف بطاقتك الأولى` → `/cashback/add-card` → `أضف البطاقة` → `/cashback/success`
3. success → sets `cardLinked=true` → back to `/market` (linked state)
4. Market merchant cards → `/store/:id`; different demo merchants map to different design variants so **every** Store-details variant is reachable naturally
5. Store CTA / offer merchants → Purchase-offer sheet
6. Wallet/cards area → `/cards` → `/transactions` → transaction-details sheet
7. Bottom tab bar present on Market; card-flow screens are pushed full-screen without tabs

## Shared primitives backlog (from renders)

StatusBar (per-screen variants: with/without time) · AppBar (title + back/close, badge icon) · TabBar (5 items, center QR button) · SegmentTabs (كاش باك/عروض/قسائم) · CategoryChips (circular icon chips) · FilterChips row · MerchantCard (grid, badges, cashback pill) · PromoBanner (bravo/purple) · BenefitRow (icon + text) · NumberedStep (green circle) · TierBar (colored % tiers + emoji) · TxRow (logo, amount ±, status pill) · SheetShell (rounded top, X, home indicator) · CTA button (green pill, full width) · SecurityNote (mint) · FormField (label + input) · RiyalIcon

## Fidelity caveats

- **Font**: RESOLVED — real *FF Shamel Unique* files provided by the user (`Font/` → `src/assets/fonts/`). Arabic "Semi Bold" styles map to weight 500 (no 600 exists): use `font-medium`.
- Map imagery on Market is a raster export from the design.
