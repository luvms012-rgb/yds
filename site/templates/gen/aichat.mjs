import * as K from './kit.mjs';
const { icon, btn, iconBtn, badge, avatar, codeblock, chip, progress, esc } = K;

const CHAT_CSS = `
  .tp-chat { box-sizing: border-box; display: flex; flex-direction: column; width: min(100%, var(--tp-max)); height: 100vh; margin-inline: auto; overflow: hidden; background: var(--ds-color-bg-layer-default); }
  @media (min-width: 1441px) { .tp-chat { box-shadow: -1px 0 0 var(--ds-color-stroke-neutral-muted), 1px 0 0 var(--ds-color-stroke-neutral-muted); } }
  .tp-chat__body { display: flex; flex: 1 1 auto; min-height: 0; }
  .tp-chat__main { display: flex; flex: 1 1 auto; flex-direction: column; min-width: 0; }
  .tp-log { flex: 1 1 auto; overflow: auto; display: flex; flex-direction: column; gap: var(--ds-space-x5); padding: var(--ds-space-x6) var(--ds-space-x4); }
  .tp-log > * { width: min(100%, 720px); margin-inline: auto; }
  .tp-msg-user { display: flex; flex-direction: column; align-items: flex-end; gap: var(--ds-space-x1_5); }
  .tp-msg-ai { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--ds-space-x3); }
  .tp-msg-ai__body { display: flex; flex-direction: column; gap: var(--ds-space-x3); min-width: 0; }
  .tp-tools { border-radius: var(--ds-shape-lg); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
  .tp-tools > summary { display: flex; align-items: center; gap: var(--ds-space-x2); padding: var(--ds-space-x2) var(--ds-space-x3); list-style: none; cursor: pointer; font-size: var(--ds-font-size-t03); color: var(--ds-color-fg-neutral-muted); }
  .tp-tools > summary::-webkit-details-marker { display: none; }
  .tp-tools ul { list-style: none; margin: 0; padding: 0 var(--ds-space-x3) var(--ds-space-x2); display: flex; flex-direction: column; gap: var(--ds-space-x1); font-size: var(--ds-font-size-t03); }
  .tp-tools li { display: flex; align-items: center; gap: var(--ds-space-x2); color: var(--ds-color-fg-neutral-muted); }
  .tp-tools li .ds-icon { color: var(--ds-color-fg-positive); }
  .tp-tools code { color: var(--ds-color-fg-neutral); }
  .tp-composer-wrap { padding: var(--ds-space-x3) var(--ds-space-x4) var(--ds-space-x4); }
  .tp-composer-wrap > * { width: min(100%, 720px); margin-inline: auto; }
  .tp-composer { display: flex; flex-direction: column; gap: var(--ds-space-x2); padding: var(--ds-space-x3); border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-layer-floating); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak), 0 4px 16px var(--ds-color-palette-static-black-alpha-300); }
  .tp-composer .ds-textarea { --ds-textarea-line-width: 0px; --ds-textarea-min-height: 48px; --ds-textarea-padding: var(--ds-space-x1); resize: none; background: none; }
  .tp-composer__bar { display: flex; align-items: center; gap: var(--ds-space-x1); }
  .tp-composer__bar .tp-grow { flex: 1 1 auto; }
  .tp-files-row { display: flex; flex-wrap: wrap; gap: var(--ds-space-x1_5); }
  .tp-file-token { display: inline-flex; align-items: center; gap: var(--ds-space-x1); height: 28px; padding: 0 var(--ds-space-x1) 0 var(--ds-space-x2); border-radius: var(--ds-shape-sm); background: var(--ds-color-bg-neutral); font-size: var(--ds-font-size-t03); }
`;
const composer = (ph = '무엇이든 물어보세요', files = []) => `<form class="tp-composer" onsubmit="return false">${files.length ? `<div class="tp-files-row">${files.map((f) => `<span class="tp-file-token">${icon('file-text', 'sm')}${f}${iconBtn('x', f + ' 빼기', { size: 'xsmall' })}</span>`).join('')}</div>` : ''}<textarea class="ds-textarea" rows="2" placeholder="${esc(ph)}" aria-label="메시지 입력"></textarea><div class="tp-composer__bar">${iconBtn('plus', '파일 첨부')}${btn('참고 자료', { variant: 'ghost', ic: 'paperclip', size: 'small' })}${btn('도구', { variant: 'ghost', ic: 'sliders-horizontal', size: 'small' })}<span class="tp-grow"></span>${iconBtn('mic', '말로 입력')}<button type="submit" class="ds-chat-send" aria-label="보내기"></button></div></form>`;

