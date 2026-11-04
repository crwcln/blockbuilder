const ART = (label, body, accent = '') => `<svg viewBox="0 0 320 150" role="img" aria-label="${label}"><rect width="320" height="150" rx="12" fill="#15181c"/><g fill="none" stroke="#9aa4af" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${body}</g>${accent ? `<g fill="none" stroke="#ffa238" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${accent}</g>` : ''}</svg>`;

const STEP_ART = {
  photo: ART('Camera and engine block',
    '<path d="M18 46V24h22M84 24h22v22M106 104v22H84M46 126H24v-22"/><rect x="58" y="52" width="74" height="56" rx="6"/><path d="M58 64H44v32h14M132 64h14v32h-14M72 52V40h46v12"/><circle cx="95" cy="80" r="12"/>',
    '<path d="M260 44l-12 22h14l-8 18 24-28h-14l10-12z"/>'),
  workspace: ART('Bench with labeled parts',
    '<path d="M24 116h272M64 84h72v24H64zM64 96h72M168 66h26v46h-26zM206 76h26v36h-26z"/><path d="M248 64l8 8-18 34-11 3 3-11z"/>',
    '<path d="M76 72h18M82 66v12M218 68v10"/>'),
  fluids: ART('Draining fluids into a pan',
    '<rect x="96" y="34" width="82" height="50" rx="5"/><path d="M192 70h30v20h-30zM112 104h120l16 30H96zM142 88c0 8-6 12-6 18a6 6 0 0 0 12 0c0-6-6-10-6-18zM164 92c0 6-5 9-5 14a5 5 0 0 0 10 0c0-5-5-8-5-14z"/>',
    '<path d="M188 78h18"/>'),
  electrical: ART('Battery, ignition and wiring',
    '<rect x="64" y="64" width="70" height="50" rx="4"/><path d="M82 52v12M116 52v12M78 78h16M102 78h16M86 88h16M94 82v12M134 88h44"/><rect x="188" y="48" width="16" height="26" rx="3"/><path d="M196 74v34M186 108h20M192 116v12M204 116v12"/>',
    '<path d="M246 48l-16 28h14l-6 22 24-34h-14l10-16z"/>'),
  stand: ART('Engine mounted on a stand',
    '<rect x="112" y="38" width="84" height="50" rx="5"/><path d="M196 54h18v18h-18zM214 60h18v54h-18zM222 114l-56 22M222 114l56 22M174 136h96"/>',
    '<rect x="200" y="58" width="10" height="10" rx="2"/>'),
  intake: ART('Air intake and throttle body',
    '<rect x="44" y="58" width="58" height="48" rx="5"/><rect x="56" y="70" width="34" height="24" rx="3"/><path d="M102 82h54M156 82c26 0 26-24 52-24"/><rect x="208" y="42" width="46" height="44" rx="5"/><rect x="224" y="54" width="14" height="20" rx="3"/>',
    '<path d="M68 120h50M110 114l8 6-8 6M204 110h50M246 104l8 6-8 6"/>'),
  fuel: ART('Fuel rail and injectors',
    '<rect x="52" y="62" width="210" height="18" rx="4"/><path d="M78 80v34M122 80v34M166 80v34M210 80v34"/><rect x="70" y="114" width="16" height="10" rx="2"/><rect x="114" y="114" width="16" height="10" rx="2"/><rect x="158" y="114" width="16" height="10" rx="2"/><rect x="202" y="114" width="16" height="10" rx="2"/><path d="M52 54c-18 0-18 40 0 40"/>',
    '<path d="M78 128l-6 8M78 128l6 8M122 128l-6 8M122 128l6 8"/>'),
  exhaust: ART('Exhaust manifold and pipe',
    '<rect x="62" y="44" width="18" height="64" rx="3"/><path d="M80 52c48 0 48 48 92 48M80 70h54M80 94h54"/><rect x="172" y="84" width="46" height="24" rx="4"/><path d="M218 96h54"/>',
    '<path d="M244 54c8 8-8 16 0 24M260 54c8 8-8 16 0 24"/>'),
  belt: ART('Accessory belt and pulleys',
    '<circle cx="86" cy="84" r="26"/><circle cx="184" cy="58" r="18"/><circle cx="236" cy="96" r="22"/><path d="M68 64l98-18 50 28-12 34-106 8z"/><path d="M166 102v18"/>',
    '<path d="M176 96l18 6-6 16M188 108l-6-6"/>'),
  flywheel: ART('Flywheel and rotating assembly',
    '<circle cx="160" cy="80" r="48"/><circle cx="160" cy="80" r="10"/><circle cx="160" cy="44" r="5"/><circle cx="194" cy="56" r="5"/><circle cx="206" cy="90" r="5"/><circle cx="180" cy="118" r="5"/><circle cx="140" cy="118" r="5"/><circle cx="114" cy="90" r="5"/><circle cx="126" cy="56" r="5"/>',
    '<path d="M218 44a64 64 0 0 1 0 72M218 116l-11-10M218 116l11-10"/>'),
  timing: ART('Timing marks and sprockets',
    '<circle cx="94" cy="82" r="30"/><circle cx="226" cy="88" r="26"/><path d="M94 42v-12h132v32M94 122h80"/><path d="M94 66v10M226 76v10"/>',
    '<path d="M94 54l-8 8M94 54l8 8M226 70l-8 8M226 70l8 8"/>'),
  valvetrain: ART('Camshaft, rocker and valve spring',
    '<path d="M64 92h74"/><ellipse cx="96" cy="82" rx="13" ry="18"/><ellipse cx="132" cy="86" rx="11" ry="16"/><path d="M150 58l52 24M202 82v26M224 58v46M214 68h20M214 78h20M214 88h20M214 100h20M224 104v20M214 124h20"/>',
    '<path d="M166 76l12 6"/>'),
  head: ART('Cylinder head and head bolts',
    '<rect x="58" y="46" width="204" height="58" rx="6"/><circle cx="92" cy="70" r="14"/><circle cx="140" cy="70" r="14"/><circle cx="188" cy="70" r="14"/><circle cx="236" cy="70" r="14"/>',
    '<circle cx="72" cy="38" r="5"/><circle cx="118" cy="38" r="5"/><circle cx="164" cy="38" r="5"/><circle cx="210" cy="38" r="5"/><circle cx="248" cy="38" r="5"/><circle cx="72" cy="112" r="5"/><circle cx="118" cy="112" r="5"/><circle cx="164" cy="112" r="5"/><circle cx="210" cy="112" r="5"/><circle cx="248" cy="112" r="5"/>'),
  bottom: ART('Oil pan, piston, rod and crank',
    '<path d="M54 86h212l-18 34H72zM108 74h104M126 74l-14 34M174 74l14 34"/><rect x="142" y="34" width="36" height="24" rx="4"/>',
    '<path d="M244 100h14v14h-14z"/>'),
  plugs: ART('Freeze plugs and gallery plugs',
    '<rect x="64" y="44" width="192" height="66" rx="8"/><circle cx="100" cy="78" r="14"/><circle cx="148" cy="78" r="14"/><circle cx="196" cy="78" r="14"/><circle cx="244" cy="78" r="10"/><path d="M100 64v-8M148 64v-8M196 64v-8"/>',
    '<path d="M76 126h72M148 120l8 6-8 6"/>'),
  measure: ART('Measuring with a micrometer',
    '<rect x="64" y="76" width="96" height="28" rx="4"/><path d="M160 84h30v12h-30zM190 80h24v20h-24zM214 90h32"/><path d="M88 96v8M104 96v8M120 96v8M136 96v8"/>',
    '<path d="M104 62l12 6M110 58l6 12"/>'),
  clean: ART('Cleaning and inspecting parts',
    '<rect x="48" y="82" width="120" height="40" rx="5"/><path d="M48 96h120M192 52l22 26M206 44l18 18M184 70l16 16"/>',
    '<path d="M252 58l4 10 10 4-10 4-4 10-4-10-10-4 10-4zM278 92l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'),
  small: ART('Small-engine flywheel and cooling fins',
    '<circle cx="138" cy="74" r="44"/><circle cx="138" cy="74" r="22"/><path d="M176 40h34M222 58h56M222 70h56M222 82h56M222 94h56"/>',
    '<rect x="154" y="68" width="10" height="10" rx="2"/><path d="M112 40l-8 8M112 40l8 8"/>'),
  two: ART('Two-stroke crankcase and seals',
    '<rect x="72" y="50" width="176" height="66" rx="8"/><path d="M72 84h176M156 50v34"/><rect x="130" y="20" width="52" height="30" rx="4"/><circle cx="96" cy="66" r="12"/><circle cx="224" cy="66" r="12"/>',
    '<path d="M252 34a18 18 0 1 1-16 26M252 34v12h-12"/>'),
  rotary: ART('Rotary rotor and housing',
    '<path d="M56 46c40-24 168-24 208 0v58c-40 24-168 24-208 0z"/><path d="M160 56l28 48h-56z"/><circle cx="160" cy="84" r="8"/>',
    '<path d="M160 56l-10 8M188 104l-10-8M132 104l10-8"/>'),
  general: ART('Engine block and rotating parts',
    '<rect x="92" y="40" width="136" height="70" rx="6"/><rect x="112" y="54" width="24" height="24" rx="4"/><rect x="148" y="54" width="24" height="24" rx="4"/><rect x="184" y="54" width="24" height="24" rx="4"/><path d="M112 100h96"/>',
    '<circle cx="250" cy="56" r="7"/>')
};

