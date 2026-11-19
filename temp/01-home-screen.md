# Home / Today Screen — Functional Specification & Interaction Flow

## 1. Overview
The **Home / Today Screen** is the central screen of the app. It displays the user's active daily commitments, progress for today, quick navigation for other dates, and all habits due or tracked.

---

## 2. Top Bar & Navigation Controls

### 2.1 "+ New Habit" Button
* **What it does:** Starts the habit creation flow.
* **When clicked:** Opens the **Habit Creation Screen** (`HabitFormPage`) as a full-screen modal.
* **What happens inside that screen:**
  * User can fill out name, icon, schedule, and reminders, then tap **Save** (creates the habit and returns to Home) or **Cancel / Back** (discards without creating).

---

### 2.2 Filter Button (List Filter Icon)
* **What it does:** Filters and searches habits on the home screen.
* **When clicked:** Opens the **Today Filter Bottom Sheet**.
* **What's inside the popup:**
  1. **Search Input Field ("Search habits..."):**
     * Typing filters the home list in real-time by habit name.
     * Clearing the field restores the full list.
  2. **View Range Selector (Week / Month / Year):**
     * Clicking an option switches the mini-heatmap display on all habit cards to show the last 7 days, 30 days, or whole year.
  3. **"Today Only" Toggle:**
     * **Turn ON:** Hides any habits that are not scheduled to be performed today.
     * **Turn OFF:** Shows all active habits, even if today is an off-day.
  4. **"Hide Completed" Toggle:**
     * **Turn ON:** Automatically moves completed habits off the main list and into a collapsed "Completed" section at the bottom.
     * **Turn OFF:** Keeps completed habits in their normal position on the list.
  5. **"Hide Non-Habit Trackers" Toggle:**
     * **Turn ON:** Hides habits configured as pure metrics (tracking only, no streak penalty).
     * **Turn OFF:** Shows all tracked items.
  6. **"Hide Clean Days" Toggle (for Avoid/Negative habits):**
     * **Turn ON:** Hides negative habits where no relapse has occurred today.
     * **Turn OFF:** Always displays negative habits.
* **Closing the sheet:** Swipe down or tap outside. All toggle changes apply instantly to the Home list.

---

### 2.3 Focus Pill (Timer Capsule)
* **What it does:** Displays the status of the Focus Timer or provides a shortcut to start one.
* **When clicked:**
  * **If a focus timer is currently running:** Opens the active **Focus Timer Screen** showing the countdown clock.
  * **If no timer is running:** Opens the **Focus Timer Setup Screen** with default duration pre-selected.

---

### 2.4 Notes Shortcut (Notebook Icon)
* **What it does:** Quick access to habit journaling.
* **When clicked:** Opens the **All Notes Page**, listing all notes, daily reflections, and attached photos across all habits.

---

### 2.5 Compact / Expanded View Toggle (Chevrons Icon)
* **What it does:** Toggles card presentation.
* **When clicked:** Flips between:
  * **Expanded Cards:** Shows large icon, progress rings, heatmap history, streaks, and sub-steps.
  * **Compact Cards:** Shrinks cards into slim, single-line rows showing only name, icon, and checkmark.

---

### 2.6 Quick Jump Menu (Morph Menu — 3 dots icon)
* **What it does:** Appears on compact/minimal layouts to give one-tap access to secondary app modules.
* **When clicked:** Opens a popover menu with 6 items:
  1. **Focus Mode:** Opens the Focus Timer.
  2. **Day Planner:** Opens the Day Timeline screen.
  3. **Notes Journal:** Opens the All Notes screen.
  4. **To-Do Tasks:** Opens the Todos task list.
  5. **Statistics & Insights:** Opens the global Statistics dashboard.
  6. **Settings:** Opens the Settings screen.
* **Pinning shortcut:** The last selected shortcut from this menu stays pinned as a quick-action button right next to the menu icon for faster future access.

---

## 3. Today's Progress & Motivation Section

### 3.1 Progress Indicator (Ring / Wave Bar)
* **What it shows:** Total habits completed today vs total habits scheduled (e.g. "4 / 7 completed — 57%").
* **When all habits are completed:**
  * Fires a celebratory confetti explosion across the screen.
  * Displays an "All Done Today!" banner with a checkmark badge.

