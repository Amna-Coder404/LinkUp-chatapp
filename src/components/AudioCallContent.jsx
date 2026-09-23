import { View } from "react-native";
import { Avatar, IconButton, Text } from "react-native-paper";

import { useCall, useCallStateHooks, } from "@stream-io/video-react-native-sdk";
import styles from "../styles/Chatui.styles";

const AudioCallContent = () => {
    const call = useCall();

    const { useCallMembers, useMicrophoneState, } = useCallStateHooks();

    const members = useCallMembers();

    const { microphone, isMute, } = useMicrophoneState();

    const otherMember = members.find(
        (member) => member.user_id !== call?.currentUserId
    );

    const user = otherMember?.user;

    // Option During Call
    const handleMute = async () => {
        await microphone.toggle();
    };

    const handleHangup = async () => {
        await call?.leave();
    };

    return (
        <View style={styles.AudioCallContent}>
            {user?.image ? (
                <Avatar.Image
                    size={110}
                    source={{ uri: user.image }}
                />
            ) : (
                <Avatar.Text
                    size={110}
                    label={
                        user?.name
                            ?.charAt(0)
                            .toUpperCase() || "U"
                    }
                />
            )}

            <Text variant="headlineSmall" style={styles.textCall}  >
                {user?.name || "Audio Call"}
            </Text>

            <Text variant="bodyLarge" style={styles.calltitle}>
                Audio call
            </Text>

            <View style={styles.callBtnCon}>
                <IconButton
                    icon={isMute === "disabled" ? "microphone-off" : "microphone"}
                    mode="contained"
                    containerColor="white"
                    iconColor="#208AEF"
                    size={30}
                    onPress={handleMute}
                />

                <IconButton
                    icon="phone-hangup"
                    mode="contained"
                    containerColor="#EF4444"
                    iconColor="white"
                    size={30}
                    onPress={handleHangup}
                />
            </View>
        </View>
    );
};

export default AudioCallContent;