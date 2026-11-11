<!-- https://luvms012-rgb.github.io/yds/site/components/toolbar.html -->

# Toolbar

표나 카드 위에서 관련 동작을 한 줄로 모은 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-toolbar" role="toolbar" aria-label="주문 목록 도구" [data-size="small"] [data-variant="muted"] [data-divider]>
  <div class="ds-toolbar__start">[<span class="ds-toolbar__title">주문 목록</span>] [<span class="ds-toolbar__count">3개 선택</span>] 버튼, 탭, 찾기 칸</div>
  [<div class="ds-toolbar__center">…</div>]
  <div class="ds-toolbar__end">… [<span class="ds-toolbar__separator" role="separator"></span>] … [<button type="button" class="ds-toolbar__clear" aria-label="선택 해제"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>]</div>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Start** `ds-toolbar__start` | 앞쪽에 배치하는 영역입니다. |
| **Title** `ds-toolbar__title` | 막대가 다루는 내용의 이름입니다. |
| **Count** `ds-toolbar__count` | 선택한 개수입니다. |
| **Center** `ds-toolbar__center` | 가운데에 배치하는 영역입니다. |
| **End** `ds-toolbar__end` | 로그인 같은 버튼이 놓이는 오른쪽 끝 영역입니다. |
| **Separator** `ds-toolbar__separator` | 묶음 사이를 나누는 세로선입니다. |
| **Clear** `ds-toolbar__clear` | 선택을 모두 해제하는 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `size` | medium small |
| `variant` | plain muted |
| `position` | floating |

그 밖에: `data-divider`, `__clear`, 표에 `data-ds-selection`

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- 막대 안에서 좌우 화살표로 버튼 사이를 옮긴다, data-ds-selection 표의 고른 체크박스를 세어 막대를 보이고 숨긴다, 머리 체크박스는 모두 고르기, 해제 버튼

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 뒤로, 필터 같은 보조 동작은 왼쪽에, 저장 같은 주요 동작은 오른쪽에 배치합니다. |
| **Do** | 여러 행을 선택했을 때만 나타나는 막대는 muted 바탕으로 구분하고, 긴 목록에서는 floating으로 화면 아래에 띄웁니다. |
| **Do** | 안의 버튼은 small로 맞추고, 자주 사용하지 않는 동작은 Menu로 옮깁니다. |
| **Don't** | 화면 전체 메뉴에는 사용하지 않습니다. 그때는 Top Navigation이나 Top App Bar를 사용합니다. |

## 예시

### 표 위 툴바

왼쪽에 표 이름을, 오른쪽에 필터, 내려받기, 주요 동작을 배치합니다. 아래 구분선으로 표와 나눕니다.

```html
<div class="u-col u-full">
  <div class="ds-toolbar" role="toolbar" aria-label="주문 목록 도구" data-divider><div class="ds-toolbar__start"><span class="ds-toolbar__title">주문 목록</span></div><div class="ds-toolbar__end"><button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="거르기"><i class="ds-icon ds-icon--list-filter" aria-hidden="true"></i></button><button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="내려받기"><i class="ds-icon ds-icon--download" aria-hidden="true"></i></button><span class="ds-toolbar__separator" role="separator"></span><button type="button" class="ds-btn" data-variant="neutralSolid" data-size="small"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i>새 주문</button></div></div>
  <table class="ds-table"><thead><tr><th>주문 번호</th><th>상품</th><th data-align="end">금액</th></tr></thead><tbody><tr><td>0012</td><td>데일리 백팩 18L</td><td data-align="end">42,000원</td></tr><tr><td>0011</td><td>스테인리스 텀블러</td><td data-align="end">18,000원</td></tr></tbody></table>
</div>
```

### 여러 행 선택 시 나타나는 툴바

선택한 개수와 선택한 행에 적용할 수 있는 동작만 담고, 배경을 채워 일시적으로 나타난 막대임을 알립니다. 끝에 선택 해제를 배치합니다.

