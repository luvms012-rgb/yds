<!-- https://design.ybmnet.co.kr/yds/components/action-button.html -->

# Action Button

동작을 바로 실행하는 기본 버튼입니다.

## 사용법

구조를 복사해 사용합니다. 대괄호 `[ ]` 부분은 선택 항목입니다.

```html
<button class="ds-btn" data-variant="neutralWeak" data-size="large">
  [<i class="ds-icon ds-icon--plus" aria-hidden="true"></i>] 라벨 [<i class="ds-icon …">]
</button>
```

## 속성

| 속성 | 값 |
| --- | --- |
| `variant` | brandSolid brandOutline neutralSolid neutralWeak neutralOutline criticalSolid ghost |
| `size` | xsmall small medium large |
| `layout` | iconOnly fill |

## 사용 지침

- Do: 강조 버튼(High emphasis)은 한 화면에 하나만 사용합니다.
- Do: 목록 항목마다 두는 버튼은 small 크기의 neutralWeak를 사용합니다.
- Do: 라벨에는 누르면 일어나는 결과를 동사로 작성합니다. 예) "삭제", "초대 보내기"
- Do: 아이콘만 있는 버튼의 aria-label에는 대상까지 적습니다. 예) "대화 삭제"
- Do: 되돌릴 수 없는 critical 동작은 Alert Dialog로 한 번 더 확인받습니다.
- Don't: 버튼은 3개를 넘게 나란히 배치하지 않습니다.
- Don't: "확인", "여기를 누르세요"처럼 결과가 드러나지 않는 라벨은 사용하지 않습니다.

## 예시

### 강조 버튼은 화면에 하나만

화면에서 가장 중요한 동작 하나만 brandSolid로 표시하고, 나머지는 neutralWeak를 사용합니다. 강조 버튼이 둘이면 무엇을 먼저 눌러야 할지 알기 어렵습니다.

```html
<div class="u-col u-gap-4">
  <div class="u-flex u-center u-between">
    <span class="ds-t04 ds-fg-muted">총 결제 금액</span>
    <strong class="ds-t07 ds-fw-bold">32,000원</strong>
  </div>
  <div class="u-flex u-gap-2">
    <button class="ds-btn" data-variant="neutralWeak" data-size="large" data-layout="fill">관심 강의 담기</button>
    <button class="ds-btn" data-size="large" data-layout="fill">수강 신청하기</button>
  </div>
</div>
```

### 버튼은 세 개까지, 나머지는 아이콘으로

나란히 배치하는 버튼은 세 개까지로 하고, 관심 강의 담기나 공유처럼 가끔 사용하는 동작은 작은 아이콘 버튼으로 제공합니다. 아이콘만 있는 버튼에는 `aria-label`로 이름을 지정합니다.

```html
<div class="u-col u-gap-4">
  <strong class="ds-t06 ds-fw-bold">영어 회화 첫걸음</strong>
  <div class="u-flex u-gap-2">
    <button class="ds-btn" data-variant="neutralOutline" data-size="large" data-layout="iconOnly" aria-label="관심 강의 담기"><i class="ds-icon ds-icon--heart" aria-hidden="true"></i></button>
    <button class="ds-btn" data-variant="neutralOutline" data-size="large" data-layout="iconOnly" aria-label="공유하기"><i class="ds-icon ds-icon--share" aria-hidden="true"></i></button>
    <button class="ds-btn" data-size="large" data-layout="fill">수강 신청하기</button>
  </div>
</div>
```

## 규격

### CSS 변수

| 변수 | 기본값 |
| --- | --- |
| `--ds-btn-height` | `40px` |
| `--ds-btn-padding-x` | `var(--ds-space-x4)` |
| `--ds-btn-radius` | `var(--ds-shape-sm)` |
| `--ds-btn-gap` | `var(--ds-space-x1_5)` |
| `--ds-btn-font-size` | `var(--ds-font-size-t04)` |
| `--ds-btn-line-height` | `var(--ds-line-height-t04)` |
| `--ds-btn-font-weight` | `var(--ds-font-weight-semibold)` |
| `--ds-btn-icon` | `18px` |
| `--ds-btn-icon-only` | `20px` |
| `--ds-btn-bg` | `var(--ds-color-bg-brand-solid)` |
| `--ds-btn-bg-pressed` | `var(--ds-color-bg-brand-solid-pressed)` |
| `--ds-btn-fg` | `var(--ds-color-fg-on-brand-solid)` |
| `--ds-btn-border` | `transparent` |

### 크기와 여백

```text
variant : brandSolid(기본) / neutralSolid / neutralWeak / criticalSolid / brandOutline / neutralOutline / ghost
size    : xsmall 32 / small 36 / medium 40(기본) / large 52
layout  : 기본 withText / data-layout="iconOnly" / data-layout="fill" (예전 data-width="fill" 도 읽음)
Figma: xsmall px14 gap4 t02 Medium shape/xs (iconOnly pill) / icon 16
       small  px14 gap4 t04 SemiBold shape/sm / icon 16 (iconOnly 18)
       medium px16 gap6 t04 SemiBold shape/sm / icon 18 (iconOnly 20)
       large  px20 gap8 t06 SemiBold shape/md / icon 24
```
