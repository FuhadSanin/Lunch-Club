# Spec Delta

## Purpose

The landing page's "How lunch runs" section shows a visitor how a host runs a lunch, using the same
steps, names and end-of-step moments the host meets inside the app.

## ADDED Requirements

### Requirement: Shows the app's six host steps
The section SHALL list the host's lunch steps exactly as the app defines them: the same number of steps,
in the same order, with the same labels (Start lunch, Review & lock, Place order, Collect, Distribute,
Enjoy your meal). The labels MUST come from the app's single step definition, so renaming a step there
renames it here.

#### Scenario: Step list matches the app
- **WHEN** a visitor scrolls to "How lunch runs"
- **THEN** they see six steps numbered 1 to 6 labelled Start lunch, Review & lock, Place order, Collect, Distribute, Enjoy your meal

#### Scenario: A step is renamed in the app
- **GIVEN** a step's label is changed in the app's step definition
- **WHEN** the landing page is built
- **THEN** "How lunch runs" shows the new label without a separate edit

### Requirement: Step markers match the app sidebar
Each step SHALL have a numbered marker drawn like the app's "Run the lunch" list: steps already passed
show a green check, the current step is filled and shows its number, and steps still to come are outlined
with their number. The line joining two markers MUST fill green once the step above it is passed.

#### Scenario: Visitor is on step 3
- **WHEN** the section is showing Place order
- **THEN** Start lunch and Review & lock show green checks, Place order is filled with "3", and Collect, Distribute and Enjoy your meal are outlined with 4, 5 and 6

### Requirement: Current step explains itself
The current step SHALL show a one- to two-sentence description of what the host does in that step,
consistent with the app's hint for that step. Only the current step's description is open on wide
screens.

#### Scenario: Description opens with its step
- **WHEN** the section moves from Collect to Distribute on a wide screen
- **THEN** Collect's description closes and Distribute's description opens

### Requirement: Each step plays its scene
Each step SHALL play a short scene of the host's work in that step: choosing the distance and seeing the
restaurants (Start lunch), picks arriving on the live board then locking (Review & lock), the Swiggy bot
adding each restaurant and checking out (Place order), restaurants marked as arrived (Collect), people
ticked off as they get their food (Distribute), and the lunch summary being completed (Enjoy your meal).

#### Scenario: Place order scene
- **WHEN** Place order becomes the current step
- **THEN** the scene confirms the order, then shows the bot opening Swiggy, adding each restaurant of the sample lunch in turn, checking the cart total and placing the order, cash on delivery

### Requirement: Each scene ends with the step's in-app moment
When a step's scene finishes, the scene area SHALL show that step's moment with the same colour, artwork
and title the app shows when the host finishes that step: Start lunch gold megaphone "Lunch started";
Review & lock ink padlock "Picks locked"; Place order green cart "Order placed"; Collect indigo bag
"Food's here!"; Distribute violet cloche "Everyone's served"; Enjoy your meal coral cutlery "Enjoy your
meal!".

#### Scenario: Collect finishes
- **WHEN** the last restaurant in the Collect scene is marked as arrived
- **THEN** the scene area fills indigo from that restaurant's button, the bag drops in and "Food's here!" appears with how many restaurants arrived

#### Scenario: Last step completes the lunch
- **WHEN** the Enjoy your meal moment plays
- **THEN** all six step markers show green checks

### Requirement: Each moment plays the step's in-app sound
When a step's moment plays, the page SHALL play the sound the app plays for that step: Start lunch
"start", Review & lock "lock", Place order "money", Collect "doorbell", Distribute "served", Enjoy your
meal "cheer", timed to the moment's animation as in the app. Sounds MUST follow the app's Sounds
setting.

#### Scenario: Collect finishes with sound allowed
- **GIVEN** the visitor has clicked, tapped or typed on the page and sounds are on
- **WHEN** the Collect moment plays
- **THEN** the doorbell sound plays as the bag drops in

#### Scenario: Sounds are off in Settings
- **GIVEN** the visitor turned sounds off in the app's Settings
- **WHEN** a step's moment plays on the landing page
- **THEN** no sound plays

### Requirement: No sound before the visitor interacts
The page MUST NOT ask for any sound before the visitor has clicked, tapped or typed on it, so that no
held-back sounds play late, all at once, on the first click. Moments that play before then stay silent.

#### Scenario: Visitor only scrolls
- **GIVEN** the visitor has only scrolled the page
- **WHEN** steps' moments play
- **THEN** no sound plays and none plays later when they first click

### Requirement: Sound toggle
"How lunch runs" SHALL show a sound button under its heading: "Turn sound on" while sound can't play
or is off, "Sound on" while it can. Pressing it MUST change the same Sounds setting the app uses, and
turning sound on while a moment is showing MUST play that moment's sound.

#### Scenario: Visitor turns sound on
- **GIVEN** the button reads "Turn sound on"
- **WHEN** the visitor presses it
- **THEN** it reads "Sound on" and the next step's moment plays its sound

#### Scenario: Visitor turns sound off
- **WHEN** the visitor presses "Sound on"
- **THEN** it reads "Turn sound on", no more sounds play, and the app's Sounds setting is off

### Requirement: Scenes use the built-in sample lunch
Scenes SHALL use the built-in sample lunch (its team, picks, restaurants, cutoff and totals), not the
visitor's own demo state or a live lunch, so every scene has people, dishes and restaurants to show.

#### Scenario: Visitor has emptied their demo
- **GIVEN** the visitor has completed or reset their own demo lunch
- **WHEN** they return to the landing page
- **THEN** the Review & lock scene still shows picks arriving on the live board

### Requirement: Scroll drives the steps on wide screens
On wide screens the section SHALL stay pinned while the page scrolls, with one stretch of scroll per
step. Choosing a step's title MUST scroll to that step.

#### Scenario: Visitor clicks a later step
- **WHEN** a visitor on a wide screen clicks "Distribute"
- **THEN** the page scrolls until Distribute is the current step and its scene plays from the start

### Requirement: A bowl shows how far the lunch has got
Under the scene on wide screens a scroll bar SHALL show progress through the six steps as food: a bowl
slides along the track with the scroll, the track fills behind it, there is a mark for each step (lit
once reached), and the bowl steams while the current step's moment shows. It MUST stay visible on every
moment colour.

#### Scenario: Scrolling through Place order
- **WHEN** the visitor scrolls from Review & lock to Place order
- **THEN** the bowl slides from the second mark to the third and the third mark lights up

#### Scenario: Moment showing
- **WHEN** the green "Order placed" moment is showing
- **THEN** the bowl and track are drawn in the moment's text colour and the bowl steams

### Requirement: Phones get a list
On narrow screens the section SHALL show the six steps as a list, each with its title, description and
its scene, which plays once it scrolls into view and ends with its moment.

#### Scenario: Scrolling on a phone
- **WHEN** a visitor on a phone scrolls the Collect step into view
- **THEN** its scene plays and ends with the indigo "Food's here!" moment, without the page pinning

### Requirement: Reduced motion is honoured
With reduced motion, scenes SHALL show their finished state without movement, and each moment SHALL
appear with a fade only, no expanding circle, flying particles or bouncing artwork.

#### Scenario: Reduced motion on
- **GIVEN** the visitor's system asks for reduced motion
- **WHEN** a step becomes current
- **THEN** its scene shows its end state at once and its moment fades in without the circle reveal
