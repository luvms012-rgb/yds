// 사내 서버용 묶음: node tools/server-pack.mjs
// 공식 주소 https://design.ybmnet.co.kr/yds/ 에 그대로 풀어 올릴 파일을 zip 하나로 만든다 (2026-11-17 사용자).
// 결과: works/project/(서버업로드)/yds_날짜.zip (예전 yds_*.zip 은 지운다). 올리기는 사용자가 한다.
// 안 = 문서 사이트(site/ 안을 맨 위에, /site/ 주소 없음), dist/(최신 CSS, JS), catalog.html(예전 맨 위 카탈로그),
//      v1.0.0/dist ... (git 태그마다 버전 고정 주소), components.json, VERSION, tokens/ 공개 파일 셋
// 빼는 것 = 만드는 코드(site 맨 위 *.mjs, src/, templates/gen/. AI 검사 스크립트 ai/yds-check.mjs 는 넣는다), 작업 규칙 글(CLAUDE.md, PROPOSAL.md, REFERENCE-ANALYSIS.md), 숨긴 Themes
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'deploy.config.json'), 'utf8'));
const out = path.resolve(root, '..', 'project', '(서버업로드)');
const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'yds-pack-'));
const rel = (p) => path.relative(root, p).split(path.sep).join('/');

// 1 문서 사이트: 공개 주소에 /site/ 를 쓰지 않는다(2026-11-19 사용자 "yds/site 사용 금지"). site/ 안을 맨 위에 그대로 펼친다
//   만드는 코드와 작업 글은 뺀다
const SITE_SKIP = [
  /^site\/src(\/|$)/, /^site\/templates\/gen(\/|$)/, /^site\/themes(\/|$)/,
  /^site\/(CLAUDE|PROPOSAL|REFERENCE-ANALYSIS)\.md$/, /^site\/[^/]+\.mjs$/, /(^|\/)\.DS_Store$/, /(^|\/)Thumbs\.db$/,
];
fs.cpSync(path.join(root, 'site'), stage, { recursive: true, filter: (src) => !SITE_SKIP.some((re) => re.test(rel(src))) });
// 저장소에서 site/ 밖(dist, components.json)을 가리키던 상대 경로는 한 칸 줄인다. site/ 안끼리의 경로는 그대로
const TEXT_EXT = /\.(html|css|js|json|txt|md|mdc|svg)$/;
let fixed = 0;
(function up(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { up(p); continue; }
    if (!TEXT_EXT.test(e.name)) continue;
    const depth = path.relative(stage, d).split(path.sep).filter(Boolean).length;
    const src = fs.readFileSync(p, 'utf8');
    const outText = src.replace(/(["'(=])((?:\.\.\/)+)/g, (m, q, ups) => (ups.length / 3 > depth ? (fixed++, q + ups.slice(3)) : m));
    if (outText !== src) fs.writeFileSync(p, outText);
  }
})(stage);

// 2 최신 dist, 공개 파일 (site/ 에 같은 이름이 있으면 멈춘다)
for (const f of ['dist', 'components.json', 'VERSION', 'tokens', 'catalog.html']) if (fs.existsSync(path.join(stage, f))) { console.error(`site/${f} 가 맨 위 공개 파일과 이름이 겹침`); process.exit(1); }
fs.cpSync(path.join(root, 'dist'), path.join(stage, 'dist'), { recursive: true });
for (const f of ['components.json', 'VERSION']) fs.copyFileSync(path.join(root, f), path.join(stage, f));
fs.mkdirSync(path.join(stage, 'tokens'));
for (const f of ['design-tokens.json', 'tokens.js', 'tailwind.preset.js']) fs.copyFileSync(path.join(root, 'tokens', f), path.join(stage, 'tokens', f));

// 3 예전 맨 위 카탈로그는 catalog.html 로 (문서 사이트 링크 site/ 는 맨 위로)
fs.writeFileSync(path.join(stage, 'catalog.html'), fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/(href=")site\//g, '$1'));

// 4 버전 고정 주소: git 태그마다 그 판의 dist 를 v1.2.0/dist 처럼 넣는다
const git = (...a) => execFileSync('git', a, { cwd: root, encoding: 'utf8' }).trim();
const tags = git('tag', '--list', 'v*').split('\n').filter((t) => /^v\d+\.\d+\.\d+$/.test(t));
const tar = process.platform === 'win32' ? path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe') : 'tar';
for (const t of tags) {
  const dir = path.join(stage, t);
  fs.mkdirSync(dir);
  const ball = path.join(stage, `${t}.tar`);
  execFileSync('git', ['archive', '--format=tar', '-o', ball, t, 'dist'], { cwd: root });
  execFileSync(tar, ['-x', '-f', ball, '-C', dir]);
  fs.unlinkSync(ball);
}

// 5 개인 GitHub 주소가 남았으면 멈춘다 (공식 주소는 사내 서버, GitHub 는 개발용)
const BAD = /luvms012-rgb|github\.io\/yds|github\.com\/luvms|ybmnet\.co\.kr\/yds\/site\//; // /yds/site/ 주소도 막는다(2026-11-19)
const TEXT = /\.(html|css|js|json|txt|md|mdc|svg)$/;
const bad = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (TEXT.test(e.name) && !/^v\d/.test(path.relative(stage, p)) && BAD.test(fs.readFileSync(p, 'utf8'))) bad.push(path.relative(stage, p));
  }
})(stage);
if (bad.length) { console.error('개인 GitHub 주소나 /yds/site/ 가 남은 파일:\n  ' + bad.join('\n  ')); process.exit(1); }

// 6 압축 (윈도우 tar = zip). 예전 yds_*.zip 은 지운다
fs.mkdirSync(out, { recursive: true });
const d = new Date(), pad = (n) => String(n).padStart(2, '0');
const zip = path.join(out, `yds_${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}.zip`);
for (const f of fs.readdirSync(out)) if (/^yds_\d{8}\.zip$/.test(f)) fs.unlinkSync(path.join(out, f));
execFileSync(tar, ['-a', '-c', '-f', zip, '-C', stage, ...fs.readdirSync(stage)]);
let n = 0;
(function count(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) e.isDirectory() ? count(path.join(d, e.name)) : n++; })(stage);
fs.rmSync(stage, { recursive: true, force: true });
console.log(`site 밖 상대 경로 ${fixed}곳 한 칸 줄임`);
console.log(`만듦 ${path.relative(path.resolve(root, '..'), zip)} (${(fs.statSync(zip).size / 1048576).toFixed(1)}MB, 파일 ${n}개, 버전 고정 ${tags.join(', ')})`);
console.log(`올릴 곳: ${cfg.publicUrl} 폴더에 그대로 푼다`);
