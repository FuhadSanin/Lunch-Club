# Tasks

Paths are the same in lunch-club-demo and lunch-board. Done in lunch-club-demo; to apply in
lunch-board, copy this change folder into lunch-board's `openspec/changes/` and clear the checkboxes.
Apply `landing-how-lunch-runs-six-steps` first (or together): both use `src/components/bowl-scroll.tsx`.

## 1. Save in place

- [x] 1.1 In `src/landing/LiveDemo.tsx`, make `putOnBoard` dispatch `savePick` and celebrate with `sound: 'saved'`, with no sign-in or hash change; verify the address stays the same after saving and the ding plays
- [x] 1.2 Track the saved tray key and label the button "Put it on the board" / "On the board" (disabled) / "Update my pick"; disable it when picks are closed; verify each state
- [x] 1.3 Add the "Open the board" link calling `openBoard` (sign in, go to `/`); verify it opens Today's lunch (in lunch-board keep its own sign-in call here)

## 2. One cart

- [x] 2.1 Replace the cart and tray lists with one list: restaurant rows with the visitor's dishes nested (You badge, price, −), the header counting "N dishes yours", totals and button under the list; remove the `Separator` and `yours()`; verify adding from two restaurants shows each dish in its row and − removes it
- [x] 2.2 Keep `data-cart-id` on rows; verify an added dish still flies into its restaurant's row

## 3. Food scroll bar

- [x] 3.1 Add `src/components/bowl-scroll.tsx` with `Bowl` and `BowlScrollbar` (scroll-linked bowl, steam while moving, drag, `data-overflows`, hidden when it fits); verify `npx tsc --noEmit`
- [x] 3.2 Put the cart list in a relative wrapper with `no-scrollbar data-[overflows=true]:pr-7` and render `BowlScrollbar`; verify at 1024 px with 9 dishes added that the bowl shows and moves, and with 4 that no bar or gutter shows

## 4. Integration

- [x] 4.1 Run `npm run build`; verify it passes and the console stays clean while adding, removing and saving
