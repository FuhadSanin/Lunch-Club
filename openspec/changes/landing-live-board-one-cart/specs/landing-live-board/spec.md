# Spec Delta

## Purpose

The landing page's live board lets a visitor try picking lunch: add dishes from today's restaurants,
watch them land in the team's one cart, and save the pick, without leaving the page.

## ADDED Requirements

### Requirement: Saving a pick stays on the page
"Put it on the board" SHALL save the visitor's dishes as their pick for today's lunch and keep them on
the landing page. It MUST NOT sign them in or navigate away.

#### Scenario: Visitor saves a pick
- **GIVEN** picks are open and the visitor has added dishes
- **WHEN** they press "Put it on the board"
- **THEN** the pick is saved, the page stays where it is, and the address does not change

### Requirement: Saving plays the pick-saved moment and sound
Saving SHALL show the app's pick-saved moment (green, check, "Pick saved", with the dish count and
amount) opening from the button, and play the app's "saved" ding, following the app's Sounds setting.

#### Scenario: Moment and ding
- **WHEN** the visitor saves a pick of 2 dishes for ₹459
- **THEN** "Pick saved" appears with "2 dishes, ₹459. You're on today's board." and the ding plays

### Requirement: The button shows whether the board is up to date
After saving, the button SHALL read "On the board" and be disabled while the dishes match what was
saved; once they change it SHALL read "Update my pick". With picks closed it MUST be disabled and the
line under it MUST say picks are closed.

#### Scenario: Visitor changes their mind
- **GIVEN** the visitor saved a pick
- **WHEN** they add another dish
- **THEN** the button reads "Update my pick" and saving again replaces the pick

### Requirement: Opening the app is a separate choice
Under the button an "Open the board" link SHALL sign the visitor in to the demo and open Today's lunch.

#### Scenario: Visitor opens the board
- **WHEN** the visitor presses "Open the board"
- **THEN** they are signed in and see Today's lunch in the app

### Requirement: One cart holds everyone's dishes, yours included
The board SHALL show a single cart list: one row per restaurant with the team's dish count and total,
and the visitor's own dishes listed inside their restaurant's row, each marked as theirs with its price
and a control to remove one. There MUST NOT be a separate tray list. Under the list it SHALL show the
items total, what the visitor owes the host, and the save button.

#### Scenario: Visitor adds dishes from two restaurants
- **WHEN** the visitor adds two dishes from KFC and one from Burger King
- **THEN** the KFC row lists their two dishes and the Burger King row lists one, the header counts "3 dishes yours", and the totals include them

#### Scenario: Removing a dish
- **WHEN** the visitor presses − on their only KFC dish
- **THEN** it leaves the KFC row and the totals drop by its price

### Requirement: Food scroll bar
When the cart list is taller than its space it SHALL show a food scroll bar in place of the browser's:
a bowl riding a thin track at the list's right edge, positioned by the scroll, steaming while the list
moves, and draggable. Wheel, touch and keyboard scrolling MUST keep working. When the list fits, no bar
and no space for it are shown.

#### Scenario: List overflows
- **GIVEN** the cart list is taller than its space
- **WHEN** the visitor scrolls it
- **THEN** the bowl moves down the track and steams, and stops steaming shortly after scrolling stops

#### Scenario: List fits
- **WHEN** everything in the cart fits
- **THEN** no scroll bar shows and the rows use the full width
