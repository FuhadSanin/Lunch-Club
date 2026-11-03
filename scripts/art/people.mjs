// Parts shared by the people in every scene, drawn facing right in a standing person's frame (feet on
// y = 0, the head around y = -520): the head with its eyes and mouth, the neck, a sneaker.

import { INK, WHITE, p, ln } from './style.mjs';

export const neck = (skin) => p('M -8 -494 L -10 -460 L 14 -460 L 12 -494 Z', skin);

export function face(skin, eye = 'calm', mouth = 'smile') {
  const eyes = {
    calm: 'M 15 -533 Q 20 -529 26 -533',
    down: 'M 16 -527 Q 21 -523 26 -526',
    up: 'M 16 -538 Q 21 -542 26 -538',
  };
  const mouths = {
    smile: 'M 21 -507 Q 26 -503 31 -507',
    grin: 'M 20 -509 Q 27 -499 34 -509',
    flat: 'M 22 -506 L 30 -506',
  };
  return (
    p('M -24 -548 C -26 -574 26 -580 32 -550 L 34 -534 L 42 -521 L 34 -516 C 35 -506 33 -498 24 -494 C 12 -488 -12 -490 -20 -504 C -26 -514 -26 -534 -24 -548 Z', skin) +
    p('M -6 -537 C -20 -543 -22 -515 -6 -518 Z', skin, 2.6) +
    ln(eyes[eye], INK, 2.6) +
    ln(mouths[mouth], INK, 2.6)
  );
}

export const sneaker = (x, fill = WHITE) =>
  p(`M ${x - 26} -32 L ${x + 2} -32 C ${x + 14} -30 ${x + 24} -20 ${x + 26} -10 L ${x + 26} -2 L ${x - 26} -2 Z`, fill) +
  ln(`M ${x - 26} -11 L ${x + 26} -11`);

