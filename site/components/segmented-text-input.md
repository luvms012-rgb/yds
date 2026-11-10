<!-- https://luvms012-rgb.github.io/yds/site/components/segmented-text-input.html -->

# Segmented Text Input

주민등록번호, 카드번호처럼 일부를 가려야 하는 값을 구간마다 나눠 받는 입력 칸입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-input ds-segmentinput" data-variant="outline" data-size="large" role="group" aria-labelledby="라벨 id">
  <input class="ds-segmentinput__segment" inputmode="numeric" maxlength="6" aria-label="앞 6자리">
  <span class="ds-segmentinput__separator" aria-hidden="true">-</span>
  <input class="ds-segmentinput__segment" inputmode="numeric" maxlength="1" aria-label="뒤 첫 자리" [data-masked]>
  [<span class="ds-segmentinput__dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>]
  [<span class="ds-segmentinput__suffix"><img src="…" alt="카드사 이름"></span>]
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Segment** `ds-segmentinput__segment` | 자리 수만큼 따로 입력하는 구간입니다. |
| **Separator** `ds-segmentinput__separator` | 구간 사이를 나누는 기호입니다. |
| **Dots** `ds-segmentinput__dots` | 입력받지 않는 자리를 표시하는 점입니다. |
| **Suffix** `ds-segmentinput__suffix` | 카드사 로고를 두는 자리입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `size` | large medium medium 은 PC 전용 |
| 켜고 끄는 속성 | `disabled` `readonly` |

그 밖에: 가린 구간 `data-masked`, `aria-invalid`, 구간마다 maxlength

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- 자리 수를 채우면 다음 구간, 빈 구간에서 Backspace 는 앞 구간 마지막 글자 지우기, 끝과 처음에서 좌우 화살표로 옆 구간, 붙여 넣으면 구분자를 빼고 차례로 채우되 가린 구간 앞에서 멈춤, 한글 조합 중에는 옮기지 않음

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 주민등록번호, 카드번호처럼 일부 자리를 가려야 하는 값에만 사용합니다. |
| **Do** | 형식만 정해진 값(전화번호, 이메일, 유효기간)은 Text Field 하나로 받습니다. |
| **Do** | 구간마다 `maxlength`와 자리를 알리는 `aria-label`을 넣고, 숫자만 받는 구간에는 `inputmode="numeric"`을 넣습니다. |
| **Do** | 받지 않는 자리는 점(dots)으로 표시해 전체 자리 수를 알립니다. |
| **Do** | 틀린 구간에 `aria-invalid="true"`를 붙이고, 입력 필드 아래 안내 글로 고치는 방법을 알립니다. |
| **Don't** | 인증번호를 한 칸에 한 글자씩 받을 때는 사용하지 않습니다. Code Input을 사용합니다. |

## Text Field와 비교

일부 자리를 가려야 하는 값에만 Segmented Text Input을 사용합니다. 전화번호, 이메일, 유효기간처럼 형식만 정해진 값은 Text Field 하나로 받고, 인증번호를 한 칸에 한 글자씩 받을 때는 Code Input을 사용합니다.

| 항목 | Segmented Text Input | Text Field |
| --- | --- | --- |
| 사용 맥락 | 주민등록번호, 카드번호 | 전화번호, 이메일, 유효기간, 그 밖의 한 줄 값 |
| 입력 칸 | 구간마다 입력 칸 하나 | 입력 칸 하나 |
| 가리기 | 가린 구간은 점으로 표시, 받지 않는 자리도 점으로 표시 | 가리지 않음 |
| 구간 이동 | 자리 수를 채우면 다음 구간으로 이동 | 없음 |
| 붙여 넣기 | 구분자를 빼고 차례로 채우되 가린 구간 앞에서 멈춤 | 그대로 입력 |

## 예시

### 주민등록번호

앞 6자리와 뒷자리 첫 자리만 입력받고, 받지 않는 나머지 6자리는 점으로 표시합니다. 앞 6자리를 채우면 다음 구간으로 이동합니다.

```html
<div class="ds-field" style="width:min(100%,320px)">
  <div class="ds-field__header"><span class="ds-field__label" id="ex-sti1">주민등록번호</span></div>
  <div class="ds-input ds-segmentinput" data-variant="outline" data-size="large" role="group" aria-labelledby="ex-sti1"><input class="ds-segmentinput__segment" inputmode="numeric" maxlength="6" autocomplete="off" aria-label="앞 6자리"><span class="ds-segmentinput__separator" aria-hidden="true">-</span><input class="ds-segmentinput__segment" inputmode="numeric" maxlength="1" autocomplete="off" aria-label="뒷자리 첫 자리"><span class="ds-segmentinput__dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
</div>
```

### 카드 번호

가운데 8자리는 입력한 글자를 점으로 가리고, 끝에 카드사 로고 자리를 둡니다. 번호를 붙여 넣으면 첫 구간을 채우고 가린 구간 앞에서 멈춥니다.

```html
<div class="ds-field" style="width:min(100%,340px)">
  <div class="ds-field__header"><span class="ds-field__label" id="ex-sti2">카드 번호</span></div>
  <div class="ds-input ds-segmentinput" data-variant="outline" data-size="large" role="group" aria-labelledby="ex-sti2"><input class="ds-segmentinput__segment" inputmode="numeric" maxlength="4" autocomplete="off" aria-label="1번째 4자리"><span class="ds-segmentinput__separator" aria-hidden="true">-</span><input class="ds-segmentinput__segment" inputmode="numeric" maxlength="4" autocomplete="off" aria-label="2번째 4자리" data-masked><span class="ds-segmentinput__separator" aria-hidden="true">-</span><input class="ds-segmentinput__segment" inputmode="numeric" maxlength="4" autocomplete="off" aria-label="3번째 4자리" data-masked><span class="ds-segmentinput__separator" aria-hidden="true">-</span><input class="ds-segmentinput__segment" inputmode="numeric" maxlength="4" autocomplete="off" aria-label="4번째 4자리"><span class="ds-segmentinput__suffix"><i class="ds-icon ds-icon--credit-card" aria-hidden="true"></i></span></div>
</div>
```

### 오류

틀린 구간에 `aria-invalid="true"`를 붙이면 테두리와 아래 안내 글이 오류 색으로 바뀝니다. 안내 글에는 고치는 방법을 적습니다.

```html
<div class="ds-field" style="width:min(100%,320px)">
  <div class="ds-field__header"><span class="ds-field__label" id="ex-sti3">주민등록번호</span></div>
  <div class="ds-input ds-segmentinput" data-variant="outline" data-size="large" role="group" aria-labelledby="ex-sti3"><input class="ds-segmentinput__segment" inputmode="numeric" maxlength="6" autocomplete="off" aria-label="앞 6자리" value="901301" aria-invalid="true" aria-describedby="ex-sti3-error"><span class="ds-segmentinput__separator" aria-hidden="true">-</span><input class="ds-segmentinput__segment" inputmode="numeric" maxlength="1" autocomplete="off" aria-label="뒷자리 첫 자리" value="1"><span class="ds-segmentinput__dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
  <div class="ds-field__footer"><p class="ds-field__error" id="ex-sti3-error">앞 6자리는 생년월일로 입력해 주세요.</p></div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-segmentinput-gap` | `var(--ds-space-x1_5)` |
| `--ds-segmentinput-dot` | `7px` |
| `--ds-segmentinput-dot-gap` | `var(--ds-space-x1)` |
| `--ds-segmentinput-suffix-width` | `30px` |
| `--ds-segmentinput-suffix-height` | `20px` |
| `--ds-segmentinput-chars` | `4` |
| `--ds-segmentinput-filled` | `0` |
| `--ds-segmentinput-slot` | `calc(var(--ds-segmentinput-dot) + var(--ds-segmentinput-dot-gap))` |

### 크기와 여백

```
size: large(기본) 높이 52, shape/lg, t05 / medium(PC 전용) 높이 40, shape/sm, t04
입력 필드는 Text Field outline과 같습니다(aria-invalid, disabled, readonly) / 구간 너비는 maxlength 자리 수만큼, 구간과 구분자 사이 x1_5
data-masked: 입력한 글자를 점으로 표시합니다 / dots: 받지 않는 자리를 지름 7 점으로 표시합니다, 점 사이 x1
suffix 30x20, shape/2xs, bg/neutral(카드사 로고 자리) / 라벨, 도움말, 오류는 Field Label(.ds-field)로 감쌉니다
형식만 정해진 값(전화번호, 이메일, 유효기간)은 Text Field, 인증번호를 한 칸에 한 글자씩 받을 때는 Code Input을 사용합니다
ybm-ds.js: 자리 수를 채우면 다음 구간으로 이동하고, 빈 구간에서 Backspace는 앞 구간의 마지막 글자를 지웁니다
```
