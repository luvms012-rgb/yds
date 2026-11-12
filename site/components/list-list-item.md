<!-- https://luvms012-rgb.github.io/yds/site/components/list-list-item.html -->

# List / List Item

설정, 메뉴처럼 항목을 한 줄씩 나열하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<ul class="ds-list" [data-inset] [data-divider]>
  <li>
    <a class="ds-list-item" href="#" [data-size="small"]>
      [<span class="ds-list-item__prefix"><i class="ds-icon ds-icon--credit-card" aria-hidden="true"></i></span>]
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">결제 수단</span>
        [<span class="ds-list-item__desc">등록된 카드 2개</span>]
      </span>
      [<span class="ds-list-item__suffix">값, Badge, Switch</span>]
      [<i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>]
    </a>
  </li>
</ul>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Prefix** `ds-list-item__prefix` | 앞에 붙는 아이콘이나 요소입니다. |
| **Content** `ds-list-item__content` | 주된 내용이 들어가는 영역입니다. |
| **Title** `ds-list-item__title` | 제목입니다. |
| **Desc** `ds-list-item__desc` | 제목을 보충하는 설명입니다. |
| **Suffix** `ds-list-item__suffix` | 뒤에 붙는 아이콘이나 요소입니다. |
| **Chevron** `ds-list-item__chevron` | 다른 화면으로 이동함을 나타내는 꺾쇠 아이콘입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `inset` `divider` |

그 밖에: size small, prefix/suffix/chevron

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 한 행 안에 누를 수 있는 요소는 3개까지만 둡니다. |
| **Don't** | 행 전체가 링크이면 안에 다른 버튼을 넣지 않습니다. |

## 예시

### 항목 전체가 링크일 때 값과 꺾쇠만

항목 전체가 하나의 링크일 때는 오른쪽에 값과 꺾쇠만 표시하고 다른 버튼은 넣지 않습니다. 누르는 영역이 하나여서 어디를 눌러도 같은 화면으로 이동합니다.

```html
<ul class="ds-list u-full" data-inset data-divider style="max-width: 420px">
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--user" aria-hidden="true"></i></span>
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">내 정보</span>
        <span class="ds-list-item__desc">이름, 연락처, 이메일</span>
      </span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--credit-card" aria-hidden="true"></i></span>
      <span class="ds-list-item__content"><span class="ds-list-item__title">결제 수단</span></span>
      <span class="ds-list-item__suffix">카드 2개</span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
  <li>
    <a class="ds-list-item" href="#">
      <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--map-pin" aria-hidden="true"></i></span>
      <span class="ds-list-item__content"><span class="ds-list-item__title">배송지</span></span>
      <span class="ds-list-item__suffix">2곳</span>
      <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
    </a>
  </li>
</ul>
```

### 즉시 반영되는 설정은 항목 끝에 Switch

누르는 즉시 반영되는 설정은 항목 끝에 Switch를 배치하고 항목 전체를 `label`로 감쌉니다. 텍스트를 눌러도 켜고 끌 수 있어 누르는 영역이 넓어집니다.

```html
<ul class="ds-list u-full" data-inset data-divider style="max-width: 420px">
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">주문, 배송 알림</span>
        <span class="ds-list-item__desc">주문 상태가 바뀌면 알려 드려요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" checked aria-label="주문, 배송 알림"></span></span>
    </label>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">이벤트, 혜택 알림</span>
        <span class="ds-list-item__desc">쿠폰과 할인 소식을 알려 드려요</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" aria-label="이벤트, 혜택 알림"></span></span>
    </label>
  </li>
  <li>
    <label class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">밤 시간 알림 받기</span>
        <span class="ds-list-item__desc">밤 9시부터 아침 8시까지</span>
      </span>
      <span class="ds-list-item__suffix"><span class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" aria-label="밤 시간 알림 받기"></span></span>
    </label>
  </li>
</ul>
```

### 동작이 여러 개인 항목은 링크로 만들지 않기

한 항목에 수정, 삭제처럼 동작이 여러 개이면 항목을 링크로 만들지 않고 버튼을 항목 끝에 배치합니다. 누를 수 있는 요소는 한 항목에 3개까지만 둡니다.

```html
<ul class="ds-list u-full" data-inset data-divider style="max-width: 420px">
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">집 <span class="ds-badge">기본</span></span>
        <span class="ds-list-item__desc">서울시 종로구 종로 1길 23, 4층</span>
      </span>
      <span class="ds-list-item__suffix">
        <button class="ds-btn" data-variant="neutralWeak" data-size="xsmall">수정</button>
        <button class="ds-btn" data-variant="ghost" data-size="xsmall">삭제</button>
      </span>
    </div>
  </li>
  <li>
    <div class="ds-list-item">
      <span class="ds-list-item__content">
        <span class="ds-list-item__title">회사</span>
        <span class="ds-list-item__desc">서울시 중구 세종대로 45, 10층</span>
      </span>
      <span class="ds-list-item__suffix">
        <button class="ds-btn" data-variant="neutralWeak" data-size="xsmall">수정</button>
        <button class="ds-btn" data-variant="ghost" data-size="xsmall">삭제</button>
      </span>
    </div>
  </li>
</ul>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-list-item-min-h` | `56px` |
| `--ds-list-item-py` | `var(--ds-space-x3)` |
| `--ds-list-item-px` | `var(--ds-space-x4)` |

### 크기와 여백

```
inset: data-inset(카드 안처럼 둥근 묶음)   size: medium(기본) / small   divider: data-divider
Figma item medium: min-h56 / py x3 / px x4 / gap x3 / title t05 fg/neutral / desc t03 fg/neutral-subtle
            small : min-h48 / py x2_5 / title t04 / desc t02
  prefix 24(아이콘 fg/neutral-subtle, Avatar 36 가능) / suffix t04 fg/neutral-subtle / chevron 20 fg/neutral-subtle
  pressed bg/transparent-pressed / disabled 글자 fg/disabled / divider 1px stroke/neutral-muted(본문 시작점부터, inset 은 좌우 x4, 2026-11-04)
  inset: bg/layer-default / 1px stroke/neutral(2026-11-04) / shape/xl / 바깥 여백 없음
상호작용 요소(링크, 스위치 등)는 한 줄에 4개 미만으로 배치합니다. 행 전체가 링크이면 안에 다른 버튼을 넣지 않습니다.
```
