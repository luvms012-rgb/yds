import * as K from './kit.mjs';
const { icon, btn, tabs, divider } = K;

// 사진 자리: 회색 한 가지 바탕 + 사진 아이콘 (여러 색을 쓰지 않는다, 실제 사진은 서비스에서 넣는다)
const ph = (ratio, i = 0, cls = '', theme = 'mix') => `<div class="ds-imageframe tp-photo${cls ? ' ' + cls : ''}"${ratio ? ` data-ratio="${ratio}"` : ''} aria-hidden="true"><span class="tp-ph"><img src="${K.photo(theme, i, 1200)}" alt="" loading="lazy"></span></div>`;
const CSS = `
  .tp-gal { display: flex; flex-direction: column; gap: var(--ds-space-x10); width: min(100%, var(--tp-page-box)); margin-inline: auto; padding: var(--ds-space-x10) var(--ds-space-x4) var(--ds-space-x16); padding-inline: var(--tp-gutter); }
  @media (min-width: 768px) { .tp-gal { padding: var(--ds-space-x16) var(--ds-space-x6) var(--ds-space-x24); } }
  .tp-hero-t { font-size: var(--ds-font-size-t12); line-height: var(--ds-line-height-t12); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  @media (min-width: 1280px) { .tp-hero-t { font-size: var(--ds-font-size-t14); line-height: var(--ds-line-height-t14); } }
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
  hero: ['수업 사진을 앨범으로', '수업, 스터디, 발표 사진을 앨범으로 정리하고 함께 공부한 사람과 같이 봐요.'],
  mixed: ['이번 주 새로 올라온 사진', '크기가 다른 사진을 한눈에 둘러보고, 마음에 들면 저장해 두세요.'],
  product: ['새로 나온 교재', '이번 주에 나온 교재를 시험과 수준별로 모았어요.'],
  side: ['색으로 고르는 사진', '좋아하는 색을 고르면 그 색이 담긴 사진만 모아서 보여 줘요.'],
};

// 벽돌형 갤러리 사진: [비율, 제목]. 사진을 누르면 Lightbox 로 크게 본다
const product = () => ({ slug: 'product-gallery', en: 'Product Gallery', name: '상품 목록', group: 'Content', desc: '같은 모양의 상품 카드를 나열한 갤러리입니다. 구성이 단순해 둘러보며 선택하기 쉽습니다.', css: CSS + `
  .tp-pg-head { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); align-items: end; }
  @media (min-width: 1280px) { .tp-pg-head { grid-template-columns: 2fr 1fr; } .tp-pg-head > :last-child { justify-self: end; } }
  .tp-grid3 { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: var(--ds-space-x6); }
  @media (min-width: 640px) { .tp-grid3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1280px) { .tp-grid3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .tp-pcard__text { display: flex; flex-direction: column; gap: var(--ds-space-x1); }
  .tp-pcard__price { margin-top: var(--ds-space-x1); font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.01em; }
  .tp-pcard { display: flex; flex-direction: column; gap: var(--ds-space-x3); color: inherit; text-decoration: none; }
`, body: wrap(`<div class="tp-pg-head"><div class="tp-stack" style="gap: var(--ds-space-x3)"><h1 class="tp-hero-t">${HERO.product[0]}</h1><p class="tp-lead">${HERO.product[1]}</p></div>${btn('모두 보기', { variant: 'neutralOutline', size: 'large', icEnd: 'arrow-right' })}</div><div class="tp-grid3">${[['단기 공략 750+', '2주 만에 파트별 문제 유형을 끝내요.', '16,200원', 'book', 2], ['기출 단어장 2000', '시험에 자주 나오는 단어를 하루 50개씩 외워요.', '13,500원', 'book', 4], ['영어 회화 패턴 100', '매일 쓰는 문장을 패턴으로 익혀요.', '13,500원', 'book', 3], ['듣기 집중 훈련', '짧은 대화를 듣고 따라 말하며 귀를 열어요.', '18,000원', 'listen', 1], ['영어 원서 읽기 세트', '쉬운 원서 세 권과 단어장이 함께 있어요.', '25,800원', 'book', 8], ['기초 영문법 워크북', '문제를 풀며 문법 개념을 다시 익혀요.', '9,800원', 'product', 4]].map(([t, d, p, th, n]) => `<a class="tp-pcard" href="#">${ph('4:3', n, '', th)}<span class="tp-pcard__text"><span class="tp-name">${t}</span><span class="tp-sub">${d}</span></span><span class="tp-pcard__price tp-num">${p}</span></a>`).join('')}</div>`) });

export const templates = [product].map((f) => f());
