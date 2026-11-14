# YDS

YBM 서비스 공용 디자인 시스템. Figma 변수/컴포넌트가 정본이고, 이 저장소(`yds`)는 그걸 코드로 옮긴 배포 패키지와 동기화 도구다.
이 폴더 하나가 GitHub 저장소 하나다(가이드 사이트와 분리된 단독 저장소).

- 최종 갱신: 2026-10-27
- Figma 파일: `1VCEsFU3xMWuXIntIrZz9i` - <https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/>
- GitHub 저장소: <https://github.com/luvms012-rgb/yds>
- 배포 주소(Pages): <https://luvms012-rgb.github.io/yds/> - 첫 화면이 컴포넌트 미리보기
- 로컬 폴더: 회사 `C:\Users\luvms\Desktop\works\ybm-ds`, 집 Mac `~/Works/ybm-ds` (폴더 이름은 예전 이름 그대로)

---

## 1. 폴더 구조

```
yds/                         ← 저장소 루트 (2026-11-04 저장소 이름 ybm-ds → YDS) = Pages 사이트 루트
├─ README.md                 ← 이 문서 (DS 전체 안내)
├─ CLAUDE.md                 Claude 작업 기준 (원칙, 기준 주소, 상시 규칙, 두 PC 싱크). 진행 상황은 적지 않는다
├─ docs/handoff.md           최신 인수인계 1건 (작업 끝에 덮어쓴다, 시작할 때 읽는다)
├─ docs/log.md               지난 작업 기록, 보류, 정리 후보 (필요할 때만 찾아본다)
├─ index.html                컴포넌트 미리보기 (48종, Light/Dark, ?only=43-48로 골라 보기)
├─ components.json           컴포넌트 목록 - CSS 클래스, Figma 노드 ID, 변형 수 (sync가 양쪽과 대조)
├─ sync.mjs                  ◆ 통합 동기화 (Figma ↔ 로컬 ↔ GitHub ↔ 가이드 사이트)
├─ 동기화.bat                 더블클릭 = node sync.mjs deploy (검증 → 커밋 → GitHub 반영)
├─ deploy.config.json        저장소, Pages 주소, 브랜치
├─ dist/                     ← 배포 패키지(2026-10-27 ybm-ds/ → dist/). 서비스는 이 폴더를 가리킨다
│  ├─ ybm-ds.css             진입 파일 (이것 하나만 link) - 아래 5개를 cascade layer로 import
│  ├─ tokens.css             토큰 (⚠ 생성물 - 손으로 고치지 않음)
│  ├─ base.css               리셋, Pretendard @font-face, 포커스 링, reduced-motion, .ds-sr-only
│  ├─ icons.css              Lucide 아이콘 (data URI + mask) .ds-icon
│  ├─ components.css         컴포넌트 48종 .ds-*
│  ├─ utilities.css          .ds-t01~t17, .ds-fw-*, .ds-fg-*, .u-*
│  ├─ ybm-ds.js              공통 인터랙션 (의존성 없음)
│  └─ fonts/                 Pretendard woff2 (CSS 가 쓰는 400/500/600/700 4종만)
├─ tokens/                   ← 토큰 소스와 파생물
│  ├─ figma-variables.json   Figma 변수 전집 스냅샷 = source of truth
│  ├─ build.mjs              스냅샷 → tokens.css + 파생 3종 생성 (Node - Python 불필요)
│  ├─ figma-sync.mjs         Figma ↔ 스냅샷 비교/병합 (sync.mjs가 호출)
│  ├─ design-tokens.json     (생성물) 중첩 JSON
│  ├─ tokens.js              (생성물) JS 객체
│  └─ tailwind.preset.js     (생성물) Tailwind preset - 값은 전부 CSS 변수 참조
├─ .claude/skills/ds-sync/   Claude 용 동기화 절차 ("ds 동기화" 라고 요청하면 이 순서대로 실행)
└─ .claude/skills/yds-figma-draw/   Claude 용 Figma 그리기 절차 (템플릿, 문서 프레임을 사이트와 같게 다시 그릴 때)
```

git에 올리지 않는 것(`.gitignore`): `tokens/.figma-check.js`, `tokens/.figma-result.json`, `tokens/figma-variables.backup-*.json`

### 손으로 관리하는 파일 vs 생성물

| 구분 | 파일 |
|---|---|
| 직접 편집 | `base.css` `icons.css` `components.css` `utilities.css` `ybm-ds.css` `ybm-ds.js` `index.html` `components.json` `sync.mjs` `tokens/build.mjs` `tokens/figma-sync.mjs` |
| 생성물 (편집 금지) | `dist/tokens.css` `tokens/design-tokens.json` `tokens/tokens.js` `tokens/tailwind.preset.js` `tokens/.figma-check.js` |
| 스냅샷 (sync 로만 갱신) | `tokens/figma-variables.json` - 단 `cssOnly` 묶음(글꼴 목록, 모션, z-index, 기준점)은 손으로 고친다 |

---

## 2. 사용법

```html
<!-- 배포 주소에서 바로 (가이드 사이트/외부 시안) -->
<link rel="stylesheet" href="https://luvms012-rgb.github.io/yds/dist/ybm-ds.css">
<script src="https://luvms012-rgb.github.io/yds/dist/ybm-ds.js" defer></script>

<!-- 로컬 작업(works 폴더 안) - 상대경로. 가이드 배포 때 위 주소로 자동 치환된다 -->
<link rel="stylesheet" href="../../../../ybm-ds/dist/ybm-ds.css">
<link rel="stylesheet" href="…/{서비스}.css">       <!-- 서비스 전용은 DS 다음에 -->

<html data-theme="dark">  <!-- 다크 모드(선택). 모드는 Light/Dark 두 가지뿐 -->
```

### Cascade Layers
DS 전체가 `@layer ds.tokens, ds.base, ds.icons, ds.components, ds.utilities` 안에 들어 있다.
레이어 밖에 쓴 서비스 CSS는 선택자 우선순위와 상관없이 항상 DS를 이긴다 → `!important`/선택자 길이 경쟁 불필요.

### 커스텀 규칙
- 서비스는 **컴포넌트 변수(`--ds-*`)만 바꿔서** 커스텀한다. 클래스 신설/`!important` 금지.
  예) `.signup-dialog { --ds-dialog-width: 360px; }`
- 토큰 레이어 중 **팔레트는 YBM 전체 공유**, 서비스는 시맨틱/컴포넌트 층만 덮어쓴다.

### ybm-ds.js가 하는 일 (CSS로 안 되는 것만)
| 기능 | 사용 |
|---|---|
| Dialog 열기/닫기 | `data-ds-open="dialogId"` / `data-ds-close` 속성, 바깥(dim) 클릭 닫기. 네이티브 `<dialog>.showModal()` |
| Snackbar | `DS.snackbar("문구", { tone: "positive"\|"critical", action: "확인", onAction, duration })` - 기본 4초 |
| Slider | `<input type="range" class="ds-slider">` 채움 길이(`--ds-slider-value`) 동기화 |
| Checkbox | `data-indeterminate` → `input.indeterminate = true` |
| Text Field clear | 값 지우기 (노출/숨김은 CSS) |

---

## 3. 동기화 - Figma ↔ 로컬 ↔ GitHub ↔ 가이드 사이트

```
 Figma 변수/컴포넌트
   │  ① node sync.mjs figma → tokens/.figma-check.js
   │     Claude가 use_figma로 실행(읽기 전용) → 결과를 tokens/.figma-result.json에 저장
   ▼
 ② node sync.mjs pull
   ├─ 변수 변경 → figma-variables.json 병합(백업) → build.mjs로 생성물 4종 재작성
   ├─ 컴포넌트 대조 → components.json과 다른 노드/변형 수/목록에 없는 세트 보고
   ├─ 문서 프레임 링크 대조 → 문서 / 코드 링크가 어긋나면 보고 (고치기는 node sync.mjs links)
   ├─ 검증(아래) → 실패하면 멈춤
   ├─ git commit → push → GitHub Pages(1~2분 뒤 반영)
   └─ 가이드 사이트 재배포(project/_publish/publish.ps1) - 가이드는 DS를 Pages 주소로 참조
```

| 하고 싶은 일 | 명령 |
|---|---|
| 전부(Figma → 로컬 → GitHub → 가이드) | Claude에게 **"ds 동기화"** - ①② 를 이어서 실행한다 |
| 로컬에서 고친 CSS를 올리기 | `동기화.bat` 더블클릭 또는 `node sync.mjs deploy "메시지"` |
| 상태만 보기 | `node sync.mjs` (검증, 커밋 안 된 변경, 스냅샷 날짜, 사이트 응답) |
| Figma 문서 프레임의 문서 / 코드 링크 다시 걸기 | `node sync.mjs links` → 만든 `tokens/.figma-links.js`를 Claude가 use_figma로 실행 |
| 토큰만 다시 빌드 | `node sync.mjs build` (또는 `node tokens/build.mjs <날짜> <폴더>`로 다른 곳에 빌드해 diff) |
| 옵션 | `--no-push` 커밋까지만, `--ds-only` 가이드 재배포 생략 |

**검증 항목** (`node sync.mjs verify`, deploy/pull이 매번 실행)
1. 생성물 4종 = 스냅샷으로 다시 빌드한 결과 (tokens.css를 손으로 고쳤거나 빌드를 빠뜨리면 실패)
2. `ybm-ds.css`가 import 하는 파일, `base.css`의 폰트 파일이 실제로 있는지
3. `components.json`의 클래스가 `components.css`에 모두 있는지 (+ 목록에 없는 루트 클래스 경고)

**변수 비교 기준**: 이름, 타입, 모드별 값(색 hex, 숫자, 별칭 이름), description. 스냅샷이 불완전하면(개수 불일치/모드 누락/별칭 미해결) 빌드가 즉시 실패한다.
**컴포넌트 비교 기준**: `components.json`의 노드 ID 존재, 타입, 변형 수, Components 페이지에서 목록에 없는 COMPONENT_SET.

> 처음 한 번: GitHub에서 저장소 `yds`(Public, README 없이) 생성 → Settings → Pages → Branch `main` / root.
> push 인증은 PC의 Git Credential Manager(가이드 배포와 같은 GitHub 로그인)를 그대로 쓴다.

