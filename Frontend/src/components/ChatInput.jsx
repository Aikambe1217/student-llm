import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 140) + "px";
  }, [text]);

  const send = () => {
    if (!text.trim()) return;
    onSend?.(text);
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    /*
      safe-area-inset-bottom: on iPhone with home indicator,
      adds padding so the input isn't hidden behind the gesture bar.
    */
    <div
      className="border-t border-gray-200 bg-white px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-4"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-3xl mx-auto flex items-end gap-2 sm:gap-3">
        <input
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type your question…"
          className="
            flex-1 min-w-0
            border border-gray-300 rounded-xl
            px-3 py-2.5
            text-sm sm:text-base
            resize-none overflow-y-auto
            focus:outline-none focus:ring-2 focus:ring-blue-500
            leading-relaxed bg-gray-50
          "
          style={{ maxHeight: "140px" }}
        />

        <button
          onClick={send}
          aria-label="Send message"
          className="
            flex-shrink-0 flex items-center justify-center
            w-11 h-11 sm:w-12 sm:h-12
            rounded-xl
            bg-blue-600 hover:bg-blue-700 active:bg-blue-800
            text-white transition-colors touch-manipulation
            disabled:opacity-40
          "
          disabled={!text.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}