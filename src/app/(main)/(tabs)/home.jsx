import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { IconButton, Menu, Searchbar, Text } from "react-native-paper";
import { ChannelList, Chat, OverlayProvider } from "stream-chat-expo";

import Loader from "../../../components/Loader";
import COLORS from "../../../constants/colors";
import useProfile from "../../../hooks/useProfile";
import { useStreamChat } from "../../../hooks/useStreamChat";
import { createConversation } from "../../../services/chatService";
import { getProfileByLinkUpId } from "../../../services/profileService";
import styles from "../../../styles/home.styles";


const Home = () => {
    const { client, clientReady, userId } = useStreamChat();

    const [menuOpen, setMenuOpen] = useState(false);


    const [linkUpId, setLinkUpId] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState("");

    const router = useRouter();

    const { handleSignOut } = useProfile();


    const handleStartChat = async () => {
        const id = linkUpId.trim().toUpperCase();

        if (!/^LU\d{6}$/.test(id)) {
            setSearchError("Enter a valid LinkUp ID like LU123456.");
            return;
        }

        try {
            setLoading(true);
            setSearchError("");

            const profile = await getProfileByLinkUpId(id);

            const channel = await createConversation(
                client,
                userId,
                profile.id
            );

            setLinkUpId("");
            setSearchError("");
            setSearchOpen(false);

            router.push({
                pathname: "/(main)/chat/[id]",
                params: { id: channel.id },
            });
        } catch (error) {
            console.log("START CHAT ERROR:", error);

            if (error.code === "PGRST116") {
                setSearchError(
                    "No user found with this LinkUp ID."
                );
            } else {
                setSearchError(
                    "Something went wrong. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    if (!clientReady || !userId) {
        return <Loader />;
    }

    return (
        <OverlayProvider>
            <Chat client={client}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.brand}>
                            LinkUp
                            <Text style={styles.brandDot}>.</Text>
                        </Text>

                        <View style={styles.headerActions}>
                            <IconButton
                                icon={searchOpen ? "close" : "magnify"}
                                iconColor={COLORS.text}
                                onPress={() => {
                                    setSearchOpen(!searchOpen);
                                    setLinkUpId("");
                                    setSearchError("");
                                }}
                            />

                            <Menu
                                visible={menuOpen}
                                onDismiss={() => setMenuOpen(false)}
                                anchor={
                                    <IconButton
                                        icon="dots-vertical"
                                        iconColor={COLORS.text}
                                        onPress={() => setMenuOpen(true)}
                                    />
                                }
                            >
                                <Menu.Item
                                    leadingIcon="account-outline"
                                    title="Profile"
                                    onPress={() => {
                                        setMenuOpen(false);
                                        router.push("/(main)/profile");
                                    }}
                                />



                                <Menu.Item
                                    leadingIcon="logout"
                                    title="Sign out"
                                    onPress={async () => {
                                        setMenuOpen(false);
                                        await handleSignOut()
                                    }}
                                />
                            </Menu>
                        </View>

                        {searchOpen && (
                            <View style={styles.searchSection}>
                                <Searchbar
                                    value={linkUpId}
                                    onChangeText={(text) => {
                                        const value = text
                                            .toUpperCase()
                                            .replace(/[^A-Z0-9]/g, "")
                                            .slice(0, 8);

                                        setLinkUpId(value);
                                        setSearchError("");
                                    }}
                                    placeholder="Search LinkUp ID"
                                    autoFocus
                                    autoCapitalize="characters"
                                    autoCorrect={false}
                                    loading={loading}
                                    onSubmitEditing={handleStartChat}
                                    onIconPress={handleStartChat}
                                    style={styles.searchBar}
                                    inputStyle={styles.searchInput}
                                    iconColor={COLORS.textSecondary}
                                    placeholderTextColor={COLORS.textMuted}
                                    maxLength={8}
                                />

                                {searchError ? (
                                    <Text style={styles.searchError}>
                                        {searchError}
                                    </Text>
                                ) : null}
                            </View>
                        )}
                    </View>

                    {/* Chats */}

                    <ChannelList
                        filters={{
                            type: "messaging",
                            members: {
                                $in: [userId],
                            },
                        }}
                        onSelect={(channel) => {
                            router.push({
                                pathname: "/(main)/chat/[id]",
                                params: { id: channel.id },
                            });
                        }}
                    />

                </View>
            </Chat>
        </OverlayProvider>
    );
};

export default Home;