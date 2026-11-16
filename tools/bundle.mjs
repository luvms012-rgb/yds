// dist/ybm-ds.css 만들기: 다섯 파일을 레이어 블록 하나씩으로 묶고 주석과 빈칸을 뺀다.
// 2026-11-16 사용자 "파일 용량 검토" → "둘 다 진행": 예전 진입 파일은 @import 다섯 개라 차례로 받았고, components.css 의 한글 설명 주석이 압축 뒤에도 커서 전송량의 절반이 넘었다.
// 원본(tokens.css, base.css, icons.css, components.css, utilities.css)은 주석이 든 그대로 둔다(마크업 설명은 components.css 머리 주석이 정본).
// 쓰는 법: node tools/bundle.mjs (site/build.mjs 가 시작할 때 부른다. 손으로 고치지 않는다)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const LAYERS = [['ds.tokens', 'tokens.css'], ['ds.base', 'base.css'], ['ds.icons', 'icons.css'], ['ds.components', 'components.css'], ['ds.utilities', 'utilities.css']];

// 주석을 빼고 빈칸을 줄인다. 따옴표 안(url("...") 의 그림 포함)은 건드리지 않는다.
// 빈칸은 하나로 줄이기만 하고, { } ; 옆 빈칸만 지운다(: 와 , 옆은 선택자 뜻이 바뀔 수 있어 그대로).
export function minify(css) {
  let out = '', i = 0, ws = false;
  const n = css.length;
  const push = (s) => { if (ws && out && !/[{};]$/.test(out) && !/^[{};]/.test(s)) out += ' '; ws = false; out += s; };
  while (i < n) {
    const ch = css[i];
    if (ch === '/' && css[i + 1] === '*') { const e = css.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; ws = true; continue; }
    if (ch === '"' || ch === "'") { let j = i + 1; while (j < n && css[j] !== ch) { if (css[j] === '\\') j++; j++; } push(css.slice(i, j + 1)); i = j + 1; continue; }
    if (/\s/.test(ch)) { ws = true; i++; continue; }
    if (ch === '{' || ch === '}' || ch === ';') { ws = false; out = out.replace(/ $/, ''); out += ch; i++; continue; }
    push(ch); i++;
  }
  return out.replace(/;}/g, '}').trim();
}

export function bundle() {
  const ver = fs.readFileSync(path.join(DS, 'VERSION'), 'utf8').trim();
  const head = `/* YDS v${ver} - 서비스는 이 파일 하나만 link 한다. tools/bundle.mjs 가 ${LAYERS.map(([, f]) => f).join(', ')} 를 묶어 만든다(손으로 고치지 않는다, 설명 주석은 원본 파일에).
   DS 전체가 이름 붙은 레이어(${LAYERS.map(([l]) => l).join(', ')}) 안에 있어 레이어 밖에 쓴 서비스 CSS 가 선택자 우선순위와 상관없이 늘 이긴다. */`;
  const body = LAYERS.map(([layer, file]) => `@layer ${layer}{${minify(fs.readFileSync(path.join(DS, 'dist', file), 'utf8'))}}`).join('\n');
  return `${head}\n@layer ${LAYERS.map(([l]) => l).join(',')};\n${body}\n`;
}

// 바뀌었을 때만 쓴다. 바뀌었으면 true
export function writeBundle() {
  const f = path.join(DS, 'dist/ybm-ds.css');
  const next = bundle();
  if (fs.existsSync(f) && fs.readFileSync(f, 'utf8') === next) return false;
  fs.writeFileSync(f, next);
  return true;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(writeBundle() ? '  ✔ dist/ybm-ds.css 다시 묶음' : '  ✔ dist/ybm-ds.css 그대로');
}
