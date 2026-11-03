'use strict';
const REPO = 'YOUR-GITHUB-USER/blockbuilder'; // change this to your repo
const app = document.getElementById('app');
const h = (t, a = {}, ...c) => {
  const e = document.createElement(t);
  for (const k in a) k.startsWith('on') ? e.addEventListener(k.slice(2), a[k]) : k === 'class' ? e.className = a[k] : e.setAttribute(k, a[k]);
  e.append(...c.flat().filter(x => x != null && x !== false));
  return e;
};
const SHOTS = [
  ['Front', 'Stand back so the whole engine bay fits in the frame.'],
  ['Driver side', 'Shoot the full side of the engine.'],
  ['Passenger side', 'Shoot the full side of the engine.'],
  ['Rear, firewall side', 'Get the firewall, heater hoses and any harness passing through.'],
  ['Top down', 'Shoot straight down from above.'],
  ['Wiring connectors', 'Move closer. Capture each plug and where its wire runs.'],
  ['Vacuum and coolant hoses', 'Show where each hose starts and ends.'],
  ['Fuel lines and rail', 'Show the fittings and clips.'],
  ['Brackets and ground straps', 'Show every bracket and where each ground strap bolts.'],
  ['Accessory belt routing', 'Shoot the belt path and tensioner before loosening anything.'],
  ['Sensors and labels', 'Capture sensor locations and any stickers on the engine.']
];

/* storage */
const dbp = new Promise((ok, no) => {
  const r = indexedDB.open('blockbuilder', 1);
  r.onupgradeneeded = () => r.result.createObjectStore('projects', { keyPath: 'id' });
  r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error);
});
const tx = async (m, f) => { const d = await dbp; return new Promise((ok, no) => { const t = d.transaction('projects', m), q = f(t.objectStore('projects')); t.oncomplete = () => ok(q && q.result); t.onerror = () => no(t.error); }); };
const put = p => tx('readwrite', s => s.put(p)), all = () => tx('readonly', s => s.getAll()), get = id => tx('readonly', s => s.get(id)), del = id => tx('readwrite', s => s.delete(id));

/* helpers */
let DATA, tab = 'photos', chat = [];
const eng = id => DATA.engines.find(e => e.id === id);
const stepsOf = e => [...DATA.common.pre, ...e.steps, ...DATA.common.post];
const urlOf = b => URL.createObjectURL(b);
async function shrink(file, max = 1600) {
  const bmp = await createImageBitmap(file), k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas'); c.width = bmp.width * k; c.height = bmp.height * k;
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise(ok => c.toBlob(ok, 'image/jpeg', .82));
}
const b64 = b => new Promise(ok => { const r = new FileReader(); r.onload = () => ok(r.result.split(',')[1]); r.readAsDataURL(b); });
const pick = (label, cb) => h('label', { class: 'btn' }, label, h('input', { type: 'file', accept: 'image/*', capture: 'environment', hidden: '', onchange: e => { const f = e.target.files[0]; if (f) cb(f); e.target.value = ''; } }));

/* router */
async function route() {
  const [, v, id] = location.hash.split('/');
  app.replaceChildren(); window.scrollTo(0, 0);
  if (v === 'contribute') return contributeView();
  if (v === 'engine' && eng(id)) return engineView(eng(id));
  if (v === 'project') { const p = await get(id); if (p) return projectView(p); }
  homeView();
}

