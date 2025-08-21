'use client'
import React, { useEffect, useState } from 'react'
import { useStore } from '@/store/useStore'
import { Search, Send, Paperclip, Smile, Calendar, Clock, Folder, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import MobileLayout from '@/components/layout/MobileLayout'
import { mockChatMessages, MockChatMessage, addChatMessage } from '@/mock'

export default function ChatPage() {
  const [mounted, setMounted] = useState(false)
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState<MockChatMessage[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && chatMessages.length === 0) {
      setChatMessages(mockChatMessages)
    }
  }, [mounted, chatMessages.length])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = addChatMessage({
        senderId: '1',
        senderName: '나',
        content: message,
        type: 'text'
      })
      setChatMessages([...chatMessages, newMessage])
      setMessage('')
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <MobileLayout>
      <div className="h-full flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">김</span>
              </div>
            </Avatar>
            <div>
              <h2 className="font-semibold text-gray-900">김도이 언니</h2>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Calendar className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 채팅 메시지 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg: MockChatMessage) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === '1' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.senderId === '1'
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
              >
                {msg.type === 'reply' && (
                  <div className="text-xs text-gray-500 mb-1 border-l-2 border-gray-300 pl-2">
                    김도이 언니에게 답장
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 메시지 입력 */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Smile className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Calendar className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Clock className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Folder className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Plus className="w-5 h-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지 입력"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
              전송
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
