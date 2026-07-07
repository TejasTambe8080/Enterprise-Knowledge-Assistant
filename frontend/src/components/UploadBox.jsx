import { useState } from "react";

import { uploadDocument } from "../services/api";

export default function UploadBox({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file || loading) return;
    setLoading(true);
    setError("");
    try {
      const result = await uploadDocument(file);
      onUploaded?.({
        message: "Upload Complete!",
        chunks: result.chunks || 0,
        filename: result.filename || file.name,
      });
    } catch (uploadError) {
      setError(uploadError.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-form">
      <div
        className={`glass-card drop-zone ${dragActive ? "dragover" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragActive(false);
          setFile(event.dataTransfer.files?.[0] || null);
        }}
      >
        <div>
          <div className="upload-icon">📤</div>
          <h2 className="hero-heading">Drop your files here or click to browse</h2>
          <p className="small-muted">Supported: PDF, DOCX, TXT, CSV • Max file size: 10MB</p>
          <div className="badge-row" style={{ marginTop: 14 }}>
            <span className="badge">PDF</span>
            <span className="badge">DOCX</span>
            <span className="badge">TXT</span>
            <span className="badge">CSV</span>
          </div>
        </div>
        <input
          type="file"
          style={{ marginTop: 16 }}
          onChange={(event) => setFile(event.target.files?.[0] || null)}
        />
      </div>

      {file ? (
        <div className="glass-card file-card">
          <div className="file-top">
            <div className="file-info">
              <div className="file-icon">📄</div>
              <div>
                <strong>{file.name}</strong>
                <div className="small-muted">{Math.max(1, Math.round(file.size / 1024))} KB</div>
              </div>
            </div>
            <button type="button" className="icon-button" onClick={() => setFile(null)} aria-label="Remove file">×</button>
          </div>
          <div className="progress-track">
            <div className="progress-bar" style={{ width: loading ? "70%" : "0%" }} />
          </div>
        </div>
      ) : null}

      {error ? <div className="message-box error">❌ {error}</div> : null}

      <button onClick={handleUpload} disabled={loading || !file} className="btn-gradient btn-pulse btn-gradient send-button">
        {loading ? "Uploading..." : "🚀 Upload"}
      </button>
    </div>
  );
}
