
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (t, c, txt) => { const e = document.createElement(t); if (c) e.className = c; if (txt) e.textContent = txt; return e; };

/* ---------- icons ---------- */
const IC = {
  sliders: '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  pause: '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
  reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
};
const paint = (e) => { e.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[e.dataset.i]}</svg>`; };

/* ---------- state ---------- */
const TH = {
  aurora: { a: ["#5eead4", "#818cf8", "#f0abfc"], n: "94,234,212" },
  neon: { a: ["#22d3ee", "#f472b6", "#a3e635"], n: "34,211,238" },
  solar: { a: ["#fbbf24", "#fb7185", "#f97316"], n: "251,191,36" },
  mono: { a: ["#f4f4f5", "#a1a1aa", "#71717a"], n: "228,228,231" },
};
const ENG = {
  g: ["Google", "https://www.google.com/search?q="], ddg: ["DuckDuckGo", "https://duckduckgo.com/?q="],
  yt: ["YouTube", "https://www.youtube.com/results?search_query="], gh: ["GitHub", "https://github.com/search?q="],
  w: ["Wikipedia", "https://en.wikipedia.org/w/index.php?search="],
};
const MODES = { focus: 25, short: 5, long: 15 };
const D0 = {
  name: "", city: "", theme: "aurora", h24: false, ticks: true, particles: true, blur: 22, engine: "g",
  showTasks: true, showFocus: true, showNotes: true, tasks: [], note: "", media: "", wxc: null,
  links: [
    { n: "YouTube", u: "https://youtube.com" }, { n: "Gmail", u: "https://mail.google.com" },
    { n: "GitHub", u: "https://github.com" }, { n: "Claude", u: "https://claude.ai" },
    { n: "Drive", u: "https://drive.google.com" }, { n: "Maps", u: "https://maps.google.com" },
  ],
  focus: { mode: "focus", left: 1500, end: 0, running: false }, sessions: { day: "", n: 0 },
};
let D = JSON.parse(JSON.stringify(D0));
const save = () => chrome.storage.local.set({ glass2: D });
const idb = (mode, fn) => new Promise((res, rej) => {
  const o = indexedDB.open("nexus", 1);
  o.onupgradeneeded = () => o.result.createObjectStore("kv");
  o.onsuccess = () => { const r = fn(o.result.transaction("kv", mode).objectStore("kv")); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); };
  o.onerror = () => rej(o.error);
});

/* ---------- apply look ---------- */
function apply() {
  const t = TH[D.theme] || TH.aurora, r = document.documentElement.style;
  t.a.forEach((c, i) => r.setProperty("--a" + (i + 1), c));
  r.setProperty("--blur", D.blur + "px");
  document.body.dataset.ticks = D.ticks ? 1 : 0;
  $("#wTasks").hidden = !D.showTasks; $("#wFocus").hidden = !D.showFocus; $("#wNotes").hidden = !D.showNotes;
  $("#bento").hidden = !(D.showTasks || D.showFocus || D.showNotes);
  $$(".th").forEach((b) => b.classList.toggle("on", b.dataset.t === D.theme));
  $("#bgc").style.display = D.particles ? "" : "none";
  greet(); tick();
}

/* ---------- greeting, clock, progress ---------- */
const LINES = ["Make the next hour count.", "Small steps still move you forward.", "Build something you are proud of.", "Focus on one thing, then the next.", "Ship it, then improve it.", "Stay curious. Stay consistent.", "Your future self is watching. Impress them.", "Done is better than perfect."];
function greet() {
  const h = new Date().getHours();
  const g = h < 5 ? "Still up" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 22 ? "Good evening" : "Good night";
  $("#hello").textContent = D.name ? `${g}, ${D.name}` : g;
  const doy = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 864e5);
  $("#line").textContent = LINES[doy % LINES.length];
}
const ticks = $("#ticks");
for (let i = 0; i < 60; i++) ticks.appendChild(el("span"));
function tick() {
  const d = new Date();
  const p = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", hourCycle: D.h24 ? "h23" : "h12" }).formatToParts(d);
  const g = (t) => (p.find((x) => x.type === t) || {}).value;
  $("#hm").textContent = `${g("hour")}:${g("minute")}`;
  $("#ap").textContent = D.h24 ? "" : (g("dayPeriod") || "").toUpperCase();
  $("#dt").textContent = d.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const s = d.getSeconds();
  [...ticks.children].forEach((t, i) => { t.className = i === s ? "now" : i < s ? "on" : ""; });
  const y0 = new Date(d.getFullYear(), 0, 1), y1 = new Date(d.getFullYear() + 1, 0, 1);
  const py = ((d - y0) / (y1 - y0)) * 100, pd = ((d.getHours() * 60 + d.getMinutes()) / 1440) * 100;
  $("#pY").style.width = py + "%"; $("#pYv").textContent = Math.round(py) + "%";
  $("#pD").style.width = pd + "%"; $("#pDv").textContent = Math.round(pd) + "%";
  fTick();
}

/* ---------- weather (Open-Meteo, no API key) ---------- */
const WC = (c) => c === 0 ? "Clear" : c < 3 ? "Partly cloudy" : c === 3 ? "Overcast" : c < 50 ? "Fog" : c < 70 ? "Rain" : c < 80 ? "Snow" : c < 90 ? "Showers" : "Storm";
async function weather() {
  if (!D.city) { $("#wxT").textContent = "--"; $("#wxS").textContent = "Set city"; return; }
  const show = (w) => { $("#wxT").textContent = `${w.t}°C`; $("#wxS").textContent = `${w.c} · ${w.n} · H ${w.hi}° L ${w.lo}°`; };
  if (D.wxc && D.wxc.city === D.city) show(D.wxc);
  if (D.wxc && D.wxc.city === D.city && Date.now() - D.wxc.at < 20 * 60000) return;
  try {
    const g = (await (await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(D.city)}&count=1`)).json()).results[0];
    const w = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)).json();
    D.wxc = { city: D.city, at: Date.now(), n: g.name, t: Math.round(w.current.temperature_2m), c: WC(w.current.weather_code), hi: Math.round(w.daily.temperature_2m_max[0]), lo: Math.round(w.daily.temperature_2m_min[0]) };
    save(); show(D.wxc);
  } catch { if (!D.wxc) $("#wxS").textContent = "Weather unavailable"; }
}
$("#wx").addEventListener("click", () => { openDrawer(); $("#cityIn").focus(); });

