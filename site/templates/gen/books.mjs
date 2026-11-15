// 교재(출판) 템플릿: 교재 홈, 교재 목록, 교재 음원, 교재 로드맵. 교재 상세는 service.mjs 에 있다.
// 2026-11-15 사용자 "북스 전체 화면 검토, 쇼핑 카테고리 대신 넣기". 교재 사이트는 물건을 파는 곳이 아니라
// 교재를 찾고, 교재에 딸린 음원, 자료, 강의로 공부를 돕는 곳이다. 그래서 장바구니와 결제 대신 찾기, 음원, 자료, 로드맵을 담는다.
// 어학 교재 사이트의 공통 구조만 따르고 실제 교재 이름, 저자, 글은 넣지 않는다.
import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar } from './frame.mjs';
const { icon, btn, iconBtn, badge, avatar, card, head, secHead, select, chiptabs, tabs, progress, thumb, photo, checkbox, pagination, link, esc } = K;

const MENU = ['토익', '말하기', '영어', '일본어', '무료 강의', '로드맵'];
const end = `${btn('MP3 음원', { size: 'xsmall', ic: 'list-music' })}${iconBtn('heart', '찜한 교재', { size: 'xsmall' })}${avatar('와이비엠', 28)}`;
const app = (cur, inner) => `<div class="tp-app">${topbar(MENU, cur, end)}${inner}</div>`;

const CSS = FRAME_CSS + `
  .tp-cover { --ds-imageframe-ratio: 3 / 4; }
  .tp-book { display: flex; flex-direction: column; gap: var(--ds-space-x3); min-width: 0; color: inherit; text-decoration: none; }
  .tp-book__title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-medium); }
  .tp-book__price { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; }
  .tp-tags { display: flex; flex-wrap: wrap; gap: var(--ds-space-x1); }
  .tp-books { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x6) var(--ds-space-x4); }
  @media (min-width: 768px) { .tp-books { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (min-width: 1280px) { .tp-books { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--ds-space-x8) var(--ds-space-x6); } }
`;
// 교재에 딸린 학습 지원 표시: MP3, 무료 강의, 단어장
const marks = (list) => `<span class="tp-tags">${list.map((t) => badge(t)).join('')}</span>`;
const BOOKS = [
  ['토익 기출 문제집 1000 읽기', '어학연구소', '22,000원', ['MP3', '무료 강의']],
  ['토익 기출 문제집 1000 듣기', '어학연구소', '22,000원', ['MP3', '무료 강의']],
  ['토익 기출 단어장', '어학연구소', '15,000원', ['MP3']],
  ['토익 단기 공략 750+', '어학연구소', '19,500원', ['MP3', '무료 강의']],
  ['토익 입문 20일 완성', '한지아', '18,000원', ['무료 강의']],
  ['토익 실전 1000 읽기', '어학연구소', '18,000원', ['무료 강의']],
  ['영어 회화 50일 완성', '오도윤', '17,000원', ['MP3']],
  ['말하기 시험 기출 공략', '어학연구소', '21,000원', ['MP3']],
];
const book = (i, { price = true, tag = true } = {}) => { const [t, who, p, m] = BOOKS[i % BOOKS.length]; return `<a class="tp-book" href="#">${thumb('1:1', 'tp-cover', photo('book', i, 480), 'md')}<span class="tp-stack">${tag ? marks(m) : ''}<span class="tp-book__title">${t}</span><span class="tp-caption">${who}</span>${price ? `<span class="tp-book__price">${p}</span>` : ''}</span></a>`; };

