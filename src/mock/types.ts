export interface MockUser {
  id: string
  name: string
  email: string
  avatar?: string
  status?: string
  isOnline?: boolean
}

export interface MockFriend {
  id: string
  name: string
  avatar?: string
  statusMessage?: string
  isOnline?: boolean
  isFavorite?: boolean
  isHidden?: boolean
  isBlocked?: boolean
  lastMessage?: string
  timestamp?: string
  unreadCount?: number
  birthday?: string
}

export interface MockChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: 'text' | 'reply' | 'notice'
  isNotice: boolean
}

export interface MockChat {
  id: string
  participants: string[]
  lastMessage?: MockChatMessage
  unreadCount: number
  isGroup: boolean
  updatedAt: Date
}
