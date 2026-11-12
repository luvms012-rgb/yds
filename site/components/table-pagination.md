<!-- https://luvms012-rgb.github.io/yds/site/components/table-pagination.html -->

# Table Pagination

표 아래에서 페이지를 이동하고 한 번에 표시할 행 수를 바꾸는 컴포넌트입니다.

## 사용법

아래 구조를 복사해 사용합니다. 대괄호 `[ ]`로 묶인 부분은 크기나 설명 글처럼 생략할 수 있는 선택 항목입니다. 사용할 때는 대괄호만 지우고, 사용하지 않을 때는 대괄호를 포함해 해당 부분을 모두 지우세요.

```html
<div class="ds-tablepagination">
  <label class="ds-tablepagination__size">
    <span class="ds-tablepagination__label">페이지당 행 수</span>
    <span class="ds-tablepagination__select"><select><option>10개</option><option>25개</option><option>50개</option></select></span>
  </label>
  <div class="ds-tablepagination__range">
    <span class="ds-tablepagination__position">
      <span class="ds-tablepagination__select"><select aria-label="표시 범위"><option>1-10</option>…</select></span>
      (unknownTotal 은 select 대신 <span class="ds-tablepagination__current">11-20</span>)
      [<span class="ds-tablepagination__total">/ 총 237개</span>]
    </span>
    <nav class="ds-pagination" aria-label="표 페이지">
      <a class="ds-pagination__item" data-type="prev" href="#" aria-label="이전 페이지"></a>
      <a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a>
    </nav>
  </div>
</div>
```

## 구조

| 구성 요소 | 설명 |
| --- | --- |
| **Size** `ds-tablepagination__size` | 한 번에 볼 개수를 선택하는 영역입니다. |
| **Label** `ds-tablepagination__label` | 개수 선택 앞에 붙는 텍스트입니다. |
| **Select** `ds-tablepagination__select` | 한 번에 볼 개수를 선택하는 Select입니다. |
| **Range** `ds-tablepagination__range` | 현재 보고 있는 항목 범위입니다. |
| **Position** `ds-tablepagination__position` | 현재 보고 있는 범위입니다. |
| **Current** `ds-tablepagination__current` | 현재 페이지 번호입니다. |
| **Total** `ds-tablepagination__total` | 전체 개수입니다. |
| **Item** `ds-pagination__item` | 페이지 이동 버튼입니다. |

## 속성

Figma 속성 이름을 그대로 `data-*` 속성으로 사용합니다.

| 속성 | 값 |
| --- | --- |
| `state` | default unknownTotal empty |

그 밖에: 최소 폭 640

## 사용 지침

| 구분 | 내용 |
| --- | --- |
| **Do** | 데이터 표 아래에서만 사용합니다. |
| **Do** | 일반 목록에는 Pagination을 사용합니다. |
| **Do** | 페이지당 행 수 선택지는 3~4개로 제공합니다. |

## Pagination과 비교

Table Pagination은 데이터 표 전용입니다. 검색 결과나 게시판 목록처럼 내용을 넘겨 보는 화면에서는 Pagination을 사용하고, 한 화면에서 두 컴포넌트를 섞어 쓰지 않습니다.

| 항목 | Table Pagination | Pagination |
| --- | --- | --- |
| 사용 맥락 | 데이터 표 | 검색 결과, 게시판, 콘텐츠 목록 |
| 핵심 컨트롤 | 페이지당 행 수 + 표시 범위 선택 | 페이지 번호 + 이전, 다음 버튼 |
| 현재 위치 표시 | 표시 범위 선택(예: 11-20) | 선택된 페이지 번호 |
| 페이지 이동 | 표시 범위를 선택하거나 이전, 다음 버튼 | 페이지 번호를 누르거나 이전, 다음 버튼 |
| 처음과 끝에서 이전, 다음 버튼 | 비활성화 | 비활성화 |

## 예시

### 관리 표 아래에서 페이지와 행 수 선택

데이터 표 바로 아래에 배치해 페이지와 페이지당 행 수를 함께 바꿉니다. 행 수 선택지는 3가지로 제공하고, 표와 같은 가로 스크롤 영역 안에 넣어 함께 스크롤되게 합니다.

