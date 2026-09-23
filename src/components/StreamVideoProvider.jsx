import { useEffect, useState } from "react";
import {
    View
} from "react-native";

import {
    RingingCallContent,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    useCallStateHooks,
    useCalls,
} from "@stream-io/video-react-native-sdk";

import AudioCallContent from "./AudioCallContent";
import RingingSound from "./RingingSound";

import { supabase } from "../lib/supabase";
import { getStreamToken } from "../services/streamService";
import styles from "../styles/Chatui.styles";
import Loader from "./Loader";










const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY;


const RingingCallContentRouter = () => {
    const { useCallCustomData } = useCallStateHooks();

    const customData = useCallCustomData();

    const isAudioCall = customData?.callMode === "audio";

    return (
        <View style={styles.RingingCallContentRouter} >
            <RingingCallContent CallContent={isAudioCall ? AudioCallContent : undefined} />
        </View>
    );
};


const SmartRingingCall = () => {
    const calls = useCalls().filter(
        (call) => call.ringing
    );

    const ringingCall = calls[0];

    if (!ringingCall) {
        return null;
    }

    return (
        <StreamCall call={ringingCall}>
            <RingingSound />
            <RingingCallContentRouter />
        </StreamCall>
    );
};


const StreamVideoProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const initializeVideo = async () => {
            try {
                const { data: { user }, error: userError, } = await supabase.auth.getUser();

                if (userError) {
                    throw userError;
                }

                if (!user) {
                    if (mounted) {
                        setLoading(false);
                    }
                    return;
                }

                const { data: profile, error: profileError, } = await supabase
                    .from("profiles")
                    .select("full_name, avatar_url")
                    .eq("id", user.id)
                    .single();

                if (profileError) {
                    throw profileError;
                }

                const tokenProvider = async () => {
                    const result = await getStreamToken();

                    if (!result?.token) {
                        throw new Error("Stream token not returned.");
                    }

                    return result.token;
                };

                const videoClient =
                    StreamVideoClient.getOrCreateInstance({
                        apiKey: STREAM_API_KEY,
                        user: {
                            id: user.id,
                            name: profile.full_name,
                            image: profile.avatar_url,
                        },
                        tokenProvider,
                    });

                if (mounted) {
                    setClient(videoClient);
                    setLoading(false);
                }
            } catch (error) {
                console.log("STREAM VIDEO INIT ERROR:", error);

                if (mounted) {
                    setClient(null);
                    setLoading(false);
                }
            }
        };

        initializeVideo();

        return () => { mounted = false; };

    }, []);

    if (loading) return <Loader />

    if (!client) { return children; }

    return (
        <StreamVideo client={client}>
            {children}
            <SmartRingingCall />
        </StreamVideo>
    );
};

export default StreamVideoProvider;