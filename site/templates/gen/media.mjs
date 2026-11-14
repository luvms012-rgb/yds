// 영상(OTT)과 온라인 클래스 템플릿: 영상 홈, 작품 상세, 영상 시청, 전체 화면 플레이어(콘텐츠 > 영상), 클래스 상세(학습 > 찾기와 신청), 내 강의실(학습 > 수강).
// 2026-11-14 사용자 "OTT 와 강의 보기 주요 화면 템플릿 추가". 국내외 OTT, 클래스 서비스 화면의 공통 구조만 따르고 서비스 이름, 작품, 글은 넣지 않는다.
// 화면 밝기는 사이트 설정을 따르고, 영상 칸만 늘 검정이다(YDS 다크 모드는 문서 전체에만 켜진다).
import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar, tags } from './frame.mjs';
const { icon, btn, iconBtn, badge, avatar, card, head, secHead, select, search, chiptabs, tabs, progress, thumb, photo, accordion, checks, link, divider, esc } = K;

const OTT_MENU = ['홈', '시리즈', '영화', '강의', '내가 찜한 콘텐츠'];
const ottEnd = `${iconBtn('search', '찾기', { size: 'xsmall' })}${iconBtn('bell', '알림', { size: 'xsmall' })}${avatar('와이비엠', 28)}`;
const CLASS_MENU = ['클래스', '커뮤니티', '내 강의실'];
const classEnd = `${iconBtn('search', '찾기', { size: 'xsmall' })}${iconBtn('heart', '찜한 클래스', { size: 'xsmall' })}${avatar('와이비엠', 28)}`;

const CSS = FRAME_CSS + `
  /* 영상 칸: 화면 모드와 상관없이 늘 검정 */
  .tp-video { position: relative; overflow: hidden; display: grid; place-items: center; aspect-ratio: 16 / 9; border-radius: var(--ds-shape-xl); background: var(--ds-color-palette-static-black); color: var(--ds-color-palette-static-white); }
  .tp-video > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .72; }
  .tp-video__play { position: relative; display: grid; place-items: center; width: 64px; height: 64px; border-radius: var(--ds-shape-pill); background: var(--ds-color-palette-static-white-alpha-300); }
  .tp-video__play .ds-icon { --ds-icon-size: 28px; }
  .tp-video__bar { position: absolute; inset: auto var(--ds-space-x4) var(--ds-space-x3); display: flex; align-items: center; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t03); font-variant-numeric: tabular-nums; }
  .tp-video__track { flex: 1 1 auto; height: 4px; border-radius: var(--ds-shape-pill); background: var(--ds-color-palette-static-white-alpha-300); overflow: hidden; }
  .tp-video__track > span { display: block; width: var(--v, 38%); height: 100%; background: var(--ds-color-palette-static-white); }
  /* 가로로 넘기는 작품 줄 (Carousel 항목 폭만 템플릿에서 정한다) */
  .tp-shelf .ds-carousel__item { flex: none; width: 72%; scroll-snap-align: start; }
  .tp-shelf[data-shape="poster"] .ds-carousel__item { width: 40%; }
  @media (min-width: 768px) { .tp-shelf .ds-carousel__item { width: calc((100% - 2 * var(--ds-carousel-gap)) / 3); } .tp-shelf[data-shape="poster"] .ds-carousel__item { width: calc((100% - 4 * var(--ds-carousel-gap)) / 5); } }
  @media (min-width: 1280px) { .tp-shelf .ds-carousel__item { width: calc((100% - 3 * var(--ds-carousel-gap)) / 4); } .tp-shelf[data-shape="poster"] .ds-carousel__item { width: calc((100% - 5 * var(--ds-carousel-gap)) / 6); } }
  .tp-shelf .ds-carousel { --ds-carousel-gap: var(--ds-space-x3); }
  .tp-shelf .ds-carousel__item > * { flex: 1 1 auto; min-width: 0; }  /* 사진을 불러오기 전에도 카드가 항목 폭을 채운다 */
  .tp-tile { display: flex; flex-direction: column; gap: var(--ds-space-x2); min-width: 0; color: inherit; text-decoration: none; }
  .tp-tile__title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-weight: var(--ds-font-weight-medium); }
  .tp-tile .ds-progress { margin-top: calc(var(--ds-space-x1) * -1); }
  .tp-rank { position: relative; }
  .tp-rank__no { position: absolute; left: var(--ds-space-x2); bottom: var(--ds-space-x1); color: var(--ds-color-palette-static-white); font-size: var(--ds-font-size-t11); line-height: 1; font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; text-shadow: 0 1px 4px var(--ds-color-palette-static-black-alpha-500); }
  .tp-meta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x1) var(--ds-space-x2); }
  .tp-article { display: flex; flex-direction: column; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); }
  .tp-article p { margin: 0; }
`;
const tile = (title, img, { sub = '', v = -1, ratio = '16:9' } = {}) => `<a class="tp-tile" href="#">${thumb(ratio, '', img, 'lg')}${v >= 0 ? progress(v, { label: title + ' 본 만큼' }) : ''}<span class="tp-stack"><span class="tp-tile__title">${title}</span>${sub ? `<span class="tp-caption">${sub}</span>` : ''}</span></a>`;
const shelf = (label, items, shape = '') => `<div class="tp-shelf"${shape ? ` data-shape="${shape}"` : ''}><div class="ds-carousel" role="region" aria-roledescription="carousel" aria-label="${esc(label)}"><div class="ds-carousel__scroller">${items.map((x) => `<div class="ds-carousel__item">${x}</div>`).join('')}</div><button type="button" class="ds-carousel__button" data-direction="previous" aria-label="이전">${icon('chevron-left', 'sm')}</button><button type="button" class="ds-carousel__button" data-direction="next" aria-label="다음">${icon('chevron-right', 'sm')}</button></div></div>`;
const video = (img, v = '38%', time = ['04:31', '12:08']) => `<div class="tp-video" role="img" aria-label="영상">${img ? `<img src="${img}" alt="">` : ''}<span class="tp-video__play">${icon('play-solid')}</span><div class="tp-video__bar"><span>${time[0]}</span><span class="tp-video__track" style="--v:${v}"><span></span></span><span>${time[1]}</span>${icon('maximize-2', 'sm')}</div></div>`;