```html
<div class="ds-table-wrap">
  <table class="ds-table" data-size="small">
    <thead>
      <tr>
        <th scope="col" style="width: 120px">이름</th>
        <th scope="col">이메일</th>
        <th scope="col" data-align="center" style="width: 120px">가입일</th>
        <th scope="col" data-align="end" style="width: 104px">수강 강의</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>김하늘</td>
        <td>sky@example.com</td>
        <td data-align="center">2026.11.03</td>
        <td data-align="end">3개</td>
      </tr>
      <tr>
        <td>이준호</td>
        <td>junho@example.com</td>
        <td data-align="center">2026.11.02</td>
        <td data-align="end">1개</td>
      </tr>
      <tr>
        <td>박서연</td>
        <td>seoyeon@example.com</td>
        <td data-align="center">2026.11.01</td>
        <td data-align="end">5개</td>
      </tr>
      <tr>
        <td>최민재</td>
        <td>minjae@example.com</td>
        <td data-align="center">2026.10.31</td>
        <td data-align="end">2개</td>
      </tr>
      <tr>
        <td>정다은</td>
        <td>daeun@example.com</td>
        <td data-align="center">2026.10.30</td>
        <td data-align="end">4개</td>
      </tr>
    </tbody>
  </table>
  <div class="ds-tablepagination">
    <label class="ds-tablepagination__size">
      <span class="ds-tablepagination__label">페이지당 행 수</span>
      <span class="ds-tablepagination__select"><select><option selected>5개</option><option>10개</option><option>20개</option></select></span>
    </label>
    <div class="ds-tablepagination__range">
      <span class="ds-tablepagination__position">
        <span class="ds-tablepagination__select"><select aria-label="표시 범위"><option selected>1-5</option><option>6-10</option><option>11-15</option></select></span>
        <span class="ds-tablepagination__total">/ 총 48명</span>
      </span>
      <nav class="ds-pagination" aria-label="표 페이지">
        <a class="ds-pagination__item" data-type="prev" aria-disabled="true" aria-label="이전 페이지"></a>
        <a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a>
      </nav>
    </div>
  </div>
</div>
```

### 전체 개수를 모를 때 범위만 표시

전체 개수를 미리 셀 수 없는 기록 표에서는 현재 보이는 범위만 글자로 표시합니다. 총 개수 대신 다음 버튼으로 이어서 봅니다.

```html
<div class="ds-table-wrap">
  <table class="ds-table" data-size="small">
    <thead>
      <tr>
        <th scope="col" data-align="center" style="width: 128px">시각</th>
        <th scope="col">한 일</th>
        <th scope="col" style="width: 120px">담당자</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-align="center">11.04 10:42</td>
        <td>강의 "엑셀 실무 완성" 공개</td>
        <td>김하늘</td>
      </tr>
      <tr>
        <td data-align="center">11.04 10:15</td>
        <td>공지 "11월 휴강 안내" 수정</td>
        <td>이준호</td>
      </tr>
      <tr>
        <td data-align="center">11.04 09:58</td>
        <td>쿠폰 "신규 회원 10%" 발급</td>
        <td>박서연</td>
      </tr>
      <tr>
        <td data-align="center">11.03 18:20</td>
        <td>회원 3명 수강 기간 연장</td>
        <td>김하늘</td>
      </tr>
      <tr>
        <td data-align="center">11.03 17:05</td>
        <td>강의 "기초 회계 원리" 가격 변경</td>
        <td>이준호</td>
      </tr>
    </tbody>
  </table>
  <div class="ds-tablepagination">
    <label class="ds-tablepagination__size">
      <span class="ds-tablepagination__label">페이지당 행 수</span>
      <span class="ds-tablepagination__select"><select><option selected>5개</option><option>10개</option><option>20개</option></select></span>
    </label>
    <div class="ds-tablepagination__range">
      <span class="ds-tablepagination__position"><span class="ds-tablepagination__current">6-10</span></span>
      <nav class="ds-pagination" aria-label="표 페이지">
        <a class="ds-pagination__item" data-type="prev" href="#" aria-label="이전 페이지"></a>
        <a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a>
      </nav>
    </div>
  </div>
</div>
```

## 규격

### 크기와 여백

```
state: default / unknownTotal(전체 개수를 모를 때) / empty(데이터 없음)
empty: 범위 select 에 disabled, 이동 버튼에 aria-disabled="true"
Figma: 최소 폭 640 / padding x2 x4 / 양 끝 정렬 / 한 줄 고정(좁으면 표와 같은 가로 스크롤 영역에 배치)
  label, total t04 fg/neutral-subtle / select h36 padding 0 8 0 12 gap x1 shape/sm bg/layer-default 1px stroke/neutral-weak
  값 t04 Medium fg/neutral / chevron 16 / disabled bg/disabled fg/disabled / 이동 버튼은 Pagination Item(prev, next)
일반 목록의 페이지 이동에는 Pagination을 사용합니다.
```
