// 사이트 컴포넌트 페이지를 헤드리스 Chrome 으로 열어, 대표 그림과 예시 미리보기의 요소마다 실제 계산된 모양을 읽는다
//   node tokens/figma-styles.mjs [slug ...]   → tokens/.figma-styles.json (커밋 안 함)
//   node tokens/figma-styles.mjs --templates [slug ...]   → tokens/.figma-templates.json (템플릿 화면 1920x1080, 모노톤, 2026-11-10)
// sync.mjs docpage 가 이 값을 나무에 붙여 Figma 에서 사이트와 같은 배경, 테두리, 둥글기, 여백, 글자 크기로 그린다 (2026-11-06)
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
const DS = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const TPL = process.argv.includes('--templates');
const OUT = path.join(DS, 'tokens', TPL ? '.figma-templates.json' : '.figma-styles.json');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome'].find((f) => fs.existsSync(f));
if (!CHROME) { console.error('Chrome 이 없어요'); process.exit(1); }
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const docs = TPL ? JSON.parse(fs.readFileSync(path.join(DS, 'site', 'src', 'templates.json'), 'utf8')).templates : JSON.parse(fs.readFileSync(path.join(DS, 'tokens', '.figma-docs.json'), 'utf8')).components.filter((c) => c.doc);
const list = only.length ? docs.filter((c) => only.includes(c.slug)) : docs;

