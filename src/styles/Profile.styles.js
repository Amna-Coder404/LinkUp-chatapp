import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

    content: {
        paddingHorizontal: 22,
        paddingTop: 18,
        paddingBottom: 45,
    },

    // Header
    header: {
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 26,
    },

    headerButton: {
        margin: 0,
    },

    headerTitle: {
        color: COLORS.text,
        fontSize: 19,
        fontWeight: "800",
        letterSpacing: -0.4,
    },

    // Profile Header
    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 34,
        paddingVertical: 8,
    },

    avatarWrapper: {
        position: "relative",
    },

    avatar: {
        width: 112,
        height: 112,
        borderRadius: 56,
    },

    avatarFallback: {
        backgroundColor: COLORS.primary,
        borderRadius: 56,
    },

    avatarLoader: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 112,
        height: 112,
        borderRadius: 56,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
    },

    cameraButton: {
        position: "absolute",
        right: -2,
        bottom: 2,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        borderWidth: 3,
        borderColor: COLORS.white,
    },

    profileInfo: {
        flex: 1,
        marginLeft: 20,
        paddingRight: 4,
    },

    name: {
        color: COLORS.text,
        fontSize: 25,
        fontWeight: "800",
        letterSpacing: -0.8,
    },

    email: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: "500",
        marginTop: 6,
    },

    linkupRow: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 7,
        marginTop: 11,
    },

    linkUpId: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: "800",
        letterSpacing: 0.5,
    },

    // Sections
    sectionTitle: {
        color: COLORS.textMuted,
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        marginBottom: 2,
        marginTop: 8,
    },

    // Action Rows
    menuItem: {
        minHeight: 70,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    menuIcon: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
    },

    menuText: {
        flex: 1,
        marginLeft: 9,
    },

    menuTitle: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "700",
    },

    menuSubtitle: {
        color: COLORS.textMuted,
        fontSize: 12,
        marginTop: 3,
    },

    // Logout
    logoutButton: {
        marginTop: 28,
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: "transparent",
    },

    logoutContent: {
        height: 48,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    blockedCount: {
        width: 24,
        height: 24,
        top: 12,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: "800",
        backgroundColor: "#F0ECFF",
    },
});

export default styles;