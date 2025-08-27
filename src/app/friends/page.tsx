"use client";

import React, { useState } from "react";
import {
  Search,
  UserPlus,
  Heart,
  Calendar,
  Star,
  Users,
  X,
  ChevronRight,
  Gift,
} from "lucide-react";

import { mockUser, mockFriendsList, mockFavoriteFriends } from "@/mock/data";
import { MockFriend } from "@/mock/types";
import MobileLayout from "@/components/layout/MobileLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileModal from "@/components/ui/profile-modal";
import AddFriendModal from "@/components/ui/add-friend-modal";
import SearchBar from "@/components/ui/search-bar";
import { AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setSearchBar] = useState(false);
  const [showFavorites, setShowFavorites] = useState(true);
  const [showBirthdayFriends, setShowBirthdayFriends] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<
    MockFriend | typeof mockUser | null
  >(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [isMyProfileModalOpen, setIsMyProfileModalOpen] = useState(false);
  const { setIsLocked } = useStore();
  const router = useRouter();

  const filteredFriends = mockFriendsList.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const today = new Date();
  const birthdayFriends = mockFriendsList.filter((friend) => {
    if (!friend.birthday) return false;
    const birthday = new Date(friend.birthday);
    return (
      birthday.getMonth() === today.getMonth() &&
      birthday.getDate() === today.getDate()
    );
  });

  // 테스트용: 모든 친구를 생일인 친구로 표시
  const testBirthdayFriends = mockFriendsList.slice(0, 3);

  const openProfileModal = (
    profile: MockFriend | typeof mockUser,
    isMyProfile: boolean = false
  ) => {
    setSelectedProfile(profile);
    if (isMyProfile) {
      setIsMyProfileModalOpen(true);
    } else {
      setIsProfileModalOpen(true);
    }
  };

  const openAddFriendModal = () => {
    setIsAddFriendModalOpen(true);
  };

  const toggleSearchBar = () => {
    setSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchQuery("");
    }
  };

  const handleLockMode = () => {
    setIsLocked(true);
    router.push("/lock");
  };

  const isAnyModalOpen =
    isProfileModalOpen || isMyProfileModalOpen || isAddFriendModalOpen;

  return (
    <MobileLayout showLeftNav={!isAnyModalOpen}>
      <div className="h-full flex flex-col bg-pink-50 relative">
        <div className="flex items-center justify-between p-3 border-b border-pink-200 bg-pink-100">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-pink-900">친구</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="p-1.5 text-pink-700 hover:bg-pink-200 rounded-lg transition-colors"
              onClick={toggleSearchBar}
            >
              {showSearchBar ? (
                <X className="w-4 h-4" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={openAddFriendModal}
              className="p-1.5 text-pink-700 hover:bg-pink-200 rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearchBar && (
            <SearchBar
              isOpen={showSearchBar}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="친구 검색"
            />
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto">
          <div className="p-3 border-b border-pink-200 bg-white">
            <div
              className="flex items-center space-x-3 p-2.5 hover:bg-pink-100 rounded-lg cursor-pointer transition-colors"
              onClick={() => openProfileModal(mockUser, true)}
            >
              <Avatar className="h-11 w-11">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback className="bg-pink-200 text-pink-700 text-sm">
                  {mockUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">
                  {mockUser.name}
                </h4>
                <p className="text-xs text-gray-600">{mockUser.status}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-pink-600" />
                <ChevronRight className="w-3.5 h-3.5 text-pink-600" />
              </div>
            </div>
          </div>

          {/* 생일인 친구 섹션 */}
          {testBirthdayFriends.length > 0 && (
            <div className="border-b border-pink-200 bg-white">
              <button
                onClick={() => setShowBirthdayFriends(!showBirthdayFriends)}
                className="w-full p-3 flex items-center justify-between hover:bg-pink-50"
              >
                <div className="flex items-center space-x-2">
                  <Gift className="h-4 w-4 text-pink-500" />
                  <span className="font-medium text-gray-900 text-sm">
                    생일인 친구 {testBirthdayFriends.length}
                  </span>
                </div>
                <span className="text-pink-600 text-sm">
                  {showBirthdayFriends ? "▼" : "▶"}
                </span>
              </button>

              {showBirthdayFriends && (
                <div className="px-3 pb-3">
                  <div className="space-y-2">
                    {testBirthdayFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center space-x-3 p-2.5 hover:bg-pink-100 rounded-lg cursor-pointer transition-colors border border-pink-200"
                        onClick={() => openProfileModal(friend)}
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback className="bg-pink-200 text-pink-700 text-sm">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {friend.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {friend.statusMessage}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              friend.isOnline ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                          <Gift className="h-3.5 w-3.5 text-pink-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {mockFavoriteFriends.length > 0 && (
            <div className="border-b border-pink-200 bg-white">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="w-full p-3 flex items-center justify-between hover:bg-pink-50"
              >
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-gray-900 text-sm">
                    즐겨찾기 {mockFavoriteFriends.length}
                  </span>
                </div>
                <span className="text-pink-600 text-sm">
                  {showFavorites ? "▼" : "▶"}
                </span>
              </button>

              {showFavorites && (
                <div className="px-3 pb-3">
                  <div className="space-y-2">
                    {mockFavoriteFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center space-x-3 p-2.5 hover:bg-pink-100 rounded-lg cursor-pointer transition-colors border border-pink-200"
                        onClick={() => openProfileModal(friend)}
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback className="bg-pink-200 text-pink-700 text-sm">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {friend.name}
                        </h4>
                          <p className="text-xs text-gray-600">
                            {friend.statusMessage}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              friend.isOnline ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                          <Heart className="h-3.5 w-3.5 text-yellow-500 fill-current" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-3 bg-white">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="h-4 w-4 text-pink-600" />
              <h3 className="font-medium text-gray-900 text-sm">
                친구 {filteredFriends.length}명
              </h3>
            </div>

            {filteredFriends.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-pink-300" />
                <p className="text-sm">친구가 없습니다</p>
                <p className="text-xs">새로운 친구를 추가해보세요!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center space-x-3 p-2.5 hover:bg-pink-100 rounded-lg cursor-pointer transition-colors border border-pink-200"
                    onClick={() => openProfileModal(friend)}
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback className="bg-pink-100 text-pink-700 text-sm">
                        {friend.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {friend.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {friend.statusMessage}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          friend.isOnline ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-pink-200 bg-white">
            <div className="flex items-center space-x-3 p-2.5 hover:bg-pink-100 rounded-lg cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Ch</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">채널</h4>
                <p className="text-xs text-gray-600">300</p>
              </div>
            </div>
          </div>
        </div>

        {/* 프로필 모달들 */}
        <AnimatePresence>
          {selectedProfile && (
            <>
              <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                profile={selectedProfile}
                isMyProfile={false}
              />

              <ProfileModal
                isOpen={isMyProfileModalOpen}
                onClose={() => setIsMyProfileModalOpen(false)}
                profile={selectedProfile}
                isMyProfile={true}
              />
            </>
          )}
        </AnimatePresence>

        {/* 친구 추가 모달 */}
        <AnimatePresence>
          <AddFriendModal
            isOpen={isAddFriendModalOpen}
            onClose={() => setIsAddFriendModalOpen(false)}
          />
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
}
