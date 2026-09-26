import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";

import {
    Button,
    Icon,
    Modal,
    Portal,
    Text,
    TextInput,
} from "react-native-paper";

import COLORS from "../../../constants/colors";
import styles from "../../../styles/EditProfileModal.styles";
import { getProfileInitial } from "../../../utils/getImageSource";

const EditProfileModal = ({ visible, onClose, profile, saving, onSave, onChangePhoto,
}) => {
    const [fullName, setFullName] = useState("");
    const [linkUpId, setLinkUpId] = useState("");
    const [error, setError] = useState("");

    const slideAnim = useRef(new Animated.Value(500)).current;

    useEffect(() => {
        if (visible && profile) {
            setFullName(profile.full_name || "");

            setLinkUpId(
                profile.linkup_id?.replace(/^LU/i, "") || ""
            );

            setError("");

            slideAnim.setValue(500);

            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 70,
                friction: 10,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, profile]);

    const handleSave = async () => {
        const result = await onSave({
            fullName,
            linkUpId: `LU${linkUpId}`,
        });

        if (!result.success) {
            setError(result.error);
            return;
        }

        onClose();
    };

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onClose}
                contentContainerStyle={styles.modalWrapper}
            >
                <Animated.View
                    style={[
                        styles.modal,
                        {
                            transform: [
                                {
                                    translateY: slideAnim,
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.handle} />

                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Edit Profile
                        </Text>

                        <TouchableOpacity onPress={onClose}>
                            <Icon
                                source="close"
                                size={22}
                                color={COLORS.text}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Profile Photo */}
                        <View style={styles.photoSection}>
                            <View style={styles.avatarWrapper}>
                                {profile?.avatar_url ? (
                                    <Image
                                        source={{
                                            uri: profile.avatar_url,
                                        }}
                                        style={styles.avatar}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={styles.initialAvatar}>
                                        <Text style={styles.initial}>
                                            {getProfileInitial(
                                                profile?.full_name
                                            )}
                                        </Text>
                                    </View>
                                )}

                                <TouchableOpacity
                                    style={styles.changePhoto}
                                    onPress={onChangePhoto}
                                >
                                    <Icon
                                        source="camera"
                                        size={18}
                                        color={COLORS.white}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Name */}
                        <TextInput
                            label="Full Name"
                            mode="outlined"
                            value={fullName}
                            onChangeText={(text) => {
                                setFullName(text);
                                setError("");
                            }}
                            style={styles.input}
                            outlineColor={COLORS.border}
                            activeOutlineColor={COLORS.primary}
                            textColor={COLORS.text}
                        />

                        {/* LinkUp ID */}
                        <TextInput
                            label="LinkUp ID"
                            mode="outlined"
                            value={linkUpId}
                            onChangeText={(text) => {
                                setLinkUpId(
                                    text.replace(/\D/g, "").slice(0, 6)
                                );
                                setError("");
                            }}
                            keyboardType="number-pad"
                            style={styles.input}
                            outlineColor={COLORS.border}
                            activeOutlineColor={COLORS.primary}
                            textColor={COLORS.text}
                            maxLength={6}
                            left={
                                <TextInput.Affix text="LU" />
                            }
                        />

                        <Text style={styles.helper}>
                            Your LinkUp ID can be changed once every
                            7 days.
                        </Text>

                        {error ? (
                            <Text style={styles.error}>
                                {error}
                            </Text>
                        ) : null}

                        <Button
                            mode="contained"
                            loading={saving}
                            disabled={saving}
                            onPress={handleSave}
                            style={styles.saveButton}
                            contentStyle={styles.saveContent}
                        >
                            Save Changes
                        </Button>

                        <Button
                            mode="text"
                            textColor={COLORS.textSecondary}
                            onPress={onClose}
                        >
                            Cancel
                        </Button>
                    </ScrollView>
                </Animated.View>
            </Modal>
        </Portal>
    );
};

export default EditProfileModal;