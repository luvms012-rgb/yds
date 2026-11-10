// 교육 서비스 템플릿 (2026-11-10 사용자 "서비스 중에서 템플릿에 넣을 UI, 우선순위 상만 추가").
// 기존 템플릿 틀을 그대로 따른다: 위 메뉴(topbar) / 머리글(head) / 본문 카드 / 넓은 화면에서 오른쪽 고정 요약(tp-aside-sticky).
// 안내 문장, 툴팁, 보조 라벨은 넣지 않는다. 이름은 특정 회사가 아닌 일반 화면 이름을 쓴다.
import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar, selectbox, tags } from './frame.mjs';
const { icon, btn, iconBtn, badge, card, head, secHead, field, input, select, checkbox, divider, chip, chiptabs, tabs, segmented, table, avatar, link, breadcrumbs, search, accordion, list, listItem, textarea, thumb, photo, esc } = K;

const MENU = ['강의', '교재', '시험', '센터', '고객센터'];
const end = `${iconBtn('search', '찾기', { size: 'xsmall' })}${iconBtn('shopping-cart', '장바구니', { size: 'xsmall' })}${avatar('와이비엠', 28)}`;
const app = (cur, inner) => `<div class="tp-app">${topbar(MENU, cur, end)}${inner}</div>`;
// 본문 + 오른쪽 요약 두 칸 (시험 신청과 같은 틀)
const CSS = FRAME_CSS + `
  .tp-two { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); }
  @media (min-width: 1024px) { .tp-two { grid-template-columns: minmax(0, 1fr) 340px; align-items: start; } }
  .tp-chips { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2); }
  .tp-total { display: flex; align-items: baseline; justify-content: space-between; }
  .tp-map { position: relative; overflow: hidden; border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-neutral); min-height: 320px; display: grid; place-items: center; color: var(--ds-color-fg-neutral-subtle); }
`;
const kvs = (rows) => `<div class="tp-stack" style="gap: var(--ds-space-x2)">${rows.map(([k, v]) => `<div class="tp-kv"><span>${k}</span><span>${v}</span></div>`).join('')}</div>`;

/* 1. 시험 일정표 ---------------------------------------------------- */
const schedule = () => {
  const css = CSS + `
  .tp-next { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x4); }
  .tp-dday { display: inline-flex; padding: 2px var(--ds-space-x2); border-radius: var(--ds-shape-sm); background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; }
  .tp-sched .ds-table td:last-child { white-space: nowrap; }
`;
  const open = (t) => btn(t, { variant: 'brandSolid', size: 'xsmall' });
  const notify = btn('알림 받기', { ic: 'bell', size: 'xsmall' });
  const rows = [
    ['제512회', '11.23 (일)', '10.20 ~ 11.10', '12.05 (금)', badge('접수 중', 'positive'), open('접수하기')],
    ['제513회', '12.07 (일)', '11.03 ~ 11.24', '12.19 (금)', badge('접수 중', 'positive'), open('접수하기')],
    ['제514회', '12.21 (일)', '11.17 ~ 12.08', '01.02 (금)', badge('접수 예정', 'informative'), notify],
    ['제515회', '01.11 (일)', '12.08 ~ 12.29', '01.23 (금)', badge('접수 예정', 'informative'), notify],
    ['제516회', '01.25 (일)', '12.22 ~ 01.12', '02.06 (금)', badge('접수 예정', 'informative'), notify],
    ['제511회', '11.09 (일)', '10.06 ~ 10.27', '11.21 (금)', badge('마감'), btn('성적 보기', { variant: 'ghost', size: 'xsmall' })],
  ].map(([n, d, p, r, s, a]) => [`<span class="tp-label">${n}</span>`, T(d), T(p), T(r), s, a]);
  const body = app(2, `
${head('시험 일정', { tools: btn('알림 설정', { ic: 'bell' }) })}
<main class="tp-content">
  ${card(`<div class="tp-next"><div class="tp-stack" style="gap: var(--ds-space-x2)"><div class="tp-row"><span class="tp-dday">D-13</span><span class="tp-h3">제512회 정기 시험</span></div>${tags(['시험일 11.23 (일)', '접수 마감 11.10 (월)', '성적 발표 12.05 (금)'], 't4')}</div>${btn('접수하기', { variant: 'brandSolid', size: 'medium' })}</div>`)}
  <section class="tp-sec">
    <div class="tp-ttools">${chiptabs(['전체 시험', '읽기 듣기', '말하기', '쓰기'], 0, '시험 종류')}<div class="tp-ttools__end">${select('2026년', { aria: '연도' })}</div></div>
    <div class="tp-scroll-x tp-sched">${table(['회차', '시험일', '접수 기간', '성적 발표', '상태', ['<span class="tp-sr">동작</span>', 'end']], rows, { caption: '시험 일정' })}</div>
  </section>
</main>`);
  return { slug: 'exam-schedule', en: 'Exam Schedule', name: '시험 일정표', group: 'Exam', desc: '회차별 시험일, 접수 기간, 성적 발표일을 한 표에서 보고 바로 접수하거나 알림을 받는 화면입니다.', css, body };
};

