import { router } from "expo-router";
import axios from "axios";
import { useState } from "react";
import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../storage/storage";
import useCurrentUser from "./useCurrentUser";
import { Alert } from "react-native";

const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

function useLogin() {
  const { getCurrentUser } = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const Login = async (payload, next = "/(tabs)") => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${EXPO_PUBLIC_BASE_URL}/api/login/`,
        payload
      );

      await setAccessToken(response.data.access);
      await setRefreshToken(response.data.refresh);

      await getCurrentUser(response.data.access);

      setLoading(false);

      // 👇 expo-router navigation
      router.replace(next);

      return true;
    } catch (error) {
      if (error.response?.status === 403) {
        router.push({
          pathname: "/OtpVerify",
          params: { email: payload.email },
        });
      }

      setLoading(false);

      Alert.alert(
        "Login Error",
        error?.response?.data?.message ||
          "Oops! Something went wrong. Please try again later"
      );

      return false;
    }
  };

  const Logout = async () => {
    await removeAccessToken();
    await removeRefreshToken();
    router.replace("/(auth)/Login");
  };

  return { Login, Logout, loading };
}

export default useLogin;
