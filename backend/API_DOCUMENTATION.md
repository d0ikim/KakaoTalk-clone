# 카카오톡 클론 백엔드 API 문서

## 기본 정보
- **Base URL**: `http://localhost:4000`
- **Content-Type**: `application/json`

## 인증
대부분의 API는 JWT 토큰을 통한 인증이 필요합니다.
- **Header**: `Authorization: Bearer <token>`

---

## 🔐 인증 API (`/api/auth`)

### 회원가입
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "nickname": "사용자닉네임"
}
```

**Response:**
```json
{
  "message": "회원가입이 완료되었습니다.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "사용자닉네임",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "token": "jwt-token"
}
```

### 로그인
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "로그인 성공",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "사용자닉네임",
    "profile_image_url": null,
    "status_message": null,
    "is_online": true,
    "last_seen": "2024-01-01T00:00:00Z"
  },
  "token": "jwt-token"
}
```

### 로그아웃
```http
POST /api/auth/logout
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "로그아웃되었습니다."
}
```

---

## 👤 사용자 API (`/api/users`)

### 프로필 조회
```http
GET /api/users/profile
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "사용자닉네임",
    "profile_image_url": "https://example.com/image.jpg",
    "status_message": "상태메시지",
    "is_online": true,
    "last_seen": "2024-01-01T00:00:00Z",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### 프로필 수정
```http
PUT /api/users/profile
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "nickname": "새닉네임",
  "statusMessage": "새상태메시지",
  "profileImageUrl": "https://example.com/new-image.jpg"
}
```

### 친구 목록 조회
```http
GET /api/users/friends
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "friends": [
    {
      "id": "uuid",
      "nickname": "친구닉네임",
      "profile_image_url": "https://example.com/image.jpg",
      "status_message": "친구상태메시지",
      "is_online": true,
      "last_seen": "2024-01-01T00:00:00Z",
      "friendshipId": "uuid",
      "friendshipCreatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 친구 요청 목록 조회
```http
GET /api/users/friend-requests
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "receivedRequests": [
    {
      "id": "uuid",
      "nickname": "요청자닉네임",
      "profile_image_url": "https://example.com/image.jpg",
      "status_message": "상태메시지",
      "requestId": "uuid",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "sentRequests": [
    {
      "id": "uuid",
      "nickname": "요청받은사람닉네임",
      "profile_image_url": "https://example.com/image.jpg",
      "status_message": "상태메시지",
      "requestId": "uuid",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 친구 요청 보내기
```http
POST /api/users/friend-requests
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "friendId": "uuid"
}
```

### 친구 요청 수락/거절
```http
PUT /api/users/friend-requests/:requestId
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "action": "accept" // 또는 "reject"
}
```

### 사용자 검색
```http
GET /api/users/search?query=검색어
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "nickname": "사용자닉네임",
      "profile_image_url": "https://example.com/image.jpg",
      "status_message": "상태메시지",
      "is_online": true,
      "friendshipStatus": "accepted" // "pending", "accepted", "rejected", null
    }
  ]
}
```

---

## 💬 채팅 API (`/api/chat`)

### 채팅방 목록 조회
```http
GET /api/chat/rooms
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "chatRooms": [
    {
      "id": "uuid",
      "name": "채팅방이름",
      "type": "direct", // "direct" 또는 "group"
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "chat_room_members": [
        {
          "user_id": "uuid",
          "users": {
            "id": "uuid",
            "nickname": "닉네임",
            "profile_image_url": "https://example.com/image.jpg",
            "is_online": true
          }
        }
      ],
      "lastMessage": {
        "id": "uuid",
        "content": "마지막메시지",
        "message_type": "text",
        "created_at": "2024-01-01T00:00:00Z",
        "sender_id": "uuid",
        "users": {
          "nickname": "발신자닉네임"
        }
      },
      "lastReadAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 특정 채팅방의 메시지 조회
```http
GET /api/chat/rooms/:roomId/messages?page=1&limit=50
```

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 메시지 수 (기본값: 50)

**Response:**
```json
{
  "messages": [
    {
      "id": "uuid",
      "content": "메시지내용",
      "message_type": "text", // "text", "image", "file", "emoji"
      "file_url": null,
      "reply_to_id": null,
      "is_edited": false,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "sender_id": "uuid",
      "users": {
        "nickname": "발신자닉네임",
        "profile_image_url": "https://example.com/image.jpg"
      }
    }
  ],
  "hasMore": true
}
```

### 메시지 전송
```http
POST /api/chat/rooms/:roomId/messages
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "메시지내용",
  "messageType": "text", // "text", "image", "file", "emoji"
  "replyToId": "uuid" // 답장할 메시지 ID (선택사항)
}
```

**Response:**
```json
{
  "message": "메시지가 전송되었습니다.",
  "newMessage": {
    "id": "uuid",
    "content": "메시지내용",
    "message_type": "text",
    "file_url": null,
    "reply_to_id": null,
    "is_edited": false,
    "created_at": "2024-01-01T00:00:00Z",
    "sender_id": "uuid",
    "users": {
      "nickname": "발신자닉네임",
      "profile_image_url": "https://example.com/image.jpg"
    }
  }
}
```

### 1:1 채팅방 생성 또는 조회
```http
POST /api/chat/rooms/direct
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "friendId": "uuid"
}
```

**Response:**
```json
{
  "message": "새 채팅방이 생성되었습니다.",
  "chatRoom": {
    "id": "uuid",
    "type": "direct"
  }
}
```

---

## 🔍 헬스 체크 API

### 서버 상태 확인
```http
GET /health
```

**Response:**
```json
{
  "ok": true,
  "service": "kakaotalk-clone-backend",
  "timestamp": 1704067200000,
  "version": "1.0.0"
}
```

### 데이터베이스 연결 확인
```http
GET /supabase/health
```

**Response:**
```json
{
  "ok": true,
  "database": "connected",
  "sample": []
}
```

---

## 에러 응답 형식

모든 API는 다음과 같은 형식으로 에러를 반환합니다:

```json
{
  "error": "에러 메시지"
}
```

### 주요 HTTP 상태 코드
- `200`: 성공
- `201`: 생성 성공
- `400`: 잘못된 요청
- `401`: 인증 실패
- `403`: 권한 없음
- `404`: 리소스 없음
- `409`: 충돌 (중복 등)
- `500`: 서버 오류
