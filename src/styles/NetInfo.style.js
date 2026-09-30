import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default StyleSheet.create({

    // =========================
    // OFFLINE BANNER
    // =========================

    banner: {
        position: "absolute",

        top: 0,
        left: 0,
        right: 0,

        zIndex: 9999,
        elevation: 9999,

        minHeight: 72,

        paddingHorizontal: 18,
        paddingVertical: 12,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: COLORS.surface,

        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,

        shadowOffset: {
            width: 0,
            height: 4,
        },

        shadowOpacity: 0.15,
        shadowRadius: 8,

        shadowColor: COLORS.text,
    },

    iconContainer: {
        width: 42,
        height: 42,

        borderRadius: 14,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: COLORS.primary,
    },

    textContainer: {
        flex: 1,

        marginLeft: 12,
        marginRight: 10,
    },

    title: {
        color: COLORS.text,

        fontSize: 15,
        fontWeight: "700",

        marginBottom: 3,
    },

    message: {
        color: COLORS.textMuted,

        fontSize: 12,
        lineHeight: 17,
    },

    statusDot: {
        width: 9,
        height: 9,

        borderRadius: 5,

        backgroundColor: COLORS.error,
    },

    // =========================
    // NO INTERNET MODAL
    // =========================

    modalContainer: {
        flex: 1,

        backgroundColor: "rgba(0,0,0,0.45)",

        justifyContent: "center",
        alignItems: "center",

        padding: 20,
    },

    modalContent: {
        width: "90%",
        maxWidth: 380,

        backgroundColor: COLORS.surface,

        borderRadius: 18,

        padding: 24,

        alignItems: "center",
    },

    modalTitle: {
        color: COLORS.text,

        fontSize: 20,
        fontWeight: "700",

        marginTop: 14,
    },

    modalDescription: {
        color: COLORS.textMuted,

        textAlign: "center",

        marginTop: 10,

        lineHeight: 21,
    },

    modalButton: {
        marginTop: 20,

        backgroundColor: COLORS.primary,

        paddingVertical: 12,
        paddingHorizontal: 30,

        borderRadius: 10,
    },

    buttonText: {
        color: COLORS.white,

        fontWeight: "700",
    },
});