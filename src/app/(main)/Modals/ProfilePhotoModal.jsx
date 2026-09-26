import { TouchableOpacity, View } from "react-native";
import { Icon, Modal, Portal, Text } from "react-native-paper";


import COLORS from "../../../constants/colors";
import styles from "../../../styles/ProfilePhotoModal.styles";


const ProfilePhotoModal = ({
    visible,
    onClose,
    image,
    onTakePhoto,
    onChooseGallery,
    onViewPhoto,
    onDeletePhoto,
}) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onClose}
                contentContainerStyle={styles.modalContainer}
            >
                <View style={styles.handle} />

                <Text style={styles.modalTitle}>
                    Profile Photo
                </Text>

                <TouchableOpacity
                    style={styles.actionItem}
                    onPress={onTakePhoto}
                >
                    <Icon
                        source="camera-outline"
                        size={22}
                        color={COLORS.primary}
                    />

                    <Text style={styles.actionText}>
                        Take photo
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionItem}
                    onPress={onChooseGallery}
                >
                    <Icon
                        source="image-outline"
                        size={22}
                        color={COLORS.primary}
                    />

                    <Text style={styles.actionText}>
                        Choose from gallery
                    </Text>
                </TouchableOpacity>

                {image && (
                    <TouchableOpacity
                        style={styles.actionItem}
                        onPress={onViewPhoto}
                    >
                        <Icon
                            source="eye-outline"
                            size={22}
                            color={COLORS.primary}
                        />

                        <Text style={styles.actionText}>
                            View photo
                        </Text>
                    </TouchableOpacity>
                )}

                {image && (
                    <TouchableOpacity
                        style={styles.actionItem}
                        onPress={onDeletePhoto}
                    >
                        <Icon
                            source="delete-outline"
                            size={22}
                            color={COLORS.danger}
                        />

                        <Text
                            style={[
                                styles.actionText,
                                { color: COLORS.danger },
                            ]}
                        >
                            Delete photo
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onClose}
                >
                    <Text style={styles.cancelText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </Modal>
        </Portal>
    );
};

export default ProfilePhotoModal;