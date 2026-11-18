# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-18 집 Mac 밤. Figma 싱크와 변수 검수 끝, 모두 배포됨. 시작은 `git pull` 뒤 이 파일. 오늘 낮 회사 일은 log.md "2026-11-18 회사 Windows".

## 한 것 (11-18, 회사 Windows)

- **Figma 대표 그림 83개를 사이트 기준으로 다시 그림**: 글과 아이콘이 11-09 뒤 사이트 변경(더미 글, 아이콘 맥락 수정)과 맞게 됐다. Menu(share, pencil), List(bell) 같은 아이콘 맥락 수정도 대표 그림에는 들어갔다.
- **그리기 도구 간격 버그 고침**과 이미 그린 컴포넌트 문서 5곳, 템플릿 17개 54곳 간격 바로잡음.
- **템플릿 보기 창 "주소 복사" 버튼**(아래 줄 Figma 왼쪽, 복사하면 Snackbar).
- 그 밖에 닫힘 움직임, 요청 탭 카드, 프롬프트 상자 글로우, 토큰 코인은 log.md.

## 한 것 (11-18 밤, 집 Mac, Figma 싱크)

- **대표 그림 83개 글자, 아이콘 대조**: 사이트 미리보기에서 실제로 보이는 글자와 아이콘을 읽어 Figma 와 하나씩 비교했다. 다른 곳은 Mega Menu(첫 묶음이 부품 기본 글자 → 토익, 토익 스피킹, 회화)와 Toolbar(내보내기 아이콘과 구분선 빼고 선택 해제 x) 두 곳이라 고쳤다. 나머지 차이는 입력 칸 값, CSS 로 그리는 화살표처럼 읽는 방법 차이뿐.
- **Toolbar 부품(2717:624)**: DS 의 `ds-toolbar__clear` 와 `ds-toolbar__separator` 에 맞춰 속성 `clear`(기본 끔), `separator`(기본 켬)를 더함. floating 변형은 원래 x 가 있어 그대로.
- **이미 맞아 있던 것(확인만)**: 문서 프레임 링크 170곳 모두 새 주소, 글자와 설명 속 옛 주소 0곳. 아이콘 맥락 수정 10곳(Command Palette, Menu, Tooltip, List, Bottom Navigation 등) 예시와 대표 그림 모두 반영돼 있음. Command Palette 대표 그림은 사이트와 같고, Tree 의 "읽을거리.pdf" 는 사이트에서도 접힌 2주차 폴더 안이라 차이 아님.
- 빠른 대조 일치(변수 359, 컴포넌트 118, 링크 170, 템플릿 81), 기준점 저장.
- **변수 검수(사이트, Figma)**: 사이트와 템플릿이 쓰는 `--ds-*` 는 모두 정의됨(없는 변수 0), 토큰 365개가 라이트와 다크에서 모두 값이 있음, 사이트와 템플릿 CSS 에 직접 쓴 색 0. Figma 는 끊긴 변수(지워짐, 다른 파일) 0, 템플릿 18,609 레이어 직접 색 0. Foundations 에 남아 있던 직접 색 146곳(Color 팔레트 글자, 역할 색 제목, `_Doc/Swatch` 바탕과 선과 글자, Iconography 바탕)을 bg/layer-default, stroke/neutral-weak, fg/neutral, fg/neutral-muted 에 묶음. Avatar 의 직접 색은 실루엣을 깎는 도형 안쪽이라 그대로, Lucide 원본 선 검정은 아이콘 기본 색이라 그대로.

## 남은 일

0. **다음 세션 시작**: `git pull` → 이 파일 → 사용자가 말하는 일부터. 배포는 "배포" 라고 할 때만.
1. **DS 코드 한 곳(사용자 판단)**: Top App Bar 투명 모양의 그라데이션이 `rgb(0 0 0 / 0.35)` 직접 값이다(components.css, 딱 맞는 토큰 없음, 가까운 것 static-black-alpha-600 0.30 / 700 0.45). 토큰으로 바꿀지 묻는다. Figma Feedback & Status 페이지 맨 위의 100x100 흰 프레임 `img`(2836:1298)도 쓰임을 모른다.
1. **Figma 작은 차이**: Mega Menu 대표 그림의 지금 페이지 글자(토익)가 사이트는 SemiBold, Figma 는 부품 안 굵기 변수 때문에 인스턴스에서 바뀌지 않는다. 부품에 지금 페이지 상태를 더할 때 맞춘다.
2. (끝남) 아이콘 맥락 수정 Figma 반영은 11-18 밤 확인, 모두 반영돼 있음.
3. **공식 주소가 아직 404**: https://design.ybmnet.co.kr/yds/ 아래 dist, site 가 404 다(11-17 확인). 서버 묶음(`node tools/server-pack.mjs`)은 사용자가 요청할 때 만들고 올리기는 사용자. 묶음을 만들 때 yds.txt 는 https://design.ybmnet.co.kr/yds/yds.txt 에 놓이고 사이트에 보이는 주소도 이것으로 맞춘다(지금 사이트는 /yds/site/yds.txt).
4. **Figma 3441:43347(아이콘 위치 이미지)**: 사용자가 "우선 보류".
5. **시험 접수 화면(시작 전에 멈춤)**: 어디에 둘지(YDS 템플릿 / works 아래 서비스 화면)와 YDS 주소를 먼저 묻는다. 가까운 템플릿은 시험 신청, 시험 일정, 고사장 신청, 시험 접수 완료.
6. **Figma 싱크 때**: (링크와 주소는 11-18 밤 모두 새 주소 확인) Table 헤더 고정(요청 접수), 답을 기다리는 것(진행 도넛 색, 템플릿 "토익" 글, toeic 다크 버튼 대비)은 그대로.
7. 다음 버전은 `node sync.mjs release x.y.z`(사용자 확인 뒤).

## 주의

- **Figma 로 큰 코드 넘기기**: `use_figma` 는 50KB 까지다. 여러 컴포넌트를 한 번에 그릴 때는 `{tpl: 템플릿 코드, items: [DATA...]}` 를 `tokens/.figma-tplpage/<이름>.json` 에 쓰고 `node tokens/figma-payload.mjs <이름>` → `upload_assets` 로 `_payload` 사각형에 올린 뒤, 그 페이지를 `loadAsync` 하고 `getImageByHash` 로 풀어 `new AsyncFunction('figma','DATA', tpl)` 로 하나씩 실행한다. 끝나면 사각형을 지운다.
- **대표 그림만 다시 그리기**: `docpage <slug> preview` 의 DATA 에서 `comp.page.examples = []` 로 비우면 대표 그림만 그린다(그 문서에서 손본 예시를 지우지 않는다).
- 서버 묶음은 지시 때만 만든다. 올리기는 사용자.
- 숨은 브라우저 패널과 헤드리스 Chrome 은 requestAnimationFrame 이 멈춘다. 움직임은 rAF 를 setTimeout 으로 바꿔 잰다.
- Windows 에서 deploy 검사가 "7 빌드 경고, site/build.mjs 실패" 로 멈추면 대개 파일 잠금이다. `node site/build.mjs` 를 한 번 돌리고 다시 한다.
- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. `pages/*.html` 손 수정은 다음 빌드에서 되돌아간다.
