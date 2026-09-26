import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {

        paddingHorizontal: 24,
        paddingTop: 55,
        paddingBottom: 25,
    },


    brand: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: "800",
        letterSpacing: -0.5,
    },

    brandDot: {
        color: COLORS.primary,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 42,
    },

    logo: {
        width: 68,
        height: 68,
    },
    /* Hero */
    hero: {
        marginBottom: 42,
        paddingRight: 65,
    },

    eyebrow: {
        color: COLORS.primaryLight,
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 2,
        marginBottom: 12,
        textTransform: "uppercase",
    },

    heroTitle: {
        color: COLORS.text,
        fontSize: 42,
        lineHeight: 44,
        fontWeight: "800",
        letterSpacing: -1.5,
    },

    heroAccent: {
        color: COLORS.primary,
    },

    heroSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 22,
        marginTop: 14,
        maxWidth: 280,

    },

    /* Form */

    formCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 22,
        padding: 18,

        borderWidth: 1,
        borderColor: COLORS.border,

        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.08,
        shadowRadius: 16,

        elevation: 4,
    },

    form: {
        gap: 14,
    },

    inputWrapper: {
        backgroundColor: COLORS.surfaceElevated,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },
    form: {
        gap: 18,
    },

    inputWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    input: {
        backgroundColor: "transparent",
        paddingHorizontal: 0,
    },

    /* Error */
    error: {
        color: COLORS.danger,
        fontSize: 13,
        marginTop: -8,
    },

    /* Main button */
    button: {
        marginTop: 8,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
    },

    buttonContent: {
        height: 54,
    },

    /* Bottom navigation */
    accountRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 28,
    },

    accountText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },

    link: {
        color: COLORS.primaryLight,
        fontSize: 14,
        fontWeight: "700",
    },

    /* Small bottom text */
    footer: {
        alignItems: "center",
        marginTop: "auto",
        paddingTop: 25,
    },

    footerText: {
        color: COLORS.textMuted,
        fontSize: 12,
    },
});

export default styles;