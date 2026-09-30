import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from 'react-native-paper';
import Loader from "../components/Loader";
import InternetBanner from "../components/NetInfo/InternetBanner";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import StreamVideoProvider from "../components/StreamVideoProvider";
import { useAuth } from "../hooks/useAuth";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inMainGroup = segments[0] === "(main)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/signup");
      return;
    }

    if (session && inAuthGroup) {
      router.replace("/(main)/home");
      return;
    }
  }, [segments, loading, session]);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) return <Loader />



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <PaperProvider>
        <StreamVideoProvider>
          <SafeAreaWrapper>
            <StatusBar barStyle={"dark-content"} />

            <InternetBanner />
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaWrapper>
        </StreamVideoProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout