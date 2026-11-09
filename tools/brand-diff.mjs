#!/usr/bin/env node
// 브랜드별 전후 비교 (2026-11-09): 기준 버전의 YDS 와 지금의 YDS 에 같은 브랜드를 입혀 부품별로 화면을 비교한다.
//   node tools/brand-diff.mjs <브랜드> [기준 태그, 없으면 최신 태그]
// 기준 버전의 미리보기(index.html)를 두 벌의 CSS 로 그리므로, 브랜드 화면에서 YDS 변경 때문에 달라진 부품만 나온다.
// 결과는 .cache/brand-diff/<브랜드>/report.html (로컬 전용). 라이트와 다크를 모두 본다.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
if (!slug) { console.log('사용: node tools/brand-diff.mjs <브랜드> [기준 태그]'); process.exit(2); }
const brandFile = path.join(R, 'dist/brands', slug + '.css');
if (!fs.existsSync(brandFile)) { console.error(`dist/brands/${slug}.css 가 없습니다. node tools/brands.mjs 를 먼저 돌립니다.`); process.exit(1); }
const git = (...a) => spawnSync('git', a, { cwd: R, encoding: 'utf8' });
const ref = process.argv[3] || git('describe', '--tags', '--abbrev=0').stdout.trim();
if (!ref || git('rev-parse', '--verify', ref).status !== 0) { console.error(`기준 태그를 찾을 수 없습니다: ${ref}`); process.exit(1); }
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome'].find((p) => fs.existsSync(p));
if (!CHROME) { console.error('Chrome 이 없습니다'); process.exit(1); }

// 준비: before = 기준 dist, after = 지금 dist, 화면과 브랜드 파일은 양쪽이 같다
const WORK = path.join(R, '.cache/brand-diff', slug);
fs.rmSync(WORK, { recursive: true, force: true });
const before = path.join(WORK, 'before'), after = path.join(WORK, 'after'), IMG = path.join(WORK, 'img');
for (const d of [before, after, IMG]) fs.mkdirSync(d, { recursive: true });
const tar = path.join(WORK, 'base.tar');
if (git('archive', '--format=tar', '-o', tar, ref, 'index.html', 'dist').status !== 0) { console.error('기준 버전을 꺼내지 못했습니다'); process.exit(1); }
if (spawnSync('tar', ['-xf', '../base.tar'], { cwd: before }).status !== 0) { console.error('기준 버전을 풀지 못했습니다'); process.exit(1); }
fs.cpSync(path.join(R, 'dist'), path.join(after, 'dist'), { recursive: true });
fs.mkdirSync(path.join(before, 'dist/brands'), { recursive: true });
fs.copyFileSync(brandFile, path.join(before, 'dist/brands', slug + '.css'));
const STILL = '<style>*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}.ds-timer{visibility:hidden!important}</style>'; // 타이머는 시간에 따라 글자가 달라져 비교에서 뺀다
const page = fs.readFileSync(path.join(before, 'index.html'), 'utf8').replace('<html', `<html data-ds-brand="${slug}"`).replace('</head>', `<link rel="stylesheet" href="dist/brands/${slug}.css">${STILL}</head>`);
for (const d of [before, after]) fs.writeFileSync(path.join(d, 'index.html'), page);

// 헤드리스 Chrome
const port = 9300 + Math.floor(Math.random() * 500);
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'yds-brand-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let tabs = null;
for (let i = 0; i < 50 && !tabs; i++) { await sleep(200); try { tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch {} }
if (!tabs) { chrome.kill(); console.error('Chrome 에 연결하지 못했습니다'); process.exit(1); }
const ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => { ws.onopen = r; });
let id = 0; const wait = new Map(); let loaded = false;
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.method === 'Page.loadEventFired') loaded = true; if (m.id && wait.has(m.id)) { wait.get(m.id)(m); wait.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { const n = ++id; wait.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const run = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || '스크립트 오류'); return r.result.result.value; };
const open = async (url) => { loaded = false; await send('Page.navigate', { url }); for (let i = 0; i < 200 && !loaded; i++) await sleep(50); };
await send('Page.enable');

async function capture(dir, mode) {
  await open(pathToFileURL(path.join(dir, 'index.html')).href);
  await run(`document.documentElement.setAttribute('data-theme','${mode}');document.fonts.ready.then(()=>new Promise(r=>setTimeout(r,400)))`);
  const list = await run(`[...document.querySelectorAll('section.pv-sec')].map(s=>{const r=s.getBoundingClientRect();return{id:s.id,name:s.querySelector('h2').lastChild.textContent.trim(),x:r.x+scrollX,y:r.y+scrollY,w:r.width,h:r.height}})`);
  const shots = {};
  for (const s of list) {
    if (!s.w || !s.h) continue;
    const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: s.x, y: s.y, width: s.w, height: s.h, scale: 1 } });
    shots[s.id] = { name: s.name, data: r.result.data };
  }
  return shots;
}
const COMPARE = `async (a,b)=>{const load=s=>new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src='data:image/png;base64,'+s});const[x,y]=await Promise.all([load(a),load(b)]);if(x.width!==y.width||x.height!==y.height)return{size:[x.width,x.height,y.width,y.height],pct:100};const d=i=>{const c=new OffscreenCanvas(i.width,i.height).getContext('2d');c.drawImage(i,0,0);return c.getImageData(0,0,i.width,i.height).data};const p=d(x),q=d(y);let n=0;for(let i=0;i<p.length;i+=4)if(Math.abs(p[i]-q[i])>12||Math.abs(p[i+1]-q[i+1])>12||Math.abs(p[i+2]-q[i+2])>12)n++;return{pct:n/(p.length/4)*100}}`;

const changed = [];
let total = 0;
for (const mode of ['light', 'dark']) {
  const a = await capture(before, mode), b = await capture(after, mode);
  await open('about:blank');
  for (const key of Object.keys(a)) {
    if (!b[key]) continue;
    total++;
    const r = await run(`(${COMPARE})(${JSON.stringify(a[key].data)},${JSON.stringify(b[key].data)})`);
    if (r.pct < 0.01) continue;
    const base = `${mode}-${key}`;
    fs.writeFileSync(path.join(IMG, base + '-before.png'), Buffer.from(a[key].data, 'base64'));
    fs.writeFileSync(path.join(IMG, base + '-after.png'), Buffer.from(b[key].data, 'base64'));
    changed.push({ mode, key, base, name: a[key].name, pct: r.pct, size: r.size });
  }
}
ws.close(); chrome.kill();
await sleep(300);
try { fs.rmSync(prof, { recursive: true, force: true }); } catch {}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const label = (m) => (m === 'light' ? '라이트' : '다크');
fs.writeFileSync(path.join(WORK, 'report.html'), `<!doctype html><meta charset="utf-8"><title>${slug} 전후 비교</title><style>body{font:14px/1.5 sans-serif;margin:24px}h2{font-size:16px;margin:32px 0 8px}.r{display:grid;grid-template-columns:1fr 1fr;gap:12px}img{max-width:100%;border:1px solid #ccc}</style><h1>${esc(slug)}: ${esc(ref)} 와 지금 비교, 바뀐 곳 ${changed.length}개 / ${total}개</h1>${changed.map((c) => `<h2>${esc(c.name)} (${label(c.mode)}, ${c.size ? '크기 달라짐' : c.pct.toFixed(2) + '%'})</h2><div class="r"><div>전<br><img src="img/${c.base}-before.png" alt=""></div><div>후<br><img src="img/${c.base}-after.png" alt=""></div></div>`).join('')}`);
console.log(`${slug}: ${ref} 와 지금 비교, 부품 화면 ${total}개 가운데 바뀐 곳 ${changed.length}개`);
for (const c of changed) console.log(`  ${label(c.mode)} ${c.name}: ${c.size ? '크기 달라짐' : c.pct.toFixed(2) + '%'}`);
console.log(`결과: ${path.relative(R, path.join(WORK, 'report.html')).replace(/\\/g, '/')}`);
