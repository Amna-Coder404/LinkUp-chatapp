import { Image } from "react-native";
import { IconButton, Modal, Portal } from "react-native-paper";
import COLORS from "../../../constants/colors";
import styles from "../../../styles/ProfilePhotoModal.styles";


const ProfileImagePreview = ({
    visible,
    image,
    onClose,
}) => {
    if (!image) return null;

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

                <Image
                    source={{ uri: image }}
                    style={styles.previewImage}
                    resizeMode="contain"
                />
            </Modal>
        </Portal>
    );
};

export default ProfileImagePreview;