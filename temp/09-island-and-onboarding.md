# Island, Onboarding & Global App Shell — Functional Specification & Interaction Flow

## 1. Overview
This document specifies the user-facing functional behaviors, button interactions, sheets, dialogs, and navigation flows for:
1. **Streak Island**: The gamified Mediterranean diorama where daily consistency earns coins to build and expand an interactive 3D miniature island.
2. **User Onboarding Carousel**: The first-launch walkthrough explaining Streak's local-first privacy philosophy, habit tracking paradigms, and analytics.
3. **App Shell & Global Modals**: The root navigation architecture (mobile bottom bar vs desktop/tablet side rail), cryptographic App Lock system, number keypad, delete sheets, confirmation dialogs, celebration effects, and startup recovery screen.

---

## 2. Streak Island (Gamification & Mediterranean Diorama)

### 2.1 Island Entrypoint Widget (`IslandEntry`)
* **Location:** Displayed as a floating pill on the main dashboard (`HomePage`) and in the top app bar.
* **Visual Elements:**
  * Animated miniature island badge icon.
  * Real-time spendable coin count with coin icon.
* **When tapped:**
  * Opens the full-screen **Streak Island Page** (`IslandPage`) with a smooth cross-fade transition.

---

### 2.2 Streak Island Page (`IslandPage`)

#### 2.2.1 Top App Bar Controls
* **Back Button (Top Left):**
  * Circular glass button with arrow icon.
  * **When tapped:** Closes Island and returns to the previous screen.
* **Island Title Button (Top Center):**
  * Translucent glass pill showing the current island name (defaults to *"Isla Serenidad"*) and a pencil icon.
  * **When tapped:** Opens the **Rename Island Sheet** (see Section 2.3).
* **Help & Rules Button (Top Right):**
  * Circular glass button with question mark icon (`circleHelp`).
  * **When tapped:** Opens the **Island Help & Rules Sheet** (see Section 2.4).

#### 2.2.2 Header HUD (Status Bar)
* **Coins Balance Pill (Top Left, below App Bar):**
  * Shows total available spendable coins with a gold coin icon.
  * Updates in real time as habits are checked or items are purchased.
* **Progress Pill (Top Right, below App Bar):**
  * Displays the total built pieces count versus total catalog pieces (e.g., `14/68`).
  * Includes a miniature linear progress bar indicating completion percentage of the entire island.

#### 2.2.3 Interactive Isometric Canvas (`IslandCanvas`)
* **3D Isometric Diorama View:**
  * Renders a 76x76 grid diorama featuring Mediterranean coastal cliffs, beaches, turquoise water with dynamic wave caustics, and placed buildings/props.
* **Touch & Gesture Interactions:**
  * **Pan / Drag:** Moves the viewport around the island with smooth inertia physics.
  * **Pinch to Zoom:** Scales the view seamlessly between 0.4x (panoramic archipelago overview) and 2.8x (close-up architectural inspection).
  * **Double Tap:** Smoothly animates and re-centers the camera on the center of mass of the populated island.
  * **Tap on Placed Building/Prop:** Selects the building and opens the **Piece Details Sheet** (see Section 2.5) with its name, district, and status.
  * **Tap on Empty Ground:** Deselects active selection.

#### 2.2.4 Real-Time 24-Hour Diurnal Lighting Engine (`IslandLight`)
* Synchronizes continuously with local wall-clock time across 5 distinct lighting phases:
  1. **Dawn (06:00 - 08:30):** Lavender sky, peach coral horizon, soft golden rose ambient light, and elongated morning shadows.
  2. **Daylight (08:30 - 17:00):** Bright azure sky, turquoise water, crisp sharp sunlight, and short shadows.
  3. **Sunset (17:00 - 19:30):** Amber and fiery coral sky, warm golden glow, and long dramatic shadows.
  4. **Dusk (19:30 - 21:30):** Deep violet and muted mauve sky, cool purple ambient light, and fading diffuse shadows.
  5. **Night (21:30 - 06:00):** Deep obsidian sky, midnight navy water, pale lunar silver lighting, warm glowing building windows, and a 360-degree rotating volumetric beam from the coastal lighthouse (`Faro`).