/* ---------- tasks ---------- */
function rTasks() {
  const l = $("#tList"); l.innerHTML = "";
  D.tasks.forEach((t, i) => {
    const li = el("li", t.d ? "done" : "");
    const ck = el("button", "ck"); ck.setAttribute("aria-label", "Toggle task");
    ck.onclick = () => { t.d = !t.d; save(); rTasks(); };
    const x = el("button", "rm", "✕"); x.setAttribute("aria-label", "Delete task");
    x.onclick = () => { D.tasks.splice(i, 1); save(); rTasks(); };
    li.append(ck, el("span", "", t.t), x); l.append(li);
  });
  $("#tCount").textContent = D.tasks.filter((t) => !t.d).length + " open";
}
const addTask = (t) => { D.tasks.unshift({ t, d: false }); save(); rTasks(); };
$("#tForm").addEventListener("submit", (e) => { e.preventDefault(); const v = $("#tIn").value.trim(); if (v) addTask(v); $("#tIn").value = ""; });
let nt; $("#note").addEventListener("input", (e) => { clearTimeout(nt); nt = setTimeout(() => { D.note = e.target.value; save(); }, 400); });

/* ---------- focus timer ---------- */
const F = () => D.focus;
function beep() {
  try { const c = new AudioContext(); [0, 0.25, 0.5].forEach((t) => { const o = c.createOscillator(), g = c.createGain(); o.frequency.value = 660; o.connect(g); g.connect(c.destination); g.gain.setValueAtTime(0.15, c.currentTime + t); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t + 0.2); o.start(c.currentTime + t); o.stop(c.currentTime + t + 0.22); }); } catch {}
}
function fTick() {
  const f = F();
  if (f.running) {
    f.left = Math.max(0, Math.round((f.end - Date.now()) / 1000));
    if (f.left === 0) {
      f.running = false; beep();
      if (f.mode === "focus") { const day = new Date().toDateString(); if (D.sessions.day !== day) D.sessions = { day, n: 0 }; D.sessions.n++; }
      f.left = (MODES[f.mode] || 25) * 60; save();
    }
  }
  const total = (f.total || MODES[f.mode] * 60);
  const m = String(Math.floor(f.left / 60)).padStart(2, "0"), s = String(f.left % 60).padStart(2, "0");
  $("#fTime").textContent = `${m}:${s}`;
  $("#fArc").style.strokeDashoffset = 339.3 * (1 - f.left / total);
  const go = $("#fGo"); const ic = f.running ? "pause" : "play"; if (go.dataset.i !== ic) { go.dataset.i = ic; paint(go); }
  $$("#fModes button").forEach((b) => b.classList.toggle("on", b.dataset.m === f.mode));
  $("#fSess").textContent = D.sessions.day === new Date().toDateString() ? D.sessions.n + " done today" : "";
  document.title = f.running ? `${m}:${s} · ${f.mode}` : "New Tab";
}
function fSet(mode, mins) { D.focus = { mode, left: mins * 60, total: mins * 60, end: 0, running: false }; save(); fTick(); }
function fStart(mins) { if (mins) { D.focus = { mode: "focus", left: mins * 60, total: mins * 60, end: 0, running: false }; } const f = F(); f.running = true; f.end = Date.now() + f.left * 1000; save(); fTick(); }
$("#fGo").addEventListener("click", () => { const f = F(); if (f.running) { f.running = false; save(); fTick(); } else fStart(); });
$("#fReset").addEventListener("click", () => fSet(F().mode, MODES[F().mode]));
$$("#fModes button").forEach((b) => b.addEventListener("click", () => fSet(b.dataset.m, MODES[b.dataset.m])));

