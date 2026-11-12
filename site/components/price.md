<!-- https://luvms012-rgb.github.io/yds/site/components/price.html -->

# Price

판매 가격을 할인율, 원래 가격과 함께 보여 주는 가격 표시입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-price" [data-size="small|large"] [data-align="end"]>
  [<s class="ds-price__was">48,000원</s>]
  <div class="ds-price__now">[<span class="ds-price__rate">20%</span>]<strong class="ds-price__value">38,000원</strong>[<span class="ds-price__unit">/ 월</span>]</div>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Was** `ds-price__was` | 할인 전 원래 가격입니다. |
| **Now** `ds-price__now` | 할인율, 판매 가격, 단위를 한 줄로 묶습니다. |
| **Rate** `ds-price__rate` | 할인율입니다. |
| **Value** `ds-price__value` | 판매 가격입니다. |
| **Unit** `ds-price__unit` | 기간이나 수량 단위입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `size` | small medium large |
| `align` | end |

그 밖에: 할인율 rate, 원래 가격 was, 단위 unit

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 할인할 때만 할인율과 원래 가격을 표시합니다. |
| **Do** | 한 목록 안에서는 같은 크기를 사용합니다. |
| **Do** | 금액 칸처럼 오른쪽 끝에 맞출 때는 `data-align="end"`를 사용합니다. |
| **Don't** | 할인율을 Badge로 따로 표시하지 않습니다. |

## 예시

### 상품 목록

목록과 장바구니에서는 small 을 사용합니다.

```html
<div class="ds-price" data-size="small"><s class="ds-price__was">32,000원</s><div class="ds-price__now"><span class="ds-price__rate">15%</span><strong class="ds-price__value">27,200원</strong></div></div>
```

### 상품 상세

상세 화면에서는 기본 크기로 상품 이름 아래에 둡니다.

```html
<div class="ds-price"><s class="ds-price__was">48,000원</s><div class="ds-price__now"><span class="ds-price__rate">20%</span><strong class="ds-price__value">38,400원</strong></div></div>
```

### 요금제

요금제는 large 와 단위를 함께 사용합니다.

```html
<div class="ds-price" data-size="large"><div class="ds-price__now"><strong class="ds-price__value">9,900원</strong><span class="ds-price__unit">/ 월</span></div></div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-price-size` | `var(--ds-font-size-t09)` |
| `--ds-price-line` | `var(--ds-line-height-t09)` |
| `--ds-price-sub-size` | `var(--ds-font-size-t04)` |
| `--ds-price-sub-line` | `var(--ds-line-height-t04)` |

### 크기와 여백

```
size: small 가격 t05(목록, 장바구니) / medium(기본) 가격 t09(상품 상세) / large 가격 t10(요금제)
가격 Bold fg/neutral, 할인율은 가격과 같은 크기 fg/critical / 단위 fg/neutral-muted, 원래 가격 취소선 fg/neutral-subtle(small t03, 그 밖 t04)
원래 가격은 판매 가격 위 줄, 사이 2 / 할인율, 가격, 단위 사이 x1 / 숫자는 고정폭
data-align="end": 오른쪽 끝에 맞춥니다(장바구니 금액 칸)
```
