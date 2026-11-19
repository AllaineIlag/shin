# Settings Screen — Functional Specification & Interaction Flow

## 1. Overview
The **Settings Screen** (`SettingsPage`) manages all user personalization, visual themes, habit behavioral rules, feature modules, security lock, and offline backup/sync pipelines.

It operates seamlessly across all three visual presentation styles (**Classic**, **Minimal**, and **Express**).

---

## 2. User Profile & Identity Header

* **Profile Header Elements:**
  * **Avatar Photo:** Displays circular (or Express cookie-blob) picture.
  * **Display Name:** User's custom nickname (defaults to *"Default User"*).
  * **Edit Profile Row / Chip:**
* **Actions:**
  1. **Change Avatar Photo:**
     * Launches the device photo library.
     * Selecting a photo crops/scales it to 600px and updates the avatar immediately.
  2. **Edit Display Name:**
     * Pops up the **Edit Name Dialog** (`_NameDialog`).
     * Text field pre-filled with current name.
     * **"Save" Button:** Commits name and closes dialog.
     * **"Cancel" Button:** Discards changes.

---

## 3. App Style Selection Screen (`AppStylePage`)

* **Entry Point:** Settings $\rightarrow$ **App Style**.
* **What it shows:** 3 live interactive skeleton preview cards representing:
  1. **Classic Style:** Structured cards, blurred glass app bar, bottom tab navigation bar, rounded corners.
  2. **Minimal Style:** Swiss typographic layout, soft borderless surfaces, floating minimal navigation capsule.
  3. **Express Style:** Bouncy organic blobs (`cookie`, `flower`, `gem`), squash-and-stretch touch physics, liquid wave progress bars.
* **Selecting a style:**
  * Tapping any card immediately restyles the entire application's navigation, components, and animations.
  * Selected style shows an active highlighted border and checkmark.

---

## 4. Appearance & Visual Customization

### 4.1 Theme Mode
* Options: **System Default**, **Light**, **Dark**.
* Tapping immediately flips the app's brightness and color tokens.

---

### 4.2 Color Theme System (`showColorThemeSheet`)
* **When clicked:** Opens the **Color Theme Selection Sheet**.
* **What's inside the sheet:**
  * **Default Theme:** Dynamically matches system light/dark mode and uses the user's custom accent color.
  * **Curated Palette Presets:** Grid of pre-designed themes with balanced cards, text, and semantic accents (Forest, Sunset, Ocean, Lavender, Coffee, Midnight, etc.).
  * **"Custom Theme" Card:** Tapping opens the **Custom Theme Studio** (Section 4.3).

---

### 4.3 Custom Theme Studio (`showCustomThemeSheet`)
* Allows designing custom color palettes from scratch with independent definitions for **Light Mode** and **Dark Mode**:
* **Customizable Channels:**
  * Background Color
  * Card Surface Color
  * Primary Text Color
  * Accent Brand Color
  * Success Color (Completed)
  * Warning Color (Streaks)
  * Danger Color (Relapse / Errors)
  * Info Color (Vacation / Notes)
* **Color Picker Modal:** Tapping any channel opens the HSV color wheel and direct HEX text input (`#RRGGBB`).
* **"Save Theme" Button:** Applies custom colors across the app.

---

### 4.4 Standalone Accent Color Sheet (`showAccentSheet`)
* *Active when using the Default Color Theme.*
* Displays a palette of 20 high-contrast accent colors.
* **"Dynamic System Accent" Chip:** On Android 12+ (Material You) and Windows, extracts the operating system's wallpaper color.
* Tapping any swatch instantly updates all buttons, rings, and active badges.

---

### 4.5 App Backgrounds (`showBackgroundSheet`)
Customizes the root canvas behind all screens:
1. **Solid:** Flat clean neutral surface.
2. **Gradient:** Soft vertical top-to-bottom surface gradient.
3. **Dots Matrix:** Micro-dot grid pattern providing visual depth.
4. **OLED Pure Black:** True `#000000` pitch black across all screens for maximum OLED battery savings.
5. **Custom Wallpaper:** Opens device gallery to pick any photo as full-bleed app wallpaper.

