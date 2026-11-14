# YDS - 작업 기준 (집 PC, 회사 PC 공용)

집(**Mac**)과 회사(**Windows**) 두 PC 에서 같은 저장소로 작업한다. 이 파일은 저장소에 같이 올라가므로 어느 PC 에서든 Claude 가 먼저 읽는다.
**시작할 때 [docs/handoff.md](docs/handoff.md) 를 읽는다.** 지난 기록은 docs/log.md 에 있고 필요할 때만 찾아본다.
PC 마다 따로 쌓이는 Claude 메모리는 서로 보이지 않는다 - 두 PC 가 함께 알아야 할 것은 여기에 적는다.


## 원칙

- 새 부품의 큰 틀, 쓰임, 위계, 여백, 밸런스는 사용자가 정한 레퍼런스 가이드 2곳(메모리/대화 기록 참고)의 같은 부품에서만 가져온다. 만들기 전에 그 규격부터 확인한다.
- YDS 는 전체적으로 쉬워야 한다. 글은 짧고 쉬운 말, 페이지는 보자마자 복사해 쓸 수 있게, 규칙과 선택지는 적게. 사이트 글과 README 를 고칠 때 이 기준으로 먼저 본다.
- 이 DS 는 완전 범용이다. 특정 서비스나 사이트를 근거로 부품을 정하거나 예시 문구에 넣지 않는다.
- 목적, 구조, 디자인, 코드 모두 단순하게 만든다.
- 글을 빼고 배치로 해결한다. 홍보 문구, 설명 글, 툴팁, 보조 라벨은 빼고, 글 없이 이해가 안 되면 여백, 정렬, 크기, 순서를 고친다.
- 무엇을 결정하든 UX(쓰는 사람), DX(개발자), AX(이 코드를 다룰 AI) 셋이 함께 좋아지게 한다.
- 원래 되던 기능은 망가뜨리지 않는다. 애매한 부분이나 YDS 규칙이 서비스와 안 맞는 부분은 추측하지 말고 작업 전에 사용자에게 묻는다.

## 1. 기준 주소

| 항목 | 주소 |
|---|---|
| 공식 Figma (정본) | 파일 `1VCEsFU3xMWuXIntIrZz9i` "디자인 시스템" - Foundations 페이지 <https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=2274-1143> |
| GitHub 저장소 | <https://github.com/luvms012-rgb/yds> (브랜치 `main`) |
| 배포 (Pages) | <https://luvms012-rgb.github.io/yds/> |
| 문서 사이트 | 이 저장소의 `site/` 폴더, 규칙은 [site/CLAUDE.md](site/CLAUDE.md) |

Foundations 페이지 문서 프레임(왼쪽→오른쪽): Color `2486:2`, Typography `2486:13`, Spacing `2486:24`, Radius `2486:35`, Elevation `2486:46`.

## 상시 규칙 (2026-11-06 사용자, 시키지 않아도 매번)

- **기준은 늘 YDS 와 YDS 사이트, Figma 는 자동으로 따라온다** (2026-11-11 사용자 "yds-yds site가 늘 기준점. 이 기준이 수정되면 피그마 자동 수정") - 컴포넌트, 토큰, 문서, Get Started, 템플릿을 고치면 묻지 않고 같은 작업 안에서 Figma(변수, 컴포넌트 세트, 문서 프레임, 코드 링크 줄 번호, Get Started, Templates)까지 고친 뒤 배포한다. Figma 와 다를 때 정답은 늘 YDS 쪽이다. 끝나면 `node sync.mjs figma` 결과를 use_figma 로 돌려 변수, 세트, 링크가 모두 일치하는지 확인한다. 예전 "Figma 는 먼저 묻기" 는 이것으로 바뀌었다. 단 같은 날 사용자 "피그마 씽크 너무 느리다. 씽크는 내가 퇴근하고 걸고 갈테니 우선 보류" - 낮에는 코드와 사이트만 고쳐 배포하고, Figma 에 맞출 것은 docs/handoff.md 의 남은 일에 쌓아 두었다가 사용자가 싱크를 걸 때 한 번에 처리한다.
- **Updates 는 DS 시스템 변경만** (2026-11-09 사용자 "사이트 내용은 담지 말것, 오직 ds 중요도 있는 시스템적인 부분만") - 새 컴포넌트, 토큰, 브랜드 구조, 서비스 화면이나 쓰는 법이 달라지는 DS 변경이 있을 때만 `site/src/updates.json` 맨 위 그날 날짜에 소식 한 문장을 더한다. 사이트, 문서, Get Started, AI 문서, 작은 모양 수정, 템플릿 고치기는 적지 않는다(README §10-7). 단 새 템플릿을 더하면 영역 "템플릿" 으로 새 기능에 한 줄 적는다(2026-11-14 사용자 "업데이트에 템플릿 추가도 포함"). Figma Updates 페이지는 11-09 사용자 지시로 지웠으므로 Figma 쪽 작업은 없다.
- **바뀐 부분만 싱크 검수** (2026-11-12 사용자 "전체가 아닌 수정된 부분만 씽크가 맞는지 검수") - YDS, 사이트, Figma 중 어디든 고치면 그 고친 부분만 나머지 쪽과 맞는지 검수하고, 다르면 고친다. 전체 점검(`node sync.mjs figma`)은 사용자가 말할 때와 버전을 올릴 때만 돌린다. 바뀐 것 찾기: 코드 쪽은 `node tools/figma-quick.mjs changed`(바뀐 컴포넌트, 템플릿, 토큰, Get Started), Figma 쪽은 `node tools/figma-quick.mjs` 의 가벼운 점검 스크립트를 use_figma 로 돌려 `check` 로 대조. 맞춘 뒤 `save`. 사람 없이 돌리는 예약 작업 지시문은 `tools/auto-sync-task.md`. 검수는 그 컴포넌트의 변수, 세트 변형 수, 문서 프레임, 코드 링크 줄 번호 또는 그 템플릿의 글자 대조와 넘침이다(절차는 yds-figma-draw 스킬).
- **양방향 자동 동기화** - YDS 를 고치면 같은 작업 안에서 Figma 를, Figma 가 바뀌었으면 YDS 를 맞춘다(README §10-6). 문서 프레임 링크가 어긋나면 `node sync.mjs links`.
- **사이트 글자 규칙 검사** - 사이트 글자는 크기마다 정한 줄높이(t01 11/17 ~ t13 40/54), 굵기 400/500/600, 자간 0(Figma 2662:26). 11-06 전 페이지 검사 스크립트 `.cache/typo/audit.js`(로컬 전용, 미리보기에서 불러 `window.__audit`). 예외: 구조 그림 이름표(.site-anatomy__name 13/16), 예시 안 DS 부품(DS 규격이 따로 있음).

