"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown, Search, FileText, LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import UsageTrack from "./UsageTrack";

function SideNav() {
    const router = useRouter();
    const path = usePathname();
    const { user } = useUser(); // ✅ Get user details

    return (
        <div className="m-3">
            <div className="h-screen w-64 bg-[#0F0F0F] text-white p-4 flex flex-col justify-between shadow-lg rounded-lg">
                {/* Top Section - Team Info */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Image src="/team-avatar.png" alt="Team Avatar" width={40} height={40} className="rounded-full" />
                            <div>
                                <h2 className="text-lg font-semibold">Team Lossers</h2>
                                <p className="text-gray-400 text-sm">4 members</p>
                            </div>
                        </div>
                        <ChevronDown className="w-5 h-5 text-gray-400 cursor-pointer" />
                    </div>

                    {/* General Section */}
                    <div className="mb-6">
                        <h3 className="text-gray-500 uppercase text-sm mb-2">General</h3>
                        <div
                            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                            onClick={() => router.push("/dashboard")}
                        >
                            <LayoutDashboard className="w-5 h-5 text-gray-400" />
                            <span>Dashboard</span>
                        </div>
                        <div
                            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                            onClick={() => router.push("/dashboard/search")}
                        >
                            <Search className="w-5 h-5 text-gray-400" />
                            <span>Search</span>
                        </div>
                        <div
                            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                            onClick={() => router.push("/dashboard/billing")}
                        >
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span>Billing</span>
                        </div>
                        <div
                            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                            onClick={() => router.push("/dashboard/history")}
                        >
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span>History</span>
                        </div>
                        <div
                            className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                            onClick={() => router.push("/dashboard/news")}
                        >
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span>News</span>
                        </div>
                    </div>

                    <UsageTrack/>

                    {/* Bottom Section - User Profile with Username */}
                    <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-3 cursor-pointer">
                        <UserButton />
                        <span className="text-sm text-white font-medium">
                            {user?.username || user?.fullName || "User"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNav;
