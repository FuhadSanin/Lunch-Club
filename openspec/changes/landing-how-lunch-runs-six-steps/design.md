# Design

## Context

- The six host steps are defined once in `src/lib/steps.ts` (`STEPS`: id, route, label, hint). The
  sidebar, Today's lunch and every step page already read from it; the landing page did not.
- The step marker the sidebar uses is `StepDot` in `src/components/steps.tsx` (done → green check,
  now → filled number, todo → outlined number).
- Each step's end moment is fired from its screen through `useCelebrate()` (`src/components/celebrate.tsx`),
  a full-screen overlay. Its pictures (`Padlock`, `StepIcon`, the check) and colours (`TONES`) were
  private to that file.
- "How lunch runs" (`src/landing/HowItRuns.tsx`) is a pinned scroll section: the scroll position picks
  the beat, and a keyed scene plays in the right-hand panel. Phones get a plain list.

## Goals / Non-Goals

**Goals:**
- One source of truth for step names and order (`STEPS`) and for moment artwork (`celebrate.tsx`).
- The same files work in lunch-board unchanged.

**Non-Goals:**
- Changing the in-app steps, their screens, moments or sounds.
- Sound before the visitor has interacted with the page (browsers don't allow it).
- Sharing the moment titles and subtitles with the step screens (they stay written in each screen;
  the landing copies them; see Risks).

## Decisions

- **Read `STEPS` and `StepDot` directly** rather than a landing-only copy of the step list. A renamed or
  reordered step then shows up on the landing page by itself. The landing-only text (one description
  per step) is keyed by `StepId`, so TypeScript fails the build if a step is added without one.
- **Export `TONES`, `MomentArt` and `Burst` from `celebrate.tsx`**, and have the provider use them too,
  instead of redrawing the pictures in the landing page. Alternative considered: render the real
  `CelebrationProvider` overlay; rejected because it is `position: fixed` full screen, plays sounds,
  and closes itself after 2.3 s, while the landing moment must sit inside the panel, stay silent and
  hold until the next step.
- **The landing moment is panel-sized**: an `absolute inset-0` layer with the step's tone, opened with
  `clip-path: circle()` from the control that finished the scene (the confirm/lock/complete button, or
  the last restaurant's "Arrived"), the same move as the app. It holds until the step changes. The scroll
  bar takes the moment's text colour so it stays visible on every tone.
- **Scenes press their own buttons**: a `PressButton` with a cursor that glides in and clicks at a set
  time, so each step reads as "the host does X" without the visitor having to interact.
- **Sample data, not the store**: scenes use `summarise(DEMO_SESSION, DEMO_PICKS)`. The old section used
  `useLunch()`, which follows the visitor's state (and a live lunch in lunch-board), and could render an
  empty board.
- **Scroll length 480 vh for 6 beats** (was 440 vh for 5 + "served"): about 63 vh per step, enough for a
  scene (~2.5–4 s) and its moment at a normal scroll speed.
- **Sound only after a gesture.** Browsers keep Web Audio suspended until the visitor clicks, taps or
  types; sounds scheduled before then would wait and then all play together on the first click. So
  the stage asks `audioAllowed()` (`navigator.userActivation.hasBeenActive`, else the engine is
  running) before each `playSound`, and skips the sound otherwise. Timing comes from `soundDelay`,
  shared with `CelebrationProvider`. Alternative considered: always schedule and let the browser
  drop it; rejected because Chrome holds them, not drops them.
- **The sound button writes the app's Sounds setting** (`setSoundOn`) rather than a landing-only flag,
  so "off" means off everywhere. It listens for the first press elsewhere on the page to switch its
  label to "Sound on", ignoring presses on itself: `pointerdown` comes before `click`, and counting
  its own press would flip it on and then straight off.
- **Bowl scroll bar**: the bowl's position and the track's fill follow `scrollYProgress` directly
  (`useTransform` to a percentage), so it moves smoothly rather than jumping per step; step marks sit at
  each step's midpoint, where clicking a step title scrolls to. The bowl's steam runs while the moment
  shows. The whole bar uses `currentColor`, taking the moment's text colour like the old dots.
- **Reduced motion**: sequences jump to their end, the cursor is not drawn, and the moment fades in
  after 1.4 s so the finished scene can be read first.

## Risks / Trade-offs

- [Moment titles are duplicated between the step screens and the landing `MOMENTS` table] → The spec
  lists them; when a screen's moment changes, update `MOMENTS` in `HowItRuns.tsx` too. Moving them into
  `steps.ts` is a possible follow-up.
- [Fast scrolling skips a scene before its moment plays] → Each step's title is a button that scrolls to
  the middle of that step, where the scene replays from the start.
- [A visitor who only scrolls hears nothing] → The "Turn sound on" button sits under the heading;
  any click on the page (an Add on the live board, the theme switch) also allows sound from then on.
- [Automated browsers (Playwright) report the page as already interacted with] → To test the guard,
  stub `navigator.userActivation` to report no interaction until the first press.
- [React StrictMode double-runs effects in development] → The stage resets its moment timer in cleanup,
  so a scene that finishes on mount (reduced motion) still gets its moment.

## Migration Plan

Copy the change into lunch-board and apply it file for file (see tasks.md). No data or API changes;
roll back by restoring the changed files (`HowItRuns.tsx`, `celebrate.tsx`, `sound.ts`).
