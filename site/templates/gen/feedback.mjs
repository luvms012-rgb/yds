// 의견 받기 템플릿: 수강 설문 쓰기, 수강평 쓰기(학습 > 수강).
// 2026-11-16 사용자 "템플릿 추가: 설문조사, 리뷰 작성". 레퍼런스는 UI 패턴 카탈로그의 만족도 조사, 설문 참여, 리뷰 작성, 수강평 화면이고 서비스 이름은 저장소에 적지 않는다.
// 한 줄 화면이라 폭은 --tp-narrow(720). 기능에 필요한 글(필수 표시, 글자 수, 입력 도움말)은 남긴다.
import * as K from './kit.mjs';
import { FRAME_CSS, topbar, selectbox, tags } from './frame.mjs';
const { icon, btn, iconBtn, badge, avatar, card, chip, checkbox, radios, progress, thumb, photo } = K;

const LEARN_MENU = ['홈', '과정 찾기', '내 학습', '지식 공유'];
const learnEnd = `${iconBtn('bell', '알림', { size: 'xsmall' })}${avatar('와이비엠', 24)}`;
const CSS = FRAME_CSS + `
  .tp-fb { display: flex; flex-direction: column; gap: var(--ds-space-x6); width: min(100%, var(--tp-narrow)); margin-inline: auto; padding-block: var(--ds-space-x6) var(--ds-space-x12); }
  .tp-fb__head { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-fb__course { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: var(--ds-space-x4); align-items: center; }
  .tp-fb__course .tp-row { flex-wrap: wrap; }
  .tp-q { display: flex; flex-direction: column; gap: var(--ds-space-x4); margin: 0; padding: 0; border: 0; min-width: 0; }
  .tp-q__title { display: flex; gap: var(--ds-space-x2); padding: 0; margin-block-end: var(--ds-space-x4); font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); font-weight: var(--ds-font-weight-semibold); }
  .tp-q__no { flex: none; color: var(--ds-color-fg-neutral-subtle); font-variant-numeric: tabular-nums; }
  .tp-q__title .ds-field__required { align-self: flex-start; }
  .tp-scale { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2); }
  .tp-scale .ds-chip { min-width: var(--ds-space-x10); justify-content: center; }
  .tp-scale__ends { display: flex; justify-content: space-between; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); }
  .tp-count { align-self: flex-end; color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t03); font-variant-numeric: tabular-nums; }
  .tp-fb__foot { display: flex; justify-content: flex-end; gap: var(--ds-space-x2); padding-top: var(--ds-space-x6); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  @media (max-width: 767px) { .tp-fb__foot > * { flex: 1 1 0; } }
  .tp-stars { --ds-rating-size: var(--ds-space-x8); --ds-rating-gap: var(--ds-space-x1); }
  .tp-chips { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2); }
`;
const req = '<span class="ds-field__required" aria-label="필수"></span>';
const q = (no, title, inner, { required = false, id = '' } = {}) => `<fieldset class="tp-q"${id ? ` aria-labelledby="${id}"` : ''}><legend class="tp-q__title"${id ? ` id="${id}"` : ''}><span class="tp-q__no">${no}</span><span>${title}</span>${required ? req : ''}</legend>${inner}</fieldset>`;

/* 1. 수강 설문 쓰기 -------------------------------------------------- */
const survey = () => {
  const css = CSS;
  const course = `<div class="tp-fb__course">${thumb('16:9', '', photo('lecture', 1, 360), 'md')}<div class="tp-stack" style="gap: var(--ds-space-x1)"><span class="tp-caption">데이터로 말하는 보고서 쓰기 3기</span><h1 class="tp-h1">수강 설문</h1><div class="tp-row">${tags(['문항 5개', '3분'])}${badge('11월 30일까지', 'warning')}</div></div></div>`;
  // 점수는 하나만 고르는 칩(role=radio, 고른 것만 aria-checked=true)
  const scale = (name, n, cur, ends) => `<div class="tp-stack" style="gap: var(--ds-space-x2)"><div class="tp-scale" role="radiogroup" aria-label="${name}">${Array.from({ length: n }, (_, i) => `<button type="button" role="radio" class="ds-chip" data-variant="outlineStrong" data-size="medium" aria-checked="${i === cur}"${i === cur ? ' aria-pressed="true"' : ''}>${i + (n === 11 ? 0 : 1)}</button>`).join('')}</div><div class="tp-scale__ends"><span>${ends[0]}</span><span>${ends[1]}</span></div></div>`;
  const body = `<div class="tp-app">${topbar(LEARN_MENU, 2, learnEnd)}
<main class="tp-content"><form class="tp-fb" aria-label="수강 설문" onsubmit="return false">
  <div class="tp-fb__head">${course}<div class="tp-stack" style="gap: var(--ds-space-x2)"><div class="tp-between"><span class="tp-caption">2 / 5 문항 답함</span><span class="tp-caption tp-num">40%</span></div>${progress(40, { tone: 'neutral', label: '설문 진행' })}</div></div>
  ${card(q('1', '강의에 얼마나 만족했나요?', scale('만족도', 5, 3, ['전혀 만족하지 않아요', '아주 만족해요']), { required: true, id: 'sv-q1' }))}
  ${card(q('2', '좋았던 점을 모두 골라 주세요', selectbox('sv-q2', [['설명이 쉬워요'], ['예제가 실무와 가까워요'], ['진도가 알맞아요'], ['자료가 좋아요'], ['질문 답변이 빨라요'], ['기타']], 0, { cols: 2, type: 'checkbox' }), { id: 'sv-q2' }))}
  ${card(q('3', '강의 길이는 어땠나요?', radios('sv-q3', ['너무 짧아요', '알맞아요', '조금 길어요', '너무 길어요'], 1, 'horizontal'), { required: true, id: 'sv-q3' }))}
  ${card(q('4', '동료에게 이 과정을 추천할까요?', scale('추천 점수', 11, -1, ['전혀 추천하지 않아요', '꼭 추천해요']), { required: true, id: 'sv-q4' }))}
  ${card(q('5', '더 하고 싶은 말이 있나요?', `<textarea class="ds-textarea" data-size="medium" rows="4" aria-labelledby="sv-q5" maxlength="500"></textarea><span class="tp-count">0 / 500</span>`, { id: 'sv-q5' }))}
  <div class="tp-fb__foot">${btn('임시 저장', { size: 'large' })}${btn('제출하기', { variant: 'brandSolid', size: 'large' })}</div>
</form></main></div>`;
  return { slug: 'class-survey', en: 'Course Survey', name: '수강 설문 쓰기', group: 'Learning', desc: '수강을 마친 뒤 만족도와 의견을 답하는 설문 화면입니다. 점수, 여러 개 고르기, 하나 고르기, 자유 의견을 한 화면에 둡니다.', css, body };
};

