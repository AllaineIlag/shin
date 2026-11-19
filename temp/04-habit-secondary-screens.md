# Habit Secondary Screens — Functional Specification & Interaction Flow

## 1. Overview
This document covers the secondary screens, sub-views, and specialized feature pages linked from habits:
1. **Quantitative Stats Page** (`QuantStatsPage`)
2. **All Notes Feed** (`AllNotesPage`)
3. **Habit Day Notes Page** (`NotesPage`)
4. **Note Editor Page** (`NoteEditorPage`)
5. **Photo Deck & Full-screen Photo Viewer** (`PhotoViewer`)
6. **Journey Photo Album Page** (`JourneyPage`)
7. **Day Timeline Page** (`DayTimelinePage`)
8. **Health Steps Integration Page** (`HealthInfoPage`)

---

## 2. Quantitative Stats Page

* **Screen Purpose:** In-depth analytics dashboard for habits tracking measurable quantities (e.g. water in ml, reading in pages, workouts in minutes).
* **Entry Points:** Tapping the "Statistics" link pill (`QuantStatsLink`) or the daily bar chart on the Habit Details screen.

### 2.1 Top Bar
* **Back Button (Chevron):** Returns to Habit Details.
* **Title:** Habit Name.

---

### 2.2 Volume & Consistency Metrics Grid
Displays four 2-column metric cards:
1. **Today & Week:**
   * **Today:** Amount logged today vs daily target.
   * **Week:** Total volume logged across the current calendar week.
2. **Month & Total:**
   * **Month:** Total volume logged across the current calendar month.
   * **Total:** All-time cumulative sum of all logged quantities since habit creation.
3. **Days Logged & Daily Average:**
   * **Days Logged:** Total number of calendar days on which progress was logged ($> 0$).
   * **Average per day:** Total volume divided by total logged days.
4. **Best Day & Goal Reached:**
   * **Best Day:** Highest single-day volume record.
   * **Goal Reached:** Total number of days where the daily target was fully satisfied ($100\%+$).

---

### 2.3 Interactive Range Bar Chart
* **Header:** "Amount per day" with chart icon.
* **Period Tabs (Week / Month / Year):**
  * **Week Tab:** 7 vertical bars (Monday–Sunday) with single-letter day labels.
  * **Month Tab:** 28–31 daily bars with day numbers marked every 5 days (1, 5, 10, 15, 20, 25, 30).
  * **Year Tab:** 12 monthly volume bars (Jan through Dec).
* **Target Line:** Dotted horizontal line indicating the daily goal threshold (omitted in Year view).
* **Interactions:**
  * **Touching any bar:** Displays a popup tooltip showing the exact date and numeric value with unit label.

---

### 2.4 Book Reading Card (Reading Habits)
* *Visible when habit tracks book progress.*
* **Progress Ring:** Shows current page vs total pages with percentage.
* **Reading Summary:** Displays reading frequency ("First read", "Read once", "Read 3 times").
* **History List:** Chronological log of finished books:
  * Checkmark badge for completed books; number badge for active book.
  * Date span: "Since Oct 1" or "Oct 1 → Oct 24 (23 days)".
* **"+ New Book" Button:**
  * Opens the **Book Pages Keypad Dialog**.
  * User enters total pages for the new volume and taps **Confirm**.
  * Current page resets to 0, old book moves into completed reading history, and new tracking cycle begins.

---

### 2.5 Avoidance & Relapse Summary (Negative / Quit Habits)
* *Visible for negative habits.*
* **Month Navigation Bar (`<` and `>` arrows):** Shifts between calendar months.
* **Monthly Summary Cards:**
  * **Clean Days:** Total days without relapse in the month.
  * **Relapses:** Number of logged slip-ups.
  * **Money Saved:** Daily cost $\times$ Clean days (green).
  * **Money Spent:** Total expenses logged on relapses (red).
  * **Avoid Balance:** Net savings (Saved minus Spent).
* **Itemized Relapse Expense Log:** Displays each relapse date with exact money wasted.
* **Monthly Relapse Bar Chart:** Shows relapse frequency across past months with an average line. Tapping any bar jumps directly to that month's breakdown.

---

## 3. All Notes Feed (`AllNotesPage`)

* **Screen Purpose:** Global search engine and chronological stream of all reflections, plans, and photos recorded across all habits.
* **Entry Point:** Tapping the Notes shortcut icon on the Home screen.

### 3.1 Top Bar & Search
* **Back Button:** Returns to Home.
* **Title:** "All notes" with counter badge showing total matching notes (e.g. "18 notes").
* **Search Input Field ("Search notes..."):**
  * Typing filters notes in real time by searching both note text and habit names simultaneously.
  * Clearing field restores full chronological feed.