/* 1. 교재 홈 --------------------------------------------------------- */
const home = () => {
  const css = CSS + `
  .tp-find { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x4); padding-block: var(--ds-space-x6); }
  .tp-find .ds-input { width: min(100%, 560px); }
  .tp-find .tp-row { flex-wrap: wrap; justify-content: center; }
  .tp-quick { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x3); }
  @media (min-width: 768px) { .tp-quick { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .tp-quick a { display: flex; align-items: center; gap: var(--ds-space-x3); padding: var(--ds-space-x4); border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-neutral-weak-alpha); color: inherit; text-decoration: none; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-medium); }
  .tp-step { display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: var(--ds-space-x4); align-items: center; color: inherit; text-decoration: none; }
  .tp-lec { display: flex; flex-direction: column; gap: var(--ds-space-x2); min-width: 0; color: inherit; text-decoration: none; }
`;
  const quick = [['list-music', 'MP3 음원'], ['folder-open', '학습 자료실'], ['video', '무료 강의'], ['flag', '교재 로드맵']];
  const steps = [['1단계', '단어', 2], ['2단계', '전략', 3], ['3단계', '실전', 0]];
  const lecs = [['토익 단기 공략 750+', '전체 15강', 'study', 0], ['토익 기출 단어장', '전체 11강', 'study', 2], ['영어 회화 50일 완성', '전체 54강', 'work', 2], ['토익 실전 1000 읽기', '전체 12강', 'study', 3]];
  const body = app(-1, `
<main class="tp-content">
  <section class="tp-find" role="search" aria-labelledby="bh-title">
    <h1 class="tp-h1" id="bh-title">교재 찾기</h1>
    ${K.search('bh-q', '교재 이름, 저자')}
    <div class="tp-row">${['기출 문제집', '단어장', '입문', '영어 회화'].map((t) => K.chip(t)).join('')}</div>
  </section>
  <nav class="tp-quick" aria-label="학습 지원">${quick.map(([ic, t]) => `<a href="#">${icon(ic)}${t}</a>`).join('')}</nav>
  <section class="tp-sec">${secHead('새로 나온 교재', { tools: link('모두 보기') })}
    ${chiptabs(['토익', '말하기', '영어', '일본어'], 0, '교재 분류')}
    <div class="tp-books">${[0, 1, 2, 3, 4].map((i) => book(i)).join('')}</div>
  </section>
  <section class="tp-sec">${secHead('단계별 추천', { tools: link('로드맵 보기') })}
    <div class="tp-g3">${steps.map(([n, t, i]) => card(`<a class="tp-step" href="#">${thumb('1:1', 'tp-cover', photo('book', i, 240), 'md')}<span class="tp-stack"><span class="tp-row">${badge(n, 'brand')}<span class="tp-caption">${t}</span></span><span class="tp-book__title">${BOOKS[i][0]}</span></span></a>`)).join('')}</div>
  </section>
  <section class="tp-sec">${secHead('무료 강의', { tools: link('모두 보기') })}
    <div class="tp-g4">${lecs.map(([t, n, th, i]) => `<a class="tp-lec" href="#">${thumb('16:9', '', photo(th, i, 720), 'lg')}<span class="tp-stack"><span class="tp-book__title">${t}</span><span class="tp-caption">${T(n)}</span></span></a>`).join('')}</div>
  </section>
</main>`);
  return { slug: 'book-home', en: 'Book Home', name: '교재 홈', group: 'Books', desc: '교재 찾기, 학습 지원 바로 가기, 새 교재, 단계별 추천을 모은 교재 사이트 첫 화면입니다. 찾기 칸을 맨 위에 둡니다.', css, body };
};

/* 2. 교재 목록 ------------------------------------------------------- */
const list = () => {
  const css = CSS + `
  .tp-bl { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); align-items: start; }
  .tp-bl__filter { display: none; flex-direction: column; gap: var(--ds-space-x6); }
  @media (min-width: 1024px) { .tp-bl { grid-template-columns: 220px minmax(0, 1fr); gap: var(--ds-space-x10); } .tp-bl__filter { display: flex; } .tp-bl__open { display: none; } }
  .tp-bl__filter legend { padding: 0; margin-bottom: var(--ds-space-x2); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-weight: var(--ds-font-weight-bold); }
  .tp-cnt { margin-inline-start: var(--ds-space-x1); color: var(--ds-color-fg-neutral-subtle); font-variant-numeric: tabular-nums; }
  .tp-brow { display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: var(--ds-space-x4); align-items: start; padding-block: var(--ds-space-x5); }
  .tp-brow + .tp-brow { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 768px) { .tp-brow { grid-template-columns: 120px minmax(0, 1fr); gap: var(--ds-space-x6); } }
  .tp-brow__body { display: flex; flex-direction: column; gap: var(--ds-space-x2); min-width: 0; }
  .tp-brow__title { color: inherit; text-decoration: none; font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); font-weight: var(--ds-font-weight-semibold); }
  .tp-brow__foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); margin-top: var(--ds-space-x2); }
  .tp-brow__foot .tp-row { flex-wrap: wrap; }
`;
  const group = (name, title, items) => `<fieldset class="ds-checkbox-group"><legend>${title}</legend>${items.map(([l, n, on]) => checkbox(`${l}<span class="tp-cnt">${n}</span>`, { name, checked: !!on })).join('')}</fieldset>`;
  const rows = [[0, '2026.10.15', true], [1, '2026.10.15', true], [2, '2026.08.24', false], [3, '2026.07.15', true], [5, '2026.06.30', false], [4, '2026.05.12', false]];
  const row = ([i, date, audio]) => { const [t, who, p, m] = BOOKS[i]; return `<article class="tp-brow">${thumb('1:1', 'tp-cover', photo('book', i, 360), 'md')}<div class="tp-brow__body">${marks(m)}<a class="tp-brow__title" href="#">${t}</a><span class="tp-caption">${who} / ${T(date)}</span><div class="tp-brow__foot"><span class="tp-book__price">${p}</span><div class="tp-row">${iconBtn('heart', t + ' 찜하기', { variant: 'neutralWeak' })}${audio ? btn('MP3', { ic: 'list-music' }) : ''}${btn('학습 자료', { ic: 'folder-open' })}${btn('교재 보기', { variant: 'neutralSolid' })}</div></div></div></article>`; };
  const body = app(0, `
${head('토익 교재')}
<main class="tp-content">
  ${chiptabs(['전체 61', '단어장 3', '입문 10', '중급 9', '고급 6', '기출 문제집 12', '실전 문제집 12'], 0, '교재 단계')}
  <div class="tp-bl">
    <form class="tp-bl__filter" aria-label="필터">
      ${group('bl-aid', '학습 지원', [['MP3 듣기', 27, true], ['MP3 내려받기', 45], ['무료 강의', 23], ['단어장', 21]])}
      ${group('bl-score', '목표 점수', [['550점 이하', 9], ['600 ~ 750점', 30], ['800 ~ 950점', 31]])}
      ${group('bl-part', '영역', [['듣기', 16], ['읽기', 19], ['듣기 + 읽기', 15]])}
      ${btn('조건 지우기', { variant: 'ghost', ic: 'rotate-ccw' })}
    </form>
    <section aria-label="교재 목록">
      <div class="tp-between"><span class="tp-sub">교재 ${T('27')}개</span><div class="tp-row"><span class="tp-bl__open">${btn('필터', { ic: 'sliders-horizontal', size: 'medium' })}</span>${select('최신순', { aria: '정렬' })}</div></div>
      <div>${rows.map(row).join('')}</div>
      <div class="tp-tfoot">${pagination(1, 5)}</div>
    </section>
  </div>
</main>`);
  return { slug: 'book-list', en: 'Book List', name: '교재 목록', group: 'Books', desc: '단계와 학습 지원 조건으로 교재를 고르는 목록 화면입니다. 교재마다 음원과 학습 자료로 바로 갑니다.', css, body };
};

