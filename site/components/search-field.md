<!-- https://design.ybmnet.co.kr/yds/site/components/search-field.html -->

# Search Field

지우기와 취소 버튼을 함께 제공하는 검색 입력 필드입니다.

## 사용법

구조를 복사해 사용합니다. 대괄호 `[ ]` 부분은 선택 항목입니다.

```html
<form class="ds-searchfield" role="search" [data-variant="fill"] action="…">
  <div class="ds-input" data-variant="outline" data-size="medium">
    <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
    <input class="ds-input__control" type="search" name="q" placeholder="찾을 낱말" aria-label="찾기">
    <button type="button" class="ds-input__clear" aria-label="지우기"></button>
  </div>
  [<button type="button" class="ds-searchfield__cancel">취소</button>]
</form>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Icon** `ds-input__icon` | 의미를 빠르게 전달하는 아이콘입니다. |
| **Control** `ds-input__control` | 실제로 값을 입력하거나 선택하는 부분입니다. |
| **Clear** `ds-input__clear` | 입력한 값을 지우는 버튼입니다. |
| **Cancel** `ds-searchfield__cancel` | 검색을 취소하는 버튼입니다. |

## 속성

| 속성 | 값 |
| --- | --- |
| `variant` | outline fill |

그 밖에: cancel 버튼

## 사용 지침

- Do: `<form role="search">`로 감싸 Enter로 검색어를 전송하게 합니다.
- Do: 앱 상단이나 목록 위처럼 바탕이 흰 곳에는 fill을 사용합니다.
- Do: 추천어 목록이 필요하면 Search Suggestion을 함께 사용합니다.
- Do: 취소 버튼은 검색 화면을 따로 열었을 때만 둡니다.

## 예시

### 앱 상단 검색 필드

검색 화면을 따로 열었을 때는 배경이 채워진 검색 필드 옆에 취소를 배치합니다. 취소를 누르면 이전 화면으로 돌아갑니다.

```html
<div class="u-full" style="max-width: 375px; padding: var(--ds-space-x2) var(--ds-space-x4)"><form class="ds-searchfield" role="search" data-variant="fill" action="#"><div class="ds-input" data-variant="outline" data-size="medium"><i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i><input class="ds-input__control" type="search" name="q" placeholder="찾을 낱말을 넣어 주세요" aria-label="찾기"><button type="button" class="ds-input__clear" aria-label="지우기"></button></div><button type="button" class="ds-searchfield__cancel">취소</button></form></div>
```

## 규격

### 크기와 여백

```text
입력 필드는 Text Field(outline large / medium)와 같습니다 / variant fill: 선 없이 bg/neutral, 모서리 shape/pill(앱 머리, 목록 위)
cancel t05 Medium fg/neutral, 입력 필드와 사이 x3 / Enter로 form을 제출합니다(추천어 목록은 Search Suggestion)
```