// 페이지 안에서 돌리는 함수: 요소 → { tag, cls, a, c, s }
const ICON_NAMES = [...new Set([...fs.readFileSync(path.join(DS, 'dist', 'icons.css'), 'utf8').matchAll(/--ds-icon-([a-z0-9-]+)\s*:/g)].map((m) => m[1]))];
const SER = String.raw`(() => {
  const TPL = ${TPL ? 1 : 0};
  // 템플릿: 차트 SVG 는 계산된 색과 굵기를 속성으로 적어 그대로 넘긴다 (Figma 에서 createNodeFromSvg)
  const SVGP = ['fill-opacity', 'stroke-opacity', 'fill', 'stroke', 'stroke-width', 'opacity', 'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin', 'font-size', 'font-weight', 'text-anchor', 'dominant-baseline'];
  const rgbHex = (v) => { const m = String(v).match(/rgba?\(([^)]+)\)/); if (!m) return v; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return '#' + p.slice(0, 3).map((x) => Math.round(x).toString(16).padStart(2, '0')).join(''); };
  function svgMarkup(n, w, h) {
    const cl = n.cloneNode(true); const o = [n, ...n.querySelectorAll('*')], c2 = [cl, ...cl.querySelectorAll('*')];
    o.forEach((e, i) => { const q = getComputedStyle(e), d = c2[i];
      if (/^(title|desc|style)$/i.test(e.tagName)) { d.remove(); return; }
      for (const pr of SVGP) { let v = q.getPropertyValue(pr); if (!v || v === 'normal' || v === 'auto') continue;
        if (/rgb/.test(v)) { const pp = v.match(/rgba?\(([^)]+)\)/)[1].split(/[ ,\/]+/).filter(Boolean).map(Number); const a = pp.length > 3 ? pp[3] : 1; if (a === 0) v = 'none'; else { if (a < 1 && (pr === 'fill' || pr === 'stroke')) d.setAttribute(pr + '-opacity', Math.round(a * (parseFloat(d.getAttribute(pr + '-opacity')) || 1) * 1000) / 1000); v = rgbHex(v); } }  // 색의 알파는 -opacity 에 곱한다
        d.setAttribute(pr, v); }
      if (e.tagName.toLowerCase() === 'text') d.setAttribute('font-family', 'Pretendard');
      for (const at of [...d.attributes]) if (/^(class|style|role|data-|aria-|tabindex)/.test(at.name)) d.removeAttribute(at.name); });
    // 점선 한 칸짜리 원(도넛 조각, 원형 진행)은 Figma 가 점선으로 그리므로 같은 자리의 호(path)로 바꾼다
    for (const c of [...cl.querySelectorAll('circle')]) {
      const da = (c.getAttribute('stroke-dasharray') || '').split(/[ ,]+/).map(parseFloat).filter((x) => !isNaN(x));
      const r = parseFloat(c.getAttribute('r')); if (da.length < 2 || !da[0] || !r) continue;
      const cx = parseFloat(c.getAttribute('cx')) || 0, cy = parseFloat(c.getAttribute('cy')) || 0;
      const L = parseFloat(c.getAttribute('pathLength')) || 2 * Math.PI * r;
      if (da[0] + da[1] < L * 0.95) continue;
      if (da[0] >= L - 0.01) { c.removeAttribute('stroke-dasharray'); continue; }
      const off = parseFloat(c.getAttribute('stroke-dashoffset')) || 0;
      const m = (c.getAttribute('transform') || '').match(/rotate\(\s*(-?[0-9.]+)/); const rot = m ? parseFloat(m[1]) : 0;
      const a0 = (-off / L) * 360 + rot, sw = (da[0] / L) * 360;
      const pt = (a) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
      const [x0, y0] = pt(a0), [x1, y1] = pt(a0 + sw);
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      for (const at of [...c.attributes]) if (!/^(cx|cy|r|stroke-dasharray|stroke-dashoffset|transform|pathlength)$/i.test(at.name)) p.setAttribute(at.name, at.value);
      p.setAttribute('d', 'M' + x0.toFixed(2) + ' ' + y0.toFixed(2) + 'A' + r + ' ' + r + ' 0 ' + (sw > 180 ? 1 : 0) + ' 1 ' + x1.toFixed(2) + ' ' + y1.toFixed(2));
      p.setAttribute('fill', 'none'); c.replaceWith(p);
    }
    cl.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); if (!cl.getAttribute('viewBox')) cl.setAttribute('viewBox', '0 0 ' + w + ' ' + h); cl.setAttribute('width', w); cl.setAttribute('height', h);
    return cl.outerHTML;
  }
  // ::before/::after 아이콘(mask-image)을 이름으로 찾는 표: --ds-icon-이름 변수 값 → 이름 (2026-11-07)
  const nu = (v) => { v = String(v).trim().replace(/^url\((["']?)/, '').replace(/(["']?)\)$/, ''); try { return decodeURIComponent(v).replace(/\s+/g, ' '); } catch (e) { return v.replace(/\s+/g, ' '); } };
  const ICON = {}; const rootCS = getComputedStyle(document.documentElement);
  for (const nm of ${JSON.stringify(ICON_NAMES)}) { const v = rootCS.getPropertyValue('--ds-icon-' + nm); if (v) ICON[nu(v)] = nm; }
  const R = (v) => Math.round(parseFloat(v) || 0);
  const hex = (v) => { if (!v) return undefined; const m = v.match(/rgba?\(([^)]+)\)/); if (!m) return undefined; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); const a = p.length > 3 ? p[3] : 1; if (a === 0) return undefined; return p.slice(0, 3).map((x) => Math.round(x).toString(16).padStart(2, '0')).join('') + (a < 1 ? Math.round(a * 255).toString(16).padStart(2, '0') : ''); };
  const DISP = { flex: 'f', 'inline-flex': 'if', grid: 'g', 'inline-grid': 'ig', inline: 'i', 'inline-block': 'ib', none: 'n', contents: 'ct' };
  const KEEP = /^(data-|aria-(disabled|checked|selected|pressed|current|expanded|label|invalid|readonly)$|style$|disabled$|placeholder$|value$|checked$|type$|role$|open$|selected$|readonly$|for$|name$)/;
  function boxOf(node, base, k) { let r; if (node.nodeType === 3) { const rg = document.createRange(); rg.selectNodeContents(node); r = rg.getBoundingClientRect(); } else r = node.getBoundingClientRect(); return [Math.round((r.left - base.left) / k), Math.round((r.top - base.top) / k), Math.round(r.width / k), Math.round(r.height / k)]; }
  function ser(el, k) {
    const cs = getComputedStyle(el);
    const a = {}; for (const at of el.attributes) if (at.name !== 'class' && KEEP.test(at.name)) a[at.name] = at.value;
    if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.value && el.type !== 'checkbox' && el.type !== 'radio') a.value = el.value;
    if (el.checked) a.checked = '';
    if (TPL && el.tagName === 'IMG' && el.currentSrc) a.src = el.currentSrc;  // 템플릿 사진: Figma 에 그림을 올릴 주소
    const s = {}; const d = DISP[cs.display] || (cs.display.startsWith('table') ? 't' : 'b'); s.d = d;
    if (/^(i?f|i?g)$/.test(d)) {
      if (cs.flexDirection.startsWith('column')) s.fd = 'c';
      if (cs.flexWrap === 'wrap') s.wr = 1;
      const rg = R(cs.rowGap), cg = R(cs.columnGap); if (rg || cg) s.gap = [rg, cg];
      if (!/^(normal|flex-start|start|left)$/.test(cs.justifyContent)) s.jc = cs.justifyContent;
      if (!/^(normal|stretch)$/.test(cs.alignItems)) s.ai = cs.alignItems;
      if (/g/.test(d)) s.gc = cs.gridTemplateColumns.split(' ').filter(Boolean).length;
    }
    const p = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(R); if (p.some(Boolean)) s.p = p;
    const bg = hex(cs.backgroundColor); if (bg) s.bg = bg;
    const bw = [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].map(R);
    const bsty = [cs.borderTopStyle, cs.borderRightStyle, cs.borderBottomStyle, cs.borderLeftStyle];
    bw.forEach((w, i) => { if (bsty[i] === 'none' || bsty[i] === 'hidden') bw[i] = 0; });
    if (bw.some(Boolean)) { const i = bw.findIndex(Boolean); const c = hex([cs.borderTopColor, cs.borderRightColor, cs.borderBottomColor, cs.borderLeftColor][i]); if (c) { s.bw = bw; s.bc = c; } }
    const r = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(R); if (r.some(Boolean)) s.r = r.map((x) => Math.min(x, 999));
    s.w = el.offsetWidth !== undefined ? el.offsetWidth : Math.round(el.getBoundingClientRect().width / k); s.h = el.offsetHeight !== undefined ? el.offsetHeight : Math.round(el.getBoundingClientRect().height / k);
    if (parseFloat(cs.flexGrow) > 0) s.fg = 1;
    const op = parseFloat(cs.opacity); if (op < 1) s.op = Math.round(op * 100) / 100;
    if (cs.boxShadow !== 'none') s.sh = 1;
    // 돌려 놓은 아이콘(접힌 묶음의 꺾쇠 등): 각도를 적어 같은 방향 아이콘으로 그린다 (2026-11-10)
    if (el.classList && el.classList.contains('ds-icon')) { let deg = 0; const mt = cs.transform.match(/matrix\(([^,]+),\s*([^,]+)/); if (mt) deg = Math.round(Math.atan2(parseFloat(mt[2]), parseFloat(mt[1])) * 180 / Math.PI); const rt = cs.rotate && cs.rotate !== 'none' ? parseFloat(cs.rotate) : 0; deg = ((deg + rt) % 360 + 360) % 360; if (deg) s.rot = deg; }
    // 테두리를 box-shadow: inset 0 0 0 Npx 로 그리는 부품 (목록 inset, 카드, 선택 칸 등, 2026-11-07)
    const ring = cs.boxShadow.match(/(rgba?\([^)]+\)) 0px 0px 0px (\d+(?:\.\d+)?)px inset/) || cs.boxShadow.match(/inset 0px 0px 0px (\d+(?:\.\d+)?)px (rgba?\([^)]+\))/);
    if (ring) { const w = parseFloat(ring[1].startsWith('rgb') ? ring[2] : ring[1]), c = hex(ring[1].startsWith('rgb') ? ring[1] : ring[2]); if (w && c) s.rg = [Math.round(w), c]; }
    // ::before / ::after 로 그린 선과 점 (목록 구분선, 알림 점 등): 위치가 정해진 작은 색 상자만
    const ps = [], pi = [], pt = [];
    // 아래 한 줄만 그리는 그림자 (탭 목록 아래 줄 등: inset 0 -1px 0 색)
    const bln = cs.boxShadow.match(/(rgba?\([^)]+\)) 0px -(\d+(?:\.\d+)?)px 0px 0px inset/) || cs.boxShadow.match(/inset 0px -(\d+(?:\.\d+)?)px 0px 0px (rgba?\([^)]+\))/);
    // 위 한 줄 그림자 (inset 0 1px 0 색: 메뉴 시트 항목 사이 줄 등)
    const tln = cs.boxShadow.match(/(rgba?\([^)]+\)) 0px (\d+(?:\.\d+)?)px 0px 0px inset/) || cs.boxShadow.match(/inset 0px (\d+(?:\.\d+)?)px 0px 0px (rgba?\([^)]+\))/);
    if (tln) { const rf = tln[1].startsWith('rgb'); const w = Math.round(parseFloat(rf ? tln[2] : tln[1])), c = hex(rf ? tln[1] : tln[2]); if (w && c) ps.push([0, 0, s.w, w, c, 0]); }
    // 왼쪽/오른쪽 한 줄 그림자 (inset 1px 0 0 색: 오른쪽 패널 왼쪽 선 등, 2026-11-10)
    for (const m of cs.boxShadow.matchAll(/(rgba?\([^)]+\)) (-?\d+(?:\.\d+)?)px 0px 0px 0px inset/g)) { const x = parseFloat(m[2]), c = hex(m[1]); if (!x || !c) continue; const w = Math.max(1, Math.round(Math.abs(x))); ps.push(x > 0 ? [0, 0, w, s.h, c, 0] : [s.w - w, 0, w, s.h, c, 0]); }
    if (bln) { const rgbFirst = bln[1].startsWith('rgb'); const w = Math.round(parseFloat(rgbFirst ? bln[2] : bln[1])), c = hex(rgbFirst ? bln[1] : bln[2]); if (w && c) ps.push([0, s.h - w, s.w, w, c, 0]); }
    for (const pe of ['::before', '::after']) {
      const q = getComputedStyle(el, pe);
      const mk = [q.webkitMaskImage, q.maskImage].find((x) => x && x !== 'none');
      if (mk && q.content !== 'none' && q.content !== 'normal' && q.display !== 'none' && q.visibility !== 'hidden') {
        let nm = ICON[nu(mk)];
        // 회전된 아이콘(펼친 꺾쇠 등)은 같은 방향의 아이콘 이름으로 (transform 또는 rotate)
        if (nm) { let deg = 0; const mt = q.transform.match(/matrix\(([^,]+),\s*([^,]+)/); if (mt) deg = Math.round(Math.atan2(parseFloat(mt[2]), parseFloat(mt[1])) * 180 / Math.PI); const rt = q.rotate && q.rotate !== 'none' ? parseFloat(q.rotate) : 0; deg = ((deg + rt) % 360 + 360) % 360;
          const DIR = ['right', 'down', 'left', 'up']; const m2 = nm.match(/^(chevron|arrow|chevrons)-(right|down|left|up)$/); if (m2 && deg % 90 === 0 && deg) nm = m2[1] + '-' + DIR[(DIR.indexOf(m2[2]) + deg / 90) % 4]; }
        if (nm) { const pw = parseFloat(q.width) || 16, ph = parseFloat(q.height) || 16, abs = /^(absolute|fixed)$/.test(q.position); const ow = el.offsetWidth, oh = el.offsetHeight;
          const px = abs ? (q.left !== 'auto' ? parseFloat(q.left) : q.right !== 'auto' ? ow - parseFloat(q.right) - pw : 0) : 0, py = abs ? (q.top !== 'auto' ? parseFloat(q.top) : q.bottom !== 'auto' ? oh - parseFloat(q.bottom) - ph : 0) : 0;
          pi.push([pe === '::before' ? 'b' : 'a', nm, Math.round(pw), Math.round(ph), hex(q.backgroundColor) || hex(cs.color), abs ? 1 : 0, Math.round(px), Math.round(py)]); }
        continue;
      }
      if (q.content === 'none' || q.content === 'normal' || q.display === 'none' || q.visibility === 'hidden') continue;
      // 줄 번호 (content: counter(...)): 같은 태그 형제 가운데 몇 번째인지로 숫자를 만든다. 폭과 오른쪽 맞춤도 함께 (템플릿 코드 편집기, 2026-11-10)
      if (TPL && /^counter\(/.test(q.content) && el.parentNode) { const idx = [...el.parentNode.children].filter((x) => x.tagName === el.tagName).indexOf(el) + 1; pt.push([pe === '::before' ? 'b' : 'a', String(idx), hex(q.color), R(q.fontSize), +q.fontWeight, R(q.marginRight) + R(q.marginLeft) + R(q.paddingRight), R(q.width), q.textAlign === 'right' || q.textAlign === 'end' ? 'r' : '']); continue; }
      if (/^".+"$/.test(q.content) && !/^(absolute|fixed)$/.test(q.position)) { try { pt.push([pe === '::before' ? 'b' : 'a', JSON.parse(q.content), hex(q.color), R(q.fontSize), +q.fontWeight, R(q.marginRight) + R(q.marginLeft)]); } catch (e) {} continue; }
      if (!/^(absolute|fixed)$/.test(q.position)) continue;
      if (q.content !== '""' && q.content !== "''") continue;
      const bgc = hex(q.backgroundColor); if (!bgc || parseFloat(q.opacity) === 0) continue;
      const pw = parseFloat(q.width), ph = parseFloat(q.height); if (!(pw > 0 && ph > 0) || (pw > 40 && ph > 8) || (ph > 40 && pw > 8)) continue;
      const ow = el.offsetWidth, oh = el.offsetHeight;
      const px = q.left !== 'auto' ? parseFloat(q.left) : q.right !== 'auto' ? ow - parseFloat(q.right) - pw : 0;
      const py = q.top !== 'auto' ? parseFloat(q.top) : q.bottom !== 'auto' ? oh - parseFloat(q.bottom) - ph : 0;
      ps.push([Math.round(px), Math.round(py), Math.round(pw), Math.round(ph), bgc, R(q.borderTopLeftRadius)]);
    }
    if (ps.length) s.ps = ps;
    if (pi.length) s.pi = pi;
    if (pt.length) s.pt = pt;
    if (cs.position === 'absolute' || cs.position === 'fixed') s.pos = 'a';
    if (cs.overflow === 'hidden' || cs.overflowX === 'hidden' || cs.overflow === 'clip') s.ov = 1;
    if (TPL && (/^(auto|scroll)$/.test(cs.overflowY) || /^(auto|scroll)$/.test(cs.overflowX))) s.ov = 1;  // 템플릿: 안쪽 스크롤 칸은 사이트 높이로 잘라 보인다
    if (cs.visibility === 'hidden') s.vh = 1;
    if (s.pos === 'a' && s.ov && (s.w <= 1 || s.h <= 1 || /inset\(50%\)/.test(cs.clipPath))) s.vh = 1;  // 스크린 리더 전용 글(1px 잘라 숨김)은 그리지 않는다
    s.fs = R(cs.fontSize); s.fw = +cs.fontWeight; s.c = hex(cs.color);
    if (/^(center|right|end)$/.test(cs.textAlign)) s.ta = cs.textAlign === 'end' ? 'right' : cs.textAlign;
    if (cs.lineHeight !== 'normal') s.lh = R(cs.lineHeight);
    if (cs.textDecorationLine.includes('underline')) s.ul = 1;
    if (cs.whiteSpace === 'nowrap' || cs.whiteSpace === 'pre') s.nw = 1;
    if (TPL && /^pre/.test(cs.whiteSpace)) s.pre = 1;  // 코드 줄 앞 들여쓰기를 지킨다
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') s.pc = hex(getComputedStyle(el, '::placeholder').color);
    const base = el.getBoundingClientRect(); const bl = R(cs.borderLeftWidth) + R(cs.paddingLeft), bt = R(cs.borderTopWidth) + R(cs.paddingTop);
    const c = [], kb = [];
    for (const n of el.childNodes) {
      if (n.nodeType === 3) { const pre = /^pre/.test(cs.whiteSpace || ''); const t = pre ? n.textContent : n.textContent.replace(/\s+/g, ' '); if (!t.trim()) continue; c.push(t); const b = boxOf(n, base, k); const lh = cs.lineHeight === 'normal' ? parseFloat(cs.fontSize) * 1.2 : parseFloat(cs.lineHeight); if (lh > 0 && b[3] > 0) { const nh = Math.max(1, Math.round(b[3] / lh)) * lh; b[1] = Math.round(b[1] - (nh - b[3]) / 2); b[3] = Math.round(nh); } kb.push([b[0] - bl, b[1] - bt, b[2], b[3]]); continue; }
      if (n.nodeType !== 1 || /^(SCRIPT|STYLE|TEMPLATE|svg)$/i.test(n.tagName)) { if (n.nodeType === 1 && /^svg$/i.test(n.tagName)) { const b = boxOf(n, base, k); c.push({ tag: 'svg', cls: [...n.classList], a: {}, c: [], s: { d: 'ib', w: b[2], h: b[3], c: hex(getComputedStyle(n).color), ...(getComputedStyle(n).position === 'absolute' ? { pos: 'a' } : {}) }, ...(TPL && b[2] > 0 && b[3] > 0 ? { svg: svgMarkup(n, b[2], b[3]) } : {}) }); kb.push([b[0] - bl, b[1] - bt, b[2], b[3]]); } continue; }
      const ccs = getComputedStyle(n);
      if (ccs.display === 'none') { if (n.tagName !== 'DIALOG' && !/\bds-[a-z]+(-[a-z]+)*\b(?!__)/.test(n.className)) continue; }
      c.push(ser(n, k)); const b = boxOf(n, base, k); kb.push([b[0] - bl, b[1] - bt, b[2], b[3]]);
    }
    if (kb.length) s.k = kb;
    return { tag: el.tagName.toLowerCase(), cls: [...el.classList], a, c, s };
  }
  const scale = (el) => { const r = el.getBoundingClientRect(); return el.offsetWidth ? r.width / el.offsetWidth : 1; };
  const cover = document.querySelector('.site-cover:not(.site-anatomy) .pv-stage');
  const exs = [...document.querySelectorAll('.site-example__preview')];
  const host = (h) => { const x = ser(h, scale(h)); delete x.s.k; return { s: x.s, c: x.c }; };
  if (TPL) document.querySelectorAll('.ds-segmented[data-ds-ready]').forEach((e) => e.removeAttribute('data-ds-ready'));  // 미끄러지는 선택 바탕(::before) 대신 고른 칸에 바탕을 둔다
  // 비스듬히 돌린 요소(끌고 있는 카드 등)는 바로 세워 읽는다. 돌린 상자 크기로 글이 겹쳐 그려지던 것 (90도 단위 아이콘은 그대로)
  if (TPL) document.querySelectorAll('body *').forEach((e) => { const q = getComputedStyle(e); const m = q.transform.match(/matrix\(([^,]+),\s*([^,]+)/); const deg = m ? Math.atan2(parseFloat(m[2]), parseFloat(m[1])) * 180 / Math.PI : 0; const rt = q.rotate && q.rotate !== 'none' ? parseFloat(q.rotate) : 0; if (Math.abs((deg + rt) % 90) > 0.5) { e.style.transition = 'none'; e.style.animation = 'none'; e.style.transform = 'none'; e.style.rotate = 'none'; void e.offsetWidth; } });
  if (TPL) return JSON.stringify({ root: ser(document.body, 1), w: innerWidth, h: document.documentElement.scrollHeight });
  return JSON.stringify({ cover: cover ? host(cover) : null, examples: exs.map(host) });
})()`;

