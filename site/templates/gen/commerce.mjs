import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar } from './frame.mjs';
const { icon, btn, iconBtn, badge, card, secHead, checkbox, checkOnly, tabs, progress, thumb, link, avatar, esc } = K;

const MENU = ['강의', '교재', '모의고사', '혜택'];
const END = `${iconBtn('search', '찾기', { size: 'xsmall' })}${iconBtn('heart', '찜한 강의', { size: 'xsmall' })}${iconBtn('shopping-cart', '장바구니', { size: 'xsmall' })}${avatar('와이비엠', 24)}`;
const won = (n) => T(n.toLocaleString('ko-KR') + '원');

const CSS = FRAME_CSS + `
  .tp-shop { box-sizing: border-box; display: flex; flex-direction: column; gap: var(--ds-space-x6); width: min(100%, var(--tp-page-box)); margin-inline: auto; padding: var(--ds-space-x6) var(--ds-space-x4) var(--ds-space-x16); padding-inline: var(--tp-gutter); }
  .tp-shop__head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ds-space-x3) var(--ds-space-x4); }
  .tp-steps { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x2); margin: 0; padding: 0; list-style: none; font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); color: var(--ds-color-fg-neutral-subtle); }
  .tp-steps li { display: inline-flex; align-items: center; gap: var(--ds-space-x1_5); }
  .tp-steps li + li::before { content: ''; width: 16px; height: 1px; margin-inline-end: var(--ds-space-x0_5); background: var(--ds-color-stroke-neutral-weak); }
  .tp-steps b { display: inline-grid; place-items: center; width: 20px; height: 20px; border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-neutral-weak-alpha); font-size: var(--ds-font-size-t01); font-weight: var(--ds-font-weight-semibold); font-variant-numeric: tabular-nums; }
  .tp-steps [aria-current] { color: var(--ds-color-fg-neutral); font-weight: var(--ds-font-weight-semibold); }
  .tp-steps [aria-current] b { background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); }
  .tp-cart { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); }
  .tp-cart__main { display: flex; flex-direction: column; gap: var(--ds-space-x4); min-width: 0; }
  .tp-cart__aside { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-cart__order { display: none; }
  @media (min-width: 1280px) {
    .tp-cart { grid-template-columns: minmax(0, 1fr) 360px; align-items: start; }
    .tp-cart__aside { position: sticky; top: 88px; }
    .tp-cart__order { display: flex; }
  }
  .tp-selbar { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-freeship__body { display: flex; flex: 1 1 auto; flex-direction: column; gap: var(--ds-space-x2); min-width: 0; }
  .tp-freeship b { font-weight: var(--ds-font-weight-bold); color: var(--ds-color-fg-brand); }
  .tp-freeship__ends { display: flex; justify-content: space-between; font-size: var(--ds-font-size-t02); line-height: var(--ds-line-height-t02); color: var(--ds-color-fg-neutral-subtle); font-variant-numeric: tabular-nums; }
  .tp-grp.ds-card { gap: 0; }
  .tp-grp__head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x2); padding-bottom: var(--ds-space-x3); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-grp__head .tp-row { flex-wrap: wrap; }
  .tp-item { display: grid; grid-template-columns: auto 72px minmax(0, 1fr) auto; grid-template-areas: "chk img info del" "chk ctl ctl ctl"; align-items: start; gap: var(--ds-space-x3); padding-block: var(--ds-space-x4); }
  .tp-item + .tp-item { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-item:last-child { padding-bottom: 0; }
  .tp-item__chk { grid-area: chk; padding-top: 2px; }
  .tp-item__img { grid-area: img; }
  .tp-item__info { grid-area: info; display: flex; flex-direction: column; gap: var(--ds-space-x1); min-width: 0; }
  .tp-item__name { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); color: var(--ds-color-fg-neutral); text-decoration: none; }
  .tp-item__opt { font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); color: var(--ds-color-fg-neutral-subtle); }
  .tp-item__del { grid-area: del; margin-top: -6px; }
  .tp-item__ctl { grid-area: ctl; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-item__info > .ds-btn { align-self: flex-start; margin-top: var(--ds-space-x1); }
  .tp-selbar .ds-checkbox { white-space: nowrap; }
  .tp-only-md { display: none; }
  .tp-price { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
  .tp-price__was { font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); color: var(--ds-color-fg-neutral-subtle); text-decoration: line-through; }
  .tp-price__now { display: flex; align-items: baseline; gap: var(--ds-space-x1); font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-bold); }
  .tp-off { color: var(--ds-color-fg-critical); }
  .tp-item[data-soldout] :is(.tp-item__img, .tp-item__name, .tp-price) { opacity: 0.4; }
  @media (min-width: 768px) {
    .tp-item { grid-template-columns: auto 88px minmax(0, 1fr) auto auto; grid-template-areas: "chk img info ctl del"; align-items: center; column-gap: var(--ds-space-x4); }
    .tp-item__chk { align-self: center; padding-top: 0; }
    .tp-item__del { margin-top: 0; }
    .tp-item__ctl { gap: var(--ds-space-x6); }
    .tp-price { min-width: 140px; }
    .tp-only-md { display: inline-flex; }
  }
  .tp-sum { display: flex; flex-direction: column; gap: var(--ds-space-x3); margin: 0; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-sum > div { display: flex; align-items: baseline; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-sum dt { color: var(--ds-color-fg-neutral-muted); }
  .tp-sum dd { margin: 0; text-align: end; }
  .tp-sum__total { margin-top: var(--ds-space-x1); padding-top: var(--ds-space-x4); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-sum__total dt { color: var(--ds-color-fg-neutral); font-weight: var(--ds-font-weight-semibold); }
  .tp-sum__total dd { font-size: var(--ds-font-size-t08); line-height: var(--ds-line-height-t08); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .tp-tip { display: flex; align-items: flex-start; gap: var(--ds-space-x2); padding: var(--ds-space-x3); border-radius: var(--ds-shape-md); background: var(--ds-color-bg-neutral-weak-alpha); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); color: var(--ds-color-fg-neutral-muted); }
  .tp-tip .ds-icon { flex: none; margin-top: 2px; --ds-icon-size: 16px; }
  .tp-cart__order.ds-btn { width: 100%; }
  .tp-orderbar { position: sticky; bottom: 0; z-index: var(--ds-z-sticky); display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); padding: var(--ds-space-x3) var(--ds-space-x4); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-orderbar .tp-stack { gap: 0; }
  .tp-orderbar b { font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); font-weight: var(--ds-font-weight-bold); }
  @media (min-width: 1280px) { .tp-orderbar { display: none; } }
  .tp-notes { display: flex; flex-direction: column; gap: var(--ds-space-x1_5); margin: 0; padding-inline-start: var(--ds-space-x5); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); }
  .tp-recs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x6) var(--ds-space-x4); }
  @media (min-width: 768px) { .tp-recs { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .tp-rec { display: flex; flex-direction: column; gap: var(--ds-space-x2); min-width: 0; }
  .tp-rec__name { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); color: var(--ds-color-fg-neutral); text-decoration: none; }
  .tp-rec .tp-price { align-items: flex-start; gap: 0; margin-top: calc(-1 * var(--ds-space-x1)); }
  .tp-rec .tp-price__was { order: 2; }
  .tp-rec .ds-btn { margin-top: auto; }
`;

