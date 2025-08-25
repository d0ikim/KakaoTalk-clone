import React from "react";
import { Search, UserPlus, MoreHorizontal } from "lucide-react";

interface ChatListHeaderProps {
  showSearch: boolean;
  onToggleSearch: () => void;
}

export default function ChatListHeader({
  showSearch,
  onToggleSearch,
}: ChatListHeaderProps) {
  return (
    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
      <h1 className="text-lg font-bold text-gray-900">채팅</h1>
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleSearch}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Search className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <UserPlus className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
