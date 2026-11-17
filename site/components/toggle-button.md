<!-- https://design.ybmnet.co.kr/yds/site/components/toggle-button.html -->

# Toggle Button

누를 때마다 켜짐과 꺼짐 상태가 바뀌는 버튼입니다.

## 사용법

구조를 복사해 사용합니다. 대괄호 `[ ]` 부분은 선택 항목입니다.

```html
<button type="button" class="ds-toggle" aria-pressed="false" [data-size="medium"]>라벨</button>
```

## 속성

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `size` |

## 사용 지침

- Do: "알림 받기" 켜고 끄기처럼 한 가지 상태만 바꿀 때 사용합니다.
- Do: 선택과 필터링은 Chip, 바로 반영되는 설정은 Switch를 사용합니다. 역할이 겹치지 않게 나눠 사용하세요.
- Do: 누르기 전후의 라벨은 같게 유지하고, 상태는 채움 아이콘으로 표시합니다.
- Don't: 여러 개 중 하나를 선택할 때는 사용하지 않습니다. 이때는 Segmented Control을 사용하세요.

## 예시

### 한 가지 상태를 켜고 끄기

개강 알림처럼 한 가지 상태만 켜고 끌 때 Toggle Button을 사용합니다. 라벨은 그대로 두고 `aria-pressed`로 켜짐 여부를 알립니다.

```html
<article class="ds-card">
  <header class="ds-card__header">
    <h3 class="ds-card__title">데이터 분석 입문</h3>
    <p class="ds-card__desc">12월 2일 개강 예정</p>
  </header>
  <div class="ds-card__content u-flex u-center u-between u-gap-3">
    <span class="ds-fg-muted">개강하는 날 아침에 알려 줘요.</span>
    <button type="button" class="ds-toggle" aria-pressed="true">개강 알림</button>
  </div>
</article>
```

## 규격

### CSS 변수

| 변수 | 기본값 |
| --- | --- |
| `--ds-toggle-bg` | `var(--ds-color-bg-layer-default)` |
| `--ds-toggle-fg` | `var(--ds-color-fg-neutral)` |
| `--ds-toggle-line` | `var(--ds-color-stroke-neutral-weak)` |

### 크기와 여백

```text
size: small(기본) / medium
Figma small: py6 px12 / t03 Bold / medium: py10 px16 / t04 Bold / shape/lg
  off bg/layer-default + stroke/neutral-weak / on bg/brand-weak + stroke/brand-solid + fg/brand / disabled bg/disabled + fg/disabled
```
