# Habit Details Screen — Functional Specification & Interaction Flow

## 1. Overview
The **Habit Details Screen** (`HabitDetailsPage`) is the deep-dive view for an individual habit. It opens when a user taps any habit card on the Home screen or triggers a habit deep link (`streak://open?habit=<id>`).

It provides comprehensive analytics, activity heatmaps, streak milestones, interactive logging widgets, focus timer controls, daily checklists, miss-reason tracking, and social share card generation.

---

## 2. Top Bar Actions

### 2.1 Back / Close Button (X icon)
* **What it does:** Exits the Habit Details screen.
* **When clicked:** Closes the screen and returns to the previous view (Home or split-pane root).

---

### 2.2 Share Progress Button (Share icon)
* **What it does:** Opens the **Share Card Studio** to create and export social-ready image cards of the user's progress.
* **When clicked:** Opens the full-screen **Share Card Studio** modal.
* **What's inside the Share Card Studio:**
  1. **Time Range Selector (Week / Month / Year):**
     * Tapping switches the visual preview between a 7-day strip, a full month calendar grid, or a yearly contribution matrix.
  2. **Horizontal Swipeable Card Carousel:**
     * Swiping left or right generates share cards for past weeks, months, or years.
  3. **Card Preview Area:**
     * Displays habit name, date/period, completed activity grid, and streak stats (Current Streak, Best Streak, Total Checks).
  4. **Studio Toolbar Controls:**
     * **Color Picker Button:** Opens a color selector to change border, text, and glyph accents on the image card.
     * **Photo Background Button:** Opens the device photo library to set any image as the card's background. A **Clear** button appears to remove the photo.
     * **Blur Slider (Droplet icon):** Adjusts background image blur radius from 0px (sharp) to 24px (frosted glass).
     * **Stats Toggle Button:** Toggles the bottom statistics footer (Current/Best/Total) on or off.
  5. **"Share Image" Button:**
     * Generates a high-resolution 3x PNG image and launches the device's native OS Share Sheet (AirDrop, WhatsApp, Instagram, Telegram, Save to Files, etc.).
  6. **"Save Image" Button:**
     * Renders the image directly to the device's Photo Gallery into a dedicated album named *"Streak"*, displaying a *"Saved to Photos"* toast.
  7. **Close Button (X):** Discards changes and returns to Habit Details.

---

### 2.3 Edit Habit Button (Pencil icon)
* **What it does:** Edits the habit's configuration.
* **When clicked:** Opens the **Habit Creation & Edit Form** (`HabitFormPage`) pre-filled with this habit's current name, icon, color, category, schedule, reminders, and substeps.
* **When saved:** Updates the habit across the app and returns to this refreshed details screen.

---

## 3. Habit Identity & Information

* **Header Elements:**
  * **Habit Glyph Icon:** Displayed in the habit's custom accent color.
  * **Habit Title:** Large bold display name.
  * **Habit Description:** Optional subtitle explaining why the habit is practiced.
  * **Category Chip:** Tapping filters home list to this category upon return.
  * **Schedule Frequency Chip:** Shows current routine (e.g. *"Daily"*, *"Mon, Wed, Fri"*, *"3 times a week"*, or *"Every 2 days"*).

---

## 4. Focus Timer Integration (Timer Tile)

*Appears when Focus tracking is enabled in app settings.*

* **What it shows:**
  * Total lifetime focus hours logged for this habit, hours logged this week, and hours logged today.
  * A 7-day mini bar graph showing focus duration for each of the last 7 days.
* **Quick-Start Preset Buttons (e.g. [15m], [25m], [45m]):**
  * Tapping any preset button immediately launches a focus timer set to that exact number of minutes with this habit pre-selected.
* **Play / Start Button:**
  * **If a timer is already active:** Navigates directly into the live **Focus Timer Screen**.
  * **If no timer is running:** Starts a new session configured with this habit's default target duration and break duration.
