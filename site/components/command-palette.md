<!-- https://luvms012-rgb.github.io/yds/site/components/command-palette.html -->

# Command Palette

검색어로 화면 이동과 동작을 찾아 바로 실행하는 창입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<dialog class="ds-command" id="cmd" aria-label="명령 찾기" [data-ds-hotkey="k"]>
  <div class="ds-command__search"><i class="ds-icon ds-icon--search" aria-hidden="true"></i>
    <input class="ds-command__input" type="text" role="combobox" aria-expanded="true" aria-controls="cmd-list" aria-autocomplete="list" placeholder="찾을 낱말" aria-label="명령 찾기"></div>
  <div class="ds-command__list" id="cmd-list" role="listbox" aria-label="명령">
    <div class="ds-command__group" role="group" aria-labelledby="cmd-g1"><p class="ds-command__title" id="cmd-g1">이동</p>
      <div class="ds-command__item" role="option" id="cmd-1" aria-selected="true"><i class="ds-icon ds-icon--house" aria-hidden="true"></i><span class="ds-command__label">홈</span>[<kbd class="ds-command__kbd">H</kbd>]</div>
    </div>
    <p class="ds-command__empty" hidden>찾는 명령이 없어요</p>
  </div>
</dialog>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Search** `ds-command__search` | 검색어를 입력하는 영역입니다. |
| **Input** `ds-command__input` | 실제 입력 필드입니다. |
| **List** `ds-command__list` | 항목 목록입니다. |
| **Group** `ds-command__group` | 관련 항목을 묶는 영역입니다. |
| **Title** `ds-command__title` | 제목입니다. |
| **Item** `ds-command__item` | 목록의 항목 하나입니다. |
| **Label** `ds-command__label` | 이름이나 값을 표시하는 텍스트입니다. |
| **Kbd** `ds-command__kbd` | 항목의 단축키입니다. |
| **Empty** `ds-command__empty` | 결과가 없을 때 표시되는 문구입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

그 밖에: `data-ds-hotkey="k"`, 거르기, 위아래 화살표와 Enter, 묶음과 단축키 표시

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- Dialog 와 같이 열기, data-ds-hotkey="k" 면 Ctrl/Command + K, 낱말로 거르기, 위아래 화살표와 Enter

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 자주 사용하는 화면 이동과 동작이 많은 업무 화면에서 사용합니다. |
| **Do** | 항목 이름은 동사나 화면 이름으로 짧게 작성합니다. |
| **Do** | 검색 결과가 없으면 그 이유를 안내합니다. |
| **Don't** | 주요 동작을 Command Palette에만 두지 않습니다. 화면에도 버튼으로 제공합니다. |

## 예시

### 명령 검색

버튼이나 Ctrl + K로 엽니다. 검색어를 입력하면 결과가 좁혀지고 Enter로 실행합니다.

```html
<button type="button" class="ds-btn" data-variant="neutralWeak" data-size="medium" data-ds-open="ex-cmd"><i class="ds-icon ds-icon--search" aria-hidden="true"></i>명령 찾기<kbd class="ds-command__kbd" style="margin-left:var(--ds-space-x1)">Ctrl K</kbd></button><dialog class="ds-command" id="ex-cmd" aria-label="명령 찾기" data-ds-hotkey="k"><div class="ds-command__search"><i class="ds-icon ds-icon--search" aria-hidden="true"></i><input class="ds-command__input" type="text" role="combobox" aria-expanded="true" aria-controls="ex-cmd-list" aria-autocomplete="list" placeholder="찾을 낱말" aria-label="명령 찾기"></div><div class="ds-command__list" id="ex-cmd-list" role="listbox" aria-label="명령"><div class="ds-command__group" role="group" aria-labelledby="ex-cmd-g0"><p class="ds-command__title" id="ex-cmd-g0">이동</p><div class="ds-command__item" role="option" id="ex-cmd-0" aria-selected="true"><i class="ds-icon ds-icon--house" aria-hidden="true"></i><span class="ds-command__label">홈</span><kbd class="ds-command__kbd">H</kbd></div><div class="ds-command__item" role="option" id="ex-cmd-1"><i class="ds-icon ds-icon--receipt" aria-hidden="true"></i><span class="ds-command__label">주문 내역</span><kbd class="ds-command__kbd">O</kbd></div><div class="ds-command__item" role="option" id="ex-cmd-2"><i class="ds-icon ds-icon--settings" aria-hidden="true"></i><span class="ds-command__label">설정</span><kbd class="ds-command__kbd">S</kbd></div></div><div class="ds-command__group" role="group" aria-labelledby="ex-cmd-g1"><p class="ds-command__title" id="ex-cmd-g1">동작</p><div class="ds-command__item" role="option" id="ex-cmd-3"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i><span class="ds-command__label">새 글 쓰기</span><kbd class="ds-command__kbd">N</kbd></div><div class="ds-command__item" role="option" id="ex-cmd-4"><i class="ds-icon ds-icon--download" aria-hidden="true"></i><span class="ds-command__label">주문 내역 내려받기</span></div><div class="ds-command__item" role="option" id="ex-cmd-5"><i class="ds-icon ds-icon--log-out" aria-hidden="true"></i><span class="ds-command__label">로그아웃</span></div></div><p class="ds-command__empty" hidden>찾는 명령이 없어요</p></div></dialog>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-command-width` | `560px` |

### 크기와 여백

```
여는 법: data-ds-open="cmd", 또는 dialog에 data-ds-hotkey="k"를 붙이면 Ctrl(Mac은 Command) + K로 열립니다
검색어를 입력하면 이름으로 필터링하고, 위아래 화살표로 선택한 뒤 Enter로 실행합니다(그 항목의 click) / 화면 위에서 15% 위치, 폭 --ds-command-width
```