---

### 3.2 Habit Filter Strip
* *Appears when 2 or more habits contain notes.*
* Horizontal scrollable chips of habit names.
* Tapping a habit chip isolates notes strictly to that habit; tapping "All" resets the filter.

---

### 3.3 Grouped Notes Feed
* Notes are grouped chronologically with sticky day headers ("Today", "Yesterday", "October 14, 2026").
* **Tapping any Note Card:** Opens that specific habit's **Day Notes Page** (`NotesPage`).

---

## 4. Habit Day Notes Page (`NotesPage`)

* **Screen Purpose:** Manages notes attached to an individual habit on a specific date.
* **Entry Points:** Tapping a note card in All Notes, tapping "View Notes" in Day Actions Sheet, or tapping notes previews on the Day Timeline.

### 4.1 Screen Header
* Back button.
* Formatted selected date headline (e.g. "Wednesday, November 18, 2026") and note counter.
* **"+" Button:** Opens the **Note Editor Page** to add a new note for this date.

---

### 4.2 Note Cards List
Each note is displayed with:
* **Color Dot Indicator:** Blue (Note), Amber (Planned), or Green (Completed).
* **Timestamp / Tag:** Formatted time (e.g. "08:30 AM") or "Tomorrow" tag for future plans.
* **Type Badge:** "Note", "Planned", or "Completed".
* **Text Body:** Bold first paragraph; muted body text for subsequent paragraphs.
* **Photo Deck:** Visual thumbnail stack of attached photos (if any).
* **Menu Button (3 vertical dots icon):**
  * Opens the **Note Context Actions Bottom Sheet**:
    1. **"Edit Note" (Pencil icon):** Opens the Note Editor pre-filled with this note's text, photos, and time.
    2. **"Delete Note" (Trash icon — Red danger button):**
       * Opens the **Delete Note Confirmation Dialog**.
       * Title: *"Delete note?"*.
       * **Confirming Delete:** Deletes the note and removes any attached local image files from disk.
       * **Canceling:** Closes dialog.

---

### 4.3 Bottom "+ Add Note" Action Bar
* Full-width button reading **"+ Add note"**.
* Clicking opens the **Note Editor Page** pre-anchored to this habit and date.

---

## 5. Note Editor Page (`NoteEditorPage`)

* **Screen Purpose:** Compose a new reflection or modify an existing note.

### 5.1 Top Bar
* **Title:** "Add note" or "Edit note".
* **Cancel Button (X):** Discards unsaved edits and exits.
* **Save Button ("Save" text or checkmark):**
  * Validates that text area is not empty.
  * Saves note to database and exits editor.

---

### 5.2 Note Type Selector (Pill Chips)
User selects the semantic intent:
* **Note (Blue):** General reflection or observation.
* **Planned (Amber):** Intention or preparation for an upcoming habit session.
* **Completed (Green):** Wrap-up notes and accomplishments.

---

### 5.3 Text Editor
* Multi-line input area (up to 5 lines visible, 500 characters max).
* Autofocuses keyboard on open.
* Displays live character counter in the bottom-right corner (`${count}/500`).

---

### 5.4 Photo Attachments
* **Camera Button:** Launches native camera to take a new picture. Captured photo automatically saves to the note.
* **Gallery Button:** Opens device photo library to select an existing picture.
* **Attached Photo Deck Preview:**
  * Displays thumbnail stack of attached images.
  * Each thumbnail has an **(X)** button to remove the photo.
  * Tapping the thumbnail opens the **Full-screen Photo Viewer**.

---

### 5.5 Optional Time Tag
* Clock icon row displaying current selected time.
* **Tapping the Time Row:** Opens the **Time Picker Dialog** (`pickTime`) to set a specific time of day.
* **(X) Clear Button:** Removes the time tag.

---

## 6. Photo Deck & Full-Screen Photo Viewer

### 6.1 Photo Deck Widget (Card Stack)
* Displays 1 to 3+ photos in an overlapping physical card stack with realistic drop shadows and subtle rotation.
* **Horizontal Swipe:** Flips through photos in the stack.
* **Tapping top card:** Opens the full-screen photo viewer.

---

### 6.2 Full-Screen Photo Viewer (`PhotoViewer`)
* **Immersive dark screen:**
  * **Pinch-to-zoom:** Interactive zoom up to $4\times$ magnification.
  * **Horizontal Swipe:** Paging between all photos in the note.
