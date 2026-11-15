import * as K from './kit.mjs';
const { icon, btn, iconBtn, badge, card, head, secHead, search, divider, thumb, link, tabs, table, avatar, avatars, codeblock, list, listItem, select, field, checkbox, progress, segmented, accordion, chiptabs, esc } = K;
const T = (s) => `<span class="tp-num">${s}</span>`;

const DOC_CSS = `
  .tp-doc { display: flex; flex-direction: column; gap: var(--ds-space-x8); width: min(100%, var(--tp-narrow)); margin-inline: auto; }
  .tp-doc-title { font-size: var(--ds-font-size-t12); line-height: var(--ds-line-height-t12); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .tp-doc p { font-size: var(--ds-font-size-t05); line-height: 28px; }
  .tp-demo { display: grid; place-items: center; min-height: 180px; padding: var(--ds-space-x6); border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-neutral-subtle); }
  .tp-demo__row { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ds-space-x3); }
`;
let TN = 0;
let BK = 0;
const tileCard = (t, d) => `<article class="ds-card tp-card tp-tile" data-size="small">${thumb('16:9', '', K.photo('mix', TN++, 640), 'md')}<div class="tp-stack"><h3 class="tp-h4">${t}</h3><p class="tp-sub">${d}</p></div></article>`;

/* 5. 주문 상세 -------------------------------------------------- */
const orderDetail = () => {
  const items = [['TOEIC 실전 모의고사 1000제', '19,000원', 2], ['단어 암기 카드', '12,000원', 1], ['오답 노트', '3,000원', 3], ['형광펜 5색 세트', '4,500원', 1], ['독서대', '28,000원', 1]];
  const acts = [['주문 접수', '와이비엠 님이 주문했어요', '10.31 오후 2:04'], ['결제 완료', '카드 결제 89,500원', '10.31 오후 2:05'], ['메모 추가', '"선물 포장 부탁드려요"', '10.31 오후 2:06'], ['재고 확인 필요', '독서대 재고 1개 남음', '10.31 오후 4:30']];
  const css = `
  .tp-od { display: grid; flex: 1 1 auto; grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 1280px) { .tp-od { grid-template-columns: minmax(0, 1fr) 360px; } }
  .tp-meta-line { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x2); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); }
  .tp-meta-line .tp-sep { color: var(--ds-color-stroke-neutral-weak); }
  .tp-line { display: grid; grid-template-columns: 56px minmax(0, 1fr) auto; gap: var(--ds-space-x3); align-items: center; padding-block: var(--ds-space-x3); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-tl { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .tp-tl li { position: relative; display: grid; grid-template-columns: 16px minmax(0, 1fr); gap: var(--ds-space-x3); padding-bottom: var(--ds-space-x4); }
  .tp-tl li::before { content: ""; width: 10px; height: 10px; margin: 5px 3px 0; border-radius: 50%; background: var(--ds-color-bg-brand-solid); }
  .tp-tl li:not(:last-child)::after { content: ""; position: absolute; left: 7px; top: 18px; bottom: 0; width: 2px; background: var(--ds-color-stroke-neutral-muted); }
`;
  const sep = '<span class="tp-sep">/</span>';
  const body = `<div class="tp-app">
<header class="tp-head" style="flex-direction: column; align-items: stretch; padding-bottom: 0">
  <div class="tp-between" style="align-items:flex-start"><div class="tp-stack" style="gap: var(--ds-space-x2)">${link(icon('chevron-left', 'sm') + '모든 주문')}<h1 class="tp-h1">#1001</h1><div class="tp-meta-line"><span>상품 5개</span>${sep}<span class="tp-row">${avatar('와이비엠', 20)}와이비엠</span>${sep}${badge('배송 준비 전', 'warning')}${sep}<span class="tp-row">${icon('calendar', 'sm')}2026.10.31</span>${sep}<span class="tp-row">${icon('triangle-alert', 'sm')}확인 필요</span></div></div><div class="tp-row">${btn('환불')}${btn('배송 처리', { variant: 'neutralSolid' })}</div></div>
  ${tabs(['상품', '결제', '배송', '기록'], 0, '주문 탭')}
</header>
<div class="tp-od">
  <main class="tp-content tp-wi__main">
    <section class="tp-sec">${secHead(`<span class="tp-row">상품 ${badge('배송 준비 전', 'warning')}</span>`, { tools: `${btn('송장 출력', { ic: 'printer' })}${btn('배송 처리', { variant: 'neutralSolid' })}` })}<div>${items.map(([n, p, q]) => `<div class="tp-line">${thumb('1:1', '', K.photo('book', BK++, 240))}<div class="tp-stack"><span class="tp-name">${n}</span><span class="tp-caption tp-num">${p} × ${q}</span></div><span class="tp-amount">${(parseInt(p.replace(/\D/g, '')) * q).toLocaleString()}원</span></div>`).join('')}</div></section>
    <section class="tp-sec">${secHead('결제', { tools: badge('결제 완료') })}${card(`${[['상품 금액', '89,000원'], ['배송비', '3,000원'], ['할인', '-2,500원']].map(([k, v]) => `<div class="tp-between"><span class="tp-sub">${k}</span>${T(v)}</div>`).join('')}${divider()}<div class="tp-between"><b>합계</b><b class="tp-num">89,500원</b></div>`)}</section>
    <section class="tp-sec">${secHead('활동')}<ol class="tp-tl">${acts.map(([t, d, w]) => `<li><div class="tp-stack"><span class="tp-label">${t}</span><span class="tp-sub">${d}</span><span class="tp-caption">${w}</span></div></li>`).join('')}</ol></section>
  </main>
  <aside class="tp-panel">
    ${accordion([['메모', '', true], ['고객', `<div class="tp-row">${avatar('와이비엠', 42)}<div class="tp-stack"><span>와이비엠</span><span class="tp-caption">ybm@example.com / 주문 12번</span></div></div>`, true], ['배송지', '<p class="tp-sub">서울시 종로구 종로 104, 3층<br>010-1234-5678</p>', true], ['태그', `<div class="tp-row">${badge('단골', 'brand')}${badge('선물')}</div>`, false]], 'separated')}
  </aside>
</div>
</div>`;
  return { slug: 'detail-page', en: 'Order Detail', name: '주문 상세', group: 'Content', desc: '주문 한 건을 자세히 보고 처리하는 화면입니다. 상품과 진행 기록, 고객 정보를 한곳에서 확인합니다.', css, body };
};