/* ---------- command bar ---------- */
function calc(s) {
  let i = 0; s = s.replace(/\s+/g, "");
  const num = () => { const m = /^\d*\.?\d+/.exec(s.slice(i)); if (!m) throw 0; i += m[0].length; return +m[0]; };
  const atom = () => { if (s[i] === "(") { i++; const v = add(); if (s[i++] !== ")") throw 0; return v; } if (s[i] === "-") { i++; return -atom(); } return num(); };
  const pow = () => { let v = atom(); while (s[i] === "^") { i++; v = v ** atom(); } return v; };
  const mul = () => { let v = pow(); while ("*/%".includes(s[i] || "#")) { const o = s[i++], r = pow(); v = o === "*" ? v * r : o === "/" ? v / r : v % r; } return v; };
  const add = () => { let v = mul(); while ("+-".includes(s[i] || "#")) { const o = s[i++], r = mul(); v = o === "+" ? v + r : v - r; } return v; };
  const r = add(); if (i < s.length) throw 0; return r;
}
const go = (u) => { location.href = u; };
function suggest(raw) {
  const v = raw.trim(), o = [];
  if (!v) return o;
  if (v[0] === "=" || /^[\d(.][\d+\-*/().%^\s]*[+\-*/%^][\d+\-*/().%^\s]*\d\)?$/.test(v)) {
    try { const r = +calc(v.replace(/^=/, "")).toFixed(10); if (isFinite(r)) o.push({ i: "=", l: String(r), h: "Enter to copy", run: () => navigator.clipboard.writeText(String(r)) }); } catch {}
  }
  const tm = v.match(/^t\s+(\d{1,3})$/i);
  if (tm && tm[1]) o.push({ i: "◷", l: `Start a ${tm[1]}-minute focus timer`, h: "Timer", run: () => fStart(Number(tm[1])) });
  const thm = v.match(/^theme\s+(\w+)$/i);
  if (thm && thm[1] && TH[thm[1].toLowerCase()]) o.push({ i: "◐", l: `Switch to ${thm[1].toLowerCase()} theme`, h: "Theme", run: () => { D.theme = thm[1].toLowerCase(); save(); apply(); } });
  const todom = v.match(/^(?:todo|task)\s+(.+)/i);
  if (todom && todom[1]) o.push({ i: "+", l: `Add task: ${todom[1]}`, h: "Tasks", run: () => addTask(todom[1]) });
  const notem = v.match(/^note\s+(.+)/i);
  if (notem && notem[1]) o.push({ i: "✎", l: `Append to scratchpad`, h: "Notes", run: () => { D.note = (D.note ? D.note + "\n" : "") + notem[1]; $("#note").value = D.note; save(); } });
  const searchm = v.match(/^(g|ddg|yt|gh|w)\s+(.+)/i);
  if (searchm && searchm[1] && searchm[2]) o.push({ i: "↗", l: `Search ${ENG[searchm[1].toLowerCase()][0]} for "${searchm[2]}"`, h: ENG[searchm[1].toLowerCase()][0], run: () => go(ENG[searchm[1].toLowerCase()][1] + encodeURIComponent(searchm[2])) });
  D.links.filter((l) => l.n.toLowerCase().includes(v.toLowerCase())).slice(0, 3).forEach((l) => o.push({ i: "↗", l: `Open ${l.n}`, h: new URL(l.u).hostname, run: () => go(l.u) }));
  if (/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v)) o.push({ i: "↗", l: `Go to ${v}`, h: "Open", run: () => go(/^https?:/i.test(v) ? v : "https://" + v) });
  const e = ENG[D.engine] || ENG.g;
  o.push({ i: "⌕", l: `Search ${e[0]} for "${v}"`, h: "Enter", run: () => go(e[1] + encodeURIComponent(v)) });
  return o;
}
let items = [], sel = 0;
function renderSug() {
  const box = $("#sug"); items = suggest($("#q").value); sel = 0;
  box.hidden = !items.length; box.innerHTML = "";
  items.forEach((it, i) => {
    const r = el("div", "s" + (i === 0 ? " sel" : ""));
    r.append(el("i", "", it.i), el("span", "", it.l), el("em", "", it.h));
    r.onmousedown = (e) => { e.preventDefault(); runItem(it); };
    box.append(r);
  });
}
function runItem(it) { $("#q").value = ""; $("#sug").hidden = true; it.run(); }
$("#q").addEventListener("input", renderSug);
$("#q").addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault(); if (!items.length) return;
    sel = (sel + (e.key === "ArrowDown" ? 1 : items.length - 1)) % items.length;
    $$("#sug .s").forEach((r, i) => r.classList.toggle("sel", i === sel));
  } else if (e.key === "Enter" && items[sel]) runItem(items[sel]);
  else if (e.key === "Escape") { $("#q").value = ""; $("#sug").hidden = true; $("#q").blur(); }
});
$("#q").addEventListener("blur", () => setTimeout(() => ($("#sug").hidden = true), 120));
addEventListener("keydown", (e) => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#q").focus(); }
  else if (e.key === "/" && !typing) { e.preventDefault(); $("#q").focus(); }
  else if (e.key === "Escape") closeDrawer();
});

