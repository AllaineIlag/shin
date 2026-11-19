import React, { useState } from "react";
import {
  ScrollView,
  View,
  Pressable,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  Text,
  Button,
  Card,
  TextField,
  Chip,
  Switch,
  Stepper,
} from "../components/ui";
import {
  useTheme,
  type ThemeMode,
  type ColorThemeId,
  type AppStyle,
} from "../theme/theme-context";
import { habitColors, AppPalette } from "../theme/colors";
import {
  ArrowLeft,
  Flame,
  Check,
  Search,
  Sparkles,
  Palette,
  Type,
  Sliders,
  Heart,
} from "lucide-react-native";

export default function DesignSystemScreen() {
  const router = useRouter();
  const {
    themeMode,
    setThemeMode,
    colorThemeId,
    setColorThemeId,
    appStyle,
    setAppStyle,
    accentColor,
    setAccentColor,
    colors,
    isDark,
  } = useTheme();

  const [textValue, setTextValue] = useState("Daily Running");
  const [switchValue, setSwitchValue] = useState(true);
  const [stepperValue, setStepperValue] = useState(8);
  const [selectedChip, setSelectedChip] = useState("All");

  const themesList: { id: ColorThemeId; name: string }[] = [
    { id: "default", name: "Default (Brand)" },
    { id: "catppuccin", name: "Catppuccin" },
    { id: "tokyo_night", name: "Tokyo Night" },
    { id: "nord", name: "Nord" },
    { id: "gruvbox", name: "Gruvbox" },
    { id: "rose_pine", name: "Rosé Pine" },
  ];

  const styleList: { id: AppStyle; label: string }[] = [
    { id: "classic", label: "Classic (Rounded)" },
    { id: "minimal", label: "Minimal (Figtree)" },
    { id: "express", label: "Express (Flex)" },
  ];

  const modes: ThemeMode[] = ["system", "light", "dark"];

  return (
    <SafeAreaView className="flex-1 bg-theme-bg">
      <StatusBar style={isDark ? "light" : "dark"} />

      <ScrollView
        className="flex-1 px-4 pt-4 pb-12"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-theme-high items-center justify-center border border-theme-outline active:opacity-75"
          >
            <ArrowLeft size={20} color={colors.text} />
          </Pressable>

          <View className="items-center">
            <Text variant="title" weight="bold">
              Design System
            </Text>
            <Text variant="caption" className="text-theme-muted">
              Shin Foundation · Streak Peak Spec
            </Text>
          </View>

          <View className="w-10" />
        </View>

        {/* Section: Mode & Theme Controls */}
        <Card padding="md" className="mb-6">
          <View className="flex-row items-center mb-3">
            <Sliders size={18} color={colors.accent} />
            <Text variant="title" weight="bold" className="ml-2">
              Appearance Engine
            </Text>
          </View>

          {/* Theme Mode Toggle */}
          <Text variant="label" weight="medium" className="text-theme-muted mb-2">
            Theme Mode:
          </Text>
          <View className="flex-row space-x-2 mb-4">
            {modes.map((m) => (
              <Chip
                key={m}
                label={m.toUpperCase()}
                selected={themeMode === m}
                onPress={() => setThemeMode(m)}
                className="mr-2"
              />
            ))}
          </View>

          {/* Curated Theme Preset */}
          <Text variant="label" weight="medium" className="text-theme-muted mb-2">
            Curated Presets:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {themesList.map((t) => (
              <Chip
                key={t.id}
                label={t.name}
                selected={colorThemeId === t.id}
                onPress={() => setColorThemeId(t.id)}
                className="mr-2"
              />
            ))}
          </ScrollView>

          {/* Style Mode */}
          <Text variant="label" weight="medium" className="text-theme-muted mb-2">
            Presentation Style:
          </Text>
          <View className="flex-row flex-wrap">
            {styleList.map((s) => (
              <Chip
                key={s.id}
                label={s.label}
                selected={appStyle === s.id}
                onPress={() => setAppStyle(s.id)}
                className="mr-2 mb-2"
              />
            ))}
          </View>
        </Card>

        {/* Section: Active Tokens Palette */}
        <Card padding="md" className="mb-6">
          <View className="flex-row items-center mb-3">
            <Palette size={18} color={colors.accent} />
            <Text variant="title" weight="bold" className="ml-2">
              Semantic Tokens
            </Text>
          </View>

          <View className="flex-row flex-wrap">
            {[
              { label: "Accent", color: colors.accent },
              { label: "Background", color: colors.background },
              { label: "Card", color: colors.card },
              { label: "High", color: colors.high },
              { label: "Highest", color: colors.highest },
              { label: "Text", color: colors.text },
              { label: "Muted", color: colors.muted },
              { label: "Success", color: colors.success },
              { label: "Warning", color: colors.warning },
              { label: "Danger", color: colors.danger },
              { label: "Info", color: colors.info },
            ].map((tok) => (
              <View key={tok.label} className="w-1/3 p-1.5 items-center">
                <View
                  className="w-full h-10 rounded-xl border border-theme-outline items-center justify-center mb-1"
                  style={{ backgroundColor: tok.color }}
                />
                <Text variant="caption" weight="medium" className="text-center">
                  {tok.label}
                </Text>
                <Text variant="caption" className="text-theme-muted text-[10px]">
                  {tok.color.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Section: Habit Color Grid (40+ Swatches) */}
        <Card padding="md" className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Sparkles size={18} color={colors.accent} />
              <Text variant="title" weight="bold" className="ml-2">
                Habit Swatches (40+)
              </Text>
            </View>
            {accentColor ? (
              <Pressable
                onPress={() => setAccentColor(null)}
                className="px-2 py-1 rounded bg-theme-high"
              >
                <Text variant="caption" className="text-theme-accent">
                  Reset Accent
                </Text>
              </Pressable>
            ) : null}
          </View>
          <Text variant="caption" className="text-theme-muted mb-3">
            Tap any swatch to preview as current accent color:
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {habitColors.map((hex, idx) => (
              <Pressable
                key={`${hex}-${idx}`}
                onPress={() => setAccentColor(hex)}
                className="w-8 h-8 rounded-full m-1 items-center justify-center border border-white/20 active:scale-95"
                style={{ backgroundColor: hex }}
              >
                {colors.accent.toLowerCase() === hex.toLowerCase() ? (
                  <Check size={14} color="#FFFFFF" />
                ) : null}
              </Pressable>
            ))}
          </View>
        </Card>

        {/* Section: Typography Scales */}
        <Card padding="md" className="mb-6">
          <View className="flex-row items-center mb-3">
            <Type size={18} color={colors.accent} />
            <Text variant="title" weight="bold" className="ml-2">
              Typography Hierarchy
            </Text>
          </View>

          <View className="space-y-3">
            <View className="mb-2">
              <Text variant="display" weight="black">
                Display 34px
              </Text>
              <Text variant="caption" className="text-theme-muted">
                Boldest scale for stats & level-ups
              </Text>
            </View>

            <View className="mb-2">
              <Text variant="headline" weight="bold">
                Headline 24px
              </Text>
              <Text variant="caption" className="text-theme-muted">
                Section headers and cards
              </Text>
            </View>

            <View className="mb-2">
              <Text variant="title" weight="semibold">
                Title 18px SemiBold
              </Text>
              <Text variant="caption" className="text-theme-muted">
                Habit item names and modal titles
              </Text>
            </View>

            <View className="mb-2">
              <Text variant="body">
                Body 15px Regular — 100% offline, local-first habit momentum tracking.
              </Text>
              <Text variant="caption" className="text-theme-muted">
                Default body copy
              </Text>
            </View>

            <View className="mb-2">
              <Text variant="label" weight="medium">
                LABEL 13px MEDIUM CAPSULE
              </Text>
              <Text variant="caption" className="text-theme-muted">
                Pill badges and filters
              </Text>
            </View>

            <View className="mb-2">
              <Text className="font-serif text-xl italic">
                Playfair Display Serif: &ldquo;A journey of a thousand li begins with a single step.&rdquo;
              </Text>
              <Text variant="caption" className="text-theme-muted">
                Specialty editorial quotes & milestones
              </Text>
            </View>
          </View>
        </Card>

        {/* Section: Buttons */}
        <Card padding="md" className="mb-6">
          <Text variant="title" weight="bold" className="mb-3">
            Button Matrix (Stadium / Capsule)
          </Text>

          <View className="space-y-3">
            <Button
              title="Primary Action Button"
              variant="primary"
              size="lg"
              icon={<Flame size={20} color="#FFFFFF" />}
              className="mb-2.5"
            />

            <Button
              title="Secondary Action"
              variant="secondary"
              size="md"
              className="mb-2.5"
            />

            <Button
              title="Outlined Button"
              variant="outline"
              size="md"
              icon={<Heart size={18} color={colors.text} />}
              className="mb-2.5"
            />

            <Button
              title="Danger / Relapse Action"
              variant="danger"
              size="md"
              className="mb-2.5"
            />

            <View className="flex-row space-x-2">
              <Button title="Small Pill" size="sm" className="mr-2" />
              <Button title="Loading..." loading size="sm" className="mr-2" />
              <Button title="Disabled" disabled size="sm" />
            </View>
          </View>
        </Card>

        {/* Section: Inputs & Controls */}
        <Card padding="md" className="mb-6">
          <Text variant="title" weight="bold" className="mb-3">
            Inputs & Interactive Controls
          </Text>

          <TextField
            label="Habit Name"
            value={textValue}
            onChangeText={setTextValue}
            leadingIcon={<Search size={18} color={colors.muted} />}
            clearable
            className="mb-4"
          />

          <TextField
            label="With Validation Error"
            value="Invalid frequency"
            error="Please select at least 1 day per week"
            className="mb-4"
          />

          {/* Filter Chips */}
          <Text variant="label" weight="medium" className="text-theme-muted mb-2">
            Filter Chips:
          </Text>
          <View className="flex-row flex-wrap mb-4">
            {["All", "Morning", "Evening", "Completed"].map((c) => (
              <Chip
                key={c}
                label={c}
                selected={selectedChip === c}
                onPress={() => setSelectedChip(c)}
                count={c === "All" ? 8 : 3}
                className="mr-2 mb-2"
              />
            ))}
          </View>

          {/* Switch & Stepper */}
          <View className="flex-row items-center justify-between py-2 border-t border-theme-outline mb-4">
            <View>
              <Text variant="body" weight="medium">
                Vacation Mode
              </Text>
              <Text variant="caption" className="text-theme-muted">
                Preserve streaks during travel
              </Text>
            </View>
            <Switch value={switchValue} onValueChange={setSwitchValue} />
          </View>

          <View className="flex-row items-center justify-between py-2 border-t border-theme-outline">
            <View>
              <Text variant="body" weight="medium">
                Daily Water Goal
              </Text>
              <Text variant="caption" className="text-theme-muted">
                Target quantity per day
              </Text>
            </View>
            <Stepper
              value={stepperValue}
              onChange={setStepperValue}
              unit="cups"
              min={1}
              max={20}
            />
          </View>
        </Card>

        {/* Section: Realistic Habit Card Sample */}
        <Text variant="title" weight="bold" className="mb-3">
          Sample Component Composition
        </Text>
        <Card padding="md" className="mb-8">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
              <View
                className="w-12 h-12 rounded-2xl items-center justify-center mr-3"
                style={{ backgroundColor: colors.accent }}
              >
                <Flame size={24} color="#FFFFFF" />
              </View>

              <View>
                <Text variant="title" weight="bold">
                  Morning Meditation
                </Text>
                <View className="flex-row items-center mt-1">
                  <Flame size={14} color={AppPalette.warning} />
                  <Text variant="caption" weight="bold" className="text-theme-warning ml-1">
                    14 day streak
                  </Text>
                  <Text variant="caption" className="text-theme-muted ml-2">
                    · Today 15 mins
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              className="w-10 h-10 rounded-full items-center justify-center border-2 active:scale-95"
              style={{
                borderColor: colors.accent,
                backgroundColor: colors.accent,
              }}
            >
              <Check size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