---

### 3.1 검사와 버전 (2026-11-04)

```
node sync.mjs check            전체 검사 (tools/check.mjs). 배포 전에 deploy 가 먼저 돌린다
node sync.mjs check --regen    원본으로 다시 만들어 바뀌는 파일이 없는지도 본다 (GitHub 에 올릴 때 자동으로 돈다)
node sync.mjs check --live     라이브 파일이 로컬과 같은지 (배포 1 ~ 2분 뒤)
node sync.mjs release 1.1.0    새 버전: VERSION, DS 머리 버전, Updates 버전 → 검사 → 배포 → 태그 v1.1.0
```

- 검사 항목: 링크, 사이트 규칙, 템플릿과 예시(site/ai/yds-check.mjs), 마크다운, 싱크(components.json ↔ CSS ↔ README ↔ 사이트), 컴포넌트 9곳, 빌드 경고.
- 버전은 `VERSION` 하나가 원본이다. 서비스는 버전 고정 주소 `https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v버전/dist/ybm-ds.css` 를 쓴다. 최신 주소(`…/ybm-ds/dist/ybm-ds.css`)는 늘 main 이다.
- 버전 올리는 법: 고치지 않던 서비스 화면이 바뀔 수 있으면(부품 크기, 배치, 이름 지움) 가운데 자리(1.**1**.0), 고침과 추가만이면 끝자리(1.0.**1**), 예전 클래스나 토큰을 지우면 앞자리(**2**.0.0). 예전 이름은 지우기 전에 compat 파일로 한 번 이어 준다.
- Updates 에 소식을 먼저 적고(site/src/updates.json 맨 위, 화면이 바뀔 수 있는 것은 type "확인할 변경") release 를 돌리면 그 소식에 버전이 붙는다.

### 3.2 새 컴포넌트 넣기 (9곳)

빠지면 `node sync.mjs check` 의 "6 컴포넌트 9곳" 이 알려 준다.

1. `dist/components.css` - 머리 주석(번호, 이름, 선택지, 마크업, Figma 규격)과 규칙
2. `components.json` - 번호, 이름, 클래스, Figma 노드
3. `index.html` - 미리보기 `<section id="c-번호">`
4. `site/src/figma-notes.json` - lead(한 줄 설명), dos(사용 지침) 또는 README 6.2
5. `site/src/search-ko.json` - 한글로 찾을 낱말
6. `site/src/covers.html` - 대표 그림 `<template data-slug="…">`
7. `site/src/anatomy-ko.json` - 새 부품 이름이면 설명
8. `site/src/examples/*.json` - 실제 쓰임 예시 2 ~ 3개
9. `node site/build.mjs` - 사이트 페이지와 마크다운, AI 파일이 생긴다. Figma 는 최종 검토 때

## 4. Figma 파일 구조

2026-10-27 페이지 구성을 레퍼런스 라이브러리 형식으로 바꿨다. 컴포넌트는 카테고리 페이지에 나뉘고, 컴포넌트마다 문서 프레임 1개(문서 헤더 + 본문)에 담긴다. 본문은 위쪽 "Examples"(속성별 예시 블록 - 마스터 컴포넌트의 인스턴스로만 구성, 문서당 최대 6개) + 아래쪽 "마스터 컴포넌트" 순서다. 컴포넌트 노드 ID는 그대로다.

| 페이지 | ID | 내용 |
|---|---|---|
| Foundations | `2274:1143` | 문서 프레임을 사이트 메뉴 순서로: Color `2486:2`, Elevation `2486:46`, Motion `2609:8`(2026-10-31 추가, Duration / Easing 표), Radius `2486:35`, Spacing `2486:24`, Typography `2486:13` |
| Iconography | `271:2027` | 문서 프레임 `Icon` `2517:2` - 머리말, 예시(크기/색/선형/채움/상태), 안내, 전체 아이콘(라이브러리 프레임 `2416:2`) |
| ----- | | 구분선 |
| Templates | `3059:965` | 사이트 Templates와 같은 분류 9개 섹션(순서는 `site/templates/gen/groups.mjs`). 템플릿마다 COMPONENT "Template/영어 이름" PC 1920x1080 화면. 화면 ID는 `site/src/templates.json`의 `figma.pc`. 그리는 절차는 `.claude/skills/yds-figma-draw/SKILL.md` |
| --- | | 구분선 |
| Action | `2479:7` | Action Button, Chip, Floating Action Button, Menu, Segmented Control, Toggle Button, **Text Link** `2493:324` |
| Chat | `2479:8` | 문서 1개에 **Chat Message Bubble** `2499:6`, **Chat Message Metadata** `2499:18`, **Chat System Message** `2499:25`, **Chat Send Button** `2499:35`, **Chat Composer** `2499:54`. 문서 따로 **Markdown** `2568:66`, **Code Block** `2568:57`, **Citation** `2568:65` |
| Container | `2479:9` | Accordion, Card, **Select Box** `2495:260` |
| Content | `2479:10` | Avatar, Empty, Tag Group, **Timer** `2563:889`, **Image Frame** `2567:1928`, **Carousel** `2567:1936` |
| Data Input | `2479:11` | Checkbox, Date Picker, Field Button, Quantity Picker, Radio Group, Select, Slider, Switch, Text Field, **Time Picker** `2497:979`, **Search Suggestion** `2558:1321`, **File Attach** (Dropzone `2558:1328`, Trigger `2558:1347`, Item `2558:1384`), **Checkbox Group** `2566:1167`, **Multi Select** `2566:1252` |
| Feedback & Status | `2479:12` | Badge, Banner, Callout, Progress, Skeleton, **Result Section** `2562:741` (아이콘 크기 Result Asset `3398:1128`), **Status Dot** `2562:747`, **Rating** `2579:318` (문서 `2579:319`, 2026-10-30) |
| Layout | `2479:13` | Divider, **Scroll Fog** `2567:33`, **Pull To Refresh** `2567:54` |
| Navigation | `2479:14` | Bottom Navigation, Breadcrumbs, Chip Tabs, Pagination, Side Navigation, Stepper, Tabs, **Table Pagination** `2498:1299`, **Top App Bar** `2557:1638`, **Top Navigation** `2557:1648` |
| Overlay | `2479:15` | Bottom Sheet, Dialog, Help Bubble, Snackbar, Tooltip, **Popover** `2494:473`, **Menu Sheet** `2563:1501`, **Side Panel** `2567:862` |
| Table & List | `2479:16` | List, Table |
| --- | | 구분선 |

**굵게** 표시한 10종은 2026-10-27 Figma에 새로 만든 것이다. 2026-10-28 CSS를 만들고 `components.json`과 §6.1 표에 등록했다(49~53번, Text Link는 02번에 Figma ID 추가).

Top App Bar부터 Multi Select 까지(54~71번)는 2026-10-29 Figma와 CSS를 함께 만들었다. 모양과 여백은 레퍼런스 가이드의 같은 부품 규격을 따른다.

새 컴포넌트는 맞는 카테고리 페이지에 문서 프레임을 하나 더 만들어 넣는다. `sync.mjs`의 미등록 점검은 About/Foundations/Icons/Templates/구분선을 뺀 모든 페이지를 본다.

**문서 프레임 링크** - 문서 헤더의 "문서" 는 문서 사이트의 그 페이지(`site/components/{이름}.html`, Foundations와 Icons는 `site/foundations/…`), "코드" 는 GitHub의 그 부품 CSS 구간(`dist/components.css#L시작-L끝`, Foundations는 `dist/tokens.css`의 해당 구획)으로 건다. 한 문서에 부품이 여럿이면 문서 제목과 같은 이름의 부품 페이지로 가고, 코드는 이어진 구획을 한 범위로 묶는다. 줄 번호는 CSS를 고치면 밀리므로 손으로 고치지 않는다. `node sync.mjs figma` 점검이 어긋남을 알려 주고, `node sync.mjs links`로 다시 건다. 새 문서 프레임을 만들 때 머리말의 Documentation / Code 글자 이름을 그대로 두고, `components.json`의 그 컴포넌트에 `doc`(문서 프레임 ID)을 적는다(Foundations와 Icons는 `figmaDocs`). 문서 사이트의 컴포넌트 / Foundations 페이지 머리말에 있는 **Figma / Code 버튼**도 같은 계획(`tokens/links.mjs`)으로 만들어지므로 양쪽이 서로를 가리킨다.

### 변수 컬렉션
| 컬렉션 | 모드 | 변수 수 |
|---|---|---|
| **YDS** (`VariableCollectionId:3:2`) | Light / Dark | 247 |
| Typography | 100% (하나) | 73 |
| Shape | Default (하나) | 9 |
| Elevation | Default (하나) | 30 |

- 2026-10-27 Typography 130%/150%, Shape Soft/Sharp 모드를 지웠다. 모드는 색의 Light / Dark만 남는다(레퍼런스 라이브러리 기본 구성과 같음). 지우기 전 값은 Figma 버전 기록과 git 이력의 `tokens/figma-variables.json`에 있다.

- Figma 변수 이름에는 `color/` 접두사가 없다 (`bg/canvas`, `fg/neutral` …).
- 모든 변수의 Web code syntax = `var(--ds-…)` → Dev Mode 복사본이 그대로 CSS에서 동작.

### 로컬 스타일
- 텍스트 스타일 **136개**: `Scale|Static / t01~t17 / {1 Regular, 2 Medium, 3 SemiBold, 4 Bold}` (예 `Scale/t06/4 Bold`). Typography 변수에 바인딩돼 있어 변수만 바꾸면 전부 반영.
- ⛔ 이펙트/컬러/그리드 로컬 스타일은 **만들지 않는다**. 그림자/색은 변수를 노드에 직접 바인딩.

---

## 5. 토큰

### 5.1 구조 - 3계층
```
PALETTE  --ds-color-palette-*            원시값. 컴포넌트/서비스에서 직접 쓰지 않음
SEMANTIC --ds-color-{bg|fg|stroke|chart}-*  역할. 컴포넌트는 이 층만 참조
COMPONENT --ds-{컴포넌트}-*                 components.css의 각 컴포넌트가 노출
```
- 시맨틱 이름은 반드시 **역할**(neutral/brand/critical/informative/positive/warning/magic)이다. 색 이름(orange 등)을 시맨틱으로 쓰지 않는다.
- 예외: Progress Circle은 팔레트를 직접 참조한다.

