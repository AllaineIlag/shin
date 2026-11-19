# Shin — Project Context & Architectural Memory

## 1. Project Identity & Philosophy

**Shin** is an offline-first, privacy-focused habit and personal growth tracking app built with **Expo React Native**.

### The Inspiration
The app is named after **Shin** from the manga *Kingdom*. Shin starts with nothing as an orphaned farm boy and slave. Through relentless, daily, incremental training, grit, and overcoming battle after battle, he rises from an ordinary foot soldier to a 100-man squad commander, a 1,000-man commander, a general, and ultimately strives to become a Great General of the Heavens. 

**Shin (the app)** is designed to be the digital tool for that exact journey: compounding daily discipline, leveling up habits, and building unbreakable personal momentum.

### Core Principles
1. **100% Local-First & Private:** All databases, check-in history, notes, and photos reside exclusively on the user's device. No mandatory cloud accounts, no third-party tracking, and zero telemetry.
2. **Complete Data Sovereignty:** Unrestricted, full JSON/CSV export and import at any time.
3. **Loss Aversion Without Toxicity:** Habit slips do not destroy past progress. Features like Second Chances and Vacation Mode preserve momentum while keeping standards high.
4. **Tangible Visual Consequences:** Daily actions directly fuel real-world visual progress—from completion rings and heatmaps to the interactive miniature Mediterranean diorama (**Streak Island**).

---

## 2. Documentation Map

Before writing any screen or feature code, consult the established specifications:

