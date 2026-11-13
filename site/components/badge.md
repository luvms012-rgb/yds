<!-- https://luvms012-rgb.github.io/yds/site/components/badge.html -->

# Badge

상태나 속성을 짧은 글자로 표시하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<span class="ds-badge" data-variant="solid" data-tone="brand">NEW</span>
<span class="ds-badge" data-size="large">
  [<i class="ds-icon ds-icon--circle-check-solid ds-badge__prefix" aria-hidden="true"></i>]
  <span class="ds-badge__label">라벨</span>
  [<button type="button" class="ds-badge__action" aria-label="삭제"><i class="ds-icon ds-icon--x"></i></button>]
</span>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Prefix** `ds-badge__prefix` | 앞에 붙는 아이콘이나 요소입니다. |
| **Label** `ds-badge__label` | 이름이나 값을 표시하는 텍스트입니다. |
| **Action** `ds-badge__action` | 바로 실행하는 작은 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `variant` | weak solid outline |
| `tone` | neutral brand informative positive warning critical |
| `size` | medium large xlarge |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 누를 수 없는 표시용 라벨로만 사용합니다. |
| **Do** | 같은 위치의 상태는 모두 배지로 표시하고, 강약은 색으로만 구분합니다. |
| **Do** | 1~2단어로 작성합니다. |

## 예시

### 목록의 상태를 같은 모양으로 알리기

같은 자리의 상태는 모두 배지로 보여 줍니다. 할 일이 남은 상태만 눈에 띄는 색으로 두어, 확인할 줄이 바로 보입니다.

```html
<ul class="ds-list" data-inset data-divider style="max-width: 420px">
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">토익 정기 시험</span>
        <span class="ds-list-item__desc">11월 23일 오전 9시 20분</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-badge" data-tone="warning">결제 대기</span></span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">토익 스피킹</span>
        <span class="ds-list-item__desc">12월 7일 오후 2시</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-badge">접수 완료</span></span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">일본어 능력 시험</span>
        <span class="ds-list-item__desc">12월 14일 오전 10시</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-badge">접수 완료</span></span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
</ul>
```

### 분류를 짧게 붙이기

강의 이름 앞에 분류를 한두 낱말로 붙입니다. 분류는 모두 같은 기본 색으로 두어 강의 이름이 먼저 읽히게 합니다.

```html
<ul class="ds-list" data-inset data-divider style="max-width: 420px">
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title"><span class="ds-badge">어학</span> 토익 실전 문제 풀이</span>
        <span class="ds-list-item__desc">강의 24개, 12시간</span>
      </span>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title"><span class="ds-badge">자격증</span> 컴퓨터 활용 능력 1급</span>
        <span class="ds-list-item__desc">강의 30개, 18시간</span>
      </span>
    </a>
  </li>
</ul>
```

### 새로 생긴 메뉴 하나만 강조하기

새 메뉴 하나에만 진한 브랜드 배지를 붙입니다. 여러 곳에 붙이면 무엇이 새것인지 알 수 없습니다.

```html
<ul class="ds-list" data-inset data-divider style="max-width: 420px">
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--book-open" aria-hidden="true"></i></span>
      <span class="ds-list-item__content"><span class="ds-list-item__title">내 강의실</span></span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--sparkles" aria-hidden="true"></i></span>
      <span class="ds-list-item__content"><span class="ds-list-item__title">AI 학습 도우미 <span class="ds-badge" data-variant="solid" data-tone="brand">NEW</span></span></span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--settings" aria-hidden="true"></i></span>
      <span class="ds-list-item__content"><span class="ds-list-item__title">설정</span></span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
</ul>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-badge-bg` | `var(--ds-color-bg-neutral-weak-alpha)` |
| `--ds-badge-fg` | `var(--ds-color-fg-neutral-muted)` |
| `--ds-badge-line` | `transparent` |
| `--ds-badge-height` | `var(--ds-space-x5)` |
| `--ds-badge-padding-x` | `var(--ds-space-x1_5)` |
| `--ds-badge-radius` | `var(--ds-shape-2xs)` |
| `--ds-badge-font-size` | `var(--ds-font-size-t01)` |
| `--ds-badge-line-height` | `var(--ds-line-height-t01)` |
| `--ds-badge-icon` | `12px` |

### 크기와 여백

```
size: medium(기본) / large / xlarge(2026-11-13, 14px 글자가 필요한 PC 화면)   variant: weak(기본) / solid / outline
tone: neutral(기본) / brand / informative / positive / warning / critical
Figma medium: py2 px6 / min-h20 / shape/2xs / t01 Medium / 아이콘 12
      large : py4 px8 / min-h24 / shape/xs  / t02 Medium / 아이콘 14
      xlarge: px10 / min-h28 / shape/sm / t04 Medium / 아이콘 16
크기 변수: --ds-badge-height, -padding-x, -radius, -font-size, -line-height, -icon (모서리를 알약으로 쓸 때 --ds-badge-radius: var(--ds-shape-pill))
공통: gap x0_5 / solid 라벨 fg/on-{tone}-solid
기본 최대 너비는 없습니다. 말줄임이 필요하면 사용하는 곳에서 max-width를 지정하세요.
```
