import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Navbar() {
    const session = await getServerSession(options)

    return (
        <nav className="bg-blue-800 p-4">
            <ul className="flex justify-evenly text-2xl font-bold">
                <li><Link href="/">Home</Link></li>
                {!session && (
                    <li><Link href="/signup">Sign Up</Link></li>
                )}
                {
                    !session && (
                        <li><Link href="/api/auth/signin">Sign In</Link></li>
                    )
                }
                {session && (
                    <li><Link href="/api/auth/signout">Sign Out</Link></li>
                )}
            </ul>
        </nav>
    )
}