### 3.2 Daily Inspirational Quote
* **What it shows:** A motivational quote refreshed daily.
* **When tapped:**
  * **Single tap:** Rotates to the next quote in the library.
  * **Long press:** Copies the quote text and author to the device clipboard and displays a "Quote copied" toast notification.

---

## 4. Week Strip Navigation

### 4.1 Horizontal Date Bar
* **What it shows:** Scrollable 7-day strip showing day names (M, T, W, T, F, S, S) and dates, with a mini progress ring around each date indicating that day's completion percentage.
* **When clicking Today:** Scrolls the habit list to the top.
* **When clicking a past or future date:** Opens the **Day Overview Bottom Sheet**.

---

### 4.2 Day Overview Bottom Sheet (from Week Strip)
* **What it shows:**
  * Header: Full date (e.g., "Tuesday, November 17") and completion ratio ("5 / 6 completed").
  * A vertical list of every habit that was scheduled on that date.
* **When clicking a habit row inside this sheet:**
  * **If clicking an incomplete habit:** Calls the toggle check-in flow for that past date.
  * **If `pastFirst` setting is ON:** Opens the **Day Actions Sheet** (detailed in Section 6.4) to allow logging notes, miss reasons, or past amounts.
  * **If clicking a completed habit:** Unchecks the habit for that date and updates the day's completion count.
* **Closing the sheet:** Swipe down or tap outside.

---

## 5. Category Bar

### 5.1 Category Pills
* **What it shows:** Horizontal row of category pills (e.g., "All", "Health", "Work", "Mind", "Fitness").
* **When clicking a category pill:**
  * Filters the habit list below to show only habits belonging to that category.
  * Clicking "All" resets the filter and shows all habits.
* **When long-pressing an existing category pill:**
  * Opens the **Category Editor Sheet** pre-filled with that category's data.

---

### 5.2 "+ Add Category" Button
* **What it does:** Creates a new category.
* **When clicked:** Opens the **Category Editor Sheet**.
* **What's inside the popup:**
  1. **Name input field:** Text box to type the category title (e.g. "Morning Routine").
  2. **Color Palette Picker:** Grid of 12 colors to tint the category pill.
  3. **Icon Picker:** Grid of category icons (Health, Books, Running, Brain, Wallet, etc.) with a "Show More" expansion.
  4. **Save Button:**
     * **Clicking Save:** Validates that name is not empty, saves to database, closes sheet, and adds the new category pill to the bar.
  5. **Delete Category Button (if editing existing):**
     * **Clicking Delete:** Pops up a confirmation dialog: "Delete Category?".
     * **Confirming Delete:** Deletes category, unlinks habits from this category (habits are NOT deleted), and closes sheet.
     * **Canceling Delete:** Dismisses prompt, stays in editor.

---

## 6. Habit Cards & Interactive Actions

Each habit item in the list represents an individual habit.

### 6.1 Tapping Card Body
* **What it does:** Opens the **Habit Details Screen** (`HabitDetailsPage`) for in-depth calendars, graphs, streaks, and history.

---

### 6.2 Checking / Completing a Habit (Tap Check Button or Swipe Card)
* **Standard Positive Habit:**
  * **Action:** Tapping the check circle (or swiping the card right).
  * **Result:** Checks the habit off for today.
    * If sounds are enabled: Plays a tactile click/bell sound.
    * Card shows a filled colored checkmark.
    * If "Hide Completed" is ON: Card pauses for 2.5 seconds (allowing user to undo if accidental), then smoothly collapses into the Completed section.
    * If this check completes all scheduled habits for today: Launches full-screen confetti animation.
  * **Tapping again (Unchecking):** Unchecks the habit, resets streak to previous state.

* **Conditional Flow 1: Unscheduled Day Check:**
  * **Trigger:** User checks a habit on a day it was not scheduled for (e.g. checking a Mon/Wed/Fri gym habit on Saturday), or during a paused vacation day.
  * **What pops up:** **Unscheduled Day Confirmation Dialog**.
    * Title: "Not Scheduled for Saturday" (or "Habit Paused on Vacation").
    * Message: "This habit isn't scheduled for today. Check in anyway?"
    * **Clicking "Check In Anyway":** Completes the habit for today, closes dialog.
    * **Clicking "Cancel":** Closes dialog without completing.

