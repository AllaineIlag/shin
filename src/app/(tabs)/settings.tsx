import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  Sparkles,
  Sun,
  Moon,
  Shield,
} from "lucide-react-native";
import { useTheme } from "../../theme/theme-context";
import { Text, Card, Button, Switch } from "../../components/ui";

export default function SettingsScreen() {
  const router = useRouter();
  const { setThemeMode, isDark, colors } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-theme-bg" edges={["top", "left", "right"]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View className="px-5 pt-3 pb-2">
        <Text variant="caption" className="text-theme-muted uppercase tracking-wider">
          Preferences & System
        </Text>
        <Text variant="headline" weight="bold" className="text-theme-text">
          Settings
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Design System & Component Harness Link */}
        <Card padding="md" className="my-4">
          <View className="flex-row items-center mb-2">
            <Sparkles size={18} color={colors.accent} />
            <Text variant="title" weight="bold" className="ml-2 text-theme-text">
              Design System Showcase
            </Text>
          </View>
          <Text variant="caption" className="text-theme-muted mb-4 leading-relaxed">
            Preview the complete typography scale, color swatches, button states, inputs, and tokens on-device.
          </Text>
          <Button
            title="Open Design System Gallery"
            variant="primary"
            size="sm"
            onPress={() => router.push("/design-system")}
          />
        </Card>

        {/* Appearance Section */}
        <Text variant="title" weight="bold" className="mb-3 text-theme-text">
          Appearance
        </Text>

        <Card padding="md" className="mb-4">
          <View className="flex-row items-center justify-between py-1">
            <View className="flex-row items-center">
              {isDark ? (
                <Moon size={20} color={colors.accent} />
              ) : (
                <Sun size={20} color={colors.warning} />
              )}
              <View className="ml-3">
                <Text variant="body" weight="bold" className="text-theme-text">
                  Dark Mode
                </Text>
                <Text variant="caption" className="text-theme-muted">
                  Toggle dark or light theme palette
                </Text>
              </View>
            </View>

            <Switch
              value={isDark}
              onValueChange={(val) => setThemeMode(val ? "dark" : "light")}
            />
          </View>
        </Card>

        {/* System & Architecture Info */}
        <Text variant="title" weight="bold" className="mb-3 text-theme-text">
          About Shin
        </Text>

        <Card padding="md" className="mb-4">
          <View className="flex-row items-center mb-3">
            <Shield size={18} color={colors.success} />
            <Text variant="body" weight="bold" className="ml-2 text-theme-text">
              100% Local & Private
            </Text>
          </View>
          <Text variant="caption" className="text-theme-muted leading-relaxed mb-3">
            Zero cloud tracking, zero telemetry. Inspired by Shin from Kingdom—relentless incremental growth from farm boy to Great General.
          </Text>
          <View className="flex-row items-center justify-between pt-3 border-t border-theme-outline">
            <Text variant="caption" className="text-theme-muted">
              App Version
            </Text>
            <Text variant="caption" weight="bold" className="text-theme-text">
              1.0.0 (Phase 2 Shell)
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
