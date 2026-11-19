import React from "react";
import {
  View,
  Pressable,
  type ViewProps,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/theme-context";

export interface CardProps extends ViewProps {
  onPress?: PressableProps["onPress"];
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Card({
  onPress,
  padding = "md",
  className = "",
  style,
  children,
  ...props
}: CardProps) {
  const { appStyle } = useTheme();

  const radiusClass = appStyle === "express" ? "rounded-[30px]" : "rounded-[24px]";

  const paddingClass = (() => {
    switch (padding) {
      case "none":
        return "p-0";
      case "sm":
        return "p-3";
      case "lg":
        return "p-6";
      default:
        return "p-4";
    }
  })();

  const baseClasses = `bg-theme-card border border-theme-outline ${radiusClass} ${paddingClass} ${className}`;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={`${baseClasses} active:opacity-85`}
        style={style}
        {...(props as PressableProps)}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={baseClasses} style={style} {...props}>
      {children}
    </View>
  );
}
