# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-19 회사 Windows 오전. 공식 주소 서버 묶음 준비 끝, Figma 링크 싱크 끝, 모두 배포됨. 로컬 폴더 이름은 이제 `works/yds`(예전 `works/ybm-ds`). 시작은 `git pull` 뒤 이 파일. 지난 일은 log.md "기록".

## 한 것 (11-19, 회사 Windows)

- **모달 열고 닫을 때 화면 흔들림 없앰(DS)**: 모달이 뒤 스크롤을 막으면서 창 스크롤바가 사라져 화면이 15px 옆으로 밀렸다. ybm-ds.js 가 스크롤바가 있는 화면이면 html 에 `data-ds-scrollbar` 를 붙이고, components.css 가 막는 동안 `scrollbar-gutter: stable` 로 자리를 남긴다(스크롤바가 없는 짧은 화면은 그대로). 헤드리스 Chrome 에서 팁 창, 템플릿 보기 창, Esc 닫기 모두 0px. 숨긴 브라우저 패널에서는 dialog close 이벤트가 오지 않아 잘못 재진다(헤드리스로 잰다). Figma 와 상관없다.
- **Get Started Figma 상자 글자 색**: 제목 없는 상자 글을 프롬프트 상자와 같은 fg-neutral 하나로(구조 카드 설명은 회색 그대로).
- **미리보기 서버**: works/.claude/ds-serve.mjs 의 ROOT 를 works/yds 로 고쳤다(폴더 이름 바뀐 뒤 404 였다).
- **서버 올릴 파일, 바뀐 것만**(사용자 "전체 말고 업데이트 된 부분만"): `(서버업로드)/yds_20261119_변경분.zip` 281개(DS CSS, JS 와 그 주소 해시가 바뀐 문서, 템플릿 화면, 썸네일). 같은 경로에 덮어쓰면 된다. 지운 파일은 없다. 비교 기준은 오전에 올린 전체 묶음이고, 이번 전체 묶음은 `(서버업로드)/전체/yds_20261119_전체.zip` 에 두었다(다음 변경분은 이것과 비교한다. server-pack 은 맨 위 yds_*.zip 을 지우므로 기준은 전체/ 폴더에).

- **서버 재업로드 뒤 점검(사용자가 SVN 으로 커밋)**: 서버 반영은 TortoiseSVN(영문판) 커밋이다. 첫 업로드 때 `dist`, `v1.0.0`~`v1.2.0` 이 SVN 에 Add 되지 않아(? 표시) 404 였고, 사용자가 Add 뒤 다시 커밋했다. 지금 묶음 파일 723개를 서버에 하나씩 물어 모두 200(web.config, .gitignore 는 숨김이라 404 가 맞음), .md, .mdc, .mjs, .webp, VERSION 도 web.config 덕에 200 이고 글 파일은 utf-8.
- **Figma 링크 모으기**: 16쪽에서 공식 주소 링크와 글 속 주소 96개(파일 95개)를 모아 서버에 물었더니 파일은 모두 200. 그 밖의 주소는 Figma 파일 링크, 워크 게시판, 예시 주소(example.com, unsplash)뿐이고 /yds/site/ 는 0.

- **서버 첫 업로드 뒤 경로 점검**(사용자 "모든 경로 정상화"): 문서 페이지, assets, tokens, yds.txt 는 열리지만 `dist/` 전체와 `v1.x/dist`, `VERSION`, `.md`, `.mdc`, `.mjs`, `.webp` 가 404 였다(화면은 YDS CSS 없이 글자만). 원인 둘. 1) 묶음 맨 위에 site/.gitignore(내용 "dist/")가 들어가 올리기 도구가 dist 폴더를 모두 뺐다. 2) 서버가 IIS 라 등록 안 된 파일 형식(.md, .mdc, .mjs, .webp, 확장자 없음)을 404 로 낸다. 고침: server-pack 이 점 파일을 넣지 않고(남으면 멈춤), 맨 위에 web.config(파일 형식 등록, 글 파일은 utf-8)를 넣고, dist/ybm-ds.css, v*/dist, VERSION, web.config 가 없으면 멈춘다. 묶음 다시 만듦(.gitignore 0, dist 117파일).

