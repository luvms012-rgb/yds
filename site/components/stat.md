<!-- https://luvms012-rgb.github.io/yds/site/components/stat.html -->

# Stat

핵심 수치를 이름, 값, 지난번과 비교한 증감으로 보여 주는 숫자 표시입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-stat">
  <span class="ds-stat__label">평균 점수</span>
  <div class="ds-stat__body"><span class="ds-stat__value">712점</span>[<span class="ds-stat__delta" data-tone="up"><i class="ds-icon ds-icon--arrow-up" aria-hidden="true"></i>+24</span>]</div>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Label** `ds-stat__label` | 수치의 이름입니다. |
| **Body** `ds-stat__body` | 값과 증감을 한 줄로 묶습니다. |
| **Value** `ds-stat__value` | 수치입니다. |
| **Delta** `ds-stat__delta` | 지난번과 비교한 증감입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: 증감 tone `up/down/flat`, 이름 앞 Status Dot

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 숫자는 단위와 함께 표시합니다. |
| **Do** | 증감은 지난번과 비교할 값이 있을 때만 표시합니다. |
| **Do** | 여러 개를 나란히 둘 때는 하나씩 Card에 넣습니다. |
| **Don't** | 좋고 나쁨을 색으로만 알리지 않습니다. 증감 앞에 +, - 를 붙입니다. |

## 예시

### 대시보드 수치

수치마다 Card 에 넣어 나란히 둡니다.

```html
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px"><article class="ds-card"><div class="ds-card__content"><div class="ds-stat"><span class="ds-stat__label">응시 인원</span><div class="ds-stat__body"><span class="ds-stat__value">118명</span></div></div></div></article><article class="ds-card"><div class="ds-card__content"><div class="ds-stat"><span class="ds-stat__label">평균 점수</span><div class="ds-stat__body"><span class="ds-stat__value">712점</span><span class="ds-stat__delta" data-tone="up"><i class="ds-icon ds-icon--arrow-up" aria-hidden="true"></i>+24</span></div></div></div></article><article class="ds-card"><div class="ds-card__content"><div class="ds-stat"><span class="ds-stat__label">이탈률</span><div class="ds-stat__body"><span class="ds-stat__value">18%</span><span class="ds-stat__delta" data-tone="down"><i class="ds-icon ds-icon--arrow-down" aria-hidden="true"></i>-3%p</span></div></div></div></article></div>
```

### 상태와 함께

이름 앞에 Status Dot 을 두어 상태를 함께 표시합니다.

```html
<article class="ds-card"><div class="ds-card__content"><div class="ds-stat"><span class="ds-stat__label"><span class="ds-statusdot" data-tone="positive" aria-hidden="true"></span>정상 서비스</span><div class="ds-stat__body"><span class="ds-stat__value">42개</span></div></div></div></article>
```

## 규격

### 크기와 여백

```
이름 t04 fg/neutral-muted / 값 t08 SemiBold fg/neutral, 숫자는 고정폭 / 증감 t03 Medium, 아이콘 14
tone: up fg/positive(arrow-up) / down fg/critical(arrow-down) / flat fg/neutral-muted(아이콘 없음)
이름과 값 사이 x1, 값과 증감 사이 x2 / 이름 앞에 Status Dot 을 둘 수 있습니다
여러 개를 나란히 둘 때는 하나씩 Card 에 넣고, 작은 추이 그래프는 Stat 아래에 둡니다
```
