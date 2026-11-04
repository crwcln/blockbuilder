const STEP_IMAGES = {
  photo: '/img/parts/photo.jpg',
  workspace: '/img/parts/workspace.jpg',
  fluids: '/img/parts/fluids.jpg',
  electrical: '/img/parts/electrical.jpg',
  stand: '/img/parts/stand.jpg',
  intake: '/img/parts/intake.jpg',
  fuel: '/img/parts/fuel.jpg',
  exhaust: '/img/parts/exhaust.jpg',
  belt: '/img/parts/belt.jpg',
  flywheel: '/img/parts/flywheel.jpg',
  timing: '/img/parts/timing.jpg',
  valvetrain: '/img/parts/valvetrain.jpg',
  head: '/img/parts/head.jpg',
  plugs: '/img/parts/plugs.jpg',
  bottom: '/img/parts/bottom.jpg',
  measure: '/img/parts/measure.jpg',
  clean: '/img/parts/clean.jpg',
  small: '/img/parts/small.jpg',
  two: '/img/parts/two.jpg',
  rotary: '/img/parts/rotary.jpg',
  general: '/img/parts/general.jpg'
};

const STEP_IMAGE_LABELS = {
  photo: 'Photograph and label first',
  workspace: 'Bench and labeled parts',
  fluids: 'Drain and catch the fluids',
  electrical: 'Battery, ignition and wiring',
  stand: 'Rated engine stand',
  intake: 'Air intake and throttle body',
  fuel: 'Fuel rail and injectors',
  exhaust: 'Exhaust and heat shields',
  belt: 'Belt routing and accessories',
  flywheel: 'Flywheel and rotating assembly',
  timing: 'Timing marks and sprockets',
  valvetrain: 'Camshaft and valvetrain',
  head: 'Cylinder head and bolt order',
  plugs: 'Freeze and gallery plugs',
  bottom: 'Oil pan, pistons and crank',
  measure: 'Measure and inspect',
  clean: 'Clean and inspect parts',
  small: 'Small-engine flywheel and fins',
  two: 'Two-stroke crankcase and seals',
  rotary: 'Rotary rotor and housing',
  general: 'Engine assembly'
};

const ART_RULES = [
  [/pressure-test|crankcase seal/i, 'two'],
  [/rotor|eccentric|rotor housing|housing stack/i, 'rotary'],
  [/bag|store|workspace|bench/i, 'workspace'],
  [/drain|fluid|fuel tank|fuel system|oil on a four-stroke|drain the fuel/i, 'fluids'],
  [/battery|wiring|harness|connector|spark plug|glow plug|coil|ignition|distributor|sensor|electrical/i, 'electrical'],
  [/mount.*stand|engine stand/i, 'stand'],
  [/recoil|blower|shroud|cooling fins|trimmer head|remove the cylinder(?! head)|governor/i, 'small'],
  [/carburetor|air cleaner|air intake|throttle|intake boot/i, 'intake'],
  [/fuel rail|injector|fuel pump|fuel line|cap fuel/i, 'fuel'],
  [/exhaust|muffler|heat shield|turbo|supercharger/i, 'exhaust'],
  [/harmonic|balancer|clutch|flexplate|flywheel|front cover/i, 'flywheel'],
  [/belt|accessor|pulley|water pump|thermostat/i, 'belt'],
  [/tdc|timing|chain|gear|sprocket|mark the housing/i, 'timing'],
  [/valve cover|rocker|pushrod|cam|follower|bucket|lifter|valvetrain|valve spring|service the valves|valves and inspect/i, 'valvetrain'],
  [/head gasket|cylinder head|remove the heads|inspect the heads|deck/i, 'head'],
  [/freeze plug|galley|core plug/i, 'plugs'],
  [/oil pan|sump|crankcase|oil pump|pickup|oil filter|cooler|dipstick|ridge|bore|piston|rod|crank|main cap|bearing/i, 'bottom'],
  [/clean|inspect|crack|measure|micrometer|machine|parts|order|plan/i, 'measure'],
  [/photograph|photo|label|document|mark the|log what|identify the engine/i, 'photo']
];

const ENGINE_STEP_PHOTOS = {};

function engineFamily(e) {
  if (e.flags?.has('2s')) return 'two-stroke';
  if (e.flags?.has('sm')) return 'small';
  if (e.flags?.has('rotary') || e.cfg === 'R2') return 'rotary';
  if (/^[VH]/.test(e.cfg)) return e.cfg[0] === 'V' ? 'v' : 'flat';
  return 'inline';
}

function stepArt(s, e) {
  const title = s.t.toLowerCase(), text = (s.t + ' ' + s.d).toLowerCase();
  if (/^(photograph everything|identify the engine|log what)/.test(title)) return 'photo';
  for (const [re, key] of ART_RULES) if (re.test(text)) return key;
  return 'general';
}

function stepVisual(s, e, i) {
  const id = e.id + '|' + i, title = e.id + '|' + s.t, family = 'family:' + engineFamily(e) + '|' + s.t;
  const override = ENGINE_STEP_PHOTOS[id] || ENGINE_STEP_PHOTOS[title] || ENGINE_STEP_PHOTOS[family] || null;
  const key = stepArt(s, e), src = override || STEP_IMAGES[key];
  const attr = v => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  return `<figure class="stepart"><img src="${attr(src)}" alt="${attr(s.t)}" loading="lazy" decoding="async"><figcaption>${esc(STEP_IMAGE_LABELS[key])} · generic reference image · <a href="/credits.html" target="_blank" rel="noopener">credits</a> · verify against your exact engine</figcaption></figure>`;
}
