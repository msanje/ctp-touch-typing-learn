import { options } from "@/app/api/auth/[...nextauth]/options"
import ExercisePage from "@/components/ExercisePage"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function page() {
    const session = await getServerSession(options)

    if (!session) {
        redirect('/signup?callbackUrl=/learn')
    }

    return (
        <div>
            <ExercisePage user={session.user} />
        </div>
    )
}