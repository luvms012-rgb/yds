<!-- https://luvms012-rgb.github.io/yds/site/components/text-field-textarea.html -->

# Text Field Textarea

여러 줄의 긴 텍스트를 입력받는 컴포넌트입니다. 내용이 길어지면 높이가 함께 늘어납니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<textarea class="ds-textarea" data-size="medium" rows="3" placeholder="…"></textarea>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| 켜고 끄는 속성 | `variant` `size` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 글자 수 제한이 있으면 남은 글자 수를 함께 표시합니다. |

## 예시

### 여러 줄 문의 입력

여러 줄 글은 Textarea로 입력받고 아래에 글자 수를 함께 표시합니다. 길이 제한이 있는 문의, 후기, 요청 사항에 사용합니다.

```html
<div class="ds-field" style="width: 100%; max-width: 420px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="text-field-textarea-ex1">문의 내용</label>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <textarea class="ds-textarea" id="text-field-textarea-ex1" rows="4" maxlength="500" placeholder="주문 번호와 함께 궁금한 점을 적어 주세요" required></textarea>
  <div class="ds-field__footer">
    <p class="ds-field__help">비밀번호 같은 개인 정보는 적지 말아 주세요.</p>
    <span class="ds-field__count">0/500</span>
  </div>
</div>
```

### 입력이 부족할 때 수정 방법 안내

필수 항목이 비었거나 너무 짧으면 Textarea에 `aria-invalid="true"`를 붙이고 오류 문구를 표시합니다. 몇 자를 더 입력해야 하는지처럼 고치는 방법을 적습니다.

```html
<div class="ds-field" style="width: 100%; max-width: 420px">
  <div class="ds-field__header">
    <label class="ds-field__label" for="text-field-textarea-ex2">취소 사유</label>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <textarea class="ds-textarea" id="text-field-textarea-ex2" rows="3" maxlength="200" required aria-invalid="true" aria-describedby="text-field-textarea-ex2-error">일정이 바뀌었어요</textarea>
  <div class="ds-field__footer">
    <p class="ds-field__help">강의를 고치는 데 참고할게요.</p>
    <p class="ds-field__error" id="text-field-textarea-ex2-error">10자 이상 적어 주세요. 지금 9자예요.</p>
    <span class="ds-field__count">9/200</span>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-textarea-padding` | `var(--ds-space-x3_5) var(--ds-space-x4)` |
| `--ds-textarea-min-height` | `94px` |
| `--ds-textarea-radius` | `var(--ds-shape-lg)` |
| `--ds-textarea-font-size` | `var(--ds-font-size-t05)` |
| `--ds-textarea-line-height` | `var(--ds-line-height-t05)` |
| `--ds-textarea-line` | `var(--ds-color-stroke-neutral-weak)` |
| `--ds-textarea-line-width` | `1px` |

### 크기와 여백

```
variant : outline(기본) / underline      size : large(기본) / medium
Figma outline large : px16 / py14 / min-h94 / shape/lg / t05
      outline medium: px14 / py12 / min-h82 / shape/sm / t04
      underline large : py8+14 / min-h110 / t06 / 하단 1px / underline medium: py6+12 / min-h94 / t05
focused 1px stroke/neutral-contrast / invalid 1px stroke/critical-solid / disabled/readOnly bg/disabled
```
