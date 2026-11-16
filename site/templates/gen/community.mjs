import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar } from './frame.mjs';
const { icon, btn, iconBtn, badge, card, secHead, field, input, select, chip, chiptabs, segmented, avatar, avatars, callout, link, thumb, pagination, search, sw, meter, esc } = K;

const MENU = ['홈', '게시판', '인기글', '스터디'];
const END = `${iconBtn('search', '찾기', { size: 'xsmall' })}${iconBtn('bell', '알림', { size: 'xsmall' })}${avatar('새벽공부', 24)}`;
const BOARDS = [['전체글', 'list'], ['인기글', 'star-solid'], ['공지사항', 'bell'], ['자유게시판', 'message-circle'], ['질문과 답변', 'info'], ['정보 나눔', 'bookmark'], ['후기', 'thumbs-up'], ['스터디 모집', 'users']];

const CSS = FRAME_CSS + `
  .tp-cm { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); box-sizing: border-box; width: min(100%, var(--tp-page-box)); margin-inline: auto; padding: var(--ds-space-x5) var(--ds-space-x4) var(--ds-space-x12); padding-inline: var(--tp-gutter); }
  .tp-cm__main { display: flex; flex-direction: column; gap: var(--ds-space-x6); min-width: 0; }
  .tp-cm__nav, .tp-cm__aside { display: none; }
  .tp-cm__chips { overflow-x: auto; scrollbar-width: none; }
  @media (min-width: 768px) { .tp-cm { padding: var(--ds-space-x8) var(--ds-space-x6) var(--ds-space-x16); } }
  @media (min-width: 1280px) {
    .tp-cm:not(.tp-cm--one) { grid-template-columns: 220px minmax(0, 1fr); gap: var(--ds-space-x8); }
    .tp-cm__nav { display: flex; flex-direction: column; gap: var(--ds-space-x4); position: sticky; top: calc(var(--ds-space-x16) + var(--ds-space-x4)); align-self: start; max-height: calc(100vh - var(--ds-space-x16) - var(--ds-space-x8)); overflow-y: auto; scrollbar-width: none; }
    .tp-cm__chips { display: none; }
  }
  @media (min-width: 1280px) {
    .tp-cm.tp-cm--aside:not(.tp-cm--one) { grid-template-columns: 220px minmax(0, 1fr) 300px; }
    .tp-cm__aside { display: flex; flex-direction: column; gap: var(--ds-space-x6); position: sticky; top: calc(var(--ds-space-x16) + var(--ds-space-x4)); align-self: start; max-height: calc(100vh - var(--ds-space-x16) - var(--ds-space-x8)); overflow-y: auto; scrollbar-width: none; }
  }
  .tp-cm__nav .ds-sidenav { width: auto; height: auto; background: none; }
  .tp-cm__nav .ds-sidenav__content { padding: 0; }
  .tp-me { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-feed { display: flex; flex-direction: column; }
  .tp-feed > * { padding-block: var(--ds-space-x5); }
  .tp-feed > * + * { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-post { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); color: inherit; text-decoration: none; }
  .tp-post--thumb { grid-template-columns: minmax(0, 1fr) 88px; }
  @media (min-width: 768px) { .tp-post--thumb { grid-template-columns: minmax(0, 1fr) 120px; } }
  .tp-post__body { display: flex; flex-direction: column; gap: var(--ds-space-x2); min-width: 0; }
  .tp-clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .tp-who { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x1) var(--ds-space-x2); min-width: 0; }
  .tp-meta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x1) var(--ds-space-x3); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); color: var(--ds-color-fg-neutral-muted); font-variant-numeric: tabular-nums; }
  .tp-meta > span { display: inline-flex; align-items: center; gap: var(--ds-space-x1); }
  .tp-meta .ds-icon { --ds-icon-size: 14px; }
  .tp-rank { display: flex; flex-direction: column; gap: var(--ds-space-x3); margin: 0; padding: 0; list-style: none; counter-reset: rank; }
  .tp-rank > li { display: grid; grid-template-columns: var(--ds-space-x5) minmax(0, 1fr); gap: var(--ds-space-x2); align-items: start; counter-increment: rank; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-rank > li::before { content: counter(rank); font-weight: var(--ds-font-weight-semibold); font-variant-numeric: tabular-nums; color: var(--ds-color-fg-neutral); }
  .tp-rank a { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x2); color: inherit; text-decoration: none; }
  .tp-trend { margin: 0; padding: 0; list-style: none; }
  .tp-trend > li + li { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-trend a { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ds-space-x3); align-items: center; min-height: var(--ds-space-x16); padding-block: var(--ds-space-x3); color: inherit; text-decoration: none; }
  .tp-trend[data-ranked] a { grid-template-columns: var(--ds-space-x6) minmax(0, 1fr) auto; }
  .tp-trend__no { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; text-align: center; }
  .tp-trend__line { display: flex; align-items: center; gap: var(--ds-space-x2); min-width: 0; }
  .tp-trend__t { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tp-trend__thumb { width: var(--ds-space-x16); }
  .tp-brank { display: flex; flex-direction: column; gap: var(--ds-space-x2); margin: 0; padding: 0; list-style: none; }
  .tp-brank a { display: flex; align-items: center; gap: var(--ds-space-x2); padding: var(--ds-space-x3); border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-neutral); color: inherit; text-decoration: none; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-weight: var(--ds-font-weight-medium); }
  .tp-brank b { width: var(--ds-space-x4); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; text-align: center; }
  .tp-brank .ds-icon { --ds-icon-size: 16px; flex: none; }
  .tp-brank [data-move="up"] { color: var(--ds-color-fg-critical); }
  .tp-brank [data-move="down"] { color: var(--ds-color-fg-informative); }
  .tp-brank [data-move="same"] { color: var(--ds-color-fg-neutral-subtle); }
`;