/* 2. 센터 찾기 ------------------------------------------------------ */
const centers = () => {
  const css = CSS + `
  /* 지도 서비스 배치(11-10 사용자 "레이아웃 우측이 비어서 좋은 UI 가 아니야"): 왼쪽 칸에 제목, 거르기, 목록 / 오른쪽은 위 메뉴 바로 아래부터 지도가 채운다 */
  .tp-cf { display: grid; flex: 1 1 auto; grid-template-columns: minmax(0, 1fr); }
  .tp-cf .tp-map { order: -1; min-height: 240px; border-radius: 0; }
  @media (min-width: 1024px) {
    .tp-cf { grid-template-columns: minmax(0, 520px) minmax(0, 1fr); align-items: start; }
    .tp-cf .tp-map { order: 0; position: sticky; top: var(--tp-topbar-h, 52px); height: calc(100vh - var(--tp-topbar-h, 52px)); box-shadow: inset 1px 0 0 var(--ds-color-stroke-neutral-muted); }  /* 52 = ds-topnav 높이(안쪽 x2 + 항목 36), 11-10 사용자 "지도 상단 여백" */
  }
  .tp-cf__filter { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-center { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ds-space-x2) var(--ds-space-x4); align-items: start; }
  .tp-center[aria-current] { margin-inline: calc(var(--ds-space-x3) * -1); padding-inline: var(--ds-space-x3); border-radius: var(--ds-shape-md); background: var(--ds-color-bg-neutral-weak-alpha); }
  .tp-center__acts { display: flex; gap: var(--ds-space-x2); }
  .tp-pin { position: absolute; color: var(--ds-color-fg-neutral); }
  .tp-pin[data-on] { color: var(--ds-color-fg-brand); }
`;
  const cs = [
    ['강남 센터', ['서울 강남구 테헤란로 10', '02-0000-0001'], ['토익', '회화', '중국어'], 1],
    ['종로 센터', ['서울 종로구 종로 20', '02-0000-0002'], ['토익', '회화', '일본어']],
    ['신촌 센터', ['서울 서대문구 신촌로 30', '02-0000-0003'], ['토익', '회화']],
    ['노량진 센터', ['서울 동작구 노량진로 40', '02-0000-0004'], ['토익', '공무원 영어']],
    ['잠실 센터', ['서울 송파구 올림픽로 50', '02-0000-0005'], ['회화', '중국어']],
  ];
  const row = ([n, info, subj, on]) => `<div class="tp-center"${on ? ' aria-current="true"' : ''}><div class="tp-stack" style="gap: var(--ds-space-x1_5)"><span class="tp-item-title">${n}</span>${tags(info, 't4')}<div class="tp-row" style="flex-wrap: wrap; gap: var(--ds-space-x1)">${subj.map((s) => badge(s)).join('')}</div></div><div class="tp-center__acts">${iconBtn('map-pin', n + ' 지도에서 보기', { variant: 'neutralWeak' })}${btn('상담 예약', { variant: 'neutralSolid' })}</div></div>`;
  const pins = [[22, 30, 1], [38, 52], [55, 26], [64, 70], [78, 44]];
  const body = app(3, `
<div class="tp-cf">
<main class="tp-content">
  <h1 class="tp-h1">센터 찾기</h1>
  <div class="tp-cf__filter" role="search">
    ${search('cf-q', '센터 이름, 지역')}
    ${chiptabs(['전체 29', '서울 12', '경기 8', '인천 3', '부산 4', '대구 2'], 1, '지역')}
    <div class="tp-chips" role="group" aria-label="과정">${['토익', '회화', '중국어', '일본어', '공무원 영어'].map((t, i) => chip(t, { on: i < 2 })).join('')}</div>
  </div>
  <section class="tp-sec" aria-label="센터 목록"><span class="tp-sub">센터 ${T('12')}곳</span><div class="tp-rows">${cs.map(row).join('')}</div><div style="display:flex;justify-content:center">${K.pagination(1, 3)}</div></section>
</main>
<div class="tp-map" role="img" aria-label="센터 위치 지도">${pins.map(([x, y, on]) => `<span class="tp-pin" style="left:${x}%;top:${y}%"${on ? ' data-on' : ''}>${icon('map-pin', 'lg')}</span>`).join('')}</div>
</div>`);
  return { slug: 'center-finder', en: 'Center Finder', name: '센터 찾기', group: 'Learning', desc: '지역과 과정으로 가까운 센터를 찾고 상담을 예약하는 화면입니다.', css, body };
};

