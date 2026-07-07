import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UploadBox from "../components/UploadBox";

export default function Upload() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="upload-page">
      <div className="app-shell">
        <div className="floating-particle" />
        <div className="floating-particle" />
        <div className="floating-particle" />
        <div className="floating-particle" />
        <div className="floating-particle" />
      </div>

      <div className="upload-shell">
        <div className="glass-card upload-panel">
          <div className="text-center">
            <h1 className="hero-heading text-gradient">Upload Documents</h1>
            <p className="small-muted">Add documents to your knowledge assistant</p>
          </div>

          <UploadBox onUploaded={setResult} />

          <button onClick={() => navigate("/chat")} className="btn-gradient btn-pulse btn-gradient send-button">
            Go to Chat
          </button>
        </div>

        {result ? (
          <div className="modal-backdrop">
            <div className="glass-card modal-card">
              <div style={{ fontSize: "3rem" }}>✅</div>
              <h2 className="hero-heading text-gradient">Upload Complete!</h2>
              <p className="small-muted">{result.filename}</p>
              <p className="small-muted">Chunks processed: {result.chunks}</p>
              <button onClick={() => navigate("/chat")} className="btn-gradient btn-pulse btn-gradient send-button" style={{ marginTop: 8 }}>
                Go to Chat
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