/* 3. 교재 음원 ------------------------------------------------------- */
const audio = () => {
  const css = CSS + `
  .tp-ba { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x8); align-items: start; padding-bottom: var(--ds-space-x20); }
  @media (min-width: 1024px) { .tp-ba { grid-template-columns: minmax(0, 1fr) 340px; gap: var(--ds-space-x10); } }
  .tp-ba__head { display: grid; grid-template-columns: 72px minmax(0, 1fr); gap: var(--ds-space-x4); align-items: center; }
  .tp-ba__head .tp-row { flex-wrap: wrap; }
  .tp-trk { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: var(--ds-space-x3); align-items: center; padding: var(--ds-space-x2) var(--ds-space-x2); border-radius: var(--ds-shape-md); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-trk[aria-current] { background: var(--ds-color-bg-neutral-weak-alpha); font-weight: var(--ds-font-weight-semibold); }
  .tp-trk > span:nth-child(2) { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tp-chap { padding: var(--ds-space-x4) var(--ds-space-x2) var(--ds-space-x1); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); font-weight: var(--ds-font-weight-semibold); }
  .tp-file-row { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  /* 아래 고정 재생 막대 */
  .tp-pbar { position: fixed; inset: auto 0 0; z-index: var(--ds-z-sticky); display: flex; align-items: center; gap: var(--ds-space-x3); padding: var(--ds-space-x3) var(--tp-gutter); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-pbar__now { display: none; flex-direction: column; flex: none; width: 200px; min-width: 0; }
  .tp-pbar__now b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-weight: var(--ds-font-weight-semibold); }
  .tp-pbar .ds-progress { flex: 1 1 auto; min-width: 48px; }
  .tp-pbar time { flex: none; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); font-variant-numeric: tabular-nums; white-space: nowrap; }
  @media (min-width: 768px) { .tp-pbar__now { display: flex; } }
`;
  const trk = (t, len, cur = false) => `<div class="tp-trk"${cur ? ' aria-current="true"' : ''}>${iconBtn(cur ? 'pause-solid' : 'play', t + (cur ? ' 멈춤' : ' 듣기'), { variant: cur ? 'neutralSolid' : 'neutralWeak', size: 'xsmall' })}<span>${t}</span><span class="tp-row"><span class="tp-caption">${T(len)}</span>${iconBtn('download', t + ' 내려받기', { size: 'xsmall' })}</span></div>`;
  const file = (t, size) => `<div class="tp-file-row"><span class="tp-row" style="gap: var(--ds-space-x3)">${icon('file-text')}<span>${t}</span></span><span class="tp-row"><span class="tp-caption">${T(size)}</span>${iconBtn('download', t + ' 내려받기', { size: 'xsmall' })}</span></div>`;
  const tests = [['Test 1', [['Part 1 사진 묘사', '03:12'], ['Part 2 질의응답', '08:40', true], ['Part 3 짧은 대화', '17:25'], ['Part 4 설명문', '15:08']]], ['Test 2', [['Part 1 사진 묘사', '03:05'], ['Part 2 질의응답', '08:52'], ['Part 3 짧은 대화', '17:10'], ['Part 4 설명문', '15:21']]]];
  const body = app(0, `
<main class="tp-content">
  <div class="tp-ba">
    <div class="tp-stack" style="gap: var(--ds-space-x5)">
      <header class="tp-ba__head">${thumb('1:1', 'tp-cover', photo('book', 1, 240), 'md')}<div class="tp-stack" style="gap: var(--ds-space-x2)"><h1 class="tp-h1">토익 기출 문제집 1000 듣기</h1><div class="tp-row">${btn('전체 내려받기', { ic: 'download' })}${btn('교재 보기')}</div></div></header>
      ${tabs(['문제 음원 40', '단어장 음원 20'], 0, '음원 종류', { layout: 'hug', inset: 'none' })}
      <div>${tests.map(([t, ls]) => `<div class="tp-chap">${t}</div>${ls.map(([a, b, c]) => trk(a, b, c)).join('')}`).join('')}</div>
    </div>
    <aside class="tp-stack" style="gap: var(--ds-space-x3)" aria-labelledby="ba-files"><h2 class="tp-h3" id="ba-files">학습 자료</h2>${card(`<div class="tp-rows">${file('정답표', '0.2MB')}${file('듣기 대본과 번역', '3.8MB')}${file('단어장', '1.1MB')}${file('연습용 답안지', '0.3MB')}</div>`)}</aside>
  </div>
</main>
<div class="tp-pbar" role="group" aria-label="재생">
  ${iconBtn('chevrons-left', '이전 음원')}${iconBtn('pause-solid', '멈춤', { variant: 'neutralSolid', size: 'medium' })}${iconBtn('chevrons-right', '다음 음원')}
  <div class="tp-pbar__now"><b>Part 2 질의응답</b><span class="tp-caption">Test 1</span></div>
  ${progress(36, { tone: 'neutral', label: '재생 위치' })}<time>03:08 / 08:40</time>
  ${btn('1.0x', { variant: 'ghost', aria: '재생 속도 1.0배' })}
</div>`);
  return { slug: 'book-audio', en: 'Book Audio', name: '교재 음원', group: 'Books', desc: '교재에 딸린 음원을 바로 듣거나 내려받는 화면입니다. 재생 막대는 아래에 고정하고 학습 자료는 옆에 모아 둡니다.', css, body };
};