- **서버 묶음 자리를 저장소 안으로**(사용자 "로컬 폴더 yds 안에 다음부터 서버 업로드용 파일 생성"): `node tools/server-pack.mjs` 결과가 `works/yds/(서버업로드)/yds_날짜.zip` 에 생긴다. .gitignore 로 git 에는 올리지 않는다. 지금 파일은 `works/yds/(서버업로드)/yds_20261119.zip`(예전 자리 `works/project/(서버업로드)/` 의 yds zip 은 이리로 옮김).
- **공개 주소에서 /site/ 없앰**(사용자 "yds/site 사용 금지"): 문서 사이트는 https://design.ybmnet.co.kr/yds/ 바로 아래, AI 파일은 https://design.ybmnet.co.kr/yds/yds.txt 와 yds-full.txt. 저장소 폴더는 site/ 그대로이고 서버 묶음이 site/ 안을 맨 위에 펼친다. 사이트, ai/ 규칙 파일, llms.txt 모두 새 주소.
- **서버 묶음 만듦**: `works/yds/(서버업로드)/yds_20261119.zip`(25.3MB, 724파일). 사용자가 서버 `/yds/` 폴더에 그대로 풀어 올린다. 안: 문서 사이트(index.html, components/, foundations/, templates/, assets/, ai/, yds.txt 등), dist/, v1.0.0, v1.1.0, v1.2.0(버전 고정 dist), components.json, VERSION, tokens/ 공개 파일 셋, catalog.html(예전 맨 위 카탈로그).
- **묶음 검사**: 풀어서 링크 2만 1천 8백 개를 서버 배치 그대로 확인, 깨진 것 0, /yds/site/ 와 개인 GitHub 주소 0.
- **Figma**: 16쪽 모든 링크 180곳과 글자 속 주소 4곳에서 /yds/site/ 를 /yds/ 로, 남은 곳 0. 빠른 대조 일치(변수 359, 컴포넌트 118, 문서 링크 170, 템플릿 81), 기준점 저장.
- **옛 Get Started 넘김 페이지**(usage.html, scripts.html)를 생성기에서 #dev 로(손 수정이 빌드에서 되돌아가던 것).

## 남은 일

