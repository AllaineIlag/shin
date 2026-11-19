import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  type TextInputProps,
} from "react-native";
import { Text } from "./text";
import { useTheme } from "../../theme/theme-context";
import { X } from "lucide-react-native";

export interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  clearable?: boolean;
  className?: string;
}

export function TextField({
  label,
  error,
  leadingIcon,
  clearable = false,
  value,
  onChangeText,
  placeholder,
  className = "",
  ...props
}: TextFieldProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`w-full ${className}`}>
      {label ? (
        <Text variant="label" weight="medium" className="text-theme-muted mb-1.5 ml-1">
          {label}
        </Text>
      ) : null}

      <View
        className={`flex-row items-center bg-theme-high rounded-2xl px-4 py-3 border ${
          error
            ? "border-theme-danger"
            : isFocused
            ? "border-theme-accent"
            : "border-theme-outline"
        }`}
      >
        {leadingIcon ? <View className="mr-2.5">{leadingIcon}</View> : null}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 text-base text-theme-text font-sans p-0 m-0"
          {...props}
        />

        {clearable && value && value.length > 0 ? (
          <Pressable
            onPress={() => onChangeText?.("")}
            className="p-1 rounded-full active:opacity-70 ml-1.5"
            hitSlop={8}
          >
            <X size={16} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text variant="caption" className="text-theme-danger mt-1.5 ml-1">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
