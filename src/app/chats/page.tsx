"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MobileLayout from "@/components/layout/MobileLayout";
import ChatListHeader from "@/components/chat/ChatListHeader";
import SearchBar from "@/components/chat/SearchBar";
import ChatItem from "@/components/chat/ChatItem";
import { mockFriends } from "@/mock";

// Mock 채팅 데이터 생성
const mockChats = mockFriends.map((friend, index) => ({
  id: friend.id,
  name: friend.name,
  avatar: friend.avatar,
  lastMessage: [
    "안녕하세요!",
    "오늘 날씨가 좋네요",
    "저녁에 뭐 먹을까요?",
    "영화 보러 갈까요?",
    "주말에 만나요!",
  ][index % 5],
  timestamp: ["오후 2:30", "오후 1:15", "오전 11:45", "어제", "2일 전"][
    index % 5
  ],
  unreadCount: Math.floor(Math.random() * 5) + 1,
  isOnline: friend.isOnline || false,
}));

export default function ChatsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (chatId: string) => {
    router.push(`/chats/${chatId}`);
  };

  const handleToggleSearch = () => setShowSearch(!showSearch);

  return (
    <MobileLayout>
      <div className="h-full bg-white flex flex-col">
        {/* Header */}
        <ChatListHeader
          showSearch={showSearch}
          onToggleSearch={handleToggleSearch}
        />

        {/* Search Bar */}
        {showSearch && (
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              onClick={() => handleChatClick(chat.id)}
            />
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
