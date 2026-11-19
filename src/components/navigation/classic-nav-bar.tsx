import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  CalendarCheck2,
  ListTodo,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react-native";
import { useTheme } from "../../theme/theme-context";
import { Text } from "../ui/text";
import { Tabs } from "expo-router";

type TabsProps = React.ComponentProps<typeof Tabs>;
export type BottomTabBarProps = NonNullable<TabsProps["tabBar"]> extends (props: infer P) => any ? P : any;

interface TabConfig {
  name: string;
  label: string;
  icon: React.ComponentType<{ size: number; color: string; strokeWidth?: number }>;
}

const TAB_CONFIGS: Record<string, TabConfig> = {
  today: {
    name: "today",
    label: "Today",
    icon: CalendarCheck2,
  },
  todos: {
    name: "todos",
    label: "Todos",
    icon: ListTodo,
  },
  plan: {
    name: "plan",
    label: "Plan",
    icon: Calendar,
  },
  stats: {
    name: "stats",
    label: "Stats",
    icon: BarChart3,
  },
  settings: {
    name: "settings",
    label: "Settings",
    icon: Settings,
  },
};

// Ultra-snappy spring simulation matching Streak Peak
const SPRING_CONFIG = {
  damping: 24,
  stiffness: 300,
  mass: 0.5,
};

export function ClassicNavBar({
  state,
  descriptors,
  emitter,
  navigateToTab,
  insets: propInsets,
}: BottomTabBarProps) {
  const systemInsets = useSafeAreaInsets();
  const insets = propInsets || systemInsets;
  const { colors, isDark } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);

  const activeIndex = state.index;
  const numTabs = state.routes.length;
  const tabWidth = containerWidth > 0 ? containerWidth / numTabs : 0;

  const indicatorX = useSharedValue(0);

  useEffect(() => {
    if (tabWidth > 0) {
      indicatorX.value = withSpring(activeIndex * tabWidth, SPRING_CONFIG);
    }
  }, [activeIndex, tabWidth, indicatorX]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorX.value }],
      width: tabWidth,
    };
  });

  const handleContainerLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && width !== containerWidth) {
      setContainerWidth(width);
    }
  };

  const handleTabPress = (routeKey: string, routeName: string, isFocused: boolean) => {
    // 1. Emit tabPress event
    const event = emitter?.emit({
      type: "tabPress",
      target: routeKey,
      canPreventDefault: true,
    });

    // 2. Navigate immediately if not focused and not prevented
    if (!isFocused && !event?.defaultPrevented) {
      navigateToTab?.(routeKey);
    }
  };

  const bottomPosition = Math.max(insets.bottom, 12);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.floatingContainer, { bottom: bottomPosition }]}
    >
      <View
        onLayout={handleContainerLayout}
        style={[
          styles.dockWrapper,
          {
            borderColor: colors.outline,
            backgroundColor: isDark
              ? "rgba(24, 24, 37, 0.90)"
              : "rgba(255, 255, 255, 0.92)",
          },
        ]}
      >
        {Platform.OS === "ios" ? (
          <BlurView
            intensity={50}
            tint={isDark ? "dark" : "light"}
            style={StyleSheet.absoluteFill}
          />
        ) : null}

        {/* Sliding Active Tab Background Indicator */}
        {tabWidth > 0 ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.slidingIndicator,
              animatedIndicatorStyle,
            ]}
          >
            <View
              style={[
                styles.indicatorPill,
                {
                  backgroundColor: isDark
                    ? "rgba(167, 139, 250, 0.20)"
                    : "rgba(124, 58, 237, 0.14)",
                },
              ]}
            />
          </Animated.View>
        ) : null}

        {/* Tab Buttons */}
        <View style={styles.tabsRow}>
          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const config = TAB_CONFIGS[route.name] || {
              name: route.name,
              label: route.name,
              icon: CalendarCheck2,
            };
            const Icon = config.icon;

            const iconColor = isFocused ? colors.accent : colors.muted;

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={config.label}
                onPress={() => handleTabPress(route.key, route.name, isFocused)}
                hitSlop={6}
                style={styles.tabButton}
              >
                <View style={styles.iconContainer}>
                  <Icon
                    size={20}
                    color={iconColor}
                    strokeWidth={isFocused ? 2.4 : 1.8}
                  />
                </View>
                <Text
                  variant="caption"
                  weight={isFocused ? "bold" : "medium"}
                  style={{
                    color: isFocused ? colors.accent : colors.muted,
                    fontSize: 10,
                    marginTop: 2,
                  }}
                >
                  {config.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    alignItems: "center",
    zIndex: 100,
  },
  dockWrapper: {
    width: "100%",
    maxWidth: 440,
    height: 62,
    borderRadius: 36,
    borderWidth: 1,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
  slidingIndicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorPill: {
    width: "84%",
    height: "100%",
    borderRadius: 28,
  },
  tabsRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tabButton: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
