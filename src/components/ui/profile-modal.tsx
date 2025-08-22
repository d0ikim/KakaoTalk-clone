"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Settings as SettingsIcon,
  MessageCircle,
  Edit3,
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MockFriend } from "@/mock/types";
import { DEFAULT_AVATAR, DEFAULT_BACKGROUND } from "@/mock/data";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile:
    | MockFriend
    | { id: string; name: string; avatar?: string; status?: string };
  isMyProfile: boolean;
}

export default function ProfileModal({
  isOpen,
  onClose,
  profile,
  isMyProfile,
}: ProfileModalProps) {
  const router = useRouter();

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleStartChat = () => {
    if (isMyProfile) {
      router.push("/chats");
    } else {
      router.push(`/chats/${profile.id}`);
    }
    onClose();
  };

  const handleEditProfile = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - 클릭 시 모달이 닫히도록 함 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal - 전체 화면을 꽉 채움 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 z-50 w-full h-full rounded-none shadow-2xl overflow-hidden"
      >
        {/* Background */}
        <div className="relative w-full h-full">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="Background"
              className="w-full h-full object-cover"
              onError={(e) => {
                // 프로필 이미지 로드 실패 시 기본 배경으로 fallback
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : (
            // 기본 배경 이미지 - 모든 사용자에게 동일하게 표시
            <img
              src={DEFAULT_BACKGROUND}
              alt="Default Background"
              className="w-full h-full object-cover"
              onError={(e) => {
                // 기본 이미지도 로드 실패 시 그라데이션 배경 표시
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
          )}
          {/* 기본 그라데이션 배경 (이미지 로드 실패 시 대체) */}
          <div
            className={`w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 ${
              profile.avatar ? "hidden" : ""
            }`}
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </div>

        {/* Close Button - X 버튼 클릭 시 모달이 닫히도록 수정 */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-50 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer"
        >
          <X className="text-white w-4 h-4" />
        </button>

        {/* Top Icons */}
        <div className="absolute top-4 right-4 z-50 flex space-x-2">
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-all">
            <SettingsIcon className="w-4 h-4" />
          </div>
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-all">
            <MessageCircle className="w-4 h-4" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-30">
          <Avatar className="w-24 h-24 border-4 border-white">
            <AvatarImage
              src={profile.avatar || DEFAULT_AVATAR}
              onError={(e) => {
                // 아바타 이미지 로드 실패 시 AvatarFallback 사용
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            <AvatarFallback className="text-3xl font-bold bg-white text-gray-600">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold drop-shadow-lg">
            {profile.name}
          </h2>
        </div>

        {/* Bottom Buttons */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex items-center justify-center space-x-4">
          <Button
            onClick={handleStartChat}
            className="w-32 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex flex-col items-center justify-center transition-colors cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">나와의 채팅</span>
          </Button>
          {isMyProfile && (
            <Button
              onClick={handleEditProfile}
              className="w-32 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex flex-col items-center justify-center transition-colors cursor-pointer"
            >
              <Edit3 className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">프로필 편집</span>
            </Button>
          )}
        </div>
      </motion.div>
    </>
  );
}
