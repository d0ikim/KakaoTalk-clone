"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Edit3, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Friend } from "@/store/useStore";

interface FullscreenProfileModalProps {
  friend: Friend | null;
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (friend: Friend) => void;
  onEditProfile: (friend: Friend) => void;
}

export default function FullscreenProfileModal({
  friend,
  isOpen,
  onClose,
  onStartChat,
  onEditProfile,
}: FullscreenProfileModalProps) {
  if (!friend) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-white"
        >
          {/* Header */}
          <div className="relative h-1/2 bg-gradient-to-br from-blue-400 to-purple-500">
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="absolute top-12 right-6 z-10 w-10 h-10 bg-black bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Avatar className="w-32 h-32 border-6 border-white shadow-2xl">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback className="bg-white text-gray-600 text-4xl font-bold">
                  {friend.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            {/* Action Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-6 left-0 right-0 flex justify-center space-x-6"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30"
              >
                <Phone className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30"
              >
                <Video className="w-6 h-6" />
              </Button>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="relative h-1/2 p-6"
          >
            {/* Profile Info */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {friend.name}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {friend.statusMessage || "상태 메시지가 없습니다."}
              </p>

              {/* Online Status */}
              <div className="flex items-center justify-center">
                <div
                  className={`w-4 h-4 rounded-full mr-2 ${
                    friend.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <span className="text-base text-gray-500">
                  {friend.isOnline ? "온라인" : "오프라인"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={() => onStartChat(friend)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white h-14 text-lg font-medium rounded-xl"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                나와의 채팅
              </Button>

              <Button
                onClick={() => onEditProfile(friend)}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-14 text-lg font-medium rounded-xl"
              >
                <Edit3 className="w-6 h-6 mr-3" />
                프로필 편집
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
