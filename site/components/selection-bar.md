<!-- https://luvms012-rgb.github.io/yds/site/components/selection-bar.html -->

# Selection Bar

표나 목록에서 선택한 항목에 함께 적용할 동작을 모은 막대입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않으면 해당 부분을 모두 지웁니다.

```html
<div class="ds-selectionbar" id="sel" role="toolbar" aria-label="고른 항목 작업" [data-position="floating"] hidden>
  <span class="ds-selectionbar__count" aria-live="polite">3개 선택</span>
  <div class="ds-selectionbar__actions"><button type="button" class="ds-btn" data-variant="neutralWeak" data-size="small">내보내기</button> …</div>
  <button type="button" class="ds-selectionbar__clear" aria-label="선택 해제"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Count** `ds-selectionbar__count` | 개수나 글자 수를 보여 줍니다. |
| **Actions** `ds-selectionbar__actions` | 버튼을 묶는 영역입니다. |
| **Clear** `ds-selectionbar__clear` | 입력한 값을 지우는 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `position` | floating |

그 밖에: 표에 `data-ds-selection`, `data-count-format`

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- data-ds-selection 표의 고른 체크박스를 세어 막대를 보이고 숨긴다, 머리 체크박스는 모두 고르기, 해제 버튼

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 항목을 하나 이상 선택했을 때만 보입니다. |
| **Do** | 동작 버튼은 3개 안팎으로 두고, 나머지는 Menu로 모읍니다. |
| **Do** | 선택한 개수를 늘 표시합니다. |
| **Do** | 되돌릴 수 없는 동작은 Alert Dialog로 한 번 더 확인받습니다. |

## 예시

### 표 위 막대

행을 선택하면 표 위에 막대가 나타납니다.

```html
<div style="width:100%;display:flex;flex-direction:column;gap:var(--ds-space-x2)"><div class="ds-selectionbar" id="ex-sel" data-count-format="{n}개 선택" hidden role="toolbar" aria-label="고른 항목 작업"><span class="ds-selectionbar__count">0개 선택</span><div class="ds-selectionbar__actions"><button type="button" class="ds-btn" data-variant="ghost" data-size="small"><i class="ds-icon ds-icon--download" aria-hidden="true"></i>내보내기</button><button type="button" class="ds-btn" data-variant="ghost" data-size="small"><i class="ds-icon ds-icon--archive" aria-hidden="true"></i>보관</button><button type="button" class="ds-btn" data-variant="ghost" data-size="small"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i>삭제</button></div><button type="button" class="ds-selectionbar__clear" aria-label="선택 해제"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div><div class="ds-table-wrap"><table class="ds-table" data-ds-selection="ex-sel"><thead><tr><th style="width:52px"><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="모두 선택"></label></th><th>시험</th><th>시험일</th><th>상태</th></tr></thead><tbody><tr><td><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="영어 말하기 시험 선택"></label></td><td>영어 말하기 시험</td><td>11.23</td><td>접수 완료</td></tr><tr><td><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="영어 읽기 듣기 시험 선택"></label></td><td>영어 읽기 듣기 시험</td><td>12.07</td><td>접수 완료</td></tr><tr><td><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="영어 쓰기 시험 선택"></label></td><td>영어 쓰기 시험</td><td>12.21</td><td>대기</td></tr></tbody></table></div></div>
```

### 떠 있는 막대

긴 목록에서는 화면 아래 가운데에 띄웁니다.

```html
<div class="ds-selectionbar" role="toolbar" aria-label="고른 항목 작업" data-position="floating" style="position:relative;left:auto;bottom:auto;translate:none;animation:none"><span class="ds-selectionbar__count">3개 선택</span><div class="ds-selectionbar__actions"><button type="button" class="ds-btn" data-variant="ghost" data-size="small"><i class="ds-icon ds-icon--download" aria-hidden="true"></i>내보내기</button><button type="button" class="ds-btn" data-variant="ghost" data-size="small"><i class="ds-icon ds-icon--archive" aria-hidden="true"></i>보관</button><button type="button" class="ds-btn" data-variant="ghost" data-size="small"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i>삭제</button></div><button type="button" class="ds-selectionbar__clear" aria-label="선택 해제"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-selectionbar-bg` | `var(--ds-color-bg-neutral)` |
| `--ds-selectionbar-radius` | `var(--ds-shape-md)` |

### 크기와 여백

```
기본은 표 바로 위에 붙는 회색 막대, floating 은 화면 아래 가운데 떠 있는 막대
표(또는 목록)에 data-ds-selection="sel" 을 두면 스크립트가 tbody 체크박스를 세어 막대를 보이고 숨긴다. 머리 체크박스는 모두 고르기
개수 글자는 막대의 data-count-format="{n}개 선택" 으로 바꾼다 / 동작 버튼은 3개 안팎, 되돌릴 수 없는 동작은 Alert Dialog 로 다시 묻는다
```