/* 1. 영상 홈 --------------------------------------------------------- */
const home = () => {
  const css = CSS + `
  .tp-hero { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x5); align-items: center; }
  @media (min-width: 1024px) { .tp-hero { grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: var(--ds-space-x10); } }
  .tp-hero__title { margin: 0; font-size: var(--ds-font-size-t10); line-height: var(--ds-line-height-t10); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .tp-hero .tp-row { flex-wrap: wrap; }
`;
  const cont = [['바다 건너 일주일', 'mix', 3, 'S2 3화, 남은 18분', 64], ['처음 듣는 경제 이야기', 'study', 2, '5강, 남은 9분', 40], ['도시의 밤', 'city', 1, 'S1 7화, 남은 31분', 22], ['주방의 과학', 'food', 4, '2화, 남은 12분', 80], ['느리게 걷는 숲', 'nature', 2, '1화, 남은 40분', 10]];
  const top = [['도시의 밤', 'city', 0], ['바다 건너 일주일', 'mix', 5], ['주방의 과학', 'food', 2], ['느리게 걷는 숲', 'nature', 0], ['영어로 떠나는 여행', 'mix', 2], ['처음 듣는 경제 이야기', 'study', 0], ['서점 골목', 'book', 1], ['작은 공방', 'product', 2]];
  const docs = [['영어로 떠나는 여행', 'mix', 1, '다큐, 6화'], ['느리게 걷는 숲', 'nature', 3, '다큐, 4화'], ['서점 골목', 'book', 3, '다큐, 8화'], ['작은 공방', 'product', 1, '다큐, 5화'], ['도시를 그리는 사람들', 'city', 3, '다큐, 6화']];
  const body = `<div class="tp-app">${topbar(OTT_MENU, 0, ottEnd)}
<main class="tp-content">
  <section class="tp-hero" aria-labelledby="vh-hero">
    ${thumb('16:9', '', photo('mix', 0, 1600), 'xl')}
    <div class="tp-stack" style="gap: var(--ds-space-x4)">
      <div class="tp-row">${badge('새 시즌', 'brand', true)}${tags(['2026', '시즌 2', '12세', '여행 다큐'])}</div>
      <h1 class="tp-hero__title" id="vh-hero">바다 건너 일주일</h1>
      <div class="tp-row">${btn('3화 이어 보기', { variant: 'brandSolid', size: 'medium', ic: 'play-solid' })}${btn('찜하기', { size: 'medium', ic: 'plus' })}</div>
    </div>
  </section>
  ${chiptabs(['전체', '시리즈', '영화', '다큐', '예능', '애니메이션', '강의'], 0, '분류')}
  <section class="tp-sec">${secHead('이어 보기', { tools: link('모두 보기') })}${shelf('이어 보기', cont.map(([t, th, i, s, v]) => tile(t, photo(th, i, 720), { sub: s, v })))}</section>
  <section class="tp-sec">${secHead('오늘 많이 본 콘텐츠')}${shelf('오늘 많이 본 콘텐츠', top.map(([t, th, i], n) => `<a class="tp-tile" href="#" aria-label="${n + 1}위 ${t}"><div class="tp-rank">${thumb('2:3', '', photo(th, i, 480), 'lg')}<span class="tp-rank__no" aria-hidden="true">${n + 1}</span></div><span class="tp-tile__title">${t}</span></a>`), 'poster')}</section>
  <section class="tp-sec">${secHead('영어로 보는 다큐', { tools: link('모두 보기') })}${shelf('영어로 보는 다큐', docs.map(([t, th, i, s]) => tile(t, photo(th, i, 720), { sub: s })))}</section>
</main></div>`;
  return { slug: 'video-home', en: 'Video Home', name: '영상 홈', group: 'Content', desc: '대표 작품과 이어 보기, 분류별 작품 줄을 모은 영상 서비스 첫 화면입니다. 보던 영상으로 바로 돌아가게 합니다.', css, body };
};

