import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const BLOCKED_USERS_KEY = "linkup_blocked_users";

export const getBlockedUsers = async () => {
    try {
        const data = await AsyncStorage.getItem(BLOCKED_USERS_KEY);

        if (!data) {
            return [];
        }

        return JSON.parse(data);
    } catch (error) {
        console.log("GET BLOCKED USERS ERROR:", error);

        return [];
    }
};


export const saveBlockedUser = async (user) => {
    try {
        const currentUsers = await getBlockedUsers();

        const alreadyBlocked = currentUsers.some(
            (blockedUser) => blockedUser.id === user.id
        );

        if (alreadyBlocked) {
            return currentUsers;
        }

        const updatedUsers = [...currentUsers, user,];

        await AsyncStorage.setItem(
            BLOCKED_USERS_KEY,
            JSON.stringify(updatedUsers)
        );

        return updatedUsers;
    } catch (error) {
        console.log("SAVE BLOCKED USER ERROR:", error);

        throw error;
    }
};


export const removeBlockedUser = async (
    userId
) => {
    try {
        const currentUsers = await getBlockedUsers();

        const updatedUsers =
            currentUsers.filter(
                (user) => user.id !== userId
            );

        await AsyncStorage.setItem(
            BLOCKED_USERS_KEY,
            JSON.stringify(updatedUsers)
        );

        return updatedUsers;
    } catch (error) {
        console.log("REMOVE BLOCKED USER ERROR:", error);

        throw error;
    }
};


export const isUserBlocked = async (userId) => {
    try {
        const currentUsers = await getBlockedUsers();

        return currentUsers.some((user) => user.id === userId
        );
    } catch (error) {
        console.log("CHECK BLOCKED USER ERROR:", error);

        return false;
    }




};

// BLcok USer from Profile
export const blockUserFromProfile = async (client, user
) => {

    return new Promise((resolve) => {

        Alert.alert(
            "Block user?",
            `Are you sure you want to block ${user?.full_name || "this user"
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

                            if (!user?.id) {
                                throw new Error("User ID is not available.");
                            }


                            // Block on Stream
                            await client.blockUser(user.id);

                            // Save locally
                            await saveBlockedUser({
                                id: user.id,
                                name: user.full_name,
                                image: user.avatar_url || null,
                                linkupId: user.linkup_id,
                            });


                            Alert.alert(
                                "User blocked",
                                "This user has been blocked successfully.",
                                [
                                    {
                                        text: "OK",
                                        onPress: () =>
                                            resolve(true),
                                    },
                                ]
                            );

                        } catch (error) {

                            console.log("BLOCK USER ERROR:",
                                error
                            );

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
}