<!-- https://design.ybmnet.co.kr/yds/site/components/radio-group.html -->

# Radio Group

여러 선택지 중 하나만 선택할 때 사용하는 컴포넌트입니다.

## 사용법

구조를 복사해 사용합니다. 대괄호 `[ ]` 부분은 선택 항목입니다.

```html
<div class="ds-radio-group" role="radiogroup" [data-orientation="horizontal"]>
  <label class="ds-radio"><input type="radio" class="ds-radio__control" name="g"><span>라벨</span></label>
</div>
```

## 속성

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `tone` `size` |

## 사용 지침

- Do: 짧은 선택지 2~4개는 `data-orientation="horizontal"`로 한 줄에 둘 수 있습니다.
- Do: 선택지가 길거나 5개 이상이면 세로로 둡니다.
- Do: 같은 묶음에서는 항상 하나만 선택된 상태를 유지합니다.
- Do: 누르는 영역은 라벨까지 포함합니다. List 안에서는 줄 전체를 누를 수 있습니다.
- Do: 여러 개를 선택해야 하면 Checkbox를 사용하세요.
- Do: 추천하거나 자주 선택하는 항목은 기본으로 선택합니다. 사용자의 선택 부담이 줄어듭니다.
- Do: 선택지가 2~6개면 Radio Group을 사용합니다. 그보다 많거나 늘어날 수 있으면 Field Button이나 Select를 사용합니다.
- Do: 가로로 배치할 때는 4개까지만 사용합니다.
- Don't: 라벨이 길거나 화면이 좁으면 가로로 배치하지 마세요. 기본은 세로 배치입니다.

## 예시

### 자주 선택하는 항목 기본 선택

대부분이 선택하는 온라인 성적표를 기본으로 선택해 둡니다. 바꾸려는 사람만 다시 선택하면 되므로 고민이 줄어듭니다.

```html
<div class="ds-field u-full">
  <div class="ds-field__header">
    <span class="ds-field__label" id="radio-group-ex1-label">성적표 받는 방법</span>
  </div>
  <div class="ds-radio-group" role="radiogroup" aria-labelledby="radio-group-ex1-label">
    <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex1" checked><span>온라인 성적표, 무료</span></label>
    <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex1"><span>우편 성적표, 3,000원</span></label>
    <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex1"><span>방문해서 받기</span></label>
  </div>
</div>
```

### 목록 안에서는 줄 전체를 누르는 영역으로

List 안에 배치할 때는 `label.ds-list-item`으로 줄 전체를 라벨로 만듭니다. 작은 원을 정확히 누르지 않아도 줄 어디를 눌러도 선택됩니다.

```html
<ul class="ds-list u-full" data-inset data-divider role="radiogroup" aria-label="결제 수단">
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--credit-card" aria-hidden="true"></i></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">카드 결제</span>
        <span class="ds-list-item__desc">일시불, 할부</span>
      </span>
      <span class="ds-radio" data-size="medium"><input type="radio" class="ds-radio__control" name="radio-group-ex2" checked></span>
    </label>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--wallet" aria-hidden="true"></i></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">계좌 이체</span>
        <span class="ds-list-item__desc">입금을 확인하면 바로 접수돼요</span>
      </span>
      <span class="ds-radio" data-size="medium"><input type="radio" class="ds-radio__control" name="radio-group-ex2"></span>
    </label>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--smartphone" aria-hidden="true"></i></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">휴대폰 결제</span>
        <span class="ds-list-item__desc">한 달에 30만 원까지</span>
      </span>
      <span class="ds-radio" data-size="medium"><input type="radio" class="ds-radio__control" name="radio-group-ex2"></span>
    </label>
  </li>
</ul>
```

### 문항별로 그룹 나누기

문항마다 `name`을 다르게 지정해 그룹을 나눕니다. 한 그룹 안에서는 하나만 선택되므로 다른 문항의 답과 섞이지 않습니다.

```html
<div class="u-col u-gap-6 u-full">
  <div class="ds-field">
    <div class="ds-field__header">
      <span class="ds-field__label" id="radio-group-ex3-q1">강의 난이도는 어땠나요?</span>
    </div>
    <div class="ds-radio-group" role="radiogroup" aria-labelledby="radio-group-ex3-q1">
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q1"><span>쉬웠어요</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q1" checked><span>알맞았어요</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q1"><span>어려웠어요</span></label>
    </div>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <span class="ds-field__label" id="radio-group-ex3-q2">다른 사람에게 추천할까요?</span>
    </div>
    <div class="ds-radio-group" role="radiogroup" aria-labelledby="radio-group-ex3-q2">
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q2"><span>추천해요</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q2"><span>잘 모르겠어요</span></label>
      <label class="ds-radio"><input type="radio" class="ds-radio__control" name="radio-group-ex3-q2"><span>추천하지 않아요</span></label>
    </div>
  </div>
</div>
```

## 규격

### CSS 변수

| 변수 | 기본값 |
| --- | --- |
| `--ds-radio-size` | `24px` |
| `--ds-radio-dot` | `10px` |
| `--ds-radio-checked-bg` | `var(--ds-color-bg-brand-solid)` |
| `--ds-radio-checked-fg` | `var(--ds-color-fg-on-brand-solid)` |

### 크기와 여백

```text
size: large(기본 24) / medium(20)   tone: brand(기본) / neutral   orientation: 기본 세로 / data-orientation="horizontal"(짧은 선택지 2~4개, 좁으면 줄바꿈, 2026-11-15 추가)
Figma: 행 min-h 36/32 / 위 6 / gap x2 / 원 bg/layer-default + 1px stroke/neutral-weak / label t05/t04
  checked 고리(두께 7/6, 가운데 10/8 은 투명) brand bg/brand-solid / neutral bg/neutral-solid (2026-10-31 흰 점 → 투명)
  disabled bg/disabled + stroke/neutral-muted / disabledChecked 고리 bg/disabled, 가운데 투명
```