/* ---------- dock ---------- */
let editSlot = -1;
function rDock() {
  const d = $("#dock"); d.innerHTML = "";
  D.links.forEach((l, i) => {
    const a = el("a", "di"); a.href = l.u; a.dataset.n = l.n; a.title = "Right-click to remove";
    const img = el("img"); img.alt = ""; img.src = "https://www.google.com/s2/favicons?sz=64&domain=" + new URL(l.u).hostname; a.append(img);
    a.addEventListener("contextmenu", (e) => { e.preventDefault(); D.links.splice(i, 1); save(); rDock(); });
    d.append(a);
  });
  const add = el("button", "di", "+"); add.dataset.n = "Add link"; add.setAttribute("aria-label", "Add link");
  add.onclick = () => { $("#ln").value = ""; $("#lu").value = ""; $("#dlg").showModal(); $("#ln").focus(); };
  d.append(add);
}
$("#dock").addEventListener("mousemove", (e) => $$(".di", $("#dock")).forEach((x) => { const r = x.getBoundingClientRect(); x.style.setProperty("--s", 1 + Math.max(0, 1 - Math.abs(e.clientX - (r.left + r.width / 2)) / 120) * 0.7); }));
$("#dock").addEventListener("mouseleave", () => $$(".di", $("#dock")).forEach((x) => x.style.setProperty("--s", 1)));
$("#lf").addEventListener("submit", (e) => {
  if (e.submitter && e.submitter.value !== "ok") return;
  try { let u = $("#lu").value.trim(); if (!/^https?:\/\//i.test(u)) u = "https://" + u; new URL(u); D.links.push({ n: $("#ln").value.trim(), u }); save(); rDock(); }
  catch { alert("That address doesn't look valid. Try something like youtube.com"); }
});

/* ---------- drawer & settings ---------- */
const openDrawer = () => $("#drawer").classList.add("open");
const closeDrawer = () => $("#drawer").classList.remove("open");
$("#gear").addEventListener("click", () => $("#drawer").classList.toggle("open"));
$("#dClose").addEventListener("click", closeDrawer);
$$("[data-k]").forEach((i) => i.addEventListener("input", () => {
  D[i.dataset.k] = i.type === "checkbox" ? i.checked : i.type === "range" ? +i.value : i.value;
  save(); apply(); if (i.dataset.k === "city") { D.wxc = null; clearTimeout(window._w); window._w = setTimeout(weather, 700); }
}));
Object.entries(TH).forEach(([k, t]) => {
  const b = el("button", "th"); b.dataset.t = k; b.title = k; b.style.background = `linear-gradient(135deg, ${t.a[0]}, ${t.a[1]}, ${t.a[2]})`;
  b.onclick = () => { D.theme = k; save(); apply(); }; $("#themes").append(b);
});

/* ---------- background media ---------- */
let mUrl = null;
async function rMedia() {
  const bg = $("#bg"); bg.innerHTML = ""; bg.className = ""; bg.style.backgroundImage = "";
  if (mUrl) { URL.revokeObjectURL(mUrl); mUrl = null; }
  const blob = D.media ? await idb("readonly", (s) => s.get("media")) : null;
  if (!blob) return;
  mUrl = URL.createObjectURL(blob); bg.className = "media";
  if (blob.type.startsWith("video")) { const v = Object.assign(document.createElement("video"), { src: mUrl, loop: true, muted: true, autoplay: true, playsInline: true }); bg.append(v); }
  else bg.style.backgroundImage = `url(${mUrl})`;
}
$("#upBg").addEventListener("click", () => $("#file").click());
$("#file").addEventListener("change", async (e) => {
  const f = e.target.files[0]; e.target.value = ""; if (!f) return;
  await idb("readwrite", (s) => s.put(f, "media")); D.media = f.type.startsWith("video") ? "video" : "image"; save(); rMedia();
});
$("#resetBg").addEventListener("click", async () => { await idb("readwrite", (s) => s.delete("media")); D.media = ""; save(); rMedia(); });

/* ---------- interactive particle field ---------- */
const cv = $("#bgc"), cx = cv.getContext("2d"), mouse = { x: -999, y: -999 };
let W, H, P = [];
function sizeCv() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  P = Array.from({ length: Math.min(120, (W * H) / 15000) | 0 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
}
function draw() {
  requestAnimationFrame(draw);
  if (document.hidden || !D.particles) return;
  cx.clearRect(0, 0, W, H);
  const n = (TH[D.theme] || TH.aurora).n;
  for (let i = 0; i < P.length; i++) {
    const p = P[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    cx.fillStyle = `rgba(${n},0.7)`; cx.beginPath(); cx.arc(p.x, p.y, 1.4, 0, 7); cx.fill();
    for (let j = i + 1; j < P.length; j++) {
      const q = P[j], d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 130) { cx.strokeStyle = `rgba(${n},${0.22 * (1 - d / 130)})`; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke(); }
    }
    const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
    if (dm < 180) { cx.strokeStyle = `rgba(${n},${0.55 * (1 - dm / 180)})`; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(mouse.x, mouse.y); cx.stroke(); }
  }
}
addEventListener("resize", sizeCv);
addEventListener("mousemove", (e) => {
  mouse.x = e.clientX; mouse.y = e.clientY;
  $$(".glass").forEach((g) => { const r = g.getBoundingClientRect(); g.style.setProperty("--mx", e.clientX - r.left + "px"); g.style.setProperty("--my", e.clientY - r.top + "px"); });
});

/* ---------- start ---------- */
chrome.storage.local.get("glass2", (v) => {
  D = Object.assign(JSON.parse(JSON.stringify(D0)), v.glass2 || {});
  $$("[data-i]").forEach(paint);
  $$("[data-k]").forEach((i) => { const val = D[i.dataset.k]; if (i.type === "checkbox") i.checked = val; else i.value = val; });
  $("#note").value = D.note;
  const f = F(); if (f.running) f.left = Math.max(0, Math.round((f.end - Date.now()) / 1000));
  apply(); rTasks(); rDock(); rMedia(); weather(); sizeCv(); draw();
  setInterval(tick, 1000);
});