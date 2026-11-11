---
name: yds-figma-draw
description: YDS 사이트의 템플릿이나 문서 페이지를 Figma 에 사이트와 같게 그리거나 다시 그린다. "템플릿 Figma 에 그려줘", "피그마 템플릿 다시 그려", "문서 프레임 다시 그려", "Figma 템플릿 싱크" 같은 요청이나, 템플릿 생성기와 컴포넌트 문서를 고친 뒤 Figma 를 맞출 때 쓴다. 변수와 컴포넌트 수 대조만 할 때는 ds-sync 를 쓴다.
---

# YDS Figma 그리기

기준은 늘 YDS 와 사이트다. Figma 파일 `1VCEsFU3xMWuXIntIrZz9i` 는 사이트를 따라 그린다. 모든 명령은 저장소 루트에서 실행한다. `use_figma` 를 부르기 전에 `figma-use` 스킬을 먼저 불러온다.

## 시작 전에

1. `whoami` 로 Figma 계정을 확인한다. 편집 권한이 없는 계정이면 읽기부터 막히므로, 사용자에게 편집 가능한 계정으로 다시 연결해 달라고 한다.
2. 사이트가 최신인지 본다(`node site/templates/gen/run.mjs` → `node site/build.mjs`). 옛 화면을 그리면 한 번 더 그려야 한다.

## 어디에 무엇이 있나

| 무엇 | 노드 |
|---|---|
| Templates 페이지 | `3059:965` - 분류 SECTION 9개(Exam `3287:3848` ~ Admin `3287:3856`), 안에 COMPONENT "Template/영어 이름" 1920x1080 |
| 템플릿마다 프레임 ID | `site/src/templates.json` 의 `figma.pc` |
| Get Started | 페이지 `3059:92`, 프레임 `3069:2` |
| Foundations 페이지 | `2274:1143`, 문서 프레임 Color `2486:2`, Typography `2486:13`, Spacing `2486:24`, Radius `2486:35`, Elevation `2486:46` |
| 컴포넌트 세트와 문서 프레임 | `components.json` 의 `figma`, `doc` |
| 문서용 내부 컴포넌트 | Internal Components 페이지 `3078:391` 의 `_Doc/...` 12종 |

섹션 순서와 섹션 안 순서는 `site/templates/gen/groups.mjs` 를 따른다.

## 템플릿 그리기, 다시 그리기

1. **`node tokens/figma-styles.mjs --templates <slug>`** - Chrome 을 화면 없이 띄워 그 템플릿의 실제 계산된 모양을 잰다. 건너뛰면 고치기 전 모양으로 그려진다.
2. **`node sync.mjs tplpage <slug>`** - 그리기 자료를 `tokens/.figma-tplpage/<slug>.json` 에 만든다.
3. **`node tokens/figma-payload.mjs <slug>`** - 자료를 PNG 로 감싼다. `use_figma` 는 한 번에 50KB 까지라 큰 자료는 글로 못 넘긴다.
4. **`upload_assets`** - PNG 를 Templates 페이지 왼쪽(x -2000)의 `_payload` 사각형 칠에 올린다. 사각형이 없으면 먼저 만든다.
5. **Figma 에서 풀어 실행** - 사각형의 그림 바이트를 `UNPACK`(`node tokens/figma-payload.mjs --decoder` 가 출력)으로 글로 풀고 `new AsyncFunction('DATA', code)` 로 실행한다. 새 템플릿은 빈 COMPONENT 를 먼저 만들어 ID 를 `templates.json` 의 `figma.pc` 에 넣는다. 있던 템플릿은 그 프레임을 비우고 다시 그린다(ID 가 바뀌면 사이트의 Figma 버튼이 끊긴다).
6. **사진** - 사진 칸은 `upload_assets` 의 nodeIds 로 사이트와 같은 사진을 넣는다. Plugin API 는 바깥 그림 주소를 불러오지 못한다.
7. **바탕** - 다시 그린 템플릿은 흰 바탕이다. 컴포넌트 칸, Page 프레임, 화면 전체를 덮는 큰 칸의 바탕을 `bg/canvas` 로 바꾼다(2026-11-12 사용자, 섹션 바탕은 `bg/layer-default`). 건너뛰면 그 템플릿만 섹션과 구분되지 않는다.
8. **정리** - `_payload` 사각형과 공유 데이터에 넣은 풀기 함수를 지운다. 남기면 라이브러리에 쓰레기가 보인다.
9. **검사** - 아래 "그린 뒤 검사" 를 돌린다.

