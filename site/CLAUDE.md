# YDS 사이트

YDS 문서 사이트 폴더다. 이 문서는 지금 규칙만 적는다. 결정한 날짜와 경위는 [docs/log.md](../docs/log.md)("site/CLAUDE.md 전체 원문 2026-11-15") 에 있고 필요할 때만 찾는다. 수치의 정답은 코드(site.css, kit.mjs)이고 여기에는 다시 적지 않는다.

## 만들기와 파일
- 주소 <https://luvms012-rgb.github.io/yds/site/>, 로컬 미리보기는 works/.claude/launch.json 의 ds-preview(http://localhost:5179/site/).
- `node site/templates/gen/run.mjs` → `node site/build.mjs` → `node sync.mjs check`. DS(components.json, dist/*.css 머리 주석, tokens.css, icons.css, ybm-ds.js, 루트 index.html 예시, README 6.2)를 읽어 페이지를 만든다.
- 손으로 쓰는 것: `site/build.mjs`, `site/md.mjs`, `site/src/`(site.css, site.js, figma-notes.json, templates.json, updates.json, requests.json, covers.html, anatomy-*.{json,html}, search-ko.json, examples/), `site/templates/gen/*.mjs`.
- 생성물(직접 고치지 않음): `site/index.html`, `site/get-started/`, `site/foundations/`, `site/components/`, `site/templates/*.html`, `site/templates/pages/`, `site/assets/`, `site/*.txt`, `site/ai/`.
- 사이트 CSS, JS 주소에는 내용 해시 `?v=` 를 붙인다(캐시 방지).
- 제안만 하는 정책은 PROPOSAL.md(사용자가 고른 것만 넣는다). 레퍼런스 분석은 로컬 전용 REFERENCE-ANALYSIS.md.

## 꼭 지키는 원칙
- 사이트와 템플릿은 YDS 에 있는 것만 쓴다. 없으면 PROPOSAL.md 로 제안한다.
- 부품은 생김새가 아니라 하는 일로 고른다(components.css 머리 주석의 "고르는 법"). 브라우저 기본 UI 대신 DS 부품을 쓴다.
- 레퍼런스 사이트와 참고한 서비스의 이름, 주소, 사람 이름은 저장소에 적지 않는다.
- 로고는 YBM NET 공식 로고(`src/logo-ybmnet.svg`, Figma `NvAvZxDAnYf3nOVkBZ3pyU` 노드 `130:1642`)만, 자르거나 글자를 붙이지 않는다. 다크 모드는 CSS filter 로 흰색.
- 문서 사이트는 브랜드 색 없이 모노톤(`site/src/brand-mono.css`, 템플릿 미리보기 iframe 과 "새 창으로 보기" 에도, kit.mjs 머리 스크립트). 템플릿을 파일로 열거나 주소에 `?brand` 를 붙이면 브랜드 색 그대로(Figma 재기 도구는 파일로 연다). DS 와 템플릿 원본은 기본 브랜드 파랑 그대로.
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
- 왼쪽 메뉴: Foundations, Components 는 ABC 순(컴포넌트 목록 맨 위 찾기 칸, 한글로도 찾기 `search-ko.json`), 템플릿은 groups.mjs 순서와 한국어 이름(분류 칩의 한국어는 build.mjs `TPL_GROUP_KO`), 분류 묶음은 접는 아코디언(접힘 기억, 지금 페이지 묶음은 펼침). 하위 분류 이름 줄은 그리지 않는다.
- 왼쪽 메뉴 빨간 점: 새 컴포넌트(components.css 머리말 "(날짜 추가)" 가 가장 늦은 묶음, 30일), Updates 문장에 영어 이름이 나온 컴포넌트(3일, 11-16 7일에서 줄임), Updates "템플릿" 소식에 이름이 나온 템플릿(30일). build.mjs `NEW_COMPS`, `UPD_COMPS`, `NEW_TPLS`.
- 사이트 찾기: 상단 돋보기와 Ctrl/Command + K 가 여는 DS Command Palette(`#site-search`, 창과 키보드는 ybm-ds.js). 결과는 site.js "사이트 찾기" 가 `assets/search.json`(build.mjs 끝에서 만든다)을 처음 열 때 읽어 그린다. 찾는 대상은 시작하기 절, Foundations 쪽과 절, 컴포넌트(search-ko.json 한글 낱말로도), 컴포넌트 예시, 템플릿(영어 이름, 분류로도), 토큰, 아이콘. 범위 칩, 종류별 묶음과 "n개 더 보기", 찾은 글자 강조, 최근 연 것 5개(localStorage ybm-site-search-recent). 토큰 결과는 `#t=이름` 으로 그 표 줄을 칠하고, 아이콘은 `#q=이름` 으로 Library 찾기 칸에 넣는다. 왼쪽 메뉴의 컴포넌트 찾기 칸은 그대로 둔다.
- 다크 모드는 기기 설정을 따르고 상단 버튼 선택이 우선(localStorage ybm-site-theme).
- 상자 모양은 메인 코드 상자 하나로 맞춘다(11-16 사용자): 머리 줄은 회색(bg-neutral-weak-alpha, 높이 44, 선 없음), 내용은 흰 바탕, 머리 줄 탭은 DS Segmented Control 기본 크기(site-seg, 사용자 "이 컴포넌트로 최종", 상자마다 탭 줄이 따로 있어도 선택 배경이 미끄러지게 site.js 가 옮긴다). 코드 상자, 컴포넌트 예시, 템플릿 보기, AI 요청 글 모두 같다. 표는 흰 바탕 + 줄 선으로 구분한다.
- 사이트 글자는 크기마다 정한 줄높이, 굵기 400/500/600, 자간 0. 전 페이지 검사 스크립트는 `.cache/typo/audit.js`(로컬 전용, 미리보기에서 불러 `window.__audit`).
- 사이트 CSS 는 레이어 밖이라 본문 규칙에서 미리보기 안(`.pv-stage`, `.site-tile__inner`, `.site-example__preview`)을 `:not()` 으로 뺀다.
- Themes 는 숨김(build.mjs `SHOW_THEMES = false`, 만드는 곳 `node site/themes/gen.mjs`, 다시 켜자고 하기 전에는 제안하지 않는다). 다시 꺼내면 별도 층이 아니라 미리 만든 브랜드 예시로 합친다.

## 움직임 (2026-11-16)
- 메인(Get Started) 요청 글 타이핑만 둔다. 위 메뉴 내려오기, 스크롤 페이드인, 썸네일 차례로 보이기, NEW 뱃지 탄성은 사용자가 지웠다(다시 하자고 하기 전에는 제안하지 않는다). 타이핑은 상자가 보이면 하나씩 한 글자씩(누르거나 포커스하면 바로 끝까지), 기다리는 상자에는 글이 놓일 줄마다 DS Skeleton. 움직임 줄이기 설정이면 끔. 코드는 site.js 끝 "소소한 움직임", site.css 끝, build.mjs 머리 스크립트(메인에만).

## Get Started
- 순서: 리드 한 문장 → 구조 카드 3개 → AI와 함께 시작하기 → Figma로 시작하기 → 개발 시작하기 → 파일 표. 원본은 build.mjs.
- 구조 세 층: YDS(모두 쓰는 컴포넌트, 토큰, 규칙) / 브랜드(색, 모서리, 글꼴처럼 모양만 바꾸는 값의 묶음, 여러 서비스가 같이 쓰거나 서비스 하나가 따로 가짐) / 서비스(YDS + 브랜드 하나, 없으면 YDS 기본). 서비스 하나만 쓰는 색도 브랜드 파일에. 로고, 사진, 말투는 브랜드 범위 밖. 기본 브랜드 색은 palette/brand 파랑(600 #2563eb)으로 둔다(사용자 결정, 다시 묻지 않는다).
- 절 제목 아래 설명은 시작 방법 세 절에만 한 문장. AI 절 "아래 예시를 참고해 하고 싶은 일을 자유롭게 적어 AI 도구에 붙여 넣으세요."
- AI 요청 글(build.mjs `AI_EXAMPLES`, `AI_COMMON`): 상자 하나에 요청 하나([새 화면 만들기] / [운영 중인 페이지에 적용하기] / [브랜드 만들기]). 첫 줄은 안내서 문장과 yds.txt 주소를 한 줄로, 요청 문장은 다음 줄, 바꿀 곳은 [ ] 빈칸(사이트에서는 파랑 글자, 첫 줄 묶음 이름은 빼고). 상자 머리 칸 이름은 묶음 이름(본문 글꼴). 문구는 사용자가 준 그대로이고 바꿀 때는 묻는다.
- 개발 시작하기 설치 코드 탭: 버전 고정(기본) / 최신 / 규칙 파일. 첫 줄 주석 `<!-- 서비스 CSS보다 앞에 -->` 와 브랜드 CSS 줄(예시 이름 my-brand, 특정 서비스 이름 금지).
- 넣지 않는 것(다시 넣자고 하기 전에는 제안하지 않는다): 제목 아래 Figma, 코드, Markdown 버튼 줄, 첫 화면 시연, 원칙 카드, 역할별 입구, 새 소식 묶음, 카드 개수, 푸터 저작권, 둘러보기, 브랜드 등록 요청 버튼, yds-full.txt 첨부 안내, 규칙 파일 옆 도구 이름, 적용 순서 5단계, Figma Do / Don't 표, 첫 컴포넌트 예시, 브랜드 카드 링크와 배지, 제목 옆 링크 복사 Tooltip, 디자이너에게 묻기, 테마 고르기 요청 글, 업그레이드 명령, 예시 앱, CLI.

## Updates
- 소식(`site/src/updates.json` 맨 위 그날 날짜): DS 시스템 변경과 새 템플릿 추가만. 종류는 "새 기능", "변경된 부분". 항목 앞 영역 배지는 컴포넌트, 템플릿, 아이콘, 토큰, 브랜드, 규칙 중 하나("DS" 는 쓰지 않는다). 사이트 꾸밈, 템플릿 고치기는 적지 않는다. 버전을 올리면(`node sync.mjs release`) 맨 위 소식에 버전이 붙는다.
- 요청 탭(`updates-requests.html`, `site/src/requests.json`): 사용자가 "이 요청 추가", "반영됨으로" 하면 Claude 가 고쳐 배포. 같은 요청은 count 를 올리고, 이름은 쓰지 않고 소속만. 요청 제목과 반영 내용은 줄이지 않고 서술형 문장(합니다체)으로 끝맺는다. 상태 순서 검토 중, 접수, 반영됨, 보류. 비면 Empty 를 보이고 새 요청 점은 띄우지 않는다(build.mjs `updTabs`, `LATEST_REQUEST`).
- 요청 탭 순서(11-16 사용자): 탭 → 요청 목록 → 의견 보내기 버튼. 결정 기준은 사용자가 우선 지웠다(다시 넣자고 하기 전에는 제안하지 않는다).
- 사용 현황 탭(`updates-usage.html`): 서비스 목록은 `site/src/services.json`(이름, 검사할 화면 주소), 결과는 `node tools/usage.mjs` 가 만드는 `site/src/usage.json`(서비스별 버전과 복사본 여부, 쓰는 컴포넌트, 직접 쓴 색 수). 담당, 버전별 내려받기는 사용자가 지웠다(11-16 "복잡함"), 한 칸 안 두 정보는 세로로 쌓지 않고 가로 한 줄로. 한 달에 한 번 사용자가 말할 때 돌리고 다시 빌드한다.
- 새 소식, 새 요청은 Updates 메뉴와 탭에 점(site.js, localStorage ybm-site-updates-seen, ybm-site-requests-seen). 기준 값은 build.mjs `LATEST_UPDATE`(맨 위 날짜, 항목 수, 영역), `LATEST_REQUEST`(줄마다 날짜, 상태, 반영한 날, 요청 수)라 문구만 고치면 NEW 가 뜨지 않는다. 이 값은 `assets/latest.json` 에 쓰고 모든 페이지가 캐시 없이 새로 읽는다(페이지 HTML 은 10분 캐시라 페이지마다 값이 달라 NEW 가 들쭉날쭉했다). 못 읽으면 띄우지 않는다.
- 의견 보내기: build.mjs `FEEDBACK_FORM`(구글 폼), 입구는 푸터 하나.
- 사용 현황 탭(`updates-usage.html`): 컴포넌트 쓰임 막대만(쓰는 곳 많은 순, 이름은 컴포넌트 페이지 링크). 서비스 카드, 버전, 색, 안 쓰는 목록은 사용자가 지웠다(usage.json 에는 남아 있다). 원본 `node tools/usage.mjs` → usage.json. 세 탭 모두 탭 아래 40 에서 내용 시작.
- 맨 위로 버튼: 모든 페이지, 화면 높이만큼 내리면 오른쪽 아래(`[data-site-totop]`, site.js).

## Foundations 와 컴포넌트 문서
- Foundations: 항목마다 한 쪽, ABC 순, 큰 그림 없음. 구성은 개요 → 토큰 표(tokens.css 에서 읽음) → 코드에서 쓰기 → 사용 지침. Color, Iconography 는 탭으로 나눈다(build.mjs `FD_TABS`).
- 아이콘 페이지: 찾기 칸 하나가 YDS 아이콘(icons.css)과 Lucide 전체(`site/src/lucide-icons.json`)를 함께 거른다. 한글은 `site/src/icon-ko.json`(한국어 → 영어 낱말)로 찾고 사이트 찾기의 아이콘도 같은 낱말을 쓴다(안 찾히는 말은 한 줄 더한다). YDS 에 없는 아이콘은 서비스 CSS 에 넣을 코드를 복사한다. Lucide 갱신은 `node site/lucide-update.mjs <폴더> <버전>`. 아이콘 쓰임 글은 build.mjs `ICON_GROUPS`(빠지면 빌드가 알려 준다).
- 컴포넌트 상세 순서: 사용법 → 구조 → 속성 → 동작 → 사용 지침 → 예시 → 규격.
- 구조 그림: 실제 크기 부품 + 파란 이름과 곧은 화살표(site.js pinAnatomy, 겹침이 없는 자리, 피할 수 없으면 data-forced). 자리 글자가 있는 컴포넌트는 `site/src/anatomy-figures.html` 에 실제 쓰임 화면을 따로 쓴다. 휴대폰에서는 줄이지 않고 옆으로 민다.
- 예시는 동작이나 구조가 다를 때만 둔다(README "예시를 더하는 기준"). 값만 다른 것은 속성 표, 변수 표, README 6.2 지침 한 줄로.
- 사용 지침 표: Do 먼저, "~않습니다, ~마세요" 로 끝나면 Don't. README 6.2 는 문장마다, figma-notes.json dos 는 항목마다 한 줄, 겹치면 자세한 쪽만.
- 대표 그림은 `site/src/covers.html` 에 컴포넌트마다 한국어 실제 쓰임 장면 하나(흰 바탕, 덩어리는 build.mjs COVER_PANEL). 목록 썸네일은 첫 예시의 앞 부품 2개. 새 컴포넌트를 넣으면 covers, search-ko, anatomy 도 더한다.

## AI 안내서
- `site/md.mjs` 가 쪽마다 `.md`, 목차 `yds.txt`, 모음 `yds-full.txt`(예시, 규격, 구조 절을 뺌)를 만든다. llms.txt, llms-full.txt 는 같은 내용의 옛 이름(화면에는 안 씀). 끝에 Templates 목록(build.mjs `tplList`).
- 토큰 줄이기: 목록 링크 주소만 site/ 기준 상대 주소(`relLinks`, 코드 안 주소는 그대로), yds.txt 템플릿 설명은 첫 문장만, yds-full.txt 는 반복 안내 문장(REPEAT)을 맨 위 FULL_NOTE 에 한 번만 적고 Do/Don't 표는 줄 목록으로. 규칙 문장은 빼지 않는다.
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
- 글자 위계(kit.mjs): 페이지 제목 `tp-h1` 24 SemiBold, 섹션 `tp-h2` 20 SemiBold, 카드 `tp-h3` 16 Bold, 작은 제목 `tp-h4` 14 Bold, 항목 제목 `tp-item-title` 16 SemiBold, 이름 `tp-name` Medium, 가격 `tp-amount` Bold, 부가 정보 `tp-caption` 13. 11~12 는 배지와 태그만.
- 템플릿 이름(2026-11-15 사용자 "쉽게 찾고 읽히는 이름"): 하는 일로 [대상] + [화면 종류]. 화면 종류는 홈, 목록, 상세, 쓰기, 신청, 완료, 조회, 결제, 관리, 현황, 설정만 쓰고 대시보드는 "○○ 현황". 같은 일을 하는데 모양만 다르면 괄호에 모양(로그인 (기본), 결제 (단계별)). 표, 폼, 카드, 패널 같은 부품 이름은 이름에 쓰지 않는다. 하위 분류 이름도 같은 기준(관리자: 현황, 처리, 목록 관리, 등록). 이름을 바꿔도 주소(slug)는 그대로 둔다.
- 가로 기준(2026-11-15 사용자 "1440으로 일괄 통일"): 화면 틀은 좌우 여백 포함 최대 1440(`--tp-max`, Breakpoint xl), 넓은 화면에서는 가운데. 그보다 좁으면 `--tp-gutter` 16 / 24 만 두고 채운다. 한 줄 화면만 `--tp-narrow` 720. 공통 규칙은 kit.mjs(`.tp-app > :is(.tp-head, .tp-content, ...)`), 옆 메뉴 화면과 AI 대화는 틀 전체를 1440 에 두고 양옆에 선, 화면 끝까지 선이 가는 띠(위 막대, 탭 줄, 아래 버튼 막대, 듣기 막대)는 선은 끝까지 두고 안의 글만 1440 안으로. 예외는 전체 화면 플레이어 2쪽(video-player, learning-player). 새 틀 클래스를 만들면 이 규칙에 넣는다. 위 메뉴, 머리글, 본문 끝선을 맞춘다. 페이지 스크롤바는 숨긴다.
- 배치 기준 화면은 커뮤니티, 요금제, 시험 신청. 본문과 정보가 함께 있으면 `.tp-body--panel` 로 오른쪽 패널을 나눈다. 시험 신청 틀: 위 메뉴, 머리글, 카드, 넓은 화면 오른쪽 고정 요약 340, 주요 버튼 brandSolid.
- 점검: 한 줄의 버튼, 고르기, 입력, 세그먼트는 높이가 같다(kit `even()`, 고르기와 입력은 small 없음). 사이트 페이지도 같다: 한 줄에 놓는 버튼은 크기 하나만 쓰고, 새 버튼을 줄에 더할 때는 옆 버튼의 data-size 를 먼저 본다. `node sync.mjs check` 의 "5-1d 한 줄 버튼 높이" 가 섞인 줄을 막는다(세로로 쌓는 칸은 그 검사의 STACKED 에 더한다). inset box-shadow 선은 자식 배경에 가리지 않게(바탕은 tr 에). 375, 768, 1100, 1440 에서 넘침과 좁은 칸 글자 꺾임이 없는지 본다.
- 보이는 제목이 없는 화면은 생성기 return 에 `h1: '제목'`(kit `page()` 가 숨김 h1 `tp-sr`).
- 템플릿 `<style>` 은 DS 레이어 밖이라 `.tp-*` 에 display 를 주면 `u-hide-from-md` 보다 세다. 모바일 전용 막대는 `@media (min-width: 768px) { display: none }` 을 직접 쓴다. 로그인 화면은 인사말 없이 숨김 h1, 아이디 저장 체크박스(기본 켜짐).
- 사진은 kit `PHOTOS` 주제별 Unsplash 만, 색칠한 빈 사진 자리 없음. 이미지 비율은 Image Frame `data-ratio`(교재 표지 3:4, 포스터 2:3). 차트는 마우스를 올리면 값 풍선(kit CHART_JS). 차트 색 기준(11-16): 계열은 kit `C(i)` 순서(1번 파랑, 2번 주황...), 비교 기준과 남은 몫은 bg-neutral, 상태를 나누는 차트만 상태 색. 문서 사이트 모노톤에서도 차트 색은 그대로(brand-mono.css `--site-chart-1`).
- 이름과 데이터: 나는 '와이비엠'(ybm@example.com, 아이디 ybm), 기관은 가상 이름(한빛대학교, 한빛전자, 한빛아카데미), 시험과 교재는 일반 이름. 실제 서비스, 교재, 사람 이름은 넣지 않는다. 이름에 가운뎃점 금지.
- 거르기 칸은 찾기 + 고르기 한 줄, 그 아래 분류 칩, 결과 위 개수 + 정렬. 이동 없는 체크 목록은 kit `checks()`.
- 온라인 평가(test.mjs): 문항 글은 `tp-ex` 안. 답안지 상태는 같은 모양에 색만(안 함 흰 바탕, 답함 bg-neutral, 지금 brand-solid, 다시 보기 warning-weak).
- 영상(media.mjs): 화면 밝기는 사이트를 따르고 영상 칸만 늘 검정. 플레이어 조작 버튼은 DS 에 없는 영상 도구 전용이라 템플릿 버튼(tp-pc). Carousel 항목 안 카드는 항목 폭을 채운다.

## 템플릿 분류와 파일
- 정본은 `site/templates/gen/groups.mjs`. 분류 9개 고정: 시험, 학습, 교재, 결제, 회원, 커뮤니티, 고객센터, 콘텐츠, 관리자. 새 템플릿은 하위 분류에 넣고 분류를 늘리지 않는다. 순서 = 탭, 왼쪽 메뉴, 목록 순서(많이 쓰는 화면부터). run.mjs 가 templates.json 의 group, sub 를 덮어쓴다.
- 분류 기준은 쓰는 사람: 시험, 학습, 교재 등에는 고객이 쓰는 화면만, 운영자와 담당자 화면은 주제와 상관없이 관리자.
- 교재 분류는 쇼핑이 아니라 교재를 찾고 음원, 자료, 강의로 공부를 돕는 화면(장바구니, 요금제는 결제 분류).
- 뺀 템플릿은 groups.mjs `REMOVED`(생성기 코드도 지움, 되살리려면 git 기록). 다시 넣자고 하기 전에는 편집기 도구, 문서 사이트, 모양만 다른 변형을 템플릿 목록에 더하지 않는다(시안에서 배치를 여러 개 내는 것은 괜찮다).
- 생성기: kit.mjs(공용 CSS, 부품, 차트), frame.mjs(위 메뉴, 옆 메뉴, 고르기 상자, 달력), 분류별 dashboard, table, form, settings, login, content, aichat, gallery, community, pricing, mypage, commerce, exam, test, learning, service, basics, admin, media, books, feedback(설문, 수강평), lesson(AI 학습 리포트). pages/ HTML 은 직접 고치지 않는다.
- 새 템플릿은 늘 UI 패턴 카탈로그에서 레퍼런스를 먼저 모은다(사용자 "템플릿 만들 때는 항상 uipattern 에서 수집"). `uipatterns/web/data.js`, `mo/data.js` 에서 이름으로 찾고 그림은 imagesisa 주소 `uipatterns/{web|mo}/<경로>` 로 받아 본다. 본 서비스 이름은 저장소에 적지 않고 구조만 가져온다.
- 새 템플릿을 더하면 Updates 에 "템플릿" 소식 한 줄, Figma Templates 는 남은 일에 적는다.

## 템플릿 목록과 문서 보기
- 목록 썸네일은 미리 찍은 그림(`site/templates/thumbs/<slug>.webp`, `-dark.webp`, 모노톤, 1080x675)이다. `node tools/tpl-thumbs.mjs` 가 바뀐 템플릿만 찍고(`--all` 모두), `node sync.mjs deploy` 가 배포 전에 자동으로 돌린다. 그림이 낡으면 check "5-1e" 가 막는다. 사이트와 템플릿의 DS 파일 주소에는 내용 해시 `?v=`(build.mjs `DIST_V`, kit.mjs `DIST_V`).
- 목록: 가운데 1552, 분류 칩, 3열, 컴포넌트 목록처럼 16:10 미리보기 아래에 이름만(덮개, 설명, 버튼, 마우스 효과 없음, 설명과 Figma 는 문서 보기에). 카드는 문서 보기로 바로 간다(보기 창은 site.js `TPL_VIEWER = false`, 옛 `?preview=` 주소는 문서 보기로 넘긴다).
- 문서 보기의 "새 창으로 보기"(11-16 사용자): 보기 창(제목, 설명, 새 탭 아이콘, 닫기, 창 밖 좌우 화살표와 키보드 좌우, 순서는 목록 순서 build.mjs `TPL_LIST_JSON`)으로 연다. Ctrl, Cmd, 가운데 버튼은 진짜 새 탭. 코드는 site.js 템플릿 보기 창 아래 블록.
- 문서 보기: 위에 AI 요청 글 상자(11-16, 미리보기를 보면서 쓰게 탭에서 뺐다), 아래 미리보기 | 코드 탭. 미리보기는 실제 기기 폭(PC 1440x900, 모바일 375x760, 화면 폭은 아이콘 두 개 monitor / smartphone, 태블릿은 11-16 사용자가 뺐다)으로 그리고 site.js `fitStage` 가 줄인다. 코드는 긴 줄을 접는다.
- AI 요청 글은 build.mjs `TPL_PROMPT` 하나가 정본: 안내서 문장과 주소 한 줄, 다음 줄에 "'이름' 템플릿을 참고해 [만들고 싶은 화면]을 만들어 줘." 와 템플릿 주소. 빈칸은 메인처럼 파랑 글자(사람마다 답이 다른 칸이라 예시로 바꾸지 않음). 상자는 코드 탭처럼 모서리 없이. 문구를 바꿀 때는 사용자에게 묻는다.

## Figma 연결
- 절차는 `.claude/skills/yds-figma-draw/SKILL.md`(그리기), `.claude/skills/ds-sync/SKILL.md`(변수, 컴포넌트 대조).
- Figma 문서 프레임 본문은 `node sync.mjs docs` 로 사이트와 같은 설명, 지침으로 다시 채울 수 있다.
- 공식 파일 `1VCEsFU3xMWuXIntIrZz9i`, Foundations 페이지 `2274:1143`. 사이트의 Figma, Code 버튼 주소는 `tokens/links.mjs` 와 components.json `doc` / `figmaDocs`, 템플릿은 templates.json `figma.pc`.
