// 템플릿 목록 썸네일 그림 만들기 (2026-11-16 사용자 "템플릿 썸네일이 늦게 뜸")
// 목록 카드가 템플릿 81쪽을 iframe 으로 한꺼번에 열어 느렸다. 대신 헤드리스 Chrome 으로 PC 화면(1440x900)을 찍어
// site/templates/thumbs/<slug>.webp(라이트), <slug>-dark.webp(다크) 로 둔다. 문서 사이트처럼 모노톤(brand-mono.css)을 입혀 찍는다.
// thumbs/index.json 에 찍은 템플릿 HTML 의 해시를 적어 두고, tools/check.mjs 가 템플릿이 바뀌었는데 그림이 그대로면 알려 준다.
// 쓰는 법: node tools/tpl-thumbs.mjs [slug ...]  (slug 를 주지 않으면 바뀐 것만, --all 이면 모두)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = path.join(DS, 'site/templates/pages');
const OUT = path.join(DS, 'site/templates/thumbs');
const MANIFEST = path.join(OUT, 'index.json');
const MONO = path.join(DS, 'site/src/brand-mono.css');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome'].find((f) => fs.existsSync(f));
if (!CHROME) { console.error('Chrome 이 없어요'); process.exit(1); }

export const pageHash = (slug) => crypto.createHash('sha1').update(fs.readFileSync(path.join(PAGES, slug + '.html'))).update(fs.readFileSync(MONO)).digest('hex').slice(0, 10);

const args = process.argv.slice(2);
const all = fs.readdirSync(PAGES).filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5)).sort();
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const todo = args.includes('--all') ? all : args.filter((a) => !a.startsWith('--')).length ? args.filter((a) => all.includes(a)) : all.filter((s) => manifest[s] !== pageHash(s) || !fs.existsSync(path.join(OUT, s + '.webp')) || !fs.existsSync(path.join(OUT, s + '-dark.webp')));
fs.mkdirSync(OUT, { recursive: true });
// 목록에서 빠진 템플릿의 그림은 지운다
for (const f of fs.readdirSync(OUT)) { const s = f.replace(/(-dark)?\.webp$/, ''); if (f.endsWith('.webp') && !all.includes(s)) fs.rmSync(path.join(OUT, f)); }
for (const s of Object.keys(manifest)) if (!all.includes(s)) delete manifest[s];
if (!todo.length) { fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n'); console.log('  ✔ 템플릿 썸네일: 바뀐 것 없음'); process.exit(0); }

const port = 9300 + Math.floor(Math.random() * 500);
const prof = path.join(DS, '.cache', 'chrome-thumbs');
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ver; for (let i = 0; i < 60 && !ver; i++) { try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch { await sleep(250); } }
const ws = new WebSocket(ver.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const wait = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && wait.has(d.id)) { wait.get(d.id)(d); wait.delete(d.id); } };
const send = (method, params = {}, sessionId) => new Promise((r) => { const i = ++id; wait.set(i, r); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });
const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
const S = (m, p) => send(m, p, sessionId);
await S('Page.enable'); await S('Runtime.enable');
await S('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await S('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
const monoUrl = pathToFileURL(MONO).href;
// 그림이 다 오고 글꼴이 준비될 때까지 기다린다
const READY = `new Promise(async (ok) => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); }))); requestAnimationFrame(() => requestAnimationFrame(ok)); })`;
let n = 0;
for (const slug of todo) {
  for (const theme of ['light', 'dark']) {
    await S('Page.navigate', { url: pathToFileURL(path.join(PAGES, slug + '.html')).href });
    await sleep(400);
    await S('Runtime.evaluate', { expression: `(() => { const d = document.documentElement; d.dataset.theme = ${JSON.stringify(theme)}; if (!document.getElementById('site-brand-mono')) { const l = document.createElement('link'); l.id = 'site-brand-mono'; l.rel = 'stylesheet'; l.href = ${JSON.stringify(monoUrl)}; document.head.appendChild(l); } })()` });
    await S('Runtime.evaluate', { expression: READY, awaitPromise: true });
    await sleep(150);
    const { result } = await S('Page.captureScreenshot', { format: 'webp', quality: 72, clip: { x: 0, y: 0, width: 1440, height: 900, scale: 0.75 } });
    fs.writeFileSync(path.join(OUT, slug + (theme === 'dark' ? '-dark' : '') + '.webp'), Buffer.from(result.data, 'base64'));
  }
  manifest[slug] = pageHash(slug);
  if (++n % 10 === 0) console.log(`  ${n} / ${todo.length}`);
}
ws.close(); chrome.kill();
const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
const kb = Math.round(fs.readdirSync(OUT).filter((f) => f.endsWith('.webp')).reduce((a, f) => a + fs.statSync(path.join(OUT, f)).size, 0) / 1024);
console.log(`  ✔ 템플릿 썸네일 ${todo.length}개 찍음 (모두 ${kb}KB, site/templates/thumbs)`);