/* 6. 상품 상세 -------------------------------------------------- */
const productDetail = () => {
  const css = `
  .tp-pd { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x8); width: min(100%, var(--tp-page)); margin-inline: auto; }
  @media (min-width: 1280px) { .tp-pd { grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); } }
  .tp-pd__media { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-thumbs { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: var(--ds-space-x2); }
  .tp-thumbs .ds-imageframe[aria-current="true"] { outline: 2px solid var(--ds-color-stroke-neutral-contrast); outline-offset: 2px; }
  .tp-pd__info { display: flex; flex-direction: column; gap: var(--ds-space-x5); }
  .tp-price { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--ds-space-x2); }
  .tp-price b { font-size: var(--ds-font-size-t09); line-height: var(--ds-line-height-t09); }
  .tp-price s { color: var(--ds-color-fg-neutral-subtle); }
  .tp-opt { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-opt .ds-quantity { align-self: flex-start; width: 144px; }
  .tp-pd__btns { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ds-space-x2); }
`;
  const body = `<div class="tp-app"><main class="tp-content"><div class="tp-pd">
  <div class="tp-pd__media">${K.zoom('pd-lb', 0, thumb('1:1', '', K.photo('book', 0, 1200), 'xl'), '상품 사진 크게 보기')}<div class="tp-thumbs">${Array.from({ length: 6 }, (_, i) => thumb('1:1', '', K.photo('book', i, 320), 'md').replace('aria-hidden="true"', i === 0 ? 'aria-current="true"' : 'aria-hidden="true"')).join('')}</div></div>
  <div class="tp-pd__info">
    <div class="tp-stack" style="gap: var(--ds-space-x2)"><h1 class="tp-h1">TOEIC 실전 모의고사 1000제 세트</h1><span class="ds-rating" data-size="small" style="--ds-rating-value: 4.3" role="img" aria-label="5점 만점에 4.3점, 후기 128개"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.3</span><span class="ds-rating__count">(128)</span></span></div>
    <div class="tp-price"><b class="tp-num">38,000원</b><s class="tp-num">48,000원</s>${badge('할인', 'critical')}</div>
    
    <div class="tp-opt"><span class="tp-h4">구성</span>${segmented(['문제집만', '문제집 + 해설', '전체 세트'], 2, '구성', 'medium')}</div>
    <div class="tp-opt"><span class="tp-h4">음원</span>${segmented(['QR 스트리밍', 'MP3 다운로드'], 0, '음원', 'medium')}</div>
    <div class="tp-opt"><span class="tp-h4">수량</span><div class="ds-quantity"><button type="button" class="ds-quantity__btn" aria-label="수량 줄이기">${icon('minus')}</button><input class="ds-quantity__value" inputmode="numeric" value="1" aria-label="수량"><button type="button" class="ds-quantity__btn" aria-label="수량 늘리기">${icon('plus')}</button></div></div>
    <div class="tp-pd__btns">${btn('장바구니 담기', { variant: 'brandSolid', size: 'large', fill: true })}${btn('', { size: 'large', ic: 'heart', aria: '찜하기' })}</div>
    ${btn('바로 구매', { variant: 'neutralOutline', size: 'large', fill: true })}
    <div>${divider()}${accordion([['상세 정보', '', true], ['배송', ''], ['교환과 환불', '']])}</div>
  </div>
</div></main>${K.lightbox('pd-lb', Array.from({ length: 6 }, (_, i) => [K.photo('book', i, 1600), `상품 사진 ${i + 1}`]))}</div>`;
  return { slug: 'product-detail', en: 'Product Detail', name: '상품 상세', group: 'Content', desc: '상품 하나를 자세히 보고 바로 구매하는 화면입니다.', css, body };
};

export const templates = [orderDetail, productDetail].map((f) => f());