/* 1. AI 대화 (오른쪽 결과물 패널) ------------------------------ */
const conversation = () => {
  const css = CHAT_CSS + `
  .tp-artifact { display: none; flex: none; width: min(46%, 600px); flex-direction: column; box-shadow: inset 1px 0 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 1280px) { .tp-artifact { display: flex; } }
  .tp-artifact__bar { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x2); padding: var(--ds-space-x3) var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-artifact__doc { flex: 1 1 auto; overflow: auto; padding: var(--ds-space-x6); }
  .tp-chat-head { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x2); padding: var(--ds-space-x3) var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
`;
  const body = `<div class="tp-chat">
<header class="tp-chat-head"><span class="tp-row">${iconBtn('panel-left', '대화 목록')}<span class="tp-h4">로그인 유지 기능 점검</span></span><span class="tp-row">${iconBtn('share', '공유')}${iconBtn('ellipsis', '더 보기')}</span></header>
<div class="tp-chat__body">
  <div class="tp-chat__main">
    <div class="tp-log" role="log" aria-label="대화">
      <p class="ds-chat-system" data-layout="divider">오늘</p>
      <div class="tp-msg-user"><div class="tp-files-row"><span class="tp-file-token">${icon('file-code', 'sm')}auth-service.ts</span><span class="tp-file-token">${icon('file-code', 'sm')}middleware.ts</span></div><div class="ds-chat-bubble" data-sender="user">이 두 파일을 봐 줄래요? 토큰 새로 받기가 가끔 실패하는 것 같아요.</div><span class="ds-chat-meta" data-status="read"><time>오전 10:15</time></span></div>
      <div class="tp-msg-ai">${avatar('AI', 24)}<div class="tp-msg-ai__body"><p>두 파일을 읽어 볼게요. 토큰이 만료되는 순간 요청이 동시에 여러 개 오면 새로 받기를 겹쳐서 하는 것 같아요.</p>
        <details class="tp-tools"><summary>${icon('wand-sparkles', 'sm')}도구 3번 사용 ${icon('chevron-down', 'sm')}</summary><ul><li>${icon('circle-check', 'sm')}읽음 <code>auth-service.ts</code></li><li>${icon('circle-check', 'sm')}읽음 <code>middleware.ts</code></li><li>${icon('circle-check', 'sm')}찾음 <code>refreshToken</code> 6곳</li></ul></details>
        <div class="ds-markdown"><h3>원인</h3><p>만료 직전 요청 3개가 동시에 <code>refreshToken()</code>을 불러서, 먼저 끝난 요청이 토큰을 바꾸면 나머지 둘은 이미 쓴 토큰으로 다시 요청해 실패해요.</p><h3>해결 방법</h3><p>새로 받는 중이면 같은 약속(Promise)을 함께 기다리게 하면 돼요.</p></div>
        ${codeblock('ts', "let pending: Promise<string> | null = null;\n\nexport function refreshToken() {\n  pending ??= fetchNewToken().finally(() => { pending = null; });\n  return pending;\n}")}
        <div class="tp-row">${iconBtn('copy', '복사', { size: 'xsmall' })}${iconBtn('thumbs-up', '좋아요', { size: 'xsmall' })}${iconBtn('thumbs-down', '별로예요', { size: 'xsmall' })}${iconBtn('rotate-ccw', '다시 답하기', { size: 'xsmall' })}</div></div></div>
      <div class="tp-msg-user"><div class="ds-chat-bubble" data-sender="user">좋아요. 배포 계획도 문서로 정리해 줘요.</div><span class="ds-chat-meta" data-status="read"><time>오전 10:21</time></span></div>
      <div class="tp-msg-ai">${avatar('AI', 24)}<div class="tp-msg-ai__body"><p>오른쪽에 설계와 배포 문서를 만들었어요. 문제, 해결 방법, 테스트, 단계별 배포 순서로 정리했어요.</p></div></div>
    </div>
    <div class="tp-composer-wrap">${composer('이어서 물어보세요')}</div>
  </div>
  <aside class="tp-artifact" aria-label="결과물">
    <div class="tp-artifact__bar"><span class="tp-row">${icon('file-text', 'sm')}<span class="tp-h4">로그인 연장 설계와 배포</span>${badge('v2')}</span><span class="tp-row">${iconBtn('copy', '복사')}${iconBtn('download', '내려받기')}${iconBtn('x', '닫기')}</span></div>
    <div class="tp-artifact__doc ds-markdown"><h2>로그인 연장 설계와 배포</h2><h3>개요</h3><p>짧은 접속 토큰과 긴 새로 받기 토큰을 함께 써요. 접속 토큰이 끝나기 전에 조용히 새로 받아 사용자가 로그아웃되지 않게 해요.</p><h3>문제</h3><ol><li>요청 여러 개가 동시에 만료를 만나요.</li><li>각자 새로 받기를 불러요.</li><li>마지막 하나만 성공하고 나머지는 401이 나요.</li></ol><h3>해결 방법</h3><p>새로 받는 중인 약속을 하나만 두고 모두 그것을 기다려요.</p><h3>테스트</h3><table><thead><tr><th>상황</th><th>기대</th></tr></thead><tbody><tr><td>동시 요청 3개</td><td>새로 받기 1번</td></tr><tr><td>새로 받기 실패</td><td>로그인 화면으로</td></tr></tbody></table><h3>배포와 모니터링</h3><p>사용자 5%부터 켜고 24시간 동안 실패율이 그대로면 100%로 넓혀요.</p></div>
  </aside>
</div>
</div>`;
  return { slug: 'ai-chat', h1: 'AI 대화', en: 'AI Chat Conversation', name: 'AI 대화', group: 'Content', desc: 'AI와 주고받은 대화와 결과물을 함께 보는 화면입니다. 결과물은 옆 패널에서 따로 엽니다.', css, body };
};

