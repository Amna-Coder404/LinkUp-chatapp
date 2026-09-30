import AsyncStorage from "@react-native-async-storage/async-storage";

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