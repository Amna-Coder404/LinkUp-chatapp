import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Loader from "../components/Loader";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import { useAuth } from "../hooks/useAuth";



const RootLayout = () => {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/signin");
    }


    if (session && inAuthGroup) {
      router.replace("/(main)/home");
    }
  }, [segments, loading, session]);

  if (loading) return <Loader />



  return (
    <PaperProvider>
      <SafeAreaWrapper>
        <StatusBar barStyle={"dark-content"} />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaWrapper>
    </PaperProvider>
  )
}

export default RootLayout