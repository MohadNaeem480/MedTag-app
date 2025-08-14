import { useState } from "react";
import { ScrollView, View } from "react-native";
import UploadDocument from "@/components/UploadDocuments";
import FileList from "@/components/FileList";

export default function HomePage() {
  const [files, setFiles] = useState([
    { id: 1, filename: "report.pdf", uploaded_at: "2025-08-01T10:00:00Z" },
    { id: 2, filename: "scan.png", uploaded_at: "2025-08-05T14:30:00Z" },
  ]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const refreshList = () => {
    console.log("Refresh list");
    // Later: call fetchFiles() from your hook
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-4 py-4">
        <UploadDocument onUploadSuccess={refreshList} />
        <FileList
          refreshList={refreshList}
          files={files}
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>
    </ScrollView>
  );
}
