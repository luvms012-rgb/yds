// 사업 흐름의 기본 화면 (2026-11-11 사용자 "1순위 진행, 기존 규칙 모두 준수, UI 패턴에서 레퍼런스 수집").
// 회원가입, 아이디, 비밀번호 찾기 / 수험표, 성적 조회, 접수 완료 / 공지사항 목록, 상세, 자주 묻는 질문 / 서비스 메인, 이벤트 페이지.
// 레퍼런스: UI 패턴 카탈로그의 가입, 찾기, 공지, FAQ, 메인, 혜택 화면과 구조가 비슷한 탑승권, 예매 상세, 성적, 주문 완료 화면(구조만, 이름과 글은 쓰지 않음).
// 규칙: 기존 틀(위 메뉴, 머리글, 카드, 오른쪽 고정 요약, 로그인 틀)을 그대로 쓰고, 홍보 문구, 설명 글, 툴팁, 보조 라벨은 넣지 않는다.
import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar } from './frame.mjs';
import { AUTH } from './login.mjs';
const { icon, btn, iconBtn, badge, card, head, secHead, field, input, checkbox, divider, chiptabs, tabs, table, avatar, link, search, accordion, pagination, thumb, photo, checks, esc } = K;

const MENU = ['강의', '교재', '시험', '센터', '고객센터'];
const EXAM_MENU = ['시험 일정', '시험 접수', '성적 확인', '내 시험'];
const end = `${iconBtn('search', '찾기', { size: 'xsmall' })}${iconBtn('bell', '알림', { size: 'xsmall' })}${avatar('와이비엠', 28)}`;
const guestEnd = `${iconBtn('search', '찾기', { size: 'xsmall' })}${btn('로그인', { size: 'xsmall' })}`;
const app = (menu, cur, inner, e = end) => `<div class="tp-app">${topbar(menu, cur, e)}${inner}</div>`;
const kvs = (rows) => `<div class="tp-stack" style="gap: var(--ds-space-x2)">${rows.map(([k, v]) => `<div class="tp-kv"><span>${k}</span><span>${v}</span></div>`).join('')}</div>`;
const lg = (id, ph, attrs = '') => input(id, `placeholder="${esc(ph)}" ${attrs}`, { size: 'large' });
// 오류 상태 입력칸 (DS Field: 입력에 aria-invalid, 아래 ds-field__error)
const fieldErr = (id, label, control, err) => `<div class="ds-field"><div class="ds-field__header"><label class="ds-field__label" for="${id}">${label}</label></div>${control}<div class="ds-field__footer"><p class="ds-field__error">${err}</p></div></div>`;
// 입력 + 버튼 한 줄 (인증 요청, 중복 확인)
const withBtn = (control, b) => `<div class="tp-inline">${control}${b}</div>`;

const CSS = FRAME_CSS + `
  /* 가운데 한 줄 화면 (좁은 폭 720) */
  .tp-nw { box-sizing: border-box; display: flex; flex-direction: column; gap: var(--ds-space-x6); width: min(100%, var(--tp-narrow)); margin-inline: auto; }
  .tp-two { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); }
  @media (min-width: 1024px) { .tp-two { grid-template-columns: minmax(0, 1fr) 320px; align-items: start; } }
  .tp-inline { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ds-space-x2); align-items: center; }
  .tp-inline > .ds-btn { white-space: nowrap; }
  .tp-meta { display: flex; flex-wrap: wrap; gap: var(--ds-space-x3); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-variant-numeric: tabular-nums; }
  .tp-actions { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2); }
  .tp-actions > .ds-btn { flex: 1 1 0; }
  @media (min-width: 768px) { .tp-actions { justify-content: center; } .tp-actions > .ds-btn { flex: 0 0 auto; min-width: 160px; } }
  .tp-map { display: grid; place-items: center; min-height: 200px; border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-neutral); color: var(--ds-color-fg-neutral-subtle); }
`;

/* ===================================================================== 회원 */
const AUTH_CSS = AUTH.CSS + `
  .tp-auth__wrap { width: min(100%, 480px); }
  .tp-auth__card h2 { margin: 0; }
  .tp-terms { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-terms__row { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-terms__all { padding: var(--ds-space-x3) var(--ds-space-x4); border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-neutral); }
  .tp-inline { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ds-space-x2); align-items: center; }
  .tp-inline > .ds-btn { white-space: nowrap; }
  .tp-code { position: relative; }
  .tp-code .ds-timer { position: absolute; right: var(--ds-space-x4); top: 50%; translate: 0 -50%; color: var(--ds-color-fg-critical); font-size: var(--ds-font-size-t04); }
  .tp-sec-auth { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
`;
const code = (id) => `<div class="tp-code">${input(id, 'inputmode="numeric" placeholder="인증번호 6자리" maxlength="6"', { size: 'large' })}<time class="ds-timer" data-format="clock">2:59</time></div>`;

