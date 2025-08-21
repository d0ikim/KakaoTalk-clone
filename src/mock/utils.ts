import { mockFriends, mockFriendsList, mockFavoriteFriends, mockChatMessages } from './data'

// Mock 데이터 초기화 함수
export const initializeMockData = () => {
  return {
    friends: mockFriends,
    friendsList: mockFriendsList,
    favoriteFriends: mockFavoriteFriends,
    chatMessages: mockChatMessages
  }
}

// 친구 검색 함수
export const searchFriends = (query: string) => {
  const allFriends = [...mockFriends, ...mockFriendsList, ...mockFavoriteFriends]
  return allFriends.filter(friend => 
    friend.name.toLowerCase().includes(query.toLowerCase()) ||
    friend.statusMessage?.toLowerCase().includes(query.toLowerCase())
  )
}

// 생일인 친구 필터링
export const getBirthdayFriends = () => {
  return mockFriendsList.filter(friend => friend.birthday)
}

// 즐겨찾기 친구 필터링
export const getFavoriteFriends = () => {
  return mockFavoriteFriends
}

// 채팅 메시지 추가 함수
export const addChatMessage = (message: {
  senderId: string
  senderName: string
  content: string
  type: 'text' | 'reply' | 'notice'
}) => {
  const newMessage = {
    id: Date.now().toString(),
    ...message,
    timestamp: new Date().toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }),
    isNotice: false
  }
  
  return newMessage
}

// 시간 포맷팅 함수
export const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) return `${minutes}분 전`
  if (hours < 24) return `${hours}시간 전`
  if (days < 7) return `${days}일 전`
  return date.toLocaleDateString()
}