* **Long-Pressing the Focus Tile:**
  * Opens the **Focus Habit Options Bottom Sheet**:
    1. **"Focus Defaults" Option:**
       * Opens the **Focus Defaults Sheet** to configure default focus minutes (e.g. 25 min) and break minutes (e.g. 5 min) specifically for this habit.
       * Clicking Save stores the defaults; Cancel dismisses.
    2. **"Clear Today's Focus" Option:**
       * Pops up a confirmation dialog: *"Clear Today's Focus Sessions?"*.
       * **Confirming Clear:** Deletes today's focus records for this habit and rolls back completion status.
       * **Canceling:** Closes dialog without changes.

---

## 5. Interactive Quantitative Progress (Numeric Habits)

*Appears for habits tracking quantifiable numbers (water, pages, pushups, minutes).*

### 5.1 Stepper Controls & Continuous Press
* **(-) Minus Button:**
  * **Single Tap:** Decreases today's logged total by one step (e.g. -250 ml).
  * **Press & Hold:** Rapidly decreases the count with accelerating auto-repeat.
* **(+) Plus Button:**
  * **Single Tap:** Increases today's total by one step (e.g. +250 ml).
  * **Press & Hold:** Rapidly increments the count with accelerating auto-repeat.
  * If increment reaches the daily goal: Triggers completion sound and checkmark animation.

---

### 5.2 Direct Number Keypad Entry
* **Trigger:** Tapping directly on the numeric text (e.g. *"1,750 / 2,000 ml"*) or the small pencil icon.
* **What pops up:** **Number Keypad Dialog**.
* **What's inside the popup:**
  * Number display showing current value and unit.
  * Full 0–9 keypad with decimal point and backspace.
  * Quick jump buttons (`+1`, `+5`, `+10`, `+50`, `+100`).
  * **Confirm Button:** Commits the typed value to today's progress and closes dialog.
  * **Cancel Button:** Discards typed input.

---

### 5.3 Specialized Micro-Visualizers
1. **Water Tracker (Cup Grid):**
   * Displays 10 animated water cups.
   * Tapping any cup fills all cups up to that level and recalculates today's total milliliters.
2. **Reading Books Tracker:**
   * Displays 3D book artwork with liquid fill and page ribbon showing current page vs total pages.
   * **"New Book" Button:**
     * Archives current book cycle to reading history.
     * Opens a dialog asking for the new book's total pages.
     * Resets page counter to 0 for the fresh book volume.
   * **Camera Icon on Book Jacket:**
     * Opens device image picker to upload a real cover photo for the book jacket.
3. **Daily Bar Chart (`QuantDailyBars`):**
   * Displays daily intake bars for the past 7 days against a horizontal target line.
   * **"View Full Stats" Link:** Opens the dedicated **Quantitative Statistics Screen** (`QuantStatsPage`) showing daily, weekly, and monthly bar breakdowns.

---

## 6. Today's Checklist (Sub-step Habits)

*Appears when a habit has sub-tasks configured (e.g. "Morning Routine: Hydrate, Stretch, Meditate").*

* **Checklist Rows:**
  * Displays each substep with its individual checkbox.
  * **Clicking any checkbox:** Checks or unchecks that specific sub-step for today.
  * **Auto-completion logic:**
    * When all required sub-steps are checked, the parent habit automatically marks itself complete for today.
    * Unchecking a sub-step reverts the parent habit to incomplete.

---

## 7. Streak Milestones & Second Chances

### 7.1 Streak KPI Cards
* **Current Streak Card (Flame icon):** Displays consecutive active streak count.
* **Best Streak Card (Trophy icon):** Displays personal all-time longest streak record.
* **Period Total Card:** Displays total checks completed during the active time period (Week, Month, or Year).
* **Completion Rate Card:** Displays percentage consistency score over the past 30 days.

---

### 7.2 Second Chances Card ("Streak Freeze")
* *Protects positive habits from breaking on occasional accidental misses.*
* **What it shows:**
  * Heart icons representing saved chances (up to 3 hearts).
  * Status text: *"2 chances left"* or *"Next chance in 8 days"*.
  * Saved record text: *"Streak saved on Oct 14"*.