/* 2. 작품 상세 ------------------------------------------------------- */
const detail = () => {
  const css = CSS + `
  .tp-td { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); align-items: start; }
  @media (min-width: 1024px) { .tp-td { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: var(--ds-space-x10); } }
  .tp-td .tp-row { flex-wrap: wrap; }
  .tp-ep { display: grid; grid-template-columns: 128px minmax(0, 1fr); gap: var(--ds-space-x4); align-items: start; padding-block: var(--ds-space-x4); color: inherit; text-decoration: none; }
  .tp-ep + .tp-ep { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 768px) { .tp-ep { grid-template-columns: 220px minmax(0, 1fr); } }
  .tp-ep__desc { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-ep .ds-progress { margin-top: var(--ds-space-x2); }
  .tp-ep__head { display: flex; align-items: baseline; justify-content: space-between; gap: var(--ds-space-x3); }
`;
  const eps = [['1화', '떠나기 전날', '52분', '작은 배낭 하나로 일주일을 버틸 수 있을까요. 두 친구가 첫 항구에서 만납니다.', 100], ['2화', '바람이 바뀌는 섬', '48분', '태풍 소식에 배가 묶이고, 섬 사람들의 저녁 식탁에 초대받습니다.', 100], ['3화', '말이 통하지 않을 때', '55분', '처음 가는 시장에서 손짓만으로 장을 보는 하루입니다.', 64], ['4화', '등대지기의 노트', '50분', '서른 해 동안 등대를 지킨 사람이 남긴 기록을 따라갑니다.', -1], ['5화', '돌아오는 배', '58분', '마지막 날, 처음 만났던 항구로 돌아갑니다.', -1]];
  const body = `<div class="tp-app">${topbar(OTT_MENU, 1, ottEnd)}
<main class="tp-content">
  <div class="tp-td">
    ${video(photo('mix', 0, 1600), '64%', ['35:12', '55:00'])}
    <div class="tp-stack" style="gap: var(--ds-space-x4)">
      <h1 class="tp-h1">바다 건너 일주일</h1>
      ${tags(['2026', '시즌 2', '12세', '여행 다큐', '자막 4개'])}
      <div class="tp-row">${btn('3화 이어 보기', { variant: 'brandSolid', size: 'medium', ic: 'play-solid' })}${iconBtn('plus', '찜하기', { variant: 'neutralWeak', size: 'medium' })}${iconBtn('thumbs-up', '좋아요', { variant: 'neutralWeak', size: 'medium' })}${iconBtn('share', '공유', { variant: 'neutralWeak', size: 'medium' })}</div>
      <div class="tp-article"><p>두 친구가 배낭 하나씩 메고 일주일 동안 섬과 항구를 옮겨 다니며 만난 사람들의 이야기입니다.</p></div>
      <dl class="ds-desclist">${[['출연', '한지아, 오도윤'], ['연출', '정민재'], ['음성', '한국어, 영어']].map(([k, v]) => `<div class="ds-desclist__item"><dt class="ds-desclist__label">${k}</dt><dd class="ds-desclist__value">${v}</dd></div>`).join('')}</dl>
    </div>
  </div>
  <section class="tp-sec">${secHead('회차', { tools: select('시즌 2', { aria: '시즌' }) })}
    <div>${eps.map(([n, t, d, s, v], i) => `<a class="tp-ep" href="#">${thumb('16:9', '', photo('mix', i + 1, 480), 'md')}<div class="tp-stack"><div class="tp-ep__head"><span class="tp-item-title">${n} ${t}</span><span class="tp-caption">${T(d)}</span></div><p class="tp-ep__desc">${s}</p>${v >= 0 ? progress(v, { label: n + ' 본 만큼' }) : ''}</div></a>`).join('')}</div>
  </section>
  <section class="tp-sec">${secHead('비슷한 콘텐츠')}<div class="tp-g4">${[['느리게 걷는 숲', 'nature', 3], ['영어로 떠나는 여행', 'mix', 1], ['서점 골목', 'book', 3], ['도시를 그리는 사람들', 'city', 3]].map(([t, th, i]) => tile(t, photo(th, i, 720))).join('')}</div></section>
</main></div>`;
  return { slug: 'video-title-detail', en: 'Title Detail', name: '작품 상세', group: 'Content', desc: '작품 하나의 정보와 시즌별 회차를 보여 주는 상세 화면입니다. 본 회차와 이어 볼 회차를 진행 막대로 구분합니다.', css, body };
};

