import * as K from './kit.mjs';
import { FRAME_CSS, topbar, tags } from './frame.mjs';
const { icon, btn, iconBtn, avatar, card } = K;

const MENU = ['홈', '레슨', '복습', '리포트'];
const end = `${iconBtn('bell', '알림', { size: 'xsmall' })}${avatar('와이비엠', 24)}`;

const aiReport = () => {
  const css = FRAME_CSS + `
  .tp-rp { display: flex; flex-direction: column; gap: var(--ds-space-x6); padding-block: var(--ds-space-x6) var(--ds-space-x12); }
  .tp-rp__head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ds-space-x4); }
  .tp-rp__grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); }
  @media (min-width: 1280px) { .tp-rp__grid { grid-template-columns: minmax(0, 1fr) 340px; align-items: start; } }
  .tp-rp__kpis { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x3); }
  @media (min-width: 768px) { .tp-rp__kpis { gap: var(--ds-space-x4); } }
  @media (min-width: 1280px) { .tp-rp__kpis { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .tp-rp__main, .tp-rp__side { display: flex; flex-direction: column; gap: var(--ds-space-x4); min-width: 0; }
  @media (min-width: 768px) and (max-width: 1279px) { .tp-rp__side { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; } }
  .tp-rp__charts { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); }
  @media (min-width: 768px) { .tp-rp__charts { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .tp-fixes { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .tp-fixes > li { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ds-space-x1) var(--ds-space-x3); padding-block: var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-fixes > li:last-child { padding-bottom: 0; box-shadow: none; }
  .tp-fixes > li:first-child { padding-top: 0; }
  .tp-fix__line { margin: 0; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); }
  .tp-fix__line del { color: var(--ds-color-fg-critical); text-decoration-thickness: 1px; }
  .tp-fix__line ins { color: var(--ds-color-fg-positive); text-decoration: none; font-weight: var(--ds-font-weight-semibold); }
  .tp-fix__why { grid-column: 1; margin: 0; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-fixes .ds-btn { grid-column: 2; grid-row: 1 / span 2; align-self: start; }
  .tp-ratio { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: var(--ds-space-x5); }
  .tp-ratio .tp-legend { flex-direction: column; }
  .tp-phrases { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-phrases > li { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: var(--ds-space-x2); }
  .tp-next { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-next > li { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: var(--ds-space-x3); }
  .tp-next .tp-node { display: grid; place-items: center; width: var(--ds-space-x10); height: var(--ds-space-x10); border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-neutral); color: var(--ds-color-fg-neutral-muted); }
  .tp-next .tp-node .ds-icon { --ds-icon-size: 20px; }
`;
  const { kpi, spark, barChart, lineChart, donut, legend, C } = K;
  const tiles = [['종합 점수', '86점', '+6', [70, 72, 71, 75, 78, 77, 80, 86]], ['발음', '88점', '+4', [78, 80, 79, 82, 83, 84, 84, 88]], ['문법 정확도', '80%', '+10', [62, 65, 64, 70, 68, 72, 70, 80]], ['말한 시간', '6분 32초', '+1:10', [3.2, 3.8, 4.1, 4.0, 4.6, 5.1, 5.4, 6.5]]];
  const SKILLS = ['발음', '유창성', '문법', '어휘', '이해'];
  const now = [88, 82, 80, 85, 92], before = [84, 75, 70, 83, 90];
  const fixes = [
    ['<del>I want</del> <ins>Could I get</ins> a large latte<ins>, please</ins>?', '주문할 때는 Could I get ~ 이 더 부드럽게 들려요'],
    ['For here<del>, I eat</del>.', 'For here 만으로 매장에서 먹는다는 뜻이 돼요'],
    ['Can I pay <del>with</del> <ins>by</ins> card?', '카드로 낼 때는 by card 를 써요'],
  ];
  const phrases = [['Could I get ~, please?', '~ 주시겠어요?'], ['For here or to go?', '드시고 가세요, 가져가세요?'], ['That’s all.', '그거면 돼요']];
  const next = [['rotate-ccw', '틀린 문장 복습', '5분'], ['message-circle', 'AI와 상황극: 식당에서 주문하기', '10분']];
  const body = `<div class="tp-app">${topbar(MENU, 3, end)}
<main class="tp-content"><div class="tp-rp">
  <div class="tp-rp__head">
    <div class="tp-stack" style="gap: var(--ds-space-x1)"><span class="tp-caption">AI와 말하기 / 11월 16일</span><h1 class="tp-h1">카페에서 주문하기</h1><div class="tp-row">${tags(['12분', '문장 12개'])}</div></div>
    <div class="tp-row">${btn('다시 하기', { size: 'medium', ic: 'rotate-ccw' })}${btn('다음 레슨', { variant: 'brandSolid', size: 'medium' })}</div>
  </div>
  <div class="tp-rp__kpis">${tiles.map(([l, v, d, s], i) => kpi(l, v, { d, chart: spark(s, C(0), { h: 36, label: l + ' 추이' }) })).join('')}</div>
  <div class="tp-rp__grid">
    <div class="tp-rp__main">
      <div class="tp-rp__charts">
        ${card(`<h2 class="tp-h3">영역별 점수</h2>${barChart(SKILLS.map((_, i) => [now[i], before[i]]), { w: 420, h: 200, x: SKILLS, names: ['이번', '지난 학습'], colors: [C(0), 'var(--ds-color-bg-neutral)'], unit: '점', label: '영역별 점수' })}${legend([['이번', 0], ['지난 학습', 'var(--ds-color-bg-neutral)']])}`)}
        ${card(`<h2 class="tp-h3">점수 변화</h2>${lineChart([{ name: '종합 점수', data: tiles[0][3] }], { w: 420, h: 200, x: ['10.06', '10.20', '11.06', '11.16'], xs: ['10.06', '10.13', '10.20', '10.27', '11.03', '11.06', '11.10', '11.16'], area: true, unit: '점', label: '종합 점수 변화' })}${legend([['종합 점수', 0]])}`)}
      </div>
      ${card(`<div class="tp-between"><h2 class="tp-h3">고칠 문장</h2><span class="tp-label tp-num">${fixes.length}개</span></div><ul class="tp-fixes">${fixes.map(([line, why]) => `<li><p class="tp-fix__line">${line}</p><p class="tp-fix__why">${why}</p>${iconBtn('volume-2', '고친 문장 듣기', { size: 'small' })}</li>`).join('')}</ul>`, { size: 'medium' })}
    </div>
    <aside class="tp-rp__side" aria-label="이번 학습 더 보기">
      ${card(`<h2 class="tp-h3">말한 비율</h2><div class="tp-ratio">${donut([['나', 58, C(0)], ['AI', 42, 'var(--ds-color-bg-neutral)']], { size: 120, thick: 14, center: '58%', unit: '%', label: '말한 비율' })}${legend([['나', 0, '3분 48초'], ['AI', 'var(--ds-color-bg-neutral)', '2분 44초']])}</div>`)}
      ${card(`<div class="tp-between"><h2 class="tp-h3">새로 익힌 표현</h2><span class="tp-label tp-num">${phrases.length}개</span></div><ul class="tp-phrases">${phrases.map(([en, ko]) => `<li><div class="tp-stack"><span class="tp-label">${en}</span><span class="tp-caption">${ko}</span></div>${iconBtn('volume-2', en + ' 듣기', { size: 'small' })}</li>`).join('')}</ul>${btn('단어장에 담기', { size: 'medium', fill: true })}`)}
      ${card(`<h2 class="tp-h3">다음 학습</h2><ul class="tp-next">${next.map(([ic, t, m]) => `<li><span class="tp-node">${icon(ic)}</span><div class="tp-stack"><span class="tp-label">${t}</span><span class="tp-caption">${m}</span></div></li>`).join('')}</ul>`)}
    </aside>
  </div>
</div></main></div>`;
  return { slug: 'ai-tutor-report', en: 'AI Learning Report', name: 'AI 학습 리포트', group: 'Learning', desc: 'AI와 학습을 마친 뒤 결과를 보는 화면입니다. 영역별 점수와 점수 변화를 그래프로 보여 주고 고칠 문장과 새로 익힌 표현을 함께 정리합니다.', css, body };
};

export const templates = [aiReport].map((f) => f());