/* 2. AI 첫 화면 ------------------------------------------------- */
const landing = () => {
  const css = CHAT_CSS + `
  .tp-land { display: grid; place-items: center; min-height: 100vh; padding: var(--ds-space-x8) var(--ds-space-x4); background: var(--ds-color-bg-layer-default); }
  .tp-land__in { display: flex; flex-direction: column; gap: var(--ds-space-x6); width: min(100%, 720px); }
  .tp-hi { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-hi > .tp-row { color: var(--ds-color-fg-magic); }
  .tp-hi h1 { font-size: var(--ds-font-size-t12); line-height: var(--ds-line-height-t12); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .tp-cats { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ds-space-x2); }
`;
  const body = `<main class="tp-land"><div class="tp-land__in">
  <div class="tp-hi"><span class="tp-row">${icon('sparkles')}<span class="tp-h3">안녕하세요, 와이비엠 님</span></span><h1>무엇부터 시작할까요?</h1></div>
  ${composer('무엇이든 물어보세요', ['수업 계획서.pdf', '지난 학기 설문.xlsx', '강의 영상 목록.csv'])}
  <div class="tp-cats" role="group" aria-label="분류">${[['pencil', '글쓰기'], ['code', '코딩'], ['search', '찾아보기'], ['palette', '만들기'], ['book-open', '배우기']].map(([ic, t]) => btn(t, { variant: 'neutralOutline', ic, attrs: 'aria-pressed="false"' })).join('')}</div>
</div></main>`;
  return { slug: 'ai-chat-landing', en: 'AI Chat Landing', name: 'AI 홈', group: 'Content', desc: '대화를 시작하기 전에 보여 주는 AI 첫 화면입니다. 입력창과 추천 버튼으로 바로 시작합니다.', css, body };
};

