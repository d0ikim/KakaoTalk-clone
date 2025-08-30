"use client";
import React, { useState, useEffect } from "react";
import { X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFriendModal({
  isOpen,
  onClose,
}: AddFriendModalProps) {
  const [activeTab, setActiveTab] = useState<"contact" | "id">("contact");
  const [friendName, setFriendName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [countryCode, setCountryCode] = useState("+82");

  // ESC 키 이벤트 처리
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

  const handleAddFriend = () => {
    if (activeTab === "contact" && friendName.trim() && phone.trim()) {
      console.log("연락처로 친구 추가:", { friendName, countryCode, phone });
    } else if (activeTab === "id" && id.trim()) {
      console.log("ID로 친구 추가:", id);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop - 블러 효과 제거 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />

      {/* Modal - 크기 줄임 */}
      <div
        className="relative bg-white rounded-xl shadow-2xl w-72 max-h-[70vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">친구 추가</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex-1 py-2 px-3 text-xs font-medium transition-colors ${
              activeTab === "contact"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            연락처
          </button>
          <button
            onClick={() => setActiveTab("id")}
            className={`flex-1 py-2 px-3 text-xs font-medium transition-colors ${
              activeTab === "id"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            ID
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          {activeTab === "contact" ? (
            <div className="space-y-3">
              {/* Friend Name Input */}
              <div>
                <Input
                  type="text"
                  placeholder="친구 이름"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  className="border-0 border-b border-black rounded-none px-0 py-2 text-xs focus:ring-0 focus:border-black"
                />
              </div>

              {/* Phone Number Input with Country Code */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-2 py-1 pr-6 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="+82">+82</option>
                    <option value="+1">+1</option>
                    <option value="+81">+81</option>
                    <option value="+86">+86</option>
                  </select>
                  <Globe className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
                <Input
                  type="tel"
                  placeholder="전화번호"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 border-0 border-b border-black rounded-none px-0 py-2 text-xs focus:ring-0 focus:border-black"
                />
              </div>

              {/* Instruction Text */}
              <p className="text-xs text-gray-500 mt-3">
                친구의 이름과 전화번호를 입력해주세요.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Input
                  type="text"
                  placeholder="친구 ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="border-0 border-b border-black rounded-none px-0 py-2 text-xs focus:ring-0 focus:border-black"
                />
              </div>
              <p className="text-xs text-gray-500 mt-3">
                친구의 ID를 입력해주세요.
              </p>
            </div>
          )}

          {/* Add Button */}
          <Button
            onClick={handleAddFriend}
            className="w-full mt-4 bg-pink-400 hover:bg-pink-500 text-white rounded-lg py-2 text-xs font-medium"
          >
            추가
          </Button>
        </div>
      </div>
    </div>
  );
}
