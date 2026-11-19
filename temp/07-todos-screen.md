# Todos Screen — Functional Specification & Interaction Flow

## 1. Overview
The **Todos Screen** (`TodosPage`) provides task management built around stationery metaphors:
* **Paper Mode (`TodoPaper`):** A tactile bulletin board of pastel sticky notes with notebook lines, pushpins, priority stickers, and photo attachments.
* **List Mode (`TodoTile`):** A high-density structured list of stacked cards with animated checkboxes, inline metadata chips, and swipe-to-delete gestures.
* **Project Folders (`TodoProjects`):** A 3D acrylic folder grid where tasks can be organized into separate project workspaces.

---

## 2. Main Screen Header & Top Controls

### 2.1 Title & Open Counter
* Displays *"Todos"* alongside a live counter of open tasks (e.g. *"4 left"*).

---

### 2.2 View Switcher Button (Folder / List Icon)
* **When on the task list/paper board:** Shows a folder icon. Tapping switches the screen into the **Project Folders Grid**.
* **When inside the Project Folders grid:** Shows a list icon. Tapping switches back to the task list view.

---

### 2.3 Sort Order Selector (Arrows Up/Down Icon)
* **When clicked:** Opens the **Sort Order Bottom Sheet**.
* **Options:**
  1. **Urgency (High First):** Pinned first $\rightarrow$ Due date $\rightarrow$ Time $\rightarrow$ Priority (High to Low) $\rightarrow$ Duration estimate $\rightarrow$ Creation time.
  2. **Urgency (Low First):** Pinned first $\rightarrow$ Due date $\rightarrow$ Time $\rightarrow$ Priority (Low to High, None last) $\rightarrow$ Duration estimate $\rightarrow$ Creation time.
  3. **Time:** Pinned first $\rightarrow$ Due date $\rightarrow$ Scheduled minute $\rightarrow$ Creation time.
  4. **Name:** Pinned first $\rightarrow$ Alphabetical by title $\rightarrow$ Creation time.
* **Clicking any option:** Sorts the list immediately, saves preference, and closes sheet.

---

### 2.4 Search Toggle (Magnifying Glass Icon)
* **When clicked:** Expands a top search bar with autofocus.
* **Typing query:** Filters tasks in real time across task titles, body notes, and checklist items.
* **(X) Clear Button:** Clears search text and restores the full list.

---

### 2.5 Clear Completed Button (Eraser Icon)
* *Visible whenever completed tasks exist in the active view.*
* **When clicked:** Opens the **Clear Completed Confirmation Dialog**.
  * **Title:** *"Clear completed todos?"*
  * **Message:** *"This will permanently remove all completed tasks in this view."*
  * **Confirm Button:** Permanently deletes all finished tasks.
  * **Cancel Button:** Closes dialog without deleting.

---

## 3. Filter Bars & Project Navigation

### 3.1 Tag & Label Chip Bar
* Horizontal scrollable chip carousel:
  * **"All" Chip:** Resets filters to show all tasks.
  * **Project Chips (in List Mode):** Quickly isolates tasks to a specific project.
  * **Tag Chips:** Displays each custom label with its assigned color, icon, name, and total count (e.g. `#work 5`).
    * **Tapping a tag chip:** Filters tasks to that label.
    * **Long-pressing a tag chip:** Opens the **Tag Editor Bottom Sheet** (Section 8.2).
  * **"Untagged" Chip:** Appears when unlabelled tasks exist; filters to tasks with no tags.

---

### 3.2 Project Context Bar (when viewing inside a Project)
* Sits at the top of the workspace:
  * Shows project icon, theme color, and project name.
  * **Three dots (`...`) Button:** Opens the **Project Action Sheet** (Edit Project, Arrange Folders, Delete Project).
  * **(X) Button:** Exits the project and returns to the root Project Folders grid.

---

## 4. Task Grouping & Collapsible Sections

Pending tasks are grouped chronologically:
1. **Overdue:** Highlighted in red danger styling.
2. **Today:** Due on current date.
3. **Tomorrow:** Due on following day.
4. **Upcoming:** Scheduled for future dates beyond tomorrow.
5. **Someday:** Tasks without any assigned due date.

* **Section Header Interaction:** Displays section title, item count, and toggle chevron (`^` / `v`). Tapping any header collapses or expands that section.
* **Completed Section:** Positioned at the bottom with total count. Collapsed by default; tapping expands to reveal completed items.

---

## 5. Task Cards & Direct Interactions

### 5.1 Interactive Checkbox (`TodoCheck`)
* **Tapping the checkbox:**
  * Plays completion checkmark animation and draws strikethrough across task title.
  * If sounds enabled: Plays a crisp tick/pop sound.
  * In Paper Mode: Pauses 380ms so user sees checkmark, then smoothly transitions task into the Completed section.
