// 가벼운 싱크 점검 (2026-11-12 사용자 "수정이 되면 자동으로 감지해서 싱크", "전체가 아닌 수정된 부분만")
// 정식 점검 스크립트(node sync.mjs figma, 42KB)와 같은 검사를 약 10KB 로 줄인 판. 읽기 전용.
//   node tools/figma-quick.mjs                 tokens/.figma-quick.js 생성 → 내용을 use_figma 로 실행
//   node tools/figma-quick.mjs check '<결과>'   use_figma 가 돌려준 JSON 을 저장소와 대조 (다르면 종료 코드 1)
//   node tools/figma-quick.mjs changed         마지막으로 맞춘 뒤 바뀐 컴포넌트, 템플릿, 토큰 목록
//   node tools/figma-quick.mjs save            지금 상태를 "Figma 와 맞춤" 기준점으로 저장 (.cache, 이 PC 에만)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...a) => path.join(R, ...a);
const cmd = process.argv[2] || 'script';
const fnv = (x) => { let h = 0x811c9dc5; for (let i = 0; i < x.length; i++) { h ^= x.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(36); };
const sha = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);

// 정식 점검 스크립트에서 자료(SNAP, NODES, PLAN)만 꺼낸다
function parts() {
  execFileSync(process.execPath, [P('sync.mjs'), 'figma'], { cwd: R, stdio: 'ignore' });
  const s = fs.readFileSync(P('tokens/.figma-check.js'), 'utf8');
  const grab = (name) => { const line = s.split('\n').find((l) => l.trimStart().startsWith('const ' + name + ' = ')); if (!line) throw new Error(name + ' 을 못 찾음'); return JSON.parse(line.trim().slice(('const ' + name + ' = ').length).replace(/;$/, '')); };
  return { SNAP: grab('SNAP'), NODES: grab('NODES'), PLAN: grab('PLAN') };
}
const digest = (SNAP) => Object.fromEntries(Object.entries(SNAP).map(([c, v]) => [c, { modes: v.modes, count: Object.keys(v.vars).length, d: fnv(Object.keys(v.vars).sort().map((n) => n + ':' + v.vars[n]).join('|')) }]));

