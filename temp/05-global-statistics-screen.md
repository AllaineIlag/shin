# Global Statistics Screen — Functional Specification & Interaction Flow

## 1. Overview
The **Global Statistics Screen** (`StatisticsPage`) is the central analytics, progress tracking, and performance evaluation hub of the app.

It aggregates completion logs, consecutive streaks, consistency ratings, temporal patterns, and contextual modules (financial savings, quantitative volumes, focus sessions) across all habits or filtered to an individual habit.

---

## 2. Top-Level Filters & Scope Selectors

### 2.1 Habit Scope Filter Strip
* **Location:** Directly below the screen header.
* **Filter Chips Displayed:**
  * **"All" Chip:** Aggregates metrics across all active habits. Uses the app's default primary accent color.
  * **Individual Habit Chips:** Displays each habit's custom glyph icon, color badge, and title.
* **When clicking a Habit Chip:**
  * Instantly filters all cards, charts, heatmaps, and streaks to reflect only that specific habit.
  * The screen's accent color dynamically transitions to match the selected habit's theme color.
  * Hides comparative multi-habit charts (Donut Chart, Leaderboard) and surfaces habit-specific modules (Financial Savings or Quantitative Totals).
* **When clicking "All":** Resets the filter to include all habits.

---

### 2.2 Year Navigator
* **Location:** Below the habit filter strip.
* **Controls:**
  * **Left Arrow (`<`):** Decrements the viewing year by 1 (scrolls back to previous years).
  * **Year Label:** Large centered 4-digit year (e.g. `2026`).
  * **Right Arrow (`>`):** Increments viewing year by 1. Automatically **disabled and dimmed** when viewing the current calendar year to prevent navigating into the future.
* **Effect of changing year:** Recalculates all annual stats, the 52-week heatmap, monthly completion lines, and annual totals for that selected year.

---

### 2.3 Overview vs Activity Tabs (Express Theme Only)
* Segmented control switching between:
  1. **Overview Tab:** Summary KPI cards, consistency gauge, period totals, streaks, and habit rankings.
  2. **Activity Tab:** 52-week heatmap, monthly completion curves, weekday distribution, 90-day streak trend, and 24-hour time-of-day graph.

---

## 3. Core Summary Cards & Metrics

Displays a 2x2 grid of key performance indicators:
1. **Completions (Hash/Checkmark icon):** Total successful habit completions logged in the selected calendar year.
2. **Best Streak (Trophy icon):** Longest continuous consecutive completion streak achieved.
3. **Current Streak (Flame icon):** Active uninterrupted streak currently running up to today.
4. **Completion Rate (Target icon):** Difficulty-weighted consistency percentage over the selected timeframe.

### 3.1 Secondary Overview Metrics
* **Active Days (Calendar Check icon):** Number of distinct calendar days in the year with at least one completion.
* **Perfect Days (Sparkles icon):** Number of days where 100% of all scheduled habits due on that date were completed.
* **Per Week (Repeat icon):** Average completions per 7-day week.
* **Best Month (Calendar Range icon):** Calendar month with the record number of completions (e.g. *"October"*).

### 3.2 Perfect Streak Banner
* A highlighted gradient banner indicating active consistency:
  * Shows *"Streak on: X days"* if user has completed 100% of habits for consecutive days.
  * Displays *"Best streak: X days"* in the corner.

---

## 4. Consistency Rate & Interactive Period Selector

Measures how reliably the user completes due habits, weighted by difficulty, compared against preceding time periods.

### 4.1 Consistency Radial Gauge
* Displays a large circular arc gauge with the consistency percentage in bold (e.g. `88%`).
* Below the percentage, shows a comparison delta against the previous timeframe (e.g. `+4% vs last 30 days` in green, or `-2%` in red).

---

### 4.2 Timeframe Selector Button (`Last 30 days ▼`)
* **When clicked:** Opens the **Consistency Period Selection Bottom Sheet**.
* **What's inside the sheet:**
  * **Title:** *"Completion Rate"*.
  * **Radio Options:**
    1. **Last 7 days:** Short-term momentum.
    2. **Last 30 days:** Standard monthly benchmark (default).
    3. **Last 90 days:** Quarterly trend consistency.
    4. **Last 12 months:** Long-term annual reliability.
* **Clicking any option:** Immediately recalculates the gauge and comparison delta, updates the button label, saves user preference, and closes sheet.

---

## 5. Period Totals ("Times Completed")

A structured summary breakdown displaying completion counts across escalating time horizons:
* **This Week:** Completions logged from the start of the current week (respecting Monday or Sunday week start) to today.
* **This Month:** Completions logged since day 1 of current month.
* **This Year (or [Year]):** Total completions in the selected calendar year.
* **All Time:** Cumulative lifetime completions across the entire history of the habits.

