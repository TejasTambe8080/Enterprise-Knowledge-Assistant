import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ChatInput from "../components/ChatInput";
import ChatWindow from "../components/ChatWindow";
import { queryChat } from "../services/api";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const endRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage() {
    if (!input.trim() || loading) return;
    setMessages((current) => [...current, { role: "user", content: input }]);
    setLoading(true);
    const question = input;
    setInput("");
    try {
      const response = await queryChat(question);
      setMessages((current) => [...current, { role: "assistant", content: response.answer, sources: response.sources || [] }]);
    } catch (chatError) {
      setMessages((current) => [...current, { role: "assistant", content: chatError.message || "Failed to get response." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="chat-shell">
      <header className="chat-header">
        <h1>Enterprise RAG Assistant</h1>
        <div className="chat-actions">
          <button onClick={() => navigate("/upload")}>Upload Documents</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main className="chat-main">
        {messages.length === 0 ? <div className="empty-state">Ask me anything about your documents.</div> : null}
        {messages.map((message, index) => <ChatWindow key={index} message={message} />)}
        {loading ? <div className="typing-indicator">Thinking...</div> : null}
        <div ref={endRef} />
      </main>
      <ChatInput input={input} setInput={setInput} onSend={handleSendMessage} loading={loading} />
    </div>
  );
}
