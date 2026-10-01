
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";

import {
    ActivityIndicator,
    Avatar,
    Button,
    Icon,
    IconButton,
    Text,
} from "react-native-paper";

import Loader from "../../components/Loader";
import EditProfileModal from "../../components/Modals/EditProfileModal";
import ProfileImagePreview from "../../components/Modals/ProfileImagePreview";
import ProfilePhotoModal from "../../components/Modals/ProfilePhotoModal";

import COLORS from "../../constants/colors";
import { useAuth } from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

import ChangePasswordModal from "../../components/Modals/ChangePasswordModal";
import NoInternetModal from "../../components/NetInfo/NoInternetModal";
import useNetworkStatus from "../../hooks/useNetWork";
import { getBlockedUsers } from "../../services/blockService";
import styles from "../../styles/Profile.styles";
import { getProfileInitial } from "../../utils/getImageSource";


const Profile = () => {
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);

    const [changePasswordOpen, setChangePasswordOpen] = useState(false);

    const [offline, setOffline] = useState(false);

    const { isOnline } = useNetworkStatus();
    const [blockedCount, setBlockedCount] = useState(0);
    // AUTH
    const { user, loading: authLoading, } = useAuth();

    // PROFILE
    const {
        profile,
        loading: profileLoading,
        avatarUploading,
        profileSaving,
        copyLinkUpId,
        takeProfilePhoto,
        chooseProfilePhoto,
        removeProfilePhoto,
        updateProfileInfo,
        handleSignOut,
    } = useProfile(user);

    const loading = authLoading || profileLoading;

    useEffect(() => {
        const loadBlockedCount = async () => {
            const users = await getBlockedUsers();
            setBlockedCount(users.length);
        };

        loadBlockedCount();
    }, []);

    const handleOpenModel = () => {
        if (!isOnline) {
            setOffline(true);
            return;
        }
        setChangePasswordOpen(true);
    }

    const openBlockedUsers = () => {
        router.push("/(main)/blockUsers");
    };

    if (loading) {
        return <Loader />;
    }

    const currentImage = profile?.avatar_url || null;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
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
                    Profile
                </Text>

                <IconButton
                    icon="pencil-outline"
                    size={21}
                    iconColor={COLORS.primary}
                    onPress={() => setEditProfileOpen(true)}
                    style={styles.headerButton}
                />
            </View>

            {/* Profile */}
            <View style={styles.profileHeader}>
                <TouchableOpacity
                    onPress={() => setPhotoModalOpen(true)}
                    activeOpacity={0.85}
                    disabled={avatarUploading}
                    style={styles.avatarWrapper}
                >
                    {currentImage ? (
                        <Image
                            source={{ uri: currentImage }}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    ) : (
                        <Avatar.Text
                            size={112}
                            label={getProfileInitial(profile?.full_name)}
                            style={styles.avatarFallback}
                            color={COLORS.white}
                        />
                    )}

                    {avatarUploading && (
                        <View style={styles.avatarLoader}>
                            <ActivityIndicator
                                size="small"
                                color={COLORS.primary}
                            />
                        </View>
                    )}

                    <View style={styles.cameraButton}>
                        <Icon
                            source="camera-outline"
                            size={15}
                            color={COLORS.white}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>
                        {profile?.full_name || "User"}
                    </Text>

                    <Text
                        style={styles.email}
                        numberOfLines={1}
                    >
                        {user?.email}
                    </Text>

                    <TouchableOpacity
                        style={styles.linkupRow}
                        onPress={copyLinkUpId}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.linkUpId}>
                            @{profile?.linkup_id}
                        </Text>

                        <Icon
                            source="content-copy"
                            size={15}
                            color={COLORS.primary}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Privacy */}

            <Text style={styles.sectionTitle}>
                Privacy & Safety
            </Text>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={openBlockedUsers}
            >
                <View style={styles.menuIcon}>
                    <Icon
                        source="account-cancel-outline"
                        size={21}
                        color={COLORS.primary}
                    />
                </View>

                <View style={styles.menuText}>
                    <View style={styles.titleRow}>
                        <Text style={styles.menuTitle}>
                            Blocked Users
                        </Text>

                        {blockedCount > 0 && (
                            <Text style={styles.blockedCount}>
                                {blockedCount}
                            </Text>
                        )}
                    </View>
                    <Text style={styles.menuSubtitle}>
                        Manage blocked accounts
                    </Text>
                </View>

                <Icon
                    source="chevron-right"
                    size={22}
                    color={COLORS.textMuted}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={handleOpenModel}
            >
                <View style={styles.menuIcon}>
                    <Icon
                        source="lock-outline"
                        size={21}
                        color={COLORS.primary}
                    />
                </View>

                <View style={styles.menuText}>
                    <Text style={styles.menuTitle}>
                        Change Password
                    </Text>

                    <Text style={styles.menuSubtitle}>
                        Update your LinkUp account password
                    </Text>
                </View>

                <Icon
                    source="chevron-right"
                    size={22}
                    color={COLORS.textMuted}
                />
            </TouchableOpacity>


            {/* Change pwd Model */}
            <ChangePasswordModal
                visible={changePasswordOpen}
                onClose={() => setChangePasswordOpen(false)}
                email={user?.email}
            />
            <NoInternetModal visible={offline} onClose={() => setOffline(false)} />
            {/* Sign out */}
            <Button
                mode="outlined"
                icon="logout"
                textColor={COLORS.danger}
                style={styles.logoutButton}
                contentStyle={styles.logoutContent}
                onPress={handleSignOut}
            >
                Sign out
            </Button>

            {/* Edit Profile Modal */}
            <EditProfileModal
                visible={editProfileOpen}
                onClose={() =>
                    setEditProfileOpen(false)
                }
                profile={profile}
                saving={profileSaving}
                onSave={updateProfileInfo}
                onChangePhoto={() => {
                    setEditProfileOpen(false);
                    setPhotoModalOpen(true);
                }}
            />

            {/* Photo Actions Modal */}
            <ProfilePhotoModal
                visible={photoModalOpen}
                onClose={() =>
                    setPhotoModalOpen(false)
                }
                image={currentImage}
                onTakePhoto={() => {
                    setPhotoModalOpen(false);
                    takeProfilePhoto();
                }}
                onChooseGallery={() => {
                    setPhotoModalOpen(false);
                    chooseProfilePhoto();
                }}
                onViewPhoto={() => {
                    setPhotoModalOpen(false);
                    setImagePreviewOpen(true);
                }}
                onDeletePhoto={() => {
                    setPhotoModalOpen(false);
                    removeProfilePhoto();
                }}
            />

            {/* Full Image Preview */}
            <ProfileImagePreview
                visible={imagePreviewOpen}
                image={currentImage}
                onClose={() =>
                    setImagePreviewOpen(false)
                }
            />
        </ScrollView>
    );
};

export default Profile;
