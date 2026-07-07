import { useState } from "react";

import { uploadDocument } from "../services/api";

export default function UploadBox({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file || loading) return;
    setLoading(true);
    try {
      await uploadDocument(file);
      onUploaded?.("Document uploaded successfully.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-box">
      <input type="file" onChange={(event) => setFile(event.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={loading || !file}>{loading ? "Uploading..." : "Upload"}</button>
    </div>
  );
}
