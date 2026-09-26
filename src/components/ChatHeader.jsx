import { View } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";

import COLORS from "../constants/colors";
import { useStreamCall } from "../hooks/useStreamCall";
import styles from "../styles/Chatui.styles";
import { getProfileInitial } from "../utils/getImageSource";




const ChatHeader = ({ channel, otherUser, currentUserId, onBack, }) => {
    const { calling, startAudioCall, startVideoCall, } = useStreamCall();

    const handleAudioCall = async () => {
        try {
            await startAudioCall(currentUserId, otherUser.id);
        } catch (error) {
            console.log("AUDIO CALL ERROR:", error);
        }
    };

    const handleVideoCall = async () => {
        try {
            await startVideoCall(
                currentUserId,
                otherUser.id
            );
        } catch (error) {
            console.log("VIDEO CALL ERROR:", error);
        }
    };

    return (
        <View style={styles.ChatHeader}>
            {/* Back */}
            <IconButton icon="arrow-left" size={24} onPress={onBack} />

            {/* Profile image */}
            {otherUser?.image ? (
                <Avatar.Image size={42}
                    source={{ uri: otherUser.image }}
                />
            ) : (
                <Avatar.Text
                    size={42}
                    label={getProfileInitial(otherUser?.name)}
                    color={COLORS.white}
                />
            )}

            {/* Name + status */}
            <View style={{ flex: 1, marginLeft: 10, }}  >
                <Text
                    variant="titleMedium"
                    numberOfLines={1}
                    style={{ fontWeight: "600", }} >

                    {otherUser?.name || otherUser?.linkUpId || "Unknown User"}
                </Text>

                <View style={styles.statusCon}>
                    <View style={[{
                        backgroundColor: otherUser?.online ? "#22C55E" : "#9CA3AF",
                    }, styles.status]}
                    />

                    <Text variant="bodySmall" style={styles.statusText}>
                        {otherUser?.online ? "Online" : "Offline"}
                    </Text>
                </View>
            </View>

            {/* Audio call */}
            <IconButton
                icon="phone"
                size={22}
                disabled={calling}
                onPress={handleAudioCall}
            />

            {/* Video call */}
            <IconButton
                icon="video"
                size={22}
                disabled={calling}
                onPress={handleVideoCall}
            />

            {/* More */}
            <IconButton
                icon="dots-vertical"
                size={22}
                // TODO LATER add Menu
                onPress={() => {
                    console.log("CHAT MENU");
                }}
            />
        </View>
    );
};

export default ChatHeader;