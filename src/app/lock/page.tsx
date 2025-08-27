"use client";
import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUser } from "@/mock";
import MobileLayout from "@/components/layout/MobileLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function LockPage() {
  const [password, setPassword] = useState("");
  const { setIsLocked, setUser, setCurrentPage } = useStore();
  const router = useRouter();

  const handleUnlock = () => {
    if (password === "1234") { // 간단한 비밀번호 체크 (실제로는 더 안전한 방식 사용)
      setIsLocked(false);
      setCurrentPage("chats");
      router.push("/chats");
    } else {
      alert("비밀번호가 올바르지 않습니다.");
      setPassword("");
    }
  };

  const handleSwitchUser = () => {
    // 다른 사용자로 전환 (로그아웃)
    setUser(null);
    setIsLocked(false);
    setCurrentPage("login");
    // 메인 페이지로 이동
    window.location.href = "/";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  return (
    <MobileLayout showLeftNav={false}>
      <div className="h-full w-full bg-gradient-to-br from-pink-50 to-pink-100 flex flex-col items-center justify-center relative overflow-hidden">
        {/* 배경 이미지 (흐릿한 야외 풍경) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-200 to-blue-300 opacity-30"></div>
        
        
        
        {/* 중앙의 핑크색 앱 화면 */}
        <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 p-6 shadow-2xl relative z-10 flex flex-col items-center justify-center">
          {/* 프로필 사진 (중앙 상단) */}
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-40 h-40 mb-4 shadow-lg">
              <AvatarImage src={mockUser.avatar} />
              <AvatarFallback className="text-2xl font-bold bg-pink-400 text-white">
                {mockUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* 이메일 주소 */}
          <div className="text-center mb-4">
            <p className="text-sm text-pink-900 font-medium">
              {mockUser.email.replace(/(.{2}).*@/, "$1***********@")}
            </p>
          </div>

          {/* 상태 메시지 */}
          <div className="text-center mb-6">
            <p className="text-sm text-pink-900">
              잠금모드 상태입니다.
            </p>
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="mb-4 w-80">
            <div className="bg-white rounded-lg p-2 border border-pink-200">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-3">비밀번호</span>
                <Input
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent border-none text-pink-900 placeholder-transparent focus:ring-0 focus:border-none"
                />
              </div>
            </div>
          </div>

          {/* 확인 버튼 */}
          <div className="mb-6 w-80">
            <div className="bg-white rounded-lg p-3 border border-pink-200 cursor-pointer hover:bg-pink-50 transition-colors">
              <button
                onClick={handleUnlock}
                className="w-full text-center text-sm text-gray-600 font-medium"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
