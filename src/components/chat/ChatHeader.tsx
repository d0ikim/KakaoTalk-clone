import React from "react";
import { ArrowLeft, Search, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MockFriend } from "@/mock/types";

interface ChatHeaderProps {
  friend: MockFriend;
  onBack: () => void;
  onDetails: () => void;
}

export default function ChatHeader({
  friend,
  onBack,
  onDetails,
}: ChatHeaderProps) {
  return (
    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <Avatar className="w-8 h-8">
          <AvatarImage src={friend.avatar} />
          <AvatarFallback className="text-sm font-medium bg-gray-200">
            {friend.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            {friend.name}
          </h2>
          <p className="text-xs text-gray-500">1:1 채팅</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Search className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={onDetails}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
