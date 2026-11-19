import React from "react";
import { View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Text, Button, Card } from "../components/ui";
import { useTheme } from "../theme/theme-context";
import { Sparkles, ShieldCheck, Swords } from "lucide-react-native";

export default function Index() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-theme-bg">
      <StatusBar style={isDark ? "light" : "dark"} />

      <View className="flex-1 px-6 justify-between py-10">
        <View className="items-center mt-6">
          <View
            className="w-16 h-16 rounded-2xl items-center justify-center mb-5 border border-theme-outline"
            style={{ backgroundColor: colors.card }}
          >
            <Swords size={32} color={colors.accent} />
          </View>

          <Text variant="display" weight="black" className="text-center mb-2">
            Shin
          </Text>

          <Text variant="body" className="text-theme-muted text-center max-w-xs">
            From slave boy to Great General. Build unbreakable daily momentum, 100% offline and private.
          </Text>
        </View>

        <Card padding="lg" className="my-6">
          <View className="flex-row items-center mb-3">
            <ShieldCheck size={20} color={colors.success} />
            <Text variant="title" weight="bold" className="ml-2">
              Visual Foundation Active
            </Text>
          </View>

          <Text variant="body" className="text-theme-muted mb-4 text-sm leading-relaxed">
            NativeWind v4 + Tailwind CSS styling, Google Sans Rounded & Figtree typography, 5 curated themes, and reusable UI primitives are fully configured.
          </Text>

          <Button
            title="Open Design System Gallery"
            variant="primary"
            icon={<Sparkles size={18} color="#FFFFFF" />}
            iconPosition="right"
            onPress={() => router.push("/design-system")}
          />
        </Card>

        <View className="items-center">
          <Text variant="caption" className="text-theme-muted">
            Ported faithfully from Streak Peak & Chapter 5 Spec
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
