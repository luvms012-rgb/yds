# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-20 회사 Windows 오전. 마지막 배포 cecf8210(AI 규칙이 마크업을 컴포넌트 .md 에서 읽게, 작업 지침 경량화). 시작은 `git pull` 뒤 이 파일. 지난 일은 log.md "기록". 사이트 세부 규격은 필요할 때만 docs/site-detail.md.

## 한 것 (11-21, 집 Mac)

- **Figma 싱크 최종 검수**(사용자 "피그마 싱크 최종 검수", 읽기 전용): 변수 359(YDS 247, Typography 73, Shape 9, Elevation 30), 컴포넌트 세트 118(변형 수까지, 목록 밖 세트 0), 문서 프레임 Documentation/Code 링크 170, 템플릿 화면 81 모두 저장소와 일치. 11-18 뒤 바뀐 컴포넌트(Dialog, Command Palette, Top App Bar 등)는 11-18 저녁, 밤 싱크에 들어 있고 모달 스크롤바 수정은 Figma 와 상관없음. Figma 링크가 가리키는 사이트 위치(#usage, #code) 91곳을 서버와 로컬에서 확인해 모두 있음(11-19 "앵커 없음" 은 검사 스크립트 문제였다). Mac 기준점 저장(figma-quick save).
- **Mega Menu 지금 페이지 글자(Figma)**: 사용자 "남은 차이 Figma 에 맞추기". 인스턴스 글자는 부품의 fontStyle 변수로 되돌아가 바꿀 수 없어서, 부품 원본(3143:2639)의 첫 링크 "토익"(3143:2644) 글자 범위를 `fontStyle/semibold` 변수에 묶었다(사이트 대표 그림과 예시도 첫 링크가 지금 페이지). 대표 그림 인스턴스 3509:15888 도 SemiBold, 다른 링크는 Regular. 인스턴스는 이 하나뿐. 텍스트 변수는 `setBoundVariable` 이 아니라 `setRangeBoundVariable(0, 길이, 'fontStyle', 변수)` 로 묶어야 먹는다.
- **서버 확인**: dist/ybm-ds.css, ybm-ds.js 는 로컬과 같다. yds.txt 는 11-20 AI 규칙(마크업을 컴포넌트 .md 에서 읽기) 이 아직 없어 변경분2 가 서버에 안 올라간 것으로 보인다.

## 남은 일

1. **서버 올리기(사용자, 11-21 확인: 변경분2 아직 없음)**: `(서버업로드)/yds_20261120_변경분.zip`(182, 아침) 을 먼저, 그다음 `yds_20261120_변경분2.zip`(187) 을 서버 `/yds/` 에 덮어 푼다. 서버를 비우고 올리면 `전체/yds_20261120_전체.zip` 하나. 서버에서 지울 것 `/yds/v1.0.0`, `/yds/v1.1.0`, `/yds/templates/thumbs/index.json`. 다음 변경분 비교 기준은 `전체/yds_20261120_전체.zip`(변경분2 까지 들어 있음).
3. **Figma 3441:43347(아이콘 위치 이미지)**: 사용자가 "우선 보류".
4. **시험 접수 화면(시작 전에 멈춤)**: 어디에 둘지(YDS 템플릿 / works 아래 서비스 화면)를 먼저 묻는다. 가까운 템플릿은 시험 신청, 시험 일정, 고사장 신청, 시험 접수 완료.
5. **Figma 싱크 때**: Table 헤더 고정(요청 접수). 답을 기다리는 것(진행 도넛 색, 템플릿 "토익" 글, toeic 다크 버튼 대비)은 그대로.
6. 다음 버전은 `node sync.mjs release x.y.z`(사용자 확인 뒤).
7. **폴더 이름 바뀜 확인(묻고 나서)**: 저장소 밖 `works/project/_publish/publish.ps1`, `tools/server-zip.mjs`, README 의 로컬 예시 경로 `../../../../ybm-ds/dist/` 는 아직 예전 이름. Mac 도 11-19 에 works/yds 로 바꿨다(launch.json 의 ds-preview 경로, uipatterns/scripts/sync-ybm-ds.js 가 yds 를 먼저 찾게).

## 주의

- **공개 주소에 /site/ 를 쓰지 않는다**: 사이트 주소는 build.mjs `SITE_URL`(= /yds/), Figma 문서 링크는 tokens/links.mjs. 서버 묶음은 /yds/site/ 가 남으면 멈춘다.
- **서버 묶음**: `node tools/server-pack.mjs`(지시 때만, 올리기는 사용자). 결과는 `(서버업로드)/`(git 제외). 변경분은 `전체/` 의 지난 전체 zip 과 풀어서 md5 비교해 바뀐 파일만 묶는다.
- **Figma 로 큰 코드 넘기기**: `use_figma` 는 50KB 까지. 큰 것은 `tokens/.figma-tplpage/<이름>.json` → `node tokens/figma-payload.mjs <이름>` → `upload_assets` 로 `_payload` 사각형에 올려 풀고, 끝나면 지운다.
- **Figma 글자 찾기**: 인스턴스 안 글자는 먼저 `frame.findAll(() => false)` 로 한 번 훑는다. 일부만 바꿀 때는 deleteCharacters / insertCharacters 로 스타일과 링크를 지킨다.
- 숨은 브라우저 패널과 헤드리스 Chrome 은 requestAnimationFrame 이 멈춘다. 움직임은 setTimeout 으로 바꿔 잰다.
- Windows 에서 deploy 검사가 "site/build.mjs 실패" 로 멈추면 대개 파일 잠금이다. `node site/build.mjs` 를 한 번 돌리고 다시 한다.
- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. 생성물 손 수정은 다음 빌드에서 되돌아간다.
