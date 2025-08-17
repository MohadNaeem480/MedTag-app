import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "accessToken";

// Save token
export const setAccessToken = async (token) => {
  try {
    if (!token) {
      console.warn("setAccessToken called with empty token");
      return;
    }
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
    console.log("Access token saved:", token);
  } catch (error) {
    console.error("Error saving access token:", error);
  }
};

// Get token
export const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      console.warn("No access token found in AsyncStorage");
      return null;
    }
    console.log("Access token loaded:", token);
    return token;
  } catch (error) {
    console.error("Error reading access token:", error);
    return null;
  }
};

// Remove token
export const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    console.log("Access token removed");
  } catch (error) {
    console.error("Error removing access token:", error);
  }
};
