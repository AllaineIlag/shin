# Habit Creation & Edit Form — Functional Specification & Interaction Flow

## 1. Overview
The **Habit Creation & Edit Form** (`HabitFormPage`) is the full-screen wizard used to create new habits, modify existing habits, or clone from templates.

It dynamically adapts based on:
1. **Mode:** New Habit, Edit Habit (type locked), or Duplicate from Template.
2. **Habit Kind:** Positive (Yes/No), Negative (Avoidance / Breaking Habits), or Quantitative (Measurable Targets).
3. **Active Settings:** Day planning time blocks, focus timers, step tracking, and difficulty tiers.

---

## 2. Top Bar Actions

### 2.1 Cancel / Close Button (X icon)
* **What it does:** Attempts to exit the form.
* **If no fields were modified:** Closes the form immediately and returns to the previous screen.
* **If any fields were changed (Dirty State):** Pops up the **Discard Changes Confirmation Dialog**.
  * **Title:** *"Discard changes?"*
  * **Message:** *"You have unsaved changes. Are you sure you want to discard them?"*
  * **Clicking "Discard" (Red button):** Destroys unsaved edits and exits the form.
  * **Clicking "Keep Editing":** Closes the dialog and stays in the form.

---

### 2.2 Archive Habit Button (Archive box icon)
* *Only visible when editing an existing habit.*
* **When clicked:** Opens the **Archive Confirmation Dialog**.
  * **Title:** *"Archive Habit?"*
  * **Message:** *"Are you sure you want to archive [Habit Name]? You can restore it later in Settings."*
  * **Clicking "Archive":** Removes the habit from active routines, moves it to archives, and returns to the Home screen.
  * **Clicking "Cancel":** Closes dialog without archiving.

---

### 2.3 Save Button ("Save" text or checkmark)
* **What it does:** Runs form validation and commits the habit to the database.
* **Validation Pipeline:**
  1. **Name Check:** If Habit Name is empty, automatically scrolls to top, highlights the name field in red, and focuses keyboard.
  2. **Unit Label Check:** If Quantitative kind is selected (and not Time), verifies unit label is filled. If blank, scrolls to and focuses unit field.
  3. **Weekday Check:** If Specific Weekdays schedule is chosen, verifies at least one day is selected. If empty, scrolls down and shows warning: *"Pick at least one day"*.
* **If validation passes:**
  * Saves habit and recalculates all local notifications.
  * If health step tracking is selected: Triggers background health sync.
  * Closes form and returns to previous screen.

---

## 3. Habit Name & Description

### 3.1 Habit Name Input Field
* Single-line text input with automatic sentence capitalization.
* Placeholder: *"e.g. Morning Meditation"*, *"Read a Book"*, *"Drink Water"*.

### 3.2 Habit Description Input Field
* Optional multi-line text input.
* Placeholder: *"Add notes, motivation, or instructions..."*.
* Used for tracking rules, why the habit matters, or personal affirmations.

---

## 4. Visual Identity: Icon, Emoji & Color Pickers

### 4.1 Hero Icon Preview
* Large squircle icon box displaying current glyph and theme color.
* **Tapping the Hero Icon:** Automatically scrolls down and expands the **Icon & Emoji Picker**.

---

### 4.2 Icon & Emoji Picker System
A 3-tab visual selector:

1. **Tab 1: Vector Icons (Lucide Icons):**
   * Categorized into 11 horizontal filter chips: *Fitness, Study, Home, Mind, Food, Work, Social, Finance, Nature, Tech, Art*.
   * Grid of vector glyphs. Tapping any icon selects it and updates the preview live.
2. **Tab 2: Curated Emojis:**
   * Grid of emojis grouped into the same 11 thematic categories.
   * Tapping an emoji assigns it as the habit's primary visual badge.
3. **Tab 3: Custom Emoji Field:**
   * Displays an interactive text box where the user can type or paste any emoji from their device keyboard.
   * Automatically isolates the last valid emoji character and assigns it.

---

### 4.3 Color Palette & Custom Hue Ring
* **Preset Color Swatches:** Grid of 16 to 24 curated habit colors.
  * Tapping a swatch selects that color and displays a contrast-safe checkmark.
* **"Custom" Tab (Hue Ring Picker):**
  * Displays a 360-degree circular color hue wheel.
  * Dragging the slider allows picking any exact custom color.

---

### 4.4 Cover Image & Clarity Slider
* **"Add Image" Button:** Opens the device photo library to choose a cover image for the habit.
* **Once an image is selected:**
  * Displays an image preview card with two buttons:
    * **"Edit" Chip:** Opens photo library to replace the image.
    * **"Delete" Chip:** Removes the cover photo.
  * **Clarity Slider (10% to 100%):**
    * Controls background blur (10% = frosted glass blur, 100% = clear photo).

---

## 5. Habit Kind (Type) Selection