/* 1. 회원가입: 약관 동의 → 본인 인증 → 정보 입력을 한 장에. 필수와 선택을 글자로 나누고 항목마다 보기 */
const signup = () => {
  const term = (t, req, on) => `<div class="tp-terms__row">${checkbox(`${req ? '[필수]' : '[선택]'} ${t}`, { checked: on })}${link('보기')}</div>`;
  const body = `<main class="tp-auth"><div class="tp-auth__wrap">
  ${AUTH.brand}
  <div class="tp-auth__card">
    <h1 class="tp-h2">회원가입</h1>
    <section class="tp-sec-auth" aria-labelledby="su-t1"><h2 class="tp-h3" id="su-t1">약관 동의</h2>
      <div class="tp-terms"><div class="tp-terms__all">${checkbox('<b>전체 동의</b>', { checked: false })}</div>${term('이용약관', 1, 1)}${term('개인정보 수집과 이용', 1, 1)}${term('만 14세 이상', 1, 1)}${term('시험 소식과 혜택 받기', 0, 0)}</div>
    </section>
    ${divider()}
    <section class="tp-sec-auth" aria-labelledby="su-t2"><h2 class="tp-h3" id="su-t2">본인 인증</h2>
      ${field('su-tel', '휴대폰 번호', withBtn(lg('su-tel', '숫자만 입력', 'type="tel" value="01012345678"'), btn('다시 받기', { size: 'large' })))}
      ${field('su-code', '인증번호', withBtn(code('su-code'), btn('확인', { size: 'large', variant: 'neutralSolid' })))}
    </section>
    ${divider()}
    <section class="tp-sec-auth" aria-labelledby="su-t3"><h2 class="tp-h3" id="su-t3">정보 입력</h2>
      ${fieldErr('su-id', '아이디', withBtn(lg('su-id', '영문 소문자, 숫자 4~16자', 'value="ybm" aria-invalid="true" autocomplete="username"'), btn('중복 확인', { size: 'large' })), '이미 쓰고 있는 아이디예요')}
      ${field('su-pw', '비밀번호', lg('su-pw', '영문, 숫자, 특수문자 8~16자', 'type="password" autocomplete="new-password"'))}
      ${field('su-pw2', '비밀번호 확인', lg('su-pw2', '비밀번호 다시 입력', 'type="password" autocomplete="new-password"'))}
      ${field('su-name', '이름', lg('su-name', '이름', 'value="와이비엠" autocomplete="name"'))}
      ${field('su-birth', '생년월일', lg('su-birth', '8자리 숫자', 'inputmode="numeric" maxlength="8"'))}
      ${field('su-mail', '이메일', lg('su-mail', 'name@example.com', 'type="email" autocomplete="email"'))}
    </section>
    ${btn('가입하기', { variant: 'brandSolid', size: 'large', fill: true })}
    <p class="tp-sub tp-auth__foot">${link('로그인')}</p>
  </div>
</div></main>`;
  return { slug: 'signup', en: 'Sign Up', name: '회원가입', group: 'Account', desc: '약관 동의, 본인 인증, 정보 입력을 한 화면에서 마치는 회원가입 화면입니다.', css: AUTH_CSS, body };
};

/* 2. 아이디, 비밀번호 찾기: 두 기능을 탭으로 묶고, 이름과 휴대폰 인증으로 찾는다 */
const findAccount = () => {
  const body = `<main class="tp-auth"><div class="tp-auth__wrap">
  ${AUTH.brand}
  <div class="tp-auth__card">
    <h1 class="tp-sr">아이디, 비밀번호 찾기</h1>
    ${tabs(['아이디 찾기', '비밀번호 찾기'], 0, '찾을 것', { layout: 'fill' })}
    <div class="tp-auth__fields">
      ${field('fa-name', '이름', lg('fa-name', '이름', 'autocomplete="name"'))}
      ${field('fa-tel', '휴대폰 번호', withBtn(lg('fa-tel', '숫자만 입력', 'type="tel"'), btn('인증 요청', { size: 'large' })))}
      ${field('fa-code', '인증번호', code('fa-code'))}
    </div>
    ${btn('아이디 찾기', { variant: 'brandSolid', size: 'large', fill: true })}
    <div class="tp-or">또는</div>
    <div class="tp-auth__alt">${btn('이메일로 찾기', { variant: 'neutralOutline', size: 'large', fill: true, ic: 'mail' })}${btn('고객센터', { variant: 'neutralOutline', size: 'large', fill: true, ic: 'headset' })}</div>
    <p class="tp-sub tp-auth__foot">${link('로그인')}</p>
  </div>
</div></main>`;
  return { slug: 'find-account', en: 'Find Account', name: '아이디, 비밀번호 찾기', group: 'Account', desc: '이름과 휴대폰 인증으로 아이디를 찾거나 비밀번호를 다시 정하는 화면입니다.', css: AUTH_CSS + `.tp-auth__card { gap: var(--ds-space-x5); }`, body };
};

/* ===================================================================== 시험 */
// 바코드: 수험번호로 막대 폭을 정하는 장식 그림 (번호는 아래 글자로 다시 적는다)
const barcode = (num) => {
  let x = 0; const bars = [];
  for (const ch of (num + num).replace(/\D/g, '')) { const w = 1 + (Number(ch) % 3); bars.push(`<rect x="${x}" width="${w}" height="40"/>`); x += w + 1 + (Number(ch) % 2); }
  return `<svg class="tp-barcode" viewBox="0 0 ${x} 40" preserveAspectRatio="none" aria-hidden="true" fill="currentColor">${bars.join('')}</svg>`;
};

