import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            const online =
                state.isConnected === true &&
                state.isInternetReachable !== false;

            setIsOnline(online);

        });

        return unsubscribe;
    }, []);

    return {
        isOnline,
    };
};

export default useNetworkStatus;