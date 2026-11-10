<!-- https://luvms012-rgb.github.io/yds/site/components/mega-menu.html -->

# Mega Menu

위 메뉴 아래로 펼쳐 하위 메뉴 묶음을 한 번에 보여 주는 판입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않으면 해당 부분을 모두 지웁니다.

```html
<div class="ds-topnav" style="position: relative">  …
  <button type="button" class="ds-topnav__item" aria-expanded="false" aria-controls="mm-1" data-ds-megamenu="mm-1">강의</button>
  <div class="ds-megamenu" id="mm-1" hidden>
    <div class="ds-megamenu__inner">
      <section class="ds-megamenu__group" aria-labelledby="mm-1-a"><p class="ds-megamenu__title" id="mm-1-a">영어</p>
        <ul class="ds-megamenu__list"><li><a class="ds-megamenu__link" href="#">토익</a></li> …</ul></section>
      [<aside class="ds-megamenu__aside">추천 카드 한 개</aside>]
    </div>
  </div>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Item** `ds-topnav__item` | 목록의 항목 하나입니다. |
| **Inner** `ds-megamenu__inner` | 내용을 가운데에 정해진 폭으로 담는 영역입니다. |
| **Group** `ds-megamenu__group` | 관련 항목을 묶는 영역입니다. |
| **Title** `ds-megamenu__title` | 제목입니다. |
| **List** `ds-megamenu__list` | 항목 목록입니다. |
| **Link** `ds-megamenu__link` | 자세히 보기 같은 이동 링크입니다. |
| **Aside** `ds-megamenu__aside` | 추천 내용을 두는 옆 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: 트리거 `data-ds-megamenu` + `aria-expanded`, 묶음 4개까지, aside(선택)

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- data-ds-megamenu 트리거로 열고 닫기, Esc 와 바깥 누름으로 닫기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 하위 메뉴가 많은 PC 화면에서만 사용합니다. 모바일은 Menu Sheet를 사용합니다. |
| **Do** | 묶음은 4개까지 두고 묶음 제목을 붙입니다. |
| **Don't** | 마우스를 올리는 것만으로 열지 않습니다. 누르면 엽니다. |
| **Don't** | 판 안에 입력 칸이나 긴 설명을 넣지 않습니다. |

## 예시

### 위 메뉴에서 펼치기

메뉴 이름을 누르면 아래로 하위 메뉴 묶음이 펼쳐집니다.

```html
<div style="position:relative;width:100%;min-height:260px"><nav class="ds-topnav" aria-label="주 메뉴" style="position:relative"><div class="ds-topnav__menu" style="display:flex"><button type="button" class="ds-topnav__item" aria-expanded="false" aria-controls="ex-mm-0" data-ds-megamenu="ex-mm-0">강의</button><button type="button" class="ds-topnav__item" aria-expanded="false" aria-controls="ex-mm-1" data-ds-megamenu="ex-mm-1">교재</button><button type="button" class="ds-topnav__item" aria-expanded="false" aria-controls="ex-mm-2" data-ds-megamenu="ex-mm-2">시험</button></div><div class="ds-megamenu" id="ex-mm-0" hidden><div class="ds-megamenu__inner"><section class="ds-megamenu__group" aria-labelledby="ex-mm-0-0"><p class="ds-megamenu__title" id="ex-mm-0-0">영어</p><ul class="ds-megamenu__list"><li><a class="ds-megamenu__link" href="#">토익</a></li><li><a class="ds-megamenu__link" href="#">토익 스피킹</a></li><li><a class="ds-megamenu__link" href="#">비즈니스 회화</a></li></ul></section><section class="ds-megamenu__group" aria-labelledby="ex-mm-0-1"><p class="ds-megamenu__title" id="ex-mm-0-1">제2외국어</p><ul class="ds-megamenu__list"><li><a class="ds-megamenu__link" href="#">중국어</a></li><li><a class="ds-megamenu__link" href="#">일본어</a></li><li><a class="ds-megamenu__link" href="#">스페인어</a></li></ul></section><section class="ds-megamenu__group" aria-labelledby="ex-mm-0-2"><p class="ds-megamenu__title" id="ex-mm-0-2">자격증</p><ul class="ds-megamenu__list"><li><a class="ds-megamenu__link" href="#">컴퓨터 활용</a></li><li><a class="ds-megamenu__link" href="#">한국사</a></li><li><a class="ds-megamenu__link" href="#">공무원</a></li></ul></section></div></div><div class="ds-megamenu" id="ex-mm-1" hidden><div class="ds-megamenu__inner"><section class="ds-megamenu__group" aria-labelledby="ex-mm-1-0"><p class="ds-megamenu__title" id="ex-mm-1-0">영어</p><ul class="ds-megamenu__list"><li><a class="ds-megamenu__link" href="#">토익 교재</a></li><li><a class="ds-megamenu__link" href="#">토익 스피킹 교재</a></li><li><a class="ds-megamenu__link" href="#">비즈니스 회화 교재</a></li></ul></section><section class="ds-megamenu__group" aria-labelledby="ex-mm-1-1"><p class="ds-megamenu__title" id="ex-mm-1-1">제2외국어</p><ul class="ds-megamenu__list"><li><a class="ds-megamenu__link" href="#">중국어 교재</a></li><li><a class="ds-megamenu__link" href="#">일본어 교재</a></li><li><a class="ds-megamenu__link" href="#">스페인어 교재</a></li></ul></section><section class="ds-megamenu__group" aria-labelledby="ex-mm-1-2"><p class="ds-megamenu__title" id="ex-mm-1-2">자격증</p><ul class="ds-megamenu__list"><li><a class="ds-megamenu__link" href="#">컴퓨터 활용 교재</a></li><li><a class="ds-megamenu__link" href="#">한국사 교재</a></li><li><a class="ds-megamenu__link" href="#">공무원 교재</a></li></ul></section></div></div><div class="ds-megamenu" id="ex-mm-2" hidden><div class="ds-megamenu__inner"><section class="ds-megamenu__group" aria-labelledby="ex-mm-2-0"><p class="ds-megamenu__title" id="ex-mm-2-0">영어</p><ul class="ds-megamenu__list"><li><a class="ds-megamenu__link" href="#">토익 시험</a></li><li><a class="ds-megamenu__link" href="#">토익 스피킹 시험</a></li><li><a class="ds-megamenu__link" href="#">비즈니스 회화 시험</a></li></ul></section><section class="ds-megamenu__group" aria-labelledby="ex-mm-2-1"><p class="ds-megamenu__title" id="ex-mm-2-1">제2외국어</p><ul class="ds-megamenu__list"><li><a class="ds-megamenu__link" href="#">중국어 시험</a></li><li><a class="ds-megamenu__link" href="#">일본어 시험</a></li><li><a class="ds-megamenu__link" href="#">스페인어 시험</a></li></ul></section><section class="ds-megamenu__group" aria-labelledby="ex-mm-2-2"><p class="ds-megamenu__title" id="ex-mm-2-2">자격증</p><ul class="ds-megamenu__list"><li><a class="ds-megamenu__link" href="#">컴퓨터 활용 시험</a></li><li><a class="ds-megamenu__link" href="#">한국사 시험</a></li><li><a class="ds-megamenu__link" href="#">공무원 시험</a></li></ul></section></div></div></nav></div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-megamenu-width` | `1200px` |

### 크기와 여백

```
판은 위 메뉴 바로 아래 화면 폭 전체, 안쪽 폭은 --ds-megamenu-width / 묶음은 4개까지
트리거를 누르면 열고 닫는다, Esc, 바깥 누름, 다른 트리거를 누르면 닫는다 / 768 미만에서는 보이지 않는다(Menu Sheet 사용)
```
