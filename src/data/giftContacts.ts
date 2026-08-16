/**
 * Gift-flow contacts — names/phones/relations verbatim from the drawn
 * تحويل النقاط section (73:29323; source frames 3196:33255/33505/33656).
 * The colleagues list draws the same contact seven times; the recents row
 * adds ماجد رجل.
 */
import avatarHamoud from '../assets/figma/00ab4f42acf53458463d99760ad637ee2d830403.png';
import avatarMajed from '../assets/figma/12eb4f628f4852616b10cb1562b03975b91b3471.png';
import avatarSara from '../assets/figma/c50ecb71efbb68c4000ec299e71e9b21699f634d.png';
import avatarAhmad from '../assets/figma/3f4bd40c27566cd24cfeb0b56989263325a232a5.png';
import avatarFatima from '../assets/figma/3cc7e128aa1bf199fa224664bed5d3e2984bf803.png';

export type GiftAudience = 'colleagues' | 'family';

export type GiftContact = {
  name: string;
  /** phone (colleagues) or relation (family) — the row's secondary line */
  detail: string;
  /** secondary line direction: phones render ltr, relations rtl-auto */
  detailEn?: boolean;
  avatar: string;
};

const hamoud: GiftContact = { name: 'حمود الخضر', detail: '+966 123456789', detailEn: true, avatar: avatarHamoud };

/** «اختار من القائمة» — the drawn list repeats the same colleague 7×. */
export const colleagues: GiftContact[] = Array.from({ length: 7 }, () => hamoud);

/** «ارسل لهم مره ثانية» — recents avatar row (drawn: ماجد رجل + حمود الخضر). */
export const colleagueRecents: GiftContact[] = [
  { name: 'ماجد رجل', detail: '+966 123456789', detailEn: true, avatar: avatarMajed },
  hamoud,
];

export const family: GiftContact[] = [
  { name: 'سارة القحطاني', detail: 'زوجة', avatar: avatarSara },
  { name: 'أحمد السليماني', detail: 'ابن', avatar: avatarAhmad },
  { name: 'فاطمة السليماني', detail: 'ابنة', avatar: avatarFatima },
];

export const giftLists: Record<GiftAudience, GiftContact[]> = { colleagues, family };
