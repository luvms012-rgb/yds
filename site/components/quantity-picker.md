<!-- https://design.ybmnet.co.kr/yds/site/components/quantity-picker.html -->

# Quantity Picker

수량을 하나씩 늘리거나 줄이는 컴포넌트입니다.

## 사용법

구조를 복사해 사용합니다. 대괄호 `[ ]` 부분은 선택 항목입니다.

```html
<div class="ds-quantity" data-size="medium">
  <button type="button" class="ds-quantity__btn" aria-label="수량 줄이기"><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button>
  <input class="ds-quantity__value" inputmode="numeric" value="1" aria-label="수량">
  <button type="button" class="ds-quantity__btn" aria-label="수량 늘리기"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Btn** `ds-quantity__btn` | 수량을 늘리거나 줄이는 버튼입니다. |
| **Value** `ds-quantity__value` | 현재 수량입니다. |

## 속성

| 속성 | 값 |
| --- | --- |
| `layout` | fill |
| 켜고 끄는 속성 | `size` |

## 사용 지침

- Do: 수강 신청 버튼 옆에서는 버튼과 높이가 같은 large를 사용합니다.

## 예시

### 최소 수량에서 줄이기 버튼 비활성화

수량이 1이면 줄이기 버튼에 `disabled`를 붙입니다. 더 줄일 수 없다는 것을 누르기 전에 알 수 있습니다.

```html
<ul class="ds-list u-full" data-inset data-divider>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">영어 단어장 기본편</span>
        <span class="ds-list-item__desc">15,000원</span>
      </span>
      <div class="ds-quantity" data-size="small">
        <button type="button" class="ds-quantity__btn" aria-label="수량 줄이기" disabled><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button>
        <input class="ds-quantity__value" inputmode="numeric" value="1" aria-label="영어 단어장 기본편 수량">
        <button type="button" class="ds-quantity__btn" aria-label="수량 늘리기"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
      </div>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">듣기 연습 문제집</span>
        <span class="ds-list-item__desc">36,000원</span>
      </span>
      <div class="ds-quantity" data-size="small">
        <button type="button" class="ds-quantity__btn" aria-label="수량 줄이기"><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button>
        <input class="ds-quantity__value" inputmode="numeric" value="2" aria-label="듣기 연습 문제집 수량">
        <button type="button" class="ds-quantity__btn" aria-label="수량 늘리기"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
      </div>
    </div>
  </li>
</ul>
```

### 남은 수량을 넘으면 바로 안내

남은 수량보다 많이 입력하면 값 입력란에 `aria-invalid="true"`를 붙이고 Field Label 오류 문구로 이유를 안내합니다. 늘리기 버튼도 비활성화해 더 늘릴 수 없다는 것을 함께 표시합니다.

```html
<div class="ds-field u-full">
  <div class="ds-field__header">
    <label class="ds-field__label" for="quantity-picker-ex2">수량</label>
  </div>
  <div class="ds-quantity" data-layout="fill">
    <button type="button" class="ds-quantity__btn" aria-label="수량 줄이기"><i class="ds-icon ds-icon--minus" aria-hidden="true"></i></button>
    <input class="ds-quantity__value" id="quantity-picker-ex2" inputmode="numeric" value="5" aria-invalid="true" aria-describedby="quantity-picker-ex2-error">
    <button type="button" class="ds-quantity__btn" aria-label="수량 늘리기" disabled><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
  </div>
  <div class="ds-field__footer">
    <p class="ds-field__help">한 번에 10개까지 담을 수 있어요</p>
    <p class="ds-field__error" id="quantity-picker-ex2-error">남은 수량은 3개예요</p>
  </div>
</div>
```

## 규격

### 크기와 여백

```text
size: medium(기본 40) / small 36 / large 52   layout: hug(기본) / data-layout="fill"
Figma: bg/layer-default / 1px stroke/neutral-weak / small/medium shape/sm / large shape/lg
       버튼 정사각(36/40/52) / 아이콘 16/18/22 fg/neutral / 값 min-w40 px8 / t05 Medium(large t06)
       disabled 아이콘/값 fg/disabled / invalid 1px stroke/critical-solid
```