* **When clicked:** Opens the **Second Chances Information Dialog**.
  * Explains that you earn 1 second chance for every 30 consecutive streak days (capped at 3).
  * Explains that if you miss a single scheduled day, a second chance heart is automatically consumed to protect your streak.
  * **"Got it" Button:** Dismisses the dialog.

---

## 8. Activity Calendar & Heatmaps

Users can switch between **Week**, **Month**, and **Year** views using segmented tabs at the top of the activity section.

### 8.1 Monthly Calendar View
* **Month Navigation (`<` and `>` arrows):** Moves backward or forward by one month (future months beyond current date are disabled).
* **Weekday Headers:** Monday through Sunday (or Sunday first, based on user settings).
* **Calendar Day Cells:**
  * **Visual States:**
    * *Solid Accent Color:* Habit completed.
    * *Color Gradient Fill:* Partial quantitative progress logged.
    * *Red Cell:* Relapse logged (negative habit).
    * *Blue Cell:* Vacation or designated rest day.
    * *Ring Outline:* Current day indicator.
    * *Small Indicator Dots:* Blue, amber, or green dots indicating attached notes.
* **Clicking a Day Cell:**
  * **If clicking Today:** Toggles completion status.
  * **If clicking a Past Day (with `pastFirst` setting ON):** Opens the **Day Actions Sheet** (Section 9).
  * **If clicking a Past Day (with `pastFirst` setting OFF):** Toggles check status directly and displays an undo snackbar: *"Checked in for Oct 12"* with an **"Undo"** button.
* **Long-Pressing Any Day Cell:** Opens the **Day Actions Sheet** (Section 9).

---

### 8.2 Year Contribution Matrix (GitHub-style Heatmap)
* Displays a 52-week horizontal matrix of squares.
* Scrolls horizontally across the full year, automatically centering on today's week.
* Squares light up in graduated color intensities reflecting completion or quantitative levels.
* Tapping any cell opens the **Day Actions Sheet** for that historical date.

---

## 9. Day Actions Sheet (Context Menu for Any Date)

*Triggered by long-pressing any calendar cell, or single-tapping past days.*

* **Header:** Displays the full selected date (e.g., *"Monday, October 14, 2026"*).
* **1. Day Completion Status:**
  * For positive habits: Large interactive check toggle.
  * For negative habits: Relapse stepper `(- / +)` and money spent input.
  * For quantitative habits: Progress bar, `(- / +)` stepper buttons, and tap-to-type numeric field.
* **2. Miss Reason Picker (shown if day was missed):**
  * Displays quick selectable chips: *Overslept, Busy, Traveling, Sick, Tired, Forgot*.
  * Tapping a chip attaches that reason to the date's history record.
  * **"+ Other" Chip:** Reveals an inline text field to type a custom excuse.
* **3. Substeps Checklist:**
  * Allows checking or unchecking individual sub-steps for that past date.
* **4. Single-Day Vacation Toggle ("Vacation Day Off / On"):**
  * Clicking toggles this single past day as an excused rest day so it doesn't count against streaks.
* **5. "View Notes" Action:**
  * Shows note count badge if notes exist.
  * Clicking opens the **Notes List** for that date.
* **6. "Add Note" Action:**
  * Clicking opens the **Note Editor Screen** to write thoughts or attach photos for this date.
* **Closing the sheet:** Swipe down or tap outside.

---

## 10. Check History & Completion Retiming

* **Check History Tile:** Summarizes the most recent check-in (e.g. *"Today at 2:30 PM"* or *"Yesterday"*).
* **When clicked:** Opens the **Check History Bottom Sheet**.
* **What's inside the Check History Sheet:**
  1. **Chronological Log:** Scrollable timeline of every recorded completion date.
  2. **Multi-Check Groups:** Days with multiple completions show a badge (e.g. *"3 checks"*) and an expandable dropdown showing individual timestamps.
  3. **Retiming Completion Time (Pencil icon / Timestamp pill):**
     * Tapping any recorded time pill opens the **Native Time Picker Dialog** (`pickTime`).
     * User can select a new hour and minute, then tap **OK**.
     * The completion log updates immediately with the adjusted timestamp.
  4. **Note Previews:** Shows text snippets of any notes attached to that day's check-in.

