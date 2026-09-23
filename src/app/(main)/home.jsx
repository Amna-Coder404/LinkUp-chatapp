import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import {
    ChannelList,
    Chat,
    OverlayProvider,
} from "stream-chat-expo";

import Loader from "../../components/Loader";
import { useStreamChat } from "../../hooks/useStreamChat";
import { createConversation } from "../../services/chatService";
import { getProfileByLinkUpId } from "../../services/profileService";

import { useRouter } from "expo-router";
import { signOut } from "../../services/authService";


const Home = () => {
    const { client, clientReady, userId } = useStreamChat();

    const [linkUpId, setLinkUpId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const handleStartChat = async () => {
        try {
            setLoading(true);

            const profile = await getProfileByLinkUpId(linkUpId);


            const channel = await createConversation(client, userId, profile.id);

            setLinkUpId("");

            router.push({
                pathname: "/(main)/chat/[id]",
                params: { id: channel.id, },
            });
            setLinkUpId("");
        } catch (error) {
            console.log("START CHAT ERROR:", error);
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };


    if (!clientReady || !userId) {
        return <Loader />
    }

    return (
        <OverlayProvider>
            <Chat client={client}>
                <View style={{ padding: 16 }}>

                    <TextInput
                        label="LinkUp ID"
                        placeholder="e.g. LU352385"
                        value={linkUpId}
                        onChangeText={setLinkUpId}
                        mode="outlined"
                        autoCapitalize="characters"
                    />

                    <Button
                        mode="contained"
                        onPress={handleStartChat}
                        loading={loading}
                        disabled={loading}
                        style={{ marginTop: 10 }}
                    >
                        Start Chat
                    </Button>
                    <Button onPress={signOut}>
                        signOut
                    </Button>
                </View>

                <ChannelList
                    filters={{
                        type: "messaging",
                        members: {
                            $in: [userId],
                        },

                    }}
                    onSelect={(channel) => {
                        router.push({
                            pathname: "/(main)/chat/[id]",
                            params: { id: channel.id, },
                        });
                    }}
                />
            </Chat>
        </OverlayProvider>
    );
};

export default Home;