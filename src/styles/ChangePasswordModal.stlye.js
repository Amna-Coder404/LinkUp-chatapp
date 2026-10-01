
import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    keyboardWrapper: {
        flex: 1,
        justifyContent: "flex-end",
    },

    modal: {
        marginHorizontal: 20,
        marginBottom: 20,

        padding: 24,

        borderRadius: 24,
        backgroundColor: COLORS.white,

        maxHeight: "90%",
    },

    title: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
    },

    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 20,
    },

    input: {
        marginBottom: 12,
        backgroundColor: COLORS.white,
    },

    error: {
        marginBottom: 4,
    },

    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 8,
    },
});

export default styles;
