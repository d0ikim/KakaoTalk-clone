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
              <AvatarFallback className="text-xs font-medium bg-pink-200 text-pink-700">
                {message.senderName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-pink-600">{message.senderName}</span>
          </div>
        )}
        <div
          className={`px-3 py-2 rounded-lg ${
            message.isOwn
              ? "bg-pink-400 text-white"
              : "bg-white text-gray-900 border border-pink-200 shadow-sm"
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <p
          className={`text-xs mt-1 ${
            message.isOwn 
              ? "text-right text-pink-100" 
              : "text-left text-pink-500"
          }`}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}
