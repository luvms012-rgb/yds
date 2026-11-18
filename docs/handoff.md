# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-18 회사 Windows 저녁. 모두 GitHub 에 배포됨. 시작은 `git pull` 뒤 이 파일. 오늘 한 일은 log.md "2026-11-18 회사 Windows".

## 한 것 (11-18, 회사 Windows)

- **Figma 대표 그림 83개를 사이트 기준으로 다시 그림**: 글과 아이콘이 11-09 뒤 사이트 변경(더미 글, 아이콘 맥락 수정)과 맞게 됐다. Menu(share, pencil), List(bell) 같은 아이콘 맥락 수정도 대표 그림에는 들어갔다.
- **그리기 도구 간격 버그 고침**과 이미 그린 컴포넌트 문서 5곳, 템플릿 17개 54곳 간격 바로잡음.
- **템플릿 보기 창 "주소 복사" 버튼**(아래 줄 Figma 왼쪽, 복사하면 Snackbar).
- 그 밖에 닫힘 움직임, 요청 탭 카드, 프롬프트 상자 글로우, 토큰 코인은 log.md.

## 남은 일

0. **다음 세션 시작**: `git pull` → 이 파일 → 사용자가 말하는 일부터. 배포는 "배포" 라고 할 때만.
1. **Figma 대표 그림 다시 대조(이어서 할 일)**: 83개를 다시 그렸지만 사이트와 글자, 아이콘 대조와 화면 비교는 몇 개만 했다. 다시 읽을 때는 인스턴스 안 글자를 놓치지 않게 읽는다(11-18 첫 대조에서 인스턴스 안 글이 빠져 잘못 읽힘). 이미 아는 차이:
   - **Command Palette**: 대표 그림이 Figma 컴포넌트 인스턴스 기본 내용(house, receipt, settings 아이콘과 G H 단축키 줄)으로 보인다. 사이트는 수강 내역(book-open), 수강 기간 늘리기(calendar-days). 컴포넌트 쪽(아래 2번)을 고친 뒤 대표 그림을 다시 그린다.
   - **Tree**: 사이트의 "읽을거리.pdf" 줄이 Figma 에 없다.
2. **아이콘 맥락 수정 Figma 반영(11-18)**: Command Palette 수강 내역 receipt→book-open, 수강 기간 늘리기 truck→calendar-days / Menu 공유하기 external-link→share, 수정하기 file-text→pencil / Tooltip 링크 복사 external-link→link / List 알림 받기 message-circle→bell / Bottom Navigation 알림 file-text→bell / 알림 목록 성적 truck→chart-column / Accordion 구조 그림 성적 truck→chart-column / 설정 목록 수강 기기 map-pin→smartphone. 대표 그림은 다시 그려 맞췄고, 컴포넌트, 예시, 구조 그림, 템플릿 쪽이 남았다. 예시 칸은 `node sync.mjs docpage <slug> preview` 가 대표 그림과 예시를 함께 다시 그린다.
3. **공식 주소가 아직 404**: https://design.ybmnet.co.kr/yds/ 아래 dist, site 가 404 다(11-17 확인). 서버 묶음(`node tools/server-pack.mjs`)은 사용자가 요청할 때 만들고 올리기는 사용자. 묶음을 만들 때 yds.txt 는 https://design.ybmnet.co.kr/yds/yds.txt 에 놓이고 사이트에 보이는 주소도 이것으로 맞춘다(지금 사이트는 /yds/site/yds.txt).
4. **Figma 3441:43347(아이콘 위치 이미지)**: 사용자가 "우선 보류".
5. **시험 접수 화면(시작 전에 멈춤)**: 어디에 둘지(YDS 템플릿 / works 아래 서비스 화면)와 YDS 주소를 먼저 묻는다. 가까운 템플릿은 시험 신청, 시험 일정, 고사장 신청, 시험 접수 완료.
6. **Figma 싱크 때**: 문서 프레임 링크 170곳과 글자 속 주소 18곳이 옛 imagesisa 주소, `node sync.mjs links` 뒤 맞춘다. Table 헤더 고정(요청 접수), 답을 기다리는 것(진행 도넛 색, 템플릿 "토익" 글, toeic 다크 버튼 대비)은 그대로.
7. 다음 버전은 `node sync.mjs release x.y.z`(사용자 확인 뒤).

## 주의

- **Figma 로 큰 코드 넘기기**: `use_figma` 는 50KB 까지다. 여러 컴포넌트를 한 번에 그릴 때는 `{tpl: 템플릿 코드, items: [DATA...]}` 를 `tokens/.figma-tplpage/<이름>.json` 에 쓰고 `node tokens/figma-payload.mjs <이름>` → `upload_assets` 로 `_payload` 사각형에 올린 뒤, 그 페이지를 `loadAsync` 하고 `getImageByHash` 로 풀어 `new AsyncFunction('figma','DATA', tpl)` 로 하나씩 실행한다. 끝나면 사각형을 지운다.
- **대표 그림만 다시 그리기**: `docpage <slug> preview` 의 DATA 에서 `comp.page.examples = []` 로 비우면 대표 그림만 그린다(그 문서에서 손본 예시를 지우지 않는다).
- 서버 묶음은 지시 때만 만든다. 올리기는 사용자.
- 숨은 브라우저 패널과 헤드리스 Chrome 은 requestAnimationFrame 이 멈춘다. 움직임은 rAF 를 setTimeout 으로 바꿔 잰다.
- Windows 에서 deploy 검사가 "7 빌드 경고, site/build.mjs 실패" 로 멈추면 대개 파일 잠금이다. `node site/build.mjs` 를 한 번 돌리고 다시 한다.
- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. `pages/*.html` 손 수정은 다음 빌드에서 되돌아간다.