const boardNav = (cur) => `<nav class="ds-sidenav" aria-label="게시판"><div class="ds-sidenav__content"><div class="ds-sidenav__group"><div class="ds-sidenav__group-label">게시판</div>${BOARDS.map(([t, ic], i) => `<a class="ds-sidenav__item" href="#"${i === cur ? ' aria-current="page"' : ''}><span class="ds-sidenav__prefix">${icon(ic)}</span><span class="ds-sidenav__label">${t}</span></a>`).join('')}</div></div></nav>`;
const me = () => card(`<div class="tp-me"><div class="tp-row">${avatar('새벽공부', 40)}<div class="tp-stack"><span class="tp-h4">새벽공부</span><span class="tp-caption">글 ${T('12')} / 댓글 ${T('48')}</span></div></div>${btn('글쓰기', { variant: 'brandSolid', ic: 'pencil', fill: true })}</div>`);
const leftNav = (cur) => `<aside class="tp-cm__nav" aria-label="내 정보와 게시판">${me()}${boardNav(cur)}</aside>`;
const mobileBoards = (cur) => `<div class="tp-cm__chips">${chiptabs(BOARDS.map(([t]) => t), cur, '게시판')}</div>`;
const who = (name, time, { lv = '', extra = '' } = {}) => `<div class="tp-who">${avatar(name, 24)}<span class="tp-label">${name}</span>${lv ? badge(lv) : ''}<span class="tp-caption">${time}</span>${extra}</div>`;
const meta = (like, cmt, view) => `<div class="tp-meta"><span>${icon('thumbs-up')}${like}</span><span>${icon('message-circle')}${cmt}</span><span>${icon('eye')}${view}</span></div>`;
const rank = (items) => `<ol class="tp-rank">${items.map(([t, c]) => `<li><a href="#"><span class="tp-label tp-clamp">${t}</span>${badge(c)}</a></li>`).join('')}</ol>`;
const trend = (rows, ranked = false) => `<ol class="tp-trend"${ranked ? ' data-ranked' : ''}>${rows.map(([t, c, infos, ph], i) => `<li><a href="#">${ranked ? `<span class="tp-trend__no">${i + 1}</span>` : ''}<div class="tp-stack" style="gap: var(--ds-space-x1)"><div class="tp-trend__line"><span class="tp-item-title tp-trend__t">${t}</span>${c ? badge(c) : ''}</div><div class="tp-meta">${infos.map((x) => `<span>${x}</span>`).join('')}</div></div>${ph >= 0 ? `<div class="tp-trend__thumb">${thumb('1:1', '', K.photo('mix', ph, 160), 'md')}</div>` : '<span></span>'}</a></li>`).join('')}</ol>`;
const MOVES = [['same', 'minus'], ['up', 'chevron-up'], ['up', 'chevron-up'], ['down', 'chevron-down'], ['up', 'chevron-up']];
const boardRank = () => `<ol class="tp-brank">${BOARDS.slice(3).concat(BOARDS.slice(1, 3)).slice(0, 5).map(([n, ic], i) => `<li><a href="#"><b>${i + 1}</b><span data-move="${MOVES[i][0]}">${icon(MOVES[i][1])}</span>${icon(ic)}${n}</a></li>`).join('')}</ol>`;
const HOT = [['처음 본 토익, 생각보다 시간이 부족했어요', 42], ['LC 파트 2 듣기 요령 알려 주세요', 31], ['이번 주말 시험 전날 뭐 하세요?', 28], ['단어 외우는 앱 추천해 주세요', 19], ['스터디 3월 교재 투표 결과', 16]];

