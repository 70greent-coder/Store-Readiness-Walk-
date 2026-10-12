// Los Primos Tienda y Taqueria — logo concepts as SVG strings (1000x1000 viewBox).
// Rendered to PNG by render.js.

const C = {
  chile: '#A8352A',     // deep chile / terracotta
  cream: '#F5EBDC',
  agave: '#1E4636',     // deep agave green
  gold: '#E2A63B',      // marigold
  ink: '#2A1A14',
};

const fonts = `
<style>
  @font-face { font-family: 'Fraunces'; src: url('Fraunces.ttf'); font-weight: 100 900; font-style: normal; }
  @font-face { font-family: 'Archivo'; src: url('Archivo.ttf'); font-weight: 100 900; font-stretch: 62% 125%; }
  .serif { font-family: 'Fraunces'; font-variation-settings: 'SOFT' 100, 'WONK' 0, 'opsz' 144; }
  .sans  { font-family: 'Archivo'; font-stretch: 112%; }
</style>`;

// Small four-point star (cut-paper diamond), centered at x,y
const star = (x, y, r, fill) =>
  `<path d="M${x},${y - r} C${x + r * 0.18},${y - r * 0.18} ${x + r * 0.18},${y - r * 0.18} ${x + r},${y}
    C${x + r * 0.18},${y + r * 0.18} ${x + r * 0.18},${y + r * 0.18} ${x},${y + r}
    C${x - r * 0.18},${y + r * 0.18} ${x - r * 0.18},${y + r * 0.18} ${x - r},${y}
    C${x - r * 0.18},${y - r * 0.18} ${x - r * 0.18},${y - r * 0.18} ${x},${y - r}Z" fill="${fill}"/>`;

// ---------- 1. The Seal ----------
function seal() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">${fonts}
  <defs>
    <path id="top" d="M 112,500 A 388,388 0 0 1 888,500"/>
    <path id="bot" d="M 72,500 A 428,428 0 0 0 928,500"/>
  </defs>
  <rect width="1000" height="1000" fill="${C.cream}"/>
  <circle cx="500" cy="500" r="482" fill="${C.chile}"/>
  <circle cx="500" cy="500" r="466" fill="none" stroke="${C.cream}" stroke-width="2.5" opacity=".55"/>
  <circle cx="500" cy="500" r="352" fill="${C.cream}"/>
  <circle cx="500" cy="500" r="334" fill="none" stroke="${C.chile}" stroke-width="2.5"/>

  <text class="sans" font-size="56" font-weight="700" letter-spacing="22" fill="${C.cream}">
    <textPath href="#top" startOffset="50%" text-anchor="middle">TAQUERIA</textPath></text>
  <text class="sans" font-size="44" font-weight="600" letter-spacing="15" fill="${C.cream}">
    <textPath href="#bot" startOffset="50%" text-anchor="middle">TIENDA HISPANA</textPath></text>
  ${star(102, 500, 20, C.gold)}${star(898, 500, 20, C.gold)}

  <text class="serif" x="500" y="452" text-anchor="middle" font-size="96" font-style="italic"
        font-weight="400" fill="${C.chile}" style="font-variation-settings:'SOFT' 100,'WONK' 1,'opsz' 144">Los</text>
  <text class="serif" x="500" y="586" text-anchor="middle" font-size="150" font-weight="700"
        letter-spacing="-3" fill="${C.agave}">Primos</text>
  <line x1="372" y1="640" x2="460" y2="640" stroke="${C.gold}" stroke-width="4"/>
  ${star(500, 640, 14, C.chile)}
  <line x1="540" y1="640" x2="628" y2="640" stroke="${C.gold}" stroke-width="4"/>
  <text class="sans" x="500" y="712" text-anchor="middle" font-size="30" font-weight="600"
        letter-spacing="9" fill="${C.agave}">TIENDA Y TAQUERIA</text>
</svg>`;
}

// ---------- 2. The Monogram (best at tiny avatar sizes) ----------
function monogram() {
  // Two overlapping arches = two cousins, one family. They also read as a doorway/storefront.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">${fonts}
  <rect width="1000" height="1000" fill="${C.agave}"/>
  <circle cx="500" cy="500" r="440" fill="none" stroke="${C.gold}" stroke-width="3" opacity=".7"/>
  <g fill="none" stroke="${C.gold}" stroke-width="16" stroke-linecap="round">
    <path d="M 330,560 V 360 A 110,110 0 0 1 550,360 V 560"/>
    <path d="M 450,560 V 360 A 110,110 0 0 1 670,360 V 560"/>
  </g>
  <text class="serif" x="500" y="525" text-anchor="middle" font-size="210" font-weight="600"
        fill="${C.cream}" letter-spacing="-6">LP</text>
  <rect x="300" y="568" width="400" height="5" fill="${C.gold}"/>
  <text class="serif" x="500" y="690" text-anchor="middle" font-size="96" font-weight="600"
        letter-spacing="1" fill="${C.cream}">Los Primos</text>
  <text class="sans" x="500" y="756" text-anchor="middle" font-size="30" font-weight="600"
        letter-spacing="11" fill="${C.gold}">TIENDA · TAQUERIA</text>
</svg>`;
}

