# Focus Timer Screen — Functional Specification & Interaction Flow

## 1. Overview
The **Focus Timer** subsystem is an integrated productivity engine that pairs time tracking with habits and to-dos. It features customizable clock faces, ambient soundscapes, scenic video backgrounds, Pomodoro interval scheduling, in-session task checklists, and detailed productivity analytics.

---

## 2. Global Status & Launcher: The Focus Pill

The **Focus Pill** (`FocusPill`) is an omnipresent floating capsule accessible across the app.

### Operational States & Interactions:
1. **Idle State:**
   * Displays clock/hourglass icon with *"Focus"* label.
   * **Clicking it:** Opens the **Focus Setup Screen** (`FocusSetupPage`).
2. **Active / Running State:**
   * Displays a pulsing colored status dot, live countdown ticker (or stopwatch count-up), mode badge (`Timer`, `Pomo`, `Flow`), and the linked habit's accent color.
   * **Clicking it:** Navigates directly into the full-screen **Focus Timer Screen** (`FocusPage`).
3. **Paused State:**
   * Ticker pauses; amber pause icon replaces the status dot.
   * Displays remaining time with visual indicator prompting resumption.

---

## 3. Focus Setup Screen (`FocusSetupPage`)

The setup screen prepares a session before the timer starts.

### 3.1 Top Bar & Today's Goal Banner
* **(X) Close Button:** Exits back to previous screen.
* **Today's Goal Banner:** Displays cumulative focus time completed today versus the daily focus goal (e.g. *"45 / 60 min — 75%"*) and the active focus streak counter in days.

---

### 3.2 Timer Mode Selector Tabs
1. **Timer (Countdown):** Fixed-duration countdown timer (from 1 minute to 600 minutes / 10 hours).
2. **Pomodoro (Intervals):** Alternates structured work rounds with short and long rest breaks.
3. **Flowtime (Stopwatch / Count-up):** Open-ended stopwatch counting upward from `00:00` with an infinity ($\infty$) symbol for uninterrupted deep work.

---

### 3.3 Interactive Dial (`FocusDial`)
* **Radial Drag Gesture:** Dragging around the circular clock ring adjusts duration in 5-minute increments up to 120 minutes.
* **Center Display:** Shows selected minutes and calculated completion timestamp (e.g. *"25 MIN · Ends at 14:25"*).
* **Quick Preset Chips:** Row of buttons below dial: `15m`, `25m`, `45m`, `60m`. Tapping instantly updates dial.
* **Custom Keypad Button (`⌨` icon):** Opens the numeric keypad sheet allowing entry of exact minutes (up to 600m).

---

### 3.4 Saved Timer Profiles
* Row of customizable profile chips (e.g. *"Deep Work 45m"*, *"Quick Sprint 15m"*).
* **Tapping a profile chip:** Instantly loads that profile's duration, mode, habit link, and audio track.
* **Long-pressing a profile chip:** Opens dialog to edit profile name or delete it.
* **"+" Button:** Saves the current dial configuration as a new profile (up to 6 saved profiles).

---

### 3.5 Habit & To-Do Linking
* **"Linked Habit" Dropdown Row:**
  * Opens habit selector list.
  * Tapping a habit links it to the upcoming session.
  * *Time-based habits:* Focus minutes directly advance the habit's daily quota.
  * *Check-off habits:* Completing the session marks the habit as done for today.
  * Tapping "None" unlinks habit.
* **"Linked To-do" Dropdown Row:**
  * Opens active task list. Tapping a task links it. Completing the session automatically marks the to-do done.

---

### 3.6 Category Labels & Tags
* Categorizes sessions independently of habits (e.g. *Work, Study, Creative, Coding, Writing, Fitness, Meditation*).
* **Tapping a label chip:** Assigns the tag.
* **"+ Add Label" Button:** Opens custom label dialog to type a title and pick an emoji icon.

---

### 3.7 Pomodoro Interval Settings (when in Pomodoro mode)
* **Work Duration:** Duration of focus rounds (default 25m).
* **Short Break:** Rest interval between rounds (default 5m).
* **Long Break:** Extended rest interval after completing a cycle (default 15m).
* **Cycle Count:** Number of rounds before triggering a long break (default 4 rounds).
* **"Auto-start Breaks" Toggle:** When ON, breaks begin immediately without waiting for user tap.
* **"Whole Rounds Only" Toggle:** When ON, ending early discards incomplete round minutes.

---

### 3.8 "Start Focus" Button
* **When clicked:**
  * If 3-second lead-in countdown is enabled: Displays an animated full-screen countdown (`3... 2... 1... Focus!`) with audio beats.
  * Launches the full-screen active **Focus Timer Screen** (`FocusPage`).

---

## 4. Active Focus Timer Screen (`FocusPage`)

