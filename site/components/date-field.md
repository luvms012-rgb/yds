<!-- https://luvms012-rgb.github.io/yds/site/components/date-field.html -->

# Date Field

날짜를 숫자로 바로 입력하는 칸입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않으면 해당 부분을 모두 지웁니다.

```html
<div class="ds-input ds-datefield" data-variant="outline" data-size="medium">
  <input class="ds-input__control ds-datefield__control" type="text" inputmode="numeric" maxlength="10" placeholder="YYYY.MM.DD" aria-label="생년월일" autocomplete="bday">
  [<button type="button" class="ds-datefield__picker" aria-label="달력에서 고르기" data-ds-popover="…"><i class="ds-icon ds-icon--calendar" aria-hidden="true"></i></button>]
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Control** `ds-input__control` | 실제로 값을 입력하거나 선택하는 부분입니다. |
| **Control** `ds-datefield__control` | 실제로 값을 입력하거나 선택하는 부분입니다. |
| **Picker** `ds-datefield__picker` | 달력에서 날짜를 선택하는 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: 칸은 Text Field(size, `aria-invalid`), 숫자를 넣으면 점 자동, 달력 버튼(선택)

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- 숫자만 넣으면 YYYY.MM.DD 로 점을 넣는다

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 생년월일처럼 먼 날짜를 입력할 때 사용합니다. |
| **Do** | 가까운 날짜를 달력에서 고를 때는 Date Picker를 사용합니다. |
| **Do** | 라벨이나 플레이스홀더로 입력 형식(YYYY.MM.DD)을 알립니다. |
| **Do** | 없는 날짜를 넣으면 칸 아래 안내 글로 고치는 방법을 알립니다. |

## 예시

### 생년월일

숫자만 입력하면 점이 들어갑니다.

```html
<div class="ds-field" style="width:min(100%,320px)"><div class="ds-field__header"><label class="ds-field__label" for="ex-df1">생년월일</label></div><div class="ds-input ds-datefield" data-variant="outline" data-size="large"><input class="ds-input__control ds-datefield__control" id="ex-df1" type="text" inputmode="numeric" maxlength="10" placeholder="YYYY.MM.DD" autocomplete="bday"></div></div>
```

### 달력 버튼

가까운 날짜도 함께 받을 때는 달력 버튼으로 Date Picker를 엽니다.

```html
<div class="ds-input ds-datefield" data-variant="outline" data-size="large" style="width:min(100%,320px)"><input class="ds-input__control ds-datefield__control" type="text" inputmode="numeric" maxlength="10" placeholder="YYYY.MM.DD" aria-label="생년월일" value="2026.11.23"><button type="button" class="ds-datefield__picker" aria-label="달력에서 고르기"><i class="ds-icon ds-icon--calendar" aria-hidden="true"></i></button></div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-datefield-picker-size` | `var(--ds-space-x8)` |

### 크기와 여백

```
칸은 Text Field 그대로(size, aria-invalid, disabled) / 숫자만 넣으면 스크립트가 점을 넣는다(20010412 → 2001.04.12)
생년월일처럼 먼 날짜는 이 칸, 가까운 날짜를 달력에서 고를 때는 Date Picker
```
