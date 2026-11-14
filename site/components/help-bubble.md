<!-- https://luvms012-rgb.github.io/yds/site/components/help-bubble.html -->

# Help Bubble

특정 요소를 가리키며 사용법이나 새로운 기능을 안내하는 말풍선입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-helpbubble" role="tooltip" data-placement="bottom-start">
  <div class="ds-helpbubble__body">
    <strong class="ds-helpbubble__title">제목</strong>
    [<p class="ds-helpbubble__desc">부연 설명</p>]
  </div>
  [<button class="ds-helpbubble__close" aria-label="닫기"><i class="ds-icon ds-icon--x"></i></button>]
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Body** `ds-helpbubble__body` | 본문이 들어가는 영역입니다. |
| **Title** `ds-helpbubble__title` | 제목입니다. |
| **Desc** `ds-helpbubble__desc` | 제목을 보충하는 설명입니다. |
| **Close** `ds-helpbubble__close` | 닫기 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: `--ds-hb-arrow-offset`

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 닫기 버튼이 필요하거나 설명이 여러 줄이면 Help Bubble을 사용합니다. |
| **Don't** | Tooltip은 마우스를 올리거나 포커스할 때만 표시되고, 터치 화면에서는 표시되지 않습니다. |

## 예시

### 새 버튼을 가리키는 안내

새로 생긴 버튼 바로 아래에 배치하고 꼬리가 그 버튼을 향하게 해 무엇을 가리키는지 표시합니다. 사용자가 읽고 직접 닫아야 하므로 Tooltip이 아닌 Help Bubble을 사용하고 닫기 버튼을 제공합니다.

```html
<div class="u-full" style="max-width: 420px">
  <div class="u-flex u-gap-2">
    <button class="ds-btn" data-variant="neutralOutline" data-size="small" aria-describedby="help-bubble-ex1"><i class="ds-icon ds-icon--list-filter" aria-hidden="true"></i>필터</button>
    <button class="ds-btn" data-variant="neutralOutline" data-size="small"><i class="ds-icon ds-icon--arrow-up-down" aria-hidden="true"></i>최신순</button>
  </div>
  <div class="ds-helpbubble" id="help-bubble-ex1" role="tooltip" data-placement="bottom-start">
    <div class="ds-helpbubble__body">
      <strong class="ds-helpbubble__title">필터가 새로 생겼어요</strong>
      <p class="ds-helpbubble__desc">가격과 배송 조건으로 상품을 골라 볼 수 있어요.</p>
    </div>
    <button class="ds-helpbubble__close" aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
  </div>
</div>
```

## 규격

### 크기와 여백

```
placement: top(기본) / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end
Figma: bg/neutral-solid / shape/lg / padding 10/12 / 본문 gap x0_5 / 최대 글 폭 236
       title t03 Bold / desc t03 / fg/on-neutral-solid / 꼬리 12×8(가장자리 정렬 시 x3_5 안쪽) / elevation 2
```