/* 3. 수험표: 수험번호를 가장 크게, 라벨 위 값 아래 정보 칸, 바코드 아래 번호, 고사장과 준비물 */
const ticket = () => {
  const NO = '1118-0427-0012';
  const css = CSS + `
  .tp-ticket { overflow: hidden; border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
  .tp-ticket__top { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); padding: var(--ds-space-x4) var(--ds-space-x5); background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); }
  .tp-ticket__top .tp-h3 { color: inherit; }
  .tp-ticket__body { display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: var(--ds-space-x5); padding: var(--ds-space-x5); }
  .tp-ticket__photo { display: grid; place-items: center; aspect-ratio: 3 / 4; border-radius: var(--ds-shape-md); background: var(--ds-color-bg-neutral); color: var(--ds-color-fg-neutral-subtle); }
  .tp-ticket__photo .ds-icon { --ds-icon-size: 32px; }
  .tp-ticket__no { white-space: nowrap; font-size: var(--ds-font-size-t07); line-height: var(--ds-line-height-t07); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  @media (min-width: 768px) { .tp-ticket__no { font-size: var(--ds-font-size-t09); line-height: var(--ds-line-height-t09); } }
  .tp-cells { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 0; box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 768px) { .tp-cells { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .tp-cells > div { display: flex; flex-direction: column; gap: var(--ds-space-x1); padding: var(--ds-space-x4) var(--ds-space-x5); }
  .tp-cells dt { color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); }
  .tp-cells dd { margin: 0; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-semibold); font-variant-numeric: tabular-nums; }
  .tp-ticket__code { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x2); padding: var(--ds-space-x5); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-barcode { width: min(100%, 280px); height: 48px; color: var(--ds-color-fg-neutral); }
`;
  const cells = [['시험일', '11월 18일 (수)'], ['입실 마감', '12:40'], ['고사장', '강남 시험장'], ['교실과 좌석', '302호 15번']];
  const body = app(EXAM_MENU, 3, `
<main class="tp-content">
  <div class="tp-nw">
    <div class="tp-between"><h1 class="tp-h1">수험표</h1><div class="tp-row">${btn('이미지 저장', { ic: 'download', size: 'medium' })}${btn('인쇄', { ic: 'printer', size: 'medium', variant: 'neutralSolid' })}</div></div>
    <article class="tp-ticket" aria-label="수험표">
      <div class="tp-ticket__top"><span class="tp-h3">영어 말하기 시험 / 제 112회</span>${badge('접수 완료', 'positive', true)}</div>
      <div class="tp-ticket__body">
        <div class="tp-ticket__photo" role="img" aria-label="응시자 사진">${icon('user')}</div>
        <div class="tp-stack" style="gap: var(--ds-space-x3)">
          <div class="tp-stack" style="gap: 0"><span class="tp-caption">수험 번호</span><span class="tp-ticket__no">${NO}</span></div>
          ${kvs([['이름', '와이비엠'], ['생년월일', T('2001.04.12')], ['시험 시간', T('13:00 ~ 14:20')]])}
        </div>
      </div>
      <dl class="tp-cells">${cells.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <div class="tp-ticket__code">${barcode(NO)}<span class="tp-caption tp-num">${NO}</span></div>
    </article>
    ${card(`${secHead('고사장', { tools: btn('길찾기', { ic: 'map-pin', size: 'small' }) })}<div class="tp-stack" style="gap: var(--ds-space-x1)"><span class="tp-item-title">강남 시험장</span><span class="tp-caption">서울 강남구 테헤란로 000, 3층</span></div><div class="tp-map" aria-hidden="true">${icon('map-pin', 'lg')}</div>`)}
    ${card(`${secHead('준비물')}${checks(['수험표', '신분증 (주민등록증, 운전면허증, 여권 중 하나)', '컴퓨터용 사인펜, 수정 테이프'])}`)}
  </div>
</main>`);
  return { slug: 'exam-ticket', en: 'Admission Ticket', name: '수험표', group: 'Exam', desc: '수험 번호, 시험 시간, 고사장과 좌석을 한 장에 모은 수험표 화면입니다. 화면으로 보거나 인쇄해 시험장에 가져갑니다.', css, body };
};