### 4.1 Top Bar Controls
* **(X) Exit Button:** Opens the **Early Stop Confirmation Dialog** (Section 7).
* **Habit & Label Chips:** Displays active habit icon and category badge.
* **Music / Audio Button (Note icon):** Opens the **Ambient Audio Sheet** (Section 5).
* **Background Scenes Button (Image icon):** Opens the **Background Scenes Sheet** (Section 6).
* **Clock Style Button (Grid icon):** Opens the **Clock Style Selection Sheet** (Section 4.3).
* **Zen Mode Toggle (or double-tapping screen):**
  * Hides top bar, habit tags, checklists, and buttons.
  * Scales clock digits to maximum screen size.
  * Displays only a subtle low-opacity pause button at bottom margin.
  * Double-tapping anywhere restores full UI controls.

---

### 4.2 Primary Session Controls (Bottom Rail)
* **Pause / Resume Button:** Freezes the ticker and gently fades ambient music.
* **Restart Button:** Resets timer to start duration (pops up confirmation dialog to prevent accidental progress loss).
* **"+1m" Extension Button:** Instantly adds 60 seconds to the countdown without pausing audio.
* **End Session (Stop icon):** Opens the **Focus End Dialog** (Section 7).
* **"Skip Break" Button (during Pomodoro break):** Skips rest period and starts next work round immediately.
* **Switch Habit on Break:** Tapping the habit chip during a break allows assigning the next work round to a different habit.

---

### 4.3 Clock Face Styles (`TimerClocks`)
Users can switch between 4 clock designs via the clock style sheet:
1. **Ring:** Circular progress arc stroke that depletes/fills around a central digital readout.
2. **Flip:** Vintage mechanical split-flap cards simulating top-to-bottom card flips on minute/second transitions.
3. **Dots:** Retro digital electronics clock formed from a grid of glowing circular LED dots.
4. **Plain:** High-contrast, minimalist typography without visual meters.

---

### 4.4 Mid-Session Retiming Sheet (`FocusRetimeSheet`)
* **Trigger:** Tapping the active clock digits while the timer is running.
* **What's inside the sheet:**
  * **Quick Adjust Buttons:** `+5m`, `+10m`, `+15m`, `-5m`.
  * **Duration Re-anchor:** Adjusts target end time without resetting already-elapsed seconds.
  * **Mode Switcher:** Convert active countdown into an uncapped Flowtime stopwatch mid-flight.

---

### 4.5 In-Session Task List
* Embedded directly beneath the clock face:
  * **If linked to a habit with substeps:** Loads habit's checklist. Tapping checkboxes marks substeps completed live.
  * **If unlinked:** Displays session checklist with "+ Add task..." text input to add quick objectives during focus. Checkbox clicks are logged on the session record.

---

## 5. Ambient Audio & Soundscapes Sheet

* **Trigger:** Tapping the music note icon in top bar.
* **What's inside the sheet:**
  1. **Built-in Soundscapes:**
     * *Heavy Rain & Thunder*
     * *Deep Brown Noise*
     * *Crackling Fireplace*
     * *Ticking Clock*
     * *One Love (Lo-Fi Beats)*
     * *I Can Find You (Chillwave)*
  2. **"+ Import Custom Tracks" Button:** Allows importing up to 30 local audio files (`.mp3`, `.wav`, `.m4a`).
  3. **Playback Controls:**
     * Play/Pause, Shuffle, Loop Single Track, Loop Playlist.
     * Seek scrubber bar with elapsed/total time.
     * Dedicated ambient volume slider (independent of system ringtone volume).
  4. **Smart Audio Fading & Ducking:**
     * Audio smoothly fades over 3 seconds when pausing, resuming, or stopping.
     * Ambient music automatically ducks to 20% volume when interval chimes sound.
  5. **Completion Alert Chimes:**
     * Tone choices: *Zen Singing Bowl, Temple Bell, Electronic Chime, Digital Beep, Acoustic Gong, Silent*.
     * **"Focus Hold" Toggle:** When ON, completion chime loops continuously until user physically taps the screen.

---

## 6. Visual Themes & Background Scenes Sheet

* **Trigger:** Tapping the image icon in top bar.
* **What's inside the sheet:**
  1. **Solid AMOLED Black:** Pure pitch-black background for OLED battery saving and distraction-free night focus.
  2. **Photographic Presets:** *Night City, Street Lamp, Lantern Tree, Frog Pond, Valley River, Forest Cabin*.
  3. **Looping Video Scenes (Desktop/Web):** *Cabin Rain, Crackling Fireplace, Study Girl Desk, Cat by Fireplace*.
  4. **"+ Import Media" Button:** Upload up to 10 custom photos or looping MP4 clips from device storage.
  5. **Dimming Scrim Slider (0% to 80%):** Controls dark overlay opacity behind clock typography for legibility over bright images.

---

## 7. Session Completion & Early Stop Dialogs (`FocusEndDialog`)