### 5.2 네이밍 규약 (`--ds-` 접두사, zero-pad)
`--ds-color-*`, `--ds-space-x*`, `--ds-radius-r*`, `--ds-shape-*`, `--ds-font-size-t0N`, `--ds-line-height-t0N`, `--ds-font-weight-*`, `--ds-font-family-base`, `--ds-elevation-*`, `--ds-duration-*`, `--ds-easing-*`, `--ds-z-*`

### 5.3 팔레트 (104)
gray `00/100~1000`, brand, blue, red, green, yellow, orange, purple `100~1000`, `static-white`/`static-black` + 각 alpha `50~1000`.
다크 모드는 **팔레트 flip**(명도 반전, gray-00=검정). `static-*`만 모드 무관. (brand-1000은 2026-10-27 추가)

#### 브랜드 색 바꾸기 - `palette/brand-100~1000` 한 곳만 고친다
- 브랜드 역할 색(`bg/brand-*`, `fg/brand*`, `stroke/brand-*`, `chart/series-1`)과 컴포넌트는 모두 `palette/brand-*`를 거친다. Figma/CSS 어디에도 브랜드 색 값을 직접 넣은 곳이 없다(2026-10-27 점검).
- 바꾸는 순서: Figma 변수 `palette/brand-100~1000`의 Light 값을 새 브랜드 단계로 바꾸고, Dark 값은 같은 단계를 뒤집어 넣는다(Dark 100 = Light 1000 … Dark 1000 = Light 100) → `node sync.mjs figma` → 점검 결과 반영(`pull`) → 버튼/칩/탭/차트 등 전부 따라 바뀐다.
- 기준 단계: `brand-600` = 주 버튼/링크(`bg/brand-solid`, `fg/brand`), `brand-700` = 눌림/진한 글자, `brand-100~200` = 옅은 배경, `brand-300` = 옅은 선.
- 바뀌지 않는 것(의도): 포커스 링 `stroke/focus-ring`과 안내색 `informative-*`은 blue 팔레트를 쓴다 - 브랜드가 바뀌어도 접근성 표시는 그대로 둔다. 로고 색 `logo/*`도 고정.

#### 테마 - `dist/themes/<이름>.css` (2026-11-03 예시 2종: 든든 `trust`, 선명 `vivid`, 같은 날 사이트에서 숨김, 다시 만들 예정)
- 테마는 브랜드 팔레트, 바탕(`bg/canvas`, `bg/layer-*`), 모서리 노브(`--ds-shape-scale`) 세 가지만 바꾼다(필요하면 제목 글꼴 `--ds-font-family-display`도). 컴포넌트는 고치지 않는다.
- 쓰는 법: DS 다음에 테마 파일을 붙이고 `<html data-ds-theme="trust">`. 토큰이 :root에서 값이 정해지므로 테마는 html 에만 단다(영역 단위 테마 없음). 다크는 테마 파일 안 `[data-theme="dark"]` 블록이 맡는다.
- 사이트 Themes 메뉴에서 테마를 입힌 실제 사이트 화면으로 비교해 볼 수 있다(`site/themes/gen.mjs`, 선명 화면은 `site/themes/vivid.mjs`).

#### 브랜드 - `brands/<브랜드>.json` → `dist/brands/<브랜드>.css` (2026-11-09)
- YDS 는 뿌리 하나만 두고, 브랜드는 YDS 와 다른 값만 적은 파일 하나로 얹는다. 적지 않은 값은 모두 YDS 를 따라가므로 YDS 가 바뀌어도 병합할 것이 없다.
- 쓰는 법: `<html data-ds-brand="브랜드">` 에 `dist/ybm-ds.css` 다음 `dist/brands/브랜드.css`.
- 바꿀 수 있는 값: 브랜드 색(`color` 하나 또는 `palette` 10단계), 브랜드 버튼 위 글자색, 바탕과 면 색, 모서리 배수, 글꼴. 형식은 `tools/brands.mjs` 머리 주석. 부품 구조, 간격, 접근성 규칙은 브랜드에서 바꾸지 않는다. 꼭 필요한 예외는 YDS 선택지로 넣어 모든 브랜드가 함께 쓴다.
- 새 브랜드: `brands/` 에 파일을 더하고 `node tools/brands.mjs`. 생성물은 손으로 고치지 않는다. `node sync.mjs check` 의 "5-2 브랜드" 가 허용 값, 생성물, 글자 대비를 본다(라이트 브랜드 버튼 글자 4.5 미만이나 어느 조합이든 3 미만은 오류, 그 밖의 4.5 미만은 주의).
- YDS 변경의 반영: 화면이 바뀌지 않는 수정은 자동, 화면이 바뀔 수 있는 변경은 Updates "확인할 변경" 으로 적고 `node tools/brand-diff.mjs <브랜드> [기준 태그]` 로 부품별 전후를 비교한 뒤 `node sync.mjs release x.y.z`. 브랜드 파일도 같은 태그로 고정해 쓸 수 있다(jsDelivr `@v버전/dist/brands/...`).

#### AI 용 마크다운 (2026-11-03)
- 사이트의 시작하기, Foundations, 컴포넌트 문서는 같은 주소의 `.md` 로도 나온다(`site/md.mjs`, 빌드 때 생성). 전체 목차 `site/yds.txt`, 전체 한 파일 `site/yds-full.txt` (llmstxt.org 방식, 예전 이름 `llms.txt`, `llms-full.txt` 도 같은 내용으로 남긴다). 각 페이지 제목 아래 Markdown 메뉴에서 링크 복사, 내용 복사. `yds.txt` 끝에는 템플릿 HTML 원본 목록(Templates)과 테마 CSS 목록(Themes)도 붙는다. 시작하기 첫 화면의 AI 요청 문구도 yds.txt를 읽게 한다.

로고 고정색(모드 무관): `logo-ybm-blue #0055a7`, `logo-ybm-red #e83743`, `logo-ybm-gray #7d7d7d`

### 5.4 시맨틱 색

**bg (41)** - `canvas` `layer-default` `layer-floating` `overlay` `disabled` `transparent(-pressed)` /
`neutral` `neutral-weak-pressed` `neutral-weak-alpha(-pressed)` `neutral-muted` `neutral-subtle` `neutral-solid(-pressed)` `neutral-inverted(-pressed)` /
`{brand|critical|informative|positive|warning|magic}-{solid|weak}(-pressed)`

옅은 회색 칸(트랙, 빈 칸, 약한 버튼, 자리 표시)은 `neutral-weak-alpha(-pressed)` 를 씁니다. 반투명이라 흰 바탕, 회색 바탕 어디에 놓여도 보입니다. 불투명 `neutral` 은 어두운 덮개 위에 뜨는 칸에만 씁니다(2026-11-11, 검사 5-1b).

**fg (25)** - `neutral` `neutral-muted` `neutral-subtle` `neutral-inverted` `placeholder` `disabled` /
`{brand|critical|informative|positive|warning|magic}` + `-contrast` /
`on-{brand|critical|informative|positive|warning|magic|neutral}-solid` (solid 배경 위 글자)

**stroke (19)** - `neutral`(기본 테두리) `neutral-weak` `neutral-muted` `neutral-subtle` `neutral-solid` `neutral-contrast` `focus-ring` /
`{brand|critical|informative|positive|warning|magic}-{solid|weak}`

**chart (5)** - `series-1~5` = brand / orange / green / purple / yellow (Light 600~700, Dark 600)

다크 전환: `<html data-theme="dark">` - 팔레트 flip + 대비 보정이 필요한 시맨틱만 재지정(예: `bg/critical-solid` L=red-700 → D=red-600).

### 5.5 Spacing - `x{N}` = N × 4px (27)
20px 이하 2px 반값 스텝, 20~64px 4px 단위, 그 위는 점프. (20px 위의 반값 스텝은 의도적으로 없음)

`x0 0` `x0_5 2` `x1 4` `x1_5 6` `x2 8` `x2_5 10` `x3 12` `x3_5 14` `x4 16` `x4_5 18` `x5 20` `x6 24` `x7 28` `x8 32` `x9 36` `x10 40` `x11 44` `x12 48` `x13 52` `x14 56` `x15 60` `x16 64` `x18 72` `x20 80` `x24 96` `x32 128`, `spacing/x-global-gutter`

Figma의 `dimension/x*` 변수 scopes = `WIDTH_HEIGHT` + `GAP`.

### 5.6 Radius (원시) → Shape (시맨틱)
원시: `r0 0` `r0_5 2` `r1 4` `r1_5 6` `r2 8` `r2_5 10` `r3 12` `r3_5 14` `r4 16` `r5 20` `r6 24` `r8 32` `full 9999`

**컴포넌트는 `--ds-shape-*`만 쓴다** (원시 radius 직접 참조 금지).

| shape | 값 |
|---|---|
| 2xs | r1 4 |
| xs | r1_5 6 |
| sm | r2 8 |
| md | r2_5 10 |
| lg | r3 12 |
| xl | r4 16 |
| 2xl | r5 20 |
| 3xl | r6 24 |
| pill | full |

- 모양 테마(soft/sharp/square)는 2026-10-27에 없앴다. 곡률 노브 `--ds-shape-scale`(기본 1, 0이면 완전 각짐)만 남는다 - 영역에 덮어쓰면 그 안만 바뀌도록 shape 계산은 `:root`가 아니라 `*, ::before, ::after`에서 한다. pill은 항상 원형.

### 5.7 Typography
폰트: **Pretendard** (`"Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`)
웨이트: regular 400, medium 500, semibold 600, bold 700

| 단계 | size / line | 단계 | size / line | 단계 | size / line |
|---|---|---|---|---|---|
| t01 | 11 / 17 | t07 | 20 / 29 | t13 | 40 / 54 |
| t02 | 12 / 18 | t08 | 22 / 32 | t14 | 48 / 62 |
| t03 | 13 / 20 | t09 | 24 / 34 | t15 | 56 / 75 |
| t04 | 14 / 21 | t10 | 26 / 37 | t16 | 64 / 85 |
| t05 | 16 / 24 | t11 | 28 / 40 | t17 | 72 / 96 |
| t06 | 18 / 28 | t12 | 32 / 44 | | |