/* 3. 수업 옵션 선택 -------------------------------------------------- */
const plan = () => {
  const css = CSS + `
  .tp-opt { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); }
  @media (min-width: 768px) { .tp-opt { grid-template-columns: 120px minmax(0, 1fr); align-items: center; } }
  .tp-slots { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--ds-space-x2); }
  .tp-slots .ds-chip { justify-content: center; }
`;
  const opt = (label, ctrl) => `<div class="tp-opt"><span class="tp-h4">${label}</span>${ctrl}</div>`;
  const chips = (items, cur, aria) => `<div class="tp-chips" role="group" aria-label="${esc(aria)}">${items.map((t, i) => chip(t, { on: i === cur, size: 'medium' })).join('')}</div>`;
  const slot = (t, on = false, off = false) => `<button type="button" class="ds-chip" data-variant="outlineWeak" data-size="medium"${on ? ' aria-pressed="true"' : ''}${off ? ' disabled' : ''}>${t}</button>`;
  const body = app(0, `
${head('수업 옵션 선택')}
<main class="tp-content">
  <div class="tp-two">
    <div class="tp-stack" style="gap: var(--ds-space-x4)">
      ${card(`<span class="tp-h3">수업</span>${opt('언어', chips(['영어', '중국어', '일본어'], 0, '언어'))}${opt('방식', segmented(['전화', '화상'], 1, '수업 방식', 'medium'))}${opt('수업 시간', chips(['10분', '20분', '30분'], 1, '수업 시간'))}${opt('주 횟수', chips(['주 2회', '주 3회', '주 5회'], 1, '주 횟수'))}`)}
      ${card(`<span class="tp-h3">수강 기간</span>${selectbox('period', [['1개월', '12회 / 89,000원'], ['3개월', '36회 / 237,000원'], ['6개월', '72회 / 438,000원']], 1, { cols: 3, vertical: true })}`)}
      ${card(`<div class="tp-between"><span class="tp-h3">수업 시간대</span>${segmented(['오전', '오후', '저녁'], 2, '시간대')}</div><div class="tp-slots">${slot('18:00')}${slot('18:30', false, true)}${slot('19:00', true)}${slot('19:30')}${slot('20:00')}${slot('20:30')}${slot('21:00', false, true)}${slot('21:30')}</div>`)}
      ${card(`<span class="tp-h3">교재</span>${checkbox('교재 함께 받기 (+18,000원)', { checked: true })}`)}
    </div>
    <aside class="tp-aside-sticky">
      ${card(`<span class="tp-h3">선택한 수업</span>${kvs([['언어', '영어'], ['방식', '화상'], ['수업', '20분 / 주 3회'], ['기간', '3개월 (36회)'], ['시간', '평일 19:00']])}${divider()}${kvs([['수강료', T('237,000원')], ['3개월 할인', T('-23,700원')], ['교재', T('18,000원')]])}<div class="tp-total"><span class="tp-h4">결제 금액</span><span class="tp-mid">${T('231,300원')}</span></div>`)}
      ${btn('231,300원 결제하기', { variant: 'brandSolid', size: 'large', fill: true })}
      ${btn('장바구니 담기', { size: 'large', fill: true })}
    </aside>
  </div>
</main>`);
  return { slug: 'lesson-plan', en: 'Lesson Plan Picker', name: '수업 옵션 선택', group: 'Learning', desc: '수업 방식, 시간, 횟수, 기간을 고르면 금액이 바로 바뀌는 구매 화면입니다.', css, body };
};

