# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-20 회사 Windows. 시작은 `git pull` 뒤 이 파일. 지난 일은 log.md "기록". 사이트 세부 규격은 필요할 때만 docs/site-detail.md.

## 남은 일

1. **서버 올리기(사용자)**: `(서버업로드)/` 의 최신 변경분 zip 을 서버 `/yds/` 에 덮어 푼다. 서버에서 지울 것 `/yds/v1.0.0`, `/yds/v1.1.0`, `/yds/templates/thumbs/index.json`. 다음 비교 기준은 `(서버업로드)/전체/` 의 최신 전체 zip.
2. **Figma 작은 차이**: Mega Menu 대표 그림의 지금 페이지 글자가 사이트는 SemiBold, Figma 는 부품 안 굵기 변수 때문에 바뀌지 않는다. 부품에 지금 페이지 상태를 더할 때 맞춘다.
3. **Figma 3441:43347(아이콘 위치 이미지)**: 사용자가 "우선 보류".
4. **시험 접수 화면(시작 전에 멈춤)**: 어디에 둘지(YDS 템플릿 / works 아래 서비스 화면)를 먼저 묻는다. 가까운 템플릿은 시험 신청, 시험 일정, 고사장 신청, 시험 접수 완료.
5. **Figma 싱크 때**: Table 헤더 고정(요청 접수). 답을 기다리는 것(진행 도넛 색, 템플릿 "토익" 글, toeic 다크 버튼 대비)은 그대로.
6. 다음 버전은 `node sync.mjs release x.y.z`(사용자 확인 뒤).
7. **폴더 이름 바뀜 확인(묻고 나서)**: 저장소 밖 `works/project/_publish/publish.ps1`, `tools/server-zip.mjs`, README 의 로컬 예시 경로 `../../../../ybm-ds/dist/` 는 아직 예전 이름. Mac 은 폴더 이름을 같게 맞출지 묻는다.

## 주의

- **공개 주소에 /site/ 를 쓰지 않는다**: 사이트 주소는 build.mjs `SITE_URL`(= /yds/), Figma 문서 링크는 tokens/links.mjs. 서버 묶음은 /yds/site/ 가 남으면 멈춘다.
- **서버 묶음**: `node tools/server-pack.mjs`(지시 때만, 올리기는 사용자). 결과는 `(서버업로드)/`(git 제외). 변경분은 `전체/` 의 지난 전체 zip 과 풀어서 md5 비교해 바뀐 파일만 묶는다.
- **Figma 로 큰 코드 넘기기**: `use_figma` 는 50KB 까지. 큰 것은 `tokens/.figma-tplpage/<이름>.json` → `node tokens/figma-payload.mjs <이름>` → `upload_assets` 로 `_payload` 사각형에 올려 풀고, 끝나면 지운다.
- **Figma 글자 찾기**: 인스턴스 안 글자는 먼저 `frame.findAll(() => false)` 로 한 번 훑는다. 일부만 바꿀 때는 deleteCharacters / insertCharacters 로 스타일과 링크를 지킨다.
- 숨은 브라우저 패널과 헤드리스 Chrome 은 requestAnimationFrame 이 멈춘다. 움직임은 setTimeout 으로 바꿔 잰다.
- Windows 에서 deploy 검사가 "site/build.mjs 실패" 로 멈추면 대개 파일 잠금이다. `node site/build.mjs` 를 한 번 돌리고 다시 한다.
- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. 생성물 손 수정은 다음 빌드에서 되돌아간다.
