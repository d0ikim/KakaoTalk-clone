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
    <div className="px-4 py-3 border-t border-pink-200 bg-pink-100">
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-pink-200 rounded-full transition-colors">
          <Paperclip className="w-5 h-5 text-pink-700" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="w-full px-3 py-2 border border-pink-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <button className="p-2 hover:bg-pink-200 rounded-full transition-colors">
          <Smile className="w-5 h-5 text-pink-700" />
        </button>
        <button
          onClick={onSendMessage}
          disabled={!message.trim()}
          className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
