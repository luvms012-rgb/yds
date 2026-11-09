<!-- https://luvms012-rgb.github.io/yds/site/index.html -->

# Get Started

yds는 디자이너, 개발자, AI가 같은 이름으로 같은 화면을 만들게 돕는 디자인 시스템입니다.

## 시작하기

### 내 사이트에 넣기

**AI 요청**

```text
지금 운영 중인 이 사이트에 yds 디자인 시스템을 입히고 싶어.
먼저 아래 문서를 읽고 yds 규칙을 익혀 줘.
문서: https://luvms012-rgb.github.io/yds/site/llms.txt

운영 중인 사이트라서 한 번에 바꾸지 말고, 사이트를 먼저 살펴본 뒤 어떤 순서로 바꿀지 알려 줘.
화면은 하나씩 바꾸고, 바꿀 때마다 전후 화면을 보여 주면 내가 확인할게.
원래 되던 기능은 그대로 동작해야 하고, 애매한 부분은 혼자 정하지 말고 물어봐 줘.
```

**HTML v1.1.0**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v1.1.0/dist/ybm-ds.css">
<script src="https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v1.1.0/dist/ybm-ds.js" defer></script>
```

### 새 프로젝트

**AI 요청**

```text
새 프로젝트를 yds 디자인 시스템으로 시작하려고 해.
먼저 아래 문서를 읽고 yds 규칙을 익혀 줘.
문서: https://luvms012-rgb.github.io/yds/site/llms.txt

브랜드 컬러: [#12a150]
첫 화면: [회원 목록]

yds에 있는 컴포넌트와 토큰만으로 만들고, 비슷한 화면이 Templates에 있으면 거기서 시작해 줘.
다 만들면 규칙을 지켰는지 점검하고, 고친 곳을 알려 줘.
```

**HTML**

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/yds/dist/ybm-ds.js" defer></script>

<!-- 다크 모드 -->
<html lang="ko" data-theme="dark">

<!-- 기기 설정을 따를 때: <head> 맨 위 -->
<script>
  if (matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.dataset.theme = 'dark';
</script>
```

### 화면 시안

**AI 요청**

```text
첨부한 llms-full.txt는 yds 디자인 시스템 문서야. 먼저 읽고 익혀 줘.

이 디자인 시스템으로 화면 시안을 만들고 싶어.
만들 화면: [이벤트 신청 페이지]
들어갈 내용: [제목, 기간, 안내 글, 신청 버튼]

yds에 있는 부품과 색만 써서, 브라우저에서 바로 열어 볼 수 있는 HTML 파일 하나로 만들어 줘.
정할 것이 있으면 만들기 전에 물어봐 줘.
```

llms-full.txt 받기

## 둘러보기

- [Foundations](https://luvms012-rgb.github.io/yds/site/foundations/color.md): 색, 글자, 간격, 모서리, 그림자, 움직임처럼 화면의 바탕이 되는 토큰입니다.

- [Components](https://luvms012-rgb.github.io/yds/site/components/index.md): 버튼, 입력칸, 목록처럼 화면을 이루는 부품입니다.

- [Templates](https://luvms012-rgb.github.io/yds/site/templates/index.html): 자주 만드는 화면을 부품으로 미리 조립해 둔 예시입니다.

## 파일

| 파일 | 무엇인가요 | 언제 쓰나요 |
| --- | --- | --- |
| [llms.txt](https://luvms012-rgb.github.io/yds/site/llms.txt) | AI용 yds 안내서 | AI에 yds를 알려 줄 때 |
| [llms-full.txt](https://luvms012-rgb.github.io/yds/site/llms-full.txt) | yds 문서 전체를 모은 파일 하나 | 주소를 열지 못하는 AI 대화창에 첨부할 때 |
| [AGENTS.md](https://luvms012-rgb.github.io/yds/site/ai/AGENTS.md) / [CLAUDE.md](https://luvms012-rgb.github.io/yds/site/ai/CLAUDE.md) / [yds.mdc](https://luvms012-rgb.github.io/yds/site/ai/yds.mdc) | AI 코딩 도구용 yds 규칙 파일 | AI 코딩 도구가 늘 yds 규칙을 지키게 할 때 |
| [yds-check.mjs](https://luvms012-rgb.github.io/yds/site/ai/yds-check.mjs) | yds 규칙 검사 스크립트 | 다 만든 화면을 점검할 때 |
| [Figma 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2608-2) | yds 컴포넌트와 변수가 든 Figma 파일 | Figma로 화면을 그릴 때 |
