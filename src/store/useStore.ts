import { create } from 'zustand'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  status?: string
  isOnline?: boolean
}

export interface Friend {
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

export interface Message {
  id: string
  chatId: string
  senderId: string
  content: string
  type: 'text' | 'image' | 'file' | 'video'
  timestamp: Date
  isNotice: boolean
  replyTo?: string
}

export interface Chat {
  id: string
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  isGroup: boolean
  groupName?: string
  groupAvatar?: string
  updatedAt: Date
}

export interface Notification {
  id: string
  type: 'message' | 'friend_request' | 'system'
  title: string
  content: string
  timestamp: Date
  isRead: boolean
}

export interface Settings {
  theme: 'light' | 'dark' | 'system'
  notifications: {
    enabled: boolean
    sound: boolean
    vibration: boolean
  }
  privacy: {
    showOnlineStatus: boolean
    allowIdSearch: boolean
  }
  display: {
    fontSize: 'small' | 'medium' | 'large'
    chatBackground?: string
  }
}

interface AppState {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // Friends state
  friends: Friend[]
  setFriends: (friends: Friend[]) => void
  addFriend: (friend: Friend) => void
  updateFriend: (id: string, updates: Partial<Friend>) => void
  removeFriend: (id: string) => void
  
  // Chats state
  chats: Chat[]
  setChats: (chats: Chat[]) => void
  addChat: (chat: Chat) => void
  updateChat: (id: string, updates: Partial<Chat>) => void
  removeChat: (id: string) => void
  
  // Messages state
  messages: Record<string, Message[]>
  setMessages: (chatId: string, messages: Message[]) => void
  addMessage: (chatId: string, message: Message) => void
  
  // Notifications state
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  markNotificationAsRead: (id: string) => void
  
  // Settings state
  settings: Settings
  updateSettings: (updates: Partial<Settings>) => void
  
  // UI state
  isLocked: boolean
  setIsLocked: (locked: boolean) => void
  currentPage: string
  setCurrentPage: (page: string) => void
  
  // SSR state
  isHydrated: boolean
  setIsHydrated: (hydrated: boolean) => void
}

export const useStore = create<AppState>((set, get) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),
  
  // Friends state
  friends: [],
  setFriends: (friends) => set({ friends }),
  addFriend: (friend) => set((state) => ({ 
    friends: [...state.friends, friend] 
  })),
  updateFriend: (id, updates) => set((state) => ({
    friends: state.friends.map(friend => 
      friend.id === id ? { ...friend, ...updates } : friend
    )
  })),
  removeFriend: (id) => set((state) => ({
    friends: state.friends.filter(friend => friend.id !== id)
  })),
  
  // Chats state
  chats: [],
  setChats: (chats) => set({ chats }),
  addChat: (chat) => set((state) => ({ 
    chats: [...state.chats, chat] 
  })),
  updateChat: (id, updates) => set((state) => ({
    chats: state.chats.map(chat => 
      chat.id === id ? { ...chat, ...updates } : chat
    )
  })),
  removeChat: (id) => set((state) => ({
    chats: state.chats.filter(chat => chat.id !== id)
  })),
  
  // Messages state
  messages: {},
  setMessages: (chatId, messages) => set((state) => ({
    messages: { ...state.messages, [chatId]: messages }
  })),
  addMessage: (chatId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [chatId]: [...(state.messages[chatId] || []), message]
    }
  })),
  
  // Notifications state
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) => set((state) => ({ 
    notifications: [...state.notifications, notification] 
  })),
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    )
  })),
  
  // Settings state
  settings: {
    theme: 'system',
    notifications: {
      enabled: true,
      sound: true,
      vibration: true,
    },
    privacy: {
      showOnlineStatus: true,
      allowIdSearch: true,
    },
    display: {
      fontSize: 'medium',
    },
  },
  updateSettings: (updates) => set((state) => ({
    settings: { ...state.settings, ...updates }
  })),
  
  // UI state
  isLocked: true,
  setIsLocked: (locked) => set({ isLocked: locked }),
  currentPage: 'lock',
  setCurrentPage: (page) => set({ currentPage: page }),
  
  // SSR state
  isHydrated: false,
  setIsHydrated: (hydrated) => set({ isHydrated: hydrated }),
}))
