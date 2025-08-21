'use client'

import React, { useEffect, useState } from 'react'
import { useStore } from '@/store/useStore'
import LockPage from './lock/page'
import MainPage from './main/page'
import ChatPage from './chat/page'
import FriendsPage from './friends/page'
import SettingsPage from './settings/page'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { currentPage, isLocked } = useStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  // 페이지 렌더링 함수
  const renderPage = () => {
    if (isLocked) {
      return <LockPage />
    }

    switch (currentPage) {
      case 'main':
        return <MainPage />
      case 'chat':
        return <ChatPage />
      case 'friends':
        return <FriendsPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <MainPage />
    }
  }

  // 마운트되지 않았으면 null 반환 (SSR 방지)
  if (!mounted) {
    return null
  }

  return (
    <div className="h-screen overflow-hidden">
      {renderPage()}
    </div>
  )
}
