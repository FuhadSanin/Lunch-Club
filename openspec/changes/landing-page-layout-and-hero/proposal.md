# Proposal

## Why

The landing page felt crowded: sections sat close together, "Any restaurant. One cart." repeated what
the live board already shows, and the way a lunch runs (the core idea) only came after the board. The
hero drawing showed people queueing at a counter, but Lunch Club is used by people at their desks,
working, thinking about lunch.

## What Changes

- Order: hero → "How lunch runs." → "Made for the person who orders." → closing. The live board moves
  into "Made for the person who orders." as its first, full-width tile, above the four host tiles, so
  the board and what it does for the host are one section. The nav reads How it works · The board.
- **BREAKING (page content)**: the "Any restaurant. One cart." section (`CartBand`) and its "The cart" nav
  link are removed from the page.
- More space: larger gaps before the hero drawing, the live board, the hosts section and the closing;
  more room between and inside the hosts tiles.
- New hero illustration (`public/illustrations/desks.png`, drawn by `scripts/art/desks.mjs`): eight
  colleagues on stools at one long desk, each at an open laptop (six typing, one chin in hand, one
  sipping coffee), eyes closed or drifting up, a trail of thought bubbles rising from each head to the
  dish they are dreaming of, and the team's tiffin waiting at the end of the desk. Same print style and
  thought bubbles as before.

## Capabilities

### New Capabilities
- `landing-page`: The landing page's overall structure: which sections it has, in what order, the nav
  links to them, their spacing, and the hero illustration.

### Modified Capabilities
<!-- None: no specs exist yet. -->

## Impact

- `src/landing/Landing.tsx`: section order, nav links, `CartBand` unmounted, spacing.
- `src/landing/Tastes.tsx`: new image, scene height 740, alt text.
- `src/landing/LiveDemo.tsx`: takes a `className` and brings no outer margins (its section places it);
  corners match the tiles (`rounded-3xl`); board height 640 → 580 px.
- `scripts/art/desks.mjs` (new), `scripts/art/people.mjs` (new: face, neck, sneaker shared with
  `lunch-line.mjs`), `package.json` `art` script; `public/illustrations/desks.png` (rendered).
- `src/landing/CartBand.tsx` is no longer imported; it is left in place and can be deleted.
- lunch-board: same files; copy `desks.png` (or run `npm run art`) and `people.mjs`.
