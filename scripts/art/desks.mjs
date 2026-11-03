// Draws the landing page's hero illustration as SVG, in the monochrome print style: eight colleagues
// on stools at one long desk, each at an open laptop, eyes closed or drifting up, dreaming of lunch.
// The thought bubbles are the ones lunch-line.mjs draws (public/illustrations/thoughts/), placed over
// this scene by src/landing/Tastes.tsx; the heads sit exactly where the lunch line's did, so the same
// bubble positions work.
//
//   node scripts/art/desks.mjs          writes scripts/art/out/desks.svg
//   node scripts/art/desks.mjs --png    also rasterises it into public/illustrations/desks.png with Chrome

import { INK, GREY, WHITE, p, ln, c, e, g, bone, clipped, svgDoc, writeSvg, rasterise } from './style.mjs';
import { face, neck, sneaker } from './people.mjs';

// ---------- a seated person, facing right, with the desk top on y = 0 ----------

// The standing parts (face, hair, collars) are drawn in the standing frame and lifted onto the stool.
const LIFT = 335;
const up = (...parts) => g(0, LIFT, parts.join(''));

const TORSO = 'M -38 -123 C -46 -95 -48 -40 -46 92 L 42 92 C 44 -40 44 -95 38 -121 C 18 -133 -18 -135 -38 -123 Z';

// A sleeve or trouser leg: a thick ink stroke with the cloth inside it.
const tube = (d, fill, w = 26) => ln(d, INK, w) + ln(d, fill, w - 4.4);

function stoolAndLegs(pants, shoe = WHITE) {
  return [
    p('M -56 108 L 26 108 L 26 120 L -56 120 Z', GREY),
    bone('M -16 120 L -16 232', 8),
    ln('M -46 236 L 14 236', INK, 6),
    tube('M 64 96 L 60 214', pants, 30),
    g(0, 242, sneaker(68, shoe)),
    tube('M -14 86 L 64 96', pants, 34),
  ].join('');
}

// An open laptop on the desk, seen from the side: keyboard towards the person, the lid tipped back.
const laptop = () =>
  p('M 36 -8 L 106 -8 L 106 0 L 36 0 Z', INK) +
  p('M 96 -7 L 108 -7 L 128 -104 L 116 -106 Z', GREY) +
  `<circle cx="114" cy="-58" r="3.2" fill="${WHITE}"/>`;

// What the near arm is doing.
const ARMS = {
  type: (sleeve, skin) => tube('M 4 -106 L 12 -34 L 54 -16', sleeve) + e(60, -14, 10, 7, skin),
  chin: (sleeve, skin) => tube('M 4 -106 L 30 -8 L 36 -144', sleeve) + e(34, -154, 11, 9, skin),
  mug: (sleeve, skin) =>
    tube('M 4 -106 L 14 -30 L 44 -118', sleeve) +
    p('M 46 -150 L 72 -150 L 70 -112 C 68 -108 50 -108 48 -112 Z', WHITE) +
    ln('M 70 -144 C 80 -144 80 -122 70 -124') +
    ln('M 54 -158 C 50 -166 58 -172 54 -182 M 64 -158 C 60 -166 68 -172 64 -182', INK, 2.4) +
    e(48, -124, 9, 8, skin),
};

// One person: what's behind them, legs and stool, body, what's on the body, head, laptop, arm.
function seated({ skin, top, pants, shoe, sleeve = top, arm = 'type', back = '', pattern = '', decor = '', head }) {
  return [
    back,
    stoolAndLegs(pants, shoe),
    p(TORSO, top),
    pattern && clipped(TORSO, pattern),
    up(neck(skin)),
    decor,
    head,
    laptop(),
    ARMS[arm](sleeve, skin),
  ].join('');
}

