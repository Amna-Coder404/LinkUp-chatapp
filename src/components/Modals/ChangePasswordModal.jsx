
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    View,
} from "react-native";

import {
    Button,
    HelperText,
    Modal,
    Portal,
    Text,
    TextInput,
} from "react-native-paper";

import COLORS from "../../constants/colors";
import useNetworkStatus from "../../hooks/useNetWork";
import { changePassword } from "../../services/authService";
import styles from "../../styles/ChangePasswordModal.stlye";


const ChangePasswordModal = ({ visible, onClose, email, }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    const { isOnline } = useNetworkStatus();

    const resetForm = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setShowCurrent(false);
        setShowNew(false);
        setShowConfirm(false);
    };

    const handleClose = () => {
        if (loading) {
            return;
        }

        resetForm();
        onClose();
    };

    const handleChangePassword = async () => {
        setError("");


        if (!isOnline) {
            setError("You are offline. Please connect to the internet and try again.");
            return
        }
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (currentPassword === newPassword) {
            setError("New password must be different from your current password."
            );
            return;
        }

        try {
            setLoading(true);
            await changePassword({ email, currentPassword, newPassword, });
            resetForm(); onClose();
            setTimeout(() => { alert("Your password has been changed successfully."); }, 250);

        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Portal>
            <KeyboardAvoidingView
                style={styles.keyboardWrapper}
                behavior={Platform.OS === "ios" ? "padding"
                    : "height"
                }
                keyboardVerticalOffset={
                    Platform.OS === "ios" ? 0 : 24
                }
            >
                <Modal
                    visible={visible}
                    onDismiss={handleClose}
                    contentContainerStyle={styles.modal}
                >
                    <Text style={styles.title}>
                        Change Password
                    </Text>

                    <Text style={styles.subtitle}>
                        Enter your current password and choose a new one.
                    </Text>

                    <TextInput
                        mode="outlined"
                        label="Current password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry={!showCurrent}
                        disabled={loading}
                        style={styles.input}
                        right={
                            <TextInput.Icon
                                icon={showCurrent ? "eye-off-outline"
                                    : "eye-outline"
                                }
                                onPress={() =>
                                    setShowCurrent(!showCurrent)
                                }
                            />
                        }
                    />

                    <TextInput
                        mode="outlined"
                        label="New password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={!showNew}
                        disabled={loading}
                        style={styles.input}
                        right={
                            <TextInput.Icon
                                icon={
                                    showNew
                                        ? "eye-off-outline"
                                        : "eye-outline"
                                }
                                onPress={() =>
                                    setShowNew(!showNew)
                                }
                            />
                        }
                    />

                    <TextInput
                        mode="outlined"
                        label="Confirm new password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirm}
                        disabled={loading}
                        style={styles.input}
                        right={
                            <TextInput.Icon
                                icon={
                                    showConfirm
                                        ? "eye-off-outline"
                                        : "eye-outline"
                                }
                                onPress={() =>
                                    setShowConfirm(!showConfirm)
                                }
                            />
                        }
                    />

                    {error ? (
                        <HelperText
                            type="error"
                            visible
                            style={styles.error}
                        >
                            {error}
                        </HelperText>
                    ) : null}

                    <View style={styles.buttons}>
                        <Button
                            mode="text"
                            textColor={COLORS.textSecondary}
                            onPress={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            mode="contained"
                            buttonColor={COLORS.primary}
                            onPress={handleChangePassword}
                            loading={loading}
                            disabled={loading}
                        >
                            Change Password
                        </Button>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </Portal>
    );
};

export default ChangePasswordModal;
