import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.background }, // This is how you can change the background color of the header
        headerTintColor: colors.text, // This is how you can change the color of the text in the header
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: colors.background }, // This style will be applied to all the screens in the stack
      }}
    >
      <Stack.Screen name="index" options={{ title: "All Films" }} />
      <Stack.Screen name="[id]" options={{ title: "Film Details" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({});