#### 2.2.5 Compass Rose Floating Button (`_Compass`)
* **Location:** Floating circular glass button in the lower-left corner with a compass navigation needle.
* **When tapped:**
  * Rotates the entire isometric camera perspective by 90 degrees clockwise ($0^\circ \to 90^\circ \to 180^\circ \to 270^\circ$).
  * Smooth 300ms easing animation.
  * Compass needle rotates in sync to indicate the current viewing quadrant.

#### 2.2.6 Footer Controls & Quick-Build Rail (`_Footer`)
* **Next Available Pieces Rail:**
  * Horizontal row displaying up to 4 upcoming unbuilt structures sorted by lowest coin price.
  * Each chip displays a piece preview thumbnail, piece name, and coin price tag.
  * Border glows with the primary accent color if the user has enough coins to purchase it immediately.
  * **When tapped:** Focuses the canvas camera on the piece's designated spot and opens the **Piece Details Sheet**.
* **Completion / Empty Banner:**
  * If all buildings are built: Displays an *"Island Completed!"* congratulatory card.
  * If no coins earned yet: Displays a gentle prompt explaining how to earn coins by completing habits.
* **"Shop" Button:**
  * Large pill button with store icon and label *"Island Shop"*.
  * **When tapped:** Opens the **Island Shop Sheet** (see Section 2.6).

---

### 2.3 Rename Island Sheet (`showIslandNameSheet`)
* **Trigger:** Tapping the island title pill in the top app bar.
* **What pops up:** Modal bottom sheet with drag handle.
* **Elements inside:**
  * Sheet title: *"Rename Island"*.
  * Text input field pre-filled with the current island title (max 24 characters), autofocus enabled.
  * Clear button inside the text input to wipe text in one tap.
  * **"Save" Button:**
    * Commits the new name to local storage.
    * Updates the app bar header immediately.
    * Closes the sheet.
* **Dismissal:** Swiping down or tapping outside discards edits without saving.

---

### 2.4 Island Help & Rules Sheet (`showIslandHelpSheet`)
* **Trigger:** Tapping the question mark (`circleHelp`) button in the top app bar.
* **What pops up:** Scrollable bottom sheet explaining the island mechanics and rules.
* **Content & Sections:**
  1. **Header Banner:** Illustrated preview graphic of the Mediterranean island diorama.
  2. **Core Concept:** Explains that Island Coins cannot be purchased with real money; they are minted exclusively through daily discipline.
  3. **Earning Rules Breakdown:**
     * **Habit Check-in:** $+10\text{ coins}$ for completing any positive habit, or maintaining a clean day on a quit habit.
     * **Focus Minutes:** $+1\text{ coin per minute}$ of focused work logged via the Focus Timer (e.g., 25 coins for a 25-minute Pomodoro).
     * **Perfect Day Bonus:** $+25\text{ coins}$ awarded at the end of the day when 100% of scheduled daily habits are completed.
     * **Todo Completion:** $+4\text{ coins}$ for every standalone daily task checked off.
     * **Streak Milestones:**
       * 7-day streak: $+30\text{ coins}$ bonus.
       * 30-day streak: $+150\text{ coins}$ bonus.
       * 100-day streak: $+600\text{ coins}$ bonus.
       * 365-day streak: $+2500\text{ coins}$ ultimate milestone bonus.
  4. **Canvas Controls Guide:** Explains pinch-to-zoom, compass rotation, and double-tap re-centering.
  5. **Beta Advisory Note:** Highlights that island artwork, districts, and props are continuously expanding.
  6. **Danger Zone — Reset Island Button:**
     * Only appears if at least one structure has been built.
     * Red text button: *"Reset Island"*.
     * **When tapped:** Pops up a confirmation dialog:
       * **Title:** *"Reset Island?"*
       * **Message:** *"All placed buildings will be removed and your coins will be fully refunded to your balance."*
       * **"Cancel" Button:** Closes dialog without doing anything.
       * **"Reset" Button (Red):** Removes all pieces from the diorama, appends a full refund credit transaction to the ledger, closes the sheet, and resets the canvas view.

