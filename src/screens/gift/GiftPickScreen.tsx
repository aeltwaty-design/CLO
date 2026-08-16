import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGift } from '../../state/GiftState';
import { colleagueRecents, giftLists, type GiftContact } from '../../data/giftContacts';
import { IosStatusBar, FlowAppBar } from '../../components/redeem/FlowChrome';
import iconSearch from '../../assets/figma/7e784d450e713f5e771409c8ebed7f9f7b1ad69f.svg';
import iconCheck from '../../assets/figma/ec91bd5baa6ab023b5ea89bcec71a71003ab1230.svg';
import iconUserPlus from '../../assets/figma/1f08c5f70abbbf78f9edf1e6921ca5c1c393da94.svg';

/**
 * اختر المستلم — gift-flow pick screen (drawn frames 3196:33255/33656
 * «زملاء العمل» + recents / 3196:33505 «أفراد العائلة»), reached from the
 * redemption hub's «أهدِها» rows via `?aud=colleagues|family`. Radio list
 * exactly as drawn (selecting turns the row brand-50 + green border, fills
 * the checkbox and enables the pinned CTA); the colleagues variant adds the
 * «ارسل لهم مره ثانية» recents avatars. The drawn colleagues title reads
 * «زملاء العملاء» — a typo we render as زملاء العمل per user direction.
 */
