<!-- https://luvms012-rgb.github.io/yds/site/components/segmented-control.html -->

# Segmented Control

같은 콘텐츠를 목록, 달력처럼 다른 방식으로 전환해 볼 때 사용하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-segmented" role="group" aria-label="보기 방식" [data-size="medium"] [data-layout="fill"]>
  <button type="button" class="ds-segmented__item" aria-pressed="true">목록</button>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `layout` `size` |

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- 누르면 하나만 aria-pressed, change 이벤트. 선택 배경이 고른 항목으로 미끄러져 이동(위치는 --ds-seg-x / --ds-seg-w)

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 선택하면 선택 배경이 이동하는 모션을 그대로 유지합니다. |
| **Do** | 항목은 2~4개만 사용합니다. 더 많으면 알아보기 어렵고 누르는 영역이 좁아집니다. |
| **Do** | 한 화면에 하나만 사용합니다. 여러 개를 두면 무엇이 중요한지 알기 어렵습니다. |
| **Do** | 라벨은 짧게 작성합니다. 항목 폭에 비해 라벨이 길면 다른 컴포넌트를 사용하세요. |
| **Don't** | 화면 이동에는 사용하지 않습니다. 화면을 이동할 때는 Tabs를 사용합니다. |

## 예시

### 같은 내용의 보기 방식 전환

수업 일정을 목록으로 볼지 달력으로 볼지처럼 같은 내용의 보기 방식만 바꿀 때 사용합니다. 다른 화면으로 이동하는 메뉴는 Tabs를 사용하세요.

```html
<div class="u-col u-gap-3 u-full" style="max-width: 420px">
  <div class="u-flex u-center u-between">
    <h3 class="ds-t06 ds-fw-bold">수업 일정</h3>
    <div class="ds-segmented" role="group" aria-label="보기 방식">
      <button type="button" class="ds-segmented__item" aria-pressed="true">목록</button>
      <button type="button" class="ds-segmented__item" aria-pressed="false">달력</button>
    </div>
  </div>
  <ul class="ds-list" data-inset data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">영어 회화 기초</span>
          <span class="ds-list-item__desc">11월 6일 목요일 오후 7시</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">비즈니스 이메일 쓰기</span>
          <span class="ds-list-item__desc">11월 8일 토요일 오전 10시</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

### 좁은 화면에서는 전체 폭 사용

모바일처럼 폭이 좁으면 `data-layout="fill"`로 각 항목이 폭을 똑같이 나눠 채웁니다. 한 화면에 하나만 배치해 지금 무엇을 바꾸는지 분명하게 합니다.

```html
<div class="u-col u-gap-5 u-full" style="max-width: 375px">
  <div class="ds-segmented" role="group" aria-label="신청 방식" data-size="medium" data-layout="fill">
    <button type="button" class="ds-segmented__item" aria-pressed="true">개인 신청</button>
    <button type="button" class="ds-segmented__item" aria-pressed="false">단체 신청</button>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="segmented-control-ex3-name">이름</label>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="segmented-control-ex3-name" placeholder="이름을 입력해 주세요">
    </div>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="segmented-control-ex3-phone">휴대폰 번호</label>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="segmented-control-ex3-phone" inputmode="tel" placeholder="숫자만 입력해 주세요">
    </div>
  </div>
</div>
```

## 규격

### 크기와 여백

```
size: small(기본) / medium   layout: hug(기본) / fill
모션: 선택 배경이 선택한 항목으로 미끄러지듯 이동합니다(필수, ybm-ds.js). 누르면 aria-pressed가 바뀌고 change 이벤트가 발생합니다.
Figma small : 트랙 bg/neutral-weak-alpha / padding 2 / shape/sm / item py6 px12 / shape/xs / t03 Medium fg/neutral-subtle (고른 칸 SemiBold)
      medium: 트랙 shape/sm / item py8 px16 / shape/xs / t04 Medium (고른 칸 SemiBold)
모서리(2026-11-10): 바깥 모서리는 같은 높이의 Button과 맞춥니다. 안쪽 = 바깥 - 트랙 여백 2 (small, medium 모두 8 / 6)
      selected bg/layer-default + elevation raised + fg/neutral / disabled fg/disabled
높이(2026-11-03): small 32(Button xsmall 과 같음) / medium 40(Button medium, Select medium 과 같음). 글자와 아이콘 모두 같은 높이
```
