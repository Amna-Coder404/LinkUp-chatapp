
import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    AudioCallContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingBottom: 60,
        backgroundColor: COLORS.background
    },
    avatar: {
        borderWidth: 1,
        borderColor: COLORS.border,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },

    textCall: {
        marginTop: 24,
        fontWeight: "700",
        textAlign: "center",
        color: COLORS.black
    },

    calltitle: {
        marginTop: 6,
        opacity: 0.7,
        textAlign: "center",
        color: COLORS.textMuted
    },

    callBtnCon: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
    },

    mutedText: {
        marginTop: 6,
        opacity: 0.8,
    },
});

export default styles;
