"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MobileLayout from "@/components/layout/MobileLayout";
import {
  ArrowLeft,
  Image,
  FileText,
  Link,
  Calendar,
  Mountain,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockFriends } from "@/mock";

// Mock 데이터
const mockSharedMedia = [
  {
    id: 1,
    type: "image",
    url: "/api/placeholder/100/100",
    thumbnail: "🏖️",
    name: "beach.jpg",
  },
  {
    id: 2,
    type: "image",
    url: "/api/placeholder/100/100",
    thumbnail: "📱",
    name: "app_screenshot.png",
  },
  {
    id: 3,
    type: "image",
    url: "/api/placeholder/100/100",
    thumbnail: "📱",
    name: "interface.png",
  },
  {
    id: 4,
    type: "image",
    url: "/api/placeholder/100/100",
    thumbnail: "🙏",
    name: "buddha.jpg",
  },
  {
    id: 5,
    type: "image",
    url: "/api/placeholder/100/100",
    thumbnail: "📋",
    name: "spring_list.png",
  },
];

const mockFiles = [
  { id: 1, name: "프로젝트_계획서.pdf", size: "2.3MB", type: "pdf" },
  { id: 2, name: "회의록.docx", size: "1.1MB", type: "doc" },
  { id: 3, name: "데이터_분석.xlsx", size: "3.7MB", type: "xls" },
];

const mockLinks = [
  {
    id: 1,
    title: "프로젝트 노션 페이지",
    url: "https://notion.so/project",
    description: "프로젝트 진행 상황",
  },
  {
    id: 2,
    title: "GitHub 저장소",
    url: "https://github.com/project",
    description: "소스 코드",
  },
  {
    id: 3,
    title: "Figma 디자인",
    url: "https://figma.com/design",
    description: "UI/UX 디자인",
  },
];

const mockSchedules = [
  {
    id: 1,
    title: "프로젝트 회의",
    date: "2024-01-15",
    time: "오후 2:00",
    description: "프로젝트 진행 상황 논의",
  },
  {
    id: 2,
    title: "데모 발표",
    date: "2024-01-20",
    time: "오전 10:00",
    description: "클라이언트에게 최종 결과물 발표",
  },
];

export default function ChatDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id as string;
  const [activeTab, setActiveTab] = useState<
    "media" | "files" | "links" | "schedules"
  >("media");

  // 친구 정보 찾기
  const friend = mockFriends.find((f) => f.id === chatId);

  if (!friend) {
    return (
      <MobileLayout showLeftNav={false}>
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">친구를 찾을 수 없습니다.</p>
        </div>
      </MobileLayout>
    );
  }

  const tabs = [
    {
      id: "media",
      label: "사진/동영상",
      icon: Image,
      count: mockSharedMedia.length,
    },
    { id: "files", label: "파일", icon: FileText, count: mockFiles.length },
    { id: "links", label: "링크", icon: Link, count: mockLinks.length },
    {
      id: "schedules",
      label: "일정",
      icon: Calendar,
      count: mockSchedules.length,
    },
  ];

  const renderMediaTab = () => (
    <div className="space-y-4">
      {/* 사진/동영상 섬네일 */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900 flex items-center">
          <Mountain className="w-4 h-4 mr-2 text-gray-600" />
          사진/동영상
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {mockSharedMedia.map((item) => (
            <div key={item.id} className="aspect-square">
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-lg border border-gray-200">
                {item.thumbnail}
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center truncate">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 파일, 링크, 일정 요약 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <FileText className="w-6 h-6 mx-auto text-gray-600 mb-1" />
          <p className="text-xs text-gray-600">파일</p>
          <p className="text-sm font-medium text-gray-900">
            {mockFiles.length}
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Link className="w-6 h-6 mx-auto text-gray-600 mb-1" />
          <p className="text-xs text-gray-600">링크</p>
          <p className="text-sm font-medium text-gray-900">
            {mockLinks.length}
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Calendar className="w-6 h-6 mx-auto text-gray-600 mb-1" />
          <p className="text-xs text-gray-600">일정</p>
          <p className="text-sm font-medium text-gray-900">
            {mockSchedules.length}
          </p>
        </div>
      </div>
    </div>
  );

  const renderFilesTab = () => (
    <div className="space-y-3">
      {mockFiles.map((file) => (
        <div
          key={file.id}
          className="flex items-center p-3 bg-gray-50 rounded-lg"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500">{file.size}</p>
          </div>
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            다운로드
          </button>
        </div>
      ))}
    </div>
  );

  const renderLinksTab = () => (
    <div className="space-y-3">
      {mockLinks.map((link) => (
        <div key={link.id} className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Link className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{link.title}</p>
              <p className="text-xs text-gray-500 mt-1">{link.description}</p>
              <p className="text-xs text-blue-500 truncate mt-1">{link.url}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSchedulesTab = () => (
    <div className="space-y-3">
      {mockSchedules.map((schedule) => (
        <div key={schedule.id} className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {schedule.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {schedule.date} {schedule.time}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {schedule.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "media":
        return renderMediaTab();
      case "files":
        return renderFilesTab();
      case "links":
        return renderLinksTab();
      case "schedules":
        return renderSchedulesTab();
      default:
        return renderMediaTab();
    }
  };

  return (
    <MobileLayout showLeftNav={false}>
      <div className="h-full bg-pink-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-pink-200 bg-pink-100">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-pink-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-pink-700" />
            </button>
            <Avatar className="w-10 h-10">
              <AvatarImage src={friend.avatar} />
              <AvatarFallback className="text-sm font-medium bg-pink-200 text-pink-700">
                {friend.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-pink-900">
                {friend.name}
              </h3>
              <p className="text-sm text-pink-700">채팅방 상세정보</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-pink-200 bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as "media" | "files" | "links" | "schedules"
                )
              }
              className={`flex-1 py-3 px-2 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-500 hover:text-pink-700"
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <tab.icon className="w-4 h-4" />
                <span className="text-xs">{tab.label}</span>
                <span className="text-xs bg-pink-200 text-pink-600 px-1.5 py-0.5 rounded-full">
                  {tab.count}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">{renderContent()}</div>
      </div>
    </MobileLayout>
  );
}
