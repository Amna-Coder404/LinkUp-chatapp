import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";
import { streamClient } from "../lib/stream";
import { getStreamToken } from "../services/streamService";

export const useStreamChat = () => {
    const [status, setStatus] = useState("Starting...");

    useEffect(() => {
        let mounted = true;

        const connectStream = async () => {
            try {
                setStatus("Getting Supabase user...");

                const { data: { user }, error: userError, } = await supabase.auth.getUser();

                if (userError) {

                    throw userError;
                }

                if (!user) {
                    setStatus("No Supabase user");
                    return;
                }

                setStatus("Getting Stream token...");

                const result = await getStreamToken();



                if (!result?.token) {
                    throw new Error("Stream token was not returned");
                }

                setStatus("Connecting to Stream...");

                await streamClient.connectUser(
                    {
                        id: user.id,
                    },
                    result.token
                );


                if (mounted) {
                    setStatus("Stream connected successfully!");
                }
            } catch (error) {
                if (mounted) {
                    setStatus(`Error: ${error?.message || "Unknown error"}`);
                }
            }
        };

        connectStream();

        return () => {
            mounted = false;

            if (streamClient.userID) {
                streamClient.disconnectUser();
            }
        };
    }, []);

    return {
        client: streamClient,
        clientReady: status === "Stream connected successfully!",
        status,
    };
};