---

## 11. Miss Reasons Accountability Section

* **Miss Reasons Tile:** Displays summary of the top 3 excuses for this habit (e.g. *"Busy 4 · Tired 2 · Traveling 1"*).
* **When clicked:** Opens the **Miss Reasons Breakdown Sheet**.
  * Shows total missed days count.
  * Displays an itemized list of all recorded reasons with proportional percentage bar charts.

---

## 12. Vacation Mode & Rest Days Tile

* **Vacation Tile:** Displays current status (*"Off"*, *"Paused"*, or scheduled rest days like *"Sat, Sun"*).
* **When clicked:** Opens the **Vacation Sheet**.
* **What's inside the sheet:**
  1. **Vacation Mode Switch:**
     * **Toggle ON:** Pauses the habit indefinitely. Streaks are frozen; uncompleted days will not reset streaks.
     * **Toggle OFF:** Unfreezes the habit and returns to standard schedule expectations.
  2. **Weekly Rest Days Chips (M, T, W, T, F, S, S):**
     * Tapping any weekday chip designates it as a permanent recurring rest day (e.g., selecting Sunday exempts every Sunday from check-in requirements).

---

## 13. Avoid / Negative Habit Ledger ("Quit Habits")

*Appears for negative habits (e.g. Quit Smoking, Zero Alcohol).*

* **Behavior:** Days remain clean automatically. Logging only occurs when a relapse happens.
* **1. "Log Relapse" Button:**
  * Opens the **Log Relapse Dialog**.
  * Displays confirmation warning: *"Log Relapse for [Habit Name]?"*.
  * If financial tracking is enabled: Shows editable "Money Spent" card. Tapping opens the Number Keypad to type money lost.
  * **Clicking "Log Relapse" (Red button):** Resets active clean streak to 0, records financial loss, and closes dialog.
  * **Clicking "Cancel":** Closes dialog without changes.
* **2. Avoid Month Ledger:**
  * Shows monthly breakdown: Clean Days, Relapse count, Money Saved, Money Spent, and Net Balance.
  * Itemized list of all relapse dates and amounts.
* **3. Currency Selector:**
  * Tapping currency symbol opens the **Currency Sheet** to pick standard symbols (`$`, `€`, `£`, `¥`, etc.) or type a custom currency code via dialog.

---

## 14. Photo Journey & Visual Notes

* **Journey Photo Strip:** Displays a horizontal preview carousel of photo thumbnails attached to habit check-in notes.
* **When clicking any photo thumbnail:** Opens the full-screen interactive **Photo Viewer**:
  * Supports pinch-to-zoom and swipe between photos.
  * Displays note date and text caption.
  * Trash button allows deleting the photo attachment with confirmation.
* **"View All Notes" Button:** Opens the **All Notes Page** filtered to this habit.
* **"+ Add Note" Button:** Opens the **Note Editor Page** to compose a new reflection and take/pick photos.

---

## 15. Habit Automation Deep Links

* **Trigger:** Available from long-press menu or settings -> "Habit Links".
* **What it does:** Displays copyable URL schemes for external automation (NFC tags, iOS Shortcuts, Tasker):
  * `streak://habit/<id>/done` — Checks off habit.
  * `streak://habit/<id>/undo` — Clears today's check.
  * `streak://habit/<id>/add?amount=X` — Adds quantitative progress.
  * `streak://habit/<id>/focus` — Launches a focus session.
  * `streak://habit/<id>/open` — Opens this Habit Details screen.
* **Clicking any link:** Copies the URL to the clipboard with a *"Copied"* toast.
