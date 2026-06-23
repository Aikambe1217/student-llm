import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { getHistory } from "../api/chat";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import { sendMessage } from "../api/chat";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

    useEffect(() => {
    loadHistory();
    }, []);

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await sendMessage(text);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res?.answer || "No response from server" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Unable to reach server." },
      ]);
    }
    setLoading(false);
  };

  return (
    /*
      Use 100dvh (dynamic viewport height) instead of 100vh / h-screen.
      On mobile Safari, 100vh = full height including browser chrome,
      causing content to be hidden behind the address bar and tab bar.
      100dvh always equals the VISIBLE viewport, so nothing gets clipped.
      The inline style is the only reliable cross-browser way to apply dvh.
    */
    <div
      className="flex w-screen overflow-hidden bg-white"
      style={{ height: "100dvh" }}
    >
      {/* Scrim */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar wrapper — slides in on mobile, static on desktop */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:transition-none lg:z-auto lg:flex-shrink-0
        `}
      >
       <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          history={history}
        />
      </div>

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">

        {/* Header */}
        <header className="flex-none h-14 sm:h-16 border-b border-gray-200 flex items-center px-3 sm:px-4 gap-3 bg-white z-10">
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors touch-manipulation"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>
          <h1 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
            Student Support Assistant
          </h1>
        </header>

        {/* Chat area — the ONLY scrollable region */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <ChatWindow messages={messages} loading={loading} />
        </div>

        {/* Input — pinned to bottom, never overlaps content */}
        <div className="flex-none">
          <ChatInput onSend={handleSend} />
        </div>

      </div>
    </div>
  );
}