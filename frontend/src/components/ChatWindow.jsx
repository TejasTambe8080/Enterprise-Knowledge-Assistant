export default function ChatWindow({ message }) {
  const isUser = message.role === "user";
  const timestamp = message.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <article className={`chat-bubble ${message.role} ${isUser ? "message-enter" : "message-enter"}`}>
      <div className="chat-meta">
        <div className={isUser ? "user-avatar" : "ai-avatar"}>{isUser ? "U" : "🤖"}</div>
        <strong>{isUser ? "You" : "AI Assistant"}</strong>
      </div>
      <p style={{ margin: 0, lineHeight: 1.6 }}>{message.content}</p>
      <div className="small-muted" style={{ fontSize: "0.75rem", textAlign: "right" }}>{timestamp}</div>
      {message.sources?.length ? (
        <ul className="source-list">
          {message.sources.map((source, index) => (
            <li key={index}>
              <div className="source-chip">
                <span>📄</span>
                <span>{source.file_name}</span>
              </div>
              {source.content ? <div className="source-preview">{source.content}</div> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
