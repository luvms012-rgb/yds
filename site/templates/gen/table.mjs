import * as K from './kit.mjs';
const { icon, btn, iconBtn, badge, dot, card, head, secHead, table, segmented, selField, avatar, link, divider, search, sw, checkOnly, tabs, select, breadcrumbs, tablePager, codeblock, input, field, esc } = K;
const T = (s) => `<span class="tp-num">${s}</span>`;
const won = (n) => n.toLocaleString() + '원';

const TABLE_CSS = `
  .tp-grouprow__in { display: flex; align-items: center; gap: var(--ds-space-x2); font-weight: var(--ds-font-weight-semibold); }
  .tp-tpage { gap: var(--ds-space-x5); padding-top: var(--ds-space-x6); }
  .tp-tpage__head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ds-space-x3) var(--ds-space-x4); }
`;
const grow = (cols, label, count, extra = '') => `<tr class="ds-table__group"><td colspan="${cols}"><span class="tp-grouprow__in"><button type="button" class="ds-btn tp-caret" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-expanded="true" aria-label="${esc(label)} 접기">${icon('chevron-down', 'sm')}</button>${label}${count !== '' ? badge(String(count)) : ''}${extra}</span></td></tr>`;
const trs = (rows) => rows.map((r) => `<tr>${r.map((c) => `<td${c && c.startsWith && c.startsWith('@end') ? ' data-align="end"' : ''}>${c && c.startsWith && c.startsWith('@end') ? c.slice(4) : c}</td>`).join('')}</tr>`).join('');
const thead = (cols) => `<thead><tr>${cols.map((c) => { const [t, a] = Array.isArray(c) ? c : [c]; return `<th scope="col"${a ? ` data-align="${a}"` : ''}>${t}</th>`; }).join('')}</tr></thead>`;

