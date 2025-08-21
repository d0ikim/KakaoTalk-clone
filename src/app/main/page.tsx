'use client'
import React, { useEffect, useState } from 'react'
import { useStore } from '@/store/useStore'
import { Search, Plus, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import MobileLayout from '@/components/layout/MobileLayout'
import { mockFriends, MockFriend } from '@/mock'

export default function MainPage() {
  const [mounted, setMounted] = useState(false)
  const { friends, setFriends } = useStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && friends.length === 0) {
      setFriends(mockFriends)
    }
  }, [mounted, friends.length, setFriends])

  if (!mounted) {
    return null
  }

  return (
    <MobileLayout>
      <div className="h-full flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">채팅</h1>
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 검색바 */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="채팅방 이름, 참여자 검색"
              className="pl-10 bg-gray-100 border-0 rounded-lg"
            />
          </div>
        </div>

        {/* 채팅 리스트 */}
        <div className="flex-1 overflow-y-auto">
          {friends.map((friend: MockFriend) => (
            <div
              key={friend.id}
              className="flex items-center space-x-3 p-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <Avatar className="w-12 h-12">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {friend.name.charAt(0)}
                  </span>
                </div>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 truncate">{friend.name}</h3>
                  <span className="text-sm text-gray-500">{friend.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{friend.lastMessage}</p>
              </div>

              {friend.unreadCount && friend.unreadCount > 0 && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {friend.unreadCount > 99 ? '99+' : friend.unreadCount}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  )
}