/* 4. 성적 조회(비회원): 수험 번호와 생년월일 두 칸으로 조회하고, 아래에 총점을 크게, 영역 점수와 회차 */
const scoreLookup = () => {
  const css = CSS + `
  .tp-lookup { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); align-items: end; }
  @media (min-width: 768px) { .tp-lookup { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto; } }
  .tp-score { display: flex; align-items: baseline; gap: var(--ds-space-x2); }
  .tp-score b { font-size: var(--ds-font-size-t13); line-height: var(--ds-line-height-t13); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .tp-parts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x4); }
`;
  const part = (name, v, max) => `<div class="tp-stack" style="gap: var(--ds-space-x2)"><div class="tp-between"><span class="tp-name">${name}</span><span class="tp-amount">${T(v)} <span class="tp-caption">/ ${max}</span></span></div>${K.progress(Math.round((v / max) * 100), { label: name })}</div>`;
  const rows = [['듣기', T('410'), T('상위 18%')], ['읽기', T('375'), T('상위 22%')]];
  const body = app(EXAM_MENU, 2, `
<main class="tp-content">
  <div class="tp-nw">
    <h1 class="tp-h1">성적 조회</h1>
    ${card(`<form class="tp-lookup" onsubmit="return false">${field('sl-no', '수험 번호', lg('sl-no', '숫자 12자리', 'inputmode="numeric" value="111804270012"'), { required: true })}${field('sl-birth', '생년월일', lg('sl-birth', '8자리 숫자', 'inputmode="numeric" value="20010412"'), { required: true })}${btn('조회하기', { variant: 'brandSolid', size: 'large' })}</form>`, { size: 'medium' })}
    <section class="tp-sec" aria-labelledby="sl-r">
      <div class="tp-between"><h2 class="tp-h2" id="sl-r">영어 읽기 듣기 시험</h2>${btn('성적표 인쇄', { ic: 'printer', size: 'small' })}</div>
      ${chiptabs(['제 112회 / 11.18', '제 110회 / 10.21', '제 108회 / 09.16'], 0, '회차')}
      ${card(`<div class="tp-between"><div class="tp-stack" style="gap: 0"><span class="tp-caption">총점</span><div class="tp-score"><b>785</b><span class="tp-caption">/ 990</span></div></div><div class="tp-meta"><span>와이*엠</span><span>2026.11.18 응시</span></div></div><div class="tp-parts">${part('듣기', 410, 495)}${part('읽기', 375, 495)}</div>`, { size: 'medium' })}
      ${table(['영역', ['점수', 'end'], ['백분위', 'end']], rows, { caption: '영역별 점수' })}
    </section>
  </div>
</main>`, guestEnd);
  return { slug: 'score-lookup', en: 'Score Lookup', name: '성적 조회', group: 'Exam', desc: '로그인하지 않고 수험 번호와 생년월일로 성적을 확인하는 화면입니다. 총점, 영역별 점수, 지난 회차를 함께 봅니다.', css, body };
};

/* 5. 접수 완료: DS Result 로 완료를 알리고, 접수, 결제, 다음 일정을 주제별 카드로 */
const applyDone = () => {
  const css = CSS + `
  .tp-done { width: min(100%, 560px); }
  .tp-done .ds-result { padding-block: var(--ds-space-x6) var(--ds-space-x2); }
  .tp-total { display: flex; align-items: baseline; justify-content: space-between; }
`;
  const body = app(EXAM_MENU, 1, `
<main class="tp-content">
  <div class="tp-nw tp-done">
    <section class="ds-result"><div class="ds-result__asset">${icon('circle-check-solid')}</div><div class="ds-result__texts"><h1 class="ds-result__title">접수 완료</h1></div><span class="tp-caption tp-num">접수 번호 20261118-0427</span></section>
    ${card(`<span class="tp-h3">접수 내용</span>${kvs([['시험', '영어 말하기 시험'], ['날짜', T('11월 18일 (수) 13:00')], ['고사장', '강남 시험장'], ['응시자', '와이비엠']])}`)}
    ${card(`<span class="tp-h3">결제</span>${kvs([['응시료', T('84,000원')], ['쿠폰 할인', T('-8,400원')], ['결제 수단', '카드 (일시불)']])}${divider()}<div class="tp-total"><span class="tp-name">결제 금액</span><span class="tp-amount">${T('75,600원')}</span></div>`)}
    ${card(`<span class="tp-h3">다음 일정</span>${kvs([['수험표 출력', T('11월 11일부터')], ['취소와 전액 환불', T('11월 14일까지')], ['성적 발표', T('12월 2일')]])}`)}
    <div class="tp-actions">${btn('내 시험', { size: 'large' })}${btn('수험표 보기', { variant: 'brandSolid', size: 'large' })}</div>
  </div>
</main>`);
  return { slug: 'exam-apply-done', en: 'Registration Complete', name: '접수 완료', group: 'Exam', desc: '결제를 마친 뒤 접수 번호와 접수, 결제 내용, 다음 일정을 보여 주는 화면입니다. 수험표와 내 시험으로 이어집니다.', css, body };
};

/* ===================================================================== 고객센터 */
const NOTICES = [
  ['시험', '12월 정기 시험 고사장 추가 안내', '2026.11.04', '3,120', 1, 1],
  ['시스템', '11월 15일 새벽 서비스 점검', '2026.11.03', '1,284', 1, 0],
  ['접수', '추가 접수 기간 안내 (제 113회)', '2026.11.01', '2,048', 0, 1],
  ['성적', '제 110회 성적 발표 일정', '2026.10.28', '4,512', 0, 0],
  ['시험', '신분증 인정 범위 변경', '2026.10.21', '6,033', 0, 0],
  ['접수', '단체 접수 할인 기준 변경', '2026.10.14', '982', 0, 0],
  ['시스템', '휴대폰 본인 인증 방식 추가', '2026.10.07', '1,107', 0, 0],
  ['성적', '성적표 우편 발송 종료', '2026.09.30', '2,566', 0, 0],
];

