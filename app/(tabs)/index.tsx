import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import FileUpload from "@/components/FileUpload";
import FileList from "@/components/FileList";

export default function HomePage() {
  const [files, setFiles] = useState([
    { id: 1, filename: "report.pdf", uploaded_at: "2025-08-01T10:00:00Z" },
    { id: 2, filename: "scan.png", uploaded_at: "2025-08-05T14:30:00Z" },
  ]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FileList
        headerComponent={<FileUpload />}
        refreshList={() => console.log("Refresh list")}
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
