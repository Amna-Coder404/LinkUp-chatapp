import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import {
    Avatar,
    IconButton,
    Menu,
    Text,
} from "react-native-paper";

import COLORS from "../constants/colors";
import { useStreamCall } from "../hooks/useStreamCall";
import styles from "../styles/Chatui.styles";
import { getProfileInitial } from "../utils/getImageSource";

import useChatMenu from "../hooks/useChatMenu";
import useNetworkStatus from "../hooks/useNetWork";
import NoInternetModal from "./NetInfo/NoInternetModal";


const ChatHeader = ({ channel, otherUser, currentUserId, onBack, }) => {
    // call actions
    const { calling, startAudioCall, startVideoCall, } = useStreamCall();


    // chat menu actions
    const { clearChat, blockUser, deleteChat } = useChatMenu(otherUser, onBack);


    const [offline, setOffline] = useState(false);

    const { isOnline } = useNetworkStatus();

    const [menuOpen, setMenuOpen] = useState(false);

    // Audio Call
    const handleAudioCall = async () => {
        if (!isOnline) {
            setOffline(true);
            return;
        }

        try {
            await startAudioCall(currentUserId, otherUser?.id);
        } catch (error) {
            console.log("AUDIO CALL ERROR:", error);
        }
    };


    // Video Call
    const handleVideoCall = async () => {
        if (!isOnline) {
            setOffline(true);
            return;
        }
        try {
            await startVideoCall(
                currentUserId,
                otherUser?.id
            );
        } catch (error) {
            console.log("VIDEO CALL ERROR:", error);
        }
    };

    // Router To  Other User Profile
    const handleRouter = () => {
        if (!otherUser?.id) return;

        router.push({
            pathname: "/chat/user-profile/[id]",
            params: {
                id: otherUser.id,
            },
        });
    }

    return (
        <View style={styles.ChatHeader}>

            {/* Back */}
            <IconButton
                icon="arrow-left"
                size={24}
                onPress={onBack}
            />


            {/* Profile image */}
            <TouchableOpacity activeOpacity={0.7} onPress={handleRouter} style={styles.routerBtn} >
                {otherUser?.image ? (
                    <Avatar.Image
                        size={42}
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
                <View
                    style={{
                        flex: 1,
                        marginLeft: 10,
                    }}
                >
                    <Text
                        variant="titleMedium"
                        numberOfLines={1}
                        style={{
                            fontWeight: "600",
                        }}
                    >
                        {otherUser?.name || otherUser?.linkUpId ||
                            "Unknown User"}
                    </Text>


                    <View style={styles.statusCon}>
                        <View
                            style={[
                                { backgroundColor: otherUser?.online ? "#22C55E" : "#9CA3AF", },
                                styles.status,
                            ]}
                        />

                        <Text variant="bodySmall" style={styles.statusText}  >
                            {otherUser?.online ? "Online" : "Offline"}
                        </Text>

                    </View>
                </View>

            </TouchableOpacity>

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


            {/* More menu */}
            <Menu
                visible={menuOpen}
                onDismiss={() => setMenuOpen(false)}
                anchor={
                    <IconButton
                        icon="dots-vertical"
                        size={22}
                        onPress={() => setMenuOpen(true)}
                    />
                }
            >

                {/* Delete chat */}
                <Menu.Item
                    leadingIcon="delete-outline"
                    title="Delete chat"
                    onPress={async () => {
                        setMenuOpen(false);
                        const deleted = await deleteChat();

                        if (deleted) {
                            onBack?.();
                        }
                    }}
                />


                {/* Clear chat */}
                <Menu.Item
                    leadingIcon="broom"
                    title="Clear chat"
                    onPress={async () => { setMenuOpen(false); await clearChat(); }}
                />


                {/* Block user */}
                <Menu.Item
                    leadingIcon="account-cancel-outline"
                    title="Block user"
                    onPress={async () => {
                        setMenuOpen(false);

                        const blocked = await blockUser();

                        if (blocked) {
                            onBack?.();
                        }
                    }}
                />

            </Menu>

            {/* MODEL */}
            <NoInternetModal visible={offline} onClose={() => setOffline(false)} />
        </View>
    );
};


export default ChatHeader;

