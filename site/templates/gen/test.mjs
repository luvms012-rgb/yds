// 온라인 평가 템플릿 (2026-11-11 사용자 "레벨 테스트와 온라인 시험 테스트"): 학원 레벨 테스트(Exam, 11-11 학습에서 옮김), 모의고사 PBT 형, 모의고사 CBT 형(Exam).
// 시험 이름은 특정 시험이 아닌 일반 이름을 쓴다. 문항 글은 내용 영역(tp-ex)이라 stripCopy 가 건드리지 않는다.
import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar, selectbox, tags } from './frame.mjs';
const { icon, btn, iconBtn, badge, card, divider, chip, chiptabs, segmented, progress, ring, callout, dot, link, thumb, photo, esc } = K;

const CSS = FRAME_CSS + `
  /* 평가 화면 공통: 위 막대에 제목, 남은 시간, 나가기 */
  .tp-exam-title { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-semibold); white-space: nowrap; }
  .ds-topnav .tp-stack:has(> .tp-exam-title) { flex: 1 1 auto; min-width: 0; }
  .tp-stack:has(> .tp-exam-title) > * { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }  /* 11-11 모바일: 부제가 세로로 꺾이지 않게 한 줄 말줄임 */
  .tp-timer { display: inline-flex; align-items: center; gap: var(--ds-space-x1_5); padding: 0 var(--ds-space-x3); height: 32px; border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-neutral-weak-alpha); }
  .tp-timer .ds-timer { color: var(--ds-color-fg-neutral); font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-semibold); }
  .tp-timer[data-urgent] { background: var(--ds-color-bg-critical-weak); } .tp-timer[data-urgent] .ds-timer, .tp-timer[data-urgent] .ds-icon { color: var(--ds-color-fg-critical); }
  /* 문항 */
  .tp-q { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
  .tp-q__head { display: flex; align-items: center; gap: var(--ds-space-x2); }
  .tp-q__no { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; }
  .tp-q__text { font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); font-weight: var(--ds-font-weight-medium); }
  .tp-q__text b { padding: 0 var(--ds-space-x1); border-radius: var(--ds-shape-xs); background: var(--ds-color-bg-neutral-weak-alpha); font-weight: inherit; }
  .tp-q .ds-selectbox-group { --ds-selectbox-columns: 1; }
  /* 듣기 재생 줄 */
  .tp-audio { display: flex; align-items: center; gap: var(--ds-space-x3); padding: var(--ds-space-x3) var(--ds-space-x4); border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-neutral); }
  .tp-audio .ds-progress { flex: 1 1 auto; }
  .tp-audio .ds-timer { flex: none; color: var(--ds-color-fg-neutral-muted); white-space: nowrap; }
  /* 아래 고정 이동 막대 */
  .tp-navbar { position: sticky; bottom: 0; z-index: var(--ds-z-sticky); display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); margin-inline: calc(var(--tp-gutter) * -1); padding: var(--ds-space-x3) var(--tp-gutter); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-navbar > .tp-row { flex-wrap: nowrap; }
`;

const examBar = (title, { sub = '', time = '0:00', urgent = false, end = '' } = {}) => topbar([], -1, time === null ? end : `<div class="tp-row" style="gap: var(--ds-space-x3)"><span class="tp-timer"${urgent ? ' data-urgent' : ''}>${icon('clock', 'sm')}<time class="ds-timer" aria-label="남은 시간">${time}</time></span>${end || btn('나가기', { size: 'small' })}</div>`).replace('<span class="tp-logo">로고</span>', `<span class="tp-logo">로고</span>`).replace('<nav class="ds-topnav__menu" aria-label="주요 메뉴"></nav>', `<div class="tp-stack" style="gap:0"><span class="tp-exam-title">${title}</span>${sub ? `<span class="tp-caption">${sub}</span>` : ''}</div>`);
const audio = (cur, total, pct) => `<div class="tp-audio">${iconBtn('play', '다시 듣기', { variant: 'neutralSolid', size: 'small' })}${progress(pct, { tone: 'neutral', label: '재생 위치' })}<time class="ds-timer tp-num">${cur} / ${total}</time></div>`;

