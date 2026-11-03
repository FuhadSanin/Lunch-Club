# Spec Delta

## Purpose

The landing page introduces Lunch Club to someone who hasn't used it: what it is, how a lunch runs, a
board to try, what it does for the host, and a way in. This capability owns its structure and look.

## ADDED Requirements

### Requirement: Section order
The landing page SHALL show, in order: the hero ("Everyone has a different craving."), "How lunch
runs.", "Made for the person who orders." (the live board and the host's tiles), and the closing
section.

#### Scenario: Scrolling down from the top
- **WHEN** a visitor scrolls past the hero
- **THEN** the next section is "How lunch runs.", followed by "Made for the person who orders."

### Requirement: The board and the host's tiles are one section
"Made for the person who orders." SHALL hold the live board as its first, full-width tile, directly
under its heading, with the four host tiles (names on every bag, who owes what, never orders twice,
company joins by email) under it in the same grid, with the grid's own gap between them and matching
corner radius.

#### Scenario: Visitor reaches the section
- **WHEN** a visitor scrolls to "Made for the person who orders."
- **THEN** they see the heading, then the live board, then the four tiles, with no section break between the board and the tiles

#### Scenario: Try the board
- **WHEN** a visitor presses "Try the board" in the hero
- **THEN** the page scrolls to the live board inside that section

### Requirement: No separate cart section
The page MUST NOT include the "Any restaurant. One cart." section; the live board shows the one cart.

#### Scenario: Nav links
- **WHEN** the page loads on a wide screen
- **THEN** the nav links read How it works and The board, in that order, scrolling to "How lunch runs." and "Made for the person who orders."

### Requirement: Room to breathe
Sections SHALL be separated by generous space on an 8-point rhythm (at least 128 px between sections
on wide screens), and the hosts tiles SHALL have at least 24 px between them and 40 px of inner padding
on wide screens.

#### Scenario: How lunch runs to the board
- **WHEN** a visitor scrolls from "How lunch runs." to "Made for the person who orders."
- **THEN** at least 128 px of empty space separates them

### Requirement: Hero illustration of people dreaming of lunch
The hero SHALL show colleagues seated at a long office desk, each at an open laptop, looking dreamy, each
with a thought bubble of a different dish that follows today's picks and names the dish on hover or
focus, and the team's tiffin on the desk. It MUST keep the site's monochrome print style and invert in
dark mode.

#### Scenario: Visitor points at a thought
- **WHEN** a visitor hovers or focuses the third person's thought bubble
- **THEN** a tooltip names that dish and its restaurant from today's menus

#### Scenario: Dark mode
- **WHEN** the page is in dark mode
- **THEN** the drawing and its bubbles are drawn light on dark
