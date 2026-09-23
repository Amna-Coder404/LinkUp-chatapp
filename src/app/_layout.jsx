import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from 'react-native-paper';
import Loader from "../components/Loader";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import { useAuth } from "../hooks/useAuth";

import * as SplashScreen from "expo-splash-screen";
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
        <SafeAreaWrapper>
          <StatusBar barStyle={"dark-content"} />
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaWrapper>
      </PaperProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout