# Proposal

## Why

On the landing page's live board ("Today's lunch"), "Put it on the board" signed the visitor in and
jumped into the app, so trying the board threw them off the page they were exploring, without any
feedback that the pick was saved. The right-hand column also split the order in two ("One Swiggy cart"
and "Your tray"), so a visitor's dish appeared in two places, and each list had a plain browser scroll
bar out of keeping with the page.

## What Changes

- "Put it on the board" saves the pick and stays on the page, with the app's pick-saved moment and its
  ding. The button then reads "On the board" until the tray changes ("Update my pick"). Going into the
  app is an explicit "Open the board" link under the button.
- With picks closed, the button is disabled and says so, rather than signing in.
- "One Swiggy cart" and "Your tray" become one list: each restaurant row shows the team's count and
  total, with the visitor's own dishes nested inside it (marked "You", each with a − button). The totals,
  "You owe the host" and the button sit under the list.
- The list's browser scroll bar is replaced with a food one: a bowl rides a thin track and steams while
  the list moves; it can be dragged, and shows only when the list overflows.

## Capabilities

### New Capabilities
- `landing-live-board`: The landing page's try-it-yourself board: adding dishes, the one cart they land
  in, saving a pick, and its scroll bar.

### Modified Capabilities
<!-- None: no specs exist yet. -->

## Impact

- `src/landing/LiveDemo.tsx`: save in place, merged cart column, bowl scroll bar.
- `src/components/bowl-scroll.tsx` (new): `Bowl` and `BowlScrollbar`, shared with "How lunch runs"
  (change `landing-how-lunch-runs-six-steps`, which must land first or together).
- lunch-board: `LiveDemo.tsx` there also imports `useSignIn` from `@/auth` for "Open the board"; keep
  lunch-board's sign-in call in `openBoard` and apply the rest as is.