```html
<div class="ds-toolbar u-full" role="toolbar" aria-label="고른 주문 도구" data-variant="muted" data-size="small"><div class="ds-toolbar__start"><span class="ds-toolbar__count">3개 선택</span></div><div class="ds-toolbar__end"><button type="button" class="ds-btn" data-variant="ghost" data-size="small">내보내기</button><button type="button" class="ds-btn" data-variant="ghost" data-size="small">삭제</button><button type="button" class="ds-toolbar__clear" aria-label="선택 해제"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div></div>
```

### 떠 있는 막대

행을 선택하면 화면 아래 가운데에 막대를 표시합니다.

```html
<div class="u-col u-full"><div class="ds-table-wrap"><table class="ds-table" data-ds-selection="ex-toolbar-sel"><thead><tr><th style="width:52px"><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="모두 선택"></label></th><th>시험</th><th>시험일</th><th>상태</th></tr></thead><tbody><tr><td><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="영어 말하기 시험 선택"></label></td><td>영어 말하기 시험</td><td>11.23</td><td>접수 완료</td></tr><tr><td><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="영어 읽기 듣기 시험 선택"></label></td><td>영어 읽기 듣기 시험</td><td>12.07</td><td>접수 완료</td></tr><tr><td><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="영어 쓰기 시험 선택"></label></td><td>영어 쓰기 시험</td><td>12.21</td><td>대기</td></tr></tbody></table></div><div class="ds-toolbar" id="ex-toolbar-sel" role="toolbar" aria-label="고른 항목 작업" data-position="floating" data-count-format="{n}개 선택" hidden><div class="ds-toolbar__start"><span class="ds-toolbar__count" aria-live="polite">0개 선택</span></div><div class="ds-toolbar__end"><button type="button" class="ds-btn" data-variant="ghost" data-size="small"><i class="ds-icon ds-icon--download" aria-hidden="true"></i>내보내기</button><button type="button" class="ds-btn" data-variant="ghost" data-size="small"><i class="ds-icon ds-icon--archive" aria-hidden="true"></i>보관</button><button type="button" class="ds-btn" data-variant="ghost" data-size="small"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i>삭제</button><button type="button" class="ds-toolbar__clear" aria-label="선택 해제"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div></div></div>
```

## 규격

### 크기와 여백

```
size: medium(기본) 높이 56, 좌우 x4, 사이 x2 / small 높이 48, 좌우 x3 / 안의 버튼은 small을 사용합니다
variant: plain(기본, 바탕 없음) / muted(여러 줄을 고른 뒤 잠깐 나오는 막대, bg/neutral-weak-alpha + shape/lg)
  muted 막대 안 버튼은 ghost(마우스를 올릴 때만 바탕)를 사용합니다. 회색 막대 위에 회색 버튼을 겹치지 않습니다 (2026-11-11)
data-divider: 아래 선 stroke/neutral-muted로 내용과 구분합니다 / 묶음 사이 세로선 stroke/neutral-muted 높이 20
data-position="floating": 화면 아래 가운데에 떠 있는 막대로 표시합니다, bg/layer-floating + elevation/overlay, [hidden]이면 숨깁니다
__clear: 끝에 두는 선택 해제 버튼입니다, 누르면 고른 항목을 모두 풀고 막대를 숨깁니다
data-ds-selection="막대 id": 표(또는 목록)에 붙이면 tbody 체크박스를 세어 막대를 표시하거나 숨깁니다, 헤더 체크박스는 전체 선택, 개수 문구는 막대의 data-count-format="{n}개 선택"으로 바꿉니다
동작 버튼이 한 줄에 다 들어가지 않으면 겹치지 않고 다음 줄로 넘어갑니다
title t05 SemiBold / count(고른 개수) t04 Medium
ybm-ds.js: 막대 안에서 좌우 화살표 키로 버튼 사이를 이동합니다
```
