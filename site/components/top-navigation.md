<!-- https://luvms012-rgb.github.io/yds/site/components/top-navigation.html -->

# Top Navigation

PC 화면 맨 위에서 서비스의 주요 화면 사이를 이동하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<header class="ds-topnav">
  <div class="ds-topnav__left">
    <a class="ds-topnav__heading" href="/"><img src="logo.svg" alt="서비스 이름"></a>
    <nav class="ds-topnav__menu" aria-label="주요 메뉴">
      <a class="ds-topnav__item" href="#" aria-current="page">홈</a>
      <a class="ds-topnav__item" href="#">소개</a>
    </nav>
  </div>
  <div class="ds-topnav__end">
    <button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
    <a class="ds-btn" data-variant="neutralWeak" data-size="xsmall" href="#">로그인</a>
  </div>
</header>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Left** `ds-topnav__left` | 뒤로 가기 같은 버튼이 놓이는 왼쪽 영역입니다. |
| **Heading** `ds-topnav__heading` | 목록 위에 붙는 소제목입니다. |
| **Menu** `ds-topnav__menu` | 메뉴 묶음입니다. |
| **Item** `ds-topnav__item` | 목록의 항목 하나입니다. |
| **End** `ds-topnav__end` | 로그인 같은 버튼이 놓이는 오른쪽 끝 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `layout` | center 메뉴 가운데 |
| `state` | enabled hover |
| 켜고 끄는 속성 | `search` `action` |

그 밖에: Item selected

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | PC 화면에서만 사용합니다. |
| **Do** | 메뉴는 7개까지 둡니다. |
| **Do** | 현재 화면이 속한 메뉴에는 `aria-current="page"`를 붙입니다. |
| **Do** | 화면이 좁아지면 Top App Bar와 메뉴 버튼으로 전환합니다. |

## 예시

### PC 화면 상단의 전체 메뉴

PC 화면 맨 위에 로고, 주요 메뉴, 검색과 로그인을 한 줄로 배치합니다. 현재 화면이 속한 메뉴에 `aria-current="page"`를 붙여 위치를 알립니다.

```html
<header class="ds-topnav" style="width: 100%">
  <div class="ds-topnav__left">
    <a class="ds-topnav__heading" href="#"><img src="https://luvms012-rgb.github.io/yds/site/assets/logo-ybmnet.svg" alt="YBM NET" width="68" height="20"></a>
    <nav class="ds-topnav__menu" aria-label="주요 메뉴">
      <a class="ds-topnav__item" href="#">홈</a>
      <a class="ds-topnav__item" href="#" aria-current="page">강의</a>
      <a class="ds-topnav__item" href="#">자격증</a>
      <a class="ds-topnav__item" href="#">이벤트</a>
      <a class="ds-topnav__item" href="#">고객센터</a>
    </nav>
  </div>
  <div class="ds-topnav__end">
    <button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
    <a class="ds-btn" data-variant="neutralWeak" data-size="xsmall" href="#">로그인</a>
  </div>
</header>
```

### 로그인 후 알림과 내 정보 버튼

로그인한 사용자에게는 오른쪽 끝에 알림 버튼과 내 정보 버튼을 표시합니다. 메뉴는 7개까지만 두고, 더 많으면 묶어서 하위 화면으로 옮깁니다.

```html
<header class="ds-topnav" style="width: 100%">
  <div class="ds-topnav__left">
    <a class="ds-topnav__heading" href="#"><img src="https://luvms012-rgb.github.io/yds/site/assets/logo-ybmnet.svg" alt="YBM NET" width="68" height="20"></a>
    <nav class="ds-topnav__menu" aria-label="주요 메뉴">
      <a class="ds-topnav__item" href="#">홈</a>
      <a class="ds-topnav__item" href="#">강의</a>
      <a class="ds-topnav__item" href="#">자격증</a>
      <a class="ds-topnav__item" href="#" aria-current="page">커뮤니티</a>
      <a class="ds-topnav__item" href="#">이벤트</a>
      <a class="ds-topnav__item" href="#">고객센터</a>
    </nav>
  </div>
  <div class="ds-topnav__end">
    <button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
    <button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="알림"><i class="ds-icon ds-icon--bell" aria-hidden="true"></i></button>
    <a class="ds-avatar" href="#" aria-label="내 정보"></a>
  </div>
</header>
```

### 메뉴를 가운데에 두기

메뉴가 적고 로고와 버튼이 양끝에 있을 때 `data-layout="center"`로 메뉴를 막대 가운데에 둡니다.

```html
<header class="ds-topnav" data-layout="center" style="width: 100%">
  <div class="ds-topnav__left">
    <a class="ds-topnav__heading" href="#"><img src="https://luvms012-rgb.github.io/yds/site/assets/logo-ybmnet.svg" alt="YBM NET" width="68" height="20"></a>
    <nav class="ds-topnav__menu" aria-label="주요 메뉴">
      <a class="ds-topnav__item" href="#">홈</a>
      <a class="ds-topnav__item" href="#" aria-current="page">강의</a>
      <a class="ds-topnav__item" href="#">자격증</a>
      <a class="ds-topnav__item" href="#">이벤트</a>
      <a class="ds-topnav__item" href="#">고객센터</a>
    </nav>
  </div>
  <div class="ds-topnav__end">
    <button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
    <a class="ds-btn" data-variant="neutralWeak" data-size="xsmall" href="#">로그인</a>
  </div>
</header>
```

## 규격

### 크기와 여백

```
Figma: padding x2 / bg/layer-default / 왼쪽 묶음 gap x4 / 메뉴 사이 x1 / 오른쪽 끝 버튼 사이 x1
  로고 칸 높이 x8, 좌우 padding x2, 로고 높이 20(메뉴 글자 14 보다 조금 크게, 2026-11-12)
  Top Navigation Item 높이 x8, 좌우 padding x3, shape/sm, t04 Medium fg/neutral-subtle(옅게)
  hover bg/transparent-pressed, fg/neutral / 선택은 바탕 없이 t04 SemiBold fg/neutral (2026-11-12)
  로그인 뒤 내 정보 Avatar 는 32 로 로그인 버튼(xsmall 32)과 같은 높이 (2026-11-12)
  data-layout="center": 메뉴를 막대 가운데에, 로고는 왼쪽, 버튼은 오른쪽 그대로 (2026-11-12)
```
