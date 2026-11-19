import React from "react";
import {
  Pressable,
  ActivityIndicator,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Text } from "./text";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Button({
  title,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  className = "",
  style,
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = (() => {
    switch (size) {
      case "sm":
        return "py-2 px-4 h-9";
      case "lg":
        return "py-4 px-8 h-14";
      default:
        return "py-3 px-6 h-12";
    }
  })();

  const variantClasses = (() => {
    switch (variant) {
      case "secondary":
        return "bg-theme-high active:opacity-80";
      case "outline":
        return "border border-theme-outline bg-transparent active:bg-theme-high/50";
      case "ghost":
        return "bg-transparent active:bg-theme-high/40";
      case "danger":
        return "bg-theme-danger active:opacity-85";
      default:
        return "bg-theme-accent active:opacity-85";
    }
  })();

  const textVariantClasses = (() => {
    switch (variant) {
      case "primary":
      case "danger":
        return "text-white font-sans-bold";
      case "secondary":
      case "outline":
      case "ghost":
        return "text-theme-text font-sans-semibold";
    }
  })();

  return (
    <Pressable
      className={`rounded-full flex-row items-center justify-center ${sizeClasses} ${variantClasses} ${
        disabled ? "opacity-45" : ""
      } ${className}`}
      disabled={disabled || loading}
      style={style}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" || variant === "danger" ? "#FFFFFF" : undefined} size="small" />
      ) : (
        <View className="flex-row items-center justify-center space-x-2">
          {icon && iconPosition === "left" && <View className="mr-2">{icon}</View>}
          {title ? (
            <Text
              variant={size === "sm" ? "label" : size === "lg" ? "title" : "body"}
              weight="bold"
              className={`${textVariantClasses}`}
            >
              {title}
            </Text>
          ) : (
            children
          )}
          {icon && iconPosition === "right" && <View className="ml-2">{icon}</View>}
        </View>
      )}
    </Pressable>
  );
}