/* 1. 접는 표 ---------------------------------------------- */
const collapsible = () => {
  const groups = [
    ['예금/적금', 4, '1억 2,480만원', ['계좌', '은행', ['잔액', 'end'], ['금리', 'end'], '최근 거래'], [['생활비 통장', '가 은행 **** 4821', '@end8,240,000원', '@end0.1%', '오늘'], ['비상금 통장', '나 은행 **** 1093', '@end21,560,000원', '@end2.8%', '어제'], ['청약 저축', '가 은행 **** 7730', '@end18,000,000원', '@end2.3%', '10.25'], ['정기 예금', '다 은행 **** 5512', '@end77,000,000원', '@end3.4%', '10.02']]],
    ['투자', 3, '4억 6,120만원', ['계좌', '증권사', ['평가액', 'end'], ['수익률', 'end'], '최근 거래'], [['국내 주식', '라 증권 **** 2209', '@end184,200,000원', '@end' + badge('+12.4%', 'positive'), '오늘'], ['해외 주식', '라 증권 **** 2210', '@end231,600,000원', '@end' + badge('+18.9%', 'positive'), '어제'], ['연금 저축', '마 증권 **** 8814', '@end45,400,000원', '@end' + badge('-1.2%', 'critical'), '10.29']]],
    ['연금', 2, '2억 1,840만원', ['계좌', '운용사', ['적립금', 'end'], ['올해 납입', 'end'], '최근 거래'], [['퇴직 연금 DC', '바 생명 **** 0042', '@end162,400,000원', '@end7,200,000원', '10.25'], ['개인 IRP', '라 증권 **** 3301', '@end56,000,000원', '@end9,000,000원', '10.10']]],
    ['카드', 2, '-312만원', ['카드', '카드사', ['이번 달 사용', 'end'], ['결제일', 'end'], '최근 거래'], [['생활 카드', '가 카드 **** 9921', '@end1,840,000원', '@end15일', '오늘'], ['출장 카드', '사 카드 **** 4410', '@end1,280,000원', '@end25일', '10.30']]],
    ['대출', 2, '-1억 3,600만원', ['대출', '은행', ['남은 원금', 'end'], ['금리', 'end'], '다음 상환'], [['주택 담보 대출', '가 은행 **** 6620', '@end128,000,000원', '@end3.9%', '11.15'], ['신용 대출', '나 은행 **** 2281', '@end8,000,000원', '@end5.2%', '11.20']]],
  ];
  const css = TABLE_CSS + `
  .tp-coll { border-radius: inherit; }
  .tp-coll > summary { display: flex; align-items: center; gap: var(--ds-space-x3); padding: var(--ds-space-x1) 0 var(--ds-space-x3); list-style: none; cursor: pointer; }
  .tp-coll > summary::-webkit-details-marker { display: none; }
  .tp-coll > summary .ds-icon { transition: transform var(--ds-duration-fast) var(--ds-easing-standard); }
  .tp-coll:not([open]) > summary { padding-bottom: var(--ds-space-x1); }
  .tp-coll:not([open]) > summary .ds-icon { transform: rotate(-90deg); }
  .tp-coll th:first-child { width: 48px; }
  .tp-coll .ds-table { min-width: 760px; }  /* 11-11 모바일: 칸이 53px 로 눌리던 것, 옆으로 민다 */
  .tp-coll__total { margin-left: auto; font-weight: var(--ds-font-weight-semibold); font-variant-numeric: tabular-nums; }
`;
  const body = `<div class="tp-app">
${head('연결된 계좌', { tools: `${btn('계좌 연결', { variant: 'neutralSolid', ic: 'plus' })}${segmented(['1개월', '3개월', '6개월', '1년', '전체'], 2, '기간')}` })}
<main class="tp-content" style="gap: var(--ds-space-x3)">
  ${groups.map(([g, n, tot, cols, rows], gi) => card(`<details class="tp-coll"${gi < 3 ? ' open' : ''}><summary>${icon('chevron-down', 'sm')}<h2 class="tp-h3">${g}</h2>${badge(n + '개')}<span class="tp-coll__total">${tot}</span></summary><div class="ds-table-wrap"><table class="ds-table" data-size="small">${thead(['', ...cols])}<tbody>${rows.map((r) => `<tr><td style="width:40px"><button type="button" class="ds-btn tp-caret" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-expanded="false" aria-label="${esc(r[0])} 자세히">${icon('chevron-right', 'sm')}</button></td>${r.map((c, i) => `<td${Array.isArray(cols[i]) ? ` data-align="${cols[i][1]}"` : ''}>${i === 0 ? `<span class="ds-table__stack"><span>${c}</span><span>${r[1]}</span></span>`.replace(`<span>${r[1]}</span></span>`, `<span>${r[1].split(' **** ')[1] ? '**** ' + r[1].split(' **** ')[1] : ''}</span></span>`) : (i === 1 ? String(c).split(' **** ')[0] : String(c).replace('@end', ''))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`)).join('')}
</main>
</div>`;
  return { slug: 'table-collapsible', en: 'Collapsible Table', name: '접는 표', group: 'Admin', desc: '열 구성이 다른 표 여러 개를 접고 펼치며 보는 화면입니다. 표 하나로 합치면 빈칸이 많아질 때 사용합니다.', css, body };
};

/* 2. 필터 표 ----------------------------------------------------- */
const filter = () => {
  const groups = [['강남점', [['SJ-2139', '제빙기 작동 안 함', '김도윤', ['예정', 'informative'], ['critical', '긴급'], '11.13 오후 1:42'], ['SJ-2141', '주방 후드 소음', '이서연', ['진행', 'brand'], ['warning', '높음'], '11.13 오후 3:10'], ['SJ-2150', '냉장고 온도 경보', '김도윤', ['예정', 'informative'], ['critical', '긴급'], '11.14 오전 9:00']]], ['판교점', [['SJ-2102', '출입문 센서 교체', '박지후', ['완료', 'positive'], ['neutral', '보통'], '11.10 오전 11:20'], ['SJ-2118', '조명 일부 깜빡임', '최하은', ['진행', 'brand'], ['neutral', '보통'], '11.12 오후 2:30'], ['SJ-2133', '에어컨 필터 청소', '박지후', ['대기', 'neutral'], ['neutral', '낮음'], '11.15 오전 10:00']]], ['성수점', [['SJ-2097', '배수구 막힘', '정민재', ['완료', 'positive'], ['warning', '높음'], '11.09 오후 4:05'], ['SJ-2126', '키오스크 결제 오류', '한지아', ['진행', 'brand'], ['critical', '긴급'], '11.13 오전 8:40']]]];
  const css = TABLE_CSS + `
  .tp-ftable th:nth-child(2) { width: 40%; }
`;
  const body = `<div class="tp-app">
<main class="tp-content tp-tpage" aria-label="작업">
  <header class="tp-tpage__head"><div class="tp-stack" style="gap: var(--ds-space-x1_5)"><h1 class="tp-h1">작업</h1></div><div class="tp-row">${btn('내보내기', { ic: 'download' })}${btn('작업 만들기', { variant: 'neutralSolid', ic: 'plus' })}</div></header>
  <div class="tp-stack" style="gap: var(--ds-space-x3)">
    ${K.chiptabs(['전체 55', '예정 18', '진행 21', '완료 12', '대기 4'], 0, '상태')}
    <div class="tp-ttools"><span class="tp-sub">작업 ${T('55')}개 / ${link('조건 지우기')}</span><div class="tp-ttools__end">${K.even(select('모든 우선순위', { aria: '우선순위' }) + select('모든 담당자', { aria: '담당자' }) + select('지점 3곳', { aria: '지점' }) + select('이번 주', { aria: '기간' }) + search('q', '작업 찾기'))}</div></div>
  </div>
  <div class="ds-table-wrap"><table class="ds-table tp-ftable" data-ds-selection="tf-sel">${thead([checkOnly('모든 행 선택'), '작업', '담당자', '상태', '우선순위', ['일정', 'end']])}<tbody>${groups.map(([g, rows]) => grow(6, g, rows.length) + rows.map(([id, n, who, [st, tn], [pt, pl], when]) => `<tr><td>${checkOnly(id + ' ' + n + ' 선택')}</td><td><span class="ds-table__stack"><span>${n}</span><span>${id}</span></span></td><td><span class="tp-row">${avatar(who)}${who}</span></td><td>${badge(st, tn)}</td><td><span class="tp-row">${dot(pt, pl)}${pl}</span></td><td data-align="end">${T(when)}</td></tr>`).join('')).join('')}</tbody></table></div>
  <div class="tp-tfoot">${K.pagination(1, 6)}</div>
</main>
${K.selectionBar('tf-sel', [['상태 바꾸기', 'circle-dot'], ['담당자 지정', 'user'], ['삭제', 'trash']], '고른 작업')}
</div>`;
  return { slug: 'table-filter', en: 'Filterable Table', name: '필터 표', group: 'Admin', desc: '검색과 조건으로 필요한 행만 보여 주는 표입니다. 행이 많고 필터 기준이 여러 개일 때 사용합니다.', css, body };
};

/* 3. 묶음 표 ----------------------------------------------------- */
const grouped = () => {
  const groups = [['진행 중', 'brand', [['T-2350', ['결제'], '간편 결제 연동 2차', '7.03', '7.18', '와이비엠'], ['T-2351', ['앱'], '푸시 알림 설정 화면', '7.05', '7.20', '이준호'], ['T-2355', ['웹', '디자인'], '강좌 상세 리뉴얼', '7.08', '7.25', '박하린']]], ['할 일', 'informative', [['T-2360', ['결제'], '환불 사유 선택 추가', '-', '7.30', '최민준'], ['T-2362', ['앱'], '오프라인 저장 용량 표시', '-', '8.02', '정다은'], ['T-2363', ['데이터'], '주간 리포트 자동 발송', '-', '8.05', '한지우'], ['T-2366', ['웹'], '검색 결과 정렬 옵션', '-', '8.09', '와이비엠']]], ['백로그', 'neutral', [['T-2370', ['기타'], '처음 오신 분 안내 투어', '-', '-', '이준호'], ['T-2371', ['앱'], '다크 모드 색 점검', '-', '-', '박하린']]]];
  const css = TABLE_CSS + `
  .tp-gtable th:nth-child(2) { width: 44%; }
`;
  const n = groups.reduce((a, g) => a + g[2].length, 0);
  const body = `<div class="tp-app">
<main class="tp-content tp-tpage" aria-label="모든 이슈">
  <header class="tp-tpage__head"><div class="tp-stack" style="gap: var(--ds-space-x1_5)"><h1 class="tp-h1">모든 이슈</h1></div>${btn('새 이슈', { variant: 'neutralSolid', ic: 'plus' })}</header>
  <div class="tp-stack" style="gap: var(--ds-space-x3)">
    ${K.chiptabs(['전체 ' + n, ...groups.map(([g, , rows]) => g + ' ' + rows.length)], 0, '상태')}
    <div class="tp-ttools"><span class="tp-sub">이슈 ${T(String(n))}개</span><div class="tp-ttools__end">${K.even(select('모든 담당자', { aria: '담당자' }) + select('마감 빠른 순', { aria: '정렬' }) + search('q', '이슈 찾기'))}</div></div>
  </div>
  <div class="ds-table-wrap"><table class="ds-table tp-gtable">${thead(['번호', '제목', '담당', '시작', '마감', '<span class="tp-sr">동작</span>'])}<tbody>${groups.map(([g, tone, rows]) => grow(6, `${dot(tone)}${g}`, rows.length) + rows.map(([id, labels, t, st, d, who]) => `<tr><td>${T(id)}</td><td><span class="tp-row">${t}${labels.map((l) => badge(l)).join('')}</span></td><td><span class="tp-row">${avatar(who)}${who}</span></td><td>${T(st)}</td><td>${T(d)}</td><td data-align="end">${iconBtn('ellipsis', t + ' 동작')}</td></tr>`).join('')).join('')}</tbody></table></div>
</main>
</div>`;
  return { slug: 'table-grouped', en: 'Grouped Table', name: '묶음 표', group: 'Admin', desc: '행을 상태별로 묶어 보여 주는 표입니다. 긴 목록을 몇 덩어리로 나눠 읽을 때 사용합니다.', css, body };
};

/* 4. 받은함 표 (2026-11-10 사용자 "레퍼런스 받은함 표 기준으로 대폭 수정") -------------
   왼쪽 표는 목록, 오른쪽은 읽는 창. 표 행은 이름(Medium) 위, 제목(옅은 색) 아래 한 줄 말줄임.
   읽는 창은 메시지마다 아바타 / 이름과 주소 / 시간과 펼침 단추, 펼친 메시지 아래에 첨부와 답장 단추 */
const inbox = () => {
  const rows = [[1, '와이비엠', '결제 페이지가 일부 해외 카드에서 오류가 나요', '오전 9:52', 1], [1, '이준호', '11월 단체 수강 견적 다시 부탁드려요', '오전 9:31', 0], [1, '박하린', '강의 영상 자막 싱크가 맞지 않아요', '오전 8:58', 0], [0, '최민준', '모의고사 점수가 마이페이지에 반영되지 않아요', '오전 8:14', 0], [0, '정다은', '세금 계산서 발행 요청드립니다', '어제', 1], [0, '한지우', '앱에서 로그인이 자꾸 풀려요', '어제', 0], [0, '오세린', '수강 기간 연장이 가능한지 궁금해요', '어제', 0], [0, '윤도현', '기업 관리자 권한을 한 명 더 추가하고 싶어요', '월', 0], [0, '서지민', '교재 배송 주소를 바꾸고 싶어요', '월', 0]];
  const css = TABLE_CSS + `
  /* 탭은 제목 묶음과 떼어 둔다(11-10 사용자 "탭을 위 그룹과 여백을 더 주어 분리") */
  .tp-ibx-tabs { padding-inline: var(--tp-gutter); margin-top: var(--ds-space-x6); }
  @media (min-width: 1024px) { .tp-ibx-app { height: 100vh; } }
  .tp-inbox { display: grid; flex: 1 1 auto; grid-template-columns: minmax(0, 1fr); min-height: 0; box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 1024px) { .tp-inbox { grid-template-columns: minmax(0, 1fr) 8px minmax(0, 1.5fr); } }
  .tp-inbox__list { overflow: auto; }
  .tp-inbox__list .ds-table { border-top: 0; }  /* 진한 윗선 없이 칸 경계의 옅은 선 하나만 (카드 안 표와 같음) */
  .tp-inbox__list .ds-table th:first-child, .tp-inbox__list .ds-table td:first-child { box-sizing: content-box; width: 8px; padding-inline-end: var(--ds-space-x1); overflow: visible; }
  .tp-inbox__list td:nth-child(2) { width: 100%; max-width: 0; }
  .tp-unread { display: block; width: 8px; height: 8px; border-radius: 50%; background: var(--ds-color-fg-neutral); }
  .tp-inbox__row { display: flex; flex-direction: column; gap: 2px; }
  .tp-inbox__row > span:last-child { overflow: hidden; color: var(--ds-color-fg-neutral-muted); white-space: nowrap; text-overflow: ellipsis; }
  .tp-inbox__who { font-weight: var(--ds-font-weight-medium); }
  .tp-inbox__when { justify-content: flex-end; white-space: nowrap; color: var(--ds-color-fg-neutral-muted); }
  .tp-handle { display: none; place-items: center; cursor: col-resize; box-shadow: inset 1px 0 0 var(--ds-color-stroke-neutral-muted); }
  .tp-handle::after { content: ""; width: 4px; height: 32px; border-radius: 2px; background: var(--ds-color-stroke-neutral-weak); }
  @media (min-width: 1024px) { .tp-handle { display: grid; } }
  .tp-read { display: flex; flex-direction: column; gap: var(--ds-space-x6); min-width: 0; padding: var(--ds-space-x6) var(--tp-gutter) var(--ds-space-x10); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 1024px) { .tp-read { box-shadow: none; } }
  .tp-read__head { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-read__title { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--ds-space-x4); }
  .tp-read__title > .tp-row { flex: none; gap: var(--ds-space-x1); }
  .tp-thread { display: flex; flex-direction: column; gap: var(--ds-space-x6); }
  .tp-msg > summary { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: var(--ds-space-x3); list-style: none; cursor: pointer; }
  .tp-msg > summary::-webkit-details-marker { display: none; }
  .tp-msg__from { display: flex; flex-direction: column; min-width: 0; }
  .tp-msg__from b { font-weight: var(--ds-font-weight-medium); }
  .tp-msg__time { display: flex; align-items: center; gap: var(--ds-space-x1); }
  .tp-msg__time .ds-icon { transition: transform var(--ds-duration-fast) var(--ds-easing-standard); }
  .tp-msg[open] .tp-msg__time .ds-icon { transform: rotate(180deg); }
  .tp-msg__body { display: flex; flex-direction: column; gap: var(--ds-space-x3); max-width: 640px; padding: var(--ds-space-x3) 0 0 calc(36px + var(--ds-space-x3)); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-msg__body p { margin: 0; }
  .tp-attach { display: flex; flex-direction: column; gap: var(--ds-space-x2); padding-top: var(--ds-space-x1); }
  .tp-attach .ds-imageframe { width: 64px; }
  .tp-msg__acts { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2); padding-top: var(--ds-space-x2); }
`;
  const msgs = [
    ['와이비엠', 'ybm@example.com', '오늘 오전 9:21', ['해외에서 발급한 카드로 결제하면 마지막 단계에서 "결제를 완료하지 못했어요"가 떠요. 국내 카드는 괜찮아요.']],
    ['이민지', 'minji.lee@support.example', '오늘 오전 9:30', ['불편을 드려 죄송해요. 결제 대행사에 확인을 요청했어요. 사용하신 카드 종류를 알려 주실 수 있을까요?']],
    ['와이비엠', 'ybm@example.com', '오늘 오전 9:52', ['해외 발급 비자 카드예요. 두 장 모두 같은 오류가 났어요.', '오류 화면을 찍어 함께 보내 드려요. 오늘 안에 결제해야 해서 확인 부탁드려요.'], 1],
  ];
  const msg = ([who, mail, when, ps, open]) => `<details class="tp-msg"${open ? ' open' : ''}><summary>${avatar(who, 36)}<span class="tp-msg__from"><b>${who}</b><span class="tp-caption">${mail}</span></span><span class="tp-msg__time tp-caption">${T(when)}${icon('chevron-down', 'sm')}</span></summary><div class="tp-msg__body">${ps.map((p) => `<p>${p}</p>`).join('')}${open ? `<div class="tp-attach"><span class="tp-row tp-caption">${icon('paperclip', 'sm')}첨부 1개</span>${K.thumb('1:1', '', K.photo('city', 1, 160), 'md')}</div><div class="tp-msg__acts">${btn('답장', { variant: 'neutralSolid', ic: 'undo-2' })}${btn('전체 답장', { ic: 'users' })}</div>` : ''}</div></details>`;
  const body = `<div class="tp-app tp-ibx-app">
<header class="tp-head">
  <div class="tp-head__texts"><h1 class="tp-h1">받은함</h1><p class="tp-sub">대화 9개 중 3개 읽지 않음</p></div>
  <div class="tp-head__tools">${btn('새로 고침', { variant: 'ghost', ic: 'refresh-cw' })}${btn('새 메시지', { variant: 'neutralSolid', ic: 'square-pen' })}</div>
</header>
<div class="tp-ibx-tabs">${tabs([`받은함 ${badge('3')}`, `확인 필요 ${badge('1')}`, '답변 대기', `해결됨 ${badge('1')}`], 0, '받은함 분류', { layout: 'hug', inset: 'none' })}</div>
<div class="tp-inbox">
  <div class="tp-inbox__list"><div class="ds-table-wrap"><table class="ds-table">${thead(['<span class="tp-sr">읽음 상태</span>', '대화', ['받은 시간', 'end']])}<tbody>${rows.map(([u, who, s, when, att], i) => `<tr data-interactive${i === 0 ? ' aria-selected="true"' : ''}><td>${u ? '<span class="tp-unread" role="img" aria-label="읽지 않음"></span>' : ''}</td><td><span class="tp-inbox__row"><span class="tp-inbox__who">${who}</span><span>${s}</span></span></td><td data-align="end"><span class="tp-row tp-inbox__when">${att ? icon('paperclip', 'sm') : ''}${T(when)}</span></td></tr>`).join('')}</tbody></table></div></div>
  <div class="tp-handle" role="separator" aria-label="대화 창 크기 조절" aria-orientation="vertical"></div>
  <section class="tp-read" aria-labelledby="ibx-title">
    <div class="tp-read__head">
      <div class="tp-read__title"><h2 class="tp-h2" id="ibx-title">결제 페이지가 일부 해외 카드에서 오류가 나요</h2><div class="tp-row">${iconBtn('archive', '보관')}${iconBtn('folder-input', '폴더로 옮기기')}${iconBtn('trash', '삭제')}${iconBtn('x', '대화 닫기')}</div></div>
      <div class="tp-row" style="flex-wrap: wrap">${badge('긴급', 'critical')}${badge('결제')}${badge('확인 필요')}</div>
    </div>
    <div class="tp-thread">${msgs.map(msg).join('')}</div>
  </section>
</div>
</div>`;
  return { slug: 'table-inbox', en: 'Inbox Table', name: '받은함 표', group: 'Admin', desc: '왼쪽 목록에서 선택한 항목을 오른쪽에서 바로 읽는 받은 편지함입니다. 메일이나 문의처럼 하나씩 열어 처리할 때 사용합니다.', css, body };
};

/* 5. 트리 표 (저장소) ------------------------------------------- */
const tree = () => {
  const rows = [[0, 'f', '.github', 'ci: 패키지 캐시를 실행 사이에 재사용 (#412)', '3시간 전', 1], [1, 'f', 'workflows', 'ci: 패키지 캐시를 실행 사이에 재사용 (#412)', '3시간 전', 1], [2, 'd', 'ci.yml', 'ci: 패키지 캐시를 실행 사이에 재사용 (#412)', '3시간 전'], [2, 'd', 'release.yml', 'chore: 배포 이름 규칙 바꿈', '2주 전'], [0, 'f', 'docs', 'docs: 도형 묶기 예제 추가', '어제', 0], [0, 'f', 'src', 'feat: 선택 상자 크기 조절 손잡이', '5시간 전', 1], [1, 'f', 'shapes', 'feat: 둥근 사각형 지원', '2일 전', 0], [1, 'd', 'canvas.ts', 'feat: 선택 상자 크기 조절 손잡이', '5시간 전'], [1, 'd', 'index.ts', 'refactor: 내보내기 정리', '1주 전'], [0, 'f', 'tests', 'test: 확대 축소 경계 값', '3일 전', 0], [0, 'd', '.gitignore', 'chore: 처음 만듦', '8개월 전'], [0, 'd', 'LICENSE', 'chore: 처음 만듦', '8개월 전'], [0, 'd', 'package.json', 'chore: 버전 1.4.0', '4일 전'], [0, 'd', 'README.md', 'docs: 설치 방법 정리', '어제']];
  const css = TABLE_CSS + `
  .tp-tree-name { display: flex; align-items: center; gap: var(--ds-space-x1); padding-left: calc(var(--d) * 20px); }
  .tp-tree-name .tp-spacer { width: 20px; }
  .tp-tree-name .ds-icon { color: var(--ds-color-fg-neutral-subtle); }
  .tp-tree-name a { color: var(--ds-color-fg-neutral); text-decoration: none; }
  .tp-tree-name a:hover { text-decoration: underline; }
  /* 본문과 정보를 나눈다(2026-11-10 사용자 "컨텐츠와 정보를 명확히 분리"): 다른 레이아웃과 같은 .tp-body--panel 틀, 오른쪽 정보 패널은 세로 선으로 나뉜다 */
  .tp-repo__head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-repo__head > .tp-row { flex-wrap: wrap; }
  .tp-repo__main { gap: var(--ds-space-x4); }
  .tp-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x2); }
  .tp-toolbar .tp-grow { flex: 1 1 200px; display: flex; justify-content: flex-end; gap: var(--ds-space-x2); flex-wrap: wrap; }
  .tp-about dl { display: grid; grid-template-columns: auto 1fr; gap: var(--ds-space-x2) var(--ds-space-x4); margin: 0; }
  .tp-about dt { color: var(--ds-color-fg-neutral-muted); }
  .tp-about dd { margin: 0; }
  .tp-md h3 { margin: 0 0 var(--ds-space-x2); }
  .tp-md h4 { margin: var(--ds-space-x5) 0 var(--ds-space-x2); }
`;
  const body = `<div class="tp-app">
<div class="tp-body tp-body--panel">
<main class="tp-content tp-repo__main">
<header class="tp-repo__head">
  <div class="tp-row" style="flex-wrap: wrap"><h1 class="tp-h1">canvas-editor</h1>${breadcrumbs(['canvas-editor'])}${badge('공개')}</div>
  <div class="tp-row">${btn('지켜보기', { ic: 'eye' })}${btn('포크 12', { ic: 'git-branch' })}${btn('별 248', { ic: 'star' })}${btn('코드', { variant: 'neutralSolid', ic: 'code', icEnd: 'chevron-down' })}</div>
</header>
  <div class="tp-toolbar">${K.even(`${btn('main', { ic: 'git-branch', icEnd: 'chevron-down' })}${btn('브랜치 8', { variant: 'ghost', ic: 'git-pull-request' })}${btn('태그 14', { variant: 'ghost', ic: 'tag' })}<div class="tp-grow"><div style="width: min(100%, 240px)">${input('goto', 'type="search" placeholder="파일로 이동" aria-label="파일로 이동"', { size: 'small', ic: 'search' })}</div>${btn('파일 추가', { icEnd: 'chevron-down' })}${btn('기록 1,284', { variant: 'ghost', ic: 'rotate-ccw' })}</div>`)}</div>
  <div class="ds-table-wrap"><table class="ds-table" data-size="small">${thead([`<span class="tp-row">${iconBtn('chevrons-up-down', '모든 행 펼치기', { size: 'xsmall' })}이름</span>`, '마지막 변경', ['시간', 'end']])}<tbody>${rows.map(([d, k, n, m, t, open]) => `<tr><td><span class="tp-tree-name" style="--d:${d}">${k === 'f' ? `<button type="button" class="ds-btn tp-caret" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-expanded="${!!open}" aria-label="${n} ${open ? '접기' : '펼치기'}">${icon(open ? 'chevron-down' : 'chevron-right', 'sm')}</button>${icon(open ? 'folder-open' : 'folder', 'sm')}` : `<span class="tp-spacer"></span>${icon('file', 'sm')}`}<a href="#">${n}</a></span></td><td class="tp-sub">${m}</td><td data-align="end">${T(t)}</td></tr>`).join('')}</tbody></table></div>
  ${card(`${tabs(['README', '라이선스', '기여 안내'], 0, '문서')}<div class="ds-markdown tp-md"><h3>canvas-editor</h3><p>웹 페이지에 넣어 쓰는 작은 벡터 캔버스예요. 도형을 그리고, 묶고, 크기를 바꾸고, 이미지로 내보낼 수 있어요.</p><h4>설치</h4>${codeblock('bash', 'npm install canvas-editor')}<h4>사용</h4>${codeblock('ts', "import { Canvas } from 'canvas-editor';\n\nconst canvas = new Canvas('#stage', { width: 800, height: 600 });\ncanvas.add({ type: 'rect', x: 40, y: 40, w: 120, h: 80 });")}</div>`)}
</main>
<aside class="tp-panel tp-about" aria-labelledby="s-about">
  <h2 class="tp-h3" id="s-about">정보</h2>
  <div class="tp-row" style="flex-wrap: wrap">${['canvas', 'vector', 'editor', 'typescript'].map((t) => badge(t, 'brand')).join('')}</div>
  <dl><dt>별</dt><dd class="tp-num">248</dd><dt>지켜보는 사람</dt><dd class="tp-num">19</dd><dt>포크</dt><dd class="tp-num">12</dd><dt>최근 릴리스</dt><dd>v1.4.0 / 4일 전</dd><dt>라이선스</dt><dd>MIT</dd></dl>
  ${divider()}
  <h3 class="tp-h4">참여자 8명</h3>${K.avatars(['와이비엠', '이준호', '박하린', '최민준', '정다은'], 24, 3)}
</aside>
</div>
</div>`;
  return { slug: 'table-tree', en: 'Tree Table', name: '트리 표', group: 'Admin', desc: '상위 행을 펼치면 하위 행이 나오는 계층 표입니다. 폴더처럼 단계가 있는 목록에 사용합니다.', css, body };
};

export const templates = [collapsible, filter, grouped, inbox, tree].map((f) => f());