const home = () => {
  const posts = [
    ['정보 나눔', '토익 RC 파트 5 자주 나오는 문법 정리', '시험마다 나오는 품사, 시제, 접속사 문제만 골랐어요. 문제마다 교재 해설 쪽수도 같이 적었어요.', '토익900목표', '20분 전', '128', '24', '1,920', 0],
    ['질문과 답변', '토익 스피킹 처음인데 교재부터 사야 할까요?', '인강만 들어 봤는데 혼자 말하기 연습을 해 보고 싶어요. 시험까지 한 달 남았어요.', '스피킹연습', '1시간 전', '36', '18', '842', -1],
    ['후기', '첫 토익 650점, 준비하며 챙긴 것들', '처음 시험 볼 때 챙긴 것이 너무 많았는데 세 번 보고 나서 줄인 목록이에요.', '첫토익', '3시간 전', '87', '12', '1,204', 1],
    ['자유게시판', '출근 전 30분 영어 듣기, 한 달 해 본 이야기', '처음엔 졸렸는데 지금은 안 들으면 허전해요. 같이 들을 분 계세요?', '출근전영어', '5시간 전', '54', '9', '611', -1],
    ['스터디 모집', '토요일 아침 토익 스터디 2명 더 모여요', '한 주에 모의고사 한 회를 강의실에서 함께 풀고 오답을 나눠요. 이번 달 교재는 투표로 정해요.', '책읽는밤', '어제', '22', '7', '388', 2],
  ];
  const HOT_ROWS = [['인강 들으며 정리한 노트, 사진 남겨요', 42, ['자유게시판', '조회 2.1만'], 1], ['종로, 강남, 신촌 고사장 세 곳 다녀온 비교 후기', 31, ['후기', '조회 1.9만'], 4], ['파트별 듣기 연습 순서 표로 정리했어요', 28, ['정보 나눔', '조회 1.6만'], 6], ['봄맞이 영어 말하기 대회 수상작 모음', 16, ['공지사항', '조회 4,480'], 2], ['이번 달 풀 모의고사 같이 골라요', 9, ['스터디 모집', '조회 2,086'], -1]];
  const css = CSS;
  const body = `<div class="tp-app">${topbar(MENU, 0, END)}
<div class="tp-cm tp-cm--aside">
  ${leftNav(0)}
  <main class="tp-cm__main">
    ${mobileBoards(0)}
    <section class="tp-sec">${secHead('지금 뜨는 글', { tools: link('더 보기') })}
      ${chiptabs(['종합', '잡담', '질문', '정보', '후기'], 0, '분류')}
      ${trend(HOT_ROWS, true)}
    </section>
    <section class="tp-sec">${secHead('새 글', { tools: segmented(['추천순', '최신순'], 1, '정렬') })}
      ${trend(posts.map(([b, t, , , time, , cmt, view, ph]) => [t, cmt, [b, time, '조회 ' + view], ph]))}
      ${btn('글 더 보기', { fill: true, icEnd: 'chevron-down' })}
    </section>
  </main>
  <aside class="tp-cm__aside" aria-label="인기글과 소식">
    ${card(`<div class="tp-stack" style="gap: var(--ds-space-x4)"><span class="tp-h3">실시간 인기글</span>${rank(HOT)}</div>`)}
    ${card(`<div class="tp-stack" style="gap: var(--ds-space-x4)"><span class="tp-h3">인기 게시판</span>${boardRank()}</div>`)}
    
  </aside>
</div></div>`;
  return { slug: 'community-home', h1: '커뮤니티', en: 'Community Home', name: '커뮤니티 홈', group: 'Community', desc: '게시판형 커뮤니티의 첫 화면입니다. 지금 뜨는 글과 새 글을 한곳에서 봅니다.', css, body };
};