/* 6. 공지사항 목록: 분류 칩과 찾기, 고정 공지는 맨 위, 넓은 화면은 표, 좁은 화면은 두 줄 목록 */
const noticeList = () => {
  const css = CSS + `
  .tp-ntools { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  @media (min-width: 768px) { .tp-ntools { flex-direction: row; align-items: center; justify-content: space-between; } .tp-ntools .ds-input { width: 280px; flex: none; } }
  .tp-ntable { display: none; }
  .tp-nlist { display: flex; flex-direction: column; }
  @media (min-width: 768px) { .tp-ntable { display: block; } .tp-nlist { display: none; } }
  .tp-ntable td:nth-child(3) a { color: inherit; text-decoration: none; }
  .tp-ntitle { display: inline-flex; align-items: center; gap: var(--ds-space-x2); }
  .tp-nlist a { display: flex; flex-direction: column; gap: var(--ds-space-x1); padding-block: var(--ds-space-x4); color: inherit; text-decoration: none; }
  .tp-nlist a + a { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-pager { display: flex; justify-content: center; }
`;
  const title = ([, t, , , , n]) => `<span class="tp-ntitle">${t}${n ? badge('N', 'critical') : ''}</span>`;
  const rows = NOTICES.map((r, i) => [r[4] ? badge('공지', 'neutral', true) : T(String(128 - i)), r[0], `<a href="#">${title(r)}</a>`, T(r[2]), T(r[3])]);
  const body = app(MENU, 4, `
${head('공지사항')}
<main class="tp-content">
  <div class="tp-ntools">${chiptabs(['전체', '시험', '접수', '성적', '시스템'], 0, '공지 분류')}${search('nt-q', '공지 찾기')}</div>
  <span class="tp-caption">전체 ${T('128')}</span>
  ${table(['번호', '분류', '제목', '등록일', ['조회', 'end']], rows, { cls: 'tp-ntable', caption: '공지사항' })}
  <div class="tp-nlist">${NOTICES.map((r) => `<a href="#"><span class="tp-row">${r[4] ? badge('공지', 'neutral', true) : badge(r[0])}<span class="tp-item-title">${r[1]}</span></span><span class="tp-meta"><span>${r[0]}</span><span>${r[2]}</span><span>조회 ${r[3]}</span></span></a>`).join('')}</div>
  <div class="tp-pager">${pagination(1, 13)}</div>
</main>`);
  return { slug: 'notice-list', en: 'Notice List', name: '공지사항 목록', group: 'Support', desc: '분류와 찾기로 공지를 고르고 고정 공지를 맨 위에 두는 공지사항 목록입니다. 넓은 화면은 표, 좁은 화면은 두 줄 목록으로 보입니다.', css, body };
};

/* 7. 공지사항 상세: 분류와 제목, 등록일과 조회, 일정 요약, 본문, 첨부, 이전 글과 다음 글, 목록 */
const noticeDetail = () => {
  const css = CSS + `
  .tp-article { display: flex; flex-direction: column; gap: var(--ds-space-x4); font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); }
  .tp-article p { margin: 0; }
  .tp-files { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-file { display: flex; align-items: center; gap: var(--ds-space-x3); }
  .tp-file .tp-name { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tp-prevnext { display: flex; flex-direction: column; box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted), inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-prevnext a { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: var(--ds-space-x3); padding-block: var(--ds-space-x4); color: inherit; text-decoration: none; }
  .tp-prevnext a + a { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-prevnext .tp-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tp-center { display: flex; justify-content: center; }
`;
  const body = app(MENU, 4, `
<main class="tp-content">
  <article class="tp-nw">
    <header class="tp-stack" style="gap: var(--ds-space-x3)">${badge('시험')}<h1 class="tp-h1">12월 정기 시험 고사장 추가 안내</h1><div class="tp-meta"><span>2026.11.04</span><span>조회 3,120</span></div></header>
    ${divider()}
    ${card(`<div class="tp-between"><span class="tp-h3">추가 고사장 접수</span>${btn('알림 받기', { ic: 'bell', size: 'small' })}</div>${kvs([['접수', T('11월 10일 (월) 10:00 ~ 11월 14일 (금) 17:00')], ['시험', T('12월 14일 (일)')], ['대상', '제 113회 응시자']])}`)}
    <div class="tp-article">
      <p>12월 정기 시험 응시 인원이 늘어 서울과 부산에 고사장을 추가합니다. 이미 접수한 분은 내 시험에서 고사장을 바꿀 수 있습니다.</p>
      ${table(['지역', '고사장', ['추가 좌석', 'end']], [['서울', '종로 시험장', T('120석')], ['서울', '신촌 시험장', T('80석')], ['부산', '서면 시험장', T('100석')]], { caption: '추가 고사장' })}
      <p>고사장을 바꾸면 수험표가 새로 발급됩니다. 바꾼 뒤에는 새 수험표를 가져와야 합니다.</p>
    </div>
    <div class="tp-files">${[['추가 고사장 약도.pdf', '1.2MB'], ['고사장 변경 방법.pdf', '840KB']].map(([n, s]) => `<div class="tp-file">${icon('paperclip', 'sm')}<span class="tp-name">${n}</span><span class="tp-caption">${s}</span>${iconBtn('download', n + ' 받기', { size: 'xsmall' })}</div>`).join('')}</div>
    <nav class="tp-prevnext" aria-label="이전 글과 다음 글"><a href="#"><span class="tp-caption">이전 글</span><span class="tp-name">11월 15일 새벽 서비스 점검</span></a><a href="#"><span class="tp-caption">다음 글</span><span class="tp-name">추가 접수 기간 안내 (제 113회)</span></a></nav>
    <div class="tp-center">${btn('목록', { size: 'medium' })}</div>
  </article>
</main>`);
  return { slug: 'notice-detail', en: 'Notice Detail', name: '공지사항 상세', group: 'Support', desc: '공지 본문과 일정 요약, 첨부 파일, 이전 글과 다음 글을 보여 주는 공지사항 상세 화면입니다.', css, body };
};

