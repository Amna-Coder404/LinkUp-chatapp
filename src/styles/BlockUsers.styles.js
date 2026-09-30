import { StyleSheet } from "react-native";

import COLORS from "../constants/colors";


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },


    content: {
        padding: 20,
        paddingBottom: 40,
    },


    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },


    headerButton: {
        margin: 0,
        marginRight: 8,
    },


    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: "600",
        color: COLORS.text,
    },


    description: {
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.textMuted,
        marginBottom: 20,
    },


    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 80,
    },


    userCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        marginBottom: 12,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
    },


    avatar: {
        backgroundColor: COLORS.primary,
    },


    userInfo: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
    },


    userName: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
    },


    linkUpId: {
        marginTop: 3,
        fontSize: 13,
        color: COLORS.textMuted,
    },


    unblockButton: {
        borderColor: COLORS.primary,
        borderRadius: 10,
    },


    emptyListContent: {
        flexGrow: 1,
    },


    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },


    emptyTitle: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
    },


    emptyText: {
        marginTop: 6,
        fontSize: 14,
        textAlign: "center",
        color: COLORS.textMuted,
    },

});


export default styles;