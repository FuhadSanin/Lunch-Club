# Proposal

## Why

The landing page's "How lunch runs" section tells a five-stage story ("The host picks a distance…",
"Picks lock at 12:30", "The host checks the cart once", "The order bot places one order", "Food
arrives, labelled by name") that no longer matches the app. Inside the app the host runs a lunch in
six named steps (Start lunch → Review & lock → Place order → Collect → Distribute → Enjoy your meal),
and each step ends with its own moment. Visitors should see the same steps, with the same names and the
same moments, as hosts will later see in the sidebar.

The section also reads the visitor's own store, so after someone plays with the demo it can show an
empty live board ("1 of 35 picked" and no rows).

## What Changes

- "How lunch runs" lists exactly the app's six host steps, in the app's order, with the app's labels
  and numbered step markers (number, then a green check once passed, as in the "Run the lunch" sidebar).
- Each step plays a short scene of what the host does in that step, ending with that step's in-app
  moment: gold megaphone "Lunch started", ink padlock "Picks locked", green cart "Order placed", indigo
  bag "Food's here!", violet cloche "Everyone's served", coral cutlery "Enjoy your meal!".
- The final green "Lunch is served" beat is removed: step 6's moment is now the ending.
- Each moment plays the step's in-app sound, once the visitor has clicked, tapped or typed on the page
  (browsers allow sound only then), with a "Turn sound on" / "Sound on" button under the heading.
- The pager dots become a food scroll bar: a bowl slides along the track as the page scrolls and
  steams when a step's moment plays.
- Scenes run on the built-in sample lunch, never the visitor's state, so the story is always complete.
- The in-app moment artwork and colours are shared with the landing page rather than redrawn.
- On phones the section stays a list; each step's scene plays when it scrolls into view.

## Capabilities

### New Capabilities
- `landing-how-lunch-runs`: The landing page's walkthrough of how a host runs a lunch: which steps it
  shows, their order and wording, the scene and moment each step plays, and how it behaves on scroll,
  on phones and with reduced motion.

### Modified Capabilities
<!-- None: no specs exist yet. -->

## Impact

- `src/landing/HowItRuns.tsx`: rewritten around the six steps.
- `src/components/celebrate.tsx`: exports the moment tones and artwork (padlock, megaphone, cart, bag,
  cloche, cutlery) for reuse; the in-app moments look and sound exactly as before.
- Reads `STEPS` from `src/lib/steps.ts` and `StepDot` from `src/components/steps.tsx`; neither changes.
- `src/components/bowl-scroll.tsx` (new, shared with `landing-live-board-one-cart`): the `Bowl` drawing.
- `src/lib/sound.ts`: adds `audioAllowed()`, whether the browser lets the page make sound yet.
- `src/components/celebrate.tsx` also exports `soundDelay`, when each sound lands on its moment.
- **lunch-board**: `HowItRuns.tsx`, `celebrate.tsx`, `steps.ts`, `steps.tsx`, `sound.ts` (apart from its storage key) and the sample data
  exports (`DEMO_SESSION`, `DEMO_PICKS`, `summarise`, `offeredRestaurants`) are the same there, so this
  change applies to lunch-board file for file.
