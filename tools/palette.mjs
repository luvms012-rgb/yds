// 색 계산 공용 코드: 테마 생성기(site/themes/gen.mjs)와 브랜드 생성기(tools/brands.mjs)가 함께 쓴다.
export const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
export const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const rgb2hex = (c) => '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
export const mix = (a, b, t) => rgb2hex(hex2rgb(a).map((v, i) => v + (hex2rgb(b)[i] - v) * t));
// 600 단계 색 하나로 100~1000 팔레트를 만든다 (밝은 쪽은 흰색, 어두운 쪽은 검정과 섞는다)
export const scale = (base) => ({
  100: mix(base, '#ffffff', 0.92), 200: mix(base, '#ffffff', 0.84), 300: mix(base, '#ffffff', 0.7), 400: mix(base, '#ffffff', 0.5), 500: mix(base, '#ffffff', 0.26),
  600: base, 700: mix(base, '#000000', 0.16), 800: mix(base, '#000000', 0.32), 900: mix(base, '#000000', 0.5), 1000: mix(base, '#000000', 0.68),
});
// 두 색의 글자 대비 (WCAG)
const lum = (h) => { const [r, g, b] = hex2rgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
