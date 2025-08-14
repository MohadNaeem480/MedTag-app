import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CloudUpload } from "lucide-react-native";

type Props = {
  onUploadSuccess?: () => void; // Optional callback
};

export default function UploadDocument({ onUploadSuccess }: Props) {
  const handleFileSelect = () => {
    console.log("File picker here");
    if (onUploadSuccess) {
      onUploadSuccess();
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Add Documents</Text>

      <TouchableOpacity style={styles.uploadBox} onPress={handleFileSelect}>
        <CloudUpload size={50} color="#175635" />
        <Text style={styles.uploadText}>Tap to choose files</Text>
        <Text style={styles.uploadHint}>
          Select PDF, image, Word, or ZIP files
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#175635",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 16,
    color: "#28372B",
    marginTop: 8,
  },
  uploadHint: {
    fontSize: 12,
    color: "#51785E",
    marginTop: 4,
  },
});
