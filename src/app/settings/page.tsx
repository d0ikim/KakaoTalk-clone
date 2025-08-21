'use client'

import React, { useState } from 'react'
import { useStore } from '@/store/useStore'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  User, 
  Bell, 
  Shield, 
  Monitor, 
  Eye, 
  EyeOff,
  Heart,
  Users,
  Settings as SettingsIcon
} from 'lucide-react'

export default function SettingsPage() {
  const { settings, updateSettings, user } = useStore()
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  const handlePasswordChange = () => {
    if (password.trim()) {
      alert('비밀번호가 변경되었습니다.')
      setPassword('')
    }
  }

  const handleAccountDelete = () => {
    if (confirm('정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      alert('계정이 삭제되었습니다.')
    }
  }

  const toggleTheme = (theme: 'light' | 'dark' | 'system') => {
    updateSettings({ theme })
  }

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    })
  }

  const togglePrivacy = (key: keyof typeof settings.privacy) => {
    updateSettings({
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key]
      }
    })
  }

  const updateFontSize = (size: 'small' | 'medium' | 'large') => {
    updateSettings({
      display: {
        ...settings.display,
        fontSize: size
      }
    })
  }

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Settings Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-semibold text-gray-900">설정</h1>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Account Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <User className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-medium text-gray-900">계정</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <Input
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <Input
                  value={user?.name || ''}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  새 비밀번호
                </label>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="새 비밀번호 입력"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <Button
                    onClick={handlePasswordChange}
                    disabled={!password.trim()}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    변경
                  </Button>
                </div>
              </div>
              
              <div className="pt-2">
                <Button
                  variant="outline"
                  onClick={handleAccountDelete}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  회원탈퇴
                </Button>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-5 w-5 text-green-500" />
              <h2 className="text-lg font-medium text-gray-900">개인정보</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">온라인 상태 표시</h3>
                  <p className="text-sm text-gray-600">친구들에게 온라인 상태를 보여줍니다</p>
                </div>
                <Button
                  variant={settings.privacy.showOnlineStatus ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => togglePrivacy('showOnlineStatus')}
                  className={settings.privacy.showOnlineStatus ? 'bg-green-500' : ''}
                >
                  {settings.privacy.showOnlineStatus ? '켜짐' : '꺼짐'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">ID 검색 허용</h3>
                  <p className="text-sm text-gray-600">다른 사용자가 ID로 검색할 수 있습니다</p>
                </div>
                <Button
                  variant={settings.privacy.allowIdSearch ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => togglePrivacy('allowIdSearch')}
                  className={settings.privacy.allowIdSearch ? 'bg-green-500' : ''}
                >
                  {settings.privacy.allowIdSearch ? '허용' : '차단'}
                </Button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="h-5 w-5 text-yellow-500" />
              <h2 className="text-lg font-medium text-gray-900">알림</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">알림</h3>
                  <p className="text-sm text-gray-600">모든 알림을 받습니다</p>
                </div>
                <Button
                  variant={settings.notifications.enabled ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleNotification('enabled')}
                  className={settings.notifications.enabled ? 'bg-green-500' : ''}
                >
                  {settings.notifications.enabled ? '켜짐' : '꺼짐'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">소리</h3>
                  <p className="text-sm text-gray-600">알림 소리를 재생합니다</p>
                </div>
                <Button
                  variant={settings.notifications.sound ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleNotification('sound')}
                  className={settings.notifications.sound ? 'bg-green-500' : ''}
                >
                  {settings.notifications.sound ? '켜짐' : '꺼짐'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">진동</h3>
                  <p className="text-sm text-gray-600">알림 시 진동을 울립니다</p>
                </div>
                <Button
                  variant={settings.notifications.vibration ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleNotification('vibration')}
                  className={settings.notifications.vibration ? 'bg-green-500' : ''}
                >
                  {settings.notifications.vibration ? '켜짐' : '꺼짐'}
                </Button>
              </div>
            </div>
          </div>

          {/* Display Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Monitor className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-medium text-gray-900">화면</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">테마</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={settings.theme === 'light' ? 'default' : 'outline'}
                    onClick={() => toggleTheme('light')}
                    className={settings.theme === 'light' ? 'bg-blue-500' : ''}
                  >
                    라이트
                  </Button>
                  <Button
                    variant={settings.theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => toggleTheme('dark')}
                    className={settings.theme === 'dark' ? 'bg-blue-500' : ''}
                  >
                    다크
                  </Button>
                  <Button
                    variant={settings.theme === 'system' ? 'default' : 'outline'}
                    onClick={() => toggleTheme('system')}
                    className={settings.theme === 'system' ? 'bg-blue-500' : ''}
                  >
                    시스템
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">글자 크기</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={settings.display.fontSize === 'small' ? 'default' : 'outline'}
                    onClick={() => updateFontSize('small')}
                    className={settings.display.fontSize === 'small' ? 'bg-blue-500' : ''}
                  >
                    작게
                  </Button>
                  <Button
                    variant={settings.display.fontSize === 'medium' ? 'default' : 'outline'}
                    onClick={() => updateFontSize('medium')}
                    className={settings.display.fontSize === 'medium' ? 'bg-blue-500' : ''}
                  >
                    보통
                  </Button>
                  <Button
                    variant={settings.display.fontSize === 'large' ? 'default' : 'outline'}
                    onClick={() => updateFontSize('large')}
                    className={settings.display.fontSize === 'large' ? 'bg-blue-500' : ''}
                  >
                    크게
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Friend Management Section */}
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-5 w-5 text-indigo-500" />
              <h2 className="text-lg font-medium text-gray-900">친구 관리</h2>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                즐겨찾기 친구 관리
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                숨김/차단 친구 관리
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
