import Keyboard from '@/components/Keyboard'
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Navbar from '@/components/ui/Navbar'

export default async function LearnPage() {
    const session = await getServerSession(options)

    if (!session) {
        // redirect('/api/auth/signin?callbackUrl=/server')
        redirect('/signup?callbackUrl=/api/auth/signin?callbackUrl=/learn')
    }

    return <div>
        <Navbar />
        <Keyboard />
    </div>
}