const port = 9333 + Math.floor(Math.random() * 300);
const prof = path.join(DS, '.cache', 'chrome-prof');
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, TPL ? '--window-size=1920,1080' : '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ver = null; for (let i = 0; i < 50 && !ver; i++) { await sleep(200); try { ver = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch {} }
const page = ver.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const wait = new Map(); const events = [];
ws.addEventListener('message', (m) => { const j = JSON.parse(m.data); if (j.id && wait.has(j.id)) { wait.get(j.id)(j); wait.delete(j.id); } else if (j.method) events.push(j.method); });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; wait.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', TPL ? { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false } : { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
const old = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const res = only.length ? old : {};
for (const c of list) {
  events.length = 0;
  const url = 'file:///' + path.join(DS, 'site', TPL ? 'templates/pages' : 'components', c.slug + '.html').replace(/\\/g, '/');
  await send('Page.navigate', { url });
  for (let i = 0; i < 100 && !events.includes('Page.loadEventFired'); i++) await sleep(50);
  // 템플릿은 사이트 미리보기처럼 모노톤(brand-mono.css)을 입혀 읽는다
  if (TPL) await send('Runtime.evaluate', { expression: "new Promise((r) => { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '../../assets/brand-mono.css'; l.onload = r; l.onerror = r; document.head.appendChild(l); })", awaitPromise: true });
  await send('Runtime.evaluate', { expression: `document.fonts.ready.then(() => new Promise((r) => setTimeout(r, ${TPL ? 800 : 400})))`, awaitPromise: true });
  const r = await send('Runtime.evaluate', { expression: SER, returnByValue: true });
  if (!r.result || r.result.exceptionDetails) { console.log('실패', c.slug, JSON.stringify(r.result && r.result.exceptionDetails).slice(0, 300)); continue; }
  const v = JSON.parse(r.result.result.value);
  const nEx = TPL ? 0 : (c.page.examples || []).length;
  if (!TPL && v.examples.length !== nEx) console.log('  ! 예시 수 다름', c.slug, v.examples.length, nEx);
  res[c.slug] = v;
}
ws.close(); chrome.kill();
fs.writeFileSync(OUT, JSON.stringify(res));
console.log(path.basename(OUT), Object.keys(res).length + '쪽', fs.statSync(OUT).size + 'B');
