export default function ChatInput({ input, setInput, onSend, loading }) {
  return (
    <div className="chat-input-shell">
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && onSend()}
        type="text"
        placeholder="Type a message"
      />
      <button onClick={onSend} disabled={loading}>Send</button>
    </div>
  );
}
