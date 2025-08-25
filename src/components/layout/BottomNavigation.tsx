import React, { useState } from "react";
import { MessageCircle, Users, Settings, LogOut, Lock, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";

export const BottomNavigation: React.FC = () => {
  const { currentPage, setCurrentPage, logout, setIsLocked } = useStore();
  const [showOptions, setShowOptions] = useState(false);

  const navItems = [
    { id: "main", label: "채팅", icon: MessageCircle },
    { id: "friends", label: "친구", icon: Users },
    { id: "settings", label: "설정", icon: Settings },
  ];

  const handleSettingsClick = () => {
    if (currentPage === "settings") {
      setShowOptions(!showOptions);
    } else {
      setCurrentPage("settings");
    }
  };

  const handleLogout = () => {
    logout();
    setShowOptions(false);
  };

  const handleLockMode = () => {
    setIsLocked(true);
    setShowOptions(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center space-y-1 h-16 w-16 ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => {
                  if (item.id === "settings") {
                    handleSettingsClick();
                  } else {
                    setCurrentPage(item.id);
                    setShowOptions(false);
                  }
                }}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                <span className={`text-xs ${isActive ? "text-primary" : ""}`}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* 옵션 메뉴 */}
      {showOptions && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl p-6 pb-8">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">옵션</h3>
              <button
                onClick={() => setShowOptions(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* 옵션 목록 */}
            <div className="space-y-4">
              <button
                onClick={handleLockMode}
                className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-pink-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">잠금 모드</p>
                  <p className="text-xs text-gray-500">앱을 잠금 모드로 전환합니다</p>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">로그아웃</p>
                  <p className="text-xs text-gray-500">현재 계정에서 로그아웃합니다</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
