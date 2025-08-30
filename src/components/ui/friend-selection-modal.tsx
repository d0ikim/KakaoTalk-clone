"use client";
import React, { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockFriendsList } from "@/mock/data";
import { MockFriend } from "@/mock/types";

interface FriendSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (friend: MockFriend) => void;
}

export default function FriendSelectionModal({
  isOpen,
  onClose,
  onStartChat,
}: FriendSelectionModalProps) {
  const [selectedFriends, setSelectedFriends] = useState<Set<string>>(new Set());

  const handleFriendToggle = (friendId: string) => {
    const newSelected = new Set(selectedFriends);
    if (newSelected.has(friendId)) {
      newSelected.delete(friendId);
    } else {
      newSelected.add(friendId);
    }
    setSelectedFriends(newSelected);
  };

  const handleStartChat = () => {
    if (selectedFriends.size === 1) {
      // 1:1 채팅
      const friendId = Array.from(selectedFriends)[0];
      const friend = mockFriendsList.find(f => f.id === friendId);
      if (friend) {
        onStartChat(friend);
      }
    } else if (selectedFriends.size > 1) {
      // 그룹 채팅 (현재는 1:1만 지원)
      const friendId = Array.from(selectedFriends)[0];
      const friend = mockFriendsList.find(f => f.id === friendId);
      if (friend) {
        onStartChat(friend);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-xl shadow-2xl w-80 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">새 채팅</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">
              채팅할 친구를 선택하세요
            </p>
            <div className="text-xs text-gray-500">
              선택된 친구: {selectedFriends.size}명
            </div>
          </div>

          {/* Friends List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {mockFriendsList.map((friend) => (
              <div
                key={friend.id}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors border ${
                  selectedFriends.has(friend.id)
                    ? "bg-pink-50 border-pink-200"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => handleFriendToggle(friend.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedFriends.has(friend.id)}
                  onChange={() => handleFriendToggle(friend.id)}
                  className="w-4 h-4 text-pink-600 border-pink-300 rounded focus:ring-pink-500"
                />
                <Avatar className="h-10 w-10">
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback className="bg-pink-200 text-pink-700 text-sm">
                    {friend.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {friend.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {friend.statusMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <Button
            onClick={handleStartChat}
            disabled={selectedFriends.size === 0}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            채팅 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
