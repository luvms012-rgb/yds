export const GROUPS = [
  ['Exam', '시험', [
    ['접수', ['exam-apply', 'exam-venue', 'exam-schedule', 'exam-apply-done', 'exam-ticket']],
    ['응시', ['level-test', 'mock-exam-pbt', 'mock-exam-cbt']],
    ['성적', ['exam-my', 'exam-score', 'score-lookup']],
    ['단체', ['exam-group-apply']],
  ]],
  ['Learning', '학습', [
    ['찾기와 신청', ['learning-home', 'learning-catalog', 'class-detail', 'lesson-plan']],
    ['수강', ['learning-player', 'my-classroom', 'ai-tutor-chat', 'ai-tutor-report', 'class-survey', 'class-review-write']],
    ['센터', ['consult-booking']],
  ]],
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

export const REMOVED = [
  'editor', 'file-explorer', 'canvas-editor', 'ide', 'kanban-board', 'documentation', 'documentation-design', 'documentation-technical',
  'work-item-detail', 'classic-gallery', 'mixed-gallery', 'side-gallery', 'library', 'centered-hero', 'gallery-hero', 'form-wizard-dialog', 'form-wizard-inline', 'settings', 'settings-dialog', 'cart-empty',
  'center-finder',
  'lesson-home',
];

export const PLACE = {};
let rank = 0;
for (const [group, , subs] of GROUPS) for (const [sub, slugs] of subs) for (const slug of slugs) PLACE[slug] = { group, sub, rank: rank++ };
