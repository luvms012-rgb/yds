(function () {
"use strict";
var KEY = "ybm-site-theme";
var root = document.documentElement;
var MONO_CSS = document.currentScript ? document.currentScript.src.replace(/site\.js(\?.*)?$/, "brand-mono.css$1") : "";
function frames() { return [].slice.call(document.querySelectorAll("iframe[data-site-frame]")); }
function themeFrame(f) {
try {
var d = f.contentDocument; if (!d) return;
if (!f.hasAttribute("data-site-theme-frame")) { if (root.dataset.theme) d.documentElement.dataset.theme = root.dataset.theme; else delete d.documentElement.dataset.theme; }
if (MONO_CSS && !f.hasAttribute("data-site-nomono") && d.head && !d.getElementById("site-brand-mono")) { var l = d.createElement("link"); l.id = "site-brand-mono"; l.rel = "stylesheet"; l.href = MONO_CSS; d.head.appendChild(l); }
} catch (e) {}
}
var osDark = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
var NAV_KEY = "ybm-site-nav-closed";
function navShut() { try { return JSON.parse(localStorage.getItem(NAV_KEY)) || []; } catch (e) { return []; } }
function restoreNav() {
var shut = navShut();
document.querySelectorAll("[data-site-group]").forEach(function (g) {
if (shut.indexOf(g.getAttribute("data-site-group")) < 0 || g.querySelector('[aria-current="page"]')) return;
var b = g.querySelector(".site-nav__toggle");
var panel = g.querySelector(".site-nav__panel");
panel.style.transition = "none";
b.setAttribute("aria-expanded", "false");
requestAnimationFrame(function () { panel.style.transition = ""; });
});
}
function savedTheme() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
function setTheme(t, remember) {
if (t === "dark") root.dataset.theme = "dark"; else delete root.dataset.theme;
if (remember) { try { localStorage.setItem(KEY, t === "dark" ? "dark" : "light"); } catch (e) {} }
document.querySelectorAll("[data-site-theme-toggle]").forEach(function (b) { b.setAttribute("aria-pressed", String(t === "dark")); b.setAttribute("aria-label", t === "dark" ? "밝은 화면으로 바꾸기" : "어두운 화면으로 바꾸기"); });
frames().forEach(themeFrame);
}
function press(btn) {
var tabs = btn.closest(".ds-chiptabs");
if (tabs) { tabs.querySelectorAll(".ds-chiptabs__trigger").forEach(function (b) { b.setAttribute("aria-selected", String(b === btn)); }); return; }
btn.closest(".ds-segmented").querySelectorAll(".ds-segmented__item").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
}
document.addEventListener("click", function (e) {
var t = e.target;
if (t.closest("[data-site-theme-toggle]")) { setTheme(root.dataset.theme === "dark" ? "light" : "dark", true); return; }
var tg = t.closest(".site-nav__toggle");
if (tg) {
var open = tg.getAttribute("aria-expanded") !== "true";
tg.setAttribute("aria-expanded", String(open));
var name = tg.closest("[data-site-group]").getAttribute("data-site-group");
var shut = navShut().filter(function (n) { return n !== name; });
if (!open) shut.push(name);
try { localStorage.setItem(NAV_KEY, JSON.stringify(shut)); } catch (err) {}
return;
}
if (t.closest("[data-site-menu]")) { openDrawer(); return; }
var gs = t.closest("[data-site-gs]");
if (gs) { showGs(gs.getAttribute("data-site-gs")); return; }
var tab = t.closest("[data-site-tab]");
if (tab) {
var panels = [].slice.call(tab.closest(".site-codetabs").querySelectorAll(".site-codetabs__panel"));
var fromI = panels.indexOf(tab.closest(".site-codetabs__panel")), toI = +tab.getAttribute("data-site-tab");
if (fromI === toI) return;
panels.forEach(function (p, i) { p.hidden = i !== toI; });
var items = panels[toI].querySelectorAll("[data-site-tab]");
items.forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === fromI)); });
setTimeout(function () { items.forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === toI)); }); }, 90);
return;
}
var view = t.closest("[data-site-view]");
if (view) {
press(view);
var box = view.closest(".site-example, .site-frame");
var v = view.getAttribute("data-site-view"), code = v === "code";
box.querySelectorAll(".site-example__preview, .site-frame__stage").forEach(function (el) { el.hidden = v !== "preview"; });
box.querySelectorAll(".site-example__code, .site-frame__code").forEach(function (el) { el.hidden = !code; });
if (code) loadSource(box);
return;
}
var dev = t.closest("[data-site-device]");
if (dev) {
press(dev);
var stage = dev.closest(".site-frame").querySelector(".site-frame__stage");
stage.setAttribute("data-device", dev.getAttribute("data-site-device"));
fitStage(stage);
return;
}
var chip = t.closest("[data-site-filter]");
if (chip) {
chip.parentElement.querySelectorAll("[data-site-filter]").forEach(function (c) { c.setAttribute("aria-selected", String(c === chip)); });
filter();
return;
}
var promptBtn = t.closest("[data-site-prompt-copy]");
if (promptBtn && navigator.clipboard) {
var text = promptBtn.closest(".site-prompt").querySelector(".site-prompt__text").textContent;
navigator.clipboard.writeText(text).then(function () { if (window.DS) DS.snackbar("안내문을 복사했어요", { tone: "positive" }); });
return;
}
var lu = t.closest("[data-site-lucide]");
if (lu && navigator.clipboard) {
var nm = lu.getAttribute("data-site-lucide"), inCss = !!lu.querySelector(".site-icon__css");
navigator.clipboard.writeText(inCss ? "ds-icon--" + nm : lucideCss(nm)).then(function () { if (window.DS) DS.snackbar(inCss ? "아이콘 이름을 복사했어요" : "아이콘 코드를 복사했어요", { tone: "positive" }); });
return;
}
var icon = t.closest("[data-site-copy]");
if (icon && navigator.clipboard) {
navigator.clipboard.writeText(icon.getAttribute("data-site-copy")).then(function () { if (window.DS) DS.snackbar(icon.getAttribute("data-site-copy-msg") || "복사했어요", { tone: "positive" }); }   );
}
});
var drawer = document.getElementById("site-drawer"), sideHome = null;
function setMenuExpanded(v) { document.querySelectorAll("[data-site-menu]").forEach(function (b) { b.setAttribute("aria-expanded", String(v)); }); }
function openDrawer() {
var side = document.getElementById("site-side");
if (!drawer || !side || !drawer.showModal || drawer.open) return;
sideHome = document.createComment("site-side"); side.parentNode.insertBefore(sideHome, side);
drawer.querySelector("[data-site-drawer]").appendChild(side);
drawer.showModal(); setMenuExpanded(true);
}
if (drawer) {
drawer.addEventListener("close", function () {
var side = document.getElementById("site-side");
if (sideHome && side) { sideHome.parentNode.insertBefore(side, sideHome); sideHome.remove(); sideHome = null; }
setMenuExpanded(false);
});
window.addEventListener("resize", function () { if (drawer.open && window.innerWidth >= 768) drawer.close(); });
}
function loadSource(box) {
var pre = box.querySelector("[data-site-src]");
if (!pre || pre.getAttribute("data-loaded")) return;
fetch(pre.getAttribute("data-site-src")).then(function (r) { return r.text(); }).then(function (txt) {
pre.querySelector("code").textContent = txt.replace(/(\.\.\/)+dist\//g, "https://design.ybmnet.co.kr/yds/dist/");
pre.setAttribute("data-loaded", "");
}).catch(function () { pre.querySelector("code").textContent = "코드는 웹 주소(http)로 열었을 때 보여요. 파일 위치: " + pre.getAttribute("data-site-src"); });
}
function filter() {
var input = document.querySelector("[data-site-search]");
var q = input ? input.value.trim().toLowerCase() : "";
var sel = document.querySelector("[data-site-filter][aria-selected='true']");
var cat = sel ? sel.getAttribute("data-site-filter") : "";
var shown = 0;
document.querySelectorAll("[data-site-item]").forEach(function (el) {
var ok = (!q || el.getAttribute("data-site-item").indexOf(q) >= 0) && (!cat || el.getAttribute("data-site-cat") === cat);
el.hidden = !ok; if (ok) shown++;
});
document.querySelectorAll(".site-group").forEach(function (g) { g.hidden = !g.querySelector("[data-site-item]:not([hidden])"); });
var empty = document.querySelector(".site-empty-result");
if (empty) empty.hidden = shown > 0;
var nav = document.querySelector("[data-site-navfilter]");
if (nav) {
nav.querySelectorAll(".site-nav__item").forEach(function (a) { a.hidden = !!q && (a.textContent + " " + (a.getAttribute("data-site-keys") || "")).toLowerCase().indexOf(q) < 0; });
nav.querySelectorAll(".site-nav__group").forEach(function (g) { g.hidden = !g.querySelector(".site-nav__item:not([hidden])"); });
if (q) nav.setAttribute("data-site-filtering", ""); else nav.removeAttribute("data-site-filtering");
}
}
document.addEventListener("input", function (e) { if (e.target.matches("[data-site-search]")) filter(); });
function lucideCss(name) {
var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + window.LUCIDE.icons[name] + "</svg>";
var uri = svg.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/#/g, "%23");
return "/* Lucide " + name + " */\n:root {\n  --ds-icon-" + name + ': url("data:image/svg+xml,' + uri + '");\n}\n.ds-icon--' + name + " { --ds-icon: var(--ds-icon-" + name + "); }";
}
var lib = { set: "ds", q: "", cur: "" };
function libSvg(n, size) {
var L = window.LUCIDE, body = L && L.icons[n];
return body ? '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>" : "";
}
function libEsc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function libList() {
var D = window.YBM_ICONS || { names: [], use: {} }, L = window.LUCIDE || { icons: {}, tags: {} };
var names = lib.set === "ds" ? D.names : Object.keys(L.icons);
var q = lib.q.trim().toLowerCase();
if (!q) return names;
var en = [];
if (/[가-힣]/.test(q)) { var K = window.ICON_KO || {}, qs = q.replace(/\s+/g, ""); Object.keys(K).forEach(function (k) { if (k.replace(/\s+/g, "").indexOf(qs) >= 0) en = en.concat(K[k].split(" ")); }); }
return names.filter(function (n) {
var base = n.replace(/-solid$/, "");
if (n.indexOf(q) >= 0 || (L.tags[base] || "").toLowerCase().indexOf(q) >= 0 || (D.use[n] || "").indexOf(q) >= 0) return true;
if (!en.length) return false;
var parts = base.split("-"), tags = (L.tags[base] || "").toLowerCase().split(/[,\s]+/);
return en.some(function (t) { return t === base || (t.indexOf("-") < 0 && (parts.indexOf(t) >= 0 || tags.indexOf(t) >= 0)); });
});
}
function libTile(n) {
var inDs = (window.YBM_ICONS || { names: [] }).names.indexOf(n) >= 0;
var pic = inDs ? '<i class="ds-icon ds-icon--' + n + '" aria-hidden="true"></i>' : libSvg(n, 20);
return '<span class="ds-tooltip-anchor site-lib__cell" role="none"><button type="button" class="site-lib__tile" role="option" data-site-lib-icon="' + n + '" aria-label="' + n + '" aria-selected="' + (n === lib.cur) + '">' + pic + '</button><span class="ds-tooltip" aria-hidden="true">' + n + "</span></span>";
}
function libDraw() {
var grid = document.querySelector("[data-site-lib-grid]"); if (!grid) return;
var list = libList();
grid.innerHTML = list.map(libTile).join("");
var c = document.querySelector("[data-site-lib-count]");
if (c) c.textContent = lib.q.trim() ? (list.length ? list.length.toLocaleString() + "개 찾았어요." : "찾는 아이콘이 없어요. Lucide 전체에서 찾아 보세요.") : "영어 이름, 태그, 한국어 쓰임으로 찾아 보세요.";
if (!lib.cur || list.indexOf(lib.cur) < 0) { if (list.length) libPick(list[0], true); else libPanel(""); } else libPanel(lib.cur);
}
function libHl(text) {
var re = /(<\/?)([A-Za-z][\w:.-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)(\s*\/?>)?/g, out = "", last = 0, m;
var span = function (c, s) { return '<span class="hl-' + c + '">' + libEsc(s) + "</span>"; };
while ((m = re.exec(text))) {
out += libEsc(text.slice(last, m.index)) + libEsc(m[1]) + span("t", m[2]);
out += (m[3] || "").replace(/(\s+)([^\s=>\/]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+))?/g, function (a, sp, name, eq, val) { return libEsc(sp) + span("f", name) + (eq ? libEsc(eq) + span("s", val) : ""); });
out += libEsc(m[4] || "");
last = re.lastIndex;
}
return out + libEsc(text.slice(last));
}
function libCode(label, text) {
return '<figure class="ds-codeblock site-lib__code" data-wrap><figcaption class="ds-codeblock__header"><span class="ds-codeblock__language">' + label + '</span><button type="button" class="ds-codeblock__copy" data-ds-copy aria-label="' + label + ' 복사"><i class="ds-icon ds-icon--copy ds-icon--sm" aria-hidden="true"></i></button></figcaption><pre class="ds-codeblock__code"><code>' + libHl(text) + '</code></pre></figure>';
}
function libPanel(n) {
var panel = document.querySelector("[data-site-lib-panel]"); if (!panel) return;
if (!n) { panel.innerHTML = ""; return; }
var D = window.YBM_ICONS || { names: [], use: {} }, L = window.LUCIDE || { icons: {}, tags: {} };
var inDs = D.names.indexOf(n) >= 0, base = n.replace(/-solid$/, "");
var tags = (D.use[n] ? D.use[n].split(/,\s*/) : []).concat((L.tags[base] || "").split(/[,\s]+/).filter(Boolean).slice(0, 12));
var html = '<div class="site-lib__name"><b>' + n + "</b>" + (inDs ? '<span class="ds-badge" data-tone="positive">YDS</span>' : '<span class="ds-badge">Lucide</span>') + "</div>";
if (tags.length) html += '<div class="site-lib__tags">' + tags.map(function (t) { return '<span class="ds-badge" data-size="large">' + libEsc(t) + "</span>"; }).join("") + "</div>";
html += '<div class="site-lib__preview">' + (inDs ? '<i class="ds-icon ds-icon--' + n + '" style="--ds-icon-size: 48px" aria-hidden="true"></i>' : libSvg(n, 48)) + "</div>";
if (inDs) html += libCode("HTML", '<i class="ds-icon ds-icon--' + n + '" aria-hidden="true"></i>');
else html += '<p class="site-lib__note">YDS에 아직 없는 아이콘입니다. 아래 두 코드를 차례로 붙여 넣으면 바로 쓸 수 있습니다.</p>' + libCode("1. 내 서비스 CSS 파일 맨 끝에 붙이기", lucideCss(n)) + libCode("2. 아이콘을 넣을 HTML 자리에 붙이기", '<i class="ds-icon ds-icon--' + n + '" aria-hidden="true"></i>');
if (L.icons[base]) html += libCode("SVG", '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + L.icons[base] + "</svg>");
panel.innerHTML = html;
}
function libPick(n, quiet) {
lib.cur = n;
document.querySelectorAll("[data-site-lib-icon]").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-site-lib-icon") === n ? "true" : "false"); });
libPanel(n);
if (!quiet && history.replaceState) history.replaceState(null, "", "?icon=" + encodeURIComponent(n));
}
function libInit() {
if (!document.querySelector("[data-site-lib]")) return;
var want = new URLSearchParams(location.search).get("icon") || "";
var D = window.YBM_ICONS || { names: [] };
if (want) { lib.cur = want; if (D.names.indexOf(want) < 0) lib.set = "all"; }
document.querySelectorAll("[data-site-lib-set]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-site-lib-set") === lib.set ? "true" : "false"); });
libDraw();
}
document.addEventListener("click", function (e) {
var t = e.target.closest && e.target.closest("[data-site-lib-icon], [data-site-lib-set]");
if (!t) return;
if (t.hasAttribute("data-site-lib-icon")) { libPick(t.getAttribute("data-site-lib-icon")); return; }
if (t.hasAttribute("data-site-lib-set")) {
lib.set = t.getAttribute("data-site-lib-set");
document.querySelectorAll("[data-site-lib-set]").forEach(function (b) { b.setAttribute("aria-pressed", b === t ? "true" : "false"); });
libDraw();
}
});
document.addEventListener("input", function (e) { if (e.target.matches("[data-site-lib-q]")) { lib.q = e.target.value; libDraw(); } });
document.addEventListener("keydown", function (e) {
if (e.key !== "Enter" || !e.target.matches("[data-site-search]") || !e.target.value.trim()) return;
var first = document.querySelector("[data-site-navfilter] .site-nav__group .site-nav__item:not([hidden])");
if (first) location.href = first.href;
});
function tocOpen(open) {
var btn = document.querySelector("[data-site-toc]"), list = document.getElementById("site-toc-list");
if (!btn || !list) return;
list.hidden = !open;
btn.setAttribute("aria-expanded", String(open));
}
function tocMark(id) {
var btn = document.querySelector("[data-site-toc]");
if (!btn) return;
document.querySelectorAll("[data-site-toc-go]").forEach(function (o) {
if (o.getAttribute("data-site-toc-go") === id) { o.setAttribute("aria-selected", "true"); btn.querySelector(".ds-select__value").textContent = o.textContent; }
else o.removeAttribute("aria-selected");
});
}
document.addEventListener("click", function (e) {
var go = e.target.closest("[data-site-toc-go]");
if (go) {
var id = go.getAttribute("data-site-toc-go"), h = document.getElementById(id);
tocOpen(false); tocMark(id);
if (h) { h.scrollIntoView({ behavior: "smooth" }); history.replaceState(null, "", "#" + id); }
return;
}
if (e.target.closest("[data-site-toc]")) { tocOpen(document.getElementById("site-toc-list").hidden); return; }
if (!e.target.closest(".site-toc-list")) tocOpen(false);
});
document.addEventListener("keydown", function (e) { if (e.key === "Escape") tocOpen(false); });
var STAGE_W = { desktop: 1440, tablet: 768, mobile: 375 };
function fitStage(stage) {
var f = stage.querySelector("iframe"); if (!f) return;
var w = STAGE_W[stage.getAttribute("data-device")] || 1440;
f.style.transform = ""; f.style.margin = "";
var cs = getComputedStyle(stage), avail = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
var s = Math.min(1, avail / w), h = f.offsetHeight;
if (s < 1) { f.style.transform = "scale(" + s + ")"; f.style.marginRight = (w * (s - 1)) + "px"; f.style.marginBottom = (h * (s - 1)) + "px"; }
}
function fitStages() { document.querySelectorAll(".site-frame__stage").forEach(fitStage); }
document.querySelectorAll(".site-frame__stage").forEach(function (stage) {
if (stage.clientWidth < 768) {
stage.setAttribute("data-device", "mobile");
var seg = stage.closest(".site-frame").querySelectorAll("[data-site-device]");
seg.forEach(function (b) { if (b.getAttribute("data-site-device") === "mobile") press(b); });
}
});
fitStages();
window.addEventListener("resize", fitStages);
function fitThumbs() {
document.querySelectorAll(".site-tpl-thumb").forEach(function (box) {
var f = box.querySelector("iframe"); if (f) f.style.transform = "scale(" + box.clientWidth / 1440 + ")";
});
}
window.addEventListener("resize", fitThumbs);
function fitTiles() {
document.querySelectorAll(".site-tile__inner > .pv-stage").forEach(function (st) {
var box = st.parentElement, cs = getComputedStyle(box);
var fig = box.closest("[data-site-anatomy]");
if (fig) { box.style.padding = ""; fig.style.height = fig.style.width = fig.style.aspectRatio = ""; st.style.transform = ""; cs = getComputedStyle(box); }
var wrap = fig && fig.parentElement;
if (fig && wrap.clientWidth < 600) {
st.style.width = "max-content";
var pw = Math.max(st.offsetWidth, st.scrollWidth), W = Math.max(wrap.clientWidth, Math.ceil(pw + 280));
fig.style.width = W + "px";
box.style.padding = "64px " + (W - pw) / 2 + "px";
cs = getComputedStyle(box);
st.style.width = pw + "px";
var need2 = st.scrollHeight + 128;
if (need2 > box.clientHeight) { fig.style.aspectRatio = "auto"; fig.style.height = Math.ceil(need2) + "px"; }
wrap.scrollLeft = (W - wrap.clientWidth) / 2;
}
else if (fig) {
st.style.width = "max-content";
var nw = Math.max(st.offsetWidth, st.scrollWidth);
if (nw > box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) box.style.paddingLeft = box.style.paddingRight = Math.max(24, (box.clientWidth - nw) / 2) + "px";
cs = getComputedStyle(box);
st.style.width = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) + "px";
var need = st.scrollHeight + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
if (need > box.clientHeight) { fig.style.aspectRatio = "auto"; fig.style.height = Math.ceil(need) + "px"; }
}
var aw = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
var ah = box.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
if (!aw || !ah) return;
var max = parseFloat(box.parentElement.getAttribute("data-site-fit-max")) || 1;
var kids = [].slice.call(st.children), s;
kids.forEach(function (k) { if ("siteHid" in k.dataset) { k.style.display = k.dataset.siteHid; delete k.dataset.siteHid; } });
if (max > 1) {
st.style.transform = ""; st.style.width = "max-content";
s = Math.min(max, aw / st.offsetWidth, ah / st.offsetHeight);
if (s >= 1) { st.style.transform = s > 1 ? "scale(" + s + ")" : ""; return; }
}
for (;;) {
st.style.transform = ""; st.style.width = aw + "px";
s = Math.min(1, aw / st.scrollWidth, ah / st.scrollHeight);
if (s < 1) { st.style.width = aw / s + "px"; s = Math.min(1, aw / st.scrollWidth, ah / st.scrollHeight); }
var shown = kids.filter(function (k) { return !("siteHid" in k.dataset); });
if (s >= 0.6 || shown.length < 2) break;
var last = shown[shown.length - 1]; last.dataset.siteHid = last.style.display; last.style.display = "none";
}
s = Math.max(s, innerWidth < 600 ? 0.35 : 0.5);
st.style.width = aw / s + "px";
st.style.transform = s < 1 ? "scale(" + s + ")" : "";
});
pinAnatomy();
}
function pinAnatomy() {
var NS = "http://www.w3.org/2000/svg", GAP = 28, ROW = 26, LEAD = 8;
document.querySelectorAll("[data-site-anatomy]").forEach(function (box) {
var old = box.querySelector(".site-anatomy__layer"); if (old) old.remove();
[].slice.call(box.querySelectorAll(".site-anatomy__name")).forEach(function (n) { n.remove(); });
var b = box.getBoundingClientRect(); if (!b.width) return;
var names = (box.getAttribute("data-site-anatomy-names") || "").split("|");
var rel = function (r) { return { l: r.left - b.left, t: r.top - b.top, r: r.right - b.left, b: r.bottom - b.top }; };
var seen = function (e) {
var r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false;
var mx = (r.left + r.right) / 2, my = (r.top + r.bottom) / 2;
for (var a = e; a && a !== box; a = a.parentElement) {
var s = getComputedStyle(a);
if (s.visibility === "hidden" || parseFloat(s.opacity) === 0) return false;
if (a !== e && (s.overflowX !== "visible" || s.overflowY !== "visible")) { var c = a.getBoundingClientRect(); if (mx < c.left || mx > c.right || my < c.top || my > c.bottom) return false; }
}
return true;
};
var boxed = function (cs) {
var bg = cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent";
var sh = cs.boxShadow !== "none" && cs.boxShadow.indexOf("rgba(0, 0, 0, 0)") !== 0;
return bg || sh || cs.backgroundImage !== "none" || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderBottomWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0;
};
var inked = function (el) {
var r = el.getBoundingClientRect();
if (!(el instanceof HTMLElement) || /^(IMG|INPUT|TEXTAREA|SELECT|CANVAS|VIDEO|I)$/.test(el.tagName) || boxed(getComputedStyle(el)) || getComputedStyle(el, "::after").content !== "none" || getComputedStyle(el, "::before").content !== "none") return r;
var u = null, add = function (q) { if (q.width < 1 || q.height < 1) return; u = u ? { left: Math.min(u.left, q.left), top: Math.min(u.top, q.top), right: Math.max(u.right, q.right), bottom: Math.max(u.bottom, q.bottom) } : { left: q.left, top: q.top, right: q.right, bottom: q.bottom }; };
[].forEach.call(el.childNodes, function (n) {
if (n.nodeType === 3 && n.textContent.trim()) { var g = document.createRange(); g.selectNodeContents(n); add(g.getBoundingClientRect()); }
else if (n.nodeType === 1 && seen(n)) add(inked(n));
});
return u || r;
};
var inkList = function (el) {
var out = [];
var walk = function (e) {
var r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return;
var cs0 = e instanceof HTMLElement ? getComputedStyle(e) : null;
var sides = cs0 ? ["Top", "Right", "Bottom", "Left"].filter(function (s) { return parseFloat(cs0["border" + s + "Width"]) > 0; }) : [];
var under = function (n) { for (var a = n.parentElement; a; a = a.parentElement) { var c = getComputedStyle(a).backgroundColor; if (c !== "rgba(0, 0, 0, 0)" && c !== "transparent") return c; } return "rgb(255, 255, 255)"; };
var filled = cs0 && ((cs0.backgroundColor !== "rgba(0, 0, 0, 0)" && cs0.backgroundColor !== "transparent" && cs0.backgroundColor !== under(e)) || cs0.backgroundImage !== "none" || (cs0.boxShadow !== "none" && cs0.boxShadow.indexOf("rgba(0, 0, 0, 0)") !== 0));
if (!cs0 || /^(IMG|CANVAS|VIDEO|I)$/.test(e.tagName) || filled || sides.length > 2) { out.push(r); return; }
sides.forEach(function (s) { var w = parseFloat(cs0["border" + s + "Width"]); out.push(s === "Top" ? { left: r.left, top: r.top, right: r.right, bottom: r.top + w } : s === "Bottom" ? { left: r.left, top: r.bottom - w, right: r.right, bottom: r.bottom } : s === "Left" ? { left: r.left, top: r.top, right: r.left + w, bottom: r.bottom } : { left: r.right - w, top: r.top, right: r.right, bottom: r.bottom }); });
["::before", "::after"].forEach(function (pe) {
var ps = getComputedStyle(e, pe); if (ps.content === "none" || ps.display === "none") return;
var pw = parseFloat(ps.width) || 0, ph = parseFloat(ps.height) || 0; if (pw < 1 || ph < 1) return;
var x = pe === "::before" ? r.left + parseFloat(cs0.paddingLeft) + (parseFloat(ps.marginLeft) || 0) : r.right - parseFloat(cs0.paddingRight) - (parseFloat(ps.marginRight) || 0) - pw, y = (r.top + r.bottom - ph) / 2;
if (ps.position === "absolute") {
x = ps.left !== "auto" ? r.left + parseFloat(ps.left) : ps.right !== "auto" ? r.right - parseFloat(ps.right) - pw : x;
y = ps.top !== "auto" ? r.top + parseFloat(ps.top) : ps.bottom !== "auto" ? r.bottom - parseFloat(ps.bottom) - ph : y;
}
out.push({ left: x, top: y, right: x + pw, bottom: y + ph });
});
if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName)) { var ic = getComputedStyle(e), lh = parseFloat(ic.lineHeight) || parseFloat(ic.fontSize) * 1.5, it = e.tagName === "TEXTAREA" ? r.top + parseFloat(ic.paddingTop) : (r.top + r.bottom - lh) / 2; out.push({ left: r.left + parseFloat(ic.paddingLeft), top: it, right: r.left + parseFloat(ic.paddingLeft) + Math.min(r.width, 48), bottom: it + lh }); return; }
[].forEach.call(e.childNodes, function (n) {
if (n.nodeType === 3 && n.textContent.trim()) { var g = document.createRange(); g.selectNodeContents(n); [].forEach.call(g.getClientRects(), function (q) { if (q.width >= 1 && q.height >= 1) out.push(q); }); }
else if (n.nodeType === 1 && seen(n)) walk(n);
});
};
walk(el);
return (out.length ? out : [el.getBoundingClientRect()]).map(rel);
};
var parts = [];
box.getAttribute("data-site-anatomy").split(" ").forEach(function (cls, i) {
var el = [].slice.call(box.querySelectorAll(".site-tile__inner ." + cls)).filter(seen)[0];
if (el && !parts.some(function (p) { return p.el === el; })) {
var ink = inkList(el), R = ink.reduce(function (u, q) { return { l: Math.min(u.l, q.l), t: Math.min(u.t, q.t), r: Math.max(u.r, q.r), b: Math.max(u.b, q.b) }; }, { l: 1e9, t: 1e9, r: -1e9, b: -1e9 });
parts.push({ el: el, name: names[i] || cls, R: R, B: rel(el.getBoundingClientRect()), ink: ink });
}
});
if (!parts.length) return;
var inside = function (a, c) { return a.l >= c.l - 0.5 && a.r <= c.r + 0.5 && a.t >= c.t - 0.5 && a.b <= c.b + 0.5; };
parts.forEach(function (p) {
p.kids = parts.filter(function (q) { return q !== p && (p.el.contains(q.el) || inside(q.R, p.R)); });
p.outer = parts.filter(function (q) { return q !== p && (q.el.contains(p.el) || inside(p.R, q.R)); });
});
var groups = parts.filter(function (p) { return p.kids.length && p.el instanceof HTMLElement && !/^(IMG|CANVAS|VIDEO|I)$/.test(p.el.tagName) && !boxed(getComputedStyle(p.el)); });
groups.sort(function (a, c) { return a.kids.length - c.kids.length; }).forEach(function (p) {
var d = 6 + 5 * groups.filter(function (q) { return q !== p && p.kids.indexOf(q) >= 0; }).length;
p.group = true; p.R = { l: p.R.l - d, t: p.R.t - d, r: p.R.r + d, b: p.R.b + d };
});
var others = [];
box.getAttribute("data-site-anatomy").split(" ").forEach(function (cls) {
[].slice.call(box.querySelectorAll(".site-tile__inner ." + cls)).forEach(function (e) {
if (parts.some(function (p) { return p.el === e; })) return;
var r = e.getBoundingClientRect(); if (r.width >= 1 && r.height >= 1) others.push({ el: e, R: rel(r) });
});
});
[].slice.call(box.querySelectorAll(".site-tile__inner *")).forEach(function (e) {
if (parts.some(function (p) { return p.el === e; }) || others.some(function (o) { return o.el === e; })) return;
var r = e.getBoundingClientRect(); if (r.width < 8 || r.height < 8) return;
var cs = getComputedStyle(e); if (cs.visibility === "hidden" || cs.opacity === "0") return;
var bg = cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent";
var line = function (w, c) { return parseFloat(w) > 0 && !/rgba\([^)]*,\s*0\)|transparent/.test(c); };
if (bg || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0 || cs.boxShadow !== "none" || e.tagName === "IMG") others.push({ el: e, R: rel(r), seen: bg || e.tagName === "IMG" || line(cs.borderTopWidth, cs.borderTopColor) || line(cs.borderLeftWidth, cs.borderLeftColor) });
[].forEach.call(e.childNodes, function (n) {
if (n.nodeType !== 3 || !n.textContent.trim()) return;
var rg = document.createRange(); rg.selectNodeContents(n); var tr = rg.getBoundingClientRect();
if (tr.width >= 1 && tr.height >= 1) others.push({ el: e, R: rel(tr), seen: true });
});
});
var U = parts.map(function (p) { return p.B; }).concat([].slice.call(box.querySelector(".pv-stage").children).map(function (e) { return rel(inked(e)); })).reduce(function (u, q) { return { l: Math.min(u.l, q.l), t: Math.min(u.t, q.t), r: Math.max(u.r, q.r), b: Math.max(u.b, q.b) }; }, { l: 1e9, t: 1e9, r: -1e9, b: -1e9 });
var svg = document.createElementNS(NS, "svg"); svg.setAttribute("class", "site-anatomy__layer");
svg.innerHTML = "<defs><marker id=\"site-arrow\" viewBox=\"0 0 6 6\" refX=\"6\" refY=\"3\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M0 0L6 3L0 6z\"/></marker></defs>";
box.appendChild(svg);
var segs, labels;
var hitsRect = function (s, q, pad) {
pad = pad || 0;
if (s.x1 === s.x2) { var y0 = Math.min(s.y1, s.y2), y1 = Math.max(s.y1, s.y2); return s.x1 > q.l - pad && s.x1 < q.r + pad && y1 > q.t - pad && y0 < q.b + pad; }
var x0 = Math.min(s.x1, s.x2), x1 = Math.max(s.x1, s.x2); return s.y1 > q.t - pad && s.y1 < q.b + pad && x1 > q.l - pad && x0 < q.r + pad;
};
var cross = function (a, c) {
var av = a.x1 === a.x2, cv = c.x1 === c.x2;
if (av === cv) return av ? Math.abs(a.x1 - c.x1) < 6 && Math.min(Math.max(a.y1, a.y2), Math.max(c.y1, c.y2)) > Math.max(Math.min(a.y1, a.y2), Math.min(c.y1, c.y2)) : Math.abs(a.y1 - c.y1) < 6 && Math.min(Math.max(a.x1, a.x2), Math.max(c.x1, c.x2)) > Math.max(Math.min(a.x1, a.x2), Math.min(c.x1, c.x2));
var v = av ? a : c, h = av ? c : a;
return v.x1 > Math.min(h.x1, h.x2) && v.x1 < Math.max(h.x1, h.x2) && h.y1 > Math.min(v.y1, v.y2) && h.y1 < Math.max(v.y1, v.y2);
};
var overlap = function (a, c, g) { return a.l < c.r + g && a.r > c.l - g && a.t < c.b + g && a.b > c.t - g; };
var fixed = function (p, s, L, k) {
var n = 0;
if (L.l < 4 || L.t < 4 || L.r > b.width - 4 || L.b > b.height - 4) n += 10;
for (var i = 0; i < p.obs.length; i++) { var q = p.obs[i]; if (hitsRect(s, q, 3)) n++; if (overlap(L, q, 4)) n += 3; }
if (k) p.kids.forEach(function (q) { if (!inside(k, q.R) && hitsRect(s, q.R, 1)) n++; });
var x = s.x2, y = s.y2;
for (var f = 0; f < p.foreign.length; f++) { var g = p.foreign[f]; if ((x >= g.l && x <= g.r && y >= g.t && y <= g.b) || (k && overlap(g, k, 0))) continue; var dx = Math.max(g.l - x, 0, x - g.r), dy = Math.max(g.t - y, 0, y - g.b); if (dx * dx + dy * dy < 36) { n += 2; break; } }
return n;
};
var live = function (s, L) {
var n = 0;
for (var j = 0; j < segs.length; j++) { if (cross(s, segs[j])) n++; if (hitsRect(segs[j], L, 3)) n += 2; }
for (var k = 0; k < labels.length; k++) { if (overlap(L, labels[k], 6)) n += 5; if (hitsRect(s, labels[k], 3)) n += 2; }
return n;
};
parts.forEach(function (p) {
p.obs = parts.filter(function (q) { return q !== p && p.kids.indexOf(q) < 0 && p.outer.indexOf(q) < 0; }).map(function (q) { return q.R; })
.concat(others.filter(function (e) { return !(e.el.contains(p.el) || p.el.contains(e.el) || inside(p.R, e.R) || inside(e.R, p.R)); }).map(function (e) { return e.R; }));
});
parts.forEach(function (p) {
var name = document.createElement("span"); name.className = "site-anatomy__name"; name.textContent = p.name; box.appendChild(name);
p.tag = name; p.w = name.offsetWidth; p.h = name.offsetHeight;
});
var maxW = Math.max.apply(null, parts.map(function (p) { return p.w; })), lh = Math.max.apply(null, parts.map(function (p) { return p.h; }));
var GS = Math.max(GAP, Math.min(120, Math.min(U.l, b.width - U.r) - maxW - 16));
var GV = Math.max(GAP, Math.min(48, Math.min(U.t, b.height - U.b) - lh - 16));
var choices = function (p) {
var w = p.w, h = p.h, R = p.R, cx = (R.l + R.r) / 2, cy = (R.t + R.b) / 2, c = [];
var owned = function (k) { return p.kids.some(function (q) { return inside(k, q.R); }) ? 1 : 0; };
var targets = function (edge) {
if (p.group) return [R];
var touch = function (k) { return edge === "l" ? k.l <= R.l + 3 : edge === "r" ? k.r >= R.r - 3 : edge === "t" ? k.t <= R.t + 3 : k.b >= R.b - 3; };
var horiz = edge === "l" || edge === "r", center = horiz ? cy : cx;
return p.ink.slice().sort(function (a, c) {
return (owned(a) * 2 + (touch(a) ? 0 : 1)) - (owned(c) * 2 + (touch(c) ? 0 : 1)) || Math.abs((horiz ? a.t + a.b : a.l + a.r) / 2 - center) - Math.abs((horiz ? c.t + c.b : c.l + c.r) / 2 - center);
}).slice(0, 8);
};
var span = function (lo, hi, step) { var m = (lo + hi) / 2, out = [m]; if (hi < lo) return out; for (var d = step; d <= (hi - lo) / 2; d += step) out.push(m - d, m + d); return out; };
var vert = function (top) {
targets(top ? "t" : "b").forEach(function (k) { span(k.l + 2, k.r - 2, 8).forEach(function (x) {
for (var row = 0; row < 4; row++) [0, -0.35, 0.35].forEach(function (o) {
var lx = x - w / 2 + o * w, ly = top ? U.t - GV - row * ROW - h : U.b + GV + row * ROW;
c.push({ k: k, side: false, inner: top ? k.t - U.t : U.b - k.b, L: { l: lx, t: ly, r: lx + w, b: ly + h }, s: { x1: x, y1: top ? ly + h + LEAD : ly - LEAD, x2: x, y2: top ? k.t - 1 : k.b + 1 } });
});
}); });
};
var side = function (left) {
targets(left ? "l" : "r").forEach(function (k) { span(k.t + 2, k.b - 2, 2).forEach(function (y) {
var lx = left ? U.l - GS - w : U.r + GS;
c.push({ k: k, side: true, inner: left ? k.l - U.l : U.r - k.r, L: { l: lx, t: y - h / 2, r: lx + w, b: y + h / 2 }, s: { x1: left ? lx + w + LEAD : lx - LEAD, y1: y, x2: left ? k.l - 1 : k.r + 1, y2: y } });
}); });
};
var leftFirst = cx <= (U.l + U.r) / 2;
side(leftFirst); side(!leftFirst); vert(cy < (U.t + U.b) / 2); vert(cy >= (U.t + U.b) / 2);
return c;
};
parts.forEach(function (p) {
p.foreign = parts.filter(function (q) { return q !== p; }).reduce(function (a, q) { return a.concat(q.ink); }, []).concat(others.filter(function (e) { return e.seen; }).map(function (e) { return e.R; }))
.filter(function (g) { return !inside(g, p.R) && !inside(p.R, g) && !p.ink.some(function (k) { return inside(g, k); }); });
});
parts.forEach(function (p) { p.c = choices(p); p.c.forEach(function (c) { c.base = fixed(p, c.s, c.L, c.k); }); });
var solve = function (order, fix) {
segs = []; labels = [];
var res = { total: 0, picks: [] };
if (fix) { segs.push(fix.c.s); labels.push(fix.c.L); res.picks.push({ p: fix.p, pick: fix.c, best: 0 }); }
order.forEach(function (p) {
if (fix && p === fix.p) return;
var pick = null, best = 1e9;
for (var ci = 0; ci < p.c.length && best > 0; ci++) { var cc = p.c[ci]; if (cc.base >= best) continue; var sc = cc.base + live(cc.s, cc.L); if (sc < best) { best = sc; pick = cc; } }
if (best === 0 && pick.inner > 96) for (var cj = 0; cj < p.c.length; cj++) { var cd = p.c[cj]; if (cd.base === 0 && cd.inner < pick.inner * 0.5 && live(cd.s, cd.L) === 0) { pick = cd; break; } }
segs.push(pick.s); labels.push(pick.L); res.total += best; res.picks.push({ p: p, pick: pick, best: best });
});
return res;
};
var order = parts.slice().sort(function (a, c) { return a.kids.length - c.kids.length || a.R.l - c.R.l || a.R.t - c.R.t; });
var top = solve(order);
for (var tries = 0; tries < 6 && top.total > 0; tries++) {
var forced = top.picks.filter(function (x) { return x.best > 0; }).map(function (x) { return x.p; });
order = forced.concat(order.filter(function (p) { return forced.indexOf(p) < 0; }));
var next = solve(order); if (next.total < top.total) top = next;
}
for (var round = 0; round < 3 && top.total > 0; round++) {
var stuck = top.picks.filter(function (x) { return x.best > 0; }).map(function (x) { return x.p; }), gain = false;
for (var si = 0; si < stuck.length && top.total > 0; si++) {
var fp = stuck[si];
for (var fc = 0; fc < fp.c.length && top.total > 0; fc++) {
if (fp.c[fc].base > 0) continue;
var alt = solve(order, { p: fp, c: fp.c[fc] });
if (alt.total < top.total) { top = alt; gain = true; }
}
}
if (!gain) break;
}
parts.forEach(function (p) {
if (!p.group) return;
var g = document.createElementNS(NS, "rect"); g.setAttribute("class", "site-anatomy__group");
g.setAttribute("x", p.R.l); g.setAttribute("y", p.R.t); g.setAttribute("width", p.R.r - p.R.l); g.setAttribute("height", p.R.b - p.R.t); g.setAttribute("rx", 4);
svg.appendChild(g);
});
top.picks.forEach(function (x) {
var name = x.p.tag, pick = x.pick;
if (x.best > 0) name.setAttribute("data-forced", x.best);
name.style.left = Math.round(pick.L.l) + "px"; name.style.top = Math.round(pick.L.t) + "px";
var ln = document.createElementNS(NS, "line");
ln.setAttribute("x1", pick.s.x1); ln.setAttribute("y1", pick.s.y1); ln.setAttribute("x2", pick.s.x2); ln.setAttribute("y2", pick.s.y2); ln.setAttribute("marker-end", "url(#site-arrow)");
svg.appendChild(ln);
});
});
}
window.addEventListener("resize", fitTiles);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTiles);
function spy() {
var links = [].slice.call(document.querySelectorAll(".site-toc a"));
if (!links.length || !("IntersectionObserver" in window)) return;
var bar = document.querySelector(".site-toc__indicator");
function mark(a) {
links.forEach(function (l) { l.removeAttribute("aria-current"); });
a.setAttribute("aria-current", "true");
tocMark(a.getAttribute("href").slice(1));
if (bar) { bar.style.translate = "0 " + a.offsetTop + "px"; bar.style.height = a.offsetHeight + "px"; }
}
mark(links[0]);
var map = {};
links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
var lockUntil = 0;
var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
links.forEach(function (a) {
a.addEventListener("click", function (e) {
var h = document.getElementById(a.getAttribute("href").slice(1));
if (!h) return;
e.preventDefault();
mark(a);
lockUntil = Date.now() + 1200;
h.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
history.replaceState(null, "", "#" + h.id);
});
});
window.addEventListener("scrollend", function () { lockUntil = 0; });
var io = new IntersectionObserver(function (entries) {
if (Date.now() < lockUntil) return;
entries.forEach(function (en) {
if (en.isIntersecting) { var a = map[en.target.id]; if (a) mark(a); }
});
}, { rootMargin: "-80px 0px -70% 0px" });
Object.keys(map).forEach(function (id) { var h = document.getElementById(id); if (h) io.observe(h); });
}
function showGs(k) {
var panels = document.querySelectorAll("[data-site-gs-panel]");
if (!panels.length) return;
if (k === "theme") k = "start";
if (!document.querySelector('[data-site-gs-panel="' + k + '"]')) return;
panels.forEach(function (p) { p.hidden = p.getAttribute("data-site-gs-panel") !== k; });
document.querySelectorAll("[data-site-gs]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-site-gs") === k)); });
}
function gsHash() {   var to = { migrate: "dev", start: "dev", install: "dev", draft: "ai", theme: "dev", brand: "dev" }[location.hash.slice(1)]; var h = to && document.getElementById(to); if (h) h.scrollIntoView(); }
addEventListener("hashchange", gsHash);
document.addEventListener("DOMContentLoaded", function () {
setTheme(root.dataset.theme === "dark" ? "dark" : "light");
restoreNav();
if (osDark && osDark.addEventListener) osDark.addEventListener("change", function (e) { if (!savedTheme()) setTheme(e.matches ? "dark" : "light"); });
frames().forEach(function (f) { f.addEventListener("load", function () { themeFrame(f); }); themeFrame(f); });
fitThumbs();
fitTiles();
libInit();
spy();
gsHash();
var side = document.querySelector(".site-side");
var cur = side && side.querySelector(".site-nav:not(.site-side__mobile .site-nav) [aria-current='page']");
if (cur && cur.offsetTop + cur.offsetHeight > side.clientHeight) side.scrollTop = cur.offsetTop - side.clientHeight / 3;
});
(function () {
var data = document.getElementById("site-tpl-list"); if (!data) return;
var cfg; try { cfg = JSON.parse(data.textContent); } catch (e) { return; }
var list = cfg.items || [], onList = !!document.querySelector(".site-tpl-grid");
var dlg = document.createElement("dialog"), cur = -1, pushed = false;
if (!dlg.showModal) return;
var seg = function (label, attr, items, cls) {
return '<div class="' + (cls ? cls + " " : "") + 'ds-segmented site-seg' + (items[0][2] ? " site-seg--icon" : "") + '" role="group" aria-label="' + label + '">' + items.map(function (it, i) {
return '<button type="button" class="ds-segmented__item" aria-pressed="' + (i === 0) + '" ' + attr + '="' + it[0] + '"' +
(it[2] ? ' aria-label="' + it[1] + '"><i class="ds-icon ds-icon--' + it[2] + ' ds-icon--sm" aria-hidden="true"></i>' : ">" + it[1]) + "</button>";
}).join("") + "</div>";
};
dlg.className = "ds-dialog site-tplv"; dlg.id = "site-tplv";
dlg.setAttribute("aria-labelledby", "site-tplv-title");
dlg.innerHTML = '<div class="ds-dialog__header"><h2 class="ds-dialog__title" id="site-tplv-title"></h2><p class="ds-dialog__desc"></p>' +
'<span class="site-tplv__tools">' + seg("화면 폭", "data-tplv-device", [["desktop", "PC", "monitor"], ["mobile", "모바일", "smartphone"]], "site-tplv__device") +
seg("보기 방식", "data-tplv-view", [["preview", "미리보기"], ["code", "코드"]]) +
'<button type="button" class="ds-dialog__close" data-ds-close aria-label="닫기" autofocus></button></span></div>' +
'<div class="ds-dialog__body"><div class="site-tplv__stage" data-device="desktop"><iframe title="" data-site-frame></iframe></div>' +
'<div class="site-tplv__code" hidden><figure class="ds-codeblock" data-lang="html"><figcaption class="ds-codeblock__header"><span class="ds-codeblock__language">html</span><button type="button" class="ds-codeblock__copy" data-ds-copy aria-label="코드 복사"><i class="ds-icon ds-icon--copy ds-icon--sm" aria-hidden="true"></i></button></figcaption><pre class="ds-codeblock__code"><code></code></pre></figure></div></div>' +
'<div class="ds-dialog__footer site-tplv__foot"><button type="button" class="ds-btn site-tplv__copy" data-variant="neutralWeak" data-size="small" data-site-copy="" data-site-copy-msg="링크를 복사했어요"><i class="ds-icon ds-icon--link ds-icon--sm" aria-hidden="true"></i>주소 복사</button><a class="ds-btn site-tplv__figma" data-variant="neutralWeak" data-size="small" target="_blank" rel="noopener"><i class="ds-icon site-i--figma ds-icon--sm" aria-hidden="true"></i>Figma</a></div>' +
'<button type="button" class="ds-btn site-tplv__nav" data-variant="neutralWeak" data-layout="iconOnly" data-tplv-step="-1" aria-label="이전 템플릿"><i class="ds-icon ds-icon--chevron-left" aria-hidden="true"></i></button>' +
'<button type="button" class="ds-btn site-tplv__nav" data-variant="neutralWeak" data-layout="iconOnly" data-tplv-step="1" aria-label="다음 템플릿"><i class="ds-icon ds-icon--chevron-right" aria-hidden="true"></i></button>';
document.body.appendChild(dlg);
var frame = dlg.querySelector("iframe"), stage = dlg.querySelector(".site-tplv__stage"), codeBox = dlg.querySelector(".site-tplv__code");
var fig = codeBox.querySelector("figure"), figma = dlg.querySelector(".site-tplv__figma"), device = dlg.querySelector(".site-tplv__device");
frame.addEventListener("load", function () { themeFrame(frame); });
var slugs = list.map(function (t) { return t[0]; });
function load(u) { try { frame.contentWindow.location.replace(new URL(u, location.href).href); } catch (e) { frame.src = u; } }
function url(slug) { var u = new URL(location.href); if (slug) u.searchParams.set("preview", slug); else u.searchParams.delete("preview"); return u.pathname + u.search + u.hash; }
function open(i, how) {
var t = list[i]; if (!t) return;
cur = i;
dlg.querySelector(".ds-dialog__title").textContent = t[1];
dlg.querySelector(".ds-dialog__desc").textContent = t[2];
figma.hidden = !t[3]; if (t[3]) figma.href = t[3];
dlg.querySelector(".site-tplv__copy").setAttribute("data-site-copy", new URL("pages/" + t[0] + ".html", location.href).href);
frame.title = t[1] + " 미리보기";
load("pages/" + t[0] + ".html");
fig.setAttribute("data-site-src", "pages/" + t[0] + ".html"); fig.removeAttribute("data-loaded");
fig.querySelector("code").textContent = "불러오는 중…";
if (!codeBox.hidden) loadSource(codeBox);
if (onList && how === "push") { history.pushState({ tplv: t[0] }, "", url(t[0])); pushed = true; }
else if (onList && how === "replace") history.replaceState(history.state, "", url(t[0]));
if (!dlg.open) { dlg.showModal(); root.classList.add("site-tplv-open"); }
}
dlg.addEventListener("close", function () {
root.classList.remove("site-tplv-open"); load("about:blank"); cur = -1;
if (!onList || !new URL(location.href).searchParams.get("preview")) return;
if (pushed && history.state && history.state.tplv) { pushed = false; history.back(); } else history.replaceState(null, "", url(""));
});
window.addEventListener("popstate", function () {
var i = slugs.indexOf(new URL(location.href).searchParams.get("preview"));
if (i >= 0) open(i); else if (dlg.open) { pushed = false; if (window.DS) DS.closeDialog(dlg); else dlg.close(); }
});
function step(n) { if (cur >= 0) open((cur + n + list.length) % list.length, "replace"); }
document.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-site-tplv]");
if (!b || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
var i = slugs.indexOf(b.getAttribute("data-site-tplv")); if (i < 0) return;
e.preventDefault();
open(i, "push");
});
dlg.addEventListener("click", function (e) {
var s = e.target.closest("[data-tplv-step]"); if (s) { step(+s.getAttribute("data-tplv-step")); return; }
var d = e.target.closest("[data-tplv-device]");
if (d) { press(d); stage.setAttribute("data-device", d.getAttribute("data-tplv-device")); return; }
var v = e.target.closest("[data-tplv-view]");
if (v) {
press(v);
var code = v.getAttribute("data-tplv-view") === "code";
codeBox.hidden = !code; stage.hidden = code; device.hidden = code;
if (code) loadSource(codeBox);
return;
}
});
dlg.addEventListener("keydown", function (e) {
if (e.target.closest("pre, .ds-segmented")) return;
if (e.key === "ArrowLeft") step(-1);
else if (e.key === "ArrowRight") step(1);
});
if (onList) { var i0 = slugs.indexOf(new URL(location.href).searchParams.get("preview")); if (i0 >= 0) open(i0); }
})();
(function () {
var frame = document.querySelector("[data-site-theme-frame]"); if (!frame) return;
var page = (frame.getAttribute("src").match(/([^/]+).html/) || [])[1], open = document.querySelector("[data-site-theme-open]"), file = document.querySelector("[data-site-theme-file]"), mode = document.querySelector("[data-site-theme-mode]");
var cards = [].slice.call(document.querySelectorAll("[data-site-theme]"));
var cur = (cards.filter(function (c) { return c.getAttribute("aria-pressed") === "true"; })[0] || cards[0]).getAttribute("data-site-theme");
var dark = false;
function fit() { try { frame.style.height = Math.ceil(frame.contentDocument.documentElement.getBoundingClientRect().height) + "px"; } catch (e) {} }
function apply() {
try {
var h = frame.contentDocument.documentElement;
if (cur) h.setAttribute("data-ds-theme", cur); else h.removeAttribute("data-ds-theme");
if (dark) h.setAttribute("data-theme", "dark"); else h.removeAttribute("data-theme");
} catch (e) {}
if (open) open.href = "pages/" + page + ".html" + (cur ? "" : "#default");
if (file) { file.hidden = !cur; if (cur) file.href = file.href.replace(/[^/]+.css$/, cur + ".css"); }
if (mode) mode.setAttribute("aria-pressed", String(dark));
fit();
}
cards.forEach(function (c) { c.addEventListener("click", function () { cur = c.getAttribute("data-site-theme"); cards.forEach(function (x) { x.setAttribute("aria-pressed", String(x === c)); }); if (cur && cur !== page) { page = cur; frame.src = "pages/" + cur + ".html"; } apply(); }); });
if (mode) mode.addEventListener("click", function () { dark = !dark; apply(); });
frame.addEventListener("load", function () { apply(); [300, 1000, 2500].forEach(function (t) { setTimeout(fit, t); }); try { frame.contentWindow.addEventListener("resize", fit); } catch (e) {} });
window.addEventListener("resize", fit);
})();
(function () {
var toggles = [].slice.call(document.querySelectorAll("[data-site-md-toggle]")); if (!toggles.length) return;
function close() { toggles.forEach(function (t) { t.setAttribute("aria-expanded", "false"); t.nextElementSibling.hidden = true; }); }
var cache = {};
function say(msg, ok) { if (window.DS && DS.snackbar) DS.snackbar(msg, { tone: ok ? "positive" : "critical" }); }
function copy(text, okMsg, el) {
var legacy = function () {
var t = document.createElement("textarea"); t.value = text; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0;pointer-events:none";
document.body.appendChild(t); t.select(); var ok = false; try { ok = document.execCommand("copy"); } catch (err) {} t.remove(); if (el) el.focus();
say(ok ? okMsg : "복사하지 못했어요. 다시 눌러 주세요", ok);
};
if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { say(okMsg, true); }, legacy); else legacy();
}
function load(url) { if (!cache[url]) cache[url] = fetch(url).then(function (r) { return r.text(); }); return cache[url]; }
toggles.forEach(function (t) { t.addEventListener("click", function () { [].forEach.call(t.nextElementSibling.querySelectorAll('[data-site-md="copy"]'), function (b) { var u = new URL(b.getAttribute("data-href"), location.href).href; load(u).then(function (x) { cache[u + "#text"] = x; }); }); }); });
toggles.forEach(function (t) { t.addEventListener("click", function (e) { e.stopPropagation(); var open = t.getAttribute("aria-expanded") !== "true"; close(); t.setAttribute("aria-expanded", String(open)); t.nextElementSibling.hidden = !open; }); });
document.addEventListener("click", function (e) {
var b = e.target.closest("[data-site-md]");
if (b) {
var url = new URL(b.getAttribute("data-href"), location.href).href, toggle = b.closest(".site-md").querySelector("[data-site-md-toggle]");
if (b.getAttribute("data-site-md") === "link") copy(url, "마크다운 링크를 복사했어요", toggle);
else if (cache[url + "#text"] != null) copy(cache[url + "#text"], "마크다운 내용을 복사했어요", toggle);
else load(url).then(function (x) { copy(x, "마크다운 내용을 복사했어요", toggle); }, function () { say("내용을 불러오지 못했어요. 새 창으로 열어 주세요", false); });
if (b.tagName === "BUTTON") close();
}
if (!e.target.closest(".site-md")) close();
});
document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
(function () {
var UPDATES_KEY = "ybm-site-updates-seen", REQ_KEY = "ybm-site-requests-seen";
var top = document.querySelector("[data-site-latest]");
if (!top) return;
var latest = null, latestReq = "";
function clear() { document.querySelectorAll(".site-newdot, .site-newbadge, .site-newdot-text").forEach(function (n) { n.remove(); }); }
function newBadge(cls) {
var b = document.createElement("span"); b.className = "ds-badge " + cls; b.setAttribute("data-variant", "solid"); b.setAttribute("data-tone", "critical"); b.setAttribute("aria-hidden", "true"); b.textContent = "NEW";
return b;
}
function mark(el) {
el.appendChild(newBadge("site-newbadge"));
var s = document.createElement("span"); s.className = "ds-sr-only site-newdot-text"; s.textContent = "새 소식 있음"; el.appendChild(s);
}
function dot(el) {
var d = document.createElement("span"); d.className = "ds-statusdot site-newdot"; d.setAttribute("data-tone", "critical"); d.setAttribute("aria-hidden", "true"); el.appendChild(d);
}
function markRelease() {
var r = document.querySelector(".site-release");
if (!r || r.classList.contains("site-release--new")) return;
r.classList.add("site-release--new");
var h = r.querySelector("h2 time") || r.querySelector("h2"); if (h) { var nb = newBadge("site-release__new"); if (h.tagName === "TIME") h.after(nb); else h.appendChild(nb); }
}
function onTab(href) { return !!document.querySelector('.site-pagetabs [aria-current="page"][href="' + href + '"]'); }
function sync() {
var seen = null, seenReq = null, unread = false;
try {
seen = localStorage.getItem(UPDATES_KEY); seenReq = localStorage.getItem(REQ_KEY);
if (seen === null || onTab("updates.html")) { unread = seen !== null && seen !== latest; localStorage.setItem(UPDATES_KEY, latest); seen = latest; }
if (seenReq === null || onTab("updates-requests.html")) { localStorage.setItem(REQ_KEY, latestReq); seenReq = latestReq; }
} catch (e) { seen = latest; seenReq = latestReq; }
if (unread) markRelease();
clear();
var newNews = seen !== latest, newReq = !!latestReq && seenReq !== latestReq;
if (!newNews && !newReq) return;
document.querySelectorAll("[data-site-updates]").forEach(mark);
document.querySelectorAll(".site-menu-btn").forEach(dot);
document.querySelectorAll(".site-pagetabs a[href]").forEach(function (a) {
var h = a.getAttribute("href");
if ((h === "updates.html" && newNews) || (h === "updates-requests.html" && newReq)) dot(a);
});
}
var LATEST_URL = document.currentScript ? document.currentScript.src.replace(/site\.js(\?.*)?$/, "latest.json") : "";
function load() {
if (!LATEST_URL || !window.fetch) return;
fetch(LATEST_URL, { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
if (!d || typeof d.u !== "string") return;
latest = d.u; latestReq = d.r || ""; sync();
}).catch(function () {});
}
load();
window.addEventListener("pageshow", function (e) { if (e.persisted) load(); });
})();
})();
document.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-site-anchor]");
if (!b) return;
var hash = "#" + b.getAttribute("data-site-anchor");
var url = location.href.split("#")[0] + hash;
history.replaceState(null, "", hash);
var say = function (msg, ok) { if (window.DS && DS.snackbar) DS.snackbar(msg, { tone: ok ? "positive" : "critical" }); };
var legacy = function () {
var t = document.createElement("textarea"); t.value = url; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0;pointer-events:none";
document.body.appendChild(t); t.select(); var ok = false; try { ok = document.execCommand("copy"); } catch (err) {} t.remove(); b.focus();
say(ok ? "링크를 복사했어요" : "링크를 복사하지 못했어요. 주소 창의 주소를 복사해 주세요.", ok);
};
if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { say("링크를 복사했어요", true); }, legacy); else legacy();
});
(function () {
"use strict";
var box = document.getElementById("site-search");
if (!box) return;
var list = box.querySelector("[data-site-search-list]");
var input = box.querySelector("[data-site-search-input]");
var ROOT = list.getAttribute("data-root") || "";
var TYPES = { comp: ["컴포넌트", "layout-grid"], tpl: ["템플릿", "monitor"], ex: ["예시", "code"], found: ["Foundations", "palette"], token: ["토큰", "tag"], icon: ["아이콘", "image"], start: ["시작하기", "book-open"] };
var ORDER = ["comp", "tpl", "ex", "found", "token", "icon", "start"];
var SCOPE = { all: ORDER, comp: ["comp", "ex"], tpl: ["tpl"], found: ["found"], token: ["token"], icon: ["icon"], start: ["start"] };
var RECENT = "ybm-site-search-recent";
var data = null, loading = null, scope = "all";
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function norm(s) { return String(s || "").toLowerCase(); }
function load() {
if (data || loading) return loading;
function viaScript() { return new Promise(function (ok, no) { if (window.__ydsSearch) return ok(window.__ydsSearch); var s = document.createElement("script"); s.src = ROOT + "assets/search.js"; s.onload = function () { window.__ydsSearch ? ok(window.__ydsSearch) : no(); }; s.onerror = no; document.head.appendChild(s); }); }
var get = location.protocol === "file:" ? viaScript() : fetch(ROOT + "assets/search.json", { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).catch(viaScript);
loading = get.then(function (a) {
data = a.map(function (x) { return { type: x[0], title: x[1], url: x[2], desc: x[3], keys: x[4], t: norm(x[1]), k: norm(x[4]), d: norm(x[3]) }; });
}, function () { loading = null; list.innerHTML = '<p class="ds-command__empty">목록을 불러오지 못했어요. 잠시 뒤에 다시 열어 주세요.</p>'; });
loading.then(function () { if (data) render(); });
return loading;
}
function recent() { try { var r = JSON.parse(localStorage.getItem(RECENT)); return Array.isArray(r) ? r.filter(function (x) { return x && typeof x.title === "string" && typeof x.url === "string" && TYPES[x.type]; }) : []; } catch (e) { return []; } }
function remember(it) {
try { var r = recent().filter(function (x) { return x.url !== it.url; }); r.unshift({ type: it.type, title: it.title, url: it.url, desc: it.desc }); localStorage.setItem(RECENT, JSON.stringify(r.slice(0, 5))); } catch (e) {}
}
function score(it, terms, flat) {
var s = 0, tf = it.t.replace(/\s+/g, "");
for (var i = 0; i < terms.length; i++) {
var w = terms[i];
if (it.t === w) s += 100; else if (it.t.indexOf(w) === 0) s += 60; else if (it.t.indexOf(w) >= 0) s += 40;
else if (it.k.indexOf(w) >= 0) { var kw = it.k.split(/\s+/); s += (kw.indexOf(w) >= 0 ? 35 : 25) + (it.k.indexOf(w) === 0 ? 10 : 0); }
else if (it.d.indexOf(w) >= 0) s += 8; else return 0;
}
if (terms.length > 1 && tf.indexOf(flat) >= 0) s += 30;
return s;
}
function hit(text, terms) {
var out = esc(text), low = norm(text);
var spans = [];
terms.forEach(function (w) { var i = low.indexOf(w); if (i >= 0) spans.push([i, i + w.length]); });
if (!spans.length) return out;
spans.sort(function (a, b) { return a[0] - b[0]; });
var html = "", at = 0;
spans.forEach(function (sp) { if (sp[0] < at) return; html += esc(text.slice(at, sp[0])) + '<mark class="site-search__hit">' + esc(text.slice(sp[0], sp[1])) + "</mark>"; at = sp[1]; });
return html + esc(text.slice(at));
}
var n = 0;
function row(it, terms) {
var ty = TYPES[it.type] || ["", "file-text"];
var lead = it.type === "icon" ? '<i class="ds-icon ds-icon--' + esc(it.title) + '" aria-hidden="true"></i>'
: it.type === "token" && it.title.indexOf("--ds-color-") === 0 ? '<span class="site-search__swatch" style="background: var(' + esc(it.title) + ')" aria-hidden="true"></span>'
: '<i class="ds-icon ds-icon--' + ty[1] + '" aria-hidden="true"></i>';
return '<a class="ds-command__item site-search__item" role="option" aria-selected="false" id="ss-' + (n++) + '" href="' + esc(ROOT + it.url) + '" data-ss-url="' + esc(it.url) + '">' + lead +
'<span class="ds-command__label"><span class="site-search__title">' + hit(it.title, terms) + "</span></span>" +
'<span class="site-search__type">' + ty[0] + "</span></a>";
}
function group(title, items, terms, more, key, label) {
return '<div class="ds-command__group" role="group" aria-label="' + esc(title) + '"><p class="ds-command__title">' + esc(title) + "</p>" + items.map(function (it) { return row(it, terms); }).join("") +
(more > 0 ? '<button type="button" class="ds-command__item site-search__more" role="option" aria-selected="false" id="ss-' + (n++) + '" data-site-search-more="' + key + '"><i class="ds-icon ds-icon--chevron-down" aria-hidden="true"></i><span class="ds-command__label">' + esc(label || title) + " " + more + "개 더 보기</span></button>" : "") + "</div>";
}
function render() {
n = 0;
if (!data) { list.innerHTML = '<p class="ds-command__empty">불러오는 중</p>'; return; }
var q = norm(input.value).trim(), terms = q.split(/\s+/).filter(Boolean), types = SCOPE[scope] || ORDER, html = "";
if (!terms.length) {
var r = recent();
if (r.length) html += group("최근 연 것", r, [], 0);
if (scope === "all") {
var by = function (ty, names) { return names.map(function (nm) { return data.filter(function (it) { return it.type === ty && it.title === nm; })[0]; }).filter(Boolean); };
html += group("자주 찾는 컴포넌트", by("comp", ["Action Button", "Text Field Input", "Select Box", "Checkbox", "Dialog", "Table", "Tabs", "Date Picker"]), [], 0);
html += group("Foundations", by("found", ["Color", "Typography", "Spacing", "Icon Library"]), [], 0);
} else html += group((TYPES[types[0]] || ["전체"])[0], data.filter(function (it) { return types.indexOf(it.type) >= 0; }).slice(0, 30), [], 0);
} else {
var flat = terms.join(""), found = 0, groups = [];
types.forEach(function (ty, oi) {
var hits = data.filter(function (it) { return it.type === ty; }).map(function (it) { return [score(it, terms, flat), it]; })
.filter(function (x) { return x[0] > 0; }).sort(function (a, b) { return b[0] - a[0] || a[1].title.length - b[1].title.length; });
if (!hits.length) return;
found += hits.length;
groups.push({ ty: ty, best: hits[0][0], oi: oi, items: hits.slice(0, 100).map(function (x) { return x[1]; }), n: hits.length });
});
groups.sort(function (a, b) { return b.best - a.best || a.oi - b.oi; });
groups.forEach(function (g) { html += group(TYPES[g.ty][0] + " " + g.n, g.items, terms, 0); });
if (!found) html = '<p class="ds-command__empty">"' + esc(input.value.trim()) + '"(으)로 찾은 결과가 없어요. 다른 낱말이나 한글, 영어 이름으로 찾아보세요.</p>';
}
list.innerHTML = html;
var first = list.querySelector(".ds-command__item");
if (first) { first.setAttribute("aria-selected", "true"); input.setAttribute("aria-activedescendant", first.id); } else input.removeAttribute("aria-activedescendant");
list.scrollTop = 0;
}
function setScope(k) {
scope = k;
box.querySelectorAll("[data-site-search-scope]").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-site-search-scope") === k ? "true" : "false"); });
render(); input.focus();
}
document.addEventListener("input", function (e) { if (e.target === input) render(); });
new MutationObserver(function () { if (box.open) { setScope("all"); load(); } }).observe(box, { attributes: true, attributeFilter: ["open"] });
box.addEventListener("click", function (e) {
var sc = e.target.closest("[data-site-search-scope]");
if (sc) { setScope(sc.getAttribute("data-site-search-scope")); return; }
var a = e.target.closest("[data-ss-url]");
if (a && data) { var url = a.getAttribute("data-ss-url"); var it = data.filter(function (x) { return x.url === url; })[0]; if (it) remember(it); }
}, true);
function fromHash() {
var h = decodeURIComponent(location.hash || "");
var t = h.match(/^#t=(--ds-[a-z0-9-]+)$/);
if (t) {
var code = [].slice.call(document.querySelectorAll(".site-main code")).filter(function (c) { return c.textContent === t[1]; })[0];
if (code) { var tr = code.closest("tr") || code; tr.scrollIntoView({ block: "center" }); tr.classList.remove("site-search-flash"); void tr.offsetWidth; tr.classList.add("site-search-flash"); }
}
var q = h.match(/^#q=([a-z0-9-]+)$/);
var libQ = document.querySelector("[data-site-lib-q]");
if (q && libQ) { libQ.value = q[1]; libQ.dispatchEvent(new Event("input", { bubbles: true })); }
}
window.addEventListener("hashchange", fromHash);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(fromHash, 100); }); else setTimeout(fromHash, 100);
(function () {
var root = document.documentElement;
if (!root.classList.contains("site-motion") || !("IntersectionObserver" in window)) { root.classList.remove("site-motion", "site-type"); return; }
window.__siteMotion = true;
if (!root.classList.contains("site-type")) { root.classList.add("site-motion-on"); return; }
var ai = document.getElementById("ai");
var boxes = [];
if (ai) for (var n = ai.nextElementSibling; n && n.tagName !== "H2"; n = n.nextElementSibling) if (n.matches(".ds-codeblock[data-wrap]")) boxes.push(n);
var queue = boxes.map(function (fig) {
var pre = fig.querySelector(".ds-codeblock__code");
var walker = document.createTreeWalker(pre, NodeFilter.SHOW_TEXT), nodes = [], t;
while ((t = walker.nextNode())) nodes.push({ n: t, s: t.data });
return { fig: fig, pre: pre, nodes: nodes, seen: false, state: "wait" };
});
if (!queue.length) { root.classList.add("site-motion-on"); return; }
function skeleton(q) {
var box = q.pre.getBoundingClientRect(), r = document.createRange(), lines = [];
r.selectNodeContents(q.pre);
[].forEach.call(r.getClientRects(), function (c) {
if (c.width < 1) return;
var top = Math.round(c.top - box.top), l = lines.filter(function (x) { return Math.abs(x.top - top) < 4; })[0];
if (l) { l.left = Math.min(l.left, c.left - box.left); l.right = Math.max(l.right, c.right - box.left); }
else lines.push({ top: top, h: c.height, left: c.left - box.left, right: c.right - box.left });
});
q.skel = lines.map(function (x) {
var s = document.createElement("span"); s.className = "ds-skeleton site-type-skel"; s.setAttribute("aria-hidden", "true");
var h = Math.min(14, x.h - 6);
s.style.cssText = "left:" + x.left + "px;top:" + (x.top + (x.h - h) / 2) + "px;width:" + (x.right - x.left) + "px;height:" + h + "px";
return s;
});
q.pre.style.position = "relative";
q.skel.forEach(function (s) { q.pre.appendChild(s); });
}
function unskeleton(q) { (q.skel || []).forEach(function (s) { s.remove(); }); q.skel = null; q.pre.style.removeProperty("position"); }
queue.forEach(function (q) {
q.pre.style.minHeight = q.pre.offsetHeight + "px";
skeleton(q);
q.nodes.forEach(function (x) { x.n.data = ""; });
q.pre.setAttribute("aria-busy", "true");
var finish = function () { if (q.state !== "done") end(q); };
q.fig.addEventListener("pointerdown", finish, true);
q.fig.addEventListener("focusin", finish);
});
var caret = document.createElement("span"); caret.className = "site-caret"; caret.setAttribute("aria-hidden", "true");
function end(q) {
q.state = "done"; clearTimeout(q.timer); unskeleton(q);
q.nodes.forEach(function (x) { x.n.data = x.s; });
if (caret.parentNode && q.pre.contains(caret)) caret.remove();
q.pre.style.removeProperty("min-height"); q.pre.removeAttribute("aria-busy");
setTimeout(next, 450);
}
function type(q) {
q.state = "typing"; unskeleton(q);
var i = 0, k = 0;
(function tick() {
if (q.state !== "typing") return;
var x = q.nodes[i];
if (!x) return end(q);
k = Math.min(x.s.length, k + 1);
x.n.data = x.s.slice(0, k);
x.n.parentNode.insertBefore(caret, x.n.nextSibling);
if (k >= x.s.length) { i++; k = 0; }
q.timer = setTimeout(tick, 25);
})();
}
function next() {
for (var j = 0; j < queue.length; j++) {
var q = queue[j];
if (q.state === "done") continue;
if (q.state === "wait" && q.seen) { q.state = "soon"; q.timer = setTimeout(function () { type(q); }, 300); }
return;
}
}
var seen = new IntersectionObserver(function (entries) {
entries.forEach(function (e) { if (!e.isIntersecting) return; seen.unobserve(e.target); queue.forEach(function (q) { if (q.fig === e.target) q.seen = true; }); });
next();
}, { rootMargin: "0px 0px -10% 0px" });
queue.forEach(function (q) { seen.observe(q.fig); });
root.classList.add("site-motion-on");
})();
})();
(function () {
var b = document.querySelector("[data-site-totop]"); if (!b) return;
var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
var shown = false;
function sync() {
var on = window.scrollY > window.innerHeight;
if (on === shown) return; shown = on;
if (on) { b.setAttribute("data-show", ""); b.removeAttribute("aria-hidden"); b.removeAttribute("tabindex"); }
else { b.removeAttribute("data-show"); b.setAttribute("aria-hidden", "true"); b.setAttribute("tabindex", "-1"); }
}
var raf = 0; window.addEventListener("scroll", function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; sync(); }); }, { passive: true }); sync();
b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); var h = document.querySelector("h1"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } });
})();
(function () {
var box = document.querySelector("[data-site-pbox]");
if (!box) return;
var field = box.querySelector(".site-pbox__field"), out = box.querySelector(".site-pbox__text");
var text = out.textContent;
var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
var cs = getComputedStyle(field), lh = parseFloat(cs.lineHeight) || 24, pad = parseFloat(cs.paddingTop) || 0, MAX = lh * 8 + pad;
var H = { x: lh + pad, v: 0, t: lh + pad, k: 420, c: 34 };
function target() { field.style.height = "auto"; H.t = Math.min(field.scrollHeight, MAX); field.style.overflowY = field.scrollHeight > MAX ? "auto" : "hidden"; field.style.height = H.x + "px"; field.scrollTop = 0; }
if (reduce || !text) { box.classList.add("is-done"); field.style.height = "auto"; field.style.height = Math.min(field.scrollHeight, MAX) + "px"; return; }
var frames = keyFrames(text), KEY = 0.022;
out.textContent = ""; box.classList.add("is-typing"); target();
var started = false, n = 0, acc = 0, last = 0, done = false;
function loop(now) {
var dt = Math.max(0, Math.min((now - last) / 1000, 1 / 30)); last = now;
if (!done) { acc += dt; while (acc >= KEY && n < frames.length) { acc -= KEY; out.textContent = frames[n++]; target(); } if (n >= frames.length) { done = true; box.classList.remove("is-typing"); box.classList.add("is-done"); } }
for (var k = 0; k < 4; k++) { var a = -H.k * (H.x - H.t) - H.c * H.v; H.v += a * dt / 4; H.x += H.v * dt / 4; }
field.style.height = H.x.toFixed(2) + "px";
if (field.scrollHeight <= MAX && field.scrollTop) field.scrollTop = 0;
if (done && Math.abs(H.x - H.t) < 0.1 && Math.abs(H.v) < 0.1) { field.style.height = H.t + "px"; return; }
requestAnimationFrame(loop);
}
function check() {
if (started) return;
var b = box.getBoundingClientRect();
if (b.bottom > 0 && b.top < window.innerHeight) { started = true; window.removeEventListener("scroll", check); last = performance.now(); setTimeout(function () { last = performance.now(); requestAnimationFrame(loop); }, 400); }
}
window.addEventListener("scroll", check, { passive: true }); check();
function keyFrames(str) {
var L = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ", V = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ", T = " ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
var VV = { "ㅘ": "ㅗ", "ㅙ": "ㅗ", "ㅚ": "ㅗ", "ㅝ": "ㅜ", "ㅞ": "ㅜ", "ㅟ": "ㅜ", "ㅢ": "ㅡ" };
var TT = { "ㄳ": "ㄱㅅ", "ㄵ": "ㄴㅈ", "ㄶ": "ㄴㅎ", "ㄺ": "ㄹㄱ", "ㄻ": "ㄹㅁ", "ㄼ": "ㄹㅂ", "ㄽ": "ㄹㅅ", "ㄾ": "ㄹㅌ", "ㄿ": "ㄹㅍ", "ㅀ": "ㄹㅎ", "ㅄ": "ㅂㅅ" };
function make(l, v, t) { return String.fromCharCode(0xac00 + (l * 21 + V.indexOf(v)) * 28 + (t ? T.indexOf(t) : 0)); }
function split(ch) { var c = ch.charCodeAt(0) - 0xac00; if (!(c >= 0 && c <= 11171)) return null; return { l: Math.floor(c / 588), v: V.charAt(Math.floor(c % 588 / 28)), t: c % 28 ? T.charAt(c % 28) : "" }; }
function joinT(a, b) { for (var k in TT) if (TT[k] === a + b) return k; return ""; }
var out = [], done = "", skipInitial = false;
for (var i = 0; i < str.length; i++) {
var ch = str.charAt(i), h = split(ch);
if (!h) { out.push(done + ch); done += ch; skipInitial = false; continue; }
if (!skipInitial) out.push(done + L.charAt(h.l));
skipInitial = false;
if (VV[h.v]) out.push(done + make(h.l, VV[h.v]));
out.push(done + make(h.l, h.v));
if (h.t) { if (TT[h.t]) out.push(done + make(h.l, h.v, TT[h.t].charAt(0))); out.push(done + make(h.l, h.v, h.t)); }
var nx = split(str.charAt(i + 1)), nl = nx ? L.charAt(nx.l) : "";
if (nl) {
if (!h.t && T.indexOf(nl) > 0) { out.push(done + make(h.l, h.v, nl)); skipInitial = true; }
else if (h.t && !TT[h.t] && joinT(h.t, nl)) { out.push(done + make(h.l, h.v, joinT(h.t, nl))); skipInitial = true; }
}
done += ch;
}
if (out[out.length - 1] !== str) out.push(str);
return out;
}
})();
(function () {
var btn = document.querySelector(".site-gs__ai-head > [data-ds-open=\"site-tips\"]"), coin = btn && btn.querySelector(".site-coin");
if (!coin) return;
var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
var wrap = document.createElement("span"), burst = document.createElement("span");
wrap.className = "site-coin-wrap"; burst.className = "site-burst"; burst.setAttribute("aria-hidden", "true");
coin.parentNode.insertBefore(wrap, coin); wrap.appendChild(burst); wrap.appendChild(coin);
var COLORS = ["yellow-400", "orange-400", "red-400", "green-400", "blue-400", "purple-400", "yellow-400", "orange-400"];
var dots = COLORS.map(function (c, i) { var el = document.createElement("i"); el.style.background = "var(--ds-color-palette-" + c + ")"; burst.appendChild(el); return { el: el, a: i / COLORS.length * Math.PI * 2 + 0.2 }; });
var H = { x: 1, v: 0, t: 1, k: 520, c: 13 }, bt = 9, last = 0, running = false, pass = false;
function frame(now) {
var dt = Math.min((now - last) / 1000, 1 / 30); last = now; bt += dt;
for (var s = 0; s < 4; s++) { var a = -H.k * (H.x - H.t) - H.c * H.v; H.v += a * dt / 4; H.x += H.v * dt / 4; }
coin.style.transform = "scale(" + H.x.toFixed(4) + ")";
var k = Math.min(bt / 0.55, 1), e = 1 - Math.pow(1 - k, 3);
dots.forEach(function (d, i) { var r = 10 + e * (18 + (i % 2) * 6); d.el.style.opacity = k >= 1 ? 0 : (1 - k * k).toFixed(3); d.el.style.transform = "translate(" + (Math.cos(d.a) * r).toFixed(2) + "px," + (Math.sin(d.a) * r).toFixed(2) + "px) scale(" + (1 - 0.7 * k).toFixed(3) + ")"; });
if (k >= 1 && Math.abs(H.x - 1) < 0.001 && Math.abs(H.v) < 0.01) { coin.style.transform = ""; running = false; return; }
requestAnimationFrame(frame);
}
btn.addEventListener("click", function (ev) {
if (pass || reduce) { pass = false; return; }
ev.stopPropagation(); ev.preventDefault();
H.x = 0.55; H.v = 9; bt = 0;
if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
setTimeout(function () { pass = true; btn.click(); }, 520);
});
})();