const steps = (cur) => `<ol class="tp-steps" aria-label="결제 단계">${['장바구니', '결제', '신청 완료'].map((t, i) => `<li${i === cur ? ' aria-current="step"' : ''}><b>${i + 1}</b>${t}</li>`).join('')}</ol>`;
const qty = (n, name, off = false) => `<div class="ds-quantity" data-size="small"><button type="button" class="ds-quantity__btn" aria-label="${esc(name)} 수량 줄이기"${n <= 1 || off ? ' disabled' : ''}>${icon('minus')}</button><input class="ds-quantity__value" inputmode="numeric" value="${n}" aria-label="${esc(name)} 수량"${off ? ' disabled' : ''}><button type="button" class="ds-quantity__btn" aria-label="${esc(name)} 수량 늘리기"${off ? ' disabled' : ''}>${icon('plus')}</button></div>`;
const price = (now, was, n) => `<div class="tp-price">${was ? `<span class="tp-price__was tp-num">${(was * n).toLocaleString('ko-KR')}원</span>` : ''}<span class="tp-price__now">${was ? `<span class="tp-off tp-num">${Math.round((1 - now / was) * 100)}%</span>` : ''}${won(now * n)}</span></div>`;
const item = ([name, opt, img, now, was, n, soldout]) => `<div class="tp-item"${soldout ? ' data-soldout' : ''}>
  <span class="tp-item__chk">${checkOnly(name + ' 고르기', !soldout)}</span>
  <a class="tp-item__img" href="#" tabindex="-1">${thumb('1:1', '', K.photo('product', img, 240), 'md')}</a>
  <div class="tp-item__info"><a class="tp-item__name" href="#">${name}</a><span class="tp-item__opt">${opt}</span>${soldout ? `<span>${badge('마감', 'critical')}</span>` : btn('옵션 바꾸기', { variant: 'neutralOutline', size: 'xsmall' })}</div>
  <div class="tp-item__ctl">${qty(n, name, soldout)}${price(now, was, n)}</div>
  <span class="tp-item__del">${iconBtn('x', name + ' 빼기', { size: 'xsmall' })}</span>
</div>`;
const rec = ([name, img, now, was]) => `<article class="tp-rec"><a href="#" tabindex="-1">${thumb('1:1', '', K.photo('product', img, 480), 'lg')}</a><a class="tp-rec__name" href="#">${name}</a>${price(now, was, 1).replace('class="tp-price"', 'class="tp-price" style="align-items:flex-start"')}${btn('담기', { variant: 'neutralWeak', ic: 'shopping-cart', fill: true })}</article>`;
const RECS = [['단기 공략 750+', 3, 16200, 18000], ['말하기 시험 실전 모의고사', 2, 17100, 0], ['영어 회화 패턴 100', 5, 13500, 15000], ['기초 영문법 워크북', 4, 9800, 0]];
const NOTES = ['장바구니에 담은 강의와 교재는 30일 동안 보관해요.', '쿠폰과 포인트는 결제 단계에서 쓸 수 있어요.', '수강료와 할인은 바뀔 수 있어서, 결제할 때의 금액으로 결제돼요.'];

