<!-- https://design.ybmnet.co.kr/yds/components/chip.html -->

# Chip

선택하거나 입력한 값을 간결하게 표시하는 컴포넌트입니다.

## 사용법

구조를 복사해 사용합니다. 대괄호 `[ ]` 부분은 선택 항목입니다.

```html
<button type="button" class="ds-chip" aria-pressed="false">
  [<i class="ds-icon ds-icon--heart" aria-hidden="true"></i>] @naver.com [<i class="ds-icon ds-icon--chevron-down"></i>]
</button>
```

## 속성

| 속성 | 값 |
| --- | --- |
| `variant` | solid outlineStrong outlineWeak |
| `layout` | iconOnly |
| 켜고 끄는 속성 | `size` |

## 사용 지침

- Do: 조건을 켜고 끄는 선택에 사용합니다.
- Do: 선택 상태는 `aria-pressed`로 알립니다.
- Do: 화면 분류를 바꿀 때는 Chip Tabs를, 누를 수 없는 표시에는 Badge를 사용합니다.

## 예시

### 여러 조건을 함께 선택하는 필터

함께 선택할 수 있는 필터는 Chip을 사용하고, 선택한 칩에는 `aria-pressed="true"`를 붙입니다. 하나만 선택해 보이는 내용을 바꿀 때는 Chip Tabs를 사용합니다.

```html
<div class="u-col u-gap-3">
  <div class="u-flex u-wrap u-gap-2">
    <button type="button" class="ds-chip" aria-pressed="true">무료 강의</button>
    <button type="button" class="ds-chip" aria-pressed="false">이번 주 개강</button>
    <button type="button" class="ds-chip" aria-pressed="true">할인 중</button>
    <button type="button" class="ds-chip" aria-pressed="false">평점 4점 이상</button>
  </div>
  <span class="ds-t04 ds-fg-subtle">강의 128개</span>
</div>
```

### 현재 값을 표시하는 필터

값을 선택해야 하는 필터는 칩에 현재 값과 아래 화살표를 함께 표시합니다. 누르면 Bottom Sheet나 Select Content가 열려 값을 바꿀 수 있습니다.

```html
<div class="u-col u-gap-3">
  <div class="u-flex u-wrap u-gap-2">
    <button type="button" class="ds-chip" data-variant="outlineWeak" data-layout="iconOnly" aria-label="필터"><i class="ds-icon ds-icon--sliders-horizontal" aria-hidden="true"></i></button>
    <button type="button" class="ds-chip" data-variant="outlineWeak" aria-haspopup="dialog">최근 3개월<i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i></button>
    <button type="button" class="ds-chip" data-variant="outlineWeak" aria-haspopup="dialog">수강 완료<i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i></button>
  </div>
  <ul class="ds-list" data-inset data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">영어 회화 기초</span>
          <span class="ds-list-item__desc">11월 2일 신청</span>
        </span>
        <span class="ds-list-item__suffix">수강 완료</span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">비즈니스 이메일 쓰기</span>
          <span class="ds-list-item__desc">10월 21일 신청</span>
        </span>
        <span class="ds-list-item__suffix">수강 완료</span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

### 적용한 조건 해제

적용한 조건은 오른쪽에 x 아이콘이 있는 칩으로 모아 표시하고, 누르면 해당 조건이 해제됩니다. 칩마다 `aria-label`로 어떤 조건이 해제되는지 적습니다.

```html
<div class="u-col u-gap-3">
  <div class="u-flex u-center u-between">
    <span class="ds-t04 ds-fg-muted">적용한 조건 3개</span>
    <button class="ds-btn" data-variant="ghost" data-size="xsmall">모두 지우기</button>
  </div>
  <div class="u-flex u-wrap u-gap-2">
    <button type="button" class="ds-chip" data-variant="outlineStrong" data-size="small" aria-label="서울 조건 빼기">서울<i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    <button type="button" class="ds-chip" data-variant="outlineStrong" data-size="small" aria-label="주말반 조건 빼기">주말반<i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    <button type="button" class="ds-chip" data-variant="outlineStrong" data-size="small" aria-label="초급 조건 빼기">초급<i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
  </div>
</div>
```

## 규격

### CSS 변수

| 변수 | 기본값 |
| --- | --- |
| `--ds-chip-height` | `36px` |
| `--ds-chip-padding-x` | `calc(var(--ds-space-x2) + var(--ds-space-x1_5))` |
| `--ds-chip-min-width` | `var(--ds-space-x12)` |
| `--ds-chip-icon` | `16px` |
| `--ds-chip-bg` | `var(--ds-color-bg-neutral-weak-alpha)` |
| `--ds-chip-fg` | `var(--ds-color-fg-neutral)` |
| `--ds-chip-line` | `transparent` |

### 크기와 여백

```text
variant: solid(기본) / outlineStrong / outlineWeak   size: medium(기본 36) / small 32 / large 40
layout : 기본 withText / data-layout="iconOnly"      state: aria-pressed="true"(checked) / disabled
Figma: shape/pill / t04 Regular(large t05) / 좌우 12/14/16 / min-w 44/48/52 / 아이콘 14/16/16 / 아이콘↔라벨 x1_5
  solid bg/neutral-weak-alpha / outlineStrong bg/layer-default + stroke/neutral-weak / outlineWeak + stroke/neutral-muted
  checked(solid/outlineStrong) bg/neutral-solid + fg/on-neutral-solid SemiBold
  checked(outlineWeak) bg/neutral-weak-alpha + stroke/neutral-contrast + fg/neutral Medium / disabled opacity .5
```