/* 8. 자주 묻는 질문: 찾기와 분류를 한 판에, 많이 찾는 질문, 전체 목록(펼침), 옆에 문의 */
const faq = () => {
  const css = CSS + `
  .tp-fq-panel { display: flex; flex-direction: column; gap: var(--ds-space-x3); padding: var(--ds-space-x5); border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-neutral); }
  .tp-top5 { margin: 0; padding: 0; list-style: none; counter-reset: top; }
  .tp-top5 li { counter-increment: top; }
  .tp-top5 a { display: grid; grid-template-columns: var(--ds-space-x6) minmax(0, 1fr); gap: var(--ds-space-x3); padding-block: var(--ds-space-x3); color: inherit; text-decoration: none; }
  .tp-top5 li + li a { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-top5 a::before { content: counter(top); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; text-align: center; }
  .tp-tel { font-size: var(--ds-font-size-t09); line-height: var(--ds-line-height-t09); font-weight: var(--ds-font-weight-semibold); font-variant-numeric: tabular-nums; }
  .tp-helpful { display: flex; align-items: center; gap: var(--ds-space-x2); margin-top: var(--ds-space-x3); }
  .tp-pager { display: flex; justify-content: center; }
`;
  const helpful = `<div class="tp-helpful">${btn('도움이 됐어요', { ic: 'thumbs-up', size: 'xsmall' })}${btn('1:1 문의', { size: 'xsmall', variant: 'ghost' })}</div>`;
  const q = [
    ['[접수] 접수를 취소하면 응시료는 얼마나 돌려받나요?', `<p>접수 마감 전까지는 전액, 마감 뒤 시험 3일 전까지는 절반을 돌려받아요.</p>${helpful}`, true],
    ['[시험] 신분증을 잊었는데 응시할 수 있나요?', '<p>신분증이 없으면 응시할 수 없어요. 모바일 신분증은 인정돼요.</p>'],
    ['[성적] 성적표는 언제부터 출력할 수 있나요?', '<p>성적 발표일 낮 12시부터 내 시험에서 출력할 수 있어요.</p>'],
    ['[회원] 휴대폰 번호가 바뀌었어요', '<p>내 정보에서 새 번호로 인증하면 바뀌어요.</p>'],
    ['[결제와 환불] 카드 할부로 결제할 수 있나요?', '<p>5만 원 이상이면 2 ~ 6개월 할부를 고를 수 있어요.</p>'],
    ['[시험] 고사장을 바꾸고 싶어요', '<p>접수 마감 전까지 내 시험에서 남은 좌석이 있는 고사장으로 바꿀 수 있어요.</p>'],
  ];
  const body = app(MENU, 4, `
${head('자주 묻는 질문')}
<main class="tp-content">
  <div class="tp-two">
    <div class="tp-stack" style="gap: var(--ds-space-x8)">
      <div class="tp-fq-panel">${search('fq-q', '질문 찾기', 'large')}${chiptabs(['전체', '접수', '시험', '성적', '회원', '결제와 환불'], 0, '질문 분류')}</div>
      <section class="tp-sec">${secHead('많이 찾는 질문')}<ol class="tp-top5">${['접수 취소와 환불', '신분증 인정 범위', '성적표 출력', '고사장 변경', '수험표 다시 받기'].map((t) => `<li><a href="#"><span class="tp-name">${t}</span></a></li>`).join('')}</ol></section>
      <section class="tp-sec">${secHead(`전체 ${T('42')}`)}<div>${accordion(q)}</div><div class="tp-pager">${pagination(1, 5)}</div></section>
    </div>
    <aside class="tp-aside-sticky">
      ${card(`<span class="tp-h3">전화 상담</span><span class="tp-tel">1588-0000</span>${kvs([['평일', T('09:00 ~ 18:00')], ['점심', T('12:00 ~ 13:00')]])}${btn('1:1 문의', { variant: 'neutralSolid', size: 'medium', fill: true, ic: 'square-pen' })}`)}
    </aside>
  </div>
</main>`);
  return { slug: 'faq', en: 'FAQ', name: '자주 묻는 질문', group: 'Support', desc: '찾기와 분류로 질문을 고르고 많이 찾는 질문을 먼저 보여 주는 화면입니다. 답이 없으면 1:1 문의와 전화 상담으로 이어집니다.', css, body };
};

