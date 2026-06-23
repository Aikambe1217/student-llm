import { useEffect, useRef } from "react";
import Message from "./Message";

export default function ChatWindow({ messages = [], loading = false }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-gray-50 overscroll-contain">

      {messages.length === 0 && !loading ? (
        <div className="min-h-full flex flex-col items-center justify-center text-center text-gray-500 px-6 py-12">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
            How can we help you today?
          </h2>
          <p className="mt-2 text-xs sm:text-sm max-w-xs sm:max-w-md leading-relaxed">
            Ask questions about registration, exams, fees, library services, and ICT support.
          </p>
        </div>

      ) : (
        <div className="max-w-3xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
          {messages.map((m, i) => (
            <Message key={i} role={m.role} content={m.content} />
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
              <span>Thinking…</span>
            </div>
          )}

          <div ref={bottomRef} className="h-2" />
        </div>
      )}
    </div>
  );
}