---

### 2.5 Piece Details Sheet (`showIslandPieceSheet`)
* **Trigger:** Tapping any building on the canvas or tapping a piece chip in the footer rail or shop.
* **What pops up:** Modal bottom sheet presenting the selected structure.
* **Elements inside:**
  * **Piece Thumbnail:** 3D rendered sprite of the building or prop.
  * **Piece Name & District:** e.g., *"Casa Blanca · Pueblo"* or *"Faro Costero · Faro"*.
  * **Price Tag:** Coin icon and required coin cost.
  * **Status & Action Button:**
    * **If already built (owned):**
      * Displays a prominent green pill badge with a checkmark: *"Built & Placed"*.
    * **If unbuilt and user has sufficient coins:**
      * Primary filled button: *"Build"*.
      * **When clicked:**
        1. Closes the bottom sheet.
        2. Deducts the coin cost from the user's ledger balance.
        3. Animates the building appearing on the canvas with an emergence pop.
        4. Triggers full-screen celebratory confetti particle burst.
        5. Displays a success toast: *"[Building Name] placed on your island!"*.
    * **If unbuilt and user lacks coins:**
      * Disabled gray button showing the exact deficit: *"Need X more coins"*.

---

### 2.6 Island Shop Sheet (`showIslandShopSheet`)
* **Trigger:** Tapping the *"Island Shop"* button in the footer.
* **What pops up:** Draggable bottom sheet expanding up to 94% screen height.
* **Elements & Controls:**
  * **Sheet Header:** Title *"Island Shop"* with the user's current spendable coin balance displayed on the right.
  * **Horizontal District Filter Bar:**
    * Filter chips for the 13 thematic architectural districts:
      1. **Pueblo:** Village core, white-washed dwellings, barrel roofs, cobblestone squares.
      2. **Cala:** Sandy beaches, wooden boardwalks, striped beach umbrellas.
      3. **Huerta:** Olive groves, lemon trees, dry-stone retaining borders.
      4. **Mirador:** Cliffside viewpoints, stone gazebos, brass telescopes.
      5. **Terrazas:** Stepped vineyard terraces, lavender patches.
      6. **Faro:** Rugged headland, towering lighthouse beacon with night beam.
      7. **Puerto:** Fishing trawlers, wooden docks, red buoys, stone breakwaters.
      8. **Vega:** Coastal lowlands, wild poppies, freshwater rivulets.
      9. **Astillero:** Shipwright dry docks, timber boat hulls, sailmaker lofts.
      10. **Ermita:** Hilltop whitewashed chapel, bell gables, slender cypresses.
      11. **Caleta:** Secluded rocky inlet, sea caves, cliff steps.
      12. **Cabo:** Granite sea cliffs, crashing waves, windswept shrubs.
      13. **Molino:** Windmill ridge, whitewashed stone wind towers with fabric sails.
    * Each district chip displays its built count vs total count (e.g., `Huerta 3/8`).
    * Tapping a district chip filters the grid immediately.
  * **"Only Affordable" Toggle Switch:**
    * Toggle switch with label *"Only Affordable"*.
    * When enabled: Filters the grid to only show unbuilt items that the user can buy right now with their current coin balance.
  * **Item Cards Grid (2 columns):**
    * Each card displays:
      * Sprite thumbnail (semi-transparent grayscale if unbuilt, colored if built).
      * Item name and tier.
      * If built: Green checkmark badge.
      * If unbuilt: Coin price tag and progress ratio (e.g., `1/3` for tiered upgrades).
      * Highlighted border if the user can afford it.
    * **When an item card is tapped:**
      * Closes the shop sheet.
      * Centers the canvas camera on that item's location.
      * Opens the **Piece Details Sheet** for immediate purchase.

---

## 3. User Onboarding Flow (`OnboardingPage`)

