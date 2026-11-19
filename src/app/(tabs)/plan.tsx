import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Calendar as CalendarIcon, Clock } from "lucide-react-native";
import { useTheme } from "../../theme/theme-context";
import { Text, Card } from "../../components/ui";

export default function PlanScreen() {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-theme-bg" edges={["top", "left", "right"]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View className="px-5 pt-3 pb-2 flex-row items-center justify-between">
        <View>
          <Text variant="caption" className="text-theme-muted uppercase tracking-wider">
            Daily Schedule & Timeline
          </Text>
          <Text variant="headline" weight="bold" className="text-theme-text">
            Plan
          </Text>
        </View>

        <TouchableOpacity
          className="flex-row items-center px-3 py-1.5 rounded-full border border-theme-outline"
          style={{ backgroundColor: colors.card }}
          activeOpacity={0.8}
        >
          <CalendarIcon size={15} color={colors.accent} />
          <Text variant="caption" weight="semibold" className="ml-1 text-theme-accent">
            Timeline
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Day Horizon Card */}
        <Card padding="md" className="my-4">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Clock size={18} color={colors.info} />
              <Text variant="title" weight="bold" className="ml-2 text-theme-text">
                Free Time Horizon
              </Text>
            </View>
            <Text variant="caption" weight="bold" className="text-theme-info">
              5.5h Available
            </Text>
          </View>
          <Text variant="caption" className="text-theme-muted leading-relaxed">
            Time-blocked habit routines and scheduled appointments will calculate free time gaps automatically in Phase 6.
          </Text>
        </Card>

        {/* Timeline Blocks Preview */}
        <Text variant="title" weight="bold" className="mb-3 text-theme-text">
          Scheduled Blocks
        </Text>

        <Card padding="md" className="mb-3">
          <View className="flex-row items-center">
            <View className="mr-4 items-center">
              <Text variant="caption" weight="bold" className="text-theme-accent">
                08:00
              </Text>
              <Text variant="caption" className="text-theme-muted" style={{ fontSize: 10 }}>
                AM
              </Text>
            </View>
            <View className="flex-1 pl-3 border-l-2 border-theme-accent">
              <Text variant="body" weight="bold" className="text-theme-text">
                Morning Routine & Hydration
              </Text>
              <Text variant="caption" className="text-theme-muted">
                30 mins · Recurring
              </Text>
            </View>
          </View>
        </Card>

        <Card padding="md" className="mb-3">
          <View className="flex-row items-center">
            <View className="mr-4 items-center">
              <Text variant="caption" weight="bold" className="text-theme-accent">
                12:30
              </Text>
              <Text variant="caption" className="text-theme-muted" style={{ fontSize: 10 }}>
                PM
              </Text>
            </View>
            <View className="flex-1 pl-3 border-l-2 border-theme-outline">
              <Text variant="body" weight="bold" className="text-theme-text">
                Post-Lunch Walk & Sunshine
              </Text>
              <Text variant="caption" className="text-theme-muted">
                20 mins · Health
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