// ---------- 3. Papel Picado ----------
function picado() {
  // A row of cut-paper flags hung on a gentle curve, each with a simple geometric cut-out.
  const flags = [];
  const n = 7, x0 = 205, x1 = 795, w = 72, h = 98;
  const colors = [C.gold, C.cream, C.chile, C.gold, C.chile, C.cream, C.gold];
  const sag = (x) => 228 + 60 * (1 - Math.pow((x - 500) / 300, 2)); // string curve
  for (let i = 0; i < n; i++) {
    const cx = x0 + (i * (x1 - x0)) / (n - 1);
    const y = sag(cx);
    const ang = ((cx - 500) / 300) * -9; // tilt with the string
    const col = colors[i];
    const hole = col === C.cream ? C.agave : C.agave;
    // flag with zig-zag cut bottom
    const l = -w / 2, r = w / 2;
    const zig = [];
    const teeth = 4;
    for (let t = 0; t <= teeth; t++) {
      const px = l + (t * w) / teeth;
      zig.push(`${px},${h}`);
      if (t < teeth) zig.push(`${px + w / teeth / 2},${h - 14}`);
    }
    flags.push(`<g transform="translate(${cx},${y}) rotate(${ang})">
      <path d="M${l},0 H${r} V${h} ${zig.reverse().map(p => 'L' + p).join(' ')} Z" fill="${col}"/>
      ${star(0, 42, 17, hole)}
      <circle cx="${l + 12}" cy="14" r="3.5" fill="${hole}"/><circle cx="${r - 12}" cy="14" r="3.5" fill="${hole}"/>
    </g>`);
  }
  const string = `M 150,${sag(150) - 4} Q 500,${2 * sag(500) - (sag(150) + sag(850)) / 2 - 4} 850,${sag(850) - 4}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">${fonts}
  <rect width="1000" height="1000" fill="${C.agave}"/>
  <path d="${string}" fill="none" stroke="${C.cream}" stroke-width="3" opacity=".8"/>
  ${flags.join('\n')}
  <text class="serif" x="500" y="532" text-anchor="middle" font-size="84" font-style="italic" font-weight="400"
        fill="${C.gold}" style="font-variation-settings:'SOFT' 100,'WONK' 1,'opsz' 144">Los</text>
  <text class="serif" x="500" y="668" text-anchor="middle" font-size="168" font-weight="700"
        letter-spacing="-4" fill="${C.cream}">Primos</text>
  <text class="sans" x="500" y="746" text-anchor="middle" font-size="31" font-weight="600"
        letter-spacing="10" fill="${C.gold}">TIENDA Y TAQUERIA</text>
</svg>`;
}

// ---------- Cover photo (1640 x 624) to pair with the seal ----------
function cover() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1640 624" width="1640" height="624">${fonts}
  <rect width="1640" height="624" fill="${C.agave}"/>
  <g opacity=".10" fill="${C.cream}">
    ${Array.from({ length: 24 }, (_, i) => star(40 + i * 70, 40, 10, C.cream)).join('')}
    ${Array.from({ length: 24 }, (_, i) => star(75 + i * 70, 584, 10, C.cream)).join('')}
  </g>
  <text class="serif" x="820" y="270" text-anchor="middle" font-size="64" font-style="italic"
        fill="${C.gold}" style="font-variation-settings:'SOFT' 100,'WONK' 1,'opsz' 144">Los</text>
  <text class="serif" x="820" y="390" text-anchor="middle" font-size="140" font-weight="700"
        letter-spacing="-3" fill="${C.cream}">Primos</text>
  <text class="sans" x="820" y="452" text-anchor="middle" font-size="28" font-weight="600"
        letter-spacing="10" fill="${C.gold}">TIENDA HISPANA  ·  TAQUERIA</text>
  <text class="sans" x="820" y="500" text-anchor="middle" font-size="22" font-weight="400"
        letter-spacing="4" fill="${C.cream}" opacity=".8">Groceries  ·  Tacos</text>
</svg>`;
}

module.exports = { seal, monogram, picado, cover };
