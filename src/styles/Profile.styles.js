import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "F4F2FF",
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 38,
        paddingBottom: 36,
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 42,
    },

    headerButton: {
        width: 44,
        height: 44,
        margin: 0,

        elevation: 1,
    },

    headerTitle: {
        color: COLORS.text,
        fontSize: 21,
        fontWeight: "900",
        letterSpacing: -0.8,
    },

    // Profile
    profile: {
        alignItems: "center",
        marginBottom: 42,
    },

    avatarWrapper: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: 108,
        height: 108,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: COLORS.primary,
    },

    avatarFallback: {
        backgroundColor: COLORS.primary,
        borderRadius: 60,
    },

    name: {
        color: COLORS.text,
        fontSize: 30,
        fontWeight: "900",
        letterSpacing: -1.3,
        marginTop: 20,
    },

    email: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: "500",
        marginTop: 5,
    },
    avatarLoader: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 108,
        height: 108,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 60,
        backgroundColor: "rgba(255, 255, 255, 0.65)",
    },
    idPill: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 3,
        minHeight: 42,
        borderRadius: 13,
        backgroundColor: COLORS.surfaceElevated,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    linkUpId: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "900",
        letterSpacing: 0.8,
    },

    copyButton: {
        margin: 0,
    },

    // Section
    sectionTitle: {
        color: COLORS.textMuted,
        fontSize: 11,
        fontWeight: "900",
        letterSpacing: 1.6,
        textTransform: "uppercase",
        marginBottom: 10,
        marginTop: 4,
    },

    // Action row
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 72,
        paddingHorizontal: 14,
        marginBottom: 26,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,

        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },

    menuIcon: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
        backgroundColor: COLORS.surfaceElevated,
    },

    menuText: {
        flex: 1,
        marginLeft: 13,
    },

    menuTitle: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "800",
    },

    menuSubtitle: {
        color: COLORS.textMuted,
        fontSize: 12,
        lineHeight: 17,
        marginTop: 3,
    },

    // Logout
    logoutButton: {
        marginTop: 8,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: COLORS.danger,
        backgroundColor: COLORS.surface,
    },

    logoutContent: {
        height: 52,
    },
});

export default styles;