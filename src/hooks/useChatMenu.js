
import { Alert } from "react-native";
import {
    useChannelContext,
    useChatContext,
} from "stream-chat-expo";

import { saveBlockedUser } from "../services/blockService";



const useChatMenu = ({ otherUser, onBack, }) => {
    const { client } = useChatContext();
    const { channel } = useChannelContext();


    const deleteChat = () => {
        return new Promise((resolve) => {
            Alert.alert(
                "Delete chat?",
                "Are you sure you want to delete this chat?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                        onPress: () => resolve(false),
                    },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                if (!channel) {
                                    throw new Error(
                                        "Channel is not available."
                                    );
                                }

                                await channel.hide(null, true);

                                console.log(
                                    "CHAT DELETED:",
                                    channel.id
                                );

                                Alert.alert(
                                    "Chat deleted",
                                    "This chat has been deleted successfully.",
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => {
                                                resolve(true);
                                            },
                                        },
                                    ]
                                );

                            } catch (error) {
                                console.log(
                                    "DELETE CHAT ERROR:",
                                    error
                                );

                                Alert.alert(
                                    "Delete failed",
                                    "Unable to delete this chat. Please try again."
                                );

                                resolve(false);
                            }
                        },
                    },
                ]
            );
        });
    };


    // clear chat
    const clearChat = async () => {
        try {
            if (!channel) {
                throw new Error("Channel is not available.");
            }

            await channel.hide(null, true);

        } catch (error) {
            console.log("CLEAR CHAT ERROR:", error
            );
        }
    };


    // Block User
    const blockUser = () => {
        return new Promise((resolve) => {
            Alert.alert(
                "Block user?",
                `Are you sure you want to block ${otherUser?.name || "this user"
                }?`,
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                        onPress: () => resolve(false),
                    },
                    {
                        text: "Block",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                if (!client) {
                                    throw new Error(
                                        "Stream Chat client is not available."
                                    );
                                }

                                if (!channel) {
                                    throw new Error("Channel is not available.");
                                }

                                const currentUserId = client.userID;

                                const otherMember = Object.values(channel.state.members || {}
                                ).find(
                                    (member) => member.user_id !==
                                        currentUserId
                                );

                                const otherUserId = otherMember?.user_id;

                                if (!otherUserId) {
                                    throw new Error(
                                        "Other user ID is not available."
                                    );
                                }

                                // 1. Block on Stream
                                await client.blockUser(otherUserId);

                                // 2. Save locally for offline support
                                await saveBlockedUser({
                                    id: otherUserId,
                                    name: otherMember?.user?.name || otherUser?.name,
                                    image: otherMember?.user?.image || otherUser?.image || null,
                                    linkupId: otherMember?.user?.linkup_id || otherUser?.linkup_id,
                                });

                                console.log("USER BLOCKED:", otherUserId);

                                console.log("BLOCKED USER SAVED LOCALLY");

                                Alert.alert(
                                    "User blocked",
                                    "This user has been blocked successfully.",
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => {
                                                resolve(true);
                                            },
                                        },
                                    ]
                                );

                            } catch (error) {
                                console.log("BLOCK USER ERROR:", error);

                                Alert.alert(
                                    "Block failed",
                                    "Unable to block this user. Please try again."
                                );

                                resolve(false);
                            }
                        },
                    },
                ]
            );
        });
    };



    return {
        deleteChat,
        clearChat,
        blockUser,
    };
};

export default useChatMenu;