## 2. 두 PC 싱크 규칙

GitHub `main` 이 기준이다. PC 사이에 직접 옮기는 파일은 없다.

1. **작업 시작** - `git pull` 로 다른 PC 에서 올린 것부터 받는다. 받기 전에 로컬에 커밋 안 된 변경이 있으면 먼저 사용자에게 묻는다.
2. **작업 끝 / "저장하고 스탑"** - 커밋하고 `git push` 한다(또는 `node sync.mjs deploy "메시지"`). 다른 PC 에서 이어 갈 수 있도록 docs/handoff.md 를 덮어쓴다(양식: 한 것 / 남은 일 / 주의, 최신 1건만). 끝난 일의 자세한 기록은 docs/log.md "기록" 맨 위에 더한다. 다음 세션 시작 문구는 "docs/handoff.md 읽고 이어서".
3. 한쪽 PC 에만 있는 커밋 안 된 작업은 다른 PC 에서 보이지 않는다. 작업을 넘길 때는 반드시 push 까지 한다.
4. 로컬 전용 파일(`.cache/`, `tokens/.figma-*` 등)은 올리지 않는다.

### 처음 세팅 (새 PC)

```
git clone https://github.com/luvms012-rgb/yds.git
```

- Node.js 가 있어야 한다(`node sync.mjs` 로 확인). 패키지 설치는 필요 없다.
- push 는 그 PC 의 Git 로그인을 쓴다(Mac: GitHub Desktop 또는 키체인, Windows: Git Credential Manager). Claude 가 인증 정보를 직접 다루지 않는다.
- Figma 읽기/쓰기는 Claude 의 Figma 커넥터로 한다(PC 마다 한 번 연결).
- 폴더 위치는 PC 마다 달라도 된다. README 의 로컬 경로(`C:\Users\...`)는 회사 PC 기준.

### Mac 에서 다른 점

- `동기화.bat` 은 Windows 전용 → Mac 에서는 `node sync.mjs deploy "메시지"` 를 터미널에서 실행한다. 나머지 `node sync.mjs ...` 명령은 똑같다.
- 가이드 사이트 재배포(`project/_publish/publish.ps1`)는 Windows 에서만 돈다. Mac 에서 deploy 하면 YDS 만 올라가고 가이드 사이트는 회사 PC 에서 다시 배포해야 한다.
- `.gitattributes` 가 `* -text`(줄바꿈 변환 없음)다. 파일의 줄바꿈을 바꾸지 않는다 - 현재 CRLF 는 `동기화.bat` 하나뿐이고 나머지는 LF.

## 3. 인수인계와 기록

- 최신 인수인계: [docs/handoff.md](docs/handoff.md) - 매번 덮어쓴다. 남은 일은 여기에만 둔다.
- 지난 기록, 보류, 정리 후보: [docs/log.md](docs/log.md) - 평소에는 읽지 않는다.
- 이 파일에는 진행 상황을 적지 않는다. 규칙이 바뀔 때만 고친다.

## 4. 작업 규칙

- 사용법/동기화/토큰/컴포넌트 상세는 `README.md`, Figma 동기화 절차는 `.claude/skills/ds-sync/SKILL.md`. Figma 에 템플릿과 문서 프레임을 그리는 절차는 `.claude/skills/yds-figma-draw/SKILL.md`.
- 커밋/배포는 사용자가 요청할 때만.
- 문서/코드에 외부 레퍼런스 DS 의 이름/링크/비교 문구를 넣지 않는다.
- `dist/tokens.css` 와 `tokens/` 생성물은 손으로 고치지 않는다.
- 문장 규칙(문서, Figma 문구, 답변 모두): 긴 대시와 가운뎃점을 쓰지 않고 "-", ",", "/" 로 쓴다. 설명은 "크기에 따라 달라지는 모양입니다." 처럼 쉬운 한 문장으로 끝내고, 뒤에 값 목록이나 괄호 안 예시 나열을 붙이지 않는다.