/* 2. 수강평 쓰기 ---------------------------------------------------- */
const review = () => {
  const css = CSS;
  const stars = `<fieldset class="ds-rating tp-stars" data-input aria-label="별점">${[1, 2, 3, 4, 5].map((v) => `<label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rv-star" value="${v}" aria-label="${v}점"${v === 4 ? ' checked' : ''}><span class="ds-rating__star"></span></label>`).join('')}</fieldset>`;
  const good = ['설명이 쉬워요', '예제가 실무와 가까워요', '진도가 알맞아요', '자료가 좋아요', '질문 답변이 빨라요'];
  const files = `<div class="ds-fileattach"><div class="ds-fileattach__items"><label class="ds-fileattach__trigger"><input type="file" class="ds-fileattach__input" multiple accept="image/*" aria-label="사진 추가">${icon('plus')}<span class="ds-fileattach__count"><b>1</b>/5</span></label><div class="ds-fileitem" data-layout="image"><img class="ds-fileitem__image" src="${photo('study', 2, 240)}" alt="강의 노트 사진"><button type="button" class="ds-fileitem__remove" aria-label="강의 노트 사진 빼기">${icon('x')}</button></div></div></div>`;
  const body = `<div class="tp-app">${topbar(['클래스', '커뮤니티', '내 강의실'], 2, learnEnd)}
<main class="tp-content"><form class="tp-fb" aria-label="수강평 쓰기" onsubmit="return false">
  <div class="tp-fb__course">${thumb('16:9', '', photo('lecture', 0, 360), 'md')}<div class="tp-stack" style="gap: var(--ds-space-x1)"><h1 class="tp-h1">수강평 쓰기</h1><span class="tp-sub">영어 회의, 오늘부터 말하기</span><div class="tp-row">${badge('수강 완료')}<span class="tp-caption">한지아 강사</span></div></div></div>
  ${card(q('1', '강의는 어땠나요?', `<div class="tp-row" style="gap: var(--ds-space-x3)">${stars}<span class="tp-label">좋아요</span></div>`, { required: true, id: 'rv-q1' }))}
  ${card(q('2', '좋았던 점', `<div class="tp-chips">${good.map((g, i) => chip(g, { on: i === 0 || i === 2 })).join('')}</div>`, { id: 'rv-q2' }))}
  ${card(q('3', '수강평', `<div class="ds-field"><textarea class="ds-textarea" rows="6" aria-labelledby="rv-q3" aria-describedby="rv-help" maxlength="1000">회의를 시작하는 문장만 익혀도 첫마디가 훨씬 편해졌어요. 예문이 실제 회의와 비슷해서 바로 써먹을 수 있었어요.</textarea><div class="ds-field__footer"><p class="ds-field__help" id="rv-help">20자 이상 써 주세요</p><span class="tp-count">63 / 1000</span></div></div>`, { required: true, id: 'rv-q3' }))}
  ${card(q('4', '사진', files, { id: 'rv-q4' }))}
  ${checkbox('수강평을 다른 수강생에게 공개해요', { checked: true })}
  <div class="tp-fb__foot">${btn('취소', { size: 'large' })}${btn('등록하기', { variant: 'brandSolid', size: 'large' })}</div>
</form></main></div>`;
  return { slug: 'class-review-write', en: 'Write a Review', name: '수강평 쓰기', group: 'Learning', desc: '들은 강의에 별점과 좋았던 점, 수강평, 사진을 남기는 화면입니다. 다른 수강생이 강의를 고를 때 참고합니다.', css, body };
};

export const templates = [survey, review].map((f) => f());
