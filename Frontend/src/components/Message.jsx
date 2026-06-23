export default function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]
          px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isUser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
          }
        `}
        style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
      >
        {content}
      </div>
    </div>
  );
}