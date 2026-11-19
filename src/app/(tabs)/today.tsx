import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Plus,
  SlidersHorizontal,
  Timer,
  BookOpen,
  Sparkles,
  Flame,
  CheckCircle2,
} from "lucide-react-native";
import { useTheme } from "../../theme/theme-context";
import { Text, Card, Chip } from "../../components/ui";

const WEEK_DAYS = [
  { day: "Mon", date: "16", active: false },
  { day: "Tue", date: "17", active: false },
  { day: "Wed", date: "18", active: false },
  { day: "Thu", date: "19", active: true },
  { day: "Fri", date: "20", active: false },
  { day: "Sat", date: "21", active: false },
  { day: "Sun", date: "22", active: false },
];

export default function TodayScreen() {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-theme-bg" edges={["top", "left", "right"]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Top Header & Action Controls */}
      <View className="px-5 pt-3 pb-2 flex-row items-center justify-between">
        <View>
          <Text variant="caption" className="text-theme-muted uppercase tracking-wider">
            Thursday, Nov 19
          </Text>
          <Text variant="headline" weight="bold" className="text-theme-text">
            Today
          </Text>
        </View>

        <View className="flex-row items-center space-x-2">
          {/* Focus Pill Shortcut */}
          <TouchableOpacity
            className="flex-row items-center px-3 py-1.5 rounded-full border border-theme-outline mr-2"
            style={{ backgroundColor: colors.card }}
            activeOpacity={0.7}
          >
            <Timer size={15} color={colors.accent} />
            <Text variant="caption" weight="semibold" className="ml-1 text-theme-accent">
              Focus
            </Text>
          </TouchableOpacity>

          {/* Add Habit Button */}
          <TouchableOpacity
            className="w-9 h-9 rounded-full items-center justify-center mr-2"
            style={{ backgroundColor: colors.accent }}
            activeOpacity={0.8}
          >
            <Plus size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Filter Sheet Button */}
          <TouchableOpacity
            className="w-9 h-9 rounded-full items-center justify-center border border-theme-outline"
            style={{ backgroundColor: colors.card }}
            activeOpacity={0.8}
          >
            <SlidersHorizontal size={16} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Week Strip Carousel */}
        <View className="flex-row justify-between my-4 py-2 px-1 rounded-2xl bg-theme-card border border-theme-outline">
          {WEEK_DAYS.map((item, index) => {
            const isToday = item.active;
            return (
              <View
                key={index}
                className={`items-center py-2 px-2.5 rounded-xl ${
                  isToday ? "bg-theme-accent" : ""
                }`}
              >
                <Text
                  variant="caption"
                  weight={isToday ? "bold" : "medium"}
                  style={{ color: isToday ? "#FFFFFF" : colors.muted, fontSize: 11 }}
                >
                  {item.day}
                </Text>
                <Text
                  variant="body"
                  weight={isToday ? "black" : "bold"}
                  style={{
                    color: isToday ? "#FFFFFF" : colors.text,
                    fontSize: 14,
                    marginTop: 2,
                  }}
                >
                  {item.date}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Momentum & Daily Progress Banner */}
        <Card padding="md" className="mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Flame size={20} color={colors.warning} />
              <Text variant="title" weight="bold" className="ml-2 text-theme-text">
                Daily Momentum
              </Text>
            </View>
            <Chip label="Phase 2: Shell" selected />
          </View>
          <Text variant="caption" className="text-theme-muted mb-3 leading-relaxed">
            Navigation shell active. Core habit database and interactive cards will be connected in Phase 3.
          </Text>
          <View className="h-2 rounded-full bg-theme-outline overflow-hidden">
            <View className="h-full bg-theme-accent rounded-full w-2/5" />
          </View>
        </Card>

        {/* Habit Card Preview */}
        <Text variant="title" weight="bold" className="mb-3 text-theme-text">
          Upcoming Habits
        </Text>

        <Card padding="md" className="mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 mr-3">
              <View
                className="w-11 h-11 rounded-2xl items-center justify-center mr-3"
                style={{ backgroundColor: colors.accent + "20" }}
              >
                <CheckCircle2 size={22} color={colors.accent} />
              </View>
              <View className="flex-1">
                <Text variant="body" weight="bold" className="text-theme-text">
                  Morning Meditation
                </Text>
                <Text variant="caption" className="text-theme-muted">
                  10 mins · Mindfulness
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="w-9 h-9 rounded-full border border-theme-outline items-center justify-center"
              style={{ backgroundColor: colors.card }}
            >
              <Sparkles size={16} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </Card>

        <Card padding="md" className="mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 mr-3">
              <View
                className="w-11 h-11 rounded-2xl items-center justify-center mr-3"
                style={{ backgroundColor: colors.success + "20" }}
              >
                <BookOpen size={22} color={colors.success} />
              </View>
              <View className="flex-1">
                <Text variant="body" weight="bold" className="text-theme-text">
                  Read 20 Pages
                </Text>
                <Text variant="caption" className="text-theme-muted">
                  Daily Habit · Education
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="w-9 h-9 rounded-full border border-theme-outline items-center justify-center"
              style={{ backgroundColor: colors.card }}
            >
              <Sparkles size={16} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
