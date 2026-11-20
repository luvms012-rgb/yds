# YDS 사이트

YDS 문서 사이트 폴더다. 이 문서는 지금 규칙만 적는다. 경위는 [docs/log.md](../docs/log.md), 페이지별 세부 규격(Get Started, Updates 탭, 찾기, 움직임, 템플릿 세부와 보기 창 등)은 [docs/site-detail.md](../docs/site-detail.md). **어떤 페이지를 고치거나 무엇을 제안하기 전에는 site-detail.md 의 그 절을 먼저 읽는다.** 수치의 정답은 코드(site.css, kit.mjs)이고 여기에는 다시 적지 않는다.

## 만들기와 파일
- 공식 주소 <https://design.ybmnet.co.kr/yds/>(사내 서버, 공개 주소에 /site/ 를 쓰지 않는다), 개발 미리보기는 GitHub Pages, 로컬 미리보기는 works/.claude/launch.json 의 ds-preview(http://localhost:5179/site/).
- `node site/templates/gen/run.mjs` → `node site/build.mjs` → `node sync.mjs check`. DS(components.json, dist/*.css 머리 주석, tokens.css, icons.css, ybm-ds.js, 루트 index.html 예시, README 6.2)를 읽어 페이지를 만든다.
- 손으로 쓰는 것: `site/build.mjs`, `site/md.mjs`, `site/src/`(site.css, site.js, figma-notes.json, templates.json, updates.json, covers.html, anatomy-*.{json,html}, search-ko.json, examples/), `site/templates/gen/*.mjs`.
- 생성물(직접 고치지 않음): `site/index.html`, `site/get-started/`, `site/foundations/`, `site/components/`, `site/templates/*.html`, `site/templates/pages/`, `site/assets/`, `site/*.txt`, `site/ai/`.
- 사이트 CSS, JS 와 DS 파일 주소에는 내용 해시 `?v=`(build.mjs `ASSET_V`, `DIST_V`, kit.mjs `DIST_V`).
- 제안만 하는 정책은 PROPOSAL.md(사용자가 고른 것만 넣는다). 레퍼런스 분석은 로컬 전용 REFERENCE-ANALYSIS.md.

## 꼭 지키는 원칙
- 사이트와 템플릿은 YDS 에 있는 것만 쓴다. 없으면 PROPOSAL.md 로 제안한다.
- 부품은 생김새가 아니라 하는 일로 고른다(components.css 머리 주석의 "고르는 법"). 브라우저 기본 UI 대신 DS 부품을 쓴다.
- 레퍼런스 사이트와 참고한 서비스의 이름, 주소, 사람 이름은 저장소에 적지 않는다.
- 로고는 YBM NET 공식 로고(`src/logo-ybmnet.svg`, Figma `NvAvZxDAnYf3nOVkBZ3pyU` 노드 `130:1642`)만, 자르거나 글자를 붙이지 않는다. 다크 모드는 CSS filter 로 흰색.
- 문서 사이트는 브랜드 색 없이 모노톤(`site/src/brand-mono.css`). 템플릿 미리보기와 새 창도 모노톤(kit.mjs 머리 스크립트), 따로 파일로 열거나 `?brand` 를 붙이면 브랜드 색(파일로 연 사이트 안의 미리보기는 모노톤). DS 와 템플릿 원본은 기본 파랑.
- 이름은 모두 ds(--ds-*, 레이어 ds.*, 전역 DS). 예전 --ybm-* 은 dist/compat-ybm.css 로 읽힌다.
- 배치와 글자 수치는 레퍼런스 A 실측과 Figma `2662:26` 기준이고 값은 site.css 가 정답이다. 값을 바꾸면 Figma 2662:26 도 맞춘다.

## 글쓰기
- 이름은 영어 그대로(메뉴, 페이지 제목, 컴포넌트, 토큰, 클래스, 속성, Figma), 영어 뒤 조사는 붙인다. 나머지(섹션 제목, 버튼, 탭, 표 머리, 칩)는 한국어. Do / Don't 만 영어.
- 문서 글(리드, 본문, 표 설명, 사용 지침, 템플릿 설명)은 합니다체, 안내는 "~하세요". 화면 글(예시, 대표 그림, 템플릿 안)은 해요체, 쉬운 말, 아라비아 숫자, 오류는 고치는 방법까지.
- 제목, 버튼, 라벨, 표 머리에는 마침표 없음. 느낌표, 줄임말, 어려운 한자어, 긴 대시, 가운뎃점 금지.
- 설명은 하는 일로 쓴다. 컴포넌트 "누르면 ~하는 컴포넌트입니다.", Foundations "색은 ~를 돕습니다.", 템플릿 "어떤 화면인지 + 언제 쓰는지" 한두 문장. 컴포넌트 설명 원본은 figma-notes.json lead.

## 사이트 틀
- 메뉴 다섯: Get Started, Foundations, Components, Templates, Updates. 페이지 제목은 왼쪽 메뉴와 같은 영문.
- 배치(`page({ layout })`): page(가운데 한 칸: Get Started, Updates) / doc(글 + 목차: Foundations, 컴포넌트 상세) / wide(메뉴 옆 넓은 폭: 컴포넌트 목록, 템플릿 문서 보기) / full(템플릿 목록, 가운데 1552).
- 다크 모드는 기기 설정을 따르고 상단 버튼 선택이 우선(localStorage ybm-site-theme). 다크면 html `data-theme="dark"`, 라이트면 지운다. 테마별 그림은 이 표시만 본다(prefers-color-scheme 를 따로 보지 않는다).
- 상자 모양은 메인 코드 상자 하나: 회색 머리 줄(bg-neutral-weak-alpha, 높이 44, 선 없음) + 흰 내용, 머리 줄 탭은 DS Segmented Control 기본 크기(`site-seg`, 선택 배경이 미끄러진다). 코드 상자, 예시, 템플릿 보기, AI 요청 글 모두. 표는 흰 바탕 + 줄 선.
- 사이트 CSS 는 레이어 밖이라 본문 규칙에서 미리보기 안(`.pv-stage`, `.site-tile__inner`, `.site-example__preview`)을 `:not()` 으로 뺀다.

## Updates
- 소식(`site/src/updates.json` 맨 위 그날 날짜): DS 시스템 변경과 새 템플릿 추가만. 문장은 짧고 바로 읽히게 한두 문장(11-20 사용자 "짧고 직관적으로"): 바뀐 것 하나만, 컴포넌트를 길게 나열하지 않고 대표 몇 개 + 처럼, 괄호 설명과 "쓰는 법은 그대로" 같은 덧붙임 없이. 종류는 "새 기능", "변경된 부분". 항목 앞 영역 배지는 컴포넌트, 템플릿, 아이콘, 토큰, 브랜드, 규칙 중 하나("DS" 는 쓰지 않는다). 사이트 꾸밈, 템플릿 고치기는 적지 않는다. 버전을 올리면(`node sync.mjs release`) 맨 위 소식에 버전이 붙는다.

## Foundations 와 컴포넌트 문서
- 컴포넌트 상세 순서: 사용법 → 구조 → 속성 → 동작 → 사용 지침 → 예시 → 규격.
- 예시는 동작이나 구조가 다를 때만 둔다(README "예시를 더하는 기준"). 값만 다른 것은 속성 표, 변수 표, README 6.2 지침 한 줄로.
- 사용 지침 표: Do 먼저, "~않습니다, ~마세요" 로 끝나면 Don't. README 6.2 는 문장마다, figma-notes.json dos 는 항목마다 한 줄, 겹치면 자세한 쪽만.

## AI 안내서
- `site/md.mjs` 가 쪽마다 `.md`, 목차 `yds.txt`, 모음 `yds-full.txt`(예시, 규격, 구조 절을 뺌)를 만든다. llms.txt, llms-full.txt 는 같은 내용의 옛 이름(화면에는 안 씀). 끝에 Templates 목록(build.mjs `tplList`).
- 규칙 문장 원본은 build.mjs `LLMS_RULES`(yds.txt "지킬 것", ai/AGENTS.md, CLAUDE.md, yds.mdc 에 같이 들어간다).
- 규칙이나 템플릿을 크게 바꾸면 AI 안내서 시험을 다시 돌린다: 메인 요청 글 3개를 yds.txt 주소만 준 새 AI 에게 시키고, 결과를 `site/ai/yds-check.mjs` 로 채점하고, AI 가 막힌 곳으로 안내서를 고친다.

## 템플릿을 만드는 규칙
- 지침(kit.mjs `PRINCIPLE` 원문, HTML 에는 넣지 않는다): 목적, 구조, 디자인, 코드 모두 단순하게. 글을 빼고 배치(여백, 정렬, 크기, 순서)로 해결. UX, DX, AX 함께. 되던 기능은 망가뜨리지 않고, 애매하면 작업 전에 묻는다.
- 화면 글: 홍보 문구, 꾸밈 설명, 보조 라벨, 인사말은 넣지 않는다(kit `stripCopy` 가 문장형 보조 글을 뺀다, 내용 영역은 COPY_KEEP). 기능에 필요한 글(입력 도움말, 오류와 주의 Callout, 빈 화면 안내)은 넣는다.
- **시안을 좁히지 않는다**(사용자 "제약 때문에 시안이 한정적으로 나오는 것을 막으려고"): 아래 템플릿 규칙은 템플릿 목록을 만들 때의 기준이다. 시안과 서비스 화면은 구성과 배치를 자유롭게 바꾸고 같은 화면을 여러 배치로 내도 된다. YDS 에 없는 요소는 서비스 클래스로 토큰만 써서 만들고 알린다. 아이콘이 없으면 Lucide 에서 서비스 CSS 로 더한다. 꼭 지킬 것은 토큰 값, 기준점, 접근성, 상태 색, 강조 버튼 하나뿐이다.
- 템플릿과 yds.txt 규칙이 다르면 규칙을 따른다.
  - 기준점은 480, 768, 1280, 1440 만(1024 쓰지 않음). 모바일 먼저.
  - 위 막대: 768 미만 Top App Bar, 768 부터 Top Navigation(frame.mjs `topbar`, 옆 메뉴 화면은 `mbar`). 옆 메뉴(Side Navigation)는 1280 부터.
  - Avatar 는 DS 크기만(20, 24, 36 기본, 40, 48, 56, 64, 80, 96, 108).
  - 모두 보기, 전체 보기, 더 보기 링크 끝에 chevron-right(kit `link` 가 붙인다).
  - 상태는 같은 자리면 모두 Badge: 해야 할 일이 남음 warning, 진행 중 informative, 끝남 neutral, 실패, 취소, 반려 critical, 좋은 결과만 positive. 줄마다 반복되는 버튼은 small neutralWeak.
  - 데이터 표 아래는 Table Pagination(kit `tablePager`), 페이지 번호 Pagination 은 일반 목록에만. 표는 DS Table 그대로(두 줄 칸 `.ds-table__stack`, 묶음 행 `tr.ds-table__group`), 옆으로 미는 표는 최소 760.

## 템플릿 분류와 파일
- 정본은 `site/templates/gen/groups.mjs`. 분류 9개 고정: 시험, 학습, 교재, 결제, 회원, 커뮤니티, 고객센터, 콘텐츠, 관리자. 새 템플릿은 하위 분류에 넣고 분류를 늘리지 않는다. 순서 = 탭, 왼쪽 메뉴, 목록 순서(많이 쓰는 화면부터). run.mjs 가 templates.json 의 group, sub 를 덮어쓴다.
- 분류 기준은 쓰는 사람: 시험, 학습, 교재 등에는 고객이 쓰는 화면만, 운영자와 담당자 화면은 주제와 상관없이 관리자.
- 새 템플릿은 늘 UI 패턴 카탈로그(`uipatterns/web/data.js`, `mo/data.js`, 그림은 imagesisa `uipatterns/{web|mo}/<경로>`)에서 레퍼런스를 먼저 모은다. 서비스 이름은 저장소에 적지 않는다.
- 새 템플릿을 더하면 Updates 에 "템플릿" 소식 한 줄, Figma Templates 는 남은 일에 적는다.

## Figma 연결
- 절차는 `.claude/skills/yds-figma-draw/SKILL.md`(그리기), `.claude/skills/ds-sync/SKILL.md`(변수, 컴포넌트 대조).
- Figma 문서 프레임 본문은 `node sync.mjs docs` 로 사이트와 같은 설명, 지침으로 다시 채울 수 있다.
- 공식 파일 `1VCEsFU3xMWuXIntIrZz9i`, Foundations 페이지 `2274:1143`. 사이트 제목 아래 버튼은 Figma, Markdown 둘(코드 버튼은 11-17 뺌). Figma 버튼 주소는 `tokens/links.mjs` 와 components.json `doc` / `figmaDocs`, 템플릿은 templates.json `figma.pc`.