const diamonds = () => {
  const d = [];
  for (let y = -116, row = 0; y < 92; y += 17, row++)
    for (let x = -56 + (row % 2) * 8; x < 52; x += 16) d.push(`M ${x} ${y - 3.2} L ${x + 3.2} ${y} L ${x} ${y + 3.2} L ${x - 3.2} ${y} Z`);
  return `<path d="${d.join(' ')}" fill="${GREY}"/>`;
};
const stripes = () => ln(Array.from({ length: 12 }, (_, i) => `M ${-52 + i * 9} -140 L ${-52 + i * 9} 100`).join(' '), INK, 1.7);

const PEOPLE = [
  // 1. Hoodie, glasses, curly hair.
  () => seated({
    skin: GREY, top: GREY, pants: INK,
    back: up(p('M -38 -456 C -62 -470 -54 -510 -22 -506 L -4 -470 Z', GREY)),
    decor: up(ln('M 16 -462 L 18 -420', INK, 2.4), ln('M 26 -460 L 28 -426', INK, 2.4)),
    head: up(
      face(GREY, 'calm', 'smile'),
      c(22, -530, 9, 'none', 2.4),
      ln('M 13 -532 L -4 -535', INK, 2.2),
      [[-22, -552, 13], [-9, -566, 14], [7, -572, 13], [21, -567, 11], [30, -557, 7], [-28, -536, 11], [-24, -521, 8]].map(([x, y, r]) => c(x, y, r, INK)).join(''),
    ),
  }),
  // 2. Kurta with a dupatta, long braid.
  () => seated({
    skin: WHITE, top: WHITE, pants: INK, shoe: INK,
    pattern: diamonds(),
    decor: up(p('M -2 -462 L 8 -438 L 18 -462 Z', WHITE, 2.6), p('M 14 -466 C -6 -420 -34 -330 -58 -250 L -44 -244 C -22 -320 6 -410 30 -462 Z', GREY)),
    head: up(
      [[-25, -518], [-28, -499], [-30, -480], [-31, -461], [-32, -443], [-32, -426]].map(([x, y], i) => e(x, y, 8 - i * 0.4, 11, INK)).join(''),
      face(WHITE, 'calm', 'smile'),
      p('M -26 -536 C -30 -580 30 -586 34 -552 C 22 -566 2 -566 -8 -556 C -16 -548 -20 -540 -26 -528 Z', INK),
      c(-8, -511, 3.2, GREY, 2),
    ),
  }),
  // 3. Pinstripe shirt, beard, chin in hand: miles away.
  () => seated({
    skin: GREY, top: WHITE, sleeve: WHITE, pants: GREY, shoe: INK, arm: 'chin',
    pattern: stripes(),
    decor: up(p('M -6 -466 L 6 -446 L 16 -466 Z', WHITE, 2.6), ln('M 10 -446 L 14 -340', INK, 2.2)),
    head: up(
      face(GREY, 'up', 'smile'),
      p('M -26 -540 C -32 -586 30 -596 42 -560 C 30 -566 18 -566 8 -560 C 0 -556 -10 -552 -16 -538 Z', INK),
      p('M -16 -516 C -14 -496 4 -484 22 -490 C 30 -492 34 -500 34 -512 L 26 -508 C 18 -500 4 -502 -6 -514 Z', INK),
      ln('M 22 -515 q 8 -5 15 1', INK, 4),
      ln('M 14 -546 Q 21 -551 28 -547', INK, 2.4),
    ),
  }),
  // 4. Turtleneck, coffee halfway to the lips.
  () => seated({
    skin: WHITE, top: INK, pants: WHITE, shoe: INK, arm: 'mug',
    decor: up(p('M -12 -464 L -12 -492 L 16 -492 L 16 -464 Z', INK), ln('M -12 -478 L 16 -478', WHITE, 1.8)),
    head: up(
      face(WHITE, 'calm', 'smile'),
      p('M -24 -536 C -30 -582 32 -588 36 -552 C 30 -560 16 -560 8 -556 L 2 -546 L -6 -554 C -12 -550 -16 -544 -18 -534 Z', GREY),
      c(-8, -509, 3.4, INK, 2),
    ),
  }),
  // 5. Headscarf, long tunic.
  () => seated({
    skin: WHITE, top: WHITE, pants: INK, shoe: GREY,
    decor: ln('M -46 70 L 42 70') + ln('M -46 80 L 42 80'),
    head: up(
      p('M -34 -540 C -36 -594 42 -598 44 -548 L 44 -510 C 44 -486 32 -472 22 -464 C 32 -458 42 -442 40 -420 C 12 -410 -30 -414 -46 -430 C -52 -462 -46 -512 -34 -540 Z', GREY),
      p('M 0 -556 C 18 -564 32 -556 34 -544 L 35 -532 L 42 -521 L 35 -516 C 36 -506 33 -498 24 -494 C 14 -490 4 -492 -2 -500 C -6 -512 -6 -544 0 -556 Z', WHITE),
      ln('M 15 -533 Q 20 -529 26 -533', INK, 2.6),
      ln('M 21 -507 Q 26 -503 31 -507', INK, 2.6),
      ln('M -2 -562 C -10 -540 -10 -505 -2 -490'),
      ln('M -30 -470 C -10 -462 10 -462 24 -470', INK, 2.4),
      ln('M -40 -444 C -20 -436 10 -436 30 -444', INK, 2.4),
    ),
  }),
  // 6. Cap on backwards, T-shirt, grinning.
  () => seated({
    skin: GREY, top: WHITE, pants: GREY,
    decor: up(ln('M -10 -466 C -2 -456 10 -456 16 -466', INK, 2.6), p('M 14 -420 L 30 -420 L 30 -400 L 14 -400 Z', WHITE, 2.4)),
    head: up(
      face(GREY, 'calm', 'grin'),
      p('M -26 -548 C -26 -586 32 -590 36 -552 Z', INK),
      p('M -26 -557 L -50 -550 L -48 -541 L -24 -546 Z', INK),
      ln('M -14 -572 C -4 -578 10 -578 20 -572', WHITE, 1.8),
    ),
  }),
  // 7. Sweater vest, tie, reading glasses, eyes drifting up to the thought.
  () => seated({
    skin: WHITE, top: WHITE, sleeve: WHITE, pants: INK, shoe: INK,
    decor: up(
      p('M -36 -448 C -44 -410 -46 -360 -44 -318 L 40 -318 C 42 -360 42 -410 34 -444 L 16 -404 L 4 -446 Z', GREY),
      p('M 6 -456 L 12 -456 L 15 -404 L 10 -396 L 4 -404 Z', INK),
      ln('M -44 -334 L 40 -334', INK, 2.4),
    ),
    head: up(
      face(WHITE, 'up', 'smile'),
      p('M -24 -532 C -30 -568 -10 -584 12 -580 C -6 -572 -14 -560 -16 -540 Z', GREY),
      p('M 21 -514 q 9 -5 17 2 q -9 4 -17 -2 Z', GREY, 2.2),
      p('M 15 -540 L 31 -540 L 31 -529 L 15 -529 Z', 'none', 2.4),
      ln('M 15 -535 L -4 -537', INK, 2.2),
    ),
  }),
  // 8. Blazer, high ponytail, the team's tiffin waiting beside her.
  () => seated({
    skin: GREY, top: GREY, pants: INK,
    back: up(p('M -20 -572 C -52 -580 -62 -540 -54 -500 C -52 -486 -46 -480 -42 -484 C -48 -520 -42 -556 -18 -562 Z', INK)),
    decor: up(p('M 0 -462 L 16 -412 L 22 -462 Z', WHITE, 2.6), ln('M 0 -462 L 16 -412 L 10 -360', INK, 2.6), c(14, -346, 3, INK, 1.6), c(15, -324, 3, INK, 1.6)),
    head: up(
      face(GREY, 'calm', 'smile'),
      p('M -26 -536 C -30 -584 32 -588 36 -552 C 24 -566 4 -566 -8 -556 C -14 -550 -20 -544 -26 -534 Z', INK),
      p('M -24 -566 L -14 -574 L -10 -564 Z', GREY, 2),
    ),
  }),
];

