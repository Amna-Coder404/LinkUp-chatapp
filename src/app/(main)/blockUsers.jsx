import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";

import {
    Avatar,
    Button,
    Icon,
    IconButton,
    Text
} from "react-native-paper";

import COLORS from "../../constants/colors";
import { getBlockedUsers, removeBlockedUser } from "../../services/blockService";
import {
    getProfileInitial,
} from "../../utils/getImageSource";

import Loader from "../../components/Loader";
import { streamClient } from "../../lib/stream";
import styles from "../../styles/BlockUsers.styles";

// For Offline Support
import NoInternetModal from "../../components/NetInfo/NoInternetModal";
import useNetworkStatus from "../../hooks/useNetWork";



const BlockUsers = () => {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isOnline } = useNetworkStatus();

    const [showNoInternet, setShowNoInternet] = useState(false);

    useEffect(() => {
        loadBlockedUsers();
    }, []);

    // UnBlock
    const handleUnblock = (userId, userName) => {
        Alert.alert(
            "Unblock user?",
            `Are you sure you want to unblock ${userName || "this user"}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Unblock",
                    onPress: async () => {
                        if (!isOnline) {
                            setShowNoInternet(true);
                            return;
                        }

                        try {
                            await streamClient.unBlockUser(userId);

                            const updatedUsers = await removeBlockedUser(userId);

                            setBlockedUsers(updatedUsers);
                        } catch (error) {
                            console.log("UNBLOCK USER ERROR:", error);
                        }
                    },
                },
            ]
        );
    };
    // Load block user
    const loadBlockedUsers = async () => {
        try {
            const users = await getBlockedUsers();

            setBlockedUsers(users);
        } catch (error) {
            console.log(
                "LOAD BLOCKED USERS ERROR:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const renderHeader = () => (
        <>
            {/* Header */}
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    size={22}
                    iconColor={COLORS.text}
                    onPress={() => router.back()}
                    style={styles.headerButton}
                />

                <Text style={styles.headerTitle}>
                    Blocked Users
                </Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>
                People you have blocked can't contact you
                through LinkUp.
            </Text>
        </>
    );

    const renderUser = ({ item }) => (
        <View style={styles.userCard}>
            {/* Avatar */}
            {item.image ? (
                <Avatar.Image
                    size={52}
                    source={{ uri: item.image, }}
                />
            ) : (
                <Avatar.Text
                    size={52}
                    label={getProfileInitial(item.name)}
                    color={COLORS.white}
                    style={styles.avatar}
                />
            )}

            {/* User Info */}
            <View style={styles.userInfo}>
                <Text style={styles.userName} numberOfLines={1}   >
                    {item.name}
                </Text>

                <Text style={styles.linkUpId}>
                    {item.linkupId || "LinkUp ID unavailable"}
                </Text>
            </View>

            {/* Unblock */}
            <Button
                mode="outlined"
                compact
                textColor={COLORS.primary}
                style={styles.unblockButton}
                onPress={() =>
                    handleUnblock(item.id, item.name)
                }

            >
                Unblock
            </Button>
        </View>
    );

    if (loading) return <Loader />

    return (
        <>
            <FlatList
                data={blockedUsers}
                keyExtractor={(item) => item.id}
                renderItem={renderUser}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon
                            source="account-cancel-outline"
                            size={60}
                            color={COLORS.textMuted}
                        />

                        <Text style={styles.emptyTitle}>
                            No blocked users
                        </Text>

                        <Text style={styles.emptyText}>
                            Users you block will appear here.
                        </Text>
                    </View>
                }
                contentContainerStyle={[
                    styles.content,
                    blockedUsers.length === 0 &&
                    styles.emptyListContent,
                ]}
                showsVerticalScrollIndicator={false}

            />

            <NoInternetModal
                visible={showNoInternet}
                onClose={() => setShowNoInternet(false)}
            />
        </>
    );
};

export default BlockUsers;