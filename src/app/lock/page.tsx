"use client";
import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, QrCode, Eye, EyeOff } from "lucide-react";
import { mockUser } from "@/mock";
import MobileLayout from "@/components/layout/MobileLayout";

export default function LockPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLocked, setUser, setCurrentPage } = useStore();

  const handleLogin = () => {
    if (email && password) {
      setUser(mockUser);
      setIsLocked(false);
      setCurrentPage("chat");
    }
  };

  return (
    <MobileLayout showLeftNav={false}>
      <div className="h-full bg-gradient-to-br from-[#0f172a] to-[rgb(20,29,44)] flex flex-col items-center justify-center p-4 sm:p-6">
        {/* TALK 로고 */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-700 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-50">TALK</h1>
        </div>

        {/* 로그인 폼 */}
        <div className="w-full max-w-xs sm:max-w-sm space-y-3 sm:space-y-4">
          <Input
            type="email"
            placeholder="카카오계정 (이메일 또는 전화번호)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border-0 rounded-lg h-9 sm:h-11 text-gray-800 placeholder-gray-500 text-xs sm:text-sm"
          />

          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border-0 rounded-lg h-9 sm:h-11 text-gray-800 placeholder-gray-500 text-xs sm:text-sm"
          />

          <Button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg h-9 sm:h-11 text-sm sm:text-base font-medium"
          >
            로그인
          </Button>

          <div className="text-center text-gray-700 text-xs sm:text-sm">
            또는
          </div>

          <Button
            variant="outline"
            className="w-full bg-white border-indigo-300 text-indigo-700 hover:bg-gray-50 rounded-lg h-9 sm:h-11 text-xs sm:text-sm"
          >
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            QR코드 로그인
          </Button>

          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-700">
            <input
              type="checkbox"
              id="autoLogin"
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            <label htmlFor="autoLogin">자동 로그인</label>
          </div>
        </div>

        {/* 하단 링크 */}
        <div className="mt-6 sm:mt-8 flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-indigo-700">
          <button className="hover:underline">카카오계정 찾기</button>
          <div className="w-px h-3 sm:h-4 bg-gray-400"></div>
          <button className="hover:underline">비밀번호 재설정</button>
        </div>
      </div>
    </MobileLayout>
  );
}
