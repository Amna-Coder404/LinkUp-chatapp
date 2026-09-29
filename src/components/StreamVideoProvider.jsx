import { useEffect, useState } from "react";

import { View, } from "react-native";

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


// RINGING CALL CONTENT ROUTER
const RingingCallContentRouter = () => {
    const { useCallCustomData, } = useCallStateHooks();
    const customData = useCallCustomData();
    const isAudioCall = customData?.callMode === "audio";


    return (
        <View style={styles.RingingCallContentRouter} >

            <RingingCallContent CallContent={
                isAudioCall ?
                    AudioCallContent :
                    undefined}
            />
        </View>
    );
};


// SMART RINGING CALL
const SmartRingingCall = () => {
    const calls = useCalls();
    const call = calls[0];

    if (!call) {
        return null;
    }

    return (
        <StreamCall call={call}>
            <RingingSound />
            <RingingCallContentRouter />
        </StreamCall>
    );
};



// STREAM VIDEO PROVIDER
const StreamVideoProvider =
    ({ children }) => {
        const [client, setClient] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            let mounted = true;

            const initializeVideo = async () => {

                try {

                    // GET CURRENT USER
                    const { data: { user, }, error: userError, } = await supabase.auth.getUser();

                    if (userError) {
                        throw userError;
                    }

                    if (!user) {
                        if (mounted) {
                            setLoading(false);
                        }
                        return;
                    }

                    // GET PROFILE
                    const { data: profile, error: profileError, } = await supabase
                        .from("profiles")
                        .select("full_name, avatar_url")
                        .eq("id", user.id)
                        .single();


                    if (profileError) {
                        throw profileError;
                    }


                    // STREAM TOKEN
                    const tokenProvider = async () => {
                        const result = await getStreamToken();
                        if (!result?.token) {
                            throw new Error("Stream token not returned.");
                        }
                        return result.token;
                    };


                    // STREAM VIDEO CLIENT
                    const videoClient = StreamVideoClient.getOrCreateInstance({
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


            return () => {
                mounted = false;
            };

        }, []);


        // LOADING
        if (loading) return <Loader />;


        // NO STREAM CLIENT
        if (!client) {
            return children;
        }

        // STREAM PROVIDER
        return (
            <StreamVideo client={client}    >
                {children}
                <SmartRingingCall />
            </StreamVideo>
        );
    };


export default StreamVideoProvider;