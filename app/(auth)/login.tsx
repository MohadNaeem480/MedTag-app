import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function LoginScreen() {
  const handleLogin = async () => {
    await AsyncStorage.setItem("token", "dummy_token");
    router.replace("/(tabs)");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Text>Login Screen</Text>
      <Button title="Sign in" onPress={handleLogin} />
    </View>
  );
}