* **[temp/](file:///c:/Projects/shin/temp): Feature Specifications (Screen-by-Screen Interaction Flows)**
  * [01-home-screen.md](file:///c:/Projects/shin/temp/01-home-screen.md) — Today feed, habit cards, check-in gestures, progress rings, week strip, day actions, and filter sheets.
  * [02-habit-details-screen.md](file:///c:/Projects/shin/temp/02-habit-details-screen.md) — Habit deep-dive, quantitative visualizers (cups, pages, stopwatch), streak ledger, share card studio, and photo viewer.
  * [03-habit-form-screen.md](file:///c:/Projects/shin/temp/03-habit-form-screen.md) — Creation/edit form, habit kinds (positive, avoid/quit, numeric), substeps, frequencies, reminders, and color/icon studio.
  * [04-habit-secondary-screens.md](file:///c:/Projects/shin/temp/04-habit-secondary-screens.md) — Quant stats, notes feed, photo deck, habit journey, and daily timeline (agenda & free time gaps).
  * [05-global-statistics-screen.md](file:///c:/Projects/shin/temp/05-global-statistics-screen.md) — Global 52-week heatmap, 5 charts (streak trend, monthly line, weekday distribution, 24h completion time, donut breakdown), and leaderboards.
  * [06-focus-timer-screen.md](file:///c:/Projects/shin/temp/06-focus-timer-screen.md) — Global focus pill, duration dial, Pomodoro cadence, Zen mode, background video scenes, ambient audio, and session history.
  * [07-todos-screen.md](file:///c:/Projects/shin/temp/07-todos-screen.md) — Task management, paper mode vs list mode, 3D project folders, recurrence rules, and disposal trashcan.
  * [08-settings-screen.md](file:///c:/Projects/shin/temp/08-settings-screen.md) — App styles (Classic, Minimal, Express), custom theme studio (8 channels), streak rules, backups, and app lock.
  * [09-island-and-onboarding.md](file:///c:/Projects/shin/temp/09-island-and-onboarding.md) — Streak Island diorama (76x76 isometric grid, 24h diurnal lighting, 13 districts, coin economy), onboarding carousel, app lock PIN security, and fail-safe recovery screen.
* **[inspo/](file:///c:/Projects/shin/inspo):** Deep technical and structural reference extracted from the original Flutter codebase.
* **[correct-yt.md](file:///c:/Projects/shin/correct-yt.md):** Video course transcript (Expo React Native + AI Agent workflow); Chapter 4 outlines the agent rules and prompt-driven feature workflow, and Chapter 5 defines the Design System and NativeWind v5 setup.

---

## 3. Technology Stack & Architectural Decisions

### 3.1 Framework & Core Engine
* **Runtime:** Expo SDK 58 (`~58.0.26`) with React Native `0.88.1`
* **Language:** TypeScript (`~6.0.3`) in strict mode
* **Navigation:** Expo Router (`~58.0.32`) with file-based routing inside `src/app/`
* **Styling:** NativeWind (v4 / Tailwind CSS v3.4) configured via `tailwind.config.js`, `global.css`, `metro.config.js` (`withNativeWind`), and `babel.config.js`.

### 3.2 Data Storage
* **Core Relational Database:** `expo-sqlite` paired with `drizzle-orm`.
  * Handles structured domain entities: `habits`, `habit_checks`, `focus_sessions`, `todos`, `island_ledger`, and `tags`.
  * Uses modern synchronous JSI APIs (`openDatabaseSync`, `getAllSync`, `execSync`) for instantaneous UI reads without bridge overhead.
* **Preferences & Fast State Cache:** `react-native-mmkv` (or SQLite key-value) for zero-latency startup reads:
  * Theme mode (`light` / `dark`), app style (`classic` / `minimal` / `express`)
  * Fast flags (`has_completed_onboarding`, last active tab)
  * App lock salt, hash, and grace period timestamps

### 3.3 Media & Audio
* **Audio:** `expo-audio` (`useAudioPlayer`) for completion chimes, countdown sound effects, and ambient background audio (rain, waves, white noise).
  * *Note: `expo-av` is deprecated and removed in modern Expo.*
* **Video:** `expo-video` (`VideoView`, `useVideoPlayer`) for looping ambient video scenes during Focus sessions.

### 3.4 Dependency Discipline Policy
* **Lean Baseline:** Do not install specialized libraries in advance.
* Only the Core Foundation (Expo Router, NativeWind, Expo SQLite + Drizzle) belongs in the baseline.
* Specialized packages are introduced **strictly on-demand** when their dedicated feature is planned:
  * `@shopify/react-native-skia` & `victory-native` $\rightarrow$ Introduced for Global Stats & Streak Island.
  * `expo-audio` & `expo-video` $\rightarrow$ Introduced for Focus Timer.
  * `expo-notifications` $\rightarrow$ Introduced for Daily Reminders.
  * `expo-local-authentication` $\rightarrow$ Introduced for App Lock.
  * `fflate` $\rightarrow$ Introduced for ZIP backup packaging.
* **Always install packages via `npx expo install <package>`** to guarantee SDK compatibility.

### 3.5 Development & Testing Target
* **Host Platform:** Windows with PowerShell.
* **Primary Device:** Physical Android phone connected via **Expo Go** for initial core development.
* **Development Build APK:** When native-only libraries (such as Skia) are introduced later, generate and install an Expo Development Build APK on the physical phone.

---

## 4. Application Directory Architecture

```
shin/
├── src/
│   ├── app/                    # Expo Router screens and layouts ONLY
│   │   ├── (tabs)/             # 5 primary destinations
│   │   │   ├── _layout.tsx     # Tab navigator & custom bottom bar
│   │   │   ├── today.tsx       # Habit feed & check-in loop
│   │   │   ├── todos.tsx       # Tasks, paper mode & folders
│   │   │   ├── plan.tsx        # Daily agenda & time blocks
│   │   │   ├── stats.tsx       # Global heatmaps & charts
│   │   │   └── settings.tsx    # Appearance, styles, rules & backup
│   │   ├── habit/              # Habit details & habit form modals
│   │   ├── focus/              # Active focus session & scenes
│   │   ├── island/             # Streak Island diorama page
│   │   └── _layout.tsx         # Root layout (providers, AppLockGate)
│   ├── components/             # Reusable UI components & modals
│   ├── db/                     # SQLite client, Drizzle schema & migrations
│   ├── hooks/                  # Custom React hooks (habits, timer, sound)
│   ├── lib/                    # Utilities, date algorithms & streak math
│   └── types/                  # TypeScript interface definitions
├── prompts/                    # Feature plans (TEMPLATE.md, NN-feature.md)
├── temp/                       # Screen-by-screen feature specifications
├── inspo/                      # Deep architecture references
├── CONTEXT.md                  # This file (Project vision & decision record)
└── AGENTS.md                   # Operational rules & instructions
```

---

## 5. Phased Implementation Roadmap

1. **Phase 1: Foundation & Styling**
   * Configure NativeWind v4 / Tailwind CSS v3.4 (`tailwind.config.js`, `global.css`, `metro.config.js`, `babel.config.js`).
   * Verify rendering on physical Android phone via Expo Go.
2. **Phase 2: Navigation Shell**
   * Scaffold `src/app/(tabs)/` with the 5 core tabs (`today`, `todos`, `plan`, `stats`, `settings`).
   * Build responsive navigation bar (Classic floating glass pill with smooth sliding tab indicators).
3. **Phase 3: SQLite Database & Core Habit Loop**
   * Install and configure `expo-sqlite` and `drizzle-orm`.
   * Create schema (`habits`, `habit_checks`, `categories`, `settings`).
   * Build Habit Card components on `today` screen: tap-to-complete, quantitative steppers, streak count calculations, and second chances.
4. **Phase 4: Habit Form & Details**
   * Build habit creation/editing modal (kind, color/icon picker, frequency rules, reminders).
   * Build habit details view (progress visualizers, history calendar, notes, miss reasons).
5. **Phase 5: Focus Timer & Media Engine**
   * Integrate `expo-audio` and `expo-video`.
   * Duration dial, Pomodoro cadence, Zen mode, background scenes, and ambient audio loops.
6. **Phase 6: Todos & Time Planning**
   * Task manager with paper/list mode, collapsible date sections, and 3D project folders.
   * Day timeline with time-blocked habits and free time gap calculations.
7. **Phase 7: Global Statistics & Skia Graphics**
   * Add `@shopify/react-native-skia` and `victory-native`.
   * 52-week activity heatmap, 5 core charts, consistency radial gauge, and habit leaderboards.
8. **Phase 8: Streak Island Diorama**
   * 76x76 isometric grid diorama, pan/zoom inertia, 4-way compass rotation.
   * 24-hour diurnal lighting engine (Dawn, Daylight, Sunset, Dusk, Night).
   * Island Shop, 13 districts catalog, and coin ledger minting schedule.
9. **Phase 9: Settings, Security & Data Ownership**
   * App styles switcher (Classic, Minimal, Express) and 8-channel Custom Theme Studio.
   * App Lock (Biometrics via `expo-local-authentication` + 4-digit PIN with 12-digit recovery key).
   * Universal backup exporter & importer (`expo-file-system`, `fflate`).
