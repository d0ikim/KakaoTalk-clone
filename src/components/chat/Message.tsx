import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageProps {
  message: {
    id: number;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    isOwn: boolean;
  };
  friendAvatar?: string;
}

export default function Message({ message, friendAvatar }: MessageProps) {
  return (
    <div className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md ${
          message.isOwn ? "order-2" : "order-1"
        }`}
      >
        {!message.isOwn && (
          <div className="flex items-center space-x-2 mb-1">
            <Avatar className="w-6 h-6">
              <AvatarImage src={friendAvatar} />
              <AvatarFallback className="text-xs font-medium bg-gray-200">
                {message.senderName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-500">{message.senderName}</span>
          </div>
        )}
        <div
          className={`px-3 py-2 rounded-lg ${
            message.isOwn
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <p
          className={`text-xs text-gray-500 mt-1 ${
            message.isOwn ? "text-right" : "text-left"
          }`}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}