/* 4. 교재 상세 ------------------------------------------------------ */
const book = () => {
  const css = CSS + `
  .tp-bk { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x8); }
  @media (min-width: 768px) { .tp-bk { grid-template-columns: 280px minmax(0, 1fr); align-items: start; } }
  .tp-cover { --ds-imageframe-ratio: 3 / 4; width: min(100%, 240px); }
  @media (min-width: 768px) { .tp-cover { width: 100%; } }
  .tp-bk > .tp-stack { max-width: 560px; }
  .tp-bk__buy { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2); }
  .tp-file-row { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-file-row .tp-row { gap: var(--ds-space-x1); }
`;
  const track = (t, len) => `<div class="tp-file-row"><span class="tp-row" style="gap: var(--ds-space-x3)">${iconBtn('play', t + ' 듣기', { variant: 'neutralWeak' })}<span>${t}</span></span><span class="tp-row"><span class="tp-caption">${T(len)}</span>${iconBtn('download', t + ' 내려받기')}</span></div>`;
  const file = (t, size) => `<div class="tp-file-row"><span class="tp-row" style="gap: var(--ds-space-x3)">${icon('file-text')}<span>${t}</span></span><span class="tp-row"><span class="tp-caption">${T(size)}</span>${iconBtn('download', t + ' 내려받기')}</span></div>`;
  const lec = (t, i, len) => `<a class="tp-stack" href="#" style="gap: var(--ds-space-x2); color: inherit; text-decoration: none">${thumb('16:9', '', photo('study', i, 480), 'md')}<span class="tp-name">${t}</span><span class="tp-caption">${T(len)}</span></a>`;
  const body = app(1, `
<main class="tp-content">
  ${breadcrumbs(['교재', '토익', '실전 모의고사'])}
  <div class="tp-bk">
    ${thumb('1:1', 'tp-cover', photo('book', 2, 600), 'md')}
    <div class="tp-stack" style="gap: var(--ds-space-x5)">
      <div class="tp-stack" style="gap: var(--ds-space-x2)">${badge('신간', 'brand')}<h1 class="tp-h1">토익 실전 모의고사 1000제</h1>${tags(['어학연구소 지음', '2026.10', '384쪽'], 't4')}<span class="ds-rating" data-size="small" style="--ds-rating-value: 4.6" role="img" aria-label="5점 만점에 4.6점, 후기 214개"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.6</span><span class="ds-rating__count">(214)</span></span></div>
      <div class="tp-row" style="align-items: baseline"><span class="tp-mid">${T('23,400원')}</span><span class="tp-caption" style="text-decoration: line-through">${T('26,000원')}</span>${badge('10%', 'critical')}</div>
      ${kvs([['ISBN', T('979-11-0000-000-0')], ['구성', '본책 + 해설집'], ['음원', 'MP3 무료']])}
      <div class="tp-bk__buy">${btn('장바구니', { size: 'large' })}${btn('바로 구매', { variant: 'brandSolid', size: 'large' })}${iconBtn('heart', '찜하기', { variant: 'neutralWeak', size: 'large' })}</div>
    </div>
  </div>
  ${tabs(['자료', '목차', '소개'], 0, '교재 정보', { layout: 'hug', inset: 'none' })}
  <section class="tp-sec">${secHead('음원', { tools: btn('전체 내려받기', { ic: 'download', size: 'xsmall' }) })}<div class="tp-rows">${[['Test 1 Part 1-4', '45:12'], ['Test 2 Part 1-4', '45:30'], ['Test 3 Part 1-4', '44:58'], ['Test 4 Part 1-4', '45:05']].map(([t, l]) => track(t, l)).join('')}</div></section>
  <section class="tp-sec">${secHead('무료 강의')}<div class="tp-g4">${[['Part 5 문법 핵심', '12:40'], ['Part 7 시간 줄이기', '15:20'], ['Part 3 패턴', '10:05'], ['Part 2 오답 피하기', '09:48']].map(([t, l], i) => lec(t, i, l)).join('')}</div></section>
  <section class="tp-sec">${secHead('자료')}<div class="tp-rows">${file('정답과 해설.pdf', '4.2MB')}${file('단어장.pdf', '1.1MB')}${file('답안지.pdf', '0.3MB')}</div></section>
  <section class="tp-sec">${secHead('목차')}<div>${accordion([['Test 1', '<p>Part 1 ~ Part 7</p>', true], ['Test 2', '<p>Part 1 ~ Part 7</p>'], ['Test 3', '<p>Part 1 ~ Part 7</p>'], ['Test 4', '<p>Part 1 ~ Part 7</p>']])}</div></section>
</main>`);
  return { slug: 'textbook-detail', en: 'Textbook Detail', name: '교재 상세', group: 'Learning', desc: '책 정보와 음원, 무료 강의, 자료 파일을 한 화면에서 보고 받는 교재 상세 화면입니다.', css, body };
};