*Note: Locked when editing an existing habit to preserve data integrity.*

Users pick between 3 archetypes:
* **Positive (Yes / No):** Binary completion (did you do it or not).
* **Negative (Avoidance):** Breaking a vice or addiction (tracking clean days).
* **Quantitative:** Measurable numeric goals (water, pages, pushups, minutes).

---

## 6. Positive Habit Options (Kind 1)

### 6.1 Multi-Step Checklist (Substeps)
* Ideal for routines broken into smaller tasks (e.g. "Morning Routine: Meditate, Stretch, Journal").
* **Substep Rows:**
  * Drag handle icon to reorder steps.
  * Text box to edit step title.
  * Trash icon to delete step.
* **"+ Add Step" Button:** Adds a new checklist row.
* **"Complete Any Step" Toggle Switch (`anySteps`):**
  * **Toggle OFF:** Every single sub-step must be checked to complete the habit.
  * **Toggle ON:** Displays numeric choice chips (1, 2, 3...) to set a required quota (e.g. "Complete any 2 of 4 steps").

---

### 6.2 Focus Timer Mode Toggle (`focusOnly`)
* Converts the habit into a timed focus session (hides standard checklists).
* **Target Duration Chips:**
  * Quick chips: `25 min`, `45 min`.
  * Pencil icon opens Number Keypad Dialog to set custom minutes.
  * **Infinity Icon (Flowtime Mode):** Sets open-ended stopwatch timer without a countdown limit.
* **Pomodoro Break Card:**
  * Break duration chips: `5 min`, `15 min`, or custom.

---

### 6.3 Lifetime Milestone Goal Field
* Optional cumulative goal (e.g. "Complete 100 times total").
* Tapping opens the **Number Keypad Dialog** to enter target number.

---

## 7. Negative Habit Options (Kind 2 — Quit Habits)

*Cadence is automatically locked to Daily because sobriety streaks depend on consecutive clean days.*

### 7.1 "Avoid Since" Starting Date Row
* Tapping opens the **Native Date Picker Dialog**.
* Allows backdating up to 30 years in the past to reflect pre-existing sobriety milestones.

---

### 7.2 Daily Financial Cost Field
* Numerical text field to enter the estimated daily money wasted on this vice (e.g. $15/day for smoking).
* **Tapping Currency Badge:** Opens the **Currency Selector Sheet** to select currency symbol (`$`, `€`, `£`, `¥`, etc.) or input a custom code.

---

### 7.3 Avoid Extras
* **"Track Money Spent on Relapses" Toggle:**
  * When ON: Every time the user logs a relapse on Home, it prompts for the financial cost lost.
* **Clean Milestone Goal Chips:**
  * Preset milestone chips: `7 days`, `14 days`, `30 days`, `60 days`, `90 days`, or "Custom" (opens keypad to enter any number of clean days).

---

## 8. Quantitative Habit Options (Kind 3 — Numeric Targets)

### 8.1 Built-in Presets Grid
Tapping a preset instantly configures icons, units, targets, and step amounts:
1. **Water:** Auto-sets unit to `ml`, goal to `2000 ml`, step to `250 ml`, and enables animated Water Cup graphic.
2. **Reading:** Auto-sets unit to `pages`, goal to `20 pages`, step to `1 page`, and enables 3D Book graphic.
   * **Book Cover Picker:** Uploads custom book jacket image.
   * **Total Pages Field:** Tapping opens keypad to enter book length (e.g. 350 pages).
3. **Time / Duration:** Auto-locks unit to `min`, goal to `30 min`, step to `5 min`, and enables Stopwatch dial.
4. **Health Steps:** Auto-sets unit to `steps`, goal to `10,000 steps`, step to `1,000 steps`, and footprint graphic.
   * Prompts for Apple Health / Google Fit permissions.
5. **Generic:** Custom unit text input (`unitLabel`, e.g. km, cups, pushups), goal to `8`, step to `1`.

---

### 8.2 Stepper Rows & Direct Keypad
* **(-) and (+) Stepper Buttons:** Single tap increments/decrements; press and hold auto-repeats.
* **Tapping the Underlined Value:** Opens the **Number Keypad Dialog** for direct typing.

---

### 8.3 Flexible Goal Rules
* **"No Goal" Toggle:** Open-ended daily tracking without target or ceiling.
* **"At Most / Limit" Toggle:** For consumption caps (e.g. "Drink at most 2 coffees"). Day succeeds if logged amount is $\le$ target.
* **"Any Amount" Toggle:** Logging any non-zero value marks the habit done.
* **"Lifetime Total Goal" Field:** Long-term milestone (e.g. "Read 5,000 pages total").

---

## 9. Scheduling & Recurrence Engine

