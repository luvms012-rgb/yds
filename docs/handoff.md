# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-15 집 Mac
- 시작: `git pull` 뒤 이 파일을 읽는다. 지난 기록은 [log.md](log.md) 에서 필요할 때만 찾는다.

## 한 것

- **Avatar 42 를 40 으로 (11-15 집, 배포 전)**: 사용자 "크기는 4와 8 배수가 기준". 42 는 Avatar 에만 있던 값이었다. data-size="42" 는 40 으로 보이게 남겼다. 템플릿 5곳 40 으로.
- **템플릿을 YDS 규칙에 맞춤 (11-15 집, 배포 전, v1.2.0 뒤)**: 1024 기준점 48곳을 1280 으로, 모바일 위 막대를 Top App Bar 로, Avatar 크기 23곳을 DS 값으로, 모두 보기 링크에 화살표, 상태 색 규칙(끝난 상태 neutral 등)과 마이페이지 상태 Badge. 안내서 규칙 문장(제목 굵기, 상태 색, 줄 버튼, 위 막대)도 맞췄다. 375, 768, 1100, 1440 점검 문제 없음.
- **AI 안내서 시험과 고침 (11-15 집, 배포 전)**: 요청 글 3개를 새 AI 에게 시켜 세 결과 모두 검사 오류 0. 막힌 곳으로 안내서 문장 7곳을 고치고, 어제 안내서 줄이기에서 생긴 curl 주소 버그를 고쳤다.
- **유지하기 쉽게 (11-15 집, 배포 전)**: 뺀 템플릿 21개의 생성기 코드를 지웠다(tools.mjs 삭제, 4521줄 → 3990줄, 남은 76개 화면은 글자 하나 달라지지 않음을 비교로 확인). site/CLAUDE.md 는 문장 그대로 주제별 제목 13개로 다시 묶고 지난 경위 6줄을 log.md 로, handoff 의 11-14 까지 한 것 39줄도 log.md 로 옮겼다.
- **완성도 검수와 빈칸 채우기 (11-15 집, 배포 전)**: Image Frame 3:4, 2:3 / Radio Group 가로 / 아이콘 3개 / 사용 지침 4개 / 숨김 h1 7개. 검사 주의는 toeic 다크 버튼 대비 3.64 와 템플릿 덮어쓰기 197곳만 남음.
- **첫 화면 버튼 줄 제거 (11-15 집, 배포 전)**: Get Started 제목 아래 Figma, 코드, Markdown 버튼 줄을 뺐다.
- **분류 기준은 쓰는 사람 (11-15 집)**: 담당자가 쓰는 학습 현황 대시보드, 단체 성적 대시보드, 과정 운영, 응시자 관리를 관리자로 옮겼다. Figma 섹션도 옮겨야 한다.
- **교재 분류와 템플릿 4쪽 (11-15 집, 배포 전)**: 쇼핑 분류를 교재로 바꾸고 books.mjs 로 교재 홈, 교재 목록, 교재 음원, 교재 로드맵을 더했다. 교재 상세를 교재로, 장바구니와 요금제 비교를 결제로 옮김. 센터 찾기 삭제. 지금 76개.
- **AI 요청 글 한 줄 (11-15 집, 배포 전)**: 메인 3개와 템플릿 요청 글의 안내서 문장, 주소, 요청을 줄바꿈 없이 한 줄로.
- **템플릿 정리 93 → 73 (11-15 집, 배포 전)**: 잘 안 쓰는 도구, 문서 화면 8개와 겹치는 화면 12개를 뺐다(groups.mjs REMOVED). 학습 현황 대시보드는 학습 > 운영, 주문 상세는 관리자 > 처리로 옮김. Updates 11-15 변경된 부분 1줄.

## 남은 일 (순서대로)

