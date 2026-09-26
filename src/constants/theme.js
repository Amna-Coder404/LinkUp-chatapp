import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import COLORS from "./colors";

export const darkTheme = {
    ...MD3DarkTheme,

    colors: {
        ...MD3DarkTheme.colors,

        primary: COLORS.primary,
        onPrimary: COLORS.white,

        background: COLORS.background,
        onBackground: COLORS.text,

        surface: COLORS.surface,
        onSurface: COLORS.text,

        surfaceVariant: COLORS.surfaceElevated,
        onSurfaceVariant: COLORS.textSecondary,

        outline: COLORS.border,

        error: COLORS.danger,
        onError: COLORS.white,

        secondary: COLORS.secondary,
        onSecondary: COLORS.white,
    },
};

export const lightTheme = {
    ...MD3LightTheme,

    colors: {
        ...MD3LightTheme.colors,

        primary: COLORS.primary,
        onPrimary: COLORS.white,

        background: "#F7F7FA",
        onBackground: "#111118",

        surface: "#FFFFFF",
        onSurface: "#111118",

        surfaceVariant: "#F0EFF5",
        onSurfaceVariant: "#666675",

        outline: "#D8D8E2",

        error: COLORS.danger,
        onError: COLORS.white,

        secondary: COLORS.secondary,
        onSecondary: COLORS.white,
    },
};