### 9.1 Schedule Type Selector
* **Daily:** Scheduled every calendar day.
* **Weekly Frequency:** Stepper row (1 to 6 times per week). User completes on any days.
* **Monthly Frequency:** Stepper row (1 to 25 times per month).
* **Specific Weekdays:** 7 circular weekday chips (M, T, W, T, F, S, S). Validates that at least 1 day is chosen.
* **Interval (Every X Days):** Stepper (every 2 to 90 days) anchored to start date.
* **Interval (Every X Weeks):** Stepper (every 1 to 26 weeks).
* **Interval (Every X Months):** Stepper (every 1 to 24 months).

---

### 9.2 Advanced Interval Toggles
* **"From Last Done" Toggle (for interval schedules):**
  * When ON: Due date recalculates dynamically from the date last completed (e.g. "Water plants 4 days after last watering"), preventing artificial overdue tasks.
* **"Month Weekday Rule" Toggle (for monthly intervals):**
  * Anchors schedule to an ordinal day (e.g. "First Monday of the month") rather than a numeric date.
* **Start Date Picker Row:** Tapping opens calendar date picker to anchor intervals.

---

## 10. Day Planning & Habit Time Fields

*Visible when Day Planning is enabled in settings.*

1. **"Scheduled Time" Field:**
   * Tapping opens the **Time Picker Dialog** (`pickTime`) to select planned hour and minute.
   * **(X) Clear Button:** Unlinks scheduled time, returning habit to anytime status.
2. **"Duration" Field:**
   * Preset chips: `15 min`, `30 min`, `60 min`.
   * Tapping duration value opens the **Duration Bottom Sheet**:
     * Hour stepper (0–23h) and minute stepper (0–55m in 5m steps) with quick preset chips (15m, 30m, 45m, 1h, 1.5h, 2h).
3. **"+ Add Another Time" Button:**
   * Adds recurring daily sessions (e.g. medication at 08:00, 14:00, and 20:00).
   * Each added row has its own time picker, duration selector, and delete trash icon.

---

## 11. Reminders & Push Notifications

### 11.1 Reminder Tiles List
* Displays all active notification alerts for this habit.
* Tapping any tile opens the **Reminder Editor Bottom Sheet**.

---

### 11.2 Reminder Editor Bottom Sheet
* **Trigger:** Tapping "+ Add Reminder" or an existing reminder tile.
* **What's inside the sheet:**
  1. **Recurrence Selector:**
     * **Weekly Days Mode:** Preset chips ("Every day", "Weekdays", "Weekends") or individual M-T-W-T-F-S-S day chips.
     * **Interval Mode:** Repeats every N days.
     * **"Follows Habit Schedule" Toggle:** Automatically matches the habit's calculated interval days.
  2. **Alert Time Picker:** Tapping opens the Time Picker to choose hour and minute.
  3. **"Repeat During Day" Selector:**
     * Chips: `Off`, `Every 1 hour`, `2 hours`, `3 hours`, `4 hours`, or "Custom" (opens hour/minute repeat dialog).
     * **"Repeat Until" Cutoff:** Sets end-of-day cutoff time (e.g. stop repeating after 10:00 PM).
  4. **"Snooze Duration" Selector:**
     * Preset chips: `5 min`, `10 min`, `15 min`, or "Custom" (opens dialog for 1 to 720 minutes).
  5. **"Custom Notification Message" Field:** Text field to write custom reminder copy (e.g. *"Time for your morning stretch!"*).
  6. **"Save Reminder" Button:** Validates, schedules notification with OS, and closes sheet.
  7. **"Delete Reminder" Button (if editing):** Removes reminder and closes sheet.

---

### 11.3 Custom Reminder Sounds
* Tapping the **"Reminder Sound"** row opens the **Sound Selection Bottom Sheet**.
* Displays a list of available system notification sounds and alarm tones.
* **Tapping any sound:** Immediately plays an audio preview.
* **Tapping a sound's checkmark:** Saves it as the notification sound for this habit and closes sheet.

---

## 12. Organization: Categories & Difficulty

### 12.1 Category Picker
* Displays horizontal category chips. Tapping assigns a category; tapping again unassigns.
* **"+ Add Category" Button:** Opens the **Category Editor Sheet** (name, color swatches, icon grid).
* **Long-pressing any Category Chip:** Opens category action menu:
  * **"Edit":** Opens Category Editor Sheet.
  * **"Reorder":** Opens Category Reorder Sheet with drag handles.
  * **"Delete":** Confirmation dialog to delete category.

---

### 12.2 Habit Difficulty Tiers
*When enabled in settings:*
* 3-tier selector: **Easy** (Feather icon), **Medium** (Gauge icon), **Hard** (Mountain icon).
* Assigns difficulty weighting to the habit for daily progress ring calculations.

---

### 12.3 "Just Tracking" Mode Toggle
* When turned ON: Disables streaks, missed-day penalties, and failure states.
* Used for low-pressure tracking (e.g. symptom logs, daily caffeine intake).
