<!-- https://luvms012-rgb.github.io/yds/site/components/menu-menu-item.html -->

# Menu / Menu Item

버튼을 누르면 펼쳐지는 동작 목록입니다. 수정, 삭제처럼 바로 실행할 동작을 모아 둘 때 사용합니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-menu" role="menu">
  <button class="ds-menu-item" role="menuitem"><i class="ds-icon ds-icon--search" aria-hidden="true"></i>공유하기</button>
  <div class="ds-menu__divider" role="separator"></div>
  <button class="ds-menu-item" role="menuitem" data-tone="critical">삭제하기</button>
</div>
<!-- 묶음 제목: 바로 다음에 그 묶음 항목을 둔다 -->
<div class="ds-menu__label" role="presentation">정렬</div>
<!-- 켜고 끄기 -->
<button class="ds-menu-item" role="menuitemcheckbox" aria-checked="true">사진만 보기</button>
<!-- 하나 고르기 -->
<div role="group" aria-label="정렬"><button class="ds-menu-item" role="menuitemradio" aria-checked="true">최신순</button> …</div>
<!-- 하위 메뉴 -->
<div class="ds-menu__sub"><button class="ds-menu-item" role="menuitem" aria-haspopup="menu" aria-expanded="false">옮기기</button><div class="ds-menu" role="menu">…</div></div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Divider** `ds-menu__divider` | 항목 묶음을 나누는 선입니다. |
| **Label** `ds-menu__label` | 묶음 제목입니다. |
| **Sub** `ds-menu__sub` | 하위 메뉴를 포함하는 항목입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `tone` | critical |

그 밖에: 묶음 제목 `__label`, `menuitemcheckbox`, `menuitemradio`, 하위 메뉴 `__sub`

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- checkbox 항목은 켜고 끄고, radio 항목은 묶음에서 하나만, 하위 메뉴 버튼은 열고 닫기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 동작을 실행할 때는 Menu, 값을 선택할 때는 Select를 사용합니다. |
| **Do** | 삭제, 차단처럼 되돌릴 수 없는 항목은 critical로 표시합니다. 목록 끝에 배치하고 구분선(Divider)으로 나눕니다. |
| **Do** | 라벨은 2~6자 동사로 작성하고, 한 메뉴 안에서 말투를 맞춥니다. |
| **Do** | 설명은 꼭 필요한 항목에만 한 줄로 붙입니다. |
| **Do** | 켜고 끄는 항목과 하나만 선택하는 항목은 묶음 제목 아래에 모으고, 선택 표시는 항목 끝에 배치합니다. |
| **Do** | 하위 메뉴는 한 단계까지만 둡니다. |
| **Do** | 항목이 10개를 넘으면 묶음 제목으로 나눕니다. |
| **Don't** | 값을 선택하는 데는 사용하지 않습니다. 폼에 넣을 값은 Select로 선택하고, Menu는 동작을 실행할 때 사용합니다. |
| **Don't** | 아이콘을 일부 항목에만 넣지 마세요. 모든 항목에 넣거나 모두 빼세요. |
| **Don't** | 라벨 없이 아이콘만 사용하지 않습니다. |
| **Don't** | 주요 동작은 메뉴에 숨기지 않습니다. |
| **Don't** | 화면 이동에는 사용하지 않습니다. |

## 예시

### 글에 대한 동작 모음

더보기 버튼으로 여는 Menu에는 해당 글에 할 수 있는 동작만 담고, 아이콘은 모든 항목에 넣습니다. 삭제처럼 되돌릴 수 없는 항목은 critical로 표시해 맨 끝에 배치하고 구분선으로 나눕니다.

```html
<div class="u-col u-gap-1 u-full" style="max-width: 360px">
  <ul class="ds-list" data-inset>
    <li>
      <div class="ds-list-item">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">11월 스터디 모임 후기</span>
          <span class="ds-list-item__desc">내가 쓴 글, 어제</span>
        </span>
        <span class="ds-list-item__suffix">
          <button class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="더보기" aria-haspopup="menu" aria-expanded="true"><i class="ds-icon ds-icon--ellipsis-vertical" aria-hidden="true"></i></button>
        </span>
      </div>
    </li>
  </ul>
  <div class="u-flex">
    <span class="u-grow"></span>
    <div class="ds-menu" role="menu">
      <button class="ds-menu-item" role="menuitem"><i class="ds-icon ds-icon--pencil" aria-hidden="true"></i>수정하기</button>
      <button class="ds-menu-item" role="menuitem"><i class="ds-icon ds-icon--share" aria-hidden="true"></i>공유하기</button>
      <button class="ds-menu-item" role="menuitem"><i class="ds-icon ds-icon--archive" aria-hidden="true"></i>보관하기</button>
      <div class="ds-menu__divider" role="separator"></div>
      <button class="ds-menu-item" role="menuitem" data-tone="critical"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i>삭제하기</button>
    </div>
  </div>
</div>
```

### 값 선택은 Select에, 실행은 Menu에

정렬처럼 값을 선택하는 일은 Select를 사용하고, Menu에는 바로 실행하는 동작만 담습니다. 아이콘 없이도 뜻이 분명하면 모든 항목에서 아이콘을 빼 모양을 통일합니다.

```html
<div class="u-col u-gap-1 u-full" style="max-width: 420px">
  <div class="u-flex u-center u-between u-gap-2">
    <span class="ds-t05 ds-fw-bold">주문 내역 24건</span>
    <div class="u-flex u-gap-2">
      <div style="width: 120px">
        <button type="button" class="ds-select" data-size="medium" aria-haspopup="listbox" aria-expanded="false" aria-label="정렬">
          <span class="ds-select__value">최신순</span>
        </button>
      </div>
      <button class="ds-btn" data-variant="neutralOutline" data-layout="iconOnly" aria-label="더보기" aria-haspopup="menu" aria-expanded="true"><i class="ds-icon ds-icon--ellipsis" aria-hidden="true"></i></button>
    </div>
  </div>
  <div class="u-flex">
    <span class="u-grow"></span>
    <div class="ds-menu" role="menu">
      <button class="ds-menu-item" role="menuitem">내려받기</button>
      <button class="ds-menu-item" role="menuitem">인쇄하기</button>
      <button class="ds-menu-item" role="menuitem">메일로 보내기</button>
    </div>
  </div>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-menu-item-fg` | `var(--ds-color-fg-neutral)` |

### 크기와 여백

```
선택지 (2026-11-05 추가)
  고른 표시는 끝에 check 18 fg/neutral(Select 와 같다), 하위 메뉴 표시는 끝에 chevron-right 16 fg/neutral-subtle
  묶음 제목 t02 Medium fg/neutral-subtle, 위 x2 아래 x1 좌우 x3 / 하위 메뉴는 마우스를 올리거나 누르면 오른쪽에 붙어 열립니다
  ybm-ds.js: checkbox 항목은 누를 때마다 켜지고 꺼지며, radio 항목은 같은 묶음에서 하나만 켜집니다. 하위 메뉴 버튼을 누르면 하위 메뉴가 열리고 닫힙니다
Figma Menu: 폭 220 / padding x1 / shape/2xl / bg/layer-floating / elevation overlay(+헤어라인)
           divider 1px stroke/neutral-subtle / 위아래 4
Figma Item: py10 px12 / gap x2 / shape/sm / 아이콘 18 / t04 fg/neutral
           pressed bg/neutral-weak-alpha / disabled fg/disabled / critical fg/critical
```
