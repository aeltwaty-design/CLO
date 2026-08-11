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
