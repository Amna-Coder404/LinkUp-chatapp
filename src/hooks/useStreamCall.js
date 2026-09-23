
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { useState } from "react";

export const useStreamCall = () => {
    const videoClient = useStreamVideoClient();

    const [calling, setCalling] = useState(false);

    const startAudioCall = async (currentUserId, otherUserId) => {
        if (!videoClient) {
            throw new Error("Stream Video is not ready.");
        }

        if (!currentUserId || !otherUserId) {
            throw new Error("Both users are required.");
        }

        if (currentUserId === otherUserId) {
            throw new Error("You cannot call yourself.");
        }

        try {
            setCalling(true);

            const callId = `audio-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`;

            const call = videoClient.call(
                "default",
                callId
            );

            await call.getOrCreate({
                ring: true,
                video: false,
                data: {
                    members: [
                        {
                            user_id: currentUserId,
                        },
                        {
                            user_id: otherUserId,
                        },
                    ],
                    custom: {
                        callMode: "audio",
                    },
                },
            });

            console.log("AUDIO CALL STARTED");

            return call;
        } catch (error) {
            console.log("AUDIO CALL ERROR:", error);
            throw error;
        } finally {
            setCalling(false);
        }
    };

    const startVideoCall = async (currentUserId, otherUserId) => {
        if (!videoClient) {
            throw new Error("Stream Video is not ready.");
        }

        if (!currentUserId || !otherUserId) {
            throw new Error("Both users are required.");
        }

        if (currentUserId === otherUserId) {
            throw new Error("You cannot call yourself.");
        }

        try {
            setCalling(true);

            const callId = `video-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`;

            const call = videoClient.call(
                "default",
                callId
            );

            await call.getOrCreate({
                ring: true,
                video: true,
                data: {
                    members: [
                        {
                            user_id: currentUserId,
                        },
                        {
                            user_id: otherUserId,
                        },
                    ],
                    custom: {
                        callMode: "video",
                    },
                },
            });

            console.log("VIDEO CALL STARTED");

            return call;
        } catch (error) {
            console.log("VIDEO CALL ERROR:", error);
            throw error;
        } finally {
            setCalling(false);
        }
    };

    return {
        calling,
        startAudioCall,
        startVideoCall,
    };
};

