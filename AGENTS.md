# Shin

Personal habit, discipline, and momentum tracking app built with Expo React Native. Inspired by Shin from the manga *Kingdom*—leveling up from farm boy to Great General through relentless daily incremental improvement. 100% local-first, private, and offline-first.

**Project Context & Specs:**
- Read `CONTEXT.md` for full background, architecture decisions, tech stack rationales, and the phased roadmap.
- Read `temp/` for screen-by-screen user interaction specs, button behaviors, and popup flows.

## Commands

~~~bash
npx expo install <package>  # ALWAYS use instead of npm install: resolves SDK-compatible versions
npx expo start              # dev server (scan QR with Expo Go on Android phone)
npx expo lint               # lint
npx tsc --noEmit            # type check
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
~~~

## Expo & Tech Stack Rules

- **Expo SDK Version:** Before touching any API, check the `expo` major version in `package.json` and read `https://docs.expo.dev/versions/v<major>.0.0/`.
- **Styling:** NativeWind (v4 / Tailwind CSS v3.4) configured with `tailwind.config.js`, `global.css`, `metro.config.js` (`withNativeWind`), and `babel.config.js`. Use utility classes (`className="..."`).
- **Database:** `expo-sqlite` + `drizzle-orm` for structured domain data (`habits`, `habit_checks`, `focus_sessions`, `todos`, `island_ledger`). Use synchronous JSI queries (`openDatabaseSync`, `getAllSync`, `execSync`).
- **Preferences:** `react-native-mmkv` or SQLite key-value for instant startup state (theme, styles, flags).
- **Media:** `expo-audio` for sounds/chimes/ambient loops; `expo-video` for focus scenes. `expo-av` is deprecated and removed.
- **Routes:** Screens and layouts live strictly in `src/app/`. Components, database schemas, hooks, and utils live in `src/` outside `app/`.
- **Generated Folders:** `android/` and `ios/` are generated. Never edit them by hand; configure behavior in `app.json` and config plugins.
- **Testing Target:** Physical Android device running Expo Go for initial development. Transition to an Expo Development Build APK only when native-only libraries (e.g. Skia) are added.

## Dependency Discipline Rule

Do NOT install libraries in advance. Keep the project baseline lean (Expo Router, NativeWind v4, Expo SQLite + Drizzle). Specialized libraries (`@shopify/react-native-skia`, `victory-native`, `expo-audio`, `expo-video`, `expo-notifications`, `expo-local-authentication`, `fflate`, etc.) are strictly prohibited until the specific feature prompt in `prompts/` calls for them.

## How We Build Features

For any new feature or multi-file change:

1. **Understand:** Read the code involved and the corresponding spec in `temp/` and `CONTEXT.md`.
2. **Ask:** If a decision is unclear (scope, visible behavior, data shape), ask through the question panel with the recommended option first.
3. **Plan:** Copy `prompts/TEMPLATE.md` to `prompts/NN-feature-name.md` (next sequence number) and detail the steps.
4. **IMPORTANT — Stop and Wait:** Write NO app code until the user approves the plan. Ask for approval in the question panel. On approval, set `Status: approved`.
5. **Build:** Implement step by step, testing each piece.
6. **Close Out:**
   - Run verification (`npx tsc --noEmit`, `npx expo lint`).
   - Add a short `## Result` to the plan and set `Status: done`.
   - Deliver the standard report. Keep this file under 150 lines.

## Design System & Styling Rules

- **Tokens & Colors:** Never write hardcoded hex values in screens or components. All colors must use semantic theme classes (`bg-theme-bg`, `bg-theme-card`, `bg-theme-high`, `bg-theme-highest`, `text-theme-text`, `text-theme-muted`, `border-theme-outline`, `bg-theme-accent`, `bg-theme-success`, `bg-theme-danger`, `bg-theme-warning`, `bg-theme-info`) or `useTheme().colors` for canvas/status bar.
- **Typography:** Always use `<Text variant="..." weight="...">` from `src/components/ui`. It automatically binds to the user's active presentation style (Classic: `GoogleSansRounded`, Minimal: `Figtree`, Express: `GoogleSansFlex`).
- **Icons:** Standardized across the entire app via `lucide-react-native`.
- **Buttons & Radiuses:** Buttons must use the stadium capsule shape (`rounded-full`). Cards must use `rounded-[24px]` (or `rounded-[30px]` in Express) with `border border-theme-outline`.
- **Primitives:** All reusable UI pieces live in `src/components/ui/` (`Text`, `Button`, `Card`, `TextField`, `Chip`, `Switch`, `Stepper`, `EmptyState`). Never invent one-off ad-hoc button or input styles on individual screens.

## Reporting Format

End every implementation task with this exact structured report:

- **Done:** One-line outcome, followed by bulleted list of files changed and what changed.
- **Verified:** Each check with ✅ or ❌ and its evidence (TypeScript output, lint output, runtime check).
- **You need to:** Numbered actions only the user can take (e.g. scanning QR code, pressing buttons).
- **Test it yourself:** Numbered steps to reproduce and verify the result on device, ending with `Expected:`.
- **Notes:** Trade-offs, assumptions made, or next steps.

## Checks

- Lint and type check (`npx tsc --noEmit`) must pass with zero errors before calling any task done.
- Screens that load data must handle loading, error, and empty states.