/* ===================================================================== 콘텐츠 */
/* 9. 서비스 메인: 큰 배너(쪽수, 멈춤), 바로 가기, 내 시험, 시험 일정, 공지, 추천 강의 */
const serviceHome = () => {
  const css = CSS + `
  .tp-hero { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); }
  @media (min-width: 1024px) { .tp-hero { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); } }
  .tp-banner { position: relative; overflow: hidden; border-radius: var(--ds-shape-xl); }
  .tp-banner .ds-imageframe { --ds-imageframe-ratio: 16 / 9; }
  @media (min-width: 1024px) { .tp-banner .ds-imageframe { --ds-imageframe-ratio: 21 / 9; } }
  .tp-banner__text { position: absolute; inset: auto var(--ds-space-x5) var(--ds-space-x5); display: flex; flex-direction: column; gap: var(--ds-space-x1); color: var(--ds-color-palette-static-white); }
  .tp-banner__text b { font-size: var(--ds-font-size-t09); line-height: var(--ds-line-height-t09); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .tp-banner::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, var(--ds-color-palette-static-black-alpha-600), transparent 60%); pointer-events: none; }
  .tp-banner__text, .tp-banner__ctrl { z-index: 1; }
  .tp-banner__ctrl { position: absolute; right: var(--ds-space-x4); top: var(--ds-space-x4); display: flex; align-items: center; gap: var(--ds-space-x1); padding: var(--ds-space-x1) var(--ds-space-x1) var(--ds-space-x1) var(--ds-space-x3); border-radius: var(--ds-shape-pill); background: var(--ds-color-palette-static-black-alpha-600); color: var(--ds-color-palette-static-white); font-size: var(--ds-font-size-t03); font-variant-numeric: tabular-nums; }
  .tp-banner__ctrl .ds-btn { --ds-btn-fg: var(--ds-color-palette-static-white); }
  .tp-side { display: none; }
  @media (min-width: 1024px) { .tp-side { display: flex; flex-direction: column; gap: var(--ds-space-x4); } }
  .tp-quick { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--ds-space-x4) var(--ds-space-x2); margin: 0; padding: 0; list-style: none; }
  @media (min-width: 768px) { .tp-quick { grid-template-columns: repeat(8, minmax(0, 1fr)); } }
  .tp-quick a { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x2); color: inherit; text-decoration: none; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); text-align: center; }
  .tp-quick span:first-child { display: grid; place-items: center; width: 52px; height: 52px; border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-neutral); }
  .tp-quick .ds-icon { --ds-icon-size: 24px; }
  .tp-g2 { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); }
  @media (min-width: 1024px) { .tp-g2 { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
  .tp-dday { display: inline-flex; align-self: flex-start; padding: 2px var(--ds-space-x2); border-radius: var(--ds-shape-sm); background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; }
  .tp-nrow { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); color: inherit; text-decoration: none; }
  .tp-nrow .tp-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tp-courses { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x6) var(--ds-space-x4); }
  @media (min-width: 1024px) { .tp-courses { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .tp-course { display: flex; flex-direction: column; gap: var(--ds-space-x2); color: inherit; text-decoration: none; }
  .tp-course .tp-item-title { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .tp-scroll-x .ds-table { min-width: 560px; }
`;
  const quick = [['시험 접수', 'square-pen'], ['수험표', 'id-card'], ['성적 조회', 'chart-column'], ['시험 일정', 'calendar-days'], ['고사장 찾기', 'map-pin'], ['강의', 'play'], ['교재', 'book-open'], ['고객센터', 'headset']];
  const sched = [['제 112회', T('10.20 ~ 11.07'), T('11.18 (수)'), T('12.02')], ['제 113회', T('11.10 ~ 11.28'), T('12.14 (일)'), T('12.26')], ['제 114회', T('12.01 ~ 12.19'), T('01.11 (일)'), T('01.23')]];
  const courses = [['study', 0, '처음 보는 듣기 시험 4주 완성', '와이비엠 강사'], ['book', 1, '읽기 파트 문법 핵심 정리', '한빛 강사'], ['study', 3, '말하기 시험 답변 틀 만들기', '와이비엠 강사'], ['work', 2, '실전 모의고사 10회분 풀이', '한빛 강사']];
  const body = app(MENU, -1, `
<main class="tp-content">
  <h1 class="tp-sr">서비스 메인</h1>
  <div class="tp-hero">
    <section class="tp-banner" aria-roledescription="carousel" aria-label="주요 소식">${thumb('16:9', '', photo('study', 11, 1400), 'none')}<div class="tp-banner__text"><b>12월 정기 시험 접수 시작</b><span>11월 28일까지</span></div><div class="tp-banner__ctrl"><span>01 / 05</span>${iconBtn('pause', '자동 넘김 멈춤', { size: 'xsmall' })}</div></section>
    <div class="tp-side">
      ${card(`<span class="tp-dday">D-7</span><span class="tp-item-title">영어 말하기 시험</span>${kvs([['날짜', T('11월 18일 (수) 13:00')], ['고사장', '강남 시험장']])}${btn('수험표 보기', { variant: 'neutralSolid', size: 'medium', fill: true })}`)}
      ${card(`<span class="tp-item-title">성적 발표</span>${kvs([['제 110회', T('11월 4일')]])}${btn('성적 확인', { size: 'medium', fill: true })}`)}
    </div>
  </div>
  <nav aria-label="바로 가기"><ul class="tp-quick">${quick.map(([t, ic]) => `<li><a href="#"><span>${icon(ic)}</span><span>${t}</span></a></li>`).join('')}</ul></nav>
  <div class="tp-g2">
    <section class="tp-sec">${secHead('시험 일정', { tools: link('전체 일정') })}<div class="tp-scroll-x">${table(['회차', '접수 기간', '시험일', ['성적 발표', 'end']], sched.map((r) => [r[0], r[1], r[2], r[3]]), { caption: '시험 일정' })}</div></section>
    <section class="tp-sec">${secHead('공지', { tools: link('전체 보기') })}${chiptabs(['전체', '시험', '접수', '성적'], 0, '공지 분류')}<div class="tp-rows">${NOTICES.slice(0, 5).map((r) => `<a class="tp-nrow" href="#"><span class="tp-name">${r[1]}</span><span class="tp-caption tp-num">${r[2].slice(5)}</span></a>`).join('')}</div></section>
  </div>
  <section class="tp-sec">${secHead('추천 강의', { tools: link('더 보기') })}<div class="tp-courses">${courses.map(([th, i, t, who]) => `<a class="tp-course" href="#">${thumb('16:9', '', photo(th, i, 480), 'md')}<span class="tp-item-title">${t}</span><span class="tp-caption">${who}</span></a>`).join('')}</div></section>
</main>`);
  return { slug: 'service-home', en: 'Service Home', name: '서비스 메인', group: 'Content', desc: '큰 배너, 바로 가기, 내 시험, 시험 일정, 공지, 추천 강의를 모은 서비스 첫 화면입니다.', css, body };
};

