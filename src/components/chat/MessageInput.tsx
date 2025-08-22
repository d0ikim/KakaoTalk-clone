import React from "react";
import { Paperclip, Smile, Send } from "lucide-react";

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export default function MessageInput({
  message,
  onMessageChange,
  onSendMessage,
}: MessageInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="px-4 py-3 border-t border-gray-100">
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Paperclip className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="w-full px-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Smile className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={onSendMessage}
          disabled={!message.trim()}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
