import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { TX_STATUS_LABEL, TX_TYPE_LABEL, type StatementTx } from '../data/transactions';

/**
 * Bank-statement PDF export («كشف حساب الكاش باك») — derived feature, no
 * drawn frame. An off-viewport A4 page (794px @96dpi, RTL, app fonts) is
 * laid out per ~18 rows, rasterized with html2canvas (browser-grade Arabic
 * shaping) and packed into a jsPDF A4 document.
 *
 * The riyal amounts use the new SAR symbol via an inline currentColor SVG
 * mask (same Wikimedia path as `<Riyal />`), since the statement is a
 * Phase-2 surface.
 */

const PAGE_W = 794; // A4 @ 96dpi
const PAGE_H = 1123;
const ROWS_PER_PAGE = 18;

const fmtAmount = (n: number) =>
  `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

/** New SAR symbol recolored per use — html2canvas cannot rasterize CSS
    masks, so the bundled SVG's fill is swapped and inlined as a data URI. */
let sarSvgText = '';

function riyalGlyph(size: number, color: string) {
  // html2canvas rasterizes dimensionless SVGs at 0×0 — inject an intrinsic size
  const svg = sarSvgText
    .replace(/#231f20/g, color)
    .replace('<svg ', '<svg width="1124" height="1256" ');
  const uri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  return `<img src="${uri}" width="${size}" height="${size}" style="width:${size}px;height:${size}px;vertical-align:-${Math.round(size * 0.12)}px" />`;
}

export type StatementInput = {
  txs: StatementTx[];
  from: Date;
  to: Date;
  holder: string;
  cardMasked: string;
  balance: number;
};

export async function exportStatementPdf({ txs, from, to, holder, cardMasked, balance }: StatementInput) {
  // load the bundled SAR symbol once; its fill is swapped per amount color
  if (!sarSvgText) {
    const url = (await import('../assets/icons/sar-symbol.svg')).default;
    sarSvgText = await (await fetch(url)).text();
  }

  const earned = txs.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const spent = txs.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
  const net = earned + spent;

  const pages: StatementTx[][] = [];
  const sorted = [...txs].sort((a, b) => b.date.getTime() - a.date.getTime());
  for (let i = 0; i < sorted.length; i += ROWS_PER_PAGE) pages.push(sorted.slice(i, i + ROWS_PER_PAGE));
  if (pages.length === 0) pages.push([]);

  const host = document.createElement('div');
  host.style.cssText = `position:fixed;left:-${PAGE_W + 100}px;top:0;width:${PAGE_W}px;z-index:-1;`;
  document.body.appendChild(host);

  try {
    await document.fonts.ready;
    const doc = new jsPDF('p', 'mm', 'a4');

    for (let p = 0; p < pages.length; p++) {
      host.innerHTML = pageHtml({
        rows: pages[p],
        page: p + 1,
        total: pages.length,
        from,
        to,
        holder,
        cardMasked,
        balance,
        earned,
        spent,
        net,
        count: txs.length,
      });
      const node = host.firstElementChild as HTMLElement;
      // let the browser lay out + paint fonts/masks before capture
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#ffffff', logging: false });
      if (p > 0) doc.addPage();
      doc.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297);
    }

    doc.save(`cashback-statement-${iso(from)}-${iso(to)}.pdf`);
  } finally {
    host.remove();
  }
}

/** Local-date file stamp (toISOString would shift the day in non-UTC zones). */
const iso = (d: Date) => {
  const z = new Date(d);
  z.setMinutes(z.getMinutes() - z.getTimezoneOffset());
  return z.toISOString().slice(0, 10);
};

function pageHtml(o: {
  rows: StatementTx[];
  page: number;
  total: number;
  from: Date;
  to: Date;
  holder: string;
  cardMasked: string;
  balance: number;
  earned: number;
  spent: number;
  net: number;
  count: number;
}) {
  const font = "'FF Shamel Unique','Poppins',sans-serif";
  const en = "'Poppins',sans-serif";
  const first = o.page === 1;

  const summary = first
    ? `<div style="display:flex;gap:12px;margin:20px 40px 0">
        ${summaryTile('إجمالي المكتسب', o.earned, '#00ce8b')}
        ${summaryTile('إجمالي المصروف', o.spent, '#941722')}
        ${summaryTile('الصافي', o.net, '#111317')}
        ${summaryTile('الرصيد الحالي', o.balance, '#111317')}
      </div>`
    : '';

  const rowsHtml = o.rows
    .map((t, i) => {
      const amountColor = t.amount > 0 ? '#00714c' : '#941722';
      const status = t.status ? TX_STATUS_LABEL[t.status] : '—';
      return `<tr style="background:${i % 2 ? '#ffffff' : '#f9fafb'}">
        <td style="${td}color:${amountColor};font-family:${en};font-weight:600;direction:ltr">${fmtAmount(t.amount)} ${riyalGlyph(11, amountColor)}</td>
        <td style="${td}">${status}</td>
        <td style="${td}">${TX_TYPE_LABEL[t.type]}</td>
        <td style="${td}font-weight:500">${t.title}</td>
        <td style="${td}font-family:${en}">${t.time}</td>
        <td style="${td}font-family:${en}">${fmtDate(t.date)}</td>
      </tr>`;
    })
    .join('');

  const empty = o.rows.length === 0
    ? `<tr><td colspan="6" style="${td}text-align:center;color:#96a0b6;padding:32px 0">ما فيه عمليات في هذي الفترة</td></tr>`
    : '';

  return `
  <div dir="rtl" style="width:${PAGE_W}px;height:${PAGE_H}px;background:#ffffff;font-family:${font};color:#111317;position:relative;box-sizing:border-box">
    <div style="background:linear-gradient(129.6deg,#00ce8b 3%,#006846 71%);color:#fff;padding:28px 40px;display:flex;justify-content:space-between;align-items:center">
      <div>
        <p style="margin:0;font-size:22px;font-weight:700">كشف حساب الكاش باك</p>
        <p style="margin:4px 0 0;font-size:12px;opacity:.85">كاش باك السويدي — ولاء بلس</p>
      </div>
      <div style="text-align:left;font-size:12px">
        <p style="margin:0;font-family:${en}" dir="ltr">${fmtDate(o.from)} — ${fmtDate(o.to)}</p>
        <p style="margin:4px 0 0;opacity:.85">الفترة</p>
      </div>
    </div>

    ${first ? `
    <div style="display:flex;justify-content:space-between;margin:20px 40px 0;padding:14px 16px;border:1px solid #e2e6ee;border-radius:12px;font-size:12px">
      ${meta('الاسم', o.holder)}
      ${meta('البطاقة', `<span style="font-family:${en}" dir="ltr">${o.cardMasked}</span>`)}
      ${meta('عدد العمليات', `<span style="font-family:${en}">${o.count}</span>`)}
      ${meta('تاريخ الإصدار', `<span style="font-family:${en}">${fmtDate(new Date())}</span>`)}
    </div>` : ''}
    ${summary}

    <div style="margin:20px 40px 0;border:1px solid #e2e6ee;border-radius:12px;overflow:hidden">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:#f4f6fc;color:#40444c">
            <th style="${th}">المبلغ</th>
            <th style="${th}">الحالة</th>
            <th style="${th}">النوع</th>
            <th style="${th}">العملية</th>
            <th style="${th}">الوقت</th>
            <th style="${th}">التاريخ</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}${empty}</tbody>
      </table>
    </div>

    <div style="position:absolute;bottom:24px;left:40px;right:40px;display:flex;justify-content:space-between;font-size:10px;color:#96a0b6;border-top:1px solid #f1f3f9;padding-top:10px">
      <span style="font-family:${en}">صفحة ${o.page} من ${o.total}</span>
      <span>كشف توضيحي — نموذج أولي غير رسمي</span>
    </div>
  </div>`;
}

const th = 'padding:10px 12px;text-align:right;font-weight:500;border-bottom:1px solid #e2e6ee;';
const td = 'padding:9px 12px;text-align:right;border-bottom:1px solid #f1f3f9;';

function summaryTile(label: string, value: number, color: string) {
  return `<div style="flex:1;border:1px solid #e2e6ee;border-radius:12px;padding:12px 14px">
    <p style="margin:0;font-size:11px;color:#626c83">${label}</p>
    <p style="margin:6px 0 0;font-size:16px;font-weight:700;color:${color};font-family:'Poppins',sans-serif;direction:ltr;text-align:right">${fmtAmount(value)} ${riyalGlyph(13, color)}</p>
  </div>`;
}

function meta(label: string, value: string) {
  return `<div><p style="margin:0;color:#626c83">${label}</p><p style="margin:4px 0 0;font-weight:500">${value}</p></div>`;
}
