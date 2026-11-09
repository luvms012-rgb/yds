#!/usr/bin/env node
// 브랜드 층 생성기 (2026-11-09 사용자 "yds 를 뿌리로 두고 고유 특성을 뺀 나머지는 자동으로 변경")
//   node tools/brands.mjs   brands/<브랜드>.json → dist/brands/<브랜드>.css 를 만들고 대비를 보여 준다
// 브랜드 파일에는 yds 와 다른 값만 적는다. 적지 않은 값은 모두 yds 를 따라가므로 yds 가 바뀌어도 병합할 것이 없다.
// 쓰는 법: <html data-ds-brand="브랜드"> 에 dist/ybm-ds.css 다음 dist/brands/브랜드.css
// 브랜드 파일에 적을 수 있는 값 (이 밖의 값은 tools/check.mjs 가 오류로 막는다)
//   name           브랜드 이름 (필수)
//   color          대표색 하나 (600 단계, 100~1000 을 자동으로 만든다) 또는
//   palette        { light: {100~1000}, dark: {100~1000} } 공식 10단계 (dark 를 빼면 light 를 뒤집어 쓴다)
//   onBrandSolid   브랜드 버튼 위 글자색 (밝은 브랜드 색일 때)
//   canvas, layerDefault, layerFloating   바탕과 면 색
//   위 네 색은 "#rrggbb" 또는 { light, dark } 로 적는다
//   shapeScale     모서리 곡률 배수 (0~2, 기본 1)
//   font           글꼴 목록 (글꼴 파일을 불러오는 일은 서비스가 맡는다)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STEPS, scale, contrast } from './palette.mjs';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(R, 'brands');
const OUT = path.join(R, 'dist', 'brands');
const HEX = /^#[0-9a-f]{6}$/i;
const COLORS = { onBrandSolid: '--ds-color-fg-on-brand-solid', canvas: '--ds-color-bg-canvas', layerDefault: '--ds-color-bg-layer-default', layerFloating: '--ds-color-bg-layer-floating' };
const ALLOWED = new Set(['name', 'color', 'palette', 'shapeScale', 'font', ...Object.keys(COLORS)]);

const validSteps = (p) => p && typeof p === 'object' && STEPS.every((s) => HEX.test(p[s] || '')) && Object.keys(p).length === STEPS.length;

export function validate(slug, b) {
  const e = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) e.push('파일 이름은 영문 소문자, 숫자, - 만 씁니다');
  for (const k of Object.keys(b)) if (!ALLOWED.has(k)) e.push(`허용되지 않은 값 ${k}`);
  if (typeof b.name !== 'string' || !b.name.trim()) e.push('name 이 없습니다');
  if (!!b.color === !!b.palette) e.push('color 와 palette 가운데 하나만 적습니다');
  if (b.color && !HEX.test(b.color)) e.push('color 는 #rrggbb 로 적습니다');
  if (b.palette) {
    if (Object.keys(b.palette).some((k) => k !== 'light' && k !== 'dark')) e.push('palette 에는 light, dark 만 적습니다');
    if (!validSteps(b.palette.light)) e.push('palette.light 는 100~1000 열 단계를 #rrggbb 로 적습니다');
    if (b.palette.dark && !validSteps(b.palette.dark)) e.push('palette.dark 는 100~1000 열 단계를 #rrggbb 로 적습니다');
  }
  for (const k of Object.keys(COLORS)) {
    const v = b[k]; if (v === undefined) continue;
    const ok = typeof v === 'string' ? HEX.test(v) : v && HEX.test(v.light || '') && HEX.test(v.dark || '') && Object.keys(v).length === 2;
    if (!ok) e.push(`${k} 는 #rrggbb 또는 { light, dark } 로 적습니다`);
  }
  if (b.shapeScale !== undefined && !(typeof b.shapeScale === 'number' && b.shapeScale >= 0 && b.shapeScale <= 2)) e.push('shapeScale 은 0 에서 2 사이 숫자입니다');
  if (b.font !== undefined && !(typeof b.font === 'string' && b.font.trim() && !/[;{}<>]/.test(b.font))) e.push('font 는 글꼴 목록 글자만 적습니다');
  return e;
}

const paletteOf = (b, mode) => {
  const light = b.palette ? b.palette.light : scale(b.color);
  if (mode === 'light') return light;
  if (b.palette && b.palette.dark) return b.palette.dark;
  return Object.fromEntries(STEPS.map((s, i) => [s, light[STEPS[STEPS.length - 1 - i]]]));
};
const colorVars = (b, mode) => {
  const p = paletteOf(b, mode);
  const v = Object.fromEntries(STEPS.map((s) => [`--ds-color-palette-brand-${s}`, p[s]]));
  for (const [k, name] of Object.entries(COLORS)) if (b[k] !== undefined) v[name] = typeof b[k] === 'string' ? b[k] : b[k][mode];
  return v;
};

