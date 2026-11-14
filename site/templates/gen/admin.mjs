// 관리자 처리 화면 3종(관리자 > 처리): 요청 목록 → 요청 상세 → 요청 등록.
// LMS 같은 관리자 사이트에서 요청을 받아 승인, 진행, 완료로 처리하는 흐름을 담는다.
// 사내 업무 관리 화면의 공통 구조(상태 목록, 처리 단계, 댓글과 이력, 라벨 왼쪽 등록 폼)만 따르고 서비스 이름과 글은 넣지 않는다.
import * as K from './kit.mjs';
import { T, FRAME_CSS, sidenav, frame } from './frame.mjs';
const { icon, btn, iconBtn, badge, avatar, avatars, head, input, select, search, checkbox, radios, chiptabs, tabs, stepper, progress, pagination, checkOnly, divider, esc } = K;

const ORG = '한빛아카데미';
const nav = (cur) => sidenav(ORG, [['', [['홈', 'house', cur === 0], ['과정 개설 요청', 'inbox', cur === 1], ['과정 운영', 'book-open', cur === 2], ['수강생', 'users', cur === 3], ['출석', 'calendar', cur === 4], ['통계', 'chart-column', cur === 5]]]], [['설정', 'settings', false]]);

// 상태: 신청 → 승인 → 진행 → 완료 (반려는 따로)
const STATUS = { 신청: 'neutral', 승인: 'informative', 진행: 'brand', 완료: 'positive', 반려: 'critical' };
const st = (s) => badge(s, STATUS[s]);

const CSS = FRAME_CSS + `
  .tp-late { color: var(--ds-color-fg-critical); }
`;

/* 1. 요청 목록 ------------------------------------------------------- */
const list = () => {
  // 번호, 상태, 중요, 요청, 댓글, 요청한 사람, 요청일, 완료 희망일(늦음), 담당자
  const rows = [
    [1284, '신청', 0, '비즈니스 영어 회화 4기 개설', 0, '김도윤', '11.13', '11.20', 0, ''],
    [1283, '승인', 1, '신입 사원 온보딩 과정 일정 변경', 1, '이서연', '11.13', '11.14', 0, ''],
    [1282, '진행', 0, '개인정보 보호 교육 2027 콘텐츠 교체', 2, '박지후', '11.12', '11.28', 0, '정민재'],
    [1281, '진행', 1, '토익 실전 대비반 수강 인원 늘리기', 1, '최하은', '11.12', '11.13', 1, '한지아'],
    [1280, '신청', 0, '엑셀 함수 과정 퀴즈 문항 추가', 0, '정민재', '11.12', '11.21', 0, ''],
    [1279, '진행', 0, 'AI 업무 활용 과정 강사 변경', 3, '한지아', '11.11', '11.18', 0, '오도윤'],
    [1278, '반려', 0, '같은 과정 중복 개설', 2, '오도윤', '11.11', '11.15', 0, ''],
    [1277, '완료', 0, '팀장 리더십 5기 수료증 발급', 0, '윤채원', '11.10', '11.12', 0, '이서연'],
    [1276, '완료', 0, '전화 영어 11월 교재 올리기', 1, '이서연', '11.10', '11.11', 0, '박지후'],
    [1275, '완료', 0, '법정 필수 교육 미이수자 명단 추출', 0, '김도윤', '11.07', '11.10', 0, '최하은'],
  ];
  const css = CSS + `
  .tp-rql .ds-table { min-width: 880px; }
  .tp-rql th:first-child { width: 48px; }
  /* 모바일: 찾을 항목과 찾기 칸을 한 줄로 */
  @media (max-width: 767px) { .tp-rql-tools .tp-ttools__end { flex-wrap: nowrap; width: 100%; } .tp-rql-tools .tp-ttools__end > .ds-select { flex: none; min-width: 0; width: 104px; } .tp-rql-tools .ds-input { flex: 1 1 auto; width: auto; } }
  .tp-rql th:nth-child(4) { width: 40%; }
  .tp-rql td:nth-child(4) a { display: inline-flex; align-items: center; gap: var(--ds-space-x2); max-width: 100%; color: inherit; text-decoration: none; }
  .tp-rql td:nth-child(4) a > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tp-rql td:nth-child(4) a:hover > span { text-decoration: underline; }
  .tp-rql .tp-cnt { display: inline-flex; align-items: center; gap: 2px; flex: none; color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t02); font-variant-numeric: tabular-nums; }
  .tp-rql .tp-cnt .ds-icon { --ds-icon-size: 14px; }
`;
  const trs = rows.map(([n, s, imp, t, c, who, d, due, late, by]) => `<tr data-interactive>
    <td>${iconBtn('star', `${n}번 북마크`, { size: 'xsmall' })}</td>
    <td>${T('#' + n)}</td>
    <td>${st(s)}</td>
    <td><a href="#">${imp ? badge('중요', 'critical') : ''}<span>${t}</span>${c ? `<span class="tp-cnt">${icon('message-circle')}${c}</span>` : ''}</a></td>
    <td>${who}</td>
    <td>${T(d)}</td>
    <td>${T(late ? `<span class="tp-late">${due}</span>` : due)}</td>
    <td>${by ? `<span class="tp-row">${avatar(by)}${by}</span>` : '<span class="tp-caption">미정</span>'}</td>
  </tr>`).join('');
  const main = `${head('과정 개설 요청', { tools: btn('요청 등록', { variant: 'brandSolid', ic: 'plus' }) })}
<main class="tp-content" style="gap: var(--ds-space-x4)">
  <div class="tp-ttools tp-rql-tools">${chiptabs(['전체 128', '신청 6', '승인 4', '진행 12', '완료 103', '반려 3'], 0, '상태')}<div class="tp-ttools__end">${K.even(select('제목', { aria: '찾을 항목' }) + search('rq-q', '요청 찾기'))}</div></div>
  <div class="ds-table-wrap tp-scroll-x tp-rql"><table class="ds-table" data-size="small"><caption class="tp-sr">과정 개설 요청 목록</caption><thead><tr>
    <th scope="col"><span class="tp-sr">북마크</span></th><th scope="col">번호</th><th scope="col">상태</th><th scope="col">요청</th><th scope="col">요청한 사람</th><th scope="col">요청일</th><th scope="col">완료 희망일</th><th scope="col">담당자</th>
  </tr></thead><tbody>${trs}</tbody></table></div>
  <div class="tp-tfoot">${pagination(1, 13)}</div>
</main>`;
  return { slug: 'admin-request-list', en: 'Request List', name: '요청 목록', group: 'Admin', desc: '들어온 요청을 상태별로 보고 처리할 것을 고르는 관리자 목록입니다. 신청, 승인, 진행, 완료처럼 단계가 있는 요청에 사용합니다.', css, body: frame(nav(1), '과정 개설 요청', main) };
};

