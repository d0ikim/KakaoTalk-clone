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
      <div className="h-full bg-gradient-to-br from-pink-50 to-pink-100 flex flex-col items-center justify-center p-4">
        {/* 잠금 모드 제목 */}
        <h1 className="text-2xl font-bold text-pink-900 mb-8">잠금 모드</h1>
        
        {/* 모바일 디바이스 모양의 잠금 화면 */}
        <div className="w-80 h-96 bg-pink-200 rounded-3xl p-6 shadow-2xl border-4 border-pink-300 relative">
          {/* 윈도우 컨트롤 버튼들 */}
          <div className="flex space-x-2 mb-6">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>

          {/* 프로필 정보 */}
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-20 h-20 mb-4 border-4 border-white shadow-lg">
              <AvatarImage src={mockUser.avatar} />
              <AvatarFallback className="text-2xl font-bold bg-pink-300 text-white">
                {mockUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-pink-800 font-medium">
              {mockUser.email.replace(/(.{2}).*@/, "$1***********@")}
            </p>
          </div>

          {/* 잠금 모드 상태 */}
          <div className="text-center mb-6">
            <p className="text-lg font-bold text-pink-900">
              잠금모드 상태입니다.
            </p>
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-6">
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-white border-pink-300 focus:border-pink-500 focus:ring-pink-500 text-center text-pink-900 placeholder-pink-600"
            />
          </div>

          {/* 확인 버튼 */}
          <div className="mb-6">
            <Button
              onClick={handleUnlock}
              className="w-full bg-pink-300 hover:bg-pink-400 text-pink-900 border border-pink-400 font-medium"
            >
              확인
            </Button>
          </div>

          {/* 다른 사용자로 전환 */}
          <div className="text-center">
            <button
              onClick={handleSwitchUser}
              className="text-sm text-pink-700 hover:text-pink-900 underline"
            >
              다른 사용자로 전환
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
