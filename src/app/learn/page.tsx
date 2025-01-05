import Keyboard from '@/components/Keyboard'
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Navbar from '@/components/ui/Navbar'
import UserCard from "@/components/UserCard"

export default async function LearnPage() {
    const session = await getServerSession(options)

    if (!session) {
        redirect('/signup?callbackUrl=/learn')
    }

    return <div>
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Server"} />
        </section>
        <Navbar />
        <Keyboard />
    </div>
}

