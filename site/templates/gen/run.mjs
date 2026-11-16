// 템플릿 생성기: 분류별 파일(dashboard.mjs 등)을 모아 ../pages/*.html 과 ../../src/templates.json 을 다시 쓴다.
// 사용: node site/templates/gen/run.mjs  →  node site/build.mjs
// 레퍼런스 A 템플릿 51종의 구조를 YDS 로 다시 짠 것이다. 목록에 없는 옛 템플릿 파일은 지운다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { page } from './kit.mjs';
import { PLACE, REMOVED } from './groups.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PAGES = path.join(HERE, '..', 'pages');
const JSON_PATH = path.join(HERE, '..', '..', 'src', 'templates.json');
const GROUPS = ['Dashboard', 'Table', 'Form', 'Settings', 'Login', 'Tools', 'Content', 'AI Chat', 'Gallery', 'Community', 'Pricing', 'My Page', 'Commerce', 'Exam', 'Education', 'Exam B2B', 'Learning B2B'];
const MODS = ['dashboard', 'table', 'form', 'settings', 'login', 'content', 'aichat', 'gallery', 'community', 'pricing', 'mypage', 'commerce', 'exam', 'service', 'learning', 'test', 'basics', 'admin', 'media', 'books', 'feedback', 'lesson'];

const all = [];
for (const m of MODS) {
  const f = path.join(HERE, m + '.mjs');
  if (!fs.existsSync(f)) continue;
  const { templates } = await import(pathToFileURL(f).href);
  all.push(...templates.filter((t) => !REMOVED.includes(t.slug)));  // 뺀 템플릿은 만들지 않는다 (groups.mjs REMOVED)
}
// 분류와 하위 분류는 groups.mjs 가 정본이다 (생성기의 group 값보다 우선)
const unplaced = all.filter((t) => !PLACE[t.slug]).map((t) => t.slug);
if (unplaced.length) console.log('  ! groups.mjs 에 자리가 없는 템플릿:', unplaced.join(', '));
for (const t of all) if (PLACE[t.slug]) { t.group = PLACE[t.slug].group; t.sub = PLACE[t.slug].sub; }
all.sort((a, b) => (PLACE[a.slug]?.rank ?? 999) - (PLACE[b.slug]?.rank ?? 999) || a.en.localeCompare(b.en));

const old = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const keepFigma = Object.fromEntries((old.templates || []).filter((t) => t.figma && t.rebuilt).map((t) => [t.slug, t.figma]));
// 내보내는 HTML 은 순수 코드만: <style>, <script> 안의 /* */ 주석과 HTML 주석을 뺀다(생성기 주석은 만드는 사람용, 2026-11-16 사용자 "지침 모두 삭제. 순수 코드만")
const pure = (html) => html
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/(<(style|script)\b[^>]*>)([\s\S]*?)(<\/\2>)/g, (m, open, tag, inner, close) => open + inner.replace(/\/\*[\s\S]*?\*\//g, '').replace(/[ \t]+$/gm, '').replace(/\n{2,}/g, '\n') + close);
for (const t of all) fs.writeFileSync(path.join(PAGES, t.slug + '.html'), pure(page({ title: t.name, css: t.css || '', body: t.body, bodyClass: t.bodyClass || '', h1: t.h1 || '' })));
const slugs = new Set(all.map((t) => t.slug));
let removed = 0;
for (const f of fs.readdirSync(PAGES)) if (f.endsWith('.html') && !slugs.has(f.slice(0, -5))) { fs.unlinkSync(path.join(PAGES, f)); removed++; }
const out = { ...old, templates: all.map(({ slug, en, name, group, sub, desc }) => ({ slug, name, en, group, ...(sub ? { sub } : {}), desc, rebuilt: true, ...(keepFigma[slug] ? { figma: keepFigma[slug] } : {}) })) };
fs.writeFileSync(JSON_PATH, JSON.stringify(out, null, 2) + '\n');
console.log(`${all.length}종 생성, 옛 파일 ${removed}개 삭제`);
