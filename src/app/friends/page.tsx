'use client'

import React, { useState, useEffect } from 'react'
import { Search, UserPlus, Heart, Calendar, Star, Users } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Friend } from '@/store/useStore'

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showBirthdayFriends, setShowBirthdayFriends] = useState(true)
  const [showFavorites, setShowFavorites] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { friends, setCurrentPage } = useStore()

  // Mock data for demonstration - 클라이언트에서만 실행
  useEffect(() => {
    setMounted(true)
    
    if (friends.length === 0) {
      const mockFriends: Friend[] = [
        {
          id: '2',
          name: '김도이',
          avatar: undefined,
          statusMessage: '프로젝트 진행 중',
          isOnline: true,
          isFavorite: true,
          isHidden: false,
          isBlocked: false,
          birthday: '1995-03-15'
        },
        {
          id: '3',
          name: '박재준',
          avatar: undefined,
          statusMessage: '열심히 공부 중',
          isOnline: false,
          isFavorite: true,
          isHidden: false,
          isBlocked: false,
          birthday: '1998-07-22'
        },
        {
          id: '4',
          name: '이미영',
          avatar: undefined,
          statusMessage: '여행 다녀왔어요',
          isOnline: true,
          isFavorite: false,
          isHidden: false,
          isBlocked: false,
          birthday: '1993-11-08'
        },
        {
          id: '5',
          name: '최준호',
          avatar: undefined,
          statusMessage: '운동하고 있어요',
          isOnline: false,
          isFavorite: false,
          isHidden: false,
          isBlocked: false,
          birthday: '1996-05-12'
        }
      ]

      useStore.getState().setFriends(mockFriends)
    }
  }, [friends.length])

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.statusMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const favoriteFriends = filteredFriends.filter(friend => friend.isFavorite)
  const birthdayFriends = filteredFriends.filter(friend => {
    if (!friend.birthday) return false
    const today = new Date()
    const birthday = new Date(friend.birthday)
    return birthday.getMonth() === today.getMonth() && birthday.getDate() === today.getDate()
  })

  const regularFriends = filteredFriends.filter(friend => 
    !friend.isFavorite && !friend.isHidden && !friend.isBlocked
  )

  const handleAddFriend = () => {
    // Add friend logic
    alert('친구 추가 기능은 준비 중입니다.')
  }

  const handleFriendClick = (friend: Friend) => {
    // Navigate to friend profile or start chat
    setCurrentPage('chat')
  }

  const toggleFavorite = (friendId: string) => {
    useStore.getState().updateFriend(friendId, { 
      isFavorite: !friends.find(f => f.id === friendId)?.isFavorite 
    })
  }

  // 마운트되지 않았으면 null 반환
  if (!mounted) {
    return null
  }

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Search and Add Friend */}
        <div className="p-4 border-b border-border">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="친구 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
            <Button
              onClick={handleAddFriend}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              친구 추가
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Birthday Friends */}
          {birthdayFriends.length > 0 && (
            <div className="border-b border-gray-100">
              <button
                onClick={() => setShowBirthdayFriends(!showBirthdayFriends)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-pink-500" />
                  <span className="font-medium text-gray-900">
                    생일인 친구 {birthdayFriends.length}명
                  </span>
                </div>
                <span className="text-gray-400">
                  {showBirthdayFriends ? '▼' : '▶'}
                </span>
              </button>
              
              {showBirthdayFriends && (
                <div className="px-4 pb-4">
                  <div className="text-sm text-gray-600 mb-3">
                    오늘 생일인 친구들에게 축하 인사를 보내보세요! 🎉
                  </div>
                  <div className="space-y-3">
                    {birthdayFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback className="bg-pink-100 text-pink-600">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{friend.name}</h4>
                          <p className="text-sm text-gray-600">생일 축하합니다! 🎂</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-pink-600 hover:text-pink-700"
                        >
                          축하하기
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Favorite Friends */}
          {favoriteFriends.length > 0 && (
            <div className="border-b border-gray-100">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium text-gray-900">
                    즐겨찾기 {favoriteFriends.length}명
                  </span>
                </div>
                <span className="text-gray-400">
                  {showFavorites ? '▼' : '▶'}
                </span>
              </button>
              
              {showFavorites && (
                <div className="px-4 pb-4">
                  <div className="space-y-3">
                    {favoriteFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => handleFriendClick(friend)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{friend.name}</h4>
                          <p className="text-sm text-gray-600">{friend.statusMessage}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(friend.id)
                            }}
                            className="text-yellow-500 hover:text-yellow-600"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* All Friends */}
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium text-gray-900">
                친구 {regularFriends.length}명
              </h3>
            </div>
            
            {regularFriends.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>친구가 없습니다</p>
                <p className="text-sm">새로운 친구를 추가해보세요!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {regularFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => handleFriendClick(friend)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback className="bg-gray-100 text-gray-600">
                        {friend.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{friend.name}</h4>
                      <p className="text-sm text-gray-600">{friend.statusMessage}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(friend.id)
                        }}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