- **Figma 템플릿 규칙 맞춤**: 모바일 템플릿 프레임이 있으면 위 막대를 Top App Bar 로, 상태 Badge 색, 모두 보기 화살표를 맞춘다.
- **Figma Avatar 40**: Avatar 세트의 42 변형과 Avatar Group 42 를 40 으로(문서 프레임 크기 표도).
- **Figma 에 DS 추가분**: Image Frame 세트에 3:4, 2:3 변형, Radio Group 가로 배치 예시, 아이콘 volume-2, captions, headphones 컴포넌트, 문서 프레임 지침 6줄(Chip, Help Bubble, List, Markdown, Radio Group, Image Frame).
- **toeic 브랜드 다크 버튼 대비 3.64**: 브랜드 색 값 결정이라 사용자에게 묻고 고친다(기준 4.5).
- **Figma 교재 템플릿 4쪽과 분류 이름**: book-home, book-list, book-audio, book-roadmap 을 그리고 Commerce 섹션 이름을 Books 로, 옮긴 템플릿(교재 상세, 장바구니, 요금제 비교, 학습 현황 대시보드, 주문 상세) 프레임을 새 섹션으로 옮긴다. center-finder 프레임도 지울 것에 더한다.
- **Figma 템플릿 정리**: 사이트에서 뺀 20개(groups.mjs REMOVED)의 Templates 페이지 프레임을 지우고, 섹션 순서를 groups.mjs 에 맞춘다(편집 계정 필요). 지우기 전에 사용자에게 한 번 확인한다.
- **Figma 영상, 클래스 템플릿 6쪽**: video-home, video-title-detail, video-watch, video-player, class-detail, my-classroom 을 Templates 페이지에 그린다(편집 계정 필요). 플레이어에 소리, 자막 아이콘이 필요하면 icons.css 에 더할지 사용자에게 묻는다.
- **Figma 관리자 처리 템플릿 3쪽**: admin-request-list, admin-request-detail, admin-request-form 을 Templates 페이지 Admin 섹션에 그린다(yds-figma-draw, 편집 계정 필요).
0-2. 사내 확산 다음 단계(사용자 지시 대기): 하려는 일 카드 6개는 구성, 위치(구조 위 또는 아래), 제목 여부를 사용자에게 물어 둔 상태. 토큰 대조표, 디자이너 역할 경계 문구도 사용자 결정 대기.
0-1. Figma 문서 프레임 예시 맞추기(11-14 예시 정리 1차 12개 + 2차 39개, 지침 19줄. 컴포넌트 목록은 site/CLAUDE.md 와 git log 에 있다): accordion, empty, prefix-select, quantity-picker, bottom-sheet, menu-sheet, pagination, progress, progress-circle, image-frame, skeleton, carousel 의 문서 프레임에서 뺀 예시 1개씩을 지우고, 사용 지침 줄이 늘어난 6개(image-frame, bottom-sheet, menu-sheet, pagination, quantity-picker, prefix-select)의 Do/Don't 줄을 맞춘다. `node sync.mjs docpage <slug>` 뒤 yds-figma-draw 스킬 순서. 편집 가능한 Figma 계정(luvms@ybm.co.kr)으로 연결된 PC 에서 한다.
0. 자동 싱크 예약 작업 등록(사용자): Claude 가 대신 등록하면 권한에서 막힌다. 앱의 예약 작업 화면에서 tools/auto-sync-task.md 의 작업 지시문을 붙여 넣어 만든다(평일 18:30). tools/figma-quick.mjs 점검 스크립트는 11-12 Figma 에서 실제로 돌려 일치를 확인했다.
1. Figma 남은 작은 차이(필요할 때만): Text Link 세트 2493:324 에 화살표 변형은 두지 않았다(문서 예시는 링크 + 아이콘 인스턴스로 그림). Carousel 큰 배너 예시의 멈춤 버튼은 멈춘 상태(재생 아이콘)로 그려졌다. Figma 의 play / pause 채운 모양은 Lucide Solid 변형이라 YDS 아이콘과 모양이 조금 다르다. List Item 세트에는 inset 속성이 원래 없다(목록 틀의 속성).
1-0. Figma 템플릿 싱크(사용자가 걸 때): 수업 옵션 선택(lesson-plan) 방식 줄을 세그먼트에서 칩(전화, 화상)으로 바꿨다(11-13 사용자 "방식도 같은 레이아웃으로").
1-0-1. Figma 싱크(사용자가 걸 때): Accordion 세트에 inset none 변형(제목 줄, 내용 좌우 여백 0)과 문서 프레임 속성 표, 템플릿 중 Accordion 이 든 화면(교재 상세 목차, FAQ, 요금제 FAQ, 서비스 FAQ, 상품 상세, 할 일 상세)의 왼쪽 여백(11-13 사용자 "아코디언 왼쪽 여백").
1-0-2. Figma 싱크(사용자가 걸 때): Badge 세트 17:87 에 xlarge 변형(18개), 문서 프레임 속성 표와 규격 글, Badge 뒤 부품 코드 링크 줄 번호.
1-0-3. Figma 싱크(사용자가 걸 때): 폼 필드 바탕 투명을 bg/layer-default 로(Text Field Input outline, Textarea outline, Field Button, Select Trigger, Multi Select Trigger, underline 은 투명 그대로), 바뀐 줄 뒤 부품 코드 링크 줄 번호.
1-1. 속성 이름 정리는 배포됨(221b77b6). YBM Family 세션에 새 이름을 알린다(예전 이름도 읽으니 급하지 않음).
1-2. YBM Family 세션 요청(11-12 오후, 아직 안 함): Carousel 이동 버튼 세로 위치 변수 `--ds-carousel-button-top`(기본 50%, 카드 그림 가운데에 맞추려는 용도), 좁은 화면이나 터치에서 이동 버튼 숨기는 공식 방법(속성 또는 `(hover: none)` 기본 숨김 중 사용자에게 고르게), 진행 막대 줄 번호 글자가 PC 에서 14 보다 작음(`--ds-carousel-count-font-size` 가 막대 줄에는 안 먹고 t03 고정이라 막대 줄도 변수로 받게 하거나 14 이상으로). 끝나면 커밋 번호와 변수 이름을 그 세션에 알린다.
1-3. 점검표 B(값이 섞인 속성 5건)는 사용자 결정 대기.
2. 운영 구조 정리 5단계: 시험지 만들기. Get Started 예시 요청 6개를 yds.txt 주소만 준 새 세션에서 돌려 yds-check 문제 수, hex 직접 쓴 수, 없는 클래스 수를 표로 쌓는다.
3. 템플릿 2순위 7종(내 강의실, 오답 노트, 수료증, 결제 완료와 영수증, 환불 신청, 쿠폰함, 1:1 문의 내역)과 3순위 3종(오류, 점검, 알림 목록). 사용자 지시 대기.
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
