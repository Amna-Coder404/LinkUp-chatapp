import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    // RingingCallContentRouter
    RingingCallContentRouter: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },


    // ChatHeader

    ChatHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    //   {/* Name + status */}
    statusCon: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    status: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 5,
    },

    statusText: {
        color: "#777",
    },

    // Audio Call Content 
    audioCallContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#208AEF",
        padding: 24,
    },

    textCall: {
        color: "white",
        fontWeight: "700",
        marginTop: 20,
    },
    callBtnCon: {
        flexDirection: "row",
        marginTop: 60,
        gap: 24,
    },
    calltitle: {
        color: COLORS.white,
        marginTop: 6,
    }

});

export default styles;