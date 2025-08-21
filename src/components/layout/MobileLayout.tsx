'use client'
import React from 'react'
import { useStore } from '@/store/useStore'
import { Settings, Bell, User, MessageCircle, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface MobileLayoutProps {
  children: React.ReactNode
  showBottomNav?: boolean
}

export default function MobileLayout({ children, showBottomNav = true }: MobileLayoutProps) {
  const { setCurrentPage, setIsLocked } = useStore()

  const handleLogout = () => {
    setIsLocked(true)
    setCurrentPage('lock')
  }

  const handleLockMode = () => {
    setIsLocked(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* 모바일 폰 프레임 */}
      <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
        {/* 폰 내부 화면 */}
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* 상단 상태바 */}
          <div className="h-6 bg-black rounded-t-[2.5rem] flex items-center justify-between px-6 text-white text-xs">
            <span>2:09</span>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-1.5 bg-white rounded-full"></div>
              <div className="w-3 h-1.5 bg-white rounded-full"></div>
              <div className="w-3 h-1.5 bg-white rounded-full"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-white rounded-sm"></div>
              <span>98</span>
            </div>
          </div>

          {/* 메인 컨텐츠 영역 */}
          <div className="flex h-[calc(100%-1.5rem)]">
            {/* 좌측 네비게이션 */}
            <div className="w-16 bg-gray-50 flex flex-col items-center py-4 space-y-6">
              {/* 프로필 아이콘 */}
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>

              {/* 채팅 아이콘 (알림 배지 포함) */}
              <div className="relative">
                <MessageCircle className="w-6 h-6 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">493</span>
                </div>
              </div>

              {/* 더보기 아이콘 */}
              <div className="w-6 h-6 flex flex-col items-center justify-center space-y-0.5">
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              </div>

              {/* 알림 아이콘 */}
              <Bell className="w-6 h-6 text-gray-600" />

              {/* 설정 아이콘 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 w-6 h-6">
                    <Settings className="w-6 h-6 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleLockMode}>
                    잠금모드
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 bg-white overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
