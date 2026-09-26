import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { supabase } from "../lib/supabase";
import { signOut } from "../services/authService";
import {
    deleteProfileAvatar,
    getCurrentUserProfile,
    updateProfile,
    updateProfileAvatar,
} from "../services/profileService";

const useProfile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const [avatarUploading, setAvatarUploading] = useState(false);
    const [profileSaving, setProfileSaving] = useState(false);

    const loadProfile = async () => {
        try {
            setLoading(true);

            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error) throw error;
            if (!user) return;

            setUser(user);

            const profileData = await getCurrentUserProfile(user.id);

            setProfile(profileData);
        } catch (error) {
            console.log("PROFILE ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

    // Copy LinkUp ID
    const copyLinkUpId = async () => {
        if (!profile?.linkup_id) return;

        await Clipboard.setStringAsync(profile.linkup_id);
    };

    // Upload selected image
    const uploadAvatar = async (image) => {
        if (!user?.id || !image) return;

        try {
            setAvatarUploading(true);

            const updatedProfile = await updateProfileAvatar(
                user.id,
                image
            );

            setProfile(updatedProfile);
            setAvatarMenuOpen(false);
        } catch (error) {
            console.log("AVATAR UPLOAD ERROR:", error);
        } finally {
            setAvatarUploading(false);
        }
    };

    // Take photo
    const takeProfilePhoto = async () => {
        try {
            const permission =
                await ImagePicker.requestCameraPermissionsAsync();

            if (!permission.granted) {
                console.log("Camera permission denied");
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

            await uploadAvatar(result.assets[0]);
        } catch (error) {
            console.log("TAKE PHOTO ERROR:", error);
        }
    };

    // Choose from gallery
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

            await uploadAvatar(result.assets[0]);
        } catch (error) {
            console.log("GALLERY ERROR:", error);
        }
    };

    // Delete profile photo
    const removeProfilePhoto = () => {
        if (!user?.id || !profile?.avatar_url) return;

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

    // Sign out
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

    useEffect(() => {
        loadProfile();
    }, []);

    // Update profile
    const updateProfileInfo = async ({ fullName, linkUpId, }) => {
        try {
            setProfileSaving(true);

            const updatedProfile = await updateProfile(
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

            return { success: true, };
        } catch (error) {
            console.log("UPDATE PROFILE ERROR:", error);

            return {
                success: false,
                error: error.message,
            };
        } finally {
            setProfileSaving(false);
        }
    };

    return {
        user,
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
    };
};

export default useProfile;