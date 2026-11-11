// DS 원본이 바뀐 컴포넌트 찾기 (Figma 문서를 다시 맞출 대상) - 2026-11-08
//   node tools/figma-changes.mjs          마지막으로 Figma 와 맞춘 뒤 바뀐 컴포넌트 slug 목록
//   node tools/figma-changes.mjs --save   지금 상태를 "Figma 와 맞춤" 기준점으로 저장
// 기준: node site/build.mjs 가 만드는 tokens/.figma-docs.json 의 컴포넌트별 자료(설명, 사용 지침, 사용법, 속성, 예시, 대표 그림, 규격)
//       와 dist/components.css 안 그 컴포넌트 구간. 기준점은 이 PC 에만 둔다(.cache/figma-sync-mark.json, 커밋 안 함).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsFile = path.join(R, 'tokens/.figma-docs.json');
const markFile = path.join(R, '.cache/figma-sync-mark.json');
if (!fs.existsSync(docsFile)) { console.error('tokens/.figma-docs.json 이 없어요. 먼저 node site/build.mjs'); process.exit(1); }

const docs = JSON.parse(fs.readFileSync(docsFile, 'utf8')).components;
const css = fs.readFileSync(path.join(R, 'dist/components.css'), 'utf8');
// components.css 머리 주석 구간: "/* ---" 줄 다음 줄에 "NN 이름" 이 온다
const blocks = {};
const lines = css.split('\n');
let cur = null;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].startsWith('/* ---') && (lines[i + 1] || '').match(/^\s*(\d{2})\s/);
  if (m) cur = m[1];
  if (cur) (blocks[cur] ||= []).push(lines[i]);
}
const hash = (o) => crypto.createHash('sha1').update(JSON.stringify(o)).digest('hex').slice(0, 12);
const now = Object.fromEntries(docs.map((c) => [c.slug, hash({ desc: c.desc, dos: c.dos, page: c.page, css: (blocks[c.no] || []).join('\n') })]));

if (process.argv.includes('--save')) {
  fs.mkdirSync(path.dirname(markFile), { recursive: true });
  fs.writeFileSync(markFile, JSON.stringify({ saved: new Date().toISOString(), hashes: now }, null, 1));
  console.log(`기준점 저장: 컴포넌트 ${Object.keys(now).length}개`);
  process.exit(0);
}
if (!fs.existsSync(markFile)) { console.log('기준점이 없어요. Figma 와 맞춘 뒤 --save 로 저장하세요.'); process.exit(2); }
const old = JSON.parse(fs.readFileSync(markFile, 'utf8')).hashes;
const changed = Object.keys(now).filter((s) => old[s] !== now[s]);
const removed = Object.keys(old).filter((s) => !(s in now));
console.log(JSON.stringify({ changed, removed }));
