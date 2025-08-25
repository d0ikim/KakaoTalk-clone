"use client";
import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  User,
  Bell,
  Monitor,
  Users,
  Eye,
  EyeOff,
  Shield,
  Trash2,
  Settings,
  Palette,
  Type,
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<
    "account" | "notifications" | "friends" | "display"
  >("account");

  // 계정 탭 상태
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [allowIdSearch, setAllowIdSearch] = useState(true);

  // 비밀번호 유효성 검사
  const validatePassword = () => {
    if (newPassword.length < 6) {
      setPasswordError("비밀번호는 최소 6자 이상이어야 합니다");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = () => {
    if (validatePassword()) {
      console.log("비밀번호 변경:", newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
      alert("비밀번호가 변경되었습니다");
    }
  };

  // 알림창 탭 상태
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationFormat, setNotificationFormat] = useState<
    "sender+message" | "sender"
  >("sender+message");

  // 친구 탭 상태
  const [hiddenFriends] = useState([
    { id: 1, name: "김철수", reason: "숨김" },
    { id: 2, name: "이영희", reason: "숨김" },
  ]);
  const [blockedFriends] = useState([
    { id: 3, name: "박민수", reason: "차단" },
  ]);

  // 화면 탭 상태
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium"
  );

  const tabs = [
    { id: "account", label: "계정", icon: User },
    { id: "notifications", label: "알림창", icon: Bell },
    { id: "friends", label: "친구", icon: Users },
    { id: "display", label: "화면", icon: Monitor },
  ];

  // 계정 탭 렌더링
  const renderAccountSection = () => (
    <div className="space-y-6">
      {/* 기본 프로필 표시 */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">기본 프로필</h3>
        <div className="space-y-3">
          <div className="bg-muted rounded-lg p-4">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              이메일
            </label>
            <p className="text-sm text-foreground">
              {user?.email || "ahreum01060106@gmail.com"}
            </p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              ID
            </label>
            <p className="text-sm text-foreground">{user?.id || "papok0106"}</p>
          </div>
        </div>
      </div>

      {/* 비밀번호 변경 */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">비밀번호 변경</h3>
        <div className="space-y-3">
          <div className="relative">
            <label className="block text-xs font-medium text-foreground mb-1">
              새 비밀번호
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              className="w-full pr-10 text-sm"
              placeholder="새 비밀번호를 입력하세요"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">
              새 비밀번호 확인
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              className="w-full text-sm"
              placeholder="새 비밀번호를 다시 입력하세요"
            />
          </div>

          {passwordError && (
            <p className="text-xs text-red-600">{passwordError}</p>
          )}

          <Button
            onClick={handlePasswordChange}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
            disabled={!newPassword || !confirmPassword}
          >
            비밀번호 변경
          </Button>
        </div>
      </div>

      {/* ID 검색 허용 */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">개인정보 설정</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">ID 검색 허용</p>
            <p className="text-xs text-muted-foreground">
              다른 사용자가 ID로 검색할 수 있습니다
            </p>
          </div>
          <button
            onClick={() => setAllowIdSearch(!allowIdSearch)}
            className={`w-12 h-6 rounded-full transition-colors ${
              allowIdSearch ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                allowIdSearch ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 회원 탈퇴 */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">계정 관리</h3>
        <Button
          variant="outline"
          className="w-full border-red-300 text-red-600 hover:bg-red-50 text-sm"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          회원 탈퇴
        </Button>
      </div>
    </div>
  );

  // 알림창 탭 렌더링
  const renderNotificationsSection = () => (
    <div className="space-y-6">
      {/* 상단 알림 내용 On/Off */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">알림 설정</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-900">알림창 표시</p>
            <p className="text-xs text-gray-600">
              새 메시지가 올 때 알림창을 표시합니다
            </p>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-12 h-6 rounded-full transition-colors ${
              notificationsEnabled ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                notificationsEnabled ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 알림창 형식 선택 */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">알림창 형식</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="notificationFormat"
              value="sender+message"
              checked={notificationFormat === "sender+message"}
              onChange={(e) =>
                setNotificationFormat(
                  e.target.value as "sender+message" | "sender"
                )
              }
              className="w-4 h-4 text-blue-600"
            />
            <div>
              <p className="text-sm text-gray-900">보낸사람 + 메시지</p>
              <p className="text-xs text-gray-600">
                보낸사람과 메시지 내용을 모두 표시
              </p>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="notificationFormat"
              value="sender"
              checked={notificationFormat === "sender"}
              onChange={(e) =>
                setNotificationFormat(
                  e.target.value as "sender+message" | "sender"
                )
              }
              className="w-4 h-4 text-blue-600"
            />
            <div>
              <p className="text-sm text-gray-900">보낸사람만</p>
              <p className="text-xs text-gray-600">보낸사람 이름만 표시</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  // 친구 탭 렌더링
  const renderFriendsSection = () => (
    <div className="space-y-6">
      {/* 숨김 친구 목록 */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">
          숨김 친구 목록
        </h3>
        <div className="space-y-2">
          {hiddenFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {friend.name}
                  </p>
                  <p className="text-xs text-gray-600">{friend.reason}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-300 text-xs"
              >
                숨김 해제
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* 차단 친구 목록 */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">
          차단 친구 목록
        </h3>
        <div className="space-y-2">
          {blockedFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {friend.name}
                  </p>
                  <p className="text-xs text-gray-600">{friend.reason}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 text-xs"
              >
                차단 해제
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 화면 탭 렌더링
  const renderDisplaySection = () => (
    <div className="space-y-6">
      {/* 다크 모드 On/Off */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">테마 설정</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-900">다크 모드</p>
            <p className="text-xs text-gray-600">어두운 테마를 사용합니다</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-colors ${
              darkMode ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                darkMode ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 채팅창 배경화면 변경 */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">
          채팅창 배경화면
        </h3>
        <div className="space-y-3">
          <p className="text-xs text-gray-600">
            채팅방에 적용할 배경화면을 선택합니다
          </p>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 text-sm"
          >
            <Palette className="w-4 h-4 mr-2" />
            배경화면 선택
          </Button>
          <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-xs text-gray-500">배경화면 미리보기</span>
          </div>
        </div>
      </div>

      {/* 폰트 설정 */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">폰트 설정</h3>
        <div className="space-y-3">
          <p className="text-xs text-gray-600">
            앱 전체의 폰트 크기를 설정합니다
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={fontSize === "small" ? "default" : "outline"}
              onClick={() => setFontSize("small")}
              className={`text-xs ${fontSize === "small" ? "bg-blue-500" : ""}`}
            >
              작게
            </Button>
            <Button
              variant={fontSize === "medium" ? "default" : "outline"}
              onClick={() => setFontSize("medium")}
              className={`text-xs ${
                fontSize === "medium" ? "bg-blue-500" : ""
              }`}
            >
              보통
            </Button>
            <Button
              variant={fontSize === "large" ? "default" : "outline"}
              onClick={() => setFontSize("large")}
              className={`text-xs ${fontSize === "large" ? "bg-blue-500" : ""}`}
            >
              크게
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MobileLayout>
      <div className="h-full bg-background">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border bg-card">
          <h1 className="text-lg font-bold text-foreground text-center">설정</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | "account"
                      | "notifications"
                      | "friends"
                      | "display"
                  )
                }
                className={`flex-1 flex flex-col items-center py-2 px-2 transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-120px)]">
          {activeTab === "account" && renderAccountSection()}
          {activeTab === "notifications" && renderNotificationsSection()}
          {activeTab === "friends" && renderFriendsSection()}
          {activeTab === "display" && renderDisplaySection()}
        </div>
      </div>
    </MobileLayout>
  );
}
