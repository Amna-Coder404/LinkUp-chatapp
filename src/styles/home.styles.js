import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 14,
        backgroundColor: COLORS.background,
    },

    brand: {
        color: COLORS.text,
        fontSize: 27,
        fontWeight: "800",
        letterSpacing: -1,
    },

    brandDot: {
        color: COLORS.primary,
    },

    headerActions: {
        position: "absolute",
        right: 12,
        top: 43,
        flexDirection: "row",
        alignItems: "center",
    },
    userName: {
        color: COLORS.text,
        fontSize: 28,
        fontWeight: "800",
        marginTop: 2,
    },


    searchBar: {
        marginTop: 14,
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        elevation: 1,
    },

    searchInput: {
        color: COLORS.text,
    },

    chatTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: "700",
        marginHorizontal: 18,
        marginTop: 8,
        marginBottom: 8,
    },

    searchError: {
        marginTop: 6,
        paddingHorizontal: 4,
        color: COLORS.danger,
        fontSize: 13,
        fontWeight: "500",
    },
});

export default styles;