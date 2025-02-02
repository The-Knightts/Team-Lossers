"use client";

import React from "react";
import Image from "next/image";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import UsageTrack from "./UsageTrack";

function SideNav() {
    const router = useRouter();
    const path = usePathname();

    const MenuList = [
        { name: "Home", icon: Home, path: "/dashboard" },
        { name: "History", icon: FileClock, path: "/dashboard/history" },
        { name: "Billing", icon: WalletCards, path: "/dashboard/billing" },
        { name: "Settings", icon: Settings, path: "/dashboard/settings" },
    ];

    return (
        <div className="h-screen relative p-5 shadow-sm border">
            <div className="flex justify-center">
                <Image src="/logo.svg" alt="logo" width={120} height={100} />
            </div>

            <div className="mt-10">
                {MenuList.map((menu, index) => (
                    <div
                        key={index}
                        onClick={() => router.push(menu.path)} // Handle routing
                        className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${
                            path === menu.path ? "bg-primary text-white" : ""
                        }`}
                    >
                        <menu.icon className="h-6 w-6" />
                        <h2 className="text-lg">{menu.name}</h2>
                    </div>
                ))}
            </div>
            <UsageTrack/>
        </div>
    );
}

export default SideNav;
