# Screen Inventory — كاشباك (عربي)

Source: Figma **WalaPlus app (Revamp)** → page *Cashback (Text Edited)* → section **كاشباك (عربي)** (`6779:45271`, 5353×6791).
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
| 1 | 6779:45272 | Cashback | 1034 | Market hub · before link · cashback-only | `/market` (unlinked) | pending |
| 2 | 6779:45620 | Cashback | 958 | Market hub · after link | `/market` (linked) | pending |
| 3 | 6779:46047 | Store details | 1014 | before · cashback-only | `/store/:id` | pending |
| 4 | 6779:46270 | Store details | 1014 | before · cashback-only, alt state (verify diff at build) | `/store/:id` state | pending |
| 5 | 6779:46551 | Store details | 848 | after · cashback-only | `/store/:id` (linked) | pending |
| 6 | 6779:46743 | Store details | 1004 | before · +offers | `/store/:id` variant | pending |
| 7 | 6779:46921 | Store details | 968 | before · +offers+vouchers | `/store/:id` variant | pending |
| 8 | 6779:47125 | Store details | 968 | after · +offers+vouchers | `/store/:id` variant | pending |
| 9 | 6779:47329 | Store details | 968 | after · +offers | `/store/:id` variant | pending |
| 10 | 6779:47515 | Purchase offer | 812 | sheet `تسوّق واربح` · before | sheet over store | pending |
| 11 | 6779:47641 | Purchase offer | 812 | sheet · after | sheet over store | pending |
| 12 | 6779:47775 | onboarding | 1190 | card-link intro | `/cashback/intro` | pending |
| 13 | 6779:47952 | linking card | 812 | add-card form (PCI iframe area drawn in design) | `/cashback/add-card` | pending |
| 14 | 6779:47996 | success | 812 | link success | `/cashback/success` | pending |
| 15 | 6779:48040 | all cards | 812 | cards list · state A | `/cards` | pending |
| 16 | 6779:48083 | all cards | 1006 | cards list · long/scrolled state | `/cards` state | pending |
| 17 | 6779:48252 | all cards | 812 | cards list · state C | `/cards` state | pending |
| 18 | 6779:48354 | all cards | 812 | cards list · state D | `/cards` state | pending |
| 19 | 6779:48442 | all transactions | 812 | grouped list + filter chips | `/transactions` | pending |
| 20 | 6779:48609 | transaction details | 717 | detail sheet | sheet over transactions | pending |

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

- **Font**: file uses commercial *FF Shamel Unique* (Arabic). Substituted with IBM Plex Sans Arabic (+ Poppins for Latin/digits, which the file itself specifies for English). If FF Shamel license files exist, drop woff2 into `src/assets/fonts/` and swap `--font-sans`.
- Map imagery on Market is a raster export from the design.
