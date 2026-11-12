<!-- https://luvms012-rgb.github.io/yds/site/components/search-suggestion.html -->

# Search Suggestion

검색어를 입력하는 동안 추천 검색어를 표시하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-search-anchor">
  <div class="ds-input" data-variant="outline" data-size="medium">
    <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
    <input class="ds-input__control" type="search" role="combobox" aria-controls="sg" aria-expanded="true" aria-autocomplete="list" placeholder="검색어를 입력하세요">
    <button type="button" class="ds-input__clear" aria-label="지우기"></button>
  </div>
  <div class="ds-search-suggest" id="sg">
    [<div class="ds-search-suggest__heading" id="sg-h">최근 검색어</div>]
    <ul class="ds-search-suggest__list" role="listbox" aria-labelledby="sg-h">
      <li role="none"><a class="ds-search-suggest__item" role="option" id="sg-1" href="#">
        <i class="ds-icon ds-icon--clock" aria-hidden="true"></i>
        <span class="ds-search-suggest__content"><span class="ds-search-suggest__label">회의록</span>[<span class="ds-search-suggest__desc">보조 설명</span>]</span>
      </a></li>
    </ul>
    [<p class="ds-search-suggest__empty">검색 결과가 없어요</p>]
  </div>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Icon** `ds-input__icon` | 의미를 빠르게 전달하는 아이콘입니다. |
| **Control** `ds-input__control` | 실제로 값을 입력하거나 선택하는 부분입니다. |
| **Clear** `ds-input__clear` | 입력한 값을 지우는 버튼입니다. |
| **Heading** `ds-search-suggest__heading` | 목록 위에 붙는 소제목입니다. |
| **List** `ds-search-suggest__list` | 항목 목록입니다. |
| **Item** `ds-search-suggest__item` | 목록의 항목 하나입니다. |
| **Content** `ds-search-suggest__content` | 주된 내용이 들어가는 영역입니다. |
| **Label** `ds-search-suggest__label` | 이름이나 값을 표시하는 텍스트입니다. |
| **Desc** `ds-search-suggest__desc` | 제목을 보충하는 설명입니다. |
| **Empty** `ds-search-suggest__empty` | 결과가 없을 때 표시되는 문구입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `content` | suggestion recent empty |
| `Item state` | enabled highlighted |
| 켜고 끄는 속성 | `description` |

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- 입력 칸(role=combobox, aria-controls)에서 위아래 화살표로 줄 고르기, Enter 로 그 줄 누르기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 검색 필드는 Text Field outline에 search 아이콘과 지우기 버튼을 붙여 만듭니다. |
| **Do** | 검색 필드에는 `type="search"`와 `role="combobox"`를 붙입니다. |
| **Do** | 입력 전에는 최근 검색어, 입력 중에는 추천어, 결과가 없으면 안내 문구를 표시합니다. |

## 예시

### 입력 전 최근 검색어 표시

검색 필드를 눌렀지만 아직 입력하지 않았으면 헤더와 함께 최근 검색어를 표시합니다. 앞에 `clock` 아이콘을 두어 추천어와 구별합니다.

```html
<div class="u-col u-gap-4 u-full" style="max-width: 420px">
  <div class="ds-search-anchor">
    <div class="ds-input" data-variant="outline" data-size="medium">
      <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
      <input class="ds-input__control" type="search" role="combobox" aria-label="강의 검색" aria-controls="search-suggestion-ex1" aria-expanded="true" aria-autocomplete="list" placeholder="검색어를 입력하세요">
      <button type="button" class="ds-input__clear" aria-label="지우기"></button>
    </div>
    <div class="ds-search-suggest" id="search-suggestion-ex1">
      <div class="ds-search-suggest__heading" id="search-suggestion-ex1-heading">최근 검색어</div>
      <ul class="ds-search-suggest__list" role="listbox" aria-labelledby="search-suggestion-ex1-heading">
        <li role="none"><a class="ds-search-suggest__item" role="option" id="search-suggestion-ex1-1" href="#"><i class="ds-icon ds-icon--clock" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">영어 회화</span></span></a></li>
        <li role="none"><a class="ds-search-suggest__item" role="option" id="search-suggestion-ex1-2" href="#"><i class="ds-icon ds-icon--clock" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">모의고사</span></span></a></li>
        <li role="none"><a class="ds-search-suggest__item" role="option" id="search-suggestion-ex1-3" href="#"><i class="ds-icon ds-icon--clock" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">환불 규정</span></span></a></li>
      </ul>
    </div>
  </div>
  <section class="u-col u-gap-2">
    <h3 class="ds-t05 ds-fw-semibold">인기 강의</h3>
    <ul class="ds-list" data-inset data-divider>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">영어 회화 기초</span><span class="ds-list-item__desc">강의 24개</span></span></a></li>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">컴퓨터 활용 실무</span><span class="ds-list-item__desc">강의 30개</span></span></a></li>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">비즈니스 이메일 쓰기</span><span class="ds-list-item__desc">강의 16개</span></span></a></li>
    </ul>
  </section>
</div>
```

