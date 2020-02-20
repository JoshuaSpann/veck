# veck
Minimalist help desk software composed of a basic ticketing and inventory system.

## Navigating

You can navigate via the title bar or the main menu.

---

## Ticketing

Veck contains a basic ticketing system that is saved to a SQLite3 database.
The web-client allows you to update a local database model (JSON) as well as sync with a backend (PHP).
The local database model will eventually utilize service workers and browser cahches to save everything locally to your browser.
You will eventually be able to export and import data from the browser.

### Navigating Entries

To showcase ticket listings with built-in search, click the `☰` main hamburger menu on the top left.
The search works only on the items ids/names displayed and not detailed data.


Clicking the item makes it the main focus where you edit detailed data.

### Adding New Items

Add a new item by pressing the `+` action button on the top right.
The header changes with an immutable, randomly generated ID and an editable title field.

Leaving the title field after entering text inserts the record.
If no text is in the field, the insert is ignored.
You may press the `X` action button on the top right to cancel entry.

---

## Inventory

Veck will have an integrated inventory that will be available to all tickets.
Inventory items can be modified via the inventory window or inline at any of the ticketing forms/windows.