const board = () => {
  const css = CSS + `
  .tp-bhead { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ds-space-x3) var(--ds-space-x4); }
  .tp-btools { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-btools .ds-input { width: min(100%, 240px); }
  .tp-board { margin: 0; padding: 0; list-style: none; box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-solid); }
  .tp-board > li { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x1) var(--ds-space-x2); padding: var(--ds-space-x3) var(--ds-space-x2); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); color: var(--ds-color-fg-neutral-muted); font-variant-numeric: tabular-nums; }
  .tp-board > li[data-pinned] { background: var(--ds-color-bg-neutral-weak-alpha); }
  .tp-board > li.tp-board__head { display: none; }
  .tp-board .c-no { display: none; }
  .tp-board .c-title { order: -1; flex: 1 1 100%; display: flex; align-items: center; gap: var(--ds-space-x1_5); min-width: 0; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-medium); color: var(--ds-color-fg-neutral); }
  .tp-board .c-title a { overflow: hidden; color: inherit; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; }
  .tp-board .c-title .ds-icon { flex: none; --ds-icon-size: 14px; color: var(--ds-color-fg-neutral-subtle); }
  .tp-board [data-pinned] .c-title { font-weight: var(--ds-font-weight-semibold); }
  .tp-board .tp-m { display: inline; }
  @media (min-width: 768px) {
    .tp-board > li { display: grid; grid-template-columns: 64px 80px minmax(0, 1fr) 104px 72px 56px 56px; gap: var(--ds-space-x2); padding: 0 var(--ds-space-x2); min-height: 48px; }
    .tp-board > li.tp-board__head { display: grid; min-height: 44px; color: var(--ds-color-fg-neutral-muted); font-weight: var(--ds-font-weight-medium); }
    .tp-board .c-no { display: block; }
    .tp-board .c-title { order: 0; flex: none; }
    .tp-board :is(.c-no, .c-view, .c-like, .c-date) { text-align: center; }
    .tp-board .c-author { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--ds-color-fg-neutral-muted); }
    .tp-board .tp-m { display: none; }
  }
  .tp-bfoot { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x4); }
  @media (min-width: 768px) { .tp-bfoot { position: relative; } .tp-bfoot > .ds-btn { position: absolute; right: 0; top: 0; } }
`;
  const pins = [['공지', '커뮤니티 이용 규칙 안내 (3월 바뀐 내용)', '운영자', '03.02', '4,812', '36', 0], ['공지', '봄맞이 영어 말하기 대회, 3월 31일까지 받아요', '운영자', '03.05', '2,930', '58', 12]];
  const rows = [[2418, '잡담', '출근 전 30분 영어 듣기, 한 달 해 본 이야기', '출근전영어', '14:52', '611', '54', 9, true, true], [2417, '질문', '토익 스피킹 처음인데 교재부터 사야 할까요?', '스피킹연습', '14:20', '842', '36', 18, false, true], [2416, '정보', '토익 RC 파트 5 자주 나오는 문법 정리', '토익900목표', '13:47', '1,920', '128', 24, true, false], [2415, '잡담', '이번 주말 시험 전날 뭐 하세요?', '새벽공부', '13:05', '402', '12', 28, false, false], [2414, '후기', '첫 토익 650점, 준비하며 챙긴 것들', '첫토익', '11:38', '1,204', '87', 12, true, false], [2413, '질문', '단어 외우는 앱, 하루에 몇 개가 적당할까요?', '출근전영어', '10:12', '377', '8', 19, true, false], [2412, '잡담', '오늘 모의고사 몇 점 나오셨어요?', '단어장', '09:40', '215', '3', 41, false, false], [2411, '정보', '도서관에서 토익 교재 무료로 빌리는 법', '책읽는밤', '어제', '1,508', '96', 15, false, false], [2410, '후기', '처음 본 토익, 생각보다 시간이 부족했어요', '토익900목표', '어제', '2,102', '142', 42, true, false], [2409, '잡담', '예전에 쓰던 단어장을 찾았어요', '새벽공부', '어제', '388', '21', 6, true, false]];
  const head = `<li class="tp-board__head" aria-hidden="true"><span class="c-no">번호</span><span>말머리</span><span class="c-title" style="justify-content:center;color:inherit">제목</span><span>글쓴이</span><span class="c-date">작성일</span><span class="c-view">조회</span><span class="c-like">좋아요</span></li>`;
  const pin = ([b, t, n, d, v, l, c]) => `<li data-pinned><span class="c-no">${badge('공지', 'critical')}</span><span class="c-cat">${b}</span><span class="c-title"><a href="#">${t}</a>${c ? badge(c) : ''}</span><span class="c-author">${n}</span><span class="c-date">${d}</span><span class="c-view"><span class="tp-m">조회 </span>${v}</span><span class="c-like"><span class="tp-m">좋아요 </span>${l}</span></li>`;
  const row = ([no, b, t, n, d, v, l, c, ph, isNew]) => `<li><span class="c-no">${no}</span><span class="c-cat">${b}</span><span class="c-title"><a href="#">${t}</a>${ph ? icon('image') : ''}${c ? badge(c) : ''}${isNew ? badge('새 글', 'brand') : ''}</span><span class="c-author">${n}</span><span class="c-date">${d}</span><span class="c-view"><span class="tp-m">조회 </span>${v}</span><span class="c-like"><span class="tp-m">좋아요 </span>${l}</span></li>`;
  const body = `<div class="tp-app">${topbar(MENU, 1, END)}
<div class="tp-cm">
  ${leftNav(3)}
  <main class="tp-cm__main">
    ${mobileBoards(3)}
    <header class="tp-bhead"><h1 class="tp-h1">자유게시판</h1>${btn('글쓰기', { variant: 'brandSolid', ic: 'pencil' })}</header>
    <div class="tp-stack" style="gap: var(--ds-space-x3)">
      ${chiptabs(['전체', '잡담', '질문', '정보', '후기'], 0, '말머리')}
      <div class="tp-btools"><span class="tp-sub">글 ${T('2,418')}개</span><div class="tp-row">${K.even(select('최신순', { id: 'bd-sort', aria: '정렬' }) + search('bd-q', '게시판 안에서 찾기'))}</div></div>
    </div>
    <ul class="tp-board" aria-label="글 목록">${head}${pins.map(pin).join('')}${rows.map(row).join('')}</ul>
    <div class="tp-bfoot">${pagination(1, 242)}${btn('글쓰기', { variant: 'brandSolid', ic: 'pencil' })}</div>
  </main>
</div></div>`;
  return { slug: 'community-board', en: 'Board List', name: '게시글 목록', group: 'Community', desc: '카페형 게시판의 글 목록입니다. 말머리로 필터링하고 공지는 위에 고정합니다.', css, body };
};

