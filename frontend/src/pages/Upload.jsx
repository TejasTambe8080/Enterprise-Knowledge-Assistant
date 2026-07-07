import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UploadBox from "../components/UploadBox";

export default function Upload() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="upload-shell">
      <UploadBox onUploaded={(text) => setMessage(text)} />
      {message ? <p>{message}</p> : null}
      <button onClick={() => navigate("/chat")}>Back to chat</button>
    </div>
  );
}
