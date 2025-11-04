// Utility to generate random Pokémon-like creatures with SVG images, evolutions, and details

const TYPES = [
  'Fire','Water','Grass','Electric','Psychic','Ice','Dragon','Dark','Fairy','Fighting','Flying','Poison','Ground','Rock','Bug','Ghost','Steel','Normal'
];

const COLORS = {
  Fire: ['#FF6B6B','#FA5252','#F03E3E'],
  Water: ['#4DABF7','#339AF0','#228BE6'],
  Grass: ['#69DB7C','#51CF66','#40C057'],
  Electric: ['#FFD43B','#FCC419','#FAB005'],
  Psychic: ['#DA77F2','#BE4BDB','#AE3EC9'],
  Ice: ['#74C0FC','#66D9E8','#3BC9DB'],
  Dragon: ['#9775FA','#845EF7','#5C7CFA'],
  Dark: ['#495057','#343A40','#212529'],
  Fairy: ['#F783AC','#F06595','#E64980'],
  Fighting: ['#FF922B','#F76707','#E8590C'],
  Flying: ['#91A7FF','#74C0FC','#A5D8FF'],
  Poison: ['#B197FC','#845EF7','#7950F2'],
  Ground: ['#E5993E','#D9480F','#B08968'],
  Rock: ['#868E96','#ADB5BD','#868E96'],
  Bug: ['#A9E34B','#94D82D','#82C91E'],
  Ghost: ['#748FFC','#5C7CFA','#4263EB'],
  Steel: ['#CED4DA','#ADB5BD','#868E96'],
  Normal: ['#DEE2E6','#CED4DA','#ADB5BD'],
};

