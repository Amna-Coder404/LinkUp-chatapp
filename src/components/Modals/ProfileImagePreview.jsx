
import { Image } from "react-native";

import {
    IconButton,
    Modal,
    Portal,
    Text,
} from "react-native-paper";

import COLORS from "../../constants/colors";
import styles from "../../styles/ProfilePhotoModal.styles";

const ProfileImagePreview = ({
    visible,
    image,
    onClose,
}) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onClose}
                contentContainerStyle={styles.previewContainer}
            >
                <IconButton
                    icon="close"
                    size={26}
                    iconColor={COLORS.white}
                    style={styles.closeButton}
                    onPress={onClose}
                />

                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.previewImage}
                        resizeMode="contain"
                    />
                ) : (
                    <Text style={styles.noImageText}>
                        No profile image
                    </Text>
                )}
            </Modal>
        </Portal>
    );
};

export default ProfileImagePreview;
