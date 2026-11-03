# Design

## Context

The hero (`Tastes.tsx`) overlays thought-bubble buttons on a rendered PNG, at positions computed from
the scene's size (`SCENE`), each person's x (`XS`) and bubble row (`TIERS`). The art is drawn as SVG by
Node scripts in `scripts/art/` (shared style and print filter in `style.mjs`) and rasterised with Chrome.

## Decisions

- **Same head positions as the lunch line.** Seated people are drawn in a frame with the desk top at
  y = 0; their faces, hair and collars reuse the standing drawings, lifted by 335 px (`up()`), which puts
  every head exactly where the queue's heads were. So `XS`, `TIERS`, the bubble PNGs and the trail dots
  don't change; only the scene height does (860 → 740, as nobody stands).
- **Shared parts in `people.mjs`** (`face`, `neck`, `sneaker`) instead of copying them; `lunch-line.mjs`
  imports them too, and still draws the thought bubbles.
- **One long desk drawn first**, people over it, then each person's laptop and near arm, so arms rest on
  the keyboards. Three arm poses (`type`, `chin`, `mug`) give variety without new characters.
- **All eight get a thought trail** (the old pointing finger is gone).
- **The board is a tile of the hosts section**, rendered by `ForHosts` between its heading and the tile
  grid, so its spacing is the grid's (`mt-5 md:mt-6`), not a section's. `LiveDemo` keeps its `#pick`
  anchor for "Try the board"; the nav's "The board" goes to the section top (`#hosts`) so the heading
  shows first.
- **Unmount `CartBand` instead of deleting it**: the file stays until someone confirms it can go.

## Risks / Trade-offs

- [Seated torsos read long] → Acceptable in this flat style; shorten `TORSO` and raise the stool in
  `desks.mjs` if it needs to change.