* **Focus-Only Interception (`blocksManualCheck`):**
  * If a task has an estimated duration and is marked **"Focus Only"**:
  * Tapping the checkbox **does not** mark it complete!
  * Instead, pops up the **Focus-Only Dialog**:
    * Title: *"Start Focus Session?"*.
    * Message: *"This task requires a focus timer to complete."*
    * **"Start Focus" Button:** Opens the **Focus Timer Screen** pre-filled with this task's title and duration estimate.
    * **"Cancel" Button:** Closes dialog.

---

### 5.2 Direct Subtask Checkboxes on Card Face
* Cards display up to 8 subtask checklist items directly on the card face.
* **Tapping a subtask checkbox:** Checks off that specific sub-item directly from the board without needing to open the full editor.
* If $>8$ subtasks exist, a `+N` badge appears indicating additional hidden subtasks.

---

### 5.3 Swipe-to-Delete Gesture (List Mode)
* Swiping a task row from right to left reveals a red danger background with a trash icon.
* Swiping past threshold deletes the task and triggers the **Wastebasket Toss Animation** (Section 9).

---

### 5.4 Long-Pressing a Task Card (Hold Context Menu)
* Opens the **Hold Context Menu** with 5 actions:
  1. **"Edit" (Pencil icon):** Opens the full **Task Editor Screen**.
  2. **"Pin / Unpin" (Pushpin icon):** Toggles pin state. Pinned tasks stay anchored to the top of all views.
  3. **"Mark Done / Mark Open":** Toggles completion status.
  4. **"Select":** Enters **Bulk Selection Mode** (Section 7).
  5. **"Delete" (Trash icon — Red danger button):** Deletes task with wastebasket animation and instant Undo snackbar.

---

## 6. Creating Tasks (Floating Action Button)

* **Position:** Bottom-right corner.
* **Single Tap:**
  * In task view: Immediately opens the full **Task Editor Screen** (`TodoEditorPage`).
  * In Folders view: Opens the popup **Add Menu**.
* **Long Press:** Opens the popup **Add Menu**:
  * **"New Project" (Folder icon):** Opens the **Project Creator Sheet** (name, color, icon).
  * **"New Note" (Sticky note icon):** Opens the Task Editor.

---

## 7. The Comprehensive Task Editor (`TodoEditorPage`)

A full-screen stationery workspace for detailed task authoring.

### 7.1 Auto-Save & Discard Architecture
* **Auto-save:** Every keystroke automatically persists with a 600ms debounce.
* **Ghost Draft Cleanup:** If an empty task is created and abandoned with no title, body, subtasks, or photos, it is automatically discarded rather than saving an empty task.
* **Back Button:** If valid edits were made, auto-saves and exits.

---

### 7.2 Header Controls
* **Back Arrow:** Closes editor.
* **Pin Icon:** Toggles red pushpin.
* **Checkmark Icon:** Marks task complete directly from header.
* **Trash Icon:** Prompts confirmation dialog to delete note.
* **"Save" Button:** Commits task and exits.

---

### 7.3 Content Canvas
1. **Photo Attachments Header (`TodoPhotoGrid`):** Displays attached images. Tapping opens the **Full-screen Photo Viewer**; tapping `X` removes image.
2. **Title Field:** Large bold headline. Pressing Enter automatically moves keyboard focus into the body.
3. **Body Field:** Multi-line text area for notes, instructions, and links.
4. **Reorderable Subtasks Checklist:**
   * Each item has a drag handle, checkbox, text field, and remove `X` button.
   * **Drag-to-Reorder:** Dragging moves subtask position vertically.
   * **Enter Key Entry:** Pressing Enter on a line inserts a new subtask beneath it. Pressing Enter on an empty line deletes it.
   * **"+ List item" Button:** Appends a new checklist item.
5. **Active Metadata Chips Wrap:** Shows chips for assigned Priority, Due Date, Time, Reminder, Repeat Rule, Estimate, Project, and Tags. Tapping any chip opens its editor sheet.

---

