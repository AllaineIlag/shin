import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TrendingUp, Award } from "lucide-react-native";
import { useTheme } from "../../theme/theme-context";
import { Text, Card, Chip } from "../../components/ui";

export default function StatsScreen() {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-theme-bg" edges={["top", "left", "right"]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View className="px-5 pt-3 pb-2 flex-row items-center justify-between">
        <View>
          <Text variant="caption" className="text-theme-muted uppercase tracking-wider">
            Analytics & Consistency
          </Text>
          <Text variant="headline" weight="bold" className="text-theme-text">
            Statistics
          </Text>
        </View>

        <Chip label="52-Week Engine" />
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Overall Completion Metric Card */}
        <Card padding="lg" className="my-4">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text variant="caption" className="text-theme-muted">
                30-Day Completion Rate
              </Text>
              <Text variant="display" weight="black" className="text-theme-accent">
                92%
              </Text>
            </View>
            <View
              className="w-14 h-14 rounded-2xl items-center justify-center border border-theme-outline"
              style={{ backgroundColor: colors.accent + "18" }}
            >
              <TrendingUp size={28} color={colors.accent} />
            </View>
          </View>

          <View className="flex-row justify-between pt-3 border-t border-theme-outline">
            <View className="items-center flex-1">
              <Text variant="caption" className="text-theme-muted">
                Best Streak
              </Text>
              <Text variant="title" weight="bold" className="text-theme-text">
                42 Days
              </Text>
            </View>
            <View className="items-center flex-1 border-x border-theme-outline">
              <Text variant="caption" className="text-theme-muted">
                Total Checks
              </Text>
              <Text variant="title" weight="bold" className="text-theme-text">
                184
              </Text>
            </View>
            <View className="items-center flex-1">
              <Text variant="caption" className="text-theme-muted">
                Active Habits
              </Text>
              <Text variant="title" weight="bold" className="text-theme-text">
                6
              </Text>
            </View>
          </View>
        </Card>

        {/* Skia Graphics Milestone Banner */}
        <Card padding="md" className="mb-4">
          <View className="flex-row items-center mb-2">
            <Award size={18} color={colors.warning} />
            <Text variant="title" weight="bold" className="ml-2 text-theme-text">
              Upcoming: Skia Heatmaps & Charts
            </Text>
          </View>
          <Text variant="caption" className="text-theme-muted leading-relaxed">
            In Phase 7, high-performance hardware-accelerated Skia graphics will render the 52-week activity grid, weekday radar, and time-of-day donuts.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
