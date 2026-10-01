import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

    content: {
        paddingBottom: 40,
    },

    /* Header */

    header: {
        height: 58,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        backgroundColor: COLORS.white,
    },

    headerButton: {
        margin: 0,
    },

    headerTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 2,
    },

    /* Profile */

    profileHero: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 28,
    },

    avatar: {
        backgroundColor: COLORS.primary,
    },

    profileDetails: {
        flex: 1,
        marginLeft: 18,
    },

    name: {
        color: COLORS.text,
        fontSize: 23,
        fontWeight: "700",
        letterSpacing: -0.5,
        marginBottom: 7,
    },

    rowContent: {
        flex: 1,
    },

    rowTitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 2,
    },

    rowValue: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: "700",
        letterSpacing: 0.3,
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginHorizontal: 24,
    },

    /* Share */

    actions: {
        paddingHorizontal: 18,
        paddingVertical: 8,
    },

    actionRow: {
        minHeight: 68,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
    },

    actionIcon: {
        width: 46,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },

    actionText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "600",
    },

    /* Block */

    blockSection: {
        marginTop: 8,
        paddingHorizontal: 18,
    },

    blockRow: {
        minHeight: 62,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
    },

    dangerText: {
        color: COLORS.danger,
        fontSize: 16,
        fontWeight: "600",
    },
});

export default styles;