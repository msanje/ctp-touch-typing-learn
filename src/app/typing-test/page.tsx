import TypingTest from "@/components/TypingTest";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await getServerSession(options)

    if (!session) {
        redirect('/signup?callbackUrl=/learn')
    }

    return (
        <div className="bg-gradient-to-b from-blue-200 to-white">
            <TypingTest />
        </div>
    )
}

export default Page;