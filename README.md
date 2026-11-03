# Lunch Club — demo

A self-contained demo of Lunch Club: a team picks lunch from several restaurants and the host
places one Swiggy order. Everything runs in the browser on sample data. There is **no backend and no
API calls**: today's lunch, the 35-person team, their picks, the restaurants and menus, and a week
of earlier lunches are all built in (`src/data/demo.ts`, `src/data/menus.ts`).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Or serve the ready-made build in `dist/` with any static server, for example:

```bash
npx vite preview   # after npm install
cd dist && python3 -m http.server 4173
```

Open `/?demo=signed-in` to skip the sign-in screen.

## Try it as a member or the host

The sidebar has a **View the demo as: Member · Host** switch.

- **Member:** Today's lunch and Pick my lunch. Search any restaurant or dish, add dishes to the
  cart (saved in this browser), then **Complete my order** or **Skip today**.
- **Host:** also runs the lunch in six steps, each opening only once the one before is done:
  **Start lunch → Review & lock → Place order (Swiggy bot) → Collect → Distribute → Enjoy your meal**.
  Each step ends with its own animation and sound, and moves on to the next by itself. On the
  board the host can **Mark skipped** or **Reopen** anyone. Settings is at the bottom of the sidebar.

**Settings → Demo data → Reset the demo** puts the sample lunch back. **Settings → Sounds** turns the
sounds off or plays each one.

## Specs (OpenSpec)

Product changes are written up with [OpenSpec](https://github.com/Fission-AI/OpenSpec) in `openspec/`,
so the same change can be applied to lunch-board. Open changes live in `openspec/changes/<name>/`
(proposal, spec, design, tasks); `openspec list` shows them and `openspec show <name>` prints one.

- `landing-how-lunch-runs-six-steps`: "How lunch runs" shows the app's six host steps, each ending with
  that step's in-app moment and sound, with a sound toggle and a bowl scroll bar.
- `landing-live-board-one-cart`: the live board saves a pick in place (pick-saved moment and ding), shows
  one cart with your dishes inside their restaurants, and has a bowl scroll bar.
- `landing-page-layout-and-hero`: How lunch runs is the second section, the live board and the host tiles
  are one section, the cart section is gone, more
  space throughout, and the hero is now colleagues at laptops dreaming of lunch (`npm run art`).

All three are done here and still to apply in lunch-board (apply the first one first).

## What's simulated

- The Swiggy bot: in Place order it adds each restaurant to the cart, checks the total and places
  the order, with live progress.
- Sign-in, the order number and delivery: there's no Swiggy account or server behind them.
- Restaurants, ratings, distances and menus are sample data; restaurant photos are credited in the
  footer.

Built with React, TypeScript, Vite, Tailwind CSS, shadcn/ui and Motion. Sounds are synthesised with
the Web Audio API.
