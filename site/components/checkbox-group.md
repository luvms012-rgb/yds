<!-- https://luvms012-rgb.github.io/yds/site/components/checkbox-group.html -->

# Checkbox Group

관련된 체크박스를 한 묶음으로 표시하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<fieldset class="ds-checkbox-group">
  <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">이메일</span></label>
</fieldset>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Control** `ds-checkbox__control` | 실제로 값을 입력하거나 선택하는 부분입니다. |
| **Label** `ds-checkbox__label` | 이름이나 값을 표시하는 텍스트입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: 세로 간격 x1, 묶음 이름은 Field Label

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 서로 관련된 체크박스만 묶습니다. |
| **Do** | 묶음 이름과 오류 문구는 Field Label로 연결합니다. |
| **Do** | 선택지는 3~7개로 둡니다. 더 많으면 Multi Select를 사용합니다. |

## 예시

### 같은 질문의 답은 한 그룹으로

같은 질문에 답하는 체크박스만 세로로 쌓고, 그룹 이름과 안내는 Field Label로 표시합니다. 그룹에 `aria-labelledby`로 이름을 연결해 스크린 리더도 무엇을 선택하는지 알 수 있게 합니다.

```html
<div class="ds-field" style="width: 100%; max-width: 375px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="checkbox-group-ex1-label">관심 분야</span>
    <span class="ds-field__indicator">선택</span>
  </div>
  <fieldset class="ds-checkbox-group" aria-labelledby="checkbox-group-ex1-label">
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">어학</span></label>
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">자격증</span></label>
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">취업</span></label>
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">교양</span></label>
  </fieldset>
  <div class="ds-field__footer"><p class="ds-field__help">고른 분야의 강의를 먼저 보여 줘요.</p></div>
</div>
```

### 선택하지 않았을 때 오류 안내

필수 그룹에서 아무것도 선택하지 않으면 그룹에 `aria-invalid="true"`를 붙여 안내 문구를 오류 문구로 바꿉니다. 오류 문구에는 무엇을 하면 되는지 적습니다.

```html
<div class="ds-field" style="width: 100%; max-width: 375px">
  <div class="ds-field__header">
    <span class="ds-field__label" id="checkbox-group-ex2-label">답변 받을 방법</span>
    <span class="ds-field__required" aria-hidden="true"></span>
  </div>
  <fieldset class="ds-checkbox-group" aria-labelledby="checkbox-group-ex2-label" aria-describedby="checkbox-group-ex2-error" aria-invalid="true">
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">이메일</span></label>
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">문자 메시지</span></label>
    <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">전화</span></label>
  </fieldset>
  <div class="ds-field__footer">
    <p class="ds-field__help">답변이 오면 고른 방법으로 알려 줘요.</p>
    <p class="ds-field__error" id="checkbox-group-ex2-error">답변 받을 방법을 하나 이상 골라 주세요.</p>
  </div>
</div>
```

## 규격

### 크기와 여백

```
묶음 이름, 설명, 오류 문구는 03 Field Label로 감쌉니다.
Figma: 항목 사이 x1
```
