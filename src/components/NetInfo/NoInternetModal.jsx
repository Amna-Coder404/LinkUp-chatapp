import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import COLORS from "../../constants/colors";
import styles from "@/styles/NetInfo.style";

const NoInternetModal = ({ visible, onClose, }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <MaterialCommunityIcons
                        name="wifi-off"
                        size={48}
                        color={COLORS.primary}
                    />

                    <Text style={styles.modalTitle}>
                        No Internet Connection
                    </Text>

                    <Text style={styles.modalDescription}>
                        Please connect to the internet
                        and try again.
                    </Text>

                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.modalButton}
                    >
                        <Text style={styles.buttonText}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default NoInternetModal;