"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Friend } from "@/store/useStore";

interface FriendProfileModalProps {
  friend: Friend | null;
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (friend: Friend) => void;
  onEditProfile: (friend: Friend) => void;
}

export default function FriendProfileModal({
  friend,
  isOpen,
  onClose,
  onStartChat,
  onEditProfile,
}: FriendProfileModalProps) {
  if (!friend) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-8 h-8 bg-black bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Profile Image */}
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback className="bg-white text-gray-600 text-2xl font-bold">
                        {friend.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name and Status */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {friend.name}
                  </h2>
                  <p className="text-gray-600">
                    {friend.statusMessage || "상태 메시지가 없습니다."}
                  </p>

                  {/* Online Status */}
                  <div className="flex items-center justify-center mt-3">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        friend.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    <span className="text-sm text-gray-500">
                      {friend.isOnline ? "온라인" : "오프라인"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => onStartChat(friend)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    나와의 채팅
                  </Button>

                  <Button
                    onClick={() => onEditProfile(friend)}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12 text-base"
                  >
                    <Edit3 className="w-5 h-5 mr-2" />
                    프로필 편집
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
