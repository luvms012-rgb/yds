<!-- https://luvms012-rgb.github.io/yds/site/index.html -->

# Get Started

YDS는 여러 서비스를 일관된 경험으로 만들기 위한 디자인 시스템입니다.

## 구조

서비스 화면은 YDS 위에 브랜드 값을 더해 만들어집니다.

1. **YDS**모든 서비스가 함께 쓰는 컴포넌트, 토큰, 규칙입니다.
2. **브랜드**색, 모서리, 글꼴처럼 브랜드마다 달라지는 값만 담은 파일입니다.
3. **서비스**YDS와 브랜드 파일을 불러와 실제 화면을 만듭니다.

## AI로 시작하기

상황을 선택하고 요청 글을 AI에 붙여 넣으세요. 대괄호 안은 내 서비스에 맞게 바꿉니다.

### 운영 중인 사이트

**AI 요청**

```text
# 목표
운영 중인 사이트에 YDS 디자인 시스템을 적용해 줘.

# 참고 문서
https://luvms012-rgb.github.io/yds/site/yds.txt

# 진행 방식
1. 문서를 읽고 YDS 규칙을 파악한다.
2. 현재 사이트를 분석해 적용 범위와 순서를 제안한다.
3. 확인받은 순서대로 화면 단위로 적용하고, 화면마다 전후 비교를 제시한다.

# 원칙
- 기존 기능과 서버 로직은 변경하지 않는다.
- 불확실한 사항은 임의로 판단하지 않고 먼저 확인한다.
```

**HTML v1.1.0**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v1.1.0/dist/ybm-ds.css">
<script src="https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v1.1.0/dist/ybm-ds.js" defer></script>

<!-- 브랜드: YDS 다음에 불러온다 -->
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/brands/my-brand.css">

<!-- <html>에 브랜드 이름을 적는다 -->
<html lang="ko" data-ds-brand="my-brand">
```

### 새 서비스

**AI 요청**

```text
# 목표
새로 만드는 서비스를 YDS 디자인 시스템으로 구축해 줘.

# 참고 문서
https://luvms012-rgb.github.io/yds/site/yds.txt

# 입력 값
브랜드 이름: [my-brand]
브랜드 컬러: [#0f7a3f]
모서리: [YDS 그대로]
글꼴: [YDS 그대로]

# 진행 방식
1. 문서를 읽고 YDS 규칙을 파악한다.
2. 서비스 목적과 필요한 화면을 질문으로 확인하고, 구현 순서를 제안한다.
3. 프로젝트에 YDS를 설치하고, 입력 값으로 브랜드 파일을 만든다. 글자 대비가 모자라면 수정할 색을 제안한다.
4. 확인받은 순서대로 화면 단위로 구현한다. 비슷한 화면이 Templates에 있으면 거기서 시작한다.
5. 완료 후 규칙 준수 여부를 점검하고 수정 내역을 보고한다.

# 원칙
- YDS에 있는 컴포넌트와 토큰만 사용한다.
- 불확실한 사항은 임의로 판단하지 않고 먼저 확인한다.
```

**HTML**

```html
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/yds/dist/ybm-ds.js" defer></script>

<!-- 브랜드: YDS 다음에 불러온다 -->
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
# 목표
우리 브랜드의 화면 시안을 YDS 디자인 시스템으로 제작해 줘.

# 참고 문서
https://luvms012-rgb.github.io/yds/site/yds-full.txt

# 입력 값
브랜드 이름: [my-brand]
브랜드 컬러: [#0f7a3f]
모서리: [YDS 그대로]
글꼴: [YDS 그대로]
만들 화면: [이벤트 신청 페이지]
들어갈 내용: [제목, 기간, 안내 글, 신청 버튼]

# 진행 방식
1. 문서를 읽고 YDS 규칙을 파악한다.
2. 정할 것이 있으면 제작 전에 확인한다.
3. 브랜드 파일이 없으면 YDS와 다른 값만 담아 먼저 만들고, 글자 대비가 모자라면 수정할 색을 제안한다.
4. 비슷한 화면이 Templates에 있으면 거기서 시작해, 브라우저에서 바로 열어 볼 수 있는 HTML 파일 하나로 제작한다.

# 원칙
- YDS에 있는 컴포넌트와 토큰만 사용한다.
```

## Figma로 시작하기

Figma에서 화면을 먼저 그린다면 YDS 라이브러리로 시작합니다.

1. **라이브러리 켜기**Figma의 Assets 패널에서 [YDS 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=3059-92)를 켭니다.
2. **화면 그리기**YDS 컴포넌트를 놓고, 색, 간격, 모서리는 YDS 변수로, 글자는 YDS 텍스트 스타일로 지정합니다.

브랜드 색은 Figma에서 바꾸지 않아도 됩니다.

## 파일

| 파일 | 무엇인가요 | 언제 쓰나요 |
| --- | --- | --- |
| [yds.txt](https://luvms012-rgb.github.io/yds/site/yds.txt) | AI용 YDS 안내서 | AI에 YDS를 알려 줄 때 |
| [yds-full.txt](https://luvms012-rgb.github.io/yds/site/yds-full.txt) | 컴포넌트 사용법과 규칙을 모은 파일 하나 | 주소를 열지 못하는 AI 대화창에 첨부할 때 |
| [AGENTS.md](https://luvms012-rgb.github.io/yds/site/ai/AGENTS.md) / [CLAUDE.md](https://luvms012-rgb.github.io/yds/site/ai/CLAUDE.md) / [yds.mdc](https://luvms012-rgb.github.io/yds/site/ai/yds.mdc) | AI 코딩 도구용 YDS 규칙 파일 | AI 코딩 도구가 늘 YDS 규칙을 지키게 할 때 |
| [yds-check.mjs](https://luvms012-rgb.github.io/yds/site/ai/yds-check.mjs) | YDS 규칙 검사 스크립트 | 다 만든 화면을 점검할 때 |
| [brands](https://github.com/luvms012-rgb/yds/tree/main/brands) | 등록된 브랜드 파일 | 내 브랜드 값을 확인할 때 |
| [Figma 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=3059-92) | YDS 컴포넌트와 변수가 담긴 Figma 파일 | Figma로 화면을 그릴 때 |
