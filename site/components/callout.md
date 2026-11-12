<!-- https://luvms012-rgb.github.io/yds/site/components/callout.html -->

# Callout

콘텐츠 안에서 중요한 정보나 팁을 강조해 전달하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-callout" data-tone="warning">
  <i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i>
  <p class="ds-callout__content"><strong class="ds-callout__title">안내</strong>  본문  <a class="ds-callout__link" href="#">자세히</a></p>
  [<button class="ds-callout__suffix" aria-label="닫기"><i class="ds-icon ds-icon--x"></i></button>]
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Content** `ds-callout__content` | 주된 내용이 들어가는 영역입니다. |
| **Title** `ds-callout__title` | 제목입니다. |
| **Link** `ds-callout__link` | 자세히 보기 같은 이동 링크입니다. |
| **Suffix** `ds-callout__suffix` | 뒤에 붙는 아이콘이나 요소입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `tone` | neutral informative positive warning critical magic 은 CSS 만 |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 앞쪽 아이콘은 채움(Solid) 모양을 사용합니다. |
| **Do** | 제목, 본문, 링크는 한 줄로 이어 작성하고, 사이는 두 칸 띄웁니다. |
| **Do** | Banner는 화면 맨 위에 전체 폭으로 배치하고, 한 번에 하나만 표시합니다. |
| **Do** | 본문 안의 안내는 Callout을 사용합니다. |
| **Don't** | 전체를 누를 수 있는 Callout에는 링크 텍스트를 따로 넣지 않습니다. |

## 예시

### 입력 필드 가까이에서 미리 안내

이 화면에만 해당하는 안내는 본문 안, 관련 입력 필드 바로 위에 Callout으로 배치합니다. 제목과 본문은 한 줄로 이어 작성하고 사이는 두 칸 띄웁니다.

```html
<div class="u-col u-gap-4" style="width: 100%; max-width: 420px">
  <div class="ds-callout" data-tone="informative">
    <i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i>
    <p class="ds-callout__content"><strong class="ds-callout__title">배송 안내</strong>  제주와 산간 지역은 하루 더 걸려요.</p>
  </div>
  <div class="ds-field">
    <div class="ds-field__header"><label class="ds-field__label" for="callout-ex1-address">받는 주소</label></div>
    <div class="ds-input" data-variant="outline">
      <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
      <input class="ds-input__control" id="callout-ex1-address" placeholder="도로명이나 건물 이름으로 찾기">
    </div>
  </div>
</div>
```

### 문제가 생긴 곳에서 해결 방법 안내

문제가 생긴 정보 바로 위에 critical Callout을 배치하고 해결 방법을 링크로 제공합니다. 링크는 문장 끝에 두 칸 띄워 이어 작성합니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 420px">
  <div class="ds-callout" data-tone="critical">
    <i class="ds-icon ds-icon--circle-alert-solid" aria-hidden="true"></i>
    <p class="ds-callout__content">등록한 카드의 유효 기간이 지났어요.  <a class="ds-callout__link" href="#">결제 수단 바꾸기</a></p>
  </div>
  <ul class="ds-list" data-inset data-divider>
    <li>
      <div class="ds-list-item">
        <span class="ds-list-item__content"><span class="ds-list-item__title">요금제</span></span>
        <span class="ds-list-item__suffix">프리미엄, 월 9,900원</span>
      </div>
    </li>
    <li>
      <div class="ds-list-item">
        <span class="ds-list-item__content"><span class="ds-list-item__title">다음 결제일</span></span>
        <span class="ds-list-item__suffix">12월 1일</span>
      </div>
    </li>
  </ul>
</div>
```

### 전체가 링크인 Callout

Callout 전체가 링크이면 안에 별도의 링크 텍스트를 넣지 않습니다. 누르는 영역이 하나여서 어디를 눌러야 할지 헷갈리지 않습니다.

```html
<div class="u-col u-gap-3" style="width: 100%; max-width: 420px">
  <a class="ds-callout" href="#">
    <i class="ds-icon ds-icon--info-solid" aria-hidden="true"></i>
    <p class="ds-callout__content"><strong class="ds-callout__title">친구 초대</strong>  친구가 가입하면 둘 다 3,000원을 받아요.</p>
  </a>
  <ul class="ds-list" data-inset data-divider>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content"><span class="ds-list-item__title">주문 내역</span></span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content"><span class="ds-list-item__title">쿠폰함</span></span>
        <span class="ds-list-item__suffix">3장</span>
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
| `--ds-callout-bg` | `var(--ds-color-bg-neutral-weak-alpha)` |
| `--ds-callout-fg` | `var(--ds-color-fg-neutral)` |

### 크기와 여백

```
tone: neutral(기본) / informative / positive / warning / critical
Figma: padding x3_5 / gap x2 / min-h50 / shape/md / t04 / 아이콘 Solid 16
  neutral bg/neutral-weak-alpha + fg/neutral(info) / informative bg/informative-weak + fg/brand-contrast(info)
  positive bg/positive-weak + fg/positive(circle-check) / warning bg/warning-weak + fg/warning(triangle-alert)
  critical bg/critical-weak + fg/critical(circle-alert)
제목/링크는 본문과 같은 줄(inline), 구분은 띄어쓰기 두 칸. 제목 Bold / 링크 밑줄.
```
