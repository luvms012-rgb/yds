<!-- https://design.ybmnet.co.kr/yds/components/breadcrumbs.html -->

# Breadcrumbs

현재 화면의 위치를 경로로 표시하는 컴포넌트입니다.

## 사용법

구조를 복사해 사용합니다. 대괄호 `[ ]` 부분은 선택 항목입니다.

```html
<nav class="ds-breadcrumbs" aria-label="현재 위치">
  <ol>
    <li><a href="#">홈</a></li>
    <li><a href="#">고객센터</a></li>
    <li><span aria-current="page">공지사항</span></li>
  </ol>
</nav>
```

## 속성

그 밖에: 현재 항목 aria-current=page

## 사용 지침

- Do: 웹 화면에서 깊이가 2단계 이상일 때만 사용합니다.
- Do: 모바일 앱에서는 뒤로 가기 버튼이 있는 헤더를 사용합니다.
- Do: 페이지 제목 위에 배치합니다.
- Do: 항목 이름은 해당 페이지 제목과 같게 작성합니다.
- Don't: 마지막 항목(현재 화면)은 링크로 만들지 않습니다.
- Don't: 5단계를 넘기지 않습니다.

## 예시

### 공지 글의 현재 위치 표시

웹에서 두 단계 넘게 들어간 화면은 제목 위에 Breadcrumbs를 배치해 현재 위치를 표시합니다. 마지막 항목은 현재 화면이므로 링크로 만들지 않습니다.

```html
<div class="u-col u-gap-3">
  <nav class="ds-breadcrumbs" aria-label="현재 위치">
    <ol>
      <li><a href="#">홈</a></li>
      <li><a href="#">고객센터</a></li>
      <li><a href="#">공지사항</a></li>
      <li><span aria-current="page">연말 휴강 일정 안내</span></li>
    </ol>
  </nav>
  <h1 class="ds-t11 ds-fw-bold">연말 휴강 일정 안내</h1>
  <span class="ds-tag-group"><span>운영팀</span><span>2026.12.01</span><span>조회 1,204</span></span>
</div>
```

## 규격

### 크기와 여백

```text
Figma: t03 / 항목 fg/neutral-subtle(링크 hover 밑줄) / 현재 fg/neutral Medium / 구분 chevron-right 14 fg/neutral-subtle
       항목/구분 사이 x1 / 줄바꿈 허용(좁으면 다음 줄)
마지막 항목(현재 화면)에는 링크를 걸지 않습니다. 모바일 앱 화면에는 사용하지 않습니다(뒤로 가기 헤더 사용).
```