/* 3. AI 학습 대화 (학습 > 수강) ---------------------------------- */
// 2026-11-16 사용자 "학습용 채팅 UI (챗튜터 방식)", 이름은 "범용적인 용어로" 바꿔 AI 학습 대화. 레퍼런스는 UI 패턴 카탈로그의 말하기 앱 AI 튜터, AI 발음 코치, 학습 사이트 AI 챗봇, 말하기 연습 결과 화면(서비스 이름은 적지 않는다).
// 튜터 말풍선 아래 듣기와 번역, 내 말 아래 "더 자연스럽게" 고쳐 주기, 다음에 말해 볼 문장 칩, 아래 큰 마이크. 넓은 화면에서는 오른쪽에 오늘의 미션.
const tutor = () => {
  const css = CHAT_CSS + `
  .tp-tutor-head { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: var(--ds-space-x2); padding: var(--ds-space-x3) var(--ds-space-x4); }
  .tp-tutor-head .tp-stack { gap: 0; }
  .tp-tutor-prog { box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); padding: 0 var(--ds-space-x4) var(--ds-space-x3); }
  .tp-msg-ai__body > .ds-chat-bubble { align-self: flex-start; }
  .tp-trans { color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-fix { display: flex; flex-direction: column; gap: var(--ds-space-x2); width: min(100%, 420px); padding: var(--ds-space-x3) var(--ds-space-x4); border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
  .tp-fix__line { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); }
  .tp-fix del { color: var(--ds-color-fg-critical); text-decoration-thickness: 1px; }
  .tp-fix ins { color: var(--ds-color-fg-positive); text-decoration: none; font-weight: var(--ds-font-weight-semibold); }
  .tp-fix__why { margin: 0; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); }
  /* 채팅은 최신 대화가 보이게 아래부터(column-reverse 스크롤) */
  .tp-log--end { flex-direction: column-reverse; }
  .tp-log__in { display: flex; flex-direction: column; gap: var(--ds-space-x5); }
  .tp-say { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-say__chips { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2); }
  .tp-voice { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--ds-space-x4); padding: var(--ds-space-x3) var(--ds-space-x4) var(--ds-space-x5); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-voice > :first-child { justify-self: end; }
  .tp-voice > :last-child { justify-self: start; }
  .tp-voice__mic { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x1); }
  .tp-mic { width: var(--ds-space-x16); height: var(--ds-space-x16); border-radius: var(--ds-shape-pill); }
  .tp-mic .ds-icon { --ds-icon-size: 28px; }
  .tp-mission { display: none; flex: none; width: 320px; flex-direction: column; gap: var(--ds-space-x6); padding: var(--ds-space-x6) var(--ds-space-x5); overflow: auto; box-shadow: inset 1px 0 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 1280px) { .tp-mission { display: flex; } }
  .tp-mission ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-mission li { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--ds-space-x2); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-mission li .ds-icon { --ds-icon-size: 20px; color: var(--ds-color-fg-neutral-subtle); }
  .tp-mission li[data-done] .ds-icon { color: var(--ds-color-fg-positive); }
  .tp-mission li[data-done] span { color: var(--ds-color-fg-neutral-muted); }
  .tp-kv { display: flex; justify-content: space-between; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-kv > :first-child { color: var(--ds-color-fg-neutral-muted); }
`;
  const tools = (n) => `<div class="tp-row">${iconBtn('volume-2', '듣기', { size: 'xsmall' })}${iconBtn('globe', '번역 보기', { size: 'xsmall' })}${n ? iconBtn('rotate-ccw', '천천히 다시 듣기', { size: 'xsmall' }) : ''}</div>`;
  const ai = (en, ko, more = '') => `<div class="tp-msg-ai">${avatar('AI', 36)}<div class="tp-msg-ai__body"><div class="ds-chat-bubble">${en}</div>${ko ? `<p class="tp-trans">${ko}</p>` : ''}${tools(1)}${more}</div></div>`;
  const me = (t, time, fix = '') => `<div class="tp-msg-user"><div class="ds-chat-bubble" data-sender="user">${t}</div><span class="ds-chat-meta"><time>${time}</time></span>${fix}</div>`;
  const fix = `<div class="tp-fix"><div class="tp-between"><span class="tp-h4">더 자연스럽게</span>${iconBtn('volume-2', '고친 문장 듣기', { size: 'xsmall' })}</div><p class="tp-fix__line"><del>I want</del> <ins>Could I get</ins> a large latte<ins>, please</ins>?</p><p class="tp-fix__why">주문할 때는 Could I get ~ 이 더 부드럽게 들려요</p></div>`;
  const mission = [['Could I get ~, please?', true], ['For here or to go?', true], ['Can I pay by card?', false]];
  const body = `<div class="tp-chat">
<header class="tp-tutor-head">${iconBtn('x', '나가기')}<div class="tp-stack"><h1 class="tp-h4">카페에서 주문하기</h1><span class="tp-caption">AI와 말하기 / 4 / 8</span></div><span class="tp-row">${iconBtn('captions', '번역 모두 보기')}${iconBtn('settings', '말하기 설정')}</span></header>
<div class="tp-tutor-prog">${progress(50, { tone: 'neutral', label: '대화 진행' })}</div>
<div class="tp-chat__body">
  <div class="tp-chat__main">
    <div class="tp-log tp-log--end" role="log" aria-label="대화"><div class="tp-log__in">
      <p class="ds-chat-system">상황: 카페 점원과 대화해요</p>
      ${ai('Hi there! What can I get for you today?', '안녕하세요, 오늘 뭐로 드릴까요?')}
      ${me('I want a large latte.', '오후 3:20', fix)}
      ${ai('Sure! Would you like that for here or to go?', '', '')}
      ${me('For here, please.', '오후 3:21')}
      ${ai('Great choice. Anything else? We have fresh muffins today.', '좋아요. 더 필요한 건 없으세요? 오늘 갓 구운 머핀이 있어요.', `<div class="tp-say" role="group" aria-label="말해 볼 문장"><div class="tp-say__chips">${['No, that’s all.', 'Can I pay by card?', 'A blueberry muffin, please.'].map((t) => chip(t, { size: 'medium' })).join('')}</div></div>`)}
    </div></div>
    <div class="tp-voice">${btn('힌트', { ic: 'lightbulb', size: 'medium' })}<div class="tp-voice__mic"><button type="button" class="ds-btn tp-mic" data-variant="brandSolid" data-size="large" data-layout="iconOnly" aria-label="눌러서 말하기">${icon('mic')}</button><span class="tp-caption">눌러서 말하기</span></div>${btn('글로 쓰기', { ic: 'type', size: 'medium' })}</div>
  </div>
  <aside class="tp-mission" aria-label="오늘의 미션">
    <div class="tp-stack" style="gap: var(--ds-space-x3)"><h2 class="tp-h4">오늘의 미션</h2><ul>${mission.map(([t, d]) => `<li${d ? ' data-done' : ''}>${icon(d ? 'circle-check-solid' : 'circle')}<span>${t}</span></li>`).join('')}</ul></div>
    <div class="tp-stack" style="gap: var(--ds-space-x3)"><h2 class="tp-h4">내 말하기</h2>${[['말한 문장', '2'], ['고친 문장', '1'], ['발음 점수', '86점']].map(([k, v]) => `<div class="tp-kv"><span>${k}</span><span class="tp-num">${v}</span></div>`).join('')}</div>
  </aside>
</div>
</div>`;
  return { slug: 'ai-tutor-chat', en: 'AI Learning Chat', name: 'AI 학습 대화', group: 'Learning', desc: 'AI와 대화하며 배우는 학습 화면입니다. 내 말은 바로 더 자연스럽게 고쳐 주고, 다음에 말해 볼 문장을 칩으로 보여 줍니다.', css, body };
};

export const templates = [conversation, landing, tutor].map((f) => f());
