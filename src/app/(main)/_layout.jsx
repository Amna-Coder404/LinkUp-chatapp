import StreamVideoProvider from "../../components/StreamVideoProvider";

import { Stack } from "expo-router";

export default function MainLayout() {
    return (
        <StreamVideoProvider>
            <Stack
                screenOptions={{ headerShown: false, }}
            />
        </StreamVideoProvider>
    );
}