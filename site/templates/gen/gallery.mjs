import * as K from './kit.mjs';
const { icon, btn, tabs, divider } = K;

// 사진 자리: 회색 한 가지 바탕 + 사진 아이콘 (여러 색을 쓰지 않는다, 실제 사진은 서비스에서 넣는다)
const ph = (ratio, i = 0, cls = '', theme = 'mix') => `<div class="ds-imageframe tp-photo${cls ? ' ' + cls : ''}"${ratio ? ` data-ratio="${ratio}"` : ''} aria-hidden="true"><span class="tp-ph"><img src="${K.photo(theme, i, 1200)}" alt="" loading="lazy"></span></div>`;
const CSS = `
  .tp-gal { display: flex; flex-direction: column; gap: var(--ds-space-x10); width: min(100%, var(--tp-page-box)); margin-inline: auto; padding: var(--ds-space-x10) var(--ds-space-x4) var(--ds-space-x16); padding-inline: var(--tp-gutter); }
  @media (min-width: 768px) { .tp-gal { padding: var(--ds-space-x16) var(--ds-space-x6) var(--ds-space-x24); } }
  .tp-hero-t { font-size: var(--ds-font-size-t12); line-height: var(--ds-line-height-t12); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  @media (min-width: 1024px) { .tp-hero-t { font-size: var(--ds-font-size-t14); line-height: var(--ds-line-height-t14); } }
  .tp-lead { font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); color: var(--ds-color-fg-neutral-muted); }
  .tp-center { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x4); text-align: center; }
  .tp-center .tp-lead { max-width: 640px; }
  .tp-ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ds-space-x2); }
  .tp-photo { border-radius: var(--ds-shape-xl); }
  .tp-photo .ds-icon { color: var(--ds-color-fg-neutral-subtle); }
`;
const wrap = (inner) => `<div class="tp-app"><main class="tp-gal">${inner}</main></div>`;
const heroText = (t, d, ctas = true) => `<div class="tp-center"><h1 class="tp-hero-t">${t}</h1><p class="tp-lead">${d}</p>${ctas ? `<div class="tp-ctas">${btn('시작하기', { variant: 'brandSolid', size: 'large' })}${btn('더 알아보기', { variant: 'neutralOutline', size: 'large' })}</div>` : ''}</div>`;
const HERO = {
  centered: ['오늘의 순간을 한곳에', '흩어진 사진을 모아 두고, 보고 싶을 때 바로 꺼내 보세요.'],
  classic: ['요즘 많이 찾는 사진', '분류를 고르면 마음에 드는 사진을 더 빨리 찾을 수 있어요.'],
  hero: ['좋아하는 장면을 앨범으로', '여행, 음식, 일상 사진을 앨범으로 정리하고 가족, 친구와 함께 봐요.'],
  mixed: ['이번 주 새로 올라온 사진', '크기가 다른 사진을 한눈에 둘러보고, 마음에 들면 저장해 두세요.'],
  product: ['새로 들어온 상품', '이번 주에 들어온 상품을 먼저 만나 보세요.'],
  side: ['색으로 고르는 사진', '좋아하는 색을 고르면 그 색이 담긴 사진만 모아서 보여 줘요.'],
};

// 벽돌형 갤러리 사진: [비율, 제목]. 사진을 누르면 Lightbox 로 크게 본다
const product = () => ({ slug: 'product-gallery', en: 'Product Gallery', name: '상품 갤러리', group: 'Content', desc: '같은 모양의 상품 카드를 나열한 갤러리입니다. 구성이 단순해 둘러보며 선택하기 쉽습니다.', css: CSS + `
  .tp-pg-head { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); align-items: end; }
  @media (min-width: 1024px) { .tp-pg-head { grid-template-columns: 2fr 1fr; } .tp-pg-head > :last-child { justify-self: end; } }
  .tp-grid3 { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: var(--ds-space-x6); }
  @media (min-width: 640px) { .tp-grid3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .tp-grid3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .tp-pcard__text { display: flex; flex-direction: column; gap: var(--ds-space-x1); }
  .tp-pcard__price { margin-top: var(--ds-space-x1); font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.01em; }
  .tp-pcard { display: flex; flex-direction: column; gap: var(--ds-space-x3); color: inherit; text-decoration: none; }
`, body: wrap(`<div class="tp-pg-head"><div class="tp-stack" style="gap: var(--ds-space-x3)"><h1 class="tp-hero-t">${HERO.product[0]}</h1><p class="tp-lead">${HERO.product[1]}</p></div>${btn('모두 보기', { variant: 'neutralOutline', size: 'large', icEnd: 'arrow-right' })}</div><div class="tp-grid3">${[['어디든 가는 가방', '가볍고 튼튼해서 매일 들기 좋아요.', '75,000원'], ['손으로 빚은 머그', '하나씩 모양이 조금씩 달라요.', '28,000원'], ['리넨 쿠션 커버', '빨수록 부드러워지는 천이에요.', '32,000원'], ['원목 트레이', '아침상을 차리기 좋은 크기예요.', '46,000원'], ['향초 세트', '세 가지 향을 번갈아 써 보세요.', '39,000원'], ['산책용 물병', '보온과 보냉이 모두 돼요.', '24,000원']].map(([t, d, p], i) => `<a class="tp-pcard" href="#">${ph('4:3', i, '', 'product')}<span class="tp-pcard__text"><span class="tp-name">${t}</span><span class="tp-sub">${d}</span></span><span class="tp-pcard__price tp-num">${p}</span></a>`).join('')}</div>`) });

export const templates = [product].map((f) => f());