### 3.1 Overview & Architecture
* **Trigger:** Shown automatically on first app launch if `has_completed_onboarding` is false.
* **Layout Structure:**
  * Full-screen 4-step interactive carousel with horizontal swipe gestures.
  * **Header Segmented Progress Bar:** 4 animated line segments at the top indicating active step (0 to 3).
  * **"Skip" Button (Top Right):** Text button allowing instant bypass.
  * **Footer Action Rail:**
    * **Back Button:** Circular arrow button on the left (hidden on Step 0, visible on Steps 1–3).
    * **Primary Action Button:** Wide pill button on the right:
      * Steps 0, 1, and 2: Displays *"Next"*.
      * Step 3: Displays *"Get Started"*.

---

### 3.2 Slide 0: The Streak Philosophy & Data Sovereignty
* **Content & Visuals:**
  * Large illuminated Streak app icon with a soft ambient shadow glow.
  * Kicker: *"WELCOME TO"*.
  * Main Title: **Streak**.
  * Subtitle: *"Build better days, your own way."*
  * **Three Value Promise Cards:**
    1. **100% Free & Open:**
       * Gift box icon.
       * *"No paywalls, subscriptions, or banner ads."*
    2. **Private & Local-First:**
       * Shield check icon.
       * *"Your data stays on your device. Zero tracking."*
    3. **Complete Data Freedom:**
       * Hard drive download icon.
       * *"Full JSON/CSV export and import anytime."*
* **Button Action:**
  * Tapping **"Next"** smoothly slides the carousel to Slide 1.

---

### 3.3 Slide 1: Habit Chains & Streak Dynamics
* **Content & Visuals:**
  * Step Indicator: *"STEP 1 OF 3"*.
  * Main Title: *"Consistency is a Chain"*.
  * Subtitle: *"Check in daily to build unbreakable streaks. Track positive habits, count-based goals, or celebrate clean days on negative habits."*
  * **Interactive Demonstration Area:**
    * Displays a 7-day row of circular weekday bubbles (`M`, `T`, `W`, `T`, `F`, `S`, `S`).
    * As the slide appears, bubbles light up one by one with green checkmarks, ending with an active pulsing indicator demonstrating streak momentum.
    * Streak Counter Card: *"Current Streak · 6 DAYS ACTIVE"*.
* **Button Actions:**
  * Tapping **Back** returns to Slide 0.
  * Tapping **Next** advances to Slide 2.

---

### 3.4 Slide 2: 28-Day Consistency Heatmap Grid
* **Content & Visuals:**
  * Step Indicator: *"STEP 2 OF 3"*.
  * Main Title: *"Visual Momentum"*.
  * Subtitle: *"Transform daily consistency into a vivid record. Watch your contribution grid fill with color over weeks, months, and years."*
  * **Interactive Demonstration Area:**
    * Displays a miniature 28-day ($4 \times 7$) GitHub-style contribution grid.
    * Grid tiles populate sequentially with 5 graduated color intensity tiers (Level 0 empty through Level 4 deep saturation).
* **Button Actions:**
  * Tapping **Back** returns to Slide 1.
  * Tapping **Next** advances to Slide 3.

---

### 3.5 Slide 3: Growth Metrics & Deep Analytics
* **Content & Visuals:**
  * Step Indicator: *"STEP 3 OF 3"*.
  * Main Title: *"Deep Growth Analytics"*.
  * Subtitle: *"Analyze completion rates, identify challenging days, and pair habits with focused work sessions."*
  * **Interactive Demonstration Area:**
    * Animated vertical bar chart preview showing weekday completion percentages.
    * Columns grow smoothly upward with spring physics upon slide entry.
  * **Action Button:**
    * Button text changes to **"Get Started"** with tactile haptic feedback.

---

### 3.6 Completion Handshake & First-Run Transition
* **When "Get Started" or "Skip" is tapped:**
  1. Sets `has_completed_onboarding = true` in persistent storage.
  2. Seeds default starter habit templates (e.g., Drink Water, Read 20 Mins, Morning Walk).
  3. Transitions smoothly via cross-fade from `OnboardingPage` to the main application shell (`HomeShell`).

---

## 4. App Shell & Root Navigation Architecture

### 4.1 Responsive Scaffold Architecture (`HomeShell`)
The app automatically adapts its root navigation layout based on screen width:

