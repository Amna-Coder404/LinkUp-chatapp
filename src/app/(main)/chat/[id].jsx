import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

import {
    Channel,
    Chat,
    MessageComposer,
    MessageList,
    OverlayProvider,
} from "stream-chat-expo";

import ChatHeader from "../../../components/ChatHeader";
import Loader from "../../../components/Loader";
import { useStreamChat } from "../../../hooks/useStreamChat";

const ChatScreen = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { client, clientReady, channel, otherUser, channelLoading, } = useStreamChat(id);

    if (
        !clientReady ||
        channelLoading ||
        !channel ||
        !otherUser
    ) {
        return <Loader />;
    }

    return (
        <OverlayProvider>
            <Chat client={client}>
                <Channel
                    channel={channel}
                    keyboardVerticalOffset={60}  >
                    <View style={{ flex: 1 }}>

                        <ChatHeader
                            channel={channel}
                            otherUser={otherUser}
                            currentUserId={client.userID}
                            onBack={() => router.back()}
                        />

                        <MessageList />

                        <MessageComposer />

                    </View>
                </Channel>
            </Chat>
        </OverlayProvider>
    );
};

export default ChatScreen;