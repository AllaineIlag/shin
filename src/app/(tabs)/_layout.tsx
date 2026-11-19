import React from "react";
import { Tabs } from "expo-router";
import { ClassicNavBar } from "../../components/navigation/classic-nav-bar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <ClassicNavBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: "none",
        lazy: false,
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: "Todos",
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: "Plan",
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
