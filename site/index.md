<!-- https://design.ybmnet.co.kr/yds/site/index.html -->

# Get Started

YDS(YBM Design System)는 다양한 서비스를 일관된 경험으로 만들기 위한 디자인 시스템입니다.

## 구조

1. **YDS**모든 서비스가 함께 쓰는 컴포넌트, 토큰, 규칙입니다.
2. **브랜드**색, 모서리, 글꼴처럼 모양만 바꾸는 값을 담은 파일입니다.
3. **서비스**YDS에 브랜드를 더해 실제 화면을 만듭니다.

## AI로 빠르게 시작하기

아래처럼 자유롭게 적고 AI 도구에 붙여 넣으세요.

수강 신청 화면을 새로 만들려고 해. 강의를 고르고 신청까지 한 번에 할 수 있으면 좋겠어. YDS 템플릿에 비슷한 화면이 있으면 참고해서 YDS 컴포넌트로 만들어 줘. YDS 쓰는 법은 아래 파일에 있어. https://design.ybmnet.co.kr/yds/site/yds.txt

## Figma로 시작하기

YDS 라이브러리를 켜고 컴포넌트를 골라 화면을 만드세요.

1. **YDS 라이브러리로 디자인하기**Figma의 Assets 패널에서 [YDS 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=3059-92)를 켜고, 컴포넌트와 색, 간격, 글자는 YDS에 있는 값에서 골라 사용합니다.

Assets에 YDS 라이브러리가 보이지 않으면 사내 [워크 게시판](https://yteam.ybmnet.co.kr/work/dashboard.php)에 권한을 요청하세요.

## 개발 시작하기

아래 코드를 <head>에 넣으면 YDS가 바로 적용됩니다.

```html
<!-- 서비스 CSS보다 앞에 -->
<link rel="stylesheet" href="https://design.ybmnet.co.kr/yds/v1.2.0/dist/ybm-ds.css">
<script src="https://design.ybmnet.co.kr/yds/v1.2.0/dist/ybm-ds.js" defer></script>
<!-- 브랜드가 있으면 그다음에, <html data-ds-brand="my-brand"> -->
<link rel="stylesheet" href="https://design.ybmnet.co.kr/yds/v1.2.0/dist/brands/my-brand.css">
```

```html
<!-- 서비스 CSS보다 앞에 -->
<link rel="stylesheet" href="https://design.ybmnet.co.kr/yds/dist/ybm-ds.css">
<script src="https://design.ybmnet.co.kr/yds/dist/ybm-ds.js" defer></script>
<!-- 브랜드가 있으면 그다음에, <html data-ds-brand="my-brand"> -->
<link rel="stylesheet" href="https://design.ybmnet.co.kr/yds/dist/brands/my-brand.css">
```

```bash
# 프로젝트 맨 위 폴더에서 (코딩 도구가 YDS 규칙을 읽는다)
curl -O https://design.ybmnet.co.kr/yds/site/ai/AGENTS.md
curl -O https://design.ybmnet.co.kr/yds/site/ai/CLAUDE.md
curl --create-dirs -o .cursor/rules/yds.mdc https://design.ybmnet.co.kr/yds/site/ai/yds.mdc
```

## 파일

| 파일 | 무엇인가요 | 언제 쓰나요 |
| --- | --- | --- |
| [yds.txt](yds.txt) | AI가 읽는 YDS 설명 파일 | AI에게 화면을 부탁할 때 요청 글에 이 주소를 함께 넣어 주세요. |
| [Figma 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=3059-92) | YDS 컴포넌트와 변수가 담긴 Figma 파일 | Figma에서 화면을 디자인할 때 라이브러리로 켜 주세요. |
| [yds-full.txt](yds-full.txt) | 컴포넌트 사용법과 규칙을 모은 파일 하나 | AI가 주소를 열지 못하면 yds.txt 대신 이 파일을 첨부해 주세요. |
| [CLAUDE.md](ai/CLAUDE.md)[yds.mdc](ai/yds.mdc)[AGENTS.md](ai/AGENTS.md) | 코딩 도구용 YDS 규칙 파일 | 코딩 도구를 쓸 때 프로젝트 맨 위 폴더에 넣어 두세요. 요청할 때마다 yds.txt 주소를 넣지 않아도 됩니다. |
| [yds-check.mjs](ai/yds-check.mjs) | YDS 규칙 검사 스크립트 | 화면을 다 만든 뒤 한 번 실행해 보세요. YDS에 없는 색이나 클래스를 썼는지 찾아 줍니다. |