---

### 4.6 Check Mark Style
* Toggle switch between:
  * **Square:** Traditional rounded checklist box.
  * **Circle:** Circular checkmark bullet.

---

### 4.7 App Launcher Icon (Mobile)
* Options: **Default** (vibrant), **Neutral** (monochrome), **Accent** (tinted to user's accent color).
* Tapping updates the phone's home screen app launcher icon.

---

### 4.8 Performance Tuning Toggles
* **Glass Effects Toggle (`glassEffects`):** Enables or disables real-time frosted glass backdrop blurs across navigation bars and cards. Disabling speeds up older devices.
* **Animations Toggle (`animations`):** Master switch for micro-interactions, page transitions, and spring physics.

---

### 4.9 Android Home Screen Widget Customizer (`WidgetStyleList`)
* Dedicated configurator for Android home screen widgets:
  * Previews 6 widget types: *Habit, Today Checklist, Overall Stats, Year Heatmap, Todos, Focus Timer*.
  * **Widget Background Color Picker:** Adjusts widget background color.
  * **Widget Opacity Slider (0% to 100%):** Controls transparency from solid to transparent.
  * **Widget Border Toggle:** Adds subtle outline stroke around widgets.
  * **"Open Widget Editor" Button:** Launches platform-native widget configuration interface.

---

## 5. General Preferences & Locales

### 5.1 Language Selector (`showLanguageSheet`)
* Opens language bottom sheet supporting **System Default** plus **22 fully translated locales** (English, Spanish, Chinese, German, French, Portuguese, Italian, Russian, Japanese, Korean, Arabic, Turkish, Dutch, Polish, Romanian, Ukrainian, Hindi, Indonesian, Czech, Swedish, Vietnamese, Catalan).
* Tapping a language instantly translates all screens without requiring an app restart.

---

### 5.2 Desktop Keyboard Shortcuts Help
* *Available on Desktop (Windows, macOS, Linux).*
* Opens modal listing global hotkeys:
  * `Ctrl/Cmd + N`: Create habit / todo.
  * `Ctrl/Cmd + F`: Focus search.
  * `Ctrl/Cmd + S`: Save form.
  * `1` through `5`: Jump between primary tabs.

---

### 5.3 First Day of the Week
* Options: **Monday** (Default), **Saturday**, **Sunday**.
* Selecting recalculates all calendar grids, week strips, and weekly streak quotas immediately.

---

### 5.4 Day Start / Night Owl Cutoff Hour
* Options: **Midnight (0:00)**, **1:00 AM**, **2:00 AM**, **3:00 AM**, **4:00 AM**, **5:00 AM**, **6:00 AM**.
* **Functionality:** Extends the active day until the chosen cutoff. Habits checked at 2:00 AM count toward yesterday's goals rather than prematurely logging for the new day.

---

### 5.5 Completion Celebration Effects (`showCelebrationSheet`)
* Configures the particle animation triggered when completing habits:
  * **Confetti:** Multicolored celebratory paper shower.
  * **Fireworks:** Radial spark and starburst explosions.
  * **Surprise:** Randomly alternates between confetti and fireworks.
  * **None:** Quiet mode (no particle overlays).
* **Interactive Preview Stage:** Sheet includes a test habit card with a replay button to preview animations before saving.

---

### 5.6 Completion Sound Toggle (`checkSound`)
* When ON: Plays a satisfying tactile bell/click sound upon checking off a habit.

---

### 5.7 Motivational Quotes Engine (`QuotesPage`)
* **Source Mode Selector:**
  * **App Quotes Only:** Uses built-in curated library.
  * **My Quotes Only:** Displays exclusively user-written affirmations.
  * **Both Combined:** Mixes curated and custom quotes.
  * **Off:** Hides quote banners completely.
* **Custom Quote Manager:**
  * Displays list of user-created quotes.
  * **"+ Add Quote" Button:** Opens quote authoring dialog (up to 140 characters).
  * **Edit / Delete Actions:** Edit quote text or remove custom affirmations.

---

## 6. Today Feed & Habit Behavioral Rules

### 6.1 View & Layout Options
* **Start View:** Opening calendar mode: *Last Used*, *Week Grid*, *Month*, *Year*.
* **Card Activity Grid Toggle:** Renders mini completion heatmaps directly on habit cards.
* **View Switcher Toggle:** Adds top navigation tabs between overview and focus views.
* **Heatmap Path Toggle:** Draws connecting snake lines between completed days on heatmaps.
* **Heatmap Rolling Window Toggle:** Displays a continuous rolling 30/60-day window instead of calendar months.
* **Sort Completed Last Toggle:** Automatically sinks finished habit cards to the bottom of the list.
* **Today Only Toggle:** Restricts list strictly to habits scheduled for today.
* **Hide Done Habits Toggle:** Completely conceals finished habits into a collapsed fold header.
* **Past Days First Toggle:** Inverts timeline order so past history precedes future dates.
* **Today Progress Bar Toggle:** Toggles the header progress ring/wave bar.
* **Today Week Strip Toggle:** Toggles the 7-day quick calendar strip.
* **Swipe Between Cards Toggle:** Converts vertical list into a horizontal full-card swiper.

---

### 6.2 Habit Logic & Streak Rules
* **Vacation Mode for All Habits (`vacationAll`):**
  * Master switch that pauses streak obligations across every active habit simultaneously.
  * When turned OFF: Automatically restores individual habit pause states cleanly.
* **Just Tracking Mode Toggle (`trackingOption`):**
  * Enables casual logging mode without streak penalties or failure states.
* **Habit Difficulty Weighting Toggle (`difficultyOption`):**
  * Weights habit progress by difficulty rating (Easy, Medium, Hard).
* **Second Chances Toggle (`secondChances`):**
  * Implements streak freeze protection (earning 1 chance per 30 consecutive streak days).
* **Quiet When Done Toggle (`quietWhenDone`):**
  * Automatically cancels remaining scheduled reminder notifications for the day once a habit is completed.

---

## 7. Modular Feature Toggles

Allows enabling or disabling major sub-systems:
* **Focus Timer (`focusEnabled`):** Toggles focus clock module.
  * **Focus Daily Goal:** Opens Number Keypad Dialog to configure daily target focus minutes.
* **Habit Notes (`notesEnabled`):** Toggles habit journaling and photo logs.
* **To-Do Lists (`todosEnabled`):** Toggles task list integration.
  * **Todo Style Selector:** Switches between Structured List (`todo_view_list`) and Sticky Paper Notes (`todo_view_papers`).
* **Day Planning Integration (`planChoice`):** Controls morning planning behavior: *Off*, *Habits Only*, *Todos Only*, *Both*.
* **Gamification Island Beta (`islandEnabled`):** Toggles virtual reward island.

---

## 8. Security & App Lock

* **App Lock Master Toggle:** Turns biometric/PIN lock on or off.
* **Authentication Method Selector:**
  * **Biometric Hardware:** Fingerprint, Touch ID, or Face ID (falls back to PIN).
  * **PIN Code:** 4-digit numeric code.
* **PIN Setup Screen (`PinSetupPage`):**
  * Keypad interface to enter a 4-digit PIN, followed by confirmation keypad.
  * Changing PIN requires verifying the existing code first.
* **Inactivity Lock Delay:**
  * Options: **Instant (0s)**, **30 Seconds**, **1 Minute**, **5 Minutes**.
  * Determines how long the app can stay in the background before re-locking.

---

## 9. Data Management, Backup & Synchronization

### 9.1 Universal App Importer (`ImportAppsCard`)
* Migrates data from external habit trackers:
  * **Supported Formats:** Loop Habit Tracker, HabitKit, Habitica, HabitBull, Habitify, Habit Builder, and generic CSV spreadsheets.
  * Select file $\rightarrow$ parses foreign logs and frequencies $\rightarrow$ merges into Streak database with progress bar.

---

### 9.2 Manual Backup Export (`exportBackup`)
* Generates an encrypted `.zip` archive (plus uncompressed JSON) containing all habits, completions, notes, photos, todos, and focus sessions.
* **Android:** Prompts to save to folder or trigger system Share Sheet.
* **iOS / Desktop:** Opens native file save dialog or Share Sheet.
* Supports exporting the full database or isolating an individual habit.

---

### 9.3 Backup Import (`importBackup`)
* Selecting a `.zip` backup prompts the **Import Mode Dialog**:
  1. **Merge Mode:** Merges backup records into existing habits without overwriting active streaks.
  2. **Replace Mode:** Completely wipes database and restores from backup snapshot.
* Shows animated loading dialog (`runWithLoadingDialog`) during restore.

---

### 9.4 Scheduled Auto-Backups & Peer-to-Peer Sync (`pickAutoBackup`)
* **Frequency:** *Disabled*, *Daily*, or *Weekly*.
* **Backup Storage Folder:** Tap to select any local folder or SD card directory.
* **"Human-Readable Copy" Toggle:** Exports uncompressed JSON alongside `.zip` files.
* **Zero-Cloud Auto-Sync Toggle (`autoSync`):** Designed for local sync tools like Syncthing or Nextcloud. Automatically syncs folder changes across devices without third-party cloud servers.
* **"Run Backup Now" Button:** Executes an immediate backup snapshot.
* **"Refresh Now" Button:** Pulls remote file changes from folder and refreshes memory caches.

---

### 9.5 Desktop Data Folder Migration (`DataFolderActions`)
* *Desktop only (Windows, macOS, Linux).*
* Relocates database directory to:
  1. *Documents Folder:* `Documents/Streak`
  2. *Portable Directory:* Next to app executable (for USB drives).
  3. *Custom Directory:* Any user-selected path.
* Verifies folder write permissions, moves files safely, terminates database, and prompts restart.

---

### 9.6 Archived Habits Vault (`ArchivedHabitsPage`)
* Lists all archived habits with their original icons, colors, names, and archived dates.
* **"Restore" Button:** Restores habit back to the active Home feed.
* **"Delete Forever" Button (Trash icon):**
  * Opens confirmation dialog: *"Delete habit permanently?"*.
  * Confirming permanently shreds the habit and all its history, notes, and photos from disk.

---

### 9.7 Reset & Data Purge Controls
* **"Clear Progress" Action:**
  * Opens confirmation dialog: *"Clear all progress?"*.
  * Resets completion marks, streaks, and focus records while keeping habit definitions, categories, and reminders intact.
* **"Wipe Everything" Action (Factory Reset):**
  * Severe two-stage confirmation dialog with red warning badges.
  * Automatically creates a safety backup snapshot on disk first.
  * Cancels all scheduled OS notifications, wipes all local databases, and resets settings to factory defaults.

---

## 10. Community, Support & About Screen

### 10.1 Support & Community Links
* **"Share with Friends":** Opens native share sheet with recommendation message.
* **"Star on GitHub":** Opens open-source repository link.
* **"Buy a Coffee":** Opens donation support link (Ko-fi).
* **"Report an Issue":** Direct link to open an issue on GitHub.
* **Support Mascot Card:** Displays illustrated cat graphic with thank-you note from developer.

---

### 10.2 About Page (`AboutPage`)
* **Header:** Animated app icon with entrance bounce and ambient glow.
* **Typewriter Story:** Displays animated text telling the app's local-first privacy philosophy.
* **Developer Link:** Direct link to developer profile.
* **Version & Open Source License:** Displays dynamic app build version and link to MIT/Apache license.
