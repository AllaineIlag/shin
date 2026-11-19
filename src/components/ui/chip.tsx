import React from "react";
import { Pressable, View, type PressableProps } from "react-native";
import { Text } from "./text";

export interface ChipProps extends Omit<PressableProps, "style"> {
  label: string;
  selected?: boolean;
  icon?: React.ReactNode;
  count?: number;
  className?: string;
}

export function Chip({
  label,
  selected = false,
  icon,
  count,
  className = "",
  ...props
}: ChipProps) {
  return (
    <Pressable
      className={`rounded-full flex-row items-center px-3.5 py-1.5 border active:opacity-80 ${
        selected
          ? "bg-theme-accent border-theme-accent"
          : "bg-theme-high border-theme-outline"
      } ${className}`}
      {...props}
    >
      {icon ? <View className="mr-1.5">{icon}</View> : null}
      <Text
        variant="label"
        weight={selected ? "bold" : "medium"}
        className={selected ? "text-white" : "text-theme-text"}
      >
        {label}
      </Text>
      {count !== undefined ? (
        <View
          className={`ml-1.5 px-1.5 py-0.5 rounded-full ${
            selected ? "bg-white/20" : "bg-theme-highest"
          }`}
        >
          <Text
            variant="caption"
            weight="bold"
            className={selected ? "text-white" : "text-theme-muted"}
          >
            {count}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}
