import { signOut } from "next-auth/react";
import { redirect } from "next/navigation"
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import UserDropdown from "./UserDropdown";

type User = {
    id?: string | null | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
} | undefined

type Props = {
    user: User,
}

export default async function Navbar() {
    // Fetch user session on the server
    const session = await getServerSession(options);
    const user = session?.user;

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false })
        } catch (error) {
            console.error('Sign out error:', error)
        } finally {
            redirect('/')
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
                {/* <a
                    href="/typing-tutor"
                    className="relative px-3 py-2 text-xl font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                >
                    Typing tutor
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </a> */}

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
                <a
                    href="/progress"
                    className="relative px-3 py-2 text-xl font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                >
                    Progresss
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </a>
                <a
                    href="/lessons"
                    className="relative px-3 py-2 text-xl font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                >
                    Lessons
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </a>
            </div>

            {/* User Profile Section */}
            {session ? (<UserDropdown user={session?.user} />
            ) : (
                <div className="flex flex-row items-center px-4 py-2 rounded-md border mr-4 border-black bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-duration-200">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-xl">
                            Hey! Log in
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex flex-col items-center">
                            <DropdownMenuItem
                                className="flex flex-row w-full items-center mx-4 text-center px-4 py-2 rounded-md border mr-4 border-black bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-duration-200">
                                <Link href={'/signup'}>
                                    Sign UP
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="flex flex-row w-full items-center mx-4 text-center px-4 py-2 rounded-md border mr-4 border-black bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition-duration-200">
                                <Link href={'/signin'}>
                                    Sign IN
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </nav >
    )
}

