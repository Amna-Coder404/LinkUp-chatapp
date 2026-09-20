import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
    ChannelList,
    OverlayProvider,
} from "stream-chat-expo";

import { useStreamChat } from "../../hooks/useStreamChat";


const Home = () => {

    const { client, clientReady } = useStreamChat();

    const [channels, setChannels] = useState([]);


    useEffect(() => {

        if (!clientReady) {
            return;
        }

        const loadChannels = async () => {

            try {

                const filters = {
                    type: "messaging",
                    members: {
                        $in: [client.userID],
                    },
                };

                const sort = {
                    last_message_at: -1,
                };

                const result = await client.queryChannels(
                    filters,
                    sort,
                    {
                        watch: true,
                        state: true,
                        limit: 20,
                    }
                );

                setChannels(result);

            } catch (error) {

                console.log(
                    "CHANNEL ERROR:",
                    error
                );

            }
        };

        loadChannels();

    }, [clientReady]);


    if (!clientReady) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>
                    Connecting to LinkUp...
                </Text>
            </View>
        );
    }


    return (
        <OverlayProvider>

            <View style={{ flex: 1 }}>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        margin: 20,
                    }}
                >
                    LinkUp
                </Text>


                <ChannelList
                    filters={{
                        type: "messaging",
                        members: {
                            $in: [client.userID],
                        },
                    }}
                    sort={{
                        last_message_at: -1,
                    }}
                    options={{
                        watch: true,
                        state: true,
                        limit: 20,
                    }}
                />

            </View>

        </OverlayProvider>
    );
};


export default Home;