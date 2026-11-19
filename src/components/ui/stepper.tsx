import React from "react";
import { View, Pressable } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { Text } from "./text";
import { useTheme } from "../../theme/theme-context";

export interface StepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  unit,
  className = "",
}: StepperProps) {
  const { colors } = useTheme();

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const canDecrement = value - step >= min;
  const canIncrement = value + step <= max;

  return (
    <View
      className={`flex-row items-center justify-between bg-theme-high rounded-full p-1 border border-theme-outline ${className}`}
    >
      <Pressable
        onPress={handleDecrement}
        disabled={!canDecrement}
        className={`w-9 h-9 rounded-full items-center justify-center bg-theme-card border border-theme-outline active:opacity-75 ${
          !canDecrement ? "opacity-35" : ""
        }`}
        hitSlop={6}
      >
        <Minus size={16} color={colors.text} />
      </Pressable>

      <View className="px-4 flex-row items-baseline space-x-1">
        <Text variant="title" weight="bold" className="text-theme-text font-sans-bold">
          {value}
        </Text>
        {unit ? (
          <Text variant="label" className="text-theme-muted ml-1">
            {unit}
          </Text>
        ) : null}
      </View>

      <Pressable
        onPress={handleIncrement}
        disabled={!canIncrement}
        className={`w-9 h-9 rounded-full items-center justify-center bg-theme-accent active:opacity-85 ${
          !canIncrement ? "opacity-35" : ""
        }`}
        hitSlop={6}
      >
        <Plus size={16} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