* **Conditional Flow 2: Focus-Only Habit Check:**
  * **Trigger:** User attempts to manually check off a habit configured as "Focus Session Required" (timer-based habit).
  * **What pops up:**
    * **If attempting to check today:** **Start Focus Dialog**.
      * Title: "Start Focus Session?".
      * Message: "This habit requires a focus session to complete."
      * **Clicking "Start Focus":** Opens the **Focus Timer Screen** with this habit selected and pre-filled with its target focus duration.
      * **Clicking "Cancel":** Closes dialog.
    * **If attempting to check a past date:** An error snackbar appears: *"Focus sessions cannot be logged for past dates."*
    * **If already completed and user taps to clear:** **Clear Focus Dialog**.
      * Title: "Clear Focus Progress?".
      * **Clicking "Focus History":** Opens Habit Details screen to view past sessions.
      * **Clicking "Clear":** Clears today's logged focus time for this habit.
      * **Clicking "Cancel":** Closes dialog.

* **Conditional Flow 3: Avoid / Negative Habit (Quit Habit):**
  * **How it works:** Negative habits stay automatically "clean" by default. The user only checks in when a **relapse** occurs.
  * **Trigger:** User taps the card's checkmark / ban icon.
  * **What pops up:** **Log Relapse Dialog**.
    * Title: "Log Relapse?".
    * Message: "Did you break your streak for [Habit Name] today?"
    * **If Financial Tracking is enabled (`logsSpent = true`):**
      * Displays an interactive "Money Spent" card showing default cost (e.g. "$15.00").
      * **Clicking "Money Spent":** Opens the **Number Keypad Dialog** (Section 7.2) to enter the exact amount wasted on this relapse.
    * **Clicking "Log Relapse" (Red button):**
      * Records the relapse for today.
      * Resets the active streak to 0 days.
      * Adds the financial loss to total statistics.
      * Closes dialog.
    * **Clicking "Cancel":** Closes dialog, streak remains untouched.

---

### 6.3 Long-Pressing a Habit Card (Context Action Sheet)
* **What it does:** Opens the **Habit Actions Bottom Sheet** with 9 actions:

1. **"Edit Habit" (Pencil icon):**
   * **Clicking it:** Opens the **Habit Edit Form** pre-populated with this habit's settings.
2. **"Statistics" (Chart icon):**
   * **Clicking it:** Opens the **Habit Details Screen**.
3. **"Add Note" (Notebook icon):**
   * **Clicking it:** Opens the **Note Editor Page** to write thoughts, reflections, or attach photos for today.
4. **"Vacation Mode" (Palm tree icon):**
   * **Clicking it:** Opens the **Vacation Sheet** (Section 6.5).
5. **"Reorder" (Up/Down arrow icon):**
   * **Clicking it:** Closes sheet and activates **Reorder Mode** on the Home screen (Section 6.6).
6. **"Duplicate Habit" (Copy icon):**
   * **Clicking it:** Opens the **Habit Form** pre-filled with this habit's settings, allowing rapid cloning under a new name.
7. **"Export Habit" (Download icon):**
   * **Clicking it:** Generates a JSON backup file containing only this habit and its entire completion history, opening the device's native Share Sheet to save or send.
8. **"Habit Links" (Link icon — Android only):**
   * **Clicking it:** Opens the **Habit Links Sheet** (Section 6.7).
9. **"Archive Habit" (Archive box icon — Red danger item):**
   * **Clicking it:** Opens the **Archive Confirmation Dialog**.
     * Title: "Archive Habit?".
     * Message: "Are you sure you want to archive [Habit Name]? You can restore it later in Settings."
     * **Clicking "Archive":** Removes the habit from the Home screen, moves it to Archived list. A snackbar appears: *"Habit archived"* with an **"Undo"** button.
       * **Clicking "Undo":** Immediately restores the habit back to the list.
     * **Clicking "Cancel":** Closes dialog without archiving.

---

### 6.4 Day Actions Sheet (Past Days & Calendar Logging)
* **What it does:** Allows modifying completion status, recording miss reasons, and logging notes for past dates.
* **What's inside the sheet:**
  1. **Date Header:** Full date formatted (e.g. "Wednesday, November 11, 2026").
  2. **Status Switcher:**
     * **Completed (Check):** Marks habit as done on that date.
     * **Missed (X):** Marks habit as missed.
     * **Skipped / Rest Day (Pause icon):** Marks day as an approved rest day so the streak is not broken.
  3. **Miss Reason Picker:**
     * Displays selectable tags: *Sick, Busy, Traveling, Tired, Forgot, Low Energy, Other*.
     * Tapping a tag attaches the reason to that day's history record.
  4. **Substeps Checklist (if applicable):**
     * Checkboxes for each individual sub-step for that date.
  5. **"Mark as Vacation Day" Toggle:**
     * Tapping marks this single past day as a vacation day.
  6. **"View Notes" Button:**
     * Opens the notes list for this habit on this date.
