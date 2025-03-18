"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
                <button className="flex items-center space-x-4 bg-white px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition">
                    {/* User Initial */}
                    {user.name ? <div className="w-9 h-9 bg-teal-700 rounded-full flex items-center justify-center">
                        <span className="text-black font-semibold text-lg">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div> : <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>}

                    {/*TODO:  Progress tracker */}
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-800 font-medium">4</span>
                        <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                    </div>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-52 rounded-xl shadow-lg border border-gray-100"
            >
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        {user.name ? <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">
                                user?.name.charAt(0).toUpperCase()
                            </span>
                        </div> : <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        }
                        <div>
                            <div className="font-semibold text-gray-900">{user?.name}</div>
                            <div className="text-sm text-gray-500">{user?.email}</div>
                        </div>
                    </div>
                </div>

                <DropdownMenuItem asChild>
                    <Link
                        href="/profile"
                        className="w-full px-4 py-2 hover:bg-gray-100 text-gray-800 cursor-pointer"
                    >
                        Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                        Settings
                    </button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <button
                        onClick={() => handleSignOut()}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 font-medium"
                    >
                        Sign Out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
