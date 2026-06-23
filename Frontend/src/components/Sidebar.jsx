import {
  MessageSquare,
  User,
  X,
} from "lucide-react";

import logo_ud from "../assets/logo_ud.png";

export default function Sidebar({
  isOpen,
  setIsOpen,
  history = [],
}) {
  return (
    <aside className="h-full w-72 max-w-[85vw] bg-blue-700 text-white flex flex-col">

      {/* HEADER */}
      <div className="flex-shrink-0 p-4 sm:p-5 border-b border-blue-600">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={logo_ud}
              alt="University Logo"
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain flex-shrink-0"
            />

            <div className="min-w-0">
              <h1 className="font-bold text-base sm:text-lg truncate">
                UDSM AI
              </h1>

              <p className="text-xs text-blue-100 truncate">
                Student Support Assistant
              </p>
            </div>
          </div>

          <button
            className="lg:hidden flex-shrink-0 p-1.5 rounded-md text-blue-100 hover:text-white hover:bg-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* RECENT CHATS */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-4">
        <p className="text-xs uppercase tracking-wider mb-3 text-blue-100 px-1">
          Recent Chats
        </p>

        <div className="space-y-1">
          {history.length > 0 ? (
            history.map((chat, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-2 p-2 sm:p-2.5 rounded-lg text-sm text-left hover:bg-white hover:text-blue-700 transition-colors"
              >
                <MessageSquare
                  size={15}
                  className="flex-shrink-0"
                />

                <span className="truncate">
                  {chat.title}
                </span>
              </button>
            ))
          ) : (
            <p className="text-xs text-blue-200 px-2">
              No chat history yet
            </p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex-shrink-0 border-t border-blue-600 p-3 sm:p-4">
        <div className="flex items-center gap-3 bg-blue-800 rounded-lg p-2.5 sm:p-3">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white text-blue-700 flex items-center justify-center flex-shrink-0">
            <User size={17} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              Student
            </p>

            <p className="text-xs text-blue-200 truncate">
              student@udsm.ac.tz
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}