import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function RootLayoutContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    // Plus Jakarta Sans
    PlusJakartaSans200: require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    PlusJakartaSans300: require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    PlusJakartaSans400: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    PlusJakartaSans500: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    PlusJakartaSans600: require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    PlusJakartaSans700: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    PlusJakartaSans800: require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),

    // BeVietnamPro
    BeVietnamPro100: require("../assets/fonts/BeVietnamPro-Thin.ttf"),
    BeVietnamPro200: require("../assets/fonts/BeVietnamPro-ExtraLight.ttf"),
    BeVietnamPro300: require("../assets/fonts/BeVietnamPro-Light.ttf"),
    BeVietnamPro400: require("../assets/fonts/BeVietnamPro-Regular.ttf"),
    BeVietnamPro500: require("../assets/fonts/BeVietnamPro-Medium.ttf"),
    BeVietnamPro600: require("../assets/fonts/BeVietnamPro-SemiBold.ttf"),
    BeVietnamPro700: require("../assets/fonts/BeVietnamPro-Bold.ttf"),
    BeVietnamPro800: require("../assets/fonts/BeVietnamPro-ExtraBold.ttf"),
    BeVietnamPro900: require("../assets/fonts/BeVietnamPro-Black.ttf"),
  });

  // Navigate based on auth state
  useEffect(() => {
    if (!authLoading && fontsLoaded) {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/Welcome");
      }
    }
  }, [user, authLoading, fontsLoaded, router]);

  // 🔄 Wait for fonts + auth check
  if (!fontsLoaded || authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}