const cart = () => {
  const groups = [
    ['온라인 강의', badge('바로 수강', 'positive'), '배송 없음', [['기초 영문법 30일 완성', '수강 기간 90일', 0, 59000, 79000, 1], ['영어 말하기 시험 실전반', '수강 기간 60일 / 교재 미포함', 1, 89000, 0, 1]]],
    ['학원 수업', badge('강남 학원'), '현장 수업', [['직장인 회화 저녁반', '12월 / 월, 수, 금 19:30', 4, 180000, 200000, 1], ['주말 실전 문제 풀이반', '12월 / 토 10:00', 5, 150000, 0, 1, true]]],
    ['교재', badge('택배 배송'), '배송비 3,000원', [['실전 모의고사 1000제', '2권 세트', 2, 34200, 38000, 1]]],
  ];
  const n = groups.reduce((a, g) => a + g[3].length, 0);
  const on = groups.reduce((a, g) => a + g[3].filter((r) => !r[6]).length, 0);
  const body = `<div class="tp-app">${topbar(MENU, -1, END)}
<main class="tp-shop" aria-label="장바구니">
  <header class="tp-shop__head"><h1 class="tp-h1">장바구니</h1>${steps(0)}</header>
  ${tabs([`전체 ${n}`, '찜한 강의 3'], 0, '장바구니 목록')}
  <div class="tp-cart">
    <div class="tp-cart__main">
      <div class="tp-selbar">${checkbox(`전체 고르기 ${T(on + '/' + n)}`, { checked: true })}<div class="tp-row">${btn('마감된 수업 빼기', { variant: 'ghost', attrs: 'class="tp-only-md"' }).replace('class="ds-btn" ', 'class="ds-btn tp-only-md" ').replace(' class="tp-only-md"', '')}${btn('고른 항목 빼기', { variant: 'neutralOutline' })}</div></div>
      <div class="ds-callout tp-freeship" data-tone="informative">${icon('truck')}<div class="tp-freeship__body"><p class="ds-callout__content">교재를 <b>${won(15800)}</b> 더 담으면 <b>무료 배송</b>이에요.</p>${progress(68, { label: '무료 배송까지' })}<span class="tp-freeship__ends"><span>0원</span><span>50,000원</span></span></div></div>
      ${groups.map(([seller, tag, ship, rows]) => card(`<div class="tp-grp__head"><span class="tp-row">${checkOnly(seller + ' 모두 고르기', true)}<h2 class="tp-h4">${seller}</h2>${tag}</span><span class="tp-caption">${ship}</span></div>${rows.map(item).join('')}`, { cls: 'tp-grp', attrs: `aria-label="${esc(seller)}"` })).join('')}
      <ul class="tp-notes">${NOTES.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>
    <aside class="tp-cart__aside" aria-label="결제 예정 금액">
      ${card(`<h2 class="tp-h3">결제 예정 금액</h2><dl class="tp-sum"><div><dt>주문 금액</dt><dd>${won(406000)}</dd></div><div><dt>할인 금액</dt><dd class="tp-off">-${won(43800)}</dd></div><div><dt>배송비</dt><dd>${won(3000)}</dd></div><div class="tp-sum__total"><dt>결제 예정 금액</dt><dd>${won(365200)}</dd></div></dl><p class="tp-tip">${icon('tag')}<span>수강 쿠폰을 쓰면 최대 ${won(12000)} 더 아낄 수 있어요. 결제 단계에서 골라 주세요.</span></p>`, { size: 'medium' })}
      ${btn(`${won(365200)} 결제하기`, { variant: 'brandSolid', size: 'large' }).replace('class="ds-btn"', 'class="ds-btn tp-cart__order"')}
    </aside>
  </div>
  <section class="tp-sec" aria-labelledby="recs">${secHead('함께 보면 좋은 교재', { id: 'recs', cls: 'tp-h2' })}<div class="tp-recs">${RECS.map(rec).join('')}</div></section>
</main>
<div class="tp-orderbar"><div class="tp-stack"><span class="tp-caption">선택 ${T('4')}개</span><b>${won(365200)}</b></div>${btn('결제하기', { variant: 'brandSolid', size: 'large' })}</div>
</div>`;
  return { slug: 'cart', en: 'Cart', name: '장바구니', group: 'Commerce', desc: '담은 강의와 교재를 확인하고 수강 기간과 수량을 바꾸는 장바구니입니다. 결제 예정 금액을 보며 바로 결제합니다.', css: CSS, body };
};

export const templates = [cart].map((f) => f());