- Figma Typography 컬렉션은 모드 하나(100%). 130%/150% 확대 모드는 2026-10-27에 지웠다.
- `*-static` 변수/`Static/*` 텍스트 스타일은 `Scale/*`와 값이 같다. 글자 확대와 무관하게 고정해 두고 싶은 자리(내비게이션 라벨 등)를 표시하는 이름으로만 남아 있다.
- 컴포넌트 라벨은 fontSize 변수 직접 바인딩이 아니라 **텍스트 스타일 적용**.
- `body` 기본 = t05, `word-break: keep-all`.

### 5.8 Elevation (그림자)
2겹(key + ambient) 5단계. 기하값은 Figma `Elevation` 컬렉션, 색은 `YDS` 컬렉션의 `elevation/{n}-key|ambient`(다크 모드 자동 대응).

| 단계 | 값 | 역할 별칭 (컴포넌트는 이 이름을 씀) |
|---|---|---|
| 1 | `0 1 2 -1` + `0 1 3 0` | `--ds-elevation-raised` - thumb, 선택된 세그먼트 |
| 2 | `0 2 4 -2` + `0 4 10 -1` | `--ds-elevation-overlay` (+1px stroke/neutral-muted inset) - menu, select, snackbar, tooltip, date picker |
| 3 | `0 2 4 -2` + `0 10 8 0` | `--ds-elevation-panel` - 떠 있는 패널 |
| 4 | `0 4 6 -4` + `0 10 18 -3` | `--ds-elevation-floating` - FAB |
| 5 | `0 8 10 -6` + `0 20 32 -5` | `--ds-elevation-modal` - dialog, alert dialog, bottom sheet |

### 5.9 CSS 전용 시스템 토큰
- Motion (2026-10-29 레퍼런스 가이드 값으로 맞춤): `duration-fast 150ms`(색 바뀜, 누름), `normal 200ms`, `slow 300ms`(시트, 패널 들어오기), `easing-standard cubic-bezier(.35,0,.35,1)`, `easing-emphasized cubic-bezier(.03,.4,.1,1)`(크게 들어오기), `easing-enter cubic-bezier(0,0,.15,1)`, `easing-exit cubic-bezier(.35,0,1,1)`
- Breakpoint: `sm 480`, `md 768`, `lg 1280`, `xl 1440` - 작은 화면부터 쌓는다. `@media` 안에서는 변수를 못 쓰므로 숫자를 직접 쓰고, 숨김/보임은 유틸리티 `.u-hide-from-*` `.u-show-from-*`. 화면이 바뀌는 부품: Top Navigation ↔ Top App Bar, Side Panel ↔ Bottom Sheet는 md(768) 기준, Side Navigation은 lg 펼침 / md 접힘 / md 미만 Drawer
- 모션과 기준점은 Figma 변수로 만들지 않는다(Figma 화면 동작에 연결되지 않음). 원본은 `tokens/figma-variables.json`의 `cssOnly` 묶음이고 손으로 고친 뒤 `node sync.mjs build`
- Z-index: `base 0`, `sticky 100`, `overlay 1000`, `dialog 1100`, `toast 1200`, `tooltip 1300`

---

## 6. 컴포넌트

### 6.1 카탈로그 (Figma ↔ CSS)
CSS는 Figma 프로퍼티 이름을 그대로 `data-*` 속성으로 쓴다: `<button class="ds-btn" data-variant="brandSolid" data-size="large">`.
상태는 가능한 한 네이티브로 표현한다(`:disabled` `:checked` `:focus-within` `[aria-invalid]` `[aria-selected]` `[aria-pressed]` `[aria-current]` `[aria-expanded]`). Figma의 pressed = `:active`(+ 마우스 환경 `:hover`).

#### 같은 기능, 다른 모양 (2026-11-12)
하는 일이 같으면 컴포넌트는 하나다. 모양 차이는 위에서부터 맞는 칸 하나로만 푼다.

| 차이 | 처리 |
|---|---|
| 값(크기, 둥글기, 그림자, 간격, 위치) | 컴포넌트 변수 `--ds-[컴포넌트]-*` 만 덮어쓴다. 새 이름을 만들지 않는다. |
| 구조(부품 위치, 묶는 방식) | `data-layout` 에 이름 붙인 모양 하나를 더한다. 이름은 생김새나 위치로 짓는다. |
| 동작 선택 | 모양과 따로 켜는 속성으로 둔다(`data-autoplay`, `data-loop`). 어느 layout 에서나 같이 쓴다. |
| 하는 일이 다름 | 새 컴포넌트. |

- 속성 이름의 뜻은 고정한다: `data-variant` 강조와 색, `data-tone` 의미 색, `data-layout` 구조, `data-size` 크기.
- layout 은 컴포넌트마다 3개까지. 새 layout 은 머리 주석 마크업, 예시, 사용 지침 한 줄, 구조 그림 이름, Figma Layout 변형, AI 규칙을 함께 갖춘다.
- 서비스 요청은 변수로 되면 서비스 CSS 에서, 두 서비스 이상이 같은 구조를 쓰거나 레퍼런스 가이드에 있으면 layout 으로, 아니면 서비스 CSS 에 둔다.

#### 예시를 더하는 기준 (2026-11-14)
디자인 시스템은 기능(동작, 구조, 상태, 접근성)과 바꿔도 되는 범위를 정한다. 화면마다의 모양은 시안에서 디자이너와 기획자가 그 범위 안에서 정한다.

- 예시는 **동작이나 구조가 다를 때만** 더한다(다른 쓰임, 다른 `data-layout`, 켜는 동작 속성, 다른 상태).
- 크기, 정렬, 색, 모서리처럼 **값만 다르면 예시를 만들지 않는다**. 속성 표나 변수 표에 두고, 언제 쓰는지는 6.2 사용 지침 한 줄로 적는다.
- 컴포넌트마다 기본 예시 하나는 완성도 높게 둔다.
- 시안에서 변수 범위를 벗어난 모양이 필요하면 의견 보내기로 요청하고, 두 서비스 이상에서 반복되면 위 표의 규칙대로 layout 으로 올린다.

