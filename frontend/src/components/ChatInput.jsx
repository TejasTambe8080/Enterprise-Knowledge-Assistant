export default function ChatInput({ input, setInput, onSend, loading }) {
  return (
    <div className="chat-input-shell glass-card">
      <button type="button" className="icon-button" aria-label="Attach file">📎</button>
      <button type="button" className="icon-button" aria-label="Add emoji">😊</button>
      <textarea
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          event.target.style.height = "auto";
          event.target.style.height = `${Math.min(event.target.scrollHeight, 180)}px`;
        }}
        onKeyDown={(event) => event.key === "Enter" && !event.shiftKey && (event.preventDefault(), onSend())}
        rows={1}
        placeholder="Ask something about your documents..."
      />
      <button onClick={onSend} disabled={loading} className="btn-gradient btn-pulse btn-gradient send-button">
        🚀 Send
      </button>
    </div>
  );
}