#### 4.1.1 Mobile Layout (Screen Width < 720px)
* Full-screen view with a floating bottom navigation bar.
* Content renders edge-to-edge behind the frosted navigation bar.
* **Bottom Navigation Bar Styles (Configurable in Settings):**
  1. **Classic Glass Bar (`ClassicNavBar`):**
     * Frosted glass blur pill floating above the bottom edge.
     * Spring-loaded sliding pill indicator that glides behind the active tab icon.
     * **Auto-Scroll Collapse:** Scrolling down a habit list smoothly contracts the navigation bar; scrolling up immediately restores it.
     * **Horizontal Swipe Navigation:** Swiping across the navigation bar switches directly between adjacent tabs.
  2. **Minimal Capsule (`MinimalNavBar`):**
     * Ultra-clean Swiss typographic navigation bar with minimal icon indicators.
  3. **Express Floating Bar (`ExpressNavBar`):**
     * Playful squircle shape with squash-and-stretch bounce animations on tab selection.

#### 4.1.2 Tablet & Desktop Layout (Screen Width $\ge$ 720px)
* Transitions to a two-pane layout with a persistent left navigation rail (`NavigationRail`).
* **Navigation Rail Elements:**
  * Top brand icon / logo.
  * Vertical list of navigation tab items with icons and labels.
  * Expand/collapse toggle between compact icon-only rail and expanded rail with text labels.
* Right pane hosts the active tab content with preserved scroll states (`PageStorageKey`).

---

### 4.2 Top-Level Application Tabs

| Tab Index | Tab Name | Icon | Core Function |
| :---: | :--- | :---: | :--- |
| **0** | **Today** | `house` | Main habit check-in feed, week strip, completion rings, quick loggers. |
| **1** | **Todos** | `listChecks` | Task manager, paper mode, 3D project folders, priorities, due dates. *(Can be hidden in Settings)* |
| **2** | **Timeline** | `calendarClock` | Daily schedule, time-blocked habits, free time gap calculator. *(Can be hidden in Settings)* |
| **3** | **Stats** | `chartColumn` | 52-week heatmap, 5 charts, consistency gauge, habit leaderboards. |
| **4** | **Settings** | `settings` | Appearance, custom themes, streak rules, security lock, data backups. |

---

### 4.3 Desktop & Hardware Keyboard Shortcuts
When running on desktop or with an external keyboard attached:
* `1` through `5`: Jumps directly to Tabs 1 through 5.
* `[` / `]` or Arrow Keys: Cycles to previous / next navigation tab.
* `S`: Opens the Settings tab directly.
* `Esc`: Closes open modal sheets, side panes, or full-screen dialogs.

---

### 4.4 Automated Day Rollover & Cutoff Management
* The app shell runs a continuous background timer tracking the user's custom **Day Cutoff Hour** (configured in Settings, e.g., 3:00 AM for night owls).
* When the cutoff threshold passes:
  * Automatically recalculates daily habit schedules.
  * Advances the Today week calendar strip to the new calendar day.
  * Re-evaluates missed habits and applies Second Chance tokens if eligible.
  * Broadcasts a notification toast if a Second Chance token was consumed overnight.

---

## 5. Security Subsystem & App Lock

### 5.1 Overview & Privacy Shield
Streak includes a local security subsystem to protect personal habit journals, sobriety counters, and private notes.
* **Window Privacy Protection (`FLAG_SECURE`):**
  * When App Lock is enabled, the app automatically blanks out its preview snapshot in the iOS / Android system recent apps switcher.
  * Disallows unauthorized screen capture on supported platforms.
* **Grace Lock Delays:**
  * Configurable auto-lock delay when switching away from the app: *Immediately*, *30 Seconds*, *1 Minute*, *5 Minutes*, *15 Minutes*.

---

### 5.2 Biometric Lock Screen
* **Trigger:** App opens after being backgrounded longer than the grace delay, with biometric mode selected.
* **Elements:**
  * Centered fingerprint / Face ID badge icon.
  * Title: *"Streak is Locked"*.
  * Primary button: *"Unlock with Biometrics"*.
  * **When clicked:** Invokes the OS biometric verification prompt (Face ID, Fingerprint, or device passcode).
  * **Success:** Dismisses lock screen and restores app state instantly.
  * **Failure / Cancel:** Remains locked on screen.

