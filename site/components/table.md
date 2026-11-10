<!-- https://luvms012-rgb.github.io/yds/site/components/table.html -->

# Table

여러 항목을 같은 기준으로 나란히 비교하는 표입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-table-wrap">            ← 열이 넘치면 가로 스크롤
  <table class="ds-table" [data-density="compact"]>
    <thead><tr><th scope="col">선택</th><th scope="col">제목</th><th scope="col" data-align="end">금액</th></tr></thead>
    <tbody>
      <tr class="ds-table__group"><td colspan="3">묶음 이름</td></tr>        ← 묶음 행(선택)
      <tr [aria-selected="true"] [data-interactive]>
        <td><label class="ds-checkbox">…</label></td>                         ← 체크박스만 든 칸은 폭 52 고정
        <td><span class="ds-table__stack"><span>제목</span><span>보조 글</span></span></td>  ← 두 줄 칸
        <td data-align="end">10,000원</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Group** `ds-table__group` | 관련 항목을 묶는 영역입니다. |
| **Stack** `ds-table__stack` | 여러 줄을 쌓아 표시하는 영역입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `density` | compact |
| 켜고 끄는 속성 | `align` |

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 열은 모바일에서 3개, PC에서 6개 안팎까지 둡니다. 넘치면 가로 스크롤을 제공합니다. 모바일에서 열이 많으면 표 대신 Card 목록을 사용합니다. |
| **Do** | 표에는 꼭 헤더 행을 둡니다(thead와 th scope="col"). |
| **Do** | 데이터가 없을 때는 헤더 행 아래에 Empty(small)를 표 전체 폭으로 표시합니다. |
| **Do** | 마우스를 올렸을 때 색이 바뀌는 효과는 행을 눌러 상세 화면으로 이동하는 표에서만 사용합니다. |
| **Do** | 글은 왼쪽, 숫자와 금액은 오른쪽에 맞춥니다. 번호, 날짜, 상태처럼 짧고 길이가 같은 값은 가운데에 맞춥니다. |
| **Don't** | 한 표 안에서 density를 섞지 않습니다. 데이터가 많은 관리 화면은 compact, 일반 사용자 화면은 default를 사용합니다. |
| **Don't** | 한 칸에 두 줄 넘게 넣지 않습니다. 긴 글은 말줄임하고 상세 화면에서 표시합니다. |

## 예시

### 상세로 이동하는 문의 내역

행을 누르면 상세 화면으로 이동하는 표이므로 `data-interactive`로 마우스를 올린 행을 표시합니다. 번호, 상태, 날짜는 가운데 정렬, 제목은 왼쪽 정렬합니다.

```html
<div class="ds-table-wrap">
  <table class="ds-table">
    <thead>
      <tr>
        <th scope="col" data-align="center" style="width: 72px">번호</th>
        <th scope="col">제목</th>
        <th scope="col" data-align="center" style="width: 112px">상태</th>
        <th scope="col" data-align="center" style="width: 120px">문의일</th>
      </tr>
    </thead>
    <tbody>
      <tr data-interactive>
        <td data-align="center">3</td>
        <td>환불 받을 계좌를 바꾸고 싶어요</td>
        <td data-align="center"><span class="ds-badge" data-tone="warning">답변 대기</span></td>
        <td data-align="center">2026.11.03</td>
      </tr>
      <tr data-interactive>
        <td data-align="center">2</td>
        <td>수강 기간을 늘릴 수 있나요</td>
        <td data-align="center">답변 완료</td>
        <td data-align="center">2026.10.28</td>
      </tr>
      <tr data-interactive>
        <td data-align="center">1</td>
        <td>영수증을 다시 받고 싶어요</td>
        <td data-align="center">답변 완료</td>
        <td data-align="center">2026.10.15</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 금액은 오른쪽 정렬

금액 열을 오른쪽 정렬해 자릿수를 한눈에 비교할 수 있게 합니다. 두 줄 셀에는 이름과 보조 텍스트까지만 넣고, 더 긴 내용은 상세 화면에서 표시합니다.

```html
<div class="ds-table-wrap">
  <table class="ds-table">
    <thead>
      <tr>
        <th scope="col" data-align="center" style="width: 120px">결제일</th>
        <th scope="col">내용</th>
        <th scope="col" style="width: 120px">결제 수단</th>
        <th scope="col" data-align="end" style="width: 120px">금액</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-align="center">2026.11.02</td>
        <td><span class="ds-table__stack"><span>비즈니스 영어 회화</span><span>수강권 3개월</span></span></td>
        <td>신용카드</td>
        <td data-align="end">89,000원</td>
      </tr>
      <tr>
        <td data-align="center">2026.10.20</td>
        <td><span class="ds-table__stack"><span>엑셀 실무 완성</span><span>단과 강의</span></span></td>
        <td>포인트</td>
        <td data-align="end">45,000원</td>
      </tr>
      <tr>
        <td data-align="center">2026.10.05</td>
        <td><span class="ds-table__stack"><span>기초 회계 원리</span><span>패키지 2개</span></span></td>
        <td>계좌 이체</td>
        <td data-align="end">120,000원</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 결과가 없을 때 헤더 아래 Empty 표시

결과가 없으면 헤더 행은 그대로 두고 그 아래에 Empty(small)를 표 전체 폭으로 배치합니다. 어떤 열을 찾고 있었는지 남아 있어 조건을 바꿔 다시 찾기 쉽습니다.

```html
<div class="ds-table-wrap">
  <table class="ds-table">
    <thead>
      <tr>
        <th scope="col" data-align="center" style="width: 72px">번호</th>
        <th scope="col">제목</th>
        <th scope="col" data-align="center" style="width: 112px">상태</th>
        <th scope="col" data-align="center" style="width: 120px">문의일</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="4">
          <div class="ds-empty" data-size="small">
            <span class="ds-empty__media"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></span>
            <p class="ds-empty__title">찾는 문의가 없어요</p>
            <p class="ds-empty__desc">기간을 늘리거나 다른 검색어로 찾아보세요.</p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

## 규격

### CSS 변수

서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.

| 변수 | 기본값 |
| --- | --- |
| `--ds-table-head-h` | `40px` |
| `--ds-table-row-h` | `56px` |
| `--ds-table-line` | `var(--ds-color-stroke-neutral-muted)` |

### 크기와 여백

```
density: default(기본) / compact
2026-11-03 개편(템플릿 표 기준과 같게), 2026-11-10 위 선도 옅은 선으로: 위 옅은 선 + 머리줄 바탕 없음 + 행 사이 옅은 선
Figma: 표 위 1px stroke/neutral-muted / 칸 아래 1px stroke/neutral-muted / header 바탕 없음
  높이 header 40 / body 56 (compact 40 / 48) / 칸 좌우 x3, 양 끝 칸 x4 / 한 줄 말줄임
  header t04 Medium fg/neutral / body t04 fg/neutral / 두 줄 칸 아래 줄 t02 fg/neutral-subtle
  묶음 행 44 bg/neutral-weak-alpha + SemiBold / hover(data-interactive 행만) bg/neutral-weak-alpha / selected bg/brand-weak
  정렬: 글 start(기본) / 숫자 end / 짧은 고정 길이 값(번호/날짜/상태) center → data-align (right 는 end 와 같음)
  선은 칸의 border로 그립니다(행 그림자는 칸에 바탕을 넣으면 가려지고, 표 양 끝에 세로 선이 생깁니다)
  Card 안에 넣으면 카드 테두리가 틀이 되므로 위 선과 마지막 줄 선을 표시하지 않습니다 (2026-11-03)
```
