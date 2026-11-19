import "../../global.css";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { ThemeProvider } from "../theme/theme-context";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "GoogleSansRounded-Light": require("../../assets/fonts/GoogleSansRounded-Light.ttf"),
    "GoogleSansRounded-Regular": require("../../assets/fonts/GoogleSansRounded-Regular.ttf"),
    "GoogleSansRounded-Medium": require("../../assets/fonts/GoogleSansRounded-Medium.ttf"),
    "GoogleSansRounded-SemiBold": require("../../assets/fonts/GoogleSansRounded-SemiBold.ttf"),
    "GoogleSansRounded-Bold": require("../../assets/fonts/GoogleSansRounded-Bold.ttf"),
    "GoogleSansRounded-ExtraBold": require("../../assets/fonts/GoogleSansRounded-ExtraBold.ttf"),
    "GoogleSansRounded-Black": require("../../assets/fonts/GoogleSansRounded-Black.ttf"),
    "Figtree-Light": require("../../assets/fonts/Figtree-Light.ttf"),
    "Figtree-Regular": require("../../assets/fonts/Figtree-Regular.ttf"),
    "Figtree-Medium": require("../../assets/fonts/Figtree-Medium.ttf"),
    "Figtree-SemiBold": require("../../assets/fonts/Figtree-SemiBold.ttf"),
    "Figtree-Bold": require("../../assets/fonts/Figtree-Bold.ttf"),
    "Figtree-ExtraBold": require("../../assets/fonts/Figtree-ExtraBold.ttf"),
    "Figtree-Black": require("../../assets/fonts/Figtree-Black.ttf"),
    "GoogleSansFlex": require("../../assets/fonts/GoogleSansFlex.ttf"),
    "Nunito": require("../../assets/fonts/Nunito.ttf"),
    "PlayfairDisplay": require("../../assets/fonts/PlayfairDisplay.ttf"),
    "PlayfairDisplay-Italic": require("../../assets/fonts/PlayfairDisplay-Italic.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </ThemeProvider>
  );
}
