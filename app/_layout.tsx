import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { GlobalProvider } from "../src/context/GlobalContext"; // 👈 import

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken"); // 👈 use correct key
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Error reading token:", error);
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    // Loading spinner while checking token
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#175635" />
      </View>
    );
  }

  return (
    <GlobalProvider>
      {" "}
      {/* 👈 wrap whole navigation */}
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
    </GlobalProvider>
  );
}