/* 3. 영상 시청 ------------------------------------------------------- */
const watch = () => {
  const css = CSS + `
  .tp-wt { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x8); align-items: start; }
  @media (min-width: 1280px) { .tp-wt { grid-template-columns: minmax(0, 1fr) 380px; } }
  .tp-wt__main { display: flex; flex-direction: column; gap: var(--ds-space-x5); min-width: 0; }
  .tp-channel { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-channel > .tp-row { flex-wrap: wrap; }
  .tp-about { display: flex; flex-direction: column; gap: var(--ds-space-x2); padding: var(--ds-space-x4); border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-neutral-weak-alpha); }
  .tp-cmt { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--ds-space-x3); }
  .tp-cmt p { margin: 0; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-up { display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: var(--ds-space-x3); align-items: start; color: inherit; text-decoration: none; }
  .tp-up__title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-weight: var(--ds-font-weight-medium); }
  .tp-opt { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
`;
  const next = [['영어 인터뷰에서 자주 나오는 질문 10가지', '말하기 연구소', '조회수 12만회', 'study', 1], ['10분 만에 끝내는 비즈니스 이메일', '오피스 영어', '조회수 8.4만회', 'work', 0], ['여행 영어, 공항에서 쓰는 문장', '여행하는 영어', '조회수 31만회', 'city', 2], ['발음이 좋아지는 하루 루틴', '말하기 연구소', '조회수 5.2만회', 'study', 3], ['영어 뉴스로 듣기 연습', '듣기 클럽', '조회수 2.9만회', 'book', 0]];
  const body = `<div class="tp-app">${topbar(OTT_MENU, 3, ottEnd)}
<main class="tp-content">
  <div class="tp-wt">
    <div class="tp-wt__main">
      ${video(photo('study', 2, 1600), '24%', ['03:08', '13:42'])}
      <h1 class="tp-h1">영어 회의에서 바로 쓰는 표현 20가지</h1>
      <div class="tp-channel"><div class="tp-row">${avatar('말하기 연구소', 40)}<div class="tp-stack"><span class="tp-item-title">말하기 연구소</span><span class="tp-caption">구독자 24만명</span></div>${btn('구독', { variant: 'neutralSolid' })}</div>
        <div class="tp-row">${btn('1.2만', { ic: 'thumbs-up', aria: '좋아요 1.2만' })}${btn('공유', { ic: 'share' })}${btn('저장', { ic: 'bookmark' })}</div></div>
      <div class="tp-about"><span class="tp-label">${T('조회수 18만회')} / ${T('2026.11.10')}</span><div class="tp-article"><p>회의를 시작할 때, 의견을 낼 때, 정리할 때 쓰는 표현을 상황별로 모았어요. 영상 아래 자막에서 문장을 바로 복사할 수 있어요.</p></div></div>
      <section class="tp-sec">${secHead('댓글 412', { level: 2, cls: 'tp-h3', tools: select('인기순', { aria: '댓글 정렬' }) })}
        <div class="tp-cmt" style="align-items:center">${avatar('와이비엠', 32)}${K.input('wt-cmt', 'placeholder="댓글 쓰기" aria-label="댓글"')}</div>
        ${[['한지아', '2일 전', '회의 마무리 표현이 특히 좋았어요. 다음 주 회의에서 바로 써 볼게요.', 128], ['오도윤', '5일 전', '자막을 켜고 두 번 보니 귀에 잘 들어와요.', 64]].map(([w, t, c, n]) => `<div class="tp-cmt">${avatar(w, 32)}<div class="tp-stack" style="gap: var(--ds-space-x1)"><div class="tp-row"><span class="tp-label">${w}</span><span class="tp-caption">${t}</span></div><p>${c}</p><div class="tp-row">${btn(String(n), { variant: 'ghost', size: 'xsmall', ic: 'thumbs-up', aria: '좋아요 ' + n })}${btn('답글', { variant: 'ghost', size: 'xsmall' })}</div></div></div>`).join('')}
      </section>
    </div>
    <aside class="tp-stack" style="gap: var(--ds-space-x4)" aria-labelledby="wt-next">
      <div class="tp-opt"><h2 class="tp-h3" id="wt-next">다음 영상</h2><label class="tp-row"><span class="tp-caption">자동 재생</span>${K.sw('자동 재생', true)}</label></div>
      ${next.map(([t, ch, vw, th, i]) => `<a class="tp-up" href="#">${thumb('16:9', '', photo(th, i, 480), 'md')}<span class="tp-stack"><span class="tp-up__title">${t}</span><span class="tp-caption">${ch}</span><span class="tp-caption">${T(vw)}</span></span></a>`).join('')}
    </aside>
  </div>
</main></div>`;
  return { slug: 'video-watch', en: 'Watch Page', name: '영상 시청', group: 'Content', desc: '영상을 보며 채널, 설명, 댓글을 함께 보는 시청 화면입니다. 다음에 볼 영상은 옆에 모아 둡니다.', css, body };
};

