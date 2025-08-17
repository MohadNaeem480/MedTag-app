import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  List as ListIcon,
  LayoutGrid,
  Trash2,
  Search,
} from "lucide-react-native";

type FileItem = {
  id: string | number;
  filename: string;
  uploaded_at: string;
};

type Props = {
  refreshList: () => void;
  files: FileItem[];
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  headerComponent?: React.ReactNode;
};

export default function FileList({
  refreshList,
  files,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  headerComponent,
}: Props) {
  const filteredFiles = files.filter((file) =>
    file.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderListItem = ({ item }: { item: FileItem }) => {
    const ext = item.filename.split(".").pop();
    return (
      <View style={styles.fileRow}>
        <View style={{ flex: 2 }}>
          <Text style={styles.fileName}>{item.filename}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.folderText}>Uploaded Documents</Text>
        </View>
        <View style={{ flex: 0.7 }}>
          <Text style={styles.fileType}>.{ext}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.fileDate}>
            {new Date(item.uploaded_at).toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity>
          <Trash2 size={18} color="#D9534F" />
        </TouchableOpacity>
      </View>
    );
  };

  const listHeader = (
    <View>
      {headerComponent}
      <View style={{ marginTop: 20, marginBottom: 12 }}>
        <Text style={styles.title}>
          Documents | {filteredFiles.length} Files
        </Text>
        <Text style={styles.subtitle}>Click on a file to preview the file</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Search size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.search}
          placeholder="Search files..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Mode buttons */}
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
    </View>
  );

  return viewMode === "list" ? (
    <FlatList
      key={"list"}
      data={filteredFiles}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderListItem}
      ListHeaderComponent={listHeader}
      contentContainerStyle={{
        paddingHorizontal: 16,
        marginTop: 12,
        paddingBottom: 80,
      }}
    />
  ) : (
    <FlatList
      key={"grid"}
      data={filteredFiles}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      ListHeaderComponent={listHeader}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 80,
      }}
      renderItem={({ item }) => (
        <View style={styles.gridItem}>
          <Text style={styles.fileName}>{item.filename}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
  },
  searchWrapper: {
    position: "relative",
    marginTop: 12,
    marginBottom: 12,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    top: "50%",
    marginTop: -9,
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    paddingLeft: 32,
  },
  modeButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  modeButton: {
    borderWidth: 1,
    borderColor: "#175635",
    padding: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  activeMode: {
    backgroundColor: "#175635",
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  fileName: {
    fontSize: 14,
    fontWeight: "500",
  },
  folderText: {
    fontSize: 12,
    color: "#175635",
  },
  fileType: {
    fontSize: 12,
    color: "#555",
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
