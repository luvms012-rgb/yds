<!-- https://luvms012-rgb.github.io/yds/site/index.html -->

# Get Started

YDS는 다양한 서비스를 일관된 경험으로 만들기 위한 디자인 시스템입니다.

## 구조

1. **YDS**모든 서비스가 함께 쓰는 컴포넌트, 토큰, 규칙입니다.
2. **브랜드**색, 모서리, 글꼴처럼 브랜드마다 달라지는 값만 담은 파일입니다.
3. **서비스**YDS와 브랜드 파일을 불러와 실제 화면을 만듭니다.

## AI와 함께 시작하기

```text
아래 안내서를 읽고 YDS 규칙을 지켜 줘.
https://luvms012-rgb.github.io/yds/site/yds.txt

예시)
[새 화면 만들기]
- 카드 제휴 이벤트 페이지 만들어 줘.
  혜택 배너, 카드 혜택 3가지, 유의사항, '카드 신청하기' 버튼 순서로.
- 로그인 후 동의 화면 만들어 줘.
  필수 동의 3개(이용약관, 개인정보처리방침, 광고 문자 안내),
  전체 동의 체크, 본인인증 버튼까지.

[운영 중인 페이지에 적용하기]
- 이 이벤트 페이지의 버튼, 글꼴, 색을 YDS로 바꿔 줘.
  배치와 문구는 그대로 둬.
- 첨부한 시험 접수 화면에 YDS 적용해 줘.
  입력 폼과 버튼만 바꾸고, 바꾼 부분을 알려 줘.
```

## Figma로 시작하기

1. **라이브러리 켜기**Figma의 Assets 패널에서 [YDS 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=3059-92)를 켭니다.
2. **화면 그리기**컴포넌트와 색, 간격, 글자 등을 직접 넣지 않고 YDS에 있는 값에서 선택해서 사용합니다.

Assets에 YDS 라이브러리가 보이지 않으면 [의견 보내기](https://docs.google.com/forms/d/e/1FAIpQLSeQdOrHp59nlOmnzLJwr6HXsU-WaTRdJwTna6gqzK3xP8sYuA/viewform)로 팀 초대를 요청하세요.

## 개발 시작하기

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
| [yds.txt](https://luvms012-rgb.github.io/yds/site/yds.txt) | YDS 안내서 | AI 요청 글에 주소를 넣을 때 |
| [Figma 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=3059-92) | YDS 컴포넌트와 변수가 담긴 Figma 파일 | Figma로 화면을 그릴 때 |
| [yds-full.txt](https://luvms012-rgb.github.io/yds/site/yds-full.txt) | 컴포넌트 사용법과 규칙을 모은 파일 하나 | 주소를 열 수 없는 대화창에 첨부할 때 |
| [CLAUDE.md](https://luvms012-rgb.github.io/yds/site/ai/CLAUDE.md)[yds.mdc](https://luvms012-rgb.github.io/yds/site/ai/yds.mdc)[AGENTS.md](https://luvms012-rgb.github.io/yds/site/ai/AGENTS.md) | 코딩 도구용 YDS 규칙 파일 | 프로젝트 맨 위 폴더에 두면 도구가 늘 YDS 규칙을 지킵니다 |
| [yds-check.mjs](https://luvms012-rgb.github.io/yds/site/ai/yds-check.mjs) | YDS 규칙 검사 스크립트 | 다 만든 화면을 점검할 때 |
| [brands](https://github.com/luvms012-rgb/yds/tree/main/brands) | 등록된 브랜드 파일 | 내 브랜드 값을 확인할 때 |
