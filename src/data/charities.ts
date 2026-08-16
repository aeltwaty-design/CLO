/**
 * «تبرع فيها» causes and organisations (derived, no drawn frame).
 *
 * The four causes reuse glyphs already in the repo — nothing charity-shaped
 * was ever drawn — and each is painted brand-green through its alpha mask, so
 * the icons' own baked colours (a #111317 heart beside a #00CE8B shield) stop
 * mattering.
 *
 * The organisations below are **placeholder demo entities**: deliberately
 * generic descriptions rather than real registered charities, so the prototype
 * never shows invented donation records against a real organisation's name.
 * Swapping in real partners is a one-line edit per row.
 */
import iconUserGroup from '../assets/figma/c04ddb73b1f16fee418ee0a379afe3efa825e126.svg';
import iconHeart from '../assets/figma/abd2930f3bda6577cc003ae3e4e50852eb9b1aa4.svg';
import iconGlobal from '../assets/figma/fbf3e34826645b91917a0aea937094cb92634861.svg';
import iconShieldTick from '../assets/figma/4e3beabd9f625112a6c0d14a542cd1ab55f1d317.svg';

export type Cause = { id: string; label: string; blurb: string; icon: string };

export const CAUSES: Cause[] = [
  { id: 'orphans', label: 'كفالة يتيم', blurb: 'كفالة شهرية ليتيم', icon: iconUserGroup },
  { id: 'sadaqah', label: 'صدقة جارية', blurb: 'أجر يجري بعد العمر', icon: iconHeart },
  { id: 'relief', label: 'إغاثة عاجلة', blurb: 'إغاثة المتضررين', icon: iconGlobal },
  { id: 'health', label: 'صحة وعلاج', blurb: 'علاج المحتاجين', icon: iconShieldTick },
];

export const causeById = (id: string | null | undefined): Cause | null =>
  CAUSES.find((c) => c.id === id) ?? null;

export type Charity = {
  id: string;
  causeId: string;
  name: string;
  blurb: string;
  /** monogram wordmark */
  mark: string;
  /** monogram background — token classes, unlike the operators' brand hexes */
  tint: string;
};

export const CHARITIES: Charity[] = [
  { id: 'kafala', causeId: 'orphans', name: 'صندوق كفالة الأيتام', blurb: 'كفالة شهرية كاملة', mark: 'ك', tint: 'bg-brand-800' },
  { id: 'dar', causeId: 'orphans', name: 'دار رعاية الأيتام', blurb: 'سكن ورعاية يومية', mark: 'د', tint: 'bg-viola-700' },
  { id: 'taleem', causeId: 'orphans', name: 'صندوق تعليم اليتيم', blurb: 'رسوم دراسية وحقيبة', mark: 'ت', tint: 'bg-bravo-500' },

  { id: 'saqya', causeId: 'sadaqah', name: 'وقف سقيا الماء', blurb: 'آبار وبرادات مياه', mark: 'س', tint: 'bg-brand-800' },
  { id: 'masajid', causeId: 'sadaqah', name: 'وقف بناء المساجد', blurb: 'بناء وصيانة المساجد', mark: 'م', tint: 'bg-viola-700' },
  { id: 'mushaf', causeId: 'sadaqah', name: 'وقف طباعة المصحف', blurb: 'توزيع المصاحف', mark: 'ط', tint: 'bg-gold-700' },

  { id: 'ighatha', causeId: 'relief', name: 'صندوق الإغاثة الإنسانية', blurb: 'استجابة عاجلة للكوارث', mark: 'إ', tint: 'bg-brand-800' },
  { id: 'kiswa', causeId: 'relief', name: 'صندوق كسوة الشتاء', blurb: 'ملابس ودفء للأسر', mark: 'ك', tint: 'bg-bravo-500' },
  { id: 'salla', causeId: 'relief', name: 'سلة الغذاء', blurb: 'سلال غذائية شهرية', mark: 'غ', tint: 'bg-gold-700' },

  { id: 'ilaj', causeId: 'health', name: 'صندوق علاج المرضى', blurb: 'تكاليف العمليات', mark: 'ع', tint: 'bg-brand-800' },
  { id: 'ajhiza', causeId: 'health', name: 'صندوق الأجهزة الطبية', blurb: 'كراسي وأجهزة تنفس', mark: 'ج', tint: 'bg-viola-700' },
  { id: 'adwiya', causeId: 'health', name: 'صندوق الدواء', blurb: 'أدوية الأمراض المزمنة', mark: 'د', tint: 'bg-bravo-500' },
];

export const charitiesFor = (causeId: string | null | undefined): Charity[] =>
  CHARITIES.filter((c) => c.causeId === causeId);

export const charityById = (id: string | null | undefined): Charity | null =>
  CHARITIES.find((c) => c.id === id) ?? null;

/** Quick chips — physical order, so the RTL row reads 10 → 500. */
export const DONATE_CHIPS: number[][] = [
  [50, 25, 10],
  [500, 200, 100],
];
