<!-- https://luvms012-rgb.github.io/yds/site/components/chip-tabs.html -->

# Chip Tabs

칩 모양의 탭으로 목록을 가볍게 필터링하는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-chiptabs" role="tablist" data-variant="neutralOutline" [data-inset="none"]>
  <button class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button>
  <button class="ds-chiptabs__trigger" role="tab" aria-selected="false" data-notification>공지</button>
</div>
```

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `variant` | neutralSolid neutralOutline |
| `size` | medium large |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 콘텐츠 분류를 바꿀 때 사용합니다. |
| **Do** | 제목 아래 영역에 둘 때는 `data-inset="none"`으로 제목과 왼쪽 끝을 맞춥니다. |
| **Do** | 선택은 항상 하나만 유지합니다. 여러 개를 선택하려면 Chip을 사용하세요. |
| **Don't** | 화면의 주요 메뉴로는 사용하지 않습니다. 주요 메뉴는 Tabs를 사용합니다. Chip Tabs는 한 화면 안에서 필터링하거나 하위 내용을 바꿀 때 사용합니다. |
| **Don't** | 한 줄 안에서 variant와 size를 섞지 않습니다. |
| **Don't** | 항목이 넘쳐도 줄을 바꾸지 않습니다. 넘친 항목은 가로로 스크롤해 봅니다. |

## 예시

### Tabs 아래의 분류 전환

화면의 주요 메뉴는 Tabs를 사용하고, 그 안에서 분류를 바꿀 때 Chip Tabs를 사용합니다. 선택한 항목은 항상 하나입니다.

```html
<div style="width: 100%; max-width: 375px">
  <div class="ds-tabs" role="tablist">
    <button class="ds-tabs__trigger" role="tab" aria-selected="true">강의</button>
    <button class="ds-tabs__trigger" role="tab" aria-selected="false">교재</button>
    <button class="ds-tabs__trigger" role="tab" aria-selected="false">이벤트</button>
  </div>
  <div class="ds-chiptabs u-mt-3" role="tablist" aria-label="강의 분류">
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">어학</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">자격증</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">취업</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">교양</button>
  </div>
  <ul class="ds-list u-mt-2">
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">영어 회화 첫걸음</span>
          <span class="ds-list-item__desc">강의 24개, 12시간</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">엑셀 실무 기초</span>
          <span class="ds-list-item__desc">강의 18개, 9시간</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

### 항목이 많을 때 가로 스크롤

항목이 영역보다 많아도 줄을 바꾸지 않고 가로로 스크롤합니다. 새 글이 있는 분류에는 `data-notification`으로 점을 표시합니다.

```html
<div style="width: 100%; max-width: 320px">
  <div class="ds-chiptabs" role="tablist" aria-label="소식 분류">
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">공지</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false" data-notification>이벤트</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">업데이트</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">점검</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">정책 변경</button>
    <button class="ds-chiptabs__trigger" role="tab" aria-selected="false">채용</button>
  </div>
  <ul class="ds-list u-mt-2">
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">연말 배송 일정 안내</span>
          <span class="ds-list-item__desc">공지, 12월 1일</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a class="ds-list-item" href="#">
        <span class="ds-list-item__content">
          <span class="ds-list-item__title">겨울맞이 쿠폰 받기</span>
          <span class="ds-list-item__desc">이벤트, 11월 28일</span>
        </span>
        <i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
```

## 규격

### 크기와 여백

```
variant: neutralSolid(기본) / neutralOutline   size: medium(기본 36) / large 40
inset: 기본 좌우 x4(화면 끝까지 넘기는 목록) / data-inset="none" 좌우 여백 없음(제목 아래 콘텐츠 칸 안에 놓을 때, 2026-11-03)
Figma list: 좌우 x4 / gap x2 / trigger: shape/pill / medium h36 px14 min-w48 / large h40 px16 min-w52 / t04 Medium
  neutralSolid bg/neutral-weak-alpha / neutralOutline 투명 + stroke/neutral-muted
  selected bg/neutral-solid + fg/on-neutral-solid / disabled opacity .5 / notification 점 6 bg/brand-solid
```
