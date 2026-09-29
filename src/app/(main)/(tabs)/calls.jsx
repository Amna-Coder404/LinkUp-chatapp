
import {
    FlatList,
    RefreshControl,
    View,
} from "react-native";

import { Text } from "react-native-paper";

import CallHistoryCard from "../../../components/CallHistoryCard";
import Loader from "../../../components/Loader";
import { useCallHistory } from "../../../hooks/useCallHistory";

import styles from "../../../styles/calls.styles";

const Calls = () => {
    const {
        calls,
        loading,
        refreshing,
        refresh,
    } = useCallHistory();

    if (loading && calls.length === 0) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text
                    variant="headlineSmall"
                    style={styles.headerTitle}
                >
                    Calls
                </Text>
            </View>

            <FlatList
                data={calls}
                keyExtractor={(item) => item.id}
                contentContainerStyle={
                    calls.length === 0
                        ? styles.emptyList
                        : styles.list
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text
                            variant="titleMedium"
                            style={styles.emptyTitle}
                        >
                            No call history
                        </Text>

                        <Text
                            variant="bodyMedium"
                            style={styles.emptyText}
                        >
                            Your completed calls will appear here.
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <CallHistoryCard call={item} />
                )}
            />
        </View>
    );
};

export default Calls;