import * as K from './kit.mjs';
const { icon, btn, iconBtn, badge, card, field, input, select, checkbox, sw, divider, link, search, avatar, esc } = K;
const inp = (id, v, attrs = '') => input(id, `value="${esc(v)}" ${attrs}`);
const sel = (id, v) => select(v, { id, size: 'medium' });

const CSS = `
  .tp-sp { display: grid; flex: 1 1 auto; grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 1280px) { .tp-sp { grid-template-columns: 280px minmax(0, 1fr); } }
  .tp-sp__side { display: flex; flex-direction: column; gap: var(--ds-space-x3); padding: var(--ds-space-x5) var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 1280px) { .tp-sp__side { padding: var(--ds-space-x8) var(--ds-space-x5); box-shadow: inset -1px 0 0 var(--ds-color-stroke-neutral-muted); } }
  .tp-sp__main { display: flex; flex-direction: column; gap: var(--ds-space-x6); width: min(100%, 720px); padding: var(--ds-space-x6) var(--ds-space-x4) var(--ds-space-x12); }
  @media (min-width: 1280px) { .tp-sp__main { padding: var(--ds-space-x8) var(--ds-space-x10); } }
  .tp-snav { display: flex; flex-direction: column; gap: var(--ds-space-x1); }
  .tp-snav__group { font-size: var(--ds-font-size-t02); line-height: var(--ds-line-height-t02); color: var(--ds-color-fg-neutral-subtle); padding: var(--ds-space-x3) var(--ds-space-x2) var(--ds-space-x1); }
  .tp-snav__item { display: flex; align-items: center; gap: var(--ds-space-x2); width: 100%; min-height: 36px; padding: 0 var(--ds-space-x2); border: 0; border-radius: var(--ds-shape-sm); background: none; color: var(--ds-color-fg-neutral-muted); font: inherit; font-size: var(--ds-font-size-t04); text-align: left; text-decoration: none; cursor: pointer; }
  .tp-snav__item:hover { background: var(--ds-color-bg-transparent-pressed); }
  .tp-snav__item[aria-current="page"] { background: var(--ds-color-bg-neutral); color: var(--ds-color-fg-neutral); font-weight: var(--ds-font-weight-semibold); }
  .tp-srow { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); padding-block: var(--ds-space-x4); }
  .tp-srow + .tp-srow { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 768px) { .tp-srow { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; } }
  .tp-srow__label { display: flex; gap: var(--ds-space-x3); align-items: flex-start; }
  .tp-srow__label > .ds-icon { margin-top: 2px; color: var(--ds-color-fg-neutral-muted); }
`;
const nav = (groups, cur) => `<nav class="tp-snav" aria-label="설정 메뉴">${groups.map(([g, items]) => `${g ? `<span class="tp-snav__group">${g}</span>` : ''}${items.map(([t, ic]) => `<a class="tp-snav__item" href="#"${t === cur ? ' aria-current="page"' : ''}>${ic ? icon(ic, 'sm') : ''}${t}</a>`).join('')}`).join('')}</nav>`;
const row = (ic, t, d, control) => `<div class="tp-srow"><div class="tp-srow__label">${icon(ic, 'sm')}<span class="tp-stack"><span class="tp-label">${t}</span><span class="tp-sub">${d}</span></span></div><div>${control}</div></div>`;

const panels = () => {
  const css = CSS + `
  .tp-info { display: flex; justify-content: space-between; gap: var(--ds-space-x4); padding-block: var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-info__v { color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
`;
  const items = [['개인 정보', 'user'], ['로그인과 보안', 'lock'], ['결제와 환불', 'credit-card'], ['알림', 'bell'], ['개인정보 보호', 'shield-check'], ['학습 설정', 'book-open'], ['언어와 지역', 'globe'], ['연결된 기기', 'smartphone'], ['기업 계정', 'building']];
  const info = [['실명', '와이비엠', 1], ['닉네임', '입력하지 않음', 1], ['이메일', 's***n@example.com', 1], ['휴대폰', '010-****-5678', 1], ['본인 인증', badge('인증 완료', 'positive'), 0], ['집 주소', '입력하지 않음', 1], ['우편물 받을 주소', '입력하지 않음', 1], ['비상 연락처', '입력함', 1]];
  const body = `<div class="tp-app">
<div class="tp-sp">
  <aside class="tp-sp__side"><h2 class="tp-h2">계정 설정</h2>${nav([['', items]], '개인 정보')}${divider()}${nav([['', [['로그아웃', 'log-out']]]], '')}</aside>
  <main class="tp-sp__main">
    <h1 class="tp-h1">개인 정보</h1>
    <div>${info.map(([k, v, e]) => `<div class="tp-info"><div class="tp-stack"><span class="tp-label">${k}</span><span class="tp-info__v">${v}</span></div>${e ? btn('수정', { variant: 'neutralWeak', size: 'xsmall' }) : ''}</div>`).join('')}</div>
    ${card(`<div class="tp-row" style="align-items:flex-start">${icon('info', 'sm')}<div class="tp-stack"><span class="tp-h4">일부 정보가 보이지 않는 이유</span></div></div>`)}
  </main>
</div>
</div>`;
  return { slug: 'settings-sidebar', en: 'Settings Panels', name: '설정', group: 'Account', desc: '왼쪽 메뉴로 설정 묶음을 오가는 설정 화면입니다. 항목은 그 자리에서 바로 수정합니다.', css, body };
};

export const templates = [panels].map((f) => f());
