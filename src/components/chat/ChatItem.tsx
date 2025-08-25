import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatItemProps {
  chat: {
    id: string;
    name: string;
    avatar?: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    isOnline: boolean;
  };
  onClick: () => void;
}

export default function ChatItem({ chat, onClick }: ChatItemProps) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 border-b border-border hover:bg-muted cursor-pointer transition-colors"
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage src={chat.avatar} />
            <AvatarFallback className="text-sm font-medium bg-muted text-muted-foreground">
              {chat.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {/* Online Status */}
          {chat.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>

        {/* Chat Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-foreground truncate">
              {chat.name}
            </h3>
            <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground truncate flex-1">
              {chat.lastMessage}
            </p>
            {chat.unreadCount > 0 && (
              <div className="ml-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
