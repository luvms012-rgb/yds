<!-- https://luvms012-rgb.github.io/yds/site/components/tree.html -->

# Tree

폴더나 분류처럼 상하 관계가 있는 항목을 접고 펼쳐 표시하는 목록입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<ul class="ds-tree" role="tree" aria-label="폴더" [data-size="small"] [data-guides="none"]>
  <li class="ds-tree__node" role="treeitem" aria-expanded="true" [aria-selected="true"] tabindex="0">
    <div class="ds-tree__row">
      <span class="ds-tree__toggle" aria-hidden="true"></span>
      [<i class="ds-icon ds-icon--folder ds-tree__icon" aria-hidden="true"></i>]
      <span class="ds-tree__label">문서</span>
      [<span class="ds-tree__suffix">12</span>]
    </div>
    <ul class="ds-tree__group" role="group"> 아래 단계 ds-tree__node 들 </ul>
  </li>
  <li class="ds-tree__node" role="treeitem" tabindex="-1"><a class="ds-tree__row" href="#" [aria-current="page"]>…</a></li>
</ul>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Node** `ds-tree__node` | 트리의 항목 하나입니다. 하위 항목을 포함할 수 있습니다. |
| **Row** `ds-tree__row` | 항목 한 줄입니다. |
| **Toggle** `ds-tree__toggle` | 펼치고 접는 표시입니다. |
| **Icon** `ds-tree__icon` | 의미를 빠르게 전달하는 아이콘입니다. |
| **Label** `ds-tree__label` | 항목 이름입니다. |
| **Suffix** `ds-tree__suffix` | 뒤에 붙는 아이콘이나 요소입니다. |
| **Group** `ds-tree__group` | 하위 항목을 묶은 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `size` | medium small |
| `guides` | none |

그 밖에: `aria-expanded`, `aria-selected`

## 동작

`ybm-ds.js`를 불러오면 자동으로 동작합니다.

- 줄을 누르면 펼치고 접고 고른다(change, detail.value), 위아래 화살표 이동, 오른쪽 펼침, 왼쪽 접기

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 좁은 영역에서는 연결선 없이 들여쓰기만 사용합니다. |
| **Do** | 항목마다 알아보기 쉬운 이름과 아이콘을 둡니다. |
| **Do** | 중요한 항목은 처음부터 펼친 상태로 표시합니다. |
| **Don't** | 계층은 4단계를 넘기지 않습니다. |
| **Don't** | 위아래 관계가 없는 목록에는 사용하지 않습니다. 그때는 List를 사용합니다. |

## 예시

### 파일 탐색기

폴더와 파일을 아이콘으로 구분하고, 현재 열린 파일을 선택 상태로 표시합니다. 펼칠 항목이 없는 줄도 펼침 아이콘 자리를 비워 두어 이름이 나란히 정렬됩니다.

```html
<ul class="ds-tree" role="tree" aria-label="강의 자료 폴더" style="width: 100%; max-width: 320px"><li class="ds-tree__node" role="treeitem" aria-expanded="true" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--folder-open ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">강의 자료</span></div><ul class="ds-tree__group" role="group"><li class="ds-tree__node" role="treeitem" aria-expanded="true" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--folder-open ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">1주차</span></div><ul class="ds-tree__group" role="group"><li class="ds-tree__node" role="treeitem" aria-selected="true" tabindex="0"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--file-text ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">강의 계획서.docx</span></div></li><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--file ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">발표 자료.pdf</span></div></li></ul></li><li class="ds-tree__node" role="treeitem" aria-expanded="false" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--folder ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">2주차</span></div><ul class="ds-tree__group" role="group"><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--file ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">읽을거리.pdf</span></div></li></ul></li></ul></li><li class="ds-tree__node" role="treeitem" aria-expanded="false" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--folder ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">과제</span><span class="ds-tree__suffix">3</span></div><ul class="ds-tree__group" role="group"><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--file-text ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">과제 1.docx</span></div></li></ul></li><li class="ds-tree__node" role="treeitem" tabindex="-1"><div class="ds-tree__row"><span class="ds-tree__toggle" aria-hidden="true"></span><i class="ds-icon ds-icon--file-text ds-tree__icon" aria-hidden="true"></i><span class="ds-tree__label">공지.txt</span></div></li></ul>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-tree-row` | `40px` |
| `--ds-tree-indent` | `20px` |

### 크기와 여백

```
size: medium(기본) 줄 40, t04 / small 줄 32, t03 / 줄 좌우 x2, 모서리 shape/sm, 아이콘 18
한 단계 들여쓰기 20(펼침 표시 자리 20, 펼칠 항목이 없는 줄도 자리를 확보) / 이음선 stroke/neutral-muted, data-guides="none" 이면 들여쓰기만
선택 aria-selected 또는 aria-current = bg/neutral-weak-alpha + fg/neutral + Medium (Side Navigation과 같음)
ybm-ds.js: 줄을 누르면 펼치거나 접고 그 항목을 선택합니다(change, detail.value). 위아래 화살표로 이동, 오른쪽 화살표로 펼침, 왼쪽 화살표로 접기
```
