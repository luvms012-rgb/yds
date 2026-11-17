# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-17 회사 Windows 오후. 공식 주소 <https://design.ybmnet.co.kr/yds/>, 사이트 정리와 AI 안내서 경량화까지 GitHub 배포됨(9b4c2470 주소, 050ace93 경량화, ff5c4fea 사이트 정리). 서버 묶음은 만들지 않았다(사용자가 다시 요청). Figma 는 아직 안 맞췄다(남은 일 2). 시작은 `git pull` 뒤 이 파일. 오전 작업은 log.md "2026-11-17 회사 Windows 오전".

## 한 것 (11-17 오후)

- **공식 주소 교체**: imagesisa 주소를 https://design.ybmnet.co.kr/yds/ 로(deploy.config.json publicUrl, tokens/links.mjs, check.mjs, server-pack.mjs, 문서, 예시). site/src/services.json 의 cs, signup 화면 주소는 그대로.
- **템플릿 보기 창**: 목록 카드를 누르면 새 창 대신 큰 DS Dialog 가 열린다. 위 줄 이름, 설명, PC / 모바일, 미리보기 / 코드, 닫기. 가운데 실제 템플릿, 좌우 화살표와 키보드로 다음 템플릿. 아래 줄 Figma, AI 요청 글 복사. 주소에 `?preview=이름`(공유, 새로 고침, 뒤로 가기로 닫기). iframe 은 `location.replace` 로 바꿔 기록이 쌓이지 않는다. 휴대폰은 전체 화면.
- **템플릿 문서 보기**: AI 요청 글 상자와 HTML 내려받기 삭제(크게 보기, Figma 만).
- **코드 버튼 삭제**: 컴포넌트와 Foundations 제목 아래는 Figma, Markdown 만.
- **컴포넌트 왼쪽 메뉴**: 목록과 같은 분류 묶음(접는 아코디언, 찾는 동안은 펼침).
- **사이트 찾기**: Esc 표시, 결과 설명 줄, 아래 키 안내 삭제.
- **Updates**: 사용 현황 탭 삭제(소식, 요청 둘). 요청 탭은 사내 워크 게시판(`FEEDBACK_FORM`)으로, 요청하는 법에 제목, 내용 예시 상자와 "워크 게시판에 쓰기" 버튼.
- **Get Started AI 절**: 요청 글 상자 셋 대신 프롬프트 상자 하나(한국어 요청 글 3개를 자동 타이핑, 보내기, 멈춤이 이어진다, 누르면 직접 쓰기, 동작 줄이기면 멈춘 글). 모서리는 xl.
- **AI 안내서 경량화**: 쪽마다 반복 안내 문장 한 번만, 미리보기용 폭 style 제거, 긴 링크는 상대 주소, llms.txt 와 llms-full.txt 는 yds.txt 를 가리키는 한 줄.
- site/CLAUDE.md 를 위 내용으로 고침(템플릿 보기 창, 메뉴 묶음, 찾기, 요청 탭 워크 게시판, 사용 현황 삭제, 프롬프트 상자).

## 남은 일

0. **서버 묶음**: 사용자가 요청하면 `node tools/server-pack.mjs` → works/project/(서버업로드)/yds_날짜.zip, 올리기는 사용자. 올린 뒤 첫 화면, site/yds.txt, dist/ybm-ds.css, v1.2.0/dist/ybm-ds.css, 템플릿 보기 창(`?preview=`)이 열리는지, .mjs, .mdc, .md 를 내려 주는지, 한글 깨짐, 캐시 시간 확인.
1. **Table 헤더 고정(요청 접수)**, **Figma 작은 차이**, **답을 기다리는 것**(진행 도넛 색, 템플릿 "토익" 글, toeic 다크 버튼 대비): 11-16 그대로. 자세한 것은 log.md "2026-11-16 집 Mac 밤".
2. **Figma 싱크 때**: 문서 프레임 링크 170곳과 글자 속 주소 18곳이 아직 옛 imagesisa 주소다. `node sync.mjs links` 뒤 맞춘다. 문서 프레임 85개의 "코드" 링크는 뺀다(Figma 링크만). Figma 템플릿 문서에 AI 요청 글 상자나 HTML 내려받기가 있으면 뺀다.
3. 다음 버전은 `node sync.mjs release x.y.z`(사용자 확인 뒤).
4. 사이트 DS 전수 검사의 "고려" 16곳은 사용자가 원하면.

## 주의

- 서버 묶음은 지시 때만 만든다. 올리기는 사용자.
- Windows 에서 deploy 검사가 "7 빌드 경고, site/build.mjs 실패" 로 멈추면 대개 파일 잠금이다. `node site/build.mjs` 를 한 번 돌리고 다시 한다.
- Git Bash 에서 node 인자로 `/site/...` 처럼 / 로 시작하는 글자를 넘기면 Windows 경로로 바뀐다.
- 숨은 브라우저 패널과 헤드리스 Chrome 은 requestAnimationFrame 과 IntersectionObserver 가 멈춘다. 움직임은 rAF 를 setTimeout 으로 바꾼 확인용 페이지에서, 주소와 뒤로 가기는 진짜 클릭(computer 도구)으로 본다(JS .click() 은 기록 동작이 다르다).
- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. `pages/*.html` 손 수정은 다음 빌드에서 되돌아간다.