const post = () => {
  const css = CSS + `
  .tp-article { display: flex; flex-direction: column; gap: var(--ds-space-x5); }
  .tp-article__text { display: flex; flex-direction: column; gap: var(--ds-space-x4); font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); }
  .tp-article__text p { margin: 0; }
  .tp-acts { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x2); padding-block: var(--ds-space-x4); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted), inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-acts__end { margin-inline-start: auto; display: flex; gap: var(--ds-space-x1); }
  .tp-cform { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-cform .ds-textarea { --ds-textarea-min-height: 88px; }
  .tp-cmts { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
  .tp-cmts > li { padding-block: var(--ds-space-x4); }
  .tp-cmts > li + li { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-cmt { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-cmt p { margin: 0; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-cmt__acts { display: flex; gap: var(--ds-space-x1); margin-inline-start: calc(-1 * var(--ds-space-x2)); }
  .tp-replies { display: flex; flex-direction: column; gap: var(--ds-space-x4); margin: var(--ds-space-x4) 0 0; padding: 0 0 0 var(--ds-space-x8); list-style: none; }
  .tp-replies > li { position: relative; }
  .tp-replies > li > .ds-icon { position: absolute; left: calc(-1 * var(--ds-space-x6)); top: 2px; --ds-icon-size: 16px; color: var(--ds-color-fg-neutral-subtle); }
  .tp-adj { display: flex; flex-direction: column; }
  .tp-adj > a { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: var(--ds-space-x3); padding: var(--ds-space-x3) var(--ds-space-x1); color: inherit; text-decoration: none; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-adj > a + a { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-adj > a > span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;
  const cmt = (n, time, text, like, { mine = false, replies = [] } = {}) => `<li><div class="tp-cmt"><div class="tp-between">${who(n, time, { extra: mine ? badge('글쓴이', 'brand') : '' })}${iconBtn('ellipsis', '댓글 더 보기', { size: 'xsmall' })}</div><p>${text}</p><div class="tp-cmt__acts">${btn(`좋아요 ${like}`, { variant: 'ghost', size: 'xsmall', ic: 'thumbs-up' })}${btn('답글', { variant: 'ghost', size: 'xsmall' })}</div></div>${replies.length ? `<ul class="tp-replies">${replies.map(([rn, rt, rx, rl, rm]) => `<li>${icon('corner-down-right')}<div class="tp-cmt"><div class="tp-between">${who(rn, rt, { extra: rm ? badge('글쓴이', 'brand') : '' })}${iconBtn('ellipsis', '답글 더 보기', { size: 'xsmall' })}</div><p>${rx}</p><div class="tp-cmt__acts">${btn(`좋아요 ${rl}`, { variant: 'ghost', size: 'xsmall', ic: 'thumbs-up' })}</div></div></li>`).join('')}</ul>` : ''}</li>`;
  const body = `<div class="tp-app">${topbar(MENU, 1, END)}
<div class="tp-cm tp-cm--aside">
  ${leftNav(4)}
  <main class="tp-cm__main">
    <article class="tp-article">
      ${K.breadcrumbs(['커뮤니티', '질문과 답변'])}
      <div class="tp-stack" style="gap: var(--ds-space-x3)">${badge('질문')}<h1 class="tp-h1">토익 스피킹 처음인데 교재부터 사야 할까요?</h1>
        <div class="tp-between">${who('스피킹연습', '1시간 전', { lv: '새싹 멤버' })}<div class="tp-row"><span class="tp-meta"><span>조회 ${T('842')}</span></span>${iconBtn('ellipsis-vertical', '글 더 보기', { size: 'xsmall' })}</div></div>
      </div>
      <div class="tp-article__text">
        <p>지금까지는 인강만 들어 봤는데, 혼자 말하기 연습을 해 보고 싶어졌어요. 시험까지 한 달 남았어요.</p>
        <p>교재를 먼저 사서 혼자 연습할지, 아니면 인강으로 문제 유형부터 익힐지 고민이에요. 처음 시작할 때 어떻게 하셨는지 궁금해요.</p>
        ${thumb('16:9', '', K.photo('book', 0, 960), 'lg')}
      </div>
      ${card(`<div class="tp-between"><span class="tp-h4">투표</span><span class="tp-caption">${T('36')}명 참여</span></div>${meter('교재부터 사서 혼자 연습', 58, '58%')}${meter('인강으로 유형부터 익히기', 31, '31%')}${meter('말하기 스터디부터 찾기', 11, '11%')}`)}
      <div class="tp-acts">${btn('좋아요 36', { variant: 'neutralOutline', ic: 'thumbs-up' })}${btn('스크랩', { variant: 'neutralOutline', ic: 'bookmark' })}<div class="tp-acts__end">${iconBtn('share', '공유하기')}${iconBtn('flag', '신고하기')}</div></div>
    </article>
    <section class="tp-sec" aria-labelledby="c-title">${secHead(`댓글 ${T('18')}`, { id: 'c-title', cls: 'tp-h3', tools: segmented(['등록순', '최신순'], 0, '댓글 정렬') })}
      <div class="tp-cform"><textarea class="ds-textarea" id="c-new" placeholder="따뜻한 댓글을 남겨 주세요" aria-label="댓글 쓰기"></textarea><div class="tp-between"><span class="tp-caption">${T('0')} / 500</span>${btn('등록', { variant: 'neutralSolid' })}</div></div>
      <ul class="tp-cmts">
        ${cmt('토익900목표', '50분 전', '교재 한 권을 정해서 유형별 답변 틀을 먼저 외우는 게 제일 빨랐어요.', 12, { replies: [['스피킹연습', '40분 전', '유형별 틀부터군요. 그럼 교재부터 살게요!', 3, true]] })}
        ${cmt('새벽공부', '35분 전', '저는 녹음하면서 연습했어요. 다시 들어 보면 고칠 곳이 바로 보여요.', 8)}
        ${cmt('책읽는밤', '12분 전', '시험 일주일 전에는 실전 모의고사를 꼭 한 번 풀어 보세요.', 5)}
      </ul>
      ${btn('댓글 더 보기', { fill: true, icEnd: 'chevron-down' })}
    </section>
    <nav class="tp-adj" aria-label="이전, 다음 글"><a href="#"><span class="tp-caption">이전 글</span><span>단어 외우는 앱, 하루에 몇 개가 적당할까요?</span></a><a href="#"><span class="tp-caption">다음 글</span><span>도서관에서 토익 교재 무료로 빌리는 법</span></a></nav>
  </main>
  <aside class="tp-cm__aside" aria-label="이 게시판 인기글">
    ${card(`<div class="tp-stack" style="gap: var(--ds-space-x4)"><span class="tp-h3">이 게시판 인기글</span>${rank(HOT)}</div>`)}
    ${card(`<div class="tp-stack" style="gap: var(--ds-space-x3)"><div class="tp-row">${avatar('스피킹연습', 40)}<div class="tp-stack"><span class="tp-h4">스피킹연습</span><span class="tp-caption">글 ${T('8')} / 댓글 ${T('31')}</span></div></div>${btn('다른 글 보기', { fill: true })}</div>`)}
  </aside>
</div></div>`;
  return { slug: 'community-post', en: 'Post Detail', name: '게시글 상세', group: 'Community', desc: '게시글 하나를 읽고 댓글로 이야기를 나누는 화면입니다.', css, body };
};

const write = () => {
  const css = CSS + `
  .tp-wtop { position: sticky; top: 0; z-index: var(--ds-z-sticky); box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; width: min(100%, var(--tp-narrow-box)); margin-inline: auto; padding: var(--ds-space-x3) var(--tp-gutter); background: var(--ds-color-bg-layer-default); }
  .tp-wform { box-sizing: border-box; display: flex; flex-direction: column; gap: var(--ds-space-x4); width: min(100%, var(--tp-narrow-box)); margin-inline: auto; padding: var(--ds-space-x2) var(--tp-gutter) var(--ds-space-x12); }
  .tp-wtitle { display: block; box-sizing: border-box; width: 100%; padding: var(--ds-space-x2) 0 var(--ds-space-x4); border: 0; outline: 0; background: none; box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); color: var(--ds-color-fg-neutral); font: inherit; font-size: var(--ds-font-size-t09); line-height: var(--ds-line-height-t09); font-weight: var(--ds-font-weight-bold); }
  .tp-wtitle::placeholder { color: var(--ds-color-fg-placeholder); }
  .tp-wtitle:focus-visible { box-shadow: inset 0 -2px 0 var(--ds-color-stroke-neutral-contrast); }
  .tp-wform .ds-textarea { --ds-textarea-line-width: 0px; --ds-textarea-min-height: 400px; padding-inline: 0; background: none; }
