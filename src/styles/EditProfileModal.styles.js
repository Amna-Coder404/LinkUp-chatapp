import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    modal: {
        margin: 16,
        maxHeight: "90%",
        padding: 20,
        backgroundColor: COLORS.surface,
        borderRadius: 24,
    },

    handle: {
        width: 42,
        height: 4,
        borderRadius: 4,
        backgroundColor: COLORS.border,
        alignSelf: "center",
        marginBottom: 18,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },

    title: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "900",
    },

    photoSection: {
        alignItems: "center",
        marginBottom: 24,
    },
    avatarWrapper: {
        position: "relative",
    },

    avatar: {
        width: 96,
        height: 96,
        borderRadius: 60,
    },

    initialAvatar: {
        width: 96,
        height: 96,
        borderRadius: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
    },

    initial: {
        color: COLORS.white,
        fontSize: 34,
        fontWeight: "900",
    },
    modalWrapper: {
        flex: 1,
        justifyContent: "flex-end",
        margin: 0,
    },

    modal: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        maxHeight: "92%",
    },
    changePhoto: {
        position: "absolute",
        right: -4,
        bottom: -4,
        width: 38,
        height: 38,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        borderWidth: 3,
        borderColor: COLORS.surface,
    },


    input: {
        marginBottom: 14,
        backgroundColor: COLORS.surface,
    },

    helper: {
        color: COLORS.textMuted,
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 8,
    },

    error: {
        color: COLORS.danger,
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 8,
    },

    saveButton: {
        marginTop: 12,
        borderRadius: 14,
    },

    saveContent: {
        height: 52,
    },
});

export default styles;