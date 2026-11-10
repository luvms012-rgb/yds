<!-- https://luvms012-rgb.github.io/yds/site/components/floating-action-button.html -->

# Floating Action Button

화면 위에 떠서 가장 중요한 동작을 실행하는 버튼입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<button class="ds-fab"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i>글쓰기</button>
<button class="ds-fab" data-layout="iconOnly" aria-label="글쓰기"><i class="ds-icon ds-icon--plus"></i></button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `layout` | iconOnly extended=false |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 사용할 수 없으면 버튼을 숨깁니다. |
| **Do** | 한 화면에 하나만 둡니다. 두 개 이상이면 무엇이 주요 동작인지 알기 어렵습니다. |
| **Do** | extended에는 라벨을 꼭 넣습니다. |
| **Do** | 버튼이 내용을 가리지 않도록 화면 아래에 버튼 높이만큼 여백을 둡니다. |
| **Don't** | disabled 상태로 표시하지 않습니다. 사용할 수 없는 동작이면 버튼을 숨깁니다. |

## 예시

### 목록 화면의 대표 동작 하나

게시판 화면의 대표 동작인 글쓰기 하나만 라벨이 있는 FAB로 제공합니다. 검색 같은 다른 동작은 상단 바의 아이콘 버튼으로 배치해 무엇이 주요 동작인지 헷갈리지 않게 합니다.

```html
<div class="u-col u-full" style="max-width: 375px">
  <header class="ds-appbar">
    <div class="ds-appbar__left">
      <button type="button" class="ds-appbar__button" aria-label="뒤로"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>
    </div>
    <div class="ds-appbar__main">
      <h1 class="ds-appbar__title">자유 게시판</h1>
    </div>
    <div class="ds-appbar__right">
      <button type="button" class="ds-appbar__button" aria-label="찾기"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
    </div>
  </header>
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">주말에 함께 공부할 분 찾아요</span>
          <span class="ds-list-item__desc">댓글 12, 10분 전</span>
        </span>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">단어 외우는 방법 나눠요</span>
          <span class="ds-list-item__desc">댓글 8, 1시간 전</span>
        </span>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">오늘 모의고사 같이 채점해요</span>
          <span class="ds-list-item__desc">댓글 3, 어제</span>
        </span>
      </a>
    </li>
  </ul>
  <div class="u-flex u-mt-4">
    <span class="u-grow"></span>
    <button class="ds-fab"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i>글쓰기</button>
  </div>
</div>
```

### 아이콘만 있을 때는 이름 지정

더하기처럼 뜻이 바로 보이는 동작은 아이콘만 표시하고 `aria-label`로 이름을 꼭 지정합니다. 일정 화면처럼 추가가 유일한 대표 동작일 때 사용하고, 사용할 수 없을 때는 `disabled` 대신 숨깁니다.

```html
<div class="u-col u-full" style="max-width: 375px">
  <header class="ds-appbar" data-platform="android">
    <div class="ds-appbar__main">
      <h1 class="ds-appbar__title">내 일정</h1>
    </div>
    <div class="ds-appbar__right">
      <button type="button" class="ds-appbar__button" aria-label="달력으로 보기"><i class="ds-icon ds-icon--calendar-days" aria-hidden="true"></i></button>
    </div>
  </header>
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--clock" aria-hidden="true"></i></span>
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">영어 회화 수업</span>
          <span class="ds-list-item__desc">11월 5일 (목) 오후 7시</span>
        </span>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__prefix"><i class="ds-icon ds-icon--clock" aria-hidden="true"></i></span>
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">스터디 모임</span>
          <span class="ds-list-item__desc">11월 7일 (토) 오전 10시</span>
        </span>
      </a>
    </li>
  </ul>
  <div class="u-flex u-mt-4">
    <span class="u-grow"></span>
    <button class="ds-fab" data-layout="iconOnly" aria-label="일정 추가"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button>
  </div>
</div>
```

## 규격

### 크기와 여백

```
Figma extended: h48 / px18 / gap x1 / 아이콘 16 / t05 Bold / iconOnly 56×56 / 아이콘 24
       shape/pill / bg/brand-solid(pressed -pressed) / 글자/아이콘 fg/on-brand-solid / elevation floating
```
