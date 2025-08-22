"use client";

import React from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  isOpen: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  placeholder = "검색",
}: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b border-gray-100 overflow-hidden"
    >
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <Input
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-gray-100 border-0 rounded-lg text-sm h-9"
            autoFocus
          />
        </div>
      </div>
    </motion.div>
  );
}