/* 5. 상담 예약 ------------------------------------------------------ */
const consult = () => {
  const css = CSS + `
  .tp-form2 { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); }
  @media (min-width: 768px) { .tp-form2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } .tp-form2 > .tp-full { grid-column: 1 / -1; } }
`;
  const sess = [['강남 센터 / 11.15 (토) 14:00', '중학생 / 남은 자리 8석'], ['강남 센터 / 11.22 (토) 14:00', '고등학생 / 남은 자리 12석'], ['종로 센터 / 11.16 (일) 11:00', '성인 / 남은 자리 3석'], ['신촌 센터 / 11.23 (일) 15:00', '성인 / 남은 자리 20석']];
  const body = app(3, `
${head('상담 예약')}
<main class="tp-content">
  <div class="tp-two">
    <div class="tp-stack" style="gap: var(--ds-space-x4)">
      ${card(`<div class="tp-between"><span class="tp-h3">일정</span>${select('서울', { id: 'cb-region', aria: '지역' })}</div>${selectbox('sess', sess, 0)}`)}
      ${card(`<span class="tp-h3">신청 정보</span><div class="tp-form2">${field('cb-name', '이름', input('cb-name', 'value="와이비엠" autocomplete="name"'), { required: true })}${field('cb-phone', '휴대폰', input('cb-phone', 'type="tel" inputmode="tel" value="010-1234-5678" autocomplete="tel"'), { required: true })}${field('cb-grade', '학년', select('중학교 2학년', { id: 'cb-grade', size: 'medium' }))}${field('cb-mail', '이메일', input('cb-mail', 'type="email" value="ybm@example.com" autocomplete="email"'))}<div class="tp-full">${field('cb-memo', '상담 내용', textarea('cb-memo', 'rows="4"'))}</div></div>`)}
      ${card(`${checkbox('<b>전체 동의</b>')}${divider()}<div class="tp-stack" style="gap: var(--ds-space-x3)">${['[필수] 개인정보 수집과 이용', '[선택] 소식과 혜택 받기'].map((t) => `<div class="tp-between">${checkbox(t)}${link('보기')}</div>`).join('')}</div>`)}
    </div>
    <aside class="tp-aside-sticky">
      ${card(`<span class="tp-h3">예약 내용</span>${kvs([['센터', '강남 센터'], ['날짜', '11.15 (토)'], ['시간', '14:00'], ['대상', '중학생']])}`)}
      ${btn('예약하기', { variant: 'brandSolid', size: 'large', fill: true })}
    </aside>
  </div>
</main>`);
  return { slug: 'consult-booking', en: 'Consultation Booking', name: '상담 예약', group: 'Learning', desc: '설명회나 상담 일정을 골라 신청 정보를 넣고 예약하는 화면입니다.', css, body };
};

