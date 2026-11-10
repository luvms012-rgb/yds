// 큰 자료를 Figma 로 넘기는 통로 (2026-11-10): use_figma 는 한 번에 50KB 까지라, 자료를 압축하지 않은 PNG 로 감싸
// upload_assets 로 사각형 칠에 올리고 Figma 안에서 그림 바이트를 다시 글로 푼다.
//   node tokens/figma-payload.mjs <slug ...>   tokens/.figma-tplpage/<slug>.json → <slug>.png
//   node tokens/figma-payload.mjs --decoder     Figma 쪽에서 푸는 함수(UNPACK) 출력
// PNG 는 RGB 8비트, 폭 2048, deflate 의 '저장' 블록만 쓴다(압축 없음). 앞 4바이트 = 글 길이(UTF-8).
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const DS = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const DIR = path.join(DS, 'tokens', '.figma-tplpage');

// Figma 안에서 쓰는 풀기 함수: bytes(Uint8Array) → 글
export const UNPACK = `(b) => { let p = 8, W = 0; const parts = []; while (p < b.length) { const n = ((b[p] << 24) | (b[p + 1] << 16) | (b[p + 2] << 8) | b[p + 3]) >>> 0; const t = String.fromCharCode(b[p + 4], b[p + 5], b[p + 6], b[p + 7]); if (t === 'IHDR') W = ((b[p + 8] << 24) | (b[p + 9] << 16) | (b[p + 10] << 8) | b[p + 11]) >>> 0; if (t === 'IDAT') parts.push(b.subarray(p + 8, p + 8 + n)); p += 12 + n; }
  let tot = 0; for (const x of parts) tot += x.length; const z = new Uint8Array(tot); let o = 0; for (const x of parts) { z.set(x, o); o += x.length; }
  const raw = []; let q = 2; for (;;) { const fin = z[q] & 1; const len = z[q + 1] | (z[q + 2] << 8); q += 5; raw.push(z.subarray(q, q + len)); q += len; if (fin) break; }
  let rl = 0; for (const x of raw) rl += x.length; const r = new Uint8Array(rl); o = 0; for (const x of raw) { r.set(x, o); o += x.length; }
  const row = W * 3, rows = r.length / (row + 1), d = new Uint8Array(rows * row); for (let i = 0; i < rows; i++) d.set(r.subarray(i * (row + 1) + 1, (i + 1) * (row + 1)), i * row);
  const L = ((d[0] << 24) | (d[1] << 16) | (d[2] << 8) | d[3]) >>> 0; let s = '', i = 4; const e = 4 + L; const ch = [];
  while (i < e) { let c = d[i++]; if (c >= 0xf0) { c = ((c & 7) << 18) | ((d[i++] & 63) << 12) | ((d[i++] & 63) << 6) | (d[i++] & 63); c -= 0x10000; ch.push(0xd800 + (c >> 10), 0xdc00 + (c & 1023)); } else if (c >= 0xe0) ch.push(((c & 15) << 12) | ((d[i++] & 63) << 6) | (d[i++] & 63)); else if (c >= 0xc0) ch.push(((c & 31) << 6) | (d[i++] & 63)); else ch.push(c); if (ch.length > 8000) { s += String.fromCharCode.apply(null, ch); ch.length = 0; } }
  return s + String.fromCharCode.apply(null, ch); }`;

function png(text) {
  const body = Buffer.from(text, 'utf8');
  const W = 2048, row = W * 3, need = 4 + body.length, H = Math.max(1, Math.ceil(need / row));
  const data = Buffer.alloc(row * H); data.writeUInt32BE(body.length, 0); body.copy(data, 4);
  const raw = Buffer.alloc((row + 1) * H); for (let y = 0; y < H; y++) data.copy(raw, y * (row + 1) + 1, y * row, (y + 1) * row);
  const z = zlib.deflateSync(raw, { level: 0 });  // level 0 = 저장 블록만
  const crc = (buf) => { let c = ~0; for (const x of buf) { c ^= x; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1)); } return ~c >>> 0; };
  const chunk = (t, d) => { const len = Buffer.alloc(4); len.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc(td)); return Buffer.concat([len, td, cr]); };
  const ih = Buffer.alloc(13); ih.writeUInt32BE(W, 0); ih.writeUInt32BE(H, 4); ih[8] = 8; ih[9] = 2; ih[10] = 0; ih[11] = 0; ih[12] = 0;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ih), chunk('IDAT', z), chunk('IEND', Buffer.alloc(0))]);
}

if (import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop())) {
  const args = process.argv.slice(2);
  if (args[0] === '--decoder') { console.log(UNPACK); process.exit(0); }
  for (const slug of args) {
    const f = path.join(DIR, slug + '.json'); if (!fs.existsSync(f)) { console.log('없음', slug); continue; }
    const out = path.join(DIR, slug + '.png'); const b = png(fs.readFileSync(f, 'utf8')); fs.writeFileSync(out, b);
    const back = new Function('return ' + UNPACK)()(new Uint8Array(b));
    console.log(slug + '.png', b.length, back === fs.readFileSync(f, 'utf8') ? '풀기 확인' : '풀기 다름!');
  }
}
