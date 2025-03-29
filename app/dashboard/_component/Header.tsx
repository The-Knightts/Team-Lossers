import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QRCode } from "@/components/ui/qr-code";
import ShareButton from "@/components/ui/share-button";
import { UserButton } from "@clerk/nextjs";
import { QrCode } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const teamMembers = [
    {
      id: 1,
      name: "Kuber Surve",
      image: "/kuber.jpg",
    },
    {
      id: 2,
      name: "Aayush Sawant",
      image: "/aayush.jpg",
    },
    {
      id: 3,
      name: "Ganesh Lagad",
      image: "/ganesh.jpg",
    },
    {
      id: 4,
      name: "Rishabh Trivedi",
      image: "/rishabh.jpg",
    },
  ];

  return (
    <div className="p-4 bg-gradient-to-r from-[#0F0F0F]/95 to-[#1A1A1A]/95 backdrop-blur-xl text-white m-3 rounded-xl border border-gray-800/30 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
      {/* Top section with navigation and right-aligned elements */}
      <div className="flex justify-between items-center border-b border-gray-700/30 pb-4 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-gray-500/20 before:to-transparent">
        {/* Navigation Tabs */}
        <div className="flex gap-6">
          <Link
            href="/dashboard/vedaai"
            className={`${pathname === "/dashboard/vedaai" ? "text-blue-400 font-semibold border-b-2 border-blue-400/70" : "text-gray-400"} pb-1 hover:text-blue-300 transition-all duration-200 hover:border-blue-300 relative before:absolute before:w-full before:h-full before:bg-blue-400/10 before:rounded-lg before:-z-10 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200`}
          >
            Veda AI
          </Link>
          <Link
            href="/dashboard/chat"
            className={`${pathname === "/dashboard/chat" ? "text-blue-400 font-semibold border-b-2 border-blue-400/70" : "text-gray-400"} pb-1 hover:text-blue-300 transition-all duration-200 hover:border-blue-300 relative before:absolute before:w-full before:h-full before:bg-blue-400/10 before:rounded-lg before:-z-10 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200`}
          >
            Chat
          </Link>
          <Link
            href="/dashboard/library"
            className={`${pathname === "/dashboard/library" ? "text-blue-400 font-semibold border-b-2 border-blue-400/70" : "text-gray-400"} pb-1 hover:text-blue-300 transition-all duration-200 hover:border-blue-300 relative before:absolute before:w-full before:h-full before:bg-blue-400/10 before:rounded-lg before:-z-10 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200`}
          >
            Library
          </Link>
        </div>

        {/* Right Section: Feedback, Team Members, and User */}
        <div className="flex items-center gap-6">
          {/* Team Members */}
          {teamMembers.length > 0 && (
            <div className="flex items-center -space-x-3 hover:space-x-1 transition-all duration-300">
              {teamMembers.slice(0, 3).map((member) => (
                <div key={member.id} className="relative group">
                  <Avatar className="border-2 border-[#1A1A1A] ring-2 ring-blue-500/30 w-8 h-8 transform group-hover:scale-125 transition-transform duration-200 hover:z-10">
                    <AvatarImage
                      src={member.image}
                      alt={member.name}
                      className="hover:brightness-110"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500">
                      {member.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                    {member.name}
                  </div>
                </div>
              ))}
              {teamMembers.length > 3 && (
                <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-xs w-8 h-8 flex items-center justify-center rounded-full ring-2 ring-blue-500/30 border-2 border-[#1A1A1A] transform hover:scale-110 transition-transform duration-200 hover:shadow-lg">
                  +{teamMembers.length - 3}
                </div>
              )}
            </div>
          )}

          {/* Feedback Button with QR Code */}
          <div className="relative group">
            <div className="cursor-pointer p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2">
              <QrCode
                size={20}
                className="text-white opacity-80 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-white text-sm font-medium">Feedback</span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Scan to open form
              </div>
            </div>
            {/* QR Code on Hover */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 scale-0 group-hover:scale-100 origin-top">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-xl shadow-xl border border-gray-700/30">
                <QRCode
                  value={
                    "https://docs.google.com/forms/d/e/1FAIpQLScw3spz_Z48Pm6icmXdid5ougRYNaoM_1WRTKN2Vu2AHsSK-g/viewform?usp=dialog"
                  }
                  size={100}
                  gradient={true}
                  gradientColors="from-gray-800 to-gray-900"
                  className="shadow-lg hover:scale-110 transition-transform duration-100"
                />
              </div>
            </div>
          </div>
          {/* User Profile */}
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