`;
  const body = `<div class="tp-app">
<header class="tp-wtop">${iconBtn('arrow-left', '뒤로', { size: 'medium' })}${btn('등록', { variant: 'brandSolid', size: 'medium' })}</header>
<main>
  <form class="tp-wform" onsubmit="return false">
    <h1 class="tp-sr">글쓰기</h1>
    <div class="tp-row">${select('자유게시판', { id: 'w-board', aria: '게시판' })}${select('잡담', { id: 'w-cat', aria: '말머리' })}</div>
    <input class="tp-wtitle" id="w-title" placeholder="제목" aria-label="제목" maxlength="60">
    <div class="tp-row" role="toolbar" aria-label="글 꾸미기">${iconBtn('image', '사진 넣기', { size: 'medium' })}${iconBtn('video', '영상 넣기', { size: 'medium' })}${iconBtn('list', '목록', { size: 'medium' })}</div>
    <textarea class="ds-textarea" id="w-body" placeholder="내용" aria-label="내용"></textarea>
  </form>
</main>
</div>`;
  return { slug: 'community-write', en: 'Write Post', name: '게시글 쓰기', group: 'Community', desc: '커뮤니티에 새 글을 작성하는 화면입니다. 게시판을 고른 뒤 제목과 본문을 씁니다.', css, body };
};

export const templates = [home(), board(), post(), write()];
