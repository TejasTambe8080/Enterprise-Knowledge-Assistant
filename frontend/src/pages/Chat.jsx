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
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userInitial = (user?.name || user?.email || "U").charAt(0).toUpperCase();

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
    <div className="chat-page">
      <div className="app-shell">
        <div className="floating-particle" />
        <div className="floating-particle" />
        <div className="floating-particle" />
        <div className="floating-particle" />
        <div className="floating-particle" />
      </div>

      <header className="chat-header glass-card chat-shell">
        <div className="chat-brand">
          <div className="logo-mark" style={{ width: 48, height: 48 }}>
            <span style={{ fontSize: 24 }}>📚</span>
          </div>
          <div>
            <h1 className="text-gradient">RAG Assistant</h1>
            <div className="small-muted">Enterprise Knowledge Base</div>
          </div>
        </div>

        <div className="chat-actions">
          <div className="user-avatar" title={user?.name || user?.email || "User"}>{userInitial}</div>
          <button onClick={() => navigate("/upload")} className="btn-compact btn-success">
            📤 Upload
          </button>
          <button onClick={handleLogout} className="btn-compact btn-danger">
            🚪 Logout
          </button>
        </div>
      </header>

      <main className="chat-main">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <div className="glass-card empty-card">
              <div className="empty-icon">📚</div>
              <h2 className="hero-heading text-gradient">Ask me anything about your documents!</h2>
              <p className="small-muted">Upload a document to get started</p>
            </div>
          </div>
        ) : (
          <div className="chat-messages">
            {messages.map((message, index) => <ChatWindow key={index} message={message} />)}
          </div>
        )}
        {loading ? (
          <div className="typing-indicator glass-card">
            <div className="loading-dots" aria-label="Loading response">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : null}
        <div ref={endRef} />
      </main>
      <ChatInput input={input} setInput={setInput} onSend={handleSendMessage} loading={loading} />
    </div>
  );
}
