import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { List as ListIcon, LayoutGrid } from "lucide-react-native";

type FileItem = {
  id: string | number;
  filename: string;
  uploaded_at: string;
};

type Props = {
  refreshList: () => void;
  files?: FileItem[];
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
};

export default function FileList({
  refreshList,
  files = [],
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
}: Props) {
  const filteredFiles = files.filter((file) =>
    file.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Documents | {filteredFiles.length} Files
        </Text>
        <Text style={styles.subtitle}>Click on a file to preview</Text>
      </View>

      {/* Search box */}
      <TextInput
        style={styles.search}
        placeholder="Search files..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* View mode buttons */}
      <View style={styles.modeButtons}>
        <TouchableOpacity
          style={[styles.modeButton, viewMode === "list" && styles.activeMode]}
          onPress={() => setViewMode("list")}
        >
          <ListIcon
            size={20}
            color={viewMode === "list" ? "#fff" : "#175635"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, viewMode === "grid" && styles.activeMode]}
          onPress={() => setViewMode("grid")}
        >
          <LayoutGrid
            size={20}
            color={viewMode === "grid" ? "#fff" : "#175635"}
          />
        </TouchableOpacity>
      </View>

      {/* Files */}
      {viewMode === "list" ? (
        <FlatList
          data={filteredFiles}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.fileRow}>
              <Text style={styles.fileName}>{item.filename}</Text>
              <Text style={styles.fileDate}>
                {new Date(item.uploaded_at).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.grid}>
          {filteredFiles.map((file) => (
            <View key={file.id} style={styles.gridItem}>
              <Text style={styles.fileName}>{file.filename}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  modeButtons: {
    flexDirection: "row",
    marginBottom: 12,
  },
  modeButton: {
    borderWidth: 1,
    borderColor: "#175635",
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  activeMode: {
    backgroundColor: "#175635",
  },
  fileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  fileName: {
    fontSize: 14,
    fontWeight: "500",
  },
  fileDate: {
    fontSize: 12,
    color: "#555",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  gridItem: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    width: "47%",
  },
});
