
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // CALLS SCREEN

    container: {
        flex: 1,
    },

    list: {
        paddingVertical: 8,
    },

    emptyList: {
        flexGrow: 1,
    },
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, }, headerTitle: { fontWeight: "700", },
    title: {
        fontWeight: "700",
        marginBottom: 16,
    },
    // EMPTY STATE

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },

    emptyTitle: {
        fontWeight: "600",
    },

    emptyText: {
        marginTop: 8,
        opacity: 0.6,
        textAlign: "center",
    },

    // LOADING

    loading: {
        minHeight: 80,
        justifyContent: "center",
        alignItems: "center",
    },

    // CALL CARD

    card: {
        minHeight: 82,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    // AVATAR

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },

    avatarFallback: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },

    // DETAILS

    details: {
        flex: 1,
        marginLeft: 14,
        marginRight: 10,
    },

    name: {
        fontWeight: "600",
    },

    callInfo: {
        marginTop: 3,
    },

    callType: {
        opacity: 0.75,

    },


    missedCall: {
        color: "#DC2626",
    },

    declinedCall: {
        color: "#DC2626",
    },

    notAnsweredCall: {
        color: "#6B7280",
    },

    cancelledCall: {
        color: "#6B7280",
    },

    outgoingCall: {
        color: "#16A34A",
    },

    incomingCall: {
        color: "#16A34A",
    },




    // MISSED CALL

    missedCall: {
        color: "#D32F2F",
        opacity: 1,
        fontWeight: "600",
    },

    date: {
        marginTop: 2,
        opacity: 0.55,
    },

    duration: {
        marginTop: 2,
        opacity: 0.55,
    },

    // CALL ICON

    callIcon: {
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
    },

    callIconText: {
        fontSize: 22,
    },

    callIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3F4F6",
    },
    audioCallIcon: {
        backgroundColor: "#EAF8EF",
    },
    videoCallIcon: { backgroundColor: "#EEEEFF", }, missedCallIcon: { backgroundColor: "#FDECEC", },
});

export default styles;
