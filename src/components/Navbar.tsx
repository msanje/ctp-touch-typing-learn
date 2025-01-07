"use client"

import { signOut } from "next-auth/react";
import Image from "next/image"
import { useState } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link";

type User = {
    id?: string | null | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
} | undefined

type Props = {
    user: User,
    pagetype: string,
}

export default function Navbar({ user, pagetype }: Props) {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const router = useRouter()

    const userImage = user?.image ? (
        <Image
            className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
            src={user?.image}
            width={200}
            height={200}
            alt={user?.name ?? "Profile Pic"}
            priority={true}
        />
    ) : null

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false })
        } catch (error) {
            console.error('Sign out error:', error)
        } finally {
            router.push('/')
        }
    }

    return (
        <nav className="flex items-center justify-between px-12 py-3 bg-white border-b border-gray-200">
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/"><span className="text-3xl font-bold text-blue-600">KEYSTREAM</span></Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
                <a
                    href="/typing-tutor"
                    className="relative px-3 py-2 text-xl font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                >
                    Typing tutor
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </a>

                <a
                    href="/typing-test"
                    className="relative px-3 py-2 text-xl font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                >
                    Typing test
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </a>

                <a
                    href="/learn"
                    className="relative px-3 py-2 text-xl font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                >
                    Learn
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </a>
            </div>

            {/* User Profile Section */}
            <div className="relative">
                <div
                    className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50"
                    onMouseEnter={() => setIsProfileMenuOpen(true)}
                    onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                    {/* Circle with Initial */}
                    <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>

                    {/* Progress tracker */}
                    <div className="flex items-center space-x-2 px-6">
                        <span className="text-gray-700 font-medium">4</span>
                        <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                    </div>

                    {/* sign out button */}
                    <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
                    >
                        Sign Out
                    </button>

                    {/* Popup Menu */}
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                            <div className="p-3">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center">
                                        <span className="text-white text-lg font-medium">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{user?.name}</div>
                                        <div className="text-sm text-gray-600">{user?.email}</div>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                <ul className="space-y-2">
                                    <li className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded cursor-pointer">
                                        Profile
                                    </li>
                                    <li className="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded cursor-pointer">
                                        Settings
                                    </li>
                                    <li className="px-3 py-2 rounded cursor-pointer">
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
                                        >
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
