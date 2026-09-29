
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { signOut } from "../services/authService";

import {
    deleteProfileAvatar,
    getCurrentUserProfile,
    updateProfile,
    updateProfileAvatar,
} from "../services/profileService";

const useProfile = (user) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const [avatarUploading, setAvatarUploading] = useState(false);
    const [profileSaving, setProfileSaving] = useState(false);

    const loadProfile = async () => {
        if (!user?.id) {
            setProfile(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const profileData =
                await getCurrentUserProfile(user.id);

            setProfile(profileData);
        } catch (error) {
            console.log("PROFILE ERROR:", error);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, [user?.id]);

    const copyLinkUpId = async () => {
        if (!profile?.linkup_id) return;

        try {
            await Clipboard.setStringAsync(
                profile.linkup_id
            );
        } catch (error) {
            console.log(
                "COPY LINKUP ID ERROR:",
                error
            );
        }
    };

    const uploadAvatar = async (image) => {
        if (!user?.id || !image) return;

        try {
            setAvatarUploading(true);

            const updatedProfile =
                await updateProfileAvatar(
                    user.id,
                    image
                );

            setProfile(updatedProfile);
            setAvatarMenuOpen(false);
        } catch (error) {
            console.log(
                "AVATAR UPLOAD ERROR:",
                error
            );
        } finally {
            setAvatarUploading(false);
        }
    };

    const takeProfilePhoto = async () => {
        try {
            const permission =
                await ImagePicker.requestCameraPermissionsAsync();

            if (!permission.granted) {
                Alert.alert(
                    "Permission required",
                    "Camera permission is required to take a profile photo."
                );

                return;
            }

            const result =
                await ImagePicker.launchCameraAsync({
                    mediaTypes: ["images"],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8,
                });

            if (result.canceled) return;

            const image = result.assets?.[0];

            if (!image) return;

            await uploadAvatar(image);
        } catch (error) {
            console.log(
                "TAKE PHOTO ERROR:",
                error
            );
        }
    };

    const chooseProfilePhoto = async () => {
        try {
            const result =
                await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ["images"],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8,
                });

            if (result.canceled) return;

            const image = result.assets?.[0];

            if (!image) return;

            await uploadAvatar(image);
        } catch (error) {
            console.log(
                "GALLERY ERROR:",
                error
            );
        }
    };

    const removeProfilePhoto = () => {
        if (!user?.id || !profile?.avatar_url) {
            return;
        }

        Alert.alert(
            "Delete profile photo",
            "Are you sure you want to delete your profile photo?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",

                    onPress: async () => {
                        try {
                            setAvatarUploading(true);

                            await deleteProfileAvatar(
                                user.id,
                                profile.avatar_url
                            );

                            setProfile((current) => ({
                                ...current,
                                avatar_url: null,
                            }));

                            setAvatarMenuOpen(false);
                        } catch (error) {
                            console.log(
                                "DELETE AVATAR ERROR:",
                                error
                            );
                        } finally {
                            setAvatarUploading(false);
                        }
                    },
                },
            ]
        );
    };

    const updateProfileInfo = async ({
        fullName,
        linkUpId,
    }) => {
        if (!user?.id) {
            return {
                success: false,
                error: "User is not authenticated.",
            };
        }

        try {
            setProfileSaving(true);

            const updatedProfile =
                await updateProfile(
                    user.id,
                    {
                        fullName,
                        linkUpId,
                    }
                );

            setProfile((current) => ({
                ...current,
                ...updatedProfile,
            }));

            return {
                success: true,
            };
        } catch (error) {
            console.log(
                "UPDATE PROFILE ERROR:",
                error
            );

            return {
                success: false,
                error:
                    error?.message ||
                    "Failed to update profile.",
            };
        } finally {
            setProfileSaving(false);
        }
    };

    const handleSignOut = () => {
        Alert.alert(
            "Sign out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Sign out",
                    style: "destructive",

                    onPress: async () => {
                        try {
                            await signOut();
                        } catch (error) {
                            console.log(
                                "SIGN OUT ERROR:",
                                error
                            );
                        }
                    },
                },
            ]
        );
    };

    return {
        profile,
        loading,

        avatarMenuOpen,
        setAvatarMenuOpen,

        avatarUploading,
        profileSaving,

        copyLinkUpId,

        takeProfilePhoto,
        chooseProfilePhoto,
        removeProfilePhoto,

        updateProfileInfo,

        handleSignOut,

        loadProfile,
    };
};

export default useProfile;

