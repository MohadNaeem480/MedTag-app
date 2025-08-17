// app/(tabs)/summary.tsx
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import useCurrentUser from "@/src/services/useCurrentUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/src/storage/storage";

export default function SummaryTab() {
  const { userInfo } = useCurrentUser();
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userInfo?.id) return;

    const fetchSummary = async () => {
      setLoading(true);
      try {
        const token = await getAccessToken();
        const res = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/api/summary/?user=${userInfo.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (Array.isArray(res.data) && res.data.length > 0) {
          setSummary(res.data[0].summary);
        } else {
          setSummary(null);
        }
      } catch (err) {
        console.error("Failed to load summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [userInfo?.id]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical Summary</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2e7d32" />
      ) : summary ? (
        <Text style={styles.summary}>{summary}</Text>
      ) : (
        <Text style={styles.placeholder}>No summary available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  summary: { fontSize: 16, lineHeight: 22, color: "#333" },
  placeholder: { fontSize: 16, fontStyle: "italic", color: "#777" },
});
