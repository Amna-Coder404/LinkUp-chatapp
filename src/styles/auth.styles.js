import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    header: {
        marginBottom: 35,
    },
    link: {
        color: COLORS.white
    },
    title: {
        color: COLORS.text,
        fontWeight: "700",
        marginBottom: 8,
    },

    subtitle: {
        color: COLORS.textSecondary,
    },

    form: {
        gap: 16,
    },

    input: {
        backgroundColor: COLORS.surface,
    },

    button: {
        marginTop: 8,
        borderRadius: 12,
    },

    buttonContent: {
        height: 52,
    },

    signup: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },

    signupText: {
        color: COLORS.textSecondary,
    },
});

export default styles;