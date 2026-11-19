import React from "react";
import { View } from "react-native";
import { Text } from "./text";
import { Button } from "./button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionTitle?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionTitle,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <View className={`items-center justify-center p-8 text-center ${className}`}>
      {icon ? (
        <View className="w-16 h-16 rounded-full bg-theme-high items-center justify-center mb-4 border border-theme-outline">
          {icon}
        </View>
      ) : null}

      <Text variant="headline" weight="bold" className="text-center mb-2">
        {title}
      </Text>

      {description ? (
        <Text variant="body" className="text-theme-muted text-center max-w-xs mb-6">
          {description}
        </Text>
      ) : null}

      {actionTitle && onAction ? (
        <Button title={actionTitle} onPress={onAction} size="md" />
      ) : null}
    </View>
  );
}
