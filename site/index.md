<!-- https://luvms012-rgb.github.io/yds/site/index.html -->

# Get Started

yds는 모든 서비스가 함께 쓰는 뿌리입니다. 브랜드는 다른 값만 얹고, 나머지는 yds를 따라갑니다.

## 구조

1. **yds**모든 브랜드가 함께 쓰는 부품, 토큰, 규칙입니다. 담당자만 고칩니다.
2. **브랜드**색, 모서리, 글꼴처럼 yds와 다른 값만 담은 파일 하나입니다.
3. **서비스**yds와 브랜드를 불러와 화면을 만듭니다.

## 브랜드 만들기

적지 않은 값은 yds를 따라가므로 yds가 바뀌면 브랜드도 함께 바뀝니다. 부품 구조, 간격, 글자 크기, 접근성 규칙은 브랜드에서 바꾸지 않습니다.

| 바꿀 수 있는 값 | 파일에 적는 이름 | 설명 |
| --- | --- | --- |
| 브랜드 색 | `color` | 대표색 하나로 나머지 단계와 다크 모드 값을 만듭니다. |
| 버튼 위 글자색 | `onBrandSolid` | 브랜드 색이 밝아서 흰 글자가 잘 보이지 않을 때 적습니다. |
| 바탕과 면 색 | `canvas`, `layerDefault`, `layerFloating` | 화면 바탕과 카드, 창의 색입니다. |
| 모서리 | `shapeScale` | 모든 모서리를 같은 비율로 키우거나 줄입니다. |
| 글꼴 | `font` | 기본 글꼴 대신 쓸 글꼴입니다. |

**AI 요청**

```text
yds 디자인 시스템 위에 우리 브랜드를 만들고 싶어.
먼저 아래 문서를 읽고 브랜드 규칙을 익혀 줘.
문서: https://luvms012-rgb.github.io/yds/site/yds.txt

브랜드 이름: [my-brand]
브랜드 컬러: [#0f7a3f]
모서리: [yds 그대로]
글꼴: [yds 그대로]

yds와 다른 값만 담은 브랜드 파일을 JSON으로 만들어 줘.
yds 원본은 고치지 말고, 글자 대비가 모자라면 고칠 색을 제안해 줘.
```

**브랜드 파일**

```json
{
  "name": "우리 브랜드",
  "color": "#0f7a3f",
  "shapeScale": 1.25
}
```

**HTML**

```html
<!-- 브랜드: yds 다음에 불러온다 -->
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/brands/my-brand.css">

<!-- <html>에 브랜드 이름을 적는다 -->
<html lang="ko" data-ds-brand="my-brand">
```

[담당자에게 브랜드 등록 요청](https://docs.google.com/forms/d/e/1FAIpQLSeQdOrHp59nlOmnzLJwr6HXsU-WaTRdJwTna6gqzK3xP8sYuA/viewform)

## 서비스 시작하기

### 내 사이트에 넣기

**AI 요청**

```text
지금 운영 중인 이 사이트에 yds 디자인 시스템을 입히고 싶어.
먼저 아래 문서를 읽고 yds 규칙을 익혀 줘.
문서: https://luvms012-rgb.github.io/yds/site/yds.txt

브랜드: [my-brand]

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

### 새 프로젝트

**AI 요청**

```text
새 프로젝트를 yds 디자인 시스템으로 시작하려고 해.
먼저 아래 문서를 읽고 yds 규칙을 익혀 줘.
문서: https://luvms012-rgb.github.io/yds/site/yds.txt

브랜드: [my-brand]
첫 화면: [회원 목록]

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
yds 디자인 시스템으로 화면 시안을 만들고 싶어.
먼저 아래 문서를 읽고 yds 규칙을 익혀 줘.
문서: https://luvms012-rgb.github.io/yds/site/yds-full.txt

브랜드: [my-brand]
만들 화면: [이벤트 신청 페이지]
들어갈 내용: [제목, 기간, 안내 글, 신청 버튼]

yds에 있는 부품과 색만 써서, 브라우저에서 바로 열어 볼 수 있는 HTML 파일 하나로 만들어 줘.
정할 것이 있으면 만들기 전에 물어봐 줘.
```

## 둘러보기

- [Foundations](https://luvms012-rgb.github.io/yds/site/foundations/color.md): 색, 글자, 간격, 모서리, 그림자, 움직임처럼 화면의 바탕이 되는 토큰입니다.

- [Components](https://luvms012-rgb.github.io/yds/site/components/index.md): 버튼, 입력칸, 목록처럼 화면을 이루는 부품입니다.

- [Templates](https://luvms012-rgb.github.io/yds/site/templates/index.html): 자주 만드는 화면을 부품으로 미리 조립해 둔 예시입니다.

## 파일

| 파일 | 무엇인가요 | 언제 쓰나요 |
| --- | --- | --- |
| [yds.txt](https://luvms012-rgb.github.io/yds/site/yds.txt) | AI용 yds 안내서 | AI에 yds를 알려 줄 때 |
| [yds-full.txt](https://luvms012-rgb.github.io/yds/site/yds-full.txt) | yds 문서 전체를 모은 파일 하나 | 주소를 열지 못하는 AI 대화창에 첨부할 때 |
| [AGENTS.md](https://luvms012-rgb.github.io/yds/site/ai/AGENTS.md) / [CLAUDE.md](https://luvms012-rgb.github.io/yds/site/ai/CLAUDE.md) / [yds.mdc](https://luvms012-rgb.github.io/yds/site/ai/yds.mdc) | AI 코딩 도구용 yds 규칙 파일 | AI 코딩 도구가 늘 yds 규칙을 지키게 할 때 |
| [yds-check.mjs](https://luvms012-rgb.github.io/yds/site/ai/yds-check.mjs) | yds 규칙 검사 스크립트 | 다 만든 화면을 점검할 때 |
| [brands](https://github.com/luvms012-rgb/yds/tree/main/brands) | 등록된 브랜드 파일 | 내 브랜드 값을 확인할 때 |
| [Figma 라이브러리](https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2608-2) | yds 컴포넌트와 변수가 든 Figma 파일 | Figma로 화면을 그릴 때 |