/* views */
async function homeView() {
  const list = h('ul', { class: 'rows' });
  const q = h('input', { type: 'search', placeholder: 'Make, model or engine code', 'aria-label': 'Find your engine', oninput: draw });
  function draw() {
    const s = q.value.toLowerCase().trim();
    const m = DATA.engines.filter(e => [e.name, e.make, e.code, e.years].join(' ').toLowerCase().includes(s));
    list.replaceChildren(...m.map(e => h('li', {}, h('a', { href: '#/engine/' + e.id }, h('b', {}, e.name), h('span', {}, e.make + ', ' + e.years)))));
    if (!m.length) list.append(h('li', { class: 'muted' }, h('a', { href: '#' }, 'No match. Try only the make, or ask the assistant inside a project.')));
  }
  draw();
  const vinOut = h('p', { class: 'muted' });
  const vin = h('input', { type: 'text', maxlength: '17', autocapitalize: 'characters', placeholder: 'Or enter your 17-character VIN', 'aria-label': 'VIN', style: 'flex:1;min-width:12rem' });
  const lookup = async () => {
    const v = vin.value.trim().toUpperCase();
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(v)) { vinOut.textContent = 'A VIN has 17 characters and never uses I, O or Q.'; return; }
    vinOut.textContent = 'Looking up...';
    try {
      const r = await (await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/' + v + '?format=json')).json();
      const g = n => ((r.Results.find(x => x.Variable === n) || {}).Value || '').trim();
      const car = [g('Model Year'), g('Make'), g('Model')].filter(Boolean).join(' ');
      const disp = g('Displacement (L)') ? Number(g('Displacement (L)')).toFixed(1) + ' L' : '';
      const motor = [disp, g('Engine Number of Cylinders') && g('Engine Number of Cylinders') + ' cyl', g('Engine Model')].filter(Boolean).join(', ');
      let hit = false;
      for (const t of [g('Engine Model'), g('Make')].filter(Boolean)) { q.value = t; draw(); if (list.querySelector('a[href^="#/engine"]')) { hit = true; break; } }
      vinOut.replaceChildren((car || 'Unknown vehicle') + (motor ? ', ' + motor : '') + '. ',
        hit ? 'Showing engines that may match. Confirm the engine code on the block.' : h('span', {}, 'No matching engine yet. ', h('a', { href: '#/contribute' }, 'Add it.')));
    } catch { vinOut.textContent = 'VIN lookup needs an internet connection. Search by make or engine code instead.'; }
  };
  const vinBox = h('div', {}, h('div', { class: 'row' }, vin, h('button', { onclick: lookup }, 'Look up VIN')), vinOut);
  const projects = await all();
  app.append(h('h1', {}, 'Find your engine'), q, vinBox, list,
    h('h2', {}, 'Your projects'),
    projects.length ? h('ul', { class: 'rows' }, projects.sort((a, b) => b.created - a.created).map(p => h('li', {},
      h('a', { href: '#/project/' + p.id }, h('b', {}, p.name), h('span', {}, p.shots.length + ' photos, ' + p.done.length + ' steps done')),
      h('button', { class: 'danger', 'aria-label': 'Delete ' + p.name, onclick: async () => { if (confirm('Delete "' + p.name + '" and its photos?')) { await del(p.id); route(); } } }, 'Delete'))))
      : h('p', { class: 'muted' }, 'Pick an engine, then start a project to photograph and track your teardown.'),
    h('p', {}, h('a', { href: '#/contribute' }, 'Missing your engine? Add it.')));
}

function engineView(e) {
  app.append(h('a', { href: '#/' }, 'All engines'), h('h1', {}, e.name), h('p', { class: 'muted' }, e.make + ', ' + e.years + ', ' + e.code),
    h('dl', {}, e.specs.flatMap(([k, v]) => [h('dt', {}, k), h('dd', {}, v)])),
    h('p', { class: 'warn' }, 'Starter data. Confirm procedures and torque specs against the factory service manual before you rely on them.'),
    h('button', { onclick: async () => {
      const name = prompt('Name this project', e.name + ' teardown'); if (!name) return;
      const p = { id: crypto.randomUUID(), engineId: e.id, name, created: Date.now(), next: 0, shots: [], done: [], doneRe: [], mode: 'out' };
      await put(p); location.hash = '#/project/' + p.id;
    } }, 'Start a project'),
    h('h2', { style: 'margin-top:1.5rem' }, 'Removal steps'),
    h('ol', { class: 'steps' }, stepsOf(e).map(([t, d]) => h('li', {}, h('b', {}, t), h('p', { style: 'margin-left:0' }, d)))));
}

function projectView(p) {
  const e = eng(p.engineId), render = () => projectView(p);
  app.replaceChildren(h('a', { href: '#/' }, 'All projects'), h('h1', {}, p.name), h('p', { class: 'muted' }, e.name));
  const body = h('section');
  const tabs = h('div', { class: 'tabs', role: 'tablist' }, [['photos', 'Photos'], ['steps', 'Steps'], ['ask', 'Ask AI']].map(([k, l]) =>
    h('button', { role: 'tab', 'aria-selected': String(tab === k), onclick: () => { tab = k; render(); } }, l)));
  app.append(tabs, body);
  if (tab === 'photos') photosTab(p, body, render);
  else if (tab === 'steps') stepsTab(p, e, body, render);
  else askTab(p, e, body);
}

