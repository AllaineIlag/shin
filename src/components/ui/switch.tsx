import React, { useEffect, useState } from "react";
import { Pressable, Animated } from "react-native";
import { useTheme } from "../../theme/theme-context";

export interface SwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  value,
  onValueChange,
  disabled = false,
  className = "",
}: SwitchProps) {
  const { colors } = useTheme();
  const [animatedValue] = useState(() => new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: value ? 1 : 0,
      damping: 18,
      stiffness: 220,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.high, colors.accent],
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      className={`${disabled ? "opacity-40" : ""} ${className}`}
    >
      <Animated.View
        style={{
          width: 50,
          height: 30,
          borderRadius: 9999,
          backgroundColor,
          borderWidth: 1,
          borderColor: value ? colors.accent : colors.outline,
          justifyContent: "center",
        }}
      >
        <Animated.View
          style={{
            width: 24,
            height: 24,
            borderRadius: 9999,
            backgroundColor: "#FFFFFF",
            transform: [{ translateX }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.5,
            elevation: 2,
          }}
        />
      </Animated.View>
    </Pressable>
  );
}
