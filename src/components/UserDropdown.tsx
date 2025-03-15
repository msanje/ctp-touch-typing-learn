"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type User = {
    name?: string | null | undefined;
    email?: string | null | undefined;
};

export default function UserDropdown({ user }: { user: User }) {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/"); // Redirect after signing out
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50">
                    {/* User Initial */}
                    <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>

                    {/* Progress tracker */}
                    <div className="flex items-center space-x-2 px-6">
                        <span className="text-gray-700 font-medium">4</span>
                        <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                    </div>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
                <div className="p-3 border-b">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg font-medium">{user?.name?.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                            <div className="font-medium text-gray-900">{user?.name}</div>
                            <div className="text-sm text-gray-600">{user?.email}</div>
                        </div>
                    </div>
                </div>

                <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleSignOut()}
                    className="text-red-600 cursor-pointer">
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
