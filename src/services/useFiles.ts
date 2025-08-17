import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../storage/storage";

export interface FileItem {
  id: number;
  filename: string;
  document: string;
  uploaded_at: string;
}

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function useFiles() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      const response = await axios.get(`${BASE_URL}/api/upload/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFiles(
        (response.data || []).map((f: any) => ({
          id: f.id,
          filename: f.filename,
          document: f.document,
          uploaded_at: f.uploaded_at ?? "",
        }))
      );
    } catch (err) {
      console.error("Error fetching files:", err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  return { files, fetchFiles, loading };
}
