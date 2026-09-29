
import { useStreamVideoClient, } from "@stream-io/video-react-native-sdk";
import { useState } from "react";
import { createCallHistory, } from "../services/callHistoryService";




export const useStreamCall = () => {
    const videoClient = useStreamVideoClient();

    const [calling, setCalling] = useState(false);

    // START AUDIO CALL
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

            const callId = `audio-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

            const call = videoClient.call("default", callId);

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
                        callerId: currentUserId,
                    },
                },
            });

            // Create ringing call history

            try {
                await createCallHistory({
                    streamCallId: call.id,
                    callerId: currentUserId,
                    receiverId: otherUserId,
                    callType: "audio",
                    startedAt: null,
                    endedAt: null,
                    status: "ringing",
                });
            } catch (historyError) {
                console.log("CREATE RINGING CALL HISTORY ERROR:", historyError);
            }

            return call;
        } finally {
            setCalling(false);
        }
    };

    // START VIDEO CALL

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

            const call = videoClient.call("default", callId);

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
                        callerId: currentUserId,
                    },
                },
            });

            // Create ringing call history

            try {
                await createCallHistory({
                    streamCallId: call.id,
                    callerId: currentUserId,
                    receiverId: otherUserId,
                    callType: "video",
                    startedAt: null,
                    endedAt: null,
                    status: "ringing",
                });
            } catch (historyError) {
                console.log("CREATE RINGING CALL HISTORY ERROR:", historyError);
            }

            return call;
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

