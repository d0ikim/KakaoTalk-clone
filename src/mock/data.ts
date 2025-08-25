import { MockUser, MockFriend, MockChatMessage, MockChat } from "./types";

// 기본 이미지 경로
export const DEFAULT_AVATAR = "/default-avatar.jpg";
export const DEFAULT_BACKGROUND = "/default-background.jpg";

// Mock User Data
export const mockUser: MockUser = {
  id: "1",
  name: "최아름",
  email: "1",
  avatar: "/avatar.jpg",
  status: "Free consultation, I'll listen to your fans",
};

// Mock Friends Data
export const mockFriends: MockFriend[] = [
  {
    id: "1",
    name: "서울과기대...",
    avatar: "/building.jpg",
    lastMessage: "452",
    timestamp: "오후 1:58",
    unreadCount: 452,
  },
  {
    id: "2",
    name: "북한 지명같음",
    avatar: "/group.jpg",
    lastMessage: "3",
    timestamp: "오후 1:47",
    unreadCount: 2,
  },
  {
    id: "3",
    name: "벤경 23 박재준",
    avatar: "/person.jpg",
    lastMessage: "그럼 4전공인가",
    timestamp: "오후 1:30",
    unreadCount: 0,
  },
  {
    id: "4",
    name: "에이블리",
    avatar: "/ably.jpg",
    lastMessage:
      "(광고) [디즈니+ 3개월 무료] 응모권이 도착했어요! 지금 바로...",
    timestamp: "오후 1:00",
    unreadCount: 4,
  },
  {
    id: "5",
    name: "김도이 언니",
    avatar: "/kimdoyi.jpg",
    lastMessage: "수락했심다",
    timestamp: "오후 12:04",
    unreadCount: 0,
  },
  {
    id: "6",
    name: "우체국",
    avatar: "/post.jpg",
    lastMessage: '(우체국 배달완료) "서로 존중, 함께 배려"...',
    timestamp: "오전 11:30",
    unreadCount: 0,
  },
  {
    id: "7",
    name: "카카오이모티콘",
    avatar: "/emoticon.jpg",
    lastMessage: "(광고)D-1!! 두산X망곰 한정판 밈티 증정은 내일이 마지막...",
    timestamp: "오전 11:20",
    unreadCount: 0,
  },
  {
    id: "8",
    name: "안진태",
    avatar: "/person2.jpg",
    lastMessage: "이모티콘을 보냈습니다.",
    timestamp: "오전 7:20",
    unreadCount: 0,
  },
];

// Mock Friends List Data (Friends Page용)
export const mockFriendsList: MockFriend[] = [
  {
    id: "1",
    name: "영어 25...",
    avatar: "/person1.jpg",
    statusMessage: "영어 공부 중",
    isOnline: true,
    isFavorite: false,
    birthday: "1999-05-15",
  },
  {
    id: "2",
    name: "한승희",
    avatar: "/person2.jpg",
    statusMessage: "열심히 일하는 중",
    isOnline: false,
    isFavorite: false,
    birthday: "1998-12-03",
  },
  {
    id: "3",
    name: "영어 25...",
    avatar: "/person3.jpg",
    statusMessage: "영어 회화 연습",
    isOnline: true,
    isFavorite: false,
    birthday: "1999-08-22",
  },
  {
    id: "4",
    name: "황예슬",
    avatar: "/person4.jpg",
    statusMessage: "맛있는 음식 먹는 중",
    isOnline: false,
    isFavorite: false,
    birthday: "1997-03-10",
  },
  {
    id: "5",
    name: "정통 24..",
    avatar: "/dog.jpg",
    statusMessage: "멍멍! 산책하고 싶어요",
    isOnline: true,
    isFavorite: false,
    birthday: "2020-01-15",
  },
  {
    id: "9",
    name: "김민수",
    avatar: "/person5.jpg",
    statusMessage: "오늘 생일이에요! 🎂",
    isOnline: true,
    isFavorite: false,
    birthday: "1996-12-25",
  },
  {
    id: "10",
    name: "이지은",
    avatar: "/person6.jpg",
    statusMessage: "생일 축하해주세요 💕",
    isOnline: false,
    isFavorite: false,
    birthday: "1995-12-25",
  },
  {
    id: "11",
    name: "박준호",
    avatar: "/person7.jpg",
    statusMessage: "오늘 특별한 날이에요",
    isOnline: true,
    isFavorite: false,
    birthday: "1997-12-25",
  },
];

// Mock Favorite Friends
export const mockFavoriteFriends: MockFriend[] = [
  {
    id: "6",
    name: "감자",
    avatar: "/potato.jpg",
    statusMessage: "감자처럼 착하게 살아요",
    isOnline: false,
    isFavorite: true,
  },
  {
    id: "7",
    name: "다랑",
    avatar: "/daraang.jpg",
    statusMessage: "제똥.. 나 안아..",
    isOnline: true,
    isFavorite: true,
  },
  {
    id: "8",
    name: "엄마",
    avatar: "/mom.jpg",
    statusMessage: "사랑해요 💕",
    isOnline: false,
    isFavorite: true,
  },
];

// Mock Chat Messages
export const mockChatMessages: MockChatMessage[] = [
  {
    id: "1",
    senderId: "2",
    senderName: "김도이 언니",
    content: "8/25월~9/21일 카카오톡클론코딩 페어프로그래밍 프로젝트(1달)",
    timestamp: "오전 11:50",
    type: "text",
    isNotice: true,
  },
  {
    id: "2",
    senderId: "2",
    senderName: "김도이 언니",
    content: "오늘부터 프로젝트 슬슬 구상 들어가시죠~",
    timestamp: "오전 11:51",
    type: "text",
    isNotice: false,
  },
  {
    id: "3",
    senderId: "2",
    senderName: "김도이 언니",
    content: "프론트는 사전단계가 많은걸로 알아서",
    timestamp: "오전 11:52",
    type: "text",
    isNotice: false,
  },
  {
    id: "4",
    senderId: "2",
    senderName: "김도이 언니",
    content: "그 내가 만들어놓은 노션 페이지에 공동작업자 초대한거 확인했오?",
    timestamp: "오전 11:53",
    type: "text",
    isNotice: false,
  },
  {
    id: "5",
    senderId: "1",
    senderName: "나",
    content: "넴",
    timestamp: "오후 12:00",
    type: "text",
    isNotice: false,
  },
  {
    id: "6",
    senderId: "1",
    senderName: "나",
    content:
      "김도이 언니에게 답장\n그 내가 만들어놓은 노션 페이지에 공동작업자 초대한거 확인했오?\n아 노션때문이었군",
    timestamp: "오후 12:04",
    type: "reply",
    isNotice: false,
  },
  {
    id: "7",
    senderId: "1",
    senderName: "나",
    content: "수락했심다",
    timestamp: "오후 12:05",
    type: "text",
    isNotice: false,
  },
];

// Mock Chats
export const mockChats: MockChat[] = [
  {
    id: "1",
    participants: ["1", "2"],
    lastMessage: mockChatMessages[mockChatMessages.length - 1],
    unreadCount: 0,
    isGroup: false,
    updatedAt: new Date(),
  },
];