/* 4. 전체 화면 플레이어 ----------------------------------------------- */
const player = () => {
  // 플레이어 조작 막대는 DS 에 없는 영상 도구 전용이라 템플릿 버튼으로 그린다(검은 화면 위 흰 글자)
  const css = CSS + `
  .tp-fp { position: relative; display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh; overflow: hidden; background: var(--ds-color-palette-static-black); color: var(--ds-color-palette-static-white); }
  .tp-fp > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .6; }
  .tp-fp__top, .tp-fp__bottom { position: relative; display: flex; flex-direction: column; gap: var(--ds-space-x3); padding: var(--ds-space-x4); }
  .tp-fp__top { flex-direction: row; align-items: center; gap: var(--ds-space-x2); background: linear-gradient(var(--ds-color-palette-static-black-alpha-500), transparent); }
  .tp-fp__bottom { background: linear-gradient(transparent, var(--ds-color-palette-static-black-alpha-500)); }
  @media (min-width: 768px) { .tp-fp__top, .tp-fp__bottom { padding: var(--ds-space-x6) var(--ds-space-x8); } }
  .tp-fp__title { display: flex; flex-direction: column; min-width: 0; }
  .tp-fp__title b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); font-weight: var(--ds-font-weight-semibold); }
  .tp-fp__title span { font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); opacity: .8; }
  .tp-fp__time { display: flex; align-items: center; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t03); font-variant-numeric: tabular-nums; }
  .tp-fp__track { position: relative; flex: 1 1 auto; height: 4px; border-radius: var(--ds-shape-pill); background: var(--ds-color-palette-static-white-alpha-300); }
  .tp-fp__track > span { display: block; width: 46%; height: 100%; border-radius: inherit; background: var(--ds-color-palette-static-white); }
  .tp-fp__track > i { position: absolute; top: 50%; left: 46%; width: 14px; height: 14px; border-radius: var(--ds-shape-pill); background: var(--ds-color-palette-static-white); transform: translate(-50%, -50%); }
  .tp-fp__bar { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x2); }
  .tp-fp__bar > div { display: flex; align-items: center; gap: var(--ds-space-x1); }
  .tp-pc { display: inline-grid; place-items: center; min-width: 40px; height: 40px; padding: 0 var(--ds-space-x2); border: 0; border-radius: var(--ds-shape-pill); background: none; color: inherit; font: inherit; font-size: var(--ds-font-size-t04); font-weight: var(--ds-font-weight-semibold); cursor: pointer; }
  .tp-pc:hover { background: var(--ds-color-palette-static-white-alpha-300); }
  .tp-pc .ds-icon { --ds-icon-size: 24px; }
  .tp-pc[data-main] .ds-icon { --ds-icon-size: 32px; }
  .tp-fp__next { position: relative; align-self: flex-end; display: flex; align-items: center; gap: var(--ds-space-x3); width: min(100%, 360px); padding: var(--ds-space-x2); border-radius: var(--ds-shape-lg); background: var(--ds-color-palette-static-black-alpha-500); color: inherit; text-decoration: none; }
  .tp-fp__next .ds-imageframe { flex: none; width: 128px; }
  .tp-fp__next b { font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-weight: var(--ds-font-weight-semibold); }
  .tp-fp__next span { font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); opacity: .8; }
  .tp-hide-xs { display: none; }
  @media (min-width: 768px) { .tp-hide-xs { display: inline-grid; } }
`;
  const pc = (ic, label, { main = false, text = '', cls = '' } = {}) => `<button type="button" class="tp-pc${cls ? ' ' + cls : ''}"${main ? ' data-main' : ''} aria-label="${esc(label)}">${text || icon(ic)}</button>`;
  const body = `<div class="tp-fp">
  <img src="${photo('mix', 0, 1920)}" alt="">
  <div class="tp-fp__top">${pc('arrow-left', '뒤로')}<div class="tp-fp__title"><b>바다 건너 일주일</b><span>시즌 2, 3화 말이 통하지 않을 때</span></div></div>
  <h1 class="tp-sr">바다 건너 일주일 시즌 2 3화 보기</h1>
  <div class="tp-fp__bottom">
    <a class="tp-fp__next" href="#">${thumb('16:9', '', photo('mix', 4, 480), 'md')}<span class="tp-stack"><b>다음 화</b><span>4화 등대지기의 노트</span></span></a>
    <div class="tp-fp__time"><span>${'25:18'}</span><span class="tp-fp__track" role="slider" aria-label="재생 위치" aria-valuemin="0" aria-valuemax="3300" aria-valuenow="1518" aria-valuetext="25분 18초" tabindex="0"><span></span><i></i></span><span>55:00</span></div>
    <div class="tp-fp__bar">
      <div>${pc('pause-solid', '멈춤', { main: true })}${pc('rotate-ccw', '10초 뒤로')}${pc('redo-2', '10초 앞으로')}</div>
      <div>${pc('', '자막', { text: '자막', cls: 'tp-hide-xs' })}${pc('', '재생 속도 1.0배', { text: '1.0x' })}${pc('list', '회차 목록')}${pc('chevrons-right', '다음 화')}${pc('maximize-2', '전체 화면 끝내기')}</div>
    </div>
  </div>
</div>`;
  return { slug: 'video-player', en: 'Fullscreen Player', name: '전체 화면 플레이어', group: 'Content', desc: '영상을 화면 가득 채워 보는 플레이어입니다. 조작 막대와 다음 화는 아래에 모아 둡니다.', css, body };
};

