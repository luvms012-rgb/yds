<!-- https://luvms012-rgb.github.io/yds/site/index.html -->

# Get Started

yds는 여러 서비스를 일관된 경험으로 만들기 위한 디자인 시스템입니다. 컴포넌트와 규칙은 함께 쓰고, 색과 모서리, 글꼴만 브랜드에 맞게 바꿉니다.

## 구조

서비스 화면은 yds 위에 브랜드 값을 더해 만들어집니다.

1. **yds**모든 서비스가 함께 쓰는 컴포넌트, 토큰, 규칙입니다.
2. **브랜드**색, 모서리, 글꼴처럼 브랜드마다 달라지는 값만 담은 파일입니다.
3. **서비스**yds와 브랜드 파일을 불러와 실제 화면을 만듭니다.

## 서비스 시작하기

상황을 선택하고 요청 글에 브랜드 값을 채워 AI에 붙여 넣으세요. 브랜드 파일이 아직 없으면 AI가 함께 만듭니다.

### 운영 중인 사이트

**AI 요청**

```text
운영 중인 이 사이트를 yds 디자인 시스템 기반의 우리 브랜드로 바꾸고 싶어.
먼저 아래 문서를 읽고 yds 규칙을 익혀 줘.
문서: https://luvms012-rgb.github.io/yds/site/yds.txt

브랜드 이름: [my-brand]
브랜드 컬러: [#0f7a3f]
모서리: [yds 그대로]
글꼴: [yds 그대로]

브랜드 파일이 아직 없으면 yds와 다른 값만 담아 먼저 만들고, 글자 대비가 모자라면 고칠 색을 제안해 줘.
운영 중인 사이트라서 한 번에 바꾸지 말고, 사이트를 먼저 살펴본 뒤 어떤 순서로 바꿀지 알려 줘.
화면은 하나씩 바꾸고, 바꿀 때마다 전후 화면을 보여 주면 내가 확인할게.
원래 되던 기능은 그대로 동작해야 하고, 애매한 부분은 혼자 정하지 말고 물어봐 줘.
```

**HTML v1.1.0**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v1.1.0/dist/ybm-ds.css">
<script src="https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v1.1.0/dist/ybm-ds.js" defer></script>

<!-- 브랜드: yds 다음에 불러온다 -->
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/brands/my-brand.css">

<!-- <html>에 브랜드 이름을 적는다 -->
<html lang="ko" data-ds-brand="my-brand">
```

### 새 서비스

**AI 요청**

```text
yds 디자인 시스템 기반으로 우리 브랜드의 새 서비스를 시작하려고 해.
먼저 아래 문서를 읽고 yds 규칙을 익혀 줘.
문서: https://luvms012-rgb.github.io/yds/site/yds.txt

브랜드 이름: [my-brand]
브랜드 컬러: [#0f7a3f]
모서리: [yds 그대로]
글꼴: [yds 그대로]
첫 화면: [회원 목록]

브랜드 파일이 아직 없으면 yds와 다른 값만 담아 먼저 만들고, 글자 대비가 모자라면 고칠 색을 제안해 줘.
yds에 있는 컴포넌트와 토큰만으로 만들고, 비슷한 화면이 Templates에 있으면 거기서 시작해 줘.
다 만들면 규칙을 지켰는지 점검하고, 고친 곳을 알려 줘.
```

**HTML**

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/yds/dist/ybm-ds.js" defer></script>

<!-- 브랜드: yds 다음에 불러온다 -->
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/brands/my-brand.css">

<!-- <html>에 브랜드 이름을 적는다 -->
<html lang="ko" data-ds-brand="my-brand">

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
yds 디자인 시스템 기반으로 우리 브랜드의 화면 시안을 만들고 싶어.
먼저 아래 문서를 읽고 yds 규칙을 익혀 줘.
문서: https://luvms012-rgb.github.io/yds/site/yds-full.txt

브랜드 이름: [my-brand]
브랜드 컬러: [#0f7a3f]
모서리: [yds 그대로]
글꼴: [yds 그대로]
만들 화면: [이벤트 신청 페이지]
들어갈 내용: [제목, 기간, 안내 글, 신청 버튼]

브랜드 파일이 아직 없으면 yds와 다른 값만 담아 먼저 만들고, 글자 대비가 모자라면 고칠 색을 제안해 줘.
yds에 있는 컴포넌트와 토큰만 써서, 브라우저에서 바로 열어 볼 수 있는 HTML 파일 하나로 만들어 줘.
정할 것이 있으면 만들기 전에 물어봐 줘.
```

## Figma로 시작하기

Figma에서 화면을 먼저 그린다면 yds 라이브러리로 시작합니다.

1. **라이브러리 켜기**Figma의 Assets 패널에서 [yds 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2274-1143)를 켭니다.
2. **화면 그리기**yds 컴포넌트를 놓고, 색과 간격은 yds 변수로 지정합니다.
3. **개발에 전달하기**완성한 프레임 주소를 개발자에게 전달합니다. 변수 이름이 코드의 토큰 이름과 같아 그대로 구현할 수 있습니다.

브랜드 색은 Figma에서 바꾸지 않아도 됩니다. 구현할 때 브랜드 값이 적용됩니다.

## 파일

| 파일 | 무엇인가요 | 언제 쓰나요 |
| --- | --- | --- |
| [yds.txt](https://luvms012-rgb.github.io/yds/site/yds.txt) | AI용 yds 안내서 | AI에 yds를 알려 줄 때 |
| [yds-full.txt](https://luvms012-rgb.github.io/yds/site/yds-full.txt) | 컴포넌트 사용법과 규칙을 모은 파일 하나 | 주소를 열지 못하는 AI 대화창에 첨부할 때 |
| [AGENTS.md](https://luvms012-rgb.github.io/yds/site/ai/AGENTS.md) / [CLAUDE.md](https://luvms012-rgb.github.io/yds/site/ai/CLAUDE.md) / [yds.mdc](https://luvms012-rgb.github.io/yds/site/ai/yds.mdc) | AI 코딩 도구용 yds 규칙 파일 | AI 코딩 도구가 늘 yds 규칙을 지키게 할 때 |
| [yds-check.mjs](https://luvms012-rgb.github.io/yds/site/ai/yds-check.mjs) | yds 규칙 검사 스크립트 | 다 만든 화면을 점검할 때 |
| [brands](https://github.com/luvms012-rgb/yds/tree/main/brands) | 등록된 브랜드 파일 | 내 브랜드 값을 확인할 때 |
| [Figma 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2274-1143) | yds 컴포넌트와 변수가 담긴 Figma 파일 | Figma로 화면을 그릴 때 |