/* 10. 이벤트 페이지: 이벤트 탭, 제목과 기간, 큰 혜택, 응모, 혜택 카드(EVENT 1, 2), 참여 방법, 조건 표, 유의사항 */
const eventPage = () => {
  const css = CSS + `
  .tp-ev-hero { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x4); padding: var(--ds-space-x10) var(--ds-space-x5); border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-neutral); text-align: center; }
  .tp-ev-hero b { font-size: var(--ds-font-size-t13); line-height: var(--ds-line-height-t13); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .tp-ev-hero .ds-btn { width: min(100%, 320px); }
  .tp-ev-cards { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); }
  @media (min-width: 768px) { .tp-ev-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .tp-ev-card { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-ev-card .ds-badge { align-self: flex-start; }
  .tp-ev-card .ds-btn { margin-top: auto; }
  .tp-ev-steps { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); margin: 0; padding: 0; list-style: none; counter-reset: st; }
  @media (min-width: 768px) { .tp-ev-steps { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .tp-ev-steps li { display: flex; align-items: center; gap: var(--ds-space-x3); padding: var(--ds-space-x4); border-radius: var(--ds-shape-lg); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); counter-increment: st; }
  .tp-ev-steps li::before { content: counter(st); display: grid; place-items: center; flex: none; width: 28px; height: 28px; border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-bold); }
  .tp-ev-terms { margin: 0; padding: var(--ds-space-x5) var(--ds-space-x5) var(--ds-space-x5) var(--ds-space-x10); border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-neutral); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-ev-terms li + li { margin-top: var(--ds-space-x1_5); }
  .tp-center { display: flex; justify-content: center; }
  .tp-center .ds-btn { width: min(100%, 320px); }
`;
  const evCard = (n, title, value, rows) => card(`${badge(`EVENT ${n}`, 'neutral', true)}<span class="tp-item-title">${title}</span><span class="tp-mid">${value}</span>${kvs(rows)}${btn('쿠폰 받기', { size: 'medium', fill: true })}`, { cls: 'tp-ev-card', size: 'medium' });
  const body = app(MENU, -1, `
<main class="tp-content">
  <div class="tp-nw">
    ${chiptabs(['진행 중', '종료', '당첨자 발표'], 0, '이벤트')}
    <header class="tp-between"><div class="tp-stack" style="gap: var(--ds-space-x2)"><h1 class="tp-h1">첫 응시 응원 이벤트</h1><div class="tp-meta"><span>2026.11.10 ~ 2026.12.31</span></div></div>${iconBtn('share', '공유', { size: 'small' })}</header>
    <section class="tp-ev-hero" aria-label="혜택">${badge('첫 응시', 'neutral')}<b>응시료 10% 할인</b>${btn('응모하기', { variant: 'brandSolid', size: 'large' })}</section>
    <section class="tp-sec">${secHead('혜택')}<div class="tp-ev-cards">${evCard(1, '응시료 할인 쿠폰', '10%', [['대상', '처음 응시하는 회원'], ['사용', T('12월 31일까지')]])}${evCard(2, '교재 할인 쿠폰', T('5,000원'), [['대상', '응모한 회원 모두'], ['사용', T('2만 원 이상 주문')]])}</div></section>
    <section class="tp-sec">${secHead('참여 방법')}<ol class="tp-ev-steps"><li><span class="tp-name">응모하기</span></li><li><span class="tp-name">시험 접수</span></li><li><span class="tp-name">쿠폰 받기</span></li></ol></section>
    <section class="tp-sec">${secHead('이벤트 정보')}${card(kvs([['기간', T('2026.11.10 ~ 2026.12.31')], ['발표', T('2027.01.08')], ['대상', '처음 응시하는 회원'], ['혜택', '응시료 10% 할인, 교재 5,000원 할인']]))}</section>
    <div class="tp-center">${btn('응모하기', { variant: 'brandSolid', size: 'large' })}</div>
    <section class="tp-sec">${secHead('유의사항')}<ul class="tp-ev-terms"><li>쿠폰은 한 사람이 한 번만 받을 수 있어요.</li><li>다른 할인 쿠폰과 함께 쓸 수 없어요.</li><li>접수를 취소하면 쓴 쿠폰은 돌려받지 못해요.</li></ul></section>
  </div>
</main>`);
  return { slug: 'event-page', en: 'Event Page', name: '이벤트 페이지', group: 'Content', desc: '혜택, 참여 방법, 이벤트 정보, 유의사항을 한 장에 모은 이벤트 화면입니다. 응모 버튼을 위와 아래에 둡니다.', css, body };
};

export const templates = [signup, findAccount, ticket, scoreLookup, applyDone, noticeList, noticeDetail, faq, serviceHome, eventPage].map((f) => f());