/* 2. 요청 상세 ------------------------------------------------------- */
const detail = () => {
  const css = CSS + `
  .tp-rqd__main { gap: var(--ds-space-x8); }
  .tp-crumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x2); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); }
  .tp-crumb a { color: inherit; text-decoration: none; }
  .tp-rqd__title { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-rqd__title .tp-row { flex: none; }
  .tp-article { display: flex; flex-direction: column; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); }
  .tp-article p { margin: 0; }
  /* 첨부 파일: 할 일 상세와 같은 이름 칸 (DS File Item 타일은 긴 파일 이름이 잘린다) */
  .tp-files { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--ds-space-x2); }
  .tp-file { display: flex; align-items: center; gap: var(--ds-space-x2); min-width: 0; padding: var(--ds-space-x2) var(--ds-space-x2) var(--ds-space-x2) var(--ds-space-x3); border-radius: var(--ds-shape-md); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); color: inherit; text-decoration: none; font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); }
  .tp-file > .ds-icon { flex: none; color: var(--ds-color-fg-neutral-subtle); }
  .tp-file__name { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tp-compose { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-cmts { display: flex; flex-direction: column; }
  .tp-cmt { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--ds-space-x3); padding-block: var(--ds-space-x4); }
  .tp-cmt + .tp-cmt { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-cmt p { margin: 0; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-at { color: var(--ds-color-fg-informative); }
  .tp-owner { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: var(--ds-space-x2); }
  .tp-owner .ds-progress { width: 64px; }
`;
  const file = (n, size) => `<a class="tp-file" href="#" download>${icon('file-text', 'sm')}<span class="tp-file__name">${n}</span><span class="tp-caption tp-num">${size}</span>${icon('download', 'sm')}</a>`;
  const cmt = (who, when, text, f = '') => `<div class="tp-cmt">${avatar(who, 32)}<div class="tp-stack" style="gap: var(--ds-space-x1)"><div class="tp-row"><span class="tp-name">${who}</span><span class="tp-caption">${T(when)}</span></div><p>${text}</p>${f}</div></div>`;
  const dl = [
    ['상태', st('진행')],
    ['요청한 사람', '박지후 / 교육운영팀'],
    ['요청일', T('2026.11.12')],
    ['완료 희망일', T('2026.11.28')],
    ['승인', `한지아 ${T('11.12')}`],
  ];
  const main = `<div class="tp-body tp-body--panel">
<main class="tp-content tp-rqd__main">
  <header class="tp-stack" style="gap: var(--ds-space-x2)">
    <nav class="tp-crumb" aria-label="현재 위치"><a href="#">과정 개설 요청</a><span aria-hidden="true">/</span><span class="tp-num">#1282</span></nav>
    <div class="tp-rqd__title"><h1 class="tp-h1">개인정보 보호 교육 2027 콘텐츠 교체</h1><div class="tp-row">${iconBtn('star', '북마크')}${iconBtn('link', '링크 복사')}${iconBtn('ellipsis', '더 보기')}</div></div>
  </header>
  ${stepper(['신청', '승인', '진행', '완료'], 2, '처리 단계')}
  <section class="tp-sec" aria-label="요청 내용"><div class="tp-article">
    <p>2027년 개인정보 보호 교육을 바뀐 법 기준으로 바꿔 주세요.</p>
    <p>3강과 5강의 사례를 새 사례로 바꾸고, 퀴즈 10문항 중 4문항을 고쳐야 해요. 고칠 내용은 첨부한 문서에 표시해 두었어요.</p>
    <p>1월 2일에 전체 임직원에게 열 예정이라 12월 안에 검수까지 끝나면 좋겠어요.</p>
  </div><div class="tp-files">${file('2027 개인정보 교육 수정 사항.pdf', '1.2MB')}${file('퀴즈 문항 수정안.xlsx', '84KB')}</div></section>
  <section class="tp-sec">
    ${tabs(['댓글 2', '처리 이력'], 0, '댓글과 이력')}
    <div class="tp-compose"><textarea class="ds-textarea" id="rq-cmt" rows="3" placeholder="댓글 쓰기" aria-label="댓글"></textarea><div class="tp-between">${iconBtn('paperclip', '파일 첨부')}${btn('등록', { variant: 'neutralSolid' })}</div></div>
    <div class="tp-cmts">
      ${cmt('정민재', '11.13 10:24', '<span class="tp-at">@박지후</span> 3강 사례는 받은 문서대로 바꿨어요. 5강은 법무팀 확인을 받고 이번 주 금요일까지 올릴게요.')}
      ${cmt('박지후', '11.12 16:05', '퀴즈 문항 수정안 함께 올려요.', `<div class="tp-files">${file('퀴즈 문항 수정안.xlsx', '84KB')}</div>`)}
    </div>
  </section>
</main>
<aside class="tp-panel" aria-labelledby="rqd-info">
  <h2 class="tp-h3" id="rqd-info">처리 정보</h2>
  <dl class="ds-desclist">${dl.map(([k, v]) => `<div class="ds-desclist__item"><dt class="ds-desclist__label">${k}</dt><dd class="ds-desclist__value">${v}</dd></div>`).join('')}</dl>
  ${divider()}
  <div class="tp-stack" style="gap: var(--ds-space-x3)"><h3 class="tp-h4">담당자</h3>${[['정민재', 60], ['오도윤', 20]].map(([n, v]) => `<div class="tp-owner">${avatar(n, 28)}<span class="tp-name">${n}</span><span class="tp-row">${progress(v, { label: n + ' 진행' })}<span class="tp-caption tp-num">${v}%</span></span></div>`).join('')}</div>
  <div class="tp-stack" style="gap: var(--ds-space-x2)">${btn('완료 처리', { variant: 'neutralSolid', size: 'medium', fill: true })}${btn('담당자 바꾸기', { size: 'medium', fill: true })}</div>
</aside>
</div>`;
  return { slug: 'admin-request-detail', en: 'Request Detail', name: '요청 상세', group: 'Admin', desc: '요청 하나의 내용과 처리 단계를 보고 댓글로 주고받는 관리자 화면입니다. 담당자와 진행률은 오른쪽에 모아 둡니다.', css, body: frame(nav(1), '요청 상세', main) };
};