| # | 컴포넌트 | CSS | Figma COMPONENT_SET (ID, 변형 수) | 주요 속성 / 컴포넌트 변수 |
|---|---|---|---|---|
| 01 | Action Button | `.ds-btn` | `24:354`, 168 | variant `brandSolid/brandOutline/neutralSolid/neutralWeak/neutralOutline/criticalSolid/ghost`, size `xsmall/small/medium/large`, layout `iconOnly/fill` |
| 02 | Text Link | `.ds-link` | `2493:324`, 2 | size `small`(2026-11-03), 문장 안(p, li)에서는 주변 글자 크기를 따름(2026-11-09), `--ds-link-color(-hover)`, Figma state `enabled/hover` |
| 03 | Field Label | `.ds-field` (`__header/label/indicator/required/footer/help/error/count`) | `109:1367`, 2 | label-weight `bold` |
| 04 | Text Field Input | `.ds-input` (`__control/prefix/suffix/icon/clear`) | `108:1325`, 40 | variant `outline/underline`, size |
| 05 | Text Field Textarea | `.ds-textarea` | `114:1496`, 40 | variant, size |
| 06 | Field Button | `.ds-fieldbutton` (`__affix/__value`) | `1408:2667`, 16 | size `large/medium`, 상태 enabled/disabled/readOnly/invalid |
| 07 | Prefix Select | `.ds-prefixselect` | `2096:852`, 2 | 입력 앞 선택(통신사/국가번호) |
| 08 | Select Trigger | `.ds-select` | `119:1605`, 20 | size |
| 09 | Select Content, Item | `.ds-select-content` `.ds-select-item` | `125:1717`, 2 / `124:1769`, 12 | |
| 10 | Checkbox | `.ds-checkbox` | `61:995`, 40 / Mark `2525:995`, 6 | variant `square/ghost`, tone, size |
| 11 | Radio Group | `.ds-radio-group` `.ds-radio` | `1224:2164`, 16 | tone, size |
| 12 | Switch | `.ds-switch` | `93:1271`, 24 | size `16/24/32`, tone |
| 13 | Quantity Picker | `.ds-quantity` | `1184:2146`, 18 | size, layout `fill` |
| 15 | Chip | `.ds-chip` `.ds-chip-group` | `69:964`, 54 | variant `solid/outlineStrong/outlineWeak`, size, layout `iconOnly` |
| 16 | Chip Tabs | `.ds-chiptabs` (`__trigger`) | `1407:2596`, 4 / Trigger `1407:2522`, 16 | variant `neutralSolid/neutralOutline`, size `medium/large`, inset `none`(2026-11-03) |
| 17 | Tabs | `.ds-tabs` (`__trigger`) | `95:1313`, 4 / Tab Trigger `95:1272`, 12 | layout `fill/hug`, size `small 40 글자 14 / medium 48 글자 16`(2026-11-11), inset `none`(hug 일 때, 2026-11-03) |
| 18 | Segmented Control | `.ds-segmented` | `1239:2152`, 4 / Item `1239:2123`, 6 | layout, size(높이 32/40 고정, 2026-11-03), 선택 배경이 미끄러져 이동(필수 모션, ybm-ds.js) |
| 19 | Toggle Button | `.ds-toggle` | `1244:2164`, 6 | size |
| 20 | Badge | `.ds-badge` | `17:87`, 36 | variant `weak/solid/outline`, tone `neutral/brand/informative/positive/warning/critical`, size `medium/large/xlarge` |
| 21 | Tag Group | `.ds-tag-group` | `1240:2176`, 4 / Item `1240:2135`, 4 | 작성자, 날짜, 조회수 |
| 22 | Avatar | `.ds-avatar` (`__initials` `__status` `__badge`) `.ds-avatar-group` (`__overflow`) | `40:614`, 50 / Status `2357:1206`, 3 / Group `2359:1781`, 21 / Group Overflow `2359:1213`, 7 | size `20/24/36/42/48/56/64/80/96/108`, shape `circle/rounded/square`, status tone `positive/neutral/critical`, group size `20~64` × shape, `+N` |
| 23 | Callout | `.ds-callout` | `1241:2177`, 5 | tone `neutral/informative/positive/warning/critical` (magic은 CSS만) |
| 24 | Snackbar | `.ds-snackbar` | `92:1107`, 3 | tone `positive/critical` |
| 25 | Help Bubble | `.ds-helpbubble` | `75:1233`, 12 | `--ds-hb-arrow-offset` |
| 26 | Menu, Menu Item | `.ds-menu` `.ds-menu-item` (`__label/sub/divider`) | `1246:2183`(COMPONENT) / `1246:2182`, 6 | tone `critical`, `menuitemcheckbox`, `menuitemradio`, 하위 메뉴(2026-11-05) |
| 27 | Dialog | `.ds-dialog` | `1493:939`, 8 (+ Dialog Body Slot `1528:835`) | size(480/800), `--ds-dialog-width` |
| 28 | Alert Dialog | `.ds-alertdialog` | `30:540`, 5 | 272 폭, action `pair/critical/nonpreferred` |
| 29 | Bottom Sheet | `.ds-bottomsheet` | `59:674`, 8 | header-align `center` |
| 30 | Accordion | `.ds-accordion` (`<details>`) | `282:1996`, 12 | layout `separated`, size, inset `none` |
| 31 | Skeleton | `.ds-skeleton` | `1242:2158`, 3 | shape `rect/circle/text` |
| 32 | Slider | `.ds-slider` | `1243:2168`, 4 | tone |
| 33 | Progress | `.ds-progress` | `2163:982`, 4 | size, tone |
| 34 | Progress Circle | `.ds-progress-circle` | `1405:2502`, 18 | tone `neutral/brand/staticWhite`, size, `data-indeterminate` |
| 35 | Floating Action Button | `.ds-fab` | `1406:2468`, 4 | layout `iconOnly`(extended=false) |
| 36 | Date Picker, Date Cell | `.ds-datepicker` `.ds-date-cell` | `1324:2310`, 2 / `1322:2183`, 7 | cell state `today/selected/range-start/range-middle/range-end` |
| 37 | Bottom Navigation | `.ds-bottomnav` | `1348:2383`, 3 / Item `1347:2416`, 12 | 뱃지 `__badge--dot/--count` (bg/critical-solid) |
| 38 | Side Navigation | `.ds-sidenav` | `1371:2610`, 4 / Item `1370:2392`, 8 | expanded 240 / collapsed 56 |
| 39 | Card | `.ds-card` | `2164:1063`, 4 | variant `elevated`(subtle 은 2026-11-04 부터 기본과 같은 모양, 이름만 남김), size(small 모서리 lg), 제목 18/16 |
| 40 | Empty | `.ds-empty` | `2164:1092`, 2 | size |
| 41 | Pagination | `.ds-pagination` | `2163:1067`, 2 / Item `2163:1028`, 16 | layout `simple`, item type `first/prev/next/last/ellipsis` |
| 42 | Table | `.ds-table` `.ds-table-wrap` | `2164:1271`, 2 / Row `2164:1178`, 8 / Cell `2164:1105`, 6 | size `small`, align `center/end`, 두 줄 칸 `__stack`, 묶음 행 `tr.__group`, 체크박스 칸 (2026-11-03 개편: 머리줄 바탕 없음, 행 56/48, 2026-11-11 맨 위와 맨 아래 선 stroke/neutral-weak, 행 사이 stroke/neutral-muted) |
| 43 | Divider | `.ds-divider` | `2347:1152`, 4 | type `thin/thick/vertical/label` (CSS data-weight / data-orientation / data-label), inset |
| 44 | Tooltip | `.ds-tooltip` `.ds-tooltip-anchor` | `2348:1145`(COMPONENT) | placement `top/bottom/left/right`(CSS만), hover/focus 때만 표시 |
| 45 | List, List Item | `.ds-list` `.ds-list-item` | Item `2350:1207`, 4 | size `medium/small`, state, prefix/description/suffix/chevron/divider, list `data-inset` |
| 46 | Breadcrumbs | `.ds-breadcrumbs` | `2348:1149`(COMPONENT) | 현재 항목 `aria-current="page"` |
| 47 | Stepper | `.ds-stepper` (`__step/indicator/label`) | `2351:1211`(COMPONENT) / Step `2351:1210`, 6 | state `complete/current/upcoming`, orientation `vertical` |
| 48 | Banner | `.ds-banner` (`__inner/message/title/action/close`) | `2349:1217`, 10 | variant `weak/solid`, tone 5 |
| 49 | Select Box | `.ds-selectbox` `.ds-selectbox-group` | `2495:260`, 12 | type `check/radio`, state, orientation `horizontal/vertical` |
| 50 | Time Picker | `.ds-timepicker` (`__column/option`) | `2497:979`, 2 | state `enabled/disabled`, 12시간제, 분 간격 5 |
| 51 | Table Pagination | `.ds-tablepagination` (`__size/label/select/range/position/current/total`) | `2498:1299`, 3 | state `default/unknownTotal/empty`, 최소 폭 640 |
| 52 | Popover | `.ds-popover` (`__header/texts/title/desc/close/body/footer`) `.ds-popover-anchor` | `2494:473`, 3 | actions `single/pair/none`, 폭 320 |
| 53 | Chat | `.ds-chat-bubble` `.ds-chat-meta` `.ds-chat-system` `.ds-chat-send` `.ds-chat-composer` | Message Bubble `2499:6`, 2 / Message Metadata `2499:18`, 4 / System Message `2499:25`, 2 / Send Button `2499:35`, 3 / Composer `2499:54`, 2 | sender `assistant/user`, status, 보내기 `send/stop/disabled`, 시스템 줄 layout `divider` |
| 54 | Top App Bar | `.ds-appbar` (`__left/main/title/subtitle/right/button`) | `2557:1638`, 8 / Button `2557:1501`, 6 | theme `ios/android` (CSS `data-platform`), tone `layer/transparent` + gradient, 높이 56 |
| 55 | Top Navigation | `.ds-topnav` (`__left/heading/menu/item/end`) | `2557:1648` / Item `2557:1647`, 4 | 선택은 바탕 없이 진한 글자 + SemiBold, 나머지는 옅은 글자, 오른쪽 끝 버튼은 Action Button xsmall, 내 정보 Avatar 32, 로고 높이 20, `data-layout="center"` 메뉴 가운데 |
| 56 | Search Suggestion | `.ds-search-anchor` `.ds-search-suggest` (`__heading/list/item/content/label/desc/empty`) | `2558:1321`, 3 / Item `2558:1268`, 2 | 입력 칸은 Text Field + search 아이콘, 화살표 키는 ybm-ds.js |
| 57 | File Attach | `.ds-fileattach` (`__dropzone/input/label/items/trigger/count`) `.ds-fileitem` (`__thumbnail/texts/name/size/image/badge/remove`) | Dropzone `2558:1328`, 3 / Trigger `2558:1347`, 3 / Item `2558:1384`, 4 | dragOver는 ybm-ds.js, Item 기본 160×80 / layout `image` 80×80 |
| 58 | Menu Sheet | `.ds-menusheet` (`__header/title/desc/list/group/item/content/label/item-desc/footer/close`) | `2563:1501` / Item `2563:1495`, 8 / Close Button `2563:1500`, 2 | 네이티브 `<dialog>`, Item tone `neutral/critical`, labelAlign `left/center` |
| 59 | Result Section | `.ds-result` (`__asset/texts/title/desc/actions`) | `2562:741`, 2 / Result Asset `3398:1128`, 4 | size `large/medium`, 그림 size `32/40/48/64` |
| 60 | Timer | `.ds-timer` | `2563:889`, 2 | format `clock/elapsed`, 시간 갱신은 ybm-ds.js |
| 61 | Status Dot | `.ds-statusdot` | `2562:747`, 5 | tone 5, 8px, data-pulse |
| 62 | Checkbox Group | `.ds-checkbox-group` | `2566:1167` | 세로 간격 x1, 묶음 이름은 Field Label |
| 63 | Scroll Fog | `.ds-scrollfog` | `2567:33`, 2 | mask로 끝 20 흐림, 흐린 쪽에 여백 20 이상 |
| 64 | Pull To Refresh | `.ds-ptr` (`__indicator/content`) | `2567:54`, 2 | 위 88 영역 Progress Circle 24, ds-refresh 이벤트, DS.endRefresh |
| 65 | Side Panel | `.ds-sidepanel` (`__header/texts/title/desc/close/body/footer`) | `2567:862`, 3 / Close Button `2567:782`, 2 | 네이티브 `<dialog>`, 폭 480/720/960, 왼쪽은 data-direction |
| 66 | Image Frame | `.ds-imageframe` (`__floater/indicator`) | `2567:1928`, 3 | ratio `1:1/4:3/16:9`, radius `none/md/lg/xl`(2026-11-03), stroke |
| 67 | Carousel | `.ds-carousel` (`__scroller/item/button/controls/play/count/all/bar/progress`) | `2567:1936` / Button `2567:1935`, 2 | layout `overlay/bar`, `data-autoplay`, `data-loop`, 넘김 위치 맞춤, 끝 흐림, 버튼은 ybm-ds.js |
| 68 | Markdown | `.ds-markdown` | `2568:66` | 변환된 HTML을 감싸면 크기와 간격이 맞춰짐 |
| 69 | Code Block | `.ds-codeblock` (`__header/language/copy/code`) | `2568:57`, 2 | 고정 폭 글꼴, data-ds-copy 복사, data-wrap 긴 줄 줄바꿈 |
| 70 | Citation | `.ds-citation` (`__icon/label`) | `2568:65`, 2 | type `number/label` |
| 71 | Multi Select | `.ds-multiselect` (`__trigger/values/overflow/panel/heading/option/label`) | Trigger `2566:1252`, 6 / Option `2566:1295`, 6 / Panel `2566:1296` | data-ds-popover로 열기, 고른 값 Badge와 +N |
| 72 | Rating | `.ds-rating` (`__stars/value/count`, 입력형 `__option/control/star`) | `2579:318`, 6 | size `small/medium/large`, `--ds-rating-value` 0~5, `data-input` |
| 73 | Code Input | `.ds-codeinput` (`__cell`) | `2714:1564`, 8 | size `large/medium`, `aria-invalid`, 다 채우면 `ds-code-complete` |
| 74 | Chart | `.ds-chart` (`__header/title/desc/plot/col/bar/label/svg/line/area/axis/donut/total/legend/swatch`) | `2715:1115`, 3 | type `bar/line/donut`, `data-series` 1~5, `--ds-chart-value`, `--ds-chart-height`, `--ds-chart-size` |
| 75 | Description List | `.ds-desclist` (`__item/label/value`) | `2716:376`, 4 | layout `start/top`, columns `2/3`, align `end`, `data-divider`, `--ds-desclist-label-width` |
| 76 | Toolbar | `.ds-toolbar` (`__start/center/end/title/count/separator/clear`) | `2717:624`, 5 | size `medium/small`, variant `plain/muted`, `data-divider`, layout `floating`, 표에 `data-ds-selection`, 좌우 화살표 이동 |
| 77 | Tree | `.ds-tree` (`__node/row/toggle/icon/label/suffix/group`) | `2716:594`, 2 / Item `2716:495`, 12 | size `medium/small`, guides `none`, `aria-expanded`, `aria-selected`, 화살표 키 |
| 78 | Wheel Picker | `.ds-wheelpicker` (`__column/option`) | `2714:1665`, 2 | Time Picker 와 같은 휠, 열 여러 개, `aria-selected`, change |
| 79 | Search Field | `.ds-searchfield` (`__cancel`, 칸은 `.ds-input`) | `2714:1744`, 4 | variant `outline/fill`, 칸은 Text Field, cancel |
| 80 | Date Field | `.ds-datefield` (`__control/picker`, 칸은 `.ds-input`) | `3141:3257`, 4 | 칸은 Text Field, 숫자를 넣으면 점 자동, 달력 버튼은 Date Picker 를 연다 |
| 81 | Lightbox | `.ds-lightbox` (`__bar/count/close/slide/img/caption/nav`) | `3144:1195` | `data-ds-open` + `data-ds-index`, 좌우 화살표 키, 늘 어두운 바탕 |
| 83 | Mega Menu | `.ds-megamenu` (`__inner/group/title/list/link/aside`) | `3143:2639` | 트리거 `data-ds-megamenu` + `aria-expanded`, 768 이상에서만 |
| 84 | Command Palette | `.ds-command` (`__search/input/list/group/title/item/label/kbd/empty`) | `3144:1210` | `data-ds-hotkey="k"`, 거르기, 위아래 화살표와 Enter |
| 85 | Segmented Text Input | `.ds-segmentinput` (`__segment/separator/dots/suffix`, 틀은 `.ds-input`) | `3230:4375`, 20 | size `large/medium`, 가린 구간 `data-masked`, 자리 수를 채우면 다음 구간, 붙여 넣기는 가린 구간 앞에서 멈춤 |

