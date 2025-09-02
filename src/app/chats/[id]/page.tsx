"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MobileLayout from "@/components/layout/MobileLayout";
import ChatHeader from "@/components/chat/ChatHeader";
import Message from "@/components/chat/Message";
import MessageInput from "@/components/chat/MessageInput";
import { mockFriends } from "@/mock";

// Mock 메시지 데이터
const mockMessages = [
  {
    id: 1,
    senderId: "user1",
    senderName: "아름",
    content: "안녕하세요! 오늘 날씨가 정말 좋네요 😊",
    timestamp: "오후 2:30",
    isOwn: true,
  },
  {
    id: 2,
    senderId: "friend1",
    senderName: "김철수",
    content: "네, 정말 좋은 날씨예요! 산책하기 딱이에요",
    timestamp: "오후 2:32",
    isOwn: false,
  },
  {
    id: 3,
    senderId: "user1",
    senderName: "아름",
    content: "맞아요! 저녁에 뭐 먹을까요?",
    timestamp: "오후 2:35",
    isOwn: true,
  },
  {
    id: 4,
    senderId: "friend1",
    senderName: "김철수",
    content: "피자 어때요? 오늘은 피자가 땡기네요 🍕",
    timestamp: "오후 2:37",
    isOwn: false,
  },
  {
    id: 5,
    senderId: "user1",
    senderName: "아름",
    content: "좋은 아이디어네요! 피자 주문할까요?",
    timestamp: "오후 2:40",
    isOwn: true,
  },
];

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id as string;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 친구 정보 찾기
  const friend = mockFriends.find((f) => f.id === chatId);

  if (!friend) {
    return (
      <MobileLayout>
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">친구를 찾을 수 없습니다.</p>
        </div>
      </MobileLayout>
    );
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: "user1",
        senderName: "아름",
        content: message.trim(),
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        isOwn: true,
      };

      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleSearchToggle = (show: boolean) => {
    setShowSearch(show);
    if (!show) {
      setSearchQuery("");
    }
  };

  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => router.back();
  const handleDetails = () => router.push(`/chats/${chatId}/details`);

  return (
    <MobileLayout showLeftNav={false}>
      <div className="h-full bg-pink-50 flex flex-col">
        {/* Header */}
        <ChatHeader
          friend={friend}
          onBack={handleBack}
          onDetails={handleDetails}
          onSearchToggle={handleSearchToggle}
          showSearch={showSearch}
        />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(searchQuery ? filteredMessages : messages).map((msg) => (
            <Message key={msg.id} message={msg} friendAvatar={friend.avatar} />
          ))}
        </div>

        {/* Input Area */}
        <MessageInput
          message={message}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
        />
      </div>
    </MobileLayout>
  );
}
