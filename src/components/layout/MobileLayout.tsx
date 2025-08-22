"use client";
import React from "react";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { Settings, User, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  showLeftNav?: boolean;
}

export default function MobileLayout({
  children,
  showLeftNav = true,
}: MobileLayoutProps) {
  const { setCurrentPage, setIsLocked } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    setIsLocked(true);
    setCurrentPage("lock");
  };

  const handleLockMode = () => {
    setIsLocked(true);
  };

  const handleUserClick = () => {
    router.push("/friends");
  };

  const handleChatsClick = () => {
    router.push("/chats");
  };

  const handleSettingsClick = () => {
    router.push("/settings");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-2 sm:p-4">
      {/* 모바일 폰 프레임 */}
      <div className="w-full max-w-2xl h-[calc(100vh-0.25rem)] sm:w-[32rem] sm:h-[900px] bg-black rounded-[2.5rem] sm:rounded-[3.5rem] p-2 sm:p-3 shadow-2xl">
        {/* 폰 내부 화면 */}
        <div className="w-full h-full bg-white rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative">
          {/* 상단 상태바 */}
          <div className="h-7 sm:h-8 bg-black rounded-t-[2rem] sm:rounded-t-[3rem] flex items-center justify-between px-5 sm:px-7 text-white text-xs sm:text-sm">
            <span>2:09</span>
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-white rounded-full"></div>
              <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-white rounded-full"></div>
              <div className="w-3 h-1.5 sm:w-4 sm:h-2 bg-white rounded-full"></div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              <div className="w-4 h-2 sm:w-5 sm:h-2.5 bg-white rounded-sm"></div>
              <span>98</span>
            </div>
          </div>

          {/* 메인 컨텐츠 영역 */}
          <div className="flex h-[calc(100%-1.75rem)] sm:h-[calc(100%-2rem)]">
            {/* 좌측 네비게이션 */}
            {showLeftNav && (
              <div className="w-16 sm:w-20 bg-gray-50 flex flex-col items-center py-4 sm:py-5 space-y-5 sm:space-y-7">
                {/* 프로필 아이콘 */}
                <button
                  onClick={handleUserClick}
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                >
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>

                {/* 채팅 아이콘 (알림 배지 포함) */}
                <button
                  onClick={handleChatsClick}
                  className="relative w-6 h-6 sm:w-7 sm:h-7 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-bold">
                      493
                    </span>
                  </div>
                </button>

                {/* 더보기 아이콘 */}
                <button
                  onClick={handleSettingsClick}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex flex-col items-center justify-center space-y-0.5 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                >
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                </button>

                {/* 설정 아이콘 */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 w-6 h-6 sm:w-7 sm:h-7"
                    >
                      <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 sm:w-48">
                    <DropdownMenuItem onClick={handleLockMode}>
                      잠금모드
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* 메인 컨텐츠 */}
            <div className="flex-1 bg-white overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
