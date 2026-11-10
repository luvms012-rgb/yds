<!-- https://luvms012-rgb.github.io/yds/site/components/text-field-input.html -->

# Text Field Input

한 줄 텍스트를 입력받는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-input" data-variant="outline" data-size="medium">
  [<i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>]
  [<span class="ds-input__prefix">https://</span>]
  <input class="ds-input__control" placeholder="플레이스홀더">
  [<span class="ds-input__suffix">cm</span>]
  [<button class="ds-input__clear" aria-label="지우기"></button>]
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Icon** `ds-input__icon` | 의미를 빠르게 전달하는 아이콘입니다. |
| **Prefix** `ds-input__prefix` | 앞에 붙는 아이콘이나 요소입니다. |
| **Control** `ds-input__control` | 실제로 값을 입력하거나 선택하는 부분입니다. |
| **Suffix** `ds-input__suffix` | 뒤에 붙는 아이콘이나 요소입니다. |
| **Clear** `ds-input__clear` | 입력한 값을 지우는 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `variant` | outline underline |
| 켜고 끄는 속성 | `size` |

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- 값 지우기 (노출/숨김은 CSS 가 처리)

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 플레이스홀더는 입력 예시에만 사용합니다. 입력하면 사라지므로 라벨 대신 사용하지 않습니다. |
| **Do** | 오류 메시지에는 무엇이 틀렸는지와 고치는 방법을 함께 작성합니다. |
| **Do** | 이메일, 전화번호, 숫자 입력 필드는 type을 지정해 알맞은 키보드가 나타나게 합니다. |
| **Do** | 입력할 수 없는 이유는 Tooltip이 아니라 입력 필드 아래 안내 글로 알립니다. 비활성 필드는 포커스를 받지 않습니다. |

## Segmented Text Input과 비교

전화번호, 이메일, 유효기간처럼 형식만 정해진 값은 Text Field 하나로 받습니다. 주민등록번호, 카드번호처럼 일부 자리를 가려야 할 때만 Segmented Text Input을 사용합니다.

| 항목 | Text Field | Segmented Text Input |
| --- | --- | --- |
| 사용 맥락 | 전화번호, 이메일, 유효기간, 그 밖의 한 줄 값 | 주민등록번호, 카드번호 |
| 입력 칸 | 입력 칸 하나 | 구간마다 입력 칸 하나 |
| 가리기 | 가리지 않음 | 가린 구간은 점으로 표시, 받지 않는 자리도 점으로 표시 |
| 구간 이동 | 없음 | 자리 수를 채우면 다음 구간으로 이동 |
| 붙여 넣기 | 그대로 입력 | 구분자를 빼고 차례로 채우되 가린 구간 앞에서 멈춤 |

## 예시

### 라벨과 안내 문구가 있는 입력 필드

입력 필드 위에는 Field Label로 이름을, 아래에는 안내 문구를 표시합니다. 플레이스홀더는 입력하면 사라지므로 꼭 지켜야 할 형식은 안내 문구에 적습니다.

```html
<div class="u-col u-gap-6" style="width: 100%; max-width: 360px">
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="text-field-input-ex1-name">이름</label>
      <span class="ds-field__required" aria-hidden="true"></span>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="text-field-input-ex1-name" placeholder="이름을 입력해 주세요" required>
    </div>
  </div>
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="text-field-input-ex1-phone">휴대폰 번호</label>
      <span class="ds-field__required" aria-hidden="true"></span>
    </div>
    <div class="ds-input" data-variant="outline">
      <input class="ds-input__control" id="text-field-input-ex1-phone" type="tel" inputmode="numeric" placeholder="01012345678" required>
    </div>
    <div class="ds-field__footer">
      <p class="ds-field__help">숫자만 입력해 주세요.</p>
    </div>
  </div>
</div>
```

### 형식 오류 시 수정 방법 안내

형식이 맞지 않으면 입력 요소에 `aria-invalid="true"`를 붙여 테두리와 문구를 빨간색으로 표시합니다. 오류 문구에는 무엇을 어떻게 고치면 되는지 적습니다.

```html
<div class="ds-field" style="width: 100%; max-width: 360px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="text-field-input-ex2-mail">이메일</label>
  </div>
  <div class="ds-input" data-variant="outline">
    <input class="ds-input__control" id="text-field-input-ex2-mail" type="email" value="sky@example" aria-invalid="true" aria-describedby="text-field-input-ex2-mail-error">
  </div>
  <div class="ds-field__footer">
    <p class="ds-field__help">영수증과 안내 메일을 받을 주소예요.</p>
    <p class="ds-field__error" id="text-field-input-ex2-mail-error">sky@example.com처럼 끝까지 입력해 주세요.</p>
  </div>
</div>
```

### 단위 표시와 버튼 높이 맞춤

포인트처럼 단위가 있는 값은 `ds-input__suffix`로 단위를 표시합니다. 옆에 버튼을 배치할 때는 medium 입력 필드와 medium 버튼을 함께 사용해 높이를 맞춥니다.

```html
<div class="ds-field" style="width: 100%; max-width: 360px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="text-field-input-ex3-point">포인트 사용</label>
  </div>
  <div class="u-flex u-gap-2">
    <div class="ds-input u-grow" data-variant="outline" data-size="medium">
      <input class="ds-input__control" id="text-field-input-ex3-point" inputmode="numeric" value="3,000">
      <span class="ds-input__suffix">P</span>
    </div>
    <button type="button" class="ds-btn" data-variant="neutralWeak">전액 사용</button>
  </div>
  <div class="ds-field__footer">
    <p class="ds-field__help">12,400P까지 쓸 수 있어요.</p>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-input-height` | `44px` |
| `--ds-input-padding-x` | `0px` |
| `--ds-input-padding-y` | `var(--ds-space-x2)` |
| `--ds-input-gap` | `var(--ds-space-x2_5)` |
| `--ds-input-font-size` | `var(--ds-font-size-t06)` |
| `--ds-input-line-height` | `var(--ds-line-height-t06)` |
| `--ds-input-icon` | `24px` |
| `--ds-input-color` | `var(--ds-color-fg-neutral)` |
| `--ds-input-bg` | `var(--ds-color-bg-transparent)` |
| `--ds-input-radius` | `0px` |
| `--ds-input-line` | `var(--ds-color-stroke-neutral-weak)` |
| `--ds-input-line-active` | `var(--ds-color-stroke-neutral-contrast)` |
| `--ds-input-line-fade` | `var(--ds-duration-normal) var(--ds-easing-standard)` |

### 크기와 여백

```
variant : underline(기본) / outline      size : large(기본) / medium
Figma
  outline  large : h52 / px16 / gap10 / shape/lg / t05 / icon 20
  outline  medium: h40 / px14 / gap8  / shape/sm / t04 / icon 16
  underline large : py8 / min-h44 / gap10 / t06 / icon 24 / 하단 1px
  underline medium: py6 / min-h36 / gap8  / t05 / icon 20
  focused 1px stroke/neutral-contrast / invalid 1px stroke/critical-solid
  disabled (outline) bg/disabled / 글자 fg/disabled / readOnly (outline) bg/disabled
```