async function addShot(p, file, label, advance, render) {
  p.shots.push({ id: crypto.randomUUID(), label, blob: await shrink(file), note: '', step: '' });
  if (advance) p.next++;
  await put(p); render();
}

function photosTab(p, box, render) {
  const e = eng(p.engineId), n = SHOTS[p.next], steps = stepsOf(e);
  if (n) box.append(h('div', { class: 'shot' }, h('p', { class: 'count' }, 'Photo ' + (p.next + 1) + ' of ' + SHOTS.length), h('h2', {}, n[0]), h('p', {}, n[1]),
    h('div', { class: 'row' }, pick('Take photo', f => addShot(p, f, n[0], true, render)),
      h('button', { class: 'ghost', onclick: async () => { p.next++; await put(p); render(); } }, 'Skip'))));
  else box.append(h('p', { class: 'ok' }, 'Walkthrough complete. Add close-ups any time.'));
  box.append(h('div', { class: 'row' }, pick('Add extra photo', f => { const l = prompt('What is this a photo of?', 'Close-up'); if (l) addShot(p, f, l, false, render); })));
  box.append(h('div', { class: 'grid' }, p.shots.map(s => h('figure', {},
    h('img', { src: urlOf(s.blob), alt: s.label }), h('b', {}, s.label),
    h('textarea', { 'aria-label': 'Note for ' + s.label, placeholder: 'Note, e.g. 3 bolts, 2 sizes', onchange: async ev => { s.note = ev.target.value; await put(p); } }, s.note),
    h('select', { 'aria-label': 'Link to step', onchange: async ev => { s.step = ev.target.value; await put(p); } },
      h('option', { value: '' }, 'Not linked to a step'), steps.map(([t], i) => h('option', { value: String(i), ...(s.step === String(i) ? { selected: '' } : {}) }, (i + 1) + '. ' + t))),
    h('button', { class: 'danger', onclick: async () => { p.shots = p.shots.filter(x => x !== s); await put(p); render(); } }, 'Delete photo')))));
}

function stepsTab(p, e, box, render) {
  const steps = stepsOf(e), re = p.mode === 'in', key = re ? 'doneRe' : 'done';
  const order = steps.map((_, i) => i); if (re) order.reverse();
  box.append(h('div', { class: 'row' }, h('button', { class: 'ghost', onclick: async () => { p.mode = re ? 'out' : 'in'; await put(p); render(); } }, re ? 'Reassembly order. Switch to removal' : 'Removal order. Switch to reassembly')),
    re ? h('p', { class: 'muted' }, 'Work from the bottom of the list up. Check the linked photos at each step.') : null,
    h('ol', { class: 'steps' }, order.map(i => {
      const [t, d] = steps[i], on = p[key].includes(i), pics = p.shots.filter(s => s.step === String(i));
      return h('li', { class: on ? 'done' : '' },
        h('label', {}, h('input', { type: 'checkbox', ...(on ? { checked: '' } : {}), onchange: async ev => { p[key] = ev.target.checked ? [...p[key], i] : p[key].filter(x => x !== i); await put(p); render(); } }), (re ? 'Reverse: ' : '') + t),
        h('p', {}, d), pics.length ? h('div', { class: 'thumbs' }, pics.map(s => h('img', { src: urlOf(s.blob), alt: s.label, title: s.note || s.label }))) : null);
    })));
}

function askTab(p, e, box) {
  const log = h('div'), q = h('textarea', { 'aria-label': 'Your question', placeholder: 'Ask about this engine, or attach a photo of a part you cannot identify.' });
  let img = null; const status = h('span', { class: 'muted' });
  const show = () => log.replaceChildren(...chat.map(m => h('div', { class: 'msg' + (m.me ? ' me' : '') }, m.text)));
  const send = async () => {
    const question = q.value.trim(); if (!question) return;
    chat.push({ me: 1, text: question + (img ? ' [photo attached]' : '') }); q.value = ''; show(); status.textContent = 'Thinking...';
    const next = stepsOf(e).find((_, i) => !p.done.includes(i));
    try {
      const r = await fetch('/api/gemini', { method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question, engine: e.name, step: next ? next[0] : '', image: img }) });
      const d = await r.json(); chat.push({ text: d.answer || d.error || 'No answer came back.' });
    } catch { chat.push({ text: 'Could not reach the assistant. Check your connection. Your project works offline, but the assistant needs internet.' }); }
    img = null; status.textContent = ''; show();
  };
  box.append(h('p', { class: 'warn' }, 'AI answers can be wrong. Verify torque specs and procedures against the factory manual.'), log, q,
    h('div', { class: 'row' }, pick('Attach photo', async f => { const b = await shrink(f, 1024); img = { mime: 'image/jpeg', data: await b64(b) }; status.textContent = 'Photo attached'; }),
      h('button', { onclick: send }, 'Ask'), status));
  show();
}

