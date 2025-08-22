import React from "react";
import { MessageCircle, Users, Settings } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";

export const BottomNavigation: React.FC = () => {
  const { currentPage, setCurrentPage } = useStore();

  const navItems = [
    { id: "main", label: "채팅", icon: MessageCircle },
    { id: "friends", label: "친구", icon: Users },
    { id: "settings", label: "설정", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 h-16 w-16 ${
                isActive
                  ? "text-blue-500 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setCurrentPage(item.id)}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-blue-500" : ""}`} />
              <span className={`text-xs ${isActive ? "text-blue-500" : ""}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
