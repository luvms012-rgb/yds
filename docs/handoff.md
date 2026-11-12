# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-12 회사 (Windows)
- 시작: `git pull` 뒤 이 파일을 읽는다. 지난 기록은 [log.md](log.md) 에서 필요할 때만 찾는다.

## 한 것

- **새 컴포넌트 87 Price (11-12)**: 레퍼런스 2곳에 같은 부품이 없어 사용자 결정으로 템플릿 가격 표시 모양을 정본으로 올렸다(`.ds-price`, small/medium/large, `data-align="end"`). 장바구니, 상품 상세, 요금제의 가격 표시 5가지를 바꿨다. Figma 세트 `3336:3081`, 문서 프레임 `3336:2905`.
- **86 Section Header, 88 Stat 은 YDS 에서 뺌 (11-12, 사용자 "범용 컴포넌트(yds)에서만 삭제")**: 같은 날 함께 만들었다가 지웠다. 번호 86, 88 은 비워 둔다. 템플릿 머리글과 수치 카드는 예전 템플릿 전용 모양(`tp-sec-head`, `tp-kpi`, `tp-delta`, kit.mjs)으로 되돌려 새 컴포넌트를 넣기 전과 같다. Figma 는 두 세트와 문서 프레임을 지우고 템플릿 안 인스턴스 55개를 일반 프레임으로 풀었다. CSS 줄이 밀려 코드 링크 78곳을 다시 걸었다. 점검: 컴포넌트 118, 템플릿 84, 끊긴 인스턴스 0.
- **Text Link 화살표 링크 (11-12, YBM Family 세션 요청)**: 링크 끝에 아이콘(chevron-right 등)을 넣으면 inline-flex, 사이 x1, 아이콘 16(small 14), 밑줄 없음(`.ds-link:has(> .ds-icon)`). 사용 지침 Do/Don't, 예시 "그룹 제목 옆 전체 보기", AI 규칙 링크 줄, Updates 에 넣음. Figma 는 아직(아래 남은 일).
- **Carousel 큰 배너 (11-12, 이동 버튼은 원형 하나로 통일, 네모 변형은 사용자 지시로 뺌, YBM Family 세션 요청, 사용자 "캐러셀 고도화")**: `data-autoplay="5000"` 자동 넘김(끝에서 처음으로, 마우스 올림/포커스/멈춤 버튼에 멈춤, 움직임 줄이기면 멈춘 채 시작), `.ds-carousel__controls` 안 `.ds-carousel__play`(멈춤/재생 라벨과 아이콘 바꿈) + 번호 버튼(`button.ds-carousel__count`, 지금 번호 strong, plus 아이콘, `data-ds-open` 으로 Dialog, 비어 있는 `.ds-carousel__all` 을 ybm-ds.js 가 항목 복사로 채움, 1열, 768 부터 2열). 서비스 맞춤 변수 --ds-carousel-button-size/-radius/-shadow/-inset, -control-size, -count-font-size, -count-padding, -controls-x/-y, -play-icon-size(기본 12, 소수점 크기는 뭉개져 정수로). 멈춤 버튼 아이콘은 채운 모양 pause-solid / play-solid(icons.css 새 아이콘, 아이콘 가이드 편집 묶음, ybm-ds.js 는 -solid 를 쓰면 -solid 끼리 바꿈). 끝없이 넘기기 data-loop(앞뒤 복제 2장 aria-hidden, inert, 멈추면 진짜 장으로 순간 이동, 번호/막대/전체 보기는 진짜 장만, 처음/끝 표시 안 붙임, 큰 배너 예시에 적용). 진행 막대 모양 data-layout="bar"(.ds-carousel__bar 안에 .ds-carousel__progress + controls 안 이전, 번호 05 | 23(span .ds-carousel__count, JS 가 두 자리와 .ds-carousel__total), 다음, 멈춤(바탕 없음, 사용자 캡처 기준), 막대는 지금 번호까지 채움, 막대 안 이동 버튼은 끝에서 반대쪽 끝으로). 사용 지침 "자동으로 넘기지 않습니다" 는 "큰 배너에만, 멈춤 버튼과 함께" 로 바꿈, 예시 "큰 배너를 자동으로 넘기기", AI 규칙 캐러셀 줄, Updates.
- **운영 구조 정리 (11-12)**: 루트 CLAUDE.md 의 "3. 진행 상황" 을 글자 그대로 docs/log.md 로 옮겼다. CLAUDE.md 는 원칙, 기준 주소, 상시 규칙, 두 PC 싱크, 작업 규칙만 남겼다. 인수인계는 이 파일 하나에 최신 1건만 둔다. site/CLAUDE.md 는 바뀐 옛 값 40줄을 log.md 끝으로 옮기고 지금 값만 남겼다(Get Started, Updates 는 지금 구성으로 다시 씀). Figma 그리기 절차는 새 스킬 `.claude/skills/yds-figma-draw` 에 있다. 섞여 있던 줄(배치 묶음, 왼쪽 메뉴, Themes, Foundations, 템플릿 묶음 기록)도 사용자 답변대로 지금 값만 남겼다.
- **싱크 점검 (11-12)**: 저장소, 실사이트, Figma 모두 일치. 변수 359, 컴포넌트 세트 117, 문서와 코드 링크 170, 템플릿 화면 84.
- **Figma Templates 바탕 (11-12)**: 템플릿 84개의 화면 바탕을 bg/canvas 로, 섹션 9개 바탕을 bg/layer-default 로 바꿨다. 사이트 템플릿(흰 바탕)과 다른 Figma 보기용 차이다.
- **Figma 템플릿 싱크 (11-12 새벽)**: Templates 페이지를 분류 9개로 다시 묶고 새 10쪽과 바뀐 화면을 다시 그렸다. Figma 화면이 없는 템플릿 0.
- **레벨 테스트 (11-11)**: 문항에 집중하는 전체 화면으로 다시 짰고, 듣기 플레이어는 재생 버튼, 진행 막대, 시간 한 줄이다.