/* 5. 클래스 상세 ----------------------------------------------------- */
const classDetail = () => {
  const css = CSS + `
  .tp-cd { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x8); align-items: start; }
  @media (min-width: 1024px) { .tp-cd { grid-template-columns: minmax(0, 1fr) 360px; gap: var(--ds-space-x10); } }
  .tp-cd__main { display: flex; flex-direction: column; gap: var(--ds-space-x10); min-width: 0; }
  .tp-buy { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
  @media (min-width: 1024px) { .tp-buy { position: sticky; top: calc(var(--ds-space-x16) + var(--ds-space-x4)); } .tp-cd > .tp-buy { grid-column: 2; grid-row: 1 / span 2; } }
  .tp-price { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--ds-space-x2); }
  .tp-price b { font-size: var(--ds-font-size-t08); line-height: var(--ds-line-height-t08); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; }
  .tp-price s { color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t04); }
  .tp-price em { font-style: normal; color: var(--ds-color-fg-critical); font-size: var(--ds-font-size-t06); font-weight: var(--ds-font-weight-bold); }
  .tp-lesson { display: grid; grid-template-columns: 20px minmax(0, 1fr) auto; gap: var(--ds-space-x3); align-items: center; padding-block: var(--ds-space-x2); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-lesson .ds-icon { color: var(--ds-color-fg-neutral-subtle); }
  .tp-rv { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--ds-space-x3); padding-block: var(--ds-space-x4); }
  .tp-rv + .tp-rv { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-rv p { margin: 0; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-score { display: flex; align-items: center; gap: var(--ds-space-x4); }
  .tp-score b { font-size: var(--ds-font-size-t10); line-height: var(--ds-line-height-t10); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; }
`;
  const rating = (v, n, size = 'small') => `<span class="ds-rating" data-size="${size}" style="--ds-rating-value: ${v}" role="img" aria-label="5점 만점에 ${v}점${n ? `, 수강평 ${n}개` : ''}"><span class="ds-rating__stars"></span><span class="ds-rating__value">${v}</span>${n ? `<span class="ds-rating__count">(${n})</span>` : ''}</span>`;
  const L = (t, d, pre = false) => `<div class="tp-lesson">${icon('play')}<span>${t}</span><span class="tp-row">${pre ? link('미리보기') : ''}<span class="tp-caption tp-num">${d}</span></span></div>`;
  const chapters = [
    ['1장. 영어 회의의 흐름', [['회의를 여는 첫 문장', '08:12', true], ['의제를 소개하기', '10:40'], ['발언 순서 정하기', '07:55']], true],
    ['2장. 의견 말하기와 반대하기', [['내 의견을 분명하게', '12:08'], ['부드럽게 반대하기', '11:20'], ['질문으로 되묻기', '09:31']]],
    ['3장. 정리하고 마무리하기', [['결정 사항 정리하기', '10:02'], ['다음 할 일 나누기', '08:47'], ['회의록 메일 쓰기', '14:30']]],
  ];
  const buy = `<aside class="tp-buy" aria-labelledby="cd-title">
    <div class="tp-stack" style="gap: var(--ds-space-x2)"><div class="tp-row">${badge('얼리버드', 'critical')}${badge('입문')}</div><h1 class="tp-h1" id="cd-title">영어 회의, 오늘부터 말하기</h1>${rating('4.8', '1,204')}</div>
    <div class="tp-price"><em>30%</em><b>월 23,100원</b><s>월 33,000원</s></div>
    <dl class="ds-desclist">${[['수강 기간', '1년'], ['강의', '24강, 6시간 40분'], ['자막', '한국어, 영어'], ['수료증', '발급']].map(([k, v]) => `<div class="ds-desclist__item"><dt class="ds-desclist__label">${k}</dt><dd class="ds-desclist__value">${v}</dd></div>`).join('')}</dl>
    ${btn('수강 신청', { variant: 'brandSolid', size: 'large', fill: true })}
    <div class="tp-row">${btn('찜하기', { size: 'medium', ic: 'heart', fill: true })}${btn('공유', { size: 'medium', ic: 'share', fill: true })}</div>
  </aside>`;
  const body = `<div class="tp-app">${topbar(CLASS_MENU, 0, classEnd)}
<main class="tp-content">
  <div class="tp-cd">
    ${thumb('16:9', '', photo('work', 2, 1200), 'xl')}
    ${buy}
    <div class="tp-cd__main">
      <div class="tp-row">${avatar('한지아', 40)}<div class="tp-stack"><span class="tp-item-title">한지아</span><span class="tp-caption">비즈니스 영어 강사</span></div></div>
      ${tabs(['클래스 소개', '커리큘럼', '강사', '수강평 1,204'], 0, '클래스 정보')}
      <section class="tp-sec">${secHead('이런 걸 배워요', { cls: 'tp-h3' })}${checks(['회의를 열고 닫는 기본 문장 40개', '의견을 내고 반대하는 표현', '회의 뒤 정리 메일 쓰기'])}</section>
      <section class="tp-sec">${secHead('커리큘럼', { cls: 'tp-h3', tools: `<span class="tp-caption">${T('3장, 24강')}</span>` })}<div>${accordion(chapters.map(([t, ls, open]) => [t, ls.map(([a, b, p]) => L(a, b, p)).join(''), open, `${ls.length}강`]))}</div></section>
      <section class="tp-sec">${secHead('강사', { cls: 'tp-h3' })}<div class="tp-row" style="align-items:flex-start; gap: var(--ds-space-x4)">${avatar('한지아', 56)}<div class="tp-stack" style="gap: var(--ds-space-x2)"><span class="tp-item-title">한지아</span><div class="tp-article"><p>외국계 회사에서 10년 동안 회의를 이끌었고, 지금은 직장인 영어 말하기를 가르쳐요.</p></div></div></div></section>
      <section class="tp-sec">${secHead('수강평', { cls: 'tp-h3', tools: select('최신순', { aria: '수강평 정렬' }) })}
        <div class="tp-score"><b>4.8</b>${rating('4.8', '1,204', 'medium')}</div>
        <div>${[['오도윤', '11.08', '5.0', '회의 시작 문장만 외워도 첫마디가 훨씬 편해졌어요.'], ['윤채원', '11.02', '4.5', '강의가 짧아서 출퇴근길에 듣기 좋아요. 예문이 실제 회의 같아요.']].map(([w, d, v, c]) => `<div class="tp-rv">${avatar(w, 32)}<div class="tp-stack" style="gap: var(--ds-space-x1)"><div class="tp-row"><span class="tp-label">${w}</span>${rating(v, '')}<span class="tp-caption">${T(d)}</span></div><p>${c}</p></div></div>`).join('')}</div>
      </section>
    </div>
  </div>
</main></div>`;
  return { slug: 'class-detail', en: 'Class Detail', name: '클래스 상세', group: 'Learning', desc: '온라인 클래스의 소개, 커리큘럼, 강사, 수강평을 보고 신청하는 화면입니다. 가격과 신청 버튼은 넓은 화면에서 옆에 고정됩니다.', css, body };
};

