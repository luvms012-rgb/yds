# YDS - 작업 기준 (집 Mac, 회사 Windows 공용)

두 PC 에서 같은 저장소로 작업한다. **시작할 때 [docs/handoff.md](docs/handoff.md) 를 읽는다.** 지난 기록은 docs/log.md 에서 필요할 때만 찾는다. PC 마다 따로 쌓이는 Claude 메모리는 서로 보이지 않으니, 두 PC 가 함께 알아야 할 규칙은 여기에 적는다. 사이트와 템플릿 규칙은 [site/CLAUDE.md](site/CLAUDE.md).

## 원칙
- YDS 는 쉬워야 한다. 글은 짧고 쉬운 말, 페이지는 바로 복사해 쓸 수 있게, 규칙과 선택지는 적게.
- 완전 범용 DS 다. 특정 서비스를 근거로 부품을 정하거나 예시 문구에 넣지 않는다.
- 목적, 구조, 디자인, 코드 모두 단순하게. 글을 빼고 배치(여백, 정렬, 크기, 순서)로 해결한다.
- UX(쓰는 사람), DX(개발자), AX(코드를 다룰 AI) 셋이 함께 좋아지게.
- 되던 기능은 망가뜨리지 않는다. 애매하거나 규칙이 서비스와 안 맞으면 추측하지 말고 작업 전에 묻는다.
- 새 부품의 틀, 쓰임, 위계, 여백은 사용자가 정한 레퍼런스 가이드 2곳의 같은 부품에서 가져온다(이름은 저장소에 적지 않는다).
- 크기와 간격은 4의 배수(작은 것만 2의 배수)로, 토큰에 있는 값만 쓴다.

## 기준 주소
| 항목 | 주소 |
|---|---|
| 공식 Figma | 파일 `1VCEsFU3xMWuXIntIrZz9i`, Foundations 페이지 `2274:1143`(문서 프레임 Color `2486:2`, Typography `2486:13`, Spacing `2486:24`, Radius `2486:35`, Elevation `2486:46`) |
| GitHub | <https://github.com/luvms012-rgb/yds> (`main`) |
| 배포 | <https://luvms012-rgb.github.io/yds/> |

## 상시 규칙 (시키지 않아도 매번)
- **기준은 YDS 와 사이트, Figma 는 따라온다.** 다르면 정답은 YDS 쪽. 다만 Figma 싱크는 느려서 평소에는 코드와 사이트만 고쳐 배포하고, Figma 에 맞출 것은 handoff 남은 일에 쌓았다가 사용자가 싱크를 걸 때 한 번에 처리한다.
- **바뀐 부분만 검수**: 코드 쪽 `node tools/figma-quick.mjs changed`, Figma 쪽은 그 스크립트를 use_figma 로 돌려 `check` 로 대조하고 `save`. 전체 점검(`node sync.mjs figma`)은 사용자가 말할 때와 버전을 올릴 때만. Figma 문서 프레임 링크가 어긋나면 `node sync.mjs links`. 절차는 ds-sync, yds-figma-draw 스킬. 예약 작업 지시문 `tools/auto-sync-task.md`.
- **Updates**(`site/src/updates.json`): DS 시스템 변경(새 컴포넌트, 토큰, 브랜드 구조, 쓰는 법이 달라지는 변경)과 새 템플릿 추가만 그날 날짜에 한 줄. 영역은 컴포넌트, 템플릿, 아이콘, 토큰, 브랜드, 규칙 중 하나. 사이트, 문서, 작은 모양 수정, 템플릿 고치기는 적지 않는다.
- **배포는 사용자가 "배포" 라고 할 때만**: `node sync.mjs deploy $'메시지\n\nCo-Authored-By: …'`(검사 → 커밋 → push). 버전은 `node sync.mjs release x.y.z`(사용자 확인 뒤). 바꾼 묶음마다 따로 커밋해 되돌릴 수 있게 한다.
- **고치지 않는 것**: `dist/tokens.css` 와 `tokens/` 생성물, 사이트 생성물(site/CLAUDE.md 참고). 외부 레퍼런스 DS 이름, 링크, 비교 문구는 문서와 코드에 넣지 않는다. 비밀 값과 인증 정보는 다루지 않는다(로그인은 사용자가 한다).
- **문장 규칙**(문서, Figma, 답변): 긴 대시와 가운뎃점 대신 "-", ",", "/". 설명은 쉬운 한 문장으로 끝내고 값 목록이나 괄호 나열을 붙이지 않는다. 사용자에게는 한국어로 쉽게.

## 두 PC 싱크
- 시작: `git pull`(커밋 안 된 로컬 변경이 있으면 먼저 묻는다). 끝("저장하고 스탑"): 커밋, push, docs/handoff.md 덮어쓰기(한 것 / 남은 일 / 주의, 이번 것만), 끝난 일은 docs/log.md "기록" 맨 위로.
- 로컬 전용 파일(`.cache/`, `tokens/.figma-*`, site/REFERENCE-ANALYSIS.md)은 올리지 않는다.
- 새 PC: `git clone https://github.com/luvms012-rgb/yds.git`, Node.js 만 있으면 된다. push 는 그 PC 의 Git 로그인, Figma 는 Claude 커넥터(편집 권한 있는 계정).
- Mac: `동기화.bat` 대신 `node sync.mjs deploy`. 가이드 사이트 재배포(`project/_publish/publish.ps1`)는 Windows 에서만. `.gitattributes` 가 `* -text` 라 줄바꿈을 바꾸지 않는다(CRLF 는 `동기화.bat` 하나).
- 자세한 사용법, 동기화, 토큰, 컴포넌트 카탈로그는 README.md.