/* 3. 요청 등록 ------------------------------------------------------- */
const form = () => {
  const css = CSS + `
  .tp-rqf { display: flex; flex-direction: column; gap: var(--ds-space-x6); width: min(100%, 880px); }
  .tp-rqf .ds-field { min-width: 0; }
  .tp-rqf .tp-grow { display: flex; align-items: center; gap: var(--ds-space-x4); }
  .tp-rqf .tp-grow > .ds-input { flex: 1 1 auto; }
  .tp-rqf .tp-short { width: min(100%, 240px); }
  .tp-rqf .ds-textarea { min-height: 200px; }
  .tp-rqf__foot { display: flex; justify-content: flex-end; gap: var(--ds-space-x2); padding-top: var(--ds-space-x6); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  /* 넓은 화면은 라벨 왼쪽, 입력 오른쪽 */
  @media (min-width: 768px) {
    .tp-rqf .ds-field { display: grid; grid-template-columns: 160px minmax(0, 1fr); align-items: start; column-gap: var(--ds-space-x6); }
    .tp-rqf .ds-field__header { padding-top: var(--ds-space-x2_5); }
    .tp-rqf .ds-field[role="group"] .ds-field__header { padding-top: var(--ds-space-x1); }
    .tp-rqf .ds-field > :not(.ds-field__header) { grid-column: 2; }
  }
`;
  const req = ' <span class="ds-field__required" aria-hidden="true"></span>';
  const row = (id, label, control, { required = false, group = false } = {}) => `<div class="ds-field"${group ? ` role="group" aria-labelledby="${id}-l"` : ''}><div class="ds-field__header">${group ? `<span class="ds-field__label" id="${id}-l">${label}${required ? req : ''}</span>` : `<label class="ds-field__label" for="${id}">${label}${required ? req : ''}</label>`}</div>${control}</div>`;
  const main = `${head('과정 개설 요청 등록')}
<main class="tp-content">
  <form class="tp-rqf" aria-label="과정 개설 요청 등록">
    ${row('rqf-name', '과정 이름', `<div class="tp-grow">${input('rqf-name', 'required')}${checkbox('중요')}</div>`, { required: true })}
    ${row('rqf-cat', '분류', `<div class="tp-short">${select('분류 고르기', { id: 'rqf-cat' })}</div>`, { required: true })}
    ${row('rqf-type', '운영 방식', radios('rqf-type', ['온라인', '오프라인', '혼합'], 0), { group: true })}
    ${row('rqf-date', '희망 개설일', `<div class="ds-input ds-datefield tp-short" data-variant="outline" data-size="medium"><input class="ds-input__control ds-datefield__control" id="rqf-date" type="text" inputmode="numeric" maxlength="10" placeholder="YYYY.MM.DD" required><button type="button" class="ds-datefield__picker" aria-label="달력에서 고르기">${icon('calendar')}</button></div>`, { required: true })}
    ${row('rqf-cnt', '예상 인원', `<div class="ds-input tp-short" data-variant="outline" data-size="medium"><input class="ds-input__control" id="rqf-cnt" type="text" inputmode="numeric"><span class="ds-input__suffix">명</span></div>`)}
    ${row('rqf-ref', '참조', input('rqf-ref', 'placeholder="이름으로 찾기"', { ic: 'search' }))}
    ${row('rqf-file', '첨부 파일', `<div class="ds-fileattach"><label class="ds-fileattach__dropzone"><input type="file" class="ds-fileattach__input" id="rqf-file" multiple><span class="ds-fileattach__label">파일을 끌어 놓거나 눌러서 추가하세요</span></label></div>`)}
    ${row('rqf-body', '요청 내용', `<textarea class="ds-textarea" id="rqf-body" rows="8" required></textarea>`, { required: true })}
    ${row('rqf-pi', '개인정보', checkbox('개인정보가 들어 있어요'), { group: true })}
    <div class="tp-rqf__foot">${btn('취소', { size: 'medium' })}${btn('등록', { variant: 'brandSolid', size: 'medium' })}</div>
  </form>
</main>`;
  return { slug: 'admin-request-form', en: 'Request Form', name: '요청 등록', group: 'Admin', desc: '관리자 사이트에서 새 요청을 한 화면에 적어 보내는 등록 폼입니다. 넓은 화면에서는 라벨을 왼쪽에 둡니다.', css, body: frame(nav(1), '요청 등록', main) };
};

export const templates = [list, detail, form].map((f) => f());