* **Top Bar:** Close (X) button and photo counter (e.g. "2 / 5").
* **Bottom Overlay:** Semi-transparent panel displaying note date and full reflection text.

---

## 7. Journey Page (Photo Album Timeline)

* **Screen Purpose:** Visual photo gallery showcasing all photos attached to habit notes for a single habit.
* **Entry Point:** Tapping the Journey photo strip on the Habit Details screen.

### 7.1 Layout & Content
* **Top Bar:** Back button, title "Journey", and total photo counter.
* **Photo Grid:** 3-column square grid of all historical photo notes sorted chronologically.
* **Tapping any Thumbnail:** Opens the **Full-screen Photo Viewer** starting at that photo.
* **Empty State:** If no photos exist, shows a camera icon, "No photos yet", and instructions: *"Add a photo to a note and it shows up here."*

---

## 8. Day Timeline Page (`DayTimelinePage`)

* **Screen Purpose:** An integrated chronological minute-by-minute daily schedule combining scheduled habits, time-blocked to-dos, anytime habits, and unscheduled to-dos.
* **Entry Point:** Tapping the Day Planner shortcut or opening from the navigation menu.

### 8.1 Top Bar & Navigation
* **Month/Year Title:** Displays current calendar month (e.g. "November 2026").
* **"+ New To-do" Button (List Plus icon):** Opens the To-do Editor pre-dated to the active timeline date.
* **"Jump to Today" Button (Calendar Check icon):** Appears when viewing any date other than today; tapping instantly jumps the timeline back to current date.

---

### 8.2 Interactive Week Strip & Month Grid Expansion
* **Collapsed View:** 7-day horizontal strip showing day letters, date numbers, and completion progress bars.
* **Expand Button (Chevron Down icon):**
  * Tapping smoothly animates the strip downward into a full **6-Week Monthly Calendar Grid**.
  * Tapping again collapses it back to the single week strip.
* **Left / Right Chevrons:** Shifts backward or forward by one week (or one month in expanded view).
* **Tally Badge:** Shows total completed vs scheduled items for the period (e.g. *"5 / 8 completed"*).
* **Tapping any Day Card:** Swaps the agenda view below to show that date's full schedule.

---

### 8.3 Agenda Feed Layout

#### 1. Time-Blocked Habits
* **Time Gutter (Left):** Displays start time (e.g. "08:00 AM").
* **Card Height:** Scales dynamically based on duration (e.g. 15m, 30m, 1h).
* **Card Details:** Habit icon, habit title (strikes through when completed), time span (e.g. "08:00 - 08:30 · 30m"), and current progress (e.g. "1,500 / 2,000 ml" or "3/5 substeps").
* **Interactive Check Button:**
  * Standard habits: Checkbox toggling completion status.
  * Quantitative habits: Circular ring with `+` icon; tapping adds one step increment.
* **Inline Note Previews:** Displays up to 3 notes attached to this habit today. Tapping a preview opens the Note Editor.
* **Card Tap:** Opens the full **Habit Details Page**.
* **Card Long-Press:** Opens the **Note Editor Page** to attach a reflection.

#### 2. Free Time Gap
* Appears automatically between consecutive scheduled items (e.g. between 08:30 and 10:00).
* Displays a modern diagonally hatched background reading *"1h 30m free"*.

#### 3. Scheduled To-dos
* Displays to-dos that have an assigned start time.
* Shows priority color accent, start time, and animated completion checkbox.

#### 4. Anytime Habits Section
* Header: "Anytime".
* Lists all habits due on this day that do not have specific scheduled hours.
* Includes completion checkbox and inline note previews.

#### 5. Unscheduled To-dos Section
* Header: "To-dos" with total estimated time remaining badge (e.g. Hourglass icon with "2h 15m").
* Lists all tasks due on this date without specific time slots.

---

## 9. Health Connect Integration Page (`HealthInfoPage`)

* **Screen Purpose:** Privacy explanation and permission management for automatic step counting via Apple Health / Android Health Connect.
* **Entry Point:** Tapping the Health info link in Quantitative habit settings.

### 9.1 Privacy Information Points
1. **Header Icon:** Large footprints icon.
2. **Read-Only Operation:** Explains that the app only reads step counts; it never reads medical data and never writes back to Health Connect.
3. **100% On-Device:** Guarantees that step data never leaves the physical device and is never uploaded anywhere.
4. **Revocable:** Informs user that permissions can be turned off anytime in system settings.

### 9.2 "Manage Permission" Button
* **When clicked:** Opens the device's native OS Health Connect / Apple Health permissions screen directly.
