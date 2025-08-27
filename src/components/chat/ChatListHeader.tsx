import React from "react";
import { Search, MessageCircle, MoreHorizontal } from "lucide-react";

interface ChatListHeaderProps {
  showSearch: boolean;
  onToggleSearch: () => void;
  onOpenNewChat: () => void;
}

export default function ChatListHeader({
  showSearch,
  onToggleSearch,
  onOpenNewChat,
}: ChatListHeaderProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-pink-200 bg-pink-100">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-pink-900">채팅</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleSearch}
          className="p-1.5 text-pink-700 hover:bg-pink-200 rounded-lg transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
        <button 
          onClick={onOpenNewChat}
          className="p-1.5 text-pink-700 hover:bg-pink-200 rounded-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