---

### 5.3 4-Digit PIN Lock Screen (`_PinLockScreen`)
* **Trigger:** App opens with PIN lock mode enabled.
* **Elements & Keypad:**
  * Lock icon badge.
  * 4 circular PIN indicator dots (fill sequentially as numbers are typed).
  * Numeric keypad (digits 0–9, backspace button).
  * Subtitle text displaying status or errors.
* **Interactions & Validation:**
  * Entering correct 4 digits immediately unlocks the app and clears any failure count.
  * Entering wrong digits triggers a tactile error shake animation, clears the dots, and displays *"Incorrect PIN"*.
* **Brute-Force Lockout Defense:**
  * Up to 5 consecutive failed attempts permitted.
  * On the 5th failed attempt: Locks keypad for **30 seconds**.
  * Shows a live countdown timer: *"Wait X seconds"*. Keypad inputs are disabled.
  * Subsequent failures double the lockout duration (60s, 120s, 240s...).
* **"Forgot PIN?" Button:**
  * Located beneath the keypad.
  * **When tapped:** Flips the screen to **Emergency Recovery Key Mode**.

---

### 5.4 Emergency Recovery Key Mode
* **Elements:**
  * Key icon badge.
  * Title: *"Enter Recovery Key"*.
  * Subtitle: *"Enter the 12-digit recovery key generated during setup."*
  * Numeric input fields formatted into three blocks of 4 digits (`xxxx - xxxx - xxxx`).
  * **"Paste from Clipboard" Button:**
    * Automatically strips spaces/hyphens and populates the 12 digits from the clipboard.
  * **"Cancel" Button:** Returns to standard PIN entry mode.
* **Validation:**
  * Entering the correct 12-digit key immediately resets App Lock, disables PIN protection, and opens the app without data loss.
  * Entering an incorrect key shows an error shake and *"Invalid recovery key"*.

---

### 5.5 PIN Setup & Verification Flow (`PinSetupPage`)
* **Trigger:** Settings $\rightarrow$ Security $\rightarrow$ Set PIN Lock.
* **Step 1: Choose PIN:**
  * Keyhole icon with step indicator `1 of 2`.
  * Title: *"Choose a PIN"*.
  * Numeric pad for typing 4 digits.
  * Entering 4 digits advances to Step 2.
* **Step 2: Repeat PIN:**
  * Keyhole icon with step indicator `2 of 2`.
  * Title: *"Repeat your PIN"*.
  * Entering 4 matching digits confirms the PIN and proceeds to Step 3.
  * If digits mismatch: Triggers error shake, displays warning snackbar *"PINs do not match"*, and resets back to Step 1.
* **Step 3: Emergency Recovery Key Presentation:**
  * Key icon with title *"Save Your Recovery Key"*.
  * Subtitle: *"If you forget your PIN, this is the only way to recover your data without reinstalling."*
  * Displays the generated 12-digit key in 3 bold blocks (e.g., `4821 - 9034 - 1187`).
  * **"Copy Key" Button:**
    * Copies key to system clipboard.
    * Displays success toast *"Recovery key copied to clipboard"*.
  * **"Done" Button:**
    * Activates PIN lock.
    * Closes setup flow and returns to Settings.

---

## 6. Global Input & Utility Modals

