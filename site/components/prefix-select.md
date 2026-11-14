<!-- https://luvms012-rgb.github.io/yds/site/components/prefix-select.html -->

# Prefix Select

입력 필드 앞에서 국가 번호, 단위 같은 기준 값을 선택하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<button type="button" class="ds-prefixselect" [data-size="medium"]>통신사</button>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: 입력 앞 선택(통신사, 국가번호)

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 테두리 있는 입력 필드에는 medium을 사용해 글자 크기를 필드와 맞춥니다. |

## 예시

### 번호 앞 선택 값을 한 필드에

휴대폰 인증처럼 번호 앞에 선택할 값이 하나 더 있으면 Prefix Select를 입력 필드 안 맨 앞에 배치합니다. 선택하는 값과 입력하는 값이 한 필드에 있어 하나의 정보로 읽힙니다.

```html
<div class="u-col u-gap-6 u-full" style="max-width: 360px">
  <div class="ds-field">
    <div class="ds-field__header">
      <label class="ds-field__label" for="prefix-select-ex1-phone">휴대폰 번호</label>
      <span class="ds-field__required" aria-hidden="true"></span>
    </div>
    <div class="ds-input">
      <button type="button" class="ds-prefixselect">통신사</button>
      <input class="ds-input__control" id="prefix-select-ex1-phone" type="tel" inputmode="numeric" placeholder="010-0000-0000" required>
    </div>
  </div>
  <button class="ds-btn" data-variant="brandSolid" data-size="large" data-layout="fill">인증번호 받기</button>
</div>
```

## 규격

### 크기와 여백

```
Figma large: t06 Regular / chevron 24 / medium: t05 / chevron 20 / gap x1 / fg/neutral-subtle
```
