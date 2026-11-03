# Tasks

Paths are the same in lunch-club-demo and lunch-board. Done in lunch-club-demo; to apply in
lunch-board, copy this change folder into lunch-board's `openspec/changes/` and clear the checkboxes.

## 1. Share the moment artwork

- [x] 1.1 In `src/components/celebrate.tsx`, export `TONES` and the `Moment` type, and add exported `MomentArt` (padlock / step picture / check) and `Burst` (particles); verify `npx tsc --noEmit` passes
- [x] 1.2 Make `CelebrationProvider` render through `MomentArt` and `Burst`; verify in the app that Lock picks still shows the padlock moment (checked in the demo; the other five moments go through the same `MomentArt`, so check one more in lunch-board)

## 2. Rebuild "How lunch runs" around the six steps

- [x] 2.1 In `src/landing/HowItRuns.tsx`, drive the list from `STEPS` with `StepDot` markers (size 28) and a green connector; verify six steps labelled exactly as the sidebar, numbered 1–6
- [x] 2.2 Add one description per step (`BODY`, keyed by `StepId`) and show only the current one on wide screens; verify it opens and closes as the page scrolls
- [x] 2.3 Use the sample lunch (`summarise(DEMO_SESSION, DEMO_PICKS)`) for every scene; verify the Review & lock board fills with picks after resetting or completing the demo lunch
- [x] 2.4 Write the six scenes (start, review, order, collect, distribute, finish) with `PressButton` for host actions; verify each plays to its end in the browser
- [x] 2.5 Add the panel moment (`Stage`): step tone and `MomentArt` opening as a circle from the finishing control, holding until the step changes; verify gold / ink / green / indigo / violet / coral moments with the app's titles
- [x] 2.6 Mark all six markers done when the last moment plays, and colour the pager with the moment's text colour; verify on the Enjoy your meal step
- [x] 2.7 Set the pinned height to 480 vh for six beats and keep title buttons scrolling to their step; verify clicking "Distribute" lands on Distribute and replays its scene
- [x] 2.8 Phones: each list item shows its title, description and stage (scene + moment) when scrolled into view; verify at 390 px wide that the page does not pin and Collect ends on "Food's here!"
- [x] 2.9 Reduced motion: scenes show their end state at once and moments fade in after 1.4 s without the circle; verify with `prefers-reduced-motion: reduce`
- [x] 2.10 Give each moment its step's sound (`MOMENTS[...].sound`) and play it with `soundDelay` only when `audioAllowed()`; verify with `navigator.userActivation` stubbed to "not yet" that scrolling through all six steps creates no audio engine, and that after a click the moments play
- [x] 2.11 Add `audioAllowed()` to `src/lib/sound.ts` and export `soundDelay` from `celebrate.tsx` (the provider uses it too); verify `npx tsc --noEmit`
- [x] 2.12 Add the sound button under the heading ("Turn sound on" / "Sound on", `aria-pressed`) writing the app's Sounds setting; verify one press turns it on (not on-then-off) and Settings → Sounds shows the same value
- [x] 2.13 Replace the pager dots with the bowl scroll bar, drawing the bowl with `Bowl` from `src/components/bowl-scroll.tsx` (fill and bowl follow scroll, a mark per step, steam while the moment shows, `currentColor`); verify it is visible on the light stage and on each moment colour

## 3. Integration

- [x] 3.1 Run `npm run build`; verify it passes with no type errors and the browser console stays clean while scrolling the section

## Workflow follow-up

- Apply the same change in lunch-board (same files), then archive it with `openspec archive landing-how-lunch-runs-six-steps` so the spec moves into `openspec/specs/landing-how-lunch-runs/`.
