# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-14 집 Mac
- 시작: `git pull` 뒤 이 파일을 읽는다. 지난 기록은 [log.md](log.md) 에서 필요할 때만 찾는다.

## 한 것

- **예시 2차 정리, 복사 버튼, 템플릿 주석 (11-14 집)**: ① 사용자 "전수 검사해서 예시 기준으로 반영": 같은 구조와 동작에 내용이나 자리만 다른 예시와 값만 다른 예시 39개를 더 뺐다(206 → 167, Carousel 3개). 빠진 규칙 13줄은 README 6.2 로. 뺀 목록과 판단 기준은 site/CLAUDE.md "컴포넌트 예시는 동작이나 구조가 다를 때만". ② 문서 보기 머리의 "AI 요청 글 복사" 버튼을 뺐다(탭 안 복사만). ③ 템플릿 HTML 맨 위 지침 주석을 뺐다(kit.mjs `page()`, 원문은 kit.mjs `PRINCIPLE` 과 site/CLAUDE.md). **Figma 는 아직**: 1차 12개, 2차 39개 예시가 빠진 문서 프레임과 새 지침 19줄 맞추기가 남은 일 0-1 이다(편집 가능한 계정에서).
- **템플릿 문서 보기에 AI 요청 글 탭 (11-14 집, 사용자 문구 그대로)**: 미리보기 | 코드 | AI 요청 글. 글의 정본은 site/build.mjs `TPL_PROMPT`("[내가 원하는] 화면", 템플릿 주소, "템플릿은 출발점이야" 문장). 머리의 "AI 요청 글 복사" 버튼은 탭에 보이는 글을 그대로 복사한다(남겨 둠, 빼려면 build.mjs 머리 버튼 줄에서 지운다). 되돌리기: 이 커밋만 revert.
- **템플릿 카드는 문서 보기로 바로 (11-14 집, 사용자 요청)**: 목록 카드와 "문서 보기" 버튼을 누르면 보기 창 대신 문서 보기 페이지로 간다. AI 요청 글 복사는 문서 보기 머리로 옮겼고, 예전 `?preview=` 주소는 문서 보기로 넘긴다. **되돌리기**: site/src/site.js `TPL_VIEWER` 를 true 로 바꾸고 build.mjs 의 카드 버튼 글자를 "미리보기" 로(또는 이 변경 커밋만 revert).
- **메인 요청 글: 상자 하나에 요청 하나, 먼저 묻기 (11-14 집, 레퍼런스 A 시작하기 비교, 사용자 "1, 2 진행, 원복할 수 있으니 염두")**: AI와 함께 시작하기의 상자 3개(새 화면 만들기, 운영 중인 페이지에 적용하기, 브랜드 만들기)마다 요청을 하나로 줄이고, 끝에 "먼저 묻기" 한 줄(정해지지 않은 것은 먼저 묻고, 첫 결과를 보여 준 뒤 계속)을 더했다. 바꾼 곳은 site/build.mjs `AI_EXAMPLES` 와 그 출력 한 줄뿐이다. **되돌리기**: 이 변경은 커밋 하나로 따로 올린다. 되돌릴 때는 그 커밋(4384cd3b)만 `git revert 4384cd3b` 하고 `node site/build.mjs`, 배포. 예전 글(한 상자에 요청 2~3개)은 커밋 a42bd197 의 site/build.mjs 에 있다. 템플릿 보기 창의 "AI 요청 글 복사"(site.js copyPrompt)에는 먼저 묻기를 아직 넣지 않았다.
- **Updates 요청 탭 (11-14 집, 사용자 "요청 현황 공개, 추천대로")**: Updates 에 소식 / 요청 탭. 목록은 `site/src/requests.json`(실제 요청 5건으로 시작). 운영 방법은 site/CLAUDE.md "Updates > 요청 탭". 같은 대화에서 정리한 사내 확산 방향(사용자와 합의, 아직 안 만듦): ① 토큰 대조표(쉬운 말 / Figma 이름 / 코드 이름 / 견본, 말하는 규칙 세 줄) ② 하려는 일 카드 6개(이벤트, 공지, 시험 접수, 회원가입, FAQ, 서비스 메인 → 템플릿 보기 창 → AI 요청 글 복사) ③ 적용 사례 ④ 브랜드 등록 절차 ⑤ 디자이너 역할 경계(기획자는 템플릿으로 초안, 디자이너는 검토와 새 흐름, 새 컴포넌트, 캠페인 화면). 검사 페이지는 사용자가 어렵다고 해서 뺐다.
- **컴포넌트 예시 기준과 정리 (11-14 집, 사용자 "디자인 시스템은 기능 중심으로 정의하고 시안에서 디자이너나 기획자가 수정", "이 방향성 기준으로 전체 검토", "정리 진행")**: README "예시를 더하는 기준" 절을 더했다(예시는 동작이나 구조가 다를 때만, 값만 다르면 속성 표, 변수 표, 6.2 사용 지침 한 줄). 예시 218개를 검토해 값만 다른 12개를 뺐다(206개): Accordion large, Empty small, Prefix Select medium, Quantity Picker large, Bottom Sheet 제목 가운데, Menu Sheet 가운데, Pagination ghost, Progress neutral, Progress Circle staticWhite, Image Frame 모서리, Skeleton 모서리, Carousel 스와이프. 지침이 없던 6개 규칙은 README 6.2 에 한 줄씩 옮겼다(Image Frame, Bottom Sheet, Menu Sheet, Pagination, Quantity Picker, Prefix Select). 구조나 플랫폼이 다른 예시는 남겼다. 사이트 빌드와 검사 통과. **Figma 는 못 맞췄다**: 집 Mac 의 Figma 커넥터가 편집 권한 없는 계정(jincc)이라 막혔다. 남은 일 0-1.
- **Badge xlarge 와 크기 변수 (11-13, YBM Family 세션 요청 "PC 14px 미만 금지라 Badge 를 못 씀")**: data-size="xlarge" (높이 28, 좌우 x2_5, shape/sm, t04 Medium, 아이콘 16). 크기 변수 --ds-badge-height, -padding-x, -radius, -font-size, -line-height, -icon (알약은 --ds-badge-radius: var(--ds-shape-pill)). medium, large 는 픽셀 비교로 변화 없음. README, components.json(size 값), Updates. 미배포면 사용자 승인 뒤 배포하고 YBM Family 세션에 알린다.
- **Result Section 글자 위계와 여백, 아이콘 크기 (11-13, 사용자가 Figma 미리보기 2753:2227 에서 고친 값 "이 기준으로 ds 전면 수정", "아이콘 크기 조절이 안되는데 추가", "최종 치환까지")**: large 제목 t08 → t09, 글자 사이 x3 → x1, 글자 아래 x7 → x5, 버튼 사이 x5 → x3, 아이콘 40 → 48. medium 은 사용자가 고치지 않아 위계가 뒤집히지 않게 글자 사이 x1, 글자 아래 x4, 버튼 사이 x3, 아이콘 40 으로 맞췄다(다르면 사용자에게). 아이콘 크기 선택 `.ds-result__asset[data-size="32|40|48|64"]`, 변수 --ds-result-icon. Figma: Result Section 세트 두 변형 값과 변수 연결, 새 세트 Result Asset `3398:1128`(size 32/40/48/64, icon 바꾸기 속성, 세트 안에 노출된 인스턴스라 Result Section 인스턴스 패널에서 크기를 고른다), 떼어 낸 미리보기를 인스턴스로 바꿈, 문서 프레임 사용법, 규격 글, 속성 표 asset size 줄, Property - asset size 칸, 59번부터 코드 링크 줄 번호. 다른 변수와 컴포넌트는 Figma 와 코드가 같았다(가벼운 점검 일치).
- **왼쪽 메뉴 점 (11-13, 사용자 "업데이트도 표시")**: Updates 소식에 이름이 나온 컴포넌트에도 7일 동안 같은 빨간 점(aria-label 바뀐 컴포넌트). 남은 일 4번의 점 규칙을 이것으로 대신한다.
- **Top Navigation 정리 (11-12 밤, 사용자 캡처 "아바타가 너무 커", "선택 메뉴 bg 삭제", "선택되지 않은 메뉴 옅게", "로고 너무 커", "가운데 정렬 추가") - 배포함(16a27546, 8d4e0209)**: 선택 메뉴는 바탕 없이 fg/neutral + SemiBold, 나머지 메뉴는 fg/neutral-subtle, hover 는 bg/transparent-pressed + fg/neutral. 오른쪽 끝 내 정보 Avatar 는 32(`.ds-topnav__end > .ds-avatar`, 로그인 버튼 xsmall 32 와 같은 높이). 로고 높이 28 → 20(메뉴 글자 14 보다 조금 크게, 사용자가 준 레퍼런스 비율). 새 선택지 `data-layout="center"`: 메뉴를 막대 가운데에 두고 로고는 왼쪽, 버튼은 오른쪽(grid 1fr auto 1fr, `__left` 는 display: contents 라 마크업은 그대로). 예시 로고는 배움터 대신 YBM NET 공식 로고(절대 주소 `site/assets/logo-ybmnet.svg`, 68x20), 예시 "메뉴를 가운데에 두기" 추가, Updates 11-12 새 기능 한 줄, README 6.1 표, components.json props. Figma: Top Navigation Item 세트 2557:1647 네 변형(선택 바탕 없음, 기본 글자 fg/neutral-subtle, hover 글자 fg/neutral), 템플릿 상단 막대 선택 메뉴 23곳 바탕 지움과 나머지 96곳 옅은 글자, 템플릿 상단 아바타 26개 36 → 32, 문서 프레임 2557:2397 예시 3개 다시 그림(세 번째 예시 칸 새로 만듦, 로고는 PNG 로 넣음, 아바타는 Avatar 인스턴스 32), 예시 제목과 설명을 사이트 글로, 예시 코드와 규격 글 새 값, 코드 링크 줄 번호. Top Navigation 컴포넌트 2557:1648 에는 center 변형을 두지 않았다(문서 예시로만 그림, 필요하면 변형 추가). 로고 자리 88x28 은 사이트 대표 그림과 같은 자리 표시라 그대로. 점검: 변수 359, 컴포넌트 117, 링크 170, 템플릿 84 일치.
- **Figma 싱크 (11-12 저녁, 사용자 "피그마 씽크 계속 진행")**: 아래 남은 일 1번을 끝냈다. 코드 링크 77곳, 속성 이름 정리(세트 10개 변형 이름, 문서 프레임 코드 예시와 속성 표), Text Link, Carousel 문서 프레임 다시 그림, 아이콘 표 play-solid / pause-solid. 코드 쪽 남은 예전 이름(Table, List, Progress Circle 규격 주석, Table 사용 지침)도 줄 수 그대로 고쳐 배포. 변수 359, 세트 118, 템플릿 84 일치. 자세한 것은 log.md.
- **같은 기능, 다른 모양 규칙과 속성 이름 정리 (11-12 오후, 사용자 "모든 컴포넌트에 적용", "A 전부 진행") - 배포함(221b77b6)**: README 6.1 앞에 규칙 절(값은 컴포넌트 변수, 구조는 `data-layout`, 동작은 따로 켜는 속성, 하는 일이 다르면 새 컴포넌트, `data-variant` 강조와 색 / `data-tone` 의미 색 / `data-layout` 구조 / `data-size` 크기)과 AI 규칙 한 줄(build.mjs)을 넣었다. 84개 점검 결과는 [layout-audit.md](layout-audit.md). 그중 A 11건 이름을 바꿨다: Snackbar `data-tone`(JS `{ tone }`), Pagination `data-layout="simple"`, File Attach 항목 `data-layout="image"`, Toolbar `data-layout="floating"`, Accordion `data-layout="separated"`, List `data-inset`, Select Box `data-orientation="vertical"`, Action Button `data-layout="fill"`, Table `data-size="small"`, Progress Circle `data-indeterminate`, Chat 시스템 줄 `data-layout="divider"`. CSS 는 `:is(새 이름, 예전 이름)` 이라 예전 마크업도 그대로 보이고, ybm-ds.js 도 예전 `variant` 를 받는다. 예시, 대표 그림, 구조 그림, 루트 index.html, 템플릿 생성기, site.js, README 표, components.json, tools/check.mjs 선 색 검사 선택자까지 바꿨다. 템플릿 6종을 예전/새 마크업으로 캡처해 픽셀 비교, 화면 변화 없음. Updates 한 줄 더함. Updates 페이지는 항목마다 첫 문장만 그려서 오늘 Carousel 소식 5줄이 사이트에 안 보이던 것을 찾아, 문장마다 항목을 나눴다(updates.json 한 항목 = ["DS", 문장 하나]). 빌드와 `node sync.mjs check` 통과.
- **Carousel 진행 막대 줄 다시 (11-12, 사용자 캡처 "‹ 05 | 23 › ‖")**: 번호를 두 자리로 이전과 다음 사이에 두고 멈춤 버튼 바탕을 없앴다. 1ef61744 배포, YBM Family 세션에 적용 요청함.
- **87 Price 도 YDS 에서 뺌 (11-12 밤, 사용자 "오늘 추가한 프라이스 삭제")**: 86, 88 과 같은 방식이다. 번호 87 은 비워 둔다. 등록 9곳(components.css 구간과 머리 목록 줄, components.json, 루트 index.html 예시, README 6.1 표, sync.mjs, 예시 part5, 사용 지침과 분류 figma-notes, 찾기 낱말 search-ko, 대표 그림 covers, 구조 그림 anatomy-figures), Updates 11-12 의 Price 소식, site/components/price.html, price.md 를 지웠다. 템플릿 가격 표시(장바구니, 빈 장바구니 추천, 상품 상세, 요금제, 구독 설정)는 Price 를 넣기 전 템플릿 전용 모양(`tp-price`)으로 되돌렸다(c0e5ebd1 의 생성기 변경만 거꾸로 적용). Figma 는 Price 세트 3336:3081 과 문서 프레임 3336:2905 를 지우고, Price 인스턴스가 있던 템플릿 5쪽을 사이트 기준으로 다시 그렸다(사진 20장, 바탕 bg/canvas, 넘침 0, 글자 대조 일치). CSS 머리 목록 한 줄이 빠져 코드 링크 77곳을 한 줄씩 당겼다. 점검: 변수 359, 컴포넌트 117, 링크 170, 템플릿 84 일치.
- **86 Section Header, 88 Stat 은 YDS 에서 뺌 (11-12, 사용자 "범용 컴포넌트(yds)에서만 삭제")**: 같은 날 함께 만들었다가 지웠다. 번호 86, 88 은 비워 둔다. 템플릿 머리글과 수치 카드는 예전 템플릿 전용 모양(`tp-sec-head`, `tp-kpi`, `tp-delta`, kit.mjs)으로 되돌려 새 컴포넌트를 넣기 전과 같다. Figma 는 두 세트와 문서 프레임을 지우고 템플릿 안 인스턴스 55개를 일반 프레임으로 풀었다. CSS 줄이 밀려 코드 링크 78곳을 다시 걸었다. 점검: 컴포넌트 118, 템플릿 84, 끊긴 인스턴스 0.
- **Text Link 화살표 링크 (11-12, YBM Family 세션 요청)**: 링크 끝에 아이콘(chevron-right 등)을 넣으면 inline-flex, 사이 x1, 아이콘 16(small 14), 밑줄 없음(`.ds-link:has(> .ds-icon)`). 사용 지침 Do/Don't, 예시 "그룹 제목 옆 전체 보기", AI 규칙 링크 줄, Updates 에 넣음. Figma 는 아직(아래 남은 일).
- **Carousel 큰 배너 (11-12, 이동 버튼은 원형 하나로 통일, 네모 변형은 사용자 지시로 뺌, YBM Family 세션 요청, 사용자 "캐러셀 고도화")**: `data-autoplay="5000"` 자동 넘김(끝에서 처음으로, 마우스 올림/포커스/멈춤 버튼에 멈춤, 움직임 줄이기면 멈춘 채 시작), `.ds-carousel__controls` 안 `.ds-carousel__play`(멈춤/재생 라벨과 아이콘 바꿈) + 번호 버튼(`button.ds-carousel__count`, 지금 번호 strong, plus 아이콘, `data-ds-open` 으로 Dialog, 비어 있는 `.ds-carousel__all` 을 ybm-ds.js 가 항목 복사로 채움, 1열, 768 부터 2열). 서비스 맞춤 변수 --ds-carousel-button-size/-radius/-shadow/-inset, -control-size, -count-font-size, -count-padding, -controls-x/-y, -play-icon-size(기본 12, 소수점 크기는 뭉개져 정수로). 멈춤 버튼 아이콘은 채운 모양 pause-solid / play-solid(icons.css 새 아이콘, 아이콘 가이드 편집 묶음, ybm-ds.js 는 -solid 를 쓰면 -solid 끼리 바꿈). 끝없이 넘기기 data-loop(앞뒤 복제 2장 aria-hidden, inert, 멈추면 진짜 장으로 순간 이동, 번호/막대/전체 보기는 진짜 장만, 처음/끝 표시 안 붙임, 큰 배너 예시에 적용). 진행 막대 모양 data-layout="bar"(.ds-carousel__bar 안에 .ds-carousel__progress + controls 안 이전, 번호 05 | 23(span .ds-carousel__count, JS 가 두 자리와 .ds-carousel__total), 다음, 멈춤(바탕 없음, 사용자 캡처 기준), 막대는 지금 번호까지 채움, 막대 안 이동 버튼은 끝에서 반대쪽 끝으로). 사용 지침 "자동으로 넘기지 않습니다" 는 "큰 배너에만, 멈춤 버튼과 함께" 로 바꿈, 예시 "큰 배너를 자동으로 넘기기", AI 규칙 캐러셀 줄, Updates.
- **운영 구조 정리 (11-12)**: 루트 CLAUDE.md 의 "3. 진행 상황" 을 글자 그대로 docs/log.md 로 옮겼다. CLAUDE.md 는 원칙, 기준 주소, 상시 규칙, 두 PC 싱크, 작업 규칙만 남겼다. 인수인계는 이 파일 하나에 최신 1건만 둔다. site/CLAUDE.md 는 바뀐 옛 값 40줄을 log.md 끝으로 옮기고 지금 값만 남겼다(Get Started, Updates 는 지금 구성으로 다시 씀). Figma 그리기 절차는 새 스킬 `.claude/skills/yds-figma-draw` 에 있다. 섞여 있던 줄(배치 묶음, 왼쪽 메뉴, Themes, Foundations, 템플릿 묶음 기록)도 사용자 답변대로 지금 값만 남겼다.
- **싱크 점검 (11-12 밤, Price 삭제 뒤)**: 저장소와 Figma 모두 일치. 변수 359, 컴포넌트 117, 문서와 코드 링크 170, 템플릿 화면 84.
- **Figma Templates 바탕 (11-12)**: 템플릿 84개의 화면 바탕을 bg/canvas 로, 섹션 9개 바탕을 bg/layer-default 로 바꿨다. 사이트 템플릿(흰 바탕)과 다른 Figma 보기용 차이다.
- **Figma 템플릿 싱크 (11-12 새벽)**: Templates 페이지를 분류 9개로 다시 묶고 새 10쪽과 바뀐 화면을 다시 그렸다. Figma 화면이 없는 템플릿 0.
- **레벨 테스트 (11-11)**: 문항에 집중하는 전체 화면으로 다시 짰고, 듣기 플레이어는 재생 버튼, 진행 막대, 시간 한 줄이다.

