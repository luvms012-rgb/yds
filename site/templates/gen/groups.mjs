// 템플릿 분류의 정본 (2026-11-11 사용자 "카테고리가 더이상 늘지 않도록 서브 카테고리로 구성")
// - 분류(탭)는 이 9개로 고정한다. 새 템플릿은 새 분류를 만들지 말고 아래 하위 분류 중 하나에 넣는다(맞는 것이 없으면 하위 분류를 더한다).
// - 순서가 곧 화면 순서다: 분류 순서 = 탭 순서, 하위 분류 순서와 그 안의 slug 순서 = 많이 쓰는 화면부터.
// - run.mjs 가 이 표로 templates.json 의 group 과 sub 를 쓰고, build.mjs 가 탭, 하위 탭, 왼쪽 메뉴 순서를 만든다.
// - 표에 없는 템플릿은 run.mjs 가 알려 준다.
export const GROUPS = [
  ['Exam', '시험', [
    ['접수', ['exam-apply', 'exam-schedule', 'exam-apply-done', 'exam-ticket']],
    ['응시', ['level-test', 'mock-exam-pbt', 'mock-exam-cbt']],
    ['성적', ['exam-my', 'exam-score', 'score-lookup']],
    ['단체', ['exam-group-apply', 'exam-group-roster', 'exam-group-dashboard']],
  ]],
  ['Learning', '학습', [
    ['찾기와 신청', ['learning-home', 'learning-catalog', 'textbook-detail', 'lesson-plan']],
    ['수강', ['learning-player', 'learning-dashboard']],
    ['센터', ['consult-booking', 'center-finder']],
    ['운영', ['learning-admin']],
  ]],
  ['Commerce', '쇼핑', [
    ['장바구니', ['cart', 'cart-empty']],
    ['요금제', ['pricing-plans']],
  ]],
  ['Payment', '결제', [
    ['결제', ['payment-form', 'checkout-wizard', 'subscription-checkout']],
    ['구독', ['subscription-settings', 'subscription-cancel']],
  ]],
  ['Account', '회원', [
    ['로그인', ['login-card', 'login-sso', 'login-split']],
    ['가입과 찾기', ['signup', 'find-account']],
    ['마이페이지', ['mypage-home', 'mypage-orders', 'mypage-profile']],
    ['설정', ['settings', 'settings-sidebar', 'settings-dialog']],
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
    ['메인과 이벤트', ['service-home', 'event-page', 'centered-hero', 'gallery-hero']],
    ['상품', ['product-detail', 'detail-page', 'product-gallery', 'side-gallery']],
    ['갤러리', ['library', 'classic-gallery', 'mixed-gallery']],
    ['문서', ['documentation', 'documentation-design', 'documentation-technical', 'work-item-detail']],
    ['AI', ['ai-chat', 'ai-chat-landing']],
  ]],
  ['Admin', '관리자', [
    ['대시보드', ['dashboard', 'dashboard-progress', 'dashboard-alert-rail']],
    ['처리', ['admin-request-list', 'admin-request-detail', 'admin-request-form']],
    ['표', ['table-filter', 'table-inbox', 'table-grouped', 'table-collapsible', 'table-tree']],
    ['단계 폼', ['form-wizard', 'form-wizard-dialog', 'form-wizard-inline', 'form-wizard-vertical']],
    ['도구', ['kanban-board', 'editor', 'file-explorer', 'canvas-editor', 'ide']],
  ]],
];

// slug → { group, sub, rank } (rank = 전체 순서)
export const PLACE = {};
let rank = 0;
for (const [group, , subs] of GROUPS) for (const [sub, slugs] of subs) for (const slug of slugs) PLACE[slug] = { group, sub, rank: rank++ };