/* 1. 레벨 테스트 (2026-11-11 사용자 "UI 고도화", 모바일 레벨 테스트 흐름을 참고해 다시 짬) -------------
   사이트 머리 없이 문항에만 집중하는 전체 화면. 위 막대: 닫기(왼쪽), 영역 Stepper(가운데), 문항 수(오른쪽), 아래에 얇은 진행 막대.
   가운데: 지시문(핵심 말 굵게), 듣기 카드(큰 재생 버튼), 답 Select Box 한 줄씩. 답을 고르면 바로 다음 문항으로 넘어가 다음 버튼이 없다.
   맨 아래 가운데 모르겠어요(ghost). 시간 제한 없음. */
const levelTest = () => {
  const css = CSS + `
  .tp-lt__bar { position: sticky; top: 0; z-index: var(--ds-z-sticky); background: var(--ds-color-bg-layer-default); }
  .tp-lt__barin { box-sizing: border-box; display: grid; grid-template-columns: 48px minmax(0, 1fr) 48px; align-items: center; gap: var(--ds-space-x2); width: min(100%, var(--tp-page-box)); margin-inline: auto; padding: var(--ds-space-x3) var(--tp-gutter); }
  .tp-lt__bar .ds-stepper { justify-self: center; width: min(100%, 400px); }
  .tp-lt__count { justify-self: end; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-weight: var(--ds-font-weight-medium); font-variant-numeric: tabular-nums; white-space: nowrap; }
  .tp-lt__bar .ds-progress { border-radius: 0; }
  .tp-lt { box-sizing: border-box; display: flex; flex: 1 1 auto; flex-direction: column; align-items: stretch; gap: var(--ds-space-x6); width: min(100%, calc(560px + 2 * var(--tp-gutter))); margin-inline: auto; padding: var(--ds-space-x8) var(--tp-gutter) var(--ds-space-x6); }
  .tp-lt__q { display: flex; flex-direction: column; gap: var(--ds-space-x6); }
  .tp-lt__q h1 { margin: 0; text-align: center; font-size: var(--ds-font-size-t07); line-height: var(--ds-line-height-t07); font-weight: var(--ds-font-weight-medium); color: var(--ds-color-fg-neutral); text-wrap: balance; }
  .tp-lt__q h1 b { font-weight: var(--ds-font-weight-bold); }
  /* 듣기 플레이어(2026-11-11 사용자 "성의 없어 보임", 음성 기록, 음악 재생 화면 참고): 소리 파형(들은 곳 brand), 양끝 시간, 가운데 재생 묶음(다시 듣기, 일시 정지, 속도) */
  .tp-lt__media { display: flex; flex-direction: column; gap: var(--ds-space-x4); padding: var(--ds-space-x6) var(--ds-space-x5) var(--ds-space-x5); border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
  .tp-lt__wave { display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .tp-lt__wave > i { flex: 0 0 4px; height: var(--h); border-radius: var(--ds-shape-pill); background: var(--ds-color-stroke-neutral-weak); }
  .tp-lt__wave > i[data-on] { background: var(--ds-color-bg-brand-solid); }
  .tp-lt__wave > i[data-head] { position: relative; }
  .tp-lt__wave > i[data-head]::after { content: ""; position: absolute; left: 50%; top: 50%; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-brand-solid); box-shadow: 0 0 0 3px var(--ds-color-bg-layer-default); }
  .tp-lt__time { display: flex; justify-content: space-between; margin-top: calc(var(--ds-space-x2) * -1); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); }
  .tp-lt__time time:first-child { color: var(--ds-color-fg-brand); font-weight: var(--ds-font-weight-semibold); }
  .tp-lt__ctrl { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--ds-space-x4); }
  .tp-lt__ctrl > :first-child { justify-self: end; } .tp-lt__ctrl > :last-child { justify-self: start; }
  .tp-lt__play { --ds-btn-height: 64px; --ds-btn-radius: var(--ds-shape-pill); --ds-btn-icon-only: 28px; }
  .tp-lt .ds-selectbox-group { --ds-selectbox-columns: 1; }
  .tp-lt .ds-selectbox { min-height: 56px; }
  .tp-lt .ds-selectbox__label { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); }
  .tp-lt__skip { display: flex; justify-content: center; margin-top: auto; padding-top: var(--ds-space-x4); }
  @media (min-width: 768px) { .tp-lt { padding-top: var(--ds-space-x14); gap: var(--ds-space-x8); } .tp-lt__q h1 { font-size: var(--ds-font-size-t08); line-height: var(--ds-line-height-t08); } }
`;
  const steps = [["어휘", "complete"], ["문법", "complete"], ["듣기", "current"], ["말하기", ""]];
  const stepper = `<ol class="ds-stepper" aria-label="테스트 영역">${steps.map(([l, st]) => `<li class="ds-stepper__step"${st ? ` data-state="${st}"` : ""}${st === "current" ? ` aria-current="step"` : ""}><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">${l}</span></li>`).join("")}</ol>`;
  const choices = selectbox("lt-q", [["회의 자료를 인쇄한다"], ["회의실을 예약한다"], ["동료에게 전화한다"], ["점심을 주문한다"]], -1).replace("<div class=\"ds-selectbox-group\">", "<div class=\"ds-selectbox-group\" role=\"radiogroup\" aria-labelledby=\"lt-q\">");
  const play = iconBtn("pause", "일시 정지", { variant: "brandSolid", size: "large" }).replace('class="ds-btn"', 'class="ds-btn tp-lt__play"');
  // 소리 파형 막대 44개(말소리처럼 크고 작게), 37% 지점까지 들음
  const BARS = 44, HEAD = Math.round(BARS * 0.37);
  const wave = Array.from({ length: BARS }, (_, i) => { const h = 18 + Math.round(Math.abs(Math.sin(i * 0.9) * 0.6 + Math.sin(i * 0.37 + 1) * 0.4) * 82); return `<i style="--h:${Math.min(100, h)}%"${i < HEAD ? " data-on" : ""}${i === HEAD - 1 ? " data-head" : ""}></i>`; }).join("");
  const player = `<div class="tp-lt__media" role="group" aria-label="대화 음성">
      <div class="tp-lt__wave" role="slider" tabindex="0" aria-label="재생 위치" aria-valuemin="0" aria-valuemax="38" aria-valuenow="14" aria-valuetext="0분 14초">${wave}</div>
      <div class="tp-lt__time tp-num"><time>0:14</time><time>0:38</time></div>
      <div class="tp-lt__ctrl">${iconBtn("rotate-ccw", "처음부터 다시 듣기", { variant: "neutralWeak", size: "medium" })}${play}${btn("1.0x", { variant: "neutralWeak", size: "medium", aria: "재생 속도" })}</div>
    </div>`;
  const body = `<div class="tp-app">
<header class="tp-lt__bar"><div class="tp-lt__barin">${iconBtn("x", "테스트 나가기", { size: "medium" })}${stepper}<span class="tp-lt__count" aria-label="듣기 8문항 중 2번째">2 / 8</span></div>${progress(25, { label: "듣기 진행" })}</header>
<main class="tp-lt tp-ex">
  <section class="tp-lt__q" aria-labelledby="lt-q">
    <h1 id="lt-q">대화를 듣고 <b>여자가 다음에 할 일</b>을 고르세요</h1>
    ${player}
    ${choices}
  </section>
  <div class="tp-lt__skip">${btn("모르겠어요", { variant: "ghost", size: "medium" })}</div>
</main></div>`;
  return { slug: "level-test", en: "Level Test", name: "레벨 테스트", group: "Exam", desc: "과정에 들어가기 전 수준을 재는 온라인 테스트 화면입니다. 위에서 지금 영역과 진행을 보여 주고, 한 번에 한 문항만 풀며, 답을 고르면 바로 다음 문항으로 넘어갑니다.", css, body };
};

