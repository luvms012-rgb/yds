# YDS 바뀐 부분 자동 싱크 - 예약 작업 내용 (2026-11-12)

2026-11-12 사용자 "수정이 되면 자동으로 감지해서 싱크를 맞추는 작업 수행, 앞으로", "전체가 아닌 수정된 부분만". 2026-11-08 판(매일 전체 점검)을 바뀐 부분만 보는 방식으로 바꿨다.

- 코드 → 사이트는 GitHub 자동 빌드(`.github/workflows/check.yml`)가 푸시 때마다 맡는다.
- Figma 가 들어가는 부분은 Claude 세션에서만 된다. Claude 데스크톱 앱의 예약 작업(Scheduled tasks)으로 돌린다. 앱이 켜져 있을 때 돌고, 꺼져 있으면 다음에 켤 때 돈다.
- 작업 이름: yds-changed-sync, 시간: 평일 18:30 (`30 18 * * 1-5`)
- 등록: 예약 작업은 사람 없이 커밋, 푸시, Figma 쓰기를 하므로 사용자가 직접 등록한다(Claude 가 대신 등록하려 하면 권한에서 막힌다). 앱의 예약 작업 화면에서 새 작업을 만들고 아래 "작업 지시문" 을 그대로 붙여 넣는다.
- 예약 작업 없이도 같은 일을 시킬 수 있다: 세션에서 "바뀐 부분 싱크 검수해줘" 라고 하면 Claude 가 아래 순서대로 한다.

## 도구

| 명령 | 하는 일 |
|---|---|
| `node tools/figma-quick.mjs changed` | 마지막으로 맞춘 뒤 코드 쪽에서 바뀐 컴포넌트, 템플릿, 토큰, Get Started 목록 |
| `node tools/figma-quick.mjs` | 가벼운 Figma 점검 스크립트 `tokens/.figma-quick.js`(약 12KB) 생성. 정식 점검(42KB)과 같은 검사 |
| `node tools/figma-quick.mjs check '<결과>'` | use_figma 가 돌려준 결과를 저장소와 대조. 다르면 다른 곳만 알려 준다 |
| `node tools/figma-quick.mjs save` | 지금 상태를 "Figma 와 맞춤" 기준점으로 저장(`.cache/`, 이 PC 에만) |

## 작업 지시문

YDS 디자인 시스템의 세 곳(코드 = works/ybm-ds 저장소, 문서 사이트 = 같은 저장소 site/, Figma 파일 fileKey 1VCEsFU3xMWuXIntIrZz9i)에서 **바뀐 부분만** 찾아 싱크가 맞는지 검수하고, 다르면 맞춘다. 전체를 다시 그리거나 전체 점검을 여러 번 돌리지 않는다. 보고와 설명은 한국어로만, 쉬운 말로 짧게. 문장에 긴 대시와 가운뎃점을 쓰지 않는다.

먼저 저장소의 CLAUDE.md 와 docs/handoff.md 를 읽고 그 규칙을 따른다. 기준은 늘 YDS 코드와 사이트이고 Figma 가 따라온다. 단 Figma 변수는 Figma 가 원본이다.

### 0. 시작
1. 저장소에서 `git status --short`. 커밋 안 된 변경이 있으면 다른 세션이 작업 중일 수 있으니 아무것도 고치지 말고 "작업 중인 변경이 있어 건너뜀" 과 파일 목록만 보고하고 끝낸다.
2. `git pull --rebase`.
3. `node site/build.mjs` 후 `node tools/figma-quick.mjs changed`. 결과의 components, templates, tokens, getStarted 가 마지막으로 맞춘 뒤 코드 쪽에서 바뀐 것이다. "기준점이 없어요" 가 나오면 이 PC 에서 처음이니 아래 1번 점검이 일치일 때 `node tools/figma-quick.mjs save` 만 하고 끝낸다.

### 1. Figma 쪽이 바뀌었는지 (가벼운 점검 한 번)
1. Figma 커넥터의 whoami 로 계정을 본다. 편집 권한이 없어 읽기가 막히면 고치지 말고 "Figma 계정을 다시 연결해 주세요" 라고 보고하고, 코드 쪽 검사(3번의 check)만 하고 끝낸다.
2. `node tools/figma-quick.mjs` 로 `tokens/.figma-quick.js` 를 만들고, 그 파일 내용을 그대로 use_figma(읽기 전용)로 실행한다. figma-use 스킬을 먼저 불러온다.
3. 돌려받은 JSON 을 `node tools/figma-quick.mjs check '<JSON>'` 으로 대조한다. "일치" 면 Figma 쪽 변경은 없다.
4. 다른 곳이 나오면 그 항목만 처리한다.
   - 변수가 다름: `.figma-quick.js` 의 `const WANT = [];` 에 그 컬렉션 이름을 넣어 한 번 더 돌려 어느 변수인지 확인한다. Figma 에서 사용자가 바꾼 것이면 ds-sync 스킬 순서로 코드에 반영한다. 정식 스크립트가 너무 크면 고치지 말고 바뀐 변수 이름만 보고한다.
   - 변형 수가 다름, 목록에 없는 세트, 컴포넌트 없음: 고치지 말고 보고한다(어느 쪽이 맞는지 사용자가 정한다).
   - 링크 다름: `node sync.mjs links` 로 만든 스크립트를 use_figma 로 실행해 맞춘다.
   - 템플릿 화면 없음: 보고한다.