/* 6. 내 강의실 ------------------------------------------------------- */
const classroom = () => {
  const css = CSS + `
  .tp-resume { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x5); align-items: center; }
  @media (min-width: 768px) { .tp-resume { grid-template-columns: 320px minmax(0, 1fr); } }
  .tp-resume .tp-row { flex-wrap: wrap; }
  .tp-prog { display: flex; align-items: center; gap: var(--ds-space-x3); }
  .tp-prog .ds-progress { flex: 1 1 auto; }
  .tp-cls { display: flex; flex-direction: column; gap: var(--ds-space-x3); min-width: 0; color: inherit; text-decoration: none; }
  .tp-cls__title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-semibold); }
  .tp-cert { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ds-space-x3); align-items: center; }
`;
  const cls = [['영어 회의, 오늘부터 말하기', '한지아', 42, 'work', 2, ''], ['비즈니스 이메일 한 번에 쓰기', '오도윤', 75, 'work', 0, ''], ['토익 실전 900 전략', '정민재', 18, 'study', 1, 'D-12'], ['여행 영어 첫걸음', '윤채원', 6, 'city', 2, '']];
  const meter = (v, label) => `<div class="tp-prog">${progress(v, { label })}<span class="tp-caption tp-num">${v}%</span></div>`;
  const body = `<div class="tp-app">${topbar(CLASS_MENU, 2, classEnd)}
${head('내 강의실')}
<main class="tp-content">
  ${card(`<div class="tp-stats" style="--n:4"><div><span class="tp-sub">수강 중</span><span class="tp-mid">${T('4개')}</span></div><div><span class="tp-sub">완료</span><span class="tp-mid">${T('7개')}</span></div><div><span class="tp-sub">이번 주 학습</span><span class="tp-mid">${T('2시간 10분')}</span></div><div><span class="tp-sub">연속 학습</span><span class="tp-mid">${T('5일')}</span></div></div>`)}
  <section class="tp-sec">${secHead('이어 듣기')}
    ${card(`<div class="tp-resume">${thumb('16:9', '', photo('work', 2, 960), 'lg')}<div class="tp-stack" style="gap: var(--ds-space-x3)"><span class="tp-caption">영어 회의, 오늘부터 말하기</span><span class="tp-mid">2장. 부드럽게 반대하기</span>${meter(42, '영어 회의, 오늘부터 말하기 진도')}<div class="tp-row">${btn('이어 듣기', { variant: 'brandSolid', size: 'medium', ic: 'play-solid' })}${btn('강의 목록', { size: 'medium' })}</div></div></div>`)}
  </section>
  <section class="tp-sec">
    ${tabs(['수강 중 4', '완료 7', '찜 12'], 0, '내 클래스')}
    <div class="tp-g4">${cls.map(([t, who, v, th, i, due]) => `<a class="tp-cls" href="#">${thumb('16:9', '', photo(th, i, 720), 'lg')}<span class="tp-stack" style="gap: var(--ds-space-x1)"><span class="tp-row">${due ? badge(due, 'warning') : ''}<span class="tp-caption">${who}</span></span><span class="tp-cls__title">${t}</span></span>${meter(v, t + ' 진도')}</a>`).join('')}</div>
  </section>
  <section class="tp-sec">${secHead('수료증', { tools: link('모두 보기') })}
    ${card(`<div class="tp-rows">${[['비즈니스 영어 프레젠테이션', '2026.10.28'], ['영어 문법 다시 보기', '2026.09.14']].map(([t, d]) => `<div class="tp-cert"><div class="tp-stack"><span class="tp-item-title">${t}</span><span class="tp-caption">${T(d)} 발급</span></div>${btn('받기', { ic: 'download' })}</div>`).join('')}</div>`)}
  </section>
</main></div>`;
  return { slug: 'my-classroom', en: 'My Classroom', name: '내 강의실', group: 'Learning', desc: '수강 중인 클래스와 진도, 수료증을 모은 학습자 화면입니다. 마지막에 듣던 강의를 맨 위에 둡니다.', css, body };
};

export const templates = [home, detail, watch, player, classDetail, classroom].map((f) => f());
