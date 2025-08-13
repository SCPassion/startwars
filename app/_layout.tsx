import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    // Tabs by default scale all the tab defined in your app folder, inside the Tabs component
    // you can use the options prop to customize a certain tab, or to hide a tab

    // Note that expo router's tab have embedded the ScrollView component, so you don't need to wrap your content in a ScrollView
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.background }, // This is how you can change the background color of the header
        headerTintColor: colors.text, // This is how you can change the color of the text in the header
        headerTitleStyle: { fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.text,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.inactive,
      }}
    >
      {/* to get rig of a tab, use href={null} */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="films"
        options={{
          title: "All Films",
          tabBarLabel: "Films",
          tabBarIcon: (
            { color, size } // This is how you can change the icon of a tab
          ) => <Ionicons name="film-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="people"
        options={{
          title: "All Characters",
          tabBarLabel: "People",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "My Favorites",
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
