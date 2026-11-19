import React, { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import { useColorScheme as useSystemColorScheme, View, type ViewStyle } from "react-native";
import { vars } from "nativewind";
import { curatedThemes, type ThemeColors } from "./colors";

export type ThemeMode = "system" | "light" | "dark";
export type ColorThemeId = "default" | "catppuccin" | "tokyo_night" | "nord" | "gruvbox" | "rose_pine";
export type AppStyle = "classic" | "minimal" | "express";

interface ThemeContextValue {
  themeMode: ThemeMode;
  colorThemeId: ColorThemeId;
  appStyle: AppStyle;
  accentColor: string | null;
  isDark: boolean;
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
  setColorThemeId: (id: ColorThemeId) => void;
  setAppStyle: (style: AppStyle) => void;
  setAccentColor: (color: string | null) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [colorThemeId, setColorThemeId] = useState<ColorThemeId>("default");
  const [appStyle, setAppStyle] = useState<AppStyle>("classic");
  const [accentColor, setAccentColor] = useState<string | null>(null);

  const isDark = useMemo(() => {
    if (themeMode === "system") return systemScheme === "dark";
    return themeMode === "dark";
  }, [themeMode, systemScheme]);

  const preset = curatedThemes[colorThemeId] || curatedThemes.default;
  const baseColors = isDark ? preset.dark : preset.light;

  const colors: ThemeColors = useMemo(() => {
    if (!accentColor) return baseColors;
    return {
      ...baseColors,
      accent: accentColor,
    };
  }, [baseColors, accentColor]);

  const themeVars = useMemo(
    () =>
      vars({
        "--color-bg": colors.background,
        "--color-card": colors.card,
        "--color-high": colors.high,
        "--color-highest": colors.highest,
        "--color-outline": colors.outline,
        "--color-text": colors.text,
        "--color-muted": colors.muted,
        "--color-accent": colors.accent,
        "--color-success": colors.success,
        "--color-warning": colors.warning,
        "--color-danger": colors.danger,
        "--color-info": colors.info,
      }),
    [colors]
  );

  const value = useMemo(
    () => ({
      themeMode,
      colorThemeId,
      appStyle,
      accentColor,
      isDark,
      colors,
      setThemeMode,
      setColorThemeId,
      setAppStyle,
      setAccentColor,
    }),
    [themeMode, colorThemeId, appStyle, accentColor, isDark, colors]
  );

  return (
    <ThemeContext.Provider value={value}>
      <View style={[{ flex: 1 }, themeVars as ViewStyle]}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
