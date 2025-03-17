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
            await signOut({ redirect: false });
        } catch (error) {
            console.error('Sign out error:', error);
        } finally {
            redirect('/');
        }
    };

    return (
        <nav className="flex items-center justify-between px-16 py-4 bg-white border-b border-gray-200 shadow-sm">
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/">
                    <span className="text-4xl font-extrabold text-blue-600 tracking-tight">KEYSTREAM</span>
                </Link>
            </div>

            {/* Navigation Links */}
            {
                session?.user &&
                <div className="flex items-center space-x-10">
                    {['Typing Test', 'Learn', 'Progress', 'Lessons'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase().replace(/\s/g, '-')}`}
                            className="relative px-4 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                        >
                            {item}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                        </Link>
                    ))}
                </div>
            }

            {/* User Profile Section */}
            {session ? (
                <UserDropdown user={session?.user} />
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                        Hey! Log in
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2 shadow-md border rounded-lg">
                        <DropdownMenuItem>
                            <Link
                                href="/signup"
                                className="block w-full px-6 py-2 text-white bg-blue-600 hover:bg-blue-500 font-bold text-center rounded-md transition-all duration-200"
                            >
                                Sign Up
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href="/signin"
                                className="block w-full px-6 py-2 text-white bg-gray-800 hover:bg-gray-700 font-bold text-center rounded-md transition-all duration-200"
                            >
                                Sign In
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </nav>
    );
}