/* 2. 모의고사 PBT 형 (지문 + 문항 + 답안지) ------------------------------- */
const mockPbt = () => {
  const css = CSS + `
  .tp-pbt { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); align-items: start; }
  @media (min-width: 1024px) { .tp-pbt { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); } .tp-pbt__sheet { grid-column: 1 / -1; } .tp-pbt__sheet .tp-omr { grid-template-columns: repeat(auto-fill, minmax(36px, 1fr)); } }
  @media (min-width: 1280px) { .tp-pbt { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) 300px; } .tp-pbt__sheet { grid-column: auto; position: sticky; top: calc(var(--ds-space-x16) + var(--ds-space-x4)); } }
  .tp-passage { font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t06); color: var(--ds-color-fg-neutral); }
  .tp-passage p + p { margin-top: var(--ds-space-x3); }
  .tp-passage .tp-h4 { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); }
  .tp-pbt__q + .tp-pbt__q { padding-top: var(--ds-space-x5); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-pbt__q { display: flex; flex-direction: column; gap: var(--ds-space-x3); padding-bottom: var(--ds-space-x5); }
  .tp-pbt__q:last-child { padding-bottom: 0; }
  .tp-pbt__q .tp-q__text { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); }
  .tp-opts { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x1); }
  .tp-opt { display: flex; align-items: center; gap: var(--ds-space-x3); min-height: 40px; padding: 0 var(--ds-space-x3); border-radius: var(--ds-shape-md); cursor: pointer; }
  .tp-opt:hover { background: var(--ds-color-bg-neutral-weak-alpha); }
  .tp-opt__key { display: inline-grid; place-items: center; flex: none; width: 24px; height: 24px; border-radius: var(--ds-shape-pill); box-shadow: inset 0 0 0 1.5px var(--ds-color-stroke-neutral); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-semibold); }
  .tp-opt:has(:checked) .tp-opt__key { background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); box-shadow: none; }
  .tp-opt:has(:checked) { background: var(--ds-color-bg-neutral-weak-alpha); }
  .tp-opt input { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); }
  /* 답안지: 번호 칸, 답한 번호는 채움, 지금 문항은 테두리, 표시한 문항은 점 */
  .tp-omr { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: var(--ds-space-x1); }
  .tp-omr > button { position: relative; display: grid; place-items: center; height: 32px; padding: 0; border: 0; border-radius: var(--ds-shape-sm); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); color: var(--ds-color-fg-neutral-subtle); font: inherit; font-size: var(--ds-font-size-t02); font-variant-numeric: tabular-nums; cursor: pointer; }
  .tp-omr > button[data-done] { background: var(--ds-color-bg-neutral); box-shadow: none; color: var(--ds-color-fg-neutral); }
  /* 상태는 모두 솔리드 채움 하나로 (11-11 사용자): 답함 neutral, 지금 brand, 다시 보기 warning. 범례도 같은 색의 원 */
  .tp-omr > button[data-flag] { background: var(--ds-color-bg-warning-weak); box-shadow: none; color: var(--ds-color-fg-warning); }
  .tp-omr > button[aria-current] { background: var(--ds-color-bg-brand-solid); box-shadow: none; color: var(--ds-color-fg-on-brand-solid); }
  .tp-omr-legend { display: flex; flex-wrap: wrap; gap: var(--ds-space-x3); }
  .tp-omr-legend > span { display: inline-flex; align-items: center; gap: var(--ds-space-x1_5); font-size: var(--ds-font-size-t03); color: var(--ds-color-fg-neutral-muted); }
  .tp-omr-legend i { width: 10px; height: 10px; border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
  .tp-omr-legend i[data-done] { background: var(--ds-color-bg-neutral); box-shadow: none; } .tp-omr-legend i[data-cur] { background: var(--ds-color-bg-brand-solid); box-shadow: none; } .tp-omr-legend i[data-flag] { background: var(--ds-color-bg-warning-weak); box-shadow: none; }
  .tp-topbar ~ .tp-content > .tp-pbt { width: 100%; }
`;
  const q = (no, text, opts, cur = -1, flag = false) => `<div class="tp-pbt__q" id="q${no}"><div class="tp-q__head"><span class="tp-q__no">${no}.</span>${flag ? badge('표시', 'warning') : ''}<span style="flex:1"></span>${iconBtn('flag', '나중에 다시 보기', { size: 'xsmall' })}</div><p class="tp-q__text">${text}</p><div class="tp-opts" role="radiogroup" aria-label="${no}번 답">${opts.map((o, i) => `<label class="tp-opt"><input type="radio" name="q${no}"${i === cur ? ' checked' : ''}><span class="tp-opt__key">${'ABCD'[i]}</span><span>${o}</span></label>`).join('')}</div></div>`;
  const done = new Set([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160]);
  const flags = new Set([118, 127, 149]);
  const omr = (from, to, cur) => `<div class="tp-omr" role="group" aria-label="${from}번부터 ${to}번">${Array.from({ length: to - from + 1 }, (_, i) => { const n = from + i; return `<button type="button"${done.has(n) ? ' data-done' : ''}${n === cur ? ' aria-current="true"' : ''}${flags.has(n) ? ' data-flag' : ''} aria-label="${n}번${done.has(n) ? ' 답함' : ''}">${n}</button>`; }).join('')}</div>`;
  const body = `<div class="tp-app">${examBar('영어 읽기 듣기 모의고사', { sub: '읽기 / 100문항 75분', time: '41:08', end: btn('답안 제출', { variant: 'brandSolid', size: 'small' }) })}<main class="tp-content tp-ex">
  <div class="tp-between">${chiptabs(['Part 5', 'Part 6', 'Part 7'], 2, '영역')}<div class="tp-row"><span class="tp-caption">답한 문항</span><span class="tp-amount">60 <span class="tp-caption" style="font-weight: var(--ds-font-weight-regular)">/ 100</span></span></div></div>
  <div class="tp-pbt">
    ${card(`<div class="tp-between"><span class="tp-h3">지문 161 ~ 164</span>${tags(['이메일'], 't4')}</div><div class="tp-passage">
      <p class="tp-h4">To: All staff<br>From: Facilities Team<br>Subject: Parking lot resurfacing</p>
      <p>Please be advised that the north parking lot will be closed from Monday, March 3, through Friday, March 7, while the surface is repaired and new lines are painted. During this period, employees who normally park in the north lot may use the visitor lot behind Building C or the public garage on Pine Street.</p>
      <p>Parking passes for the public garage will be available at the front desk starting Thursday, February 27. Passes are limited, so please request one only if you have no other option. Employees who carpool or use public transportation during the closure will receive a transit voucher.</p>
      <p>We apologize for the inconvenience and appreciate your cooperation. Questions may be directed to the Facilities Team at extension 4120.</p>
    </div>`, { size: 'medium' })}
    ${card(`<div class="tp-stack" style="gap:0">
      ${q(161, 'What is the purpose of the e-mail?', ['To announce a change in office hours', 'To inform staff about a temporary closure', 'To request volunteers for a project', 'To introduce a new parking policy'], 1)}
      ${q(162, 'According to the e-mail, what will happen on February 27?', ['Repairs will begin.', 'A meeting will be held.', 'Passes will become available.', 'A new building will open.'], -1, true)}
      ${q(163, 'What is suggested about the parking passes?', ['They are free for all employees.', 'They must be returned by March 7.', 'They can be picked up in Building C.', 'There are not enough for everyone.'], -1)}
      ${q(164, 'Who is eligible for a transit voucher?', ['Employees who work on Pine Street', 'Employees who share rides or take public transit', 'Employees who park in the visitor lot', 'Employees who contact extension 4120'], -1)}
    </div>`, { size: 'medium' })}
    <aside class="tp-pbt__sheet">${card(`<div class="tp-between"><span class="tp-h3">답안지</span>${segmented(['읽기', '듣기'], 0, '영역', 'small')}</div>
      <div class="tp-stack" style="gap: var(--ds-space-x3)"><span class="tp-h4">Part 5</span>${omr(101, 130, 0)}<span class="tp-h4">Part 6</span>${omr(131, 146, 0)}<span class="tp-h4">Part 7</span>${omr(147, 200, 161)}</div>
      ${divider()}<div class="tp-omr-legend"><span><i data-done></i>답함</span><span><i></i>안 함</span><span><i data-cur></i>지금</span><span><i data-flag></i>다시 보기</span></div>`, { size: 'medium' })}</aside>
  </div>
  <div class="tp-navbar"><div class="tp-row">${btn('이전 지문', { variant: 'neutralWeak', ic: 'chevron-left' })}</div><div class="tp-row">${btn('다음 지문', { variant: 'brandSolid', icEnd: 'chevron-right' })}</div></div>
</main></div>`;
  return { slug: 'mock-exam-pbt', en: 'Mock Exam PBT', name: '모의고사 PBT', group: 'Exam', desc: '종이 시험을 온라인으로 옮긴 모의고사 화면입니다. 지문과 문항을 나란히 두고, 옆 답안지에서 푼 문항과 다시 볼 문항을 한눈에 봅니다.', css, body };
};

