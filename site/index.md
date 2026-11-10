<!-- https://luvms012-rgb.github.io/yds/site/index.html -->

# Get Started

YDS는 다양한 서비스를 일관된 경험으로 만들기 위한 디자인 시스템입니다.

## 구조

서비스 화면은 YDS에 브랜드 값을 더해 만들어집니다.

1. **YDS**모든 서비스가 함께 쓰는 컴포넌트, 토큰, 규칙입니다.
2. **브랜드**색, 모서리, 글꼴처럼 브랜드마다 달라지는 값만 담은 파일입니다.
3. **서비스**YDS와 브랜드 파일을 불러와 실제 화면을 만듭니다.

## AI와 함께 시작하기

AI 코딩 도구에 YDS 안내서를 알려 주면 설치부터 컴포넌트 사용까지 안내서를 따라 진행합니다.

```text
아래 안내서를 읽고 YDS 규칙을 지켜 줘.
https://luvms012-rgb.github.io/yds/site/yds.txt

예시)
- 이벤트 신청 화면 만들어 줘
- 운영 중인 사이트에 YDS 적용해 줘
```

## Figma로 시작하기

Figma에서 작업을 시작할 때는 YDS 라이브러리를 사용합니다.

1. **라이브러리 켜기**Figma의 Assets 패널에서 [YDS 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=3059-92)를 켭니다.
2. **화면 그리기**컴포넌트와 색, 간격, 글자 등을 직접 넣지 않고 YDS에 있는 값에서 선택해서 사용합니다.

## 개발 시작하기

<head>에 두 줄을 넣고, 서비스 CSS는 그다음에 불러옵니다. 운영 중인 서비스는 버전을 고정한 주소를 사용합니다.

**최신**

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/yds/dist/ybm-ds.js" defer></script>
```

**v1.1.0 고정**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v1.1.0/dist/ybm-ds.css">
<script src="https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v1.1.0/dist/ybm-ds.js" defer></script>
```

## 파일

| 파일 | 무엇인가요 | 언제 쓰나요 |
| --- | --- | --- |
| [yds.txt](https://luvms012-rgb.github.io/yds/site/yds.txt) | YDS 안내서 | 요청 글에 YDS 주소를 넣을 때 |
| [yds-full.txt](https://luvms012-rgb.github.io/yds/site/yds-full.txt) | 컴포넌트 사용법과 규칙을 모은 파일 하나 | 주소를 열 수 없는 대화창에 첨부할 때 |
| [AGENTS.md](https://luvms012-rgb.github.io/yds/site/ai/AGENTS.md) / [CLAUDE.md](https://luvms012-rgb.github.io/yds/site/ai/CLAUDE.md) / [yds.mdc](https://luvms012-rgb.github.io/yds/site/ai/yds.mdc) | 코딩 도구용 YDS 규칙 파일 | 코딩 도구가 늘 YDS 규칙을 지키게 할 때 |
| [yds-check.mjs](https://luvms012-rgb.github.io/yds/site/ai/yds-check.mjs) | YDS 규칙 검사 스크립트 | 다 만든 화면을 점검할 때 |
| [brands](https://github.com/luvms012-rgb/yds/tree/main/brands) | 등록된 브랜드 파일 | 내 브랜드 값을 확인할 때 |
| [Figma 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=3059-92) | YDS 컴포넌트와 변수가 담긴 Figma 파일 | Figma로 화면을 그릴 때 |
