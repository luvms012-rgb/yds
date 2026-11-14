<!-- https://luvms012-rgb.github.io/yds/site/index.html -->

# Get Started

YDS는 다양한 서비스를 일관된 경험으로 만들기 위한 디자인 시스템입니다.

## 구조

1. **YDS**모든 서비스가 함께 쓰는 컴포넌트, 토큰, 규칙입니다.
2. **브랜드**색, 모서리, 글꼴처럼 브랜드마다 달라지는 값만 담은 파일입니다.
3. **서비스**YDS와 브랜드 파일을 불러와 실제 화면을 만듭니다.

## AI와 함께 시작하기

```text
[새 화면 만들기]

아래 안내서를 읽고 YDS 규칙을 지켜 줘.
https://luvms012-rgb.github.io/yds/site/yds.txt

[만들고 싶은 화면]을 만들어 줘. 비슷한 템플릿이 있으면 출발점으로 써 줘.

정해지지 않은 것은 먼저 물어보고, 첫 결과를 보여 준 뒤 계속해 줘.
```

```text
[운영 중인 페이지에 적용하기]

아래 안내서를 읽고 YDS 규칙을 지켜 줘.
https://luvms012-rgb.github.io/yds/site/yds.txt

[바꿀 화면의 주소나 첨부 파일]에 YDS를 적용해 줘. [바꿀 부분]만 바꾸고 나머지는 그대로 둬.

정해지지 않은 것은 먼저 물어보고, 첫 결과를 보여 준 뒤 계속해 줘.
```

```text
[브랜드 만들기]

아래 안내서를 읽고 YDS 규칙을 지켜 줘.
https://luvms012-rgb.github.io/yds/site/yds.txt

[브랜드 이름] 브랜드를 만들어 줘. 대표색은 [색], 모서리와 글꼴은 [원하는 느낌]으로.

정해지지 않은 것은 먼저 물어보고, 첫 결과를 보여 준 뒤 계속해 줘.
```

## Figma로 시작하기

1. **라이브러리 켜기**Figma의 Assets 패널에서 [YDS 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=3059-92)를 켭니다.
2. **화면 그리기**컴포넌트와 색, 간격, 글자 등을 직접 넣지 않고 YDS에 있는 값에서 선택해서 사용합니다.

Assets에 YDS 라이브러리가 보이지 않으면 [의견 보내기](https://docs.google.com/forms/d/e/1FAIpQLSeQdOrHp59nlOmnzLJwr6HXsU-WaTRdJwTna6gqzK3xP8sYuA/viewform)로 팀 초대를 요청하세요.

## 개발 시작하기

**최신**

```html
<!-- 서비스 CSS보다 앞에 -->
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/yds/dist/ybm-ds.js" defer></script>
<!-- 브랜드가 있으면 그다음에, <html data-ds-brand="toeic"> -->
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/brands/toeic.css">
```

**v1.1.0 고정**

```html
<!-- 서비스 CSS보다 앞에 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v1.1.0/dist/ybm-ds.css">
<script src="https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v1.1.0/dist/ybm-ds.js" defer></script>
<!-- 브랜드가 있으면 그다음에, <html data-ds-brand="toeic"> -->
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/brands/toeic.css">
```

**규칙 파일**

```bash
# 프로젝트 맨 위 폴더에서 (코딩 도구가 YDS 규칙을 읽는다)
curl -O https://luvms012-rgb.github.io/yds/site/ai/AGENTS.md
curl -O https://luvms012-rgb.github.io/yds/site/ai/CLAUDE.md
curl --create-dirs -o .cursor/rules/yds.mdc https://luvms012-rgb.github.io/yds/site/ai/yds.mdc
```

## 파일

| 파일 | 무엇인가요 | 언제 쓰나요 |
| --- | --- | --- |
| [yds.txt](https://luvms012-rgb.github.io/yds/site/yds.txt) | YDS 안내서 | 가장 기본이고 중요한 파일입니다. 잘 모르면 AI 요청 글에 이 주소를 꼭 넣으세요. |
| [Figma 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=3059-92) | YDS 컴포넌트와 변수가 담긴 Figma 파일 | Figma로 화면을 그릴 때 켭니다. 디자이너는 이것 하나면 됩니다. |
| [yds-full.txt](https://luvms012-rgb.github.io/yds/site/yds-full.txt) | 컴포넌트 사용법과 규칙을 모은 파일 하나 | AI가 주소를 열지 못할 때 yds.txt 대신 이 파일을 첨부합니다. 내용은 더 자세합니다. |
| [CLAUDE.md](https://luvms012-rgb.github.io/yds/site/ai/CLAUDE.md)[yds.mdc](https://luvms012-rgb.github.io/yds/site/ai/yds.mdc)[AGENTS.md](https://luvms012-rgb.github.io/yds/site/ai/AGENTS.md) | 코딩 도구용 YDS 규칙 파일 | 코딩 도구로 개발할 때 프로젝트 맨 위 폴더에 둡니다. 한 번 두면 요청 글마다 안내서 주소를 넣지 않아도 됩니다. |
| [yds-check.mjs](https://luvms012-rgb.github.io/yds/site/ai/yds-check.mjs) | YDS 규칙 검사 스크립트 | 화면을 다 만든 뒤 한 번 돌립니다. YDS에 없는 색이나 클래스를 썼는지 찾아 줍니다. |
| [brands](https://github.com/luvms012-rgb/yds/tree/main/brands) | 등록된 브랜드 파일 | 내 서비스에 브랜드가 있는지, 색과 모서리 값이 무엇인지 볼 때 엽니다. 없으면 AI 요청 글의 [브랜드 만들기]로 시작합니다. |