### 입력 중 추천어 표시

글자를 입력하는 동안에는 `search` 아이콘이 붙은 추천어를 표시합니다. 강의 수처럼 선택에 도움이 되는 정보는 보조 설명으로 표시합니다.

```html
<div class="u-col u-gap-4 u-full" style="max-width: 420px">
  <div class="ds-search-anchor">
    <div class="ds-input" data-variant="outline" data-size="medium">
      <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
      <input class="ds-input__control" type="search" role="combobox" aria-label="강의 검색" aria-controls="search-suggestion-ex2" aria-expanded="true" aria-autocomplete="list" placeholder="검색어를 입력하세요" value="영어">
      <button type="button" class="ds-input__clear" aria-label="지우기"></button>
    </div>
    <div class="ds-search-suggest" id="search-suggestion-ex2">
      <ul class="ds-search-suggest__list" role="listbox" aria-label="추천 검색어">
        <li role="none"><a class="ds-search-suggest__item" role="option" id="search-suggestion-ex2-1" href="#"><i class="ds-icon ds-icon--search" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">영어 회화</span><span class="ds-search-suggest__desc">강의 24개</span></span></a></li>
        <li role="none"><a class="ds-search-suggest__item" role="option" id="search-suggestion-ex2-2" href="#"><i class="ds-icon ds-icon--search" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">영어 문법</span><span class="ds-search-suggest__desc">강의 18개</span></span></a></li>
        <li role="none"><a class="ds-search-suggest__item" role="option" id="search-suggestion-ex2-3" href="#"><i class="ds-icon ds-icon--search" aria-hidden="true"></i><span class="ds-search-suggest__content"><span class="ds-search-suggest__label">비즈니스 영어</span><span class="ds-search-suggest__desc">강의 9개</span></span></a></li>
      </ul>
    </div>
  </div>
  <section class="u-col u-gap-2">
    <h3 class="ds-t05 ds-fw-semibold">인기 강의</h3>
    <ul class="ds-list" data-inset data-divider>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">영어 회화 기초</span><span class="ds-list-item__desc">강의 24개</span></span></a></li>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">컴퓨터 활용 실무</span><span class="ds-list-item__desc">강의 30개</span></span></a></li>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">비즈니스 이메일 쓰기</span><span class="ds-list-item__desc">강의 16개</span></span></a></li>
    </ul>
  </section>
</div>
```

### 추천어가 없을 때 안내 문구 표시

맞는 추천어가 없으면 빈 영역 대신 `ds-search-suggest__empty` 문구를 표시합니다. 아무것도 나타나지 않으면 검색이 멈춘 것처럼 보입니다.

```html
<div class="u-col u-gap-4 u-full" style="max-width: 420px">
  <div class="ds-search-anchor">
    <div class="ds-input" data-variant="outline" data-size="medium">
      <i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i>
      <input class="ds-input__control" type="search" role="combobox" aria-label="강의 검색" aria-controls="search-suggestion-ex3" aria-expanded="true" aria-autocomplete="list" placeholder="검색어를 입력하세요" value="주말 원어민 회화 심화반">
      <button type="button" class="ds-input__clear" aria-label="지우기"></button>
    </div>
    <div class="ds-search-suggest" id="search-suggestion-ex3">
      <p class="ds-search-suggest__empty">검색 결과가 없어요</p>
    </div>
  </div>
  <section class="u-col u-gap-2">
    <h3 class="ds-t05 ds-fw-semibold">인기 강의</h3>
    <ul class="ds-list" data-inset data-divider>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">영어 회화 기초</span><span class="ds-list-item__desc">강의 24개</span></span></a></li>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">컴퓨터 활용 실무</span><span class="ds-list-item__desc">강의 30개</span></span></a></li>
      <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">비즈니스 이메일 쓰기</span><span class="ds-list-item__desc">강의 16개</span></span></a></li>
    </ul>
  </section>
</div>
```

## 규격

### 크기와 여백

```
검색 입력 필드는 Text Field(04) outline에 search 아이콘과 지우기 버튼을 붙여 사용합니다.
입력 전에는 최근 검색어(머리말 + clock), 입력 중에는 추천어(search), 결과가 없으면 empty 문구를 표시합니다.
열고 닫기와 목록 채우기는 서비스에서 처리합니다. ybm-ds.js는 입력 필드에서 위아래 화살표로 줄을 선택하는 것과 Enter만 처리합니다.
Figma: padding x1 / shape/lg / bg/layer-floating / elevation overlay / 최대 높이 300 / 입력 칸과 같은 폭
  머리말 padding x2 x2 x1, t02 fg/neutral-muted / empty padding x3, t02 fg/neutral-muted, 가운데
  Search Suggestion Item padding x2, gap x2, shape/sm, 아이콘 16 fg/neutral-subtle, 글자 t04 fg/neutral, 설명 t02 fg/neutral-muted
  highlighted bg/transparent-pressed
```
