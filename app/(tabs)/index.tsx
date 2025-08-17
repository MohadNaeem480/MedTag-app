import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import FileUpload from "@/components/FileUpload";
import FileList from "@/components/FileList";
import useFiles from "@/src/services/useFiles";

export default function HomePage() {
  const { files, fetchFiles, loading } = useFiles();
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Fetch files when component mounts
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FileList
        headerComponent={<FileUpload />}
        refreshList={fetchFiles}
        files={files}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
