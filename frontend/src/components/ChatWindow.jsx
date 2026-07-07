export default function ChatWindow({ message }) {
  return (
    <article className={`chat-bubble ${message.role}`}>
      <p>{message.content}</p>
      {message.sources?.length ? (
        <ul>
          {message.sources.map((source, index) => <li key={index}>{source.file_name}</li>)}
        </ul>
      ) : null}
    </article>
  );
}
