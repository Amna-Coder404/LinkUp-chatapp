import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";

export default function TabsLayout() {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.onSurfaceVariant,

                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.outlineVariant,
                    height: 64,
                    paddingBottom: 8,
                    paddingTop: 6,
                },

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="calls"
                options={{
                    title: "Calls",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="phone"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}