목록의 기계용 사본이 `components.json`이다. 컴포넌트를 추가/변경하면 이 표와 `components.json`을 함께 고친다(sync가 Figma/CSS와 대조).

### 6.2 사용 지침 (Do / Don't)
- **Action Button** - 강조 버튼(High emphasis)은 한 화면에 하나만 사용합니다. 버튼은 3개를 넘게 나란히 배치하지 않습니다.
- **Badge** - 누를 수 없는 표시용 라벨로만 사용합니다. 같은 위치의 상태는 모두 배지로 표시하고, 강약은 색으로만 구분합니다.
- **Segmented Control** - 항목은 2~4개를 사용하고, 한 화면에 하나만 둡니다. 선택하면 선택 배경이 이동하는 모션을 그대로 유지합니다.
- **Switch** - 누르는 즉시 반영되는 설정에만 사용합니다. 저장 버튼이 따로 있으면 Checkbox를 사용합니다.
- **Snackbar** - 4초 동안 표시하고, 한 번에 하나만 띄웁니다.
- **Chip Tabs** - 콘텐츠 분류를 바꿀 때 사용합니다. 화면의 주요 메뉴는 Tabs를 사용합니다. 한 줄 안에서 variant를 섞지 않습니다.
- **FAB** - 한 화면에 하나만 두고, 되도록 라벨을 붙입니다. disabled 상태로 표시하지 않습니다. 사용할 수 없으면 버튼을 숨깁니다.
- **Dialog** - 상단 닫기 버튼과 하단 취소 버튼을 함께 사용하지 않습니다. 하단 주요 버튼은 Action Button large(52)를 사용합니다.
- **Alert Dialog** - 되돌릴 수 없는 작업을 확인받을 때 사용합니다. 바깥을 눌러도 닫히지 않고 버튼으로만 닫힙니다.
- **Menu vs Select** - 동작을 실행할 때는 Menu, 값을 선택할 때는 Select를 사용합니다.
- **Callout** - 앞쪽 아이콘은 채움(Solid) 모양을 사용합니다. 전체를 누를 수 있는 Callout에는 링크 텍스트를 따로 넣지 않습니다. 제목, 본문, 링크는 한 줄로 이어 작성하고, 사이는 두 칸 띄웁니다.
- **Bottom Navigation** - 탭은 3~5개를 사용합니다. 라벨은 한글 5자(영문 10자) 이내로 작성합니다. 아이콘은 채움(Solid) 모양을 사용합니다. 숫자 배지는 동시에 3개를 넘게 표시하지 않습니다. 배지 숫자는 1~99까지 표시하고, 100 이상은 `99+`로 표시합니다. 숫자가 0이면 배지를 숨깁니다.
- **Side Navigation** - 하위 메뉴가 있는 항목은 눌러도 이동하지 않고 펼치기만 합니다. 메뉴는 화면 폭 1280 이상에서 펼치고, 768 이상에서 접습니다. 화면 폭이 768보다 좁으면 서랍(Drawer)으로 전환합니다.
- **Divider** - 마지막 묶음 아래에는 구분선을 두지 않습니다.
- **List Item** - 한 행 안에 누를 수 있는 요소는 3개까지만 둡니다. 행 전체가 링크이면 안에 다른 버튼을 넣지 않습니다.
- **Tooltip vs Help Bubble** - Tooltip은 아이콘 버튼 이름 같은 짧은 라벨에만 사용합니다. Tooltip은 마우스를 올리거나 포커스할 때만 표시되고, 터치 화면에서는 표시되지 않습니다. 닫기 버튼이 필요하거나 설명이 여러 줄이면 Help Bubble을 사용합니다.
- **Banner vs Callout** - Banner는 화면 맨 위에 전체 폭으로 배치하고, 한 번에 하나만 표시합니다. 본문 안의 안내는 Callout을 사용합니다.
- **Breadcrumbs** - 웹 화면에서 깊이가 2단계 이상일 때만 사용합니다. 마지막 항목(현재 화면)은 링크로 만들지 않습니다. 모바일 앱에서는 뒤로 가기 버튼이 있는 헤더를 사용합니다.
- **Stepper** - 단계는 3~5개를 사용하고, 라벨은 짧은 명사로 작성합니다. 단계가 더 많으면 "2 / 6"처럼 텍스트로 표시합니다.
- **Select Box** - 설명이 필요한 선택지가 2~6개일 때 사용합니다. 짧은 선택지는 Radio Group이나 Checkbox를 사용합니다. 한 묶음 안에서 check와 radio를 섞지 않습니다.
- **Time Picker** - 시간 선택이 화면의 주요 기능이면 화면에 바로 배치합니다. 입력 필드에서 선택할 때는 Bottom Sheet 안에 배치하고, Field Button을 눌러 엽니다.
- **Table Pagination** - 데이터 표 아래에서만 사용합니다. 일반 목록에는 Pagination을 사용합니다. 페이지당 행 수 선택지는 3~4개로 제공합니다.
- **Popover vs Dialog** - Popover는 버튼 옆에 뜨는 작은 창이고, 바깥을 누르면 닫힙니다. 화면을 막고 확인받아야 할 때는 Dialog를 사용합니다.
- **Top App Bar** - 모바일 화면마다 하나씩 둡니다. 제목 위치(ios 가운데, android 왼쪽)는 한 서비스 안에서 통일합니다. 왼쪽에는 뒤로 가기나 닫기 버튼을 둡니다. 오른쪽에는 아이콘 버튼을 2개까지 둡니다. transparent는 사진 위에서만 사용하고, gradient를 함께 적용합니다.
- **Top Navigation** - PC 화면에서만 사용합니다. 메뉴는 7개까지 둡니다. 현재 화면이 속한 메뉴에는 `aria-current="page"`를 붙입니다. 화면이 좁아지면 Top App Bar와 메뉴 버튼으로 전환합니다.
- **Search Suggestion** - 검색 필드는 Text Field outline에 search 아이콘과 지우기 버튼을 붙여 만듭니다. 검색 필드에는 `type="search"`와 `role="combobox"`를 붙입니다. 입력 전에는 최근 검색어, 입력 중에는 추천어, 결과가 없으면 안내 문구를 표시합니다.
- **File Attach** - 파일을 끌어 놓는 영역은 PC 화면에만 배치합니다. 모바일에서는 추가 버튼(Trigger)과 파일 항목만 사용합니다. 추가 버튼에는 현재 개수와 최대 개수를 표시합니다. 파일이 최대 개수에 도달하면 추가 버튼을 disabled로 바꿉니다.
- **Menu Sheet vs Bottom Sheet** - 몇 가지 동작 중 하나를 선택할 때는 Menu Sheet를 사용합니다. 입력이나 긴 내용은 Bottom Sheet에 담습니다. 되돌릴 수 없는 동작은 critical로 따로 묶습니다.
- **Result Section** - 신청 완료, 오류, 빈 결과처럼 결과가 화면의 중심일 때 사용합니다. 다음 동작을 안내하는 주요 버튼은 하나만 위에 배치합니다. 보조 동작은 ghost 버튼으로 아래에 배치합니다. 목록이 비어 있다는 짧은 안내에는 Empty를 사용합니다.
- **Timer** - 숫자 폭이 고정되어 있어 값이 바뀌어도 글자 위치가 흔들리지 않습니다. 크기와 색은 배치되는 위치에 맞춰 조정합니다. 시간이 끝나면 `ds-timer-end` 이벤트를 받아 다음 동작을 실행합니다.
- **Status Dot** - 색만으로 뜻을 전하지 않도록 글자와 함께 사용합니다. 프로필 사진 위의 상태는 Avatar의 Status를 사용합니다.
- **로딩 표시** - 로딩은 Progress Circle의 indeterminate로 표시합니다. Spinner 컴포넌트는 따로 없습니다.
- **Checkbox Group** - 서로 관련된 체크박스만 묶습니다. 묶음 이름과 오류 문구는 Field Label로 연결합니다.
- **Scroll Fog** - 흐려지는 쪽에는 20 이상의 여백을 둡니다. 화면 전체 세로 스크롤에는 위 20, 아래 80의 여백을 둡니다.
- **Pull To Refresh** - 최신 내용을 다시 불러오는 목록 화면에만 사용합니다. 텍스트를 드래그해 선택하는 영역에서는 data-disabled로 비활성화합니다.
- **Side Panel vs Bottom Sheet** - PC 화면 옆에 보조 내용이나 필터를 둘 때 Side Panel을 사용합니다. 화면이 좁으면 Bottom Sheet로 전환합니다.
- **Image Frame / Carousel** - 사진은 Image Frame의 비율에 맞춰 꽉 채웁니다. 여러 장을 넘겨 볼 때는 Carousel 항목으로 넣습니다. 터치 화면에서는 이전, 다음 버튼 없이 스와이프로 넘깁니다.
- **Image Frame** - 카드 안 사진은 `data-radius`로 카드 모서리와 맞춥니다.
- **Bottom Sheet** - 안내 한 줄과 버튼만 있는 시트는 `data-header-align="center"`로 제목을 가운데 정렬합니다.
- **Menu Sheet** - 아이콘 없이 짧은 동작 몇 개만 있으면 `data-label-align="center"`로 글자를 가운데 정렬합니다.
- **Pagination** - 카드 안이나 옆 패널처럼 진한 면이 무거워 보이는 곳에는 ghost를 사용합니다.
- **Quantity Picker** - 구매 버튼 옆에서는 버튼과 높이가 같은 large를 사용합니다.
- **Prefix Select** - 테두리 있는 입력 필드에는 medium을 사용해 글자 크기를 필드와 맞춥니다.
- **Badge** - 분류처럼 반복되는 배지는 기본 색 하나로 통일하고, 진한 solid 배지는 새 메뉴처럼 한 곳에만 사용합니다.
- **Chip Tabs** - 제목 아래 영역에 둘 때는 `data-inset="none"`으로 제목과 왼쪽 끝을 맞춥니다.
- **Skeleton** - 여러 줄 글이 들어올 자리는 `data-shape="text"`로 줄 모양을 표시합니다.
- **Snackbar** - 요청이 실패하면 실패 이유를 짧게 적고 다시 시도 버튼을 함께 둡니다.
- **Status Dot** - 표의 상태 열에도 점과 글자를 함께 넣고 가운데 정렬합니다.
- **Text Link** - 체크박스 옆 약관 링크는 라벨 밖에 두어 원문을 열 때 체크 상태가 바뀌지 않게 합니다.
- **Top Navigation** - 로그인한 사용자에게는 오른쪽 끝에 알림 버튼과 내 정보 버튼을 둡니다.
- **Alert Dialog** - 확인 버튼에는 "나가기"처럼 실제로 일어나는 동작을 적습니다.
- **Banner** - 바로 알아야 하는 장애 공지는 critical 톤과 `role="alert"`로 표시하고, 지금 쓸 수 있는 다른 방법까지 안내합니다.
- **Action Button** - 목록 항목마다 두는 버튼은 small 크기의 neutralWeak를 사용합니다.
- **Image Frame** - 흰 배경 사진에는 `data-stroke`로 옅은 테두리를 둘러 화면 배경과 구분합니다.
- **Select Trigger** - 목록 위 정렬처럼 좁은 영역에는 medium을 사용합니다.
- **Tree** - 좁은 영역에서는 연결선 없이 들여쓰기만 사용합니다.
- **Markdown / Code Block / Citation** - AI 답변처럼 서식 있는 글은 Markdown으로 감쌉니다. 코드는 Code Block에 넣습니다. 근거는 번호나 출처 칩(Citation)으로 표시합니다.
- **Multi Select vs Select** - 여러 개를 선택할 때만 Multi Select를 사용합니다. 선택한 값이 많으면 2개까지 표시하고 나머지는 +N으로 줄입니다.
- **Chat** - 상대 말풍선은 왼쪽, 내 말풍선은 오른쪽에 배치합니다. 입력란이 비어 있으면 보내기 버튼을 비활성화합니다. 답변을 생성하는 동안에는 보내기 버튼을 멈춤(stop) 버튼으로 바꿉니다.
- 닫기 버튼(Dialog/Bottom Sheet): 40×40 투명 + 24px `Lucide/x`, 색 `fg/neutral`.