0. **다음 세션 시작**: `git pull` → 이 파일 → 사용자가 말하는 일부터. 배포는 "배포" 라고 할 때만. 커밋 873abe29(점 파일, web.config, 필수 파일 검사)와 이 인수인계 커밋은 아직 push 전.
0-1. **멈춘 곳(11-19, 사용자 "인수인계 만들고 정지")**: Figma 링크의 #usage, #code, #dev 위치 검사가 86개 모두 "앵커 없음" 으로 나왔는데, 로컬 사이트에는 id 가 있어 검사 스크립트(정규식) 문제로 보인다. 서버 쪽 `curl -s https://design.ybmnet.co.kr/yds/components/badge.html | grep -o 'id="usage"'` 로 먼저 확인한다. 그다음 남은 것: 브라우저로 첫 화면, 컴포넌트, 템플릿 화면이 YDS 모양으로 나오는지 보고 캡처를 보여 준다(Chrome 탭이 하나 열려 있음).
1. **서버 다시 올리기(사용자, 11-19 09시 판)**: 새 zip 을 서버 `/yds/` 에 덮어 풀고, 서버에 남은 `/yds/.gitignore` 는 지운다. 올린 뒤 `curl` 로 dist/ybm-ds.css, v1.2.0/dist/ybm-ds.css, VERSION, index.md, ai/AGENTS.md, templates/thumbs/*.webp 가 200 인지, 화면에 YDS 버튼 모양이 나오는지 본다. web.config 를 올린 뒤 사이트 전체가 500 이면 서버가 파일 형식 설정을 막은 것이라 web.config 를 지우고 서버 담당자에게 형식 등록을 부탁한다. 처음 안내: zip 을 서버 `/yds/` 에 풀면 https://design.ybmnet.co.kr/yds/ 와 /yds/yds.txt 가 열린다. 올린 뒤 첫 화면, 컴포넌트 한 쪽, 템플릿 한 쪽, /yds/yds.txt, /yds/dist/ybm-ds.css, /yds/v1.2.0/dist/ybm-ds.css 가 열리는지 확인한다. 사이트를 고친 뒤에는 묶음을 다시 만들어야 서버에 반영된다(지시 때만).
2. **Figma 작은 차이**: Mega Menu 대표 그림의 지금 페이지 글자(토익)가 사이트는 SemiBold, Figma 는 부품 안 굵기 변수 때문에 인스턴스에서 바뀌지 않는다. 부품에 지금 페이지 상태를 더할 때 맞춘다.
3. **Figma 3441:43347(아이콘 위치 이미지)**: 사용자가 "우선 보류".
4. **시험 접수 화면(시작 전에 멈춤)**: 어디에 둘지(YDS 템플릿 / works 아래 서비스 화면)를 먼저 묻는다. 가까운 템플릿은 시험 신청, 시험 일정, 고사장 신청, 시험 접수 완료.
5. **Figma 싱크 때**: Table 헤더 고정(요청 접수), 답을 기다리는 것(진행 도넛 색, 템플릿 "토익" 글, toeic 다크 버튼 대비)은 그대로.
6. 다음 버전은 `node sync.mjs release x.y.z`(사용자 확인 뒤).
7. **폴더 이름 바뀜 확인(묻고 나서)**: 저장소 밖 가이드 사이트 도구 `works/project/_publish/publish.ps1`(DS 사이트가 안 열릴 때 `works\ybm-ds\dist` 를 함께 올림), `tools/server-zip.mjs` 와 README 의 로컬 예시 경로 `../../../../ybm-ds/dist/` 는 아직 예전 이름이다. 서비스 화면이 DS 를 로컬 상대 경로로 읽으면 로컬 미리보기에서 깨질 수 있다. 저장소 안 글(ds-sync 스킬, auto-sync-task.md)은 works/yds 로 고쳤다. Mac 은 폴더 이름을 같게 맞출지 사용자에게 묻는다.

## 주의

- **공개 주소에 /site/ 를 쓰지 않는다**: 사이트 주소는 build.mjs `SITE_URL`(= /yds/), Figma 문서 링크는 tokens/links.mjs. 개발 미리보기(GitHub Pages)와 로컬 미리보기만 /site/ 아래로 열린다. 서버 묶음은 /yds/site/ 가 남으면 멈춘다.
- **서버 묶음**: `node tools/server-pack.mjs`(지시 때만, 올리기는 사용자). 결과는 저장소 안 `(서버업로드)/`(git 제외, 예전 yds_*.zip 은 지움). site/ 안의 파일 이름이 맨 위 공개 파일(dist, tokens, components.json, VERSION, catalog.html)과 겹치면 멈춘다. 묶음 속 상대 경로는 자동으로 한 칸 줄어드니 site/ 의 ../dist 경로는 그대로 둔다.
- **Figma 로 큰 코드 넘기기**: `use_figma` 는 50KB 까지다. 여러 컴포넌트를 한 번에 그릴 때는 `{tpl, items}` 를 `tokens/.figma-tplpage/<이름>.json` 에 쓰고 `node tokens/figma-payload.mjs <이름>` → `upload_assets` 로 `_payload` 사각형에 올린 뒤 풀어 실행한다. 끝나면 사각형을 지운다.
- **Figma 글자 찾기**: 인스턴스 안 글자는 먼저 `frame.findAll(() => false)` 로 한 번 훑어야 다 잡힌다. 글자 일부만 바꿀 때는 deleteCharacters / insertCharacters 로 스타일과 링크를 지킨다.
- **대표 그림만 다시 그리기**: `docpage <slug> preview` 의 DATA 에서 `comp.page.examples = []` 로 비우면 대표 그림만 그린다.
- 숨은 브라우저 패널과 헤드리스 Chrome 은 requestAnimationFrame 이 멈춘다. 움직임은 rAF 를 setTimeout 으로 바꿔 잰다.
- Windows 에서 deploy 검사가 "7 빌드 경고, site/build.mjs 실패" 로 멈추면 대개 파일 잠금이다. `node site/build.mjs` 를 한 번 돌리고 다시 한다.
- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. `pages/*.html` 과 site/get-started 같은 생성물 손 수정은 다음 빌드에서 되돌아간다.