### 7.4 Bottom Action Toolbar (9 Icons)
1. **`squarePlus` (Add Elements):** Menu to insert a new checklist subtask, take a picture with camera, or pick from photo library.
2. **`palette` (Paper & Cover):** Opens **Paper & Cover Sheet** to pick from 9 pastel stationery colors (Soft Cream, Warm Peach, Salmon Pink, Pale Sage, Soft Mint, Sky Blue, Lavender, Warm Taupe, Light Sand, or Auto) or upload a photo cover.
3. **`folder` (Project):** Opens **Project Picker Sheet** to file task under a project or "Inbox".
4. **`tag` (Tags):** Opens **Tag Picker Sheet** to multi-select label hashtags.
5. **`hourglass` (Estimate):** Opens duration picker to assign estimated hours and minutes.
6. **`timer` (Focus Only):** Toggles Focus-Only requirement (locks manual checkmark; defaults estimate to 25m).
7. **`flag` (Priority):** Opens **Priority Picker Sheet** (2x2 grid: High, Medium, Low, None).
8. **`calendar` (Due Date):** Opens **Due Date & Reminder Sheet** (Today, Tomorrow, Pick a date, Time of day, Remind before, Repeat rule, Clear date).
9. **`clock` (Time):** Opens interactive **Time Picker Dialog**.

---

## 8. Bulk Selection & Batch Operations (`TodoSelectBar`)

### 8.1 Entering Selection Mode
* Triggered via card long-press -> "Select".
* Cards scale down slightly to 95% with an accent outline and checkmark bubble.
* Tapping cards toggles their selection state.

---

### 8.2 Floating Selection Toolbar (`TodoSelectBar`)
A bottom floating bar provides batch actions:
* **(X) Close Button:** Clears selection and exits mode.
* **Count Badge:** Shows selected items (e.g. *"3 selected"*).
* **Pin Button:** Pins or unpins all selected tasks.
* **Mark Done Button:** Completes all selected tasks (skips focus-only tasks).
* **Delete Button (Trash icon):** Prompts confirmation dialog to delete all selected items.
* **Bulk Edit Button (Pencil icon):** Opens the **Bulk Edit Menu**:
  * **Change Priority:** Assigns High, Medium, Low, or None to all selected.
  * **Change Tags:** Multi-tag editor. Adding or removing tags applies to all selected without overwriting unshared tags.
  * **Change Project:** Moves all selected tasks into a target project or Inbox.
  * **Change Due Date:** Sets Today, Tomorrow, custom date, or clears due dates across all selected tasks.

---

## 9. Wastebasket Disposal Animation & Undo

* **When deleting a task:**
  1. A 3D frosted-glass wastebasket bin slides up from the bottom of the screen.
  2. The deleted task card lifts off the screen and flies along an arced parabolic curve into the mouth of the basket.
  3. The card drops inside, and the basket sinks off the bottom of the screen.
* **Instant Undo Toast:**
  * An `AppSnackbar` appears reading: *"Todo deleted"* (or *"3 todos deleted"*) with an **"UNDO"** action button.
  * **Tapping UNDO:** Immediately restores the deleted tasks to their exact previous states and positions.

---

## 10. Recurrence & Repeating Rules Sheet (`TodoRepeatSheet`)

* **Trigger:** Tapping repeat icon/chip in editor.
* **What's inside the sheet:**
  * **Quick Presets:** Never, Daily, Workdays (Mon–Fri), Weekly, Monthly, Yearly.
  * **Custom Cadence:** "Every [X] days / weeks / months / years" with increment steppers.
  * **Weekly Multi-Day Selection:** 7 weekday chips (M, T, W, T, F, S, S) for schedules like *"Every 2 weeks on Monday and Thursday"*.
  * **Monthly Modes:**
    * *On Day X:* Repeats on a specific calendar day (e.g. 15th).
    * *On Weekday X:* Repeats on nth weekday (e.g. *"On the 3rd Wednesday"*).
    * *On Last Day:* Repeats on the final day of every month regardless of length.
  * **"Repeat from Completion" Toggle (`fromDone`):** When ON, next due date is scheduled relative to when completed, rather than the original due date.
  * **"Skip Recurrence" Button:** Advances due date to the subsequent recurrence cycle without marking the task completed.

---

## 11. Project Folders Grid (`TodoProjects`)

* **What it shows:** 3D frosted acrylic folders representing user projects.
* **Visual Previews:** The back pocket of each folder visibly holds up to 3 miniature paper sheets matching the exact pastel colors of tasks filed inside.
* **Folder Interactions:**
  * **Tapping a Folder:** Plays the "card deal" animation where task cards fly out of the folder coordinates to their board destinations with an ink-writing effect.
  * **Empty Folder State:** If project has no tasks, folder drops to center with spring physics and performs an animated shrug wiggle, displaying *"This project is empty"* with a *"New Todo"* button.
  * **Long-pressing a Folder (Jiggle Mode):**
    * Folders begin jiggling with a gentle rotation wave.
    * Top bar shows *"Drag to arrange"* with a **"Done"** button.
    * Users can drag and drop folders to reorder their layout.
    * Clicking "Done" exits jiggle mode and saves custom order.
