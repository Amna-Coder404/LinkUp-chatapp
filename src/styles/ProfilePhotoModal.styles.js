import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    modalContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 28,
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },

    handle: {
        width: 42,
        height: 4,
        borderRadius: 4,
        alignSelf: "center",
        backgroundColor: COLORS.border,
        marginBottom: 20,
    },

    modalTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: "900",
        marginBottom: 8,
    },

    actionItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    actionText: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 14,
    },

    cancelButton: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        marginTop: 14,
        borderRadius: 15,
        backgroundColor: COLORS.surfaceElevated,
    },

    cancelText: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "800",
    },

    previewContainer: {
        flex: 1,
        margin: 0,
        backgroundColor: "rgba(0,0,0,0.96)",
        justifyContent: "center",
        alignItems: "center",
    },

    previewImage: {
        width: "100%",
        height: "80%",
    },

    closeButton: {
        position: "absolute",
        top: 35,
        right: 10,
        zIndex: 10,
        backgroundColor: "rgba(255,255,255,0.12)",
        borderRadius: 14,
    },
});

export default styles;