<!-- https://luvms012-rgb.github.io/yds/site/components/divider.html -->

# Divider

콘텐츠 묶음 사이를 선으로 구분하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않으면 해당 부분을 모두 지웁니다.

```html
<hr class="ds-divider" [data-weight="thick"] [data-inset]>
<span class="ds-divider" role="separator" aria-orientation="vertical" data-orientation="vertical"></span>
<div class="ds-divider" role="separator" data-label><span>또는</span></div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `inset` `label` |

그 밖에: weight thick, orientation vertical

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Don't** | 마지막 묶음 아래에는 구분선을 두지 않습니다. |
| **Don't** | 여백과 정렬로 나눌 수 있으면 선을 더하지 않습니다. |

## 예시

### 묶음 사이에만 두고 마지막 아래는 비우기

주문 상세처럼 긴 모바일 화면은 묶음 사이에 굵은 구분선을 둡니다. 마지막 묶음 아래에는 선을 두지 않아 화면이 깔끔하게 끝납니다.

```html
<div class="u-col u-gap-5 u-full" style="max-width: 375px">
  <section class="u-col u-gap-3">
    <h3 class="ds-t06 ds-fw-bold">배송 정보</h3>
    <div class="u-flex u-between u-gap-4 ds-t04"><span class="ds-fg-subtle">받는 분</span><span>김하나</span></div>
    <div class="u-flex u-between u-gap-4 ds-t04"><span class="ds-fg-subtle">주소</span><span>서울시 종로구 종로 1길 23</span></div>
  </section>
  <hr class="ds-divider" data-weight="thick">
  <section class="u-col u-gap-3">
    <h3 class="ds-t06 ds-fw-bold">결제 정보</h3>
    <div class="u-flex u-between u-gap-4 ds-t04"><span class="ds-fg-subtle">상품 금액</span><span>32,000원</span></div>
    <div class="u-flex u-between u-gap-4 ds-t04"><span class="ds-fg-subtle">배송비</span><span>0원</span></div>
    <div class="u-flex u-between u-gap-4 ds-t05 ds-fw-bold"><span>총 결제 금액</span><span>32,000원</span></div>
  </section>
</div>
```

### 같은 일을 하는 두 방법을 '또는'으로 나누기

같은 일을 하는 두 방법 사이에는 글자가 포함된 구분선을 둡니다. 선 가운데 '또는'이 있어 둘 가운데 하나만 선택하면 된다는 것이 바로 읽힙니다.

```html
<div class="u-col u-gap-4 u-full" style="max-width: 360px">
  <button class="ds-btn" data-variant="brandSolid" data-size="large" data-width="fill">비밀번호로 로그인</button>
  <div class="ds-divider" role="separator" data-label><span>또는</span></div>
  <button class="ds-btn" data-variant="neutralOutline" data-size="large" data-width="fill">인증번호로 로그인</button>
</div>
```

### 짧은 링크 사이를 세로선으로 나누기

푸터의 짧은 링크 사이는 세로 구분선으로 나눕니다. 링크마다 다른 곳으로 간다는 것이 또렷해지고, 마지막 링크 뒤에는 선을 두지 않습니다.

```html
<nav class="u-flex u-center u-wrap u-gap-3" aria-label="약관과 정책">
  <a class="ds-link" data-size="small" href="#">이용약관</a>
  <span class="ds-divider" role="separator" aria-orientation="vertical" data-orientation="vertical"></span>
  <a class="ds-link" data-size="small" href="#">개인정보처리방침</a>
  <span class="ds-divider" role="separator" aria-orientation="vertical" data-orientation="vertical"></span>
  <a class="ds-link" data-size="small" href="#">고객센터</a>
</nav>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-divider-color` | `var(--ds-color-stroke-neutral-muted)` |
| `--ds-divider-size` | `1px` |
| `--ds-divider-length` | `16px` |

### 크기와 여백

```
weight: thin(기본 1px) / thick(8px 섹션 구분, 모바일)   orientation: horizontal(기본) / vertical
Figma: thin 1px stroke/neutral-weak / thick 8 bg/neutral-muted / vertical 1×16(--ds-divider-length)
  inset 좌우 x4 / label t03 fg/neutral-subtle, 선과 간격 x3
마지막 섹션 아래에는 두지 않는다.
```