- 11-13 폼 필드 바탕을 투명에서 bg/layer-default 로(components.css, 소식 한 줄, 사이트 대표 그림 덮어쓰기 2줄 지움). 배포 전.

## 남은 일 (순서대로)

0-2. 사내 확산 다음 단계(사용자 지시 대기): 하려는 일 카드 6개는 구성, 위치(구조 위 또는 아래), 제목 여부를 사용자에게 물어 둔 상태. 토큰 대조표, 디자이너 역할 경계 문구도 사용자 결정 대기.
0-1. Figma 문서 프레임 예시 맞추기(11-14 예시 정리 1차 12개 + 2차 39개, 지침 19줄. 컴포넌트 목록은 site/CLAUDE.md 와 git log 에 있다): accordion, empty, prefix-select, quantity-picker, bottom-sheet, menu-sheet, pagination, progress, progress-circle, image-frame, skeleton, carousel 의 문서 프레임에서 뺀 예시 1개씩을 지우고, 사용 지침 줄이 늘어난 6개(image-frame, bottom-sheet, menu-sheet, pagination, quantity-picker, prefix-select)의 Do/Don't 줄을 맞춘다. `node sync.mjs docpage <slug>` 뒤 yds-figma-draw 스킬 순서. 편집 가능한 Figma 계정(luvms@ybm.co.kr)으로 연결된 PC 에서 한다.
0. 자동 싱크 예약 작업 등록(사용자): Claude 가 대신 등록하면 권한에서 막힌다. 앱의 예약 작업 화면에서 tools/auto-sync-task.md 의 작업 지시문을 붙여 넣어 만든다(평일 18:30). tools/figma-quick.mjs 점검 스크립트는 11-12 Figma 에서 실제로 돌려 일치를 확인했다.
1. Figma 남은 작은 차이(필요할 때만): Text Link 세트 2493:324 에 화살표 변형은 두지 않았다(문서 예시는 링크 + 아이콘 인스턴스로 그림). Carousel 큰 배너 예시의 멈춤 버튼은 멈춘 상태(재생 아이콘)로 그려졌다. Figma 의 play / pause 채운 모양은 Lucide Solid 변형이라 YDS 아이콘과 모양이 조금 다르다. List Item 세트에는 inset 속성이 원래 없다(목록 틀의 속성).
1-0. Figma 템플릿 싱크(사용자가 걸 때): 수업 옵션 선택(lesson-plan) 방식 줄을 세그먼트에서 칩(전화, 화상)으로 바꿨다(11-13 사용자 "방식도 같은 레이아웃으로").
1-0-1. Figma 싱크(사용자가 걸 때): Accordion 세트에 inset none 변형(제목 줄, 내용 좌우 여백 0)과 문서 프레임 속성 표, 템플릿 중 Accordion 이 든 화면(교재 상세 목차, FAQ, 요금제 FAQ, 서비스 FAQ, 상품 상세, 할 일 상세)의 왼쪽 여백(11-13 사용자 "아코디언 왼쪽 여백").
1-0-2. Figma 싱크(사용자가 걸 때): Badge 세트 17:87 에 xlarge 변형(18개), 문서 프레임 속성 표와 규격 글, Badge 뒤 부품 코드 링크 줄 번호.
1-0-3. Figma 싱크(사용자가 걸 때): 폼 필드 바탕 투명을 bg/layer-default 로(Text Field Input outline, Textarea outline, Field Button, Select Trigger, Multi Select Trigger, underline 은 투명 그대로), 바뀐 줄 뒤 부품 코드 링크 줄 번호.
1-1. 속성 이름 정리는 배포됨(221b77b6). YBM Family 세션에 새 이름을 알린다(예전 이름도 읽으니 급하지 않음).
1-2. YBM Family 세션 요청(11-12 오후, 아직 안 함): Carousel 이동 버튼 세로 위치 변수 `--ds-carousel-button-top`(기본 50%, 카드 그림 가운데에 맞추려는 용도), 좁은 화면이나 터치에서 이동 버튼 숨기는 공식 방법(속성 또는 `(hover: none)` 기본 숨김 중 사용자에게 고르게), 진행 막대 줄 번호 글자가 PC 에서 14 보다 작음(`--ds-carousel-count-font-size` 가 막대 줄에는 안 먹고 t03 고정이라 막대 줄도 변수로 받게 하거나 14 이상으로). 끝나면 커밋 번호와 변수 이름을 그 세션에 알린다.
1-3. 점검표 B(값이 섞인 속성 5건)는 사용자 결정 대기.
2. 운영 구조 정리 5단계: 시험지 만들기. Get Started 예시 요청 6개를 yds.txt 주소만 준 새 세션에서 돌려 yds-check 문제 수, hex 직접 쓴 수, 없는 클래스 수를 표로 쌓는다.
3. 템플릿 2순위 7종(내 강의실, 오답 노트, 수료증, 결제 완료와 영수증, 환불 신청, 쿠폰함, 1:1 문의 내역)과 3순위 3종(오류, 점검, 알림 목록). 사용자 지시 대기.
5. 템플릿 UI 전체 개선. 사용자가 방향을 줄 때까지 시작하지 않고, 짚은 화면만 고친다.
6. h1 이 없는 템플릿 9종에 숨김 제목(`tp-sr`) 넣기: ai-chat, canvas-editor, community-home, contact-form, dashboard, documentation, file-explorer, ide, mypage-home.
7. Figma: 예전 템플릿 사진 칸은 회색, 그림자는 일부만. 라이브러리 다시 게시는 사용자가 한다. 라이브러리 원본(Foundations, Iconography, 컴포넌트) 변수 연결은 사용자 "다음에".
8. Markdown 메뉴 복사 성공 안내를 일반 브라우저에서 한 번 눌러 확인한다.