const SYLLABLES = ['ka','zu','mi','ra','lo','fi','ny','to','shi','go','chi','fu','qu','za','ryu','chi','no','ra','vu','gha','mo','ri','po','ne','ku','xa','ya','bo','ti','lu'];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sample(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function pickTypes() {
  const first = sample(TYPES);
  // 35% chance of dual type different from first
  if (Math.random() < 0.35) {
    let second;
    do { second = sample(TYPES); } while (second === first);
    return [first, second];
  }
  return [first];
}

function generateName(base = '') {
  const parts = randInt(2, 3);
  let name = base || '';
  for (let i = 0; i < parts; i++) name += sample(SYLLABLES);
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function generateAbilities(types) {
  const pool = [
    'Overgrow','Blaze','Torrent','Static','Intimidate','Swift Swim','Chlorophyll','Keen Eye','Levitate','Technician','Sheer Force','Magic Guard','Inner Focus','Infiltrator','Compound Eyes','Adaptability','Pressure','Iron Fist','Flame Body','Water Absorb','Volt Absorb','Natural Cure','Regenerator','Moxie'
  ];
  const abilities = new Set();
  while (abilities.size < randInt(1, 2)) abilities.add(sample(pool));
  return Array.from(abilities);
}

function statBlock(tier = 'mid') {
  const ranges = {
    low: [20, 75],
    mid: [50, 95],
    high: [70, 130],
    legendary: [90, 160],
  };
  const [lo, hi] = ranges[tier] || ranges.mid;
  const mk = () => randInt(lo, hi);
  const stats = { hp: mk(), atk: mk(), def: mk(), spa: mk(), spd: mk(), spe: mk() };
  stats.total = Object.values(stats).reduce((a,b)=>a+b,0);
  return stats;
}

function tierFromStage(stage) {
  if (stage === 1) return 'low';
  if (stage === 2) return 'mid';
  return Math.random() < 0.1 ? 'legendary' : 'high';
}

function svgCreature(primary, secondary = null) {
  const [c1, c2, c3] = COLORS[primary] || ['#888','#666','#444'];
  const sc = secondary ? (COLORS[secondary] || COLORS[primary]) : [c2,c3,c1];
  const size = 256;
  const shapes = [];
  // Body
  const bodyRx = randInt(90, 110);
  const bodyRy = randInt(80, 100);
  shapes.push(`<ellipse cx="128" cy="128" rx="${bodyRx}" ry="${bodyRy}" fill="${c1}" />`);
  // Belly patch
  shapes.push(`<ellipse cx="128" cy="150" rx="${Math.floor(bodyRx*0.55)}" ry="${Math.floor(bodyRy*0.55)}" fill="${c2}" opacity="0.6" />`);
  // Eyes
  const eyeY = randInt(90, 110);
  shapes.push(`<circle cx="95" cy="${eyeY}" r="10" fill="#111" />`);
  shapes.push(`<circle cx="161" cy="${eyeY}" r="10" fill="#111" />`);
  // Pupils
  shapes.push(`<circle cx="92" cy="${eyeY-2}" r="3" fill="#fff" />`);
  shapes.push(`<circle cx="158" cy="${eyeY-2}" r="3" fill="#fff" />`);
  // Ears/Horns
  if (Math.random() < 0.5) {
    shapes.push(`<polygon points="60,70 90,90 80,40" fill="${sc[0]}" />`);
    shapes.push(`<polygon points="196,70 166,90 176,40" fill="${sc[1]}" />`);
  } else {
    shapes.push(`<rect x="70" y="60" width="16" height="40" fill="${sc[0]}" rx="8" />`);
    shapes.push(`<rect x="170" y="60" width="16" height="40" fill="${sc[1]}" rx="8" />`);
  }
  // Spots/stripes
  for (let i=0;i<randInt(2,5);i++) {
    const x = randInt(70, 186);
    const y = randInt(110, 190);
    const r = randInt(6, 16);
    shapes.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${sc[2]}" opacity="0.5" />`);
  }
  // Tail
  shapes.push(`<path d="M 215 150 C 240 120, 250 180, 230 200" stroke="${sc[0]}" stroke-width="10" fill="none" stroke-linecap="round" />`);
  // Simple mouth
  shapes.push(`<path d="M 110 ${eyeY+20} Q 128 ${eyeY+35}, 146 ${eyeY+20}" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" />`);

  return `<?xml version='1.0' encoding='UTF-8'?>\n<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><rect width='100%' height='100%' fill='transparent'/>${shapes.join('')}</svg>`;
}

function generateEvolutionChain(baseName) {
  const stages = randInt(1,3); // 1 to 3 stages
  const chain = [];
  for (let i=1;i<=stages;i++) {
    const name = i===1 ? generateName(baseName) : generateName();
    const tier = tierFromStage(i);
    const stats = statBlock(tier);
    const level = i===1 ? 1 : randInt(14, 36) + (i-2)*10;
    chain.push({ stage: i, name, level, stats });
  }
  return chain;
}

export function generatePokemon(id) {
  const types = pickTypes();
  const abilities = generateAbilities(types);
  const baseName = '';
  const chain = generateEvolutionChain(baseName);
  const primary = types[0];
  const secondary = types[1] || null;
  const svg = svgCreature(primary, secondary);
  const image = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const height = randInt(3, 25) / 10; // in meters
  const weight = randInt(20, 900) / 10; // in kg
  const habitat = sample(['Forest','Cave','Mountain','Sea','River','Urban','Desert','Tundra','Sky','Swamp']);
  const flavor = `${chain[0].name} is often found in the ${habitat.toLowerCase()} where it ${sample(['stores electricity','gathers sunlight','hides among rocks','glides silently','plays with bubbles','camouflages itself'])}.`;
  return {
    id,
    name: chain[0].name,
    image,
    types,
    abilities,
    height,
    weight,
    habitat,
    flavor,
    evolutions: chain,
  };
}

export function generateMany(count, startId = 1) {
  const list = [];
  for (let i=0;i<count;i++) list.push(generatePokemon(startId + i));
  return list;
}
