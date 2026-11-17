# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-17 회사 Windows. 공식 주소를 사내 서버로 옮기는 마무리 작업. GitHub 배포됨(3c5adc03), 서버 묶음 yds_20261117.zip 만듦(올리기는 사용자). Figma 도 바뀌었다(링크 170 + 18 곳). 시작은 `git pull` 뒤 이 파일. 11-17 오후: 공식 주소 design.ybmnet.co.kr/yds 로 교체, 코드 버튼, 템플릿 요청 글, 사용 현황 탭 제거, 컴포넌트 메뉴 분류 묶음, 찾기 창 단순화, 요청 탭 워크 게시판, Get Started 프롬프트 상자(모두 미배포, 서버 묶음은 사용자가 다시 요청).

## 한 것 (11-17)

- **공식 주소**: <https://design.ybmnet.co.kr/yds/> (`deploy.config.json` publicUrl). GitHub 는 개발용(push, 개발 미리보기 Pages)이고 사이트와 Figma 에 링크하지 않는다. 사이트, AI 안내서, 설치 코드, 예시 로고, tokens/links.mjs, check.mjs 모두 새 주소. 버전 고정 주소는 `yds/v1.2.0/dist/...`.
- **GitHub 링크 정리(사용자 "추천안대로")**: 위 막대와 푸터의 GitHub 아이콘 삭제, 컴포넌트와 Foundations 의 "코드" 버튼은 같은 쪽 `#usage` / `#code` 로, 템플릿 "코드" 는 "HTML 내려받기", 브랜드 줄은 서버 브랜드 CSS 파일 링크, 루트 카탈로그의 GitHub 버튼은 "문서 사이트". 옛 루트 yds.txt, yds-full.txt(v1.1.0 사본) 삭제.
- **사이트를 YDS 부품으로(전수 검사에서 "바꿔야 함" 8곳)**: 위 막대 → Top Navigation(`data-layout="center"`), 휴대폰 메뉴 서랍 → Side Panel(열 때 site.js 가 옆 메뉴를 패널 안으로 옮긴다), 메뉴 구분선 → Divider, 템플릿 "크게 보기" → Dialog(창 밖 좌우 화살표 유지, 옛 목록 보기 창 코드는 지움), 규격 → Code Block, 아이콘 패널 코드 칸 → Code Block, 안내 카드 → `a.ds-card`, 요청 표 두 줄 칸 → `.ds-table__stack`. 위 메뉴 글자는 DS 값(14 Medium)이 됐다. "고려" 16곳(4 의 배수 아닌 값, 숫자 z-index, 안 쓰는 CSS 등)은 손대지 않음.
- **서버 묶음**: `node tools/server-pack.mjs` → `works/project/(서버업로드)/yds_날짜.zip`(25MB, 파일 725개). 안 = index.html(문서 사이트로 넘김), catalog.html(예전 루트 카탈로그), site/, dist/, v1.0.0 ~ v1.2.0/dist(git 태그에서 꺼냄), components.json, VERSION, tokens 공개 파일 셋. 만드는 코드, 작업 규칙 글, 숨긴 Themes 는 뺀다. 개인 GitHub 주소가 남으면 멈춘다. 풀어서 상대 링크 20,275개 검사, 빠진 파일 0.
- **Figma**: 문서 프레임 85개의 문서 / 코드 링크 170개를 사이트 주소로(코드 = `#usage`, Foundations `#code`), Get Started 와 Internal Components 의 GitHub 링크, AI 요청 글과 설치 코드 글자 속 주소, Foundations 의 옛 llms.txt, Navigation 예시 로고 주소(18곳). 빠른 대조 일치(변수 359, 컴포넌트 118, 링크 170, 템플릿 81), 기준점 저장. tokens/links.mjs 와 figma-quick 에서 GitHub 원본 주소(src) 제거.
- **사용 현황**: 사내 서버 cs 9쪽, signup 13쪽 전체로 17 컴포넌트, 표시는 요약 Card 셋 + 컴포넌트 x 서비스 비교 표(배포됨 2b8a56c7).

## 남은 일

0. **서버 올리기**: 사용자가 works/project/(서버업로드)/yds_20261117.zip 을 서버 yds 폴더에 푼다. 그 뒤 첫 화면, site/yds.txt, dist/ybm-ds.css, v1.2.0/dist/ybm-ds.css 가 열리는지 확인. 다시 고친 뒤에는 배포 → node tools/server-pack.mjs 순서.
1. **서버 올린 뒤 확인할 것**: 서버가 .mjs, .mdc, .md 를 내려 주는지(ai/yds-check.mjs), 한글 글자 깨짐 없는지, 캐시 시간.
2. **다음 버전**: `node sync.mjs release x.y.z`(사용자 확인 뒤). 새 태그는 server-pack 이 자동으로 v 폴더로 넣는다.
3. **Table 헤더 고정(요청 접수)**, **Figma 작은 차이**, **답을 기다리는 것**(진행 도넛 색, 템플릿 "토익" 글, toeic 다크 버튼 대비): 11-16 그대로. 자세한 것은 log.md "2026-11-16 집 Mac 밤".
4. **Figma 싱크 때 (11-17 오후)**: 공식 주소가 다시 https://design.ybmnet.co.kr/yds/ 로 바뀌었다. Figma 문서 프레임 링크 170곳과 글자 속 주소 18곳이 아직 옛 imagesisa 주소라 node sync.mjs links 뒤 다시 맞춘다. 그 밖에 사이트에서 뺀 것: 문서 프레임 85개의 "코드" 링크(사이트 코드 버튼을 뺌, Figma 링크만 남김). 템플릿 문서 보기의 AI 요청 글 상자와 HTML 내려받기도 뺐으니 Figma 템플릿 문서에 같은 것이 있으면 뺀다.
5. 사이트 DS 전수 검사의 "고려" 16곳은 사용자가 원하면.

## 주의

- 서버 묶음은 지시 때만 만든다. 올리기는 사용자.
- Windows 에서 deploy 검사가 "7 빌드 경고, site/build.mjs 실패" 로 멈추면 대개 파일 잠금이다. `node site/build.mjs` 를 한 번 돌리고 다시 한다.
- Git Bash 에서 node 인자로 `/site/...` 처럼 / 로 시작하는 글자를 넘기면 Windows 경로로 바뀐다(캡처 스크립트에서 겪음).
- 숨은 브라우저 패널에서는 타이머와 IntersectionObserver 가 멈춘다. 확인은 헤드리스 Chrome.
- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. `pages/*.html` 손 수정은 다음 빌드에서 되돌아간다.