const ART_TITLE = {
  photo: 'Photograph and label first', workspace: 'Bench and labeled parts', fluids: 'Drain and catch the fluids', electrical: 'Battery, ignition and wiring', stand: 'Rated engine stand', intake: 'Air intake and throttle body', fuel: 'Fuel rail and injectors', exhaust: 'Exhaust and heat shields', belt: 'Belt routing and accessories', flywheel: 'Flywheel and rotating assembly', timing: 'Timing marks and sprockets', valvetrain: 'Camshaft and valvetrain', head: 'Cylinder head and bolt order', plugs: 'Freeze and gallery plugs', bottom: 'Oil pan, pistons and crank', measure: 'Measure and inspect', clean: 'Clean and inspect parts', small: 'Small-engine flywheel and fins', two: 'Two-stroke crankcase and seals', rotary: 'Rotary rotor and housing', general: 'Engine assembly'
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
  const src = ENGINE_STEP_PHOTOS[id] || ENGINE_STEP_PHOTOS[title] || ENGINE_STEP_PHOTOS[family] || null;
  const attr = v => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  if (src) return `<figure class="stepart"><img src="${attr(src)}" alt="${attr(s.t)}" loading="lazy" decoding="async"><figcaption>Reference photo · verify against your exact engine</figcaption></figure>`;
  const key = stepArt(s, e);
  return `<figure class="stepart">${STEP_ART[key]}<figcaption>${ART_TITLE[key]} · illustration, verify in the factory manual</figcaption></figure>`;
}
