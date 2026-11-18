<!-- https://design.ybmnet.co.kr/yds/components/rating.html -->

# Rating

별 다섯 개로 평점을 표시하거나 입력하는 컴포넌트입니다.

## 사용법

아래 예시의 코드를 복사해 사용합니다.

## 속성

| 속성 | 값 |
| --- | --- |
| `size` | small medium large |
| `value` | --ds-rating-value 0~5 |

그 밖에: input (radio 5개)

## 사용 지침

- Do: 별 옆에 평점 숫자와 후기 수를 함께 표시하세요.
- Do: 별점을 입력할 때는 별 5개를 모두 표시하고, 선택한 별까지 채웁니다.
- Do: 별 색은 경고색(노랑) 하나만 사용합니다.

## 예시

### 평점과 후기 수 함께 표시

목록에서는 별 옆에 평점 숫자와 후기 수를 함께 표시합니다. 별만으로는 4.5점과 4점을 구분하기 어렵고, 후기 수가 있어야 평점을 얼마나 믿을지 판단할 수 있습니다.

```html
<ul class="ds-list u-full" data-inset data-divider>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content u-gap-1">
        <span class="ds-list-item__title">영어 회화 기초</span>
        <span class="ds-rating" data-size="small" style="--ds-rating-value: 4.5" role="img" aria-label="5점 만점에 4.5점, 후기 312개"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.5</span><span class="ds-rating__count">(312)</span></span>
      </span>
      <span class="ds-list-item__suffix">49,000원</span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content u-gap-1">
        <span class="ds-list-item__title">비즈니스 이메일 쓰기</span>
        <span class="ds-rating" data-size="small" style="--ds-rating-value: 4.8" role="img" aria-label="5점 만점에 4.8점, 후기 1,204개"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.8</span><span class="ds-rating__count">(1,204)</span></span>
      </span>
      <span class="ds-list-item__suffix">59,000원</span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content u-gap-1">
        <span class="ds-list-item__title">생활 영어 첫걸음</span>
        <span class="ds-rating" data-size="small" style="--ds-rating-value: 0" role="img" aria-label="아직 후기가 없어요"><span class="ds-rating__stars"></span><span class="ds-rating__count">아직 후기가 없어요</span></span>
      </span>
      <span class="ds-list-item__suffix">29,000원</span>
    </a>
  </li>
</ul>
```

### 별점 입력 시 별 5개 모두 표시

후기를 작성할 때는 입력형(`data-input`)으로 별 5개를 모두 표시하고 선택한 별까지 채웁니다. 다섯 개 중 몇 개를 선택했는지 한눈에 알 수 있습니다.

```html
<div class="u-col u-gap-6 u-full">
  <div class="ds-field">
    <div class="ds-field__header">
      <span class="ds-field__label" id="rating-ex2-label">강의는 어떠셨나요?</span>
    </div>
    <fieldset class="ds-rating" data-input data-size="large" aria-labelledby="rating-ex2-label">
      <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rating-ex2" value="1" aria-label="1점"><span class="ds-rating__star"></span></label>
      <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rating-ex2" value="2" aria-label="2점"><span class="ds-rating__star"></span></label>
      <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rating-ex2" value="3" aria-label="3점"><span class="ds-rating__star"></span></label>
      <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rating-ex2" value="4" aria-label="4점" checked><span class="ds-rating__star"></span></label>
      <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="rating-ex2" value="5" aria-label="5점"><span class="ds-rating__star"></span></label>
    </fieldset>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="rating-ex2-text">후기</label>
      <span class="ds-field__indicator">선택</span>
    </div>
    <textarea class="ds-textarea" id="rating-ex2-text" rows="3" placeholder="좋았던 점이나 아쉬운 점을 적어 주세요"></textarea>
  </div>
  <button type="button" class="ds-btn" data-variant="neutralSolid" data-size="large">후기 올리기</button>
</div>
```

## 규격

### CSS 변수

| 변수 | 기본값 |
| --- | --- |
| `--ds-rating-size` | `16px` |
| `--ds-rating-gap` | `2px` |
| `--ds-rating-value` | `0` |
| `--ds-rating-fill` | `var(--ds-color-fg-warning)` |
| `--ds-rating-empty` | `var(--ds-color-stroke-neutral-muted)` |

### 크기와 여백

```text
보기:  <span class="ds-rating" style="--ds-rating-value: 4.5" role="img" aria-label="5점 만점에 4.5점"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.5</span><span class="ds-rating__count">(312)</span></span>
입력:  <fieldset class="ds-rating" data-input aria-label="별점"> 안에 <label class="ds-rating__option"><input type="radio" class="ds-rating__control" name="r" value="1"><span class="ds-rating__star"></span></label> 5개
size: small 12 / medium 16 (기본) / large 20  /  값: --ds-rating-value 0~5 (소수 가능)  /  색: --ds-rating-fill, --ds-rating-empty
```
