# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-17 집 Mac 저녁. 모두 GitHub 에 배포됨(마지막 ca2a01e2). 시작은 `git pull` 뒤 이 파일. 오늘 회사 오후 작업은 log.md "2026-11-17 회사 Windows 오후".

## 한 것 (11-17 저녁, 집 Mac)

- **Get Started 프롬프트 상자**: 자연스러운 요청 글 하나("수강 신청 화면을 만들려고 해. 템플릿에 비슷한 화면이 있으면 참고해서 YDS로 제작해 줘." + 다음 줄 yds.txt 주소)를 한 번만 타이핑하고 멈춘다. 보내기 버튼은 움직이지 않는 회색 그림(span, aria-hidden). 칸이 늘어도 글과 첫 줄 위치가 움직이지 않게(입력 칸 위 4 여백, 늘어나는 동안 scrollTop 0). 글은 HTML 에 들어 있어 스크립트가 없어도 보인다.
- **"안내서" 없앰**: 사용자 "쉬운 용어로". 파일 표 yds.txt 설명은 "AI가 읽는 YDS 설명 파일", 규칙 파일 설명과 Updates 한 줄도 바꿨다. 인위적인 틀 문장("아래 파일을 읽고 YDS 규칙을 지켜 줘.")은 쓰지 않는다(`AI_COMMON` 은 남아 있지만 쓰는 곳이 없다).
- **템플릿 보기 창**: AI 요청 글 복사 버튼과 코드 삭제(아래 줄은 Figma 만). 좌우 화살표는 마우스를 올려도 바탕이 비치지 않게(`--ds-btn-bg-pressed` 를 불투명 바탕 위 옅은 회색으로). 제목 t09 SemiBold.

## 남은 일

0. **다음 세션 시작**: `git pull` → 이 파일 → 사용자가 말하는 일부터. 배포는 "배포" 라고 할 때만.
1. **공식 주소가 아직 404**: https://design.ybmnet.co.kr/yds/ 아래 dist, site 가 404 다(11-17 저녁 확인). 서버 묶음(`node tools/server-pack.mjs`)은 사용자가 요청할 때 만들고 올리기는 사용자. 올린 뒤 첫 화면, site/yds.txt, dist/ybm-ds.css, v1.2.0/dist/ybm-ds.css, 템플릿 보기 창, 한글 깨짐, 캐시 시간 확인.
2. **시험 접수 화면(시작 전에 멈춤)**: 사용자 "시험 접수 화면을 기획 중, 템플릿에 비슷한 화면이 있으면 참고해서 YDS로 구현" 을 받고 검토만 했다. 가까운 템플릿은 시험 신청(exam-apply), 시험 일정(회차 표), 고사장 신청 (지도), 시험 접수 완료. 어디에 둘지(YDS 템플릿인지, works 아래 따로 둘 서비스 화면인지)와 YDS 주소(공식 주소가 404 라 개발 미리보기 주소를 쓸지)를 먼저 묻는다.
3. **Table 헤더 고정(요청 접수)**, **답을 기다리는 것**(진행 도넛 색, 템플릿 "토익" 글, toeic 다크 버튼 대비): 그대로.
4. **Figma 싱크 때**: 문서 프레임 링크 170곳과 글자 속 주소 18곳이 옛 imagesisa 주소, `node sync.mjs links` 뒤 맞춘다. 문서 프레임 "코드" 링크 빼기, Figma 템플릿 문서에 AI 요청 글이나 HTML 내려받기가 있으면 빼기.
5. 다음 버전은 `node sync.mjs release x.y.z`(사용자 확인 뒤). 사이트 DS 전수 검사의 "고려" 16곳은 사용자가 원하면.

## 주의

- 서버 묶음은 지시 때만 만든다. 올리기는 사용자.
- 숨은 브라우저 패널과 헤드리스 Chrome 은 requestAnimationFrame 이 멈춘다. 움직임은 `Page.addScriptToEvaluateOnNewDocument` 로 rAF 를 setTimeout 으로 바꿔 헤드리스에서 잰다.
- Windows 에서 deploy 검사가 "7 빌드 경고, site/build.mjs 실패" 로 멈추면 대개 파일 잠금이다. `node site/build.mjs` 를 한 번 돌리고 다시 한다.
- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. `pages/*.html` 손 수정은 다음 빌드에서 되돌아간다. 템플릿이 바뀌면 deploy 가 썸네일을 다시 찍는다(Chrome 필요).