### 7.1 Target Reached (Completion Flow)
* **What happens:** Plays completion chime and launches full-screen confetti animation.
* **Completion Summary Modal appears:**
  * Shows total elapsed duration (e.g. 45 min).
  * Shows linked habit title and credited minutes.
  * Shows completed task count (e.g. 3/3 tasks).
  * Checkbox: *"Mark [Habit] complete for today"*.
  * **"Save & Complete" Button:** Commits session to history, credits habit, checks off linked to-do, updates streaks, and exits.

---

### 7.2 Early Stop Dialog (Stop Button Clicked)
* **What pops up:** Dialog showing elapsed time vs target (e.g. *"Stopping Early — 18 of 25 min elapsed"*).
* **User Choices:**
  1. **"Complete & Log Time":** Finalizes session, logs actual elapsed minutes (18m) to the linked habit, and saves record.
  2. **"Add Time":** Adds +5m, +10m, or +15m and returns to active timer.
  3. **"Discard Session" (Red danger button):** Aborts session cleanly; no minutes credited, no records saved to history.
  4. **"Keep Going":** Dismisses dialog and resumes active timer.

---

### 7.3 Midnight Session Splitting
* If a session spans midnight (e.g. started at 23:45 and finished at 00:30):
* Automatically splits into two distinct database records:
  * Record A: 15 minutes credited to yesterday.
  * Record B: 30 minutes credited to today.
* Preserves accurate daily analytics and prevents multi-hour distortion on daily bar charts.

---

## 8. Focus History Screen (`FocusHistoryPage`)

* **Screen Purpose:** Audit trail of all completed focus sessions.
* **Entry Point:** Tapping "Focus History" in habit details or settings.

### 8.1 Screen Layout & Features
* **Top Bar:** Back button, title *"Focus History"*, **"Select"** button (activates multi-select mode), and **"+ Log"** button.
* **Grouped Timeline:**
  * Grouped by date headers (*Today, Yesterday, October 14, 2026*) displaying aggregated daily focus duration.
  * **Session Card Details:** Habit name, color swatch, label emoji, start/end timestamps, mode badge (`Timer`, `Pomo`, `Flow`), pause count, tasks finished.
  * **Accuracy Badge:** Indicates whether session was *"Exact"*, *"-7m early"*, or *"+12m overrun"*.
* **Multi-Select & Batch Deletion:**
  * Clicking "Select" (or long-pressing any card) reveals checkboxes on all sessions.
  * Top bar shows "Select All" and "Delete Selected" actions.
* **"+ Log" Button:** Opens the **Manual Session Logger Sheet**:
  * Allows back-logging offline focus time.
  * Fields: Date picker, Start Time, End Time, Duration, Linked Habit, Label, and Notes.
  * Validates that start time precedes end time and duration is greater than zero.

---

## 9. Focus Statistics Screen (`FocusStatsPage`)

* **Screen Purpose:** In-depth analytics dashboard for focus time and work patterns.
* **Time Range Selector:** Jump between **Week**, **Month**, **Year**, and **All-Time** with forward/backward pagination chevrons.

### 9.1 Core Performance Metrics Grid
* **Total Focus Time:** Cumulative duration formatted in hours and minutes (e.g. *"14h 25m"*).
* **Daily Average:** Mean focus time computed across active days.
* **Total Sessions:** Raw count of completed sessions.
* **Focus Streak:** Consecutive days meeting focus goals.
* **Completion Rate:** Percentage of started sessions that reached target duration without being discarded early.

---

### 9.2 Analytics Charts
1. **Stacked Period Bar Chart (`FocusRangeBars`):**
   * Daily, weekly, or monthly bars segmented and color-coded by linked habit or label.
   * Dotted horizontal reference line indicating daily focus target.
2. **Plan vs Real Accuracy Analysis (`FocusInsights`):**
   * Overrun rate (% of sessions continued past target).
   * Early exit rate (% of sessions stopped early).
   * Average variance minutes (e.g. *"+4.2 min average overrun"*).
3. **24-Hour Busiest Hour Histogram:**
   * 24 columns (00:00 to 23:00) showing hourly focus volume to identify peak personal productivity windows.
   * Peak hour callout badge (e.g. *"Peak Hour: 14:00 - 15:00"*).
4. **Weekday Distribution:** Bar breakdown showing which days of the week yield the highest focus volumes.
5. **365-Day Density Heatmap:** GitHub-style annual grid with four color intensity tiers.
6. **Habit & Label Share Rankings:** Ranked list showing total duration, percentage share, and session counts per habit.

---

## 10. Habit-Level Focus Defaults Sheet

* **Trigger:** Long-pressing Focus Tile on Habit Details screen -> "Focus Defaults".
* **What's inside the sheet:**
  1. **Default Mode:** Toggle between Timer, Pomodoro, or Flowtime for this habit.
  2. **Default Duration:** Picker for default session minutes (e.g. 30m).
  3. **Custom Pomodoro Cadence:** Specific work/break ratios tailored for this habit (e.g. 45m work / 10m break).
  4. **Preferred Soundscape:** Selects ambient sound to automatically load when launching focus from this habit.
  5. **"Save Defaults" Button:** Commits settings and closes sheet.
