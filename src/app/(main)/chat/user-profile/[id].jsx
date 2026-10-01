import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Pressable,
    ScrollView,
    Share,
    TouchableOpacity,
    View,
} from "react-native";
import {
    Avatar,
    IconButton,
    Text,
} from "react-native-paper";
import Loader from "../../../../components/Loader";
import COLORS from "../../../../constants/colors";
import { streamClient } from "../../../../lib/stream";

import {
    blockUserFromProfile,
} from "../../../../services/blockService";

import ProfileImagePreview from "../../../../components/Modals/ProfileImagePreview";
import { getOtherUserProfile } from "../../../../services/profileService";
import styles from "../../../../styles/UserProfile.styles";
import { getProfileInitial } from "../../../../utils/getImageSource";


const UserProfile = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);



    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);

                const profile = await getOtherUserProfile(id);

                setUser(profile);
            } catch (error) {
                console.log("GET OTHER USER PROFILE ERROR:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadProfile();
        }
    }, [id]);


    if (loading) return <Loader />;

    if (!user) return null;


    const handleBlockUser = async () => {
        const blocked = await blockUserFromProfile(streamClient, user);

        if (blocked) {
            router.back();
        }
    };

    const handleShareLinkUpId = async () => {
        try {
            await Share.share({
                message: `Check out ${user.full_name} on LinkUp!\n\n` + `LinkUp ID: ${user.linkup_id}`,
            });
        } catch (error) {
            console.log("SHARE LINKUP ID ERROR:", error);
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                {/* Header */}
                {/* Header */}
                <View style={styles.header}>
                    <IconButton
                        icon="arrow-left"
                        size={24}
                        iconColor={COLORS.text}
                        style={styles.headerButton}
                        onPress={() => router.back()}
                    />

                    <Text style={styles.headerTitle}>
                        Profile
                    </Text>
                </View>

                {/* Profile */}


                <View style={styles.profileHero}>
                    <Pressable onPress={() => setImagePreviewOpen(true)}>
                        {user.avatar_url ? (
                            <Avatar.Image
                                size={112}
                                source={{
                                    uri: user.avatar_url,
                                }}
                            />
                        ) : (
                            <Avatar.Text
                                size={112}
                                label={getProfileInitial(
                                    user.full_name
                                )}
                                color={COLORS.white}
                                style={styles.avatar}
                            />
                        )}
                    </Pressable>

                    <ProfileImagePreview
                        visible={imagePreviewOpen}
                        image={user.avatar_url}
                        onClose={() => setImagePreviewOpen(false)}

                    />
                    <View style={styles.profileDetails}>
                        <Text
                            style={styles.name}
                            numberOfLines={2}
                        >
                            {user.full_name}
                        </Text>

                        <View style={styles.rowContent}>
                            <Text style={styles.rowValue}>
                                @{user.linkup_id}
                            </Text>
                        </View>
                    </View>
                </View>


                <View style={styles.divider} />


                {/* Share */}
                <View style={styles.actions}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.actionRow}
                        onPress={handleShareLinkUpId}
                    >
                        <View style={styles.actionIcon}>
                            <IconButton
                                icon="share-variant-outline"
                                size={22}
                                iconColor={COLORS.primary}
                            />
                        </View>

                        <View style={styles.rowContent}>
                            <Text style={styles.actionText}>
                                Share LinkUp ID
                            </Text>

                            <Text style={styles.rowTitle}>
                                Share this ID with someone
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={styles.divider} />


                {/* Block */}
                <View style={styles.blockSection}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.blockRow}
                        onPress={handleBlockUser}
                    >
                        <View style={styles.actionIcon}>
                            <IconButton
                                icon="account-cancel-outline"
                                size={22}
                                iconColor={COLORS.danger}
                            />
                        </View>

                        <Text style={styles.dangerText}>
                            Block user
                        </Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </View>
    );
};

export default UserProfile;