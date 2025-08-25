"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUser } from "@/mock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileLayout from "@/components/layout/MobileLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (email === mockUser.email && password === "1234") {
      // 로그인 성공 시 채팅 리스트 페이지로 이동
      router.push("/chats");
    } else {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <MobileLayout showLeftNav={false}>
      <div className="h-full bg-gradient-to-br from-pink-50 to-pink-100 flex flex-col items-center justify-center p-4">
        {/* 로그인 제목 */}
        <h1 className="text-3xl font-bold text-pink-900 mb-8">로그인</h1>
        
        {/* 모바일 디바이스 모양의 로그인 화면 */}
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
              {mockUser.name}
            </p>
          </div>

          {/* 로그인 폼 */}
          <div className="space-y-4">
            {/* 이메일 입력 */}
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-white border-pink-300 focus:border-pink-500 focus:ring-pink-500 text-center text-pink-900 placeholder-pink-600"
            />

            {/* 비밀번호 입력 */}
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-white border-pink-300 focus:border-pink-500 focus:ring-pink-500 text-center text-pink-900 placeholder-pink-600"
            />

            {/* 로그인 버튼 */}
            <Button
              onClick={handleLogin}
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-medium"
            >
              로그인
            </Button>
          </div>

          {/* 도움말 */}
          <div className="text-center mt-4">
            <p className="text-xs text-pink-700">
              테스트 계정: {mockUser.email}<br/>
              비밀번호: 1234
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
