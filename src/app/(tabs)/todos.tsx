import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Plus, FolderPlus, ListTodo } from "lucide-react-native";
import { useTheme } from "../../theme/theme-context";
import { Text, EmptyState, Chip } from "../../components/ui";

export default function TodosScreen() {
  const { colors, isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <SafeAreaView className="flex-1 bg-theme-bg" edges={["top", "left", "right"]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View className="px-5 pt-3 pb-2 flex-row items-center justify-between">
        <View>
          <Text variant="caption" className="text-theme-muted uppercase tracking-wider">
            Tasks & Momentum
          </Text>
          <Text variant="headline" weight="bold" className="text-theme-text">
            Todos
          </Text>
        </View>

        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            className="w-9 h-9 rounded-full items-center justify-center border border-theme-outline mr-2"
            style={{ backgroundColor: colors.card }}
            activeOpacity={0.8}
          >
            <FolderPlus size={16} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-9 h-9 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.accent }}
            activeOpacity={0.8}
          >
            <Plus size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Chips */}
      <View className="px-5 py-2 flex-row">
        <Chip
          label="All Tasks"
          selected={activeFilter === "all"}
          onPress={() => setActiveFilter("all")}
          className="mr-2"
        />
        <Chip
          label="Inbox"
          selected={activeFilter === "inbox"}
          onPress={() => setActiveFilter("inbox")}
          className="mr-2"
        />
        <Chip
          label="Today"
          selected={activeFilter === "today"}
          onPress={() => setActiveFilter("today")}
        />
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <EmptyState
          icon={<ListTodo size={40} color={colors.accent} />}
          title="No Tasks for Today"
          description="Keep your mind clear. Capture your action items, assign project folders, or tackle quick wins."
          actionTitle="Create First Task"
          onAction={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
