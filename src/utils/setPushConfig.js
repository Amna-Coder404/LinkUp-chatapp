import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    StreamVideoClient,
    StreamVideoRN,
} from "@stream-io/video-react-native-sdk";

import { getStreamToken } from "../services/streamService";

const STREAM_API_KEY =
    process.env.EXPO_PUBLIC_STREAM_API_KEY;

export const setPushConfig = () => {
    StreamVideoRN.setPushConfig({
        android: {
            pushProviderName: "firebase-video",

            incomingChannel: {
                id: "incoming_call_channel",
                name: "Call notifications",
                vibration: true,
            },

            notificationTexts: {
                accepting: "Connecting...",
                rejecting: "Declining...",
            },
        },

        shouldRejectCallWhenBusy: true,

        createStreamVideoClient: async () => {
            const userId =
                await AsyncStorage.getItem("@userId");

            const userName =
                await AsyncStorage.getItem("@userName");

            console.log(
                "PUSH: stored user:",
                userId,
                userName
            );

            if (!userId) {
                console.log(
                    "PUSH: no stored user ID"
                );

                return undefined;
            }

            const tokenProvider = async () => {
                console.log(
                    "PUSH: requesting Stream token..."
                );

                const result =
                    await getStreamToken();

                if (!result?.token) {
                    throw new Error(
                        "Stream token not returned."
                    );
                }

                return result.token;
            };

            console.log(
                "PUSH: creating Stream Video client..."
            );

            return StreamVideoClient.getOrCreateInstance({
                apiKey: STREAM_API_KEY,

                user: {
                    id: userId,
                    name: userName || "LinkUp User",
                },

                tokenProvider,

                options: {
                    rejectCallWhenBusy: true,
                },
            });
        },
    });
};