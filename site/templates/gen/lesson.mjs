// 어학 앱 학습자 템플릿: 레슨 홈(학습 > 수강).
// 2026-11-16 사용자 "스픽이나 링고 같은 대표 서비스에서 템플릿으로 넣을 요소, 대표로 하나 더 추가". 레퍼런스는 UI 패턴 카탈로그의 어학 앱 학습 중 메인, 레슨 학습, 학습 통계, 학습 목표 화면(서비스 이름은 적지 않는다).
// 단원 레슨 경로(끝남 / 지금 / 잠김)와 이어서 하기가 주인공. 넓은 화면에서는 오른쪽에 오늘의 목표, 연속 학습, 복습할 단어.
import * as K from './kit.mjs';
import { FRAME_CSS, topbar, tags } from './frame.mjs';
const { icon, btn, iconBtn, badge, avatar, card, progress, ring } = K;

const MENU = ['홈', '레슨', '복습', '리포트'];
const end = `${iconBtn('bell', '알림', { size: 'xsmall' })}${avatar('와이비엠', 24)}`;

const lessonHome = () => {
  const css = FRAME_CSS + `
  .tp-lh { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); padding-block: var(--ds-space-x6) var(--ds-space-x12); }
  @media (min-width: 1280px) { .tp-lh { grid-template-columns: minmax(0, 1fr) 340px; align-items: start; } }
  .tp-lh__main { display: flex; flex-direction: column; gap: var(--ds-space-x6); min-width: 0; }
  .tp-unit { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
  .tp-path { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .tp-path > li { position: relative; display: grid; grid-template-columns: var(--ds-space-x10) minmax(0, 1fr) auto; align-items: center; gap: var(--ds-space-x4); padding-block: var(--ds-space-x3); }
  /* 노드를 잇는 세로선 */
  .tp-path > li::before, .tp-path > li::after { content: ""; position: absolute; left: calc(var(--ds-space-x5) - 1px); width: 2px; background: var(--ds-color-stroke-neutral-weak); }
  .tp-path > li::before { top: 50%; bottom: 0; }
  .tp-path > li::after { top: 0; height: 50%; }
  .tp-path > li:last-child::before, .tp-path > li:first-child::after { display: none; }
  .tp-path > li[data-state="done"]::before, .tp-path > li[data-state="done"] + li::after { background: var(--ds-color-bg-neutral-solid); }
  .tp-node { position: relative; z-index: 1; }
  .tp-node { display: grid; place-items: center; width: var(--ds-space-x10); height: var(--ds-space-x10); border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-neutral); color: var(--ds-color-fg-neutral-subtle); }
  .tp-node .ds-icon { --ds-icon-size: 20px; }
  [data-state="done"] > .tp-node { background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); }
  [data-state="now"] > .tp-node { background: var(--ds-color-bg-brand-solid); color: var(--ds-color-fg-on-brand-solid); box-shadow: 0 0 0 var(--ds-space-x1) var(--ds-color-bg-brand-weak); }
  [data-state="lock"] .tp-path__name { color: var(--ds-color-fg-neutral-subtle); }
  .tp-path__name { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-medium); }
  .tp-path__now { grid-column: 2 / -1; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); padding: var(--ds-space-x4); border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
  .tp-path > li[data-state="now"] { grid-template-columns: var(--ds-space-x10) minmax(0, 1fr); }
  .tp-week { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: var(--ds-space-x1); text-align: center; }
  .tp-week span { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x1); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); color: var(--ds-color-fg-neutral-muted); }
  .tp-week i.tp-day { display: grid; place-items: center; width: var(--ds-space-x8); height: var(--ds-space-x8); border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-neutral); }
  .tp-week [data-done] i.tp-day { background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); }
  .tp-week [data-today] i.tp-day { box-shadow: inset 0 0 0 2px var(--ds-color-stroke-neutral-solid); }
  .tp-week .ds-icon { --ds-icon-size: 16px; }
  .tp-goal { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: var(--ds-space-x4); }
  .tp-lh__side { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
`;
  // [이름, 종류 아이콘, 분, 상태]
  const UNIT3 = [['오늘의 단어 10개', 'book-open', 5, 'done'], ['공항에서 듣기', 'headphones', 6, 'done'], ['체크인 대화 말하기', 'mic', 8, 'now'], ['AI와 상황극', 'message-circle', 10, 'lock'], ['틀린 문장 복습', 'rotate-ccw', 5, 'lock'], ['단원 테스트', 'flag', 12, 'lock']];
  const row = ([name, ic, min, st], i) => st === 'now'
    ? `<li data-state="now"><span class="tp-node">${icon(ic)}</span><div class="tp-path__now"><div class="tp-stack"><span class="tp-caption">레슨 ${i + 1} / ${UNIT3.length}</span><span class="tp-path__name">${name}</span><span class="tp-caption">${min}분</span></div>${btn('이어서 하기', { variant: 'brandSolid', size: 'large', ic: 'play' })}</div></li>`
    : `<li data-state="${st}"><span class="tp-node">${icon(st === 'done' ? 'check' : st === 'lock' ? 'lock' : ic)}</span><div class="tp-stack"><span class="tp-path__name">${name}</span><span class="tp-caption">${min}분</span></div>${st === 'done' ? iconBtn('rotate-ccw', name + ' 다시 하기', { size: 'small' }) : ''}</li>`;
  const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
  const week = `<div class="tp-week">${DAYS.map((d, i) => `<span${i < 3 ? ' data-done' : ''}${i === 3 ? ' data-today' : ''}><i class="tp-day">${i < 3 ? icon('check') : ''}</i>${d}</span>`).join('')}</div>`;
  const body = `<div class="tp-app">${topbar(MENU, 0, end)}
<main class="tp-content"><div class="tp-lh">
  <div class="tp-lh__main">
    <div class="tp-stack" style="gap: var(--ds-space-x1)"><h1 class="tp-h1">영어 회화 기초</h1><div class="tp-row">${tags(['3단원 / 8단원', '진도 34%'])}</div></div>
    ${progress(34, { tone: 'neutral', label: '코스 진도' })}
    ${card(`<div class="tp-unit"><div class="tp-between"><div class="tp-stack"><span class="tp-caption">3단원</span><h2 class="tp-h3">여행에서 말하기</h2></div>${badge('진행 중', 'informative')}</div><ol class="tp-path">${UNIT3.map(row).join('')}</ol></div>`, { size: 'medium' })}
    ${card(`<div class="tp-between"><div class="tp-row" style="gap: var(--ds-space-x3)"><span class="tp-node">${icon('lock')}</span><div class="tp-stack"><span class="tp-caption">4단원</span><h2 class="tp-h3">식당에서 주문하기</h2></div></div><span class="tp-caption">레슨 6개</span></div>`, { size: 'medium' })}
  </div>
  <aside class="tp-lh__side" aria-label="오늘의 학습">
    ${card(`<h2 class="tp-h3">오늘의 목표</h2><div class="tp-goal">${ring(66, 56)}<div class="tp-stack"><span class="tp-label">레슨 2 / 3개</span><span class="tp-caption">13분 학습</span></div></div>`)}
    ${card(`<div class="tp-between"><h2 class="tp-h3">연속 학습</h2><span class="tp-label tp-num">3일째</span></div>${week}`)}
    ${card(`<div class="tp-between"><h2 class="tp-h3">복습할 단어</h2><span class="tp-label tp-num">12개</span></div>${tags(['boarding pass', 'aisle seat', 'delay'])}${btn('복습하기', { size: 'medium', fill: true })}`)}
  </aside>
</div></main></div>`;
  return { slug: 'lesson-home', en: 'Lesson Home', name: '레슨 홈', group: 'Learning', desc: '매일 레슨을 이어서 하는 학습 앱의 첫 화면입니다. 단원의 레슨 경로와 오늘의 목표, 연속 학습, 복습할 단어를 함께 보여 줍니다.', css, body };
};

export const templates = [lessonHome].map((f) => f());
