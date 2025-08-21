'use client'
import React, { useState } from 'react'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageCircle, Lock, User } from 'lucide-react'
import { mockUser } from '@/mock'

export default function LockPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setIsLocked, setUser } = useStore()

  const handleLogin = () => {
    if (email && password) {
      setUser(mockUser)
      setIsLocked(false)
    }
  }

  return (
    <div className="h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex flex-col items-center justify-center p-6">
      {/* TALK 로고 */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-yellow-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">TALK</h1>
      </div>

      {/* 로그인 폼 */}
      <div className="w-full max-w-sm space-y-4">
        <Input
          type="email"
          placeholder="카카오계정 (이메일 또는 전화번호)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white border-0 rounded-lg h-12 text-gray-800 placeholder-gray-500"
        />
        
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white border-0 rounded-lg h-12 text-gray-800 placeholder-gray-500"
        />

        <Button
          onClick={handleLogin}
          className="w-full bg-gray-800 text-white hover:bg-gray-700 rounded-lg h-12 text-lg font-medium"
        >
          로그인
        </Button>

        <div className="text-center text-gray-700 text-sm">또는</div>

        <Button
          variant="outline"
          className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg h-12"
        >
          <Lock className="w-5 h-5 mr-2" />
          QR코드 로그인
        </Button>

        <div className="flex items-center justify-center space-x-2 text-sm text-gray-700">
          <input type="checkbox" id="autoLogin" className="w-4 h-4" />
          <label htmlFor="autoLogin">자동 로그인</label>
        </div>
      </div>

      {/* 하단 링크 */}
      <div className="mt-8 flex items-center space-x-4 text-sm text-gray-700">
        <button className="hover:underline">카카오계정 찾기</button>
        <div className="w-px h-4 bg-gray-400"></div>
        <button className="hover:underline">비밀번호 재설정</button>
      </div>
    </div>
  )
}
