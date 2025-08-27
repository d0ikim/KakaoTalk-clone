"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUser } from "@/mock";
import MobileLayout from "@/components/layout/MobileLayout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
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
        
        
        {/* TALK 로고 */}
        <div className="w-24 h-24 bg-pink-300 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
          <span className="text-2xl font-bold text-white">TALK</span>
        </div>

        {/* 로그인 폼 */}
        <div className="w-80 space-y-4">
          {/* 카카오계정 입력 */}
          <div className="space-y-2">
            
            <Input
              type="email"
              placeholder="이메일 또는 전화번호를 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-white border-pink-300 focus:border-pink-500 focus:ring-pink-500 text-pink-900 placeholder-pink-600 h-12"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="space-y-2">
            
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-white border-pink-300 focus:border-pink-500 focus:ring-pink-500 text-pink-900 placeholder-pink-600 h-12"
            />
          </div>

          {/* 로그인 버튼 */}
          <Button
            onClick={handleLogin}
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-medium h-12 text-base"
          >
            로그인
          </Button>


          {/* 하단 링크들 */}
          <div className="flex items-center justify-center space-x-4 mt-8 text-sm">
            <button className="text-pink-700 hover:text-pink-900">
              카카오계정 찾기
            </button>
            <div className="w-px h-4 bg-pink-300"></div>
            <button className="text-pink-700 hover:text-pink-900">
              비밀번호 재설정
            </button>
          </div>

          {/* 테스트 계정 정보 */}
          <div className="text-center mt-6 p-3 bg-pink-50 rounded-lg">
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
