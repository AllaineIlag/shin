import React from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { useTheme } from "../../theme/theme-context";

export type TextVariant = "display" | "headline" | "title" | "body" | "label" | "caption";

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  className?: string;
  weight?: "regular" | "medium" | "semibold" | "bold" | "black";
}

export function Text({
  variant = "body",
  weight = "regular",
  className = "",
  style,
  children,
  ...props
}: TextProps) {
  const { appStyle } = useTheme();

  // Resolve font family utility class based on appStyle and weight
  const fontClass = (() => {
    if (appStyle === "minimal") {
      switch (weight) {
        case "medium":
          return "font-figtree-medium";
        case "semibold":
          return "font-figtree-semibold";
        case "bold":
          return "font-figtree-bold";
        case "black":
          return "font-figtree-black";
        default:
          return "font-figtree";
      }
    }

    if (appStyle === "express") {
      return "font-flex";
    }

    // Default: classic (Google Sans Rounded)
    switch (weight) {
      case "medium":
        return "font-sans-medium";
      case "semibold":
        return "font-sans-semibold";
      case "bold":
        return "font-sans-bold";
      case "black":
        return "font-sans-black";
      default:
        return "font-sans";
    }
  })();

  const variantClass = (() => {
    switch (variant) {
      case "display":
        return "text-3xl tracking-tight leading-tight";
      case "headline":
        return "text-2xl tracking-tight leading-snug";
      case "title":
        return "text-lg leading-normal";
      case "body":
        return "text-base leading-relaxed";
      case "label":
        return "text-xs tracking-wide";
      case "caption":
        return "text-[11px] leading-tight";
    }
  })();

  return (
    <RNText
      className={`text-theme-text ${fontClass} ${variantClass} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </RNText>
  );
}
