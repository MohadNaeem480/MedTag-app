import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import { CloudUpload } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome } from "@expo/vector-icons";
import useUpload from "../src/services/useUpload";
import GlobalContext from "../src/context/GlobalContext";
import useFiles from "../src/services/useFiles";
import { getAccessToken } from "../src/storage/storage";
import axios from "axios";
import useCurrentUser from "@/src/services/useCurrentUser";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

type UploadedFile = {
  id: number;
  filename: string;
  uploaded_at?: string;
};

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function FileUpload() {
  const { Upload } = useUpload();
  const [pendingFiles, setPendingFiles] = React.useState<any[]>([]);
  const { loading, getCurrentUser } = useCurrentUser();
  const { userInfo } = useContext(GlobalContext) as any;
  const { files, fetchFiles } = useFiles();
  const navigation = useNavigation();
  const [passUrl, setPassUrl] = React.useState<string | null>(null);
  const [generatingPass, setGeneratingPass] = React.useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handlePickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: "*/*",
      });

      if (result.canceled) return;

      const file = result.assets[0];

      setPendingFiles((prev) => [...prev, file]);

      console.log("File staged:", file);
    } catch (err) {
      console.error("File pick error:", err);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      pendingFiles.forEach((file, index) => {
        const fileName = file.name || `file_${index}.pdf`;
        let fileUri = file.uri;

        // ensure proper file:// prefix
        if (!fileUri.startsWith("file://")) {
          fileUri = "file://" + fileUri;
        }

        formData.append("files", {
          uri: fileUri,
          type: file.mimeType || "application/pdf",
          name: fileName,
        } as any);
      });

      console.log("FormData built:", formData);

      await Upload(formData);
      setPendingFiles([]);
      await fetchFiles?.();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const fetchPassUrl = async () => {
    try {
      setGeneratingPass(true);
      const token = await getAccessToken();

      const res = await axios.get(`${BASE_URL}/api/get-pass-url/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.data?.url) {
        setPassUrl(res.data.url);
        Alert.alert("Success", "Apple Wallet Pass ready!");
      } else {
        Alert.alert("Error", "No pass URL returned from server.");
      }
    } catch (error: any) {
      console.error(
        "Error generating Apple Wallet Pass:",
        error?.response?.data || error.message
      );
      Alert.alert("Error", "Failed to generate Apple Wallet Pass.");
    } finally {
      setGeneratingPass(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>
        Good Morning,{" "}
        <Text style={styles.greetingName}>
          {userInfo?.first_name || "User"}
        </Text>
      </Text>

      {/* Add Documents heading */}
      <Text style={styles.sectionTitle}>Add Documents</Text>

      {/* Upload Box */}
      <View style={styles.uploadBox}>
        <TouchableOpacity onPress={handlePickFiles}>
          <CloudUpload size={60} color="#175635" />
        </TouchableOpacity>

        <Text style={styles.mainText}>
          Drag & Drop or choose files to upload
        </Text>
        <Text style={styles.subText}>
          Select multiple images, PDF, or MS Word files
        </Text>
      </View>

      {/* Pending uploaded files */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "600", marginBottom: 8 }}>
          Uploaded Files | {pendingFiles.length} Files
        </Text>

        {pendingFiles.length > 0 ? (
          <FlatList
            data={pendingFiles}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => (
              <View style={styles.fileRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fileName}>{item.name}</Text>
                  <Text style={styles.fileMeta}>Pending Upload</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noFilesText}>
            No files selected yet. Pick some files to see them here.
          </Text>
        )}
      </View>

      {/* OR separator */}
      <View style={styles.separatorRow}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>OR</Text>
        <View style={styles.separatorLine} />
      </View>

      {/* Import from URL */}
      <View style={{ marginTop: 6 }}>
        <Text style={styles.urlLabel}>Import from URL</Text>

        <View style={styles.urlInputRow}>
          <TextInput style={styles.urlInput} placeholder="Add URL link" />
          <TouchableOpacity style={styles.urlSelectButton}>
            <Text style={styles.urlSelectText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Help + Action Buttons */}
      <View style={styles.helpAndButtons}>
        {/* <View style={styles.helpRow}>
          <FontAwesome
            name="question-circle-o"
            size={20}
            style={styles.helpIcon}
          />
          <Text style={styles.helpText}>Still need help?</Text>
        </View> */}

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setPendingFiles([])}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* QR / Wallet / Summary */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.outlinedButton}>
          <Text style={styles.outlinedText}>QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlinedButton}
          onPress={passUrl ? () => Linking.openURL(passUrl) : fetchPassUrl}
          disabled={generatingPass}
        >
          <Text style={styles.outlinedText}>
            {passUrl
              ? "Apple Wallet Pass"
              : generatingPass
              ? "Generating..."
              : "Generate Apple Wallet Pass"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/summary")}
          style={styles.summaryButton}
        >
          <Text style={styles.summaryButtonText}>View Summary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  greeting: {
    fontSize: 29,
    color: "#293728",
    marginBottom: 20,
    marginTop: 50,
    textAlign: "center",
  },
  greetingName: { fontWeight: "bold", color: "#175635" },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#175635",
    textAlign: "center",
  },

  uploadBox: {
    borderWidth: 1,
    borderColor: "#25995C80",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: { marginTop: 8, fontWeight: "600", color: "#28372B" },
  subText: { color: "#6B7280" },
  fileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  fileName: { fontWeight: "600", color: "#2B2B2B" },
  fileMeta: { color: "#1D824D", fontSize: 12 },
  deleteButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#fee2e2",
  },
  noFilesText: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 12,
  },
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  separatorLine: { flex: 1, height: 1, backgroundColor: "#D1D5DB" },
  separatorText: { marginHorizontal: 12, color: "#6B7280" },
  urlLabel: { marginBottom: 4, fontWeight: "600", color: "#28372B" },
  urlInputRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#25995C80",
    borderRadius: 12,
    overflow: "hidden",
  },
  urlInput: { flex: 1, padding: 8 },
  urlSelectButton: { paddingHorizontal: 16, justifyContent: "center" },
  urlSelectText: { fontWeight: "600", color: "#175635" },
  helpAndButtons: {
    justifyContent: "center",
    marginTop: 24,
  },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#175635",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 6,
  },

  cancelText: { color: "#175635" },

  uploadButton: {
    flex: 1,
    backgroundColor: "#175635",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 6,
  },

  uploadButtonText: { color: "#fff" },

  helpRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  helpIcon: { marginRight: 8, color: "#293728" },
  helpText: { fontWeight: "600", color: "#293728" },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 24,
  },
  outlinedButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#175635",
    borderRadius: 25,
    width: 250,
    alignItems: "center",
  },
  outlinedText: { color: "#175635" },
  summaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#175635",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    width: 250,
  },
  summaryButtonText: { color: "#fff" },
});
