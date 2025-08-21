# TALK - 모바일 전용 메신저 앱

Next.js + Tailwind CSS + shadcn/ui + Zustand + Axios + Auth.js 기반의 모바일 전용 메신저 애플리케이션입니다.

## 🚀 주요 기능

### 1. 인증 시스템
- **로그인/회원가입**: 이메일과 비밀번호 기반 인증
- **계정 찾기**: nodemailer를 통한 이메일 인증
- **비밀번호 재설정**: 모달을 통한 비밀번호 변경
- **잠금모드**: 앱 보안을 위한 잠금 기능

### 2. 채팅 기능
- **메인 채팅 리스트**: 모든 채팅방 목록 표시
- **상단 검색**: 친구 이름과 채팅 내용 검색
- **채팅 추가**: 새로운 채팅 시작
- **답장 기능**: 특정 메시지에 대한 답장
- **공지 기능**: 중요 메시지를 상단에 고정
- **파일/사진/동영상 전송**: 다양한 미디어 파일 전송 지원

### 3. 친구 관리
- **친구 리스트**: 모든 친구 목록 표시
- **생일인 친구**: 생일이 오늘인 친구 알림
- **즐겨찾기 친구**: 자주 연락하는 친구 즐겨찾기
- **친구 검색**: 이름과 상태메시지로 친구 검색
- **친구 추가**: 새로운 친구 추가 기능

### 4. 프로필 관리
- **나의 프로필**: 개인 프로필 편집 (배경, 사진, 상태메시지, 이름)
- **친구 프로필**: 친구 프로필 보기 및 관리
- **즐겨찾기 추가**: 친구를 즐겨찾기에 추가
- **숨김/차단/삭제**: 친구 관리 옵션

### 5. 설정
- **계정 설정**: 프로필, 비밀번호 변경, 회원탈퇴, ID 검색 허용
- **알림 설정**: 알림 온오프, 소리, 진동 설정
- **친구 관리**: 숨김/차단 친구 관리
- **화면 설정**: 다크모드, 배경화면, 폰트 크기 조정

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Authentication**: Auth.js (NextAuth.js)
- **Email Service**: Nodemailer
- **Icons**: Lucide React

## 📱 모바일 최적화

- **반응형 디자인**: 모바일 화면에 최적화된 레이아웃
- **터치 친화적**: 모바일 터치 인터페이스에 최적화
- **성능 최적화**: 모바일 기기 성능을 고려한 최적화

## 🏗️ 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── lock/             # 잠금/로그인 화면
│   ├── main/             # 메인 채팅 리스트
│   ├── chat/             # 채팅창 화면
│   ├── friends/          # 친구 리스트 화면
│   ├── settings/         # 설정 화면
│   ├── layout.tsx        # 루트 레이아웃
│   └── page.tsx          # 메인 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── avatar.tsx
│   │   ├── dialog.tsx
│   │   └── dropdown-menu.tsx
│   └── layout/           # 레이아웃 컴포넌트
│       ├── MobileLayout.tsx
│       └── BottomNavigation.tsx
├── store/                 # Zustand 상태 관리
│   └── useStore.ts
└── lib/                   # 유틸리티 함수
    └── utils.ts
```

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 브라우저에서 확인
```
http://localhost:3000
```

## 📋 구현 규칙

1. **shadcn/ui 우선**: UI 컴포넌트는 shadcn/ui를 우선 사용
2. **Tailwind CSS**: 필요 시 Tailwind로 커스터마이징
3. **컴포넌트 분리**: 페이지별 폴더에 컴포넌트 분리
4. **API 호출**: Axios를 사용한 HTTP 통신
5. **인증 처리**: Auth.js를 통한 인증 관리

## 🎨 디자인 시스템

- **Color Palette**: 일관된 색상 체계
- **Typography**: 가독성 높은 폰트 시스템
- **Spacing**: 체계적인 여백 시스템
- **Components**: 재사용 가능한 컴포넌트 라이브러리

## 🔒 보안 기능

- **인증**: JWT 기반 인증 시스템
- **권한 관리**: 사용자별 접근 권한 제어
- **데이터 암호화**: 민감한 데이터 암호화 처리

## 📱 반응형 지원

- **모바일 우선**: 모바일 디바이스에 최적화
- **터치 인터페이스**: 터치 제스처 지원
- **성능 최적화**: 모바일 성능을 고려한 최적화

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**TALK** - 모바일에서 더 나은 소통을 경험하세요! 💬✨
