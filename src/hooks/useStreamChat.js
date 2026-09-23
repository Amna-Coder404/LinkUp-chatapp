import { useEffect, useState } from "react";

import { streamClient } from "../lib/stream";
import { supabase } from "../lib/supabase";
import { getStreamToken } from "../services/streamService";

export const useStreamChat = (channelId = null) => {
    const [userId, setUserId] = useState(null);
    const [clientReady, setClientReady] = useState(false);

    const [channel, setChannel] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [channelLoading, setChannelLoading] = useState(false);

    // Connect current user to Stream
    useEffect(() => {
        let mounted = true;

        const connectStream = async () => {
            try {
                setClientReady(false);

                const {
                    data: { user },
                    error,
                } = await supabase.auth.getUser();

                if (error) {
                    throw error;
                }

                if (!user) {
                    if (mounted) {
                        setUserId(null);
                        setClientReady(false);
                    }

                    return;
                }

                const {
                    data: profile,
                    error: profileError,
                } = await supabase
                    .from("profiles")
                    .select(
                        "full_name, linkup_id, avatar_url"
                    )
                    .eq("id", user.id)
                    .single();

                if (profileError) {
                    throw profileError;
                }

                if (!mounted) return;

                setUserId(user.id);

                // Disconnect previous user if necessary
                if (
                    streamClient.userID &&
                    streamClient.userID !== user.id
                ) {
                    console.log(
                        "Disconnecting previous Stream user..."
                    );

                    await streamClient.disconnectUser();
                }

                // Already connected as this user
                if (streamClient.userID === user.id) {
                    console.log(
                        "Stream already connected as current user."
                    );

                    if (mounted) {
                        setClientReady(true);
                    }

                    return;
                }

                const result = await getStreamToken();

                if (!result?.token) {
                    throw new Error(
                        "Stream token was not returned."
                    );
                }

                if (!mounted) return;

                await streamClient.connectUser(
                    {
                        id: user.id,
                        name: profile.full_name,
                        image: profile.avatar_url,
                        linkup_id: profile.linkup_id,
                    },
                    result.token
                );

                console.log(
                    "Stream connected successfully."
                );

                if (mounted) {
                    setClientReady(true);
                }
            } catch (error) {
                console.log(
                    "STREAM CONNECTION ERROR:",
                    error
                );

                if (mounted) {
                    setClientReady(false);
                    setUserId(null);
                }
            }
        };

        connectStream();

        return () => {
            mounted = false;
        };
    }, []);

    // Open selected conversation
    useEffect(() => {
        if (!clientReady || !channelId) {
            return;
        }

        let mounted = true;

        const openChannel = async () => {
            try {
                setChannelLoading(true);

                const id = Array.isArray(channelId)
                    ? channelId[0]
                    : channelId;

                const selectedChannel = streamClient.channel(
                    "messaging",
                    id
                );

                await selectedChannel.watch();

                const members = Object.values(
                    selectedChannel.state.members
                );

                const otherMember = members.find(
                    (member) =>
                        member.user_id !== streamClient.userID
                );

                if (!otherMember) {
                    throw new Error(
                        "Other user not found."
                    );
                }

                const { data: profile, error: profileError, } = await supabase
                    .from("profiles")
                    .select(
                        "id, full_name, linkup_id, avatar_url"
                    )
                    .eq("id", otherMember.user_id)
                    .single();

                if (profileError) {
                    throw profileError;
                }

                if (!mounted) return;

                setChannel(selectedChannel);

                setOtherUser({
                    id: profile.id,
                    name: profile.full_name,
                    linkupId: profile.linkup_id,
                    image: profile.avatar_url,
                    online:
                        otherMember.user?.online ?? false,
                });
            } catch (error) {
                console.log(
                    "OPEN CHAT ERROR:",
                    error
                );

                if (mounted) {
                    setChannel(null);
                    setOtherUser(null);
                }
            } finally {
                if (mounted) {
                    setChannelLoading(false);
                }
            }
        };

        openChannel();

        return () => {
            mounted = false;
        };
    }, [clientReady, channelId]);

    return {
        client: streamClient,
        clientReady,
        userId,

        channel,
        otherUser,
        channelLoading,
    };
};