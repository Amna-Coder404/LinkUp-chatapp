import {
    ParticipantView,
    useCall,
    useCallStateHooks
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";
import { Avatar, IconButton, Text, useTheme } from "react-native-paper";
import COLORS from "../constants/colors";
import styles from "../styles/AudioCall.styles";
import formatCallDuration from "../utils/formatCallDuration";
import getImageSource from "../utils/getImageSource";


// UI (user interface)
const AudioCallContent = () => {
    const theme = useTheme();
    const isDark = theme.dark;

    const call = useCall();

    const {
        useCallStartedAt,
        useCallCallingState,
        useCallMembers,
        useMicrophoneState,
        useParticipants,
    } = useCallStateHooks();

    const participants = useParticipants();

    const otherParticipant = participants.find(
        (participant) => participant.userId !== call?.currentUserId
    );
    const startedAt = useCallStartedAt();
    const callingState = useCallCallingState();
    const members = useCallMembers();

    const { microphone, isMute } = useMicrophoneState();

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

    const [now, setNow] = useState(Date.now());

    // that's for show call duration on Ui (live show )
    useEffect(() => {
        if (!startedAt) return;

        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, [startedAt]);

    if (callingState === "left") {
        return null;
    }

    const [callEnded, setCallEnded] = useState(false);

    useEffect(() => {
        if (!call) return;

        const unsubscribe = call.on("call.session_participant_left", (event) => {
            if (event?.participant?.user_id !== call.currentUserId) {
                setCallEnded(true);
            }
        });

        return () => unsubscribe();
    }, [call]);

    if (callEnded) {
        return null;
    }
    return (
        <ImageBackground
            source={
                isDark
                    ? require("../../assets/images/imgs/call-bg-dark.png")
                    : require("../../assets/images/imgs/call-bg-light.png")
            }
            style={styles.AudioCallContent}
            resizeMode="cover"
        >
            {user?.image && (
                <Avatar.Image
                    size={89}
                    source={getImageSource(user?.image)}
                    style={styles.avatar}
                    backgroundColor="transparent"
                    borderColor={COLORS.border}
                />
            )
            }

            <Text variant="headlineSmall" style={[styles.textCall, { color: isDark ? COLORS.white : COLORS.black }]}  >
                {user?.name || "Audio Call"}
            </Text>

            <Text variant="bodyLarge" style={styles.calltitle}>
                {formatCallDuration(startedAt, now)}
            </Text>
            {otherParticipant && (
                <ParticipantView
                    participant={otherParticipant}
                    VideoRenderer={null}
                    ParticipantVideoFallback={null}
                    ParticipantNetworkQualityIndicator={false}
                    style={{ backgroundColor: "transparent" }}
                />
            )}
            <View style={styles.callBtnCon}>
                <IconButton
                    icon={isMute ? "microphone-off" : "microphone"}
                    mode="contained"
                    containerColor="white"
                    iconColor={COLORS.primary}

                    size={30}
                    onPress={handleMute}
                />

                <IconButton
                    icon="phone-hangup"
                    mode="contained"
                    containerColor={COLORS.danger}
                    iconColor="white"
                    size={30}
                    onPress={handleHangup}
                />
            </View>
        </ImageBackground>
    );
};

export default AudioCallContent; 