/* 4. 교재 로드맵 ----------------------------------------------------- */
const roadmap = () => {
  const css = CSS + `
  .tp-road { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
  .tp-road > li { position: relative; display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: var(--ds-space-x4); padding-bottom: var(--ds-space-x10); }
  .tp-road > li:last-child { padding-bottom: 0; }
  .tp-road > li::before { content: ""; position: absolute; top: 40px; bottom: 0; left: 19px; width: 2px; background: var(--ds-color-stroke-neutral-muted); }
  .tp-road > li:last-child::before { display: none; }
  .tp-road__no { display: grid; place-items: center; width: 40px; height: 40px; border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-on-neutral-solid); font-size: var(--ds-font-size-t05); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; }
  .tp-road__body { display: flex; flex-direction: column; gap: var(--ds-space-x4); min-width: 0; }
  .tp-road__head { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x2); min-height: 40px; }
  .tp-road .tp-books { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 768px) { .tp-road .tp-books { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  @media (min-width: 1280px) { .tp-road .tp-books { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
`;
  const steps = [['단어 익히기', '2주', [2]], ['기본기 다지기', '4주', [4, 3]], ['영역별 보완', '3주', [1, 0]], ['실전 연습', '3주', [5, 0, 1]]];
  const body = app(5, `
${head('토익 교재 로드맵')}
<main class="tp-content">
  ${chiptabs(['처음 시작', '600점 목표', '750점 목표', '900점 목표'], 2, '목표 점수')}
  <ol class="tp-road">${steps.map(([t, w, bs], n) => `<li><span class="tp-road__no" aria-hidden="true">${n + 1}</span><div class="tp-road__body"><div class="tp-road__head"><h2 class="tp-h3">${n + 1}단계 ${t}</h2>${badge(w)}</div><div class="tp-books">${bs.map((i) => book(i, { price: false })).join('')}</div></div></li>`).join('')}</ol>
</main>`);
  return { slug: 'book-roadmap', en: 'Book Roadmap', name: '교재 로드맵', group: 'Books', desc: '목표에 맞춰 어떤 교재를 어떤 순서로 볼지 단계별로 보여 주는 화면입니다. 처음 온 사람이 교재를 고르기 쉽게 합니다.', css, body };
};

export const templates = [home, list, audio, roadmap].map((f) => f());
