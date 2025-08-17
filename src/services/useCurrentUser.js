import { useContext, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../context/GlobalContext";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from "../storage/storage";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const useCurrentUser = () => {
  const { userInfo, setUserInfo, setUpdateResponse } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        navigation.navigate("Login");
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // store the user object globally
      setUpdateResponse(false);
      setUserInfo(response.data);
    } catch (error) {
      if (error?.response?.status === 401) {
        await removeAccessToken();
        await removeRefreshToken();
        navigation.navigate("Login");
      } else {
        console.error("Failed to fetch user profile:", error?.message || error);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ expose userInfo as well
  return { userInfo, loading, getCurrentUser };
};

export default useCurrentUser;