---

## 7. 아이콘

**UI 아이콘은 Lucide만 사용한다.**

### Figma
- Icons 페이지 `271:2027` → 문서 프레임 `Icon` `2517:2` 안 "전체 아이콘" 에 라이브러리 프레임 `2416:2`
- `Lucide/<name>` COMPONENT_SET(Outline + Solid) 1228개 + Outline만 있는 FRAME 466개(선으로만 된 아이콘이라 Solid 불가)
- Outline 선 굵기는 **크기에 비례**한다 - 원본(24px)은 2, 인스턴스는 크기 ÷ 12 (12px 1, 16px 1.33, 20px 1.67, 24px 2). 인스턴스 크기를 바꿀 때는 비율 크기 조절(K)로 바꾸거나 선 굵기를 크기 ÷ 12로 맞춘다. (2026-10-27)
- 예외: 컨트롤 표시(체크박스의 체크와 가로선)는 아이콘 세트를 쓰지 않고 전용 부품 `Checkbox Mark`(Data Input 페이지 Checkbox 문서, 12/14/18px)를 쓴다. 선 굵기는 24 기준 2.75 비율(12px 1.375, 14px 1.6, 18px 2.06)로 굵게 유지하고, CSS `--ds-checkbox-mark`와 같다.
- 컴포넌트에는 **반드시 이 페이지 컴포넌트의 인스턴스**를 쓴다. 벡터 직접 그리기/복제/외부 아이콘셋/detach 금지.
- 색은 인스턴스 내부 `Vector`의 fill/stroke를 `fg/*`로 오버라이드. Solid의 루트 COMPONENT에는 fill을 넣지 않는다(사각형으로 렌더됨).
- 자주 쓰는 ID: `x` `277:3557`, `chevron-right` `277:2216`, `chevron-down` `277:2212`, `plus` `277:3041`, `calendar` `277:2152`, `panel-left` `277:2980`, `house`(Solid) `1365:8053`

### CSS (`icons.css`)
```html
<i class="ds-icon ds-icon--x" aria-hidden="true"></i>
```
- SVG를 data URI로 넣고 `mask`로 그린다 → `file://`에서도 보이고, 색은 부모 `color`를 따른다.
- 크기: 기본 20, `.ds-icon--sm` 16, `.ds-icon--lg` 24, 또는 `--ds-icon-size`
- `:root`의 `--ds-icon-{이름}`을 다른 컴포넌트 CSS에서 mask로 재사용 가능
- 추가: lucide.dev에서 path를 복사해 같은 형식으로 한 줄 추가 - `stroke-width`는 Lucide 원본 그대로 **2**(viewBox 24 기준). 아이콘 크기에 따라 자동으로 비례해 Figma 규칙과 같아진다(20px → 1.67)

현재 수록(51): x, chevron-down/up/left/right, chevrons-left/right, check, circle-alert, circle-check, circle-x, info, triangle-alert, eye, eye-off, external-link, monitor, smartphone, rotate-ccw, menu, minus, plus, search, ellipsis, inbox, calendar, panel-left, file-text, house, id-card, credit-card, globe, arrow-right, arrow-up, paperclip, thumbs-up, thumbs-down, headset, corner-down-right, image, sparkles, message-circle(2026-10-21 가이드 코멘트), Solid: house / info / circle-check / circle-alert / triangle-alert

---

## 8. 유틸리티 (`utilities.css`)
화면 하나에서만 필요한 조정용. 반복되면 컴포넌트/서비스 클래스로 승격한다.

| 분류 | 클래스 |
|---|---|
| 타이포 | `.ds-t01` ~ `.ds-t17`, `.ds-fw-{regular\|medium\|semibold\|bold}` |
| 색 | `.ds-fg-{neutral\|muted\|subtle\|brand\|critical}` |
| 배치 | `.u-flex` `.u-col` `.u-center` `.u-between` `.u-wrap` `.u-grow` |
| 간격 | `.u-gap-{N}` `.u-mt-{N}` `.u-mb-{N}` (N = spacing x 뒤 숫자, 예 `u-gap-5` = 20px) |
| 기타 | `.u-text-center` `.u-full`, `.ds-sr-only`(base.css) |

---

## 9. 접근성 기본값
- 포커스: 키보드 포커스에만 `2px solid stroke/focus-ring`, offset 2px (`:focus-visible`)
- 터치 타깃 40px 이상(아이콘 버튼 44×44)
- `prefers-reduced-motion: reduce`에서 애니메이션/트랜지션 제거
- 아이콘 전용 버튼은 `aria-label` 필수, 장식 아이콘은 `aria-hidden="true"`
- 대비: 글자는 바탕과 4.5:1 이상, 글자 없이 쓰는 아이콘, 포커스 링, 진행 표시 선은 3:1 이상 (비활성 상태는 예외)
- 색만으로 뜻을 전하지 않는다. Banner, Callout, Badge, Alert Dialog 는 상태를 글자로도 말한다
- 겹쳐 열지 않는다: 창 안에 창, Popover 안에 Popover, Carousel 안에 Carousel

---

## 10. 작업 규칙