function contributeView() {
  const f = {}, status = h('p', { class: 'muted', role: 'status' });
  const field = (k, label, ph, tag = 'input') => {
    f[k] = h(tag, tag === 'input' ? { type: 'text', id: 'f-' + k, placeholder: ph } : { id: 'f-' + k, placeholder: ph, rows: '8' });
    return h('div', { style: 'margin:.8rem 0' }, h('label', { class: 'fl', for: 'f-' + k }, label), f[k]);
  };
  const out = h('textarea', { readonly: '', rows: '8', 'aria-label': 'Engine data', hidden: '' });
  const build = () => {
    const v = k => f[k].value.trim(), name = v('name');
    const steps = v('steps').split('\n').map(x => x.trim()).filter(Boolean).map(x => { const i = x.indexOf(':'); return i > 0 ? [x.slice(0, i).trim(), x.slice(i + 1).trim()] : [x, '']; });
    if (!name || !steps.length) { status.textContent = 'Add an engine name and at least one step.'; return null; }
    const o = { id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), name, make: v('make'), code: v('code'), years: v('years'),
      specs: [['Displacement', v('disp')], ['Layout', v('layout')], ['Firing order', v('fire')]].filter(x => x[1]), steps };
    out.value = JSON.stringify(o, null, 1); out.hidden = false; status.textContent = ''; return out.value;
  };
  app.append(h('a', { href: '#/' }, 'All engines'), h('h1', {}, 'Add an engine'),
    h('p', { class: 'muted' }, 'Share the removal steps for an engine that is missing. Your submission is reviewed before it is added.'),
    field('name', 'Engine name', 'Ford 4.6L 2V'), field('make', 'Make', 'Ford'), field('code', 'Engine code', '4.6 2V Modular'), field('years', 'Years', '1991-2010'),
    field('disp', 'Displacement', '4.6 L'), field('layout', 'Layout', 'V8, SOHC'), field('fire', 'Firing order', '1-3-7-2-6-5-4-8'),
    field('steps', 'Removal steps, one per line', 'Remove intake: Unplug the MAF and photograph vacuum lines.', 'textarea'),
    h('p', { class: 'muted' }, 'Write each step as "Title: detail". Only include torque values you have read in a service manual.'),
    h('div', { class: 'row' },
      h('button', { onclick: () => {
        const j = build(); if (!j) return;
        const body = 'Engine submission. Where the procedure comes from (manual, own experience):\n\n```json\n' + j + '\n```';
        const u = 'https://github.com/' + REPO + '/issues/new?title=' + encodeURIComponent('Engine: ' + f.name.value.trim()) + '&labels=engine&body=' + encodeURIComponent(body);
        if (u.length > 7500) { status.textContent = 'Too long to send automatically. Copy the data and paste it into a new GitHub issue.'; open('https://github.com/' + REPO + '/issues/new'); }
        else open(u, '_blank');
      } }, 'Submit on GitHub'),
      h('button', { class: 'ghost', onclick: async () => { const j = build(); if (j) { try { await navigator.clipboard.writeText(j); status.textContent = 'Copied.'; } catch { out.select(); status.textContent = 'Select and copy the data below.'; } } } }, 'Copy data')),
    status, out);
}

/* start */
let deferred;
addEventListener('beforeinstallprompt', ev => { ev.preventDefault(); deferred = ev; const b = document.getElementById('install'); b.hidden = false; b.onclick = () => { deferred.prompt(); b.hidden = true; }; });
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
fetch('engines/engines.json').then(r => r.json()).then(d => { DATA = d; addEventListener('hashchange', route); route(); })
  .catch(() => app.append(h('p', { class: 'warn' }, 'Could not load the engine database. Reconnect once so it can be saved for offline use.')));