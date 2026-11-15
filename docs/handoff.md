# 인수인계 (최신 1건, 매번 덮어쓴다)

- 갱신: 2026-11-15 집 Mac. 마지막 배포 `821fab27`, 버전 v1.2.0(태그). 시작은 `git pull` 뒤 이 파일. 지난 기록은 [log.md](log.md) 에서 필요할 때만.

## 한 것 (11-14 ~ 11-15, 모두 배포됨)

- **템플릿 76개**: 93개에서 잘 안 쓰는 도구, 문서 화면과 겹치는 화면 21개를 뺐다(groups.mjs `REMOVED`, 생성기 코드도 지움). 쇼핑 분류를 교재로 바꾸고 교재 4쪽, 영상과 클래스 6쪽, 관리자 처리 3쪽을 더했다. 분류 기준은 쓰는 사람(담당자 화면은 관리자).
- **템플릿을 YDS 규칙에 맞춤**: 기준점 1024 → 1280, 모바일 위 막대 Top App Bar, Avatar 는 DS 크기만, 모두 보기 화살표, 상태 Badge 색 규칙, 표 아래 Table Pagination, 숨김 h1.
- **DS 추가와 변경**: Image Frame 3:4, 2:3 / Radio Group 가로 / 아이콘 volume-2, captions, headphones / Avatar 42 → 40(42 도 40 으로 보임) / 사용 지침 4개.
- **AI 안내서**: 토큰 줄이기(yds.txt 41k → 30k, yds-full 225k → 180k), 요청 글 줄바꿈 규칙, AI 시험 3개(셋 다 검사 오류 0) 결과로 규칙 문장 고침, 브랜드를 "모양만 바꾸는 값의 묶음" 으로 설명. 기본 브랜드 색은 파랑 그대로(사용자 결정).
- **사이트**: 첫 화면 버튼 줄 제거, 템플릿 카드 "자세히 보기", Updates 배지 이름(컴포넌트, 템플릿 등)과 요청 목록 비움, 템플릿 왼쪽 메뉴 점.
- **규칙 문서 줄이기(11-15, 커밋 전)**: 루트 CLAUDE.md 5.0k → 2.8k 자, site/CLAUDE.md 32.6k → 10.5k 자(지금 규칙만, 원문은 log.md 에 보관), 이 파일도 다시 씀.

## 남은 일

1. **Figma 한 번에 맞추기**(편집 계정 luvms@ybm.co.kr 로 연결된 PC, 사용자가 싱크를 걸 때, yds-figma-draw 스킬):
   - 템플릿: 뺀 21개 프레임 지우기(지우기 전 사용자 확인), 새 13쪽 그리기(book-home, book-list, book-audio, book-roadmap, video-home, video-title-detail, video-watch, video-player, class-detail, my-classroom, admin-request-list, admin-request-detail, admin-request-form), 섹션 이름 Commerce → Books 와 groups.mjs 순서, 규칙 맞춤(Top App Bar, 상태 Badge 색, 화살표), lesson-plan 방식 줄은 칩.
   - 컴포넌트 세트: Avatar 와 Avatar Group 42 → 40, Image Frame 3:4, 2:3, Radio Group 가로 예시, 아이콘 3개, Accordion inset none, Badge xlarge(18개), 폼 필드 바탕 bg/layer-default(underline 은 투명).
   - 문서 프레임: 예시 정리 51개 반영과 지침 줄 맞춤(accordion, empty, prefix-select, quantity-picker, bottom-sheet, menu-sheet, pagination, progress, progress-circle, image-frame, skeleton, carousel 외 2차 39개는 git log 참고), 새 지침 6줄(Chip, Help Bubble, List, Markdown, Radio Group, Image Frame), Get Started 구조 카드 문구, 코드 링크 줄 번호(`node sync.mjs links`).
   - 작은 차이(필요할 때만): Text Link 화살표 변형 없음, Carousel 멈춤 버튼 상태, play/pause 채운 모양, 예전 템플릿 사진 칸 회색. 라이브러리 다시 게시는 사용자.
2. **toeic 브랜드 다크 버튼 대비 3.64**(기준 4.5): 색 값 결정이라 사용자에게 묻는다.
3. **사용자 결정 대기**: 사내 확산(하려는 일 카드 6개의 구성과 위치, 토큰 대조표, 디자이너 역할 경계), 점검표 B(값이 섞인 속성 5건), 남은 템플릿 후보(오답 노트, 수료증, 결제 완료와 영수증, 환불 신청, 쿠폰함, 1:1 문의 내역, 오류, 점검, 알림 목록, 기간별 통계 표, 월 달력 출석, 날짜별 명단, 좌석 배치도), 템플릿 UI 전체 개선(방향을 줄 때까지 짚은 화면만).
4. **YBM Family 세션**: 속성 이름 정리(221b77b6) 알리기, Carousel 이동 버튼 세로 위치 변수 `--ds-carousel-button-top` 과 좁은 화면 이동 버튼 숨기기 요청 검토.
5. **사용자가 할 일**: 자동 싱크 예약 작업 등록(앱 예약 작업 화면에 tools/auto-sync-task.md 지시문), Markdown 메뉴 복사 안내를 일반 브라우저에서 한 번 확인.
6. **오래된 대기(유효한지 확인)**: 소식 알리는 방법, 브랜드 파일을 만든 사람이 보낼 곳, 사내 주소 교체, 토익 적용, 회사 PC publish 도구 안 DS 주소. 보류 후보(모션 변수화, 모바일 템플릿, 값이 같은 변수, 회사 PC 백업 브랜치)는 log.md 맨 위.

## 주의

- 템플릿은 생성기(`site/templates/gen/*.mjs`)를 고친다. `pages/*.html` 을 손으로 고치면 다음 빌드에서 되돌아간다.
- Figma 템플릿을 tplpage 로 다시 그리면 흰 바탕이 된다. 그린 뒤 화면 바탕을 bg/canvas 로.
- Figma 커넥터 계정이 다르면 편집이 막힌다. whoami 로 확인하고 사용자에게 다시 연결을 부탁한다.
- 50KB 넘는 코드를 공유 데이터에 넣어 `eval('(' + src + ')')` 로 부를 때는 끝 세미콜론을 뺀다. `node sync.mjs figma` 점검 스크립트는 42KB 라 무겁다(줄인 판은 tools/figma-quick.mjs).
- 한글이 든 Python 은 heredoc 대신 파일로 써서 실행한다(heredoc 은 인코딩 오류).
