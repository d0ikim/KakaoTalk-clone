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
    <div className="px-4 py-3 border-b border-pink-200 bg-pink-100 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="p-1 hover:bg-pink-200 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-pink-700" />
        </button>
        <Avatar className="w-8 h-8">
          <AvatarImage src={friend.avatar} />
          <AvatarFallback className="text-sm font-medium bg-pink-200 text-pink-700">
            {friend.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-base font-semibold text-pink-900">
            {friend.name}
          </h2>
          <p className="text-xs text-pink-700">1:1 채팅</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-pink-200 rounded-full transition-colors">
          <Search className="w-4 h-4 text-pink-700" />
        </button>
        <button
          onClick={onDetails}
          className="p-2 hover:bg-pink-200 rounded-full transition-colors"
        >
          <MoreHorizontal className="w-4 h-4 text-pink-700" />
        </button>
      </div>
    </div>
  );
}
