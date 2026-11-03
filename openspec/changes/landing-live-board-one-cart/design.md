# Design

## Context

`LiveDemo.tsx` keeps the visitor's dishes in a local `tray`, builds the cart with `summarise()` from the
replayed team picks plus the tray, and saves through the store's `savePick`. Added dishes fly into
`[data-cart-id=<restaurant>]` rows. Moments come from `useCelebrate()` (`celebrate.tsx`).

## Decisions

- **Save, then stay.** `putOnBoard` only dispatches `savePick` and celebrates with `sound: 'saved'` (the
  same moment as the app's "Order complete"). Signing in moved to `openBoard`, behind the "Open the
  board" link. Alternative considered: save and sign in silently; rejected because the visitor is still
  exploring the page.
- **"On the board" state from a key of the tray** (`dishId×qty`, joined) remembered at save time, so the
  button knows if the tray still matches without reading the store.
- **Your dishes nest in their restaurant's row** (filtered from `tray` by restaurant) instead of a second
  list. The fly-to-cart target (`data-cart-id`) is unchanged, so the flying photo lands in the row that
  now also shows the dish. The row gets an ink ring while it holds your dishes.
- **`BowlScrollbar` watches the list, not the content.** It uses Motion's `useScroll({ container })` for
  position, a `ResizeObserver` plus a check after each render for overflow, and writes
  `data-overflows` on the list so its right padding (`data-[overflows=true]:pr-7`) appears only with
  the bar. Native scrolling stays (`no-scrollbar` only hides the bar), so wheel, touch and keys work; the
  bowl adds pointer dragging. It is `aria-hidden`: it duplicates native scrolling.
- **One `Bowl` drawing** in `bowl-scroll.tsx`, used here and by "How lunch runs".

## Risks / Trade-offs

- [The custom bar can't be clicked on its track to jump] → Drag the bowl, or scroll as usual.
- [A long cart on phones] → The list caps at 360 px below `lg`, with the bowl bar.