/* 6. 고객센터 홈 ---------------------------------------------------- */
const help = () => {
  const css = CSS + `
  .tp-hc-q { display: flex; flex-direction: column; gap: var(--ds-space-x3); width: min(100%, 640px); }
  .tp-tel { font-size: var(--ds-font-size-t09); line-height: var(--ds-line-height-t09); font-weight: var(--ds-font-weight-semibold); font-variant-numeric: tabular-nums; }
  .tp-notice { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
`;
  const faq = [['수험표는 언제 출력할 수 있나요?', '<p>시험 7일 전부터 내 시험에서 출력할 수 있어요.</p>', true], ['접수를 취소하면 응시료는 얼마나 돌려받나요?', '<p>접수 마감 전까지는 전액, 마감 뒤에는 응시료의 절반을 돌려드려요.</p>'], ['고사장을 바꿀 수 있나요?', '<p>접수 마감 전까지 내 시험에서 바꿀 수 있어요.</p>'], ['성적표를 다시 받을 수 있나요?', '<p>성적 확인에서 발급을 신청할 수 있어요.</p>'], ['교재 음원은 어디에서 받나요?', '<p>교재 상세의 자료 탭에서 받을 수 있어요.</p>']];
  const notices = [['설 연휴 상담 시간 안내', '01.20'], ['12월 정기 시험 고사장 추가', '11.04'], ['결제 수단 점검 안내', '10.28']];
  const body = app(4, `
${head('고객센터')}
<main class="tp-content">
  <div class="tp-hc-q">${search('hc-q', '궁금한 내용 찾기')}</div>
  <div class="tp-two">
    <div class="tp-stack" style="gap: var(--ds-space-x8)">
      <section class="tp-sec">${secHead('자주 묻는 질문')}${chiptabs(['전체', '접수', '결제와 환불', '성적', '계정', '교재'], 0, '질문 분류')}<div>${accordion(faq)}</div></section>
      <section class="tp-sec">${secHead('공지', { tools: link('모두 보기') })}<div class="tp-rows">${notices.map(([t, d]) => `<a class="tp-notice" href="#" style="color: inherit; text-decoration: none"><span class="tp-name">${t}</span><span class="tp-caption">${T(d)}</span></a>`).join('')}</div></section>
    </div>
    <aside class="tp-aside-sticky">
      ${card(`<span class="tp-h3">전화 상담</span><span class="tp-tel">1588-0000</span>${kvs([['평일', T('09:00 ~ 18:00')], ['점심', T('12:00 ~ 13:00')]])}<div class="tp-row">${btn('1:1 문의', { variant: 'neutralSolid', ic: 'square-pen' })}${btn('채팅 상담', { ic: 'message-circle' })}</div>`)}
      ${card(`<span class="tp-h3">바로 가기</span><div>${list([listItem('증명서 발급', { prefix: icon('file-text'), chevron: true }), listItem('성적 진위 확인', { prefix: icon('shield-check'), chevron: true }), listItem('환불 신청', { prefix: icon('receipt'), chevron: true }), listItem('내 문의 내역', { prefix: icon('inbox'), chevron: true })])}</div>`)}
    </aside>
  </div>
</main>`);
  return { slug: 'help-center', en: 'Help Center', name: '고객센터', group: 'Community', desc: '자주 묻는 질문을 찾고 1:1 문의나 전화 상담으로 이어지는 고객센터 첫 화면입니다.', css, body };
};

export const templates = [schedule, centers, plan, book, consult, help].map((f) => f());
