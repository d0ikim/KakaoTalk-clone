"use client";
import React, { useEffect, useState } from "react";

import { Search, Smile, Calendar, Clock, Folder, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import MobileLayout from "@/components/layout/MobileLayout";
import { mockChatMessages, MockChatMessage, addChatMessage } from "@/mock";

export default function ChatPage() {
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<MockChatMessage[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && chatMessages.length === 0) {
      setChatMessages(mockChatMessages);
    }
  }, [mounted, chatMessages.length]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = addChatMessage({
        senderId: "1",
        senderName: "나",
        content: message,
        type: "text",
      });
      setChatMessages([...chatMessages, newMessage]);
      setMessage("");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <MobileLayout>
      <div className="h-full flex flex-col bg-pink-50">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-pink-200 bg-pink-100">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <div className="w-10 h-10 bg-pink-300 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">김</span>
              </div>
            </Avatar>
            <div>
              <h2 className="font-semibold text-pink-900">김도이 언니</h2>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2 text-pink-700 hover:bg-pink-200">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-pink-700 hover:bg-pink-200">
              <Calendar className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-pink-700 hover:bg-pink-200">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 채팅 메시지 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg: MockChatMessage) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === "1" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.senderId === "1"
                    ? "bg-pink-400 text-white"
                    : "bg-white text-gray-900 border border-pink-200 shadow-sm"
                }`}
              >
                {msg.type === "reply" && (
                  <div className="text-xs text-pink-600 mb-1 border-l-2 border-pink-300 pl-2">
                    김도이 언니에게 답장
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
                <span className={`text-xs mt-1 block ${
                  msg.senderId === "1" ? "text-pink-100" : "text-pink-500"
                }`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 메시지 입력 */}
        <div className="p-4 border-t border-pink-200 bg-pink-100">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2 text-pink-700 hover:bg-pink-200">
              <Smile className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-pink-700 hover:bg-pink-200">
              <Calendar className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-pink-700 hover:bg-pink-200">
              <Clock className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-pink-700 hover:bg-pink-200">
              <Folder className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-pink-700 hover:bg-pink-200">
              <Plus className="w-5 h-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지 입력"
              className="flex-1 border-pink-300 focus:border-pink-500 focus:ring-pink-500"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-pink-500 hover:bg-pink-600 text-white"
            >
              전송
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
