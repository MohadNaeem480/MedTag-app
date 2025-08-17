import { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { getAccessToken } from "../storage/storage";

const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

function useUpload() {
  const [upload, setUpload] = useState({
    loading: false,
    urls: [],
    message: null,
  });

  const Upload = async (payload) => {
    setUpload({ loading: true, urls: [], message: null });

    try {
      const token = await getAccessToken();

      const response = await fetch(`${EXPO_PUBLIC_BASE_URL}/api/upload/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const data = await response.json();

      if (data?.message) {
        setUpload({ loading: false, urls: [], message: data.message });
        Alert.alert("Upload Error", data.message);
        return;
      }

      setUpload({
        loading: false,
        urls: data?.image_urls || (data?.image_url ? [data.image_url] : []),
        message: null,
      });

      Alert.alert("Success", data?.message || "Files uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setUpload({ loading: false, urls: [], message: "Upload failed" });
      Alert.alert(
        "Error",
        "Oops! Something went wrong. Please try again later"
      );
    }
  };

  return { Upload, upload, setUpload };
}

export default useUpload;
