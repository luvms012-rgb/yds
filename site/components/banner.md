<!-- https://luvms012-rgb.github.io/yds/site/components/banner.html -->

# Banner

화면 맨 위에서 서비스 전체 공지를 전달하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-banner" role="status" data-tone="warning">
  <div class="ds-banner__inner">
    <i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i>
    <p class="ds-banner__message"><strong class="ds-banner__title">점검 안내</strong>  10월 25일(토) 02:00~06:00 서비스를 점검해요.</p>
    [<a class="ds-banner__action" href="#">자세히</a>]
    [<button type="button" class="ds-banner__close" aria-label="공지 닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>]
  </div>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Inner** `ds-banner__inner` | 배너 내용을 가운데에 정해진 폭으로 담는 영역입니다. |
| **Message** `ds-banner__message` | 전달할 내용을 담은 텍스트입니다. |
| **Title** `ds-banner__title` | 제목입니다. |
| **Action** `ds-banner__action` | 바로 실행하는 작은 버튼입니다. |
| **Close** `ds-banner__close` | 닫기 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: tone neutral, informative, positive, warning, critical, variant solid

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | Banner는 화면 맨 위에 전체 폭으로 배치하고, 한 번에 하나만 표시합니다. |
| **Do** | 본문 안의 안내는 Callout을 사용합니다. |
| **Do** | 같은 상태의 배너는 하나로 합칩니다. |
| **Don't** | 오류 배너는 해결될 때까지 닫기 버튼을 두지 않습니다. |

## 예시

### 화면 맨 위 점검 공지

모든 화면에 해당하는 점검 공지는 Banner로 화면 맨 위에 전체 폭으로 표시합니다. 한 번에 하나만 표시하고, 자세한 내용은 오른쪽 링크로 연결합니다.

```html
<div style="width: 100%; max-width: 375px">
  <div class="ds-banner" role="status" data-tone="warning">
    <div class="ds-banner__inner">
      <i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i>
      <p class="ds-banner__message"><strong class="ds-banner__title">점검 안내</strong>  9일 새벽 2~6시에 점검해요.</p>
      <a class="ds-banner__action" href="#">자세히</a>
    </div>
  </div>
  <header class="ds-appbar">
    <div class="ds-appbar__left"></div>
    <div class="ds-appbar__main"><h1 class="ds-appbar__title">홈</h1></div>
    <div class="ds-appbar__right">
      <button type="button" class="ds-appbar__button" aria-label="알림"><i class="ds-icon ds-icon--bell" aria-hidden="true"></i></button>
    </div>
  </header>
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">주문 내역</span>
          <span class="ds-list-item__desc">최근 3개월 2건</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">쿠폰함</span>
          <span class="ds-list-item__desc">쓸 수 있는 쿠폰 3장</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

### 긴급 장애 공지

결제 장애처럼 바로 알아야 하는 공지는 critical 톤과 `role="alert"`로 표시합니다. 문구에는 지금 사용할 수 있는 다른 방법까지 안내합니다.

```html
<div style="width: 100%">
  <div class="ds-banner" role="alert" data-tone="critical">
    <div class="ds-banner__inner">
      <i class="ds-icon ds-icon--circle-alert-solid" aria-hidden="true"></i>
      <p class="ds-banner__message"><strong class="ds-banner__title">결제 장애</strong>  일부 카드 결제가 되지 않아요. 계좌 이체나 간편 결제를 써 주세요.</p>
    </div>
  </div>
  <header class="ds-topnav">
    <div class="ds-topnav__left">
      <a class="ds-topnav__heading" href="#"><span class="ds-t06 ds-fw-bold">서비스 이름</span></a>
      <nav class="ds-topnav__menu u-show-from-md" aria-label="주요 메뉴">
        <a class="ds-topnav__item" href="#" aria-current="page">홈</a>
        <a class="ds-topnav__item" href="#">쇼핑</a>
        <a class="ds-topnav__item" href="#">주문 내역</a>
        <a class="ds-topnav__item" href="#">고객센터</a>
      </nav>
    </div>
    <div class="ds-topnav__end">
      <button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="검색"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></button>
      <a class="ds-btn" data-variant="neutralWeak" data-size="xsmall" href="#">로그인</a>
    </div>
  </header>
</div>
```

### 닫을 수 있는 공지

정책 변경처럼 한 번 읽으면 되는 공지에는 닫기 버튼을 제공합니다. 닫기 버튼의 `aria-label`에는 무엇을 닫는지 적습니다.

```html
<div style="width: 100%; max-width: 375px">
  <div class="ds-banner" role="status">
    <div class="ds-banner__inner">
      <i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i>
      <p class="ds-banner__message">개인 정보 처리 방침이 12월 1일부터 바뀌어요.</p>
      <a class="ds-banner__action" href="#">보기</a>
      <button type="button" class="ds-banner__close" aria-label="공지 닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
    </div>
  </div>
  <header class="ds-appbar">
    <div class="ds-appbar__left">
      <button type="button" class="ds-appbar__button" aria-label="뒤로"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>
    </div>
    <div class="ds-appbar__main"><h1 class="ds-appbar__title">내 정보</h1></div>
    <div class="ds-appbar__right"></div>
  </header>
  <ul class="ds-list" data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content"><span class="ds-list-item__title">개인 정보</span></span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content"><span class="ds-list-item__title">비밀번호 바꾸기</span></span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-banner-bg` | `var(--ds-color-bg-neutral-weak-alpha)` |
| `--ds-banner-fg` | `var(--ds-color-fg-neutral)` |
| `--ds-banner-max` | `1200px` |

### 크기와 여백

```
tone: neutral(기본) / informative / positive / warning / critical   variant: weak(기본) / solid
Figma: 전체 폭 / 모서리 없음 / min-h48 / padding x3 x4 / 내용 최대 폭 --ds-banner-max(1200) 가운데 / gap x2
  t04 / 제목 Bold / 아이콘 Solid 16 / action t04 Bold 밑줄 / 닫기 20(터치 영역 40)
  weak: Callout 과 같은 tone 색 / 아래 1px stroke/neutral-weak
  solid: bg/{tone}-solid + fg/on-{tone}-solid (neutral = bg/neutral-solid + fg/on-neutral-solid)
Callout과의 차이: Callout은 본문 안의 안내(둥근 상자)이고, Banner는 페이지 전체에 해당하는 공지(화면 맨 위, 한 번에 1개)입니다.
```