// ---------- the scene ----------

export const SCENE = { width: 1600, height: 740, desk: 475 };
export const XS = [100, 280, 460, 640, 820, 1000, 1180, 1360];
// Which bubbles sit on the higher row.
export const TIERS = [1, 0, 1, 0, 1, 0, 1, 0];

// The trail of little bubbles from each head up to its thought.
function trails() {
  return XS.map((x, i) => {
    const dots = TIERS[i]
      ? [[x + 20, 238, 5], [x + 28, 214, 7], [x + 37, 188, 8.5], [x + 44, 160, 10]]
      : [[x + 20, 238, 5], [x + 30, 216, 8]];
    return dots.map(([cx, cy, r]) => c(cx, cy, r, WHITE, 2.8)).join('');
  }).join('');
}

// The team's tiffin on the desk, with its order ticket.
function tiffin(x, base) {
  const w = 74, h = 30;
  const tiers = [0, 1, 2].map((k) => {
    const y = base - (k + 1) * h - k * 5;
    return p(`M ${x - w / 2} ${y} L ${x + w / 2} ${y} L ${x + w / 2} ${y + h - 6} Q ${x + w / 2} ${y + h} ${x + w / 2 - 6} ${y + h} L ${x - w / 2 + 6} ${y + h} Q ${x - w / 2} ${y + h} ${x - w / 2} ${y + h - 6} Z`, INK) +
      ln(`M ${x - w / 2 + 5} ${y + 7} L ${x + w / 2 - 5} ${y + 7}`, WHITE, 2.2);
  });
  const top = base - 3 * h - 2 * 5;
  return [
    ln(`M ${x - w / 2 - 7} ${base - 24} L ${x - w / 2 - 7} ${top - 40} L ${x + w / 2 + 7} ${top - 40} L ${x + w / 2 + 7} ${base - 24}`, INK, 6),
    ...tiers,
    p(`M ${x - w / 2 - 2} ${top} C ${x - w / 2} ${top - 26} ${x + w / 2} ${top - 26} ${x + w / 2 + 2} ${top} Z`, GREY),
    c(x, top - 22, 6, INK, 2.4),
    ln(`M ${x + w / 2 + 7} ${top - 30} C ${x + w / 2 + 20} ${top - 22} ${x + w / 2 + 22} ${top - 6} ${x + w / 2 + 18} ${top + 6}`, INK, 2),
    p(`M ${x + w / 2 + 8} ${top + 6} L ${x + w / 2 + 30} ${top + 4} L ${x + w / 2 + 32} ${top + 40} L ${x + w / 2 + 10} ${top + 42} Z`, WHITE, 2.6),
    ln(`M ${x + w / 2 + 13} ${top + 15} L ${x + w / 2 + 27} ${top + 14} M ${x + w / 2 + 13} ${top + 23} L ${x + w / 2 + 25} ${top + 22} M ${x + w / 2 + 13} ${top + 31} L ${x + w / 2 + 27} ${top + 30}`, INK, 1.8),
  ].join('');
}

function desks() {
  const Y = SCENE.desk;
  const desk = p(`M 16 ${Y} L 1584 ${Y} L 1584 ${Y + 14} L 16 ${Y + 14} Z`, WHITE) + bone(`M 40 ${Y + 14} L 40 ${Y + 240}`, 10) + bone(`M 1560 ${Y + 14} L 1560 ${Y + 240}`, 10);
  const people = PEOPLE.map((draw, i) => g(XS[i], Y, draw())).join('');
  return svgDoc(SCENE.width, SCENE.height, desk + trails() + people + tiffin(1522, Y));
}

// ---------- write and rasterise ----------

const svg = writeSvg('desks.svg', desks());
console.log('wrote desks.svg');
if (process.argv.includes('--png')) rasterise([{ svg, png: 'desks.png', w: SCENE.width, h: SCENE.height, scale: 1.5 }]);
