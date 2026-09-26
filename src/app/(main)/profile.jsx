import { router } from "expo-router";
import { useState } from "react";
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
import EditProfileModal from "./Modals/EditProfileModal";
import ProfileImagePreview from "./Modals/ProfileImagePreview";
import ProfilePhotoModal from "./Modals/ProfilePhotoModal";

import COLORS from "../../constants/colors";
import useProfile from "../../hooks/useProfile";
import styles from "../../styles/Profile.styles";
import { getProfileInitial } from "../../utils/getImageSource";

const Profile = () => {
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);

    const {
        user,
        profile,
        loading,
        avatarPreview,
        avatarUploading,
        profileSaving,
        copyLinkUpId,
        takeProfilePhoto,
        chooseProfilePhoto,
        removeProfilePhoto,
        updateProfileInfo,
        handleSignOut,
    } = useProfile();

    if (loading) {
        return <Loader />;
    }

    const currentImage =
        avatarPreview || profile?.avatar_url;

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



                <IconButton
                    icon="pencil-outline"
                    size={21}
                    iconColor={COLORS.text}
                    onPress={() => setEditProfileOpen(true)}
                    style={styles.headerButton}
                />
            </View>

            {/* Profile */}
            <View style={styles.profile}>
                <View style={styles.avatarWrapper}>
                    <TouchableOpacity
                        onPress={() => setEditProfileOpen(true)}
                        activeOpacity={0.8}
                        disabled={avatarUploading}
                    >
                        {currentImage ? (
                            <Image
                                source={{ uri: currentImage }}
                                style={styles.avatar}
                                resizeMode="cover"
                            />
                        ) : (
                            <Avatar.Text
                                size={108}
                                label={getProfileInitial(profile?.full_name
                                )}
                                style={styles.avatarFallback}
                                color={COLORS.white}
                            />
                        )}
                    </TouchableOpacity>

                    {avatarUploading && (
                        <View style={styles.avatarLoader}>
                            <ActivityIndicator
                                size="small"
                                color={COLORS.primary}
                            />
                        </View>
                    )}
                </View>
                <Text style={styles.name}>
                    {profile?.full_name || "User"}
                </Text>

                <Text style={styles.email}>
                    {user?.email}
                </Text>

                <View style={styles.idPill}>
                    <Text style={styles.linkUpId}>
                        {profile?.linkup_id}
                    </Text>

                    <IconButton
                        icon="content-copy"
                        size={16}
                        iconColor={COLORS.primary}
                        onPress={copyLinkUpId}
                        style={styles.copyButton}
                    />
                </View>
            </View>

            {/* Privacy */}
            <Text style={styles.sectionTitle}>
                Privacy & Safety
            </Text>

            <TouchableOpacity style={styles.menuItem} onPress={() => { }}   >
                <View style={styles.menuIcon}>
                    <Icon
                        source="account-cancel-outline"
                        size={21}
                        color={COLORS.primary}
                    />
                </View>

                <View style={styles.menuText}>
                    <Text style={styles.menuTitle}>
                        Blocked Users
                    </Text>

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
                onClose={() => setEditProfileOpen(false)}
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
                onClose={() => setPhotoModalOpen(false)}
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
                onClose={() => setImagePreviewOpen(false)}
            />
        </ScrollView>
    );
};

export default Profile;