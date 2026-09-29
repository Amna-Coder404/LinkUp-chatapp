
import { useEffect, useState } from "react";

import { Image, Pressable, View, } from "react-native";

import { Avatar, Icon, Text } from "react-native-paper";

import COLORS from "../constants/colors";
import { useAuth } from "../hooks/useAuth";
import { getOtherUserProfile } from "../services/profileService";


import ProfileImagePreview from "../components/Modals/ProfileImagePreview";
import styles from "../styles/calls.styles";



const formatDuration = (startedAt, endedAt) => {
    if (!startedAt || !endedAt) {
        return "";
    }


    const start = new Date(startedAt).getTime();

    const end = new Date(endedAt).getTime();

    if (Number.isNaN(start) || Number.isNaN(end) || end < start
    ) {
        return "";
    }

    const totalSeconds = Math.floor((end - start) / 1000);

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    if (minutes === 0) {
        return `${seconds}s`;
    }

    return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
};



const CallHistoryCard = ({ call, }) => {


    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);

    const otherUserId = call?.caller_id === user?.id
        ? call?.receiver_id
        : call?.caller_id;

    useEffect(() => {
        let mounted = true;

        const loadProfile =
            async () => {
                if (!otherUserId) {
                    setLoading(false);
                    return;
                }

                try {
                    const data = await getOtherUserProfile(otherUserId);

                    if (mounted) {
                        setProfile(data);
                    }
                } catch (error) {
                    console.log("CALL HISTORY PROFILE ERROR:", error);
                } finally {
                    if (mounted) {
                        setLoading(false);
                    }
                }
            };

        loadProfile();

        return () => {
            mounted = false;
        };
    }, [otherUserId]);

    if (loading) return;


    if (!profile) { return null; }

    const name = profile.full_name || profile.linkup_id || "Unknown User";

    const image = profile.avatar_url;

    const isVideo = call?.call_type === "video";

    const isOutgoing = call?.caller_id === user?.id;

    const isMissed = call?.status === "missed";

    const isRinging = call?.status === "ringing";

    const isDeclined = call?.status === "declined";

    const isCancelled = call?.status === "cancelled";

    const callDate =
        call?.ended_at
            ? new Date(
                call.ended_at
            )
            : call?.created_at
                ? new Date(
                    call.created_at
                )
                : null;

    const date =
        callDate ? callDate.toLocaleDateString([], {
            day: "2-digit",
            month: "short",
        }
        ) : "";

    const time = callDate
        ? callDate.toLocaleTimeString(
            [],
            {
                hour: "2-digit", minute: "2-digit",
            }
        )
        : "";

    const duration = formatDuration(
        call?.started_at,
        call?.ended_at
    );

    // CALL STATUS

    let statusText;
    let statusStyle;

    if (isMissed) {
        statusText = "↙ Missed";
        statusStyle = styles.missedCall;
    } else if (isRinging) {
        statusText = "↗ Not answered";
        statusStyle = styles.notAnsweredCall;
    } else if (isDeclined) {
        statusText = "↙ Declined";
        statusStyle = styles.declinedCall;
    } else if (isCancelled) {
        statusText = "↗ Cancelled";
        statusStyle = styles.cancelledCall;
    } else if (isOutgoing) {
        statusText = "↗ Outgoing";
        statusStyle = styles.outgoingCall;
    } else {
        statusText = "↙ Incoming";
        statusStyle = styles.incomingCall;
    }
    const callIcon = isVideo ? "video" : "phone";

    return (
        <Pressable style={styles.card}  >
            {/* AVATAR */}
            <Pressable onPress={() => setImagePreviewOpen(true)}
            >
                {image ? (

                    <Image
                        source={{ uri: image }}
                        style={styles.avatar}
                    />

                ) : (
                    <Avatar.Text
                        size={52}
                        label={name.charAt(0).toUpperCase()}
                        style={styles.avatarFallback}
                    />
                )}
            </Pressable>

            <ProfileImagePreview
                visible={imagePreviewOpen}
                image={image}
                onClose={() => setImagePreviewOpen(false)}

            />


            {/* DETAILS */}
            <View style={styles.details}  >
                <Text variant="titleMedium" style={styles.name} numberOfLines={1}  >
                    {name}
                </Text>

                <View style={styles.callInfo} >
                    {/* STATUS + CALL TYPE */}
                    <Text variant="bodyMedium" style={[statusStyle,]}  >
                        {statusText}

                    </Text>

                    {/* DATE + TIME */}
                    <Text variant="bodySmall" style={styles.date}    >
                        {date} · {time}
                    </Text>

                    {/* DURATION */}
                    {duration ? (
                        <Text variant="bodySmall" style={styles.duration}  >
                            {duration}
                        </Text>
                    ) : null}
                </View>
            </View>

            {/* CALL ICON */}
            <View style={[styles.callIcon, isMissed && styles.missedCallIcon, !isMissed && isVideo && styles.videoCallIcon, !isMissed && !isVideo && styles.audioCallIcon,]} >
                <Icon source={callIcon} size={21} color={isMissed ? COLORS.danger : isVideo ? "#5B5BD6" : "#16A34A"} />
            </View>
        </Pressable>
    );
};

export default CallHistoryCard;