export function brandCss(slug, b) {
  const block = (sel, v) => `${sel} {\n${Object.entries(v).map(([k, x]) => `  ${k}: ${x};`).join('\n')}\n}\n`;
  const shared = {};
  if (b.shapeScale !== undefined) shared['--ds-shape-scale'] = b.shapeScale;
  if (b.font !== undefined) shared['--ds-font-family-base'] = b.font;
  const root = `:root[data-ds-brand="${slug}"]`;
  return `/* yds 브랜드 ${b.name}: brands/${slug}.json 으로 만든 파일입니다. 직접 고치지 말고 원본을 고친 뒤 node tools/brands.mjs 를 돌립니다.\n   <html data-ds-brand="${slug}"> 에 dist/ybm-ds.css 다음에 불러옵니다. */\n\n${block(root, { ...colorVars(b, 'light'), ...shared })}\n${block(`${root}[data-theme="dark"]`, colorVars(b, 'dark'))}`;
}

export const loadBrands = () => (fs.existsSync(SRC) ? fs.readdirSync(SRC).filter((f) => f.endsWith('.json')).sort() : []).map((f) => {
  const slug = f.replace(/\.json$/, '');
  try { const brand = JSON.parse(fs.readFileSync(path.join(SRC, f), 'utf8')); return { slug, brand, errors: validate(slug, brand) }; } catch (e) { return { slug, brand: null, errors: ['JSON 을 읽을 수 없습니다: ' + e.message] }; }
});

const parseTokens = (css) => {
  const t = { light: {}, dark: {} };
  for (const m of css.matchAll(/^:root(\[data-theme="dark"\])?\s*\{([\s\S]*?)^\}/gm)) for (const d of m[2].replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--ds-[a-z0-9_-]+)\s*:\s*([^;]+);/g)) t[m[1] ? 'dark' : 'light'][d[1]] = d[2].trim();
  return t;
};
const resolve = (name, map, depth = 0) => { const v = map[name]; if (v === undefined || depth > 8) return null; const m = v.match(/^var\((--ds-[a-z0-9_-]+)\)$/); return m ? resolve(m[1], map, depth + 1) : v; };
const PAIRS = [['브랜드 버튼 글자', '--ds-color-fg-on-brand-solid', '--ds-color-bg-brand-solid', true], ['브랜드 글자', '--ds-color-fg-brand', '--ds-color-bg-layer-default', false], ['연한 면 위 브랜드 글자', '--ds-color-fg-brand-contrast', '--ds-color-bg-brand-weak', false]];

// 대비 기준: 라이트 브랜드 버튼 글자가 4.5 미만이거나 어느 조합이든 3 미만이면 오류, 그 밖에 4.5 미만은 주의
export function contrastOf(b, tokensCss) {
  const t = parseTokens(tokensCss);
  const out = [];
  for (const mode of ['light', 'dark']) {
    const map = { ...t.light, ...(mode === 'dark' ? t.dark : {}), ...colorVars(b, mode) };
    for (const [label, fg, bg, key] of PAIRS) {
      const a = resolve(fg, map), c = resolve(bg, map);
      if (!HEX.test(a || '') || !HEX.test(c || '')) { out.push({ mode, label, ratio: null, level: '주의' }); continue; }
      const ratio = contrast(a, c);
      out.push({ mode, label, ratio, fg: a, bg: c, level: ratio < 3 || (key && mode === 'light' && ratio < 4.5) ? '오류' : ratio < 4.5 ? '주의' : '통과' });
    }
  }
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const brands = loadBrands();
  const bad = brands.filter((b) => b.errors.length);
  for (const b of bad) console.error(`✖ ${b.slug}: ${b.errors.join(', ')}`);
  if (bad.length) process.exit(1);
  fs.mkdirSync(OUT, { recursive: true });
  const keep = new Set(brands.map((b) => b.slug + '.css'));
  for (const f of fs.readdirSync(OUT)) if (!keep.has(f)) fs.rmSync(path.join(OUT, f));
  const tokens = fs.readFileSync(path.join(R, 'dist', 'tokens.css'), 'utf8');
  for (const { slug, brand } of brands) {
    fs.writeFileSync(path.join(OUT, slug + '.css'), brandCss(slug, brand));
    console.log(`✔ dist/brands/${slug}.css`);
    for (const r of contrastOf(brand, tokens)) console.log(`    ${r.mode === 'light' ? '라이트' : '다크'} ${r.label}: ${r.ratio ? r.ratio.toFixed(2) : '계산 못 함'} ${r.level}`);
  }
}