/* 3. 모의고사 CBT 형 (말하기, 한 문항씩 준비 시간과 답변 시간) ------------- */
const mockCbt = () => {
  const css = CSS + `
  .tp-cbt { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); width: min(100%, var(--tp-page)); margin-inline: auto; align-items: start; }
  @media (min-width: 1024px) { .tp-cbt { grid-template-columns: minmax(0, 1fr) 320px; } }
  .tp-cbt__stage { display: flex; flex-direction: column; gap: var(--ds-space-x5); }
  .tp-cbt__pic { width: min(100%, 560px); margin-inline: auto; }
  .tp-cbt__prompt { font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); font-weight: var(--ds-font-weight-medium); text-align: center; }
  .tp-cbt__clock { display: grid; place-items: center; gap: var(--ds-space-x1); text-align: center; }  /* 11-11 사용자 "너무 커": DS 기본 56 원 그대로 */
  .tp-cbt__clock .ds-timer { font-size: var(--ds-font-size-t07); line-height: var(--ds-line-height-t07); font-weight: var(--ds-font-weight-bold); color: var(--ds-color-fg-neutral); letter-spacing: -0.02em; }
  /* 녹음 막대 (11-11 사용자, UI 패턴의 음성 기록 서비스 녹음 막대 참고): 상태, 음량, 시간, 끝내기를 진한 막대 한 줄에 */
  .tp-recbar { display: flex; align-items: center; gap: var(--ds-space-x4); padding: var(--ds-space-x3) var(--ds-space-x3) var(--ds-space-x3) var(--ds-space-x5); border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); }
  .tp-recbar__state { display: flex; align-items: center; gap: var(--ds-space-x2); flex: none; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-weight: var(--ds-font-weight-medium); white-space: nowrap; }
  .tp-recbar__state .ds-statusdot { background: var(--ds-color-bg-critical-solid); }
  .tp-recbar__time { flex: none; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-semibold); font-variant-numeric: tabular-nums; white-space: nowrap; }
  .tp-recbar__time span { color: var(--ds-color-palette-static-white-alpha-500); font-weight: var(--ds-font-weight-regular); }
  .tp-recbar .ds-btn[data-variant="neutralWeak"] { --ds-btn-bg: var(--ds-color-palette-static-white-alpha-200); --ds-btn-fg: var(--ds-color-palette-static-white); }
  .tp-level { display: flex; flex: 1 1 auto; align-items: center; gap: 3px; height: 28px; min-width: 80px; }
  .tp-level > i { flex: none; width: 4px; height: var(--h, 30%); border-radius: 2px; background: var(--ds-color-palette-static-white-alpha-300); }
  .tp-level > i[data-on] { background: var(--ds-color-palette-static-white); }
  @media (max-width: 767px) { .tp-recbar { flex-wrap: wrap; } .tp-level { order: 3; flex: 1 0 100%; } }
  .tp-cbt__qs { display: grid; grid-template-columns: repeat(auto-fill, minmax(36px, 1fr)); gap: var(--ds-space-x1); }
  .tp-cbt__qs > span { display: grid; place-items: center; height: 32px; border-radius: var(--ds-shape-sm); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t03); font-variant-numeric: tabular-nums; }
  .tp-cbt__qs > span[data-done] { background: var(--ds-color-bg-neutral); box-shadow: none; color: var(--ds-color-fg-neutral); }
  .tp-cbt__qs > span[aria-current] { background: var(--ds-color-bg-brand-solid); box-shadow: none; color: var(--ds-color-fg-on-brand-solid); }
  .tp-topbar ~ .tp-content > .tp-cbt { width: 100%; }
`;
  const parts = [['Part 1', '지문 읽기', 2, true], ['Part 2', '사진 묘사', 2, true], ['Part 3', '질문에 답하기', 3, false], ['Part 4', '자료 보고 답하기', 3, false], ['Part 5', '의견 말하기', 1, false]];
  const body = `<div class="tp-app">${examBar('영어 말하기 모의고사', { sub: '11문항 / 약 20분', time: '12:35', end: btn('시험 끝내기', { size: 'small' }) })}<main class="tp-content tp-ex">
  <div class="tp-cbt">
    ${card(`<div class="tp-cbt__stage">
      <div class="tp-between"><div class="tp-row">${badge('Part 2', 'informative')}<span class="tp-h3">사진 묘사하기</span></div><span class="tp-caption">문항 4 / 11</span></div>
      <p class="tp-cbt__prompt">Describe the picture in as much detail as you can.</p>
      <div class="tp-cbt__pic">${thumb('4:3', '', photo('city', 2, 1120), 'lg')}</div>
      <div class="tp-cbt__clock">${ring(62, 56, 'brand')}<time class="ds-timer" data-format="elapsed" aria-label="남은 답변 시간">0:28</time><span class="tp-caption">답변 시간 0:45</span></div>
      <div class="tp-recbar"><span class="tp-recbar__state">${dot('critical', '녹음 중').replace('<span', '<span data-pulse')}녹음 중</span><span class="tp-level" aria-hidden="true">${[30, 55, 80, 100, 70, 45, 90, 60, 35, 75, 50, 85, 40, 65, 30, 55, 95, 70, 45, 60].map((h, i) => `<i style="--h:${h}%"${i < 12 ? ' data-on' : ''}></i>`).join('')}</span><span class="tp-recbar__time">0:17 <span>/ 0:45</span></span>${btn('답변 끝내기', { variant: 'neutralWeak', size: 'medium', ic: 'square' })}</div>
    </div>`, { size: 'medium' })}
    <aside class="tp-stack" style="gap: var(--ds-space-x4)">
      ${card(`<span class="tp-h3">진행</span><div class="tp-rows">${parts.map(([p, n, c, d], i) => `<div class="tp-between"><div class="tp-row"><span class="tp-label">${p}</span><span class="tp-caption">${n}</span></div>${i === 1 ? badge('진행 중', 'brand') : d ? icon('circle-check-solid', 'sm') : `<span class="tp-caption">${c}문항</span>`}</div>`).join('')}</div>
        <div class="tp-cbt__qs" aria-label="문항">${Array.from({ length: 11 }, (_, i) => `<span${i < 3 ? ' data-done' : ''}${i === 3 ? ' aria-current="true"' : ''}>${i + 1}</span>`).join('')}</div>`)}
      ${card(`<span class="tp-h3">장비</span><div class="tp-rows"><div class="tp-between"><span class="tp-label">마이크</span><span class="tp-row">${dot('positive')}<span class="tp-caption">정상</span></span></div><div class="tp-between"><span class="tp-label">스피커</span><span class="tp-row">${dot('positive')}<span class="tp-caption">정상</span></span></div><div class="tp-between"><span class="tp-label">음량</span><input type="range" class="ds-slider" min="0" max="100" value="70" aria-label="음량" style="width:120px"></div></div>`)}
    </aside>
  </div>
</main></div>`;
  return { slug: 'mock-exam-cbt', en: 'Mock Exam CBT', name: '모의고사 CBT', group: 'Exam', desc: '컴퓨터로 보는 말하기 모의고사 화면입니다. 한 문항씩 준비 시간과 답변 시간을 큰 시계로 보여 주고, 옆에서 진행과 장비 상태를 확인합니다.', css, body };
};

export const templates = [levelTest, mockPbt, mockCbt].map((f) => f());
