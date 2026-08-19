/** Screens quick-jump — labels → seeded deep links. `p: 2` marks screens
    that need the Phase-2 lineage (Phase 2 or Temp — the jump floors the phase
    to 2, so Temp stays Temp); everything else keeps the current phase.
    Shared by the demo shell's jump menu AND the comments inbox, whose
    jump-to-pin borrows these seeds so guarded screens don't bounce. */
export const SCREEN_LINKS: { label: string; url: string; p?: 2 }[] = [
  { label: 'Home (Phase 2)', url: '/home', p: 2 },
  { label: 'Market — before card', url: '/market?linked=0' },
  { label: 'Market — after card', url: '/market?linked=1' },
  { label: 'Market — vouchers tab (Phase 2)', url: '/market?tab=vouchers', p: 2 },
  { label: 'Market — offers tab (Phase 2)', url: '/market?tab=offers', p: 2 },
  { label: 'Store: cashback — before', url: '/store/hm?linked=0' },
  { label: 'Store: cashback — after', url: '/store/hm?linked=1' },
  { label: 'Store: offers — before', url: '/store/ikea?linked=0' },
  { label: 'Store: offers — after', url: '/store/ikea?linked=1' },
  { label: 'Store: vouchers — before', url: '/store/zara?linked=0' },
  { label: 'Store: vouchers — after', url: '/store/zara?linked=1' },
  { label: 'Linking: intro', url: '/cashback/intro' },
  { label: 'Linking: add card', url: '/cashback/add-card' },
  { label: 'Linking: success', url: '/cashback/success' },
  { label: 'Cashback wallet — before', url: '/cards?linked=0' },
  { label: 'Cashback wallet — after', url: '/cards?linked=1' },
  { label: 'Wallet settings', url: '/cards/settings?linked=1' },
  { label: 'Bank accounts', url: '/cards/accounts?linked=1' },
  { label: 'Manage cards', url: '/cards/manage?linked=1' },
  { label: 'Manage cards — 3-card cap', url: '/cards/manage?linked=1&cards=3' },
  { label: 'Transactions', url: '/transactions?linked=1' },
  { label: 'Points wallet — before (Phase 2)', url: '/wallet?linked=0', p: 2 },
  { label: 'Points wallet — after (Phase 2)', url: '/wallet?linked=1', p: 2 },
  { label: 'Withdraw: choose account', url: '/withdraw/account?linked=1' },
  { label: 'Withdraw: new account', url: '/withdraw/new-account?linked=1' },
  { label: 'Withdraw: amount (seeded)', url: '/withdraw/amount?linked=1&waccount=1' },
  { label: 'Withdraw: summary (seeded)', url: '/withdraw/summary?linked=1&waccount=1&wamount=50' },
  { label: 'Withdraw: PIN (seeded)', url: '/withdraw/pin?linked=1&waccount=1&wamount=50' },
  { label: 'Withdraw: Touch ID', url: '/withdraw/pin?linked=1&touchid=1' },
  { label: 'Voucher store (Phase 2)', url: '/store/amazon?linked=1', p: 2 },
  { label: 'Voucher: purchase sheet', url: '/store/amazon?linked=1&vface=100', p: 2 },
  { label: 'Voucher: split payment', url: '/store/amazon?linked=1&vface=100&vpay=split&vcash=50', p: 2 },
  { label: 'Voucher: low points', url: '/store/amazon?linked=1&vface=500&pts=100', p: 2 },
  { label: 'Voucher: PIN (seeded)', url: '/vouchers/pin?linked=1&vstore=amazon&vface=100', p: 2 },
  { label: 'Voucher: success ticket', url: '/vouchers/success?ok=1&linked=1&vstore=amazon&vface=100', p: 2 },
  { label: 'Voucher: failure', url: '/vouchers/success?ok=0&linked=1&vstore=amazon&vface=100', p: 2 },
  { label: 'Gift: pick colleagues', url: '/gift/pick?aud=colleagues&linked=1' },
  { label: 'Gift: pick family', url: '/gift/pick?aud=family&linked=1' },
  { label: 'Gift: amount (seeded)', url: '/gift/amount?linked=1&gaud=colleagues' },
  { label: 'Gift: PIN (seeded)', url: '/gift/pin?linked=1&gaud=colleagues&gamount=50' },
  { label: 'Gift: success + receipt', url: '/gift/status?ok=1&linked=1&gaud=colleagues&gamount=50' },
  { label: 'Gift: failure', url: '/gift/status?ok=0&linked=1' },
  { label: 'WalaOne: amount', url: '/walaone/amount?linked=1', p: 2 },
  { label: 'WalaOne: confirm (seeded)', url: '/walaone/confirm?linked=1&w1amount=50', p: 2 },
  { label: 'WalaOne: PIN (seeded)', url: '/walaone/pin?linked=1&w1amount=50&w1phone=512345678&w1v=1', p: 2 },
  { label: 'WalaOne: success + receipt', url: '/walaone/status?ok=1&linked=1&w1amount=50&w1phone=512345678&w1v=1', p: 2 },
  { label: 'WalaOne: failure', url: '/walaone/status?ok=0&linked=1', p: 2 },
  { label: 'Recharge: pick operator', url: '/recharge/operator?linked=1' },
  { label: 'Recharge: number (seeded)', url: '/recharge/number?linked=1&rop=stc' },
  { label: 'Recharge: amount (seeded)', url: '/recharge/amount?linked=1&rop=stc&rnum=0551234567' },
  { label: 'Recharge: PIN (seeded)', url: '/recharge/pin?linked=1&rop=stc&rnum=0551234567&ramount=50' },
  { label: 'Recharge: success + receipt', url: '/recharge/status?ok=1&linked=1&rop=stc&rnum=0551234567&ramount=50' },
  { label: 'Recharge: failure', url: '/recharge/status?ok=0&linked=1' },
  { label: 'Donate: pick cause', url: '/donate/cause?linked=1' },
  { label: 'Donate: pick charity (seeded)', url: '/donate/charity?linked=1&dcause=orphans' },
  { label: 'Donate: amount (seeded)', url: '/donate/amount?linked=1&dcharity=kafala' },
  { label: 'Donate: PIN (seeded)', url: '/donate/pin?linked=1&dcharity=kafala&damount=50' },
  { label: 'Donate: success + receipt', url: '/donate/status?ok=1&linked=1&dcharity=kafala&damount=50' },
  { label: 'Donate: failure', url: '/donate/status?ok=0&linked=1' },
  { label: 'Withdraw: success', url: '/withdraw/status?ok=1' },
  { label: 'Withdraw: success + receipt', url: '/withdraw/status?ok=1&waccount=1&wamount=50&linked=1' },
  { label: 'Withdraw: failure', url: '/withdraw/status?ok=0' },
];

/** The seed query for a comment's screen: the entry matching the pathname,
    preferring one whose state params agree with the pin's variant. */
export function seedFor(path: string, variantParams: Record<string, string>): string | null {
  const candidates = SCREEN_LINKS.map((l) => {
    const [p, q = ''] = l.url.split('?');
    return { p, q };
  }).filter((c) => c.p === path);
  if (candidates.length === 0) return null;
  const score = (q: string) => {
    const sp = new URLSearchParams(q);
    let s = 0;
    for (const k of ['tab', 'linked', 'ok', 'aud', 'touchid', 'cards']) {
      const want = variantParams[k];
      if (want === undefined) continue;
      if (sp.get(k) === want) s += 2;
      else if (sp.has(k)) s -= 1;
    }
    return s;
  };
  candidates.sort((a, b) => score(b.q) - score(a.q));
  return candidates[0].q || null;
}
