"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Search,
  LayoutDashboard,
  CreditCard,
  History,
  Newspaper,
  Settings,
  HelpCircle,
  LogOut,
  Folder,
  Zap,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  icon: React.ElementType;
  path: string;
  color?: string;
  gradient?: string;
};

interface SideNavProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

function SideNav({ isExpanded, setIsExpanded }: SideNavProps) {
  const router = useRouter();
  const path = usePathname();
  const { user } = useUser();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const mainNavItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      color: "text-purple-400",
      gradient: "from-purple-500 to-purple-700",
    },
    {
      label: "Templates",
      icon: Folder,
      path: "/dashboard/templates",
      color: "text-green-400",
      gradient: "from-green-500 to-green-700",
    },
    {
      label: "Billing",
      icon: CreditCard,
      path: "/dashboard/billing",
      color: "text-yellow-400",
      gradient: "from-yellow-500 to-yellow-700",
    },
    {
      label: "History",
      icon: History,
      path: "/dashboard/history",
      color: "text-indigo-400",
      gradient: "from-indigo-500 to-indigo-700",
    },
    {
      label: "News",
      icon: Newspaper,
      path: "/dashboard/news",
      color: "text-pink-400",
      gradient: "from-pink-500 to-pink-700",
    },
  ];

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => (
      <motion.div
        key={item.label}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative flex items-center gap-3 px-3 py-2 group cursor-pointer transition-all duration-300 
          ${path === item.path ? "bg-white/5" : "hover:bg-white/5"}
          rounded-xl`}
        onClick={() => router.push(item.path)}
      >
        {path === item.path && (
          <motion.span
            layoutId="active-nav-indicator"
            className={`absolute left-0 w-1 h-full rounded-r-full bg-gradient-to-b ${item.gradient}`}
          />
        )}
        <div
          className={`w-6 h-6 flex items-center justify-center rounded-lg ${
            path === item.path ? "bg-gradient-to-br " + item.gradient : ""
          }`}
        >
          <item.icon
            className={`w-4 h-4 ${
              path === item.path ? "text-white" : "text-gray-400 " + item.color
            }`}
          />
        </div>
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-sm font-medium ${
              path === item.path
                ? "text-white"
                : "text-gray-300 group-hover:text-white"
            }`}
          >
            {item.label}
          </motion.span>
        )}
      </motion.div>
    ));
  };

  return (
    <motion.div
      animate={{ width: isExpanded ? 240 : 80 }}
      transition={{ duration: 0.3 }}
      className="fixed left-3 top-3 bottom-3 z-20 bg-gradient-to-br from-gray-900 via-[#0A0A0A] to-gray-900 
        text-white shadow-2xl rounded-3xl border border-gray-700/20 backdrop-blur-xl overflow-hidden"
    >
      <div className="flex flex-col h-full relative">
        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-4 right-4 z-30 bg-white/5 hover:bg-white/10 rounded-full p-2 transition-all"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </motion.div>
        </motion.button>

        {/* Top Section - Team Info */}
        <div
          className={`px-3 pt-4 pb-2 flex items-center transition-all duration-300 ${
            isExpanded ? "justify-start" : "justify-center"
          }`}
        >
          <div className="relative">
            <Image
              src="/team-avatar.png"
              alt="Team Avatar"
              width={isExpanded ? 50 : 40}
              height={isExpanded ? 50 : 40}
              className="rounded-full ring-2 ring-purple-500/20 transition-all duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
          </div>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="ml-3 flex flex-col"
            >
              <h2 className="text-base font-semibold text-white leading-tight">
                Team A1
              </h2>
              <p className="text-gray-400 text-xs font-semibold">4 members</p>
            </motion.div>
          )}
        </div>

        {/* Navigation Section */}
        <div className="flex-grow overflow-y-auto mt-6 space-y-2 px-3">
          <div className="space-y-2">{renderNavItems(mainNavItems)}</div>
        </div>

        {/* Bottom Section - User Profile with Dropdown */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-3 py-4 bg-white/5 rounded-t-xl"
        >
          <div
            className="flex items-center justify-center gap-3 cursor-pointer"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="transform group-hover:scale-105 transition-transform duration-300">
              <UserButton />
            </div>
            {isExpanded && (
              <>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 font-medium flex-grow truncate">
                  {user?.username || user?.fullName || "User"}
                </span>
                <motion.div
                  animate={{ rotate: isProfileDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </motion.div>
              </>
            )}
          </div>

          <AnimatePresence>
            {isExpanded && isProfileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-3"
              >
                <div className="border-t border-gray-700/30 pt-3 space-y-2">
                  <div className="flex items-center gap-3 px-2 py-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300 hover:text-white">
                      Settings
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-2 py-2 hover:bg-white/10 rounded-lg transition-colors">
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300 hover:text-white">
                      Help
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-2 py-2 hover:bg-red-500/20 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-300 hover:text-red-100">
                      Logout
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Action Fab */}
        {/* <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-4 right-4 bg-gradient-to-br from-purple-500 to-pink-500 
            text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all"
        >
          <Zap className="w-6 h-6" />
        </motion.button> */}
      </div>
    </motion.div>
  );
}

export default SideNav;