---

## 6. Year Heatmap ("Activity")

A 52-week horizontal contribution grid (GitHub-style activity matrix):
* **Layout:** 52 to 53 columns representing weeks, with 7 rows representing days of the week.
* **Month Headers:** Localized month labels (*Jan, Feb, Mar...*) placed above the columns where each month begins.
* **Auto-Focus:** Automatically scrolls horizontally to center today's date in the viewport on load.
* **Cell Coloring:**
  * Multi-habit view: Cells scale from 35% opacity to 100% solid tint based on completion volume.
  * Single-habit view: Solid accent color on completed days; red on relapse days.
* **Touching any cell:** Displays an elevated tooltip showing the exact date and completion count (e.g. *"Wed, Oct 14: 6 habits completed"*).

---

## 7. Interactive Deep-Dive Charts

### 7.1 Streak Evolution Trend Chart
* **What it shows:** A 90-day rolling curve showing how streak length has fluctuated over time.
* **Reference Lines:** Dashed horizontal line indicating the average streak length (e.g. *"Avg 8"*).
* **Touch Interaction:** Tapping or dragging across the chart displays a vertical guideline and tooltip bubble showing exact streak days and date (e.g. *"14 days · Oct 24"*).

---

### 7.2 Monthly Completions Line Chart
* **What it shows:** Monthly completion volume across all 12 months (Jan through Dec).
* **Peak Emphasizer:** Highlights the best-performing month with an enlarged marker dot and bold count.
* **Future Months:** Grayed out if viewing the current year.
* **Touch Interaction:** Tapping any month point displays a tooltip with exact completions.

---

### 7.3 Weekday Distribution ("When Best")
* **What it shows:** 7 vertical bars representing days of the week (Monday through Sunday, or Sunday first based on settings).
* **Ghost Rods:** Background bars show total potential capacity behind filled bars.
* **Touch Interaction:** Tapping a bar triggers a tooltip showing completions for that day of the week, helping users identify their most and least productive weekdays.

---

### 7.4 Time-of-Day Distribution ("Completion Time")
* **What it shows:** 24-hour distribution curve (00:00 to 23:00) showing when habits are checked off.
* **Peak Hour Marker:** Dashed vertical line callout showing the user's most active hour (e.g. *"08:00 AM"*).
* **Threshold Logic:** Only renders when at least 5 timestamped checks exist. If fewer than 5 exist, displays an empty state: *"Not enough data"*.

---

### 7.5 Habit Breakdown Donut Chart
* *Visible when "All" habits is selected and 2 or more habits exist.*
* **Interactive Slices:**
  * **Tapping any donut wedge:** The tapped slice expands outward by 6px, and all other slices dim to 28% opacity.
  * **Center Display:** Changes from total completions to display the selected habit's raw count and percentage share (e.g. *"Running: 48 checks · 34%"*).
* **Legend Chips:** Tappable pills below the chart showing color swatches and habit names. Tapping a legend chip expands that slice on the donut.

---

### 7.6 Habit Performance Ranking Leaderboard
* *Visible when "All" habits is selected.*
* Displays a ranked leaderboard sorting habits from highest to lowest completion volume.
* Shows top 5 habits by default with progress bars.
* **"See more / See less" Button:**
  * **Clicking "See more":** Smoothly expands the list to display all habits.
  * **Clicking "See less":** Collapses back to top 5.

---

## 8. Single-Habit Context Modules

*Appears when an individual habit is selected in the top filter.*

### 8.1 Financial Savings Module (Negative / Quit Habits)
* *Appears for habits tracking financial cost or relapse expenses.*
* **Money Saved (Piggy bank icon):** Total money saved (Clean days $\times$ daily cost).
* **Money Spent (Wallet icon):** Total money wasted on logged relapses.
* **Clean Days (Shield icon):** Total days without relapse.

---

### 8.2 Quantitative Goal Module (Numeric Habits)
* *Appears for quantitative habits.*
* **Total Volume:** Sum of all logged quantities formatted with unit (e.g. *"142 km"* or *"3,500 ml"*).
* **Daily Average:** Average daily intake/volume.
* **Goal Days:** Total days where target was satisfied.
* **Clicking the card:** Opens the full **Quantitative Statistics Screen** (`QuantStatsPage`).

---

### 8.3 Focus Session Module (Focus Habits)
* *Appears for habits with recorded focus sessions.*
* **Total Focus Time:** Cumulative focus duration (e.g. *"18h 45m"*).
* **Completed Sessions:** Total timer intervals finished.
* **Daily Goal Progress:** Today's active focus time vs daily target.
* **Clicking the card:** Opens the dedicated **Focus Analytics Screen** (`FocusStatsPage`).