### 6.1 Number Keypad Dialog (`showNumberKeypadDialog`)
* **Trigger:** Tapping a quantitative habit card's value, tapping "Log Value" from habit details, or manual progress entry.
* **What pops up:** Centered modal keypad dialog.
* **Elements & Controls:**
  * **Header:** Habit name or prompt title.
  * **Mode Switcher (Add vs Replace):**
    * Segmented control with two options:
      1. **"Add to Existing" (`quant_mode_add`):** Adds the entered amount to the current day's accumulated total.
      2. **"Replace Value" (`quant_mode_replace`):** Overwrites today's total with the entered amount.
  * **Large Figure Display:**
    * Displays currently typed number in large digits.
    * Shows target goal and unit suffix (e.g., `45 / 60 Mins` or `2.5 / 3.0 Liters`).
  * **Numeric Keypad Grid:**
    * Digits `1` through `9`.
    * Decimal point button `.` (or time separator in clock mode).
    * Digit `0`.
    * Backspace button (tap deletes 1 digit; long-press clears all digits).
    * Eraser / Clear button.
  * **Action Buttons:**
    * **"Cancel" Button:** Dismisses dialog without changes.
    * **"Save" Button:** Saves entered value, updates habit progress, triggers progress ring animation, and closes dialog.
  * **Optional Context Button (e.g., "Start Stopwatch"):**
    * Appears at the bottom if the habit supports active timing.
    * **When tapped:** Closes keypad and launches the stopwatch / focus timer immediately.

---

### 6.2 Standardized Delete Sheet (`showDeleteSheet`)
* **Trigger:** Tapping "Delete" on any sub-item, checklist row, note, or attachment.
* **What pops up:** Minimal modal bottom sheet with drag handle.
* **Elements inside:**
  * Red trash can icon (`trash2`).
  * Red destructive text label: *"Delete"*.
* **Interactions:**
  * **Tapping the row:** Confirms deletion, closes sheet, and executes deletion.
  * **Swiping down or tapping backdrop:** Cancels deletion without changes.

---

### 6.3 Unified Confirmation Dialog (`showAppConfirmDialog`)
* **Trigger:** Destructive or high-impact operations (e.g., reset island, reset streak, wipe all data, remove habit).
* **What pops up:** Centered modal dialog with rounded corners.
* **Elements inside:**
  * Circular icon badge (danger red icon for destructive actions, primary accent for non-destructive).
  * Bold title (e.g., *"Reset Streak?"* or *"Delete Habit?"*).
  * Descriptive message explaining the exact consequences.
  * Optional custom body widget (e.g., summary of affected check-ins).
  * **Buttons:**
    * **"Cancel" Button:** Neutral surface container button; closes dialog and returns false.
    * **"Confirm / Delete / Reset" Button:** Colored action button (red for danger, primary accent for safe confirmations); executes action, closes dialog, and returns true.

---

### 6.4 Fullscreen Celebration Overlays (`CelebrationOverlay`)
* **Trigger:** Completing all habits for the day ("Perfect Day"), reaching a streak milestone (7, 30, 100, 365 days), or building a landmark on Streak Island.
* **Overlays Supported (Configurable in Settings):**
  1. **Confetti Simulation (`ConfettiOverlay`):**
     * 90 independent confetti quads shower down across the screen.
     * Dynamic physics simulation featuring gravity, drag, lateral sway, and pseudo-3D out-of-plane flip animations.
     * Festive multi-color palette.
     * Automatically fades away after 3.5 seconds or on screen tap.
  2. **Fireworks Simulation (`FireworksOverlay`):**
     * Multi-stage ballistics: rocket ascent trails launch from screen bottom with glowing spark particles.
     * Bright core flash detonation at peak altitude.
     * Spherical radial burst releasing 40–60 glowing embers that arc downward under gravity and fade out.
     * Automatically cleans up after 4.0 seconds or on screen tap.

---

### 6.5 Fail-Safe Recovery Screen (`StartupFailureApp`)
* **Trigger:** Shown only if the local database (`streak.db`) cannot be opened during application startup (e.g., due to Windows Controlled Folder Access, Ransomware Protection, or file permission locks).
* **Visual Presentation:**
  * Dark full-screen error display independent of the main app theme or state tree.
  * Warning icon badge (`error_outline`).
  * Headline: *"Windows is blocking Streak's data"* or *"Streak could not open its data"*.
  * Explanatory Body:
    * Informs the user that no data has been lost.
    * Provides step-by-step instructions to allow `Streak.exe` through Windows Security Controlled Folder Access settings.
  * Selectable Error Details box showing the exact file system exception message.
  * Log File Path: Displays absolute path to the diagnostic log file.
  * **Action Button:**
    * **"Retry Startup":** Re-attempts SQLite database initialization and launches the main shell without needing to restart the executable.