if (cmd === 'script') {
  const { NODES, PLAN } = parts();
  const GH = PLAN.src.replace(/dist\/components\.css$/, '');
  const N = NODES.map((n) => n.id + (n.type === 'COMPONENT' ? 'c' : 's') + (n.variants || '')).join(' ');
  const E = PLAN.entries.map((e) => [e.no, e.slug, e.ids.join(','), e.doc || '', e.start, e.end].join(';')).join('|');
  const F = PLAN.fixed.map((f) => [f.frame, f.doc.replace(PLAN.site, '~'), f.code.replace(GH, '^')].join(';')).join('|');
  const T = PLAN.templates.flatMap((t) => t.ids).join(' ');
  const code = `// 자동 생성 - node tools/figma-quick.mjs · fileKey 1VCEsFU3xMWuXIntIrZz9i · 읽기 전용. 결과 JSON 을 node tools/figma-quick.mjs check '<결과>' 로 대조
function canon(rec, modes) { const vals = modes.map((m) => { const v = rec.values[m]; if (v && typeof v === 'object') return { alias: v.alias }; if (typeof v === 'number') return Math.round(v * 10000) / 10000; return typeof v === 'string' ? v.toLowerCase() : v; }); return JSON.stringify([rec.type, vals, rec.description || '']); }
function fnv(s) { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(36); }
const hex2 = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
const toHex = (c) => '#' + hex2(c.r) + hex2(c.g) + hex2(c.b) + (c.a === undefined || c.a >= 1 ? '' : hex2(c.a));
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const all = await figma.variables.getLocalVariablesAsync();
const byId = new Map(all.map((v) => [v.id, v]));
const variables = {};
for (const c of cols) {
  const modes = c.modes.map((m) => m.name); const h = {};
  for (const id of c.variableIds) {
    const v = byId.get(id); if (!v) continue; const values = {};
    for (const m of c.modes) { const raw = v.valuesByMode[m.modeId]; if (raw && typeof raw === 'object' && raw.type === 'VARIABLE_ALIAS') { const t = byId.get(raw.id) || (await figma.variables.getVariableByIdAsync(raw.id)); values[m.name] = { alias: t ? t.name : raw.id }; } else values[m.name] = v.resolvedType === 'COLOR' ? toHex(raw) : raw; }
    const rec = { type: v.resolvedType, values }; if (v.description) rec.description = v.description;
    h[v.name] = fnv(canon(rec, modes));
  }
  variables[c.name] = { modes, count: Object.keys(h).length, d: fnv(Object.keys(h).sort().map((n) => n + ':' + h[n]).join('|')), h };
}
const NODES = ${JSON.stringify(N)}.split(' ').map((x) => { const m = x.match(/^(\\d+:\\d+)([cs])(\\d*)$/); return { id: m[1], type: m[2] === 'c' ? 'COMPONENT' : 'COMPONENT_SET', variants: m[3] ? +m[3] : 0 }; });
const components = { ok: 0, missing: [], typeMismatch: [], variantMismatch: [], unlisted: [] };
const known = new Set(NODES.map((n) => n.id));
for (const n of NODES) { const node = await figma.getNodeByIdAsync(n.id); if (!node) { components.missing.push(n.id); continue; } if (node.type !== n.type) { components.typeMismatch.push(n.id + ' ' + node.name + ' → ' + node.type); continue; } if (n.variants && node.children.length !== n.variants) { components.variantMismatch.push(n.id + ' ' + node.name + ' 기대 ' + n.variants + ' 실제 ' + node.children.length); continue; } components.ok++; }
const NON = new Set(['Get Started', 'About', 'Foundations', 'Iconography', 'Icons', 'Templates', 'Updates']);
for (const page of figma.root.children) { if (/^-+$/.test(page.name)) continue; await page.loadAsync(); if (NON.has(page.name)) continue; for (const s of page.findAllWithCriteria({ types: ['COMPONENT_SET'] })) if (!known.has(s.id)) components.unlisted.push(s.name + ' ' + s.id + ' · ' + s.children.length + ' @' + page.name); }
const SITE = ${JSON.stringify(PLAN.site)}, GH = ${JSON.stringify(GH)}, SRC = ${JSON.stringify(PLAN.src)};
const E = ${JSON.stringify(E)}.split('|').map((x) => { const p = x.split(';'); return { no: p[0], slug: p[1], ids: p[2].split(','), doc: p[3], start: +p[4], end: +p[5] }; });
const F = ${JSON.stringify(F)}.split('|').map((x) => { const p = x.split(';'); return { frame: p[0], doc: p[1].replace('~', SITE), code: p[2].replace('^', GH) }; });
const T = ${JSON.stringify(T)}.split(' ');
const links = { ok: 0, wrong: [], missing: [], docMismatch: [], templatesOk: 0 };
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const top = (n) => { while (n.parent && n.parent.type !== 'PAGE') n = n.parent; return n; };
const targets = [];
for (const f of F) { const n = await figma.getNodeByIdAsync(f.frame); if (n) targets.push({ frame: n, doc: f.doc, code: f.code }); else links.missing.push('문서 프레임 ' + f.frame); }
const groups = new Map();
for (const e of E) { let n = null; for (const id of e.ids) if ((n = await figma.getNodeByIdAsync(id))) break; if (!n) { links.missing.push(e.no + ' 컴포넌트 노드'); continue; } const f = top(n); if (!groups.has(f.id)) groups.set(f.id, { frame: f, list: [] }); groups.get(f.id).list.push(e); if (e.doc !== f.id) links.docMismatch.push(e.no + ' ' + e.slug + ': json ' + e.doc + ' / Figma ' + f.id + ' ' + f.name); }
for (const { frame, list } of groups.values()) { list.sort((a, b) => a.start - b.start); const s = slug(frame.name); const main = list.find((e) => e.slug === s) || list.find((e) => e.slug.startsWith(s + '-')) || list[0]; const joined = list.every((e, i) => !i || e.start === list[i - 1].end + 1); const [a, b] = joined ? [list[0].start, list[list.length - 1].end] : [main.start, main.end]; targets.push({ frame, doc: SITE + 'components/' + main.slug + '.html', code: SRC + '#L' + a + '-L' + b }); }
const linkOf = (t) => { const s = t.getStyledTextSegments(['hyperlink']).find((x) => x.hyperlink); return s ? s.hyperlink.value : null; };
for (const t of targets) t.frame.findAll(() => false);
for (const t of targets) for (const [name, url] of [['Documentation', t.doc], ['Code', t.code]]) { const node = t.frame.findAll((n) => n.type === 'TEXT' && n.name === name)[0]; if (!node) { links.missing.push(t.frame.name + ' ' + t.frame.id + ' / ' + name); continue; } const cur = linkOf(node); if (cur === url) links.ok++; else links.wrong.push(t.frame.name + ' / ' + name); }
for (const id of T) { if (await figma.getNodeByIdAsync(id)) links.templatesOk++; else links.missing.push('템플릿 화면 ' + id); }
// 변수는 요약값만 돌려준다. 요약값이 다를 때만 WANT 에 그 컬렉션 이름을 넣어 다시 돌리면 변수별 값이 온다
const WANT = [];
for (const c of Object.keys(variables)) if (!WANT.includes(c)) delete variables[c].h;
return { variables, components, links };
`;
  fs.writeFileSync(P('tokens/.figma-quick.js'), code);
  console.log(`tokens/.figma-quick.js 생성 (${(code.length / 1024).toFixed(1)}KB). 내용을 use_figma 로 실행하고 결과를 node tools/figma-quick.mjs check '<결과 JSON>' 으로 대조`);
} else if (cmd === 'check') {
  const arg = process.argv[3];
  if (!arg) { console.error("결과 JSON 을 넣어 주세요: node tools/figma-quick.mjs check '<JSON>' (또는 파일 경로)"); process.exit(2); }
  const res = JSON.parse(fs.existsSync(arg) ? fs.readFileSync(arg, 'utf8') : arg);
  const { SNAP, NODES, PLAN } = parts();
  const want = digest(SNAP);
  const bad = [];
  for (const c of new Set([...Object.keys(want), ...Object.keys(res.variables || {})])) {
    const a = want[c], b = (res.variables || {})[c];
    if (!a) bad.push(`변수: Figma 에만 있는 컬렉션 ${c}`);
    else if (!b) bad.push(`변수: Figma 에 없는 컬렉션 ${c}`);
    else if (a.d !== b.d || a.count !== b.count || JSON.stringify(a.modes) !== JSON.stringify(b.modes)) {
      let detail = '';
      if (b.h) { const s = SNAP[c].vars; const diff = [...new Set([...Object.keys(s), ...Object.keys(b.h)])].filter((n) => s[n] !== b.h[n]); detail = ' → ' + diff.slice(0, 30).join(', ') + (diff.length > 30 ? ` 외 ${diff.length - 30}개` : ''); }
      else detail = ' (tokens/.figma-quick.js 의 WANT 에 "' + c + '" 를 넣어 다시 돌리면 어느 변수인지 나온다)';
      bad.push(`변수: ${c} 다름, 저장소 ${a.count}개 / Figma ${b.count}개${detail}`);
    }
  }
  const cp = res.components || {}, lk = res.links || {};
  for (const [k, label] of [['missing', '컴포넌트 없음'], ['typeMismatch', '종류 다름'], ['variantMismatch', '변형 수 다름'], ['unlisted', '목록에 없는 세트']]) for (const x of cp[k] || []) bad.push(`${label}: ${x}`);
  if ((cp.ok || 0) + (cp.missing || []).length + (cp.typeMismatch || []).length + (cp.variantMismatch || []).length !== NODES.length) bad.push(`컴포넌트 수가 맞지 않음(스크립트가 옛것일 수 있음, 다시 생성)`);
  for (const [k, label] of [['wrong', '링크 다름'], ['missing', '없음'], ['docMismatch', '문서 프레임 다름']]) for (const x of lk[k] || []) bad.push(`${label}: ${x}`);
  const tpl = PLAN.templates.flatMap((t) => t.ids).length;
  if (bad.length) { console.log('다른 곳 ' + bad.length + '건\n- ' + bad.join('\n- ')); process.exit(1); }
  console.log(`일치: 변수 ${Object.values(want).reduce((a, c) => a + c.count, 0)}, 컴포넌트 ${cp.ok}, 링크 ${lk.ok}, 템플릿 화면 ${lk.templatesOk}/${tpl}`);
} else if (cmd === 'changed' || cmd === 'save') {
  const markFile = P('.cache/figma-quick-mark.json');
  const dir = P('site/templates/pages');
  const strip = (h) => h.replace(/\?v=[0-9a-f]+/g, '');
  const now = {
    templates: Object.fromEntries(fs.readdirSync(dir).filter((f) => f.endsWith('.html')).map((f) => [f.replace(/\.html$/, ''), sha(strip(fs.readFileSync(path.join(dir, f), 'utf8')))])),
    tokens: sha(fs.readFileSync(P('tokens/figma-variables.json'), 'utf8')),
    getStarted: sha(strip(fs.readFileSync(P('site/index.html'), 'utf8'))),
    head: execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: R }).toString().trim(),
  };
  const comp = (flag) => { try { return execFileSync(process.execPath, [P('tools/figma-changes.mjs'), ...(flag ? [flag] : [])], { cwd: R }).toString().trim(); } catch (e) { return (e.stdout || '').toString().trim() || '기준점 없음'; } };
  if (cmd === 'save') {
    fs.mkdirSync(path.dirname(markFile), { recursive: true });
    fs.writeFileSync(markFile, JSON.stringify({ saved: new Date().toISOString(), ...now }, null, 1));
    console.log(`기준점 저장: 템플릿 ${Object.keys(now.templates).length}개, 커밋 ${now.head} / ${comp('--save')}`);
  } else {
    if (!fs.existsSync(markFile)) { console.log('기준점이 없어요. Figma 와 맞춘 뒤 node tools/figma-quick.mjs save'); process.exit(2); }
    const old = JSON.parse(fs.readFileSync(markFile, 'utf8'));
    let c = {}; try { c = JSON.parse(comp()); } catch { c = { note: comp() }; }
    const out = {
      since: old.saved, from: old.head, to: now.head,
      components: c.changed || [], componentsRemoved: c.removed || [],
      templates: Object.keys(now.templates).filter((s) => old.templates[s] !== now.templates[s]),
      templatesRemoved: Object.keys(old.templates).filter((s) => !(s in now.templates)),
      tokens: old.tokens !== now.tokens, getStarted: old.getStarted !== now.getStarted,
    };
    if (c.note) out.note = c.note;
    out.any = !!(out.components.length || out.componentsRemoved.length || out.templates.length || out.templatesRemoved.length || out.tokens || out.getStarted);
    console.log(JSON.stringify(out));
  }
} else { console.error('쓰는 법: node tools/figma-quick.mjs [script | check <결과> | changed | save]'); process.exit(2); }
