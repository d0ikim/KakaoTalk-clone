"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import LockPage from "./lock/page";
import FriendsPage from "./friends/page";
import SettingsPage from "./settings/page";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { currentPage, isLocked } = useStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // 로그인 후 기본 페이지를 /chats로 리다이렉트
    if (!isLocked && currentPage === "chat") {
      const timer = setTimeout(() => {
        router.push("/chats");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isLocked, currentPage, router]);

  // 페이지 렌더링 함수
  const renderPage = () => {
    if (isLocked) {
      return <LockPage />;
    }

    switch (currentPage) {
      case "chat":
        // 채팅 페이지 대신 바로 채팅리스트로 리다이렉트 (useEffect에서 처리)
        return null;
      case "friends":
        return <FriendsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        // 기본 페이지는 LockPage (로그인 화면)
        return <LockPage />;
    }
  };

  // 마운트되지 않았으면 null 반환 (SSR 방지)
  if (!mounted) {
    return null;
  }

  return <div className="h-screen overflow-hidden">{renderPage()}</div>;
}