## 남은 일 (순서대로)

0. 자동 싱크 예약 작업 등록(사용자): Claude 가 대신 등록하면 권한에서 막힌다. 앱의 예약 작업 화면에서 tools/auto-sync-task.md 의 작업 지시문을 붙여 넣어 만든다(평일 18:30). tools/figma-quick.mjs 점검 스크립트는 11-12 Figma 에서 실제로 돌려 일치를 확인했다.
1. Figma 싱크(사용자가 걸 때): Text Link 문서 프레임(2493:325)의 사용 지침 4줄과 예시 "그룹 제목 옆 전체 보기"(화살표, 밑줄 없음). 세트 2493:324 에 화살표 변형을 둘지는 그때 정한다. Carousel 문서 프레임(2567:2117)의 사용 지침 2줄, 예시 "큰 배너를 자동으로 넘기기", 멈춤 버튼과 번호 버튼 부품, 진행 막대 모양과 예시 "배너 아래 진행 막대로 넘기기", 큰 배너 예시의 루프와 양옆 여백, Icon 에 play-solid / pause-solid.
2. 운영 구조 정리 5단계: 시험지 만들기. Get Started 예시 요청 6개를 yds.txt 주소만 준 새 세션에서 돌려 yds-check 문제 수, hex 직접 쓴 수, 없는 클래스 수를 표로 쌓는다.
3. 템플릿 2순위 7종(내 강의실, 오답 노트, 수료증, 결제 완료와 영수증, 환불 신청, 쿠폰함, 1:1 문의 내역)과 3순위 3종(오류, 점검, 알림 목록). 사용자 지시 대기.
4. 새 컴포넌트 점 규칙. 제안(컴포넌트마다 추가일부터 14일, 그 페이지를 한 번 열면 사라짐)에 대한 답 대기. 지금은 가장 최근 묶음만 30일(build.mjs NEW_COMPS).
5. 템플릿 UI 전체 개선. 사용자가 방향을 줄 때까지 시작하지 않고, 짚은 화면만 고친다.
6. h1 이 없는 템플릿 9종에 숨김 제목(`tp-sr`) 넣기: ai-chat, canvas-editor, community-home, contact-form, dashboard, documentation, file-explorer, ide, mypage-home.
7. Figma: 예전 템플릿 사진 칸은 회색, 그림자는 일부만. 라이브러리 다시 게시는 사용자가 한다. 라이브러리 원본(Foundations, Iconography, 컴포넌트) 변수 연결은 사용자 "다음에".
8. Markdown 메뉴 복사 성공 안내를 일반 브라우저에서 한 번 눌러 확인한다.

### 오래된 대기 (2026-11-09 기록, 지금도 유효한지 사용자에게 확인)

- YDS 소식 알리는 방법 나머지, 브랜드 파일을 만든 사람이 어디로 보낼지
- 사내 주소 교체(최종 지시 대기), 토익 적용(이후 진행), 회사 PC 의 publish 도구 안 DS 주소 확인
- 브랜드 버전 주소가 필요하면 `node sync.mjs release`

보류와 정리 후보(모션 변수화, 모바일 템플릿 10종, 값이 같은 변수, 회사 PC 백업 브랜치)는 log.md 맨 위에 있다.

## 주의

- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. `pages/*.html` 을 손으로 고치면 다음 푸시 때 GitHub 자동 빌드가 되돌린다.
- Figma 템플릿을 tplpage 로 다시 그리면 흰 바탕으로 돌아간다. 다시 그린 뒤 화면 바탕을 bg/canvas 로 바꾼다.
- Figma 커넥터가 다른 계정이면 편집 권한이 없다. 막히면 whoami 로 계정을 확인하고 사용자에게 다시 연결을 부탁한다.
- docpage 그리기 함수처럼 50KB 넘는 코드를 공유 데이터에 넣어 `eval('(' + src + ')')` 로 부를 때는 끝의 세미콜론을 빼야 한다.
- 정식 Figma 점검 스크립트(`node sync.mjs figma`)는 42KB 라 그대로 실행하기 무겁다. 11-12 에는 같은 검사를 줄인 판(변수는 컬렉션 요약값 대조)으로 돌렸다.
- 낮에는 Figma 싱크를 미루고 여기 남은 일에 쌓았다가 사용자가 걸 때 한 번에 한다(상시 규칙).
