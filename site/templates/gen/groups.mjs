// 템플릿 분류의 정본 (2026-11-11 사용자 "카테고리가 더이상 늘지 않도록 서브 카테고리로 구성")
// - 나누는 기준 (2026-11-15 사용자 "관리자로 옮기기"): 무엇에 관한 화면인지가 아니라 누가 쓰는 화면인지로 나눈다. 시험, 학습, 교재 같은 분류에는 고객(학습자, 응시자)이 쓰는 화면만 두고, 운영자와 담당자가 쓰는 화면은 주제가 무엇이든 관리자에 둔다.
// - 분류(탭)는 이 9개로 고정한다. 새 템플릿은 새 분류를 만들지 말고 아래 하위 분류 중 하나에 넣는다(맞는 것이 없으면 하위 분류를 더한다).
// - 순서가 곧 화면 순서다: 분류 순서 = 탭 순서, 하위 분류 순서와 그 안의 slug 순서 = 많이 쓰는 화면부터.
// - run.mjs 가 이 표로 templates.json 의 group 과 sub 를 쓰고, build.mjs 가 탭, 하위 탭, 왼쪽 메뉴 순서를 만든다.
// - 표에 없는 템플릿은 run.mjs 가 알려 준다.
export const GROUPS = [
  ['Exam', '시험', [
    ['접수', ['exam-apply', 'exam-venue', 'exam-schedule', 'exam-apply-done', 'exam-ticket']],
    ['응시', ['level-test', 'mock-exam-pbt', 'mock-exam-cbt']],
    ['성적', ['exam-my', 'exam-score', 'score-lookup']],
    ['단체', ['exam-group-apply']],
  ]],
  ['Learning', '학습', [
    ['찾기와 신청', ['learning-home', 'learning-catalog', 'class-detail', 'lesson-plan']],
    ['수강', ['lesson-home', 'learning-player', 'my-classroom', 'ai-tutor-chat', 'class-survey', 'class-review-write']],
    ['센터', ['consult-booking']],
  ]],
  // 2026-11-15 사용자 "쇼핑 카테고리는 YBM 에 어울리지 않는다, 북스 화면으로 대신": 쇼핑(Commerce)을 교재(Books)로 바꿨다. 장바구니와 요금제 비교는 결제로 옮겼다.
  ['Books', '교재', [
    ['찾기', ['book-home', 'book-list', 'textbook-detail']],
    ['학습 지원', ['book-audio', 'book-roadmap']],
  ]],
  ['Payment', '결제', [
    ['결제', ['cart', 'payment-form', 'checkout-wizard', 'subscription-checkout']],
    ['구독', ['pricing-plans', 'subscription-settings', 'subscription-cancel']],
  ]],
  ['Account', '회원', [
    ['로그인', ['login-card', 'login-sso', 'login-split']],
    ['가입과 찾기', ['signup', 'find-account']],
    ['마이페이지', ['mypage-home', 'mypage-orders', 'mypage-profile']],
    ['설정', ['settings-sidebar']],
  ]],
  ['Community', '커뮤니티', [
    ['게시판', ['community-home', 'community-board']],
    ['글', ['community-post', 'community-write']],
  ]],
  ['Support', '고객센터', [
    ['공지', ['notice-list', 'notice-detail']],
    ['도움말', ['help-center', 'faq']],
    ['문의', ['contact-form']],
  ]],
  ['Content', '콘텐츠', [
    ['메인과 이벤트', ['service-home', 'event-page']],
    ['영상', ['video-home', 'video-title-detail', 'video-watch', 'video-player']],
    ['상품', ['product-detail', 'product-gallery']],
    ['AI', ['ai-chat', 'ai-chat-landing']],
  ]],
  ['Admin', '관리자', [
    ['현황', ['dashboard', 'learning-dashboard', 'exam-group-dashboard', 'dashboard-progress', 'dashboard-alert-rail']],
    ['처리', ['admin-request-list', 'admin-request-detail', 'admin-request-form', 'learning-admin', 'detail-page']],
    ['목록 관리', ['table-filter', 'exam-group-roster', 'table-inbox', 'table-grouped', 'table-collapsible', 'table-tree']],
    ['등록', ['form-wizard', 'form-wizard-vertical']],
  ]],
];

// 뺀 템플릿 (2026-11-15 사용자 "템플릿 카테고리 정리, 실제로 잘 쓰이지 않는 것은 삭제, 중복 제거"). run.mjs 가 만들지 않는다.
// 2026-11-15 사용자 "유지하기 쉽게도 진행" 으로 이 템플릿들을 만드는 생성기 코드도 지웠다(tools.mjs 전체 포함). 되살리려면 git 기록(ea268f15 이전)에서 가져온다.
export const REMOVED = [
  // 서비스 화면이 아닌 도구, 문서 사이트 화면
  'editor', 'file-explorer', 'canvas-editor', 'ide', 'kanban-board', 'documentation', 'documentation-design', 'documentation-technical',
  // 다른 템플릿과 구조가 겹침: 할 일 상세(요청 상세), 갤러리 4(상품 갤러리), 히어로 2(서비스 메인, 이벤트 페이지), 단계 폼 2, 설정 2(설정 패널), 빈 장바구니(장바구니)
  'work-item-detail', 'classic-gallery', 'mixed-gallery', 'side-gallery', 'library', 'centered-hero', 'gallery-hero', 'form-wizard-dialog', 'form-wizard-inline', 'settings', 'settings-dialog', 'cart-empty',
  // 2026-11-15 사용자 "센터 찾기 삭제"
  'center-finder',
];

// slug → { group, sub, rank } (rank = 전체 순서)
export const PLACE = {};
let rank = 0;
for (const [group, , subs] of GROUPS) for (const [sub, slugs] of subs) for (const slug of slugs) PLACE[slug] = { group, sub, rank: rank++ };