### 2. 코드와 사이트에서 바뀐 것을 Figma 에 맞추기 (바뀐 것만)
0번 3의 목록에 있는 것만 다룬다. 한 번 실행에 컴포넌트 최대 5개, 템플릿 최대 5개. 넘으면 나머지는 다음 실행으로 넘기고 보고에 적는다. 절차는 yds-figma-draw 스킬을 따른다.
- components: 그 컴포넌트의 Figma 세트(변형 수, 바뀐 속성과 값)와 문서 프레임이 지금 components.css, 사이트 페이지와 같은지 검수하고, 다르면 Figma 를 고친다(`node sync.mjs docpage <slug>`).
- templates: 그 템플릿만 다시 그린다. 그린 뒤 글자 대조, 넘침과 잘림 검사, 화면 바탕 bg/canvas 로 바꾸기까지 한다.
- getStarted: Figma Get Started 프레임 3069:2 가 site/index.html 과 같은지(절 순서, 제목, 상자 수, 문구) 검수하고 다른 곳만 고친다.
- tokens: 1번 점검에서 변수가 일치하면 할 일이 없다.
- 판단이 필요한 것(모양을 새로 정해야 함, 어느 쪽이 맞는지 모름)은 추측하지 말고 고치지 않은 채 보고한다.

### 3. 마무리
1. `node sync.mjs check` 가 통과하는지 본다. 실패하면 원인을 보고하고 배포하지 않는다.
2. 이번 실행에서 저장소 파일이 바뀌었으면(templates.json 의 Figma ID, 토큰 등) 커밋하고 push 한다. 커밋 메시지는 "자동 싱크: 무엇을". 사이트 소식(site/src/updates.json)은 DS 시스템 변경(새 컴포넌트, 토큰 변경)일 때만 한 문장 더한다.
3. 맞춘 것이 모두 끝났을 때만 `node tools/figma-quick.mjs save` 로 기준점을 저장한다. 다음으로 넘긴 것이 있으면 저장하지 않는다.
4. 고친 것이 있거나 사용자가 정할 것이 있으면 docs/handoff.md 의 "한 것" 과 "남은 일" 에 한두 줄 더하고 같이 올린다. 바뀐 것이 하나도 없으면 파일을 건드리지 않는다.
5. 보고(3 ~ 6줄): 바뀐 것을 찾은 결과, Figma 에 맞춘 것, 코드에 반영한 것, 다음으로 넘긴 것, 사용자가 정할 것. 바뀐 것이 없으면 "바뀐 것 없음, 세 곳 일치" 한 줄.

### 하지 말 것
- 비밀번호나 인증 정보를 입력하지 않는다. 로그인이 필요하면 보고만 한다.
- 생성물(dist/tokens.css, tokens 생성물, site/templates/pages/*.html, site/index.html)을 손으로 고치지 않는다. 원본(생성기, build.mjs, components.css)을 고친다.
- Figma 를 기준으로 컴포넌트 모양이나 문서를 바꾸지 않는다(변수만 Figma 가 원본).
- 저장소 파일에 외부 디자인 시스템 이름을 적지 않는다.
- 지우기, 되돌리기, 강제 push 를 하지 않는다.

## 방향별 정리

| 바뀐 곳 | 따라가는 곳 | 방법 |
|---|---|---|
| DS 원본(dist, tokens, components.json, site/src, 템플릿 생성기) | 사이트 | GitHub 자동 빌드가 다시 만들어 자동 커밋 |
| 컴포넌트 CSS, 문서 자료 | Figma 세트, 문서 프레임, 링크 | 2번 components, 1번 링크 |
| 템플릿 생성기 | Figma Templates 화면 | 2번 templates |
| Get Started | Figma Get Started 프레임 | 2번 getStarted |
| Figma 변수 | DS 토큰 → 사이트 | 1번 변수 → ds-sync → 자동 빌드 |
| Figma 컴포넌트 구조 | DS CSS | 자동 변경 안 함, 보고 후 사용자가 결정 |
| 사이트 생성물을 손으로 고침 | - | 검사가 막는다(원본을 고쳐야 함) |