### 공통
1. 새 UI는 **기존 컴포넌트를 재사용**한다. 중복 제작 금지.
2. 컴포넌트는 **시맨틱 토큰만** 참조한다. 반경은 `shape/*`. 떠 있는 목록 안 항목처럼 상자 안에 상자가 있으면 안쪽 곡률은 "바깥 곡률 - 안쪽 여백"으로 맞춘다(Menu 20 - 4 = 16, Select 20 - 8 = 12, Search Suggestion 12 - 4 = 8).
3. 새 컴포넌트를 추가하면 `components.css`(`.ds-*` + `--ds-*` 변수), `components.json`(`figma` 노드와 `doc` 문서 프레임 ID), `index.html`(미리보기 섹션), 이 문서 §6, Figma `description`을 함께 갱신한다.
4. 토큰을 바꿀 때는 **Figma 변수 → `node sync.mjs figma` → use_figma → `node sync.mjs pull`** 순서. `tokens.css`를 손으로 고치지 않는다.
5. CSS 수정 후에는 `index.html?only=번호`를 브라우저로 렌더해 Figma 스크린샷과 나란히 비교한다.
6. **양방향 동기화** - `ds` 폴더를 고치면 같은 작업 안에서 Figma도 고치고, Figma를 고치면 `ds`도 고친다. 작업 시작 전 `node sync.mjs figma` 점검으로 이미 어긋난 곳이 없는지 확인하고, 끝나면 `node sync.mjs deploy`로 GitHub까지 올린다. 2026-11-06 사용자 "피그마가 수정되면 YDS를, YDS가 수정되면 피그마 자동 수정": 시키지 않아도 한쪽을 고친 작업 안에서 다른 쪽을 맞춘다(변수, 컴포넌트, 문서 프레임, 문서 프레임의 문서/코드 링크는 `node sync.mjs links`). 점검 결과에 차이가 나오면 어느 쪽이 맞는지 정해진 경우 바로 맞추고, 정해지지 않은 것만 묻는다.
7. **Updates 자동 작성** (2026-11-06 사용자 "업데이트 말하지 않아도 자동 업데이트 내용 작성", "피그마에도 같은 씽크로") - DS 의 중요한 시스템 변경이 있을 때만 `site/src/updates.json` 맨 위 그날 날짜에 한 문장씩 더한다(종류 확인할 변경, 새 컴포넌트, 새 기능, 바뀐 것 / 영역은 DS 하나, 쉬운 말 한 문장). 2026-11-09 사용자 지시로 사이트(문서, Get Started, AI 문서, 안내 문구)와 템플릿 소식은 담지 않는다. 새 컴포넌트, 토큰, 브랜드 구조, 서비스 화면이나 쓰는 법이 달라지는 변경이 해당되고 작은 모양 수정은 적지 않는다. Figma Updates 페이지는 2026-11-09 사용자 지시로 지웠다. 작업 기록, 검수만 한 것, 되돌린 것은 적지 않는다.

### Figma
1. 정식 COMPONENT_SET, 변형 이름은 `축=값`(소문자 시작 camelCase 값). 프로퍼티는 TEXT / BOOLEAN / INSTANCE_SWAP.
   - 프로퍼티 쌍 관행: `prefix icon`(BOOLEAN) + `prefix`(INSTANCE_SWAP).
   - INSTANCE_SWAP 기본값은 컴포넌트 key가 아니라 **노드 ID 문자열**.
   - 변형마다 다른 기본값이 필요한 슬롯은 프로퍼티로 만들지 않는다(프로퍼티 기본값은 세트 전역).
2. 새 변수는 Web code syntax `var(--ds-…)`와 scopes를 반드시 지정한다.
3. 변수/텍스트 스타일 삭제 전에는 전체 노드의 `boundVariables` / `textStyleId`를 스캔해 사용처 0건을 확인한다.
4. 로컬 스타일은 **텍스트 스타일만**. 이펙트/컬러/그리드 스타일 금지.
5. 대량 작업은 소수 샘플 → 스크린샷 비교 → 승인 후 일괄.
6. 컴포넌트 섹션 배치: 박스 안쪽 여백 32, 변형 간격 80, 세트 사이 240.
7. 문서/설명/코드 어디에도 외부 레퍼런스 DS의 이름/출처 링크/비교 문구를 넣지 않는다.

### Plugin API 함정 (자주 걸리는 것)
- 텍스트를 건드리거나 노드를 옮기기 전에 Pretendard Regular/Medium/SemiBold/Bold를 모두 `loadFontAsync`. 스타일 문자열은 `SemiBold`(공백 없음).
- 알파 있는 색 변수를 별칭의 별칭으로 paint에 바인딩하면 alpha가 적용되지 않을 수 있다 → 최종 alpha를 `paint.opacity`에 직접 넣는다.
- TEXT 프로퍼티를 붙이면 range 서식(부분 Bold/밑줄)이 초기화된다.
- 인스턴스 `setProperties` 키는 `label#1407:2`처럼 접미사가 붙은 실제 키.
- `resize()`는 sizing mode를 FIXED로 되돌린다 → hug가 필요하면 resize 후 다시 `AUTO`.
- 섹션은 자동으로 커지지 않는다 → `resizeWithoutConstraints`. 섹션 자식 좌표는 섹션 기준.
- `figma.union/subtract`는 page 직속에서 수행 후 옮긴다(부모 안에서 하면 좌표 이중 적용). `flatten()`은 clone에 시도.

---

## 11. 미구현 / 남은 항목
- 미구현 컴포넌트(다음 차례): Aspect Ratio, Number Input
- AI/학습 서비스용 묶음(채팅 말풍선/입력창/Markdown/Code Block/출처 표시) - magic 시맨틱을 쓸 첫 컴포넌트 후보
- 서비스별 brand 색 교체 층(`data-brand`), motion 토큰의 Figma 변수화
- Callout magic tone, pressed 변형(Figma), magic 시맨틱을 쓰는 컴포넌트 없음
- 시맨틱 텍스트 스타일(화면 제목/본문/주석 등 역할 이름) 미구현

---

## 12. 변경 이력 (주요)
| 날짜 | 내용 |
|---|---|
| 2026-10-29 | 54 Top App Bar(+ Button), 55 Top Navigation(+ Item), 56 Search Suggestion(+ Item), 57 File Attach(Dropzone/Trigger/Item)를 Figma와 CSS에 함께 추가(레퍼런스 가이드 규격 기준). 아이콘 `upload`, `clock` 추가 |
| 2026-10-29 | 58 Menu Sheet(+ Item, Close Button), 59 Result Section, 60 Timer, 61 Status Dot 추가. 로딩 표시는 Progress Circle indeterminate로 대신(Spinner 없음). 아이콘 `share`, `link`, `trash` 추가 |
| 2026-10-29 | 62 Checkbox Group, 63 Scroll Fog, 64 Pull To Refresh, 65 Side Panel, 66 Image Frame, 67 Carousel, 68 Markdown, 69 Code Block, 70 Citation, 71 Multi Select 추가(레퍼런스 가이드 규격 기준). 아이콘 `copy` 추가 |
| 2026-10-29 | 반응형 기준점(sm 480 / md 768 / lg 1280 / xl 1440)과 숨김/보임 유틸리티 추가, 모션 값을 레퍼런스 가이드 값으로 맞추고 easing-enter / exit 추가, sync pull이 cssOnly를 지우던 문제 수정 |
| 2026-10-30 | 문서 사이트(site/) 첫 버전: Get Started / Components 70종 / Templates 9종, 생성기 `node site/build.mjs`. Code Block에 data-wrap 추가 |
| 2026-10-30 | Segmented Control 선택 배경 미끄러짐 모션을 hug, fill 모두에 적용(ybm-ds.js가 위치 계산, 누르면 aria-pressed와 change 이벤트) |
| 2026-10-28 | Figma 에만 있던 10종 CSS 완성과 등록(49~53), Popover/Time Picker/Chat 입력창 동작 |
| 2026-10-27 | Figma 페이지를 레퍼런스 라이브러리 형식(카테고리 페이지 + 문서 프레임)으로 개편, 새 컴포넌트 10종(Figma만). 모드 정리 - Typography 130%/150%, Shape Soft/Sharp 삭제, CSS의 `data-shape` 테마(soft/sharp/square) 제거. 남은 모드는 Light / Dark |
| 2026-10-22 | ds를 단독 GitHub 저장소(ybm-ds) + Pages로 분리, 가이드 사이트에서 DS 사본 제거(DS 주소 참조). 통합 동기화 `sync.mjs`/`동기화.bat`/`components.json`(Figma 노드 대조) 도입. `build.py` → `build.mjs`(출력 동일, Python 불필요). 컴포넌트 6종 추가(Divider/Tooltip/List/Breadcrumbs/Stepper/Banner - CSS/Figma 동시). 미리보기 `index.html` |
| 2026-10-21 | 폴더 재구성(`ds/` 루트 = `ybm-ds/` + `tokens/`). 명칭 **YBM Family → YBM** 일괄 변경 - Figma 컬렉션 `YBM Family DS` → `yds`, 코드/주석/생성물 전부 |
| 2026-10-20 | 외부 레퍼런스 DS 관련 문구 전면 제거. figma-sync 파이프라인 도입 |
| 2026-10-02 | components.css 전 컴포넌트를 Figma 변형별 실측과 재정합. 로컬 스타일은 텍스트만 허용 |
| 2026-09-29 | lineHeight 전 단계 +2 |
| 2026-09-14 | 텍스트 스타일 전 단계 4웨이트(136개), t15~t17 추가. 이펙트 스타일 삭제 → 변수 직접 바인딩. `stroke/neutral` 신설 |
| 2026-09-09 | Elevation 2겹 5단계 개편, `chart/series-1~5` 신설, yellow 팔레트 교체 |
| 2026-09-04 | Shape 테마(기본/soft/sharp) + 곡률 노브 |
| 2026-08-27 | warning 시맨틱 orange로 통일, 색 이름 시맨틱(orange-*) 삭제 |
| 2026-08-24 | Spacing 26단계 확장, Progress Circle, FAB, Chip Tabs, Field Button 추가 |
| 2026-08-19 | `--ds-` 네이밍 통일, Lucide Solid 445개 자동 생성 |