export default function GiftPickScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const aud = params.get('aud') === 'family' ? 'family' : 'colleagues';
  const { setAudience, setRecipient } = useGift();
  const list = giftLists[aud];
  const [selected, setSelected] = useState<{ from: 'list' | 'recents'; i: number } | null>(null);

  const picked: GiftContact | null =
    selected === null ? null : selected.from === 'recents' ? colleagueRecents[selected.i] : list[selected.i];

  const submit = () => {
    if (!picked) return;
    setAudience(aud);
    setRecipient(picked);
    navigate('/gift/amount');
  };

  return (
    <div className="relative h-full overflow-hidden bg-surface">
      <div className="h-full overflow-y-auto pb-[75px]">
        <div className="flex w-full flex-col items-center gap-6 px-4">
          <div className="-mx-4 flex w-[375px] flex-col items-start">
            <IosStatusBar />
            <FlowAppBar />
          </div>

          {/* label row — the family variant carries the mint user-plus button */}
          <div className="flex w-full items-center justify-between">
            {aud === 'family' ? (
              <div className="flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-lg bg-brand-50 p-2 shadow-xs">
                <div className="relative size-5 shrink-0 overflow-clip">
                  <div className="absolute inset-[12.5%]">
                    <div className="absolute inset-[-6.67%]">
                      <img alt="" className="block size-full max-w-none" src={iconUserPlus} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="size-9 shrink-0" aria-hidden />
            )}
            <p className="whitespace-nowrap text-right text-lg font-bold leading-[1.5] text-ink" dir="auto">
              {aud === 'family' ? 'أفراد العائلة' : 'زملاء العمل'}
            </p>
          </div>

          {/* recents — colleagues only (drawn «ارسل لهم مره ثانية»; the body
              stacks recents + list with the drawn 48px gap) */}
          {aud === 'colleagues' && (
            <div className="mb-6 flex w-full flex-col items-end gap-3">
              <p className="whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                ارسل لهم مره ثانية
              </p>
              <div className="flex w-full items-start justify-end gap-4">
                {[...colleagueRecents].reverse().map((c) => {
                  // physical DOM order matches the drawing: حمود rightmost
                  const i = colleagueRecents.indexOf(c);
                  const active = selected?.from === 'recents' && selected.i === i;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelected({ from: 'recents', i })}
                      className="flex w-[72px] shrink-0 flex-col items-center gap-1.5"
                    >
                      <div
                        className={`relative size-16 shrink-0 overflow-clip rounded-full ${
                          active ? 'border-2 border-solid border-brand-400' : ''
                        }`}
                      >
                        <img alt="" className="absolute inset-0 block size-full max-w-none rounded-full object-cover" src={c.avatar} />
                      </div>
                      <p
                        className={`whitespace-nowrap text-center text-xs leading-[1.5] ${
                          active ? 'font-medium text-brand-400' : 'font-normal text-ink'
                        }`}
                        dir="auto"
                      >
                        {c.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 🎹 List picker */}
          <div className="flex w-[343px] shrink-0 flex-col items-end gap-2">
            <p className="shrink-0 whitespace-nowrap text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
              اختار من القائمة
            </p>
            <div className="flex w-full shrink-0 flex-col items-end gap-1.5">
              <div className="flex w-full items-center justify-end overflow-clip rounded-full border border-solid border-line bg-surface px-3 py-2.5">
                <div className="relative flex min-w-px flex-[1_0_0] items-center justify-end gap-2">
                  <input
                    type="text"
                    dir="auto"
                    placeholder="ابحث عن اسم معين .."
                    className="min-w-px flex-[1_0_0] text-right text-xs font-normal leading-[1.5] text-ink outline-none placeholder:text-ink-quadrant"
                  />
                  <div className="relative size-[18px] shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconSearch} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col items-start gap-1">
              {list.map((contact, i) => {
                const isSelected = selected?.from === 'list' && selected.i === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelected({ from: 'list', i })}
                    className={`flex h-16 w-full shrink-0 cursor-pointer items-center justify-end gap-3 rounded-2xl border border-solid px-4 ${
                      isSelected ? 'border-brand-400 bg-brand-50' : 'border-line-subtle bg-surface'
                    }`}
                  >
                    {isSelected ? (
                      <div className="relative size-4 shrink-0 overflow-clip rounded-lg border border-solid border-brand-400 bg-brand-400">
                        <div className="absolute inset-[calc(31.25%-0.38px)]">
                          <img alt="" className="absolute inset-0 block size-full max-w-none" src={iconCheck} />
                        </div>
                      </div>
                    ) : (
                      <div className="relative size-4 shrink-0 rounded-lg border border-solid border-line bg-surface" />
                    )}
                    <div className="relative flex min-w-px flex-[1_0_0] items-center justify-center">
                      <div className="w-full flex-none -scale-y-100">
                        <div className="flex w-full flex-col items-end justify-center gap-1">
                          <div className="relative flex w-full shrink-0 items-center justify-center">
                            <div className="w-full flex-none -scale-y-100">
                              <p
                                className={`w-full text-right text-xs font-normal leading-[1.5] text-ink-secondary ${contact.detailEn ? 'font-en' : ''}`}
                                dir={contact.detailEn ? 'ltr' : 'auto'}
                              >
                                {contact.detail}
                              </p>
                            </div>
                          </div>
                          <div className="relative flex w-full shrink-0 items-center justify-center">
                            <div className="w-full flex-none -scale-y-100">
                              <p className="w-full text-right text-xs font-medium leading-[1.5] text-ink" dir="auto">
                                {contact.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative size-10 shrink-0 overflow-clip rounded-full">
                      <img alt="" className="absolute inset-0 block size-full max-w-none rounded-full object-cover" src={contact.avatar} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ⛴️ Pinned CTA + home indicator */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center bg-surface">
        <button
          type="button"
          disabled={!picked}
          onClick={submit}
          className={`flex w-[343px] shrink-0 items-center justify-center gap-2 overflow-clip rounded-xl px-4 py-2.5 ${
            picked ? 'cursor-pointer bg-brand-400' : 'bg-surface-disabled'
          }`}
        >
          <p
            className={`shrink-0 whitespace-nowrap text-right text-sm font-medium leading-[1.5] ${
              picked ? 'text-ink-inverse' : 'text-ink-quadrant'
            }`}
            dir="auto"
          >
            اللي بعده
          </p>
        </button>
        <div className="relative h-[34px] w-full shrink-0">
          <div className="absolute bottom-2 left-[calc(50%+0.5px)] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink" />
        </div>
      </div>
    </div>
  );
}
