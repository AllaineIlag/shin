export interface ThemeColors {
  background: string;
  card: string;
  high: string;
  highest: string;
  outline: string;
  text: string;
  muted: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export interface ColorThemePreset {
  id: string;
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}

/**
 * Direct reference: Streak Peak (lib/app/theme/app_palette.dart & app_tokens.dart)
 */
export const AppPalette = {
  brand: "#7C3AED",
  brandDark: "#5B21B6",
  brandSoft: "#A78BFA",

  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",

  darkBackground: "#0D0D0D",
  paperDark: "#090909",
  paperDarkCard: "#131313",
  paperDarkRaised: "#212121",
  darkSurface: "#141414",
  darkCard: "#1A1A1A",
  darkElevated: "#232326",
  darkBorder: "#2C2C2E",
  textSecondary: "#8E8E93",
} as const;

/**
 * Direct reference: Streak Peak
 * Default theme: lib/features/settings/widgets/color_theme_sheet.dart (_defaultColors)
 * Presets: lib/app/theme/color_themes.dart (ColorTheme.all)
 */
export const curatedThemes: Record<string, ColorThemePreset> = {
  default: {
    id: "default",
    name: "Default (Brand)",
    light: {
      background: "#EDEDF3",
      card: "#FFFFFF",
      high: "#EDEDF2",
      highest: "#E4E4EC",
      outline: "#D9D9E0",
      text: "#1C1C1E",
      muted: "#6B7280",
      accent: AppPalette.brand,     // #7C3AED
      success: AppPalette.success,  // #22C55E
      warning: AppPalette.warning,  // #F59E0B
      danger: AppPalette.danger,    // #EF4444
      info: AppPalette.info,        // #3B82F6
    },
    dark: {
      background: AppPalette.darkBackground, // #0D0D0D
      card: AppPalette.darkCard,             // #1A1A1A
      high: "#1F1F22",
      highest: AppPalette.darkElevated,      // #232326
      outline: AppPalette.darkBorder,        // #2C2C2E
      text: "#FFFFFF",
      muted: "#9CA3AF",
      accent: AppPalette.brand,     // #7C3AED
      success: AppPalette.success,  // #22C55E
      warning: AppPalette.warning,  // #F59E0B
      danger: AppPalette.danger,    // #EF4444
      info: AppPalette.info,        // #3B82F6
    },
  },
  catppuccin: {
    id: "catppuccin",
    name: "Catppuccin",
    light: {
      background: "#E6E9EF",
      card: "#EFF1F5",
      high: "#DCE0E8",
      highest: "#CCD0DA",
      outline: "#BCC0CC",
      text: "#4C4F69",
      muted: "#6C6F85",
      accent: "#8839EF",
      success: "#40A02B",
      warning: "#DF8E1D",
      danger: "#D20F39",
      info: "#1E66F5",
    },
    dark: {
      background: "#181825",
      card: "#1E1E2E",
      high: "#313244",
      highest: "#45475A",
      outline: "#45475A",
      text: "#CDD6F4",
      muted: "#A6ADC8",
      accent: "#CBA6F7",
      success: "#A6E3A1",
      warning: "#F9E2AF",
      danger: "#F38BA8",
      info: "#89B4FA",
    },
  },
  tokyo_night: {
    id: "tokyo_night",
    name: "Tokyo Night",
    light: {
      background: "#D0D5E3",
      card: "#E1E2E7",
      high: "#C4C8DA",
      highest: "#B7BCD3",
      outline: "#A8AECB",
      text: "#3760BF",
      muted: "#6172B0",
      accent: "#2E7DE9",
      success: "#587539",
      warning: "#8C6C3E",
      danger: "#F52A65",
      info: "#007197",
    },
    dark: {
      background: "#16161E",
      card: "#1A1B26",
      high: "#292E42",
      highest: "#3B4261",
      outline: "#3B4261",
      text: "#C0CAF5",
      muted: "#737AA2",
      accent: "#7AA2F7",
      success: "#9ECE6A",
      warning: "#E0AF68",
      danger: "#F7768E",
      info: "#7DCFFF",
    },
  },
  nord: {
    id: "nord",
    name: "Nord",
    light: {
      background: "#D8DEE9",
      card: "#ECEFF4",
      high: "#E5E9F0",
      highest: "#C0C8D6",
      outline: "#B4BED0",
      text: "#2E3440",
      muted: "#4C566A",
      accent: "#4C6E9A",
      success: "#6A8A50",
      warning: "#D08770",
      danger: "#BF616A",
      info: "#5E81AC",
    },
    dark: {
      background: "#242933",
      card: "#2E3440",
      high: "#3B4252",
      highest: "#4C566A",
      outline: "#4C566A",
      text: "#ECEFF4",
      muted: "#B4BCCB",
      accent: "#88C0D0",
      success: "#A3BE8C",
      warning: "#EBCB8B",
      danger: "#BF616A",
      info: "#81A1C1",
    },
  },
  gruvbox: {
    id: "gruvbox",
    name: "Gruvbox",
    light: {
      background: "#F2E5BC",
      card: "#FBF1C7",
      high: "#EBDBB2",
      highest: "#D5C4A1",
      outline: "#D5C4A1",
      text: "#3C3836",
      muted: "#7C6F64",
      accent: "#AF3A03",
      success: "#79740E",
      warning: "#B57614",
      danger: "#9D0006",
      info: "#076678",
    },
    dark: {
      background: "#1D2021",
      card: "#282828",
      high: "#3C3836",
      highest: "#504945",
      outline: "#504945",
      text: "#EBDBB2",
      muted: "#A89984",
      accent: "#FE8019",
      success: "#B8BB26",
      warning: "#FABD2F",
      danger: "#FB4934",
      info: "#83A598",
    },
  },
  rose_pine: {
    id: "rose_pine",
    name: "Rosé Pine",
    light: {
      background: "#FAF4ED",
      card: "#FFFFF3",
      high: "#F2E9E1",
      highest: "#DFDAD9",
      outline: "#DFDAD9",
      text: "#575279",
      muted: "#797593",
      accent: "#907AA9",
      success: "#56949F",
      warning: "#EA9D34",
      danger: "#B4637A",
      info: "#286983",
    },
    dark: {
      background: "#191724",
      card: "#1F1D2E",
      high: "#26233A",
      highest: "#403D52",
      outline: "#403D52",
      text: "#E0DEF4",
      muted: "#908CAA",
      accent: "#C4A7E7",
      success: "#9CCFD8",
      warning: "#F6C177",
      danger: "#EB6F92",
      info: "#EBBCBA",
    },
  },
};

/**
 * 40+ Curated habit color swatches from Streak Peak (lib/app/theme/app_palette.dart)
 */
export const habitColors = [
  // Reds / Pinks
  "#FF3B30",
  "#FF6B6B",
  "#C0392B",
  "#FF375F",
  "#FF2D92",
  // Oranges
  "#FF9500",
  "#FF6D00",
  "#FF8C42",
  "#E67E22",
  // Yellows
  "#FFCC00",
  "#FFD60A",
  "#F4D03F",
  // Limes / Greens
  "#A8E063",
  "#7ED321",
  "#30D158",
  "#34C759",
  "#00C853",
  "#2ECC71",
  "#1ABC9C",
  // Cyans / Teals
  "#4ECDC4",
  "#006689",
  "#26C6DA",
  "#00BCD4",
  "#5AC8FA",
  // Blues
  "#0A84FF",
  "#007AFF",
  "#2196F3",
  "#3498DB",
  // Purples
  "#5856D6",
  "#7C3AED",
  "#9B59B6",
  "#6C3483",
  // Pinks / Magentas
  "#BF5AF2",
  "#E91E8C",
  "#FF6EB4",
  // Earth / Browns
  "#A0522D",
  "#8B6914",
  // Grays / Monochromes
  "#8E8E93",
  "#636366",
  "#48484A",
  "#FFFFFF",
  "#1C1C1E",
] as const;