* **Closing the sheet:** Swipe down or tap outside.

---

### 6.5 Vacation Mode Sheet
* **What it does:** Manages pause states and recurring rest days for a specific habit.
* **What's inside the sheet:**
  1. **Vacation Mode Toggle Switch:**
     * **Toggle ON:** Pauses the habit indefinitely. Streaks are frozen and will not reset even if days are skipped.
     * **Toggle OFF:** Unfreezes the habit and resumes normal scheduled expectations.
  2. **Weekly Rest Days (M, T, W, T, F, S, S):**
     * 7 selectable circular day chips.
     * Tapping a day chip toggles it as a permanent recurring rest day (e.g., selecting "Sunday" exempts every Sunday from streak requirements).

---

### 6.6 Reorder Mode
* **Trigger:** Activated via Habit Long-Press Menu -> "Reorder".
* **What changes on screen:**
  * Top bar shows a "Reorder Habits" title and a **"Done"** button.
  * Habit cards show drag handles.
  * Categories and filters are temporarily cleared so all habits can be arranged.
* **Interactions:**
  * **Dragging a card up or down:** Swaps positions live.
  * **Clicking "Done" (or pressing Android Back):** Exits reorder mode, saves the new custom order to disk, and restores category filters.

---

### 6.7 Habit Links Sheet (Android Automation)
* **What it does:** Generates deep-link URLs to trigger habit actions from outside the app (e.g. NFC tags, Tasker, custom widgets).
* **List of links displayed:**
  1. `streak://habit/<id>/done` — Checks off habit.
  2. `streak://habit/<id>/undo` — Unchecks habit.
  3. `streak://habit/<id>/add?amount=X` — Increments quantitative amount.
  4. `streak://habit/<id>/focus` — Launches a focus session for this habit.
  5. `streak://habit/<id>/open` — Opens this habit's details screen.
* **When clicking any link in the list:** Copies the URL to the clipboard and displays a *"Link copied to clipboard"* toast.

---

## 7. Quantitative Habits & Micro-Trackers

For habits tracking numeric targets (e.g., "Drink 2000 ml water", "Read 30 pages", "50 pushups"):

### 7.1 Plus (+) and Minus (-) Steppers
* **Clicking (+):** Adds the configured increment step (e.g. +250 ml) to today's logged total.
  * If the new total reaches the target: Triggers completion sound and checkmark animation.
* **Clicking (-):** Decreases the total by one step (cannot drop below 0).

---

### 7.2 Number Keypad Dialog (Direct Number Entry)
* **Trigger:** Tapping directly on the numeric progress text (e.g. "1250 / 2000 ml").
* **What pops up:** **Number Keypad Dialog**.
* **What's inside the popup:**
  1. Target title and current unit (e.g. "ml", "pages").
  2. Large numerical display showing current typed value.
  3. Number pad grid (0–9, decimal point, backspace).
  4. Quick increment buttons: `+1`, `+5`, `+10`, `+50`, `+100`.
  5. **Confirm Button:** Saves the exact typed value to today's log and closes dialog.
  6. **Cancel Button:** Discards input and closes dialog.

---

### 7.3 Multi-Step Checklists (Sub-steps)
* For habits broken into mini-steps (e.g. "Morning Routine: Meditate, Journal, Stretch"):
* **Clicking a sub-step checkbox:** Checks that specific item.
* **When all sub-steps are checked:** Automatically checks the parent habit as 100% complete.
* **Unchecking a sub-step:** Reverts parent habit to incomplete status.

---

## 8. Completed & Folded Habits Section

* **What it is:** At the bottom of the list, a collapsible header appears when habits are hidden (e.g. "3 Completed Habits" or "2 Other Days").
* **Clicking the Fold Header:**
  * **Toggles open:** Reveals the hidden habits below with full interactivity (can still be viewed or unchecked).
  * **Toggles closed:** Collapses them back to keep the viewport clean.
