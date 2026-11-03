# Tasks

Paths are the same in lunch-club-demo and lunch-board. Done in lunch-club-demo; to apply in
lunch-board, copy this change folder into lunch-board's `openspec/changes/` and clear the checkboxes.

## 1. Order and nav

- [x] 1.1 In `src/landing/Landing.tsx`, render Tastes → HowItRuns → ForHosts → Closing; verify by scrolling
- [x] 1.2 Render `<LiveDemo className="mt-16" />` inside `ForHosts` between the heading and the tile grid (grid `mt-5 md:mt-6`), give `LiveDemo` a `className` prop with no outer margins, `rounded-3xl` and `lg:h-[580px]`; update the section's intro line; verify the board and tiles read as one section and "Try the board" still scrolls to the board
- [x] 1.3 Remove `CartBand` from the page; nav links How it works (`#how`) · The board (`#hosts`); verify each link scrolls to its section

## 2. Spacing

- [x] 2.1 Hosts section `pt-32 md:pt-48`, tiles `mt-16 gap-5 md:gap-6`, tile padding `p-8 sm:p-10` and content `mt-10`; closing `pt-32 pb-32 sm:pt-56 sm:pb-40`; hero drawing `mt-12 sm:mt-20`; verify in a full-page screenshot at 1440 px

## 3. Hero illustration

- [x] 3.1 Move `face`, `neck`, `sneaker` from `scripts/art/lunch-line.mjs` into `scripts/art/people.mjs` and import them; verify `node scripts/art/lunch-line.mjs` still writes its SVGs
- [x] 3.2 Add `scripts/art/desks.mjs` (seated people, laptops, arm poses, desk, trails, tiffin) and add it to the `art` script; verify `node scripts/art/desks.mjs --png` writes `public/illustrations/desks.png`
- [x] 3.3 In `src/landing/Tastes.tsx`, use `desks.png`, set `SCENE.h` to 740 and the image height to 1110, update the alt text and comment; verify every bubble sits over its person's trail in light and dark mode

## 4. Integration

- [x] 4.1 Run `npm run build`; verify it passes and the hero, live board and hosts sections render without console errors
