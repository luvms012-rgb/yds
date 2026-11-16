// 서비스별 YDS 사용 현황 모으기 (2026-11-16 사용자 "운영 모델: 사용 측정과 기여 절차" → "services.json, 검사 스크립트, jsDelivr 통계, 사용 현황 탭 진행")
// site/src/services.json 의 화면 주소를 열어 서비스마다 아래를 센다. 결과는 site/src/usage.json, Updates > 사용 현황 탭이 보여 준다.
//   버전: CDN 주소의 yds@v1.2.0 이면 그 버전(버전 고정), /yds/dist/ 이면 최신, 복사해 둔 CSS 는 머리 주석 "YDS v1.2.0" 의 버전(복사본)
//   컴포넌트: 화면 HTML 의 class 에 쓰인 컴포넌트 기본 클래스(components.json classes). 스크립트가 나중에 그리는 부분은 세지 못한다
//   직접 쓴 색: 서비스 자기 CSS 와 style 속성에 토큰 대신 적은 색 값(#fff, rgb() 같은) 개수
// 버전별로 CDN 에서 받아 간 수는 jsDelivr 공개 통계(지난 30일)에서 읽는다(로그인 필요 없음).
// 쓰는 법: node tools/usage.mjs (한 달에 한 번, 사용자가 말할 때). 끝나면 node site/build.mjs 로 사이트를 다시 만든다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(DS, f), 'utf8'));
const { services } = read('site/src/services.json');
const comps = read('components.json');
const list = Array.isArray(comps) ? comps : comps.components;
const CLASS_TO_NAME = new Map();
for (const c of list) for (const k of c.classes || []) if (/^\.ds-[a-z0-9-]+$/.test(k)) CLASS_TO_NAME.set(k.slice(1), c.name.split(" · ")[0]);  // 사이트 메뉴 이름(Select Content · Item → Select Content)

async function get(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'yds-usage-check' } });
  if (!r.ok) throw new Error(`${r.status}`);
  return r.text();
}
const COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(/g;
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const countColors = (css) => (stripComments(css).replace(/var\([^)]*\)/g, '').match(COLOR) || []).length;

async function checkService(s) {
  const out = { id: s.id, name: s.name, version: '', kind: '없음', components: [], colors: 0, pages: 0, errors: [] };
  const used = new Set(), seenCss = new Set();
  for (const page of s.pages || []) {
    let html;
    try { html = await get(page); out.pages++; } catch (e) { out.errors.push(`${page} 열기 실패 (${e.message})`); continue; }
    for (const m of html.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) if (CLASS_TO_NAME.has(c)) used.add(CLASS_TO_NAME.get(c));
    for (const m of html.matchAll(/style="([^"]+)"/g)) out.colors += countColors(m[1]);
    for (const m of html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)) {
      const href = (m[0].match(/href="([^"]+)"/) || [])[1];
      if (!href) continue;
      const url = new URL(href, page).href;
      if (seenCss.has(url)) continue; seenCss.add(url);
      const pin = url.match(/\/yds@v?(\d+\.\d+\.\d+)\//);
      if (pin) { out.version = pin[1]; out.kind = '버전 고정'; continue; }
      if (/\/yds\/dist\//.test(url) && /cdn\.jsdelivr|github\.io\/yds\//.test(url)) { out.version = out.version || '최신'; out.kind = out.kind === '없음' ? '최신' : out.kind; continue; }
      let css;
      try { css = await get(url); } catch (e) { out.errors.push(`${url} 열기 실패 (${e.message})`); continue; }
      const v = css.match(/YDS v(\d+\.\d+\.\d+)/);
      if (v) { if (out.kind === '없음') { out.version = v[1]; out.kind = '복사본'; } continue; }
      if (/\/(ybm-ds|yds)\//.test(url)) continue;  // YDS 브랜드, 테마 파일은 서비스 색으로 세지 않는다
      out.colors += countColors(css);
    }
  }
  out.components = [...used].sort();
  return out;
}

const result = { checked: new Date().toISOString().slice(0, 10), services: [] };
for (const s of services) { result.services.push(await checkService(s)); console.log(`  ${s.name}: ${result.services.at(-1).kind} ${result.services.at(-1).version}, 컴포넌트 ${result.services.at(-1).components.length}개, 직접 쓴 색 ${result.services.at(-1).colors}개`); }
fs.writeFileSync(path.join(DS, 'site/src/usage.json'), JSON.stringify(result, null, 2) + '\n');
console.log(`  ✔ site/src/usage.json (${result.checked})`);