### 오래된 대기 (2026-11-09 기록, 지금도 유효한지 사용자에게 확인)

- YDS 소식 알리는 방법 나머지, 브랜드 파일을 만든 사람이 어디로 보낼지
- 사내 주소 교체(최종 지시 대기), 토익 적용(이후 진행), 회사 PC 의 publish 도구 안 DS 주소 확인
- 브랜드 버전 주소가 필요하면 `node sync.mjs release`

보류와 정리 후보(모션 변수화, 모바일 템플릿 10종, 값이 같은 변수, 회사 PC 백업 브랜치)는 log.md 맨 위에 있다.

## 주의

- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. `pages/*.html` 을 손으로 고치면 다음 푸시 때 GitHub 자동 빌드가 되돌린다.
- Figma 템플릿을 tplpage 로 다시 그리면 흰 바탕으로 돌아간다. 다시 그린 뒤 화면 바탕을 bg/canvas 로 바꾼다.
- Figma 커넥터가 다른 계정이면 편집 권한이 없다. 막히면 whoami 로 계정을 확인하고 사용자에게 다시 연결을 부탁한다.
- docpage 그리기 함수처럼 50KB 넘는 코드를 공유 데이터에 넣어 `eval('(' + src + ')')` 로 부를 때는 끝의 세미콜론을 빼야 한다.
- 정식 Figma 점검 스크립트(`node sync.mjs figma`)는 42KB 라 그대로 실행하기 무겁다. 11-12 에는 같은 검사를 줄인 판(변수는 컬렉션 요약값 대조)으로 돌렸다.
- 낮에는 Figma 싱크를 미루고 여기 남은 일에 쌓았다가 사용자가 걸 때 한 번에 한다(상시 규칙).