여러 템플릿은 1 ~ 3 을 한꺼번에 만들고 4 ~ 5 를 하나씩 한다. `use_figma` 는 동시에 여러 개 돌리지 않는다.

## 컴포넌트, Foundations 문서 프레임

1. `node sync.mjs docpage <slug>` 로 그리기 코드를 만들어 `use_figma` 로 실행한다. 코드가 50KB 를 넘으면 공유 데이터 두 조각에 나눠 넣고 불러 쓴 뒤 비운다.
2. 전체 모드는 머리말과 표를 일반 프레임으로 다시 그린다. 그린 뒤 공유 데이터 `yds/docfn` + `yds/docmap` 으로 그 프레임을 `_Doc/...` 인스턴스로 다시 바꾼다(글꼴 Pretendard 4종과 NanumGothicCoding 을 먼저 불러온다). 건너뛰면 그 프레임만 내부 컴포넌트에서 떨어진다.
3. CSS 줄이 밀렸으면 `node sync.mjs links` 로 문서와 코드 링크를 다시 건다.

## 그린 뒤 검사

- **글자 대조**: 사이트 화면의 글자와 Figma 프레임의 글자가 같은지 본다. 필수 표시가 든 라벨, 순위 숫자(`counter()`), 작은 Text Link 가 자주 빠지거나 달라졌다.
- **넘침과 잘림**: 프레임 밖으로 나간 글자, 잘린 글자가 0 인지 본다. 가운데 맞춤 한 줄 글, 좁은 칸의 배지가 자주 문제였다.
- **화면 비교**: 사이트 캡처와 Figma 캡처를 나란히 한 번 본다.
- **링크와 수**: `node sync.mjs figma` 점검으로 변수, 세트, 링크, 템플릿 프레임이 모두 일치하는지 확인한다(ds-sync 스킬).
- 끝나면 `templates.json` 에 바뀐 ID 가 있으면 사이트를 다시 빌드하고, `docs/handoff.md` 에 한 것과 남은 차이를 적는다.

## 자주 틀린 것

- **계정**: 커넥터 계정에 편집 권한이 없으면 "edit access" 오류가 난다. 코드를 고치지 말고 계정부터 본다.
- **변수 바인딩과 투명도**: `setBoundVariableForPaint` 는 paint 의 opacity 를 1 로 덮는다. 원래 opacity 를 넣어서 만들고, 많이 고치기 전에 한 화면으로 먼저 확인한다.
- **투명 칸**: opacity 0 칸을 두지 않는다. 옅은 회색 칸은 `bg/neutral-weak-alpha`, 회색 박스 안 배지도 같다.
- **인스턴스 안 글자**: `findOne` 이 인스턴스 안 글자를 놓칠 때가 있다. `findAll` 로 찾고, 처음에 한 번 미리 훑는다.
- **페이지**: `use_figma` 는 부를 때마다 첫 페이지에서 시작한다. 매번 `setCurrentPageAsync` 로 옮기고 한 번에 한 페이지만 다룬다.
- **글꼴**: 글자를 고치기 전에 그 글자의 글꼴을 불러온다. Pretendard 굵기 이름은 `listAvailableFontsAsync` 로 확인한다.
- **도구 위치**: 그리기 함수의 원본은 `tokens/figma-docpage.template.js`, 모양 재기는 `tokens/figma-styles.mjs` 다. 그림이 틀리면 Figma 에서 손으로 고치기 전에 도구를 고쳐야 다음에도 맞는다.
- **알려진 차이(그대로 둠)**: Get Started 코드 탭은 고른 탭 하나만 그린다. 예전 템플릿 사진 칸은 회색이다. 그림자는 일부만 그려진다. 1080 아래는 잘린다.

## 하지 말 것

- 화면 캡처 그림을 통째로 붙여 넣지 않는다. 글자, 컴포넌트 인스턴스, 변수로 그린다.
- 색, 여백, 모서리를 직접 값으로 넣지 않는다. YDS 변수에 묶는다.
- Figma 를 기준으로 YDS 를 고치지 않는다. 다르면 정답은 YDS 쪽이다.
- 문서와 코드에 외부 레퍼런스 DS 의 이름을 넣지 않는다.
