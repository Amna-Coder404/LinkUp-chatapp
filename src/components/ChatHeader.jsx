
import { useState } from "react";
import { Pressable, View } from "react-native";

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
import ProfileImagePreview from "./Modals/ProfileImagePreview";


const ChatHeader = ({ channel, otherUser, currentUserId, onBack, }) => {
    // call action
    const { calling, startAudioCall, startVideoCall, } = useStreamCall();


    // chat menu actions
    const { clearChat, blockUser, deleteChat } = useChatMenu(otherUser, onBack);

    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    const handleAudioCall = async () => {
        try {
            await startAudioCall(currentUserId, otherUser?.id);
        } catch (error) {
            console.log("AUDIO CALL ERROR:", error);
        }
    };


    const handleVideoCall = async () => {
        try {
            await startVideoCall(
                currentUserId,
                otherUser?.id
            );
        } catch (error) {
            console.log("VIDEO CALL ERROR:", error);
        }
    };


    return (
        <View style={styles.ChatHeader}>

            {/* Back */}
            <IconButton
                icon="arrow-left"
                size={24}
                onPress={onBack}
            />


            {/* Profile image */}
            <Pressable
                onPress={() => setImagePreviewOpen(true)}
            >
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
            </Pressable>


            {/* Profile image preview */}
            <ProfileImagePreview
                visible={imagePreviewOpen}
                image={otherUser?.image || null}
                onClose={() => setImagePreviewOpen(false)}
            />


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
                    {/* TODO LATER ADD a profile seaction for this */}
                    {/* <Text variant="bodySmall" style={styles.statusText}  >
                        {otherUser.linkupId}
                    </Text> */}
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

        </View>
    );
};


export default ChatHeader;

